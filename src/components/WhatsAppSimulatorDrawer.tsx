import React, { useState, useRef, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import {
  X,
  Send,
  Sparkles,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  CheckCheck,
  Bot,
  HelpCircle,
} from 'lucide-react';

export const WhatsAppSimulatorDrawer: React.FC = () => {
  const {
    isSimulatorOpen,
    setIsSimulatorOpen,
    chatMessages,
    sendChatMessage,
    profile,
  } = useFinance();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🥪 Makan siang 25rb', text: 'Makan siang 25rb' },
    { label: '⛽ Bensin 50k', text: 'Beli bensin 50k' },
    { label: '💰 Gajian 7.5jt', text: 'Alhamdulillah gajian 7.5jt' },
    { label: '☕ Kopi susu 22rb', text: 'Kopi susu 22rb' },
    { label: '📊 Cek Saldo', text: 'cek saldo' },
    { label: '🤝 Hutangin Budi 50rb', text: 'Hutangin Budi 50rb' },
    { label: '👑 Panggil saya Bos', text: 'panggil saya bos' },
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;
    sendChatMessage(text);
    if (!textToSend) setInputVal('');
  };

  useEffect(() => {
    if (isSimulatorOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isSimulatorOpen]);

  if (!isSimulatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300">
      <div
        className="w-full max-w-md bg-[#efeae2] h-full flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300"
        style={{
          backgroundImage:
            'radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #efeae2 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      >
        {/* WhatsApp Header (in modern RecapDuit bright blue brand) */}
        <div className="bg-sky-700 text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="recapduit bot"
                className="w-10 h-10 rounded-full border-2 border-sky-400 object-cover bg-white"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-sky-700 rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-wide">recapduit Bot</span>
                <span className="px-1.5 py-0.2 text-[9px] bg-sky-500 text-white rounded font-bold">
                  VERIFIED
                </span>
              </div>
              <span className="text-[11px] text-sky-200">
                Online • Asisten Keuangan Pintar
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulatorOpen(false)}
              className="p-1.5 hover:bg-sky-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-sky-100/90 border-b border-sky-200 px-3.5 py-1.5 flex items-center justify-between text-xs text-sky-800">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Ketik bebas seperti chat biasa, AI bot langsung rekap otomatis!</span>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-3 py-2 bg-white/70 backdrop-blur-xs border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p.text)}
              className="whitespace-nowrap px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 rounded-full shadow-2xs transition-all active:scale-95"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-center my-2">
            <span className="bg-white/80 backdrop-blur-xs text-slate-500 text-[10px] font-semibold px-3 py-1 rounded-md shadow-2xs uppercase tracking-wider">
              Hari Ini
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs leading-relaxed ${
                    isUser
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isUser ? 'text-sky-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-sky-200" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white px-3 py-2 border-t border-slate-200 flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-slate-400">
            <button className="p-1.5 hover:text-sky-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-1.5 hover:text-sky-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex-1 flex items-center"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ketik pengeluaran / pemasukan..."
              className="w-full bg-slate-100 border border-transparent focus:border-sky-500 focus:bg-white rounded-full px-4 py-2 text-xs focus:outline-none transition-all placeholder:text-slate-400"
            />
          </form>

          {inputVal.trim() ? (
            <button
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => handleSend('cek saldo')}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-sky-100 text-slate-600 hover:text-sky-600 flex items-center justify-center transition-all"
              title="Cek Saldo"
            >
              <Bot className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
