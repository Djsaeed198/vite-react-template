import React, { useMemo } from "react";
import { motion } from "motion/react";
import {
  Radio,
  Flame,
  Zap,
  Newspaper,
  ChevronLeft,
  Menu,
} from "lucide-react";

export interface NewsItem {
  id?: string;
  title: string;
  category?: string;
  source?: string;
  url?: string;
  timestamp?: string;
}

interface LiveNewsTickerProps {
  austriaNews?: NewsItem[];
  isNewsLoading?: boolean;
  onOpenNews: () => void;
  onOpenMobileMenu?: () => void;
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "به‌روزرسانی قوانین کارت قرمز-سفید-قرمز اتریش (RWR) برای سال جدید",
    category: "اقامت",
    source: "وزارت کار و اقتصاد اتریش",
  },
  {
    title: "تسهیلات جدید بیمه سلامت عمومی اتریش (ÖGK) برای دندان‌پزشکی",
    category: "سلامت",
    source: "ÖGK Wien",
  },
  {
    title: "تمدید مهلت ارسال اظهارنامه مالیات بر درآمد ۲۰۲۴ (Arbeitnehmerveranlagung)",
    category: "مالیات",
    source: "FinanzOnline",
  },
  {
    title: "آغاز نوبت‌دهی آنلاین برای متقاضیان اقامت اداره MA35 در وین",
    category: "MA35",
    source: "Stadt Wien",
  },
  {
    title: "یارانه ویژه مسکن (Wohnbeihilfe) و کنترل سقف نرخ اجاره در اتریش",
    category: "مسکن",
    source: "شورای ملی اتریش",
  },
  {
    title: "تخفیف ویژه کارت سفر سالانه حمل‌ونقل عمومی اتریش (KlimaTicket Ö)",
    category: "حمل‌ونقل",
    source: "BMK اتریش",
  },
];

export default function LiveNewsTicker({
  austriaNews = [],
  isNewsLoading = false,
  onOpenNews,
  onOpenMobileMenu,
}: LiveNewsTickerProps) {
  const displayNews = useMemo(
    () => (austriaNews && austriaNews.length > 0 ? austriaNews : FALLBACK_NEWS),
    [austriaNews]
  );

  return (
    <div
      className="group w-full relative overflow-hidden rounded-xl md:rounded-2xl p-2 px-2.5 sm:px-4 flex items-center justify-between gap-2 sm:gap-3 cursor-pointer shadow-md hover:shadow-lg transition-all border border-stone-800/80"
      style={{
        background: "linear-gradient(90deg, #09090b 0%, #042f2e 50%, #09090b 100%)",
      }}
      onClick={onOpenNews}
      title="کلیک برای مشاهده آرشیو جامع اخبار موثق اتریش"
    >
      {/* Subtle animated gradient glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-amber-500/20 to-transparent blur-2xl" />
        <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-teal-500/20 to-transparent blur-2xl" />
      </div>

      {/* Right accent stripe for RTL */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />
      <div className="absolute top-0 right-0 w-1 h-full bg-amber-500 animate-pulse" />

      {/* 1. Mobile Hamburger Button (On Mobile & Tablet) */}
      {onOpenMobileMenu && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenMobileMenu();
          }}
          className="lg:hidden shrink-0 p-1.5 sm:p-2 bg-stone-900/90 hover:bg-stone-800 text-amber-400 border border-amber-500/30 rounded-lg sm:rounded-xl flex items-center gap-1 text-[11px] font-black transition-all active:scale-95 shadow-xs z-20"
          title="باز کردن منوی همبرگری بخش‌ها"
          aria-label="منوی همبرگری بخش‌ها"
        >
          <Menu className="w-4 h-4" />
          <span className="hidden xs:inline text-[10px] text-white">منو</span>
        </button>
      )}

      {/* 2. Live badge */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative z-10">
        <span className="text-[9px] sm:text-[10px] text-stone-950 font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 shrink-0 flex items-center gap-1 sm:gap-1.5 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-stone-950" />
          </span>
          <span className="hidden xs:inline">پخش زنده</span> اخبار
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-black text-teal-300 bg-teal-900/40 border border-teal-700/50 px-1.5 py-0.5 rounded-full">
          <Radio className="w-2.5 h-2.5 animate-pulse" />
          ۲۴/۷
        </span>
      </div>

      {/* 3. Scrolling news ticker */}
      <div className="flex-1 overflow-hidden relative py-0.5 z-10 min-w-0">
        <div className="whitespace-nowrap animate-marquee-rtl flex items-center gap-8 sm:gap-12 text-teal-100 group-hover:text-amber-200 transition-colors">
          {isNewsLoading && (!austriaNews || austriaNews.length === 0) ? (
            <span className="text-[11px] sm:text-xs font-bold text-teal-200 flex items-center gap-1.5">
              <Zap className="w-3 h-3 animate-pulse text-amber-400" />
              در حال بارگذاری اخبار رسمی وزارتخانه‌ها، AMS و بیمه سلامت اتریش (ÖGK)...
            </span>
          ) : (
            displayNews.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                <span className="text-amber-400 font-black flex items-center gap-1 text-[10px] sm:text-xs bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-500/20">
                  <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
                  [{item.category || "خبر"}]
                </span>
                <span className="font-bold text-stone-100 group-hover:text-amber-100 transition-colors">
                  {item.title}
                </span>
                {item.source && (
                  <span className="text-teal-400 text-[9px] sm:text-[10px] font-mono opacity-90">
                    ({item.source})
                  </span>
                )}
              </span>
            ))
          )}
        </div>
      </div>

      {/* 4. Full Archive CTA */}
      <div className="shrink-0 relative z-10 flex items-center">
        <span className="text-[10px] sm:text-[11px] text-amber-300 font-black flex items-center gap-1 group-hover:gap-1.5 transition-all bg-white/5 hover:bg-white/10 px-2 sm:px-2.5 py-1 rounded-lg border border-white/10">
          <Newspaper className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="hidden md:inline">آرشیو اخبار</span>
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}
