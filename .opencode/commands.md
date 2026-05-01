# Diana Commands Reference

Mapeo de comandos estilo Copilot a skills de opencode.

## Uso

Escribe comandos con sintaxis `/diana.<comando> argumentos` y el asistente cargará la skill correspondiente.

## Comandos Disponibles

### /diana.new
**Skill:** `diana-new`
**Descripción:** Bootstrap de estructura del proyecto

**Argumentos:**
- `project` - ID del proyecto (se normaliza a `diana-<project>`)
- `alias` - Alias corto lowercase (opcional, se autoderiva)

**Ejemplo:**
```
/diana.new project="demoapp" alias="demo"
```

---

### /diana.change
**Skill:** `diana-change`
**Descripción:** Crear UCC + ticket relacionado

**Argumentos:**
- `project` - ID del proyecto
- `title` - Título del cambio
- `description` - Descripción del cambio
- `initiative` - ID de iniciativa (opcional)

**Ejemplo:**
```
/diana.change project="demoapp" title="Nueva funcionalidad" description="Agregar dashboard"
```

---

### /diana.constitution
**Skill:** `diana-constitution`
**Descripción:** Generar constitución desde UCC

**Argumentos:**
- `project` - ID del proyecto
- `initiative` - ID de iniciativa (opcional)

**Ejemplo:**
```
/diana.constitution project="demoapp"
```

---

### /diana.specify
**Skill:** `diana-specify`
**Descripción:** Generar/validar/regenerar especificación canónica

**Argumentos:**
- `action` - `generate` | `validate` | `regenerate` (default: `generate`)
- `project` - ID del proyecto
- `alias` - Alias corto (opcional)
- `initiative` - ID de iniciativa (opcional)
- `input` - Ruta de archivo markdown (opcional)
- `title` - Título de la spec (opcional)
- `description` - Descripción (opcional)

**Ejemplo:**
```
/diana.specify action="generate" project="demoapp"
/diana.specify action="validate" project="demoapp" initiative="001-demo"
```

---

### /diana.skills
**Skill:** `diana-skills`
**Descripción:** Generar/validar/regenerar skills canónicas

**Argumentos:**
- `action` - `generate` | `validate` | `regenerate` (default: `generate`)
- `scope` - `project` | `initiative` | `sdk` (default: `project`)
- `project` - ID del proyecto
- `layer` - `general` | `project` | `both` (default: `both`)

**Ejemplo:**
```
/diana.skills action="generate" project="demoapp" layer="both"
```

---

### /diana.knowledge
**Skill:** `diana-knowledge`
**Descripción:** Generar conocimiento profundo

**Argumentos:**
- `topic` - Tema a investigar (default: `all`)
- `scope` - `sdk` | `project` | `initiative` (default: `project`)
- `project` - ID del proyecto
- `layer` - `general` | `project` | `both` (default: `both`)
- `type` - `local` | `remote` | `both` (default: `both`)
- `source` - URL o nombre de fuente (opcional)

**Ejemplo:**
```
/diana.knowledge topic="ibkr-api" project="demoapp" type="local"
/diana.knowledge scope="project" project="demoapp"
```

---

### /diana.plan
**Skill:** `diana-plan`
**Descripción:** Generar/validar/regenerar plan técnico

**Argumentos:**
- `action` - `generate` | `validate` | `regenerate` (default: `generate`)
- `scope` - `project` | `initiative` | `sdk` (default: `project`)
- `project` - ID del proyecto
- `initiative` - ID de iniciativa (opcional)

**Ejemplo:**
```
/diana.plan action="generate" project="demoapp"
```

---

### /diana.ticket
**Skill:** `diana-ticket`
**Descripción:** Crear tickets de servicio

**Argumentos:**
- `action` - `create` | `validate` (default: `create`)
- `project` - ID del proyecto
- `alias` - Alias corto (opcional)
- `title` - Título del ticket
- `description` - Descripción del ticket
- `content` - Cuerpo completo inline (opcional)
- `input` - Ruta a archivo markdown (opcional)
- `relation_mode` - `standalone` | `linked` | `reuse` (default: `standalone`)
- `ucc_ref` - Referencia UCC (requerido para `linked` y `reuse`)
- `priority` - `high` | `medium` | `low` (default: `medium`)

**Ejemplo:**
```
/diana.ticket project="demoapp" title="Fix bug" description="Error en login"
/diana.ticket project="demoapp" relation_mode="linked" ucc_ref="001-demo-ucc" title="Implementar MFA"
```

---

## Notas

- El asistente parseará estos comandos y cargará la skill correspondiente usando la herramienta `skill`
- Los argumentos se pasan a la skill para que los procese según sus instrucciones
- Si falta algún argumento requerido, la skill solicitará la información faltante
- La sintaxis de argumentos soporta tanto `key=value` como `key="value con espacios"`
