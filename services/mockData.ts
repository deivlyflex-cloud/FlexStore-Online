import { User, Product, Transaction, Withdrawal, UserRole, ProductType, WithdrawalStatus, Notification } from '../types';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin Master',
    email: 'admin@flexstore.ao',
    role: UserRole.ADMIN,
    balance: 500000,
    pendingBalance: 0,
    country: 'Angola',
    isVerified: true
  },
  {
    id: 'u2',
    name: 'João Vendedor',
    email: 'joao@loja.ao',
    role: UserRole.SELLER,
    balance: 150000,
    pendingBalance: 25000,
    country: 'Angola',
    isVerified: true
  },
  {
    id: 'u3',
    name: 'Maria Cliente',
    email: 'maria@gmail.com',
    role: UserRole.BUYER,
    balance: 0,
    pendingBalance: 0,
    country: 'Angola',
    isVerified: true
  }
];

// Mock Products
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    sellerId: 'u2',
    title: 'Curso Marketing Digital AO',
    description: 'Aprenda a vender online em Angola.',
    price: 15000,
    image: 'https://picsum.photos/400/300?random=1',
    type: ProductType.DIGITAL,
    stock: 999,
    isActive: true,
    commissionRate: 20,
    sales: 150
  },
  {
    id: 'p2',
    sellerId: 'u2',
    title: 'Smartphone X Pro',
    description: 'Última geração, 256GB.',
    price: 350000,
    image: 'https://picsum.photos/400/300?random=2',
    type: ProductType.PHYSICAL,
    stock: 10,
    isActive: true,
    commissionRate: 5,
    sales: 12
  },
  {
    id: 'p3',
    sellerId: 'u2',
    title: 'Tênis Esportivo Flex',
    description: 'Conforto total para corrida.',
    price: 25000,
    image: 'https://picsum.photos/400/300?random=3',
    type: ProductType.PHYSICAL,
    stock: 50,
    isActive: true,
    commissionRate: 10,
    sales: 45
  }
];

// Mock Transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-25', amount: 15000, type: 'SALE', status: 'COMPLETED', description: 'Venda: Curso Marketing' },
  { id: 't2', date: '2023-10-26', amount: 350000, type: 'SALE', status: 'PENDING', description: 'Venda: Smartphone X Pro' },
  { id: 't3', date: '2023-10-27', amount: -50000, type: 'WITHDRAWAL', status: 'COMPLETED', description: 'Saque Multicaixa' },
];

// Mock Withdrawals
export const MOCK_WITHDRAWALS: Withdrawal[] = [
  { id: 'w1', userId: 'u2', userName: 'João Vendedor', amount: 50000, fee: 5000, netAmount: 45000, method: 'Multicaixa Express', status: WithdrawalStatus.APPROVED, date: '2023-10-20' },
  { id: 'w2', userId: 'u2', userName: 'João Vendedor', amount: 20000, fee: 2000, netAmount: 18000, method: 'PayPay AO', status: WithdrawalStatus.PENDING, date: '2023-10-28' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Venda Realizada', message: 'Você vendeu 1x Curso Marketing Digital', type: 'SUCCESS', isRead: false, date: 'Agora' },
  { id: 'n2', title: 'Saque Aprovado', message: 'Seu saque de 50.000 Kz foi enviado.', type: 'INFO', isRead: true, date: '2h atrás' },
];