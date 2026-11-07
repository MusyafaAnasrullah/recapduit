import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  Plus,
  Trash2,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  Check,
  ShieldCheck,
  Wallet,
  Calendar,
  Clock,
  Search,
  X,
  AlertCircle,
  HelpCircle,
  User,
} from 'lucide-react';

export const DebtsView: React.FC = () => {
  const {
    debts,
    addDebt,
    toggleDebtStatus,
    deleteDebt,
    totalBalance,
    totalPiutang,
    totalHutang,
    netWorth,
    setIsSimulatorOpen,
  } = useFinance();

  const [filterType, setFilterType] = useState<'all' | 'piutang' | 'hutang'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'belum_lunas' | 'lunas'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [person, setPerson] = useState('');
  const [type, setType] = useState<'piutang' | 'hutang'>('piutang');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [note, setNote] = useState('');

  // Counts
  const countAll = debts.length;
  const countPiutang = debts.filter((d) => d.type === 'piutang').length;
  const countHutang = debts.filter((d) => d.type === 'hutang').length;

  const filteredDebts = debts.filter((d) => {
    const matchType = filterType === 'all' || d.type === filterType;
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchSearch =
      searchQuery.trim() === '' ||
      d.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.note.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const totalVisibleAmount = filteredDebts.reduce((sum, d) => sum + d.amount, 0);

  const formatIndonesianDate = (dateStr: string) => {
    if (!dateStr) return '-';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
          'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
        ];
        const day = parseInt(parts[2], 10);
        const monthIdx = parseInt(parts[1], 10) - 1;
        const year = parts[0];
        return `${day} ${months[monthIdx] || ''} ${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const getDueBadge = (dueDateStr: string, isLunas: boolean) => {
    if (isLunas || !dueDateStr) return null;
    const now = new Date();
    const due = new Date(dueDateStr);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return (
        <span className="inline-block text-[10px] text-rose-700 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded-md">
          Lewat {Math.abs(diffDays)} hari
        </span>
      );
    } else if (diffDays === 0) {
      return (
        <span className="inline-block text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-md">
          Hari ini
        </span>
      );
    } else if (diffDays <= 7) {
      return (
        <span className="inline-block text-[10px] text-sky-700 font-semibold bg-sky-50 border border-sky-200 px-1.5 py-0.2 rounded-md">
          {diffDays} hari lagi
        </span>
      );
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('');
  };

  const handleCreateDebt = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmt = parseFloat(amount.replace(/[^0-9]/g, ''));
    if (!person.trim() || !numAmt) return;

    addDebt({
      person: person.trim(),
      type,
      amount: numAmt,
      dueDate: dueDate || new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0],
      note: note.trim() || `${type === 'piutang' ? 'Piutang ke' : 'Pinjam ke'} ${person}`,
      status: 'belum_lunas',
    });

    setPerson('');
    setAmount('');
    setDueDate('');
    setNote('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hutang Piutang</h1>
          <p className="text-xs text-slate-500 mt-1">
            Pantau uang yang masih harus kembali dan kewajiban yang perlu dibayar tepat waktu.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-all shadow-2xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-sky-600" />
            <span>Format WhatsApp</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs shadow-sky-500/20 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Catatan</span>
          </button>
        </div>
      </div>

      {/* 4 Cards (Clean Metric Overview) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Kekayaan Bersih */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Perkiraan Kekayaan Bersih
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-slate-900 tabular-nums">
              {formatRupiah(netWorth)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Saldo kas + piutang − kewajiban hutang
            </p>
          </div>
        </div>

        {/* Card 2: Saldo Kas Riil */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Saldo Kas Riil
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-sky-700 tabular-nums">
              {formatRupiah(totalBalance)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Saldo saat ini di semua rekening
            </p>
          </div>
        </div>

        {/* Card 3: Piutang Tersisa */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              Piutang Tersisa
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-emerald-600 tabular-nums">
              {formatRupiah(totalPiutang)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Uang yang perlu Anda tagih kembali
            </p>
          </div>
        </div>

        {/* Card 4: Hutang Tersisa */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
              Hutang Tersisa
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-black text-rose-600 tabular-nums">
              {formatRupiah(totalHutang)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-snug">
              Kewajiban pinjaman belum lunas
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar & Quick Tip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'all'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Semua</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterType === 'all' ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {countAll}
              </span>
            </button>

            <button
              onClick={() => setFilterType('piutang')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'piutang'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Piutang (Dipinjam Orang)</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterType === 'piutang'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {countPiutang}
              </span>
            </button>

            <button
              onClick={() => setFilterType('hutang')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'hutang'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ArrowDownLeft className="w-3.5 h-3.5" />
              <span>Hutang (Pinjam ke Orang)</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  filterType === 'hutang'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {countHutang}
              </span>
            </button>
          </div>

          {/* Quick Tip Badge */}
          <div className="flex items-center gap-2 text-xs text-slate-600 bg-sky-50/80 border border-sky-100 px-3.5 py-2 rounded-xl shrink-0">
            <span className="text-sm">💡</span>
            <span>
              Tips: Chat di WhatsApp <code className="text-sky-700 font-bold bg-white px-1.5 py-0.5 rounded border border-sky-200">"Hutangin Budi 50rb"</code>
            </span>
          </div>
        </div>

        {/* Sub-toolbar: Search & Status Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-slate-100">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama orang atau keterangan..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-700"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-slate-400 text-[11px] mr-1">Status:</span>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilterStatus('belum_lunas')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterStatus === 'belum_lunas'
                  ? 'bg-amber-100 text-amber-900 font-bold border border-amber-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Belum Lunas
            </button>
            <button
              onClick={() => setFilterStatus('lunas')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterStatus === 'lunas'
                  ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Lunas
            </button>
          </div>
        </div>
      </div>

      {/* Debts Table View */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Pihak Terkait</th>
                <th className="py-3.5 px-4">Jenis</th>
                <th className="py-3.5 px-4">Keterangan</th>
                <th className="py-3.5 px-4">Jatuh Tempo</th>
                <th className="py-3.5 px-5 text-right">Nominal</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDebts.length > 0 ? (
                filteredDebts.map((d) => {
                  const isLunas = d.status === 'lunas';
                  return (
                    <tr
                      key={d.id}
                      className={`hover:bg-sky-50/30 transition-colors ${
                        isLunas ? 'bg-slate-50/40 text-slate-400' : ''
                      }`}
                    >
                      {/* Pihak Terkait */}
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                              d.type === 'piutang'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {getInitials(d.person)}
                          </div>
                          <div>
                            <p
                              className={`font-bold ${
                                isLunas ? 'text-slate-500 line-through' : 'text-slate-900'
                              }`}
                            >
                              {d.person}
                            </p>
                            {d.createdAt && (
                              <p className="text-[10px] text-slate-400">
                                Dicatat: {formatIndonesianDate(d.createdAt)}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Jenis */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            d.type === 'piutang'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {d.type === 'piutang' ? (
                            <>
                              <ArrowUpRight className="w-3 h-3" />
                              Piutang
                            </>
                          ) : (
                            <>
                              <ArrowDownLeft className="w-3 h-3" />
                              Hutang
                            </>
                          )}
                        </span>
                      </td>

                      {/* Keterangan */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p
                          className={`font-medium ${
                            isLunas ? 'text-slate-400' : 'text-slate-700'
                          } truncate`}
                          title={d.note}
                        >
                          {d.note}
                        </p>
                      </td>

                      {/* Jatuh Tempo */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-medium ${
                              isLunas ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {formatIndonesianDate(d.dueDate)}
                          </span>
                          {getDueBadge(d.dueDate, isLunas)}
                        </div>
                      </td>

                      {/* Nominal */}
                      <td className="py-3.5 px-5 text-right whitespace-nowrap font-extrabold tabular-nums">
                        <span className={isLunas ? 'text-slate-400 line-through' : 'text-slate-900'}>
                          {formatRupiah(d.amount)}
                        </span>
                      </td>

                      {/* Status Toggle Button */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => toggleDebtStatus(d.id)}
                          title="Klik untuk mengubah status pembayaran"
                          className={`group inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs ${
                            isLunas
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 hover:border-sky-300'
                          }`}
                        >
                          {isLunas ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Lunas</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 text-sky-500" />
                              <span>Belum Lunas</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus catatan hutang/piutang dengan ${d.person}?`)) {
                              deleteDebt(d.id);
                            }
                          }}
                          title="Hapus catatan"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
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
                    <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-600">
                      Tidak ada catatan yang sesuai dengan filter.
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Coba ganti filter atau tambahkan catatan hutang/piutang baru.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        {filteredDebts.length > 0 && (
          <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>
              Menampilkan <strong className="text-slate-700">{filteredDebts.length}</strong> catatan
            </span>
            <div className="flex items-center gap-1.5">
              <span>Total Nominal Ditampilkan:</span>
              <strong className="text-slate-800 font-extrabold">{formatRupiah(totalVisibleAmount)}</strong>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Tambah Catatan Hutang / Piutang</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Catat tagihan atau pinjaman agar tercatat rapi dan otomatis.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDebt} className="space-y-4">
              {/* Type Switcher */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setType('piutang')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    type === 'piutang'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Piutang (Uang Dipinjam)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('hutang')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    type === 'hutang'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-rose-700'
                  }`}
                >
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Hutang (Anda Meminjam)</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Orang / Pihak <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  placeholder="Contoh: Budi Santoso, Dimas, Reza"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-800 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nominal (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Contoh: 150000"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-bold text-slate-900"
                  required
                />
                {amount && (
                  <p className="text-[11px] text-sky-600 font-bold mt-1">
                    Preview: {formatRupiah(parseFloat(amount.replace(/[^0-9]/g, '')) || 0)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jatuh Tempo (Opsional)
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keterangan / Keperluan
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Talangan beli tiket futsal & jersey"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-all active:scale-95"
                >
                  Simpan Catatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
