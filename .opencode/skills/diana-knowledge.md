# diana.knowledge

Genera conocimiento profundo para Diana SDK. Usalo cuando necesites investigar un tema y guardarlo como conocimiento local o registrar fuentes remotas.

## When to use

Use this skill when the user needs to investigate a topic and save it as local knowledge or register remote sources for a Diana project.

## Instrucciones para el Agente

Cuando el usuario ejecute este comando:

### Fase 0: Barrido Canonico Obligatorio (no omitir)

Antes de generar cualquier documento, cargar y resumir cobertura desde estas fuentes oficiales:

1. Control de Cambios (necesidad de negocio):
   - `.drfic/diana-sdk/projects/diana-inversions/governance/change-requests/001-inv-ucc.md`
2. Ticket de Usuario (dolor y objetivos de negocio):
   - `.drfic/diana-sdk/projects/diana-inversions/governance/tickets/001-inv-tkt.md`
3. Constitucion del Proyecto (reglas no negociables):
   - `.drfic/diana-sdk/projects/diana-inversions/inv-constitution.md`
4. Spec Canonica (fuente funcional completa):
   - `.drfic/diana-sdk/projects/diana-inversions/initiatives/001-inversions/001-inv-spec.md`
5. Meta de iniciativa (trazabilidad de origen):
   - `.drfic/diana-sdk/projects/diana-inversions/initiatives/001-inversions/meta.md`
6. Spec operativa activa (clarificaciones vigentes):
   - `.specify/feature.json` -> `specs/001-plataforma-inversiones-ia/spec.md`

Construir una matriz temporal `tema -> cobertura actual` y detectar gaps obligatorios.

Temas obligatorios de cobertura minima para este proyecto:
- Analisis tecnico (soportes, resistencias, tendencia)
- Analisis fundamental
- Senales buy/sell
- Estrategias de opciones (Wheel, Straddle, Iron Condor)
- Flujo institucional por strike/expiracion
- Noticias en tiempo real
- Confluencia IA entre cores activos por usuario

Si falta cualquiera de estos temas, generar/actualizar los documentos correspondientes antes de terminar.

### Fase 0.5: Skills First (obligatorio)

Antes de generar o actualizar conocimiento profundo, validar y sincronizar skills en:

- `.drfic/diana-sdk/projects/knowledge/indexes/projects-knowledge-radar.yaml`
- `.drfic/diana-sdk/projects/diana-inversions/knowledge/indexes/skills-manifest.yaml`
- `.drfic/diana-sdk/projects/diana-inversions/knowledge/indexes/agent-skill-matrix.yaml`
- `.drfic/diana-sdk/projects/diana-inversions/knowledge/indexes/sdd-engine-matrix.yaml`
- `.drfic/diana-sdk/projects/diana-inversions/knowledge/skills/` (skill docs modulares)

Reglas:
1. Derivar skills desde fuentes canonicas (no desde opinion ad-hoc).
2. Para cada skill, enlazar al menos un `knowledge_doc`.
3. Si un tema canonico no tiene skill asociada, crear skill nueva.
4. Si una skill no tiene documento de conocimiento completo, generarlo/actualizarlo.
5. Mantener mapeo de skills requeridas por agente Diana y por etapa Speckit.
6. Mantener mapeo por engine SDD (Speckit, OpenSpec, Generic-SDD).

Si los archivos de skills no existen, generarlos primero con:

```
/diana.skills action="generate"
```

### Fase 1: Cargar Contexto

1. Leer la **constitucion del proyecto activo**:
   - Si `scope=project` o `initiative`: leer `.drfic/diana-sdk/projects/diana-inversions/inv-constitution.md`
   - Si `scope=sdk`: leer `.drfic/diana-sdk/sdk/diana/constitution.md`

2. Leer el **spec activo** (si existe): `.specify/feature.json` → cargar `spec.md` correspondiente

3. Leer el **indice maestro** del nivel correspondiente:
   - `scope=project`: `.drfic/diana-sdk/projects/knowledge/indexes/master-index.md` y `.drfic/diana-sdk/projects/<project>/knowledge/indexes/master-index.md`
   - `scope=sdk`: `.drfic/diana-sdk/sdk/diana/knowledge/indexes/master-index.md`
   - `scope=initiative`: `.drfic/diana-sdk/projects/<project>/initiatives/001-inversions/knowledge/index.md`

4. Verificar si ya existe un documento sobre este `topic` en el indice. Si existe y esta 🟢 Completo, notificar al usuario y preguntar si quiere regenerar.

   Si `topic="all"`:
   - Construir lista consolidada de topicos con la seccion "Resolucion automatica de topicos".
   - Iterar tema por tema aplicando la misma logica de existencia/regeneracion.

5. Verificar cobertura contra la matriz de Fase 0:
   - Si el `topic` solicitado depende de otros temas obligatorios no cubiertos, sugerir generarlos en lote.
   - Si el usuario pidio generacion completa de proyecto, producir todos los temas obligatorios faltantes.

### Fase 2: Investigacion Profunda

Para `type=local` o `type=both`:

1. **Investigar el tema** usando:
   - Tu conocimiento del modelo (conocimiento interno profundo)
   - El contexto de la constitucion y spec cargados
   - Razonamiento sobre el dominio especifico del proyecto

2. **Generar un documento completo** con estructura estandar:

```markdown
# [Tema Capitalizado] — Diana [Nivel] Knowledge

> **ID**: [ID segun convencion del indice]
> **Generado**: [fecha actual]
> **Scope**: [scope indicado]
> **Estado**: 🟢 Completo
> **Fuente**: Investigacion profunda + contexto Diana

## TL;DR

[2-3 oraciones: que es, por que importa, cuando usar]

## Conceptos Clave

[lista de conceptos fundamentales con definicion breve]

## [Seccion Principal 1]

[contenido detallado]

## [Seccion Principal 2]

[contenido detallado]

## Integracion con el Proyecto

[como aplica especificamente a diana-inversions o al scope indicado]

## Decisiones de Diseno

[tradeoffs conocidos, alternativas consideradas]

## Referencias y Fuentes

[URLs, documentacion oficial, papers]

## Siguiente Paso

[que investigar o generar a continuacion]
```

3. **Determinar la ruta de guardado**:
   - `scope=sdk, type=local`: `.drfic/diana-sdk/sdk/diana/knowledge/local/[categoria]/[NNN-topic].md`
   - `scope=project, layer=general, type=local`: `.drfic/diana-sdk/projects/knowledge/[...]/[NNN-topic].md`
   - `scope=project, layer=project, type=local`: `.drfic/diana-sdk/projects/<project>/knowledge/local/[categoria]/[NNN-topic].md`
   - `scope=project, layer=both, type=local`: guardar en ambas rutas (general y project)
   - Categoria: detectar automaticamente (domain | brokers | compliance | patterns | methodology | agents | etc.)

4. **Guardar el documento** en la ruta correspondiente.

5. **Actualizar el master-index.md**:
   - Agregar fila al indice con ID, archivo, descripcion y estado 🟢 Completo
   - Actualizar la tabla de Estado de Cobertura

Para `type=remote` o `type=both`:

1. Si se proporciona `source`: documentar la fuente en `remote/sources.md`
2. Generar un resumen estructurado de la fuente como snapshot en `snapshots/`
3. Si no se proporciona `source`: sugerir fuentes relevantes y registrarlas en `remote/sources.md`
4. Si `scope=project` y `layer=both`: registrar fuente y snapshot en capa general y capa proyecto.

### Fase 3: Confirmacion

Reportar al usuario:
- Documento(s) generado(s) y su ruta
- ID asignado
- Topicos procesados (generados, actualizados y omitidos por ya estar completos)
- Secciones del indice actualizadas
- Lista de temas obligatorios cubiertos vs pendientes
- Skills creadas/actualizadas y agentes afectados
- Siguiente comando sugerido (e.g., siguiente documento a generar o `/speckit.plan`)

## Principio Fundamental

> El conocimiento generado por `/diana.knowledge` **enriquece** la metodologia de Speckit.
> **No la reemplaza.** Si Speckit encuentra gaps no cubiertos en el knowledge local,
> debe continuar con su propia investigacion y razonamiento (Phase 0 normal).
> El objetivo es que Speckit llegue al plan con mas contexto experto, mas rapido.
