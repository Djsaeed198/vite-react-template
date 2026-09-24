import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car, FileText, Award, Clock, ShieldCheck, MapPin, Users, Sparkles,
  CheckCircle, ChevronDown, ChevronLeft, ExternalLink, Info, Globe,
  BookOpen, Languages, Heart, Euro, Scale, Calendar, Star, TrendingUp,
  Building2, Rocket, Handshake, AlertTriangle, Target, Flag, BadgeCheck,
  FileCheck, Timer, Coins, Plane, Quote, GraduationCap, School,
  Phone, Mail, Navigation, Route, TrafficCone, Eye, AlertCircle,
  UserCheck, CreditCard, Camera, HeartPulse, Syringe, Briefcase, Home
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=80";
const DRIVING_IMAGE = "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80";

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۳-۶ ماه", label: "مدت تقریبی فرآیند", icon: "⏳" },
  { value: "€۱٬۲۰۰+", label: "هزینه تقریبی", icon: "💶" },
  { value: "۲", label: "آزمون اصلی", icon: "📝" },
  { value: "۱۸ سال", label: "حداقل سن", icon: "🎂" },
];

// ==========================================
// REQUIREMENTS
// ==========================================
const REQUIREMENTS = [
  {
    icon: Home,
    title: "اقامت اصلی در اتریش",
    text: "داشتن اقامت اصلی (Hauptwohnsitz) در اتریش که حداقل ۱۸۵ روز در سال در این کشور ثبت شده باشد. اقامت موقت یا توریستی کافی نیست.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: CreditCard,
    title: "گواهینامه معتبر ایرانی",
    text: "گواهینامه رانندگی ایرانی که حداقل ۶ ماه از صدور آن گذشته باشد و در زمان تبدیل معتبر باشد. ترجمه رسمی آلمانی یا انگلیسی مورد نیاز است.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: HeartPulse,
    title: "گواهی سلامت پزشکی",
    text: "ارائه گواهی پزشکی (Ärztliches Gutachten) از پزشک عمومی یا متخصص که سلامت جسمی و بینایی شما را تأیید کند. اعتبار: ۶ ماه.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Syringe,
    title: "دوره کمک‌های اولیه",
    text: "گذراندن دوره ۶ ساعته کمک‌های اولیه (Erste-Hilfe-Kurs) در یک مرکز معتبر مانند Samariterbund یا Rotes Kreuz.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: BookOpen,
    title: "قبولی در آزمون‌ها",
    text: "بسته به نوع گواهینامه، قبولی در آزمون تئوری (Theorieprüfung) و عملی (Praktische Prüfung) الزامی است.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Languages,
    title: "تسلط پایه به آلمانی",
    text: "آزمون تئوری به زبان آلمانی برگزار می‌شود. ترجمه‌های رسمی به چند زبان (از جمله انگلیسی) در برخی ایالت‌ها موجود است.",
    color: "from-pink-500 to-rose-600",
  },
];

// ==========================================
// STEPS TIMELINE
// ==========================================
const STEPS = [
  {
    n: "۰۱",
    icon: FileCheck,
    title: "ترجمه رسمی گواهینامه",
    text: "ترجمه رسمی گواهینامه ایرانی به آلمانی توسط مترجم رسمی دادگستری اتریش (Gerichtsdolmetscher).",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    n: "۰۲",
    icon: HeartPulse,
    title: "معاینه پزشکی",
    text: "مراجعه به پزشک عمومی برای گواهی سلامت جسمی و بینایی. برخی پزشکان مستقیم فرم ÖAMTC را پر می‌کنند.",
    color: "from-rose-500 to-red-600",
  },
  {
    n: "۰۳",
    icon: Syringe,
    title: "دوره کمک‌های اولیه",
    text: "ثبت‌نام و شرکت در دوره ۶ ساعته Erste-Hilfe-Kurs در Samariterbund، Rotes Kreuz یا مراکز معتبر.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    n: "۰۴",
    icon: School,
    title: "ثبت‌نام در آموزشگاه رانندگی",
    text: "انتخاب یک Fahrschule معتبر و ثبت‌نام برای دوره‌های تئوری و عملی. برخی آموزشگاه‌ها خدمات چندزبانه دارند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    n: "۰۵",
    icon: BookOpen,
    title: "آزمون تئوری",
    text: "شرکت در آزمون تئوری (Theorieprüfung) در دفتر Verkehrsamt ایالت محل سکونت. آزمون معمولاً کامپیوتری است.",
    color: "from-amber-500 to-orange-600",
  },
  {
    n: "۰۶",
    icon: Car,
    title: "آموزش عملی و آزمون",
    text: "گذراندن حداقل جلسات آموزش عملی و سپس شرکت در آزمون عملی (Praktische Prüfung) با خودرو آموزشگاه.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    n: "۰۷",
    icon: Award,
    title: "دریافت گواهینامه اتریشی",
    text: "پس از قبولی در آزمون‌ها، گواهینامه اتریشی صادر و برای شما ارسال می‌شود. گواهینامه ایرانی معمولاً باطل می‌شود.",
    color: "from-teal-500 to-cyan-600",
  },
];

// ==========================================
// DOCUMENTS NEEDED
// ==========================================
const DOCUMENTS = [
  {
    icon: FileText,
    title: "گواهینامه ایرانی",
    desc: "اصل + ترجمه رسمی آلمانی",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: CreditCard,
    title: "پاسپورت معتبر",
    desc: "با ویزا یا مجوز اقامت جاری",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Home,
    title: "گواهی اقامت (Meldezettel)",
    desc: "ثبت اقامت اصلی در اتریش",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Camera,
    title: "عکس پاسپورتی",
    desc: "۲ عدد، جدید و بیومتریک",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: HeartPulse,
    title: "گواهی پزشکی",
    desc: "Ärztliches Gutachten (اعتبار ۶ ماه)",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Syringe,
    title: "گواهی کمک‌های اولیه",
    desc: "Erste-Hilfe-Kurs (اعتبار نامحدود)",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: BookOpen,
    title: "ترجمه رسمی",
    desc: "توسط Gerichtsdolmetscher اتریش",
    color: "from-teal-500 to-cyan-600",
  },
  {
    icon: Euro,
    title: "رسید پرداخت هزینه‌ها",
    desc: "برای مراحل اداری و آموزشگاه",
    color: "from-indigo-500 to-purple-600",
  },
];

// ==========================================
// COST BREAKDOWN
// ==========================================
const COSTS = [
  { item: "ترجمه رسمی گواهینامه", price: "€۴۰-۸۰", icon: "📄" },
  { item: "معاینه پزشکی", price: "€۵۰-۱۲۰", icon: "🩺" },
  { item: "دوره کمک‌های اولیه", price: "€۶۰-۱۰۰", icon: "🚑" },
  { item: "هزینه اداری Verkehrsamt", price: "€۵۵-۸۰", icon: "🏛️" },
  { item: "آموزشگاه (پایه)", price: "€۴۰۰-۷۰۰", icon: "🏫" },
  { item: "جلسات اضافی عملی (هر جلسه)", price: "€۴۰-۶۰", icon: "🚗" },
  { item: "آزمون عملی", price: "€۱۵۰-۲۰۰", icon: "📝" },
  { item: "هزینه صدور گواهینامه", price: "€۶۰-۸۰", icon: "💳" },
];

// ==========================================
// DRIVING SCHOOLS
// ==========================================
const DRIVING_SCHOOLS = [
  {
    id: "wien-1",
    city: "Wien",
    name: "Fahrschule Aktiv Wien",
    districts: ["۱", "۲", "۳", "۴", "۵", "۶", "۷"],
    languages: ["آلمانی", "انگلیسی"],
    phone: "+43 1 555 1234",
    price: "€۵۵۰+",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    rating: 4.5,
    features: ["آموزش تئوری آنلاین", "خودرو اتوماتیک"],
  },
  {
    id: "wien-2",
    city: "Wien",
    name: "Fahrschule City Wien",
    districts: ["۱۰", "۱۱", "۱۲", "۱۵", "۲۳"],
    languages: ["آلمانی", "انگلیسی", "فارسی (بخشی)"],
    phone: "+43 1 555 5678",
    price: "€۶۰۰+",
    gradient: "from-purple-500 to-indigo-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    rating: 4.7,
    features: ["مشاور فارسی‌زبان", "آموزش تئوری حضوری"],
  },
  {
    id: "graz-1",
    city: "Graz",
    name: "Fahrschule Graz Süd",
    districts: ["Graz", "Graz-Umgebung"],
    languages: ["آلمانی", "انگلیسی"],
    phone: "+43 316 555 789",
    price: "€۵۰۰+",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    rating: 4.6,
    features: ["قیمت مناسب دانشجویی", "خودرو مدرن"],
  },
  {
    id: "linz-1",
    city: "Linz",
    name: "Fahrschule Linz Zentral",
    districts: ["Linz", "Urfahr"],
    languages: ["آلمانی", "انگلیسی"],
    phone: "+43 732 555 234",
    price: "€۵۲۰+",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    rating: 4.4,
    features: ["دوره‌های فشرده", "آموزش تئوری آنلاین"],
  },
  {
    id: "salzburg-1",
    city: "Salzburg",
    name: "Fahrschule Salzburg",
    districts: ["Salzburg Stadt", "Flachgau"],
    languages: ["آلمانی", "انگلیسی"],
    phone: "+43 662 555 890",
    price: "€۶۲۰+",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
    rating: 4.3,
    features: ["دسترسی مرکز شهر", "خودرو دوگانه"],
  },
  {
    id: "innsbruck-1",
    city: "Innsbruck",
    name: "Fahrschule Tirol",
    districts: ["Innsbruck", "Innsbruck-Land"],
    languages: ["آلمانی", "انگلیسی"],
    phone: "+43 512 555 678",
    price: "€۶۵۰+",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    rating: 4.5,
    features: ["تخصص در جاده‌های کوهستانی", "دوره امنیت"],
  },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: Flag,
    title: "دسترسی اروپا",
    text: "با گواهینامه اتریشی، در تمام ۲۷ کشور اتحادیه اروپا و ۳۰+ کشور دیگر می‌توانید رانندگی کنید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Car,
    title: "خرید و اجاره خودرو",
    text: "امکان خرید خودرو، اجاره خودرو و استفاده از سرویس‌های Car-Sharing به‌سادگی فراهم می‌شود.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Briefcase,
    title: "فرصت‌های شغلی",
    text: "بسیاری از مشاغل در اتریش نیازمند گواهینامه اتریشی هستند (پیک، راننده، فروشنده سیار).",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "استقلال و آزادی",
    text: "دسترسی به مناطق خارج از شبکه مترو، سفرهای آخر هفته و آزادی در جابجایی روزانه.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا گواهینامه ایرانی من به‌طور خودکار به اتریشی تبدیل می‌شود؟",
    a: "خیر، ایران از کشورهایی نیست که گواهینامه‌اش بدون آزمون به گواهینامه اتریشی تبدیل شود (Umschreibung). شما باید در آزمون تئوری و عملی شرکت کنید، اما معمولاً می‌توانید آموزش‌های عملی کمتری دریافت کنید.",
  },
  {
    q: "آیا می‌توانم با گواهینامه ایرانی در اتریش رانندگی کنم؟",
    a: "اگر اقامت اصلی (Hauptwohnsitz) در اتریش دارید، پس از ۶ ماه از ثبت اقامت، گواهینامه ایرانی شما معتبر نخواهد بود و باید گواهینامه اتریشی دریافت کنید. قبل از ۶ ماه، با ترجمه رسمی می‌توانید رانندگی کنید.",
  },
  {
    q: "آیا آزمون تئوری به زبان انگلیسی در دسترس است؟",
    a: "بله، در بیشتر ایالت‌های اتریش، آزمون تئوری به زبان انگلیسی و چند زبان دیگر در دسترس است. برای اطمینان، حتماً در زمان ثبت‌نام در آموزشگاه این موضوع را بررسی کنید.",
  },
  {
    q: "آیا گواهینامه ایرانی من پس از دریافت گواهینامه اتریشی باطل می‌شود؟",
    a: "بله، در بیشتر موارد گواهینامه ایرانی شما توسط مقامات اتریشی ضبط و به سفارت ایران ارسال می‌شود. اتریش تابعیت دوگانه گواهینامه را نمی‌پذیرد. در برخی موارد استثنایی، ممکن است بتوانید آن را نگه دارید.",
  },
  {
    q: "چقدر طول می‌کشد تا گواهینامه اتریشی بگیرم؟",
    a: "بسته به سرعت شما در گذراندن مراحل، بین ۳ تا ۶ ماه زمان می‌برد. عوامل مؤثر: سرعت در جمع‌آوری مدارک، دسترسی به زمان‌های آزاد آموزشگاه، و زمان انتظار برای آزمون‌ها.",
  },
  {
    q: "اگر گواهینامه ایرانی من منقضی شده باشد چه کنم؟",
    a: "اگر گواهینامه ایرانی شما منقضی شده یا اعتبار آن مشکوک است، ممکن است نتوانید از تسهیلات تبدیل استفاده کنید. در این صورت باید از صفر در فرآیند گواهینامه اتریشی شرکت کنید (شامل تمام جلسات اجباری آموزش عملی).",
  },
  {
    q: "آیا برای موتورسیکلت هم شرایط مشابه است؟",
    a: "بله، برای موتورسیکلت (کلاس A) نیز فرآیند مشابه است اما آزمون‌ها و آموزش‌ها مختص موتورسیکلت است. سن حداقل برای موتورسیکلت‌های سنگین ۲۴ سال و برای سبک‌تر ۱۸ سال است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const DrivingLicenseGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCity, setSelectedCity] = useState<string>("all");

  const filteredSchools = selectedCity === "all"
    ? DRIVING_SCHOOLS
    : DRIVING_SCHOOLS.filter(s => s.city === selectedCity);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای تبدیل گواهینامه ایرانی به اتریشی",
      description:
        "مراحل گام‌به‌گام تبدیل گواهینامه رانندگی ایرانی به گواهینامه اتریشی همراه با مدارک، هزینه‌ها و آموزشگاه‌های معتبر.",
      totalTime: "P6M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: "1200",
      },
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
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
      headline: "راهنمای کامل تبدیل گواهینامه رانندگی در اتریش ۲۰۲۶",
      description:
        "شرایط، مراحل، مدارک، هزینه‌ها و آموزشگاه‌های رانندگی اتریش برای فارسی‌زبانان.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      datePublished: "2025-01-01",
      dateModified: "2025-01-01",
      inLanguage: "fa",
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای تبدیل گواهینامه ایرانی به اتریشی ۲۰۲۶ | مراحل، مدارک و آموزشگاه‌ها"
        description="راهنمای جامع تبدیل گواهینامه رانندگی ایرانی به اتریشی: شرایط، مدارک، آزمون تئوری و عملی، هزینه‌ها، آموزشگاه‌های معتبر و نکات کاربردی برای فارسی‌زبانان."
        keywords="تبدیل گواهینامه اتریش, گواهینامه ایرانی اتریش, Umschreibung, Fahrschule وین, آزمون تئوری اتریش, آزمون عملی اتریش, گواهینامه رانندگی اتریش, اتریش‌نشین"
        schemaData={seoSchema}
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
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="جاده رانندگی در اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🚗
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
                <Car className="w-3.5 h-3.5 text-amber-300" />
                Führerschein Umschreibung Österreich
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای تبدیل گواهینامه رانندگی در اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                مراحل گام‌به‌گام تبدیل گواهینامه ایرانی به اتریشی — از ترجمه رسمی
                و معاینه پزشکی تا آزمون تئوری و عملی. با مدارک، هزینه‌ها و
                آموزشگاه‌های معتبر در پنج شهر اصلی اتریش.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>مراحل رسمی ۲۰۲۶</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>مدارک دقیق</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>آموزشگاه‌های معتبر</span>
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
        {/* INTRO OVERVIEW */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
        >
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={DRIVING_IMAGE}
                alt="آموزش رانندگی در اتریش"
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
              <Car className="w-6 h-6 mb-1" />
              <div className="text-[10px] font-black opacity-80">گواهینامه</div>
              <div className="text-xs font-black">اتریش ۲۰۲۶</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
              <Info className="w-3.5 h-3.5" />
              مقدمه
            </div>
            <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
              چرا تبدیل گواهینامه مهم است؟
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
              گواهینامه رانندگی اتریشی نه تنها یک مدرک هویتی معتبر در کل اتحادیه
              اروپا است، بلکه کلید دسترسی به فرصت‌های شغلی، آزادی جابجایی در
              مناطق خارج از شبکه مترو و امکان خرید و اجاره خودرو را فراهم می‌کند.
              ایران در فهرست کشورهای دارای توافق تبدیل خودکار گواهینامه نیست، پس
              باید در آزمون‌ها شرکت کنید — اما از آموزش عملی کمتری بهره‌مند می‌شوید.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Globe, text: "معتبر در کل اتحادیه اروپا" },
                { icon: Briefcase, text: "دسترسی به مشاغل رانندگی" },
                { icon: Car, text: "خرید و اجاره خودرو" },
                { icon: Route, text: "سفر آزاد بین‌شهری" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                  >
                    <Icon className="w-4 h-4 text-[#c8102e] flex-shrink-0" />
                    <span className="text-[10px] font-black text-stone-700">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* REQUIREMENTS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              شرایط و پیش‌نیازهای تبدیل
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              شش شرط اساسی که برای شروع فرآیند باید احراز کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
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
        {/* STEPS TIMELINE */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Rocket className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              مراحل گام‌به‌گام تبدیل گواهینامه
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              از ترجمه مدارک تا دریافت گواهینامه اتریشی — هفت گام کلیدی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group"
                >
                  <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 group-hover:text-rose-100 transition-colors">
                    {s.n}
                  </div>
                  <div
                    className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-1.5">
                    {s.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {s.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* DOCUMENTS NEEDED */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              مدارک مورد نیاز
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چک‌لیست کامل مدارکی که باید آماده کنید
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DOCUMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 relative overflow-hidden group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-stone-900 text-[11px] mb-1 leading-snug">
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
        {/* COST BREAKDOWN */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

          <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black bg-rose-100 text-[#c8102e] px-2.5 py-1 rounded-full">
                  سال ۲۰۲۶
                </span>
                <Euro className="w-4 h-4 text-[#c8102e]" />
              </div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 leading-tight">
                برآورد هزینه‌های تبدیل گواهینامه
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1.5">
                هزینه‌های تقریبی برای کل فرآیند (ممکن است بسته به ایالت متفاوت باشد)
              </p>
            </div>

            <div className="flex items-center gap-3 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-3 shadow-lg">
              <Coins className="w-6 h-6" />
              <div>
                <div className="text-[9px] font-black opacity-90">مجموع تقریبی</div>
                <div className="text-sm font-black font-mono">€۱٬۲۰۰-۲٬۰۰۰</div>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-gradient-to-l from-stone-100 to-stone-50 border-b border-stone-200 text-stone-600 font-black">
                  <tr>
                    <th className="p-3 md:p-4">مرحله / آیتم</th>
                    <th className="p-3 md:p-4 text-left whitespace-nowrap">هزینه تقریبی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                  {COSTS.map((c, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="hover:bg-stone-50/70 transition-colors"
                    >
                      <td className="p-3 md:p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.icon}</span>
                          <span className="text-[11px] md:text-xs font-black text-stone-800">
                            {c.item}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 md:p-4 text-left font-mono font-black text-[#c8102e]">
                        {c.price}
                      </td>
                    </motion.tr>
                  ))}
                  <tr className="bg-gradient-to-l from-stone-900 to-[#0a1128] text-white font-black">
                    <td className="p-3 md:p-4">مجموع کل تقریبی</td>
                    <td className="p-3 md:p-4 text-left font-mono text-amber-300">
                      €۱٬۲۰۰-۲٬۰۰۰
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 font-bold leading-relaxed">
              <strong>نکته:</strong> هزینه‌ها بسته به تعداد جلسات آموزش عملی،
              منطقه و آموزشگاه متفاوت است. توصیه می‌شود قبل از انتخاب آموزشگاه،
              حتماً از چند گزینه استعلام قیمت بگیرید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DRIVING SCHOOLS */}
        {/* ========================================== */}
        <div>
          <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-5">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <School className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                آموزشگاه‌های رانندگی در اتریش
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                برخی از آموزشگاه‌های معروف در شهرهای اصلی (جهت معرفی نمونه)
              </p>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl flex-wrap">
              {[
                { id: "all", label: "همه" },
                { id: "Wien", label: "وین" },
                { id: "Graz", label: "گراتس" },
                { id: "Linz", label: "لینتس" },
                { id: "Salzburg", label: "سالزبورگ" },
                { id: "Innsbruck", label: "اینسبروک" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCity(tab.id)}
                  className={`px-3 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all ${
                    selectedCity === tab.id
                      ? "bg-white text-[#c8102e] shadow-sm"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredSchools.map((school, i) => (
                <motion.div
                  key={school.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
                >
                  {/* Header */}
                  <div className={`relative h-24 bg-gradient-to-br ${school.gradient} p-4`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative flex items-start justify-between h-full">
                      <div>
                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-[9px] font-black px-2 py-0.5 rounded-full mb-2">
                          <MapPin className="w-2.5 h-2.5" />
                          {school.city}
                        </div>
                        <h3 className="text-sm font-black text-white leading-tight">
                          {school.name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-[#c8102e]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3 h-3 ${
                              j < Math.floor(school.rating)
                                ? "text-amber-400 fill-current"
                                : "text-stone-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-stone-600 font-mono">
                        {school.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-stone-100">
                      <span className="text-[10px] font-black text-stone-500">
                        قیمت پایه:
                      </span>
                      <span className={`text-sm font-black font-mono ${school.text}`}>
                        {school.price}
                      </span>
                    </div>

                    {/* Languages */}
                    <div className="mb-3">
                      <div className="text-[9px] font-black text-stone-500 mb-1.5 flex items-center gap-1">
                        <Languages className="w-2.5 h-2.5" />
                        زبان‌های پشتیبانی
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {school.languages.map((lang, j) => (
                          <span
                            key={j}
                            className={`inline-flex items-center text-[9px] font-black ${school.bg} ${school.text} px-2 py-0.5 rounded-full`}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Districts */}
                    <div className="mb-3">
                      <div className="text-[9px] font-black text-stone-500 mb-1.5 flex items-center gap-1">
                        <Navigation className="w-2.5 h-2.5" />
                        مناطق تحت پوشش
                      </div>
                      <div className="text-[10px] font-bold text-stone-600">
                        {school.districts.join(" · ")}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-1.5 mb-4">
                      {school.features.map((f, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    {/* Contact */}
                    <a
                      href={`tel:${school.phone.replace(/\s/g, "")}`}
                      className={`flex items-center justify-center gap-2 w-full bg-gradient-to-br ${school.gradient} text-white font-black text-xs py-2.5 rounded-2xl shadow-md hover:scale-[1.02] transition-all`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {school.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-indigo-900 font-bold leading-relaxed">
              <strong>نکته:</strong> این آموزشگاه‌ها صرفاً به‌عنوان نمونه معرفی
              شده‌اند و اتریش‌نشین هیچ ارتباط تجاری با آن‌ها ندارد. توصیه می‌شود
              قبل از ثبت‌نام، حتماً از دوستان یا انجمن‌های فارسی‌زبان محلی
              استعلام بگیرید. اتحادیه آموزشگاه‌های رانندگی اتریش (Fahrschulverband)
              می‌تواند لیست کامل را در اختیار شما قرار دهد.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              مزایای گواهینامه اتریشی
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیل که ارزش سرمایه‌گذاری روی گواهینامه اتریشی را ثابت می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_USE.map((v, i) => {
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
              سوالات متداول
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              پاسخ به پرتکرارترین سوالات فارسی‌زبانان درباره گواهینامه اتریش
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
              نکات مهم قبل از شروع
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>مهلت قانونی تبدیل گواهینامه پس از ۶ ماه اقامت در اتریش فرا می‌رسد.</li>
              <li>گواهینامه ایرانی شما معمولاً در هنگام تبدیل ضبط و باطل می‌شود.</li>
              <li>قبل از پرداخت هر هزینه، شرایط آموزشگاه را دقیق بررسی کنید.</li>
              <li>در صورت منقضی شدن گواهینامه ایرانی، ممکن است از تسهیلات تبدیل محروم شوید.</li>
              <li>قوانین بین ایالت‌ها متفاوت است — از Verkehrsamt ایالت خود اطلاعات دقیق بگیرید.</li>
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
              همراه شما در مسیر گواهینامه
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوالی درباره تبدیل گواهینامه دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره مدارک، آزمون‌ها،
              انتخاب آموزشگاه یا هر موضوع مرتبط با گواهینامه اتریش است.
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
              اطلاعات این راهنما بر اساس منابع رسمی و تجربه‌های میدانی تهیه شده
              و صرفاً جنبه آموزشی دارد. قوانین و هزینه‌ها ممکن است بین ایالت‌ها
              و در طول زمان تغییر کنند. اتریش‌نشین هیچ ارتباط تجاری با
              آموزشگاه‌های ذکرشده ندارد. برای تصمیم‌های نهایی، حتماً با
              Verkehrsamt ایالت خود یا آموزشگاه معتبر مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </>
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

export default DrivingLicenseGuide;