# Specification Requirements: Plataforma de Inversiones con IA (DR.FIC)

**Feature**: 001-plataforma-inversiones-ia  
**Status**: Draft  
**Source**: SPEC-001-TKT-HD-DRFIC-001  

---

## 1. Functional Requirements

### Core System
- FR-001: Generate BUY / SELL / HOLD signals with high confidence
- FR-002: Combine multiple specialized truth sources (cores)
- FR-003: Use IA exclusively as confirmer and risk evaluator
- FR-004: Integrate real professional brokers (IBKR, Alpaca)
- FR-005: Maintain explicit human control over all executions (v1.0)

### Semi-Automatic Model
- FR-006: No automated execution without explicit human approval
- FR-007: Automation limited to analysis, correlation, and recommendation
- FR-008: Final decision always belongs to user

### Cores Architecture
- FR-009: Market Data core (activable by user)
- FR-010: Technical Indicators core (RSI, MACD, BB, EMA/SMA, Volume)
- FR-011: Technical Structure core (supports, resistances, trends)
- FR-012: Institutional Flow core
- FR-013: News & Events core
- FR-014: Options Analysis core
- FR-015: Confluence Engine core
- FR-016: AI Advisor core (confirmer only)

### User Management
- FR-017: User decides which cores participate
- FR-018: User configures strategies, weights, and thresholds
- FR-019: User approves or rejects all executions
- FR-020: User can audit why a signal was generated

---

## 2. Non-Functional Requirements

### Performance
- NFR-001: Signal generation latency < 100ms
- NFR-002: Real-time market data via WebSockets
- NFR-003: Cache intelligent for historical data

### Security
- NFR-004: JWT authentication with refresh tokens
- NFR-005: TLS 1.3 in transit, AES-256 at rest
- NFR-006: Credentials stored only in .env
- NFR-007: Multi-tenancy with data isolation

### Availability
- NFR-008: 99.9% availability for critical operations
- NFR-009: High availability architecture with load balancers
- NFR-010: Failover between regions

### Usability
- NFR-011: PWA with responsive design (React + Tailwind)
- NFR-012: Accessibility WCAG 2.1 AA
- NFR-013: Dark/light mode support

---

## 3. Data Requirements

### Persistence
- DR-001: PostgreSQL as primary database
- DR-002: Redis for caching and sessions
- DR-003: MongoDB optional for signal history and IA logs
- DR-004: Server-side persistence only

### Broker Integration
- DR-005: IBKR adapter (primary broker)
- DR-006: Alpaca adapter (secondary/paper trading)
- DR-007: Encapsulated brokers as adapters
- DR-008: Idempotent synchronization

---

## 4. IA Requirements

### AI Advisor Role
- IA-001: Acts as additional core
- IA-002: Confirms confluence and evaluates risk
- IA-003: Never replaces deterministic logic
- IA-004: Never executes operations in v1.0
- IA-005: Explains reasoning and signal generation

### Models
- IA-006: Ensemble: LSTM + Random Forest + Gradient Boosting
- IA-007: Dynamic weight adjustment by market conditions
- IA-008: Backtesting of strategies
- IA-009: Confidence score 0-100

---

## 5. Governance Requirements

### Agent Execution Order
- GOV-001: Picoro → (Goku || Krilin) → (Vegeta || Bulma) → Dr.FIC
- GOV-002: Explicit skill declaration mandatory
- GOV-003: Activity header display mandatory
- GOV-004: Verifiable output evidence mandatory
- GOV-005: No work outside assigned phase

### Framework Independence
- GOV-006: Agents independent from SpecKit internal agents
- GOV-007: SpecKit subordinates to DR.FIC governance
- GOV-008: Can operate over SpecKit, OpenSpec, or other frameworks

---

## 6. Documentation Requirements

### Code Documentation
- DOC-001: Comments with prefix `💎FIC:`
- DOC-002: Emojis: 💎 explanation, ⚠️ warning, 🐞 bug, 💡 idea
- DOC-003: Documentation in EN / ES (bilingual)
- DOC-004: Applied to modules, services, public hooks, critical logic

### Project Documentation
- DOC-005: Canonical source in `.drfic/diana-sdk/memory/project_constitution.md`
- DOC-006: Official SpecKit constitution in `.specify/memory/constitution.md`
- DOC-007: Technical plan in `001-inv-plan.md`
- DOC-008: Canonical specification in `001-spec-drfic.md`

---

## 7. User Management (NEW - Added after Clarification)

- UR-001: Define visitor role (read-only access to public signals)
- UR-002: Define investor role (manages own portfolio, configures cores)
- UR-003: Define admin role (manages platform, user accounts)
- UR-004: Role-based access control for all endpoints

## 8. Data Management (NEW - Added after Clarification)

- DM-001: Market data in WebSocket format with <100ms latency
- DM-002: Signal history stored in MongoDB with reasoning logs
- DM-003: Portfolio data in Supabase with real-time sync
- DM-004: Idempotent synchronization across brokers

## 9. Notifications (NEW - Added after Clarification)

- N-001: Signal generation alerts (email + in-app)
- N-002: Portfolio change notifications
- N-003: Broker sync status alerts
- N-004: User-configurable notification preferences

## 10. Gaps Identified (Pending Clarification)

### Missing Definitions
- [ ] Broker fee structure and display
- [ ] Tax implications handling and reporting
- [ ] Data retention policy details
- [ ] Mobile-specific features beyond PWA
- [ ] Search and filtering capabilities for signals/portfolio

---

## 11. Clarification Questions (Max 5 - Answered)

1. **User Roles**: ✅ YES - Defined visitor (read-only), investor (active), admin (platform management)
2. **Data Management**: ✅ YES - Market data (WebSocket), Signal history (MongoDB), Portfolio (Supabase)
3. **Signal Details**: ✅ YES - Signal details view confirmed needed
4. **Editing Capabilities**: ❌ NO - Users cannot edit signals, only approve/reject
5. **Broker Integration**: ✅ Partial - IBKR + Alpaca defined, fee structure pending

---

**Status**: ✅ Ready for `/speckit.clarify` to identify additional gaps
