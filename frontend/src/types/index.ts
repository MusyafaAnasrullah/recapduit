export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD or formatted
  timestamp: number;
  category: string;
  amount: number;
  type: TransactionType;
  note: string;
  walletId: string;
  source: 'whatsapp' | 'manual' | 'telegram';
  tags?: string[];
}

export interface Wallet {
  id: string;
  name: string;
  type: 'bank' | 'ewallet' | 'cash';
  balance: number;
  accountNumber?: string;
  color: string;
  isDefault?: boolean;
}

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  keywords: string[];
  isDefault: boolean;
}

export interface DebtItem {
  id: string;
  person: string;
  type: 'piutang' | 'hutang'; // piutang: others owe user, hutang: user owes others
  amount: number;
  dueDate: string;
  note: string;
  status: 'belum_lunas' | 'lunas';
  createdAt: string;
}

export interface Budget {
  id: string;
  categoryId: string;
  categoryName: string;
  limit: number;
  spent: number;
  period: 'bulanan' | 'mingguan';
}

export interface Reminder {
  id: string;
  title: string;
  amount?: number;
  time: string;
  days: string[];
  channel: 'whatsapp' | 'telegram';
  isActive: boolean;
  type: 'tagihan' | 'catat_harian' | 'laporan';
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  plan: 'Free' | 'Pro' | 'Lifetime';
  isConnected: boolean;
  connectedPhone: string;
  botNickname: string; // "bos", "juragan", "kak"
  referralCode: string;
  referralBalance: number;
  pendingReferral: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  transactionCreated?: Partial<Transaction>;
}
