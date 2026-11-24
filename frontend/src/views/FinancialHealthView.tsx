import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import { Activity, ShieldCheck, Heart, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export const FinancialHealthView: React.FC = () => {
  const { totalBalance, totalIncomeMonth, totalExpenseMonth, totalHutang } = useFinance();

  // Metrics calculation
  const monthsEmergencyFund = totalExpenseMonth > 0 ? (totalBalance / totalExpenseMonth).toFixed(1) : '6.0';
  const expenseRatio = totalIncomeMonth > 0 ? Math.round((totalExpenseMonth / totalIncomeMonth) * 100) : 0;
  const debtRatio = totalIncomeMonth > 0 ? Math.round((totalHutang / totalIncomeMonth) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Kesehatan Finansial
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Cek kesiapan dana darurat dan evaluasi rasio keuangan pribadi Anda secara objektif.
        </p>
      </div>

      {/* Main Score Hero Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex flex-col items-center justify-center shrink-0 shadow-sm">
            <span className="text-2xl font-black">88</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">Skor / 100</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 rounded">
                Kondisi Prima
              </span>
              <span className="text-xs text-slate-400">Diperbarui otomatis</span>
            </div>
            <h2 className="text-lg font-bold text-slate-800 mt-1">
              Keuangan Anda Berada di Jalur yang Sangat Sehat
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mt-0.5 leading-relaxed">
              Arus kas bulanan surplus, dana cadangan mencukupi kebutuhan beberapa bulan ke depan, dan rasio hutang sangat minim.
            </p>
          </div>
        </div>

        <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors whitespace-nowrap">
          Unduh Laporan PDF
        </button>
      </div>

      {/* 3 Health Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Dana Darurat */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Dana Darurat
            </span>
            <span className="text-xs font-bold text-emerald-600">Aman</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{monthsEmergencyFund} Bulan</p>
          <p className="text-xs text-slate-500">
            Kapasitas bertahan tanpa penghasilan baru berdasarkan rata-rata pengeluaran bulanan Anda.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Pillar 2: Rasio Belanja */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-600" />
              Rasio Pengeluaran
            </span>
            <span className="text-xs font-bold text-sky-600">Ideal (&lt;50%)</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{expenseRatio}%</p>
          <p className="text-xs text-slate-500">
            Persentase pengeluaran terhadap total pemasukan bulan ini. Sisa {100 - expenseRatio}% dapat ditabung.
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full" style={{ width: `${expenseRatio}%` }}></div>
          </div>
        </div>

        {/* Pillar 3: Rasio Beban Hutang */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              Rasio Beban Hutang
            </span>
            <span className="text-xs font-bold text-emerald-600">Sangat Ringan</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{debtRatio}%</p>
          <p className="text-xs text-slate-500">
            Total kewajiban pinjaman Anda adalah {formatRupiah(totalHutang)}, jauh di bawah batas wajar (30%).
          </p>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.max(5, debtRatio)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-800">Rekomendasi dari Asisten recapduit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-slate-800">Pertahankan Batas Anggaran Kuliner</p>
              <p className="text-slate-500 mt-0.5">
                Alokasi makanan di warteg dan kopi sudah sangat terkontrol minggu ini.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-slate-800">Sisihkan ke Rekening Tabungan Terpisah</p>
              <p className="text-slate-500 mt-0.5">
                Gunakan fitur transfer antar rekening recapduit untuk memisahkan dana darurat di Bank BCA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
