export enum OrderStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUBMITTED = 'SUBMITTED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export interface OrderState {
  orderId: string;
  proposalId: string;
  signalId: string;
  status: OrderStatus;
  instrument: string;
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
  userId: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  broker?: string;
  brokerOrderId?: string;
  failureReason?: string;
}

export function transition(state: OrderState, action: 'approve' | 'reject' | 'submit' | 'fail' | 'cancel'): OrderState {
  const newVersion = state.version + 1;
  switch (action) {
    case 'approve':
      if (state.status !== OrderStatus.PENDING_APPROVAL) throw new Error('INVALID_STATE_TRANSITION');
      return { ...state, status: OrderStatus.APPROVED, version: newVersion, updatedAt: new Date().toISOString() };
    case 'reject':
      if (state.status !== OrderStatus.PENDING_APPROVAL) throw new Error('INVALID_STATE_TRANSITION');
      return { ...state, status: OrderStatus.REJECTED, version: newVersion, updatedAt: new Date().toISOString() };
    case 'submit':
      if (state.status !== OrderStatus.APPROVED) throw new Error('INVALID_STATE_TRANSITION');
      return { ...state, status: OrderStatus.SUBMITTED, version: newVersion, updatedAt: new Date().toISOString() };
    case 'fail':
      if (state.status !== OrderStatus.SUBMITTED) throw new Error('INVALID_STATE_TRANSITION');
      return { ...state, status: OrderStatus.FAILED, version: newVersion, updatedAt: new Date().toISOString() };
    case 'cancel':
      if (![OrderStatus.PENDING_APPROVAL, OrderStatus.APPROVED].includes(state.status)) throw new Error('INVALID_STATE_TRANSITION');
      return { ...state, status: OrderStatus.CANCELLED, version: newVersion, updatedAt: new Date().toISOString() };
    default:
      throw new Error('UNKNOWN_ACTION');
  }
}
