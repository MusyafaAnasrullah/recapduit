import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import { PieChart, Plus, AlertTriangle, CheckCircle, Edit2 } from 'lucide-react';

export const BudgetView: React.FC = () => {
  const { budgets, updateBudgetLimit, categories } = useFinance();
  const [editingBudget, setEditingBudget] = useState<{ id: string; name: string; limit: number } | null>(null);
  const [newLimitVal, setNewLimitVal] = useState('');

  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const overallPercentage = totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBudget) return;
    const num = parseFloat(newLimitVal.replace(/[^0-9]/g, ''));
    if (num && num > 0) {
      updateBudgetLimit(editingBudget.id, num);
    }
    setEditingBudget(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Anggaran</h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola dan pantau batas pengeluaran berdasarkan siklus bulanan Anda.
          </p>
        </div>
      </div>

      {/* Overview Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              PENGGUNAAN ANGGARAN TOTAL
            </span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {formatRupiah(totalSpent)}
              </span>
              <span className="text-xs text-slate-400">dari alokasi {formatRupiah(totalLimit)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Sisa anggaran bulan ini:{' '}
              <strong className="text-sky-600">{formatRupiah(Math.max(0, totalLimit - totalSpent))}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-3xl font-black text-sky-600">{overallPercentage}%</span>
              <p className="text-[11px] font-semibold text-slate-400">Total Terpakai</p>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full mt-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              overallPercentage > 90
                ? 'bg-rose-500'
                : overallPercentage > 75
                ? 'bg-amber-500'
                : 'bg-sky-500'
            }`}
            style={{ width: `${Math.min(100, overallPercentage)}%` }}
          ></div>
        </div>
      </div>

      {/* Category Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => {
          const percent = b.limit > 0 ? Math.round((b.spent / b.limit) * 100) : 0;
          const isWarning = percent >= 80;
          const isOver = percent >= 100;

          return (
            <div
              key={b.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">{b.categoryName}</h3>
                  <button
                    onClick={() => {
                      setEditingBudget({ id: b.id, name: b.categoryName, limit: b.limit });
                      setNewLimitVal(b.limit.toString());
                    }}
                    className="p-1 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded transition-colors"
                    title="Ubah Batas Budget"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Terpakai:</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {formatRupiah(b.spent)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-xs text-slate-400">Batas Maks:</span>
                    <span className="text-xs font-semibold text-slate-600">
                      {formatRupiah(b.limit)}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isOver ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-sky-500'
                    }`}
                    style={{ width: `${Math.min(100, percent)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-[11px]">
                <span
                  className={`font-semibold ${
                    isOver ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'
                  }`}
                >
                  {isOver ? 'Melebihi batas!' : isWarning ? 'Mendekati batas' : 'Aman'} ({percent}%)
                </span>
                <span className="text-slate-400">
                  Sisa: {formatRupiah(Math.max(0, b.limit - b.spent))}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Budget Modal */}
      {editingBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border border-slate-100 animate-in zoom-in-95">
            <h3 className="font-bold text-base text-slate-800 mb-1">
              Atur Batas: {editingBudget.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tentukan nominal batas pengeluaran bulanan untuk kategori ini.
            </p>

            <form onSubmit={handleSaveBudget} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batas Bulanan (Rp)
                </label>
                <input
                  type="text"
                  value={newLimitVal}
                  onChange={(e) => setNewLimitVal(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                  autoFocus
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBudget(null)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm"
                >
                  Simpan Batas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
