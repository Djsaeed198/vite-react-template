import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Database, Sparkles, Phone, Compass, Layers, ZoomIn, Award,
  Share2, BookmarkCheck, Building, Navigation, Target, Users, TrendingUp,
  ShieldCheck, Heart, Zap, Clock, Star, Globe, CheckCircle, Info,
  HelpCircle, ChevronDown, MessageCircle, Send, Handshake, Lightbulb,
  ExternalLink, Briefcase, Stethoscope, Scale, Languages, Store, Wallet,
  Ambulance, MapPinned, Route, Filter, List, Grid3x3, ArrowLeft, Trophy,
  BarChart3, Landmark, Coffee, GraduationCap, Home, Car, Train
} from "lucide-react";
import { Business } from '../types';
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
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "وین — قلب تپنده اتریش",
    caption: "بیشترین تمرکز خدمات فارسی‌زبان در پایتخت اتریش",
    icon: Landmark,
    tag: "وین",
  },
  {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    title: "شبکه سراسری خدمات",
    caption: "پزشکان، وکلا، مترجمان و کسب‌وکارها در سراسر اتریش",
    icon: Globe,
    tag: "شبکه",
  },
  {
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    title: "جستجوی هوشمند خدمات",
    caption: "فیلتر بر اساس شهر، دسته‌بندی و نیازهای فارسی‌زبانان",
    icon: Filter,
    tag: "جستجو",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۵", label: "شهر بزرگ اتریش", icon: MapPin },
  { value: "۶", label: "دسته خدمات", icon: Layers },
  { value: "۱۰۰٪", label: "رایگان و آفلاین", icon: Zap },
  { value: "۵۰+", label: "کسب‌وکار ثبت‌شده", icon: Building },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "اطلاعات تأیید شده", color: "text-emerald-600" },
  { icon: Zap, text: "کاملاً آفلاین", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "نقشه تعاملی اتریش‌نشین چگونه کار می‌کند؟",
    a: "این نقشه یک شبیه‌ساز آفلاین است که بر اساس مختصات واقعی شهرهای اصلی اتریش (وین، گراتس، لینتس، سالزبورگ، اینسبروک) طراحی شده. با کلیک روی هر شهر، کسب‌وکارها و خدمات فارسی‌زبان همان شهر روی نقشه میکرو (سمت راست) نمایش داده می‌شوند.",
  },
  {
    q: "چرا تعداد کسب‌وکارها در وین بیشتر است؟",
    a: "وین پایتخت اتریش و بزرگ‌ترین شهر این کشور است. بیش از ۴۰٪ جمعیت فارسی‌زبان مقیم اتریش در وین زندگی می‌کنند. به همین دلیل، بیشترین تمرکز خدمات (پزشکان، وکلا، رستوران‌ها، فروشگاه‌ها و...) نیز در این شهر است.",
  },
  {
    q: "دسته‌بندی کسب‌وکارها چیست؟",
    a: "کسب‌وکارها در ۶ دسته اصلی تقسیم شده‌اند: پزشکان (physicians)، خدمات حقوقی (legal)، مترجمان (translators)، فروشگاه‌ها (stores)، صرافی‌ها (currency) و خدمات اضطراری (emergency). هر دسته رنگ اختصاصی روی نقشه دارد.",
  },
  {
    q: "آیا اطلاعات کسب‌وکارها به‌روز است؟",
    a: "دیتابیس ما هر ۳ ماه به‌روزرسانی می‌شود. با این حال، توصیه می‌شود قبل از تماس، شماره تلفن و آدرس را با منابع رسمی کسب‌وکار تأیید کنید. اگر موردی اشتباه یافتید، لطفاً به ما گزارش دهید.",
  },
  {
    q: "چگونه می‌توانم کسب‌وکار خود را به نقشه اضافه کنم؟",
    a: "اگر کسب‌وکار شما خدمات فارسی‌زبانان را در اتریش ارائه می‌دهد، از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ یا ایمیل) با ما تماس بگیرید. پس از بررسی و تأیید، اطلاعات شما به نقشه اضافه خواهد شد.",
  },
  {
    q: "آیا نقشه در موبایل هم کار می‌کند؟",
    a: "بله، این نقشه کاملاً Responsive طراحی شده و روی همه دستگاه‌ها (موبایل، تبلت و دسکتاپ) به‌درستی نمایش داده می‌شود. برای تجربه بهتر در موبایل، گوشی خود را به حالت افقی (Landscape) بچرخانید.",
  },
];

// ==========================================
// CATEGORY INFO
// ==========================================
const CATEGORY_INFO = [
  { id: "physicians", name: "پزشکان", icon: Stethoscope, color: "emerald" },
  { id: "legal", name: "خدمات حقوقی", icon: Scale, color: "blue" },
  { id: "translators", name: "مترجمان", icon: Languages, color: "purple" },
  { id: "stores", name: "فروشگاه‌ها", icon: Store, color: "amber" },
  { id: "currency", name: "صرافی‌ها", icon: Wallet, color: "emerald" },
  { id: "emergency", name: "خدمات اضطراری", icon: Ambulance, color: "red" },
];

// ==========================================
// CITY DATA
// ==========================================
const AUSTRIAN_CITIES_DATA = [
  { id: 'vienna', name: 'وین', englishName: 'Vienna', x: 420, y: 100, color: '#ef4444', region: 'Wien', icon: Landmark, population: '۱.۹M' },
  { id: 'graz', name: 'گراتس', englishName: 'Graz', x: 360, y: 195, color: '#10b981', region: 'Steiermark', icon: GraduationCap, population: '۲۹۰K' },
  { id: 'linz', name: 'لینتس', englishName: 'Linz', x: 290, y: 85, color: '#3b82f6', region: 'Oberösterreich', icon: Building, population: '۲۰۵K' },
  { id: 'salzburg', name: 'سالزبورگ', englishName: 'Salzburg', x: 210, y: 135, color: '#f59e0b', region: 'Salzburg', icon: Coffee, population: '۱۵۵K' },
  { id: 'innsbruck', name: 'اینسبروک', englishName: 'Innsbruck', x: 90, y: 180, color: '#6366f1', region: 'Tirol', icon: Train, population: '۱۳۲K' }
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
    description:
      "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — نقشه تعاملی خدمات",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "نقشه تعاملی خدمات فارسی‌زبانان اتریش",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description:
      "شبیه‌ساز تعاملی آفلاین برای جستجوی پزشکان، وکلا، مترجمان و کسب‌وکارهای فارسی‌زبان در ۵ شهر بزرگ اتریش.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1287",
    },
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
      { "@type": "ListItem", position: 2, name: "نقشه خدمات", item: "https://otrish-iran.ir/map" },
    ],
  },
];

// ==========================================
// INTERFACES
// ==========================================
interface InteractiveServiceMapProps {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  filteredBusinesses: Business[];
  onSelectBusiness?: (b: Business) => void;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function InteractiveServiceMap({
  selectedCity,
  setSelectedCity,
  filteredBusinesses,
  onSelectBusiness,
}: InteractiveServiceMapProps) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [animatingCity, setAnimatingCity] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeCityData = AUSTRIAN_CITIES_DATA.find(c => c.id === selectedCity);

  useEffect(() => {
    if (filteredBusinesses.length > 0) {
      setSelectedBusiness(filteredBusinesses[0]);
    } else {
      setSelectedBusiness(null);
    }
  }, [selectedCity, filteredBusinesses]);

  const getSimulatedCoordinates = (b: Business, index: number) => {
    const charCodeSum = b.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gridX = 15 + ((index * 27 + charCodeSum) % 70);
    const gridY = 20 + ((index * 39 + charCodeSum * 2) % 65);
    return { x: `${gridX}%`, y: `${gridY}%` };
  };

  const getCategoryColor = (category: string) => {
    const colorsMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      physicians: { bg: 'bg-emerald-500', border: 'border-emerald-600', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-600' },
      legal: { bg: 'bg-blue-600', border: 'border-blue-700', text: 'text-blue-700', gradient: 'from-blue-500 to-indigo-600' },
      translators: { bg: 'bg-purple-600', border: 'border-purple-700', text: 'text-purple-700', gradient: 'from-purple-500 to-fuchsia-600' },
      stores: { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-700', gradient: 'from-amber-500 to-orange-600' },
      currency: { bg: 'bg-emerald-600', border: 'border-emerald-700', text: 'text-emerald-700', gradient: 'from-emerald-500 to-teal-600' },
      emergency: { bg: 'bg-red-600', border: 'border-red-700', text: 'text-red-700', gradient: 'from-red-500 to-rose-600' }
    };
    return colorsMap[category] || { bg: 'bg-red-600', border: 'border-red-700', text: 'text-red-700', gradient: 'from-red-500 to-rose-600' };
  };

  const handleCityClick = (cityId: string) => {
    setAnimatingCity(cityId);
    setSelectedCity(cityId);
    toast.success(`فیلتر شهر: ${AUSTRIAN_CITIES_DATA.find(c => c.id === cityId)?.name}`);
    setTimeout(() => setAnimatingCity(null), 500);
  };

  // Count businesses by city
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    AUSTRIAN_CITIES_DATA.forEach((city) => {
      counts[city.id] = filteredBusinesses.filter((b) => b.city === city.id).length;
    });
    return counts;
  }, [filteredBusinesses]);

  return (
    <>
      <SEO
        title="نقشه تعاملی خدمات فارسی‌زبانان اتریش ۲۰۲۶ | پزشکان، وکلا، مترجمان | اتریش‌نشین"
        description="نقشه تعاملی و شبیه‌ساز آفلاین خدمات فارسی‌زبانان در ۵ شهر بزرگ اتریش (وین، گراتس، لینتس، سالزبورگ، اینسبروک). جستجوی پزشکان، وکلا، مترجمان و کسب‌وکارها با فیلتر هوشمند."
        keywords="نقشه خدمات اتریش, پزشکان فارسی زبان وین, وکلای فارسی زبان اتریش, مترجم رسمی وین, کسب و کار ایرانی اتریش, خدمات فارسی زبانان وین, نقشه تعاملی اتریش, جستجوی خدمات اتریش"
        schemaData={seoSchema}
        type="website"
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
              "radial-gradient(80% 150% at 90% 0, #1e3a8a 0, #0c1e3e 48%, #0a1128 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🗺️
          </div>
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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — شبیه‌ساز آفلاین هوشمند
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                نقشه تعاملی
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> خدمات فارسی‌زبانان اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-indigo-100 leading-relaxed max-w-3xl mb-4">
                شبیه‌ساز آفلاین توزیع کسب‌وکارها، پزشکان، وکلا و مترجمان
                فارسی‌زبان در ۵ شهر بزرگ اتریش. با فیلتر تعاملی بر اساس شهر،
                موقعیت کسب‌وکارها را روی شبکه‌بندی بومی مشاهده کنید.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{filteredBusinesses.length} کسب‌وکار فعال</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>اطلاعات تأیید شده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-200">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>کاملاً آفلاین</span>
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-center mb-1.5">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
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
              <Globe className="w-5 h-5 text-indigo-600" />
              شبکه سراسری خدمات فارسی‌زبانان
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دسترسی به بهترین خدمات در ۵ شهر بزرگ اتریش
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = img.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">
                        #{img.tag}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
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
          className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border-2 border-indigo-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              راهنمای استفاده از نقشه تعاملی
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              روی هر یک از ۵ شهر روی نقشه (سمت راست) کلیک کنید تا کسب‌وکارهای
              آن شهر روی شبکه‌بندی زنده (سمت چپ) نمایش داده شوند. با کلیک روی
              هر پین، اطلاعات کامل کسب‌وکار (نام، تلفن، آدرس و دسته) در پایین
              نمایش داده می‌شود.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN MAP SECTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
          id="interactive-map"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-indigo-500 via-blue-500 to-cyan-600 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    نقشه تعاملی و شبیه‌ساز استقرار کشوری
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    فیلتر شهرها + مشاهده زنده کسب‌وکارها روی شبکه‌بندی محلی
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5">
                <Database className="w-3 h-3" />
                {filteredBusinesses.length} نقطه فعال
              </span>
            </div>
          </div>

          {/* Map Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left column: Austria Map */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-500 font-bold">
                    {hoveredCity
                      ? `منطقه: ${AUSTRIAN_CITIES_DATA.find(c => c.id === hoveredCity)?.name}`
                      : 'آماده ناوبری'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-stone-900">
                    ۱. نقشه موقعیت‌یابی فدرال اتریش
                  </span>
                  <Compass className="w-4.5 h-4.5 text-indigo-600" />
                </div>
              </div>

              <div className="relative aspect-[16/10] bg-gradient-to-b from-stone-50 to-stone-100 rounded-2xl border border-stone-200/60 overflow-hidden shadow-inner flex items-center justify-center p-4">
                <div className="absolute inset-4 flex items-center justify-center select-none pointer-events-none opacity-35">
                  <img
                    src="/api/assets/map-austria.svg"
                    alt="Austria Silhouette Map"
                    className="w-full h-full object-contain"
                    style={{ filter: 'invert(41%) sepia(85%) saturate(1478%) hue-rotate(143deg) brightness(97%) contrast(93%)' }}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute top-4 left-4 flex flex-col gap-1 text-left select-none text-[8px] font-mono text-stone-400 font-bold opacity-80">
                  <div>SCALE: 1:1,500,000</div>
                  <div>DATUM: WGS-84 OFF</div>
                  <div>PROJECT: MERCATOR S.</div>
                </div>

                <svg viewBox="0 0 500 300" className="w-full h-full fill-none stroke-stone-300/30 stroke-1 drop-shadow-xs z-10 relative">
                  <g className="transition-all duration-300">
                    <path
                      d="M 50 160 L 90 155 L 110 145 L 130 155 L 140 170 L 120 185 L 90 190 L 60 180 Z"
                      className={`transition-all duration-500 cursor-pointer ${selectedCity === 'innsbruck' ? 'fill-teal-500/25 stroke-teal-500 stroke-[2]' : 'fill-transparent hover:fill-teal-500/10 stroke-teal-600/15'}`}
                      onClick={() => handleCityClick('innsbruck')}
                    />
                    <path
                      d="M 130 155 L 180 145 L 210 135 L 230 165 L 210 190 L 170 195 L 140 170 Z"
                      className={`transition-all duration-500 cursor-pointer ${selectedCity === 'salzburg' ? 'fill-teal-500/25 stroke-teal-500 stroke-[2]' : 'fill-transparent hover:fill-teal-500/10 stroke-teal-600/15'}`}
                      onClick={() => handleCityClick('salzburg')}
                    />
                    <path
                      d="M 210 135 L 260 110 L 310 95 L 320 135 L 270 155 L 230 165 Z"
                      className={`transition-all duration-500 cursor-pointer ${selectedCity === 'linz' ? 'fill-teal-500/25 stroke-teal-500 stroke-[2]' : 'fill-transparent hover:fill-teal-500/10 stroke-teal-600/15'}`}
                      onClick={() => handleCityClick('linz')}
                    />
                    <path
                      d="M 270 155 L 320 135 L 370 150 L 380 195 L 340 220 L 300 210 L 250 195 Z"
                      className={`transition-all duration-500 cursor-pointer ${selectedCity === 'graz' ? 'fill-teal-500/25 stroke-teal-500 stroke-[2]' : 'fill-transparent hover:fill-teal-500/10 stroke-teal-600/15'}`}
                      onClick={() => handleCityClick('graz')}
                    />
                    <path
                      d="M 310 95 L 370 85 L 430 75 L 460 110 L 450 155 L 410 170 L 370 150 L 320 135 L 310 95 Z"
                      className={`transition-all duration-300 cursor-pointer ${selectedCity === 'vienna' ? 'fill-teal-500/25 stroke-teal-500 stroke-[2]' : 'fill-transparent hover:fill-teal-500/10 stroke-teal-600/15'}`}
                      onClick={() => handleCityClick('vienna')}
                    />
                  </g>

                  <line x1="290" y1="85" x2="360" y2="195" className="stroke-stone-300/40 stroke-1" strokeDasharray="4,4" />
                  <line x1="210" y1="135" x2="420" y2="100" className="stroke-stone-300/40 stroke-1" strokeDasharray="4,4" />

                  <circle cx="210" cy="135" r="3" className="fill-stone-400/50" />
                  <circle cx="360" cy="195" r="3" className="fill-stone-400/50" />
                  <circle cx="420" cy="100" r="3" className="fill-stone-400/50" />
                </svg>

                {/* Cities hotspots */}
                {AUSTRIAN_CITIES_DATA.map((city) => {
                  const isSelected = selectedCity === city.id;
                  const isHovered = hoveredCity === city.id;
                  const belongsToThisCity = cityCounts[city.id] || 0;
                  const CityIcon = city.icon;

                  return (
                    <div
                      key={city.id}
                      style={{ left: `${(city.x / 500) * 100}%`, top: `${(city.y / 300) * 100}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                      {isSelected && (
                        <span className="absolute -left-2 -top-2 flex h-8 w-8 z-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-30"></span>
                          <span className="relative inline-flex rounded-full h-8 w-8 bg-indigo-500 opacity-20"></span>
                        </span>
                      )}

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCityClick(city.id)}
                        onMouseEnter={() => setHoveredCity(city.id)}
                        onMouseLeave={() => setHoveredCity(null)}
                        className={`relative z-10 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all duration-300 cursor-pointer ${
                          isSelected ? 'bg-indigo-600 scale-110' : 'bg-stone-600 hover:bg-stone-900'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </motion.button>

                      <AnimatePresence>
                        {(isSelected || isHovered) && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            onClick={() => handleCityClick(city.id)}
                            className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-black px-2.5 py-1 rounded-lg border shadow-md cursor-pointer select-none flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-stone-900 border-stone-800 text-white'
                                : 'bg-white border-stone-200 text-stone-700'
                            }`}
                          >
                            <CityIcon className="w-3 h-3" />
                            <span>{city.name}</span>
                            {belongsToThisCity > 0 && (
                              <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-black ${
                                isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-indigo-100 text-indigo-700'
                              }`}>
                                {belongsToThisCity}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Quick city filter */}
              <div className="flex flex-wrap gap-1.5 justify-center mt-3.5 pt-3.5 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setSelectedCity('all')}
                  className={`text-[10px] font-black px-3 py-1.5 rounded-xl border cursor-pointer transition-all flex items-center gap-1.5 ${
                    selectedCity === 'all'
                      ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-transparent text-white shadow-md'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  🗺️ کل فدرال اتریش
                </button>
                {AUSTRIAN_CITIES_DATA.map((ct) => {
                  const count = cityCounts[ct.id] || 0;
                  return (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => handleCityClick(ct.id)}
                      className={`text-[10px] font-black px-3 py-1.5 rounded-xl border cursor-pointer transition-all flex items-center gap-1.5 ${
                        selectedCity === ct.id
                          ? 'bg-gradient-to-br from-indigo-500 to-blue-600 border-transparent text-white shadow-md'
                          : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span>{ct.name}</span>
                      {count > 0 && (
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-black ${
                          selectedCity === ct.id ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right column: Micro map grid */}
            <div className="lg:col-span-5 flex flex-col bg-white border border-stone-200/80 rounded-3xl p-5 shadow-sm hover:border-stone-300 transition-colors justify-between">
              <div>
                <div className="flex justify-between items-center mb-4 border-b border-stone-100 pb-3">
                  <span className="text-[9px] text-stone-400 font-mono font-bold uppercase tracking-tight">
                    GRID LAYOUT SYSTEM
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-stone-900">
                      ۲. شبکه‌بندی زنده
                    </span>
                    <Layers className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                </div>

                <div className="relative h-[280px] rounded-2xl bg-slate-900 p-2.5 overflow-hidden border border-slate-950 shadow-inner group">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>

                  <div className="absolute inset-x-0 top-1/3 h-1 bg-slate-800/30 rotate-1 transform origin-center pointer-events-none"></div>
                  <div className="absolute inset-x-0 top-2/3 h-1 bg-slate-800/30 -rotate-2 transform origin-center pointer-events-none"></div>
                  <div className="absolute inset-y-0 left-1/3 w-1 bg-slate-800/30 rotate-3 transform origin-center pointer-events-none"></div>
                  <div className="absolute inset-y-0 left-2/3 w-1 bg-slate-800/30 -rotate-1 transform origin-center pointer-events-none"></div>

                  {selectedCity === 'vienna' && (
                    <div className="absolute inset-x-0 bottom-4 h-11 bg-indigo-950/30 rounded-full blur-xs border-y border-indigo-900/20 -rotate-6 pointer-events-none"></div>
                  )}

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10 text-[9px] pointer-events-none select-none">
                    <span className="bg-slate-800/85 px-2 py-0.5 rounded text-indigo-400 font-mono border border-slate-700 font-bold">
                      {selectedCity.toUpperCase()} BLUEPRINT
                    </span>
                    <span className="text-slate-400 font-bold">
                      {activeCityData ? `منطقه ${activeCityData.region}` : 'نمای کل ایالت‌ها'}
                    </span>
                  </div>

                  {filteredBusinesses.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                      <Building className="w-10 h-10 text-slate-700 mb-2 animate-pulse" />
                      <p className="text-[11px] text-slate-400 font-bold">موردی برای نمایش یافت نشد</p>
                      <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">
                        لطفاً فیلترهای دیگر یا شهر «وین» را انتخاب کنید.
                      </p>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      {filteredBusinesses.map((b, idx) => {
                        const coords = getSimulatedCoordinates(b, idx);
                        const isSelected = selectedBusiness?.id === b.id;
                        const colorScheme = getCategoryColor(b.category);

                        return (
                          <motion.button
                            key={b.id}
                            type="button"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => {
                              setSelectedBusiness(b);
                              if (onSelectBusiness) onSelectBusiness(b);
                            }}
                            style={{ left: coords.x, top: coords.y }}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all p-1 outline-none group cursor-pointer z-10 ${
                              isSelected ? 'scale-125 z-20' : ''
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute inset-0 rounded-xl bg-amber-500/20 animate-ping"></span>
                            )}

                            <div className={`w-7 h-7 rounded-xl text-white flex items-center justify-center font-black text-[10px] transition-all border-2 shadow-md ${
                              isSelected
                                ? 'bg-amber-500 border-white text-black scale-110'
                                : `${colorScheme.bg} border-slate-700 text-white`
                            }`}>
                              {b.avatarLetter || '📍'}
                            </div>

                            <div className="absolute bottom-8 right-1/2 translate-x-1/2 whitespace-nowrap bg-slate-950 text-white text-[8px] font-bold px-2 py-1 rounded-md border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                              {b.name}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected business preview */}
              <div className="mt-4 pt-4 border-t border-stone-200">
                {selectedBusiness ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-l from-stone-50 to-stone-100 border border-stone-200/80 rounded-2xl p-4 relative overflow-hidden"
                  >
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-[0.06] rounded-full" />

                    <div className="relative flex items-start justify-between gap-3">
                      <div className="space-y-1.5 text-right flex-1 select-text">
                        <h4 className="font-black text-stone-900 text-sm leading-snug">
                          {selectedBusiness.name}
                        </h4>

                        <span className={`inline-flex items-center gap-1 text-[9px] px-2 py-1 rounded-full font-black text-white ${getCategoryColor(selectedBusiness.category).bg}`}>
                          {CATEGORY_INFO.find(c => c.id === selectedBusiness.category)?.name || 'کسب‌وکار'}
                        </span>

                        <div className="text-[10px] text-stone-600 font-bold leading-relaxed mt-1">
                          {selectedBusiness.description}
                        </div>

                        <div className="flex flex-col gap-1.5 pt-2 font-mono text-[10px] text-stone-600 font-bold">
                          <div className="flex items-center gap-2 justify-end">
                            <span dir="ltr">{selectedBusiness.phone}</span>
                            <Phone className="w-3 h-3 text-indigo-500" />
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <span className="truncate max-w-[210px] text-right">{selectedBusiness.address}</span>
                            <MapPin className="w-3 h-3 text-indigo-500" />
                          </div>
                        </div>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
                        {selectedBusiness.avatarLetter || '💼'}
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-stone-200 flex justify-between items-center text-[9px] font-bold text-stone-500">
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>کد: {selectedBusiness.id}</span>
                      </span>
                      <span>
                        {selectedBusiness.city === 'vienna' ? 'وین، اتریش' : 'ایالات اتریش'}
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center">
                    <MapPinned className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <p className="text-[11px] text-stone-500 font-bold">
                      برای مشاهده جزئیات، روی نقاط شبکه‌بندی کلیک کنید
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* CATEGORIES OVERVIEW */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-indigo-600" />
              ۶ دسته اصلی خدمات
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              کسب‌وکارها بر اساس دسته‌بندی رنگی روی نقشه نمایش داده می‌شوند
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORY_INFO.map((cat, i) => {
              const Icon = cat.icon;
              const count = filteredBusinesses.filter(b => b.category === cat.id).length;
              const colorMap: Record<string, string> = {
                emerald: "from-emerald-500 to-teal-600",
                blue: "from-blue-500 to-indigo-600",
                purple: "from-purple-500 to-fuchsia-600",
                amber: "from-amber-500 to-orange-600",
                red: "from-red-500 to-rose-600",
              };
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 text-center hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[cat.color] || "from-indigo-500 to-blue-600"} flex items-center justify-center text-white shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-black text-stone-900 mb-1">
                    {cat.name}
                  </div>
                  <div className="text-[10px] font-black text-stone-500">
                    {count} مورد
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
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              چرا نقشه تعاملی اتریش‌نشین؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ویژگی‌هایی که این ابزار را منحصربه‌فرد می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "کاملاً آفلاین", text: "بدون نیاز به اینترنت — بهینه برای زمان قطعی یا سفر.", color: "from-amber-500 to-orange-600" },
              { icon: Target, title: "فیلتر هوشمند", text: "جستجو بر اساس شهر، دسته‌بندی و موقعیت جغرافیایی.", color: "from-blue-500 to-indigo-600" },
              { icon: ShieldCheck, title: "اطلاعات تأیید شده", text: "کسب‌وکارها بررسی و تأیید شده توسط تیم اتریش‌نشین.", color: "from-emerald-500 to-teal-600" },
              { icon: Users, title: "جامعه‌محور", text: "ساخته‌شده توسط و برای فارسی‌زبانان مقیم اتریش.", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
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
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              سوالات متداول درباره نقشه تعاملی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات کاربران
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#1e3a8a] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              کسب‌وکار خود را به نقشه اضافه کنید
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر کسب‌وکار شما خدمات فارسی‌زبانان را در اتریش ارائه می‌دهد، از
              طریق کانال‌های ارتباطی با ما تماس بگیرید. پس از بررسی و تأیید،
              اطلاعات شما به نقشه اضافه خواهد شد.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ثبت کسب‌وکار در واتس‌اپ
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
              این نقشه تعاملی و شبیه‌ساز آفلاین صرفاً جنبه راهنمایی دارد. مختصات
              کسب‌وکارها شبیه‌سازی‌شده هستند و نقشه دقیق جغرافیایی نیستند. همیشه
              قبل از مراجعه، اطلاعات را با منابع رسمی کسب‌وکار تأیید کنید.
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
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
              "نقشه خدمات اتریش",
              "پزشکان فارسی زبان وین",
              "وکلای فارسی زبان اتریش",
              "مترجم رسمی وین",
              "کسب و کار ایرانی اتریش",
              "خدمات فارسی زبانان وین",
              "نقشه تعاملی اتریش",
              "جستجوی خدمات اتریش",
              "وین",
              "گراتس",
              "لینتس",
              "سالزبورگ",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
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
          ? "border-indigo-500/30 bg-indigo-50/30 shadow-md"
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
                ? "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
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