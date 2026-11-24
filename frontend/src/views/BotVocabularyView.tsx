import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  Cpu,
  Plus,
  Trash2,
  Check,
  Sparkles,
  BookOpen,
  ArrowDownCircle,
  ArrowUpCircle,
  X,
} from 'lucide-react';

export const BotVocabularyView: React.FC = () => {
  const { categories, addCategoryKeyword, removeCategoryKeyword } = useFinance();
  const [activeTabType, setActiveTabType] = useState<'expense' | 'income'>('expense');
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Starting trigger words
  const [expenseTriggers, setExpenseTriggers] = useState<string[]>(['beli', 'bayar', 'jajan', 'order']);
  const [incomeTriggers, setIncomeTriggers] = useState<string[]>(['gaji', 'dapat', 'cair', 'nemu', 'transfer']);
  const [newExpenseTrigger, setNewExpenseTrigger] = useState('');
  const [newIncomeTrigger, setNewIncomeTrigger] = useState('');

  const handleAddKeyword = (catId: string) => {
    if (!newKeywordInput.trim()) return;
    addCategoryKeyword(catId, newKeywordInput.trim());
    setNewKeywordInput('');
    setSelectedCatId(null);
  };

  const handleAddExpenseTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTrigger.trim()) return;
    setExpenseTriggers([...expenseTriggers, newExpenseTrigger.trim().toLowerCase()]);
    setNewExpenseTrigger('');
  };

  const handleAddIncomeTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncomeTrigger.trim()) return;
    setIncomeTriggers([...incomeTriggers, newIncomeTrigger.trim().toLowerCase()]);
    setNewIncomeTrigger('');
  };

  const currentCategories = categories.filter((c) => c.type === activeTabType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kosakata Bot</h1>
          <p className="text-xs text-slate-500 mt-1">
            Ajari bot recapduit memetakan bahasa sehari-hari Anda ke kategori transaksi yang tepat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-xl">
            🧠 AI Parser Aktif
          </span>
        </div>
      </div>

      {/* Info Callout */}
      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex items-start gap-3 text-xs text-slate-700">
        <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Daftar kosakata ini adalah sumber utama kategori untuk bot WhatsApp dan pencatatan transaksi.
          Jika Anda menambah kata (misal: <em>"seblak"</em> ke Makanan), bot akan otomatis
          mengkategorikannya saat Anda kirim chat!
        </p>
      </div>

      {/* Kata Awal Transaksi (Pages 4 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pengeluaran Triggers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <ArrowDownCircle className="w-4 h-4 text-rose-500" />
            <div>
              <h3 className="text-xs font-bold text-slate-800">Kata Pemicu Pengeluaran</h3>
              <p className="text-[11px] text-slate-400">Kata awal untuk mencatat saldo keluar</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {expenseTriggers.map((trig, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-lg flex items-center gap-1.5"
              >
                {trig}
                <button
                  onClick={() => setExpenseTriggers(expenseTriggers.filter((_, i) => i !== idx))}
                  className="hover:text-rose-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddExpenseTrigger} className="flex gap-2 pt-1">
            <input
              type="text"
              value={newExpenseTrigger}
              onChange={(e) => setNewExpenseTrigger(e.target.value)}
              placeholder="Tambah pemicu (misal: meuli)..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg transition-colors"
            >
              +
            </button>
          </form>
        </div>

        {/* Pemasukan Triggers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <ArrowUpCircle className="w-4 h-4 text-emerald-500" />
            <div>
              <h3 className="text-xs font-bold text-slate-800">Kata Pemicu Pemasukan</h3>
              <p className="text-[11px] text-slate-400">Kata awal untuk mencatat saldo masuk</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {incomeTriggers.map((trig, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg flex items-center gap-1.5"
              >
                {trig}
                <button
                  onClick={() => setIncomeTriggers(incomeTriggers.filter((_, i) => i !== idx))}
                  className="hover:text-emerald-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={handleAddIncomeTrigger} className="flex gap-2 pt-1">
            <input
              type="text"
              value={newIncomeTrigger}
              onChange={(e) => setNewIncomeTrigger(e.target.value)}
              placeholder="Tambah pemicu (misal: bonusan)..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              +
            </button>
          </form>
        </div>
      </div>

      {/* Categories Vocabulary Grid (Page 4 bottom) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTabType('expense')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTabType === 'expense'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Kategori Pengeluaran ({categories.filter((c) => c.type === 'expense').length})
            </button>
            <button
              onClick={() => setActiveTabType('income')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTabType === 'income'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Kategori Pemasukan ({categories.filter((c) => c.type === 'income').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                    <h3 className="font-bold text-slate-800 text-sm">{cat.name}</h3>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {cat.keywords.length} kata kunci
                  </span>
                </div>

                {/* Keyword Chips */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {cat.keywords.slice(0, 10).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[11px] bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-colors group cursor-pointer inline-flex items-center gap-1"
                      onClick={() => removeCategoryKeyword(cat.id, kw)}
                      title="Klik untuk menghapus kata kunci ini"
                    >
                      {kw}
                      <X className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100" />
                    </span>
                  ))}
                  {cat.keywords.length > 10 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-semibold">
                      +{cat.keywords.length - 10} lainnya
                    </span>
                  )}
                </div>
              </div>

              {/* Add Keyword Input for this Category */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                {selectedCatId === cat.id ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newKeywordInput}
                      onChange={(e) => setNewKeywordInput(e.target.value)}
                      placeholder="Ketik kata baru..."
                      className="flex-1 px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddKeyword(cat.id);
                        if (e.key === 'Escape') setSelectedCatId(null);
                      }}
                    />
                    <button
                      onClick={() => handleAddKeyword(cat.id)}
                      className="px-2.5 py-1 bg-sky-600 text-white text-xs font-bold rounded-lg hover:bg-sky-700"
                    >
                      Simpan
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedCatId(cat.id);
                      setNewKeywordInput('');
                    }}
                    className="w-full py-1.5 text-xs text-sky-600 hover:text-sky-700 hover:bg-sky-50 font-semibold rounded-lg border border-dashed border-sky-200 transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Kosakata</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
