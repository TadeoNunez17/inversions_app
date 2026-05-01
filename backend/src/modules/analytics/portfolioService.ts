export interface PortfolioOutcome {
  totalSignals: number;
  approvedSignals: number;
  executedOrders: number;
  failedOrders: number;
  filledOrders: number;
  averageFillPrice: number;
  successRate: number;
  instruments: Record<string, {
    signals: number;
    executions: number;
    successRate: number;
  }>;
}

export function getPortfolioAnalytics(userId?: string): PortfolioOutcome {
  // Simulacion: agregar desde Supabase
  return {
    totalSignals: 150,
    approvedSignals: 120,
    executedOrders: 95,
    failedOrders: 8,
    filledOrders: 87,
    averageFillPrice: 152.34,
    successRate: 0.913, // 91.3%
    instruments: {
      'AAPL': { signals: 45, executions: 35, successRate: 0.95 },
      'MSFT': { signals: 38, executions: 30, successRate: 0.89 },
      'GOOGL': { signals: 25, executions: 18, successRate: 0.92 }
    }
  };
}

export function getAuditabilityScore(): number {
  // Métrica de completitud de trazabilidad
  const requiredFields = ['event_id', 'timestamp_utc', 'correlation_id', 'user_id', 'action_type', 'new_state'];
  // Simulacion: verificar completitud en muestra
  return 0.98; // 98% de eventos con trazabilidad completa
}
