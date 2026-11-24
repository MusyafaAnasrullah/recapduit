import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ShieldCheck,
  PieChart,
  Receipt,
  Plus,
  ArrowRight,
  CheckCircle2,
  Circle,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Smartphone,
  Trash2,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    totalBalance,
    totalIncomeMonth,
    totalExpenseMonth,
    totalPiutang,
    totalHutang,
    transactions,
    deleteTransaction,
    setIsAddModalOpen,
    setIsSimulatorOpen,
    setActiveTab,
    profile,
  } = useFinance();

  const recentTransactions = transactions.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Beranda</h1>
        <p className="text-xs text-slate-500 mt-1">
          Berikut ringkasan keuanganmu bulan ini. Semua data terhubung otomatis dengan WhatsApp.
        </p>
      </div>

      {/* Onboarding Checklist Box (from Page 14) */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50/30 border border-sky-100 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-sky-100/70">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-sky-100 text-sky-800 rounded">
                  MULAI DI SINI
                </span>
                <span className="text-xs font-semibold text-sky-700">3 dari 4 selesai</span>
              </div>
              <h2 className="text-base font-bold text-slate-800 mt-0.5">
                Siap mencatat keuangan bersama recapduit
              </h2>
              <p className="text-xs text-slate-500">
                Selesaikan beberapa langkah singkat untuk pengalaman finansial terbaik.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all shrink-0 active:scale-95"
          >
            <Smartphone className="w-4 h-4" />
            <span>Buka WhatsApp Bot</span>
          </button>
        </div>

        {/* 4 Interactive Checklist Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <div
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xs cursor-pointer transition-all"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800">Catat transaksi</p>
                <p className="text-[11px] text-slate-500">Ketik pengeluaran apa saja</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xs cursor-pointer transition-all"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800">Hubungkan WhatsApp</p>
                <p className="text-[11px] text-slate-500">Nomor: {profile.connectedPhone}</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div
            onClick={() => setActiveTab('dompet')}
            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xs cursor-pointer transition-all"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800">Kenali Dompet</p>
                <p className="text-[11px] text-slate-500">BCA, Mandiri, Cash, GoPay</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div
            onClick={() => setActiveTab('anggaran')}
            className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-xs cursor-pointer transition-all"
          >
            <div className="flex items-start gap-2.5">
              <Circle className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-800">Buat Anggaran</p>
                <p className="text-[11px] text-slate-500">Kendalikan batas jajan</p>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Primary Financial Metric Cards (Page 14 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Saldo Saat Ini (Bright Blue Card) */}
        <div className="bg-gradient-to-br from-sky-600 via-sky-600 to-blue-700 text-white rounded-2xl p-5 shadow-md shadow-sky-600/15 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-200">
              SALDO SAAT INI
            </span>
            <span className="p-1.5 rounded-lg bg-white/10 backdrop-blur-xs">
              <Wallet className="w-4 h-4 text-white" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {formatRupiah(totalBalance)}
          </p>
          <div className="flex items-center gap-2 mt-3 text-xs text-sky-100">
            <span className="inline-flex items-center gap-1 font-semibold bg-white/20 px-2 py-0.5 rounded-full text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              4 Rekening Aktif
            </span>
            <span>Tunai & Bank Terkoneksi</span>
          </div>
        </div>

        {/* Card 2: Total Pemasukan */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL PEMASUKAN BULAN INI
            </span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600">
            +{formatRupiah(totalIncomeMonth)}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
            <span className="font-semibold text-emerald-600">+12%</span>
            <span>dibandingkan bulan lalu</span>
          </div>
        </div>

        {/* Card 3: Total Pengeluaran */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-200 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              TOTAL PENGELUARAN BULAN INI
            </span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-500">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-rose-600">
            -{formatRupiah(totalExpenseMonth)}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-500">
            <span className="font-semibold text-sky-600">Terkontrol</span>
            <span>di bawah batas budget</span>
          </div>
        </div>
      </div>

      {/* Secondary Metric Cards (Page 14 middle row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kesehatan Finansial */}
        <div
          onClick={() => setActiveTab('kesehatan')}
          className="bg-white border border-slate-200 rounded-2xl p-4.5 hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              Kesehatan Finansial
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </div>
          <p className="text-sm font-bold text-emerald-600">Kondisi Stabil</p>
          <p className="text-xs text-slate-500 mt-1">
            Dana darurat aman untuk 3.5 bulan kebutuhan rutin.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Anggaran */}
        <div
          onClick={() => setActiveTab('anggaran')}
          className="bg-white border border-slate-200 rounded-2xl p-4.5 hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-600" />
              Batas Anggaran
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </div>
          <p className="text-sm font-bold text-slate-800">Terpakai 42%</p>
          <p className="text-xs text-slate-500 mt-1">
            Tersisa Rp 3.250.000 dari total alokasi pengeluaran.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        {/* Buku Hutang Piutang */}
        <div
          onClick={() => setActiveTab('hutang-piutang')}
          className="bg-white border border-slate-200 rounded-2xl p-4.5 hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-sky-600" />
              Buku Hutang Piutang
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </div>
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Piutang Ditagih</p>
              <p className="text-sm font-bold text-emerald-600">{formatRupiah(totalPiutang)}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Hutang Belum Lunas</p>
              <p className="text-sm font-bold text-rose-500">{formatRupiah(totalHutang)}</p>
            </div>
          </div>
          <p className="text-[11px] text-sky-600 font-semibold mt-2.5">
            Kelola rincian pinjaman & jatuh tempo &rarr;
          </p>
        </div>
      </div>

      {/* Recent Transactions Section (Page 14 bottom) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Transaksi Terakhir</h2>
              <p className="text-xs text-slate-500">
                Pencatatan real-time via WhatsApp dan manual
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('transaksi')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 px-3 py-1.5 hover:bg-sky-50 rounded-lg transition-colors"
            >
              Lihat Semua
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Tambah Transaksi</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Tanggal</th>
                <th className="py-3 px-5">Kategori</th>
                <th className="py-3 px-5">Catatan</th>
                <th className="py-3 px-5">Sumber</th>
                <th className="py-3 px-5 text-right">Jumlah</th>
                <th className="py-3 px-5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-sky-50/30 transition-colors">
                  <td className="py-3.5 px-5 font-medium text-slate-600 whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800 max-w-xs truncate">
                    {tx.note}
                  </td>
                  <td className="py-3.5 px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        tx.source === 'whatsapp' ? 'text-emerald-600' : 'text-slate-500'
                      }`}
                    >
                      {tx.source === 'whatsapp' ? '📱 WhatsApp' : '💻 Manual'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <span
                      className={`font-bold ${
                        tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center whitespace-nowrap">
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors"
                      title="Hapus transaksi"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
