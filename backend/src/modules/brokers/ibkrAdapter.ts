import { BrokerAdapter, NormalizedStatus } from './brokerAdapter';

export class IBKRAdapter implements BrokerAdapter {
  name = 'IBKR' as const;

  async submitOrder(order: any): Promise<{ brokerOrderId: string; status: string }> {
    try {
      const response = await fetch(`${process.env.IBKR_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.IBKR_API_KEY}` },
        body: JSON.stringify({
          symbol: order.instrument,
          quantity: order.quantity,
          orderType: order.orderType === 'MARKET' ? 'MKT' : 'LMT',
          price: order.price,
          tif: 'DAY'
        }),
        signal: AbortSignal.timeout(5000)
      });
      
      if (!response.ok) throw new Error(`IBKR error: ${response.statusText}`);
      const data = await response.json();
      return { brokerOrderId: data.orderId, status: 'SUBMITTED' };
    } catch (err: any) {
      if (err.name === 'TimeoutError') throw { code: 'BROKER_TIMEOUT', message: 'IBKR timeout after 5s' };
      throw { code: 'BROKER_ERROR', message: err.message };
    }
  }

  async getOrderStatus(brokerOrderId: string): Promise<{ status: string; filledQty?: number; avgPrice?: number }> {
    const response = await fetch(`${process.env.IBKR_API_URL}/orders/${brokerOrderId}`, {
      signal: AbortSignal.timeout(5000)
    });
    const data = await response.json();
    return { status: data.status, filledQty: data.filledQty, avgPrice: data.avgPrice };
  }

  async cancelOrder(brokerOrderId: string): Promise<boolean> {
    const response = await fetch(`${process.env.IBKR_API_URL}/orders/${brokerOrderId}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  }
}
