export interface MfaCoverageReport {
  totalSensitiveActions: number;
  actionsWithMfa: number;
  coverage: number; // 0..1
  meetsTarget: boolean;
  details: Array<{
    endpoint: string;
    method: string;
    userId: string;
    role: string;
    mfaVerified: boolean;
    timestamp: string;
  }>;
}

// Simulacion de auditoría
const auditLog: MfaCoverageReport['details'] = [
  {
    endpoint: '/api/execution/approve',
    method: 'POST',
    userId: 'user-123',
    role: 'trader',
    mfaVerified: true,
    timestamp: new Date().toISOString()
  },
  {
    endpoint: '/api/execution/execute',
    method: 'POST',
    userId: 'user-123',
    role: 'trader',
    mfaVerified: true,
    timestamp: new Date().toISOString()
  },
  {
    endpoint: '/api/execution/cancel',
    method: 'POST',
    userId: 'user-123',
    role: 'trader',
    mfaVerified: true,
    timestamp: new Date().toISOString()
  }
];

export function runMfaCoverageAudit(): MfaCoverageReport {
  const sensitiveEndpoints = [
    '/api/execution/approve',
    '/api/execution/execute',
    '/api/execution/cancel'
  ];

  const relevantActions = auditLog.filter(a => 
    sensitiveEndpoints.includes(a.endpoint)
  );

  const total = relevantActions.length;
  const withMfa = relevantActions.filter(a => a.mfaVerified).length;
  const coverage = total > 0 ? withMfa / total : 1;

  return {
    totalSensitiveActions: total,
    actionsWithMfa: withMfa,
    coverage,
    meetsTarget: coverage >= 1.0, // SC-008: 100%
    details: relevantActions
  };
}

export function logSensitiveAction(endpoint: string, method: string, userId: string, role: string, mfaVerified: boolean) {
  auditLog.push({
    endpoint,
    method,
    userId,
    role,
    mfaVerified,
    timestamp: new Date().toISOString()
  });
}
