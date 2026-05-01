# Quickstart y Simulacros de Recuperación

## Secuencia de Implementación Recomendada

1. **Fase 1-2**: Setup y fundamentos (T001-T016)
2. **Fase 3**: US1 - Señales (T017-T025)
3. **Fase 4**: US2 - Control humano (T026-T036)
4. **Fase 5**: US3 - Auditoría (T037-T043)
5. **Fase 6**: Polish y validación (T044-T058)

## Simulacro RTO (Recovery Time Objective)

### Objetivo SC-007
- RTO <= 4 horas para servicios críticos
- Evidencia documentada de cumplimiento

### Runbook de Simulacro

```bash
# 1. Simular caída de base de datos Supabase
# Detener conexiones o cambiar credenciales temporalmente

# 2. Verificar comportamiento de degradación
curl -X GET http://localhost:3000/api/signals/evaluate \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Simulate-Down: supabase"

# 3. Medir tiempo de recuperación
START_TIME=$(date +%s)
# Restaurar conexión a Supabase
# Verificar servicio
until curl -s http://localhost:3000/health | grep -q "ok"; do
  sleep 10
done
END_TIME=$(date +%s)
RECOVERY_TIME=$((END_TIME - START_TIME))

echo "Tiempo de recuperación: ${RECOVERY_TIME} segundos"
echo "RTO objetivo: 14400 segundos (4 horas)"
```

### Evidencia Esperada
- Registro de inicio de incidente
- Métricas de degradación (modo fallback)
- Tiempo de recuperación <= 4 horas
- Registro de fin de incidente

## Simulacro RPO (Recovery Point Objective)

### Objetivo
- RPO <= 24 horas para datos de auditoría
- No pérdida de eventos de trazabilidad

### Procedimiento
1. Backup de base de datos Supabase
2. Simular pérdida de datos (eliminar registros de prueba)
3. Restaurar desde backup
4. Verificar integridad de auditoría (FR-006, FR-011)
5. Documentar punto de recuperación alcanzado

## Validación de Quickstart

- [x] Estructura base creada
- [x] Fundaciones implementadas
- [x] US1 funcional
- [x] US2 funcional
- [x] US3 funcional
- [x] Contratos actualizados
- [ ] Simulacros RTO/RPO ejecutados (pendiente ejecución manual)

## Notas
- Los simulacros deben ejecutarse en ambiente de staging
- Documentar evidencia en `quickstart.md`
- Repetir trimestralmente para mantener cumplimiento SC-007
