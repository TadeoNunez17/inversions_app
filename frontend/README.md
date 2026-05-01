# Frontend - Plataforma de Inversiones con IA

Aplicación web PWA (Progressive Web App) construida con React 18 + TypeScript.

## 🎯 Propósito

Proporcionar la interfaz de usuario para:
1. **Evaluar señales** de inversión generadas por IA
2. **Aprobar ejecuciones** con control humano
3. **Visualizar historial** de auditoría y trazabilidad

## 📂 Estructura

```
frontend/
├── src/
│   ├── features/          # Componentes por funcionalidad
│   │   ├── signals/       # Evaluación de señales
│   │   ├── execution/    # Aprobación y ejecución
│   │   └── audit/         # Historial y auditoría
│   ├── components/        # Componentes reutilizables
│   ├── hooks/            # Custom hooks
│   ├── services/         # Cliente API
│   ├── store/            # Estado global (Zustand)
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Utilidades
├── public/              # Archivos estáticos
└── index.html
```

## 🧩 Componentes Principales

### Features

| Componente | Propósito |
|-----------|----------|
| `SignalEvaluationPage` | Evaluar instrumentos y obtener señales |
| `SignalEvidencePanel` | Ver evidencia por fuente |
| `ApprovalFlow` | Flujo UI de aprobación con disclaimer |
| `ExecutionPanel` | Panel de ejecución con cooldown |
| `AuditHistoryPage` | Dashboard de historial de auditoría |
| `OperationTimeline` | Timeline de eventos de decisión |

## 🔗 Comunicación con Backend

```typescript
// services/signals/signalApi.ts
export async function evaluateSignal(instrument: string) {
  const response = await fetch('/api/signals/evaluate', {
    method: 'POST',
    body: JSON.stringify({ instrument })
  });
  return response.json();
}
```

## 🎨 Estilos

- **TailwindCSS** para estilos utilitarios
- **Tema personalizado** para trading
- **Responsive** para móvil/desktop

## 🚀 Scripts

```bash
npm run dev          # Servidor de desarrollo (Vite)
npm run build        # Build de producción
npm test           # Pruebas con Vitest
npm run lint         # Lint con ESLint
```

## 🔒 Seguridad

- **JWT** almacenado en memoria
- **MFA** requerido para acciones sensibles
- **Disclaimer** obligatorio antes de aprobación
- **Rate limiting** manejado desde UI (cooldown)

## 📱 PWA

La aplicación es una PWA completa:
- ✅ Service Worker para offline
- ✅ Manifest para instalación
- ✅ Notificaciones push (futuro)
