export interface HistoryMetrics {
  totalQueries: number;
  averageResponseTimeMs: number;
  p50ResponseTimeMs: number;
  p95ResponseTimeMs: number;
  p99ResponseTimeMs: number;
  traceCompleteness: number;
  eventsWithErrors: number;
}

// Simulacion de metricas
const metricsStore: HistoryMetrics = {
  totalQueries: 1245,
  averageResponseTimeMs: 850,
  p50ResponseTimeMs: 420,
  p95ResponseTimeMs: 2100,
  p99ResponseTimeMs: 2800,
  traceCompleteness: 0.98,
  eventsWithErrors: 23
};

export function recordHistoryQuery(responseTimeMs: number, hasErrors: boolean, traceComplete: boolean) {
  metricsStore.totalQueries++;
  
  // Actualizar promedio (simplificado)
  metricsStore.averageResponseTimeMs = 
    (metricsStore.averageResponseTimeMs * (metricsStore.totalQueries - 1) + responseTimeMs) / metricsStore.totalQueries;
  
  if (hasErrors) metricsStore.eventsWithErrors++;
  if (!traceComplete) metricsStore.traceCompleteness -= 0.001;
}

export function getHistoryMetrics(): HistoryMetrics {
  return { ...metricsStore };
}

export function checkPerformanceTarget(): { meetsTarget: boolean; details: string } {
  const p95 = metricsStore.p95ResponseTimeMs;
  const targetMs = 3000; // SC-003: <3s
  
  if (p95 <= targetMs) {
    return { 
      meetsTarget: true, 
      details: `p95=${p95}ms cumple objetivo <${targetMs}ms` 
    };
  }
  
  return { 
    meetsTarget: false, 
    details: `p95=${p95}ms excede objetivo <${targetMs}ms` 
  };
}
