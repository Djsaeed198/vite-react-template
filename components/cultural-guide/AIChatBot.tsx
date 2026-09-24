import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  message: string;
}

export default function AIChatBot() {
  const initialGreeting = 'سلام! من حقوقیار هوشمند اتریش‌نشین هستم. از من درمورد ثبت ملدتستل شهرداری (Meldezettel)، ویزای سرخ-سفید-سرخ (RWR Karte)، دغدغه‌های MA 35 وین، دریافت کارت درمانی بیمه (E-Card) و افتتاح حساب بانکی سوال کنید.';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: 'model',
        message: initialGreeting
      }
    ]);
  }, [initialGreeting]);

  const quickPrompts = [
    'کارت سرخ-سفید-سرخ اتریش چیست؟',
    'چگونه ثبت آدرس (Meldezettel) بگیریم؟',
    'امضای دیجیتال ID Austria چیست؟',
    'کارهای درمانی و دریافت کارت E-Card'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', message: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(1) // omit initial greeting to save tokens
        })
      });

      const data = await response.json();
      if (data && data.success) {
        setMessages(prev => [...prev, { role: 'model', message: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', message: 'متأسفانه با خطای پردازش هوش مصنوعی مواجه شدم. لطفا دوباره تلاش کنید.' }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'model', message: 'خطای شبکه در اتصال به سرور هوشمند پلتفرم.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        message: 'گفتگو پاکسازی شد. مایلید درباره کدام مرحله از اقامت قانونی در شهرهای مختلف اتریش صحبت کنیم؟'
      }
    ]);
  };

  return (
    <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-stone-100 rounded-3xl p-5 border border-stone-800 shadow-md flex flex-col h-[520px] relative overflow-hidden text-right animate-fade-in" id="ai-chat-bot">
      {/* Decorative Flag line on top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-red-650 via-white to-red-650"></div>

      {/* Bot Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-lg shadow-2xs">
            🇦🇹
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <span className="text-[9px] border px-1.5 py-0.5 rounded-full font-black bg-red-600/10 text-red-400 border-red-500/20">
                دستیار فعال
              </span>
              <h3 className="font-extrabold text-xs text-stone-200">
                حقوقیار اتریش‌نشین (AI)
              </h3>
            </div>
            <p className="text-[10px] text-stone-400 font-bold">
              مبتنی بر مرجع قوانین رسمی اتریش
            </p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="text-[10px] text-stone-300 hover:text-white px-2.5 py-1 bg-stone-800 rounded-lg border border-stone-700 transition-all active:scale-95 cursor-pointer"
        >
          پاک کردن گفتگو
        </button>
      </div>

      {/* Messages body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 flex flex-col scrollbar-thin scrollbar-thumb-stone-800">
        {messages.map((msg, idx) => {
          const isModel = msg.role === 'model';
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                isModel ? 'self-start' : 'self-end flex-row-reverse'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                isModel ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-900'
              }`}>
                {isModel ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4 text-stone-800" />}
              </div>
              <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed ${
                isModel
                  ? 'bg-stone-850 text-stone-200 border border-stone-800 rounded-tr-sm'
                  : 'bg-red-600 text-white rounded-tl-sm'
              }`}>
                <div className="whitespace-pre-wrap font-sans text-right font-medium leading-relaxed">{msg.message}</div>
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-7 h-7 rounded-lg text-white flex items-center justify-center bg-red-600">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-stone-850 text-stone-350 border border-stone-800 p-3.5 rounded-2xl text-[11px] rounded-tr-sm flex items-center gap-2">
              <div className="flex gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] bg-red-400" />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] bg-red-400" />
                <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-red-400" />
              </div>
              <span className="text-right font-bold">
                دستیار در حال پایش درگاه MA 35 و قوانین رسمی...
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      {messages.length === 1 && (
        <div className="mb-4 text-right">
          <span className="text-[10px] text-stone-400 block mb-2 font-black">پرسش‌های پیشنهادی:</span>
          <div className="flex flex-wrap gap-2 justify-end">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p)}
                className="text-[10px] bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-800 px-2.5 py-1.5 rounded-full text-right cursor-pointer hover:scale-101 active:scale-99 transition-all"
              >
                💡 {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="سوال خود را به فارسی بنویسید (مثلاً نحوه تمدید اقامت سرخ-سفید-سرخ)"
          disabled={loading}
          className="flex-1 bg-stone-900 border border-stone-800 focus:border-red-500 rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none text-right"
        />
        <button
          type="submit"
          disabled={loading || !inputText.trim()}
          className="w-11 h-11 shrink-0 bg-red-650 hover:bg-red-600 rounded-xl flex items-center justify-center active:scale-95 transition-all cursor-pointer disabled:opacity-50 text-white"
        >
          <Send className="w-4 h-4 -scale-x-100" />
        </button>
      </form>
    </div>
  );
}
