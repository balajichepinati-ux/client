import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { sendNotificationEmail } from '../utils/email';

// GET: Fetch open job openings
export const getOpenJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.career.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    console.error('Fetch job openings error:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch job listings.' });
  }
};

// POST: Add new job opening (Admin only)
export const createJobPosting = async (req: Request, res: Response) => {
  try {
    const { title, department, location, description, requirements } = req.body;

    if (!title || !department || !location || !description) {
      return res.status(400).json({ success: false, message: 'Title, department, location, and description are required.' });
    }

    const job = await prisma.career.create({
      data: {
        title,
        department,
        location,
        description,
        requirements: Array.isArray(requirements) ? requirements : [],
      },
    });

    return res.status(201).json({ success: true, message: 'Job posting created successfully.', data: job });
  } catch (error) {
    console.error('Create job error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create job opening.' });
  }
};

// DELETE: Remove job opening (Admin only)
export const deleteJobPosting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingJob = await prisma.career.findUnique({ where: { id } });
    if (!existingJob) {
      return res.status(404).json({ success: false, message: 'Job opening not found.' });
    }

    await prisma.career.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Job opening deleted successfully.' });
  } catch (error) {
    console.error('Delete job error:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove job posting.' });
  }
};

// POST: Apply for a job opening
export const applyForJob = async (req: Request, res: Response) => {
  try {
    const { careerId, name, email, phone, resumeUrl, coverLetter } = req.body;

    if (!careerId || !name || !email || !phone || !resumeUrl) {
      return res.status(400).json({ success: false, message: 'Job ID, name, email, phone, and resume URL are required.' });
    }

    const job = await prisma.career.findUnique({ where: { id: careerId } });
    if (!job) {
      return res.status(404).json({ success: false, message: 'Referenced job posting not found.' });
    }

    const application = await prisma.application.create({
      data: {
        careerId,
        name,
        email: email.toLowerCase(),
        phone,
        resumeUrl,
        coverLetter: coverLetter || null,
      },
    });

    // Send admin notification
    const emailSubject = `💼 New Job Application: ${name} - ${job.title}`;
    const emailHtml = `
      <h2>New Career Application Received</h2>
      <p><strong>Job Title:</strong> ${job.title} (${job.department})</p>
      <p><strong>Applicant Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Resume URL:</strong> <a href="${resumeUrl}" target="_blank">Download Resume</a></p>
      ${coverLetter ? `<p><strong>Cover Letter:</strong><br/>${coverLetter.replace(/\n/g, '<br/>')}</p>` : ''}
      <br/>
      <hr/>
      <p>Submitted via ZERO ERROR IT SOLUTIONS Careers portal.</p>
    `;
    await sendNotificationEmail(emailSubject, emailHtml);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully! Our HR team will review your profile.',
      data: application,
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit your application.' });
  }
};

// GET: Fetch all applications (Admin only)
export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        career: {
          select: { title: true, department: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error('Fetch applications error:', error);
    return res.status(500).json({ success: false, message: 'Could not retrieve applications list.' });
  }
};
