import express from 'express';
import cors from 'cors';
import * as z from 'zod';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Next.js server (localhost:3000)
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
    credentials: true,
  })
);

app.use(express.json());

// JSON Persistence Paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contact_submissions.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter_subscribers.json');

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

// Helper to check and initialize data folder
const initializeDataFolder = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
};

// POST: Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    initializeDataFolder();

    // 1. Zod Validation
    const parsedData = contactSchema.parse(req.body);

    // 2. Read existing data
    let submissions = [];
    if (fs.existsSync(CONTACTS_FILE)) {
      try {
        submissions = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
      } catch (err) {
        submissions = [];
      }
    }

    const newSubmission = {
      id: `inq_${Math.random().toString(36).substring(2, 11)}`,
      ...parsedData,
      createdAt: new Date().toISOString(),
    };

    submissions.push(newSubmission);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

    // 3. Logger alert
    console.log('\n==================================================');
    console.log('📬 EXPRESS BACKEND: NEW INQUIRY RECEIVED');
    console.log(`ID: ${newSubmission.id}`);
    console.log(`Name: ${newSubmission.name}`);
    console.log(`Email: ${newSubmission.email} | Phone: ${newSubmission.phone}`);
    console.log(`Solution Requested: ${newSubmission.service}`);
    console.log('==================================================\n');

    return res.status(200).json({
      success: true,
      message: 'Inquiry saved successfully.',
      submissionId: newSubmission.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.flatten().fieldErrors,
      });
    }
    console.error('Express contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// POST: Newsletter Subscription
app.post('/api/newsletter', async (req, res) => {
  try {
    initializeDataFolder();

    // 1. Validation
    const { email } = newsletterSchema.parse(req.body);

    // 2. Read existing data
    let subscribers: { email: string; subscribedAt: string }[] = [];
    if (fs.existsSync(NEWSLETTER_FILE)) {
      try {
        subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf-8'));
      } catch (err) {
        subscribers = [];
      }
    }

    // Deduplication check
    const isDuplicate = subscribers.some(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(200).json({
        success: true,
        message: 'Already subscribed!',
      });
    }

    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    });

    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2), 'utf-8');

    console.log(`📬 EXPRESS BACKEND: NEW SUBSCRIBER: ${email.toLowerCase()}`);

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
    console.error('Express newsletter error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// GET: Admin Submissions Retrieve
app.get('/api/admin/submissions', (req, res) => {
  try {
    const token = req.headers['x-admin-token'];

    if (token !== ADMIN_SECRET_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid or missing token.',
      });
    }

    let contacts = [];
    let subscribers = [];

    if (fs.existsSync(CONTACTS_FILE)) {
      try {
        contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8'));
      } catch (e) {
        contacts = [];
      }
    }

    if (fs.existsSync(NEWSLETTER_FILE)) {
      try {
        subscribers = JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf-8'));
      } catch (e) {
        subscribers = [];
      }
    }

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
    console.error('Express admin fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.send('ZERO ERROR IT SOLUTIONS Backend API Server is running.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
});
