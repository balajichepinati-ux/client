import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController';

const router = Router();

router.post('/', subscribeNewsletter);
router.get('/', requireAdmin, getSubscribers);

export default router;
