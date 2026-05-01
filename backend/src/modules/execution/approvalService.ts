import { OrderState, OrderStatus } from '../../domain/orderLifecycle';
import { AuthContext } from '../../middleware/authContext';

export interface ApprovalRequest {
  proposalId: string;
  signalId: string;
  instrument: string;
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
  userId: string;
  disclaimerAccepted: boolean;
  mfaContextId: string;
}

export function createApproval(data: ApprovalRequest): OrderState {
  if (!data.disclaimerAccepted) {
    throw { status: 400, error: 'DISCLAIMER_NOT_ACCEPTED' };
  }
  return {
    orderId: `ORD-${Date.now()}`,
    proposalId: data.proposalId,
    signalId: data.signalId,
    status: OrderStatus.PENDING_APPROVAL,
    instrument: data.instrument,
    orderType: data.orderType,
    quantity: data.quantity,
    price: data.price,
    userId: data.userId,
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export function approve(order: OrderState, auth: AuthContext): OrderState {
  if (order.status !== OrderStatus.PENDING_APPROVAL) {
    throw { status: 409, error: 'INVALID_STATE', message: 'Orden no esta pendiente de aprobacion' };
  }
  return {
    ...order,
    status: OrderStatus.APPROVED,
    version: order.version + 1,
    updatedAt: new Date().toISOString()
  };
}

export function reject(order: OrderState, auth: AuthContext, reason: string): OrderState {
  if (order.status !== OrderStatus.PENDING_APPROVAL) {
    throw { status: 409, error: 'INVALID_STATE' };
  }
  return {
    ...order,
    status: OrderStatus.REJECTED,
    version: order.version + 1,
    failureReason: reason,
    updatedAt: new Date().toISOString()
  };
}
