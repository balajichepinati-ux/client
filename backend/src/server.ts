import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Next.js server
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],
    credentials: true,
  })
);

// Body parser configured to accept large base64 file payloads (e.g. resumes, images)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Mount central router
app.use('/api', apiRouter);

// Root route check
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 ZERO ERROR IT SOLUTIONS Enterprise API is active.');
});

// Global Fallback Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Application Exception:', err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
});
