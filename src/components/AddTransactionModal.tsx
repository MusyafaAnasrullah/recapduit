import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Sparkles, Plus, Wallet, Tag, Calendar, FileText } from 'lucide-react';
import { parseChatMessage } from '../utils/botParser';
import { TransactionType } from '../types';

export const AddTransactionModal: React.FC = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    categories,
    wallets,
    addTransaction,
    profile,
    totalBalance,
  } = useFinance();

  const [activeMode, setActiveMode] = useState<'smart' | 'manual'>('smart');
  const [smartInput, setSmartInput] = useState('');
  
  // Manual state
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Makanan & Minuman');
  const [walletId, setWalletId] = useState<string>(wallets[0]?.id || 'wallet-cash');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState<string>('');

  if (!isAddModalOpen) return null;

  const handleSmartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smartInput.trim()) return;

    const result = parseChatMessage(smartInput, categories, profile.botNickname, totalBalance);
    if (result.transaction) {
      addTransaction({
        date: new Date().toISOString().split('T')[0],
        category: result.transaction.category,
        amount: result.transaction.amount,
        type: result.transaction.type,
        note: result.transaction.note,
        walletId: walletId || wallets[0]?.id || 'wallet-cash',
        source: 'manual',
      });
      setSmartInput('');
      setIsAddModalOpen(false);
    } else {
      alert('Tuliskan nominal yang jelas ya, misalnya: Makan siang 25rb');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmt = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (!numAmt || numAmt <= 0) {
      alert('Masukkan nominal yang valid');
      return;
    }

    addTransaction({
      date,
      category,
      amount: numAmt,
      type,
      note: note.trim() || category,
      walletId,
      source: 'manual',
    });

    setAmount('');
    setNote('');
    setIsAddModalOpen(false);
  };

  const quickAmounts = [15000, 25000, 50000, 100000, 250000, 500000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Catat Transaksi Baru</h3>
              <p className="text-xs text-slate-500">
                Pencatatan langsung terhubung ke bot dan dashboard
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="p-4 border-b border-slate-100 bg-white flex gap-2">
          <button
            type="button"
            onClick={() => setActiveMode('smart')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'smart'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ketik Santai (Gaya WhatsApp)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('manual')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeMode === 'manual'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Form Manual Detail</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeMode === 'smart' ? (
            <form onSubmit={handleSmartSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tulis seperti chat ke WhatsApp recapduit:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={smartInput}
                    onChange={(e) => setSmartInput(e.target.value)}
                    placeholder="Contoh: Makan siang warteg 25rb, Beli bensin 50k, Gajian 5jt"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all"
                    autoFocus
                  />
                </div>
              </div>

              {/* Sample examples */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-slate-400">
                  Contoh cepat (klik untuk pakai):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Kopi Tuku 22rb',
                    'Makan siang padang 30rb',
                    'Beli pulsa 50k',
                    'Parkir stasiun 5000',
                    'Bonus freelance 1.5jt',
                  ].map((ex, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSmartInput(ex)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300 border border-slate-200 rounded-md text-slate-600 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallet Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Simpan ke Rekening / Dompet:
                </label>
                <select
                  value={walletId}
                  onChange={(e) => setWalletId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} (Saldo: Rp {w.balance.toLocaleString('id-ID')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-[0.98]"
                >
                  Simpan Otomatis ✨
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {/* Type toggle */}
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setType('expense');
                    setCategory('Makanan & Minuman');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    type === 'expense'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-rose-600'
                  }`}
                >
                  Pengeluaran
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType('income');
                    setCategory('Gaji Pokok');
                  }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                    type === 'income'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-sky-600'
                  }`}
                >
                  Pemasukan
                </button>
              </div>

              {/* Amount input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominal (Rp)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2.5 text-lg font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q.toString())}
                      className="px-2 py-0.5 text-[11px] bg-slate-100 hover:bg-sky-100 hover:text-sky-700 rounded text-slate-600 transition-colors"
                    >
                      +{(q / 1000).toLocaleString('id-ID')}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Category & Wallet Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  >
                    {categories
                      .filter((c) => c.type === type)
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rekening
                  </label>
                  <select
                    value={walletId}
                    onChange={(e) => setWalletId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  >
                    {wallets.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Note */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catatan
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Contoh: Makan siang"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-[0.98]"
                >
                  Simpan Transaksi
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
