import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { sendNotificationEmail } from '../utils/email';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ success: false, message: 'All form fields are required.' });
    }

    const submission = await prisma.contact.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone,
        service,
        message,
      },
    });

    // Send notification email to admin
    const emailSubject = `📬 New Client Inquiry from ${name} (${service})`;
    const emailHtml = `
      <h2>New Contact Submission Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background:#f4f4f4;border-left:5px solid #2563EB;padding:10px;">
        ${message.replace(/\n/g, '<br/>')}
      </blockquote>
      <br/>
      <hr/>
      <p>This message was sent from the contact form at ZERO ERROR IT SOLUTIONS.</p>
    `;
    await sendNotificationEmail(emailSubject, emailHtml);

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been submitted successfully! We will contact you soon.',
      submissionId: submission.id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Failed to record your inquiry. Please try again.' });
  }
};

// GET: Fetch all contact submissions (Admin only)
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch contact inquiries.' });
  }
};
