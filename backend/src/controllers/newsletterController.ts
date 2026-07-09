import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const emailNormalized = email.toLowerCase().trim();

    // Check duplication
    const duplicate = await prisma.subscriber.findUnique({
      where: { email: emailNormalized },
    });

    if (duplicate) {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
      });
    }

    await prisma.subscriber.create({
      data: {
        email: emailNormalized,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our corporate newsletter!',
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ success: false, message: 'Could not record subscription.' });
  }
};

// GET: Fetch all newsletter subscribers (Admin only)
export const getSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
    return res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    console.error('Fetch subscribers error:', error);
    return res.status(500).json({ success: false, message: 'Could not retrieve newsletter subscribers.' });
  }
};
