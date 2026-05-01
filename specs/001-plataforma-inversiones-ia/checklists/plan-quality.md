# Checklist de Ownership por Raíz (PL-004)

## Propósito
Verificar que la estructura del proyecto cumpla con el ownership definido en plan.md.

## Criterios de Conformidad

- [x] **Frontend/** - Equipo Frontend: Experiencia PWA, decision flow, visualización de señales
- [x] **Backend/** - Equipo Backend: API REST, gobernanza de ejecución, integraciones broker
- [x] **Specs/** - Producto + Arquitectura: Spec, plan, contratos, data model y checklists
- [x] **.drfic/** - Arquitectura/Gobernanza: Conocimiento, constitución, lineamientos y trazabilidad metodológica
- [x] Existe separación clara entre código de producto (`frontend/`, `backend/`) y artefactos de soporte (`specs/`, `.drfic/`)
- [x] Todo cambio manual de estructura actualiza el plan y su mapa de ownership

## Validación
Ejecutar antes de cada PR mayor de reorganización:
```bash
# Verificar que no hay archivos de ejecución en .drfic/
find .drfic -name "*.ts" -o -name "*.tsx" -o -name "*.js" | wc -l
# Debe ser 0

# Verificar estructura de frontend/backend
ls -la frontend/src/
ls -la backend/src/
```
