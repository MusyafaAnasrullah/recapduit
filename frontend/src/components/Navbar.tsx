import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  Search,
  Plus,
  MessageSquare,
  Globe,
  Bell,
  Sun,
  Moon,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    profile,
    setIsAddModalOpen,
    setIsSimulatorOpen,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
  } = useFinance();

  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-sky-100 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left side: Active view context & breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 hidden sm:inline">
              {profile.name}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>WhatsApp Terhubung</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari transaksi, catatan, nominal... (Ctrl + K)"
              className="w-full pl-9 pr-12 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded shadow-xs">
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Simulator Button */}
          <button
            onClick={() => setIsSimulatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-all shadow-xs"
            title="Buka Simulator WhatsApp Bot"
          >
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">Tes Chat Bot</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-sky-200 text-sky-800 rounded-full font-bold">
              WA
            </span>
          </button>

          {/* Quick "+ Catat" Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 rounded-lg shadow-sm shadow-sky-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat</span>
          </button>

          {/* Language selector pill */}
          <button
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-sky-600 bg-slate-50 hover:bg-sky-50 border border-slate-200 rounded-md transition-colors"
            title="Pilih Bahasa"
          >
            <span className="font-semibold text-sky-600">ID</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">EN</span>
          </button>

          {/* User Avatar */}
          <div
            onClick={() => setActiveTab('pengaturan')}
            className="flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer group"
          >
            <img
              src="/logo.jpg"
              alt="Logo recapduit"
              className="w-8 h-8 rounded-full border border-sky-200 object-cover shadow-xs group-hover:ring-2 group-hover:ring-sky-400 transition-all"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
