import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sparkles,
  PieChart,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const {
    transactions,
    categories,
    totalIncomeMonth,
    totalExpenseMonth,
    totalBalance,
    profile,
  } = useFinance();

  const [period, setPeriod] = useState<'mingguan' | 'bulanan'>('bulanan');

  // Calculate category breakdown
  const categoryTotals: { [key: string]: number } = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const sortedCategories = Object.entries(categoryTotals)
    .map(([cat, amount]) => ({
      name: cat,
      amount,
      percentage: totalExpenseMonth > 0 ? Math.round((amount / totalExpenseMonth) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  // Cashflow bars (simulate 6 periods: Mei - Nov or Mingguan)
  const cashflowData = [
    { label: 'Jun', income: 7200000, expense: 3800000 },
    { label: 'Jul', income: 7500000, expense: 4200000 },
    { label: 'Agu', income: 8100000, expense: 4100000 },
    { label: 'Sep', income: 7800000, expense: 3900000 },
    { label: 'Okt', income: 9250000, expense: 4600000 },
    { label: 'Nov', income: totalIncomeMonth, expense: totalExpenseMonth },
  ];

  const maxBarValue = Math.max(
    ...cashflowData.flatMap((d) => [d.income, d.expense]),
    10000000
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Laporan dan Analitik
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Pelajari tren arus kas, alokasi kategori jajan, dan insight cerdas dari transaksi Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex">
            <button
              onClick={() => setPeriod('mingguan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === 'mingguan'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setPeriod('bulanan')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                period === 'bulanan'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              Bulanan
            </button>
          </div>
        </div>
      </div>

      {/* AI Financial Insight Banner (Page 9 feature) */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white rounded-2xl p-5 shadow-md shadow-sky-500/15">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-xs shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-200">
                AI Analisis Finansial recapduit
              </span>
              <span className="px-2 py-0.2 bg-white/20 rounded text-[10px] font-bold">
                Laporan Aktif
              </span>
            </div>
            <p className="text-sm font-bold">
              Arus kas Anda bulan November berada dalam posisi surplus yang sangat sehat!
            </p>
            <p className="text-xs text-sky-100 leading-relaxed pt-1">
              • Rasio tabungan Anda mencapai <strong>88%</strong> karena pemasukan baru tercatat
              dan pengeluaran masih terkendali.
              <br />• Kategori pengeluaran terbesar saat ini adalah{' '}
              <strong>{sortedCategories[0]?.name || 'Makanan & Minuman'}</strong>.
              <br />• Anda berpotensi menyisihkan{' '}
              <strong>{formatRupiah(totalIncomeMonth - totalExpenseMonth)}</strong> ke rekening
              investasi atau dana darurat.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Cashflow Chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cashflow Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Tren Arus Kas (6 Bulan Terakhir)</h2>
              <p className="text-xs text-slate-400">Perbandingan pemasukan vs pengeluaran</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                Pemasukan
              </span>
              <span className="flex items-center gap-1.5 text-sky-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span>
                Pengeluaran
              </span>
            </div>
          </div>

          {/* Custom SVG / CSS Bar Chart */}
          <div className="pt-6">
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-6 px-2">
              {cashflowData.map((item, idx) => {
                const incHeight = Math.max(10, Math.round((item.income / maxBarValue) * 100));
                const expHeight = Math.max(10, Math.round((item.expense / maxBarValue) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-48 relative">
                      {/* Income Bar */}
                      <div
                        style={{ height: `${incHeight}%` }}
                        className="w-1/2 max-w-[28px] bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-all relative group-hover:shadow-md cursor-pointer"
                        title={`Pemasukan: ${formatRupiah(item.income)}`}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap pointer-events-none transition-opacity z-10">
                          {formatRupiah(item.income)}
                        </div>
                      </div>

                      {/* Expense Bar (in bright blue) */}
                      <div
                        style={{ height: `${expHeight}%` }}
                        className="w-1/2 max-w-[28px] bg-sky-500 rounded-t-md hover:bg-sky-600 transition-all relative group-hover:shadow-md cursor-pointer"
                        title={`Pengeluaran: ${formatRupiah(item.expense)}`}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap pointer-events-none transition-opacity z-10">
                          {formatRupiah(item.expense)}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-500 group-hover:text-sky-600 transition-colors">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Breakdown (1 col) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">Distribusi Kategori</h2>
              <span className="text-[11px] font-bold text-sky-600">Bulan Ini</span>
            </div>

            <div className="space-y-3.5 mt-4">
              {sortedCategories.slice(0, 5).map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                    <span className="font-bold text-slate-900">{formatRupiah(cat.amount)}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{cat.percentage}% dari pengeluaran</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500">
              Total Pengeluaran:{' '}
              <strong className="text-slate-800">{formatRupiah(totalExpenseMonth)}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
