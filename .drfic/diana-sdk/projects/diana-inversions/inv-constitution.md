# Constitución de Proyecto - diana-inversions

**Proyecto:** diana-inversions  
**Alias:** inv  
**Versión:** 1.0  
**Fecha:** 2026-04-23  
**Estado:** Draft  
**Fuente:** 001-inv-ucc.md  

---

## 1. Propósito y Alcance

Esta constitución establece los principios arquitectónicos, restricciones y lineamientos normativos para el desarrollo de la **Plataforma de Inversiones Asistida por IA**.

**Propósito:** Proporcionar una plataforma que centralice la información de inversiones, ofrezca análisis predictivos mediante IA, y mantenga trazabilidad completa de decisiones.

**Alcance:** Desarrollo de plataforma web con integración a brokers (IBKR, Alpaca), análisis técnico y fundamental, señales de compra/venta generadas por IA, estrategias de opciones, noticias en tiempo real y generación de reportes auditables.

---

## 2. Principios Arquitectónicos

### 2.1 Confiabilidad y Precisión
- Datos de mercado deben tener latencia < 100ms (basado en RNF-001 del UCC)
- Disponibilidad 99.9% para operaciones críticas (RNF-002)
- Auditoría completa de acciones y decisiones (RNF-005, CA-001)

### 2.2 Transparencia y Supervisión Humana
- Recomendaciones de IA NO deben ser automáticas sin supervisión (CA-003 del UCC)
- Trazabilidad clara de decisiones y cambios (CA-004)
- Reportes ejecutivos generados automáticamente (CA-005)

### 2.3 Integración y Escalabilidad
- Integración con brokers IBKR y Alpaca (RF-006 del UCC)
- Soporte para múltiples usuarios y portafolios (RNF-006)
- Arquitectura preparada para agregar nuevos brokers y fuentes de datos

### 2.4 Cumplimiento y Ética
- Cumplimiento regulatorio de asesoramiento financiero (no advisory) (R4 del UCC)
- Seguridad en transacciones y datos de portafolio (RNF-003)
- Disclaimers claros sobre recomendaciones de IA

---

## 3. Restricciones Técnicas

### 3.1 Baja Latencia
- Datos de mercado en tiempo real < 100ms (RNF-001 del UCC)
- Señales de compra/venta generadas rápidamente
- Actualización de dashboards sin retraso perceptible

### 3.2 Disponibilidad y Resiliencia
- Disponibilidad 99.9% para operaciones críticas (RNF-002)
- Mecanismos de respaldo ante fallos de brokers
- Recuperación automática de conexiones interrumpidas

### 3.3 Seguridad
- Encriptación de datos sensibles en tránsito y reposo
- Autenticación robusta para acceso a portafolios
- Auditoría de accesos y operaciones críticas (RNF-005)

### 3.4 Cumplimiento Regulatorio
- No actuar como asesor financiero (disclaimer obligatorio)
- Retención de datos según normativa mexicana (R2 del UCC)
- Trazabilidad completa para auditorías

---

## 4. Lineamientos de Diseño y Desarrollo

### 4.1 Gestión de Inversiones (RF-001, RF-002)
- Registro de inversiones con metadatos completos
- Visualización de portafolio con métricas clave
- Histórico de transacciones y cambios

### 4.2 Análisis Asistido por IA (RF-003, RF-009)
- Análisis predictivo de tendencias
- Señales de compra/venta con nivel de confianza
- Confluencia de múltiples modelos de IA (RF-013)

### 4.3 Análisis Técnico y Fundamental (RF-007, RF-008)
- Soportes, resistencias, tendencias
- Indicadores técnicos estándar
- Análisis de fundamentos de activos

### 4.4 Estrategias de Opciones (RF-010, RF-011)
- Wheel, Straddle, Iron Condor
- Flujo institucional por strike/expiración
- Análisis de riesgo-recompensa

### 4.5 Noticias en Tiempo Real (RF-012)
- Feed de noticias con impacto en inversiones
- Alertas basadas en eventos relevantes
- Sentiment analysis automático

### 4.6 Reportes y Auditoría (RF-004, RF-005, CA-001)
- Reportes ejecutivos automáticos
- Trazabilidad de decisiones y cambios
- Exportación en formatos estándar

### 4.7 Integración con Brokers (RF-006)
- Adaptadores para IBKR y Alpaca
- Sincronización de posiciones y transacciones
- Ejecución de órdenes con aprobación humana

---

## 5. Estándares de Código y Documentación

### 5.1 Código
- Arquitectura limpia y modular
- Cobertura de pruebas > 80% en lógica crítica
- Documentación de APIs con OpenAPI
- Uso de patrones de diseño apropiados

### 5.2 Documentación
- README con instalación y despliegue
- Documentación de arquitectura (ADRs)
- Manual de usuario para analistas
- Documentación de integración con brokers

---

## 6. Requisitos de Seguridad, Resiliencia y Observabilidad

### 6.1 Seguridad
- Autenticación multi-factor para operaciones críticas
- Rate limiting para prevenir abusos
- Validación estricta de entradas
- Protección contra ataques OWASP Top 10

### 6.2 Resiliencia
- Circuit breakers para servicios externos
- Degradación grácil ante fallos parciales
- Reintentos con backoff exponencial
- Colas para operaciones asíncronas

### 6.3 Observabilidad
- Logging estructurado de decisiones de IA
- Métricas de latencia de datos de mercado
- Tracing de operaciones críticas
- Alertas proactivas ante anomalías

---

## 7. Gestión de Riesgos

| Riesgo | Mitigación |
|--------|------------|
| R1: Precisión de IA cuestionada | Nivel de confianza transparente, supervisión humana obligatoria |
| R2: Limitaciones técnicas con brokers | Adaptadores robustos, fallback a múltiples fuentes |
| R3: Resistencia al cambio | Capacitación, interfaz intuitiva, periodo de transición |
| R4: Cumplimiento regulatorio | Legal review, disclaimers claros, no advisory mode |

---

## 8. Criterios de Aceptación Constitucionales

- AC-001: Plataforma auditable con trazabilidad completa (alineado con CA-001)
- AC-002: Información clara, confiable y en tiempo real (alineado con CA-002)
- AC-003: Recomendaciones de IA requieren supervisión humana (alineado con CA-003)
- AC-004: Trazabilidad de cambios y decisiones implementada (alineado con CA-004)
- AC-005: Reportes ejecutivos automáticos (alineado con CA-005)
- AC-006: Integración exitosa con al menos un broker (alineado con CA-006)
- AC-007: Latencia de datos < 100ms
- AC-008: Disponibilidad 99.9% en operaciones críticas
- AC-009: Cumplimiento de normativa de asesoramiento (no advisory)

---

## 9. Trazabilidad UCC → Constitución

| Sección UCC | Referencia | Sección Constitución |
|-------------|------------|---------------------|
| Título y Descripción | UCC-001 L5-L13 | Sección 1 |
| Justificación | UCC-001 L16-L21 | Sección 1, 2.2 |
| Impacto Esperado | UCC-001 L24-L29 | Sección 2.3 |
| RF-001 a RF-013 | UCC-001 L33-L45 | Sección 4.1 a 4.7 |
| RNF-001 a RNF-006 | UCC-001 L43-L48 | Sección 3.1 a 3.4 |
| R1 a R4 | UCC-001 L51-L55 | Sección 7 |
| CA-001 a CA-006 | UCC-001 L58-L63 | Sección 8 (AC-001 a AC-009) |

---

## 10. Siguientes Pasos

1. Ejecutar `/diana.specify` para generar la especificación canónica
2. Ejecutar `/diana.skills` para identificar y generar skills del proyecto
3. Ejecutar `/diana.knowledge` para enriquecer la base de conocimiento
4. Ejecutar `/diana.plan` para generar el plan técnico

---

**Fin de la Constitución**
