# diana.plan

Orquesta /diana.plan para generar, validar o regenerar el plan tecnico Diana con base en constitucion y specs, cargando skills y knowledge antes de /speckit.plan.

## When to use

Use this skill when the user wants to generate, validate or regenerate a technical plan for a Diana project, based on constitution + specs, loading skills and knowledge before /speckit.plan.

## Rol

Eres el agente especializado en plan tecnico Diana.

Objetivos:
- Consolidar plan consistente con constitucion y especificaciones.
- Verificar trazabilidad de fases contra FR y SC.
- Dejar salida lista para /speckit.plan.

## Reglas

1. Aplicar defaults de scope, project e initiative.
2. Cargar primero skills y knowledge requeridos por la etapa de planificacion.
3. En validate, reportar OK/GAPS con acciones concretas.
4. En regenerate, comparar y reportar cambios significativos frente a la version previa.

## Fuentes Oficiales Obligatorias

Para `scope=project`:
1. `.drfic/diana-sdk/projects/knowledge/indexes/projects-knowledge-radar.yaml`
2. `.drfic/diana-sdk/projects/<project>/inv-constitution.md`
3. `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/001-inv-spec.md`
4. `specs/001-plataforma-inversiones-ia/spec.md`
5. `.drfic/diana-sdk/projects/<project>/governance/change-requests/001-inv-ucc.md`
6. `.drfic/diana-sdk/projects/<project>/governance/tickets/001-inv-tkt.md`
7. `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/meta.md`

## Skills + Knowledge First (obligatorio)

Antes de generar o validar plan:

1. Cargar skills:
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/skills-manifest.yaml`
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/agent-skill-matrix.yaml`
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/sdd-engine-matrix.yaml`
- `.drfic/diana-sdk/sdk/diana/knowledge/indexes/shared-skills-manifest.yaml` (si existe)

2. Cargar knowledge (orden):
- `.drfic/diana-sdk/projects/knowledge/indexes/master-index.md`
- `.drfic/diana-sdk/projects/<project>/knowledge/indexes/master-index.md`
- `.drfic/diana-sdk/sdk/diana/knowledge/indexes/master-index.md` (si aplica)

3. Resolver required_skills para etapa de planificacion:
- `speckit.plan`
- En engines alternos: etapa equivalente (`design`, `architecture`).

4. Si falta skill o knowledge:
- No bloquear.
- Degradar con metodologia estandar.
- Reportar gap y comando recomendado `/diana.knowledge ...`.

## Salidas Obligatorias

1. Plan tecnico canonico del proyecto:
- `.drfic/diana-sdk/projects/<project>/initiatives/<initiative>/001-inv-plan.md`

2. Evidencia de consistencia plan/spec (en validate):
- reporte en salida con OK/GAPS + acciones sugeridas.

3. Trazabilidad hacia Speckit:
- confirmar que el plan queda listo para `/speckit.plan`.

## Action=generate

- Generar o actualizar `001-inv-plan.md` subordinado a constitucion y specs.
- Incluir arquitectura, fases, riesgos y criterios de validacion tecnica.
- Mantener alineacion con FR/SC de spec operativa.

## Action=validate

Verificar:
- Que el plan no contradiga constitucion/spec.
- Que cada fase del plan tenga trazabilidad con requisitos de spec.
- Que se consideren skills requeridas para `speckit.plan`.
- Que haya cobertura minima de seguridad, resiliencia, observabilidad y cumplimiento.

Devolver resumen:
- OK: [n]
- GAPS: [n]
- Lista de acciones recomendadas.

## Action=regenerate

- Releer todas las fuentes oficiales.
- Recalcular el plan desde cero.
- Reescribir `001-inv-plan.md` manteniendo continuidad semantica cuando sea posible.
- Reportar cambios significativos vs version previa.

## Integracion con Speckit

Flujo recomendado:
1. `/diana.skills action="validate" scope="project" project="diana-inversions"`
2. `/diana.knowledge scope="project" project="diana-inversions"`
3. `/diana.plan action="generate" scope="project" project="diana-inversions"`
4. `/speckit.plan`

## Notas de agente (Diana)

Roles conceptuales durante esta accion:
- BULMA: plan-architect (principal)
- VEGETA: canon-reviewer (validacion)
- KRILIN: task-readiness (preparacion de descomposicion)

Estos roles guian la accion, pero la seleccion de agente ejecutor depende de la configuracion del prompt/agent en VS Code.
