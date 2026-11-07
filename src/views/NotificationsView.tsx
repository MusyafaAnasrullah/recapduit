import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  Bell,
  Clock,
  Plus,
  CheckCircle2,
  Calendar,
  Smartphone,
  Shield,
  Trash2,
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { reminders, toggleReminder } = useFinance();
  const [activeSubTab, setActiveSubTab] = useState<'terjadwal' | 'buat' | 'otomatis'>('terjadwal');

  // Form for new reminder
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('20:00');
  const [newAmount, setNewAmount] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notifikasi</h1>
        <p className="text-xs text-slate-500 mt-1">
          Pengingat otomatis, laporan berkala, dan notifikasi jatuh tempo langsung ke WhatsApp Anda.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold text-slate-500">
        <button
          onClick={() => setActiveSubTab('terjadwal')}
          className={`pb-3 border-b-2 transition-all ${
            activeSubTab === 'terjadwal'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent hover:text-slate-700'
          }`}
        >
          Terjadwal ({reminders.length})
        </button>
        <button
          onClick={() => setActiveSubTab('otomatis')}
          className={`pb-3 border-b-2 transition-all ${
            activeSubTab === 'otomatis'
              ? 'border-sky-600 text-sky-600'
              : 'border-transparent hover:text-slate-700'
          }`}
        >
          Pengaturan Bot Otomatis
        </button>
      </div>

      {/* Content */}
      {activeSubTab === 'terjadwal' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                      <Bell className="w-4 h-4" />
                    </div>
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        rem.isActive ? 'bg-sky-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          rem.isActive ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm mt-3">{rem.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pukul {rem.time} WIB</span>
                  </div>

                  {rem.amount && (
                    <p className="text-xs font-semibold text-slate-700 mt-2">
                      Estimasi: {formatRupiah(rem.amount)}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Via WhatsApp</span>
                  <span
                    className={`font-semibold ${
                      rem.isActive ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {rem.isActive ? '● Aktif' : 'Nonaktif'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Pengaturan Notifikasi Otomatis Bot</h3>
          <p className="text-xs text-slate-500">
            Aktifkan pesan cerdas dari bot recapduit untuk membantu Anda tetap disiplin keuangan.
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                title: 'Sapaan Pagi & Saldo Terkini',
                desc: 'Bot mengirimkan saldo awal hari jam 07:00 pagi setiap hari kerja.',
                checked: true,
              },
              {
                title: 'Peringatan Anggaran Menipis',
                desc: 'Bot langsung memberitahu jika pengeluaran kategori mencapai 80% dari batas.',
                checked: true,
              },
              {
                title: 'Pengingat Jatuh Tempo Hutang/Piutang',
                desc: 'Notifikasi H-3 dan H-1 sebelum tanggal jatuh tempo cicilan atau piutang.',
                checked: true,
              },
              {
                title: 'Rekap Mingguan Hari Minggu',
                desc: 'Rangkuman total pengeluaran dan pemasukan seminggu penuh dikirim jam 20:00.',
                checked: true,
              },
            ].map((item, idx) => (
              <label
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="rounded text-sky-600 focus:ring-sky-500 mt-0.5"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
