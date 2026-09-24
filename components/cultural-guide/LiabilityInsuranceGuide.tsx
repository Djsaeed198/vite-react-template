import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, Shield, AlertTriangle, CheckCircle, XCircle, Info,
  HelpCircle, ChevronDown, ChevronLeft, ExternalLink, MessageCircle,
  Send, Handshake, Heart, Award, Users, Star, TrendingUp, Clock,
  FileText, Scale, Gavel, Wallet, Banknote, Calculator, PieChart,
  BarChart3, Target, Zap, Sparkles, Lightbulb, ListChecks, Trophy,
  Building2, Home, Car, Bike, Dog, Plane, Umbrella, Lock, Key,
  Smartphone, Laptop, GlassWater, Flame, Snowflake, Wind, Droplets,
  Sun, TreePine, Utensils, Coffee, Baby, GraduationCap, Briefcase,
  Globe, MapPin, Phone, Mail, Calendar, Download, Eye, Filter,
  SlidersHorizontal, RefreshCw, ArrowRight, ArrowLeft, Grid3x3, List,
  X, Search, Crown, Gem, Rocket, ThumbsUp, HeartHandshake, UserCheck,
  ShieldAlert, FileCheck, ClipboardList, BookMarked, Scale as ScaleIcon,
  Landmark, Wallet as WalletIcon, CircleDollarSign, TrendingDown,
  AlertCircle, BookOpen, Activity, Star as StarIcon, CheckSquare, Square,
  Euro
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES (Unsplash)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    title: "حفاظت مالی در برابر خسارات ناخواسته",
    caption: "بیمه مسئولیت مدنی، سپری در برابر ادعاهای مالی سنگین و غیرمنتظره",
    icon: ShieldCheck,
    tag: "حفاظت",
  },
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    title: "پوشش روزمره زندگی و ورزش",
    caption: "از آسیب‌های اسکی و دوچرخه‌سواری تا خسارات ناشی از آب در آپارتمان",
    icon: Bike,
    tag: "روزمره",
  },
  {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    title: "حمایت حقوقی و قانونی",
    caption: "دفاع در برابر ادعاهای ناحق و پوشش هزینه‌های وکیل و دادگاه",
    icon: Scale,
    tag: "حقوقی",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "از ۳€", label: "شروع قیمت ماهانه", icon: Euro },
  { value: "۳M€", label: "پوشش توصیه شده", icon: ShieldCheck },
  { value: "۵", label: "شرکت بیمه برتر", icon: Building2 },
  { value: "۱۰۰٪", label: "پوشش خانواده", icon: Users },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق منابع VVO و FMA", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "راهنمای رایگان", color: "text-rose-600" },
  { icon: Award, text: "توسط متخصصان", color: "text-indigo-600" },
];

// ==========================================
// INSURANCE PROVIDERS
// ==========================================
const INSURANCE_PROVIDERS = [
  {
    id: "uniqa",
    name: "UNIQA",
    fullName: "UNIQA Österreich Versicherungen AG",
    marketShare: "۲۸٪",
    rank: 1,
    color: "from-blue-600 to-indigo-700",
    bg: "bg-blue-50",
    text: "text-blue-700",
    strength: "بزرگ‌ترین ارائه‌دهنده بیمه خصوصی اتریش با پشتیبانی انگلیسی",
    coverage: "تا ۵ میلیون یورو",
    price: "از ۱۲€/ماه",
    bestFor: "خانواده‌ها و مقیمان جدید",
    icon: Crown,
  },
  {
    id: "allianz",
    name: "Allianz",
    fullName: "Allianz Elementar Versicherungs-AG",
    marketShare: "۹.۵٪",
    rank: 2,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    strength: "پوشش جهانی و خط تلفن اضطراری ۲۴/۷ به زبان انگلیسی",
    coverage: "تا ۱۰ میلیون یورو (پرمیوم)",
    price: "از ۱۵€/ماه",
    bestFor: "افراد با سفرهای بین‌المللی",
    icon: Globe,
  },
  {
    id: "wiener",
    name: "Wiener Städtische",
    fullName: "Wiener Städtische Versicherung AG",
    marketShare: "۱۴.۲٪",
    rank: 3,
    color: "from-red-600 to-rose-700",
    bg: "bg-red-50",
    text: "text-red-700",
    strength: "ارزان‌ترین گزینه با شبکه گسترده شعب محلی",
    coverage: "تا ۴ میلیون یورو",
    price: "از ۱۰€/ماه",
    bestFor: "افراد بودجه‌محور",
    icon: Banknote,
  },
  {
    id: "generali",
    name: "Generali",
    fullName: "Generali Versicherung AG",
    marketShare: "۱۴.۴٪",
    rank: 4,
    color: "from-emerald-600 to-teal-700",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    strength: "پوشش رقابتی و خدمات مشتریان قوی",
    coverage: "تا ۵ میلیون یورو",
    price: "از ۱۲€/ماه",
    bestFor: "خانواده‌ها",
    icon: Shield,
  },
  {
    id: "donau",
    name: "DONAU",
    fullName: "DONAU Versicherung AG",
    marketShare: "۵.۹٪",
    rank: 5,
    color: "from-cyan-600 to-blue-700",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    strength: "بخشی از گروه Vienna Insurance با تعرفه‌های رقابتی",
    coverage: "تا ۳ میلیون یورو",
    price: "از ۸€/ماه",
    bestFor: "مشتریان سنتی",
    icon: Landmark,
  },
];

// ==========================================
// COVERAGE TYPES
// ==========================================
const COVERAGE_TYPES = [
  {
    id: "person",
    title: "خسارت جانی (Personenschaden)",
    german: "Personenschaden",
    desc: "زمانی که شما به‌طور غیرعمد به شخص دیگری آسیب فیزیکی وارد می‌کنید. این شامل هزینه‌های درمان، غرامت درد و رنج، و از کارافتادگی می‌شود.",
    icon: Heart,
    color: "from-red-500 to-rose-600",
    examples: ["برخورد در اسکی با فرد دیگر", "برخورد دوچرخه با عابر پیاده", "افتادن مهمان روی یخ حیاط شما"],
    cost: "تا صدها هزار یورو",
  },
  {
    id: "property",
    title: "خسارت مالی (Sachschaden)",
    german: "Sachschaden",
    desc: "زمانی که شما اموال دیگران را به‌طور غیرعمد آسیب می‌زنید یا از بین می‌برید. شایع‌ترین نوع خسارت در بیمه مسئولیت مدنی.",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
    examples: ["آسیب آب در آپارتمان همسایه", "شکستن گوشی دوستتان", "خط افتادن روی ماشین دیگران"],
    cost: "تا ده‌ها هزار یورو",
  },
  {
    id: "financial",
    title: "خسارت مالی ناشی از (Vermögensschaden)",
    german: "Vermögensschaden",
    desc: "خسارت مالی که به‌عنوان پیامد یک خسارت جانی یا مالی به وجود می‌آید. مثلاً از دست رفتن درآمد فرد آسیب‌دیده.",
    icon: Wallet,
    color: "from-amber-500 to-orange-600",
    examples: ["از دست رفتن درآمد فرد آسیب‌دیده", "هزینه‌های جایگزینی تجهیزات", "سود از دست رفته کسب‌وکار"],
    cost: "متغیر",
  },
  {
    id: "defense",
    title: "دفاع حقوقی (Passiver Rechtsschutz)",
    german: "Passiver Rechtsschutz",
    desc: "دفاع در برابر ادعاهای ناحق. بیمه هزینه‌های وکیل و دادگاه را پوشش می‌دهد تا از شما در برابر مطالبات غیرمنصفانه حمایت کند.",
    icon: Scale,
    color: "from-purple-500 to-fuchsia-600",
    examples: ["وکیل در پرونده حقوقی", "هزینه‌های دادگاه", "کارشناسی‌های تخصصی"],
    cost: "هزاران یورو",
  },
];

// ==========================================
// EXCLUSIONS
// ==========================================
const EXCLUSIONS = [
  { icon: Car, text: "خسارات ناشی از خودرو (تحت پوشش KFZ-Haftpflicht اجباری)" },
  { icon: Dog, text: "خسارات ناشی از سگ (نیاز به بیمه مسئولیت سگ جداگانه)" },
  { icon: Briefcase, text: "فعالیت‌های شغلی و حرفه‌ای (نیاز به Berufshaftpflicht)" },
  { icon: AlertTriangle, text: "خسارات عمدی و دانسته" },
  { icon: Home, text: "خسارت به اموال خودتان (تحت پوشش Haushaltsversicherung)" },
  { icon: Plane, text: "خسارات ناشی از هواپیما و وسایل پرنده" },
  { icon: Flame, text: "خسارات ناشی از فورس ماژور، جنگ و تروریسم" },
  { icon: Baby, text: "خسارات ناشی از کودکان زیر ۷ سال (طبق قانون ABGB)" },
];

// ==========================================
// WHY NEEDED
// ==========================================
const WHY_NEEDED = [
  {
    icon: Scale,
    title: "مسئولیت نامحدود قانونی",
    text: "طبق ماده ۱۲۹۵ قانون مدنی اتریش (ABGB)، شما با تمام دارایی خود در قبال خساراتی که به دیگران وارد می‌کنید مسئول هستید. هیچ سقفی برای این مسئولیت وجود ندارد.",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: TrendingUp,
    title: "خسارات سنگین مالی",
    text: "یک حادثه ورزشی یا آسیب جانی می‌تواند به ادعاهای چند صد هزار یورویی منجر شود. هزینه‌های درمان، غرامت و از کارافتادگی می‌تواند زندگی مالی شما را نابود کند.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Users,
    title: "حفاظت از خانواده",
    text: "بیمه مسئولیت مدنی خانواده، همسر/شریک زندگی و فرزندان را نیز پوشش می‌دهد. این یعنی تمام خانواده شما در برابر ادعاهای مالی محافظت می‌شوند.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Wallet,
    title: "هزینه ناچیز در برابر پوشش",
    text: "با پرداخت ماهانه تنها ۳ تا ۱۵ یورو، می‌توانید تا ۵ میلیون یورو پوشش دریافت کنید. این یکی از مقرون‌به‌صرفه‌ترین بیمه‌های موجود در اتریش است.",
    color: "from-blue-500 to-indigo-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا بیمه مسئولیت مدنی در اتریش اجباری است؟",
    a: "خیر، بیمه مسئولیت مدنی خصوصی (Privathaftpflichtversicherung) در اتریش اجباری قانونی نیست. تنها بیمه اجباری، بیمه مسئولیت خودرو (KFZ-Haftpflicht) طبق ماده ۵۹ قانون خودرو (KFG) است. با این حال، به دلیل مسئولیت نامحدود قانونی طبق ماده ۱۲۹۵ ABGB، این بیمه به شدت توصیه می‌شود و انجمن بیمه اتریش (VVO) و اتاق کارگران (AK) آن را ضروری می‌دانند.",
  },
  {
    q: "حداقل پوشش توصیه شده چقدر است؟",
    a: "طبق توصیه انجمن بیمه اتریش (VVO) و سازمان‌های مصرف‌کننده مانند VKI، حداقل پوشش ۳ میلیون یورو (pauschal) توصیه می‌شود. برخی کارشناسان حتی ۵ میلیون یورو را پیشنهاد می‌کنند. توجه داشته باشید که پوشش ۱ میلیون یورو استاندارد قدیمی است و با توجه به افزایش هزینه‌های درمانی کافی نیست.",
  },
  {
    q: "آیا بیمه مسئولیت مدنی، کل خانواده را پوشش می‌دهد؟",
    a: "بله، اگر بیمه مسئولیت مدنی را به‌عنوان بخشی از بیمه خانوار (Haushaltsversicherung) خریداری کنید یا از طرح خانوادگی استفاده کنید، همسر/شریک زندگی و فرزندان زیر ۱۸ سال (و فرزندان بالای ۱۸ سال بدون درآمد در حال تحصیل) نیز پوشش داده می‌شوند. حتی کارکنان خانگی مانند نظافتچی نیز تحت پوشش قرار می‌گیرند.",
  },
  {
    q: "هزینه بیمه مسئولیت مدنی چقدر است؟",
    a: "هزینه بیمه مسئولیت مدنی در اتریش بسیار مقرون‌به‌صرفه است. برای یک فرد، قیمت‌ها از حدود ۳ یورو در ماه شروع می‌شود. برای خانواده، قیمت بین ۵ تا ۱۰ یورو در ماه است. بیمه‌های پرمیوم با پوشش بالاتر معمولاً تا ۱۵ یورو در ماه هزینه دارند. اگر این بیمه را به‌عنوان بخشی از بیمه خانوار خریداری کنید، معمولاً هزینه کل بین ۱۰ تا ۲۵ یورو در ماه خواهد بود.",
  },
  {
    q: "آیا خسارات ناشی از سگ و خودرو پوشش داده می‌شود؟",
    a: "خیر، خسارات ناشی از سگ و خودرو از پوشش بیمه مسئولیت مدنی خصوصی خارج هستند. برای خودرو، بیمه اجباری KFZ-Haftpflicht وجود دارد. برای سگ، نیاز به بیمه مسئولیت سگ جداگانه (Hundehaftpflicht) دارید که در برخی ایالت‌ها مانند وین و نیدراوترایش اجباری است. همچنین فعالیت‌های شغلی و حرفه‌ای نیاز به بیمه مسئولیت حرفه‌ای جداگانه دارند.",
  },
  {
    q: "چگونه می‌توانم بیمه مسئولیت مدنی مناسب پیدا کنم؟",
    a: "بهترین راه، استفاده از پورتال‌های مقایسه آنلاین مانند durchblicker.at است که امکان مقایسه بیش از ۱۰ ارائه‌دهنده را فراهم می‌کند. همچنین می‌توانید مستقیماً با شرکت‌های بیمه معتبر مانند UNIQA، Allianz، Wiener Städtische، Generali و DONAU تماس بگیرید. توصیه می‌شود قبل از تصمیم نهایی، شرایط پوشش، سقف مسئولیت و استثناها را با دقت بررسی کنید.",
  },
];

// ==========================================
// SEO SCHEMA
// ==========================================
const seoSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "اتریش‌نشین",
    alternateName: "Otrish Neshin",
    url: "https://otrish-iran.ir",
    logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای بیمه",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل بیمه مسئولیت مدنی اتریش ۲۰۲۶ | پوشش، هزینه و مقایسه",
    description: "راهنمای جامع بیمه مسئولیت مدنی (Haftpflichtversicherung) در اتریش: پوشش‌ها، استثناها، هزینه‌ها از ۳ یورو در ماه، مقایسه ۵ شرکت برتر و نکات کلیدی برای فارسی‌زبانان. به‌روز ۲۰۲۶.",
    author: { "@type": "Organization", name: "اتریش‌نشین" },
    publisher: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
    },
    datePublished: "2026-01-15",
    dateModified: "2026-09-22",
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
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
      { "@type": "ListItem", position: 2, name: "بیمه مسئولیت مدنی", item: "https://otrish-iran.ir/haftpflicht" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const LiabilityInsuranceGuide: React.FC = () => {
  const [activeCoverage, setActiveCoverage] = useState<string>("person");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllExclusions, setShowAllExclusions] = useState(false);

  const displayedExclusions = showAllExclusions ? EXCLUSIONS : EXCLUSIONS.slice(0, 4);

  return (
    <>
      <SEO
        title="راهنمای کامل بیمه مسئولیت مدنی اتریش ۲۰۲۶ | هزینه، پوشش و مقایسه | اتریش‌نشین"
        description="راهنمای جامع بیمه مسئولیت مدنی (Haftpflichtversicherung) در اتریش ۲۰۲۶: پوشش خسارات جانی، مالی و حقوقی، هزینه از ۳ یورو در ماه، مقایسه ۵ شرکت برتر (UNIQA, Allianz و...) و نکات کلیدی برای فارسی‌زبانان."
        keywords="بیمه مسئولیت مدنی اتریش, Haftpflichtversicherung Österreich, بیمه شخص ثالث اتریش, هزینه بیمه مسئولیت اتریش, UNIQA بیمه مسئولیت, Allianz بیمه اتریش, Wiener Städtische, پوشش خسارت مالی اتریش, بیمه اجباری اتریش, ABGB 1295"
        schemaData={seoSchema}
        type="article"
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO SECTION */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #1e3a8a 0, #0c1e3e 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">🛡️</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img src={otrishLogo} alt="اتریش‌نشین" width="112" height="112" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — طبق منابع VVO و FMA
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-300"> بیمه مسئولیت مدنی اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-4">
                بیمه مسئولیت مدنی (Haftpflichtversicherung) شما را در برابر ادعاهای مالی سنگین
                ناشی از خسارات ناخواسته به دیگران محافظت می‌کند. طبق ماده ۱۲۹۵ قانون مدنی اتریش،
                مسئولیت شما نامحدود است — این بیمه ضروری‌ترین پوشش مالی شماست.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>شروع از ۳€/ماه</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پوشش تا ۵M€</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پوشش کل خانواده</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.02 }} className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-blue-600" /></div>
                <div className="text-lg font-black text-blue-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* TRUST BADGES */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-[11px] font-black text-stone-700">{b.text}</span>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* FEATURED IMAGES GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              بیمه مسئولیت مدنی — سپر مالی شما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">حفاظت در برابر خسارات ناخواسته در زندگی روزمره و سفر</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { (e.currentTarget as HTMLImageElement).src = img.fallback; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }} className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">#{img.tag}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">{img.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-red-50 via-amber-50 to-orange-50 border-2 border-red-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-red-900 text-sm mb-1 flex items-center gap-2">
              هشدار مهم: مسئولیت شما نامحدود است
            </h3>
            <p className="text-[11px] text-red-800 font-bold leading-relaxed">
              طبق ماده ۱۲۹۵ قانون مدنی اتریش (ABGB)، شما با <strong>تمام دارایی خود</strong> در قبال
              خساراتی که به دیگران وارد می‌کنید مسئول هستید. یک آسیب جانی مانند برخورد در اسکی
              می‌تواند به ادعای چند صد هزار یورویی منجر شود. بیمه مسئولیت مدنی این بار مالی
              سنگین را از دوش شما برمی‌دارد — و هزینه آن تنها چند یورو در ماه است.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* COVERAGE TYPES — TABS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              ۴ نوع پوشش اصلی بیمه مسئولیت مدنی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">هر نوع پوشش، جنبه متفاوتی از مسئولیت شما را پوشش می‌دهد</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {COVERAGE_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeCoverage === type.id;
              return (
                <motion.button key={type.id} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveCoverage(type.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${type.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"}`}>
                  <Icon className="w-4 h-4" />
                  {type.title}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {COVERAGE_TYPES.filter((t) => t.id === activeCoverage).map((type) => {
              const Icon = type.icon;
              return (
                <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 relative overflow-hidden">
                  <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${type.color} opacity-[0.08] rounded-full`} />

                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-base font-black text-stone-900">{type.title}</h3>
                        <span className="text-[9px] font-mono text-stone-400" dir="ltr">({type.german})</span>
                      </div>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{type.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                          <div className="text-[9px] text-stone-500 font-black mb-2 flex items-center gap-1.5">
                            <Lightbulb className="w-3 h-3 text-amber-500" />
                            مثال‌های روزمره
                          </div>
                          <div className="space-y-1.5">
                            {type.examples.map((ex, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600">
                                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>{ex}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className={`${type.color.replace('from-', 'bg-').split(' ')[0]}/10 border border-current/20 rounded-2xl p-4`}>
                          <div className="text-[9px] text-stone-500 font-black mb-2 flex items-center gap-1.5">
                            <CircleDollarSign className="w-3 h-3 text-amber-600" />
                            هزینه تخمینی
                          </div>
                          <div className={`text-2xl font-black bg-gradient-to-r ${type.color} bg-clip-text text-transparent`}>{type.cost}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* PROVIDERS COMPARISON */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              ۵ شرکت برتر بیمه مسئولیت مدنی اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">مقایسه سهم بازار، پوشش و قیمت — طبق داده‌های VVO ۲۰۲۵</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSURANCE_PROVIDERS.map((provider, i) => {
              const Icon = provider.icon;
              return (
                <motion.div key={provider.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }} className="relative bg-white rounded-3xl border-2 border-stone-200 hover:border-blue-300 transition-all p-5 overflow-hidden group shadow-sm hover:shadow-lg">
                  <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${provider.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                  {provider.rank <= 3 && (
                    <div className="absolute top-3 left-3 flex items-center gap-1">
                      {provider.rank === 1 ? <Crown className="w-4 h-4 text-amber-500" /> : provider.rank === 2 ? <Trophy className="w-4 h-4 text-slate-400" /> : <Award className="w-4 h-4 text-orange-600" />}
                    </div>
                  )}

                  <div className="relative flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${provider.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-stone-900 text-sm mb-0.5">{provider.name}</h3>
                      <p className="text-[9px] font-mono text-stone-400" dir="ltr">{provider.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-[9px] font-black ${provider.bg} ${provider.text} px-2 py-1 rounded-full`}>
                      سهم بازار: {provider.marketShare}
                    </span>
                    <span className={`text-[9px] font-black ${provider.bg} ${provider.text} px-2 py-1 rounded-full border border-current/20`}>
                      {provider.price}
                    </span>
                  </div>

                  <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-3">{provider.strength}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-black text-blue-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {provider.coverage}
                    </span>
                    <span className="text-[9px] font-bold text-stone-400">{provider.bestFor}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* EXCLUSIONS */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-red-500 via-rose-500 to-amber-500 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">موارد خارج از پوشش (استثناها)</h2>
                <p className="text-[10px] text-stone-500 font-bold mt-0.5">این موارد نیاز به بیمه‌های جداگانه دارند</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {displayedExclusions.map((ex, i) => {
              const Icon = ex.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 p-4 bg-red-50/50 border border-red-100 rounded-2xl">
                  <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-[11px] text-stone-700 font-bold leading-relaxed flex-1">{ex.text}</p>
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                </motion.div>
              );
            })}
          </div>

          {!showAllExclusions && EXCLUSIONS.length > 4 && (
            <div className="mt-4 text-center">
              <button type="button" onClick={() => setShowAllExclusions(true)} className="inline-flex items-center gap-2 bg-gradient-to-br from-red-500 to-rose-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all">
                <Eye className="w-3.5 h-3.5" />
                مشاهده همه {EXCLUSIONS.length} استثنا
              </button>
            </div>
          )}
        </motion.div>

        {/* ========================================== */}
        {/* WHY NEEDED */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              چرا بیمه مسئولیت مدنی ضروری است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">دلایلی که این بیمه را به یکی از مهم‌ترین بیمه‌های اتریش تبدیل می‌کند</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_NEEDED.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">{v.title}</h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* PRICING OVERVIEW */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-stone-900 via-blue-900 to-stone-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black">مرور کلی قیمت‌ها (۲۰۲۶)</h3>
                <p className="text-[10px] text-stone-400 font-bold">میانگین هزینه ماهانه بر اساس نوع پوشش</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { module: "فرد مجرد (Basic)", price: "۳-۵€", coverage: "تا ۱M€", color: "from-blue-500 to-cyan-600" },
                { module: "خانواده (Standard)", price: "۵-۱۰€", coverage: "تا ۳M€", color: "from-emerald-500 to-teal-600" },
                { module: "خانواده (Premium)", price: "۱۰-۱۵€", coverage: "تا ۵M€", color: "from-amber-500 to-orange-600" },
                { module: "بیمه خانوار + مسئولیت", price: "۱۰-۲۵€", coverage: "تا ۵M€+", color: "from-purple-500 to-fuchsia-600" },
              ].map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className={`text-[10px] font-black bg-gradient-to-r ${p.color} bg-clip-text text-transparent mb-3`}>{p.module}</div>
                  <div className="text-2xl font-black text-white mb-1">{p.price}</div>
                  <div className="text-[10px] text-stone-400 font-bold">پوشش: {p.coverage}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-300 font-bold leading-relaxed">
                قیمت‌ها بر اساس داده‌های checkeverything.at و durchblicker.at (می ۲۰۲۶) است.
                بیمه مسئولیت مدنی معمولاً به‌عنوان بخشی از بیمه خانوار (Haushaltsversicherung) خریداری می‌شود
                که ارزش بهتری ارائه می‌دهد. هزینه سالانه بیمه خانوار معمولاً بین ۱۰۰ تا ۴۰۰ یورو است.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              سوالات متداول درباره بیمه مسئولیت مدنی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#0c1e3e] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در حفاظت مالی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">سوالی درباره بیمه مسئولیت مدنی دارید؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای انتخاب بیمه مسئولیت مدنی مناسب،
              مقایسه ارائه‌دهندگان و پاسخ به سوالات درباره سیستم بیمه اتریش هستند.
              همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> پرسش در واتس‌اپ
              </a>
              <a href="https://t.me/Otrish_neshin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Send className="w-4 h-4" /> پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> کاملاً محرمانه</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> خدمات داوطلبانه</div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این راهنما بر اساس منابع رسمی (VVO، FMA، ABGB، checkeverything.at، durchblicker.at)
              تهیه شده و صرفاً جنبه آموزشی دارد. شرایط، قیمت‌ها و پوشش‌ها ممکن است بدون اطلاع تغییر کند.
              برای اطلاعات نهایی و به‌روز، همیشه به سایت‌های رسمی شرکت‌های بیمه مراجعه کنید یا با
              مشاور بیمه معتبر مشورت نمایید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "بیمه مسئولیت مدنی اتریش", "Haftpflichtversicherung Österreich",
              "بیمه شخص ثالث اتریش", "هزینه بیمه مسئولیت اتریش",
              "UNIQA بیمه مسئولیت", "Allianz بیمه اتریش",
              "Wiener Städtische", "پوشش خسارت مالی اتریش",
              "بیمه اجباری اتریش", "ABGB 1295",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all cursor-default">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({ q, a, isOpen, onToggle, index }: { key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-blue-500/30 bg-blue-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default LiabilityInsuranceGuide;