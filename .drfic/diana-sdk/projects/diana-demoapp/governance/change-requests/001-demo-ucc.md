# User Change Canvas - 001-demo-ucc

**ID:** 001-demo-ucc
**Título:** Plataforma de Gestión de Tareas
**Fecha:** 2026-05-01
**Autor:** Equipo de Usuarios - Departamento de Operaciones
**Proyecto:** diana-demoapp
**Alias:** demo
**Prioridad:** Alta

## Descripción del Cambio

Se requiere desarrollar una aplicación web para la gestión de tareas y proyectos del equipo de operaciones. La aplicación debe permitir crear, asignar, dar seguimiento y completar tareas, con notificaciones en tiempo real y reportes de productividad.

## Justificación

El equipo de operaciones actualmente utiliza hojas de cálculo para gestionar tareas, lo que genera:
- Falta de visibilidad en tiempo real del estado de las tareas
- Dificultad para asignar y reasignar tareas según carga de trabajo
- Pérdida de historial y trazabilidad de cambios
- Imposibilidad de generar reportes automáticos de productividad

## Impacto Esperado

- Mejora en la visibilidad y control de tareas del equipo
- Reducción estimada del 30% en tiempo de coordinación diaria
- Trazabilidad completa de cambios y decisiones
- Reportes automáticos para gerencia
- Escalabilidad para otros departamentos en fase futura

## Requisitos Nuevos o Modificados

### Funcionales
- RF-001: Crear tareas con título, descripción, fecha límite y prioridad
- RF-002: Asignar tareas a miembros del equipo
- RF-003: Cambiar estado de tareas (Pendiente, En Progreso, En Revisión, Completada)
- RF-004: Comentarios en tareas para comunicación del equipo
- RF-005: Notificaciones en tiempo real por email y en-app
- RF-006: Dashboard con tareas asignadas y próximas a vencer
- RF-007: Reportes de productividad por usuario y proyecto
- RF-008: Gestión de proyectos contenedores de múltiples tareas

### No Funcionales
- RNF-001: Tiempo de respuesta < 200ms para acciones CRUD
- RNF-002: Soporte para 100 usuarios concurrentes
- RNF-003: Disponibilidad 99.9% (downtime máximo 8.76 horas/año)
- RNF-004: Interfaz responsive (desktop, tablet, móvil)
- RNF-005: Autenticación segura con JWT y roles de usuario

## Riesgos Identificados

- R1: Resistencia al cambio del equipo acostumbrado a hojas de cálculo
- R2: Integración con sistemas legacy de la empresa podría retrasar el proyecto
- R3: Curva de aprendizaje de la nueva herramienta
- R4: Sobrecarga de notificaciones si no se implementa configuración de preferencias

## Criterios de Aceptación

- CA-001: Usuario puede crear tarea en máximo 3 clics
- CA-002: Notificaciones llegan en < 5 segundos
- CA-003: Reportes se generan en < 10 segundos
- CA-004: Sistema funciona correctamente en Chrome, Firefox, Safari y Edge
- CA-005: 90% de adopción del equipo de operaciones en primer mes post-lanzamiento

## Trazabilidad

- Fuente: temporal/demoapp-ucc-tempo.md
- Iniciativa: 001-demo
- Ticket relacionado: 001-demo-tkt.md
