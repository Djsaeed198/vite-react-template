import React, { useState, useMemo } from 'react';
import {
  Heart, PlusCircle, Search, MapPin, Tag, Clock, TrendingUp,
  BadgeCheck, Shield, Zap, Star, Eye, MessageCircle, Award,
  Filter, ChevronDown, Sparkles, Flame, ThumbsUp, Users,
  Globe2, Camera, X, CheckCircle2, ArrowUpRight
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   🇦🇹 Austria Resident – Classifieds Block (Deewar)
   دیوار بی‌واسطه فارسی‌زبانان مقیم اتریش
   SEO-Optimized • Dynamic Filters • Animations • RTL
   ═══════════════════════════════════════════════════════════════ */

interface AdItem {
  id: string;
  title: string;
  price: string;
  location: string;
  category: 'property' | 'vehicles' | 'laptop' | 'furniture' | 'books' | 'jobs';
  date: string;
  status: string;
  likes: number;
  views: number;
  likedByUser: boolean;
  verified: boolean;
  urgent: boolean;
  icon: string;
  seller: string;
}

const CATEGORY_META: Record<
  string,
  { label: string; icon: string; gradient: string; badge: string }
> = {
  property: {
    label: 'املاک و هم‌خانه',
    icon: '🏠',
    gradient: 'from-red-500 to-rose-600',
    badge: 'bg-red-50 text-red-800 border-red-200'
  },
  vehicles: {
    label: 'وسایل نقلیه',
    icon: '🚗',
    gradient: 'from-indigo-500 to-blue-600',
    badge: 'bg-indigo-50 text-indigo-800 border-indigo-200'
  },
  laptop: {
    label: 'الکترونیکی',
    icon: '💻',
    gradient: 'from-teal-500 to-emerald-600',
    badge: 'bg-teal-50 text-teal-800 border-teal-200'
  },
  furniture: {
    label: 'لوازم منزل',
    icon: '🛋️',
    gradient: 'from-amber-500 to-orange-600',
    badge: 'bg-amber-50 text-amber-800 border-amber-200'
  },
  books: {
    label: 'کتاب و آموزشی',
    icon: '📚',
    gradient: 'from-purple-500 to-fuchsia-600',
    badge: 'bg-purple-50 text-purple-800 border-purple-200'
  },
  jobs: {
    label: 'کار و استخدام',
    icon: '💼',
    gradient: 'from-stone-600 to-slate-700',
    badge: 'bg-stone-100 text-stone-800 border-stone-300'
  }
};

/* ─── Austria Resident Logo ─── */
function AustriaResidentLogo({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-label="Austria Resident Logo">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-rose-700 rounded-2xl shadow-lg shadow-red-500/30 rotate-3" />
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 rounded-2xl flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 40 40" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="32" height="5" fill="#ED2939" rx="1" />
          <rect x="4" y="13" width="32" height="5" fill="#FFFFFF" rx="0.5" />
          <rect x="4" y="18" width="32" height="5" fill="#ED2939" rx="1" />
          <path
            d="M20 27 L23 30 L29 24"
            stroke="#FBBF24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-stone-900 animate-pulse" />
      </div>
    </div>
  );
}

export default function AustriaClassifiedsBlock() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedWallCat, setSelectedWallCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'cheap'>('recent');
  const [showAdForm, setShowAdForm] = useState(false);

  const [adList, setAdList] = useState<AdItem[]>([
    {
      id: 'ad1',
      title: 'دوچرخه کوهستان برند Scott - در حد نو',
      price: '450',
      location: 'وین، منطقه ۱۰',
      category: 'vehicles',
      date: 'امروز',
      status: 'درگاه امن فعال',
      likes: 18,
      views: 342,
      likedByUser: false,
      verified: true,
      urgent: false,
      icon: '🚴',
      seller: 'Ali_Vienna'
    },
    {
      id: 'ad2',
      title: 'ست مبل ۳ نفره IKEA مدل Ektorp تمیز',
      price: '120',
      location: 'گراتس، مرکز',
      category: 'furniture',
      date: 'دیروز',
      status: 'فقط پرداخت نقدی',
      likes: 8,
      views: 187,
      likedByUser: false,
      verified: true,
      urgent: false,
      icon: '🛋️',
      seller: 'Graz_Home'
    },
    {
      id: 'ad3',
      title: 'MacBook Pro 2021 M1 - گرید A طلایی',
      price: '1100',
      location: 'وین، منطقه ۱',
      category: 'laptop',
      date: '۲ روز پیش',
      status: 'درگاه امن فعال',
      likes: 25,
      views: 891,
      likedByUser: true,
      verified: true,
      urgent: true,
      icon: '💻',
      seller: 'TechWien'
    },
    {
      id: 'ad4',
      title: 'واگذاری فوری آپارتمان هم‌خانه (WG-Zimmer)',
      price: '380',
      location: 'لینتس، اتریش',
      category: 'property',
      date: '۳ روز پیش',
      status: 'امکان تمدید',
      likes: 14,
      views: 524,
      likedByUser: false,
      verified: true,
      urgent: true,
      icon: '🏠',
      seller: 'Linz_WG'
    },
    {
      id: 'ad5',
      title: 'مجموعه کتب زبان آلمانی A1-B2 + گرامر',
      price: '65',
      location: 'سالزبورگ',
      category: 'books',
      date: '۴ روز پیش',
      status: 'ارسال به سراسر اتریش',
      likes: 12,
      views: 231,
      likedByUser: false,
      verified: false,
      urgent: false,
      icon: '📚',
      seller: 'Salzburg_Learn'
    },
    {
      id: 'ad6',
      title: 'استخدام پاره‌وقت در رستوران ایرانی - وین',
      price: 'تماس',
      location: 'وین، ۱۰۵۰',
      category: 'jobs',
      date: 'امروز',
      status: 'حقوق طبق قانون ÖGK',
      likes: 32,
      views: 1204,
      likedByUser: false,
      verified: true,
      urgent: true,
      icon: '💼',
      seller: 'Kar_Wien'
    }
  ]);

  // Form states
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdPrice, setNewAdPrice] = useState('');
  const [newAdLoc, setNewAdLoc] = useState('');
  const [newAdCat, setNewAdCat] = useState<AdItem['category']>('property');
  const [newAdDesc, setNewAdDesc] = useState('');

  const showTempSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdPrice || !newAdLoc) return;

    const newAd: AdItem = {
      id: 'ad-' + Date.now(),
      title: newAdTitle,
      price: newAdPrice,
      location: newAdLoc,
      category: newAdCat,
      date: 'همین حالا',
      status: 'به‌روزرسانی تازه',
      likes: 0,
      views: 0,
      likedByUser: false,
      verified: false,
      urgent: false,
      icon: CATEGORY_META[newAdCat]?.icon || '📦',
      seller: 'شما'
    };

    setAdList([newAd, ...adList]);
    setNewAdTitle('');
    setNewAdPrice('');
    setNewAdLoc('');
    setNewAdDesc('');
    setShowAdForm(false);
    showTempSuccess('آگهی بی‌واسطه شما با موفقیت روی دیوار اتریش‌نشین منتشر شد ✨');
  };

  const toggleLikeAd = (id: string) => {
    setAdList(
      adList.map((ad) =>
        ad.id === id
          ? {
              ...ad,
              likedByUser: !ad.likedByUser,
              likes: ad.likedByUser ? ad.likes - 1 : ad.likes + 1
            }
          : ad
      )
    );
  };

  /* ─── Dynamic Filter + Sort ─── */
  const filteredAdList = useMemo(() => {
    let result = selectedWallCat === 'all' ? adList : adList.filter((a) => a.category === selectedWallCat);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.seller.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'popular') result = [...result].sort((a, b) => b.views - a.views);
    else if (sortBy === 'cheap')
      result = [...result].sort(
        (a, b) => (parseFloat(a.price) || 1e9) - (parseFloat(b.price) || 1e9)
      );
    return result;
  }, [adList, selectedWallCat, searchQuery, sortBy]);

  /* ─── Stats ─── */
  const stats = useMemo(() => {
    const totalViews = adList.reduce((s, a) => s + a.views, 0);
    const totalLikes = adList.reduce((s, a) => s + a.likes, 0);
    const verified = adList.filter((a) => a.verified).length;
    return { total: adList.length, totalViews, totalLikes, verified };
  }, [adList]);

  return (
    <section
      dir="rtl"
      lang="fa"
      itemScope
      itemType="https://schema.org/ItemList"
      className="relative bg-gradient-to-br from-white via-stone-50/50 to-white rounded-[28px] border border-stone-200 shadow-[0_8px_40px_-12px_rgba(220,38,38,0.15)] overflow-hidden font-sans"
      id="austria-dewar-classifieds-block"
      aria-label="دیوار بی‌واسطه اتریش‌نشین"
    >
      {/* SEO */}
      <h2 className="sr-only">دیوار بی‌واسطه فارسی‌زبانان اتریش – خرید و فروش، املاک، استخدام</h2>
      <meta itemProp="name" content="Austria Resident Classifieds – Deewar" />
      <meta
        itemProp="description"
        content="بستر بی‌واسطه فارسی‌زبانان مقیم اتریش برای خرید و فروش لوازم دست دوم، آپارتمان، هم‌خانه، خودرو، لپ‌تاپ و آگهی استخدام"
      />

      {/* Top shimmer ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-red-700 via-rose-500 to-red-700 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)} 50%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
        @keyframes toastIn { from{opacity:0;transform:translateY(20px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        .card-enter { animation: fadeSlideUp .45s cubic-bezier(.22,.9,.34,1) both; }
        .toast-enter { animation: toastIn .4s cubic-bezier(.22,.9,.34,1) both; }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
        .scrollbar-none::-webkit-scrollbar{display:none}
        .scrollbar-none{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Blur orbs */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative p-5 sm:p-7">
        {/* ═══ SUCCESS TOAST ═══ */}
        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="toast-enter fixed bottom-6 right-6 z-50 bg-stone-900 border border-emerald-500/50 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold max-w-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="flex-1 leading-relaxed">{successMessage}</span>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-stone-400 hover:text-white cursor-pointer shrink-0"
              aria-label="بستن پیام"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ═══ HEADER ═══ */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-stone-200/70">
          <div className="flex items-start gap-3.5 w-full lg:w-auto">
            <AustriaResidentLogo />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[9px] font-black tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Austria Resident Market
                </span>
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  LIVE • آنلاین
                </span>
              </div>
              <h3 className="font-extrabold text-stone-900 text-base sm:text-lg leading-tight flex items-center gap-2 flex-wrap">
                <span>دیوار بی‌واسطه اتریش‌نشین</span>
                <span className="text-lg">🛒</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500 font-semibold mt-1 leading-relaxed">
                بستر تبادل کالا، آپارتمان، هم‌خانه و استخدام در جامعه فارسی‌زبان مقیم{' '}
                <span className="font-mono font-bold text-red-700">اتریش</span> – بدون واسطه، بدون کمیسیون
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAdForm((v) => !v)}
            aria-expanded={showAdForm}
            aria-controls="add-ad-form"
            className="group relative overflow-hidden bg-gradient-to-l from-red-600 via-red-650 to-rose-700 text-white text-xs font-black py-3 px-5 rounded-2xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-l from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700" />
            <PlusCircle className="w-4 h-4 relative" />
            <span className="relative">{showAdForm ? 'بستن فرم' : 'ثبت رایگان آگهی'}</span>
          </button>
        </header>

        {/* ═══ STATS STRIP ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: 'آگهی‌های فعال',
              value: stats.total,
              icon: <Tag className="w-4 h-4" />,
              tint: 'from-red-500/10 to-rose-500/5 border-red-200 text-red-700'
            },
            {
              label: 'بازدید کل',
              value: stats.totalViews.toLocaleString('fa-IR'),
              icon: <Eye className="w-4 h-4" />,
              tint: 'from-indigo-500/10 to-blue-500/5 border-indigo-200 text-indigo-700'
            },
            {
              label: 'پسند کاربران',
              value: stats.totalLikes,
              icon: <ThumbsUp className="w-4 h-4" />,
              tint: 'from-rose-500/10 to-pink-500/5 border-rose-200 text-rose-700'
            },
            {
              label: 'فروشندگان تأییدشده',
              value: stats.verified,
              icon: <BadgeCheck className="w-4 h-4" />,
              tint: 'from-emerald-500/10 to-teal-500/5 border-emerald-200 text-emerald-700'
            }
          ].map((s) => (
            <div
              key={s.label}
              className={`relative bg-gradient-to-br ${s.tint} border rounded-2xl p-3 backdrop-blur-sm overflow-hidden hover:-translate-y-0.5 transition-transform`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={s.tint.split(' ').pop()}>{s.icon}</span>
                <span className="text-[9px] font-black opacity-60">LIVE</span>
              </div>
              <div className="font-black text-lg leading-none text-stone-900">{s.value}</div>
              <div className="text-[10px] font-bold text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ═══ ADD FORM ═══ */}
        {showAdForm && (
          <form
            id="add-ad-form"
            onSubmit={handleAddAd}
            className="card-enter bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-5 mb-6 space-y-4 text-xs font-bold text-stone-700 shadow-inner"
          >
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] bg-gradient-to-l from-red-600 to-rose-600 text-white font-black px-2.5 py-1 rounded-lg">
                ➕ آگهی جدید
              </span>
              <h4 className="font-extrabold text-stone-900 text-sm">
                ثبت مشخصات آگهی روی دیوار اتریش‌نشین
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label htmlFor="ad-title" className="text-[10px] font-black text-stone-600 block mb-1.5">
                  عنوان کالا یا آپارتمان <span className="text-red-500">*</span>
                </label>
                <input
                  id="ad-title"
                  type="text"
                  required
                  value={newAdTitle}
                  onChange={(e) => setNewAdTitle(e.target.value)}
                  placeholder="مثال: قاب کتابخانه IKEA مدل Billy"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>

              <div>
                <label htmlFor="ad-price" className="text-[10px] font-black text-stone-600 block mb-1.5">
                  قیمت (یورو) <span className="text-red-500">*</span>
                </label>
                <input
                  id="ad-price"
                  type="text"
                  required
                  value={newAdPrice}
                  onChange={(e) => setNewAdPrice(e.target.value)}
                  placeholder="۴۵ یا رایگان"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-mono font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>

              <div>
                <label htmlFor="ad-loc" className="text-[10px] font-black text-stone-600 block mb-1.5">
                  شهر یا Bezirk <span className="text-red-500">*</span>
                </label>
                <input
                  id="ad-loc"
                  type="text"
                  required
                  value={newAdLoc}
                  onChange={(e) => setNewAdLoc(e.target.value)}
                  placeholder="وین، منطقه ۱۲"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>

              <div>
                <label htmlFor="ad-cat" className="text-[10px] font-black text-stone-600 block mb-1.5">
                  دسته‌بندی
                </label>
                <select
                  id="ad-cat"
                  value={newAdCat}
                  onChange={(e) => setNewAdCat(e.target.value as AdItem['category'])}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl cursor-pointer text-xs font-bold text-stone-800 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
                >
                  {Object.entries(CATEGORY_META).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.icon} {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label htmlFor="ad-contact" className="text-[10px] font-black text-stone-600 block mb-1.5">
                  اطلاعات تماس یا تلگرام
                </label>
                <input
                  id="ad-contact"
                  type="text"
                  value={newAdDesc}
                  onChange={(e) => setNewAdDesc(e.target.value)}
                  placeholder="مثلاً: آیدی تلگرام @username"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAdForm(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2.5 rounded-xl font-black cursor-pointer text-[11px] transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-gradient-to-l from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white px-5 py-2.5 rounded-xl font-black cursor-pointer text-[11px] shadow-lg shadow-stone-900/20 transition-all active:scale-95"
              >
                انتشار آگهی بی‌واسطه
              </button>
            </div>
          </form>
        )}

        {/* ═══ SEARCH + SORT ═══ */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی سریع در آگهی‌ها، شهر یا فروشنده..."
              className="w-full bg-white border border-stone-200 pr-10 pl-4 py-2.5 rounded-xl text-xs font-bold outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
              aria-label="جستجو در آگهی‌ها"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-black text-stone-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              مرتب‌سازی:
            </span>
            {(
              [
                { k: 'recent', label: 'جدیدترین' },
                { k: 'popular', label: 'محبوب‌ترین' },
                { k: 'cheap', label: 'ارزان‌ترین' }
              ] as const
            ).map((s) => (
              <button
                key={s.k}
                type="button"
                onClick={() => setSortBy(s.k)}
                className={`text-[10px] font-black px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                  sortBy === s.k
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md shadow-stone-900/20'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ═══ CATEGORY TABS ═══ */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none border-b border-stone-100 mb-5">
          {[{ id: 'all', label: 'همه آگهی‌ها', icon: '🌸' }, ...Object.entries(CATEGORY_META).map(([k, v]) => ({ id: k, label: v.label, icon: v.icon }))].map(
            (tb) => (
              <button
                key={tb.id}
                type="button"
                onClick={() => setSelectedWallCat(tb.id)}
                className={`px-3.5 py-2 rounded-xl border text-[10.5px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedWallCat === tb.id
                    ? 'bg-gradient-to-l from-red-600 to-rose-600 border-red-700 text-white shadow-md shadow-red-500/25'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                aria-pressed={selectedWallCat === tb.id}
              >
                <span>{tb.icon}</span>
                <span>{tb.label}</span>
                {tb.id !== 'all' && (
                  <span
                    className={`font-mono text-[9px] rounded px-1 ${
                      selectedWallCat === tb.id ? 'bg-white/20' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {adList.filter((a) => a.category === tb.id).length}
                  </span>
                )}
              </button>
            )
          )}
        </div>

        {/* ═══ ADS GRID ═══ */}
        {filteredAdList.length > 0 ? (
          <div
            itemProp="itemListElement"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredAdList.map((ad, i) => {
              const cat = CATEGORY_META[ad.category];
              return (
                <article
                  key={ad.id}
                  itemScope
                  itemType="https://schema.org/Product"
                  className="card-enter group relative bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-red-300 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {/* Colored top accent */}
                  <div className={`h-1 w-full bg-gradient-to-l ${cat.gradient}`} />

                  {/* Badges ribbon */}
                  <div className="absolute top-3 right-3 z-10 flex gap-1.5 flex-wrap justify-end max-w-[70%]">
                    {ad.urgent && (
                      <span className="text-[8px] font-black bg-gradient-to-l from-red-600 to-rose-600 text-white px-1.5 py-0.5 rounded-md shadow-md flex items-center gap-0.5 animate-pulse">
                        <Flame className="w-2.5 h-2.5" />
                        فوری
                      </span>
                    )}
                    {ad.verified && (
                      <span className="text-[8px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded-md shadow-md flex items-center gap-0.5">
                        <BadgeCheck className="w-2.5 h-2.5" />
                        تأییدشده
                      </span>
                    )}
                  </div>

                  {/* Icon header */}
                  <div
                    className={`relative h-24 flex items-center justify-center bg-gradient-to-br ${cat.gradient} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)]" />
                    <span className="text-5xl drop-shadow-lg relative group-hover:scale-110 transition-transform duration-500">
                      {ad.icon}
                    </span>
                    <span
                      className={`absolute bottom-2 left-2 text-[9px] font-black px-2 py-0.5 rounded-md border ${cat.badge} bg-white/95 backdrop-blur-sm`}
                    >
                      {cat.label}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <h4
                      className="text-xs font-black text-stone-900 leading-relaxed line-clamp-2 mb-2 min-h-[2.5rem]"
                      itemProp="name"
                    >
                      {ad.title}
                    </h4>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 mb-2.5 flex-wrap">
                      <span
                        className="flex items-center gap-1"
                        itemProp="location"
                        itemScope
                        itemType="https://schema.org/Place"
                      >
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span itemProp="name">{ad.location}</span>
                      </span>
                      <span className="h-1 w-1 rounded-full bg-stone-300" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        {ad.date}
                      </span>
                    </div>

                    {/* Seller */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500 mb-2.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-stone-700 to-stone-900 text-white text-[9px] font-black flex items-center justify-center">
                        {ad.seller.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate">{ad.seller}</span>
                      <span className="text-stone-300">•</span>
                      <span className="flex items-center gap-0.5">
                        <Eye className="w-3 h-3 text-stone-400" />
                        {ad.views}
                      </span>
                    </div>

                    {/* Status pill */}
                    <span className="text-[9px] text-stone-600 bg-stone-50 border border-stone-200 text-center font-bold px-2 py-1 rounded-md mb-3">
                      {ad.status}
                    </span>

                    {/* Footer: Price + Like */}
                    <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-2.5">
                      <div className="text-right">
                        <div className="text-[9px] font-black text-stone-400">قیمت</div>
                        <div
                          className="font-mono font-black text-red-700 text-sm leading-tight flex items-baseline gap-0.5"
                          itemProp="offers"
                          itemScope
                          itemType="https://schema.org/Offer"
                        >
                          <span itemProp="price">{ad.price}</span>
                          {/^\d+$/.test(ad.price) && (
                            <span className="text-[10px] opacity-70">€</span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleLikeAd(ad.id)}
                        aria-label={ad.likedByUser ? 'برداشتن پسند' : 'پسندیدن آگهی'}
                        className={`flex items-center gap-1 text-[10px] rounded-lg px-2 py-1.5 font-black transition-all active:scale-90 cursor-pointer border ${
                          ad.likedByUser
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform ${
                            ad.likedByUser ? 'fill-rose-600 stroke-rose-600 scale-110' : ''
                          }`}
                        />
                        <span>{ad.likes}</span>
                      </button>
                    </div>
                  </div>

                  {/* Hover contact CTA */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-l from-stone-900 to-stone-800 text-white text-[10px] font-black flex items-center justify-center gap-1.5 py-2 cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" />
                    تماس با فروشنده
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-10 bg-gradient-to-br from-stone-50 to-white rounded-2xl border border-dashed border-stone-200 text-stone-400 font-bold text-xs leading-relaxed">
            <div className="text-4xl mb-3">🔍</div>
            هیچ آگهی مطابق فیلتر یا جستجوی شما پیدا نشد.
            <br />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedWallCat('all');
              }}
              className="text-red-600 underline mt-2 cursor-pointer font-black"
            >
              پاک کردن فیلترها ←
            </button>
          </div>
        )}

        {/* ═══ PRO TIP BANNER ═══ */}
        <div className="relative mt-6 bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/70 p-4 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-950 font-black leading-relaxed overflow-hidden">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 relative mt-0.5" />
          <div className="relative">
            <strong className="text-amber-900">نکته امنیتی:</strong> هنگام معامله حتماً در مکان عمومی ملاقات کنید، از پرداخت پیش‌پرداخت به افراد ناشناس پرهیز کنید و برای مبالغ بالا از درگاه‌های امن (PayLivery / Käuferschutz) استفاده نمایید. برای اجاره‌نامه، از فرم‌های قانونی
            <span className="font-mono mx-1 text-amber-800">Mietvertrag</span>
            بهره بگیرید.
          </div>
        </div>

        {/* ═══ FOOTER STATS ═══ */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-2 text-[9px] font-bold text-stone-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              Austria Resident Market
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              محیط امن برای فارسی‌زبانان
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-indigo-600" />
              +۱۲٬۰۰۰ کاربر فعال
            </span>
          </div>
          <span className="font-mono">v2.0</span>
        </div>
      </div>

      {/* SEO Footer */}
      <footer className="sr-only">
        <p>
          دیوار بی‌واسطه اتریش‌نشین – خرید و فروش لوازم دست دوم، آپارتمان، هم‌خانه (WG)، خودرو، دوچرخه، لپ‌تاپ و آگهی استخدام در وین، گراتس، لینتس و سالزبورگ. بدون کمیسیون، مستقیم بین فارسی‌زبانان مقیم اتریش.
        </p>
      </footer>
    </section>
  );
}