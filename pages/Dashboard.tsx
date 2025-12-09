import React from 'react';
import { User, Transaction, UserRole } from '../types';
import { Card, Badge } from '../components/UI';
import { DollarSign, ShoppingCart, TrendingUp, Package, Clock } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../services/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
}

// Stats Card Component
const StatCard: React.FC<{ title: string; value: string; subtext?: string; icon: any; color: string }> = ({ title, value, subtext, icon: Icon, color }) => (
  <Card className="relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-3 opacity-10 ${color}`}>
      <Icon className="w-16 h-16" />
    </div>
    <div className="relative z-10">
      <div className={`p-2 rounded-lg w-fit mb-3 ${color.replace('text-', 'bg-').replace('500', '100')}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
  </Card>
);

const data = [
  { name: 'Seg', uv: 4000 },
  { name: 'Ter', uv: 3000 },
  { name: 'Qua', uv: 2000 },
  { name: 'Qui', uv: 2780 },
  { name: 'Sex', uv: 1890 },
  { name: 'Sab', uv: 2390 },
  { name: 'Dom', uv: 3490 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const isSeller = user.role === UserRole.SELLER;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isSeller ? 'Painel de Vendas' : 'Minhas Compras'}
          </h1>
          <p className="text-slate-500">Bem-vindo de volta, {user.name}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge color={user.isVerified ? 'green' : 'yellow'}>
            {user.isVerified ? 'Conta Verificada' : 'Pendente Verificação'}
          </Badge>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Saldo Disponível" 
          value={`${user.balance.toLocaleString('pt-AO')} Kz`} 
          subtext="Pronto para saque"
          icon={DollarSign}
          color="text-emerald-600"
        />
        <StatCard 
          title="Saldo Pendente" 
          value={`${user.pendingBalance.toLocaleString('pt-AO')} Kz`} 
          subtext="Liberação em breve"
          icon={Clock}
          color="text-amber-500"
        />
        <StatCard 
          title={isSeller ? "Vendas Totais" : "Pedidos Totais"} 
          value="24" 
          subtext="Este mês"
          icon={ShoppingCart}
          color="text-indigo-600"
        />
        <StatCard 
          title={isSeller ? "Produtos Ativos" : "Favoritos"} 
          value={isSeller ? "12" : "5"} 
          subtext="No catálogo"
          icon={Package}
          color="text-purple-600"
        />
      </div>

      {/* Chart & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Desempenho Semanal</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="uv" stroke="#4f46e5" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="text-lg font-semibold mb-4">Extrato Recente</h3>
            <div className="space-y-4">
              {MOCK_TRANSACTIONS.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${t.type === 'SALE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {t.type === 'SALE' ? <TrendingUp size={16} /> : <DollarSign size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{t.description}</p>
                      <p className="text-xs text-slate-500">{t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${t.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} Kz
                    </p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium py-2">
                Ver todo o histórico
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};