# diana.specify

Orquesta /diana.specify para generar, validar o regenerar la especificacion canonica de una iniciativa Diana, usando constitucion + UCC + meta como fuentes primarias, con soporte de --input y resolucion dinamica de iniciativa por proyecto.

## When to use

Use this skill when the user wants to generate, validate or regenerate a canonical specification for a Diana initiative, using constitution + UCC + meta as primary sources.

## Instructions

1. Normalizar `project` a `diana-<project>` si no tiene el prefijo `diana-`.
2. Resolver `alias` en orden: `alias` explicito -> alias persistido en radar -> autoderivado desde `<project-sin-prefijo-diana>`.
3. Auto-detectar `initiative` buscando el directorio de mayor prefijo numerico `NNN-*` en `initiatives/` si no se especifica.
4. Si no existe ninguna iniciativa, crear el directorio `001-<alias>/` como primera iniciativa.
5. Resolucion de fuentes:
   - La constitucion `<alias>-constitution.md` se carga SIEMPRE como base arquitectonica, con o sin `--input`.
   - Si no existe constitucion: detener con error + recomendar `/diana.constitution` primero.
   - `--input` reemplaza la resolucion automatica del UCC solamente (no elimina la constitucion).
   - Si no hay `--input`: auto-resolver UCC mas reciente por prefijo `NNN-*.md` en `change-requests/`.
   - Si no existe UCC ni input: continuar con constitucion + meta en modo degradado, reportar gap.
   - Complementar siempre con `meta.md` de la iniciativa si existe.
6. Si no existe constitucion: detener con error accionable + recomendar `/diana.constitution` primero.
7. Si existe `NNN-<alias>-spec.md` y `action=generate`: detener con error indicando usar `action="regenerate"`.
8. Cargar skills y knowledge como contexto de enriquecimiento (nunca como fuente primaria).
9. Si falta knowledge o skills: continuar con metodologia estandar, reportar gap.
10. Validar coherencia con spec operativa en `specs/*/spec.md` si existe, reportar divergencias sin bloquear.
11. Generar reporte de trazabilidad constitucion/UCC → Spec en la salida.
12. En `action=validate`: emitir reporte `OK:[n] / GAPS:[n]` con acciones sugeridas.
13. En `action=regenerate`: sobrescribir el archivo existente con nueva version y log de cambios al inicio.

## Sources (mandatory, in order of priority)

**Fuente arquitectonica (siempre obligatoria)**:
- `.drfic/diana-sdk/projects/<project>/<alias>-constitution.md` — base constitucional del proyecto.
  - Si no existe constitucion, detener con error y recomendar `/diana.constitution` primero.

**Fuente de cambio/alcance (en orden)**:
1. Si se pasa `--input`, usar ese archivo como el documento de cambio/contexto principal (en lugar del UCC auto-detectado).
2. Si no hay `--input`, auto-resolver el UCC mas reciente:
   - `.drfic/diana-sdk/projects/<project>/governance/change-requests/NNN-<alias>-ucc.md`
   - Seleccionar por mayor prefijo numerico `NNN-*.md`.
3. Si no existe ni input ni UCC, continuar solo con constitucion + meta (degradado, reportar el gap).

**Contexto de iniciativa**:
- `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/meta.md` — siempre como complemento si existe.

**Fallback minimo**:
- Si no hay constitucion ni input ni UCC, usar `title` + `description` como contenido base.
- Si no hay suficiente informacion ni para esto, detener con error accionable.

## Enrichment Sources (do not replace primary source)

- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/skills-manifest.yaml`
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/agent-skill-matrix.yaml`
- `.drfic/diana-sdk/projects/knowledge/indexes/master-index.md`
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/master-index.md`
- `specs/*/spec.md` — spec operativa existente (si hay) para validacion cruzada y coherencia.

Si falta knowledge o skills, continuar con metodologia estandar y reportar gap.

## Outputs

1. Spec canonica de la iniciativa:
   - `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/NNN-<alias>-spec.md`

2. Reporte de trazabilidad constitucion/UCC → Spec (en salida):
   - Principios constitucionales reflejados en la spec.
   - Cambios del UCC incorporados como requisitos.
   - Gaps detectados y decision tomada.

3. Reporte de validacion (solo en `action=validate`):
   - `OK: [n]` — secciones consistentes.
   - `GAPS: [n]` — secciones con discrepancias.
   - Acciones sugeridas.

4. Reporte de coherencia con spec operativa (si existe `specs/*/spec.md`):
   - Divergencias detectadas entre spec canonica y spec operativa.
   - Recomendacion: alinear operativa o actualizar canonica.

## Diana Flow

```
/diana.new       → Bootstrap de estructura del proyecto
/diana.change    → Crear UCC + ticket relacionado
/diana.constitution → Generar constitucion desde UCC
/diana.specify   ← (estas aqui) → Generar spec canonica desde constitucion + UCC
/diana.skills    → Generar skills desde constitucion + spec
/diana.knowledge → Enriquecer knowledge base
/diana.plan      → Generar plan tecnico desde spec + skills + knowledge
/speckit.plan    → Plan operativo de implementacion
```
