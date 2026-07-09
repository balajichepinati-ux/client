import { NextResponse } from 'next/server';
import * as z from 'zod';
import fs from 'fs';
import path from 'path';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'contact_submissions.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Server-side validation
    const parsedData = contactSchema.parse(body);

    // 2. Persist to local JSON file
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let submissions = [];
    if (fs.existsSync(FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
        submissions = JSON.parse(fileContent);
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
    fs.writeFileSync(FILE_PATH, JSON.stringify(submissions, null, 2), 'utf-8');

    // 3. Mock notification logs (simulating Slack or SMTP mail alerts)
    console.log('\n==================================================');
    console.log('📬 NEW INQUIRY RECEIVED [ZERO ERROR IT SOLUTIONS]');
    console.log(`ID: ${newSubmission.id}`);
    console.log(`Name: ${newSubmission.name}`);
    console.log(`Email: ${newSubmission.email} | Phone: ${newSubmission.phone}`);
    console.log(`Solution Requested: ${newSubmission.service}`);
    console.log(`Message: ${newSubmission.message}`);
    console.log('==================================================\n');

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry saved successfully',
        submissionId: newSubmission.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Server error handling contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
