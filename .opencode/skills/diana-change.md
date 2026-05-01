# diana.change

Crea un UCC (User Change Canvas) y su ticket relacionado para gestionar cambios en proyectos Diana.

## When to use

Use this skill when the user wants to create a new User Change Canvas (UCC) and related ticket for managing changes in a Diana project.

## Instrucciones

1. Resolver `project` y `alias` siguiendo las reglas estandar de Diana.
2. Auto-detectar el siguiente numero de UCC basado en prefijos existentes en `governance/change-requests/`.
3. Solicitar al usuario:
   - Titulo del cambio
   - Descripcion del cambio
   - Justificacion o motivacion
   - Impacto esperado
4. Generar UCC con estructura estandar que incluya:
   - Metadatos (id, titulo, fecha, autor)
   - Descripcion del cambio
   - Justificacion
   - Impacto en funcionalidad existente
   - Requisitos nuevos o modificados
   - Riesgos identificados
   - Criterios de aceptacion
5. Guardar UCC en `.drfic/diana-sdk/projects/<project>/governance/change-requests/NNN-<alias>-ucc.md`.
6. Generar ticket relacionado en `.drfic/diana-sdk/projects/<project>/governance/tickets/NNN-<alias>-tkt.md`.
7. Actualizar `meta.md` de la iniciativa si existe.

## Fuentes

**Contexto**:
- `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/meta.md`
- `.drfic/diana-sdk/projects/<project>/<alias>-constitution.md` (si existe)
- `.drfic/diana-sdk/projects/knowledge/indexes/projects-knowledge-radar.yaml`

## Salidas

1. UCC: `.drfic/diana-sdk/projects/<project>/governance/change-requests/NNN-<alias>-ucc.md`
2. Ticket: `.drfic/diana-sdk/projects/<project>/governance/tickets/NNN-<alias>-tkt.md`

## Diana Flow

```
/diana.new       → Bootstrap de estructura del proyecto
/diana.change    ← (estas aqui) → Crear UCC + ticket relacionado
/diana.constitution → Generar constitucion desde UCC
/diana.specify   → Generar spec canonica desde constitucion + UCC
/diana.skills    → Generar skills desde constitucion + spec
/diana.knowledge → Enriquecer knowledge base
/diana.plan      → Generar plan tecnico desde spec + skills + knowledge
/speckit.plan    → Plan operativo de implementacion
```
