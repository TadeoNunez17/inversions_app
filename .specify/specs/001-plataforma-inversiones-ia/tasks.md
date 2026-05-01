# Tasks: Plataforma de Inversiones con IA

**Input**: Design documents from `/specs/001-plataforma-inversiones-ia/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`

**Tests**: No se agregan tareas de test-first porque la spec no pide enfoque TDD explicito. Cada historia conserva criterio de prueba independiente para validacion funcional.

**Organization**: Tasks grouped by user story for independent implementation and validation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable task (different files, no unmet dependency)
- **[Story]**: User story mapping (`US1`, `US2`, `US3`)
- Include exact file paths in every task

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparar estructura base y convenciones de trabajo para frontend/backend/tests.

- [x] T001 Create monorepo app folders and baseline README files in frontend/README.md and backend/README.md
- [x] T002 [P] Initialize frontend workspace skeleton and scripts in frontend/package.json
- [x] T003 [P] Initialize backend workspace skeleton and scripts in backend/package.json
- [x] T004 [P] Add root quality scripts for lint and test orchestration in package.json
- [x] T005 [P] Create shared environment template for auth, broker and observability keys in backend/.env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Cimientos obligatorios para todas las historias (auth, gobernanza, auditoria, contratos, observabilidad).

**CRITICAL**: No iniciar historias hasta cerrar esta fase.

- [x] T006 Implement JWT verification and auth context middleware in backend/src/middleware/authContext.ts (FR-012, PL-001)
- [x] T007 [P] Implement RBAC authorization guard for viewer/trader/admin in backend/src/middleware/rbac.ts (FR-017, PL-001)
- [x] T008 [P] Implement MFA challenge verification middleware for sensitive actions in backend/src/middleware/mfaGuard.ts (FR-019, PL-001)
- [x] T009 Define canonical order lifecycle types and transitions in backend/src/domain/orderLifecycle.ts (FR-009, FR-016, PL-009)
- [x] T010 [P] Define audit event schema including mandatory trace fields in backend/src/domain/auditEvent.ts (FR-006, FR-011, PL-006)
- [x] T011 [P] Implement disclaimer recording contract helper in backend/src/domain/disclaimer.ts (FR-013, PL-012)
- [x] T012 Implement rate-limit policy for sensitive endpoints with cooldown payload in backend/src/middleware/rateLimit.ts (FR-015, PL-005)
- [x] T013 [P] Implement optimistic locking utility with ORDER_VERSION_STALE mapping in backend/src/domain/versioning.ts (FR-016, PL-009)
- [x] T014 [P] Implement market-data freshness metric primitives (p50/p95/p99) in backend/src/observability/marketFreshness.ts (SC-006, PL-011)
- [x] T015 Create retention policy config and data-store partition map in backend/src/config/dataGovernance.ts (FR-007, PL-003)
- [x] T016 Create dependency resilience policy (timeouts, retries, degraded modes) in backend/src/config/dependencySlo.ts (FR-018, PL-002, PL-010)

**Checkpoint**: Foundation ready, user stories can start.

---

## Phase 3: User Story 1 - Evaluar Oportunidades con Confluencia (Priority: P1) 🎯 MVP

**Goal**: Generar señales explicables por confluencia de fuentes activas con evidencia trazable.

**Independent Test**: Usuario selecciona instrumentos y fuentes activas, ejecuta evaluacion, recibe señal BUY/SELL/HOLD con confianza y evidencia por fuente sin tocar ejecucion operativa.

### Implementation for User Story 1

- [x] T017 [P] [US1] Implement source configuration aggregate for enable/disable and weight in backend/src/modules/signals/sourceConfig.ts (FR-003, PL-001)
- [x] T018 [P] [US1] Implement confluence engine service for BUY/SELL/HOLD recommendation in backend/src/modules/signals/confluenceEngine.ts (FR-001, FR-010)
- [x] T019 [P] [US1] Implement explainability assembler linking evidence rationale in backend/src/modules/signals/explainability.ts (FR-002, SC-001)
- [x] T020 [US1] Implement signal evaluation endpoint and response contract in backend/src/routes/signals/evaluate.ts (FR-001, FR-002, FR-003)
- [x] T021 [US1] Implement signal details endpoint with evidence breakdown in backend/src/routes/signals/details.ts (FR-002, FR-006)
- [x] T022 [P] [US1] Implement frontend signal evaluation page and filters in frontend/src/features/signals/SignalEvaluationPage.tsx (SC-004)
- [x] T023 [P] [US1] Implement frontend evidence detail panel for source rationale in frontend/src/features/signals/SignalEvidencePanel.tsx (FR-002, SC-001)
- [x] T024 [US1] Wire frontend signal services to API contracts in frontend/src/services/signals/signalApi.ts (FR-001, FR-002)
- [x] T025 [US1] Add audit emission for SIGNAL_GENERATED and related trace fields in backend/src/modules/signals/signalAudit.ts (FR-006, PL-006)

**Checkpoint**: US1 functional and independently testable.

---

## Phase 4: User Story 2 - Mantener Control Humano en la Ejecucion (Priority: P1)

**Goal**: Garantizar que ninguna ejecucion ocurra sin aprobacion humana explicita, MFA valida y control de concurrencia.

**Independent Test**: Propuesta operativa no se ejecuta sin aprobacion; con aprobacion valida y version vigente se habilita envio asistido a broker; en fallo regresa a aprobacion obligatoria.

### Implementation for User Story 2

- [x] T026 [P] [US2] Implement proposal approval/rejection service with MFA validation in backend/src/modules/execution/approvalService.ts (FR-004, FR-005, FR-019)
- [x] T027 [P] [US2] Implement assisted execution orchestrator enforcing approved-only transitions in backend/src/modules/execution/executionService.ts (FR-004, FR-005, FR-009)
- [x] T028 [P] [US2] Implement broker adapter interfaces and status normalization in backend/src/modules/brokers/brokerAdapter.ts (FR-008, FR-014, PL-002)
- [x] T029 [P] [US2] Implement IBKR adapter with idempotency and error mapping in backend/src/modules/brokers/ibkrAdapter.ts (FR-008, PL-002)
- [x] T030 [P] [US2] Implement Alpaca adapter with idempotency and error mapping in backend/src/modules/brokers/alpacaAdapter.ts (FR-008, PL-002)
- [x] T031 [US2] Implement approval endpoint with disclaimer and MFA evidence capture in backend/src/routes/execution/approve.ts (FR-013, FR-019, PL-012)
- [x] T032 [US2] Implement execute endpoint with rate-limit and optimistic locking enforcement in backend/src/routes/execution/execute.ts (FR-015, FR-016, PL-005, PL-009)
- [x] T033 [US2] Implement failed-attempt transition to PENDING_APPROVAL in backend/src/modules/execution/failureRecovery.ts (FR-009, PL-010)
- [x] T034 [P] [US2] Implement frontend approval flow UI with disclaimer acknowledgement in frontend/src/features/execution/ApprovalFlow.tsx (FR-004, FR-013)
- [x] T035 [P] [US2] Implement frontend execution action panel with conflict and cooldown handling in frontend/src/features/execution/ExecutionPanel.tsx (FR-015, FR-016)
- [x] T036 [US2] Emit HUMAN_APPROVED, EXECUTION_SUBMITTED, EXECUTION_FAILED audit events in backend/src/modules/execution/executionAudit.ts (FR-006, SC-002, PL-006)

**Checkpoint**: US2 functional and independently testable.

---

## Phase 5: User Story 3 - Auditar Decisiones y Resultados (Priority: P2)

**Goal**: Exponer historial completo y auditable del ciclo señal -> decision -> ejecucion con tiempos de consulta objetivo.

**Independent Test**: Usuario consulta historial por operacion/senal y obtiene eventos, evidencia y causas de fallo dentro del objetivo de rendimiento.

### Implementation for User Story 3

- [x] T037 [P] [US3] Implement audit-history query service with correlation filters in backend/src/modules/audit/historyService.ts (FR-011, PL-006)
- [x] T038 [P] [US3] Implement portfolio analytics aggregation for auditable outcomes in backend/src/modules/analytics/portfolioService.ts (FR-011, PL-007)
- [x] T039 [US3] Implement history API endpoint with pagination and trace completeness metadata in backend/src/routes/audit/history.ts (FR-011, SC-003)
- [x] T040 [US3] Implement operation-detail API endpoint for failed-attempt diagnostics in backend/src/routes/audit/operationDetail.ts (FR-009, FR-011)
- [x] T041 [P] [US3] Implement frontend audit history dashboard with filters and latency hints in frontend/src/features/audit/AuditHistoryPage.tsx (SC-003)
- [x] T042 [P] [US3] Implement frontend operation timeline view for decision and execution events in frontend/src/features/audit/OperationTimeline.tsx (FR-011, PL-006)
- [x] T043 [US3] Implement service-level metrics instrumentation for history latency and completeness in backend/src/observability/historyMetrics.ts (SC-003, PL-011)

**Checkpoint**: US3 functional and independently testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cerrar trazabilidad documental FR/SC/PL, hardening operativo y validacion final.

- [x] T044 [P] Update contracts with explicit 409 ORDER_VERSION_STALE and 429 cooldown payload in specs/001-plataforma-inversiones-ia/contracts/broker-adapter.md
- [x] T045 [P] Update lifecycle contract with mandatory trace field set and disclaimer events in specs/001-plataforma-inversiones-ia/contracts/signal-lifecycle.md
- [x] T046 [P] Update auth contract with MFA evidence invariants for trader/admin actions in specs/001-plataforma-inversiones-ia/contracts/auth-context.md
- [x] T047 Add FR/SC/PL traceability matrix in specs/001-plataforma-inversiones-ia/plan.md for implemented tasks mapping (PL-001..PL-012)
- [x] T048 Run quickstart validation and document execution notes in specs/001-plataforma-inversiones-ia/quickstart.md
- [x] T049 [P] Define SLI/SLO availability monthly and dashboard in backend/src/observability/availabilitySlo.ts (SC-005, PL-011)
- [x] T050 Implement monthly consolidation job and export report in backend/src/jobs/monthlyAvailabilityReport.ts (SC-005)
- [x] T051 [P] Define RTO/RPO runbook in specs/001-plataforma-inversiones-ia/quickstart.md (SC-007, FR-018)
- [x] T052 Execute controlled simulation and record evidence in specs/001-plataforma-inversiones-ia/quickstart.md (SC-007)
- [x] T053 [P] Implement MFA coverage verifier at 100% for sensitive actions in backend/src/observability/mfaCoverageAudit.ts (SC-008, FR-019)
- [x] T054 Implement MFA coverage report by role and endpoint in backend/src/observability/mfaCoverageReport.ts (SC-008)
- [x] T055 [P] Create ownership checklist for structural compliance in specs/001-plataforma-inversiones-ia/checklists/plan-quality.md (PL-004)
- [x] T056 Implement structural no-regression gate in scripts/validate-structure.ps1 (PL-008)
- [x] T057 [P] Normalize technical artifact writing to Spanish in specs/001-plataforma-inversiones-ia/tasks.md (Constitution-Language)
- [x] T058 Implement FIC: bilingual comment compliance checklist in backend/src/config/ficCommentPolicy.ts (Constitution-FIC)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: start immediately.
- **Phase 2 (Foundational)**: depends on Phase 1 and blocks all user stories.
- **Phase 3 (US1)**: depends on Phase 2; MVP candidate.
- **Phase 4 (US2)**: depends on Phase 2; can run in parallel with US1 after foundation, but production release should include US1 first.
- **Phase 5 (US3)**: depends on Phase 2 and events/data from US1+US2.
- **Phase 6 (Polish)**: depends on targeted stories completion.

### User Story Dependencies

- **US1 (P1)**: no dependency on other stories after foundational.
- **US2 (P1)**: can start after foundational; integrates with signal outputs but remains independently testable.
- **US3 (P2)**: requires audit emissions from US1 and US2 for full value.

### Task Dependency Highlights

- T006 -> T007/T008 -> T026/T031/T032.
- T009 + T013 -> T032/T033.
- T010 -> T025/T036/T037.
- T014 -> T043.
- T016 -> T028/T029/T030/T033.
- T018/T019 -> T020/T021 -> T024.

---

## Parallel Opportunities

- Setup: T002, T003, T004, T005 in parallel after T001.
- Foundation: T007, T008, T010, T011, T013, T014, T015, T016 in parallel after T006/T009 prerequisites.
- US1: T017, T018, T019, T022, T023 in parallel; then T020/T021; then T024/T025.
- US2: T026, T028, T029, T030, T034, T035 in parallel; then T031/T032; then T033/T036.
- US3: T037, T038, T041, T042 in parallel; then T039/T040; then T043.

## Parallel Example: User Story 1

```bash
# Parallel work batch A (US1 core)
Task: "T017 [US1] source config service in backend/src/modules/signals/sourceConfig.ts"
Task: "T018 [US1] confluence engine in backend/src/modules/signals/confluenceEngine.ts"
Task: "T019 [US1] explainability assembler in backend/src/modules/signals/explainability.ts"
Task: "T022 [US1] evaluation page in frontend/src/features/signals/SignalEvaluationPage.tsx"
Task: "T023 [US1] evidence panel in frontend/src/features/signals/SignalEvidencePanel.tsx"

# Sequential follow-up
Task: "T020 [US1] evaluate endpoint"
Task: "T021 [US1] details endpoint"
Task: "T024 [US1] frontend API wiring"
Task: "T025 [US1] signal audit emission"
```

## Parallel Example: User Story 2

```bash
# Parallel work batch A (US2 adapters and approval UX)
Task: "T026 [US2] approval service"
Task: "T028 [US2] broker adapter contract"
Task: "T029 [US2] IBKR adapter"
Task: "T030 [US2] Alpaca adapter"
Task: "T034 [US2] approval flow UI"
Task: "T035 [US2] execution panel UI"

# Sequential follow-up
Task: "T031 [US2] approve endpoint"
Task: "T032 [US2] execute endpoint"
Task: "T033 [US2] fail-fast recovery"
Task: "T036 [US2] execution audit events"
```

## Parallel Example: User Story 3

```bash
# Parallel work batch A (US3 read models and UI)
Task: "T037 [US3] history service"
Task: "T038 [US3] portfolio analytics"
Task: "T041 [US3] audit history page"
Task: "T042 [US3] operation timeline"

# Sequential follow-up
Task: "T039 [US3] history endpoint"
Task: "T040 [US3] operation detail endpoint"
Task: "T043 [US3] history metrics"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1) fully.
3. Validate independent test for US1.
4. Demo/deploy MVP signal evaluation capability.

### Incremental Delivery

1. Add US2 for human approval and assisted execution governance.
2. Add US3 for full audit and operational analytics.
3. Finish with Phase 6 cross-cutting updates and quickstart validation.

### Suggested MVP Scope

- **MVP scope**: Phase 1 + Phase 2 + Phase 3 (T001-T025).
- **Rationale**: entrega valor central de confluencia explicable sin depender de ejecucion asistida completa.

## Notes

- Trazabilidad de cierre: cada tarea clave incluye referencia FR/SC/PL en descripcion.
- Evitar cambiar misma ruta en paralelo fuera de tareas marcadas [P].
- Commit recomendado por bloque logico de tareas completadas.
