import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';

const router = Router();

router.get('/', getServices);
router.post('/', requireAdmin, createService);
router.put('/:id', requireAdmin, updateService);
router.delete('/:id', requireAdmin, deleteService);

export default router;
