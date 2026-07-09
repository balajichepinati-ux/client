import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contact_submissions.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter_subscribers.json');

// Secret token for admin API validation
const ADMIN_SECRET_TOKEN = 'zeroerror_secure_admin_auth_token_2026';

export async function GET(request: Request) {
  try {
    const { headers } = request;
    const token = headers.get('x-admin-token');

    // Simple security validation
    if (token !== ADMIN_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Invalid or missing token.' },
        { status: 401 }
      );
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

    return NextResponse.json(
      {
        success: true,
        summary: {
          totalInquiries: contacts.length,
          totalSubscribers: subscribers.length,
        },
        data: {
          inquiries: contacts,
          subscribers: subscribers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
