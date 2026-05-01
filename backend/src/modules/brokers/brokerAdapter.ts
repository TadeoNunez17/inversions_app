export interface BrokerAdapter {
  name: 'IBKR' | 'ALPACA';
  submitOrder(order: any): Promise<{ brokerOrderId: string; status: string }>;
  getOrderStatus(brokerOrderId: string): Promise<{ status: string; filledQty?: number; avgPrice?: number }>;
  cancelOrder(brokerOrderId: string): Promise<boolean>;
}

export interface NormalizedStatus {
  status: 'SUBMITTED' | 'FILLED' | 'PARTIALLY_FILLED' | 'CANCELLED' | 'FAILED';
  filledQty?: number;
  avgPrice?: number;
  errorMessage?: string;
}

export function normalizeStatus(brokerStatus: string, broker: string): NormalizedStatus {
  const upper = brokerStatus.toUpperCase();
  if (['FILLED', 'COMPLETE'].includes(upper)) return { status: 'FILLED' };
  if (['PARTIALLY_FILLED', 'PARTIAL'].includes(upper)) return { status: 'PARTIALLY_FILLED' };
  if (['SUBMITTED', 'PENDING', 'OPEN'].includes(upper)) return { status: 'SUBMITTED' };
  if (['CANCELLED', 'CANCELED'].includes(upper)) return { status: 'CANCELLED' };
  return { status: 'FAILED', errorMessage: `Unknown status from ${broker}: ${brokerStatus}` };
}
