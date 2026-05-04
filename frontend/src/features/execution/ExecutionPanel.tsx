import { useState } from 'react';

interface ExecutionPanelProps {
  orderId?: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'SUBMITTED' | 'FAILED' | 'CANCELLED';
  instrument: string;
  broker?: string;
  version: number;
  onExecute: (orderId: string, broker: 'IBKR' | 'ALPACA', version: number) => void;
}

export function ExecutionPanel({ orderId, status, instrument, broker, version, onExecute }: ExecutionPanelProps) {
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
        setError(`Límite alcanzado. Espere ${cooldown} segundos.`);
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
        setError('Versión de orden obsoleta. Refresque y reintente con nueva aprobación.');
      } else {
        setError(err.message || 'Error en ejecución');
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = status !== 'APPROVED' || loading || cooldown > 0;

  const getStatusBadge = () => {
    const styles = {
      'APPROVED': 'bg-green-100 text-success border-green-200',
      'PENDING_APPROVAL': 'bg-yellow-100 text-warning border-yellow-200',
      'SUBMITTED': 'bg-blue-100 text-primary border-blue-200',
      'FAILED': 'bg-red-100 text-danger border-red-200',
      'CANCELLED': 'bg-slate-100 text-slate-600 border-slate-200',
    };
    return styles[status] || styles['CANCELLED'];
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Panel de Ejecución</h2>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge()}`}>
          {status}
        </span>
      </div>
      <div className="p-6 space-y-6">
        {/* Info de orden */}
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
          <ul className="space-y-2 text-sm text-slate-600">
            {orderId && (
              <li className="flex justify-between"><span>Order ID:</span> <strong>{orderId}</strong></li>
            )}
            <li className="flex justify-between"><span>Instrumento:</span> <strong>{instrument}</strong></li>
            <li className="flex justify-between"><span>Versión:</span> <strong>v{version}</strong></li>
            {broker && (
              <li className="flex justify-between"><span>Broker:</span> <strong>{broker}</strong></li>
            )}
          </ul>
        </div>

        {/* Selección de Broker */}
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Seleccionar Broker de Destino</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="broker"
                checked={selectedBroker === 'IBKR'}
                onChange={() => setSelectedBroker('IBKR')}
                className="peer sr-only"
              />
              <div className="rounded-md border-2 border-slate-200 p-4 text-center peer-checked:border-primary peer-checked:bg-blue-50 transition-all">
                <span className="block font-bold text-slate-900">Interactive Brokers</span>
                <span className="text-xs text-slate-500">API Primaria</span>
              </div>
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="broker"
                checked={selectedBroker === 'ALPACA'}
                onChange={() => setSelectedBroker('ALPACA')}
                className="peer sr-only"
              />
              <div className="rounded-md border-2 border-slate-200 p-4 text-center peer-checked:border-primary peer-checked:bg-blue-50 transition-all">
                <span className="block font-bold text-slate-900">Alpaca</span>
                <span className="text-xs text-slate-500">API Secundaria</span>
              </div>
            </label>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {cooldown > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-md text-sm text-yellow-800">
            Cooldown activo: {cooldown}s restantes
          </div>
        )}

        {/* Botón de ejecución */}
        <button
          onClick={handleExecute}
          disabled={isDisabled}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span>{loading ? 'Ejecutando...' : 'Ejecutar Orden (Requiere MFA)'}</span>
        </button>
        <p className="text-xs text-center text-slate-500 mt-2">Rate limit: 10 req/60s. Última petición: hace 2 min.</p>
      </div>
    </section>
  );
}
