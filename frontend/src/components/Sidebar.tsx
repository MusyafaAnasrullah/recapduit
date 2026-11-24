import React from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  Receipt,
  BarChart3,
  PieChart,
  Activity,
  Share2,
  Bell,
  Cpu,
  Settings,
  BookOpen,
  Globe,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const { activeTab, setActiveTab, profile, setIsSimulatorOpen } = useFinance();

  const navGroups = [
    {
      title: null,
      items: [
        { id: 'beranda', label: 'Beranda', icon: LayoutDashboard },
      ],
    },
    {
      title: 'KEUANGAN',
      items: [
        { id: 'transaksi', label: 'Transaksi', icon: ArrowLeftRight },
        { id: 'kategori', label: 'Kategori', icon: Tags },
        { id: 'dompet', label: 'Dompet dan Rekening', icon: Wallet },
        { id: 'hutang-piutang', label: 'Hutang dan Piutang', icon: Receipt },
      ],
    },
    {
      title: 'PERENCANAAN DAN LAPORAN',
      items: [
        { id: 'laporan', label: 'Laporan dan Analitik', icon: BarChart3 },
        { id: 'anggaran', label: 'Anggaran', icon: PieChart },
        { id: 'kesehatan', label: 'Kesehatan Finansial', icon: Activity },
        { id: 'afiliasi', label: 'Afiliasi', icon: Share2 },
      ],
    },
    {
      title: 'OTOMATISASI',
      items: [
        { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
        { id: 'kosakata', label: 'Kosakata Bot', icon: Cpu },
      ],
    },
    {
      title: 'PENGATURAN',
      items: [
        { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
      ],
    },
    {
      title: 'BANTUAN & INFO',
      items: [
        { id: 'panduan', label: 'Buku Panduan', icon: BookOpen },
        { id: 'landing', label: 'Landing Page Web', icon: Globe },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
          <div
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="recapduit logo"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                recap<span className="text-sky-600">duit</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
                Bot WhatsApp Pintar
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.title && (
                <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all text-left ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 font-semibold shadow-xs border-l-4 border-sky-600 pl-2'
                        : 'text-slate-600 hover:text-sky-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-sky-600' : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* WhatsApp Simulator Banner */}
          <div className="mx-1 p-3.5 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1 rounded-md bg-white/20">
                <MessageCircle className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-xs">WhatsApp Bot</span>
            </div>
            <p className="text-[11px] text-sky-100 mb-2.5 leading-relaxed">
              Ketik "Makan 25rb" di WhatsApp, data langsung muncul di sini!
            </p>
            <button
              onClick={() => setIsSimulatorOpen(true)}
              className="w-full py-1.5 px-3 bg-white text-sky-700 hover:bg-sky-50 active:scale-95 text-[11px] font-bold rounded-lg shadow-xs transition-all text-center"
            >
              Uji Coba Sekarang 🚀
            </button>
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-1">
          <div
            onClick={() => handleNavClick('pengaturan')}
            className="flex-1 flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white cursor-pointer transition-colors border border-transparent hover:border-slate-200 min-w-0"
          >
            <div className="relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{profile.name}</p>
              <p className="text-[10px] text-slate-400 truncate">Paket: {profile.plan}</p>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('landing')}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
            title="Keluar ke Halaman Utama"
          >
            <Globe className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
