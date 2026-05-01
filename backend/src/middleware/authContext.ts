import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthContext {
  userId: string;
  email: string;
  role: 'viewer' | 'trader' | 'admin';
  mfaVerified: boolean;
  sessionId: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'MISSING_TOKEN' });
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'INVALID_TOKEN_FORMAT' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as any;
    req.auth = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      mfaVerified: payload.mfaVerified || false,
      sessionId: payload.sessionId
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'TOKEN_EXPIRED_OR_INVALID' });
  }
}
