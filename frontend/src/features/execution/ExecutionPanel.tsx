import React, { useState } from 'react';

interface ExecutionPanelProps {
  orderId?: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'SUBMITTED' | 'FAILED' | 'CANCELLED';
  instrument: string;
  broker?: string;
  version: number;
  onExecute: (orderId: string, broker: 'IBKR' | 'ALPACA', version: number) => void;
  onCancel: () => void;
}

export function ExecutionPanel({ orderId, status, instrument, broker, version, onExecute, onCancel }: ExecutionPanelProps) {
  const [selectedBroker, setSelectedBroker] = useState<'IBKR' | 'ALPACA'>('IBKR');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const handleExecute = async () => {
    if (!orderId) return;
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/execution/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, broker: selectedBroker, version })
      });

      if (response.status === 429) {
        const data = await response.json();
        setCooldown(data.retryAfterSeconds || 120);
        throw new Error('RATE_LIMITED');
      }

      if (response.status === 409) {
        const data = await response.json();
        throw new Error(data.error || 'ORDER_VERSION_STALE');
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'EXECUTION_FAILED');
      }

      const data = await response.json();
      onExecute(orderId, selectedBroker, data.version);
    } catch (err: any) {
      if (err.message === 'RATE_LIMITED') {
        setError(`Limite alcanzado. Espere ${cooldown} segundos.`);
        // Start cooldown timer
        const interval = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else if (err.message === 'ORDER_VERSION_STALE') {
        setError('Version de orden obsoleta. Refresque y reintente con nueva aprobacion.');
      } else {
        setError(err.message || 'Error en ejecucion');
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = status !== 'APPROVED' || loading || cooldown > 0;

  return (
    <div className="execution-panel p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Panel de Ejecucion</h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <p className="text-sm"><strong>Estado:</strong> <span className={`font-medium ${status === 'APPROVED' ? 'text-green-600' : 'text-gray-600'}`}>{status}</span></p>
        {orderId && <p className="text-sm"><strong>Order ID:</strong> {orderId}</p>}
        <p className="text-sm"><strong>Instrumento:</strong> {instrument}</p>
        <p className="text-sm"><strong>Version:</strong> {version}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Seleccionar Broker</label>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedBroker('IBKR')}
            className={`px-4 py-2 rounded ${selectedBroker === 'IBKR' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Interactive Brokers
          </button>
          <button
            onClick={() => setSelectedBroker('ALPACA')}
            className={`px-4 py-2 rounded ${selectedBroker === 'ALPACA' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Alpaca
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded">
          {error}
        </div>
      )}

      {cooldown > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
          Cooldown activo: {cooldown}s restantes
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleExecute}
          disabled={isDisabled}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Ejecutando...' : 'Enviar a Broker'}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
