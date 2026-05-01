import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

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
    <div className="approval-flow p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Aprobacion de Ejecucion</h3>
      
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p className="text-sm"><strong>Instrumento:</strong> {instrument}</p>
        <p className="text-sm"><strong>Tipo:</strong> {orderType}</p>
        <p className="text-sm"><strong>Cantidad:</strong> {quantity}</p>
        {price && <p className="text-sm"><strong>Precio:</strong> ${price}</p>}
      </div>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded">
        <p className="text-sm font-semibold text-yellow-800">⚠️ Disclaimer de No-Asesoria</p>
        <p className="text-xs text-yellow-700 mt-1">
          Esta plataforma proporciona senales generadas por IA con propositos informativos.
          No constituye asesoria financiera. Usted mantiene control humano total sobre
          cualquier decision de ejecucion. Verifique siempre antes de aprobar.
        </p>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={disclaimerAccepted}
            onChange={(e) => setDisclaimerAccepted(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Acepto y entiendo el disclaimer</span>
        </label>
      </div>

      {error && <div className="mb-4 p-2 bg-red-50 text-red-700 rounded">{error}</div>}

      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          disabled={loading || !disclaimerAccepted}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Aprobar y Ejecutar'}
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
