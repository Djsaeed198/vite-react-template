import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calculator, Building, ShieldCheck, TrendingUp, ArrowLeftRight,
  Sparkles, PiggyBank, Globe2, ChevronDown, Info, Landmark, BadgeCheck, Receipt
} from 'lucide-react';

/* ================================================================== */
/*  1) Austria Shield — لوگوی اتریش (SVG داخلی، بدون asset خارجی)      */
/* ================================================================== */
const AustriaShield = ({ className = 'w-12 h-12', title = 'Austria' }) => (
  <svg
    viewBox="0 0 60 60"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <defs>
      <clipPath id="atShieldClip">
        <path d="M30 2 L54 10 V30 C54 44 43 54 30 58 C17 54 6 44 6 30 V10 Z" />
      </clipPath>
      <linearGradient id="atRedGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ED2939" />
        <stop offset="100%" stopColor="#B70B23" />
      </linearGradient>
      <linearGradient id="atWhiteGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#EFEFEF" />
      </linearGradient>
    </defs>
    <g clipPath="url(#atShieldClip)">
      <rect x="0" y="0" width="60" height="24" fill="url(#atRedGrad)" />
      <rect x="0" y="24" width="60" height="12" fill="url(#atWhiteGrad)" />
      <rect x="0" y="36" width="60" height="24" fill="url(#atRedGrad)" />
      <path d="M0 0 L26 0 L8 60 L0 60 Z" fill="rgba(255,255,255,0.14)" />
    </g>
    <path
      d="M30 2 L54 10 V30 C54 44 43 54 30 58 C17 54 6 44 6 30 V10 Z"
      fill="none"
      stroke="#7F0F1E"
      strokeWidth="1.6"
    />
  </svg>
);

/* Helper icon */
function FileCheckIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  );
}

/* ================================================================== */
/*  2) Animated number hook                                            */
/* ================================================================== */
function useAnimatedNumber(target, duration = 700) {
  const [value, setValue] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    const from = ref.current;
    const to = Number.isFinite(target) ? target : 0;
    if (from === to) return;

    const t0 = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = from + (to - from) * eased;
      ref.current = cur;
      setValue(cur);
      if (p < 1) raf = requestAnimationFrame(step);
      else { ref.current = to; setValue(to); }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* ================================================================== */
/*  3) Austrian payroll math (2026 approximation)                      */
/* ================================================================== */
const SV_TOTAL = 0.1812;
const SV_BREAKDOWN = {
  kv: { rate: 0.0387, label: 'بیمه درمانی',    abbr: 'KV', color: 'bg-emerald-400' },
  pv: { rate: 0.1025, label: 'بیمه بازنشستگی', abbr: 'PV', color: 'bg-emerald-500' },
  av: { rate: 0.0300, label: 'بیمه بیکاری',    abbr: 'AV', color: 'bg-emerald-600' },
  ak: { rate: 0.0050, label: 'اتاق کار',       abbr: 'AK', color: 'bg-teal-500' },
  wf: { rate: 0.0050, label: 'صندوق مسکن',     abbr: 'WF', color: 'bg-teal-600' },
};

interface BreakdownItem {
  rate: number;
  label: string;
  abbr: string;
  color: string;
  amount: number;
}

const EMPTY_RESULT = {
  monthlyBrutto: 0, sv: 0, breakdown: {} as Record<string, BreakdownItem>, tax: 0,
  netto: 0, taxable: 0, effectiveRate: 0,
};

function computeFromBrutto(bruttoAmount, period = 'monthly') {
  if (!Number.isFinite(bruttoAmount) || bruttoAmount <= 0) return EMPTY_RESULT;

  const monthlyBrutto = period === 'yearly' ? bruttoAmount / 14 : bruttoAmount;
  const sv = monthlyBrutto * SV_TOTAL;

  const breakdown = Object.fromEntries(
    Object.entries(SV_BREAKDOWN).map(([k, v]) => [
      k,
      { ...v, amount: monthlyBrutto * v.rate },
    ])
  );

  const taxable = Math.max(0, monthlyBrutto - sv - 131);

  let tax = 0;
  if (taxable > 1060) {
    if (taxable <= 1730) {
      tax = (taxable - 1060) * 0.20;
    } else if (taxable <= 2870) {
      tax = (1730 - 1060) * 0.20 + (taxable - 1730) * 0.30;
    } else if (taxable <= 5550) {
      tax = (1730 - 1060) * 0.20 + (2870 - 1730) * 0.30 + (taxable - 2870) * 0.41;
    } else {
      tax = (1730 - 1060) * 0.20 + (2870 - 1730) * 0.30 + (5550 - 2870) * 0.41 + (taxable - 5550) * 0.48;
    }
  }
  tax = Math.max(0, tax);

  const netto = Math.max(0, monthlyBrutto - sv - tax);
  const effectiveRate = monthlyBrutto > 0 ? ((sv + tax) / monthlyBrutto) * 100 : 0;

  return { monthlyBrutto, sv, breakdown, tax, netto, taxable, effectiveRate };
}

function computeFromNetto(targetNetto) {
  if (!Number.isFinite(targetNetto) || targetNetto <= 0) return EMPTY_RESULT;
  let lo = 0, hi = 300000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const r = computeFromBrutto(mid, 'monthly');
    if (r.netto < targetNetto) lo = mid; else hi = mid;
  }
  return computeFromBrutto((lo + hi) / 2, 'monthly');
}

/* ================================================================== */
/*  4) Main component                                                  */
/* ================================================================== */
export default function BruttoNettoCalculator() {
  const [mode, setMode] = useState('brutto');
  const [bruttoInput, setBruttoInput] = useState('3500');
  const [nettoInput, setNettoInput] = useState('2435');
  const [period, setPeriod] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const activeInput = mode === 'brutto' ? bruttoInput : nettoInput;
  const setActiveInput = mode === 'brutto' ? setBruttoInput : setNettoInput;

  const result = useMemo(() => {
    const raw = parseFloat(String(activeInput).replace(/[^\d.-]/g, ''));
    if (!Number.isFinite(raw) || raw <= 0) return EMPTY_RESULT;

    if (mode === 'brutto') return computeFromBrutto(raw, period);

    const monthlyTarget = period === 'yearly' ? raw / 14 : raw;
    return computeFromNetto(monthlyTarget);
  }, [activeInput, mode, period]);

  const mult = period === 'yearly' ? 14 : 1;

  const animBrutto = useAnimatedNumber(result.monthlyBrutto * mult);
  const animNetto  = useAnimatedNumber(result.netto * mult);
  const animSV     = useAnimatedNumber(result.sv * mult);
  const animTax    = useAnimatedNumber(result.tax * mult);

  const fmt = (n) => Math.round(n || 0).toLocaleString('fa-IR');

  const currentBracket = useMemo(() => {
    const t = result.taxable;
    if (t <= 1060) return 0;
    if (t <= 1730) return 1;
    if (t <= 2870) return 2;
    if (t <= 5550) return 3;
    return 4;
  }, [result.taxable]);

  const bracketsList = [
    { label: '۰٪',  range: 'تا ۱٬۰۶۰ €',        color: 'bg-emerald-400' },
    { label: '۲۰٪', range: '۱٬۰۶۰ – ۱٬۷۳۰ €', color: 'bg-emerald-500' },
    { label: '۳۰٪', range: '۱٬۷۳۰ – ۲٬۸۷۰ €', color: 'bg-amber-400' },
    { label: '۴۱٪', range: '۲٬۸۷۰ – ۵٬۵۵۰ €', color: 'bg-orange-500' },
    { label: '۴۸٪', range: 'بالای ۵٬۵۵۰ €',    color: 'bg-rose-500' },
  ];

  const faqs = [
    {
      q: 'حقوق ۱۳ و ۱۴ در محاسبه چگونه لحاظ می‌شود؟',
      a: 'در اتریش حقوق سیزدهم و چهاردهم (Urlaubs- und Weihnachtsgeld) مشمول مالیات ترجیحی ۶٪ می‌شوند که تا سقف معین معاف از مالیات است. این ماشین‌حساب حقوق سالانه را بر پایه ۱۴ حقوق محاسبه می‌کند.',
    },
    {
      q: 'نرخ مؤثر مالیات (Effective Rate) چیست؟',
      a: 'نسبت مجموع کسورات (بیمه اجتماعی + مالیات) به حقوق ناخالص که به‌صورت درصد نمایش داده می‌شود و تصویری واقعی از فشار مالیاتی شما می‌دهد.',
    },
    {
      q: 'آیا این محاسبه جایگزین اظهارنامه مالیاتی است؟',
      a: 'خیر، این ابزار یک برآورد تقریبی بر اساس جداول رسمی ۲۰۲۶ ارائه می‌دهد. برای اظهارنامه قطعی، کارشناس مالیاتی یا سامانه FinanzOnline مرجع رسمی است.',
    },
    {
      q: 'سهم بیمه اجتماعی کارفرما هم محاسبه می‌شود؟',
      a: 'محاسبات این ابزار متمرکز بر سهم کارمند است. سهم کارفرما جداگانه و معمولاً حدود ۲۱٪ از حقوق ناخالص است که به‌طور جداگانه به بیمه‌ها واریز می‌شود.',
    },
  ];

  return (
    <section
      dir="rtl"
      id="brutto-netto-calculator-block"
      itemScope
      itemType="https://schema.org/WebApplication"
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative"
    >
      <meta itemProp="name" content="ماشین‌حساب Brutto-Netto اتریش ۲۰۲۶" />
      <meta itemProp="applicationCategory" content="FinanceApplication" />
      <meta itemProp="operatingSystem" content="Web" />

      {/* ===================== LEFT: CALCULATOR ===================== */}
      <div className="lg:col-span-7 bg-white border border-stone-200 rounded-[36px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300">
        <div className="p-8 space-y-6">

          {/* Header */}
          <header className="flex items-center gap-3 justify-end lg:justify-start">
            <div className="w-12 h-12 bg-emerald-50 ring-1 ring-emerald-100 rounded-2xl flex items-center justify-center shadow-inner">
              <Calculator className="w-6 h-6 text-emerald-700" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-[9px] text-emerald-800 font-black bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full animate-pulse">
                  قوانین مالیاتی ۲۰۲۶
                </span>
                <AustriaShield className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-stone-850 text-base sm:text-lg">
                ماشین‌حساب هوشمند Brutto-Netto اتریش
              </h2>
            </div>
          </header>

          <p className="text-xs text-stone-500 leading-relaxed font-bold text-right">
            با موتور محاسباتی دقیق، حقوق ناخالص را به خالص تبدیل کنید — با درنظر گرفتن بیمه
            اجتماعی ۱۸٫۱۲٪، پله‌های تصاعدی مالیات و ساختار حقوق ۱۳ و ۱۴ اتریش.
          </p>

          {/* Mode switch */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setMode('brutto')}
              aria-pressed={mode === 'brutto'}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                mode === 'brutto'
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Brutto → Netto
            </button>
            <button
              type="button"
              onClick={() => setMode('netto')}
              aria-pressed={mode === 'netto'}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                mode === 'netto'
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Netto → Brutto
            </button>
          </div>

          {/* Input + period */}
          <div className="space-y-4 pt-1 text-right">
            <div>
              <label
                htmlFor="brutto-netto-input"
                className="text-[10px] font-black text-stone-600 block mb-1.5"
              >
                {mode === 'brutto' ? 'حقوق ناخالص (Brutto)' : 'حقوق خالص (Netto)'}:
              </label>
              <div className="relative group">
                <input
                  id="brutto-netto-input"
                  type="number"
                  inputMode="decimal"
                  dir="ltr"
                  value={activeInput}
                  onChange={(e) => setActiveInput(e.target.value)}
                  placeholder="مثلا: ۳۵۰۰"
                  aria-label="مبلغ ورودی"
                  className="w-full bg-stone-50 border border-stone-200 p-3.5 px-12 rounded-xl text-lg font-mono font-black text-stone-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 text-left"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-stone-400 group-focus-within:text-emerald-600 transition-colors">
                  €
                </span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded ring-1 ring-emerald-100">
                  {mode === 'brutto' ? 'BRUTTO' : 'NETTO'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { key: 'monthly', label: 'حقوق ماهیانه' },
                { key: 'yearly',  label: 'حقوق سالیانه (۱۴ حقوق)' },
              ].map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPeriod(p.key)}
                  aria-pressed={period === p.key}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 active:scale-[0.98] ${
                    period === p.key
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result card */}
          <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-[28px] p-6 text-white text-right space-y-4 shadow-lg shadow-emerald-900/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-x-8 -translate-y-8" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl translate-x-8 translate-y-8" />

            <div className="relative space-y-1">
              <div className="flex justify-between items-center gap-3">
                <span className="text-[9px] font-bold text-emerald-100 block">
                  حقوق خالص واریزی به حساب شما (اتریش):
                </span>
                <button
                  onClick={() => window.print()}
                  className="bg-white/15 hover:bg-white/25 active:scale-95 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all backdrop-blur-sm"
                >
                  چاپ / PDF
                </button>
              </div>
              <h3
                aria-live="polite"
                className="text-4xl font-mono font-black tracking-tight tabular-nums"
              >
                {fmt(animNetto)}{' '}
                <span className="text-sm font-sans font-bold opacity-90">
                  یورو / {period === 'monthly' ? 'ماه' : 'سال'}
                </span>
              </h3>
              <div className="flex items-center gap-2 pt-1 text-[10px] font-bold text-emerald-50/80">
                <TrendingUp className="w-3 h-3" />
                نرخ مؤثر کسورات: {result.effectiveRate.toFixed(1)}٪
              </div>
            </div>

            <div className="relative border-t border-white/20 pt-4 grid grid-cols-2 gap-4 text-[10px] text-emerald-100">
              <div className="text-right">
                <span className="block opacity-75 mb-0.5">حقوق ناخالص</span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">
                  {fmt(animBrutto)} €
                </span>
              </div>
              <div className="text-right">
                <span className="block opacity-75 mb-0.5">جمع کسورات</span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">
                  {fmt(animSV + animTax)} €
                </span>
              </div>
              <div className="text-right flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 mt-0.5 text-emerald-200" />
                <div>
                  <span className="block opacity-75 mb-0.5">بیمه اجتماعی (SV)</span>
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {fmt(animSV)} €
                  </span>
                </div>
              </div>
              <div className="text-right flex items-start gap-1.5">
                <Receipt className="w-3.5 h-3.5 mt-0.5 text-emerald-200" />
                <div>
                  <span className="block opacity-75 mb-0.5">مالیات (Lohnsteuer)</span>
                  <span className="text-xs font-mono font-bold text-white tabular-nums">
                    {fmt(animTax)} €
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SV breakdown micro-bars */}
          {result.monthlyBrutto > 0 && (
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[9px] font-black text-stone-500">
                  <Info className="w-3 h-3" />
                  تفکیک بیمه اجتماعی
                </div>
                <span className="text-[9px] font-black text-emerald-700">۱۸٫۱۲٪ از Brutto</span>
              </div>
              <div className="space-y-2">
                {Object.entries(result.breakdown as Record<string, BreakdownItem>).map(([key, b]) => {
                  const pct = (b.rate / SV_TOTAL) * 100;
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-black text-stone-500 w-8 text-right">
                        {b.abbr}
                      </span>
                      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${b.color} transition-all duration-700 ease-out`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-stone-600 w-14 text-left tabular-nums">
                        {fmt(b.amount * mult)} €
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tax bracket stepper */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[9px] font-black text-stone-500">
                <Landmark className="w-3 h-3" />
                پله مالیاتی فعال
              </div>
              <span className="text-[9px] font-black text-stone-600">
                درآمد مشمول: {fmt(result.taxable)} €
              </span>
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden bg-stone-100">
              {bracketsList.map((b, i) => (
                <div
                  key={i}
                  className={`flex-1 ${b.color} transition-all duration-500 ${
                    i === currentBracket
                      ? 'ring-2 ring-offset-1 ring-stone-800 z-10'
                      : 'opacity-30'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[8.5px] font-bold text-stone-400">
              {bracketsList.map((b, i) => (
                <span key={i} className={i === currentBracket ? 'text-stone-800 font-black' : ''}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 p-4 border-t border-stone-100 text-[9.5px] text-stone-400 font-bold font-mono text-center flex items-center justify-center gap-2">
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
          محاسبه بر اساس مقیاس تصاعدی مالیاتی فدرال اتریش ۲۰۲۶
        </div>
      </div>

      {/* ===================== RIGHT: AUSTRIA GmbH ROADMAP ===================== */}
      <aside className="lg:col-span-5 bg-stone-950 text-white border border-stone-800 rounded-[36px] p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">

        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-600 via-white to-rose-600 opacity-80" />
        <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-rose-600/10 blur-3xl group-hover:bg-rose-600/20 transition-all duration-700" />

        <div className="relative z-10 space-y-5 text-right">
          <header className="flex items-center gap-3 justify-end lg:justify-start">
            <div className="w-11 h-11 bg-white/5 ring-1 ring-white/10 rounded-2xl flex items-center justify-center text-amber-500">
              <Building className="w-5.5 h-5.5" />
            </div>
            <div className="flex items-center gap-2">
              <AustriaShield className="w-7 h-7 drop-shadow" />
              <div>
                <span className="text-[8px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-black">
                  WKO GUIDELINE
                </span>
                <h3 className="font-extrabold text-white text-md mt-0.5">
                  رهنمای تأسیس شرکت در اتریش (GmbH)
                </h3>
              </div>
            </div>
          </header>

          <p className="text-[10.5px] text-zinc-400 leading-relaxed font-bold">
            نقشهٔ راه رسمی برای کارآفرینان برای تأمین تأیید صلاحیت، ثبت در دادگاه بازرگانی
            و پایش سرمایه — همراه با نکات کلیدی مالیاتی و بیمهٔ SVS.
          </p>

          <div className="space-y-2.5 pt-1">
            {[
              { s: '۱', t: 'بیزنس‌پلان کارآمد',           d: 'تدوین طرح دقیق برای AMS و توجیه اقتصادی بانک مرکزی.',   Icon: FileCheckIcon },
              { s: '۲', t: 'تأیید نام و دفتر فیزیکی',      d: 'رزرو نام شرکت و ثبت آدرس معتبر اداری با ملک مستند.',     Icon: Landmark },
              { s: '۳', t: 'واریز سرمایه (Stammkapital)',  d: 'افتتاح حساب تعاونی و واریز حداقل سرمایه ۳۵٬۰۰۰ یورو.', Icon: PiggyBank },
              { s: '۴', t: 'کد اقتصادی و UID نهایی',       d: 'ثبت نهایی در دادگاه تجارت و دریافت گواهی رسمی UID.',    Icon: BadgeCheck },
            ].map((step, idx) => (
              <div
                key={idx}
                className="flex gap-3 bg-white/[0.04] hover:bg-white/[0.09] p-3 rounded-xl border border-white/10 hover:border-white/20 text-right transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-8 h-8 shrink-0 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20 flex items-center justify-center text-amber-400">
                  <step.Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-right">
                  <h4 className="text-[11px] font-black text-stone-100 flex items-center gap-1.5 justify-end">
                    <span>{step.t}</span>
                    <span className="text-[8.5px] bg-rose-600 text-white rounded px-1">
                      {step.s}
                    </span>
                  </h4>
                  <p className="text-[9.5px] text-zinc-400 mt-0.5 leading-relaxed">
                    {step.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { v: '۳۵٬۰۰۰€', l: 'سرمایه ثبتی' },
              { v: '۲۵٪',     l: 'مالیات شرکتی' },
              { v: '۲۰٪',     l: 'مالیات ارزش افزوده' },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/10 rounded-xl p-2.5 text-center hover:bg-white/[0.08] transition-colors"
              >
                <div className="text-[13px] font-black text-amber-400 font-mono">{s.v}</div>
                <div className="text-[8.5px] text-zinc-400 font-bold mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <footer className="relative pt-4 border-t border-white/5 flex justify-between items-center text-[9px] text-stone-500 font-bold mt-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            بیمه شرکتی: SVS
          </span>
          <span className="flex items-center gap-1">
            <Globe2 className="w-3 h-3" />
            WKO Wien
          </span>
        </footer>
      </aside>

      {/* ===================== BOTTOM: SEO CONTENT ===================== */}
      <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">

        {/* Tax brackets table */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-[28px] p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-stone-800">
              پله‌های مالیات بر درآمد اتریش — ۲۰۲۶
            </h2>
          </div>
          <div className="space-y-2">
            {bracketsList.map((b, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                  i === currentBracket
                    ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200'
                    : 'bg-stone-50 border-stone-100 hover:border-stone-200'
                }`}
              >
                <span className="text-[10px] font-mono text-stone-600">{b.range}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-stone-800">{b.label}</span>
                  <span className={`w-2 h-2 rounded-full ${b.color}`} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[9.5px] text-stone-400 font-bold mt-3 leading-relaxed">
            * درآمد تا ۱٬۰۶۰ یورو در ماه معاف از مالیات است. نرخ‌ها بر پایه درآمد مشمول
            (پس از کسر بیمه اجتماعی و هزینه‌های تبلیغاتی پائوشال) محاسبه می‌شود.
          </p>
        </div>

        {/* FAQ */}
        <div className="lg:col-span-6 bg-white border border-stone-200 rounded-[28px] p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-stone-800">سؤالات متداول</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={i}
                  className="border border-stone-100 rounded-xl overflow-hidden bg-stone-50/50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between p-3 text-right hover:bg-stone-50 transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform duration-300 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                    <span className="text-[11px] font-black text-stone-700 flex-1 pr-2">
                      {f.q}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-[10px] text-stone-500 leading-relaxed font-bold px-3 pb-3">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}