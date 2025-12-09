export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  BUYER = 'BUYER'
}

export enum ProductType {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL'
}

export enum WithdrawalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number; // Available balance
  pendingBalance: number;
  country: string;
  avatar?: string;
  isVerified: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: ProductType;
  stock: number;
  isActive: boolean;
  commissionRate: number; // For affiliates
  sales: number;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'SALE' | 'COMMISSION' | 'WITHDRAWAL';
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
  description: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: 'Multicaixa Express' | 'PayPay AO';
  status: WithdrawalStatus;
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  type: 'INFO' | 'SUCCESS' | 'WARNING';
  date: string;
}