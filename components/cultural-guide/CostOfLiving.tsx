import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, Coins, Utensils, Lightbulb, Train, Home, Briefcase,
  Users, GraduationCap, Scale, Sparkles, CheckCircle, ShieldCheck,
  Zap, Heart, Star, Award, Globe, Rocket, Handshake, ChevronDown,
  ChevronLeft, Clock, MapPin, Info, Building2, Wallet, PieChart,
  Calculator, BookOpen, Target, AlertTriangle, Quote, Coffee,
  Baby, Landmark, Euro, BarChart3, ShoppingCart
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_IMG = "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800&q=80";

interface CostBreakdown {
  rent: number;
  utilities: number;
  groceries: number;
  transport: number;
  leisure: number;
}

const COST_DATA: Record<string, Record<string, CostBreakdown>> = {
  vienna: {
    student: { rent: 480, utilities: 70, groceries: 240, transport: 15, leisure: 160 },
    single: { rent: 980, utilities: 140, groceries: 320, transport: 33, leisure: 320 },
    family: { rent: 1680, utilities: 240, groceries: 780, transport: 110, leisure: 550 }
  },
  graz: {
    student: { rent: 380, utilities: 60, groceries: 210, transport: 20, leisure: 130 },
    single: { rent: 750, utilities: 120, groceries: 280, transport: 30, leisure: 240 },
    family: { rent: 1290, utilities: 210, groceries: 680, transport: 90, leisure: 420 }
  },
  linz: {
    student: { rent: 360, utilities: 55, groceries: 200, transport: 20, leisure: 120 },
    single: { rent: 720, utilities: 115, groceries: 270, transport: 30, leisure: 220 },
    family: { rent: 1250, utilities: 200, groceries: 650, transport: 85, leisure: 380 }
  },
  salzburg: {
    student: { rent: 420, utilities: 65, groceries: 230, transport: 20, leisure: 140 },
    single: { rent: 860, utilities: 130, groceries: 300, transport: 30, leisure: 280 },
    family: { rent: 1480, utilities: 220, groceries: 720, transport: 100, leisure: 480 }
  },
  innsbruck: {
    student: { rent: 450, utilities: 68, groceries: 235, transport: 20, leisure: 150 },
    single: { rent: 910, utilities: 135, groceries: 310, transport: 30, leisure: 300 },
    family: { rent: 1550, utilities: 230, groceries: 740, transport: 100, leisure: 500 }
  }
};

const CITY_LABELS: Record<string, { farsi: string; en: string; image: string }> = {
  vienna: { farsi: "وین (Wien)", en: "Vienna", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&q=80" },
  graz: { farsi: "گراتس (Graz)", en: "Graz", image: "https://images.unsplash.com/photo-1566837571183-13e04de52f38?w=400&q=80" },
  linz: { farsi: "لینتس (Linz)", en: "Linz", image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=400&q=80" },
  salzburg: { farsi: "سالزبورگ (Salzburg)", en: "Salzburg", image: "https://images.unsplash.com/photo-1580745086518-84e4f6ce1c9d?w=400&q=80" },
  innsbruck: { farsi: "اینسبروک (Innsbruck)", en: "Innsbruck", image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=400&q=80" }
};

const LIFESTYLE_LABELS = [
  {
    id: "student",
    label: "دانشجویی",
    sub: "شیرینگ روم WG",
    icon: GraduationCap,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    id: "single",
    label: "مجرد شاغل",
    sub: "آپارتمان ۱ خوابه",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    id: "family",
    label: "خانواده ۴ نفره",
    sub: "آپارتمان ۳ خوابه",
    icon: Users,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
  }
];

const IRAN_COMP_PRODUCTS = [
  { name: "شیر تازه مرغوب (۱ لیتر)", at: 1.15, ir: 0.65, icon: "🥛" },
  { name: "نان اتریشی سبوس‌دار گندم (بسته)", at: 1.80, ir: 0.25, icon: "🥖" },
  { name: "تخم‌مرغ محلی اتریش (۱۲ عددی)", at: 2.60, ir: 1.50, icon: "🥚" },
  { name: "فیله مرغ تازه (۱ کیلوگرم)", at: 9.80, ir: 4.80, icon: "🍗" },
  { name: "اینترنت فیبر نوری (۳۰۰ مگابیت)", at: 33.00, ir: 12.00, icon: "🌐" },
  { name: "بلیت تک‌سفره Wiener Linien", at: 2.40, ir: 0.18, icon: "🚇" },
  { name: "شام ۲ نفره در رستوران وین", at: 52.00, ir: 24.00, icon: "🍽️" },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۵", label: "شهر اتریش", icon: "🏙️" },
  { value: "۳", label: "سبک معیشت", icon: "👥" },
  { value: "۵", label: "دسته هزینه", icon: "📊" },
  { value: "۲۰۲۶", label: "بروزرسانی", icon: "📅" },
];

// ==========================================
// INSIGHTS
// ==========================================
const INSIGHTS = [
  {
    icon: Home,
    title: "مسکن گران‌ترین بخش",
    text: "اجاره مسکن بین ۳۵ تا ۵۰ درصد کل هزینه ماهانه شما را تشکیل می‌دهد. انتخاب شهر و منطقه مستقیماً بر بودجه تأثیر می‌گذارد.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Train,
    title: "حمل و نقل ارزان",
    text: "با Klimaticket سالانه (€۱٬۰۹۵) می‌توانید با تمام وسایل حمل و نقل عمومی اتریش سفر کنید. برای دانشجویان، تخفیف‌های ویژه‌ای وجود دارد.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: ShoppingCart,
    title: "خرید هوشمند",
    text: "فروشگاه‌های Hofer و Lidl ارزان‌تر از Billa و Spar هستند. توجه داشته باشید که تمام فروشگاه‌ها یکشنبه‌ها تعطیل هستند.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Wallet,
    title: "صرفه‌جویی واقعی",
    text: "با تنظیم سبک زندگی، می‌توانید بین ۱۰ تا ۳۰ درصد هزینه‌های ماهانه خود را کاهش دهید بدون افت کیفیت زندگی.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "چرا وین گران‌تر از سایر شهرهای اتریش است؟",
    a: "وین پایتخت و بزرگ‌ترین شهر اتریش است و بازار کار، دانشگاه‌ها و خدمات بیشتری دارد. همین تقاضای بالا باعث می‌شود اجاره مسکن و خدمات حدود ۲۰ تا ۳۰ درصد گران‌تر از شهرهایی مانند لینتس یا گراتس باشد.",
  },
  {
    q: "آیا می‌توان با حقوق حداقلی در اتریش زندگی کرد؟",
    a: "حداقل دستمزد اتریش در سال ۲۰۲۵ حدود €۱٬۵۰۰ خالص در ماه است. با این درآمد، یک زندگی ساده اما آبرومند در شهرهای غیر پایتختی امکان‌پذیر است، اما در وین ممکن است به شیرینگ مسکن نیاز داشته باشید.",
  },
  {
    q: "آیا هزینه‌های این شبیه‌ساز برای سال ۲۰۲۵ دقیق است؟",
    a: "این ارقام بر اساس آمار رسمی Statistik Austria و گزارش‌های میدانی به‌روزرسانی شده‌اند. با این حال، قیمت‌ها ممکن است بر اساس منطقه دقیق، فصل و شرایط بازار تغییر کنند. برای برنامه‌ریزی دقیق، همیشه حاشیه اطمینان ۱۰-۱۵٪ در نظر بگیرید.",
  },
  {
    q: "آیا بیمه درمانی در این هزینه‌ها لحاظ شده؟",
    a: "بیمه درمانی اجباری (ÖGK) حدود ۹-۱۰٪ از حقوق ناخالص شما را تشکیل می‌دهد که از حقوق کسر می‌شود. برای بیمه‌های تکمیلی، باید ماهانه بین €۲۰ تا €۸۰ جداگانه پرداخت کنید.",
  },
  {
    q: "چگونه می‌توانم در اتریش هزینه‌هایم را کاهش دهم؟",
    a: "راهکارهای مؤثر: شیرینگ مسکن (WG)، استفاده از Hofer/Lidl برای خرید، خرید بلیت‌های تخفیف‌دار حمل‌ونقل، استفاده از فروشگاه‌های دست دوم، و شرکت در رویدادهای رایگان فرهنگی. همچنین می‌توانید برای یارانه‌های دولتی مانند Wohnbeihilfe درخواست دهید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function CostOfLiving() {
  const [activeCity, setActiveCity] = useState<string>("vienna");
  const [activeLifestyle, setActiveLifestyle] = useState<string>("single");
  const [familyMembers, setFamilyMembers] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const cityData = COST_DATA[activeCity] || COST_DATA.vienna;
  const baseBreakdown = cityData[activeLifestyle] || cityData.single;

  const breakdown = {
    rent: baseBreakdown.rent * (activeLifestyle === "family" ? familyMembers / 4 : familyMembers),
    utilities: baseBreakdown.utilities * (activeLifestyle === "family" ? familyMembers / 4 : familyMembers),
    groceries: baseBreakdown.groceries * familyMembers,
    transport: baseBreakdown.transport * familyMembers,
    leisure: baseBreakdown.leisure * familyMembers,
  };

  const totalCost = Math.round(
    breakdown.rent + breakdown.utilities + breakdown.groceries + breakdown.transport + breakdown.leisure
  );

  const breakdownItems = [
    {
      key: "rent",
      label: "اجاره آپارتمان / اتاق WG",
      value: breakdown.rent,
      color: "bg-red-600",
      lightColor: "bg-red-100 text-red-700",
      icon: Home,
      iconColor: "text-red-600",
    },
    {
      key: "groceries",
      label: "خواربار و سوپر (Hofer/Spar)",
      value: breakdown.groceries,
      color: "bg-amber-500",
      lightColor: "bg-amber-100 text-amber-700",
      icon: Utensils,
      iconColor: "text-amber-600",
    },
    {
      key: "leisure",
      label: "کافه‌گردی و تفریح اجتماعی",
      value: breakdown.leisure,
      color: "bg-pink-500",
      lightColor: "bg-pink-100 text-pink-700",
      icon: Coffee,
      iconColor: "text-pink-600",
    },
    {
      key: "utilities",
      label: "قبوض (گرمایش، برق، آب، اینترنت)",
      value: breakdown.utilities,
      color: "bg-blue-600",
      lightColor: "bg-blue-100 text-blue-700",
      icon: Lightbulb,
      iconColor: "text-blue-600",
    },
    {
      key: "transport",
      label: "حمل و نقل عمومی و بین‌شهری",
      value: breakdown.transport,
      color: "bg-slate-900",
      lightColor: "bg-slate-100 text-slate-700",
      icon: Train,
      iconColor: "text-slate-700",
    },
  ];

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "شبیه‌ساز هزینه‌های زندگی در اتریش",
      url: "https://otrish-iran.ir/cost-of-living",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description:
        "شبیه‌ساز هوشمند محاسبه هزینه‌های ماهانه زندگی در وین، گراتس، لینتس، سالزبورگ و اینسبروک برای دانشجویان، مجردها و خانواده‌ها.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      inLanguage: "fa",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="شبیه‌ساز هزینه زندگی در اتریش ۲۰۲۶ | محاسبه ماهانه وین، گراتس، لینتس"
        description="محاسبه دقیق هزینه ماهانه زندگی در اتریش برای دانشجو، مجرد و خانواده. مقایسه اجاره، خواربار، حمل و نقل و تفریح در ۵ شهر اصلی. بر اساس آمار رسمی Statistik Austria."
        keywords="هزینه زندگی اتریش, هزینه ماهانه وین, اجاره وین, هزینه دانشجویی اتریش, بودجه زندگی اتریش, Statistik Austria, هزینه مسکن وین, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="min-h-screen bg-stone-50 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          {/* ========================================== */}
          {/* HERO SECTION */}
          {/* ========================================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
            style={{
              background:
                "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
            }}
          >
            <div className="absolute inset-0">
              <img
                src={HERO_IMAGE}
                alt="وین اتریش - هزینه زندگی"
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              💰
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                whileHover={{ rotate: 6, scale: 1.05 }}
                className="flex-shrink-0"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                  <img
                    src={otrishLogo}
                    alt="اتریش‌نشین"
                    width="112"
                    height="112"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </motion.div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                  <Calculator className="w-3.5 h-3.5 text-amber-300" />
                  Lebenshaltungskosten Österreich 2026
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  شبیه‌ساز هوشمند هزینه زندگی در اتریش
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  برآورد دقیق و مبتنی بر آمار رسمی Statistik Austria برای هزینه‌های
                  ماهانه زندگی در پنج شهر اصلی اتریش — از اجاره مسکن و خواربار تا
                  حمل و نقل و تفریح. برنامه‌ریزی مالی هوشمندانه برای دانشجویان،
                  شاغلان و خانواده‌ها.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>آمار رسمی ۲۰۲۶</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>کاملاً رایگان</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>محاسبه آنی</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ========================================== */}
          {/* STATS ROW */}
          {/* ========================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-[#c8102e]">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ========================================== */}
          {/* MAIN SIMULATOR */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden relative"
            id="cost-of-living-simulator"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

            {/* Header */}
            <div className="p-6 md:p-8 border-b border-stone-100">
              <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black bg-rose-100 text-[#c8102e] px-2.5 py-1 rounded-full">
                      سال ۲۰۲۶
                    </span>
                    <TrendingUp className="w-4 h-4 text-[#c8102e]" />
                  </div>
                  <h2 className="font-black text-stone-900 text-lg md:text-2xl leading-tight">
                    شبیه‌ساز بودجه معیشت و مخارج زندگی اتریش
                  </h2>
                  <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed">
                    تخمین واقعی و مبتنی بر آمارهای رسمی خرید و اجاره در ایالت‌های اتریش
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-700">آمار زنده ۲۰۲۶</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT: Options */}
              <div className="lg:col-span-4 space-y-5">
                {/* City Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c8102e]" />
                    ۱. شهر مورد بررسی را انتخاب کنید:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(CITY_LABELS).map(([id, val]) => {
                      const isActive = activeCity === id;
                      return (
                        <motion.button
                          key={id}
                          onClick={() => setActiveCity(id)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-2.5 rounded-xl border-2 text-[11px] font-black transition-all cursor-pointer text-center overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white border-[#c8102e] shadow-md"
                              : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-white"
                          }`}
                        >
                          {isActive && (
                            <CheckCircle className="absolute top-1 left-1 w-3 h-3 text-emerald-300" />
                          )}
                          {val.farsi}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Family Members */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c8102e]" />
                    تعداد اعضای خانواده:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFamilyMembers(Math.max(1, familyMembers - 1))}
                      className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-black transition flex items-center justify-center"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center bg-stone-50 border border-stone-200 rounded-xl py-2.5">
                      <span className="text-lg font-black text-stone-900">{familyMembers}</span>
                      <span className="text-[10px] font-bold text-stone-500 mr-1">نفر</span>
                    </div>
                    <button
                      onClick={() => setFamilyMembers(familyMembers + 1)}
                      className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-black transition flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-[#c8102e]" />
                    ۲. سبک معیشت (پایه):
                  </label>
                  <div className="flex flex-col gap-2">
                    {LIFESTYLE_LABELS.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeLifestyle === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => setActiveLifestyle(item.id)}
                          whileHover={{ y: -2 }}
                          className={`p-3 rounded-2xl border-2 text-right flex items-center gap-3 transition-all cursor-pointer ${
                            isActive
                              ? `bg-gradient-to-br ${item.gradient} text-white border-transparent shadow-md`
                              : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-white"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                              isActive
                                ? "bg-white/20 text-white"
                                : `${item.bg} ${item.text}`
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-black text-xs">{item.label}</h5>
                            <p className={`text-[10px] font-bold ${isActive ? "text-white/80" : "text-stone-500"}`}>
                              {item.sub}
                            </p>
                          </div>
                          {isActive && <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Tip */}
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-bold leading-relaxed">
                  <div className="flex items-center gap-1.5 mb-1.5 text-amber-800">
                    <Sparkles className="w-4 h-4" />
                    <strong className="text-[11px]">آیا می‌دانستید؟</strong>
                  </div>
                  <p className="text-[10.5px]">
                    با بلیت سالانه <em>Klimaticket</em> می‌توانید با تمام وسایل
                    حمل و نقل عمومی اتریش سفر کنید. تمام فروشگاه‌های خواربار در
                    اتریش یکشنبه‌ها تعطیل هستند!
                  </p>
                </div>
              </div>

              {/* RIGHT: Breakdown */}
              <div className="lg:col-span-8 space-y-5">
                {/* Total Card */}
                <div className="bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#c8102e]/20 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute top-0 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="text-[10px] font-black text-stone-300 mb-1 flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        مجموع برآورد ماهانه - {CITY_LABELS[activeCity].farsi}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-5xl font-black font-mono">
                          €{totalCost.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-stone-300">/ ماه</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[10px] font-black text-stone-300">سالانه</div>
                      <div className="text-lg md:text-xl font-black font-mono text-amber-300">
                        €{(totalCost * 12).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breakdown Bars */}
                <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black text-stone-900 flex items-center gap-1.5">
                      <PieChart className="w-4 h-4 text-[#c8102e]" />
                      تفکیک هزینه‌های ماهانه
                    </h4>
                    <span className="text-[10px] font-bold text-stone-500">
                      {activeLifestyle === "student" ? "سبک دانشجویی" : activeLifestyle === "single" ? "سبک مجرد شاغل" : "سبک خانواده"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {breakdownItems.map((item, i) => {
                      const Icon = item.icon;
                      const pct = Math.round((item.value / totalCost) * 100);
                      return (
                        <motion.div
                          key={item.key}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-lg ${item.lightColor} flex items-center justify-center flex-shrink-0`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-stone-700">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-stone-500 font-mono text-[10px]">
                                {pct}%
                              </span>
                              <span className="font-mono text-stone-900 font-black">
                                €{Math.round(item.value).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: i * 0.06 }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* COMPARISON TABLE */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8"
          >
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Scale className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                مقایسه قیمت کالاهای اساسی (اتریش vs ایران)
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                مقایسه مستقیم قیمت اقلام پرمصرف روزانه و خدمات عمومی
              </p>
            </div>

            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-gradient-to-l from-stone-100 to-stone-50 border-b border-stone-200 text-stone-600 font-black">
                    <tr>
                      <th className="p-3 md:p-4">اقلام مصرفی</th>
                      <th className="p-3 md:p-4 text-center whitespace-nowrap">
                        <span className="flex items-center justify-center gap-1">
                          🇦🇹 اتریش
                        </span>
                      </th>
                      <th className="p-3 md:p-4 text-center whitespace-nowrap">
                        <span className="flex items-center justify-center gap-1">
                          🇮🇷 ایران
                        </span>
                      </th>
                      <th className="p-3 md:p-4 text-left whitespace-nowrap">شاخص تفاوت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                    {IRAN_COMP_PRODUCTS.map((item, id) => {
                      const diffTimes = (item.at / item.ir).toFixed(1);
                      const isCheaper = item.at < item.ir;
                      return (
                        <motion.tr
                          key={id}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: id * 0.04 }}
                          className="hover:bg-stone-50/70 transition-colors"
                        >
                          <td className="p-3 md:p-4 font-black text-stone-800">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{item.icon}</span>
                              <span className="text-[11px] md:text-xs">{item.name}</span>
                            </div>
                          </td>
                          <td className="p-3 md:p-4 text-center font-mono text-emerald-700">
                            €{item.at.toFixed(2)}
                          </td>
                          <td className="p-3 md:p-4 text-center font-mono text-stone-600">
                            €{item.ir.toFixed(2)}
                          </td>
                          <td className="p-3 md:p-4 text-left font-mono">
                            {isCheaper ? (
                              <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-[10px]">
                                <CheckCircle className="w-3 h-3" />
                                ارزان‌تر
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-lg text-[10px]">
                                <TrendingUp className="w-3 h-3" />
                                {diffTimes}× گران‌تر
                              </span>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* INSIGHTS */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                نکات کلیدی برای مدیریت هزینه‌ها
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار نکته کاربردی که کیفیت زندگی شما را حفظ و بودجه‌تان را بهینه می‌کند
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {INSIGHTS.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group"
                  >
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative font-black text-stone-900 text-sm mb-2">
                      {v.title}
                    </h3>
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                      {v.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* FAQ */}
          {/* ========================================== */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                سوالات متداول هزینه‌های زندگی
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                پاسخ به پرتکرارترین سوالات فارسی‌زبانان درباره بودجه زندگی در اتریش
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FaqItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* ========================================== */}
          {/* WARNING */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-black text-amber-900 text-sm mb-1.5">
                نکات مهم در استفاده از این شبیه‌ساز
              </h5>
              <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>ارقام این شبیه‌ساز به‌صورت میانگین هستند؛ اجاره دقیق به منطقه، متراژ و شرایط بازار بستگی دارد.</li>
                <li>برای برنامه‌ریزی دقیق، همیشه ۱۰-۱۵٪ حاشیه اطمینان برای هزینه‌های غیرمنتظره در نظر بگیرید.</li>
                <li>هزینه‌های بیمه درمانی اجباری (ÖGK) از حقوق ناخالص کسر می‌شود و در این ارقام لحاظ نشده است.</li>
                <li>قیمت‌ها ممکن است بر اساس تورم و تغییرات بازار به‌سرعت تغییر کنند.</li>
              </ul>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* FINAL CTA */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
          >
            <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
                <Handshake className="w-3.5 h-3.5 text-amber-300" />
                همراه شما در برنامه‌ریزی مالی
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">
                نیاز به مشاوره بیشتر دارید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                اگر درباره بودجه زندگی، انتخاب شهر یا برنامه‌ریزی مالی در اتریش سوالی
                دارید، تیم اتریش‌نشین آماده کمک رایگان به شماست.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Users className="w-4 h-4" />
                  مشاوره واتس‌اپ
                </a>
                <a
                  href="https://t.me/Otrish_neshin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  پشتیبانی تلگرام
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  پاسخ در کمتر از ۲۴ ساعت
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  کاملاً محرمانه
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" />
                  خدمات داوطلبانه
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* DISCLAIMER */}
          {/* ========================================== */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-black text-amber-900 text-xs mb-1">
                یادآوری مهم
              </h5>
              <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                ارقام این شبیه‌ساز بر اساس آمار رسمی Statistik Austria و گزارش‌های
                میدانی تهیه شده‌اند و صرفاً جنبه راهنمایی دارند. قیمت‌ها ممکن است
                بر اساس منطقه دقیق، فصل و شرایط بازار تغییر کنند. برای تصمیم‌های
                مالی مهم، با منابع رسمی یا مشاوران واجد شرایط مشورت کنید. اتریش‌نشین
                مسئولیتی در قبال تصمیمات مبتنی بر این اطلاعات نمی‌پذیرد.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
  index,
}: {
  key?: React.Key;
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl border transition-all overflow-hidden ${
        isOpen
          ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md"
          : "border-stone-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition"
      >
        <span className="flex items-center gap-3 flex-1">
          <span
            className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${
              isOpen
                ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug">
            {q}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-[#c8102e]" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}