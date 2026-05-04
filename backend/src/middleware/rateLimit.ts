import { Request, Response, NextFunction } from 'express';

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = `${req.auth?.userId || req.ip}:${req.path}`;
  const now = Date.now();
  const windowMs = 60 * 1000; // 60 segundos
  const maxRequests = 10;

  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (record.count >= maxRequests) {
    return res.status(429).json({ 
      error: 'RATE_LIMIT_EXCEEDED', 
      message: 'Too many requests. Please wait 120 seconds.',
      retryAfter: 120
    });
  }

  record.count++;
  next();
}
