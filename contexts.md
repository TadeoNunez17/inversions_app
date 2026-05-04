# Contexts - Plataforma de Inversiones con IA (DR.FIC)

## Visión General
Plataforma de inversiones asistida por IA con **control humano estricto** (no auto-trading). Los usuarios evalúan señales generadas por IA, aprueban manualmente y ejecutan a través de brokers (IBKR, Alpaca).

**Principio clave**: Cada ejecución requiere aprobación humana explícita + MFA para acciones sensibles.

---

## Stack Tecnológico

### Frontend
- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **State Management**: Zustand (configurado, no implementado aún)
- **HTTP Client**: Axios (configurado, no implementado aún)
- **Estilo actual**: Inline styles + clases tipo Tailwind (bg-gray-50, text-sm, etc.) pero **Tailwind no está instalado**

### Backend
- **Runtime**: Node.js 22 LTS + TypeScript
- **Framework**: Express
- **Auth**: JWT + RBAC (viewer/trader/admin) + MFA
- **Databases**: Supabase (primario) + MongoDB (histórico, opcional)
- **Brokers**: IBKR (Interactive Brokers) + Alpaca adapters

### Monorepo
- Root: scripts con `concurrently` para dev/build/test
- Frontend: `frontend/`
- Backend: `backend/`

---

## Estado Actual de Implementación

### ✅ Lo que YA existe

#### Backend (Esqueleto funcional)
- Servidor Express en `src/index.ts` (puerto 3000)
- Middleware:
  - `authContext.ts`: Verificación JWT, payload: userId, role, mfaVerified
  - `mfaGuard.ts`: Protección MFA para endpoints sensibles
  - `rateLimit.ts`: Rate limiting (10 req/60s por usuario+endpoint)
- Rutas definidas:
  - `POST /api/execution/approve` - Crear orden de aprobación
  - `POST /api/execution/:id/approve` - Aprobar orden específica
  - `POST /api/execution/:id/reject` - Rechazar orden
  - `POST /api/execution/execute` - Ejecutar orden en broker
  - `GET /api/audit/history` - Historial paginado
  - `GET /api/audit/operation-detail/:id` - Detalle de operación
- Módulos de dominio (lógica de negocio en `src/modules/`):
  - `execution/` - approvalService, executionService, failureRecovery
  - `brokers/` - IBKRAdapter, AlpacaAdapter
  - `audit/` - historyService
  - `analytics/` - portfolioService
- Observabilidad: métricas de disponibilidad, cobertura MFA, frescura de datos
- Configuración: `tsconfig.json`, `.env` (template)

#### Frontend (Esqueleto funcional)
- Aplicación React con tres páginas principales:
  1. **ExecutionPanel**: Panel de ejecución con selección de broker (IBKR/Alpaca), manejo de rate limiting, versionado de órdenes
  2. **ApprovalFlow**: Flujo de aprobación con disclaimer de no-asesoría, checkbox de aceptación, botones aprobar/rechazar
  3. **AuditHistoryPage**: Historial de auditoría con filtros (instrumento, tipo de acción, fechas), tabla de eventos
- Hook `useAuth` (demo, no conectado a backend real)
- Configuración: `vite.config.ts` con proxy `/api` → backend, `tsconfig.json`

---

## Estructura de Archivos Clave

```
inversions_app/
├── frontend/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx (navegación entre 3 páginas)
│       ├── hooks/useAuth.ts
│       └── features/
│           ├── execution/
│           │   ├── ExecutionPanel.tsx (estado: PENDING_APPROVAL/APPROVED/SUBMITTED/FAILED)
│           │   └── ApprovalFlow.tsx (disclaimer, aprobación/rechazo)
│           └── audit/
│               ├── AuditHistoryPage.tsx (tabla con filtros)
│               └── OperationTimeline.tsx (no usado actualmente)
├── backend/
│   ├── .env
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts (entry point)
│       ├── middleware/
│       │   ├── authContext.ts (JWT)
│       │   ├── mfaGuard.ts
│       │   └── rateLimit.ts
│       ├── routes/
│       │   ├── execution/approve.ts
│       │   ├── execution/execute.ts
│       │   └── audit/history.ts
│       └── modules/
│           ├── execution/ (lógica de negocio)
│           ├── brokers/ (adaptadores IBKR/Alpaca)
│           └── audit/
└── contexts.md (este archivo)
```

---

## 🎨 Qué necesita Diseño (Para IA de Diseño)

### 1. Sistema de Diseño Faltante
- **No hay framework CSS instalado** (Tailwind clases están en el código pero no funcionan)
- **Estilos inline básicos** en App.tsx (solo para estructura)
- Necesita: Paleta de colores, tipografía, sistema de componentes, responsive design

### 2. Componentes que Requieren Diseño
#### ExecutionPanel
- Selector de broker (botones IBKR/Alpaca)
- Indicador de estado de orden (badges: green=APPROVED, gray=PENDING, red=FAILED)
- Botón de ejecución con estados (loading, disabled, cooldown)
- Mensajes de error/éxito

#### ApprovalFlow
- Card de información de señal (instrumento, tipo, cantidad, precio)
- Disclaimer destacado (amarillo/warning)
- Checkbox de aceptación
- Botones de acción (Aprobar verde / Rechazar rojo)

#### AuditHistoryPage
- Barra de filtros (4 campos: instrumento, tipo, fechas)
- Tabla de eventos con códigos de color según acción
- Paginación (aunque aún no implementada en backend)
- Estado vacío "No se encontraron eventos"

### 3. Flujo de Usuario (UX)
```
Señal IA → Ver detalles → ApprovalFlow (leer disclaimer, aceptar) → 
Aprobar → ExecutionPanel (seleccionar broker) → Ejecutar → 
Ver confirmación → Auditoría
```

### 4. Requisitos de Diseño Específicos
- **Tema**: Profesional, financiero, limpio (tipo dashboard de trading)
- **Colores sugeridos**: 
  - Primario: Azul (#2563eb)
  - Éxito: Verde (#16a34a)
  - Error: Rojo (#dc2626)
  - Advertencia: Amarillo (#ca8a04)
  - Fondo: Gris claro (#f8fafc)
- **Tipografía**: Sans-serif (system-ui, -apple-system)
- **Mobile**: Debe ser responsive (PWA, instalable en móvil)
- **Accesibilidad**: Contraste adecuado, focus states, aria-labels

### 5. Elementos Faltantes por Diseñar
- Login/Register page (aunque auth es demo)
- Dashboard principal con resumen de portafolio
- Vista de detalle de operación (OperationTimeline no está integrado)
- Notificaciones/toasts para feedback
- Loading skeletons (no hay loaders reales)
- Error boundaries

---

## 🚫 Lo que NO está implementado aún
- Conexión real a Supabase/MongoDB
- Integración real con brokers (IBKR/Alpaca)
- Zustand stores
- Axios interceptors
- Tests (Vitest configurado pero sin tests)
- PWA (service worker, manifest.json)
- MFA real (solo simulado)
- Paginación real en auditoría
- OperationTimeline integrado

---

## Cómo levantar el proyecto
```bash
# Instalar dependencias
npm run install:all

# Configurar backend/.env (copiar de .env.example si existe)
# Variables: SUPABASE_URL, SUPABASE_KEY, JWT_SECRET, broker keys

# Ejecutar en desarrollo
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

---

**Nota para IA de Diseño**: El proyecto es un esqueleto funcional. Las rutas y lógica de negocio están definidas, pero la UI es básica (solo estructura HTML + algunas clases de Tailwind no funcionando). Necesita un sistema de diseño completo, componentes visuales profesionales y flujo de usuario pulido.
