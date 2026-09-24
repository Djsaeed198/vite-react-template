import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap, FileCheck, Building2, Clock, Euro, Award, Users,
  CheckCircle, AlertCircle, Info, ChevronDown, ChevronLeft,
  Sparkles, Shield, Zap, Globe, Landmark, BookOpen, FileText,
  Scale, Stethoscope, Briefcase, Heart, ArrowUpRight, Copy,
  Star, TrendingUp, MapPin, PhoneCall, Send, Quote, Layers,
  BookMarked, BadgeCheck, FileSearch, Languages, University,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  university: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80",
  documents: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type Path = {
  id: string;
  title: string;
  subtitle: string;
  authority: string;
  authorityFull: string;
  duration: string;
  fee: string;
  languages: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  appliesTo: string[];
  steps: string[];
  tips: string[];
  link: string;
};

// ==========================================
// PATHS OF NOSTRIFICATION
// ==========================================
const PATHS: Path[] = [
  {
    id: "bachelor-master",
    title: "معادل‌سازی مدارک دانشگاهی",
    subtitle: "Bachelor / Master / PhD",
    authority: "ENIC NARIC AUSTRIA",
    authorityFull: "مرکز اطلاعات ملی مدارک تحصیلی اتریش",
    duration: "۴ تا ۱۲ هفته",
    fee: "€۰ تا €۱۵۰",
    languages: "آلمانی / انگلیسی",
    icon: University,
    color: "text-indigo-700",
    gradient: "from-indigo-600 to-blue-700",
    description:
      "برای دارندگان مدرک کارشناسی، کارشناسی ارشد و دکترا از دانشگاه‌های معتبر ایران. ENIC NARIC AUSTRIA مرجع رسمی ارزیابی مدارک دانشگاهی در اتریش است. این مرکز مدرک شما را با سیستم آموزشی اتریش مقایسه کرده و «گواهی معادل‌سازی» (Gleichwertigkeitsbescheinigung) صادر می‌کند.",
    appliesTo: ["کارشناسی", "کارشناسی ارشد", "دکترا", "دیپلم‌های دانشگاهی"],
    steps: [
      "تهیه ترجمه رسمی آلمانی از مدرک و ریزنمرات (مترجم سوگند خورده)",
      "تایید ترجمه توسط دادگستری ایران و وزارت خارجه",
      "ثبت درخواست آنلاین در پورتال ENIC NARIC",
      "پرداخت هزینه و بارگذاری اسناد",
      "انتظار برای ارزیابی (۴ تا ۱۲ هفته)",
      "دریافت گواهی Gleichwertigkeit",
    ],
    tips: [
      "ترجمه‌ها حتماً باید توسط مترجم رسمی مورد تایید سفارت اتریش باشد",
      "ریزنمرات دقیق و کامل، شانس معادل‌سازی را افزایش می‌دهد",
      "برای مدارک پزشکی، مسیر متفاوتی وجود دارد (به بخش زیر مراجعه کنید)",
    ],
    link: "https://www.aac.at/en/recognition",
  },
  {
    id: "medical",
    title: "معادل‌سازی مدارک پزشکی",
    subtitle: "پزشکی، داروسازی، دندانپزشکی، پرستاری",
    authority: "Gesundheitsministerium",
    authorityFull: "وزارت بهداشت اتریش",
    duration: "۳ تا ۱۲ ماه",
    fee: "€۱۵۰ تا €۸۰۰",
    languages: "آلمانی (الزامی)",
    icon: Stethoscope,
    color: "text-rose-700",
    gradient: "from-rose-600 to-red-700",
    description:
      "مدارک گروه پزشکی (پزشک، پرستار، ماما، داروساز) تابع وزارت بهداشت اتریش هستند، نه ENIC NARIC. این مسیر پیچیده‌تر است و معمولاً نیازمند آزمون زبان آلمانی B2/C1 و امکان آزمون دانش تخصصی دارد. برای پزشکان، پروسه اغلب شامل دوره‌های جبرانی و آزمون است.",
    appliesTo: ["پزشک عمومی", "پزشک متخصص", "دندانپزشک", "داروساز", "پرستار", "ماما"],
    steps: [
      "ارزیابی اولیه توسط وزارت بهداشت (Gesundheitsministerium)",
      "مدرک زبان آلمانی B2 یا C1 (ÖSD, Goethe)",
      "شرکت در آزمون دانش تخصصی (Fachprüfung)",
      "دوره جبرانی در صورت نیاز (Anpassungslehrgang)",
      "ثبت‌نام در Fachhochschule یا دانشگاه مربوطه",
      "دریافت پروانه فعالیت (Berufsberechtigung)",
    ],
    tips: [
      "پروسه پزشکی می‌تواند تا ۲ سال طول بکشد — برنامه‌ریزی مالی ضروری است",
      "یادگیری آلمانی پزشکی از همان ابتدا در ایران شروع کنید",
      "برای پرستاری، مسیر کوتاه‌تر است (معمولاً ۶ تا ۱۲ ماه)",
    ],
    link: "https://www.sozialministerium.at",
  },
  {
    id: "vocational",
    title: "معادل‌سازی مدارک فنی‌وحرفه‌ای",
    subtitle: "دیپلم فنی، کاردانی، مهارت‌های شغلی",
    authority: "AMS / Wirtschaftskammer",
    authorityFull: "سازمان کار و اتاق بازرگانی اتریش",
    duration: "۲ تا ۶ ماه",
    fee: "€۵۰ تا €۳۰۰",
    languages: "آلمانی",
    icon: Briefcase,
    color: "text-emerald-700",
    gradient: "from-emerald-600 to-teal-700",
    description:
      "برای دارندگان دیپلم فنی‌وحرفه‌ای، کاردانی یا مهارت‌های شغلی خاص (آشپز، برق‌کار، مکانیک، آرایشگر و...). این مسیر معمولاً از طریق AMS یا Wirtschaftskammer انجام می‌شود و می‌تواند شامل آزمون عملی یا دوره‌های جبرانی باشد.",
    appliesTo: ["دیپلم فنی‌وحرفه‌ای", "کاردانی", "مهارت‌های شغلی", "گواهی‌نامه‌های حرفه‌ای"],
    steps: [
      "دریافت ارزیابی اولیه از AMS یا Wirtschaftskammer",
      "ترجمه رسمی مدارک و گواهی‌های شغلی",
      "احراز مهارت زبان آلمانی (معمولاً A2 تا B1)",
      "شرکت در آزمون عملی یا تئوری در صورت نیاز",
      "دوره جبرانی برای تطبیق با استانداردهای اتریش",
      "دریافت گواهی معادل‌سازی شغلی (Lehrabschlussprüfung)",
    ],
    tips: [
      "سابقه کار در ایران می‌تواند در ارزیابی موثر باشد — مدارک را نگه دارید",
      "برای مشاغل قانون‌محور (وکالت، حسابداری) مسیر متفاوتی وجود دارد",
      "آزمون‌های Wirtschaftskammer معمولاً به زبان آلمانی فنی برگزار می‌شود",
    ],
    link: "https://www.wko.at",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۲ مسیر", label: "ENIC NARIC / وزارت بهداشت", icon: Layers },
  { value: "۸ هفته", label: "میانگین زمان ارزیابی", icon: Clock },
  { value: "€۱۵۰", label: "هزینه استاندارد ENIC", icon: Euro },
  { value: "۵ سال", label: "اعتبار گواهی معادل‌سازی", icon: BadgeCheck },
];

// ==========================================
// REQUIRED DOCUMENTS
// ==========================================
const DOCUMENTS = [
  {
    icon: FileText,
    title: "مدرک تحصیلی اصلی",
    desc: "اصل مدرک به همراه ترجمه رسمی آلمانی مورد تایید سفارت",
    color: "from-indigo-500 to-blue-600",
  },
  {
    icon: BookMarked,
    title: "ریزنمرات تفصیلی",
    desc: "لیست تمام دروس، نمرات و تعداد واحدها به‌همراه ترجمه",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Languages,
    title: "مدرک زبان",
    desc: "معمولاً آلمانی B1 یا B2 — برای ENIC ضروری نیست اما برای طبابت لازم است",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Users,
    title: "پاسپورت و مدارک هویتی",
    desc: "کپی برابر اصل پاسپورت و اجازه اقامت اتریش",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: FileCheck,
    title: "تاییدیه‌های رسمی",
    desc: "تایید دادگستری ایران + وزارت خارجه + سفارت اتریش",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: FileSearch,
    title: "توضیح برنامه درسی",
    desc: "در صورت وجود، دیپلم ساپلمنت یا توضیح محتوای دروس",
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// COMMON MISTAKES
// ==========================================
const MISTAKES = [
  {
    icon: AlertCircle,
    title: "ترجمه غیررسمی",
    text: "استفاده از مترجم‌های غیررسمی یا بدون تایید دادگستری، درخواست را باطل می‌کند.",
  },
  {
    icon: AlertCircle,
    title: "نبود مهر تایید سفارت",
    text: "بدون مهر تایید سفارت اتریش در تهران، مدارک پذیرفته نمی‌شوند.",
  },
  {
    icon: AlertCircle,
    title: "نادیده گرفتن ریزنمرات",
    text: "ارسال مدرک بدون ریزنمرات تفصیلی، منجر به رد یا تاخیر طولانی می‌شود.",
  },
  {
    icon: AlertCircle,
    title: "شروع دیرهنگام پروسه",
    text: "برای مدارک پزشکی، پروسه تا ۲ سال طول می‌کشد — منتظر نمانید.",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا نوستریفیکاسیون برای همه مشاغل ضروری است؟",
    a: "خیر. برای مشاغل آزاد مانند برنامه‌نویسی، طراحی گرافیک یا فریلنسری، معمولاً نیازی به نوستریفیکاسیون نیست. اما برای مشاغل قانون‌محور (پزشکی، حقوق، مهندسی عمران، حسابداری رسمی) و استخدام‌های دولتی، مدرک معادل‌سازی الزامی است.",
  },
  {
    q: "چقدر طول می‌کشد تا مدرک من نوستریفی شود؟",
    a: "برای مدارک دانشگاهی از طریق ENIC NARIC، معمولاً ۴ تا ۱۲ هفته. برای مدارک پزشکی، بین ۳ ماه تا ۲ سال بسته به رشته و سطح زبان. برای مدارک فنی‌وحرفه‌ای، ۲ تا ۶ ماه.",
  },
  {
    q: "آیا گواهی معادل‌سازی اعتبار زمانی دارد؟",
    a: "گواهی‌های ENIC NARIC معمولاً اعتبار محدود ندارند اما برخی ارگان‌ها (مانند دانشگاه‌ها) ممکن است گواهی جدیدتری درخواست کنند. برای پروانه‌های فعالیت پزشکی، اعتبار معمولاً ۵ ساله است.",
  },
  {
    q: "اگر مدرک من رد شود، چه می‌شود؟",
    a: "در صورت رد، می‌توانید درخواست تجدیدنظر (Beschwerde) بدهید یا مدارک تکمیلی ارسال کنید. در برخی موارد، پیشنهاد می‌شود دوره جبرانی (Anpassungslehrgang) بگذرانید یا در آزمون جبرانی شرکت کنید.",
  },
  {
    q: "هزینه کل نوستریفیکاسیون چقدر است؟",
    a: "هزینه مستقیم ENIC NARIC حدود ۱۵۰ یورو است. اما هزینه‌های جانبی شامل ترجمه رسمی (۵۰ تا ۲۰۰ یورو)، تاییدیه دادگستری و سفارت (۵۰ تا ۱۰۰ یورو) و در صورت نیاز دوره‌های جبرانی (۵۰۰ تا ۳۰۰۰ یورو) می‌تواند بسیار بیشتر باشد.",
  },
  {
    q: "آیا می‌توانم در ایران پروسه را شروع کنم؟",
    a: "بله. ترجمه رسمی، تایید دادگستری و تایید سفارت اتریش را می‌توانید از ایران انجام دهید. اما ثبت نهایی درخواست ENIC NARIC نیازمند آدرس اتریش یا شخص نماینده است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const NostrificationGuide: React.FC = () => {
  const [activePath, setActivePath] = useState<string>("bachelor-master");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState<string | null>(null);

  const activePathData = useMemo(
    () => PATHS.find((p) => p.id === activePath)!,
    [activePath]
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success("کپی شد!");
    setTimeout(() => setCopied(null), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای کامل نوستریفیکاسیون مدارک در اتریش",
      description:
        "راهنمای گام‌به‌گام معادل‌سازی مدارک تحصیلی و حرفه‌ای در اتریش (Nostrifikation) از طریق ENIC NARIC و وزارت بهداشت.",
      inLanguage: "fa-IR",
      totalTime: "P8W",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: 150 },
      step: PATHS[0].steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s,
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
      headline: "نوستریفیکاسیون مدارک در اتریش — راهنمای ۲۰۲۵",
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
      title="راهنمای نوستریفیکاسیون مدارک در اتریش"
      description="راهنمای جامع معادل‌سازی مدارک تحصیلی، پزشکی و فنی‌وحرفه‌ای در اتریش از طریق ENIC NARIC و وزارت بهداشت"
    >
      <SEO
        title="نوستریفیکاسیون مدارک در اتریش ۲۰۲۵ | راهنمای کامل معادل‌سازی"
        description="راهنمای گام‌به‌گام معادل‌سازی مدارک تحصیلی، پزشکی و فنی‌وحرفه‌ای در اتریش از طریق ENIC NARIC Austria، وزارت بهداشت و Wirtschaftskammer. هزینه، زمان و مدارک مورد نیاز."
        keywords="نوستریفیکاسیون, معادل‌سازی مدارک اتریش, ENIC NARIC, Gleichwertigkeit, معادل‌سازی مدرک پزشکی اتریش, نوستری اتریش, تحصیل در اتریش, مهاجرت اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-10 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #1e40af 0, #1e1b4b 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="دانشگاه در اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#0f172a]/85 via-[#1e1b4b]/75 to-[#1e40af]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🎓
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای رسمی معادل‌سازی مدارک
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              مدرک شما در اتریش معتبر است؟ راهنمای نوستریفیکاسیون
            </h1>

            <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-6">
              اگر قصد کار، تحصیل یا فعالیت حرفه‌ای در اتریش را دارید، اولین قدم
              <strong className="text-amber-300"> نوستریفیکاسیون (Nostrifikation)</strong> یا همان معادل‌سازی مدارک
              است. در این راهنمای جامع، سه مسیر اصلی معادل‌سازی، هزینه‌ها، زمان‌بندی و
              اشتباهات رایج را بر اساس آخرین قوانین سال ۲۰۲۵ بررسی می‌کنیم.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۳ مسیر اصلی</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>داده‌های رسمی ۲۰۲۵</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه هزاران فارسی‌زبان</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#paths"
                className="inline-flex items-center gap-2 bg-white text-[#1e40af] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Layers className="w-4 h-4" />
                مشاهده مسیرها
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-lg font-black text-indigo-600">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* PATH SELECTOR */}
        {/* ========================================== */}
        <div id="paths" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              سه مسیر اصلی نوستریفیکاسیون
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بسته به نوع مدرک شما، مسیر متفاوتی وجود دارد — روی هرکدام کلیک کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {PATHS.map((p) => {
              const Icon = p.icon;
              const isActive = activePath === p.id;
              return (
                <motion.button
                  key={p.id}
                  onClick={() => setActivePath(p.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-4 text-right transition-all ${
                    isActive
                      ? "border-indigo-600 shadow-lg shadow-indigo-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${p.gradient} opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-md mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative text-xs font-black text-stone-900 leading-tight">
                    {p.title}
                  </div>
                  <div className="relative text-[9px] text-stone-500 font-bold mt-1">
                    {p.subtitle}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active path hero card with image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white mb-4"
            >
              <div className="grid md:grid-cols-5">
                {/* Image */}
                <div className="relative md:col-span-2 h-56 md:h-auto min-h-[260px] overflow-hidden">
                  <img
                    src={
                      activePath === "medical"
                        ? IMAGES.documents
                        : activePath === "vocational"
                        ? IMAGES.vienna
                        : IMAGES.university
                    }
                    alt={activePathData.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activePathData.gradient} opacity-40 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <MapPin className="w-3 h-3 text-indigo-600" />
                    اتریش · {activePathData.languages}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">مرجع رسمی</div>
                    <div className="text-xs font-black text-white leading-tight">
                      {activePathData.authorityFull}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activePathData.color} mb-3`}>
                    <Zap className="w-3 h-3" />
                    {activePathData.authority}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    {activePathData.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activePathData.description}
                  </p>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Clock className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">مدت زمان</div>
                      <div className="text-[11px] font-black text-stone-800 leading-tight">
                        {activePathData.duration}
                      </div>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Euro className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">هزینه</div>
                      <div className="text-[11px] font-black text-stone-800 leading-tight">
                        {activePathData.fee}
                      </div>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Languages className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">زبان</div>
                      <div className="text-[11px] font-black text-stone-800 leading-tight">
                        {activePathData.languages}
                      </div>
                    </div>
                  </div>

                  {/* Applies to */}
                  <div className="mb-5">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      این مسیر برای چه کسانی است؟
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activePathData.appliesTo.map((a, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-black text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={activePathData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 bg-gradient-to-br ${activePathData.gradient} text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all`}
                  >
                    <Globe className="w-4 h-4" />
                    وب‌سایت رسمی {activePathData.authority}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Steps + Tips */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePath}-steps`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {/* Steps */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6">
                <h4 className="text-sm font-black text-stone-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  مراحل گام‌به‌گام
                </h4>
                <ol className="space-y-3">
                  {activePathData.steps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${activePathData.gradient} text-white text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {i + 1}
                      </span>
                      <span className="text-[11px] text-stone-700 font-bold leading-relaxed">
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
                <h4 className="relative text-sm font-black text-amber-900 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600 fill-current" />
                  نکات کلیدی و طلایی
                </h4>
                <ul className="relative space-y-3">
                  {activePathData.tips.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-amber-900 font-bold leading-relaxed">
                        {tip}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* REQUIRED DOCUMENTS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-indigo-600" />
              مدارک مورد نیاز
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چک‌لیست کامل — قبل از شروع پروسه، همه را آماده کنید
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
        {/* INSIGHT BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 border border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-indigo-700 mb-1">
                نکته کلیدی اتریش‌نشین
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-indigo-700">نوستریفیکاسیون یک مسابقه سرعت نیست، بلکه یک ماراتن است.</strong> مهم‌ترین
                نکته این است که پیش از هر اقدامی، مدارک خود را در ایران کامل و
                تاییدشده آماده کنید. در بیش از ۸۰٪ مواردی که درخواست‌ها رد می‌شوند،
                مشکل در مرحله ترجمه یا تاییدیه‌های سفارت است — نه خود مدرک. پس با حوصله
                و دقیق شروع کنید.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* COMMON MISTAKES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              اشتباهات رایج که باید از آن‌ها دوری کنید
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس تجربه هزاران فارسی‌زبان که پروسه را گذرانده‌اند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {MISTAKES.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-rose-900 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-[10px] text-rose-800 font-bold leading-relaxed">
                      {m.text}
                    </p>
                  </div>
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
              <Globe className="w-5 h-5 text-indigo-600" />
              مسیرهای نوستریفیکاسیون در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              سه تصویر، سه تجربه متفاوت از معادل‌سازی مدارک
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.university,
                title: "مسیر دانشگاهی",
                subtitle: "ENIC NARIC Austria",
                desc: "معادل‌سازی کارشناسی، ارشد و دکترا از طریق مرکز رسمی ارزیابی مدارک تحصیلی.",
                icon: University,
                gradient: "from-indigo-600 to-blue-700",
                stat: "۴ تا ۱۲ هفته",
              },
              {
                img: IMAGES.documents,
                title: "مسیر پزشکی",
                subtitle: "وزارت بهداشت اتریش",
                desc: "پزشکان، پرستاران و داروسازان — نیازمند زبان آلمانی و آزمون تخصصی.",
                icon: Stethoscope,
                gradient: "from-rose-600 to-red-700",
                stat: "۳ تا ۱۲ ماه",
              },
              {
                img: IMAGES.vienna,
                title: "مسیر فنی‌وحرفه‌ای",
                subtitle: "Wirtschaftskammer",
                desc: "دیپلم‌های فنی، کاردانی و مهارت‌های شغلی از طریق اتاق بازرگانی اتریش.",
                icon: Briefcase,
                gradient: "from-emerald-600 to-teal-700",
                stat: "۲ تا ۶ ماه",
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
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-40 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Clock className="w-3 h-3" />
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
              <Info className="w-5 h-5 text-indigo-600" />
              سوالات متداول درباره نوستریفیکاسیون
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی نوستریفیکاسیون
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              مطمئن نیستید از کجا شروع کنید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته و همکاری با متخصصان ایرانی در اتریش،
              می‌تواند مسیر نوستریفیکاسیون شما را شخصی‌سازی کند. همین حالا پیام دهید.
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
              اطلاعات ارائه‌شده بر اساس آخرین قوانین سال ۲۰۲۵ و تجربه‌های زیسته
              فارسی‌زبانان در اتریش است. با این حال، قوانین و رویه‌های اداری ممکن
              است تغییر کنند. برای تصمیم‌های نهایی، همیشه با مراجع رسمی مانند
              ENIC NARIC Austria، وزارت بهداشت یا مشاوران واجد شرایط مشورت کنید.
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
        isOpen ? "border-indigo-300 bg-indigo-50/30 shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white"
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
            isOpen ? "rotate-180 text-indigo-600" : ""
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

export default NostrificationGuide;