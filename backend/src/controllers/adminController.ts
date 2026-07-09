import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const productsCount = await prisma.product.count();
    const servicesCount = await prisma.service.count();
    const contactsCount = await prisma.contact.count();
    const subscribersCount = await prisma.subscriber.count();
    const applicationsCount = await prisma.application.count();
    
    // Reviews details
    const reviewsCount = await prisma.review.count();
    const approvedReviewsCount = await prisma.review.count({ where: { isApproved: true } });
    
    const ratingAggregate = await prisma.review.aggregate({
      where: { isApproved: true },
      _avg: { rating: true },
    });

    const averageRating = ratingAggregate._avg.rating ? parseFloat(ratingAggregate._avg.rating.toFixed(1)) : 5.0;

    // Fetch recent logs
    const recentContacts = await prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentReviews = await prisma.review.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    const recentApplications = await prisma.application.findMany({
      take: 5,
      include: {
        career: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          products: productsCount,
          services: servicesCount,
          inquiries: contactsCount,
          subscribers: subscribersCount,
          applications: applicationsCount,
          totalReviews: reviewsCount,
          approvedReviews: approvedReviewsCount,
          averageRating: averageRating,
        },
        recents: {
          inquiries: recentContacts,
          reviews: recentReviews,
          applications: recentApplications,
        },
      },
    });
  } catch (error) {
    console.error('Analytics aggregation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to aggregate administrative dashboard analytics.' });
  }
};
