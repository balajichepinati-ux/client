import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { getOpenJobs, createJobPosting, deleteJobPosting, applyForJob, getApplications } from '../controllers/careerController';

const router = Router();

router.get('/', getOpenJobs);
router.post('/', requireAdmin, createJobPosting);
router.delete('/:id', requireAdmin, deleteJobPosting);
router.post('/apply', applyForJob);
router.get('/applications', requireAdmin, getApplications);

export default router;
