import { useState } from 'react';
import { ExecutionPanel } from './features/execution/ExecutionPanel';
import { ApprovalFlow } from './features/execution/ApprovalFlow';
import { AuditHistoryPage } from './features/audit/AuditHistoryPage';

type Page = 'execution' | 'approval' | 'audit';

function App() {
  const [page, setPage] = useState<Page>('approval');
  const [approvedOrderId, setApprovedOrderId] = useState<string>('');

  const handleApproved = (orderId: string) => {
    setApprovedOrderId(orderId);
    setPage('execution');
  };

  const handleRejected = () => {
    console.log('Orden rechazada');
  };

  const handleExecuted = (orderId: string, broker: string, version: number) => {
    console.log('Orden ejecutada:', { orderId, broker, version });
  };

  return (
    <div className="min-h-screen bg-background text-slate-800 font-sans">
      <nav className="bg-primary text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-wider">DR.FIC</span>
              <span className="ml-2 text-xs bg-blue-800 px-2 py-1 rounded">Control Humano Estricto</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Trader: Juan Pérez</span>
              <div className="h-8 w-8 rounded-full bg-blue-800 flex items-center justify-center font-bold">JP</div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8 flex space-x-4">
          <button
            onClick={() => setPage('approval')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              page === 'approval'
                ? 'bg-primary text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Aprobación
          </button>
          <button
            onClick={() => setPage('execution')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              page === 'execution'
                ? 'bg-primary text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Ejecución
          </button>
          <button
            onClick={() => setPage('audit')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              page === 'audit'
                ? 'bg-primary text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Auditoría
          </button>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {page === 'approval' && (
            <ApprovalFlow
              proposalId="prop_001"
              signalId="sig_001"
              instrument="AAPL"
              orderType="MARKET"
              quantity={100}
              price={150.00}
              onApproved={handleApproved}
              onRejected={handleRejected}
            />
          )}
          {page === 'execution' && (
            <ExecutionPanel
              orderId={approvedOrderId || 'order_demo_001'}
              status={approvedOrderId ? 'APPROVED' : 'PENDING_APPROVAL'}
              instrument="AAPL"
              version={1}
              onExecute={handleExecuted}
            />
          )}
        </div>
        
        {page === 'audit' && <AuditHistoryPage userId="usr_9821" />}
      </main>
    </div>
  );
}

export default App;
