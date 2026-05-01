import { Router, Request, Response } from 'express';
import { verifyJWT } from '../../middleware/authContext';
import { requireMfa } from '../../middleware/mfaGuard';
import { createApproval, approve, reject } from '../../modules/execution/approvalService';

const router = Router();

router.post('/approve', verifyJWT, requireMfa, async (req: Request, res: Response) => {
  try {
    const { proposalId, signalId, instrument, orderType, quantity, price, disclaimerAccepted, mfaContextId } = req.body;
    const auth = req.auth!;

    if (!disclaimerAccepted) {
      return res.status(400).json({ error: 'DISCLAIMER_NOT_ACCEPTED' });
    }

    const order = createApproval({
      proposalId,
      signalId,
      instrument,
      orderType,
      quantity,
      price,
      userId: auth.userId,
      disclaimerAccepted,
      mfaContextId
    });

    res.status(201).json({ orderId: order.orderId, status: order.status, version: order.version });
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.error || 'INTERNAL_ERROR' });
  }
});

router.post('/:orderId/approve', verifyJWT, requireMfa, async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const auth = req.auth!;
    // Simulacion: obtener orden de store
    const order = { orderId, status: 'PENDING_APPROVAL', version: 1 } as any;
    const updated = approve(order, auth);
    res.json({ status: updated.status, version: updated.version });
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.error || 'INTERNAL_ERROR' });
  }
});

router.post('/:orderId/reject', verifyJWT, requireMfa, async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const auth = req.auth!;
    const order = { orderId, status: 'PENDING_APPROVAL', version: 1 } as any;
    const updated = reject(order, auth, reason);
    res.json({ status: updated.status, version: updated.version });
  } catch (err: any) {
    res.status(err.status || 500).json({ error: err.error || 'INTERNAL_ERROR' });
  }
});

export default router;
