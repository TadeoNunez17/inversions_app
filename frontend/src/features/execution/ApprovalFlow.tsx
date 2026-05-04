import { useState } from 'react';

interface ApprovalFlowProps {
  proposalId: string;
  signalId: string;
  instrument: string;
  orderType: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
  onApproved: (orderId: string) => void;
  onRejected: () => void;
}

export function ApprovalFlow({ proposalId, signalId, instrument, orderType, quantity, price, onApproved, onRejected }: ApprovalFlowProps) {
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApprove = async () => {
    if (!disclaimerAccepted) {
      setError('Debe aceptar el disclaimer de no-asesoria');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/execution/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId,
          signalId,
          instrument,
          orderType,
          quantity,
          price,
          disclaimerAccepted,
          mfaContextId: 'mfa-' + Date.now()
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error en aprobacion');
      }

      const data = await response.json();
      onApproved(data.orderId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await fetch(`/api/execution/${proposalId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Rechazado por usuario' })
      });
      onRejected();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">Señal de IA Pendiente</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Card de Señal */}
        <div className="flex flex-wrap justify-between items-center p-4 bg-slate-50 rounded-md border border-slate-200 gap-4">
          <div>
            <p className="text-sm text-slate-500 font-medium">Instrumento</p>
            <p className="text-xl font-bold text-slate-900">{instrument}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium">Acción sugerida</p>
            <p className="text-lg font-bold text-success uppercase">{orderType === 'MARKET' ? 'Compra (BUY)' : orderType}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 font-medium">Cantidad / Precio</p>
            <p className="text-lg font-bold text-slate-900">{quantity} @ ${price || 'N/A'}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-warning p-4 rounded-r-md text-sm text-yellow-800">
          <p className="font-bold mb-1">⚠️ Disclaimer de Ejecución Manual</p>
          <p>Esta es una señal generada por IA. La plataforma DR.FIC no provee asesoría financiera automatizada. Al aprobar, asumes la responsabilidad total de esta operación.</p>
        </div>

        {/* Acciones */}
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
              className="form-checkbox h-5 w-5 text-primary rounded border-slate-300 focus:ring-primary"
            />
            <span className="text-sm text-slate-700 font-medium">He validado esta señal y acepto ejecutarla.</span>
          </label>
          
          <div className="flex space-x-4">
            <button
              onClick={handleReject}
              disabled={loading}
              className="flex-1 bg-white border-2 border-danger text-danger font-semibold py-2 px-4 rounded-md hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 disabled:opacity-50"
            >
              Rechazar
            </button>
            <button
              onClick={handleApprove}
              disabled={loading || !disclaimerAccepted}
              className="flex-1 bg-success text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2 shadow-sm disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Aprobar Señal'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
