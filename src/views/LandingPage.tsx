import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  MessageCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Smartphone,
  BarChart3,
  CheckCircle2,
  PieChart,
  Wallet,
  Receipt,
  ChevronDown,
  ChevronUp,
  LogIn,
  Check,
  Layers,
  Send,
  Zap,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setIsSimulatorOpen } = useFinance();

  // Default item 0 open, each item can be independently opened/closed
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleAllFaqs = () => {
    if (openFaqs.length === faqs.length) {
      setOpenFaqs([]);
    } else {
      setOpenFaqs(faqs.map((_, i) => i));
    }
  };

  const faqs = [
    {
      q: 'Apakah data finansial dan chat saya aman?',
      a: 'recapduit memproses pesan yang kamu kirim ke bot untuk menjalankan pencatatan dan fitur terkait. Transmisi data menggunakan HTTPS, sedangkan akses dashboard dilindungi autentikasi akun. Detail lengkap tersedia di Kebijakan Privasi.',
    },
    {
      q: 'Apakah saya harus install aplikasi tambahan?',
      a: 'Tidak perlu. Kamu bisa mencatat transaksi melalui WhatsApp. Dashboard web tersedia saat kamu ingin melihat laporan, mengatur anggaran, rekening, atau fitur lainnya.',
    },
    {
      q: 'Bagaimana cara AI mengkategorikan pengeluaran saya?',
      a: "recapduit membaca nominal, jenis transaksi, dan kata yang kamu gunakan, misalnya 'Gojek 45rb' atau 'makan soto 15k'. Sistem kemudian memilih kategori yang sesuai. Kamu juga dapat mengatur kategori dan Kamus sendiri dari dashboard.",
    },
    {
      q: 'Apakah ini benar-benar gratis?',
      a: 'Ya. Paket Gratis mencakup 20 transaksi dan 30 chat AI per bulan, satu rekening, satu anggaran, dashboard, serta laporan dasar. Pencatatan dan laporan deterministik tidak memakai kuota chat AI.',
    },
    {
      q: 'Apakah bisa pakai Voice Note?',
      a: 'Bisa. Voice Note tersedia untuk paket Pro, Platinum, dan akses grup yang memenuhi syarat. recapduit mentranskripsikan pesan lalu memproses transaksi yang kamu sebutkan.',
    },
    {
      q: 'Bagaimana fitur Pengingat (Reminder) bekerja?',
      a: "Ketik 'recapduit, ingetin besok jam 8 bayar wifi'. recapduit akan menyimpan jadwal dan mengirim pesan pengingat melalui WhatsApp pada waktu yang kamu tentukan.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Floating Promo Bar */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-blue-700 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-sky-300" />
        <span>Gunakan kode referral untuk potongan Rp 5.000 paket pertama Anda!</span>
        <a
          href="#login"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('login');
          }}
          className="underline font-bold text-sky-200 hover:text-white transition-colors ml-1 cursor-pointer"
        >
          Masuk Sekarang &rarr;
        </a>
      </div>

      {/* Landing Navbar (Gambar 1) */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 px-4 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="recapduit logo"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                recap<span className="text-sky-600">duit</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 -mt-1 tracking-wider uppercase">
                Asisten Keuangan WhatsApp
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
            <a href="#fitur" className="hover:text-sky-600 transition-colors">
              Fitur Unggulan
            </a>
            <a href="#cara-kerja" className="hover:text-sky-600 transition-colors">
              Cara Kerja
            </a>
            <a href="#harga" className="hover:text-sky-600 transition-colors">
              Pilihan Paket
            </a>
            <a href="#faq" className="hover:text-sky-600 transition-colors">
              Pertanyaan Populer
            </a>
          </div>

          {/* Right Actions: TOMBOL MASUK (Directs to Gambar 2 Login Page) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSimulatorOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-all"
            >
              <Smartphone className="w-4 h-4 text-sky-600" />
              <span>Tes Bot</span>
            </button>

            {/* Tombol Masuk -> Klik masuk ke Gambar 2 (LoginPage) */}
            <a
              href="#login"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('login');
              }}
              className="flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-full shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer no-underline"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section (Replicating Gambar 1 with Bright Blue Theme) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-24">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-200/30 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Catat Keuangan <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                  Otomatis
                </span>{' '}
                <br className="hidden sm:inline" />
                lewat WhatsApp.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Kirim pesan keuanganmu seperti ngobrol santai ke asisten pribadi. recapduit membaca nominal,
                memetakan kategori pengeluaran secara cerdas, dan langsung menyajikan laporan visual
                di web dashboard secara real-time.
              </p>

              {/* Action Buttons: Mulai Sekarang (directs to Login / Start) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="#login"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('login');
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-sky-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer no-underline"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Mulai Sekarang</span>
                </a>
                <button
                  onClick={() => setIsSimulatorOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-sky-600" />
                  <span>Coba Demo Chat</span>
                </button>
              </div>

              {/* Channel compatibility pills */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  WhatsApp Ready
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Web Dashboard Sinkron
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  100% Otomatis Tanpa Rumus
                </span>
              </div>
            </div>

            {/* Right Column: Realistic Phone Mockup from Gambar 1 */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
                {/* Phone Outer Shell */}
                <div className="rounded-[40px] border-[8px] border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-sky-900/20">
                  {/* Phone Screen */}
                  <div className="rounded-[32px] overflow-hidden bg-[#efeae2] h-[520px] flex flex-col relative">
                    {/* Top Notch */}
                    <div className="w-36 h-4 bg-slate-800 mx-auto rounded-b-xl shrink-0"></div>

                    {/* Chat Header in Bright Blue RecapDuit */}
                    <div className="bg-sky-700 text-white px-3.5 py-2.5 flex items-center gap-2.5 shadow-sm">
                      <div className="relative">
                        <img
                          src="/logo.jpg"
                          alt="recapduit bot"
                          className="w-8 h-8 rounded-full border border-sky-400 object-cover bg-white"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-sky-700"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">recapduit Bot</p>
                        <p className="text-[10px] text-sky-200">Online • Balas Otomatis</p>
                      </div>
                    </div>

                    {/* Chat Stream */}
                    <div className="flex-1 p-3 space-y-2.5 overflow-hidden text-xs">
                      {/* User message 1 */}
                      <div className="flex justify-end">
                        <div className="bg-sky-600 text-white rounded-2xl rounded-tr-none px-3 py-1.5 shadow-xs max-w-[85%]">
                          <p className="font-medium">Makan siang warteg komplit 25rb</p>
                          <span className="text-[9px] text-sky-200 block text-right">12:30 ✓✓</span>
                        </div>
                      </div>

                      {/* Bot response 1 */}
                      <div className="flex justify-start">
                        <div className="bg-white text-slate-800 rounded-2xl rounded-tl-none p-2.5 shadow-xs max-w-[90%] border border-slate-100">
                          <p className="font-bold text-sky-700 text-[11px]">
                            🔵 Pengeluaran Tercatat!
                          </p>
                          <p className="text-[11px] mt-0.5">
                            • Makan siang warteg komplit
                            <br />• Kategori: <strong>Makanan & Minuman</strong>
                            <br />• Nominal: <strong>Rp 25.000</strong>
                            <br />• Saldo kas: <strong>Rp 12.860.000</strong>
                          </p>
                          <span className="text-[9px] text-slate-400 block text-right mt-1">
                            12:30
                          </span>
                        </div>
                      </div>

                      {/* User message 2 */}
                      <div className="flex justify-end">
                        <div className="bg-sky-600 text-white rounded-2xl rounded-tr-none px-3 py-1.5 shadow-xs max-w-[85%]">
                          <p className="font-medium">Alhamdulillah gajian 7.5jt</p>
                          <span className="text-[9px] text-sky-200 block text-right">13:15 ✓✓</span>
                        </div>
                      </div>

                      {/* Bot response 2 */}
                      <div className="flex justify-start">
                        <div className="bg-white text-slate-800 rounded-2xl rounded-tl-none p-2.5 shadow-xs max-w-[90%] border border-slate-100">
                          <p className="font-bold text-emerald-600 text-[11px]">
                            🟢 Pemasukan Berhasil Ditambahkan!
                          </p>
                          <p className="text-[11px] mt-0.5">
                            • Gaji Bulanan Masuk
                            <br />• Nominal: <strong>Rp 7.500.000</strong>
                            <br />• Disimpan ke: <strong>Bank BCA</strong>
                          </p>
                          <span className="text-[9px] text-slate-400 block text-right mt-1">
                            13:15
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom input bar */}
                    <div className="bg-white p-2.5 border-t border-slate-200 flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-400">
                        Ketik pengeluaran...
                      </div>
                      <div
                        onClick={() => setIsSimulatorOpen(true)}
                        className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center cursor-pointer hover:bg-sky-700 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-6 bg-white p-3 rounded-2xl shadow-xl border border-sky-100 flex items-center gap-2.5 hidden sm:flex">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">100% Otomatis</p>
                    <p className="text-[10px] text-slate-400">Tanpa buka aplikasi kasir kaku</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Workflow Section ("Cara Mencatat Keuangan di recapduit" - Gambar 1) */}
      <section id="cara-kerja" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Langkah Sederhana
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Cara Mencatat Keuangan di recapduit
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Tinggalkan aplikasi rumit dengan puluhan menu. Semua dilakukan dalam 3 detik lewat WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative hover:border-sky-300 transition-colors">
              <span className="text-3xl font-black text-sky-600/30">01</span>
              <h3 className="text-base font-bold text-slate-800">Kirim Chat Santai</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ketik pengeluaran apa saja langsung di WhatsApp: <em>"Beli bensin 50k"</em>,{' '}
                <em>"Makan siang 25rb"</em>, atau <em>"Gajian 7.5jt"</em>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-3 relative hover:border-sky-400 transition-colors">
              <span className="text-3xl font-black text-sky-600">02</span>
              <h3 className="text-base font-bold text-slate-800">Bot Membaca & Memetakan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mesin NLP membaca nominal, menyesuaikan kategori jajan, dan mengurangi atau menambah saldo dompet Anda secara presisi.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative hover:border-sky-300 transition-colors">
              <span className="text-3xl font-black text-sky-600/30">03</span>
              <h3 className="text-base font-bold text-slate-800">Pantau di Dashboard Web</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka web dashboard kapan pun untuk melihat grafik tren pengeluaran, sisa budget bulanan, dan ekspor CSV rapi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section (Bento Grid matching Gambar 1) */}
      <section id="fitur" className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Lebih Dari Sekadar Catat
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Fitur Lengkap untuk Kendali Finansial Total
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Dibuat khusus untuk kebutuhan finansial masyarakat Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Kategori Rapi & Laporan Visual</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Grafik tren arus kas bulanan dan mingguan dengan saran cerdas untuk menghemat pos pengeluaran yang bocor.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Multi Rekening & E-Wallet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pisahkan saldo tunai fisik, rekening BCA/Mandiri, dan e-wallet GoPay/OVO dengan fitur transfer internal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Buku Hutang & Piutang</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ketik <em>"Hutangin Budi 50rb"</em> di WhatsApp, bot akan mencatat nama dan tanggal jatuh tempo agar uang tidak hilang.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Batas Anggaran (Budgeting)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tetapkan plafon pengeluaran per kategori. Dapatkan alarm otomatis di WhatsApp jika budget Anda mulai menipis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Kesehatan Dana Darurat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hitung otomatis daya tahan tabungan darurat Anda dalam hitungan bulan jika terjadi kondisi mendadak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 hover:border-sky-300 transition-all">
              <div className="p-3 rounded-xl bg-sky-50 text-sky-600 w-fit">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Panggilan Kustom Sesukamu</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Atur panggilan bot sesuai seleramu: <em>"panggil saya bos"</em>, <em>"juragan"</em>, atau <em>"kak"</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Paket (4 cards from Gambar 1 in Bright Blue) */}
      <section id="harga" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Pilihan Paket
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Pilih Paket Sesuai Kebutuhan Anda
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Mulai gratis atau upgrade ke paket unlimited untuk fleksibilitas maksimal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Free */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6 hover:border-sky-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Starter</span>
                <p className="text-3xl font-black text-slate-900 mt-2">Rp 0</p>
                <p className="text-xs text-slate-500 mt-1">Gratis selamanya</p>

                <ul className="space-y-2 mt-6 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>50 chat / bulan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>1 rekening aktif</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Dashboard web</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                Mulai Gratis
              </button>
            </div>

            {/* Plus / Pro (Highlighted in Bright Blue!) */}
            <div className="p-6 rounded-2xl border-2 border-sky-500 bg-sky-50/40 relative shadow-xl shadow-sky-500/10 flex flex-col justify-between space-y-6">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                PALING POPULER
              </div>

              <div>
                <span className="text-xs font-bold text-sky-700 uppercase">Plus (Pro)</span>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  Rp 30K <span className="text-xs text-slate-500 font-medium">/ bulan</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Hanya seribu per hari</p>

                <ul className="space-y-2 mt-6 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Unlimited chat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Multi rekening tanpa batas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>AI Analisis & Laporan Excel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Buku Hutang Piutang</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-500/20 transition-all active:scale-95 cursor-pointer"
              >
                Pilih Paket Plus
              </button>
            </div>

            {/* Premium */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6 hover:border-sky-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Premium</span>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  Rp 250K <span className="text-xs text-slate-500 font-medium">sekali</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Akses seumur hidup</p>

                <ul className="space-y-2 mt-6 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Seluruh Fitur Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Lifetime tanpa bulanan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Prioritas Fitur Baru</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                Pilih Premium
              </button>
            </div>

            {/* Komunitas / Tim */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-6 hover:border-sky-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">Komunitas / Tim</span>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  Rp 100K <span className="text-xs text-slate-500 font-medium">/ tim</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Untuk keluarga & kas tim</p>

                <ul className="space-y-2 mt-6 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Hingga 5 nomor WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Catat bersama dalam grup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Laporan konsolidasi tim</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setActiveTab('login')}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                Pilih Komunitas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Matching Gambar 3, 4, 5 with full open/close toggle) */}
      <section id="faq" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Pertanyaan Populer
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2.5 max-w-xl mx-auto leading-relaxed">
              Jawaban singkat tentang cara kerja, keamanan data, paket gratis, dan fitur recapduit.
            </p>
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={toggleAllFaqs}
                className="text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {openFaqs.length === faqs.length ? '✕ Tutup Semua Pertanyaan' : '▼ Buka Semua Pertanyaan'}
              </button>
            </div>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 shadow-2xs transition-all cursor-pointer select-none ${
                    isOpen
                      ? 'border-sky-300 ring-1 ring-sky-100 shadow-xs'
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="w-full text-left flex items-start justify-between gap-4">
                    <span className="text-sm sm:text-base font-bold text-slate-900 transition-colors">
                      {faq.q}
                    </span>
                    <span className="p-1 rounded-md text-emerald-600 shrink-0 mt-0.5">
                      <ChevronDown
                        className={`w-5 h-5 text-emerald-600 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </div>

                  {/* Smooth animated accordion collapse/expand */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-3.5'
                        : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pr-2 sm:pr-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="recapduit logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <p className="font-extrabold text-sm tracking-tight">recapduit</p>
              <p className="text-[11px] text-slate-400">
                Pencatatan Keuangan Praktis via WhatsApp
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} recapduit. Hak Cipta Dilindungi.</p>
            <p className="mt-1">Dibuat dengan rapi & ramah pengguna untuk finansial yang lebih tertata.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
