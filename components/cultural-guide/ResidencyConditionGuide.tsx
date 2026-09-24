import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Euro, Users, Baby, GraduationCap, Home, Briefcase, Calculator,
  Shield, CheckCircle, Info, ChevronDown, Sparkles, Zap, Star,
  TrendingUp, AlertCircle, FileText, Wallet, Heart, PhoneCall,
  Send, Globe, Award, Quote, Percent, Clock, Building2, Scale,
  CircleDollarSign, Landmark, Key, ArrowUpRight, BookOpen,
  BarChart3, Target, Layers, Filter, Grid3x3, Copy, RefreshCw,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna & Austria themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?auto=format&fit=crop&w=1600&q=80",
  documents: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80",
  family: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
  office: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type HouseholdType = "single" | "couple" | "couple1child" | "couple2child" | "single1child" | "single2child";

type IncomeCategory = {
  id: string;
  name: string;
  nameDe: string;
  baseAmount: number;
  perChild: number;
  icon: any;
  gradient: string;
  color: string;
  description: string;
  appliesTo: string;
  note?: string;
  recommended?: boolean;
};

// ==========================================
// INCOME CATEGORIES — 2026 Official Rates
// ==========================================
const INCOME_CATEGORIES: IncomeCategory[] = [
  {
    id: "single",
    name: "مجرد",
    nameDe: "Alleinstehend",
    baseAmount: 1308.39,
    perChild: 201.88,
    icon: Users,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    description:
      "حداقل درآمد خالص ماهانه برای یک فرد مجرد. این مبلغ پس از کسر مالیات و هزینه‌های جاری (اجاره، وام و...) محاسبه می‌شود.",
    appliesTo: "افراد مجرد، دانشجویان بالای ۲۴ سال، کارمندان تنها",
    recommended: true,
  },
  {
    id: "couple",
    name: "متأهل (بدون فرزند)",
    nameDe: "Ehepaar / Partnerschaft",
    baseAmount: 2064.12,
    perChild: 201.88,
    icon: Heart,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    description:
      "حداقل درآمد خالص ماهانه برای زوج‌های متأهل یا شرکای ثبت‌شده بدون فرزند. درآمد هر دو طرف جمع می‌شود.",
    appliesTo: "زوج‌های متأهل، شرکای ثبت‌شده (eingetragene Partnerschaft)",
    recommended: true,
  },
  {
    id: "single1child",
    name: "مجرد + ۱ فرزند",
    nameDe: "Alleinstehend mit 1 Kind",
    baseAmount: 1510.27,
    perChild: 201.88,
    icon: Baby,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    description:
      "حداقل درآمد خالص ماهانه برای یک والد مجرد با یک فرزند. شامل نرخ مجرد + نرخ هر فرزند.",
    appliesTo: "والدین مجرد، مادران/پدران تنها",
  },
  {
    id: "couple1child",
    name: "متأهل + ۱ فرزند",
    nameDe: "Ehepaar mit 1 Kind",
    baseAmount: 2266.00,
    perChild: 201.88,
    icon: Baby,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    description:
      "حداقل درآمد خالص ماهانه برای زوج متأهل با یک فرزند. شامل نرخ متأهل + نرخ فرزند.",
    appliesTo: "خانواده‌های دارای یک فرزند",
  },
  {
    id: "couple2child",
    name: "متأهل + ۲ فرزند",
    nameDe: "Ehepaar mit 2 Kindern",
    baseAmount: 2467.88,
    perChild: 201.88,
    icon: Baby,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    description:
      "حداقل درآمد خالص ماهانه برای زوج متأهل با دو فرزند. شامل نرخ متأهل + ۲ برابر نرخ فرزند.",
    appliesTo: "خانواده‌های دارای دو فرزند",
  },
  {
    id: "student",
    name: "دانشجو (زیر ۲۴ سال)",
    nameDe: "Studierende unter 24",
    baseAmount: 722.58,
    perChild: 201.88,
    icon: GraduationCap,
    gradient: "from-indigo-600 to-blue-700",
    color: "text-indigo-700",
    description:
      "حداقل درآمد خالص ماهانه برای دانشجویان زیر ۲۴ سال. دانشجویان بالای ۲۴ سال مشمول نرخ مجرد (€۱,۳۰۸.۳۹) هستند.",
    appliesTo: "دانشجویان زیر ۲۴ سال، دانش‌آموزان، خدمات‌دهندگان اجتماعی",
    note: "برای دانشجویان بالای ۲۴ سال، نرخ €۱,۳۰۸.۳۹ اعمال می‌شود.",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "€۱,۳۰۸", label: "نرخ مجرد (۲۰۲۶)", icon: Users },
  { value: "€۲,۰۶۴", label: "نرخ متأهل (۲۰۲۶)", icon: Heart },
  { value: "€۲۰۱.۸۸", label: "هر فرزند اضافه", icon: Baby },
  { value: "€۳۸۶.۴۳", label: "کسر Freie Station", icon: Percent },
];

// ==========================================
// CALCULATION STEPS
// ==========================================
const CALC_STEPS = [
  {
    num: 1,
    title: "محاسبه درآمد خالص ماهانه",
    desc: "درآمد خالص (Netto) پس از کسر مالیات و بیمه اجتماعی. اگر حقوق ۱۳ و ۱۴ ماهه دریافت می‌کنید، مجموع را در ۱۴ ضرب و بر ۱۲ تقسیم کنید.",
    icon: Euro,
    gradient: "from-sky-600 to-blue-700",
  },
  {
    num: 2,
    title: "افزودن درآمدهای اضافی",
    desc: "درآمد اجاره، سود سرمایه‌گذاری، پس‌انداز و دارایی‌های نقدی (تقسیم بر ۱۲). این موارد به درآمد خالص اضافه می‌شوند.",
    icon: TrendingUp,
    gradient: "from-emerald-600 to-teal-700",
  },
  {
    num: 3,
    title: "کسر هزینه‌های جاری (Freie Station)",
    desc: "هزینه‌های ماهانه مانند اجاره، وام و تعهدات مالیاتی. تا سقف €۳۸۶.۴۳ به‌عنوان «Freie Station» از هزینه‌ها کسر می‌شود.",
    icon: Home,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    num: 4,
    title: "مقایسه با نرخ مرجع",
    desc: "درآمد باقی‌مانده باید حداقل برابر با نرخ مرجع (Ausgleichszulagenrichtsatz) برای وضعیت خانوار شما باشد.",
    icon: Scale,
    gradient: "from-rose-600 to-red-700",
  },
];

// ==========================================
// VALID DOCUMENTS
// ==========================================
const DOCUMENTS = [
  {
    icon: FileText,
    title: "فیش حقوقی (Lohnzettel)",
    desc: "حداقل ۳ ماه آخر — جدیدترین فیش‌های حقوقی تاییدشده",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Briefcase,
    title: "قرارداد کار (Dienstvertrag)",
    desc: "قرارداد جاری با ذکر حقوق و مدت اعتبار",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Landmark,
    title: "اظهارنامه مالیاتی (Steuerbescheid)",
    desc: "برای خوداشتغال‌ها و درآمدهای ترکیبی",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Wallet,
    title: "گواهی پس‌انداز بانکی",
    desc: "موجودی حساب بانکی اتریشی (حداقل ۳ ماه سابقه)",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: FileText,
    title: "تاییدیه بیمه (Versicherungsdaten)",
    desc: "سابقه بیمه از ÖGK/SVS به‌عنوان اثبات درآمد",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Key,
    title: "Haftungserklärung",
    desc: "برای موارد خاص — تعهدنامه رسمی شخص ثالث (تاییدشده توسط نوتار)",
    color: "from-stone-500 to-stone-700",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "حداقل درآمد برای تمدید اقامت در اتریش در سال ۲۰۲۶ چقدر است؟",
    a: "بر اساس نرخ‌های رسمی ASVG برای سال ۲۰۲۶: برای افراد مجرد €۱,۳۰۸.۳۹، برای زوج‌های متأهل €۲,۰۶۴.۱۲ و برای هر فرزند €۲۰۱.۸۸ اضافه می‌شود. این مبالغ باید به‌صورت خالص (Netto) ماهانه پس از کسر مالیات و هزینه‌های جاری در دسترس باشند.",
  },
  {
    q: "آیا Freie Station در محاسبه درآمد تأثیر دارد؟",
    a: "بله. Freie Station یک کسر €۳۸۶.۴۳ است که از هزینه‌های جاری ماهانه (مانند اجاره، وام، تعهدات مالی) کسر می‌شود. یعنی اگر هزینه‌های جاری شما €۶۰۰ باشد، فقط €۲۱۳.۵۷ (۶۰۰ منهای ۳۸۶.۴۳) از درآمد شما کسر می‌شود، نه کل €۶۰۰. این کسر به نفع متقاضی است.",
  },
  {
    q: "آیا درآمد ۱۳ و ۱۴ ماهه در محاسبه لحاظ می‌شود؟",
    a: "بله. در اتریش حقوق معمولاً ۱۴ بار در سال پرداخت می‌شود. برای محاسبه درآمد ماهانه، مجموع حقوق سالانه را بر ۱۲ تقسیم می‌کنند. یعنی اگر حقوق ماهانه شما €۱,۵۰۰ خالص باشد، محاسبه می‌شود: (۱,۵۰۰ × ۱۴) ÷ ۱۲ = €۱,۷۵۰ درآمد ماهانه مؤثر.",
  },
  {
    q: "آیا پس‌انداز بانکی به‌عنوان درآمد قابل قبول است؟",
    a: "بله، پس‌انداز بانکی و دارایی‌های نقدی به‌عنوان درآمد قابل قبول هستند، اما با تقسیم بر ۱۲ ماه محاسبه می‌شوند. یعنی اگر €۱۲,۰۰۰ پس‌انداز دارید، این مبلغ به‌عنوان €۱,۰۰۰ درآمد ماهانه اضافی لحاظ می‌شود. پس‌انداز باید در بانک اتریشی یا بانکی با دسترسی از اتریش باشد.",
  },
  {
    q: "اگر درآمد کافی نداشته باشم، چه گزینه‌هایی دارم؟",
    a: "۱) درخواست Haftungserklärung از یک شخص ثالث (معمولاً بستگان نزدیک) که تعهد پرداخت هزینه‌ها را بدهد. ۲) استفاده از پس‌انداز بانکی. ۳) درآمد ترکیبی (درآمد خود + درآمد همسر). ۴) در برخی موارد خاص، درخواست تجدیدنظر و ارائه مدارک تکمیلی. مشاوره با متخصص مهاجرت در این موارد توصیه می‌شود.",
  },
  {
    q: "آیا نرخ‌های درآمد برای همه انواع اقامت یکسان است؟",
    a: "خیر. نرخ‌های بالا برای اکثر اقامت‌ها (Niederlassungsbewilligung، اقامت خانوادگی، تمدید RWR) اعمال می‌شود. اما برای RWR Card و Blue Card EU، نیاز به اثبات حداقل درآمد طبق NAG نیست — بلکه حداقل حقوق €۳,۴۶۵ (خالص ناخالص) برای RWR Card کارمندان کلیدی الزامی است. همچنین دانشجویان زیر ۲۴ سال نرخ کمتری (€۷۲۲.۵۸) دارند.",
  },
  {
    q: "چگونه درآمد خود را برای تمدید اقامت اثبات کنم؟",
    a: "مدارک اصلی شامل: فیش‌های حقوقی ۳ ماه آخر، قرارداد کار، اظهارنامه مالیاتی (برای خوداشتغال‌ها)، گواهی پس‌انداز بانکی و سابقه بیمه (Versicherungsdatenauszug). همه مدارک باید جدید و تاییدشده باشند. برای همسر و فرزندان، مدارک درآمدی آنها نیز لازم است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ResidencyConditionGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("single");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [isMarried, setIsMarried] = useState<boolean>(false);
  const [isStudent, setIsStudent] = useState<boolean>(false);

  const activeCategoryData = useMemo(
    () => INCOME_CATEGORIES.find((c) => c.id === activeCategory)!,
    [activeCategory]
  );

  // ==========================================
  // DYNAMIC CALCULATION
  // ==========================================
  const calculation = useMemo(() => {
    let baseRate = 0;
    let label = "";

    if (isStudent) {
      baseRate = 722.58; // Student under 24
      label = "دانشجو (زیر ۲۴ سال)";
    } else if (isMarried) {
      baseRate = 2064.12;
      label = "زوج متأهل";
    } else {
      baseRate = 1308.39;
      label = "فرد مجرد";
    }

    const childAddition = childrenCount * 201.88;
    const total = baseRate + childAddition;

    // Freie Station deduction
    const freieStation = 386.43;
    const netRequired = total - freieStation;

    return {
      baseRate,
      childAddition,
      total,
      freieStation,
      netRequired,
      label,
      childrenCount,
    };
  }, [isMarried, isStudent, childrenCount]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "محاسبه حداقل درآمد مورد نیاز برای تمدید اقامت در اتریش ۲۰۲۶",
      description:
        "راهنمای گام‌به‌گام محاسبه حداقل درآمد خالص برای تمدید اقامت اتریش بر اساس وضعیت تأهل و تعداد فرزندان — نرخ‌های رسمی ۲۰۲۶.",
      inLanguage: "fa-IR",
      step: CALC_STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.num,
        name: s.title,
        text: s.desc,
      })),
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
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "شرایط درآمدی تمدید اقامت اتریش ۲۰۲۶ — جدول کامل",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      },
      inLanguage: "fa-IR",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  ];

  return (
    <GuideContainer
      title="شرایط درآمدی تمدید اقامت اتریش"
      description="راهنمای جامع حداقل درآمد خالص مورد نیاز برای تمدید اقامت در اتریش بر اساس وضعیت تأهل و تعداد فرزندان — نرخ‌های رسمی ۲۰۲۶"
    >
      <SEO
        title="شرایط درآمدی تمدید اقامت اتریش ۲۰۲۶ | جدول کامل حداقل درآمد"
        description="جدول کامل حداقل درآمد مورد نیاز برای تمدید اقامت در اتریش ۲۰۲۶: مجرد €۱,۳۰۸.۳۹، متأهل €۲,۰۶۴.۱۲، هر فرزند €۲۰۱.۸۸. محاسبه‌گر آنلاین + مدارک مورد نیاز."
        keywords="شرایط درآمدی اقامت اتریش, حداقل درآمد تمدید اقامت, Ausgleichszulagenrichtsatz, درآمد مورد نیاز اقامت اتریش, تمدید اقامت وین, RWR Card درآمد, اقامت اتریش ۲۰۲۶"
        schemaData={seoSchema}
      />

      <div className="space-y-10 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO WITH IMAGE */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #1e3a5f 0, #0f172a 48%, #020617 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="پارلمان اتریش در وین"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#020617]/90 via-[#0f172a]/80 to-[#1e3a5f]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            💶
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              نرخ‌های رسمی ۲۰۲۶ — به‌روز شده
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              چقدر درآمد برای تمدید اقامت اتریش نیاز دارید؟
            </h1>

            <p className="text-sm md:text-base text-sky-100 leading-relaxed max-w-3xl mb-6">
              یکی از دلایل اصلی رد درخواست تمدید اقامت،
              <strong className="text-amber-300"> ناکافی بودن درآمد اثبات‌شده</strong> است. بر اساس
              نرخ‌های رسمی ASVG برای سال ۲۰۲۶، حداقل درآمد خالص ماهانه برای
              <strong className="text-amber-300"> فرد مجرد €۱,۳۰۸.۳۹</strong> و برای
              <strong className="text-amber-300"> زوج متأهل €۲,۰۶۴.۱۲</strong> است.
              با محاسبه‌گر تعاملی ما، وضعیت خود را دقیق بررسی کنید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>نرخ‌های رسمی ASVG ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>محاسبه‌گر تعاملی</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه هزاران فارسی‌زبان</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Calculator className="w-4 h-4" />
                محاسبه درآمد من
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره تخصصی رایگان
              </a>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* QUICK STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-700" />
                </div>
                <div className="text-lg font-black text-sky-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-sky-700 mb-1">
                چرا اثبات درآمد کافی حیاتی است؟
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-sky-700">«تضمین معاش» (gesicherter Lebensunterhalt)</strong> یکی از
                شرایط اصلی برای صدور و تمدید اقامت در اتریش است. مقامات مهاجرت
                (MA 35 در وین) بررسی می‌کنند که درآمد شما کافی باشد تا بدون
                درخواست کمک‌های اجتماعی دولتی زندگی کنید. اگر درآمد اثبات‌شده کمتر
                از نرخ رسمی باشد، درخواست شما ممکن است
                <strong className="text-rose-700"> رد شود</strong> — حتی اگر تمام
                مدارک دیگر کامل باشند.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* INCOME CATEGORIES TABLE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-700" />
              جدول کامل حداقل درآمد ۲۰۲۶ بر اساس وضعیت خانوار
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نرخ‌های رسمی ASVG — همه مبالغ به یورو خالص (Netto) ماهانه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {INCOME_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`relative overflow-hidden rounded-3xl border-2 p-5 text-right transition-all ${
                    isActive
                      ? "border-sky-600 shadow-lg shadow-sky-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  {cat.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2.5 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      پرکاربرد
                    </div>
                  )}
                  <div className={`absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br ${cat.gradient} opacity-[0.08] rounded-full`} />

                  <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-md mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="relative">
                    <h3 className="text-sm font-black text-stone-900 mb-0.5">
                      {cat.name}
                    </h3>
                    <div className="text-[10px] text-stone-400 font-bold font-mono mb-3" dir="ltr">
                      {cat.nameDe}
                    </div>

                    <div className="flex items-end gap-1 mb-2">
                      <span className={`text-3xl font-black font-mono ${isActive ? cat.color : "text-stone-800"}`} dir="ltr">
                        €{cat.baseAmount.toLocaleString("de-AT", { minimumFractionDigits: 0 })}
                      </span>
                      <span className="text-[10px] text-stone-500 font-bold mb-1.5">/ ماه</span>
                    </div>

                    <div className="text-[10px] text-stone-500 font-bold leading-snug mb-3">
                      {cat.description}
                    </div>

                    <div className="bg-stone-50 border border-stone-100 rounded-xl p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-stone-600">
                        <Users className="w-3 h-3 text-stone-400" />
                        {cat.appliesTo}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active category detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mt-5 relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                  <img
                    src={
                      activeCategory === "student"
                        ? IMAGES.documents
                        : activeCategory === "single"
                        ? IMAGES.office
                        : IMAGES.family
                    }
                    alt={activeCategoryData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeCategoryData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <Euro className="w-3 h-3 text-sky-700" />
                    {activeCategoryData.name}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">حداقل درآمد ماهانه</div>
                    <div className="text-2xl font-black text-white leading-tight font-mono" dir="ltr">
                      €{activeCategoryData.baseAmount.toLocaleString("de-AT", { minimumFractionDigits: 0 })}
                    </div>
                    <div className="text-[9px] text-white/70 font-bold mt-0.5">Netto pro Monat</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-black text-stone-900 mb-3">
                    {activeCategoryData.name}
                  </h3>
                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeCategoryData.description}
                  </p>

                  {/* Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between bg-stone-50 border border-stone-100 rounded-xl px-3 py-2.5">
                      <span className="text-[11px] font-black text-stone-600 flex items-center gap-1.5">
                        <Euro className="w-3.5 h-3.5 text-sky-600" />
                        نرخ پایه
                      </span>
                      <span className="text-sm font-black text-sky-700 font-mono" dir="ltr">
                        €{activeCategoryData.baseAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-stone-50 border border-stone-100 rounded-xl px-3 py-2.5">
                      <span className="text-[11px] font-black text-stone-600 flex items-center gap-1.5">
                        <Baby className="w-3.5 h-3.5 text-amber-600" />
                        هر فرزند اضافه
                      </span>
                      <span className="text-sm font-black text-amber-700 font-mono" dir="ltr">
                        +€{activeCategoryData.perChild.toFixed(2)}
                      </span>
                    </div>
                    {activeCategoryData.note && (
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-[10px] text-amber-800 font-bold leading-snug">
                          {activeCategoryData.note}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3">
                    <div className="text-[10px] font-black text-sky-700 mb-1">مناسب برای:</div>
                    <div className="text-[10px] text-sky-800 font-bold leading-snug">
                      {activeCategoryData.appliesTo}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* INTERACTIVE CALCULATOR */}
        {/* ========================================== */}
        <div id="calculator" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-700" />
              محاسبه‌گر حداقل درآمد من
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              وضعیت خود را انتخاب کنید تا حداقل درآمد مورد نیاز محاسبه شود
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Input panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-5">

              {/* Married status */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-sky-700" />
                  وضعیت تأهل
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: false, label: "مجرد", icon: Users, desc: "بدون همسر" },
                    { id: true, label: "متأهل", icon: Heart, desc: "با همسر" },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isActive = isMarried === opt.id;
                    return (
                      <button
                        key={String(opt.id)}
                        onClick={() => setIsMarried(opt.id)}
                        className={`relative overflow-hidden rounded-2xl border-2 p-3 text-right transition-all ${
                          isActive
                            ? "border-sky-600 bg-sky-50/50 shadow-md"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isActive ? "text-sky-700" : "text-stone-400"}`} />
                        <div className="text-xs font-black text-stone-900">{opt.label}</div>
                        <div className="text-[9px] text-stone-500 font-bold mt-0.5">{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Student status */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-700" />
                  آیا دانشجو هستید؟
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: false, label: "خیر", desc: "نرخ عادی" },
                    { id: true, label: "بله (زیر ۲۴ سال)", desc: "نرخ دانشجویی" },
                  ].map((opt) => {
                    const isActive = isStudent === opt.id;
                    return (
                      <button
                        key={String(opt.id)}
                        onClick={() => setIsStudent(opt.id)}
                        className={`rounded-2xl border-2 p-3 text-right transition-all ${
                          isActive
                            ? "border-sky-600 bg-sky-50/50 shadow-md"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <div className="text-xs font-black text-stone-900">{opt.label}</div>
                        <div className="text-[9px] text-stone-500 font-bold mt-0.5">{opt.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Children count */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-sky-700" />
                    تعداد فرزندان
                  </span>
                  <span className="text-sm font-black text-sky-700 font-mono" dir="ltr">
                    {childrenCount} {childrenCount === 1 ? "child" : "children"}
                  </span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setChildrenCount(n)}
                      className={`rounded-2xl border-2 py-3 text-center transition-all ${
                        childrenCount === n
                          ? "border-sky-600 bg-sky-50/50 shadow-md"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className={`text-lg font-black ${childrenCount === n ? "text-sky-700" : "text-stone-700"}`}>
                        {n}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                  <strong>Freie Station:</strong> در محاسبه نهایی، مبلغ €۳۸۶.۴۳ از
                  هزینه‌های جاری ماهانه (اجاره، وام و...) به‌عنوان کسر در نظر
                  گرفته می‌شود. این مبلغ در نتیجه نهایی اعمال شده است.
                </p>
              </div>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${isMarried}-${isStudent}-${childrenCount}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#020617]"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      <Target className="w-3 h-3 text-amber-300" />
                      حداقل درآمد مورد نیاز شما
                    </div>

                    <div className="text-[10px] font-black text-white/70 mb-1">
                      {calculation.label} {childrenCount > 0 ? `+ ${childrenCount} فرزند` : ""}
                    </div>
                    <div className="text-4xl md:text-5xl font-black leading-none mb-1 font-mono text-emerald-300" dir="ltr">
                      €{calculation.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-bold text-white/60 mb-5">
                      حداقل درآمد خالص ماهانه (قبل از Freie Station)
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 mb-5 pt-4 border-t border-white/15">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Euro className="w-3 h-3" />
                          نرخ پایه ({calculation.label})
                        </span>
                        <span className="font-black font-mono" dir="ltr">
                          €{calculation.baseRate.toFixed(2)}
                        </span>
                      </div>
                      {childrenCount > 0 && (
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-white/70 flex items-center gap-1.5">
                            <Baby className="w-3 h-3" />
                            {childrenCount} فرزند × €۲۰۱.۸۸
                          </span>
                          <span className="font-black font-mono text-amber-300" dir="ltr">
                            +€{calculation.childAddition.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/15">
                        <span className="font-black text-white/90 flex items-center gap-1.5">
                          <Calculator className="w-3 h-3" />
                          مجموع
                        </span>
                        <span className="font-black font-mono text-emerald-300" dir="ltr">
                          €{calculation.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Percent className="w-3 h-3" />
                          کسر Freie Station
                        </span>
                        <span className="font-black font-mono text-rose-300" dir="ltr">
                          −€{calculation.freieStation.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Final calculation */}
                    <div className="bg-white/10 border border-white/15 rounded-2xl p-4 mb-4">
                      <div className="text-[9px] font-black text-white/60 mb-1">
                        پس از کسر هزینه‌های جاری
                      </div>
                      <div className="text-2xl font-black text-white font-mono mb-1" dir="ltr">
                        €{calculation.netRequired.toFixed(2)}
                      </div>
                      <p className="text-[10px] text-white/80 font-bold leading-relaxed">
                        این مبلغ حداقل درآمد خالص مورد نیاز پس از کسر
                        €۳۸۶.۴۳ هزینه‌های جاری است. اگر هزینه‌های جاری شما
                        بیشتر باشد، مبلغ نهایی بیشتر خواهد بود.
                      </p>
                    </div>

                    <div className="bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm rounded-2xl p-3 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-amber-300 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-100 font-bold leading-relaxed">
                        <strong>نکته:</strong> برای RWR Card و Blue Card EU،
                        نیاز به اثبات این مبالغ نیست — بلکه حداقل حقوق
                        €۳,۴۶۵ (بروتو) برای کارمندان کلیدی الزامی است.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 4 CALCULATION STEPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-700" />
              روش محاسبه درآمد (۴ گام رسمی)
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس فرمول رسمی NAG و ASVG — همان روشی که MA 35 استفاده می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CALC_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-5 h-5 rounded-lg bg-gradient-to-br ${step.gradient} text-white text-[9px] font-black flex items-center justify-center`}>
                          {step.num}
                        </span>
                        <h3 className="text-xs font-black text-stone-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* REQUIRED DOCUMENTS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-700" />
              مدارک مورد نیاز برای اثبات درآمد
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چک‌لیست کامل — قبل از مراجعه به MA 35 آماده کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DOCUMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1">
                    {d.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {d.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-700" />
              مسیر اثبات درآمد — سه گام کلیدی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از جمع‌آوری مدارک تا تایید نهایی MA 35
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.documents,
                title: "جمع‌آوری مدارک",
                subtitle: "گام اول",
                desc: "فیش‌های حقوقی ۳ ماه آخر، قرارداد کار، گواهی پس‌انداز بانکی و سابقه بیمه را آماده کنید.",
                icon: FileText,
                gradient: "from-sky-600 to-blue-700",
                stat: "۳ ماه",
              },
              {
                img: IMAGES.office,
                title: "محاسبه درآمد",
                subtitle: "گام دوم",
                desc: "با فرمول رسمی ASVG، درآمد خالص ماهانه خود را محاسبه کنید و با نرخ مرجع مقایسه نمایید.",
                icon: Calculator,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۴ گام",
              },
              {
                img: IMAGES.vienna,
                title: "ارسال به MA 35",
                subtitle: "گام سوم",
                desc: "مدارک کامل را به اداره مهاجرت وین (MA 35) ارسال کنید. پاسخ معمولاً ۴-۸ هفته طول می‌کشد.",
                icon: Building2,
                gradient: "from-amber-500 to-orange-600",
                stat: "۴-۸ هفته",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {c.stat}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">
                        {c.subtitle}
                      </div>
                      <div className="text-sm font-black text-white leading-tight">
                        {c.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-700" />
              سوالات متداول درباره شرایط درآمدی اقامت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان
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
        {/* CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی تمدید اقامت
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              درآمد شما برای تمدید اقامت کافی است؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش می‌تواند در محاسبه دقیق
              درآمد، آماده‌سازی مدارک و جلوگیری از رد درخواست شما را راهنمایی کند.
              همین حالا پیام دهید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                پاسخ در کمتر از ۲۴ ساعت
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                خدمات داوطلبانه
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                کاملاً محرمانه
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
              نرخ‌های درآمدی ذکرشده بر اساس قوانین ASVG و NAG برای سال ۲۰۲۶
              استخراج شده است. این مبالغ هر سال در ژانویه به‌روزرسانی می‌شوند.
              محاسبه نهایی درآمد توسط مقامات MA 35 انجام می‌شود و ممکن است
              بسته به شرایط فردی متفاوت باشد. برای تصمیم‌های نهایی، همیشه با
              مقامات رسمی یا مشاوران مهاجرت واجد شرایط مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </GuideContainer>
  );
};

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
        isOpen ? "border-sky-300 bg-sky-50/30 shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-sky-600 to-indigo-700 text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
            {q}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-sky-700" : ""
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

export default ResidencyConditionGuide;