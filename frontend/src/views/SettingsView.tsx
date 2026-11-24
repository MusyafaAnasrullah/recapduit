import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Sun,
  Moon,
  MessageCircle,
  Bell,
  CreditCard,
  ShieldAlert,
  ChevronRight,
  RotateCcw,
  Bot,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetDemoData, setIsSimulatorOpen } = useFinance();
  const [nicknameInput, setNicknameInput] = useState(profile.botNickname);
  const [phoneInput, setPhoneInput] = useState(profile.connectedPhone);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      botNickname: nicknameInput,
      connectedPhone: phoneInput,
    });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pengaturan</h1>
        <p className="text-xs text-slate-500 mt-1">
          Kelola profil, koneksi bot WhatsApp, bahasa, dan paket berlangganan recapduit Anda.
        </p>
      </div>

      {savedAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center justify-between">
          <span>✓ Pengaturan berhasil disimpan!</span>
        </div>
      )}

      {/* Group 1: Akun dan Tampilan (Page 3 top) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Akun dan Tampilan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Akun Pengguna</span>
            <p className="text-xs font-bold text-slate-800 mt-1 truncate">{profile.email}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{profile.name}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Bahasa Dashboard</span>
              <p className="text-xs text-slate-500 mt-1">Pilih bahasa tampilan dashboard</p>
            </div>
            <div className="flex gap-1.5 mt-3">
              <span className="px-3 py-1 bg-sky-600 text-white rounded-lg text-xs font-bold">
                ID
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                EN
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">Tema Tampilan</span>
              <p className="text-xs text-slate-500 mt-1">Tema terang aktif dengan aksen biru cerah</p>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg text-xs font-bold">
                <Sun className="w-3.5 h-3.5" />
                Terang
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Channel, Notifikasi, dan Billing (Page 3 middle) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Channel, Notifikasi, dan Billing
        </h2>
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs">
          {/* Channel Terhubung */}
          <div
            onClick={() => setIsSimulatorOpen(true)}
            className="p-4.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Channel Terhubung</p>
                <p className="text-[11px] text-slate-500">
                  WhatsApp: <strong className="text-slate-700">{profile.connectedPhone}</strong> (Aktif)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Terhubung
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Sapaan Panggilan Bot */}
          <div className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Panggilan Akrab Bot</p>
                <p className="text-[11px] text-slate-500">
                  Nama panggilan saat bot menyapa Anda di WhatsApp (misal: "bos", "juragan", "kak").
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                placeholder="bos"
                className="w-28 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-sky-500 font-bold"
              />
              <button
                onClick={handleSaveSettings}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>

          {/* Paket dan Billing */}
          <div className="p-4.5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Paket Langganan</p>
                <p className="text-[11px] text-slate-500">
                  Paket saat ini: <strong className="text-sky-700">{profile.plan} Edition</strong> (Akses Tanpa Batas)
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Paket Pro Anda aktif dan tidak ada tagihan tertunda.')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-sky-600 border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              Kelola Paket
            </button>
          </div>
        </div>
      </div>

      {/* Group 3: Akun dan Data (Page 3 bottom) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Akun dan Data
        </h2>
        <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs">
          <div className="p-4.5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Reset Data Demo</p>
                <p className="text-[11px] text-slate-500">
                  Kembalikan data transaksi, dompet, dan kategori ke kondisi awal.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm('Yakin ingin mereset seluruh data simulasi ke awal?')) {
                  resetDemoData();
                  alert('Data demo berhasil direset.');
                }
              }}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset Data
            </button>
          </div>

          <div className="p-4.5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Minta Penghapusan Akun</p>
                <p className="text-[11px] text-slate-500">
                  Ajukan penghapusan akun recapduit dan data WhatsApp melalui email dukungan.
                </p>
              </div>
            </div>
            <button
              onClick={() => alert('Permintaan penghapusan data telah dikirim ke tim privasi recapduit.')}
              className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
