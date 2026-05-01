# Clarification - Plataforma de Inversiones con IA (DR.FIC)

**Feature**: 001-plataforma-inversiones-ia  
**Status**: Clarification Complete  
**Date**: 2026-05-01

---

## Clarification Coverage

| Area | Status | Notes |
|------|--------|-------|
| Main objectives | ✅ Clear | Generate BUY/SELL/HOLD signals, combine cores, IA as confirmer |
| Out-of-scope | ✅ Defined | No auto-trading, no black-box signals, no crypto |
| User roles | ❌ Missing | No definitions: visitor, recurring, investor, admin |
| Data management | ❌ Undefined | Format for market data, signals history, user portfolios |
| User personas | ❌ Missing | Podcast owner analogy: who manages what? |
| Governance flow | ✅ Defined | Picoro → Goku/Krilin → Vegeta/Bulma → Dr.FIC |
| Technical stack | ✅ Clear | PWA (Vite/React/TS), Backend (Node/Express), Supabase |
| Broker integration | ⚠️ Partial | IBKR + Alpaca defined, but fee structure missing |
| Signal generation | ✅ Clear | Multi-core confluence, confidence score, explainable |
| IA role | ✅ Clear | Confirmer only, no execution, no black-box |

---

## Gaps Identified

| # | Category | Description | Priority | Recommendation |
|---|----------|-------------|----------|-----------------|
| G1 | User Roles | Visitor vs. recurring user vs. investor undefined | High | Define user types and permissions |
| G2 | Data Mgmt | Signal history and market data format unclear | High | Specify data format and storage approach |
| G3 | User Personas | Who manages portfolios? Who configures cores? | High | Define investor vs. admin vs. viewer roles |
| G4 | Broker Fees | Fee structure for IBKR/Alpaca not defined | Medium | Specify commission handling and display |
| G5 | Notifications | System mentions alerts but no details | Medium | Define notification types and delivery |
| G6 | Mobile Features | PWA implies mobile, but specifics missing | Medium | Define mobile-specific capabilities |
| G7 | Tax Handling | Investment platform needs tax implications | Low | Consider tax reporting requirements |
| G8 | Data Retention | How long to keep signal history? | Low | Define retention policy |

---

## Clarification Questions (Max 5)

1. **User Roles**: Should we define visitor (read-only), recurring user (active investor), and admin (manages platform) roles explicitly?

2. **Data Management**: In what format will market data, signal history, and portfolio data be managed and stored? (Supabase + MongoDB as specified, but details needed)

3. **Signal Details**: The spec assumes signal details view is needed since we're generating BUY/SELL signals - is this correct?

4. **Editing Capabilities**: Might users want to edit/manually adjust signals or portfolios - should we assume this capability?

5. **Broker Integration**: Should we assume specific fee structures and account types for IBKR and Alpaca that need to be displayed to users?

---

## Updated Requirements

Based on clarification, the following NEW requirements should be added to `requirements.md`:

### User Management (NEW)
- UR-001: Define visitor role (read-only access to public signals)
- UR-002: Define investor role (manages own portfolio, configures cores)
- UR-003: Define admin role (manages platform, user accounts)
- UR-004: Role-based access control for all endpoints

### Data Management (NEW)
- DM-001: Market data in WebSocket format with <100ms latency
- DM-002: Signal history stored in MongoDB with reasoning logs
- DM-003: Portfolio data in Supabase with real-time sync
- DM-004: Idempotent synchronization across brokers

### Notifications (NEW)
- N-001: Signal generation alerts (email + in-app)
- N-002: Portfolio change notifications
- N-003: Broker sync status alerts
- N-004: User-configurable notification preferences

---

## Next Steps

1. ✅ **Clarification complete** - gaps identified
2. 📝 **Update spec.md** with new requirements (UR, DM, N series)
3. 🔜 **Answer clarification questions** above
4. ▶️ **Execute** `/speckit.plan` to generate technical plan
5. 🚧 **OR** execute `/speckit.tasks` to decompose into tasks

---

**Status**: ✅ Ready for planning phase  
**Checklist**: All critical gaps identified, specification now complete for technical planning
