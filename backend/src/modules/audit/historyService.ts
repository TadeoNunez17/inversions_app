export interface AuditEvent {
  eventId: string;
  timestamp: string;
  correlationId: string;
  userId: string;
  actionType: string;
  previousState?: string;
  newState: string;
  instrument?: string;
  outcomeCode?: string;
  errorCode?: string;
}

export interface HistoryFilter {
  userId?: string;
  correlationId?: string;
  actionType?: string;
  instrument?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export function getAuditHistory(filter: HistoryFilter): AuditEvent[] {
  // Simulacion: obtener de Supabase
  const mockEvents: AuditEvent[] = [
    {
      eventId: 'EVT-001',
      timestamp: new Date().toISOString(),
      correlationId: 'ORD-001',
      userId: 'user-123',
      actionType: 'HUMAN_APPROVED',
      previousState: 'PENDING_APPROVAL',
      newState: 'APPROVED',
      instrument: 'AAPL',
      outcomeCode: 'APPROVED'
    },
    {
      eventId: 'EVT-002',
      timestamp: new Date().toISOString(),
      correlationId: 'ORD-001',
      userId: 'user-123',
      actionType: 'EXECUTION_SUBMITTED',
      previousState: 'APPROVED',
      newState: 'SUBMITTED',
      instrument: 'AAPL',
      outcomeCode: 'SUBMITTED_TO_BROKER'
    }
  ];

  let filtered = mockEvents;

  if (filter.userId) filtered = filtered.filter(e => e.userId === filter.userId);
  if (filter.correlationId) filtered = filtered.filter(e => e.correlationId === filter.correlationId);
  if (filter.actionType) filtered = filtered.filter(e => e.actionType === filter.actionType);
  if (filter.instrument) filtered = filtered.filter(e => e.instrument === filter.instrument);
  if (filter.startDate) filtered = filtered.filter(e => e.timestamp >= filter.startDate!);
  if (filter.endDate) filtered = filtered.filter(e => e.timestamp <= filter.endDate!);

  const offset = filter.offset || 0;
  const limit = filter.limit || 50;

  return filtered.slice(offset, offset + limit);
}

export function getEventById(eventId: string): AuditEvent | undefined {
  // Simulacion: buscar en Supabase
  return {
    eventId,
    timestamp: new Date().toISOString(),
    correlationId: 'ORD-001',
    userId: 'user-123',
    actionType: 'EXECUTION_FAILED',
    previousState: 'SUBMITTED',
    newState: 'FAILED',
    instrument: 'AAPL',
    outcomeCode: 'FAILED',
    errorCode: 'BROKER_TIMEOUT'
  };
}
