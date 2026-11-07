import { Category, Transaction, TransactionType } from '../types';

export interface ParseResult {
  isCommand: boolean;
  commandType?: 'cek_saldo' | 'hari_ini' | 'bulan_ini' | 'panggil' | 'bantuan' | 'catat' | 'hutang_piutang';
  transaction?: {
    type: TransactionType;
    amount: number;
    category: string;
    note: string;
  };
  debt?: {
    type: 'hutang' | 'piutang';
    person: string;
    amount: number;
    note: string;
  };
  nickname?: string;
  botReply: string;
}

// Format number to Rupiah string
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Parse text amounts like: 25rb, 50k, 5jt, 2.5jt, 100.000, 15000, 1.2jt
export function parseIndonesianAmount(text: string): { amount: number; rawMatch: string } | null {
  // Regex to detect amount with suffix or standard dots
  // Examples: 2.5jt, 2,5jt, 500k, 25rb, 50000, 1.500.000, 50 ribu, 10 juta
  const regex = /(\d+(?:[.,]\d+)?)\s*(jt|juta|k|rb|ribu)?\b|(?:\bRp\.?\s*(\d{1,3}(?:\.\d{3})+|\d+))/i;
  const match = text.match(regex);

  if (!match) return null;

  let numStr = match[1] || match[3];
  if (!numStr) return null;

  numStr = numStr.replace(/\./g, '').replace(',', '.');
  let num = parseFloat(numStr);

  const unit = (match[2] || '').toLowerCase();
  if (unit === 'k' || unit === 'rb' || unit === 'ribu') {
    num *= 1000;
  } else if (unit === 'jt' || unit === 'juta') {
    num *= 1000000;
  }

  return {
    amount: Math.round(num),
    rawMatch: match[0],
  };
}

export function parseChatMessage(
  message: string,
  categories: Category[],
  botNickname: string = 'bos',
  currentBalance: number = 0,
  todayExpense: number = 0,
  thisMonthExpense: number = 0
): ParseResult {
  const cleanMsg = message.trim();
  const lowerMsg = cleanMsg.toLowerCase();

  // 1. Cek nickname command ("panggil saya bos", "panggil aku juragan")
  const panggilMatch = cleanMsg.match(/panggil\s+(?:saya|aku|gue|gw)\s+(.+)/i);
  if (panggilMatch) {
    const newName = panggilMatch[1].trim();
    return {
      isCommand: true,
      commandType: 'panggil',
      nickname: newName,
      botReply: `Siap ${newName}! Mulai sekarang aku panggil ${newName} ya. Keren banget panggilannya! 😎`,
    };
  }

  // 2. Cek Saldo
  if (lowerMsg === 'cek saldo' || lowerMsg === 'saldo' || lowerMsg === 'sisa uang') {
    return {
      isCommand: true,
      commandType: 'cek_saldo',
      botReply: `Halo ${botNickname} 👋\n\n💰 *Total Saldo Kas*: ${formatRupiah(currentBalance)}\n📉 *Pengeluaran Hari Ini*: ${formatRupiah(todayExpense)}\n📊 *Pengeluaran Bulan Ini*: ${formatRupiah(thisMonthExpense)}\n\nKetik belanjaanmu langsung ya biar langsung tercatat!`,
    };
  }

  // 3. Cek Hari Ini
  if (lowerMsg === 'hari ini' || lowerMsg === 'rekap hari ini') {
    return {
      isCommand: true,
      commandType: 'hari_ini',
      botReply: `📅 *Rekap Hari Ini untuk ${botNickname}:*\n\nPengeluaran hari ini: *${formatRupiah(todayExpense)}*.\nSemangat hematnya ya! Jangan lupa catat jajan sore nanti 😉`,
    };
  }

  // 4. Cek Bulan Ini
  if (lowerMsg === 'bulan ini' || lowerMsg === 'rekap bulan ini') {
    return {
      isCommand: true,
      commandType: 'bulan_ini',
      botReply: `📊 *Rekap Bulan Ini untuk ${botNickname}:*\n\nTotal pengeluaran tercatat: *${formatRupiah(thisMonthExpense)}*.\nSaldo aktif: *${formatRupiah(currentBalance)}*.\nSemua data tersinkronisasi rapi di dashboard recapduit!`,
    };
  }

  // 5. Cek Bantuan
  if (lowerMsg === 'bantuan' || lowerMsg === 'menu' || lowerMsg === 'help') {
    return {
      isCommand: true,
      commandType: 'bantuan',
      botReply: `✨ *Panduan Cepat recapduit:*\n\n1. *Catat Pengeluaran:*\n   Makan siang 25rb\n   Beli bensin 50k\n   Bayar parkir 2000\n\n2. *Catat Pemasukan:*\n   Gajian 7.5jt\n   Dikasih ibu 500rb\n   Bonus freelance 1jt\n\n3. *Hutang / Piutang:*\n   Hutangin Budi 50rb\n   Pinjam ke Dimas 100rb\n\n4. *Cek Laporan:*\n   Ketik "cek saldo", "hari ini", atau "bulan ini".`,
    };
  }

  // 6. Hutang / Piutang parsing
  // Examples: "Hutangin Budi 50rb", "Pinjam ke Andi 100rb", "Piutang ke Rian 150rb"
  const hutanginMatch = cleanMsg.match(/(?:hutangin|pinjemin|pinjamin|piutang ke)\s+([a-zA-Z\s]+?)\s+(\d+.*)/i);
  if (hutanginMatch) {
    const person = hutanginMatch[1].trim();
    const amountObj = parseIndonesianAmount(hutanginMatch[2]);
    if (amountObj && amountObj.amount > 0) {
      return {
        isCommand: true,
        commandType: 'hutang_piutang',
        debt: {
          type: 'piutang',
          person,
          amount: amountObj.amount,
          note: `Pinjaman ke ${person}`,
        },
        botReply: `✅ *Piutang Dicatat!*\n\n👤 Peminjam: *${person}*\n💰 Jumlah: *${formatRupiah(amountObj.amount)}*\n\nrecapduit akan bantu ingatkan saat jatuh tempo nanti ya ${botNickname}!`,
      };
    }
  }

  const pinjamMatch = cleanMsg.match(/(?:pinjam ke|hutang ke|utang ke)\s+([a-zA-Z\s]+?)\s+(\d+.*)/i);
  if (pinjamMatch) {
    const person = pinjamMatch[1].trim();
    const amountObj = parseIndonesianAmount(pinjamMatch[2]);
    if (amountObj && amountObj.amount > 0) {
      return {
        isCommand: true,
        commandType: 'hutang_piutang',
        debt: {
          type: 'hutang',
          person,
          amount: amountObj.amount,
          note: `Hutang ke ${person}`,
        },
        botReply: `📝 *Hutang Dicatat!*\n\n👤 Pemberi Pinjaman: *${person}*\n💰 Jumlah: *${formatRupiah(amountObj.amount)}*\n\nSudah masuk ke Buku Hutang Piutang recapduit. Jangan lupa dilunasi ya ${botNickname}!`,
      };
    }
  }

  // 7. Standard Natural Language Transaction
  const parsedAmt = parseIndonesianAmount(cleanMsg);
  if (!parsedAmt || parsedAmt.amount <= 0) {
    return {
      isCommand: false,
      botReply: `Hmm, aku belum paham nominalnya ${botNickname} 🤔\n\nCoba tulis dengan nominal ya, misalnya:\n👉 _Makan siang 25rb_\n👉 _Bensin 50k_\n👉 _Gajian 5jt_`,
    };
  }

  const amount = parsedAmt.amount;

  // Determine income vs expense
  const incomeKeywords = ['gaji', 'gajian', 'dapat', 'dapet', 'nemu', 'dikasih', 'bonus', 'proyek', 'project', 'cair', 'tf masuk', 'transfer masuk', 'profit', 'dividen', 'cashback', 'angpao'];
  const isIncome = incomeKeywords.some(kw => lowerMsg.includes(kw));
  const type: TransactionType = isIncome ? 'income' : 'expense';

  // Determine Category based on keywords
  let matchedCategory = type === 'income' ? 'Gaji Pokok' : 'Makanan & Minuman';
  let bestScore = 0;

  for (const cat of categories) {
    if (cat.type !== type) continue;
    for (const kw of cat.keywords) {
      if (lowerMsg.includes(kw.toLowerCase())) {
        const score = kw.length;
        if (score > bestScore) {
          bestScore = score;
          matchedCategory = cat.name;
        }
      }
    }
  }

  // Clean note
  let note = cleanMsg
    .replace(parsedAmt.rawMatch, '')
    .replace(/^[-+*]\s*/, '')
    .trim();

  if (!note || note.length < 2) {
    note = matchedCategory;
  }

  // Capitalize first letter of note
  note = note.charAt(0).toUpperCase() + note.slice(1);

  const iconEmoji = type === 'income' ? '🟢' : '🔵';
  const newBalance = type === 'income' ? currentBalance + amount : currentBalance - amount;

  const botReply = `${iconEmoji} *Transaksi Berhasil Dicatat!*\n\n📝 *Deskripsi*: ${note}\n📂 *Kategori*: ${matchedCategory}\n💵 *Nominal*: ${formatRupiah(amount)} (${type === 'income' ? 'Pemasukan' : 'Pengeluaran'})\n💼 *Sisa Saldo Kas*: ${formatRupiah(newBalance)}\n\n_Data langsung tersinkron ke dashboard recapduit!_`;

  return {
    isCommand: false,
    transaction: {
      type,
      amount,
      category: matchedCategory,
      note,
    },
    botReply,
  };
}
