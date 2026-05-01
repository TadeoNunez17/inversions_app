# Contract: Auth Context

## Purpose
Define authentication, authorization, and MFA evidence invariants for trader/admin actions.

## JWT Payload

```json
{
  "sub": "user_id",
  "email": "string",
  "role": "viewer|trader|admin",
  "mfaVerified": boolean,
  "sessionId": "string",
  "iat": number,
  "exp": number
}
```

## MFA Evidence Invariants (SC-008)

For sensitive actions (approve, execute, cancel), the following MUST be present:
1. `mfaVerified: true` in JWT payload
2. Valid `mfa_context_id` linked to a verified MFA challenge
3. Audit event with `mfa_context_id` recorded

## Role-Based Access Control

| Role | Can View | Can Approve | Can Execute | Can Configure |
|---|---|---|---|---|
| viewer | ✓ | ✗ | ✗ | ✗ |
| trader | ✓ | ✓ | ✓ | ✗ |
| admin | ✓ | ✓ | ✓ | ✓ |

## Error Codes

| Code | HTTP Status | Meaning |
|---|---|---|
| `UNAUTHENTICATED` | 401 | Missing/invalid JWT |
| `MFA_REQUIRED` | 403 | MFA verification needed |
| `INSUFFICIENT_ROLE` | 403 | Role lacks permission |
| `TOKEN_EXPIRED_OR_INVALID` | 401 | JWT expired or malformed |

## MFA Coverage Verification (SC-008)

- 100% of `/approve`, `/execute`, `/cancel` endpoints MUST have `mfaVerified: true`
- Monthly audit report MUST show 100% coverage
- Failed MFA challenges MUST block action and emit `MFA_FAILED` event
