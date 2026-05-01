import { OrderState } from '../../domain/orderLifecycle';

export interface AuditEvent {
  eventId: string;
  timestamp: string;
  correlationId: string;
  userId: string;
  role: string;
  mfaContextId?: string;
  actionType: string;
  previousState?: string;
  newState: string;
  orderId?: string;
  proposalId?: string;
  signalId?: string;
  broker?: string;
  instrument?: string;
  outcomeCode?: string;
  errorCode?: string;
  evidenceRef?: string;
}

export function emitHumanApproved(order: OrderState, userId: string, role: string, mfaContextId: string): AuditEvent {
  return {
    eventId: `EVT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    correlationId: order.orderId,
    userId,
    role,
    mfaContextId,
    actionType: 'HUMAN_APPROVED',
    previousState: 'PENDING_APPROVAL',
    newState: 'APPROVED',
    orderId: order.orderId,
    proposalId: order.proposalId,
    signalId: order.signalId,
    instrument: order.instrument
  };
}

export function emitExecutionSubmitted(order: OrderState, userId: string, role: string, broker: string): AuditEvent {
  return {
    eventId: `EVT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    correlationId: order.orderId,
    userId,
    role,
    actionType: 'EXECUTION_SUBMITTED',
    previousState: 'APPROVED',
    newState: 'SUBMITTED',
    orderId: order.orderId,
    broker,
    instrument: order.instrument,
    outcomeCode: 'SUBMITTED_TO_BROKER'
  };
}

export function emitExecutionFailed(order: OrderState, userId: string, role: string, error: string): AuditEvent {
  return {
    eventId: `EVT-${Date.now()}`,
    timestamp: new Date().toISOString(),
    correlationId: order.orderId || '',
    userId,
    role,
    actionType: 'EXECUTION_FAILED',
    previousState: 'SUBMITTED',
    newState: 'FAILED',
    orderId: order.orderId,
    broker: order.broker,
    instrument: order.instrument,
    outcomeCode: 'FAILED',
    errorCode: 'BROKER_ERROR',
    evidenceRef: error
  };
}

// Simulacion: guardar en Supabase
export async function saveAuditEvent(event: AuditEvent): Promise<void> {
  console.log('AUDIT:', JSON.stringify(event));
  // Implementation: await supabase.from('audit_events').insert(event);
}
