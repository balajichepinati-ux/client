import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { submitContact, getContacts } from '../controllers/contactController';

const router = Router();

router.post('/', submitContact);
router.get('/', requireAdmin, getContacts);

export default router;
