import { Request, Response } from 'express';
import { prisma } from '../prisma';

// GET: Fetch reviews (Public gets approved only; Admin gets all)
export const getReviews = async (req: Request, res: Response) => {
  try {
    const isAdminMode = req.query.adminMode === 'true';
    const adminToken = req.headers['x-admin-token'];

    let filterConditions: any = { isApproved: true };

    // If requesting admin view and token is valid
    if (isAdminMode && adminToken === 'zeroerror_secure_admin_auth_token_2026') {
      filterConditions = {};
    }

    const reviews = await prisma.review.findMany({
      where: filterConditions,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch client reviews.' });
  }
};

// POST: Submit a new customer review (Pending approval)
export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, email, rating, comment } = req.body;

    if (!name || !email || rating === undefined || !comment) {
      return res.status(400).json({ success: false, message: 'Name, email, star rating, and review comment are required.' });
    }

    const score = parseInt(rating);
    if (score < 1 || score > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be an integer between 1 and 5.' });
    }

    const review = await prisma.review.create({
      data: {
        name,
        email: email.toLowerCase(),
        rating: score,
        comment,
        isApproved: false, // Moderated by default
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been submitted and is pending moderation.',
      data: review,
    });
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to record your review.' });
  }
};

// PUT: Moderation toggle (Admin only)
export const approveReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;

    const existingReview = await prisma.review.findUnique({ where: { id } });
    if (!existingReview) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: { isApproved: Boolean(isApproved) },
    });

    return res.status(200).json({
      success: true,
      message: `Review ${updatedReview.isApproved ? 'approved' : 'unapproved'} successfully.`,
      data: updatedReview,
    });
  } catch (error) {
    console.error('Approve review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update review approval status.' });
  }
};

// DELETE: Delete review (Admin only)
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingReview = await prisma.review.findUnique({ where: { id } });
    if (!existingReview) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    await prisma.review.delete({ where: { id } });

    return res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete review record.' });
  }
};
