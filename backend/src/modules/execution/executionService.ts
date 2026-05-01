import { OrderState, OrderStatus } from '../../domain/orderLifecycle';
import { AuthContext } from '../../middleware/authContext';

export interface ExecutionRequest {
  orderId: string;
  broker: 'IBKR' | 'ALPACA';
  version: number;
}

export interface BrokerResponse {
  brokerOrderId: string;
  status: 'SUBMITTED' | 'FAILED';
  errorMessage?: string;
}

export function submitToBroker(order: OrderState, request: ExecutionRequest, auth: AuthContext): OrderState {
  if (order.status !== OrderStatus.APPROVED) {
    throw { status: 400, error: 'NOT_APPROVED', message: 'Orden requiere aprobacion previa' };
  }
  if (order.version !== request.version) {
    throw { status: 409, error: 'ORDER_VERSION_STALE', message: 'Version de orden obsoleta' };
  }
  return {
    ...order,
    status: OrderStatus.SUBMITTED,
    broker: request.broker,
    version: order.version + 1,
    updatedAt: new Date().toISOString()
  };
}

export function markFailed(order: OrderState, error: string): OrderState {
  return {
    ...order,
    status: OrderStatus.FAILED,
    failureReason: error,
    version: order.version + 1,
    updatedAt: new Date().toISOString()
  };
}

export function returnToPending(order: OrderState): OrderState {
  return {
    ...order,
    status: OrderStatus.PENDING_APPROVAL,
    version: order.version + 1,
    updatedAt: new Date().toISOString()
  };
}
