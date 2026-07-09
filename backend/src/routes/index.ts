import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';

// Controllers imports
import { adminLogin } from '../controllers/authController';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController';
import { getReviews, createReview, approveReview, deleteReview } from '../controllers/reviewController';
import { getOpenJobs, createJobPosting, deleteJobPosting, applyForJob, getApplications } from '../controllers/careerController';
import { submitContact, getContacts } from '../controllers/contactController';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController';
import { getAnalytics } from '../controllers/adminController';
import { uploadFile } from '../controllers/uploadController';

const router = Router();

// --- Public Endpoints ---
router.post('/auth/login', adminLogin);

router.get('/products', getProducts);
router.get('/services', getServices);

router.get('/reviews', getReviews);
router.post('/reviews', createReview);

router.get('/careers', getOpenJobs);
router.post('/careers/apply', applyForJob);

router.post('/contact', submitContact);
router.post('/newsletter', subscribeNewsletter);

// File Upload endpoint (open for candidates uploading resumes and admin uploading product images)
router.post('/upload', uploadFile);


// --- Administrative Protected Endpoints (requireAdmin) ---
// Admin Analytics
router.get('/admin/analytics', requireAdmin, getAnalytics);

// Admin Contacts Manager
router.get('/admin/contacts', requireAdmin, getContacts);

// Admin Subscribers Manager
router.get('/admin/subscribers', requireAdmin, getSubscribers);

// Admin Product Inventory CRUD
router.post('/products', requireAdmin, createProduct);
router.put('/products/:id', requireAdmin, updateProduct);
router.delete('/products/:id', requireAdmin, deleteProduct);

// Admin Services CRUD
router.post('/services', requireAdmin, createService);
router.put('/services/:id', requireAdmin, updateService);
router.delete('/services/:id', requireAdmin, deleteService);

// Admin Reviews Moderation
router.put('/reviews/:id/approve', requireAdmin, approveReview);
router.delete('/reviews/:id', requireAdmin, deleteReview);

// Admin Careers Manager
router.post('/careers', requireAdmin, createJobPosting);
router.delete('/careers/:id', requireAdmin, deleteJobPosting);
router.get('/careers/applications', requireAdmin, getApplications);

export default router;
