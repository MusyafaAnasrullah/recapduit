import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Transaction,
  Wallet,
  Category,
  DebtItem,
  Budget,
  Reminder,
  UserProfile,
  ChatMessage,
  TransactionType,
} from '../types';
import {
  initialCategories,
  initialWallets,
  initialTransactions,
  initialDebts,
  initialBudgets,
  initialReminders,
  initialProfile,
} from '../data/initialData';
import { parseChatMessage } from '../utils/botParser';

interface FinanceContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  transactions: Transaction[];
  wallets: Wallet[];
  categories: Category[];
  debts: DebtItem[];
  budgets: Budget[];
  reminders: Reminder[];
  profile: UserProfile;
  chatMessages: ChatMessage[];
  isSimulatorOpen: boolean;
  setIsSimulatorOpen: (open: boolean) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => void;
  deleteTransaction: (id: string) => void;
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWalletBalance: (id: string, delta: number) => void;
  transferWallet: (fromId: string, toId: string, amount: number) => void;
  addDebt: (debt: Omit<DebtItem, 'id' | 'createdAt'>) => void;
  toggleDebtStatus: (id: string) => void;
  deleteDebt: (id: string) => void;
  updateBudgetLimit: (id: string, newLimit: number) => void;
  toggleReminder: (id: string) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  addCategoryKeyword: (categoryId: string, keyword: string) => void;
  removeCategoryKeyword: (categoryId: string, keyword: string) => void;
  sendChatMessage: (text: string) => void;
  resetDemoData: () => void;

  // Computed metrics
  totalBalance: number;
  totalIncomeMonth: number;
  totalExpenseMonth: number;
  totalPiutang: number;
  totalHutang: number;
  netWorth: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'login' || hash === 'beranda' || hash === 'landing') return hash;
    }
    return 'landing';
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent States
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('recapduit_txs');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [wallets, setWallets] = useState<Wallet[]>(() => {
    const saved = localStorage.getItem('recapduit_wallets');
    return saved ? JSON.parse(saved) : initialWallets;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('recapduit_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [debts, setDebts] = useState<DebtItem[]>(() => {
    const saved = localStorage.getItem('recapduit_debts');
    return saved ? JSON.parse(saved) : initialDebts;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('recapduit_budgets');
    return saved ? JSON.parse(saved) : initialBudgets;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('recapduit_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('recapduit_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('recapduit_chat');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Halo Musyafa! 👋 Selamat datang di recapduit. Coba ketik "Makan siang di warteg 25rb" atau "cek saldo" langsung di sini ya!',
        timestamp: '10:00',
      },
    ];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('recapduit_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('recapduit_wallets', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem('recapduit_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('recapduit_debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('recapduit_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('recapduit_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('recapduit_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('recapduit_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Computed metrics
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);

  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const monthlyTransactions = transactions.filter((t) => t.date.startsWith(currentMonthStr));
  const totalIncomeMonth = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseMonth = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalPiutang = debts
    .filter((d) => d.type === 'piutang' && d.status === 'belum_lunas')
    .reduce((acc, d) => acc + d.amount, 0);
  const totalHutang = debts
    .filter((d) => d.type === 'hutang' && d.status === 'belum_lunas')
    .reduce((acc, d) => acc + d.amount, 0);

  const netWorth = totalBalance + totalPiutang - totalHutang;

  // Actions
  const addTransaction = (tx: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Update wallet balance
    const delta = tx.type === 'income' ? tx.amount : -tx.amount;
    updateWalletBalance(tx.walletId, delta);

    // Update budget spent
    setBudgets((prev) =>
      prev.map((b) => {
        if (b.categoryName.toLowerCase() === tx.category.toLowerCase() && tx.type === 'expense') {
          return { ...b, spent: b.spent + tx.amount };
        }
        return b;
      })
    );
  };

  const deleteTransaction = (id: string) => {
    const target = transactions.find((t) => t.id === id);
    if (!target) return;

    // reverse wallet delta
    const reverseDelta = target.type === 'income' ? -target.amount : target.amount;
    updateWalletBalance(target.walletId, reverseDelta);

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addWallet = (newW: Omit<Wallet, 'id'>) => {
    const w: Wallet = {
      ...newW,
      id: `wallet-${Date.now()}`,
    };
    setWallets((prev) => [...prev, w]);
  };

  const updateWalletBalance = (id: string, delta: number) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, balance: Math.max(0, w.balance + delta) } : w))
    );
  };

  const transferWallet = (fromId: string, toId: string, amount: number) => {
    if (fromId === toId || amount <= 0) return;
    setWallets((prev) =>
      prev.map((w) => {
        if (w.id === fromId) return { ...w, balance: Math.max(0, w.balance - amount) };
        if (w.id === toId) return { ...w, balance: w.balance + amount };
        return w;
      })
    );
  };

  const addDebt = (debt: Omit<DebtItem, 'id' | 'createdAt'>) => {
    const newDebt: DebtItem = {
      ...debt,
      id: `debt-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setDebts((prev) => [newDebt, ...prev]);
  };

  const toggleDebtStatus = (id: string) => {
    setDebts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'belum_lunas' ? 'lunas' : 'belum_lunas' }
          : d
      )
    );
  };

  const deleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const updateBudgetLimit = (id: string, newLimit: number) => {
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, limit: newLimit } : b)));
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  };

  const addCategoryKeyword = (categoryId: string, keyword: string) => {
    const clean = keyword.trim().toLowerCase();
    if (!clean) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId && !c.keywords.includes(clean)
          ? { ...c, keywords: [...c.keywords, clean] }
          : c
      )
    );
  };

  const removeCategoryKeyword = (categoryId: string, keyword: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, keywords: c.keywords.filter((k) => k !== keyword) }
          : c
      )
    );
  };

  const sendChatMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Parse with botParser
    const todayStr = new Date().toISOString().split('T')[0];
    const todayExpense = transactions
      .filter((t) => t.date === todayStr && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const result = parseChatMessage(
      text,
      categories,
      profile.botNickname,
      totalBalance,
      todayExpense,
      totalExpenseMonth
    );

    // Apply side-effects from parser
    if (result.nickname) {
      updateProfile({ botNickname: result.nickname });
    }

    if (result.transaction) {
      const defaultWallet = wallets.find((w) => w.isDefault) || wallets[0];
      addTransaction({
        date: todayStr,
        category: result.transaction.category,
        amount: result.transaction.amount,
        type: result.transaction.type,
        note: result.transaction.note,
        walletId: defaultWallet ? defaultWallet.id : 'wallet-cash',
        source: 'whatsapp',
      });
    }

    if (result.debt) {
      addDebt({
        person: result.debt.person,
        type: result.debt.type,
        amount: result.debt.amount,
        dueDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().split('T')[0],
        note: result.debt.note,
        status: 'belum_lunas',
      });
    }

    // Add bot response with a tiny realistic typing delay
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: result.botReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  const resetDemoData = () => {
    setTransactions(initialTransactions);
    setWallets(initialWallets);
    setCategories(initialCategories);
    setDebts(initialDebts);
    setBudgets(initialBudgets);
    setReminders(initialReminders);
    setProfile(initialProfile);
  };

  return (
    <FinanceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        transactions,
        wallets,
        categories,
        debts,
        budgets,
        reminders,
        profile,
        chatMessages,
        isSimulatorOpen,
        setIsSimulatorOpen,
        isAddModalOpen,
        setIsAddModalOpen,
        searchQuery,
        setSearchQuery,
        addTransaction,
        deleteTransaction,
        addWallet,
        updateWalletBalance,
        transferWallet,
        addDebt,
        toggleDebtStatus,
        deleteDebt,
        updateBudgetLimit,
        toggleReminder,
        updateProfile,
        addCategoryKeyword,
        removeCategoryKeyword,
        sendChatMessage,
        resetDemoData,
        totalBalance,
        totalIncomeMonth,
        totalExpenseMonth,
        totalPiutang,
        totalHutang,
        netWorth,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return ctx;
};
