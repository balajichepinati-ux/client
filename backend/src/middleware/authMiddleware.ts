import { Request, Response, NextFunction } from 'express';

const ADMIN_SECRET_TOKEN = 'zeroerror_secure_admin_auth_token_2026';

export interface AuthenticatedRequest extends Request {
  adminEmail?: string;
}

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const adminToken = req.headers['x-admin-token'] || req.headers['authorization']?.split(' ')[1];

    if (!adminToken || adminToken !== ADMIN_SECRET_TOKEN) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: Unauthorized admin session.',
      });
    }

    req.adminEmail = 'praveenrajgandham@gmail.com'; // Bind admin meta for tracking audits
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal authorization validation failed.',
    });
  }
};
