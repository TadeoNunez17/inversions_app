import React, { useState, useEffect } from 'react';

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
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
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

  const getActionColor = (action: string) => {
    if (action.includes('APPROVED')) return 'text-green-600';
    if (action.includes('FAILED')) return 'text-red-600';
    if (action.includes('SUBMITTED')) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="audit-history-page p-6">
      <h2 className="text-2xl font-bold mb-6">Historial de Auditoría</h2>

      <div className="filters mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Instrumento"
            value={filter.instrument}
            onChange={(e) => setFilter({...filter, instrument: e.target.value})}
            className="px-3 py-2 border rounded"
          />
          <select
            value={filter.actionType}
            onChange={(e) => setFilter({...filter, actionType: e.target.value})}
            className="px-3 py-2 border rounded"
          >
            <option value="">Todas las acciones</option>
            <option value="HUMAN_APPROVED">Aprobadas</option>
            <option value="EXECUTION_SUBMITTED">Ejecutadas</option>
            <option value="EXECUTION_FAILED">Fallidas</option>
          </select>
          <input
            type="date"
            value={filter.startDate}
            onChange={(e) => setFilter({...filter, startDate: e.target.value})}
            className="px-3 py-2 border rounded"
          />
          <input
            type="date"
            value={filter.endDate}
            onChange={(e) => setFilter({...filter, endDate: e.target.value})}
            className="px-3 py-2 border rounded"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Cargando historial...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Fecha/Hora</th>
                <th className="px-4 py-2 text-left">Evento</th>
                <th className="px-4 py-2 text-left">Instrumento</th>
                <th className="px-4 py-2 text-left">ID Correlación</th>
                <th className="px-4 py-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{new Date(event.timestamp).toLocaleString()}</td>
                  <td className={`px-4 py-2 text-sm font-medium ${getActionColor(event.actionType)}`}>
                    {event.actionType}
                  </td>
                  <td className="px-4 py-2 text-sm">{event.instrument || '-'}</td>
                  <td className="px-4 py-2 text-sm font-mono">{event.correlationId}</td>
                  <td className="px-4 py-2 text-sm">{event.outcomeCode || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">No se encontraron eventos</div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        Mostrando {events.length} eventos
      </div>
    </div>
  );
}
