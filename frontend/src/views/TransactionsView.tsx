import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  Search,
  Download,
  Filter,
  Plus,
  Trash2,
  Calendar,
  Wallet,
  Tag,
  ArrowUpDown,
  Smartphone,
} from 'lucide-react';

export const TransactionsView: React.FC = () => {
  const {
    transactions,
    deleteTransaction,
    wallets,
    categories,
    setIsAddModalOpen,
    searchQuery,
    setSearchQuery,
  } = useFinance();

  const [selectedWallet, setSelectedWallet] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        tx.note.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        tx.amount.toString().includes(q);

      // Wallet
      const matchWallet = selectedWallet === 'all' || tx.walletId === selectedWallet;

      // Type
      const matchType = selectedType === 'all' || tx.type === selectedType;

      return matchQuery && matchWallet && matchType;
    });
  }, [transactions, searchQuery, selectedWallet, selectedType]);

  const totalFilteredExpense = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalFilteredIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const handleExportCSV = () => {
    const headers = ['ID', 'Tanggal', 'Kategori', 'Tipe', 'Catatan', 'Jumlah', 'Rekening', 'Sumber'];
    const rows = filteredTransactions.map((tx) => [
      tx.id,
      tx.date,
      `"${tx.category}"`,
      tx.type,
      `"${tx.note}"`,
      tx.amount,
      tx.walletId,
      tx.source,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `recapduit_transaksi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Transaksi</h1>
          <p className="text-xs text-slate-500 mt-1">
            Cari, kelola, dan ekspor catatan transaksi Anda. Terintegrasi penuh dengan WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs shadow-sky-500/20 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Catat Transaksi</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari transaksi (contoh: nasi goreng, bensin, gaji)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Wallet Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-700 font-medium"
            >
              <option value="all">Semua Rekening</option>
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 text-slate-700 font-medium"
            >
              <option value="all">Semua Tipe</option>
              <option value="expense">Pengeluaran</option>
              <option value="income">Pemasukan</option>
            </select>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>{filteredTransactions.length} transaksi ditemukan</span>
          <div className="flex items-center gap-4">
            <span>
              Total Masuk:{' '}
              <strong className="text-emerald-600">+{formatRupiah(totalFilteredIncome)}</strong>
            </span>
            <span>
              Total Keluar:{' '}
              <strong className="text-rose-600">-{formatRupiah(totalFilteredExpense)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Tanggal</th>
                <th className="py-3.5 px-5">Kategori</th>
                <th className="py-3.5 px-5">Catatan</th>
                <th className="py-3.5 px-5">Rekening</th>
                <th className="py-3.5 px-5">Sumber</th>
                <th className="py-3.5 px-5 text-right">Jumlah</th>
                <th className="py-3.5 px-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => {
                  const walletObj = wallets.find((w) => w.id === tx.walletId);
                  return (
                    <tr key={tx.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="py-3.5 px-5 font-medium text-slate-600 whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-slate-800">
                        {tx.note}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                        {walletObj ? walletObj.name : 'Tunai'}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            tx.source === 'whatsapp' ? 'text-emerald-600' : 'text-slate-500'
                          }`}
                        >
                          {tx.source === 'whatsapp' ? '📱 WhatsApp' : '💻 Web App'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right whitespace-nowrap font-bold">
                        <span
                          className={
                            tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                          }
                        >
                          {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-center whitespace-nowrap">
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">Belum ada transaksi yang cocok.</p>
                    <p className="text-xs mt-1">Coba sesuaikan kata kunci pencarian atau filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
