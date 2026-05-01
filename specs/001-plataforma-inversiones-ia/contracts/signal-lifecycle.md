# Contract: Signal Lifecycle

## Purpose
Define the complete lifecycle of signals, approvals, and executions with mandatory trace fields.

## States

### Signal States
- `GENERATED` → `EVALUATED` → `APPROVED` / `REJECTED`

### Order States
- `PENDING_APPROVAL` → `APPROVED` → `SUBMITTED` → `FILLED` / `FAILED`
- `PENDING_APPROVAL` → `REJECTED`
- Failed orders return to `PENDING_APPROVAL`

## Mandatory Trace Fields

Every event must include:
```json
{
  "event_id": "EVT-{uuid}",
  "timestamp_utc": "ISO8601",
  "correlation_id": "order_id or signal_id",
  "user_id": "string",
  "role": "viewer|trader|admin",
  "mfa_context_id": "optional",
  "action_type": "HUMAN_APPROVED|EXECUTION_SUBMITTED|...",
  "previous_state": "string",
  "new_state": "string",
  "instrument": "string",
  "outcome_code": "string",
  "error_code": "optional",
  "evidence_ref": "optional reference"
}
```

## Disclaimer Events

| Event | When | Fields |
|---|---|---|
| `DISCLAIMER_SHOWN` | Before approval UI | `user_id`, `signal_id`, `timestamp_utc` |
| `DISCLAIMER_ACKNOWLEDGED` | Checkbox accepted | `user_id`, `signal_id`, `mfa_context_id` |
| `DISCLAIMER_RECORDED` | Server-side approval | `user_id`, `signal_id`, `correlation_id` |

## Disclaimer Events

| Event | When | Fields |
|---|---|---|
| `DISCLAIMER_SHOWN` | Before approval UI | `user_id`, `signal_id`, `timestamp_utc` |
| `DISCLAIMER_ACKNOWLEDGED` | Checkbox accepted | `user_id`, `signal_id`, `mfa_context_id` |

## Error Codes

| Code | HTTP Status | Meaning |
|---|---|---|
| `ORDER_VERSION_STALE` | 409 | Optimistic lock conflict |
| `MFA_REQUIRED` | 403 | MFA verification needed |
| `DISCLAIMER_NOT_ACCEPTED` | 400 | Disclaimer not accepted |
| `RATE_LIMITED` | 429 | Rate limit exceeded, cooldown active |
| `BROKER_TIMEOUT` | 500 | Broker did not respond within 5s |
| `INSUFFICIENT_FUNDS` | 400 | Not enough funds at broker |
