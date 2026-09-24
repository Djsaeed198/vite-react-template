import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Baby, Search, MapPin, Phone, Star, CheckCircle, ShieldCheck, Heart,
  Award, Users, Sparkles, Zap, Building2, Languages, Clock, Calendar,
  ExternalLink, ChevronDown, Info, HelpCircle, TrendingUp, MessageCircle,
  Send, Handshake, Lightbulb, ListChecks, Target, Trophy, BarChart3,
  Grid3x3, X, RefreshCw, Landmark, Wallet, FileText, Download, Eye,
  Globe, Home, GraduationCap, ClipboardList, CreditCard, IdCard,
  BabyIcon, Backpack, DoorOpen, Ruler, Sun, Snowflake, Coffee,
  Utensils, HeartPulse, Microscope, Brush, Music, Palette, Puzzle,
  BookOpen, Calculator, TrendingDown, Banknote, Receipt, UsersRound,
  CircleDollarSign, Euro, CheckSquare, Square, MapPinned, Navigation,
  FileCheck, BookMarked, PieChart, ArrowRight, ArrowLeft, Filter,
  SlidersHorizontal, BellRing, PartyPopper, Briefcase,
  Accessibility, HandHeart, HeartHandshake, Scale, Gavel
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
    url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80",
    title: "مهدکودک‌های دولتی اتریش",
    caption: "رایگان برای کودکان ۴ تا ۶ سال — کیفیت بالا با استانداردهای آموزشی",
    icon: Landmark,
    tag: "دولتی",
  },
  {
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    title: "مهدکودک‌های خصوصی",
    caption: "امکانات ویژه، ساعات انعطاف‌پذیر و برنامه‌های تخصصی",
    icon: Building2,
    tag: "خصوصی",
  },
  {
    url: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=800&q=80",
    title: "یادگیری و بازی در مهدکودک",
    caption: "آماده‌سازی کودکان برای ورود به مدرسه و یادگیری زبان آلمانی",
    icon: GraduationCap,
    tag: "آموزش",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۳-۶", label: "سن ورود", icon: Baby },
  { value: "۴", label: "مدل مهدکودک", icon: Building2 },
  { value: "رایگان", label: "برای ۴-۶ ساله", icon: Euro },
  { value: "نوامبر-دسامبر", label: "ثبت‌نام اصلی", icon: Calendar },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق منابع رسمی wien.gv.at", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "راهنمای رایگان", color: "text-rose-600" },
  { icon: Award, text: "توسط متخصصان", color: "text-indigo-600" },
];

// ==========================================
// KINDERGARTEN TYPES
// ==========================================
const KINDERGARTEN_TYPES = [
  {
    id: "staedtisch",
    name: "مهدکودک دولتی (Städtisch)",
    german: "Städtischer Kindergarten",
    desc: "مهدکودک‌های تحت مدیریت شهرداری وین (MA 10) با استانداردهای آموزشی بالا.",
    icon: Landmark,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    features: [
      "رایگان برای کودکان ۴ تا ۶ سال (نیمه‌وقت)",
      "ساعات کاری طولانی‌تر (تا ۱۷:۰۰)",
      "تعداد روزهای تعطیل کمتر",
      "۹۰٪ ظرفیت برای کودکان با نیازهای ویژه",
      "برنامه آموزشی استاندارد ملی",
      "تخصیص بر اساس معیارهای شهرداری",
    ],
    cost: "رایگان (نیمه‌وقت برای ۴-۶ ساله)",
    waitTime: "تخصیص تا پایان مارس",
    registration: "ثبت‌نام آنلاین نوامبر-دسامبر",
  },
  {
    id: "privat",
    name: "مهدکودک خصوصی (Privat)",
    german: "Privater Kindergarten",
    desc: "مهدکودک‌های تحت مدیریت سازمان‌های خصوصی، مذهبی یا والدین با رویکردهای خاص.",
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    features: [
      "شهریه ماهانه (بسته به مرکز)",
      "ساعات کاری متغیر (برخی تا ۱۸:۰۰)",
      "برنامه‌های تخصصی (مونته‌سوری، والدورف...)",
      "گروه‌های کوچک‌تر",
      "رویکردهای آموزشی خاص",
      "نیاز به Kundennummer",
    ],
    cost: "شهریه ماهانه (متوسط ۲۰۰-۴۰۰ یورو)",
    waitTime: "متغیر — تماس مستقیم",
    registration: "در هر زمان با Kundennummer",
  },
  {
    id: "kindergruppe",
    name: "گروه کودکان (Kindergruppe)",
    german: "Kindergruppe",
    desc: "گروه‌های کوچک خودگردان یا تحت نظر سازمان‌های غیرانتفاعی با تمرکز بر آموزش فردی.",
    icon: Users,
    color: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    features: [
      "گروه‌های کوچک (۸-۱۵ کودک)",
      "تعامل نزدیک با مربی",
      "مشارکت والدین (Elternmitarbeit)",
      "هزینه کمتر از مهدکودک خصوصی",
      "انعطاف در برنامه روزانه",
      "نیاز به Kundennummer",
    ],
    cost: "پرداخت بر اساس درآمد (Einkommensabhängig)",
    waitTime: "بسته به ظرفیت گروه",
    registration: "تماس مستقیم با گروه",
  },
  {
    id: "tageseltern",
    name: "پرستار کودک (Tageseltern)",
    german: "Tagesmutter / Tagesvater",
    desc: "مراقبت از کودکان در خانه پرستار، مناسب برای سنین پایین‌تر و گروه‌های بسیار کوچک.",
    icon: Heart,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    features: [
      "مراقبت در خانه پرستار",
      "حداکثر ۴-۵ کودک",
      "سنین پایین‌تر (زیر ۳ سال)",
      "انعطاف بالای زمانی",
      "فضای خانه‌ای و صمیمی",
      "نیاز به Kundennummer",
    ],
    cost: "ساعتی یا توافقی",
    waitTime: "بسته به پرستار",
    registration: "تماس مستقیم با پرستار",
  },
];

// ==========================================
// COST TABLE
// ==========================================
const COST_DATA = [
  { age: "زیر ۳ سال (Krippe)", staedtisch: "شهریه دارد", privat: "شهریه دارد", kindergruppe: "درآمدی", tageseltern: "ساعتی" },
  { age: "۳ سال (erstes Jahr)", staedtisch: "رایگان (نیمه‌وقت)", privat: "شهریه دارد", kindergruppe: "درآمدی", tageseltern: "ساعتی" },
  { age: "۴-۶ سال (verpflichtend)", staedtisch: "رایگان", privat: "شهریه دارد", kindergruppe: "درآمدی", tageseltern: "ساعتی" },
  { age: "ناهار (Mittagessen)", staedtisch: "~۴-۵ یورو/روز", privat: "~۴-۶ یورو/روز", kindergruppe: "متغیر", tageseltern: "توافقی" },
  { age: "ساعات اضافه", staedtisch: "شهریه دارد", privat: "شهریه دارد", kindergruppe: "درآمدی", tageseltern: "ساعتی" },
];

// ==========================================
// REGISTRATION STEPS
// ==========================================
const REGISTRATION_STEPS = [
  {
    step: 1,
    title: "دریافت شماره مشتری (Kundennummer)",
    subtitle: "پیش‌نیاز اصلی ثبت‌نام",
    desc: "شماره مشتری (Kundennummer) در دفترچه کودکان مهدکودک وین (Verzeichnis der Wiener Kindergartenkinder) الزامی است. این شماره برای ثبت‌نام در مهدکودک‌های خصوصی، گروه‌های کودکان و پرستاران الزامی است. برای مهدکودک دولتی، با ثبت‌نام خودکار صادر می‌شود.",
    icon: IdCard,
    color: "from-blue-500 to-indigo-600",
    tips: [
      "درخواست آنلاین از طریق wien.gv.at",
      "یا تماس با +43 1 277 55 55",
      "نیاز به مدارک هویتی کودک و والدین",
      "صادر شده از طریق MA 10",
    ],
  },
  {
    step: 2,
    title: "ثبت‌نام در بازه اصلی (Hauptanmeldezeit)",
    subtitle: "نوامبر و دسامبر سال قبل",
    desc: "بازه اصلی ثبت‌نام برای مهدکودک‌های دولتی از ۱ نوامبر تا ۳۱ دسامبر سال قبل از ورود است. ثبت‌نام در این بازه شانس دریافت مهدکودک مورد نظر را به‌طور قابل توجهی افزایش می‌دهد.",
    icon: Calendar,
    color: "from-emerald-500 to-teal-600",
    tips: [
      "ثبت‌نام آنلاین یا حضوری",
      "اعلام ۲ مهدکودک مورد نظر",
      "ترتیب ثبت‌نام مهم نیست",
      "تخصیص بر اساس معیارهای خاص",
    ],
  },
  {
    step: 3,
    title: "تخصیص مهدکودک (Platzvergabe)",
    subtitle: "اطلاع‌رسانی تا پایان مارس",
    desc: "پس از پایان بازه ثبت‌نام، شهرداری وین بر اساس معیارهایی مانند اشتغال والدین، داشتن خواهر/برادر در مهدکودک و منطقه سکونت، مهدکودک را تخصیص می‌دهد.",
    icon: ClipboardList,
    color: "from-amber-500 to-orange-600",
    tips: [
      "اطلاع‌رسانی از طریق ایمیل/پست",
      "معیارها: اشتغال، خواهر/برادر، مسافت",
      "در صورت رد شدن، گزینه‌های دیگر",
      "امکان اعتراض وجود دارد",
    ],
  },
  {
    step: 4,
    title: "تأیید و شروع مهدکودک",
    subtitle: "سپتامبر سال ورود",
    desc: "پس از دریافت تخصیص، والدین باید تأیید کنند و در صورت نیاز، مدارک تکمیلی (گواهی واکسیناسیون، بیمه و...) را ارائه دهند.",
    icon: DoorOpen,
    color: "from-rose-500 to-pink-600",
    tips: [
      "تأیید تخصیص ظرف مهلت مقرر",
      "ارائه گواهی واکسیناسیون",
      "کارت e-card کودک",
      "Meldezettel (گواهی سکونت)",
    ],
  },
];

// ==========================================
// REQUIRED DOCUMENTS
// ==========================================
const REQUIRED_DOCUMENTS = [
  { icon: FileText, name: "شناسنامه کودک (Geburtsurkunde)", required: true },
  { icon: IdCard, name: "کارت e-card کودک", required: true },
  { icon: MapPin, name: "Meldezettel (گواهی سکونت)", required: true },
  { icon: ClipboardList, name: "گواهی واکسیناسیون (Impfpass)", required: true },
  { icon: Users, name: "مدارک هویتی والدین/سرپرست", required: true },
  { icon: Briefcase, name: "گواهی اشتغال والدین (حداکثر ۳ ماه)", required: false },
  { icon: Globe, name: "مدرک اقامت (Aufenthaltstitel)", required: false },
  { icon: Heart, name: "گواهی بیمه سلامت", required: false },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا مهدکودک در اتریش اجباری است؟",
    a: "بله، در اتریش حضور در مهدکودک برای یک سال قبل از شروع مدرسه (Vorschuljahr) اجباری است. این الزام برای کودکانی است که تا ۲ سپتامبر سال جاری ۵ ساله شده باشند و اقامت اصلی (Hauptwohnsitz) در اتریش داشته باشند. برای این دوره، حضور نیمه‌وقت (حداقل ۲۰ ساعت در هفته) رایگان است.",
  },
  {
    q: "چگونه می‌توانم Kundennummer دریافت کنم؟",
    a: "شماره مشتری (Kundennummer) در دفترچه کودکان مهدکودک وین (Verzeichnis der Wiener Kindergartenkinder) الزامی است. می‌توانید از طریق سایت wien.gv.at به‌صورت آنلاین، یا با تماس با شماره +43 1 277 55 55 یا حضور در مراکز خدمات MA 10 درخواست دهید. برای مهدکودک‌های دولتی، با ثبت‌نام خودکار صادر می‌شود.",
  },
  {
    q: "هزینه مهدکودک خصوصی چقدر است؟",
    a: "شهریه مهدکودک‌های خصوصی بسته به مرکز، ساعات کاری و منطقه متفاوت است. به‌طور میانگین بین ۲۰۰ تا ۴۰۰ یورو در ماه برای نیمه‌وقت و ۴۰۰ تا ۷۰۰ یورو برای تمام‌وقت متغیر است. برخی مراکز خصوصی بر اساس درآمد والدین شهریه دریافت می‌کنند. برای اطلاعات دقیق باید مستقیماً با مرکز تماس بگیرید.",
  },
  {
    q: "آیا کودک من می‌تواند بدون آلمانی وارد مهدکودک شود؟",
    a: "بله، کودکان بدون تسلط به آلمانی می‌توانند وارد مهدکودک شوند. مهدکودک‌ها برنامه‌های ویژه‌ای برای یادگیری زبان آلمانی (Sprachförderung) دارند. در واقع، مهدکودک یکی از بهترین فرصت‌ها برای یادگیری زبان آلمانی قبل از شروع مدرسه است. مربیان آموزش‌دیده با کودکان غیرآلمانی‌زبان کار می‌کنند.",
  },
  {
    q: "اگر در بازه اصلی ثبت‌نام نکردم چه اتفاقی می‌افتد؟",
    a: "شما می‌توانید در هر زمانی ثبت‌نام کنید، اما خارج از بازه اصلی (نوامبر-دسامبر)، ظرفیت‌ها محدودتر خواهد بود. در این حالت، باید مستقیماً با مراکز خدمات مهدکودک تماس بگیرید یا حضوری مراجعه کنید. شانس دریافت مهدکودک مورد نظر کمتر است اما غیرممکن نیست.",
  },
  {
    q: "تفاوت مهدکودک دولتی و خصوصی در کیفیت چیست؟",
    a: "از نظر کیفیت آموزشی، هر دو نوع مهدکودک استانداردهای ملی را رعایت می‌کنند. مهدکودک‌های دولتی معمولاً ساعات کاری طولانی‌تر و روزهای تعطیل کمتری دارند. مهدکودک‌های خصوصی ممکن است رویکردهای آموزشی خاص (مونته‌سوری، والدورف) داشته باشند یا گروه‌های کوچک‌تری ارائه دهند. انتخاب بستگی به نیازهای خانواده دارد.",
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
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل مهدکودک‌های اتریش ۲۰۲۶ | دولتی، خصوصی، هزینه‌ها و ثبت‌نام",
    description: "راهنمای جامع مهدکودک‌های اتریش: تفاوت دولتی و خصوصی، شرایط ثبت‌نام، هزینه‌ها، دریافت Kundennummer و مدارک مورد نیاز. به‌روز ۲۰۲۶.",
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
      { "@type": "ListItem", position: 2, name: "مهدکودک", item: "https://otrish-iran.ir/kindergarten" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const KindergartenGuide: React.FC = () => {
  const [activeType, setActiveType] = useState<string>("staedtisch");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const requiredCount = REQUIRED_DOCUMENTS.filter((d) => d.required).length;
  const progressPercent = Math.round((checkedCount / REQUIRED_DOCUMENTS.length) * 100);

  return (
    <>
      <SEO
        title="راهنمای کامل مهدکودک‌های اتریش ۲۰۲۶ | دولتی، خصوصی، هزینه و ثبت‌نام | اتریش‌نشین"
        description="راهنمای جامع مهدکودک‌های اتریش: تفاوت مهدکودک دولتی و خصوصی، شهریه و هزینه‌ها، شرایط ثبت‌نام، دریافت Kundennummer، مدارک مورد نیاز و تقویم ثبت‌نام. به‌روز ۲۰۲۶."
        keywords="مهدکودک اتریش, Kindergarten Österreich, مهدکودک دولتی وین, مهدکودک خصوصی اتریش, هزینه مهدکودک اتریش, ثبت نام مهدکودک وین, Kundennummer, MA 10, Kindergarten Anmeldung, مهدکودک رایگان اتریش"
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
            background: "radial-gradient(80% 150% at 90% 0, #1e3a8a 0, #1e1b4b 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">👶</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                به‌روز ۲۰۲۶ — طبق منابع رسمی wien.gv.at
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-indigo-300"> مهدکودک‌های اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-3xl mb-4">
                تفاوت مهدکودک دولتی و خصوصی، شرایط ثبت‌نام، هزینه‌ها، دریافت
                Kundennummer، مدارک مورد نیاز و تقویم ثبت‌نام. همه‌چیز برای
                والدین فارسی‌زبان در اتریش.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>رایگان برای ۴-۶ سال</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ثبت‌نام نوامبر-دسامبر</span>
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
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-indigo-600" /></div>
                <div className="text-lg font-black text-indigo-700">{s.value}</div>
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
              <Baby className="w-5 h-5 text-indigo-600" />
              مهدکودک‌ها در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">انواع مهدکودک‌ها و رویکردهای آموزشی در اتریش</p>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border-2 border-indigo-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              <BabyIcon className="w-4 h-4" />
              نکته کلیدی برای والدین فارسی‌زبان
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              مهدکودک در اتریش اولین مرحله سیستم آموزشی است و کودکان بدون تسلط به
              آلمانی می‌توانند وارد شوند. برنامه‌های ویژه یادگیری زبان (Sprachförderung)
              در مهدکودک‌ها وجود دارد. اگر فرزند شما بین ۳ تا ۶ سال دارد، همین امروز
              برای دریافت Kundennummer اقدام کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* KINDERGARTEN TYPES — TABS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              ۴ نوع مهدکودک در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">هر نوع مهدکودک مزایا و شرایط خاص خود را دارد</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {KINDERGARTEN_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              return (
                <motion.button key={type.id} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveType(type.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${type.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"}`}>
                  <Icon className="w-4 h-4" />
                  {type.name}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {KINDERGARTEN_TYPES.filter((t) => t.id === activeType).map((type) => {
              const Icon = type.icon;
              return (
                <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 relative overflow-hidden">
                  <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${type.color} opacity-[0.08] rounded-full`} />

                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-black text-stone-900 mb-1">{type.name}</h3>
                      <p className="text-[10px] font-mono text-stone-400 mb-3" dir="ltr">({type.german})</p>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{type.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className={`${type.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">💰 هزینه</div>
                          <div className={`text-xs font-black ${type.text}`}>{type.cost}</div>
                        </div>
                        <div className={`${type.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">⏱️ زمان انتظار</div>
                          <div className={`text-xs font-black ${type.text}`}>{type.waitTime}</div>
                        </div>
                        <div className={`${type.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">📝 ثبت‌نام</div>
                          <div className={`text-xs font-black ${type.text}`}>{type.registration}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {type.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] font-bold text-stone-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* COST COMPARISON TABLE */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-indigo-500 via-blue-500 to-cyan-600 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">مقایسه هزینه‌ها (۲۰۲۶)</h2>
                <p className="text-[10px] text-stone-500 font-bold mt-0.5">هزینه ماهانه بر اساس نوع مهدکودک و سن کودک</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="p-3 text-[11px] font-black text-stone-700 text-right">سن / نوع</th>
                  <th className="p-3 text-[11px] font-black text-blue-700 text-center">دولتی</th>
                  <th className="p-3 text-[11px] font-black text-emerald-700 text-center">خصوصی</th>
                  <th className="p-3 text-[11px] font-black text-purple-700 text-center">گروه کودکان</th>
                  <th className="p-3 text-[11px] font-black text-amber-700 text-center">پرستار</th>
                </tr>
              </thead>
              <tbody>
                {COST_DATA.map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`border-b border-stone-100 ${i % 2 === 0 ? "bg-stone-50/50" : ""}`}>
                    <td className="p-3 text-[11px] font-black text-stone-800">{row.age}</td>
                    <td className="p-3 text-[11px] font-bold text-blue-700 text-center">{row.staedtisch}</td>
                    <td className="p-3 text-[11px] font-bold text-emerald-700 text-center">{row.privat}</td>
                    <td className="p-3 text-[11px] font-bold text-purple-700 text-center">{row.kindergruppe}</td>
                    <td className="p-3 text-[11px] font-bold text-amber-700 text-center">{row.tageseltern}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              <strong>توجه:</strong> مهدکودک دولتی برای کودکان ۴ تا ۶ سال در نیمه‌وقت
              (۲۰ ساعت در هفته) رایگان است. هزینه ناهار، ساعات اضافه و برنامه‌های ویژه
              جداگانه محاسبه می‌شود. مهدکودک‌های خصوصی ممکن است بر اساس درآمد والدین
              تخفیف ارائه دهند.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* REGISTRATION STEPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-[11px] font-black text-indigo-700 mb-3">
              <ListChecks className="w-3.5 h-3.5" />
              راهنمای گام‌به‌گام
            </div>
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600" />
              ۴ مرحله ثبت‌نام در مهدکودک
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از دریافت Kundennummer تا شروع مهدکودک</p>
          </div>

          <div className="space-y-4">
            {REGISTRATION_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} id={`step-${step.step}`} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-300 p-6 transition-all overflow-hidden group">
                  <div className={`absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br ${step.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                  <div className="relative flex flex-col md:flex-row items-start gap-5">
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="hidden md:flex w-10 h-10 rounded-full bg-stone-100 items-center justify-center text-stone-700 font-black text-sm">
                        {step.step}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white`}>مرحله {step.step}</span>
                        <h3 className="font-black text-stone-900 text-base">{step.title}</h3>
                      </div>
                      <p className="text-[11px] text-stone-500 font-bold mb-2">{step.subtitle}</p>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-3">{step.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {step.tips.map((tip, ti) => (
                          <span key={ti} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                            <Lightbulb className="w-3 h-3 text-amber-500" />
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* REQUIRED DOCUMENTS CHECKLIST */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-600 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">چک‌لیست مدارک مورد نیاز</h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    {checkedCount} از {REQUIRED_DOCUMENTS.length} مدرک آماده شده
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setShowChecklist(!showChecklist)} className="text-[10px] font-black text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg transition-all">
                {showChecklist ? "بستن" : "نمایش چک‌لیست"}
                <ChevronDown className={`w-3 h-3 transition-transform ${showChecklist ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2.5 text-xs font-black text-stone-800">
              <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{progressPercent}% تکمیل شده</span>
              <span>مدارک الزامی: {requiredCount} مدرک</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          <AnimatePresence>
            {showChecklist && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {REQUIRED_DOCUMENTS.map((doc, i) => {
                    const Icon = doc.icon;
                    const isChecked = checkedDocs[doc.name];
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} onClick={() => toggleDoc(doc.name)} className={`border-2 rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${isChecked ? "border-emerald-500 bg-emerald-50/50" : "border-stone-200 hover:border-emerald-300"}`}>
                        <div className="pt-0.5">
                          {isChecked ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Square className="w-5 h-5 text-stone-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className={`text-xs font-black ${isChecked ? "text-emerald-900 line-through" : "text-stone-900"}`}>{doc.name}</h4>
                            {doc.required ? (
                              <span className="text-[8px] font-black bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded">الزامی</span>
                            ) : (
                              <span className="text-[8px] font-black bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">اختیاری</span>
                            )}
                          </div>
                        </div>
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isChecked ? "text-emerald-500" : "text-stone-400"}`} />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              چرا مهدکودک در اتریش اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">آمار و حقایقی درباره مهدکودک‌های اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, title: "اجباری", text: "یک سال حضور در مهدکودک قبل از مدرسه در اتریش اجباری است", color: "from-indigo-500 to-blue-600" },
              { icon: Euro, title: "رایگان", text: "مهدکودک دولتی برای کودکان ۴-۶ سال در نیمه‌وقت رایگان است", color: "from-emerald-500 to-teal-600" },
              { icon: Languages, title: "زبان آلمانی", text: "مهدکودک بهترین فرصت یادگیری زبان آلمانی قبل از مدرسه", color: "from-amber-500 to-orange-600" },
              { icon: Users, title: "۱۳,۷۶۷ یورو", text: "هزینه واقعی هر کودک در مهدکودک دولتی برای شهرداری در سال", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>{v.title}</div>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{v.text}</p>
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
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              سوالات متداول درباره مهدکودک
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات والدین</p>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#1e1b4b] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در مسیر آموزش فرزندتان
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">سوالی درباره مهدکودک دارید؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای یافتن مهدکودک مناسب،
              تکمیل فرم‌های ثبت‌نام و پاسخ به سوالات درباره سیستم آموزشی اتریش هستند.
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
              این راهنما بر اساس منابع رسمی (wien.gv.at، oesterreich.gv.at، MA 10)
              تهیه شده و صرفاً جنبه آموزشی دارد. شرایط و هزینه‌ها ممکن است بدون اطلاع
              تغییر کند. برای اطلاعات نهایی و به‌روز، همیشه به سایت‌های رسمی مراجعه
              کنید یا با مراکز خدمات MA 10 تماس بگیرید. اتریش‌نشین یک پلتفرم کاملاً
              مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "مهدکودک اتریش", "Kindergarten Österreich", "مهدکودک دولتی وین",
              "مهدکودک خصوصی اتریش", "هزینه مهدکودک اتریش", "ثبت نام مهدکودک وین",
              "Kundennummer", "MA 10", "Kindergarten Anmeldung",
              "مهدکودک رایگان اتریش", "Tagesmutter", "Kindergruppe",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all cursor-default">#{tag}</span>
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
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-indigo-500/30 bg-indigo-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-indigo-600" : ""}`} />
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

export default KindergartenGuide;