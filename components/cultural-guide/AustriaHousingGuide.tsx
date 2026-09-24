import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2, Home, Landmark, GraduationCap, ShieldCheck,
  FileCheck2, CheckCircle2, AlertTriangle, Coins, TrendingUp,
  MapPin, Sparkles, PhoneCall, ExternalLink, ArrowRight,
  BookOpen, KeyRound, Award, HelpCircle, ChevronDown, Copy,
  Check, Info, FileSpreadsheet, Scale, Users2, Shield, HeartHandshake
} from "lucide-react";
import { toast } from "../utils/toast";

// Curated high-resolution images for Austria Housing guide
const GUIDE_IMAGES = {
  viennaArchitecture: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80", // Historic architecture & cityscape
  studentDorm: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80", // Modern dorm room & study desk
  keysContract: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80", // Keys, house model & official signing
};

// Data sets
const STATE_PRICES = [
  { state: "وین (Wien)", price: "۲۲.۴۱", rank: "بالاترین تقاضا", flag: "🏛️", color: "from-rose-500/20 to-red-500/10 text-rose-700" },
  { state: "سالزبورگ (Salzburg)", price: "۲۱.۲۳", rank: "بسیار محبوب", flag: "🏰", color: "from-amber-500/20 to-yellow-500/10 text-amber-700" },
  { state: "تیرول (Tirol)", price: "۲۱.۱۳", rank: "گردشگری و کوهستانی", flag: "🏔️", color: "from-emerald-500/20 to-teal-500/10 text-emerald-700" },
  { state: "فورآرلبرگ (Vorarlberg)", price: "~۱۹.۰۰", rank: "مرز سوئیس", flag: "🌲", color: "from-blue-500/20 to-sky-500/10 text-blue-700" },
  { state: "کرنتن (Kärnten)", price: "۱۵.۱۳", rank: "دریاچه‌ها و معتدل", flag: "🌊", color: "from-cyan-500/20 to-teal-500/10 text-cyan-700" },
  { state: "اشتایرمارک (Steiermark)", price: "۱۳.۸۵", rank: "دانشجویی (گراتس)", flag: "🍇", color: "from-indigo-500/20 to-purple-500/10 text-indigo-700" },
  { state: "اوبراسترایش (Oberösterreich)", price: "۱۳.۲۹", rank: "قطب صنعتی (لینتس)", flag: "⚙️", color: "from-violet-500/20 to-pink-500/10 text-violet-700" },
  { state: "نیدراسترایش (Niederösterreich)", price: "۱۲.۹۸", rank: "اطراف وین و آرام", flag: "🌾", color: "from-orange-500/20 to-amber-500/10 text-orange-700" },
  { state: "بورگنلاند (Burgenland)", price: "۱۱.۷۲", rank: "مقرون‌به‌صرفه‌ترین", flag: "🍷", color: "from-stone-500/20 to-stone-500/10 text-stone-700" },
];

const CITY_PRICES = [
  { city: "وین (Wien)", oneBedCenter: "۹۰۰ – ۱,۲۰۰", oneBedOuter: "۷۰۰ – ۹۵۰", threeBedCenter: "۱,۷۰۰ – ۲,۴۰۰", note: "هاب مرکزی مهاجرت و کار" },
  { city: "سالزبورگ (Salzburg)", oneBedCenter: "۸۵۰ – ۱,۱۵۰", oneBedOuter: "۷۰۰ – ۹۰۰", threeBedCenter: "۱,۶۰۰ – ۲,۲۰۰", note: "فرهنگی و تاریخی" },
  { city: "اینسبروک (Innsbruck)", oneBedCenter: "۸۵۰ – ۱,۱۰۰", oneBedOuter: "۷۰۰ – ۹۰۰", threeBedCenter: "۱,۶۰۰ – ۲,۱۰۰", note: "مرکز آلپ و تیرول" },
  { city: "گراتس (Graz)", oneBedCenter: "۷۰۰ – ۹۵۰", oneBedOuter: "۵۵۰ – ۷۵۰", threeBedCenter: "۱,۳۰۰ – ۱,۸۰۰", note: "بزرگترین شهر دانشجویی" },
  { city: "لینتس (Linz)", oneBedCenter: "۶۵۰ – ۹۰۰", oneBedOuter: "۵۲۰ – ۷۰۰", threeBedCenter: "۱,۲۰۰ – ۱,۷۰۰", note: "صنعتی، فناوری و دانوب" },
];

const RICHTWERT_PRICES = [
  { state: "وین (Wien)", rate: "۶.۷۴ €" },
  { state: "بورگنلاند", rate: "۶.۱۵ €" },
  { state: "کرنتن", rate: "۷.۸۹ €" },
  { state: "نیدراسترایش", rate: "۶.۹۲ €" },
  { state: "اوبراسترایش", rate: "۷.۳۰ €" },
  { state: "سالزبورگ", rate: "۹.۳۱ €" },
  { state: "اشتایرمارک", rate: "۹.۳۰ €" },
  { state: "تیرول", rate: "۸.۲۲ €" },
  { state: "فورآرلبرگ", rate: "۱۰.۳۵ €" },
];

const STUDENT_DORMS = [
  {
    name: "Home4students",
    badge: "بزرگترین شبکه خوابگاهی",
    cities: "وین، گراتس، لئوبن، اینسبروک، سالزبورگ",
    priceFrom: "۳۶۹ € / ماه",
    features: "اینترنت پرسرعت، نظافت، سالن بدنسازی، اتاق موسیقی، بدون نیاز به ضامن بانکی اتریشی",
    url: "https://www.home4students.at",
  },
  {
    name: "STUWO Student Housing",
    badge: "محبوب و فول‌امکانات",
    cities: "وین، گراتس، لینتس، فیلاخ، کرمس، کلاگن‌فورت",
    priceFrom: "۴۳۶ € / ماه",
    features: "قرارداد All-inclusive واقعی، سونا و جکوزی در برخی واحدها، پارکینگ دوچرخه، ثبت‌نام آنلاین آسان",
    url: "https://www.stuwo.at",
  },
  {
    name: "Akademikerhilfe",
    badge: "بیش از ۴۰ مجتمع اقامتی",
    cities: "سراسر اتریش (اینسبروک تا وین)",
    priceFrom: "۳۵۰ – ۵۲۰ € / ماه",
    features: "پوشش سراسری ایالت‌ها، محیط‌های چندفرهنگی و دانشجویی آرام، قیمت همه‌شمول",
    url: "https://www.akademikerhilfe.at",
  },
  {
    name: "ÖJAB (اتریش جوان)",
    badge: "قدمت بالا و قیمت رقابتی",
    cities: "وین، گراتس، لینتس، زالتسبورگ و باد گلاینکن‌برگ",
    priceFrom: "۳۱۰ – ۴۸۰ € / ماه",
    features: "فضاهای مشترک پویا، رویدادهای اجتماعی دانشجویی، امکان رزرو برای متقاضیان ایرانی",
    url: "https://www.oejab.at",
  },
  {
    name: "STUWO StudentCity Graz",
    badge: "ویژه دانشجویان گراتس",
    cities: "گراتس (اشتایرمارک)",
    priceFrom: "۳۹۰ € / ماه",
    features: "نزدیک به دانشگاه کارل فرانتس و TU Graz، اتاق‌های مجزا با سرویس اختصاصی",
    url: "https://www.stuwo.at/studentenheime/graz/",
  },
];

interface AustriaHousingGuideProps {
  onOpenConsultation?: (topic?: string) => void;
}

export default function AustriaHousingGuide({ onOpenConsultation }: AustriaHousingGuideProps) {
  const [activeTab, setActiveTab] = useState<"prices" | "dorms" | "buy" | "embassy" | "checklist">("prices");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    toast.success("لینک در حافظه کپی شد!");
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleWhatsAppInquiry = (topicText: string) => {
    const message = encodeURIComponent(
      `سلام و درود، من مقاله جامع راهنمای مسکن اتریش ۲۰۲۶ را در اتریش‌نشین مطالعه کردم و در خصوص «${topicText}» و مدارک مسکن/سفارت نیاز به راهنمایی دارم.`
    );
    window.open(`https://wa.me/436889763256?text=${message}`, "_blank");
  };

  return (
    <article
      className="w-full bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-right select-text"
      dir="rtl"
      id="austria-housing-comprehensive-guide-2026"
      itemScope
      itemType="https://schema.org/Article"
    >
      {/* Hidden Rich Snippet Metadata for Search Engines & AI Crawlers */}
      <meta itemProp="headline" content="راهنمای جامع مسکن در اتریش ۲۰۲۶: قیمت‌ها، خوابگاه‌ها، خرید ملک و نقش اتریش‌نشین‌ها" />
      <meta itemProp="description" content="تحلیل کامل بازار اجاره مسکن در ۹ ایالت اتریش، لیست خوابگاه‌های دانشجویی، قوانین Grundverkehr برای ایرانیان و نحوه ارائه تعهدنامه مسکن به سفارت." />
      <meta itemProp="inLanguage" content="fa-IR" />
      <meta itemProp="datePublished" content="2026-01-15" />
      <meta itemProp="dateModified" content="2026-09-24" />

      {/* ========================================== */}
      {/* 1. HERO SECTION WITH IMAGE & SEO HOOK */}
      {/* ========================================== */}
      <div className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-[#700d1c] text-white p-6 sm:p-8 md:p-12">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={GUIDE_IMAGES.viennaArchitecture}
            alt="معماری و مسکن در وین اتریش"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600/90 text-white rounded-full text-xs font-black tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              مرجع رسمی ۲۰۲۶
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 text-stone-200 border border-white/15 rounded-full text-[11px] font-bold">
              <Building2 className="w-3 h-3 text-amber-300" />
              تحلیل ایمواسکات ۲۴ و شهرداری وین
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              قوانین Grundverkehr & MRG
            </span>
          </div>

          <h1
            itemProp="name"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            راهنمای جامع مسکن در اتریش: قیمت‌ها، خوابگاه‌ها، خرید ملک و نقش اتریش‌نشین‌ها
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            اتریش به عنوان یکی از کشورهای اروپای مرکزی با کیفیت زندگی بالا، سالانه پذیرای هزاران دانشجو، کارمند و مهاجر از سراسر جهان از جمله ایران است. یکی از مهم‌ترین دغدغه‌های هر تازه‌وارد، یافتن مسکن مناسب و آگاهی از قوانین مربوط به اجاره یا خرید ملک است. این راهنما تصویری جامع و به‌روز از وضعیت مسکن در اتریش، از قیمت اجاره در ۹ ایالت تا لیست خوابگاه‌های دانشجویی، قوانین خرید ملک برای اتباع ایرانی و نحوه ارائه تعهدنامه مسکن به سفارت ارائه می‌دهد.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-[11px] text-stone-300 font-bold">میانگین کل اتریش</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono mt-0.5" dir="ltr">€ 16.00 /m²</div>
              <div className="text-[10px] text-emerald-300 font-bold mt-0.5">۸٪+ رشد سالانه ۲۰۲۶</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-[11px] text-stone-300 font-bold">گران‌ترین ایالت</div>
              <div className="text-xl sm:text-2xl font-black text-rose-300 font-mono mt-0.5" dir="ltr">€ 22.41 /m²</div>
              <div className="text-[10px] text-stone-300 font-bold mt-0.5">وین (Wien)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-[11px] text-stone-300 font-bold">شروع خوابگاه دانشجویی</div>
              <div className="text-xl sm:text-2xl font-black text-sky-300 font-mono mt-0.5" dir="ltr">€ 300 /ماه</div>
              <div className="text-[10px] text-stone-300 font-bold mt-0.5">قیمت همه‌شمول (All-inclusive)</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
              <div className="text-[11px] text-stone-300 font-bold">مهلت ثبت Meldezettel</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono mt-0.5" dir="ltr">۳ روز کاری</div>
              <div className="text-[10px] text-stone-300 font-bold mt-0.5">الزامی برای اقامت قانونی</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. DYNAMIC TABBED NAVIGATION */}
      {/* ========================================== */}
      <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("prices")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "prices"
                ? "bg-[#c8102e] text-white shadow-md shadow-red-900/20 scale-102"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>۱. قیمت اجاره در ۹ ایالت</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dorms")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "dorms"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20 scale-102"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>۲. خوابگاه‌های دانشجویی</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("buy")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "buy"
                ? "bg-amber-600 text-white shadow-md shadow-amber-900/20 scale-102"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>۳. خرید ملک اتباع ایرانی</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("embassy")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "embassy"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20 scale-102"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>۴. نقش اتریش‌نشین‌ها و سفارت</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("checklist")}
            className={`px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === "checklist"
                ? "bg-stone-800 text-white shadow-md scale-102"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>۵. جمع‌بندی و نکات عملی</span>
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* 3. TAB CONTENT BLOCKS */}
      {/* ========================================== */}
      <div className="p-4 sm:p-6 md:p-8 space-y-8">

        {/* TAB 1: RENT PRICES */}
        {activeTab === "prices" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#c8102e] rounded-full text-xs font-black">
                <Coins className="w-3.5 h-3.5" />
                تحلیل جامع بازار اجاره ۲۰۲۶
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ۱. قیمت اجاره مسکن در ایالت‌های مختلف اتریش
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                بازار اجاره مسکن در اتریش در سال ۲۰۲۶ با افزایش قیمت همراه بوده است. بر اساس تحلیل داده‌های معتبر سامانه ImmoScout24، میانگین اجاره‌بهای پیشنهادی در سراسر اتریش حدود <strong>۱۶ یورو در هر متر مربع</strong> است که نسبت به سال گذشته حدود ۸ درصد افزایش نشان می‌دهد.
              </p>
            </div>

            {/* Visual Callout Graphic Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#c8102e] font-black text-sm mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>روند قیمت‌گذاری و تفاوت چشمگیر پایتخت با شرق اتریش</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-bold">
                    وین، سالزبورگ و تیرول به ترتیب با ۲۲.۴۱، ۲۱.۲۳ و ۲۱.۱۳ یورو به ازای هر متر مربع در صدر جدول گران‌ترین مناطق اجاره‌ای اتریش قرار دارند. در نقطه مقابل، ایالت بورگنلاند و نیدراسترایش اقتصادی‌ترین گزینه‌ها را ارائه می‌دهند.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-red-200/50 flex items-center justify-between text-xs font-black text-stone-600">
                  <span>منبع پایش: ImmoScout24 Index 2026</span>
                  <span className="text-[#c8102e]">به‌روزرسانی: تابستان ۲۰۲۶</span>
                </div>
              </div>

              <div className="bg-stone-900 text-white rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -bottom-6 -left-6 text-stone-800 opacity-20 pointer-events-none">
                  <Building2 className="w-32 h-32" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-300 font-bold px-2 py-0.5 rounded-md bg-amber-400/20">هشدار هزینه‌ها</span>
                  <h3 className="text-sm font-black mt-2 text-white">هزینه‌های جانبی (Betriebskosten)</h3>
                  <p className="text-[11px] text-stone-300 mt-1 leading-normal">
                    آب، گرمایش، شارژ ساختمان، آسانسور و اینترنت ماهانه معمولاً €۱.۵ تا €۳ در هر متر مربع به اجاره پایه افزوده می‌شوند.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleWhatsAppInquiry("محاسبه شارژ و هزینه‌های Betriebskosten مسکن")}
                  className="mt-3 w-full py-2 bg-[#c8102e] hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  مشاوره بررسی اجاره‌نامه
                </button>
              </div>
            </div>

            {/* Table 1.1: State Prices */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c8102e]" />
                  <span>۱.۱. قیمت اجاره به تفکیک ایالت (میانگین پیشنهادی هر متر مربع)</span>
                </h3>
                <span className="text-xs text-stone-500 font-bold">۹ ایالت فدرال</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-stone-100 text-stone-700 border-b border-stone-200 font-black">
                    <tr>
                      <th className="p-3 sm:p-4">ایالت فدرال</th>
                      <th className="p-3 sm:p-4 text-center">قیمت هر متر مربع (یورو)</th>
                      <th className="p-3 sm:p-4">شاخص و وضعیت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                    {STATE_PRICES.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-3 sm:p-4 font-black text-stone-900 flex items-center gap-2">
                          <span className="text-base">{item.flag}</span>
                          <span>{item.state}</span>
                        </td>
                        <td className="p-3 sm:p-4 text-center font-mono font-black text-stone-950 text-sm sm:text-base">
                          € {item.price}
                        </td>
                        <td className="p-3 sm:p-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${item.color}`}>
                            {item.rank}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 1.2: Major Cities Monthly Rent */}
            <div className="space-y-3 pt-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>۱.۲. قیمت اجاره در شهرهای بزرگ اتریش (اجاره ماهانه یورو)</span>
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-indigo-50/70 text-indigo-950 border-b border-indigo-100 font-black">
                    <tr>
                      <th className="p-3 sm:p-4">شهر</th>
                      <th className="p-3 sm:p-4 text-center">آپارتمان ۱ خوابه (مرکز)</th>
                      <th className="p-3 sm:p-4 text-center">آپارتمان ۱ خوابه (حاشیه)</th>
                      <th className="p-3 sm:p-4 text-center">آپارتمان ۳ خوابه (مرکز)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                    {CITY_PRICES.map((c, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-3 sm:p-4 font-black text-stone-900">{c.city}</td>
                        <td className="p-3 sm:p-4 text-center font-mono text-stone-800">{c.oneBedCenter} €</td>
                        <td className="p-3 sm:p-4 text-center font-mono text-stone-800">{c.oneBedOuter} €</td>
                        <td className="p-3 sm:p-4 text-center font-mono font-black text-indigo-900">{c.threeBedCenter} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Note & Richtwertmiete */}
            <div className="bg-amber-50/80 border-r-4 border-amber-500 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-amber-950 space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>نکته بسیار مهم در خصوص ودیعه (Kaution) و کمیسیون</span>
              </div>
              <p className="leading-relaxed">
                علاوه بر اجاره پایه، هزینه‌های جانبی (Betriebskosten) مانند آب، گرمایش، شارژ ساختمان و اینترنت معمولاً جداگانه محاسبه می‌شوند. همچنین هنگام امضای قرارداد اجاره، باید هزینه‌های یک‌باره مانند <strong>ودیعه (Kaution — معمولاً ۳ تا ۶ ماه اجاره)</strong> و <strong>کمیسیون مشاور املاک</strong> (تا دو ماه اجاره بر اساس مقررات جدید Bestellerprinzip) را در نظر بگیرید.
              </p>
            </div>

            {/* 1.3. Richtwertmiete Section */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>۱.۳. اجاره‌بهای کنترل‌شده قانونی دولتی (Richtwertmiete)</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  برای ساختمان‌های قدیمی (ساخته‌شده قبل از ۱ جولای ۱۹۵۳ و Altbau) و آپارتمان‌های شهرداری، نرخ اجاره توسط دولت اتریش کنترل می‌شود. از ۱ آوریل ۲۰۲۶ این نرخ‌ها به‌روزرسانی شده‌اند:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {RICHTWERT_PRICES.map((r, i) => (
                  <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-center">
                    <div className="text-xs font-bold text-stone-600">{r.state}</div>
                    <div className="text-base font-black font-mono text-emerald-700 mt-1" dir="ltr">{r.rate} /m²</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: STUDENT DORMS */}
        {activeTab === "dorms" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black">
                <GraduationCap className="w-3.5 h-3.5" />
                راهنمای دانشجویان، پژوهشگران و زبان‌آموزان
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ۲. خوابگاه‌های دانشجویی در اتریش (Studentenheime)
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                خوابگاه‌های دانشجویی در اتریش معمولاً <strong>گزینه‌های بسیار مقرون‌به‌صرفه‌ای</strong> برای دانشجویان هستند و بسیاری از آنها دارای قیمت <strong>همه‌شمول (All-inclusive)</strong> هستند که شامل مبلمان، سیستم گرمایشی، برق، آب گرم، اینترنت پرسرعت، تلویزیون، نظافت و استفاده رایگان از فضاهای ورزشی و مشترک می‌شود.
              </p>
            </div>

            {/* Visual Hero Feature */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 h-44 sm:h-56">
              <img
                src={GUIDE_IMAGES.studentDorm}
                alt="خوابگاه دانشجویی اتریش"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">All-Inclusive Dormitories</span>
                <h3 className="text-base sm:text-lg font-black mt-1">
                  پذیرش راحت و مدرک مسکن رسمی معتبر برای سفارت تهران
                </h3>
                <p className="text-xs text-stone-300 mt-0.5 line-clamp-2">
                  قراردادهای رسمی خوابگاه‌های ÖJAB و STUWO و Home4students مستقیماً به عنوان مدرک اثبات مسکن مورد پذیرش سفارت اتریش است.
                </p>
              </div>
            </div>

            {/* 2.1. Costs Table */}
            <div className="space-y-3">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Coins className="w-4 h-4 text-indigo-600" />
                <span>۲.۱. هزینه خوابگاه‌های دانشجویی به تفکیک شهر</span>
              </h3>

              <div className="overflow-x-auto rounded-2xl border border-stone-200">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-stone-100 text-stone-700 border-b border-stone-200 font-black">
                    <tr>
                      <th className="p-3 sm:p-4">شهر</th>
                      <th className="p-3 sm:p-4 text-center">اتاق یک‌نفره (یورو/ماه)</th>
                      <th className="p-3 sm:p-4 text-center">اتاق دونفره (یورو/ماه)</th>
                      <th className="p-3 sm:p-4">وضعیت تقاضا</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 sm:p-4 font-black text-stone-900">وین (Wien)</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-indigo-700 font-black">۳۰۰ – ۵۰۰ €</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-stone-700">۲۸۰ – ۳۲۰ €</td>
                      <td className="p-3 sm:p-4 text-xs text-rose-600">بسیار بالا (ثبت‌نام ۶ ماه قبل)</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 sm:p-4 font-black text-stone-900">گراتس (Graz)</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-indigo-700 font-black">۲۵۰ – ۴۰۰ €</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-stone-400">—</td>
                      <td className="p-3 sm:p-4 text-xs text-emerald-600">بسیار عالی و دانشجویی</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 sm:p-4 font-black text-stone-900">اینسبروک (Innsbruck)</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-indigo-700 font-black">۴۵۰ – ۵۵۰ €</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-stone-400">—</td>
                      <td className="p-3 sm:p-4 text-xs text-amber-600">ظرفیت محدود کوهستانی</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 sm:p-4 font-black text-stone-900">سالزبورگ (Salzburg)</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-indigo-700 font-black">۴۰۰ – ۵۰۰ €</td>
                      <td className="p-3 sm:p-4 text-center font-mono text-stone-400">—</td>
                      <td className="p-3 sm:p-4 text-xs text-stone-600">تقاضای بالا در رشته‌های هنر</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2.2. Providers Cards List */}
            <div className="space-y-4">
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>۲.۲. لیست معتبرترین ارائه‌دهندگان خوابگاه دانشجویی در اتریش</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STUDENT_DORMS.map((dorm, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {dorm.badge}
                          </span>
                          <h4 className="text-base font-black text-stone-900 mt-1">{dorm.name}</h4>
                        </div>
                        <span className="text-xs font-black font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {dorm.priceFrom}
                        </span>
                      </div>

                      <div className="mt-3 text-xs text-stone-600 space-y-1.5 font-bold">
                        <div>
                          <span className="text-stone-400">شهرها: </span>
                          <span>{dorm.cities}</span>
                        </div>
                        <div className="text-stone-500 font-normal">
                          {dorm.features}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <a
                        href={dorm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                      >
                        <span>سایت رسمی و ثبت‌نام</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(dorm.url, `dorm-${idx}`)}
                        className="text-[11px] font-bold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedLink === `dorm-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی لینک</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dorm Strategy Advice */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-indigo-950">
              <div className="font-black text-indigo-900 mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>زمان‌بندی طلایی برای ثبت‌نام خوابگاه</span>
              </div>
              <p className="leading-relaxed">
                برای دریافت خوابگاه دانشجویی، حتماً <strong>حداقل ۳ تا ۶ ماه قبل</strong> از شروع ترم (معمولاً فروردین برای ترم زمستان و آبان برای ترم تابستان) اقدام نمایید، زیرا ظرفیت‌ها بسیار سریع پر می‌شوند. اکثر خوابگاه‌ها امکان ثبت‌نام آنلاین رایگان و بدون تعهد اولیه را فراهم می‌کنند.
              </p>
            </div>
          </motion.div>
        )}

        {/* TAB 3: BUYING PROPERTY */}
        {activeTab === "buy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-black">
                <Landmark className="w-3.5 h-3.5" />
                قوانین املاک و حقوق اتباع کشورهای ثالث
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ۳. خرید ملک در اتریش برای اتباع ایرانی
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                خرید ملک مسکونی و تجاری در اتریش توسط اتباع خارجی تابع قوانین ایالتی <strong>Grundverkehr</strong> (قوانین انتقال زمین و املاک) است. شناخت جزئیات این قوانین از بروز خسارت‌های مالی سنگین و ابطال معاملات جلوگیری می‌کند.
              </p>
            </div>

            {/* Visual Hero Keys */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>۳.۱. قوانین کلی انتقال املاک (Grundverkehr)</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed font-bold">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>اتباع اتحادیه اروپا (EU/EEA):</strong> بدون هیچ‌گونه محدودیت و بدون نیاز به مجوز می‌توانند همانند شهروندان اتریش ملک خریداری نمایند.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>اتباع کشورهای ثالث (از جمله ایران):</strong> اصولاً برای خرید هرگونه ملک مسکونی، اداری یا زمین نیاز به <strong>مجوز رسمی از اداره املاک ایالتی (Grundverkehrsbehörde)</strong> دارند.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-black text-amber-950 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-700" />
                    <span>۳.۲. قوانین خاص برای خریداران ایرانی</span>
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-800 leading-relaxed font-bold">
                    <p>
                      <strong>۱) شرط منافع عمومی:</strong> مجوز خرید ملک تنها در صورتی صادر می‌شود که منافع فرهنگی، اجتماعی، اقتصادی یا اشتغال‌زایی در معامله احراز گردد و منافع ملی اتریش آسیب نبیند.
                    </p>
                    <p>
                      <strong>۲) استثنای شهر گراتس (اشتایرمارک):</strong> در گراتس اتباع کشورهای ثالث بر اساس مقررات محلی برای خرید آپارتمان نیاز به مجوز پیچیده ایالتی ندارند.
                    </p>
                    <p>
                      <strong>۳) شرایط وین (Wien):</strong> در وین اگر یکی از زوجین تابعیت اتریشی یا پاسپورت اتحادیه اروپا داشته باشد، برای خرید مشترک ۵۰-۵۰ نیازی به اخذ مجوز نخواهد بود.
                    </p>
                  </div>
                </div>
              </div>

              {/* Side Card Image */}
              <div className="rounded-2xl overflow-hidden border border-stone-200 flex flex-col">
                <img
                  src={GUIDE_IMAGES.keysContract}
                  alt="قرارداد خرید ملک اتریش"
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-4 bg-stone-900 text-white flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold">مراحل ۴ گانه خرید ملک</span>
                    <ol className="text-xs text-stone-300 space-y-1.5 mt-2 list-decimal list-inside font-bold">
                      <li>اخذ مجوز ایالتی Grundverkehr</li>
                      <li>تنظیم قرارداد توسط وکیل (Notar)</li>
                      <li>ثبت قطعی در دفتر دولتی Grundbuch</li>
                      <li>پرداخت مالیات انتقال (Grunderwerbsteuer)</li>
                    </ol>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppInquiry("مشاوره با وکیل املاک و بررسی قوانین Grundverkehr")}
                    className="mt-4 w-full py-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    ارتباط با وکیل املاک ایرانی در وین
                  </button>
                </div>
              </div>
            </div>

            {/* Legal Warning Notice */}
            <div className="bg-stone-100 rounded-2xl p-4 sm:p-5 border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
              <Scale className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>توصیه حقوقی اتریش‌نشین:</strong> پیش از هرگونه پرداخت وجه، ودیعه یا امضای پیش‌نویس (Kaufanbot)، حتماً از یک وکیل متخصص در قوانین املاک اتریش مشورت بگیرید، زیرا عدم دریافت مجوز قبلی می‌تواند موجب بطلان معامله، جریمه‌های اداری و بلوکه شدن وجوه گردد.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: EMBASSY & AUSTRIAN-RESIDENTS ROLE */}
        {activeTab === "embassy" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-black">
                <HeartHandshake className="w-3.5 h-3.5" />
                سفارت، مدارک مسکن و تعهدنامه سکونت
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ۴. نقش اتریش‌نشین‌ها در ارائه مدارک مسکن به سفارت
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                یکی از مهم‌ترین شروط صدور ویزا و اقامت (ویزای توریستی، دانشجویی، کاری و پیوستن به خانواده)، <strong>اثبات داشتن محل سکونت معتبر (Unterkunftsnachweis)</strong> در اتریش است. سفارت اتریش در تهران بر اساس استانداردهای دقیق، اسناد محل سکونت را ممیزی می‌کند.
              </p>
            </div>

            {/* Visual Grid: Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 4.1 Embassy requirements */}
              <div className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span>۴.۱. مدارک مسکن مورد تایید سفارت اتریش در تهران</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-800 font-bold leading-relaxed">
                  <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>قرارداد اجاره رسمی (Mietvertrag):</strong>
                      <span className="text-stone-600 block text-xs mt-0.5">قرارداد معتبر که نام صریح متقاضی به همراه متراژ و هزینه ماهیانه در آن ثبت شده باشد.</span>
                    </div>
                  </li>
                  <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>قرارداد اجاره فرعی (Untermietvertrag):</strong>
                      <span className="text-stone-600 block text-xs mt-0.5">در صورتی که متقاضی به عنوان مستأجر فرعی با رضایت کتبی صاحب‌خانه اصلی ساکن شود.</span>
                    </div>
                  </li>
                  <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>تعهدنامه مسکن (Wohnrechtsvereinbarung):</strong>
                      <span className="text-stone-600 block text-xs mt-0.5">فرم رسمی اسکان رایگان در منزل دوستان یا اقوام با تایید و امضای رسمی میزبان اتریش‌نشین.</span>
                    </div>
                  </li>
                  <li className="p-2.5 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>سند مالکیت معتبر (Eigentumsnachweis):</strong>
                      <span className="text-stone-600 block text-xs mt-0.5">خلاصه دفتر املاک (Grundbuchauszug) در صورتی که فرد شخصاً یا میزبان مالک ملک باشد.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 4.2 How an Austrian Resident Can Help */}
              <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-3">
                <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
                  <Users2 className="w-4 h-4 text-[#c8102e]" />
                  <span>۴.۲. نحوه کمک و میزبانی اتریش‌نشین‌ها</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed font-bold">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                    <span className="text-[#c8102e] font-black block">۱) ارائه اجاره‌نامه رسمی به‌همراه سند صاحب‌ملک:</span>
                    اتریش‌نشین می‌تواند مدارک رسمی اجاره را همراه با کپی سند مالک جهت ارائه مستقیم و بدون نقص به سفارت تهران تنظیم نماید.
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                    <span className="text-indigo-700 font-black block">۲) فرم رسمی Wohnrechtsvereinbarung:</span>
                    امضای فرم رسمی با ذکر متراژ متناسب (حداقل استانداردهای متراژ شهرداری برای هر نفر)، الصاق کپی کارت اقامت یا پاسپورت میزبان و آدرس دقیق ملکی.
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                    <span className="text-emerald-700 font-black block">۳) رزرو یا انتقال قرارداد خوابگاه:</span>
                    راهنمایی و پیگیری رزرو آنلاین خوابگاه با نامه تاییدیه رسمی (Heimplatzbestätigung).
                  </div>
                </div>
              </div>
            </div>

            {/* Important 3-day Meldezettel & Subsidies Alert */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-4 text-xs text-red-950 space-y-1.5 font-bold">
                <div className="flex items-center gap-1.5 text-red-700 font-black">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ثبت آدرس ظرف ۳ روز کاری (Meldezettel)</span>
                </div>
                <p className="leading-relaxed font-normal">
                  پس از فرود در اتریش، ثبت آدرس در اداره ثبت Meldeservice حداکثر ظرف ۳ روز الزامی است. عدم رعایت این مهلت منجر به جریمه‌های نقدی سنگین و ثبت سوء‌سابقه در پرونده اقامتی می‌شود.
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-950 space-y-1.5 font-bold">
                <div className="flex items-center gap-1.5 text-blue-700 font-black">
                  <Coins className="w-4 h-4" />
                  <span>کمک‌هزینه مسکن شهرداری (Mietbeihilfe / Wohnbeihilfe)</span>
                </div>
                <p className="leading-relaxed font-normal">
                  اتباع خارجی در صورت داشتن اقامت قانونی (معمولاً پس از چند سال اقامت و تسلط به زبان آلمانی) می‌توانند از یارانه و کمک‌هزینه اجاره شهرداری بهره‌مند شوند.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: SUMMARY & PRACTICAL ACTIONABLE CHECKLIST */}
        {activeTab === "checklist" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-black">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                خلاصه اجرایی و گام‌های عملی
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                ۵. جمع‌بندی و توصیه‌های عملی اتریش‌نشین
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* For Students */}
              <div className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-900 font-black text-sm">
                  <GraduationCap className="w-5 h-5 text-indigo-700" />
                  <span>برای دانشجویان و محققان</span>
                </div>
                <ul className="text-xs text-stone-700 space-y-2 leading-relaxed font-bold">
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-600">✓</span>
                    <span><strong>حداقل ۶ ماه قبل</strong> از شروع ترم برای خوابگاه‌های دانشجویی ثبت‌نام رایگان کنید.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-600">✓</span>
                    <span>خوابگاه‌های <strong>All-inclusive</strong> را در اولویت بگذارید تا نگران هزینه‌های گاز و شارژ نباشید.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-600">✓</span>
                    <span>در صورت عدم یافتن خوابگاه، گزینه‌های <strong>آپارتمان مشترک (WG)</strong> با هزینه ۳۵۰ تا ۶۰۰ یورو را بررسی کنید.</span>
                  </li>
                </ul>
              </div>

              {/* For Buyers */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                  <Landmark className="w-5 h-5 text-amber-700" />
                  <span>برای خریداران ملک</span>
                </div>
                <ul className="text-xs text-stone-700 space-y-2 leading-relaxed font-bold">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>حتماً قبل از هر پیش‌نویس، تاییدیه <strong>Grundverkehrsbehörde</strong> را لحاظ کنید.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>در شهرهایی مانند گراتس قوانین برای اتباع غیراروپایی سهل‌گیرانه‌تر است.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600">✓</span>
                    <span>حدود <strong>۱۰٪ هزینه جانبی</strong> (مالیات انتقال ۳.۵٪، ثبت ۱.۱٪، دستمزد وکیل و بنگاه) را جداگانه محاسبه کنید.</span>
                  </li>
                </ul>
              </div>

              {/* For Austrian Hosts */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
                  <HeartHandshake className="w-5 h-5 text-emerald-700" />
                  <span>برای اتریش‌نشین‌ها (میزبانان)</span>
                </div>
                <ul className="text-xs text-stone-700 space-y-2 leading-relaxed font-bold">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>تعهدنامه مسکن (Wohnrechtsvereinbarung) را کاملاً رسمی و همراه با سند مالکیت آماده کنید.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>فرم Meldezettel را با امضای مالک اصلی برای روزهای اول ورود متقاضی مهیا کنید.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600">✓</span>
                    <span>از قوانین متراژ مورد نیاز اداره مهاجرت برای هر نفر (حداقل ۱۰ تا ۱۲ متر به ازای هر بزرگسال) اطمینان یابید.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Source Disclaimer */}
            <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-[11px] sm:text-xs text-stone-600 leading-relaxed font-bold">
              💡 <strong>یادآوری رسمی:</strong> تمامی قیمت‌ها و قوانین ذکر شده در این مقاله بر اساس آخرین داده‌های سال ۲۰۲۶ تدوین شده است. پیشنهاد می‌گردد برای اطمینان بیشتر، پیش از هر اقدام عملی اطلاعات به‌روز را از پورتال رسمی دولت اتریش (<a href="https://www.oesterreich.gv.at" target="_blank" rel="noopener noreferrer" className="text-[#c8102e] underline">oesterreich.gv.at</a>)، سفارت اتریش در تهران و ادارات ایالتی استعلام فرمایید.
            </div>
          </motion.div>
        )}

      </div>

      {/* ========================================== */}
      {/* 4. FOOTER CALL-TO-ACTION & DIRECT WHATSAPP */}
      {/* ========================================== */}
      <div className="bg-stone-50 border-t border-stone-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="text-right">
            <div className="text-xs sm:text-sm font-black text-stone-900">
              نیاز به بررسی مدارک مسکن، قرارداد یا تعهدنامه سفارت دارید؟
            </div>
            <div className="text-[11px] text-stone-500 font-bold">
              مشاوران مقیم وین اتریش‌نشین آماده پاسخگویی و راهنمایی شما هستند.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => handleWhatsAppInquiry("بررسی اجاره‌نامه، خوابگاه و مدارک مسکن برای سفارت")}
            className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>گفتگو در واتس‌اپ اتریش (00436889763256)</span>
          </button>
        </div>
      </div>
    </article>
  );
}
