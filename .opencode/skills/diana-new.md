# diana.new

Bootstrap de estructura del proyecto Diana, inicializando la estructura base de directorios y archivos de configuracion para un nuevo proyecto o iniciativa.

## When to use

Use this skill when the user wants to bootstrap a new Diana project or initiative, creating the base directory structure and configuration files.

## Instrucciones

1. Resolver `project` y `alias` siguiendo las reglas estandar de Diana.
2. Si el proyecto no existe en el radar, solicitar informacion basica:
   - Nombre del proyecto
   - Descripcion corta
   - Tecnologias principales
3. Crear estructura de directorios:
   - `.drfic/diana-sdk/projects/<project>/`
   - `.drfic/diana-sdk/projects/<project>/governance/change-requests/`
   - `.drfic/diana-sdk/projects/<project>/governance/tickets/`
   - `.drfic/diana-sdk/projects/<project>/initiatives/`
   - `.drfic/diana-sdk/projects/<project>/knowledge/indexes/`
4. Inicializar archivos base:
   - `meta.md` en la iniciativa (si se crea una)
   - Entrada en `projects-knowledge-radar.yaml` si es proyecto nuevo
5. Reportar estructura creada.

## Fuentes

**Configuracion**:
- `.drfic/diana-sdk/projects/knowledge/indexes/projects-knowledge-radar.yaml`

## Salidas

1. Estructura de directorios creada.
2. Archivos base inicializados.
3. Reporte de estructura en salida.

## Diana Flow

```
/diana.new       ← (estas aqui) → Bootstrap de estructura del proyecto
/diana.change    → Crear UCC + ticket relacionado
/diana.constitution → Generar constitucion desde UCC
/diana.specify   → Generar spec canonica desde constitucion + UCC
/diana.skills    → Generar skills desde constitucion + spec
/diana.knowledge → Enriquecer knowledge base
/diana.plan      → Generar plan tecnico desde spec + skills + knowledge
/speckit.plan    → Plan operativo de implementacion
```
