import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { getAnalytics } from '../controllers/adminController';
import { getContacts } from '../controllers/contactController';
import { getSubscribers } from '../controllers/newsletterController';

const router = Router();

router.get('/analytics', requireAdmin, getAnalytics);
router.get('/contacts', requireAdmin, getContacts);
router.get('/subscribers', requireAdmin, getSubscribers);

export default router;
