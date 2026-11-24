import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setActiveTab, updateProfile } = useFinance();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (email.trim()) {
        updateProfile({
          email: email.trim(),
          name: name.trim() || email.split('@')[0] || 'Musyafa Anasrullah',
        });
      }
      // Masuk ke dashboard
      setActiveTab('beranda');
    }, 350);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('beranda');
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4 relative font-sans selection:bg-sky-500 selection:text-white">
      {/* Tombol Kembali ke Halaman Utama */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between">
        <a
          href="#landing"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('landing');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Halaman Utama</span>
        </a>
      </div>

      {/* Login Card (Replikasi Sempurna Gambar 2 dengan Logo & Warna Biru Cerah) */}
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 p-8 sm:p-9 relative animate-in zoom-in-95 duration-200">
        {/* Header: Logo recapduit & Judul */}
        <div className="flex flex-col items-center text-center">
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 cursor-pointer group mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="recapduit logo"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              recap<span className="text-sky-600">duit</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 mt-1">
            {isRegister
              ? 'Daftar akun baru untuk mulai mencatat keuangan via WhatsApp.'
              : 'Selamat datang kembali, silakan masuk ke akun Anda.'}
          </p>
        </div>

        {/* Tombol Lanjutkan dengan Google */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 active:scale-[0.98] border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            {/* Google Multicolor SVG Icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>
        </div>

        {/* Pemisah ATAU */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-slate-400">
            ATAU
          </span>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Alamat Email"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => alert('Tautan reset kata sandi telah dikirim ke email Anda.')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-colors cursor-pointer"
                >
                  Lupa Kata Sandi
                </button>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kata Sandi"
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tombol Masuk (Berwarna Biru Cerah Sesuai Permintaan) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white text-sm font-bold rounded-xl shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Memproses...</span>
              ) : (
                <span>{isRegister ? 'Buat Akun' : 'Masuk'}</span>
              )}
            </button>
          </div>
        </form>

        {/* Footer Toggle (Buat Akun / Masuk dengan warna Biru Cerah) */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          {isRegister ? (
            <p className="text-xs text-slate-500">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="font-bold text-sky-600 hover:text-sky-700 hover:underline ml-1 cursor-pointer"
              >
                Masuk di sini &gt;
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="font-bold text-sky-600 hover:text-sky-700 hover:underline ml-1 cursor-pointer"
              >
                Buat akun baru &gt;
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
