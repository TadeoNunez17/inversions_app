import { Router, Request, Response } from 'express';
import { verifyJWT } from '../../middleware/authContext';
import { getEventById } from '../../modules/audit/historyService';

const router = Router();

router.get('/operation-detail/:correlationId', verifyJWT, (req: Request, res: Response) => {
  try {
    const { correlationId } = req.params;
    const { includeFailures } = req.query;

    // Obtener evento principal
    const mainEvent = getEventById(correlationId);
    if (!mainEvent) {
      return res.status(404).json({ error: 'OPERATION_NOT_FOUND' });
    }

    // Simulacion: obtener todos los eventos relacionados
    const allEvents = [
      mainEvent,
      {
        eventId: 'EVT-002',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        correlationId,
        userId: mainEvent.userId,
        actionType: 'EXECUTION_FAILED',
        previousState: 'SUBMITTED',
        newState: 'FAILED',
        instrument: mainEvent.instrument,
        outcomeCode: 'FAILED',
        errorCode: 'BROKER_TIMEOUT',
        evidenceRef: 'Timeout after 5s on IBKR adapter'
      }
    ];

    const failedEvents = allEvents.filter(e => e.errorCode);

    const response = {
      operationId: correlationId,
      instrument: mainEvent.instrument,
      status: mainEvent.newState,
      timeline: allEvents.map(e => ({
        timestamp: e.timestamp,
        action: e.actionType,
        state: e.newState,
        outcome: e.outcomeCode,
        error: e.errorCode,
        evidence: e.evidenceRef
      })),
      failureDiagnostics: includeFailures ? failedEvents.map(e => ({
        errorCode: e.errorCode,
        timestamp: e.timestamp,
        evidence: e.evidenceRef
      })) : undefined,
      traceCompleteness: 0.98
    };

    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: 'INTERNAL_ERROR', message: err.message });
  }
});

export default router;
