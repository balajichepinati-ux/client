import { Router } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import serviceRoutes from './serviceRoutes';
import reviewRoutes from './reviewRoutes';
import careerRoutes from './careerRoutes';
import contactRoutes from './contactRoutes';
import newsletterRoutes from './newsletterRoutes';
import adminRoutes from './adminRoutes';
import uploadRoutes from './uploadRoutes';

const router = Router();

// Mount modular sub-routers
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/services', serviceRoutes);
router.use('/reviews', reviewRoutes);
router.use('/careers', careerRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/admin', adminRoutes);
router.use('/upload', uploadRoutes);

export default router;
