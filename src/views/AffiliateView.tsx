import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { formatRupiah } from '../utils/botParser';
import {
  Share2,
  Copy,
  Check,
  Users,
  Coins,
  ArrowUpRight,
  Gift,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
  HelpCircle,
  Percent,
} from 'lucide-react';

export const AffiliateView: React.FC = () => {
  const { profile } = useFinance();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = `https://recapduit.com/register?ref=${profile.referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(profile.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Simulated referral activities
  const recentReferrals = [
    {
      id: 'ref-1',
      name: 'Andi Saputra',
      plan: 'Paket Pro (3 Bulan)',
      date: '03 Nov 2026',
      commission: 25000,
      status: 'valid',
    },
    {
      id: 'ref-2',
      name: 'Dewi Lestari',
      plan: 'Paket Pro (1 Bulan)',
      date: '01 Nov 2026',
      commission: 25000,
      status: 'valid',
    },
    {
      id: 'ref-3',
      name: 'Reza Fauzi',
      plan: 'Paket Starter',
      date: '29 Okt 2026',
      commission: 25000,
      status: 'pending',
    },
    {
      id: 'ref-4',
      name: 'Siti Nurhaliza',
      plan: 'Pendaftaran Akun Baru',
      date: '28 Okt 2026',
      commission: 0,
      status: 'free',
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Program Afiliasi</h1>
        <p className="text-xs text-slate-500 mt-1">
          Bagikan recapduit ke teman atau komunitas, dapatkan komisi saldo setiap kali teman berlangganan!
        </p>
      </div>

      {/* Main Affiliate Grid (Never overflows, stacks cleanly on mid screens) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full">
        {/* Left: Referral Box (8 cols on xl) */}
        <div className="xl:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6 w-full min-w-0">
          {/* Referral Code Box */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              BAGIKAN KODE REFERRAL ANDA
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-sky-50/80 to-blue-50/50 border border-sky-100">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                  Kode Referral Unik
                </span>
                <span className="text-2xl sm:text-3xl font-black text-sky-800 tracking-wider font-mono">
                  {profile.referralCode}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-sky-700 hover:bg-sky-50 border border-sky-200 rounded-xl text-xs font-bold transition-all shadow-2xs shrink-0 active:scale-95"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Tersalin!' : 'Salin Kode'}</span>
              </button>
            </div>
          </div>

          {/* Referral Direct Link */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Link Pendaftaran Langsung
            </span>
            <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono truncate focus:outline-none"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
              >
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* Keuntungan Box */}
          <div className="p-4 sm:p-4.5 rounded-xl bg-slate-50/80 border border-slate-200/90 text-xs text-slate-600 space-y-2.5">
            <p className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Keuntungan Anda & Teman Anda:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-[11px] leading-relaxed">
                  Teman Anda otomatis mendapat <strong>potongan Rp 5.000</strong> saat pertama kali aktivasi paket bot.
                </p>
              </div>

              <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
                <p className="text-[11px] leading-relaxed">
                  Anda memperoleh komisi tunai <strong>Rp 25.000 per referral</strong> yang upgrade ke paket berbayar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Balance & Withdrawal Card (4 cols on xl) */}
        <div className="xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between w-full min-w-0">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                SALDO TERSEDIA
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Siap Ditarik
              </span>
            </div>

            <p className="text-3xl font-black text-slate-900 mt-2.5 tabular-nums">
              {formatRupiah(profile.referralBalance)}
            </p>
            <p className="text-xs text-slate-400 mt-1 leading-snug">
              Menunggu validasi 14 hari:{' '}
              <span className="font-semibold text-slate-600">
                {formatRupiah(profile.pendingReferral)}
              </span>
            </p>

            <div className="mt-6 space-y-2 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-500">Target Tarik Tunai</span>
                <span className="text-sky-700 font-bold">Min. Rp 50.000</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 pt-0.5">
                <Check className="w-3.5 h-3.5" />
                <span>Saldo Anda telah memenuhi syarat penarikan</span>
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() =>
                alert(
                  'Permintaan penarikan komisi ' +
                    formatRupiah(profile.referralBalance) +
                    ' telah diajukan! Dana akan ditransfer dalam 1x24 jam kerja.'
                )
              }
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Coins className="w-4 h-4" />
              <span>Tarik Saldo ke Rekening</span>
            </button>
            <button
              onClick={() =>
                alert('Saldo berhasil digunakan untuk perpanjangan paket recapduit Pro otomatis!')
              }
              className="w-full py-2.5 px-4 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl border border-sky-200 transition-all active:scale-95"
            >
              Pakai Saldo untuk Paket
            </button>
          </div>
        </div>
      </div>

      {/* Stats Counter Row (3 clean, responsive metric cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex items-center gap-3.5 min-w-0">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Orang Terdaftar
            </span>
            <p className="text-xl font-black text-slate-900 mt-0.5 truncate">8 Orang</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex items-center gap-3.5 min-w-0">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Pembelian Valid
            </span>
            <p className="text-xl font-black text-emerald-600 mt-0.5 truncate">5 Pembelian</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-xs flex items-center gap-3.5 min-w-0 sm:col-span-2 lg:col-span-1">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Komisi Didapat
            </span>
            <p className="text-xl font-black text-slate-900 mt-0.5 truncate tabular-nums">
              {formatRupiah(175000)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Referral Activity Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden w-full">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Riwayat Teman & Komisi Terbaru</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Daftar referral yang mendaftar atau melakukan upgrade paket melalui tautan Anda.
            </p>
          </div>
          <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
            Terakhir diupdate hari ini
          </span>
        </div>

        <div className="overflow-x-auto min-w-0">
          <table className="w-full text-left text-xs min-w-[600px]">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Nama Teman</th>
                <th className="py-3 px-4">Paket Dipilih</th>
                <th className="py-3 px-4">Tanggal Gabung</th>
                <th className="py-3 px-4 text-right">Komisi</th>
                <th className="py-3 px-5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentReferrals.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{item.plan}</td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{item.date}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 whitespace-nowrap tabular-nums">
                    {item.commission > 0 ? formatRupiah(item.commission) : '-'}
                  </td>
                  <td className="py-3.5 px-5 text-center whitespace-nowrap">
                    {item.status === 'valid' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Valid
                      </span>
                    ) : item.status === 'pending' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3" />
                        Menunggu
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                        Gratis
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
