# Plataforma de Inversiones con IA (DR.FIC)

Sistema de inversiones asistido por IA con modelo semi-automático: la IA analiza y recomienda, pero **toda ejecución requiere aprobación humana explícita**.

## 🎯 Objetivo

Proporcionar señales de inversión explicables mediante confluencia de múltiples fuentes, con gobernanza estricta de ejecución y auditoría completa.

## 🏗️ Estructura del Proyecto

```
inversions_app/
├── frontend/          # Aplicación web PWA (React + TypeScript)
├── backend/           # API REST (Node.js + Express)
├── specs/            # Artefactos de diseño (spec, plan, contracts)
├── scripts/           # Scripts de validación y utilidades
└── .drfic/           # Conocimiento y gobernanza (Diana SDK)
```

## 📦 Componentes Principales

### Frontend (PWA React)
- **SignalEvaluationPage**: Evaluación de señales BUY/SELL/HOLD
- **ApprovalFlow**: Flujo de aprobación con disclaimer
- **ExecutionPanel**: Panel de ejecución con cooldown
- **AuditHistoryPage**: Historial de auditoría y timeline

### Backend (API REST)
- **Auth**: JWT + RBAC + MFA (middleware)
- **Signals**: Motor de confluencia y explicabilidad
- **Execution**: Orquestador de ejecución asistida
- **Audit**: Servicios de historial y trazabilidad
- **Brokers**: Adaptadores IBKR y Alpaca

## 🚀 Requisitos Funcionales Clave

| Código | Descripción |
|--------|-------------|
| FR-001 | Generar señales BUY/SELL/HOLD |
| FR-004 | Control humano obligatorio (no auto-trading) |
| FR-005 | Aprobación previa requerida |
| FR-006 | Trazabilidad completa (auditoría) |
| FR-008 | Integración IBKR y Alpaca |
| FR-009 | Control de estado y fallos |
| FR-013 | Disclaimer de no-asesoría |
| FR-015 | Rate limiting con cooldown |
| FR-016 | Optimistic locking (versión) |

## 🎯 Criterios de Éxito

- **SC-001**: Señales explicables con evidencia
- **SC-002**: 100% ejecuciones con aprobación humana
- **SC-003**: Consultas de historial <3s
- **SC-005**: Disponibilidad mensual >=99.5%
- **SC-006**: Frescura de datos p95 <=1s
- **SC-008**: 100% acciones sensibles con MFA

## 🛠️ Stack Tecnológico

**Frontend:**
- React 18 + TypeScript
- Vite
- Zustand (state management)
- TailwindCSS
- TradingView Lightweight Charts

**Backend:**
- Node.js 22 LTS
- Express
- Supabase (store operacional)
- MongoDB (histórico/contexto IA)
- JWT + bcrypt

**Observabilidad:**
- Métricas p50/p95/p99
- SLI/SLO (disponibilidad)
- Trazabilidad completa en cada evento

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm run install:all

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env
# Editar backend/.env con credenciales

# 3. Ejecutar en desarrollo
npm run dev
```

## 🧪 Scripts Disponibles

```bash
npm run dev          # Frontend + Backend en desarrollo
npm run build        # Build de producción
npm test           # Ejecutar pruebas
npm run lint         # Lint de código
npm run deploy:staging  # Despliegue a staging
```

## 📖 Documentación

- **Spec**: `.specify/specs/001-plataforma-inversiones-ia/spec.md`
- **Plan**: `.specify/specs/001-plataforma-inversiones-ia/plan.md`
- **Tasks**: `.specify/specs/001-plataforma-inversiones-ia/tasks.md`
- **Contracts**: `.specify/specs/001-plataforma-inversiones-ia/contracts/`

## ✅ Estado Actual

- ✅ MVP Completado (T001-T025)
- ✅ US2 Implementado (T026-T036)
- ✅ US3 Implementado (T037-T043)
- ✅ Polish Completado (T044-T058)
- ✅ 58/58 Tareas completadas (100%)
- ✅ Checklists PASS (18/18)

## 🔒 Constitución

Este proyecto sigue estrictamente la constitución definida en:
- `.drfic/diana-sdk/sdk/constitution.md`
- `.specify/memory/constitution.md`

**Principios clave:**
- Idioma: Español técnico
- Control humano obligatorio
- Auditoría completa
- Comentarios FIC bilingües (español/inglés)

## 📝 Licencia

MIT License - Ver LICENSE para detalles.
