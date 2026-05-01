# User Change Canvas - 001-inv-ucc

**ID:** 001-inv-ucc
**Título:** Plataforma de Inversiones Asistida por IA
**Fecha:** 2026-04-23
**Autor:** Usuario de Negocio – Área de Inversiones
**Proyecto:** diana-inversions
**Alias:** inv
**Prioridad:** Alta

## Descripción del Cambio

Se requiere desarrollar una plataforma que permita gestionar, analizar y dar seguimiento a inversiones utilizando apoyo de inteligencia artificial, para mejorar la toma de decisiones y la visibilidad del portafolio.

## Justificación

Actualmente:
- La información de inversiones está dispersa
- No existen análisis predictivos ni recomendaciones asistidas
- No hay trazabilidad clara de decisiones y cambios
- Los reportes requieren mucho esfuerzo manual

## Impacto Esperado

- Centralización de información de inversiones
- Mejora en la toma de decisiones mediante IA
- Trazabilidad completa de decisiones
- Reportes automáticos y auditables
- Reducción de esfuerzo manual en reportes

## Requisitos Nuevos o Modificados

### Funcionales
- RF-001: Registro y administración de inversiones
- RF-002: Visualización de información relevante del portafolio
- RF-003: Análisis asistido por IA (predictivo)
- RF-004: Generación de reportes claros y auditables
- RF-005: Trazabilidad de cambios y decisiones
- RF-006: Integración con brokers (IBKR, Alpaca)
- RF-007: Análisis técnico (soportes, resistencias, tendencias)
- RF-008: Análisis fundamental
- RF-009: Señales de compra/venta con IA
- RF-010: Estrategias de opciones (Wheel, Straddle, Iron Condor)
- RF-011: Flujo institucional por strike/expiración
- RF-012: Noticias en tiempo real con impacto
- RF-013: Confluencia de múltiples modelos de IA

### No Funcionales
- RNF-001: Latencia de datos de mercado < 100ms
- RNF-002: Disponibilidad 99.9% para operaciones críticas
- RNF-003: Seguridad en transacciones y datos
- RNF-004: Interfaz intuitiva y responsive
- RNF-005: Auditoría completa de acciones y decisiones
- RNF-006: Soporte para múltiples usuarios y portafolios

## Riesgos Identificados

- R1: Precisión de IA cuestionada por usuarios
- R2: Limitaciones técnicas con brokers
- R3: Resistencia al cambio del equipo
- R4: Cumplimiento regulatorio (no advisory)

## Criterios de Aceptación

- CA-001: Plataforma debe ser auditable
- CA-002: Información clara, confiable y en tiempo real
- CA-003: Recomendaciones de IA NO automáticas sin supervisión humana
- CA-004: Trazabilidad de cambios y decisiones
- CA-005: Reportes ejecutivos automáticos
- CA-006: Integración exitosa con al menos un broker

## Trazabilidad

- Ticket relacionado: 001-inv-tkt.md
- Iniciativa: 001-inversions
- Siguiente paso: /diana.constitution
