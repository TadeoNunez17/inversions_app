import { OrderState, OrderStatus } from '../../domain/orderLifecycle';

export function handleExecutionFailure(order: OrderState, error: any): OrderState {
  const failedState = {
    ...order,
    status: OrderStatus.FAILED,
    failureReason: typeof error === 'string' ? error : error.message || 'Unknown error',
    version: order.version + 1,
    updatedAt: new Date().toISOString()
  };
  
  return {
    ...failedState,
    status: OrderStatus.PENDING_APPROVAL,
    version: failedState.version + 1,
    updatedAt: new Date().toISOString()
  };
}

export function canRetry(order: OrderState): boolean {
  return order.status === OrderStatus.FAILED || order.status === OrderStatus.PENDING_APPROVAL;
}

export const BROKER_ERRORS = {
  RATE_LIMITED: 'Rate limit exceeded',
  ORDER_VERSION_STALE: 'Order version conflict',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  MARKET_CLOSED: 'Market is closed',
  INVALID_ORDER: 'Invalid order parameters'
};
