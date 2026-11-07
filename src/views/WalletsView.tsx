import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  Wallet as WalletIcon,
  Plus,
  ArrowRightLeft,
  Building,
  Smartphone,
  Coins,
  Check,
  CreditCard,
  Share2,
} from 'lucide-react';

export const WalletsView: React.FC = () => {
  const { wallets, totalBalance, addWallet, transferWallet } = useFinance();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // New Wallet Form State
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'bank' | 'ewallet' | 'cash'>('bank');
  const [newBalance, setNewBalance] = useState('');
  const [newAccNum, setNewAccNum] = useState('');

  // Transfer State
  const [fromWallet, setFromWallet] = useState(wallets[0]?.id || '');
  const [toWallet, setToWallet] = useState(wallets[1]?.id || '');
  const [transferAmount, setTransferAmount] = useState('');

  const handleCreateWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addWallet({
      name: newName.trim(),
      type: newType,
      balance: parseFloat(newBalance.replace(/[^0-9]/g, '')) || 0,
      accountNumber: newAccNum.trim(),
      color: newType === 'bank' ? '#0284c7' : newType === 'ewallet' ? '#0ea5e9' : '#10b981',
    });

    setNewName('');
    setNewBalance('');
    setNewAccNum('');
    setShowAddModal(false);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount.replace(/[^0-9]/g, ''));
    if (!amt || amt <= 0) return;

    transferWallet(fromWallet, toWallet, amt);
    setTransferAmount('');
    setShowTransferModal(false);
  };

  const defaultWallet = wallets.find((w) => w.isDefault) || wallets[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dompet dan Rekening
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola rekening, saldo, akses bersama, dan transfer antar rekening dengan mudah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTransferModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-sky-600" />
            <span>Transfer Saldo</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs shadow-sky-500/20 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Rekening</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards (Page 11 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            TOTAL SALDO
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">
            {formatRupiah(totalBalance)}
          </p>
          <p className="text-xs text-slate-500 mt-2">{wallets.length} rekening aktif terdaftar</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            REKENING DEFAULT
          </span>
          <p className="text-xl font-bold text-sky-700 mt-2">
            {defaultWallet ? defaultWallet.name : 'Belum diatur'}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Saldo: {defaultWallet ? formatRupiah(defaultWallet.balance) : 'Rp 0'}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            TRANSFER CEPAT
          </span>
          <p className="text-sm font-bold text-slate-800 mt-2">Tersedia Antar Rekening Pribadi</p>
          <p className="text-xs text-slate-500 mt-1">
            Pindah dana tanpa biaya pencatatan tambahan.
          </p>
        </div>
      </div>

      {/* Wallets List Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-800">Rekening dalam Dompet Ini</h2>
          </div>
          <span className="text-xs text-slate-500">
            Bank, e-wallet, atau tunai yang menyimpan saldo aktif.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {wallets.map((w) => (
            <div
              key={w.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    {w.type === 'bank' ? (
                      <Building className="w-5 h-5" />
                    ) : w.type === 'ewallet' ? (
                      <Smartphone className="w-5 h-5" />
                    ) : (
                      <Coins className="w-5 h-5" />
                    )}
                  </div>
                  {w.isDefault && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                      ★ Default
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-800 text-sm mt-3">{w.name}</h3>
                <p className="text-[11px] text-slate-400">
                  {w.accountNumber ? `No: ${w.accountNumber}` : 'Uang Tunai Fisik'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/70">
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                  Saldo Tersedia
                </span>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {formatRupiah(w.balance)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-base text-slate-800 mb-1">Transfer Antar Rekening</h3>
            <p className="text-xs text-slate-500 mb-4">
              Pindahkan saldo dari satu dompet ke dompet lainnya.
            </p>

            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dari Rekening
                </label>
                <select
                  value={fromWallet}
                  onChange={(e) => setFromWallet(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({formatRupiah(w.balance)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ke Rekening
                </label>
                <select
                  value={toWallet}
                  onChange={(e) => setToWallet(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({formatRupiah(w.balance)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominal Transfer (Rp)
                </label>
                <input
                  type="text"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Contoh: 100000"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 font-bold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-all"
                >
                  Kirim Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Wallet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in zoom-in-95 duration-200">
            <h3 className="font-bold text-base text-slate-800 mb-1">Tambah Rekening Baru</h3>
            <p className="text-xs text-slate-500 mb-4">
              Daftarkan rekening bank, akun e-wallet, atau pos uang tunai baru.
            </p>

            <form onSubmit={handleCreateWallet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Rekening / Dompet
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Bank Jago, ShopeePay, Brankas Rumah"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Dompet
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                >
                  <option value="bank">Bank</option>
                  <option value="ewallet">E-Wallet</option>
                  <option value="cash">Uang Tunai / Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Rekening / HP (Opsional)
                </label>
                <input
                  type="text"
                  value={newAccNum}
                  onChange={(e) => setNewAccNum(e.target.value)}
                  placeholder="Contoh: 1234567890"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Saldo Awal (Rp)
                </label>
                <input
                  type="text"
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 font-bold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-all"
                >
                  Simpan Rekening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
