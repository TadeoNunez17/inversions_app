# Contract: Broker Adapter

## Purpose
Define the interface and error handling for broker integrations (IBKR, Alpaca).

## Interface

```typescript
interface BrokerAdapter {
  name: 'IBKR' | 'ALPACA';
  submitOrder(order: OrderRequest): Promise<BrokerResponse>;
  getOrderStatus(brokerOrderId: string): Promise<OrderStatus>;
  cancelOrder(brokerOrderId: string): Promise<boolean>;
}
```

## Error Codes

| Code | HTTP Status | Meaning | Action |
|---|---|---|---|
| `BROKER_TIMEOUT` | 500 | Timeout after 5s | Retry with backoff, then fail |
| `BROKER_ERROR` | 500 | Generic broker error | Log, mark failed, return to pending approval |
| `ORDER_VERSION_STALE` | **409** | Optimistic lock conflict | Return 409 with `{"error":"ORDER_VERSION_STALE"}` |
| `RATE_LIMITED` | **429** | Rate limit exceeded | Return 429 with `{"code":"RATE_LIMITED","retryAfterSeconds":120}` |
| `INSUFFICIENT_FUNDS` | 400 | Not enough funds | Log, mark failed |
| `MARKET_CLOSED` | 400 | Market closed | Return to pending approval |

## Normalized Status Mapping

| Broker Status | Normalized Status |
|---|---|
| FILLED, COMPLETE | FILLED |
| PARTIALLY_FILLED, PARTIAL | PARTIALLY_FILLED |
| SUBMITTED, PENDING, OPEN | SUBMITTED |
| CANCELLED, CANCELED | CANCELLED |
| Other | FAILED |

## Idempotency

- Each submission must include an idempotency key based on `orderId`.
- Broker adapters must handle duplicate submissions gracefully.

## Response Payload

```json
{
  "brokerOrderId": "string",
  "status": "SUBMITTED | FAILED",
  "errorMessage": "optional"
}
```
