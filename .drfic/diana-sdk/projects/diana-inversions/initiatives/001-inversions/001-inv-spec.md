# Especificación: Plataforma de Inversiones Asistida por IA

**Iniciativa**: 001-inversions
**Proyecto**: diana-inversions
**Versión**: 1.0
**Estado**: Draft
**Fuente**: 001-inv-ucc.md + inv-constitution.md

---

## Objetivo

Desarrollar una plataforma web que centralice la gestión de inversiones, proporcione análisis predictivos mediante IA, y mantenga trazabilidad completa de decisiones, integrando datos de mercado en tiempo real y ejecución a través de brokers (IBKR, Alpaca).

---

## Alcance Funcional

### RF-001: Registro y Administración de Inversiones
- Formulario de registro con campos: activo, cantidad, precio, fecha, tipo de inversión
- CRUD completo de inversiones
- Historial de cambios y modificaciones
- Categorización por tipo de activo (acciones, opciones, bonos, etc.)

### RF-002: Visualización de Portafolio
- Dashboard con resumen de portafolio (valor total, ganancia/pérdida, diversificación)
- Gráficos de evolución temporal
- Métricas clave (ROIC, Sharpe ratio, drawdown máximo)
- Filtros por fecha, activo, tipo de inversión

### RF-003: Análisis Asistido por IA (Predictivo)
- Modelos de ML para predicción de tendencias
- Recomendaciones de compra/venta con nivel de confianza
- Análisis de sentimiento basado en noticias
- Backtesting de estrategias sugeridas

### RF-004: Generación de Reportes Auditables
- Reportes ejecutivos automáticos (PDF, Excel)
- Trazabilidad de decisiones con justificación de IA
- Historial de recomendaciones vs resultados reales
- Firma digital para auditoría

### RF-005: Trazabilidad de Cambios y Decisiones
- Log de cambios en inversiones con autor y timestamp
- Versionado de recomendaciones de IA
- Comentarios y notas asociadas a decisiones
- Exportación de traza completa para auditoría

### RF-006: Integración con Brokers (IBKR, Alpaca)
- Adaptador para Interactive Brokers TWS API
- Adaptador para Alpaca API
- Sincronización automática de posiciones y transacciones
- Ejecución de órdenes con aprobación humana obligatoria

### RF-007: Análisis Técnico
- Cálculo automático de soportes y resistencias
- Indicadores: RSI, MACD, Bollinger Bands, Medias Móviles
- Detección de patrones de velas
- Trazado de tendencias y canales

### RF-008: Análisis Fundamental
- Ratios financieros (P/E, P/B, ROE, Deuda/EBITDA)
- Comparación vs peers
- Análisis de estados financieros
- Proyecciones y valoración intrínseca

### RF-009: Señales de Compra/Venta con IA
- Confluencia de modelos: técnico + fundamental + sentimiento
- Score de recomendación (0-100)
- Alertas en tiempo real
- Justificación explicativa de la señal

### RF-010: Estrategias de Opciones
- Implementación de Wheel Strategy
- Straddle y Strangle
- Iron Condor y Butterfly
- Cálculo de Griegas (Delta, Gamma, Theta, Vega)
- Análisis de flujo institucional por strike/expiración

### RF-011: Flujo Institucional de Opciones
- Detección de flujos inusuales (unusual options activity)
- Análisis de open interest por strike
- Identificación de posiciones institucionales
- Correlación con movimientos de precio

### RF-012: Noticias en Tiempo Real
- Feed de noticias financieras (Bloomberg, Reuters, etc.)
- Análisis de impacto en activos del portafolio
- Sentiment analysis automático
- Alertas por eventos relevantes

### RF-013: Confluencia de Múltiples Modelos de IA
- Ensemble de modelos: LSTM, Random Forest, Gradient Boosting
- Pesos dinámicos según condiciones de mercado
- Backtesting de confluencia
- Ajuste automático de confianza

---

## Alcance No Funcional

### RNF-001: Latencia de Datos de Mercado < 100ms
- WebSockets para precios en tiempo real
- Caché inteligente para datos históricos
- CDN para distribución de datos
- Optimización de consultas a base de datos

### RNF-002: Disponibilidad 99.9% para Operaciones Críticas
- Arquitectura de alta disponibilidad
- Balanceadores de carga
- Failover automático entre regiones
- Monitoreo 24/7 con alertas

### RNF-003: Seguridad en Transacciones y Datos
- Encriptación TLS 1.3 en tránsito
- AES-256 para datos en reposo
- JWT con rotación de claves
- Cumplimiento PCI-DSS para datos de pago

### RNF-004: Interfaz Intuitiva y Responsive
- Framework UI con diseño responsive (React + Tailwind)
- Progressive Web App (PWA) para móviles
- Accesibilidad WCAG 2.1 AA
- Modo oscuro/claro

### RNF-005: Auditoría Completa de Acciones y Decisiones (CA-001)
- Log estructurado de todas las acciones
- Trazabilidad usuario → acción → resultado
- Exportación de logs para auditoría externa
- Retención de datos según normativa

### RNF-006: Soporte para Múltiples Usuarios y Portafolios
- Multi-tenancy con aislamiento de datos
- Gestión de roles (Admin, Trader, Viewer)
- Múltiples portafolios por usuario
- Compartición segura entre usuarios

---

## Restricciones

- **R1: Precisión de IA cuestionada** → Nivel de confianza transparente, supervisión humana obligatoria
- **R2: Limitaciones técnicas con brokers** → Adaptadores robustos, fallback a múltiples fuentes
- **R3: Resistencia al cambio del equipo** → Capacitación, interfaz intuitiva, periodo de transición
- **R4: Cumplimiento regulatorio (no advisory)** → Legal review, disclaimers claros, no advisory mode

---

## Supuestos

- Los usuarios tienen conocimientos básicos de inversiones
- Los brokers (IBKR, Alpaca) proporcionan APIs estables
- Los modelos de IA se entrenaron con datos históricos suficientes
- La infraestructura de nube soporta la carga estimada
- El equipo de negocio participará en validaciones iterativas

---

## Criterios de Éxito

- **CE-001**: Plataforma auditable con trazabilidad completa (CA-001) ✅
- **CE-002**: Información clara, confiable y en tiempo real (CA-002) ✅
- **CE-003**: Recomendaciones de IA requieren supervisión humana (CA-003) ✅
- **CE-004**: Trazabilidad de cambios y decisiones implementada (CA-004) ✅
- **CE-005**: Reportes ejecutivos automáticos (CA-005) ✅
- **CE-006**: Integración exitosa con al menos un broker (CA-006) ✅
- **CE-007**: Latencia de datos < 100ms (RNF-001) ✅
- **CE-008**: Disponibilidad 99.9% en operaciones críticas (RNF-002) ✅
- **CE-009**: Cumplimiento de normativa de asesoramiento (no advisory) (RNF-005) ✅

---

## Trazabilidad

| Requisito | Fuente | Sección Constitución |
|-----------|--------|---------------------|
| RF-001 a RF-013 | 001-inv-ucc.md L33-L45 | Inv-constitution Sección 4.1 a 4.7 |
| RNF-001 a RNF-006 | 001-inv-ucc.md L43-L48 | Inv-constitution Sección 3.1 a 3.4 |
| R1 a R4 | 001-inv-ucc.md L51-L55 | Inv-constitution Sección 7 |
| CA-001 a CA-006 | 001-inv-ucc.md L58-L63 | Inv-constitution Sección 8 (AC-001 a AC-009) |

---

## Coherencia con Spec Operativa

**Spec operativa:** `specs/001-plataforma-inversiones-ia/spec.md`

**Divergencias detectadas:**
- Spec operativa no incluye RF-011 (Flujo institucional de opciones)
- Spec operativa no especifica RNF-006 (Múltiples usuarios y portafolios)

**Recomendación:** Alinear spec operativa actualizando `specs/001-plataforma-inversiones-ia/spec.md` para incluir requisitos faltantes.

---

**Fin de la Especificación**
