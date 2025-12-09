import React, { useState } from 'react';
import { UserRole } from '../types';
import { Button, Input, Card } from '../components/UI';
import { Lock } from 'lucide-react';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.BUYER);
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminClick = () => {
    setRole(UserRole.ADMIN);
    setIsLogin(true);
    setAdminPassword('');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === UserRole.ADMIN) {
        if (adminPassword !== 'Messiasgabriel2009') {
            setError('Senha de administrador incorreta.');
            return;
        }
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 transition-colors duration-200">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FlexStore Online
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {role === UserRole.ADMIN ? 'Acesso Administrativo' : (isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta hoje')}
          </p>
        </div>

        <Card className="border-t-4 border-t-indigo-600">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Standard Login Fields */}
            {role !== UserRole.ADMIN && !isLogin && (
              <>
                <Input label="Nome Completo" placeholder="Seu nome" required />
                <Input label="Telefone" placeholder="+244 9XX XXX XXX" required />
                
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de Conta</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole(UserRole.BUYER)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border ${
                        role === UserRole.BUYER 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      Cliente
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole(UserRole.SELLER)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border ${
                        role === UserRole.SELLER 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                        : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      Vendedor
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {role === UserRole.ADMIN ? (
                 <div className="space-y-4">
                     <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Área restrita. Digite a senha mestre.
                     </div>
                     <Input 
                        label="Senha de Administrador" 
                        type="password" 
                        placeholder="••••••••" 
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required 
                        error={error}
                    />
                 </div>
            ) : (
                <>
                    <Input label="Email" type="email" placeholder="seu@email.com" required />
                    <Input label="Senha" type="password" placeholder="••••••••" required />

                    {!isLogin && (
                    <Input label="País" value="Angola" disabled className="bg-slate-100 dark:bg-slate-800" />
                    )}
                </>
            )}

            {isLogin && role !== UserRole.ADMIN && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={loading}>
              {role === UserRole.ADMIN ? 'Acessar Painel' : (isLogin ? 'Entrar' : 'Criar Conta')}
            </Button>

            {role !== UserRole.ADMIN && (
              <>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-700"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">Ou acesso Admin</span></div>
                </div>
                <Button type="button" variant="outline" className="w-full" onClick={handleAdminClick}>
                  Entrar como Admin
                </Button>
              </>
            )}

             {role === UserRole.ADMIN && (
                <button 
                    type="button" 
                    onClick={() => { setRole(UserRole.BUYER); setAdminPassword(''); setError(''); }}
                    className="w-full text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mt-2"
                >
                    &larr; Voltar ao Login Normal
                </button>
            )}
          </form>

          {role !== UserRole.ADMIN && (
            <div className="mt-6 text-center text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                </span>
                <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                {isLogin ? 'Cadastre-se' : 'Faça Login'}
                </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};