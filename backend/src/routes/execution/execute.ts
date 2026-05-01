import { Router, Request, Response } from 'express';
import { verifyJWT } from '../../middleware/authContext';
import { rateLimit } from '../../middleware/rateLimit';
import { submitToBroker, markFailed, returnToPending } from '../../modules/execution/executionService';
import { IBKRAdapter } from '../../modules/brokers/ibkrAdapter';
import { AlpacaAdapter } from '../../modules/brokers/alpacaAdapter';

const router = Router();

const brokers = {
  IBKR: new IBKRAdapter(),
  ALPACA: new AlpacaAdapter()
};

router.post('/execute', verifyJWT, rateLimit, async (req: Request, res: Response) => {
  try {
    const { orderId, broker, version } = req.body;
    const auth = req.auth!;

    // Simulacion: obtener orden de store
    const order = { 
      orderId, 
      status: 'APPROVED', 
      version: version,
      instrument: 'AAPL',
      broker: broker
    } as any;

    try {
      const updated = submitToBroker(order, { orderId, broker, version }, auth);
      
      // Enviar a broker
      const adapter = brokers[broker as keyof typeof brokers];
      const brokerResp = await adapter.submitOrder(order);
      
      res.json({ 
        status: 'SUBMITTED', 
        orderId: updated.orderId,
        brokerOrderId: brokerResp.brokerOrderId,
        version: updated.version 
      });
    } catch (brokerErr: any) {
      if (brokerErr.code === 'ORDER_VERSION_STALE') {
        return res.status(409).json({ 
          error: 'ORDER_VERSION_STALE',
          message: 'Version de orden obsoleta, refresque y reintente',
          code: 'CONFLICT'
        });
      }
      
      // Marcar como fallida y regresar a aprobacion
      const failed = markFailed(order, brokerErr.message);
      const pending = returnToPending(failed);
      
      return res.status(500).json({ 
        error: 'EXECUTION_FAILED',
        message: brokerErr.message,
        orderId: pending.orderId,
        status: pending.status,
        requiresNewApproval: true
      });
    }
  } catch (err: any) {
    const status = err.status || 500;
    res.status(status).json({ error: err.error || 'INTERNAL_ERROR', message: err.message });
  }
});

export default router;
