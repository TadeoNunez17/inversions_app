import { Request, Response, NextFunction } from 'express';
import { AuthContext } from './authContext';

export function requireMfa(req: Request, res: Response, next: NextFunction) {
  const auth = req.auth as AuthContext | undefined;
  if (!auth) return res.status(401).json({ error: 'UNAUTHENTICATED' });
  if (!auth.mfaVerified) {
    return res.status(403).json({
      error: 'MFA_REQUIRED',
      message: 'Accion sensible requiere verificacion MFA previa',
      code: 'MFA_NOT_VERIFIED'
    });
  }
  next();
}
