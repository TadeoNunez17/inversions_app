import { BrokerAdapter, NormalizedStatus } from './brokerAdapter';

export class AlpacaAdapter implements BrokerAdapter {
  name = 'ALPACA' as const;

  async submitOrder(order: any): Promise<{ brokerOrderId: string; status: string }> {
    try {
      const response = await fetch(`${process.env.ALPACA_API_URL}/v2/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APCA-API-KEY-ID': process.env.ALPACA_API_KEY!,
          'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET!
        },
        body: JSON.stringify({
          symbol: order.instrument,
          qty: order.quantity.toString(),
          side: 'buy',
          type: order.orderType === 'MARKET' ? 'market' : 'limit',
          limit_price: order.price,
          time_in_force: 'day'
        }),
        signal: AbortSignal.timeout(5000)
      });

      if (!response.ok) throw new Error(`Alpaca error: ${response.statusText}`);
      const data = await response.json();
      return { brokerOrderId: data.id, status: 'SUBMITTED' };
    } catch (err: any) {
      if (err.name === 'TimeoutError') throw { code: 'BROKER_TIMEOUT', message: 'Alpaca timeout after 5s' };
      throw { code: 'BROKER_ERROR', message: err.message };
    }
  }

  async getOrderStatus(brokerOrderId: string): Promise<{ status: string; filledQty?: number; avgPrice?: number }> {
    const response = await fetch(`${process.env.ALPACA_API_URL}/v2/orders/${brokerOrderId}`, {
      headers: {
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY!,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET!
      },
      signal: AbortSignal.timeout(5000)
    });
    const data = await response.json();
    return { status: data.status, filledQty: parseFloat(data.filled_qty), avgPrice: parseFloat(data.filled_avg_price) };
  }

  async cancelOrder(brokerOrderId: string): Promise<boolean> {
    const response = await fetch(`${process.env.ALPACA_API_URL}/v2/orders/${brokerOrderId}`, {
      method: 'DELETE',
      headers: {
        'APCA-API-KEY-ID': process.env.ALPACA_API_KEY!,
        'APCA-API-SECRET-KEY': process.env.ALPACA_API_SECRET!
      },
      signal: AbortSignal.timeout(5000)
    });
    return response.ok;
  }
}
