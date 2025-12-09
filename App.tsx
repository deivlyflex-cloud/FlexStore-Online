import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { ProductManager } from './pages/ProductManager';
import { Finance } from './pages/Finance';
import { MOCK_USERS } from './services/mockData';
import { UserRole, User } from './types';

// Simple admin page stub for demo
const AdminPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Administração Global</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm">Lucro da Plataforma</h3>
        <p className="text-2xl font-bold text-emerald-600">1.250.000 Kz</p>
      </div>
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm">Saques Pendentes</h3>
        <p className="text-2xl font-bold text-amber-500">15</p>
      </div>
       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-slate-500 text-sm">Usuários Ativos</h3>
        <p className="text-2xl font-bold text-indigo-600">1,240</p>
      </div>
    </div>
    <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="font-bold mb-4">Solicitações Recentes</h3>
        <p className="text-slate-500 text-sm">Nenhuma solicitação pendente.</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    // Find mock user based on role for demo purposes
    const mockUser = MOCK_USERS.find(u => u.role === role);
    if (mockUser) setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <Layout user={user} logout={handleLogout}>
          <Routes>
            <Route path="/" element={<Marketplace user={user} />} />
            
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            
            <Route path="/products" element={
              user.role === UserRole.SELLER ? <ProductManager /> : <Navigate to="/" />
            } />
            
            <Route path="/finance" element={<Finance user={user} />} />
            
            <Route path="/admin" element={
              user.role === UserRole.ADMIN ? <AdminPage /> : <Navigate to="/" />
            } />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
    </HashRouter>
  );
};

export default App;