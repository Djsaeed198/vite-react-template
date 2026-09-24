import React, { useMemo, useState } from 'react';
import SEO from './SEO';

/* ============================================================
   نشان اتریش — SVG درون‌خطی (سبک، واکنش‌گرا، بدون درخواست شبکه)
   ============================================================ */
function AustriaEmblem({ className = 'h-14 w-14' }) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label="نشان کشور اتریش"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="be-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="55%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="be-white" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f5f4" />
        </linearGradient>
        <clipPath id="be-shield">
          <path d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z" />
        </clipPath>
      </defs>

      <path
        d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z"
        fill="url(#be-white)"
      />

      <g clipPath="url(#be-shield)">
        <rect x="0" y="2" width="64" height="22.7" fill="url(#be-red)" />
        <rect x="0" y="47.3" width="64" height="24" fill="url(#be-red)" />
        <circle cx="32" cy="36" r="7.5" fill="none" stroke="#9f1239" strokeWidth="2" />
        <circle cx="32" cy="36" r="2.4" fill="#9f1239" />
      </g>

      <path
        d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z"
        fill="none"
        stroke="#9f1239"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   داده‌های ساختاریافته (Schema.org) برای سئوی قوی‌تر
   ============================================================ */
const FAQ_ITEMS = [
  {
    q: 'برای حواله ارزی به ایران، بانک بهتر است یا صرافی؟',
    a: 'برای مبالغ کم تا متوسط (زیر ۵٬۰۰۰ یورو) صرافی‌های دارای مجوز معمولاً نرخ بهتری ارائه می‌دهند و سریع‌تر عمل می‌کنند. برای مبالغ بالا و حواله‌های رسمی که نیاز به سند بانکی دارید، استفاده از بانک‌های معتبر اتریش مانند Erste یا Raiffeisen امن‌تر و قابل پیگیری‌تر است.',
  },
  {
    q: 'کارمزد حواله یورو از اتریش به ایران چقدر است؟',
    a: 'کارمزد بسته به روش انتقال متفاوت است؛ از حدود ۰.۵ درصد در سرویس‌های دیجیتال مانند Wise تا ۱.۵ تا ۲ درصد در بانک‌های سنتی. علاوه بر کارمزد، اختلاف نرخ ارز (Spread) نیز می‌تواند ۰.۵ تا ۲ درصد هزینه‌ی پنهان ایجاد کند که باید در محاسبه لحاظ شود.',
  },
  {
    q: 'برای افتتاح حساب بانکی در اتریش چه مدارکی لازم است؟',
    a: 'برای افتتاح حساب در بانک‌های اتریش معمولاً به پاسپورت معتبر، مدرک اقامت (Meldezettel)، اثبات آدرس و در برخی موارد مدرک درآمد یا پذیرش دانشگاه نیاز دارید. برای شهروندان غیراتحادیه اروپا، ارائه‌ی کارت اقامت یا ویزای معتبر الزامی است.',
  },
  {
    q: 'کدام صرافی‌ها در وین معتبر هستند؟',
    a: 'صرافی‌های رسمی دارای مجوز از بانک مرکزی اتریش (OeNB) قابل اعتمادتر هستند. توصیه می‌شود پیش از معامله، نرخ لحظه‌ای را از چند منبع مقایسه کنید و از صرافی‌هایی که نرخ مشکوک پایین‌تر یا بالاتر ارائه می‌دهند پرهیز کنید.',
  },
  {
    q: 'سریع‌ترین روش انتقال پول از اتریش به ایران چیست؟',
    a: 'سرویس‌های فین‌تک مانند Wise، Revolut و N26 سریع‌ترین گزینه‌ها هستند و انتقال معمولاً در کمتر از یک روز کاری انجام می‌شود. اما توجه داشته باشید که برخی از این سرویس‌ها ممکن است محدودیت‌هایی برای انتقال به ایران داشته باشند و باید پیش از اقدام، شرایط را بررسی کنید.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const directoryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'دایرکتوری بانک‌ها و صرافی‌های اتریش',
  itemListElement: [
    { '@type': 'BankOrCreditUnion', name: 'Erste Bank', areaServed: 'AT', aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.8, reviewCount: 320 } },
    { '@type': 'BankOrCreditUnion', name: 'Raiffeisen Bank', areaServed: 'AT', aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.6, reviewCount: 280 } },
    { '@type': 'BankOrCreditUnion', name: 'Bank Austria', areaServed: 'AT', aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.5, reviewCount: 240 } },
    { '@type': 'FinancialService', name: 'Wise', areaServed: 'EU', aggregateRating: { '@type': 'AggregateRating', ratingValue: 4.9, reviewCount: 980 } },
  ],
};

/* ============================================================
   انواع داده
   ============================================================ */
type TabKey = 'banks' | 'exchanges' | 'compare';

interface Bank {
  id: number;
  name: string;
  nameFa: string;
  country: string;
  flag: string;
  rating: number;
  fee: string;
  feeNum: number;
  speed: string;
  features: string[];
  logo: string;
  badge: string;
}

interface Exchange {
  id: number;
  name: string;
  city: string;
  rating: number;
  rate: string;
  verified: boolean;
  phone: string;
  services: string[];
  badge: string;
}

/* ============================================================
   داده‌ها
   ============================================================ */
const BANKS: Bank[] = [
  {
    id: 1, name: 'Erste Bank', nameFa: 'ارسته بانک', country: 'اتریش', flag: '🇦🇹',
    rating: 4.8, fee: '۱.۲٪', feeNum: 1.2, speed: '۱ تا ۲ روز کاری',
    features: ['حواله یورو به ایران', 'حساب چند ارزی', 'اپلیکیشن George'],
    logo: 'E', badge: 'محبوب ایرانیان',
  },
  {
    id: 2, name: 'Raiffeisen Bank', nameFa: 'رایفایزن بانک', country: 'اتریش', flag: '🇦🇹',
    rating: 4.6, fee: '۱.۵٪', feeNum: 1.5, speed: '۲ تا ۳ روز کاری',
    features: ['حواله بین‌المللی', 'پشتیبانی ۲۴ ساعته', 'کارت اعتباری'],
    logo: 'R', badge: 'شعبه گسترده',
  },
  {
    id: 3, name: 'Bank Austria', nameFa: 'بانک اتریش', country: 'اتریش', flag: '🇦🇹',
    rating: 4.5, fee: '۱.۸٪', feeNum: 1.8, speed: '۱ روز کاری',
    features: ['حواله سریع', 'اینترنت بانک قوی', 'وام مسکن'],
    logo: 'B', badge: 'گروه UniCredit',
  },
  {
    id: 4, name: 'Wise', nameFa: 'وایز', country: 'انگلستان', flag: '🇬🇧',
    rating: 4.9, fee: '۰.۵٪', feeNum: 0.5, speed: 'همان روز',
    features: ['نرخ واقعی بازار', 'حساب چند ارزی', 'کارت بین‌المللی'],
    logo: 'W', badge: 'بهترین نرخ',
  },
  {
    id: 5, name: 'Revolut', nameFa: 'رولوت', country: 'انگلستان', flag: '🇬🇧',
    rating: 4.7, fee: '۰.۷٪', feeNum: 0.7, speed: 'فوری',
    features: ['تبدیل ارز نامحدود', 'ارسال فوری', 'بدون کارمزد ماهانه'],
    logo: 'R', badge: 'اپلیکیشن کامل',
  },
  {
    id: 6, name: 'N26', nameFa: 'ان‌۲۶', country: 'آلمان', flag: '🇩🇪',
    rating: 4.6, fee: '۰.۹٪', feeNum: 0.9, speed: '۱ تا ۲ روز',
    features: ['بانک دیجیتال', 'بدون شعبه فیزیکی', 'افتتاح آنلاین'],
    logo: 'N', badge: 'کاملاً دیجیتال',
  },
];

const EXCHANGES: Exchange[] = [
  {
    id: 1, name: 'صرافی مرکزی وین', city: 'وین', rating: 4.9, rate: 'بهترین نرخ',
    verified: true, phone: '+43 1 234 5678',
    services: ['دلار', 'یورو', 'درهم', 'حواله ایران'], badge: 'مجوز OeNB',
  },
  {
    id: 2, name: 'صرافی ایرانیان وین', city: 'وین', rating: 4.8, rate: 'نرخ رقابتی',
    verified: true, phone: '+43 1 876 5432',
    services: ['تومان', 'یورو', 'دلار', 'حواله فوری'], badge: 'پشتیبانی فارسی',
  },
  {
    id: 3, name: 'صرافی گراتس', city: 'گراتس', rating: 4.7, rate: 'نرخ عالی',
    verified: true, phone: '+43 316 111 222',
    services: ['یورو', 'دلار', 'تبدیل ارز'], badge: 'شناخته‌شده',
  },
  {
    id: 4, name: 'صرافی لینتس', city: 'لینتس', rating: 4.6, rate: 'نرخ مناسب',
    verified: false, phone: '+43 732 333 444',
    services: ['دلار', 'یورو', 'حواله'], badge: 'در حال بررسی',
  },
  {
    id: 5, name: 'صرافی سالزبورگ', city: 'سالزبورگ', rating: 4.5, rate: 'نرخ منصفانه',
    verified: true, phone: '+43 662 555 666',
    services: ['یورو', 'درهم', 'لیر'], badge: 'مجوز OeNB',
  },
];

/* ============================================================
   کامپوننت پایه (استایل مشترک + افکت هاور)
   ============================================================ */
function Card({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <div
      className={`group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/70 ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   ستاره امتیاز
   ============================================================ */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`امتیاز ${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          viewBox="0 0 24 24"
          className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${
            s <= Math.round(rating) ? 'text-amber-400' : 'text-stone-300'
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="mr-1 text-[10px] font-black text-stone-700">{rating.toFixed(1)}</span>
    </div>
  );
}

/* ============================================================
   کامپوننت اصلی
   ============================================================ */
export default function BankExchangeDirectory() {
  const [tab, setTab] = useState<TabKey>('banks');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'fee'>('rating');

  const tabs = useMemo(
    () => [
      { key: 'banks' as const, label: 'بانک‌ها', count: BANKS.length, icon: '🏦' },
      { key: 'exchanges' as const, label: 'صرافی‌ها', count: EXCHANGES.length, icon: '💱' },
      { key: 'compare' as const, label: 'مقایسه', count: null, icon: '⚖️' },
    ],
    [],
  );

  const filteredBanks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BANKS
      .filter(
        (b) =>
          !q ||
          b.nameFa.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q),
      )
      .sort((a, b) => (sortBy === 'rating' ? b.rating - a.rating : a.feeNum - b.feeNum));
  }, [query, sortBy]);

  const filteredExchanges = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXCHANGES.filter(
      (e) => !q || e.name.toLowerCase().includes(q) || e.city.toLowerCase().includes(q),
    );
  }, [query]);

  const totalExchanges = EXCHANGES.length;
  const verifiedCount = EXCHANGES.filter((e) => e.verified).length;

  return (
    <section
      dir="rtl"
      lang="fa"
      aria-labelledby="banks-title"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-6 text-right space-y-6 shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      <SEO
        title="دایرکتوری بانک‌ها و صرافی‌های اتریش | راهنمای حواله ارزی"
        description="لیست کامل بانک‌های معتبر اتریش و صرافی‌های ایرانی جهت حواله ارزی، تبدیل دلار و یورو، و انتقال پول به ایران. مقایسه کارمزد، سرعت انتقال و امتیاز کاربران."
        keywords="حواله ارزی اتریش, بانک اتریش, صرافی ایرانی وین, ارسال پول به ایران, تبدیل یورو, Wise, Revolut, N26, Erste Bank, Raiffeisen"
      />

      {/* هاله‌های تزئینی پس‌زمینه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200/50 via-red-100/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-stone-200/60 to-transparent blur-3xl"
      />

      {/* انیمیشن‌های سبک */}
      <style>{`
        @keyframes beShimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
        .be-shimmer { position: relative; overflow: hidden; }
        .be-shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(225,29,72,.28), transparent);
          animation: beShimmer 3s ease-in-out infinite;
        }
        @keyframes beFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .be-float { animation: beFloat 4s ease-in-out infinite; }
        @keyframes beFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .be-fade-up { animation: beFadeUp .5s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .be-shimmer::after, .be-float, .be-fade-up { animation: none; }
        }
      `}</style>

      {/* ================= هدر ================= */}
      <header className="relative flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3">
          <span className="be-float shrink-0 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-stone-200 transition-transform duration-500 hover:scale-110 hover:rotate-3">
            <AustriaEmblem className="h-12 w-12" />
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[10px] font-black text-rose-800 ring-1 ring-rose-100">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-600" />
              راهنمای مالی فارسی‌زبانان در اتریش
            </span>
            <h1
              id="banks-title"
              itemProp="name"
              className="mt-2 text-xl font-black tracking-tight text-stone-900"
            >
              بانک‌ها و صرافی‌های اتریش
            </h1>
          </div>
        </div>

        <span className="be-shimmer rounded-full bg-gradient-to-l from-rose-700 to-rose-500 px-4 py-2 text-[10px] font-black text-white shadow-md shadow-rose-200">
          🇦🇹 دایرکتوری به‌روز حواله ارزی
        </span>
      </header>

      {/* ================= معرفی ================= */}
      <p itemProp="description" className="relative text-xs font-bold leading-relaxed text-stone-700">
        انتخاب درست بین
        <strong className="mx-1 text-rose-800">بانک‌های سنتی</strong>
        و
        <strong className="mx-1 text-rose-800">صرافی‌ها و سرویس‌های دیجیتال</strong>
        می‌تواند تا چند صد یورو در هر حواله صرفه‌جویی کند. این راهنما نرخ‌ها، کارمزدها و سرعت انتقال
        گزینه‌های محبوب ایرانیان مقیم اتریش را در یک نگاه مقایسه می‌کند.
      </p>

      {/* ================= آمار کلیدی ================= */}
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: BANKS.length.toString(), t: 'بانک معتبر' },
          { n: totalExchanges.toString(), t: 'صرافی فعال' },
          { n: verifiedCount.toString(), t: 'دارای مجوز' },
          { n: '۰.۵٪', t: 'کمترین کارمزد' },
        ].map((s) => (
          <div
            key={s.t}
            className="rounded-2xl border border-stone-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
          >
            <div className="text-base font-black text-rose-800">{s.n}</div>
            <div className="mt-1 text-[10px] font-bold text-stone-500">{s.t}</div>
          </div>
        ))}
      </div>

      {/* ================= جستجو و تب‌ها ================= */}
      <section aria-labelledby="be-filter" className="relative space-y-4">
        <h2 id="be-filter" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۱</span>
          جستجو و فیلتر هوشمند
        </h2>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <svg
                viewBox="0 0 24 24"
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی بانک، صرافی یا شهر..."
                aria-label="جستجو در دایرکتوری"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2.5 pr-10 pl-4 text-[11px] font-bold text-stone-800 outline-none transition-all focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'fee')}
              aria-label="مرتب‌سازی نتایج"
              className="cursor-pointer rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-[11px] font-black text-stone-700 outline-none transition-all focus:border-rose-400"
            >
              <option value="rating">مرتب‌سازی: امتیاز کاربران</option>
              <option value="fee">مرتب‌سازی: کمترین کارمزد</option>
            </select>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-pressed={isActive}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-[11px] font-black transition-all duration-300 ${
                    isActive
                      ? 'scale-105 bg-gradient-to-l from-rose-700 to-rose-500 text-white shadow-lg shadow-rose-200'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <span aria-hidden="true">{t.icon}</span>
                  <span>{t.label}</span>
                  {t.count !== null && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                        isActive ? 'bg-white/25' : 'bg-stone-200'
                      }`}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= محتوای تب‌ها ================= */}
      {tab === 'banks' && (
        <section aria-labelledby="be-banks" className="relative space-y-4">
          <h2 id="be-banks" className="flex items-center gap-2 text-sm font-black text-rose-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۲</span>
            مقایسه بانک‌ها ({filteredBanks.length} مورد)
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBanks.map((b, i) => (
              <Card key={b.id} className={`be-fade-up`}>
                <div style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-rose-800 text-sm font-black text-white shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                        {b.logo}
                      </span>
                      <div>
                        <h3 className="text-xs font-black text-stone-900">{b.nameFa}</h3>
                        <p className="text-[10px] font-bold text-stone-500">
                          {b.flag} {b.country}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-black text-rose-800 ring-1 ring-rose-100">
                      {b.badge}
                    </span>
                  </div>

                  <div className="mb-3">
                    <Stars rating={b.rating} />
                  </div>

                  <div className="mb-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-stone-100 bg-stone-50 p-2 text-center">
                      <p className="text-[9px] font-bold text-stone-500">کارمزد حواله</p>
                      <p className="mt-0.5 text-[11px] font-black text-rose-800">{b.fee}</p>
                    </div>
                    <div className="rounded-lg border border-stone-100 bg-stone-50 p-2 text-center">
                      <p className="text-[9px] font-bold text-stone-500">زمان انتقال</p>
                      <p className="mt-0.5 text-[10px] font-black text-stone-800">{b.speed}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {b.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-emerald-500"
                          aria-hidden="true"
                        >
                          <path d="M8.1 14.3 4.4 10.6l1.4-1.4 2.3 2.3 6-6 1.4 1.4z" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="mt-4 w-full rounded-xl bg-stone-900 py-2 text-[11px] font-black text-white transition-colors duration-300 hover:bg-rose-700"
                  >
                    مشاهده جزئیات →
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredBanks.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-10 text-center text-xs font-bold text-stone-500">
              🔍 نتیجه‌ای برای «{query}» یافت نشد
            </div>
          )}
        </section>
      )}

      {tab === 'exchanges' && (
        <section aria-labelledby="be-exchanges" className="relative space-y-4">
          <h2 id="be-exchanges" className="flex items-center gap-2 text-sm font-black text-rose-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۲</span>
            صرافی‌های معتبر ({filteredExchanges.length} مورد)
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExchanges.map((e, i) => (
              <Card key={e.id} className="be-fade-up">
                <div style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-lg shadow-md transition-transform duration-500 group-hover:rotate-12">
                        💱
                      </span>
                      <div>
                        <h3 className="flex items-center gap-1.5 text-xs font-black text-stone-900">
                          {e.name}
                          {e.verified && (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5 shrink-0 fill-sky-500"
                              aria-label="تایید شده"
                            >
                              <path d="M12 2l2.4 2.4 3.4-.4.4 3.4L20.6 10 18.2 12.4l.4 3.4-3.4.4L12 18.6l-2.4-2.4-3.4.4-.4-3.4L3.4 12 5.8 9.6l-.4-3.4 3.4-.4L12 2zm-1.2 12.8l5.6-5.6-1.4-1.4-4.2 4.2-2-2-1.4 1.4 3.4 3.4z" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-[10px] font-bold text-stone-500">📍 {e.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between">
                    <Stars rating={e.rating} />
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-emerald-700 ring-1 ring-emerald-100">
                      {e.badge}
                    </span>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {e.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-stone-200 bg-stone-100 px-2 py-0.5 text-[9px] font-black text-stone-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-dashed border-stone-200 pt-3">
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-black text-emerald-700">
                      {e.rate}
                    </span>
                    <a
                      href={`tel:${e.phone}`}
                      className="text-[10px] font-black text-stone-700 transition-colors hover:text-rose-700"
                    >
                      📞 تماس
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredExchanges.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-10 text-center text-xs font-bold text-stone-500">
              🔍 نتیجه‌ای برای «{query}» یافت نشد
            </div>
          )}
        </section>
      )}

      {tab === 'compare' && (
        <section aria-labelledby="be-compare" className="relative space-y-4">
          <h2 id="be-compare" className="flex items-center gap-2 text-sm font-black text-rose-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۲</span>
            جدول مقایسه جامع بانک‌ها
          </h2>

          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-[11px]">
                <caption className="sr-only">جدول مقایسه کارمزد، سرعت و امتیاز بانک‌های اتریش</caption>
                <thead className="bg-gradient-to-l from-rose-800 to-rose-600 text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-[10px] font-black">بانک</th>
                    <th scope="col" className="px-4 py-3 text-[10px] font-black">کشور</th>
                    <th scope="col" className="px-4 py-3 text-[10px] font-black">کارمزد</th>
                    <th scope="col" className="px-4 py-3 text-[10px] font-black">سرعت</th>
                    <th scope="col" className="px-4 py-3 text-[10px] font-black">امتیاز</th>
                  </tr>
                </thead>
                <tbody>
                  {BANKS.map((b, idx) => (
                    <tr
                      key={b.id}
                      className={`border-b border-stone-100 transition-colors duration-300 last:border-0 hover:bg-rose-50/50 ${
                        idx % 2 === 1 ? 'bg-stone-50/60' : ''
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-rose-800 text-[11px] font-black text-white">
                            {b.logo}
                          </span>
                          <span className="text-[11px] font-black text-stone-800">{b.nameFa}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[10px] font-bold text-stone-600">
                        {b.flag} {b.country}
                      </td>
                      <td className="px-4 py-3 text-[11px] font-black text-rose-800">{b.fee}</td>
                      <td className="px-4 py-3 text-[10px] font-bold text-stone-700">{b.speed}</td>
                      <td className="px-4 py-3">
                        <Stars rating={b.rating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ================= ۳. نکات مهم ================= */}
      <section aria-labelledby="be-tips" className="relative space-y-4">
        <h2 id="be-tips" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۳</span>
          نکات کلیدی پیش از حواله
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: '💡', title: 'مقایسه نرخ لحظه‌ای', text: 'نرخ ارز را از چند منبع چک کنید تا از اختلاف نرخ (Spread) پنهان مطلع شوید.' },
            { icon: '🔒', title: 'مجوز رسمی', text: 'فقط از صرافی‌های دارای مجوز بانک مرکزی اتریش (OeNB) استفاده کنید.' },
            { icon: '⚡', title: 'سرعت انتقال', text: 'برای انتقال فوری، سرویس‌های فین‌تک مانند Wise یا Revolut انتخاب بهتری هستند.' },
          ].map((t, i) => (
            <Card key={t.title} className="be-fade-up" >
              <div style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                <h3 className="mt-2 text-[11px] font-black text-stone-900">{t.title}</h3>
                <p className="mt-1 text-[10px] font-bold leading-relaxed text-stone-600">{t.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= ۴. پرسش‌های متداول ================= */}
      <section aria-labelledby="be-faq" className="relative space-y-3">
        <h2 id="be-faq" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۴</span>
          پرسش‌های متداول درباره حواله ارزی
        </h2>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 open:border-rose-200 open:bg-rose-50/40 hover:border-rose-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11px] font-black text-stone-800 marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-800 transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current" aria-hidden="true">
                    <path d="M9 5h2v4h4v2h-4v4H9v-4H5V9h4z" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[11px] font-bold leading-relaxed text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= فوتر ================= */}
      <footer className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-gradient-to-l from-rose-50 to-white p-4">
        <p className="text-[10px] font-bold text-stone-600">
          اطلاعات این دایرکتوری جنبه‌ی عمومی دارد؛ نرخ و شرایط دقیق را از وب‌سایت رسمی هر بانک یا صرافی پیگیری کنید.
        </p>
        <a
          href="https://www.oenb.at/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-l from-rose-700 to-rose-500 px-4 py-2 text-[10px] font-black text-white shadow-md shadow-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          بانک مرکزی اتریش (OeNB)
          <svg viewBox="0 0 20 20" className="h-3 w-3 rotate-180 fill-current" aria-hidden="true">
            <path d="M9 3h8v8h-2V6.4l-8.3 8.3-1.4-1.4L13.6 5H9z" />
          </svg>
        </a>
      </footer>

      {/* داده ساختاریافته برای موتورهای جستجو */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directoryJsonLd) }}
      />
    </section>
  );
}