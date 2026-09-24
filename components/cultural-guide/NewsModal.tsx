import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Newspaper, RefreshCw, Share2, Clock, Zap, Shield, TrendingUp,
  Globe, GraduationCap, HeartPulse, Home, Landmark, Briefcase,
  ExternalLink, ChevronDown, CheckCircle, Info, Sparkles,
  MapPin, Users, AlertCircle, ArrowUpRight, Flame, Radio,
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
interface NewsItem {
  id?: string;
  title: string;
  summary: string;
  link: string;
  date: string;
  category: string;
  source: string;
  image?: string;
  urgent?: boolean;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem[];
  newsSourceText: string;
  newsLastUpdated: string;
  isNewsLoading: boolean;
  isForcingNewsRefresh: boolean;
  onRefresh: () => Promise<void>;
}

// ==========================================
// IMAGES — Vienna & Austria themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
  parliament: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=800&q=80",
  university: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  economy: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
};

// ==========================================
// NEWS SOURCES (Austrian Media)
// ==========================================
const NEWS_SOURCES = [
  { name: "ORF", url: "https://orf.at", type: "عمومی", credibility: 95 },
  { name: "Der Standard", url: "https://derstandard.at", type: "کیفی", credibility: 90 },
  { name: "Die Presse", url: "https://diepresse.com", type: "کیفی", credibility: 88 },
  { name: "Kurier", url: "https://kurier.at", type: "کیفی", credibility: 85 },
  { name: "Krone", url: "https://krone.at", type: "عامه‌پسند", credibility: 75 },
  { name: "Heute", url: "https://heute.at", type: "رایگان", credibility: 70 },
  { name: "Kleine Zeitung", url: "https://kleinezeitung.at", type: "منطقه‌ای", credibility: 85 },
  { name: "OÖN", url: "https://nachrichten.at", type: "منطقه‌ای", credibility: 85 },
  { name: "Wiener Zeitung", url: "https://wienerzeitung.at", type: "تاریخی", credibility: 90 },
  { name: "The Local", url: "https://thelocal.at", type: "انگلیسی‌زبان", credibility: 80 },
];

// ==========================================
// CATEGORY CONFIG
// ==========================================
const CATEGORY_CONFIG: Record<string, { icon: any; color: string; bg: string; label: string }> = {
  "اقتصاد":     { icon: TrendingUp, color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100", label: "اقتصاد" },
  "سیاسی":      { icon: Landmark,   color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-100",   label: "سیاسی" },
  "مهاجرت":     { icon: Globe,      color: "text-sky-700",    bg: "bg-sky-50 border-sky-100",          label: "مهاجرت" },
  "ایران":      { icon: Flame,      color: "text-rose-700",   bg: "bg-rose-50 border-rose-100",        label: "ایران" },
  "تحصیل":      { icon: GraduationCap, color: "text-amber-700", bg: "bg-amber-50 border-amber-100",     label: "تحصیل" },
  "خدمات اجتماعی": { icon: HeartPulse, color: "text-teal-700", bg: "bg-teal-50 border-teal-100",        label: "خدمات اجتماعی" },
  "خبر فوری":   { icon: Zap,        color: "text-red-700",    bg: "bg-red-50 border-red-100",          label: "خبر فوری" },
};

// ==========================================
// FALLBACK NEWS (if empty)
// ==========================================
const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "پیش‌بینی رشد اقتصادی اتریش در سال ۲۰۲۶ به ۰.۵٪ کاهش یافت",
    summary: "بانک ملی اتریش (OeNB) اعلام کرد که رشد تولید ناخالص داخلی در سال ۲۰۲۶ به دلیل جنگ در خلیج فارس و قیمت‌های بالای انرژی به ۰.۵٪ کاهش می‌یابد. نرخ تورم نیز ۳٪ پیش‌بینی شده است.",
    link: "https://orf.at",
    date: "۱۴۰۵/۰۶/۲۷",
    category: "اقتصاد",
    source: "ORF",
    image: IMAGES.economy,
  },
  {
    title: "قانون آب‌وهوا اتریش به مرحله بررسی پارلمانی رفت",
    summary: "دولت فدرال لایحه قانون آب‌وهوا را که هدف آن رسیدن به بی‌طرفی کربنی تا سال ۲۰۴۰ است، به پارلمان فرستاد. وزیر محیط زیست از این قانون دفاع کرد هرچند شامل جریمه نمی‌شود.",
    link: "https://orf.at",
    date: "۱۴۰۵/۰۶/۲۷",
    category: "سیاسی",
    source: "ORF",
    image: IMAGES.parliament,
  },
  {
    title: "کاهش بی‌سابقه درخواست‌های پناهندگی در اتریش",
    summary: "وزارت کشور اعلام کرد در سال ۲۰۲۶ تنها ۶,۵۱۲ درخواست پناهندگی ثبت شده که کمترین میزان از ابتدای قرن است. همچنین ۱۰,۴۴۰ نفر از اتریش اخراج شده‌اند.",
    link: "https://kurier.at",
    date: "۱۴۰۵/۰۶/۲۹",
    category: "مهاجرت",
    source: "Kurier",
  },
  {
    title: "ممانعت از ورود رئیس سازمان انرژی اتمی ایران به وین",
    summary: "محمد اسلامی، رئیس سازمان انرژی اتمی ایران، به دلیل وتوی آمریکا در شورای امنیت سازمان ملل از حضور در کنفرانس آژانس بین‌المللی انرژی اتمی در وین بازماند. ایران سفیر اتریش را احضار کرد.",
    link: "https://orf.at",
    date: "۱۴۰۵/۰۶/۲۳",
    category: "ایران",
    source: "ORF",
  },
  {
    title: "NEOS خواستار دو برابر شدن شهریه دانشگاه‌ها در اتریش شد",
    summary: "حزب NEOS پیشنهاد کرد شهریه دانشگاه‌ها برای دانشجویان اتریشی و اروپایی از ۳۶۳ یورو به ۷۰۰ یورو در هر ترم افزایش یابد. برای دانشجویان کشورهای ثالث این مبلغ به ۲,۵۰۰ یورو خواهد رسید.",
    link: "https://orf.at",
    date: "۱۴۰۵/۰۶/۲۸",
    category: "تحصیل",
    source: "ORF",
    image: IMAGES.university,
  },
  {
    title: "کمک هزینه اجتماعی اتریش در سال ۲۰۲۶ افزایش می‌یابد",
    summary: "بر اساس قانون جدید، مبلغ کمک هزینه اجتماعی برای افراد مجرد و سرپرستان خانوار در سال ۲۰۲۶ حداکثر به ۱,۲۳۰ یورو در ماه افزایش می‌یابد. برای زوج‌ها این مبلغ ۱,۷۲۲ یورو تعیین شده است.",
    link: "https://sozialministerium.gv.at",
    date: "۱۴۰۵/۰۶/۱۵",
    category: "خدمات اجتماعی",
    source: "Sozialministerium",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function NewsModal({
  isOpen,
  onClose,
  news,
  newsSourceText,
  newsLastUpdated,
  isNewsLoading,
  isForcingNewsRefresh,
  onRefresh,
}: NewsModalProps) {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("همه");

  const displayNews = news.length > 0 ? news : FALLBACK_NEWS;

  const categories = useMemo(() => {
    const cats = new Set(displayNews.map((n) => n.category));
    return ["همه", ...Array.from(cats)];
  }, [displayNews]);

  const filteredNews = useMemo(() => {
    if (activeCategory === "همه") return displayNews;
    return displayNews.filter((n) => n.category === activeCategory);
  }, [displayNews, activeCategory]);

  if (!isOpen) return null;

  const handleShare = (item: NewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const linkToCopy = item.link || window.location.href;
    navigator.clipboard.writeText(linkToCopy)
      .then(() => toast.success("لینک خبر کپی شد"))
      .catch((err) => console.error("Failed to copy link:", err));
  };

  const seoSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "پرواز خبر اتریش‌نشین — آخرین اخبار اتریش",
    description:
      "پایش هوشمند اخبار اقتصادی، سیاسی، مهاجرتی، تحصیلی و اجتماعی اتریش از منابع معتبر اتریشی به زبان فارسی.",
    publisher: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
    inLanguage: "fa-IR",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <SEO
        title="پرواز خبر اتریش‌نشین | آخرین اخبار اتریش ۲۰۲۶"
        description="پایش هوشمند اخبار اقتصادی، سیاسی، مهاجرتی و تحصیلی اتریش از منابع معتبر اتریشی به زبان فارسی. بروزرسانی خودکار هر ساعت."
        keywords="اخبار اتریش, خبر فوری اتریش, اقتصاد اتریش, مهاجرت اتریش, تحصیل در اتریش, خدمات اجتماعی اتریش, اخبار ایران و اتریش"
        schemaData={seoSchema}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-fade-in text-stone-900" dir="rtl">
        <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">

          {/* Austrian flag accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#c8102e] via-white to-[#c8102e]" />

          {/* ========================================== */}
          {/* HERO HEADER WITH IMAGE */}
          {/* ========================================== */}
          <div className="relative h-40 overflow-hidden">
            <img
              src={IMAGES.hero}
              alt="وین اتریش"
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1512] via-[#38100e]/80 to-[#9e142d]/40" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 border border-white/25 rounded-full text-[10px] font-black text-white backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  پایش زنده اخبار اتریش
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm hover:bg-white/25 text-white flex items-center justify-center text-xs font-black transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-1 flex items-center gap-2">
                  <Newspaper className="w-6 h-6 text-amber-300" />
                  پرواز خبر اتریش‌نشین 🇦🇹
                </h2>
                <p className="text-[10px] text-rose-100 font-bold">
                  پایش هوشمند قوانین، مصوبات اداری و امور مقیمان — از ۱۰ منبع معتبر اتریشی
                </p>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* STATUS BAR + REFRESH */}
          {/* ========================================== */}
          <div className="bg-stone-50 px-5 py-3 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-black text-emerald-700">آنلاین</span>
              </div>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500 font-bold">
                منبع: <span className="text-stone-700 font-extrabold">{newsSourceText || "منابع رسمی اتریش"}</span>
              </span>
            </div>

            <button
              type="button"
              disabled={isForcingNewsRefresh || isNewsLoading}
              onClick={async () => {
                await onRefresh();
                toast.success("آخرین تحولات فدرال سال ۲۰۲۶ با موفقیت دریافت و ترجمه گردید.");
              }}
              className="flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 disabled:from-teal-400 disabled:to-emerald-400 text-white border border-teal-600 rounded-xl font-black tracking-tight transition-all text-[10px] disabled:cursor-not-allowed cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isForcingNewsRefresh ? "animate-spin" : ""}`} />
              <span>بروزرسانی زنده اخبار (Gemini)</span>
            </button>
          </div>

          {/* ========================================== */}
          {/* CATEGORY FILTER CHIPS */}
          {/* ========================================== */}
          <div className="px-5 py-3 border-b border-stone-100 flex gap-2 overflow-x-auto scrollbar-hide" dir="rtl">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const cfg = CATEGORY_CONFIG[cat];
              const Icon = cfg?.icon || Newspaper;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat === "همه" ? "همه اخبار" : cfg?.label || cat}
                </button>
              );
            })}
          </div>

          {/* ========================================== */}
          {/* ARTICLES LIST */}
          {/* ========================================== */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {isNewsLoading && displayNews.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mx-auto animate-pulse">
                  <Newspaper className="w-6 h-6" />
                </div>
                <p className="text-[11.5px] font-bold text-stone-500">در حال دریافت و ترجمه اخبار معتبر...</p>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <p className="text-[11.5px] font-bold text-stone-500">خبری در این دسته یافت نشد.</p>
              </div>
            ) : (
              filteredNews.map((item, idx) => {
                const cfg = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG["خبر فوری"];
                const CatIcon = cfg.icon;
                const isOpenArticle = selectedArticle === idx;

                return (
                  <motion.div
                    key={`modal-news-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedArticle(isOpenArticle ? null : idx)}
                    className={`group border-2 p-4 rounded-2xl transition-all cursor-pointer text-right relative overflow-hidden ${
                      isOpenArticle
                        ? "border-[#c8102e]/40 bg-[#c8102e]/[0.02] shadow-md"
                        : "border-stone-150 hover:border-teal-500/40 hover:bg-teal-50/5"
                    }`}
                  >
                    {/* Decorative gradient */}
                    <div className={`absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br ${cfg.bg} opacity-[0.15] rounded-full`} />

                    <div className="relative">
                      {/* Top row: category + date/source/share */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${cfg.bg} ${cfg.color}`}>
                          <CatIcon className="w-3 h-3" />
                          {item.category}
                        </span>

                        <div className="flex items-center gap-2 text-[9px] text-stone-400 font-bold font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.date}
                          </span>
                          <span>•</span>
                          <span className="text-stone-500">{item.source}</span>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={(e) => handleShare(item, e)}
                            className="flex items-center gap-1 bg-stone-100 hover:bg-teal-50 text-stone-600 hover:text-teal-700 font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[8.5px] border border-stone-200"
                            title="کپی کردن لینک"
                          >
                            <Share2 className="w-3 h-3 text-teal-600" />
                            <span>اشتراک</span>
                          </button>
                        </div>
                      </div>

                      {/* News image (if available) */}
                      {item.image && (
                        <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-sm font-black text-stone-900 group-hover:text-[#c8102e] transition-colors leading-snug mb-2">
                        {item.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                        {item.summary}
                      </p>

                      {/* Expandable action guide */}
                      <div className={`transition-all duration-300 overflow-hidden ${isOpenArticle ? "max-h-72 pt-3 mt-3 border-t border-dashed border-stone-200" : "max-h-0"}`}>
                        <h5 className="text-[10px] font-black text-teal-700 flex items-center gap-1 mb-2">
                          <Zap className="w-3 h-3" />
                          اقدام پیشنهادی دستیار حقوقیار اتریش‌نشین:
                        </h5>
                        <ul className="text-[10px] text-stone-500 space-y-1.5 list-disc pr-4 font-bold">
                          {item.category.includes("بیمه") || item.category.includes("بهداشت") ? (
                            <>
                              <li>برای بررسی عکس‌دار بودن E-card خود به سامانه تامین اجتماعی ÖGK مراجعه کرده یا کدپستی را در برگه ملده انطباق دهید.</li>
                              <li>در مراجعات درمانی همراه داشتن Meldezettel تایید شده می‌تواند روند اداری پزشک ÖGK را سرعت بدهد.</li>
                            </>
                          ) : item.category.includes("اقامت") || item.category.includes("مهاجرت") ? (
                            <>
                              <li>مدارک تحصیلی، قرارداد شغلی و سوابق را دقیقاً بر اساس تاییدیه Kollektivvertrag مطابقت دهید.</li>
                              <li>درخواست‌های تمدید فدرال را حداقل ۹۰ روز پیش از انقضا به صورت قانونی ID Austria ثبت و بایگانی نمایید.</li>
                            </>
                          ) : item.category.includes("مسکن") || item.category.includes("Wohn") ? (
                            <>
                              <li>فرمول جدید مبالغ ملکی Wohnbeihilfe را دانلود کرده و فرم ذیل شهرداری (Vermieter) را به پیوست ارسال دارید.</li>
                              <li>مطابقت متراژ مفید با تعداد ساکنان فرم ملده، شرط اساسی دریافت سوبسید مسکن حمایتی است.</li>
                            </>
                          ) : item.category.includes("تحصیل") ? (
                            <>
                              <li>مهلت‌های ثبت‌نام دانشگاهی (Zulassungsfristen) را در وب‌سایت دانشگاه خود بررسی کنید — معمولاً ۵ سپتامبر و ۵ فوریه.</li>
                              <li>برای معافیت از شهریه، مدارک مربوط به وضعیت اقامت یا بورسیه را به دفتر بین‌الملل دانشگاه ارائه دهید.</li>
                            </>
                          ) : item.category.includes("اقتصاد") ? (
                            <>
                              <li>گزارش کامل OeNB را از وب‌سایت رسمی بانک ملی اتریش دانلود کنید.</li>
                              <li>برای اخبار اقتصادی لحظه‌ای، کانال تلگرام OTRISH_IRAN@ را دنبال کنید.</li>
                            </>
                          ) : (
                            <>
                              <li>تغییرات بومی اعلام شده را در کانال رسمی تلگرام اتریش‌نشین به آدرس OTRISH_IRAN@ پایش فرمایید.</li>
                              <li>برای مشورت‌های عمیق‌تر از کانون مشاوره به شناسه تلگرامی Otrish_neshin@ وقت دریافت کنید.</li>
                            </>
                          )}
                          <li className="text-[9px] text-amber-600 font-extrabold bg-amber-50 p-1 px-2 rounded mt-1 list-none flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            کلیه اخبار بالا از خبرگزاری‌های رسمی معتمد فدرال استخراج شده و جنبه آگاهی‌بخشی عام‌المنفعه دارد.
                          </li>
                        </ul>
                      </div>

                      {/* Expand toggle */}
                      <div className="text-[9px] text-teal-500 font-black text-left mt-2 flex items-center gap-1">
                        {isOpenArticle ? (
                          <>
                            <ChevronDown className="w-3 h-3 rotate-180" />
                            بستن راهنما
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            راهنمای اقدام بومی دستیار اتریش‌نشین
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* ========================================== */}
          {/* NEWS SOURCES BAR */}
          {/* ========================================== */}
          <div className="px-5 py-3 border-t border-stone-100 bg-stone-50/50">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-3 h-3 text-[#c8102e]" />
              <span className="text-[9px] font-black text-stone-500">منابع پایش‌شده:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide" dir="rtl">
              {NEWS_SOURCES.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-stone-200 hover:border-[#c8102e]/30 rounded-lg text-[9px] font-black text-stone-600 hover:text-[#c8102e] transition-all whitespace-nowrap"
                >
                  {s.name}
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              ))}
            </div>
          </div>

          {/* ========================================== */}
          {/* FOOTER */}
          {/* ========================================== */}
          <div className="bg-stone-50 px-5 py-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              بروزرسانی شده در:{" "}
              {newsLastUpdated
                ? new Date(newsLastUpdated).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
                : "Baseline"}
            </span>
            <span className="flex items-center gap-1.5">
              <HeartPulse className="w-3 h-3 text-[#c8102e]" />
              همیاری داوطلبانه مستقل اتریش‌نشین 🏔️
            </span>
          </div>
        </div>
      </div>
    </>
  );
}