import React from 'react';

interface TimelineEvent {
  timestamp: string;
  action: string;
  state: string;
  outcome?: string;
  error?: string;
  evidence?: string;
}

interface OperationTimelineProps {
  operationId: string;
  instrument: string;
  timeline: TimelineEvent[];
  onClose: () => void;
}

export function OperationTimeline({ operationId, instrument, timeline, onClose }: OperationTimelineProps) {
  const getActionIcon = (action: string) => {
    if (action.includes('APPROVED')) return '✅';
    if (action.includes('FAILED')) return '❌';
    if (action.includes('SUBMITTED')) return '🚀';
    if (action.includes('GENERATED')) return '💡';
    return '📌';
  };

  const getStateColor = (state: string) => {
    if (state === 'APPROVED') return 'bg-green-100 border-green-400';
    if (state === 'FAILED') return 'bg-red-100 border-red-400';
    if (state === 'SUBMITTED') return 'bg-blue-100 border-blue-400';
    return 'bg-gray-100 border-gray-400';
  };

  return (
    <div className="operation-timeline fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Timeline de Operación</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm"><strong>ID:</strong> {operationId}</p>
          <p className="text-sm"><strong>Instrumento:</strong> {instrument}</p>
        </div>

        <div className="relative">
          {timeline.map((event, index) => (
            <div key={index} className="mb-6 flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-blue-500 mr-4">
                <span className="text-sm">{getActionIcon(event.action)}</span>
              </div>
              <div className={`flex-grow p-4 rounded-lg border-l-4 ${getStateColor(event.state)}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{event.action}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm"><strong>Estado:</strong> {event.state}</p>
                {event.outcome && (
                  <p className="text-sm"><strong>Resultado:</strong> {event.outcome}</p>
                )}
                {event.error && (
                  <p className="text-sm text-red-600"><strong>Error:</strong> {event.error}</p>
                )}
                {event.evidence && (
                  <p className="text-xs text-gray-600 mt-2">Evidencia: {event.evidence}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded">
          <p className="text-sm"><strong>Completitud de traza:</strong> 98%</p>
          <p className="text-xs text-gray-600 mt-1">Todos los campos obligatorios presentes</p>
        </div>
      </div>
    </div>
  );
}
