import React, { useState } from 'react';
import { User, WithdrawalStatus } from '../types';
import { MOCK_WITHDRAWALS } from '../services/mockData';
import { Card, Button, Modal, Badge } from '../components/UI';
import { Wallet, CreditCard, ArrowDownLeft, AlertTriangle } from 'lucide-react';

interface FinanceProps {
  user: User;
}

export const Finance: React.FC<FinanceProps> = ({ user }) => {
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [method, setMethod] = useState<'Multicaixa Express' | 'PayPay AO'>('Multicaixa Express');

  const amountNum = parseFloat(withdrawAmount) || 0;
  const fee = amountNum * 0.10;
  const net = amountNum - fee;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-slate-900">Carteira & Saques</h1>
        <Button onClick={() => setWithdrawModalOpen(true)}>
          <ArrowDownLeft className="w-4 h-4 mr-2" />
          Solicitar Saque
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none shadow-lg shadow-indigo-200">
          <p className="text-indigo-100 text-sm font-medium">Saldo Disponível</p>
          <h2 className="text-3xl font-bold mt-2">{user.balance.toLocaleString('pt-AO')} Kz</h2>
          <div className="mt-4 pt-4 border-t border-indigo-500/30 flex items-center text-xs text-indigo-100">
            <Wallet className="w-4 h-4 mr-1" />
            Livre para saque imediato
          </div>
        </Card>
        
        <Card>
          <p className="text-slate-500 text-sm font-medium">Saldo Pendente</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-700">{user.pendingBalance.toLocaleString('pt-AO')} Kz</h2>
           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500">
            <ClockIcon />
            Geralmente liberado em 7-14 dias
          </div>
        </Card>

        <Card>
          <p className="text-slate-500 text-sm font-medium">Total Sacado</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-700">70.000 Kz</h2>
           <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-green-600">
             +12% este mês
          </div>
        </Card>
      </div>

      <h2 className="text-lg font-bold text-slate-900 mt-8">Histórico de Saques</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Método</th>
                <th className="px-6 py-4">Valor Bruto</th>
                <th className="px-6 py-4">Taxa (10%)</th>
                <th className="px-6 py-4">Valor Líquido</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_WITHDRAWALS.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">{w.date}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {w.method === 'Multicaixa Express' ? <CreditCard className="w-4 h-4 text-orange-500"/> : <CreditCard className="w-4 h-4 text-blue-500"/>}
                    {w.method}
                  </td>
                  <td className="px-6 py-4 font-medium">{w.amount.toLocaleString()} Kz</td>
                  <td className="px-6 py-4 text-red-500">-{w.fee.toLocaleString()} Kz</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">{w.netAmount.toLocaleString()} Kz</td>
                  <td className="px-6 py-4">
                    <Badge color={w.status === WithdrawalStatus.APPROVED ? 'green' : w.status === WithdrawalStatus.PENDING ? 'yellow' : 'red'}>
                      {w.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <Modal isOpen={isWithdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} title="Solicitar Saque">
        <div className="space-y-4">
          <div className="bg-amber-50 p-3 rounded-lg flex items-start text-xs text-amber-800 border border-amber-100">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
            <p>O valor mínimo para saque é 5.000 Kz. Uma taxa administrativa de 10% será aplicada automaticamente.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Valor do Saque</label>
            <div className="relative">
                <input 
                  type="number" 
                  className="w-full pl-4 pr-12 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
                <span className="absolute right-4 top-2 text-slate-400">Kz</span>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Método de Recebimento</label>
             <div className="grid grid-cols-2 gap-3">
               <div 
                 onClick={() => setMethod('Multicaixa Express')}
                 className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${method === 'Multicaixa Express' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-slate-300'}`}
               >
                 <span className="block text-sm font-bold text-slate-900">Multicaixa</span>
                 <span className="text-xs text-slate-500">Express</span>
               </div>
               <div 
                 onClick={() => setMethod('PayPay AO')}
                 className={`cursor-pointer border rounded-lg p-3 text-center transition-all ${method === 'PayPay AO' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-slate-300'}`}
               >
                 <span className="block text-sm font-bold text-slate-900">PayPay</span>
                 <span className="text-xs text-slate-500">Angola</span>
               </div>
             </div>
          </div>

          {amountNum > 0 && (
            <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-sm border border-slate-100">
                <div className="flex justify-between text-slate-600">
                    <span>Valor Solicitado:</span>
                    <span>{amountNum.toLocaleString()} Kz</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Taxa da Plataforma (10%):</span>
                    <span>-{fee.toLocaleString()} Kz</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-base">
                    <span>A Receber:</span>
                    <span>{net.toLocaleString()} Kz</span>
                </div>
            </div>
          )}

          <div className="pt-2">
            <Button className="w-full" disabled={amountNum < 5000 || amountNum > user.balance}>
              Confirmar Solicitação
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ClockIcon = () => <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;