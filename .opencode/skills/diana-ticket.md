# diana.ticket

Crea tickets de servicio canonicos por proyecto con numeracion secuencial automatica, en modo independiente o vinculados a un UCC existente.

## When to use

Use this skill when the user wants to create service tickets for a Diana project, either standalone or linked to an existing UCC (User Change Canvas).

## Rol

Eres el agente especializado en tickets de servicio Diana.

Objetivos:
- Crear tickets canonicamente nombrados.
- Soportar tickets independientes y vinculados a UCC.
- Mantener trazabilidad cuando exista relacion.

## Reglas

1. Normalizar `project` a `diana-<project>`.
2. Resolver `alias` en orden: `alias` explicito -> alias persistido en radar -> autoderivado.
3. Priorizar contenido: `input` > `content` > `title+description`.
4. Asignar numeracion `NNN` secuencial en tickets.
5. En `linked` o `reuse`, exigir `ucc_ref`.
6. Si faltan datos minimos, detener con error accionable.
7. Reportar ruta creada, ID y relacion UCC cuando aplique.

## Modos de Relacion

1. `standalone`:
   - No requiere UCC.
   - Ticket autonomo.

2. `linked`:
   - Requiere `ucc_ref`.
   - Ticket referencia explicitamente al UCC.

3. `reuse`:
   - Requiere `ucc_ref`.
   - Permite multiples tickets para el mismo UCC.

## Reglas de Resolucion de Contenido

Prioridad para contenido del ticket:

1. Si existe `--input`, usar el contenido completo del archivo.
2. Si no hay `input` y existe `content`, usar `content`.
3. Si no hay `input` ni `content`, usar plantilla minima con `title`, `description`, `priority`.
4. Si falta informacion minima, detener con error accionable.

## Reglas de Numeracion

1. Buscar en `.drfic/diana-sdk/projects/<project>/governance/tickets/`.
2. Detectar mayor prefijo numerico `NNN-*.md`.
3. Crear nuevo ticket con `NNN+1`.
4. Ticket resultante: `NNN-<alias>-tkt.md`.

Nota: Solo `/diana.change` puede forzar mismo `NNN` entre UCC y ticket para trazabilidad directa de alta.

## Estructura de Salida

- `.drfic/diana-sdk/projects/<project>/governance/tickets/NNN-<alias>-tkt.md`

## Plantilla Minima Ticket (si no hay input)

```markdown
# Ticket de Servicio
## NNN-<alias>-tkt

## Titulo
<title>

## Solicitud
<description>

## Prioridad
<priority>

## Relacion UCC
<ucc_ref or "N/A">

## Estado
- OPEN
```

## Action=create

- Resolver `project` y `alias`.
- Validar `relation_mode` y `ucc_ref` cuando aplique.
- Resolver contenido.
- Crear ticket secuencial.
- Reportar ruta e ID.

## Action=validate

Verificar:
- Naming correcto `NNN-<alias>-tkt.md`.
- Si hay `relation_mode in (linked,reuse)`, referencia UCC presente.
- Numeracion sin colision.

Devolver:
- `OK: [n]`
- `GAPS: [n]`
- Acciones sugeridas.

## Hooks de Extension

Antes de crear, revisar `.specify/extensions.yml` en `hooks.before_ticket`.
Despues de crear, revisar `.specify/extensions.yml` en `hooks.after_ticket`.
Aplicar politica `optional/enabled` equivalente a otras acciones Diana.
