# diana.constitution

Genera la constitucion canonica de un proyecto Diana a partir del UCC (User Change Canvas), estableciendo los principios arquitectonicos, restricciones y lineamientos que guian el proyecto.

## When to use

Use this skill when the user wants to generate or update the constitutional document for a Diana project based on a UCC (User Change Canvas).

## Instrucciones

1. Resolver `project` y `alias` siguiendo las reglas estandar de Diana.
2. Localizar el UCC mas reciente en `governance/change-requests/NNN-<alias>-ucc.md`.
3. Si no existe UCC: detener con error y recomendar `/diana.change` primero.
4. Cargar el UCC completo como fuente primaria.
5. Cargar `meta.md` de la iniciativa si existe como contexto adicional.
6. Generar constitucion que incluya obligatoriamente:
   - Principios arquitectonicos del proyecto
   - Restricciones tecnicas y de negocio
   - Lineamientos de diseño y desarrollo
   - Estandares de codigo y documentacion
   - Requisitos de seguridad, resiliencia y observabilidad
7. La constitucion debe ser trazable al UCC (citar secciones especificas).
8. Guardar en `.drfic/diana-sdk/projects/<project>/<alias>-constitution.md`.
9. Reportar trazabilidad UCC → Constitucion en la salida.

## Fuentes

**Primaria**:
- `.drfic/diana-sdk/projects/<project>/governance/change-requests/NNN-<alias>-ucc.md`

**Contexto**:
- `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/meta.md`
- `.drfic/diana-sdk/projects/knowledge/indexes/projects-knowledge-radar.yaml`

## Salida

- `.drfic/diana-sdk/projects/<project>/<alias>-constitution.md`
- Reporte de trazabilidad en salida.

## Diana Flow

```
/diana.new       → Bootstrap de estructura del proyecto
/diana.change    → Crear UCC + ticket relacionado
/diana.constitution ← (estas aqui) → Generar constitucion desde UCC
/diana.specify   → Generar spec canonica desde constitucion + UCC
/diana.skills    → Generar skills desde constitucion + spec
/diana.knowledge → Enriquecer knowledge base
/diana.plan      → Generar plan tecnico desde spec + skills + knowledge
/speckit.plan    → Plan operativo de implementacion
```
