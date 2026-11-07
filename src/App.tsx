import React, { useState } from 'react';
import { useFinance } from './context/FinanceContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AddTransactionModal } from './components/AddTransactionModal';
import { WhatsAppSimulatorDrawer } from './components/WhatsAppSimulatorDrawer';

// Views
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { TransactionsView } from './views/TransactionsView';
import { WalletsView } from './views/WalletsView';
import { DebtsView } from './views/DebtsView';
import { AnalyticsView } from './views/AnalyticsView';
import { BudgetView } from './views/BudgetView';
import { FinancialHealthView } from './views/FinancialHealthView';
import { BotVocabularyView } from './views/BotVocabularyView';
import { NotificationsView } from './views/NotificationsView';
import { AffiliateView } from './views/AffiliateView';
import { SettingsView } from './views/SettingsView';
import { GuideView } from './views/GuideView';
import { LoginPage } from './views/LoginPage';

import { Menu, MessageSquare, Sparkles } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsSimulatorOpen } = useFinance();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If user is viewing the public landing page (Gambar 1)
  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage />
        <WhatsAppSimulatorDrawer />
      </>
    );
  }

  // If user is viewing the login page (Gambar 2)
  if (activeTab === 'login') {
    return (
      <>
        <LoginPage />
        <WhatsAppSimulatorDrawer />
      </>
    );
  }

  // Active view router
  const renderView = () => {
    switch (activeTab) {
      case 'beranda':
        return <DashboardView />;
      case 'transaksi':
        return <TransactionsView />;
      case 'kategori':
      case 'kosakata':
        return <BotVocabularyView />;
      case 'dompet':
        return <WalletsView />;
      case 'hutang-piutang':
        return <DebtsView />;
      case 'laporan':
        return <AnalyticsView />;
      case 'anggaran':
        return <BudgetView />;
      case 'kesehatan':
        return <FinancialHealthView />;
      case 'notifikasi':
        return <NotificationsView />;
      case 'afiliasi':
        return <AffiliateView />;
      case 'pengaturan':
        return <SettingsView />;
      case 'panduan':
        return <GuideView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row font-sans selection:bg-sky-500 selection:text-white">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-1.5 text-slate-600 hover:text-sky-600 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveTab('beranda')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/logo.jpg" alt="recapduit" className="w-7 h-7 rounded-lg object-cover" />
          <span className="font-extrabold text-base tracking-tight text-slate-900">
            recap<span className="text-sky-600">duit</span>
          </span>
        </div>

        <button
          onClick={() => setIsSimulatorOpen(true)}
          className="p-1.5 bg-sky-50 text-sky-600 rounded-lg"
          title="Tes Bot WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>

      {/* Main Sidebar */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Navbar */}
        <Navbar />

        {/* View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderView()}
        </main>
      </div>

      {/* Floating Action Button for Testing WhatsApp Bot */}
      <aside aria-label="Bantuan Bot" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsSimulatorOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-xs shadow-xl shadow-sky-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Tes WhatsApp Bot</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </aside>

      {/* Modals & Drawers */}
      <AddTransactionModal />
      <WhatsAppSimulatorDrawer />
    </div>
  );
};
