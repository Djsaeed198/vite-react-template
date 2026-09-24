import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play, ExternalLink, Search, Globe, Building2, ShieldCheck, ShoppingBag,
  Landmark, Heart, Users, Sparkles, CheckCircle, Star, TrendingUp, Award,
  Zap, Rocket, Handshake, ChevronDown, ChevronLeft, Clock, MapPin, Info,
  Wallet, Home, FileText, Calculator, School, Plane, Bus, Phone, Mail,
  MessageCircle, Send, BookOpen, Briefcase, HeartHandshake, BadgeCheck,
  Crown, Filter, LayoutGrid, ArrowUpDown, Copy, Check, Lightbulb, Target,
  Camera, CreditCard, Coffee, Gift, Music, Palette, Trophy, Flag, X
} from 'lucide-react';
import SEO from './SEO';
import { toast } from '../utils/toast';

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_IMG = "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800&q=80";

// ==========================================
// LINKS DATA WITH METADATA
// ==========================================
interface LinkItem {
  name: string;
  shortName: string;
  url: string;
  description: string;
  icon: any;
  gradient: string;
  bg: string;
  text: string;
  badge?: string;
  category: string;
}

interface CategoryGroup {
  id: string;
  category: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string;
  bg: string;
  text: string;
  emoji: string;
  items: LinkItem[];
}

const linksData: CategoryGroup[] = [
  {
    id: "government",
    category: "سازمان‌های دولتی ملی اتریش",
    shortLabel: "دولتی",
    subtitle: "Behörden & Ämter",
    description: "دسترسی به ادارات رسمی، مهاجرت، مالیات و بیمه‌های ملی اتریش",
    icon: Landmark,
    gradient: "from-[#c8102e] to-[#970d22]",
    bg: "bg-rose-50",
    text: "text-rose-700",
    emoji: "🏛️",
    items: [
      {
        name: "MA35 - اداره مهاجرت و شهروندی وین",
        shortName: "MA35",
        url: "https://www.wien.gv.at/verwaltung/einwanderung/",
        description: "مرجع اصلی اقامت، تابعیت و امور مهاجرتی در وین",
        icon: Building2,
        gradient: "from-rose-500 to-red-600",
        bg: "bg-rose-50",
        text: "text-rose-700",
        badge: "ضروری",
        category: "government",
      },
      {
        name: "AMS - اداره سراسری توسعه اشتغال و کار",
        shortName: "AMS",
        url: "https://www.ams.at/",
        description: "خدمات کاریابی، بیمه بیکاری و آموزش‌های شغلی",
        icon: Briefcase,
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        badge: "محبوب",
        category: "government",
      },
      {
        name: "سفارت جمهوری اسلامی ایران در وین",
        shortName: "سفارت ایران",
        url: "https://austria.mfa.gov.ir/",
        description: "خدمات کنسولی، تمدید گذرنامه و امور ایرانیان",
        icon: Flag,
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        text: "text-amber-700",
        category: "government",
      },
      {
        name: "FinanzOnline - سامانه مالیاتی اتریش",
        shortName: "FinanzOnline",
        url: "https://finanzonline.bmf.gv.at/",
        description: "اظهارنامه مالیاتی، بازپرداخت مالیات و امور مالی",
        icon: Calculator,
        gradient: "from-indigo-500 to-purple-600",
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        badge: "مالی",
        category: "government",
      },
    ],
  },
  {
    id: "city",
    category: "خدمات شهری و بیمه اورژانس",
    shortLabel: "شهری",
    subtitle: "Stadt & Versicherung",
    description: "خدمات شهری، انرژی، حمل‌ونقل و بیمه‌های درمانی اتریش",
    icon: ShieldCheck,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    emoji: "🏙️",
    items: [
      {
        name: "Wien Energie - سامانه تامین برق و گاز وین",
        shortName: "Wien Energie",
        url: "https://www.wienerenergie.at/",
        description: "ثبت‌نام انشعابات، صورت‌حساب و خدمات انرژی",
        icon: Zap,
        gradient: "from-yellow-500 to-amber-600",
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        category: "city",
      },
      {
        name: "Wiener Linien - شبکه حمل‌ونقل شهری وین",
        shortName: "Wiener Linien",
        url: "https://www.wienerlinien.at/",
        description: "بلیت مترو، اتوبوس، تراموا و Klimaticket",
        icon: Bus,
        gradient: "from-sky-500 to-blue-600",
        bg: "bg-sky-50",
        text: "text-sky-700",
        badge: "روزانه",
        category: "city",
      },
      {
        name: "ÖGK - سازمان بیمه و اورژانس سلامت ملی",
        shortName: "ÖGK",
        url: "https://www.gesundheitskasse.at/",
        description: "بیمه درمانی، انتخاب پزشک و اورژانس سلامت",
        icon: Heart,
        gradient: "from-rose-500 to-pink-600",
        bg: "bg-rose-50",
        text: "text-rose-700",
        badge: "بیمه",
        category: "city",
      },
      {
        name: "WKO - اتاق بازرگانی سراسری اتریش",
        shortName: "WKO",
        url: "https://www.wko.at/",
        description: "پشتیبانی از کارآفرینان، مجوزها و آموزش‌های تجاری",
        icon: Building2,
        gradient: "from-slate-500 to-gray-700",
        bg: "bg-slate-50",
        text: "text-slate-700",
        category: "city",
      },
    ],
  },
  {
    id: "community",
    category: "کامیونیتی، فلومارکت و معیشت",
    shortLabel: "اجتماعی",
    subtitle: "Community & Marktplatz",
    description: "حمایت کارگران، خرید و فروش دست دوم، اجاره مسکن و مراجع محلی",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    emoji: "🛒",
    items: [
      {
        name: "Arbeiterkammer - صنف حمایت از حقوق کارگران",
        shortName: "AK",
        url: "https://www.arbeiterkammer.at/",
        description: "حمایت حقوقی، مشاوره کاری و خدمات کارگران",
        icon: ShieldCheck,
        gradient: "from-red-500 to-rose-600",
        bg: "bg-red-50",
        text: "text-red-700",
        badge: "حقوقی",
        category: "community",
      },
      {
        name: "Willhaben - بزرگترین فلومارکت وسایل دست دوم اتریش",
        shortName: "Willhaben",
        url: "https://www.willhaben.at/",
        description: "خرید و فروش وسایل دست دوم، خودرو و لوازم خانگی",
        icon: ShoppingBag,
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        badge: "پرطرفدار",
        category: "community",
      },
      {
        name: "Immobilienscout24 - پورتال یافتن مسکن و هم‌خانه",
        shortName: "ImmoScout24",
        url: "https://www.immobilienscout24.at/",
        description: "جستجوی آپارتمان، خانه و هم‌خانه در سراسر اتریش",
        icon: Home,
        gradient: "from-indigo-500 to-purple-600",
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        badge: "مسکن",
        category: "community",
      },
      {
        name: "Herold - مرجع کدها، پزشکان و صرافی‌های مجاز",
        shortName: "Herold",
        url: "https://www.herold.at/",
        description: "دفترچه تلفن رسمی، پزشکان و خدمات محلی",
        icon: Phone,
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        text: "text-amber-700",
        category: "community",
      },
    ],
  },
];

// ==========================================
// FEATURED / QUICK ACCESS
// ==========================================
const FEATURED_LINKS = [
  {
    id: "ma35",
    name: "MA35",
    fullName: "اداره مهاجرت وین",
    description: "همه امور اقامت، تابعیت و ویزا",
    url: "https://www.wien.gv.at/verwaltung/einwanderung/",
    icon: Building2,
    gradient: "from-[#c8102e] to-[#970d22]",
    emoji: "🛂",
  },
  {
    id: "ams",
    name: "AMS",
    fullName: "اداره کار",
    description: "کاریابی و بیمه بیکاری",
    url: "https://www.ams.at/",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-600",
    emoji: "💼",
  },
  {
    id: "willhaben",
    name: "Willhaben",
    fullName: "بازار دست دوم",
    description: "خرید و فروش وسایل",
    url: "https://www.willhaben.at/",
    icon: ShoppingBag,
    gradient: "from-sky-500 to-blue-600",
    emoji: "🛍️",
  },
  {
    id: "oegk",
    name: "ÖGK",
    fullName: "بیمه سلامت",
    description: "بیمه و اورژانس درمانی",
    url: "https://www.gesundheitskasse.at/",
    icon: Heart,
    gradient: "from-rose-500 to-pink-600",
    emoji: "🏥",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۱۲+", label: "لینک رسمی", icon: "🌐" },
  { value: "۳", label: "دسته اصلی", icon: "📂" },
  { value: "۱۰۰٪", label: "منابع معتبر", icon: "✅" },
  { value: "۲۴/۷", label: "دسترسی رایگان", icon: "⏰" },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: ShieldCheck,
    title: "منابع رسمی و تأیید‌شده",
    text: "تمام لینک‌ها مستقیماً به سایت‌های رسمی دولتی و سازمان‌های معتبر اتریش اشاره می‌کنند.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Zap,
    title: "دسترسی سریع",
    text: "بدون ثبت‌نام، بدون واسطه. یک کلیک شما را به سرویس مورد نظر می‌رساند.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Sparkles,
    title: "دسته‌بندی هوشمند",
    text: "لینک‌ها بر اساس کاربرد روزمره (دولتی، شهری، اجتماعی) دسته‌بندی شده‌اند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "ساخته‌شده برای فارسی‌زبانان",
    text: "توضیحات هر سرویس به فارسی، برای درک سریع کاربرد هر سایت.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "چرا این لینک‌ها برای فارسی‌زبانان اتریش مهم است؟",
    a: "بسیاری از مهاجران تازه‌وارد با سیستم اداری اتریش آشنایی ندارند. این کاتالوگ، دسترسی سریع به مهم‌ترین سایت‌های رسمی اتریش را با توضیحات فارسی فراهم می‌کند و شما را از سردرگمی نجات می‌دهد.",
  },
  {
    q: "آیا این لینک‌ها به‌روز هستند؟",
    a: "بله، تیم اتریش‌نشین لینک‌ها را به‌صورت دوره‌ای بررسی می‌کند و در صورت تغییر آدرس یا سرویس، آن‌ها را به‌روزرسانی می‌کند. در صورت مشاهده لینک معیوب از طریق تلگرام به ما اطلاع دهید.",
  },
  {
    q: "آیا می‌توانم پیشنهاد لینک جدید بدهم؟",
    a: "بله! اگر سرویس یا سایت مفیدی می‌شناسید که به فارسی‌زبانان کمک می‌کند، لطفاً از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ، ایمیل) پیشنهاد خود را ارسال کنید.",
  },
  {
    q: "چرا در این کاتالوگ لینک‌های غیررسمی وجود ندارد؟",
    a: "هدف ما ارائه دسترسی امن و معتبر به منابع رسمی است. سایت‌های غیررسمی ممکن است اطلاعات نادرست یا قدیمی داشته باشند و کاربران را به اشتباه بیندازند. صرفاً لینک‌های تأیید‌شده و مورد اعتماد منتشر می‌شوند.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function EcosystemPortal() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Flatten all links for search
  const allLinks = useMemo(() => linksData.flatMap(g => g.items), []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim() && activeCategory === 'all') return linksData;

    return linksData
      .filter(g => activeCategory === 'all' || g.id === activeCategory)
      .map(g => ({
        ...g,
        items: g.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.shortName.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter(g => g.items.length > 0);
  }, [searchQuery, activeCategory]);

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "کاتالوگ پیوندهای مفید اتریش - اتریش‌نشین",
      url: "https://otrish-iran.ir/ecosystem",
      description:
        "کاتالوگ کامل لینک‌های رسمی اتریش برای فارسی‌زبانان مقیم: ادارات دولتی، بیمه، خدمات شهری و بازارهای اجتماعی.",
      inLanguage: "fa",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://otrish-iran.ir/ecosystem?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "پیوندهای مفید اتریش",
      numberOfItems: allLinks.length,
      itemListElement: allLinks.map((link, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: link.name,
        url: link.url,
        description: link.description,
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "اتریش‌نشین", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "کاتالوگ پیوندها", item: "https://otrish-iran.ir/ecosystem" },
      ],
    },
  ];

  const handleCopyLink = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setSuccessMessage(`لینک «${name}» کپی شد!`);
    toast.success("کپی شد!");
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  return (
    <>
      <SEO
        title="کاتالوگ پیوندهای رسمی اتریش | ادارات دولتی، بیمه، مسکن و کار"
        description="دسترسی سریع به تمام سایت‌های رسمی اتریش برای فارسی‌زبانان: MA35، AMS، FinanzOnline، ÖGK، Wiener Linien، Willhaben، AK و بیشتر. بدون واسطه، بدون ثبت‌نام."
        keywords="لینک‌های مفید اتریش, MA35, AMS اتریش, FinanzOnline, ÖGK, Wiener Linien, Willhaben, Arbeiterkammer, سفارت ایران وین, سایت‌های رسمی اتریش, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl" id="ecosystem-portal-v6">
        {/* ========================================== */}
        {/* SUCCESS TOAST */}
        {/* ========================================== */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-stone-900 to-[#0a1128] border-2 border-emerald-500 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-3 text-xs font-black pr-5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{successMessage}</span>
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-stone-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              alt="وین اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🌐
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
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                Links & Services Österreich 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                کاتالوگ پیوندهای رسمی اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                دسترسی سریع و بدون واسطه به مهم‌ترین سایت‌های رسمی اتریش —
                از ادارات دولتی، بیمه سلامت و خدمات شهری تا بازارهای دست دوم و
                انجمن‌های حمایت از کارگران. همه لینک‌ها با توضیحات فارسی.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Zap className="w-3.5 h-3.5" />
                  <span>دسترسی آنی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>توضیحات فارسی</span>
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
        {/* FEATURED QUICK ACCESS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              دسترسی سریع به پرکاربردترین‌ها
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار سرویس که بیشترین استفاده روزانه را برای فارسی‌زبانان دارند
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {FEATURED_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className={`relative h-28 bg-gradient-to-br ${link.gradient} p-4 overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="text-[100px] absolute -bottom-8 -left-4">{link.emoji}</div>
                    </div>
                    <div className="relative flex items-start justify-between h-full">
                      <div className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Icon className="w-5 h-5 text-[#c8102e]" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white transition" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-black text-stone-900 text-sm mb-0.5">
                      {link.name}
                    </h3>
                    <p className="text-[10px] font-bold text-stone-500 mb-2">
                      {link.fullName}
                    </p>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN CATALOG */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="absolute-line top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

          {/* Header */}
          <div className="p-5 md:p-6 border-b border-stone-100">
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
              <div>
                <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                  کاتالوگ کامل پیوندها
                </h2>
                <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                  {totalResults} لینک رسمی در {filteredGroups.length} دسته‌بندی
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-700">لینک‌ها تأیید‌شده</span>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="جستجوی سرویس... (مثال: بیمه، مالیات، مسکن)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-10 pl-4 py-3 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-3.5 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Tabs */}
              <div className="md:col-span-7 flex items-center gap-1 bg-stone-100 p-1 rounded-2xl flex-wrap md:justify-end">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all inline-flex items-center gap-1.5 ${
                    activeCategory === 'all'
                      ? 'bg-white text-[#c8102e] shadow-sm'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  همه ({allLinks.length})
                </button>
                {linksData.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all inline-flex items-center gap-1.5 ${
                        activeCategory === cat.id
                          ? 'bg-white text-[#c8102e] shadow-sm'
                          : 'text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.shortLabel} ({cat.items.length})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="p-5 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {filteredGroups.map((group, gi) => {
                  const GroupIcon = group.icon;
                  return (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.1 }}
                    >
                      {/* Group Header */}
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-stone-100">
                        <div
                          className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center text-white shadow-lg`}
                        >
                          <GroupIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-stone-900 text-sm md:text-base flex items-center gap-2">
                            <span>{group.emoji}</span>
                            {group.category}
                          </h3>
                          <p className="text-[10px] md:text-xs font-bold text-stone-500 mt-0.5">
                            {group.description} · {group.subtitle}
                          </p>
                        </div>
                        <span className="text-[10px] font-black text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full font-mono">
                          {group.items.length}
                        </span>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {group.items.map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ y: -6 }}
                              className="group relative bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
                            >
                              {/* Decorative gradient */}
                              <div
                                className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-[0.08] rounded-full group-hover:opacity-[0.15] transition-opacity`}
                              />

                              <div className="relative p-5 flex-1 flex flex-col">
                                {/* Header with icon + badge */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <div
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                                  >
                                    <Icon className="w-6 h-6" />
                                  </div>

                                  {item.badge && (
                                    <span className={`inline-flex items-center gap-1 bg-gradient-to-r ${item.gradient} text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm`}>
                                      <Star className="w-2.5 h-2.5 fill-current" />
                                      {item.badge}
                                    </span>
                                  )}
                                </div>

                                {/* Title */}
                                <h4 className="font-black text-stone-900 text-xs md:text-sm mb-1 leading-snug">
                                  {item.name}
                                </h4>

                                {/* Description */}
                                <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed mb-4 flex-1">
                                  {item.description}
                                </p>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-br ${item.gradient} text-white font-black text-[10.5px] py-2.5 rounded-xl shadow-md hover:scale-[1.02] transition-all`}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>ورود به سایت</span>
                                  </a>

                                  <motion.button
                                    onClick={() => handleCopyLink(item.url, item.shortName)}
                                    whileTap={{ scale: 0.9 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-all flex-shrink-0"
                                    title="کپی لینک"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Empty State */}
                {filteredGroups.length === 0 && (
                  <div className="col-span-2 text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-stone-400" />
                    </div>
                    <p className="text-sm font-black text-stone-700 mb-1">
                      نتیجه‌ای یافت نشد
                    </p>
                    <p className="text-[11px] font-bold text-stone-500 mb-4">
                      عبارت دیگری را جستجو کنید یا همه دسته‌ها را ببینید
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <X className="w-3 h-3" />
                      پاک‌سازی فیلترها
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              چرا این کاتالوگ منحصر به‌فرد است؟
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیل که این پلتفرم را به مرجع اصلی فارسی‌زبانان تبدیل می‌کند
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
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Lightbulb className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-black text-stone-900 mb-3">
                نکته حرفه‌ای برای مهاجران تازه‌وارد
              </h3>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                توصیه می‌کنیم این لینک‌ها را <strong className="text-indigo-700">در مرورگر خود Bookmark کنید</strong> و
                برای مواقع ضروری در پوشه‌ای به نام «اتریش» ذخیره کنید. همچنین،
                برای ثبت اقامت اولیه، حتماً به ترتیب: Meldeamt ← MA35 ← ÖGK
                مراجعه کنید تا از سردرگمی جلوگیری شود.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Home, label: "اول: Meldeamt" },
                  { icon: Building2, label: "دوم: MA35" },
                  { icon: Heart, label: "سوم: ÖGK" },
                  { icon: Briefcase, label: "چهارم: AMS" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl p-2.5 border border-indigo-100"
                    >
                      <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="text-[10px] font-black text-stone-700">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

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
              پاسخ به پرتکرارترین سوالات کاربران درباره کاتالوگ
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
              همراه شما در مسیر اداری
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سرویس مفیدی می‌شناسید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر سایت یا سرویس رسمی مفیدی می‌شناسید که به فارسی‌زبانان کمک می‌کند،
              پیشنهاد خود را با ما به اشتراک بگذارید. کاتالوگ را با هم کامل‌تر کنیم!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                واتس‌اپ اتریش
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
              تمامی لینک‌های این کاتالوگ به سایت‌های رسمی و مستقل اتریش اشاره
              دارند. اتریش‌نشین هیچ‌گونه ارتباط تجاری با سرویس‌های ذکرشده ندارد
              و مسئولیتی در قبال محتوای آن سایت‌ها نمی‌پذیرد. در صورت مشاهده لینک
              معیوب یا قدیمی، از طریق کانال‌های ارتباطی به ما اطلاع دهید.
            </p>
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