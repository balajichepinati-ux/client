import express from 'express';
import cors from 'cors';
import * as z from 'zod';
import dotenv from 'dotenv';
import { prisma } from './prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Next.js server
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
    credentials: true,
  })
);

app.use(express.json());

// Secret token for admin validation
const ADMIN_SECRET_TOKEN = 'zeroerror_secure_admin_auth_token_2026';

// Zod schemas
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

// POST: Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    // 1. Zod Validation
    const parsedData = contactSchema.parse(req.body);

    // 2. Persist to Supabase Database via Prisma
    const newSubmission = await prisma.contact.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        service: parsedData.service,
        message: parsedData.message,
      },
    });

    // 3. Logger alert
    console.log('\n==================================================');
    console.log('📬 SUPABASE DATABASE: NEW INQUIRY SAVED VIA PRISMA');
    console.log(`ID: ${newSubmission.id}`);
    console.log(`Name: ${newSubmission.name}`);
    console.log(`Email: ${newSubmission.email} | Phone: ${newSubmission.phone}`);
    console.log(`Solution Requested: ${newSubmission.service}`);
    console.log('==================================================\n');

    return res.status(200).json({
      success: true,
      message: 'Inquiry saved successfully to database.',
      submissionId: newSubmission.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.flatten().fieldErrors,
      });
    }
    console.error('Express contact database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred while writing to database.',
    });
  }
});

// POST: Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    // 1. Validation
    const { email } = newsletterSchema.parse(req.body);

    const normalizedEmail = email.toLowerCase();

    // 2. Check duplication in Supabase
    const existingSub = await prisma.subscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingSub) {
      return res.status(200).json({
        success: true,
        message: 'Already subscribed!',
      });
    }

    // 3. Save new subscriber via Prisma
    const newSub = await prisma.subscriber.create({
      data: {
        email: normalizedEmail,
      },
    });

    console.log(`📬 SUPABASE DATABASE: NEW SUBSCRIBER SAVED: ${newSub.email}`);

    return res.status(200).json({
      success: true,
      message: 'Subscription completed successfully.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.flatten().fieldErrors,
      });
    }
    console.error('Express newsletter database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// GET: Admin Submissions Retrieve
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const token = req.headers['x-admin-token'];

    if (token !== ADMIN_SECRET_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid or missing token.',
      });
    }

    // Fetch records from Supabase
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      summary: {
        totalInquiries: contacts.length,
        totalSubscribers: subscribers.length,
      },
      data: {
        inquiries: contacts,
        subscribers: subscribers,
      },
    });
  } catch (error) {
    console.error('Express admin fetch database error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('ZERO ERROR IT SOLUTIONS database API Server is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Express database Server running on http://localhost:${PORT}`);
});
