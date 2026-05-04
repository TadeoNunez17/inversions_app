import { useState, useEffect } from 'react';

interface AuditEvent {
  eventId: string;
  timestamp: string;
  correlationId: string;
  actionType: string;
  instrument?: string;
  outcomeCode?: string;
}

interface AuditHistoryPageProps {
  userId: string;
}

export function AuditHistoryPage({ userId }: AuditHistoryPageProps) {
  const [events, setEvents] = useState<AuditEvent[]>([
    {
      eventId: 'evt_001',
      timestamp: '2026-05-04T10:23:00Z',
      correlationId: 'corr_001',
      actionType: 'EXECUTION_SUBMITTED',
      instrument: 'TSLA',
      outcomeCode: 'SUBMITTED'
    },
    {
      eventId: 'evt_002',
      timestamp: '2026-05-04T10:20:00Z',
      correlationId: 'corr_001',
      actionType: 'HUMAN_APPROVED',
      instrument: 'TSLA',
      outcomeCode: 'APPROVED'
    },
    {
      eventId: 'evt_003',
      timestamp: '2026-05-04T09:15:00Z',
      correlationId: 'corr_002',
      actionType: 'EXECUTION_REJECTED',
      instrument: 'MSFT',
      outcomeCode: 'REJECTED'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    instrument: '',
    actionType: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchHistory();
  }, [filter]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        limit: '50',
        offset: '0'
      });
      
      if (filter.instrument) queryParams.append('instrument', filter.instrument);
      if (filter.actionType) queryParams.append('actionType', filter.actionType);
      if (filter.startDate) queryParams.append('startDate', filter.startDate);
      if (filter.endDate) queryParams.append('endDate', filter.endDate);

      const response = await fetch(`/api/audit/history?${queryParams}`);
      const data = await response.json();
      
      if (response.ok) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    if (action.includes('APPROVED')) return 'bg-blue-100 text-primary border-blue-200';
    if (action.includes('SUBMITTED')) return 'bg-green-100 text-success border-green-200';
    if (action.includes('REJECTED') || action.includes('FAILED')) return 'bg-red-100 text-danger border-red-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getActionTypeLabel = (action: string) => {
    if (action === 'HUMAN_APPROVED') return 'Aprobación';
    if (action === 'EXECUTION_SUBMITTED') return 'Ejecución';
    if (action === 'EXECUTION_REJECTED') return 'Rechazo';
    return action;
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">Historial de Auditoría</h2>
      </div>
      
      <div className="p-6">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Instrumento</label>
            <input
              type="text"
              placeholder="Ej. AAPL"
              value={filter.instrument}
              onChange={(e) => setFilter({...filter, instrument: e.target.value})}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Tipo de Acción</label>
            <select
              value={filter.actionType}
              onChange={(e) => setFilter({...filter, actionType: e.target.value})}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-white"
            >
              <option value="">Todos</option>
              <option value="HUMAN_APPROVED">Aprobación</option>
              <option value="EXECUTION_SUBMITTED">Ejecución</option>
              <option value="EXECUTION_REJECTED">Rechazo</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({...filter, startDate: e.target.value})}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({...filter, endDate: e.target.value})}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Cargando historial...</div>
        ) : (
          <>
            {/* Tabla de Eventos */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-800 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Fecha y Hora</th>
                    <th className="px-4 py-3">Instrumento</th>
                    <th className="px-4 py-3">Acción</th>
                    <th className="px-4 py-3">Usuario (MFA)</th>
                    <th className="px-4 py-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {events.map((event) => (
                    <tr key={event.eventId} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                        {new Date(event.timestamp).toLocaleString('es-ES')}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {event.instrument || '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {getActionTypeLabel(event.actionType)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center text-slate-600">
                          {userId} 
                          <svg className="w-3 h-3 text-success ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getActionBadge(event.actionType)}`}>
                          {event.outcomeCode || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-slate-500">Mostrando {events.length} de 45 eventos</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>
                  Anterior
                </button>
                <button className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50">
                  Siguiente
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
