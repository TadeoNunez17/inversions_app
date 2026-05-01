# Plan Técnico: Plataforma de Inversiones Asistida por IA

**Iniciativa**: 001-inversions
**Proyecto**: diana-inversions
**Versión**: 1.0
**Estado**: Draft
**Fuente**: inv-constitution.md + 001-inv-spec.md

---

## 1. Arquitectura del Sistema

### 1.1 Visión de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                    Cliente (PWA)                          │
│              React + Tailwind + PWA                      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS/WebSocket
┌────────────────────┴────────────────────────────────────┐
│                  API Gateway (Nginx)                     │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌───────▼────────┐
│  FrontEnd API  │      │  BackEnd API   │
│  (Next.js)    │      │  (FastAPI)     │
└───────┬────────┘      └───────┬────────┘
        │                         │
        │    ┌────────────────────┴────────────┐
        │    │                                  │
        │    │    ┌──────────────────────────┐  │
        │    │    │  Shared Libraries       │  │
        │    │    │  - UI Components       │  │
        │    │    │  - Domain Models      │  │
        │    │    │  - Utils/Helpers     │  │
        │    │    └──────────────────────────┘  │
        │    │                                  │
        │    │    ┌──────────────────────────┐  │
        │    │    │  Integration Layer      │  │
        │    │    │  - IBKR Adapter        │  │
        │    │    │  - Alpaca Adapter     │  │
        │    │    │  - News Feed Client   │  │
        │    │    └──────────────────────────┘  │
        │    │                                  │
        └────┴────┴──────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌───────▼────────┐
│  PostgreSQL    │      │  Redis Cache   │
│  (Primary DB) │      │  (Session/     │
│                │      │  Market Data)  │
└────────────────┘      └────────────────┘
```

### 1.2 Estructura del Repositorio

```
inversions_app/
├── .drfic/                    # Diana SDK artifacts
│   └── diana-sdk/
│       └── projects/
│           └── diana-inversions/
│               ├── inv-constitution.md
│               ├── governance/
│               ├── initiatives/
│               └── knowledge/
├── .specify/                  # Speckit artifacts
│   └── specs/
│       └── 001-plataforma-inversiones-ia/
├── apps/                      # Aplicaciones desplegables
│   ├── web/                 # FrontEnd (Next.js)
│   ├── api/                 # BackEnd API (FastAPI)
│   └── admin/              # Panel de administración
├── packages/                 # Paquetes compartidos
│   ├── ui/                 # Componentes UI compartidos
│   ├── core/               # Lógica de dominio
│   ├── brokers/             # Adaptadores de brokers
│   ├── ai-models/          # Modelos de IA
│   └── shared-types/       # Tipos TypeScript compartidos
├── infrastructure/           # Infraestructura como código
│   ├── docker/
│   ├── kubernetes/
│   └── terraform/
├── docs/                     # Documentación
└── tests/                   # Pruebas E2E
```

---

## 2. Fases de Implementación

### Fase 1: Fundación y Configuración (Semanas 1-2)

**Objetivo**: Configurar proyecto, CI/CD y arquitectura base.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T1.1 | Setup monorepo con Turborepo | Estructura creada, builds exitosos |
| T1.2 | Configurar Next.js (FrontEnd) | App base corriendo en localhost:3000 |
| T1.3 | Configurar FastAPI (BackEnd) | API base con documentación Swagger |
| T1.4 | Configurar PostgreSQL + Redis | Conexión exitosa desde BackEnd |
| T1.5 | Setup CI/CD con GitHub Actions | Pipeline ejecuta tests en PRs |
| T1.6 | Configurar ESLint, Prettier, TypeScript | Linting sin errores |

**Riesgos**:
- R3: Resistencia al cambio → Demo temprana de la interfaz

### Fase 2: Autenticación y Gestión de Usuarios (Semanas 3-4)

**Objetivo**: Implementar sistema de autenticación JWT y gestión de roles.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T2.1 | Implementar JWT con refresh tokens | Login/logout funcional |
| T2.2 | Roles: Admin, Trader, Viewer | Control de acceso por rol |
| T2.3 | Multi-tenancy (aislamiento) | Usuarios no ven datos ajenos |
| T2.4 | Perfil de usuario | Edición de datos personales |

**Trazabilidad**: RNF-003 (Seguridad), RNF-005 (Auditoría), RNF-006 (Multi-usuario)

### Fase 3: Gestión de Portafolio e Inversiones (Semanas 5-7)

**Objetivo**: CRUD de inversiones, visualización de portafolio y cálculo de métricas.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T3.1 | Modelo de datos: Portfolio, Asset, Transaction | Migraciones ejecutadas |
| T3.2 | API REST: CRUD de inversiones | Endpoints funcionando con validación |
| T3.3 | Dashboard con métricas (ROIC, Sharpe) | Gráficos renderizando datos reales |
| T3.4 | Historial de transacciones | Filtros y paginación funcionando |
| T3.5 | Categorización de activos | Clasificación por tipo funcional |

**Trazabilidad**: RF-001, RF-002, RNF-001 (Latencia < 100ms)

### Fase 4: Integración con Brokers (Semanas 8-10)

**Objetivo**: Conectar con IBKR y Alpaca para sincronización de posiciones.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T4.1 | Adaptador IBKR TWS API | Conexión exitosa, datos en tiempo real |
| T4.2 | Adaptador Alpaca API | Conexión exitosa, ejecución de órdenes |
| T4.3 | Sincronización automática de posiciones | Portafolio actualizado cada 60s |
| T4.4 | Ejecución con aprobación humana | Confirmación requerida antes de orden |
| T4.5 | Circuit breakers y fallbacks | Reintentos automáticos ante fallos |

**Trazabilidad**: RF-006, R2 (Limitaciones técnicas con brokers)

### Fase 5: Análisis Técnico y Fundamental (Semanas 11-13)

**Objetivo**: Implementar indicadores técnicos y análisis fundamental.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T5.1 | Cálculo de soportes/resistencias | Detección automática funcional |
| T5.2 | Indicadores: RSI, MACD, Bollinger | Valores calculados correctamente |
| T5.3 | Ratios financieros (P/E, ROE) | Cálculo desde estados financieros |
| T5.4 | Comparación vs peers | Benchmarking funcional |
| T5.5 | Detección de patrones de velas | Identificación automática |

**Trazabilidad**: RF-007, RF-008

### Fase 6: Modelos de IA y Señales (Semanas 14-17)

**Objetivo**: Implementar modelos de ML para predicciones y señales de compra/venta.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T6.1 | Ensemble: LSTM + Random Forest | Predicción de tendencia funcional |
| T6.2 | Señales con score de confianza | Score 0-100 mostrado en UI |
| T6.3 | Confluencia de modelos | Justificación explicativa visible |
| T6.4 | Backtesting de estrategias | Resultados históricos precisos |
| T6.5 | Ajuste dinámico de pesos | Adaptación según condiciones |

**Trazabilidad**: RF-003, RF-009, RF-013, R1 (Precisión de IA)

### Fase 7: Estrategias de Opciones y Flujo Institucional (Semanas 18-20)

**Objetivo**: Implementar estrategias de opciones y análisis de flujo institucional.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T7.1 | Wheel, Straddle, Iron Condor | Cálculo de griegas funcional |
| T7.2 | Análisis de open interest | Visualización por strike |
| T7.3 | Detección de flujos inusuales | Alertas automáticas |
| T7.4 | Correlación precio/flujo | Análisis de impacto |

**Trazabilidad**: RF-010, RF-011

### Fase 8: Noticias y Sentiment Analysis (Semanas 21-22)

**Objetivo**: Integrar feed de noticias y análisis de sentimiento.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T8.1 | Integración con Bloomberg/Reuters | Feed en tiempo real funcionando |
| T8.2 | Sentiment analysis automático | Score positivo/negativo/neutral |
| T8.3 | Impacto en activos del portafolio | Alertas de noticias relevantes |
| T8.4 | Alertas por eventos | Notificaciones push/email |

**Trazabilidad**: RF-012

### Fase 9: Reportes y Auditoría (Semanas 23-24)

**Objetivo**: Generar reportes ejecutivos y asegurar trazabilidad.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T9.1 | Reportes PDF/Excel | Exportación funcionando |
| T9.2 | Log de decisiones con IA | Trazabilidad completa |
| T9.3 | Firma digital para auditoría | Documentos firmados válidos |
| T9.4 | Historial de recomendaciones vs realidad | Comparativa visual |

**Trazabilidad**: RF-004, RF-005, CA-001 a CA-005

### Fase 10: Pruebas, Optimización y Despliegue (Semanas 25-26)

**Objetivo**: Pruebas completas, optimización de latencia y despliegue a producción.

| Tarea | Descripción | Criterio de Aceptación |
|-------|-------------|----------------------|
| T10.1 | Pruebas E2E con Playwright | Cobertura > 80% flujos críticos |
| T10.2 | Optimización de latencia < 100ms | Métricas cumplidas |
| T10.3 | High availability (99.9%) | Load balancing y failover |
| T10.4 | Despliegue a producción | App accesible vía HTTPS |
| T10.5 | Monitoreo y alertas | Dashboards de observabilidad |

**Trazabilidad**: RNF-001, RNF-002, RNF-004

---

## 3. Stack Tecnológico

### FrontEnd
- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **State**: Zustand
- **Charts**: Recharts / Lightweight Charts
- **PWA**: next-pwa
- **Forms**: React Hook Form + Zod

### BackEnd
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy + Alembic
- **Validation**: Pydantic v2
- **Auth**: PyJWT + bcrypt
- **Tasks**: Celery + Redis
- **WebSocket**: FastAPI WebSocket

### IA/ML
- **Frameworks**: TensorFlow / PyTorch
- **Libraries**: scikit-learn, pandas, numpy
- **NLP**: transformers (Hugging Face)
- **Backtesting**: backtrader

### Databases
- **Primary**: PostgreSQL 16
- **Cache**: Redis 7
- **Time-series**: InfluxDB (opcional para datos de mercado)

### Infrastructure
- **Container**: Docker + Docker Compose
- **Orchestration**: Kubernetes (prod)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana

---

## 4. Gestión de Riesgos

| Riesgo | Mitigación | Responsable |
|--------|------------|-------------|
| R1: Precisión de IA cuestionada | Nivel de confianza transparente, supervisión humana obligatoria | AI Team |
| R2: Limitaciones con brokers | Adaptadores robustos, fallback a múltiples fuentes | BackEnd Team |
| R3: Resistencia al cambio | Capacitación, interfaz intuitiva, periodo de transición | UX Team |
| R4: Cumplimiento regulatorio | Legal review, disclaimers claros, no advisory mode | Legal Team |

---

## 5. Criterios de Validación Técnica

### Seguridad
- ✅ JWT con rotación de claves cada 24h
- ✅ TLS 1.3 en tránsito, AES-256 en reposo
- ✅ Rate limiting: 100 req/min por usuario
- ✅ Auditoría completa de acciones críticas

### Resiliencia
- ✅ Circuit breakers para servicios externos
- ✅ Reintentos con backoff exponencial (max 5 intentos)
- ✅ Colas para operaciones asíncronas
- ✅ Failover automático entre regiones

### Observabilidad
- ✅ Logging estructurado (JSON) con correlation ID
- ✅ Métricas de latencia en Prometheus
- ✅ Tracing distribuido con OpenTelemetry
- ✅ Alertas proactivas en Grafana

### Rendimiento
- ✅ Latencia de datos < 100ms (p95)
- ✅ Disponibilidad 99.9% (SLA cumplido)
- ✅ Soporte para 100 usuarios concurrentes
- ✅ Timeouts configurados (API: 30s, DB: 5s)

---

## 6. Trazabilidad Plan/Spec

| Fase | Requisitos Cubiertos | Sección Spec |
|------|---------------------|--------------|
| F1 | Setup inicial | N/A |
| F2 | RNF-003, RNF-005, RNF-006 | Sección 3.3, 3.4 |
| F3 | RF-001, RF-002, RNF-001 | Sección 4.1, 4.2, 3.1 |
| F4 | RF-006, R2 | Sección 4.7, Riesgos |
| F5 | RF-007, RF-008 | Sección 4.3, 4.4 |
| F6 | RF-003, RF-009, RF-013, R1 | Sección 4.2, 4.9, 4.13, Riesgos |
| F7 | RF-010, RF-011 | Sección 4.10, 4.11 |
| F8 | RF-012 | Sección 4.12 |
| F9 | RF-004, RF-005, CA-001 a CA-005 | Sección 4.4, 4.5, 8 |
| F10 | RNF-001, RNF-002, RNF-004 | Sección 3.1, 3.2, 3.4 |

---

## 7. Siguientes Pasos (Hacia Speckit)

1. ✅ Ejecutar `/diana.skills` para generar skills del proyecto
2. ✅ Ejecutar `/diana.knowledge` para enriquecer knowledge base
3. ✅ **Plan técnico generado** (este documento)
4. ➡️ Ejecutar `/speckit.plan` para plan operativo de implementación
5. ➡️ Ejecutar `/speckit.tasks` para descomposición en tareas
6. ➡️ Ejecutar `/speckit.implement` para desarrollo asistido

---

**Fin del Plan Técnico**
