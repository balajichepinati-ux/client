import { NextResponse } from 'next/server';
import * as z from 'zod';
import fs from 'fs';
import path from 'path';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'newsletter_subscribers.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validation
    const { email } = newsletterSchema.parse(body);

    // 2. Persist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let subscribers: { email: string; subscribedAt: string }[] = [];
    if (fs.existsSync(FILE_PATH)) {
      try {
        const fileContent = fs.readFileSync(FILE_PATH, 'utf-8');
        subscribers = JSON.parse(fileContent);
      } catch (err) {
        subscribers = [];
      }
    }

    // Check duplication
    const isDuplicate = subscribers.some(
      (sub) => sub.email.toLowerCase() === email.toLowerCase()
    );

    if (isDuplicate) {
      return NextResponse.json(
        { success: true, message: 'Already subscribed!' },
        { status: 200 }
      );
    }

    subscribers.push({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2), 'utf-8');

    console.log(`\n📬 NEW SUBSCRIBER: ${email.toLowerCase()}\n`);

    return NextResponse.json(
      { success: true, message: 'Subscription completed successfully.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error('Server error handling newsletter:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
