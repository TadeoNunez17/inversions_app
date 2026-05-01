# Backend - Plataforma de Inversiones con IA

API REST construida con Node.js + Express + TypeScript.

## 🎯 Propósito

Proporcionar los servicios de backend para:
1. **Generación de señales** mediante confluencia de fuentes
2. **Gobernanza de ejecución** con control humano estricto
3. **Auditoría completa** de todas las acciones
4. **Integración con brokers** (IBKR, Alpaca)

## 📂 Estructura

```
backend/
├── src/
│   ├── config/          # Configuración y políticas
│   │   ├── ficCommentPolicy.ts  # Política FIC bilingüe
│   │   ├── dataGovernance.ts  # Retención y partición
│   │   └── dependencySlo.ts   # SLOs de dependencias
│   ├── domain/          # Lógica de dominio
│   │   ├── orderLifecycle.ts  # Estados de orden
│   │   ├── auditEvent.ts     # Eventos de auditoría
│   │   └── disclaimer.ts      # Helpers de disclaimer
│   ├── middleware/      # Middlewares Express
│   │   ├── authContext.ts    # JWT verification
│   │   ├── mfaGuard.ts       # MFA challenge
│   │   └── rateLimit.ts      # Rate limiting
│   ├── modules/         # Módulos de negocio
│   │   ├── signals/         # Generación de señales
│   │   ├── execution/      # Ejecución y aprobación
│   │   ├── brokers/         # Adaptadores IBKR/Alpaca
│   │   ├── audit/           # Servicios de auditoría
│   │   └── analytics/       # Analítica de portafolio
│   ├── observability/   # Métricas y monitoreo
│   │   ├── historyMetrics.ts    # Latencia de consultas
│   │   ├── availabilitySlo.ts  # SLI/SLO disponibilidad
│   │   ├── mfaCoverage*.ts    # Cobertura MFA
│   │   └── marketFreshness.ts # Frescura de datos
│   ├── routes/          # Endpoints API
│   │   ├── signals/         # /api/signals/*
│   │   ├── execution/      # /api/execution/*
│   │   └── audit/           # /api/audit/*
│   └── jobs/            # Trabajos programados
│       └── monthlyAvailabilityReport.ts
├── .env.example       # Variables de entorno (template)
└── package.json
```

## 🔗 Endpoints API Principales

### Señales (US1)
- `POST /api/signals/evaluate` - Evaluar señal
- `GET /api/signals/details` - Detalles con evidencia

### Ejecución (US2)
- `POST /api/execution/approve` - Aprobar orden
- `POST /api/execution/:id/approve` - Aprobación específica
- `POST /api/execution/:id/reject` - Rechazar orden
- `POST /api/execution/execute` - Ejecutar orden

### Auditoría (US3)
- `GET /api/audit/history` - Historial paginado
- `GET /api/audit/operation-detail/:id` - Detalle de operación

## 🔒 Seguridad

### Autenticación y Autorización
- **JWT** con payload: `userId`, `role`, `mfaVerified`
- **RBAC**: `viewer`, `trader`, `admin`
- **MFA** obligatorio para acciones sensibles

### Controles de Ejecución
- **Rate Limiting**: 10 req/60s por usuario+endpoint
- **Cooldown**: 120s tras alcanzar límite (429)
- **Optimistic Locking**: `ORDER_VERSION_STALE` (409)
- **Control humano**: No ejecución sin aprobación previa

## 💾 Stores de Datos

### Supabase (Primario - Operacional)
- Identidad, sesión, roles
- Señales, propuestas, estados de ejecución
- Eventos de auditoría (>=365 días)

### MongoDB (Opcional - Histórico)
- Analítica de alto volumen
- Contexto extendido para IA

## 📊 Observabilidad

### Métricas Clave
- **Frescura de datos**: p50/p95/p99 por instrumento
- **Latencia historial**: Objetivo <3s (SC-003)
- **Disponibilidad**: >=99.5% mensual (SC-005)
- **Cobertura MFA**: 100% en endpoints sensibles (SC-008)

### Trazabilidad Completa
Cada evento incluye:
- `event_id`, `timestamp_utc`, `correlation_id`
- `user_id`, `role`, `mfa_context_id`
- `action_type`, `previous_state`, `new_state`
- `instrument`, `outcome_code`, `evidence_ref`

## 🔌 Contratos de API

Documentados en `.specify/specs/001-plataforma-inversiones-ia/contracts/`:
- `broker-adapter.md` - Interface y errores (IBKR/Alpaca)
- `signal-lifecycle.md` - Ciclo de vida completo
- `auth-context.md` - JWT, MFA, RBAC

## 🚀 Scripts

```bash
npm run dev          # Servidor de desarrollo (tsx watch)
npm run build        # Compilación TypeScript
npm start          # Ejecutar dist/ (producción)
npm test           # Pruebas con Vitest
npm run lint         # Lint con ESLint
```

## 📋 Variables de Entorno

Ver `.env.example` para la lista completa:
- `SUPABASE_URL`, `SUPABASE_KEY`
- `JWT_SECRET`
- `IBKR_API_URL`, `IBKR_API_KEY`
- `ALPACA_API_URL`, `ALPACA_API_KEY`, `ALPACA_API_SECRET`
