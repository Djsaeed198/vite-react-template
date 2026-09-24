import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar, Clock, MapPin, Phone, Mail, CheckCircle, ShieldCheck,
  Heart, Award, Users, Sparkles, Zap, Building2, Languages, ExternalLink,
  ChevronDown, Info, HelpCircle, TrendingUp, MessageCircle, Send,
  Handshake, Lightbulb, ListChecks, Target, Trophy, BarChart3, Grid3x3,
  X, RefreshCw, Landmark, Wallet, FileText, Download, Eye, Globe,
  GraduationCap, ClipboardList, IdCard, ArrowLeft, ArrowRight,
  FileCheck, BookMarked, PieChart, Filter, SlidersHorizontal, BellRing,
  AlertTriangle, CheckSquare, Square, UserCheck, Briefcase, Home,
  CreditCard, Smartphone, Monitor, Calendar as CalendarIcon, Clock4,
  Timer, Gauge, Route, Milestone, Compass, Flag, Rocket, Crown,
  Gem, Flame, ThumbsUp, XCircle, AlertCircle, Scale, Gavel, Plane,
  Ship, Train, Car, Bike, Hotel, Utensils, Coffee, ShoppingBag,
  Baby, Accessibility, HeartHandshake, UserPlus, FileSignature, Stamp,
  Camera
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
    title: "وقت‌دهی سریع و هوشمند",
    caption: "در کمترین زمان از اداره مهاجرت استان یا شهر خود وقت بگیرید",
    icon: Calendar,
    tag: "وقت‌دهی",
  },
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    title: "همراهی کامل در سفارتخانه‌ها",
    caption: "سفارت اتریش در ایران، پاکستان و کشورهای همسایه",
    icon: Globe,
    tag: "سفارت",
  },
  {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    title: "پیگیری پرونده تا صدور مجوز",
    caption: "از ثبت درخواست تا دریافت اقامت — کنار شما هستیم",
    icon: FileCheck,
    tag: "پیگیری",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۶ ماه", label: "زمان انتظار Erstinfo", icon: Clock },
  { value: "۴۱ روز", label: "میانگین پردازش پرونده", icon: Gauge },
  { value: "۵+", label: "سفارتخانه فعال", icon: Landmark },
  { value: "۱۰۰٪", label: "پیگیری تا پایان", icon: ShieldCheck },
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
// OFFICES DATA
// ==========================================
const OFFICES_DATA = [
  {
    id: "referat-1-0",
    name: "Referat 1.0 — Erstantragszentrum",
    address: "20., Dresdner Straße 93, Block C",
    phone: "+43 1 4000-3535",
    email: "10-ref@ma35.wien.gv.at",
    type: "اولین درخواست",
    color: "from-blue-500 to-indigo-600",
    icon: FilePlus,
  },
  {
    id: "referat-4-1",
    name: "Referat 4.1 — Verlängerungen",
    address: "1., Zelinkagasse 9",
    phone: "+43 1 4000-3535",
    email: "41-ref@ma35.wien.gv.at",
    type: "تمدید اقامت",
    color: "from-emerald-500 to-teal-600",
    icon: RefreshCw,
  },
  {
    id: "referat-4-2",
    name: "Referat 4.2 — Verlängerungen",
    address: "2., Meiereistraße 7, Sektor E",
    phone: "+43 1 4000-3535",
    email: "42-ref@ma35.wien.gv.at",
    type: "تمدید اقامت",
    color: "from-purple-500 to-fuchsia-600",
    icon: RefreshCw,
  },
  {
    id: "support-team",
    name: "Support Team Einwanderung",
    address: "12., Arndtstraße 67, Stiege 1",
    phone: "+43 1 4000-3535",
    email: "sup-einw@ma35.wien.gv.at",
    type: "پشتیبانی ویژه",
    color: "from-amber-500 to-orange-600",
    icon: Users,
  },
];

// ==========================================
// APPOINTMENT STEPS
// ==========================================
const APPOINTMENT_STEPS = [
  {
    step: 1,
    title: "شناسایی نوع درخواست",
    subtitle: "اولین درخواست یا تمدید؟",
    desc: "ابتدا مشخص کنید که آیا برای اولین بار درخواست اقامت می‌دهید یا در حال تمدید اقامت فعلی هستید. برای اولین درخواست از سامانه Erstantragszentrum و برای تمدید از Außenstellen استفاده کنید.",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
    tips: ["اولین درخواست: Referat 1.0", "تمدید: Referat 4.1 تا 4.15", "قبل از انقضا اقدام کنید"],
  },
  {
    step: 2,
    title: "ورود به سامانه وقت‌دهی آنلاین",
    subtitle: "wien.gv.at یا ticket.wien.gv.at",
    desc: "از طریق پورتال رسمی شهر وین (wien.gv.at) یا سامانه ticket.wien.gv.at/M35 وارد سامانه وقت‌دهی شوید. از اکتبر ۲۰۲۵، می‌توانید در هر شعبه MA 35 بدون توجه به منطقه سکونت خود وقت بگیرید.",
    icon: Monitor,
    color: "from-emerald-500 to-teal-600",
    tips: ["wien.gv.at", "ticket.wien.gv.at/M35", "انتخاب آزاد شعبه از اکتبر ۲۰۲۵"],
  },
  {
    step: 3,
    title: "انتخاب نزدیک‌ترین شعبه",
    subtitle: "۵ شعبه در مناطق مختلف وین",
    desc: "MA 35 دارای ۵ شعبه در مناطق ۱، ۲، ۱۳، ۱۶ و ۲۰ وین است. اکنون می‌توانید بدون توجه به منطقه سکونت، در هر شعبه‌ای که زودترین وقت آزاد را دارد، رزرو کنید.",
    icon: MapPin,
    color: "from-amber-500 to-orange-600",
    tips: ["۵ شعبه فعال", "مناطق ۱، ۲، ۱۳، ۱۶، ۲۰", "زودترین وقت آزاد را انتخاب کنید"],
  },
  {
    step: 4,
    title: "تکمیل فرم و آماده‌سازی مدارک",
    subtitle: "فرم Antragsformular + مدارک",
    desc: "فرم درخواست را از قبل پر کنید و همه مدارک لازم را آماده کنید. کمبود مدارک می‌تواند باعث تأخیر در پردازش پرونده شود. توصیه می‌شود مدارک را به‌صورت اصل و کپی همراه داشته باشید.",
    icon: FileText,
    color: "from-rose-500 to-pink-600",
    tips: ["فرم از قبل پر شده", "مدارک اصل + کپی", "عکس بیومتریک جدید"],
  },
];

// ==========================================
// REQUIRED DOCUMENTS
// ==========================================
const REQUIRED_DOCUMENTS = [
  { icon: FileText, name: "فرم درخواست (Antragsformular)", required: true, note: "از قبل پر شده" },
  { icon: IdCard, name: "گذرنامه معتبر (Reisepass)", required: true, note: "اصل + کپی" },
  { icon: Camera, name: "عکس بیومتریک جدید", required: true, note: "حداکثر ۶ ماه" },
  { icon: MapPin, name: "گواهی سکونت (Meldebestätigung)", required: true, note: "آدرس فعلی" },
  { icon: ShieldCheck, name: "بیمه سلامت معتبر", required: true, note: "پوشش کامل" },
  { icon: Wallet, name: "تمکن مالی (Einkommensnachweis)", required: true, note: "حداقل ۱,۲۷۳.۹۹ یورو خالص" },
  { icon: FileCheck, name: "گواهی عدم سوء‌پیشینه", required: false, note: "حداکثر ۳ ماه" },
  { icon: GraduationCap, name: "مدرک زبان آلمانی (A1/A2)", required: false, note: "بسته به نوع اقامت" },
];

// ==========================================
// EMBASSIES DATA
// ==========================================
const EMBASSIES_DATA = [
  {
    id: "tehran",
    name: "سفارت اتریش در تهران",
    country: "ایران",
    flag: "🇮🇷",
    status: "فعال از سپتامبر ۲۰۲۶",
    services: ["Schengen Visa (C)", "اقامت تحصیلی", "National Visa D", "تأیید اسناد"],
    contact: "teheran-ob@bmeia.gv.at",
    address: "تهران، خیابان ولیعصر",
    color: "from-emerald-500 to-teal-600",
    icon: Landmark,
    note: "از ۱ سپتامبر ۲۰۲۶، خدمات کنسولی به‌تدریج از سر گرفته می‌شود",
  },
  {
    id: "islamabad",
    name: "سفارت اتریش در اسلام‌آباد",
    country: "پاکستان",
    flag: "🇵🇰",
    status: "فعال",
    services: ["Schengen Visa (C)", "National Visa D", "RWR Card", "اقامت تحصیلی"],
    contact: "islamabad-ob@bmeia.gv.at",
    address: "اسلام‌آباد، پاکستان",
    color: "from-blue-500 to-indigo-600",
    icon: Landmark,
    note: "درخواست‌ها از طریق VFS Global ارسال می‌شود",
  },
  {
    id: "istanbul",
    name: "سرکنسولگری اتریش در استانبول",
    country: "ترکیه",
    flag: "🇹🇷",
    status: "فعال",
    services: ["Schengen Visa (C)", "National Visa D (محدود)"],
    contact: "istanbul-ok@bmeia.gv.at",
    address: "استانبول، ترکیه",
    color: "from-amber-500 to-orange-600",
    icon: Landmark,
    note: "فقط برای مقیمان قانونی ترکیه",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چگونه می‌توانم از MA 35 وقت بگیرم؟",
    a: "از طریق پورتال رسمی شهر وین (wien.gv.at) یا سامانه ticket.wien.gv.at/M35 می‌توانید آنلاین وقت بگیرید. از اکتبر ۲۰۲۵، تمام ۵ شعبه MA 35 بدون توجه به منطقه سکونت شما قابل انتخاب هستند. توصیه می‌شود هر چه زودتر اقدام کنید، زیرا وقت‌ها ۶ تا ۸ هفته قبل رزرو می‌شوند و به‌سرعت پر می‌شوند.",
  },
  {
    q: "مدت زمان انتظار برای Erstinfo-Gespräch چقدر است؟",
    a: "طبق گزارش رسمی شهرداری وین، زمان انتظار برای اولین جلسه مشاوره (Erstinfo-Gespräch) از حدود ۱ سال به حدود ۶ ماه کاهش یافته است. این بهبود نتیجه استخدام ۹۳ کارمند جدید و افزایش ظرفیت وقت‌دهی است. وقت‌های آزاد از سپتامبر از طریق ticket.wien.gv.at/M35 قابل رزرو هستند.",
  },
  {
    q: "آیا می‌توانم در هر شعبه‌ای از MA 35 وقت بگیرم؟",
    a: "بله، از اکتبر ۲۰۲۵، شهرداری وین محدودیت‌های منطقه‌ای (Bezirkszuständigkeiten) را لغو کرده است. اکنون می‌توانید در هر یک از ۵ شعبه MA 35 (مناطق ۱، ۲، ۱۳، ۱۶ و ۲۰) برای تمدید اقامت، RWR Plus و مدارک EWR وقت بگیرید. این تغییر انعطاف‌پذیری بیشتری برای شما ایجاد می‌کند.",
  },
  {
    q: "چه مدارکی برای تمدید اقامت لازم است؟",
    a: "مدارک اصلی شامل: فرم درخواست پر شده، گذرنامه معتبر، عکس بیومتریک جدید (حداکثر ۶ ماه)، گواهی سکونت (Meldebestätigung)، بیمه سلامت معتبر، تمکن مالی (حداقل ۱,۲۷۳.۹۹ یورو خالص ماهانه برای یک نفر)، و در صورت وجود، تغییرات وضعیت مدنی. توصیه می‌شود مدارک را اصل و کپی همراه داشته باشید.",
  },
  {
    q: "آیا می‌توانم از سفارت اتریش در ایران وقت بگیرم؟",
    a: "بله، از ۱ سپتامبر ۲۰۲۶، خدمات کنسولی سفارت اتریش در تهران به‌تدریج از سر گرفته می‌شود. می‌توانید برای ویزای شینگن (نوع C) و اقامت تحصیلی از طریق VFS Global در تهران اقدام کنید. برای اقامت تحصیلی و RWR Card، باید درخواست وقت خود را از طریق ایمیل teheran-ob@bmeia.gv.at ارسال کنید.",
  },
  {
    q: "چگونه اتریش‌نشین می‌تواند به من در وقت‌دهی سریع‌تر کمک کند؟",
    a: "تیم اتریش‌نشین با تجربه همراهی هزاران فارسی‌زبان، می‌تواند بهترین زمان‌ها را برای شما از اداره مهاجرت منطقه یا استان یا شهر شما پیدا کند. همچنین در ارتباط با سفارتخانه‌های اتریش در ایران، پاکستان و کشورهای همسایه، شما را راهنمایی می‌کند. این خدمات شامل بررسی مدارک، تکمیل فرم‌ها و پیگیری پرونده تا صدور مجوز است.",
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
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای MA 35",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل وقت‌دهی MA 35 اتریش ۲۰۲۶ | تمدید اقامت، مدارک و سفارتخانه‌ها",
    description: "راهنمای جامع وقت‌دهی از اداره مهاجرت وین (MA 35) و سفارتخانه‌های اتریش در ایران، پاکستان و کشورهای همسایه. شامل مراحل دریافت وقت، مدارک مورد نیاز، زمان انتظار و نکات کلیدی. به‌روز ۲۰۲۶.",
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
      { "@type": "ListItem", position: 2, name: "وقت‌دهی MA 35", item: "https://otrish-iran.ir/ma35" },
    ],
  },
];

// ==========================================
// HELPER COMPONENT - FilePlus (since not in lucide)
// ==========================================
function FilePlus(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v5h5"/>
      <path d="M12 11v6"/>
      <path d="M9 14h6"/>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
const MA35AppointmentGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / REQUIRED_DOCUMENTS.length) * 100);
  const displayedDocs = showAllDocs ? REQUIRED_DOCUMENTS : REQUIRED_DOCUMENTS.slice(0, 6);

  const currentStep = APPOINTMENT_STEPS.find((s) => s.step === activeStep);

  return (
    <>
      <SEO
        title="راهنمای کامل وقت‌دهی MA 35 اتریش ۲۰۲۶ | تمدید اقامت، مدارک و سفارتخانه‌ها | اتریش‌نشین"
        description="راهنمای جامع وقت‌دهی از اداره مهاجرت وین (MA 35) و سفارتخانه‌های اتریش در ایران، پاکستان و کشورهای همسایه. اتریش‌نشین در کمترین زمان بهترین وقت را برای شما می‌گیرد. شامل مراحل، مدارک و نکات کلیدی. به‌روز ۲۰۲۶."
        keywords="MA 35 وقت دهی, وقت MA 35, اداره مهاجرت وین, وقت اقامت اتریش, سفارت اتریش ایران, سفارت اتریش پاکستان, تمدید اقامت اتریش, مدارک MA 35, وقت دهی سریع اتریش, Erstinfo Gespräch"
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
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">📋</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[110px] pointer-events-none" />
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
                به‌روز ۲۰۲۶ — خدمات وقت‌دهی سریع
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-blue-300"> وقت‌دهی از MA 35 اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-4">
                اتریش‌نشین در این امور می‌تواند بهترین زمان‌ها را برای شما در کمترین زمان از اداره مهاجرت منطقه، استان یا شهر شما بگیرد.
                حتی از طریق سفارتخانه‌های اتریش در ایران، پاکستان و کشورهای اطراف — کنار شما هستیم تا پرونده شما با موفقیت پیش برود.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>وقت‌دهی سریع</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پیگیری کامل</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>سفارتخانه‌های همسایه</span>
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
              <Calendar className="w-5 h-5 text-blue-600" />
              وقت‌دهی هوشمند در تمام مراحل
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از MA 35 وین تا سفارتخانه‌های اتریش در ایران، پاکستان و ترکیه</p>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-2 border-amber-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-amber-900 text-sm mb-1 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              اتریش‌نشین در این امور کنار شماست
            </h3>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              با تجربه همراهی هزاران فارسی‌زبان، می‌توانیم <strong>بهترین زمان‌ها را در کمترین مدت</strong> از
              اداره مهاجرت منطقه یا استان یا شهر شما بگیریم. حتی از طریق سفارتخانه‌های اتریش در
              ایران، پاکستان و کشورهای اطراف. خدمات ما شامل بررسی مدارک، تکمیل فرم‌ها و پیگیری پرونده
              تا صدور مجوز است.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* APPOINTMENT STEPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ListChecks className="w-5 h-5 text-blue-600" />
              ۴ مرحله دریافت وقت از MA 35
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از شناسایی نوع درخواست تا تکمیل مدارک</p>
          </div>

          {/* Step Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {APPOINTMENT_STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.step;
              return (
                <motion.button key={step.step} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveStep(step.step)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${step.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"}`}>
                  <Icon className="w-4 h-4" />
                  مرحله {step.step}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {currentStep && (
              <motion.div key={currentStep.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 relative overflow-hidden">
                <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${currentStep.color} opacity-[0.08] rounded-full`} />

                <div className="relative flex flex-col md:flex-row items-start gap-6">
                  <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${currentStep.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {React.createElement(currentStep.icon, { className: "w-8 h-8" })}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <h3 className="text-base font-black text-stone-900">{currentStep.title}</h3>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${currentStep.color} text-white`}>مرحله {currentStep.step}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-bold mb-2">{currentStep.subtitle}</p>
                    <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{currentStep.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {currentStep.tips.map((tip, ti) => (
                        <span key={ti} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                          <Lightbulb className="w-3 h-3 text-amber-500" />
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* OFFICES DIRECTORY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              شعب و بخش‌های MA 35 در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">۵ شعبه در مناطق ۱، ۲، ۱۳، ۱۶ و ۲۰ — انتخاب آزاد از اکتبر ۲۰۲۵</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OFFICES_DATA.map((office, i) => {
              const Icon = office.icon;
              return (
                <motion.div key={office.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border-2 border-stone-200 hover:border-blue-300 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-lg">
                  <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${office.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                  <div className="relative flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${office.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-stone-900 text-xs mb-0.5">{office.name}</h3>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${office.color}`}>{office.type}</span>
                    </div>
                  </div>

                  <div className="relative space-y-1.5 text-[10px] font-bold text-stone-600 pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span>{office.address}</span>
                      <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span dir="ltr" className="font-mono">{office.phone}</span>
                      <Phone className="w-3 h-3 text-blue-500 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <span dir="ltr" className="font-mono text-[9px]">{office.email}</span>
                      <Mail className="w-3 h-3 text-blue-500 shrink-0" />
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
              <button type="button" onClick={() => setShowAllDocs(!showAllDocs)} className="text-[10px] font-black text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg transition-all">
                {showAllDocs ? "بستن" : "نمایش کامل"}
                <ChevronDown className={`w-3 h-3 transition-transform ${showAllDocs ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2.5 text-xs font-black text-stone-800">
              <span className="font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{progressPercent}% تکمیل شده</span>
              <span>مدارک الزامی: {REQUIRED_DOCUMENTS.filter((d) => d.required).length} مدرک</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
              <motion.div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full" initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {displayedDocs.map((doc, i) => {
              const Icon = doc.icon;
              const isChecked = checkedDocs[doc.name];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => toggleDoc(doc.name)} className={`border-2 rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${isChecked ? "border-emerald-500 bg-emerald-50/50" : "border-stone-200 hover:border-emerald-300"}`}>
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
                    <p className="text-[10px] text-stone-500 font-bold mt-0.5">{doc.note}</p>
                  </div>
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isChecked ? "text-emerald-500" : "text-stone-400"}`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* EMBASSIES SECTION */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              سفارتخانه‌های اتریش در کشورهای همسایه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">امکان دریافت وقت از سفارتخانه‌های اتریش در ایران، پاکستان و ترکیه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EMBASSIES_DATA.map((emb, i) => {
              const Icon = emb.icon;
              return (
                <motion.div key={emb.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border-2 border-stone-200 hover:border-blue-300 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-lg">
                  <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${emb.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                  <div className="relative flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${emb.color} flex items-center justify-center text-white shadow-md shrink-0 text-2xl`}>
                      {emb.flag}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-stone-900 text-xs mb-0.5">{emb.name}</h3>
                      <p className="text-[10px] text-stone-500 font-bold">{emb.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${emb.color}`}>{emb.status}</span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {emb.services.map((s, si) => (
                      <div key={si} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600">
                        <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5 text-[10px] font-bold text-stone-600">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span dir="ltr" className="font-mono text-[9px]">{emb.contact}</span>
                      <Mail className="w-3 h-3 text-blue-500 shrink-0" />
                    </div>
                    <p className="text-[9px] text-stone-400 italic">{emb.note}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              چرا وقت‌دهی سریع اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">آمار و حقایقی درباره وقت‌دهی و پردازش پرونده در اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock, title: "۶ ماه", text: "زمان انتظار Erstinfo از ۱ سال به ۶ ماه کاهش یافته", color: "from-blue-500 to-indigo-600" },
              { icon: Gauge, title: "۴۱ روز", text: "میانگین پردازش پرونده‌های مهاجرتی در MA 35", color: "from-emerald-500 to-teal-600" },
              { icon: Users, title: "۹۳ کارمند", text: "نیروی جدید استخدام شده برای تسریع در پردازش پرونده‌ها", color: "from-amber-500 to-orange-600" },
              { icon: Target, title: "۵ شعبه", text: "انتخاب آزاد شعبه از اکتبر ۲۰۲۵ بدون توجه به منطقه سکونت", color: "from-purple-500 to-fuchsia-600" },
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
              <HelpCircle className="w-5 h-5 text-blue-600" />
              سوالات متداول درباره وقت‌دهی MA 35
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
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">آیا برای وقت‌دهی نیاز به کمک دارید؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اتریش‌نشین با تجربه همراهی هزاران فارسی‌زبان، می‌تواند بهترین زمان‌ها را برای شما در کمترین مدت
              از اداره مهاجرت منطقه یا استان یا شهر شما بگیرد. حتی از طریق سفارتخانه‌های اتریش در ایران، پاکستان
              و کشورهای اطراف. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> وقت‌دهی سریع در واتس‌اپ
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
              این راهنما بر اساس منابع رسمی (wien.gv.at، presse.wien.gv.at، ticket.wien.gv.at/M35،
              bmeia.gv.at) تهیه شده و صرفاً جنبه آموزشی دارد. شرایط، زمان‌های انتظار و رویه‌ها ممکن است
              بدون اطلاع تغییر کند. برای اطلاعات نهایی و به‌روز، همیشه به سایت‌های رسمی مراجعه کنید یا
              با کارشناسان ما مشورت نمایید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
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
              "MA 35 وقت دهی", "وقت MA 35", "اداره مهاجرت وین", "وقت اقامت اتریش",
              "سفارت اتریش ایران", "سفارت اتریش پاکستان", "تمدید اقامت اتریش",
              "مدارک MA 35", "وقت دهی سریع اتریش", "Erstinfo Gespräch",
              "Aufenthaltstitel", "Verlängerungsantrag",
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

export default MA35AppointmentGuide;