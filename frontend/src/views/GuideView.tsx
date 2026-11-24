import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  BookOpen,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  Smartphone,
  CheckCircle2,
  Send,
} from 'lucide-react';

export const GuideView: React.FC = () => {
  const { sendChatMessage, setIsSimulatorOpen } = useFinance();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const guideSections = [
    {
      title: 'Catat Pengeluaran',
      desc: 'Ketik kegiatan apa saja yang menghabiskan uang beserta biayanya (bisa pakai format k, rb, jt, atau nominal murni):',
      examples: [
        'Makan siang di warteg 25rb',
        'Bayar parkir 2000',
        'Beli bensin 50k',
        'Kopi susu gula aren 22rb',
        'Beli pulsa telkomsel 100k',
        'Bayar token listrik PLN 200rb',
      ],
    },
    {
      title: 'Catat Pemasukan',
      desc: 'Gunakan kata kunci berbau dapat uang: gajian, dikasih, bonus, nemu uang, transfer masuk, dividen:',
      examples: [
        'Alhamdulillah gajian 7.5jt',
        'Dikasih ibu 500rb',
        'Bonus proyek landing page 1.5jt',
        'Cair dividen saham 250rb',
        'Transferan freelance 850rb',
      ],
    },
    {
      title: 'Cek Saldo Kilat',
      desc: 'Perintah cepat paling sering dipakai. Gratis, tanpa kuota AI, balasan instan:',
      examples: [
        'cek saldo',
        'hari ini',
        'bulan ini',
        'rekap saldo',
      ],
    },
    {
      title: 'Catat Hutang & Piutang',
      desc: 'Bot otomatis menandai pihak yang meminjam atau meminjamkan uang dan tanggal jatuh tempo:',
      examples: [
        'Hutangin Budi 50rb',
        'Pinjam ke Dimas 100rb',
        'Piutang ke Rian 150rb patungan tiket',
      ],
    },
    {
      title: 'Panggil Sesukamu',
      desc: 'Atur bagaimana bot menyapamu. Nama panggilan ini dipakai di sapaan pagi dan balasan bot:',
      examples: [
        'panggil saya bos',
        'mulai sekarang panggil aku juragan',
        'panggil aku kak',
      ],
    },
  ];

  const handleTestInBot = (text: string) => {
    setIsSimulatorOpen(true);
    sendChatMessage(text);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Panduan Lengkap recapduit
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Semua cara memakai bot keuangan pintarmu langsung lewat WhatsApp.
        </p>
      </div>

      {/* Intro box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/50 border border-sky-100 flex items-start gap-4 shadow-xs">
        <div className="p-2.5 rounded-xl bg-sky-500 text-white shrink-0 shadow-sm">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Pencatatan Bahasa Natural (Natural Language Processing)
          </h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            recapduit membaca bahasa sehari-hari dengan parsing otomatis dan memakai AI cerdas saat
            diperlukan. Anda tidak perlu rumus atau format kaku. Cukup chat seperti ngobrol ke asisten pribadi!
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="space-y-4">
        {guideSections.map((sec, sIdx) => (
          <div
            key={sIdx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3"
          >
            <div>
              <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{sec.desc}</p>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                CONTOH PESAN CHAT:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sec.examples.map((ex, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 flex items-center justify-between gap-2 transition-all group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0"></span>
                      <span className="text-xs font-semibold text-slate-700 font-mono truncate">
                        "{ex}"
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy(ex)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                        title="Salin teks"
                      >
                        {copiedText === ex ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleTestInBot(ex)}
                        className="px-2 py-1 bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold rounded-md shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Send className="w-2.5 h-2.5" />
                        <span>Kirim ke Bot</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
