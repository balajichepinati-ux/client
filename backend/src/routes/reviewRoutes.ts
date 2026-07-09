import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { getReviews, createReview, approveReview, deleteReview } from '../controllers/reviewController';

const router = Router();

router.get('/', getReviews);
router.post('/', createReview);
router.put('/:id/approve', requireAdmin, approveReview);
router.delete('/:id', requireAdmin, deleteReview);

export default router;
