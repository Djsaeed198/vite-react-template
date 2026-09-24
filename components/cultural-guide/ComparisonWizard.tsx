import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Landmark, BarChart3, MapPin, ShieldCheck, ArrowRight, ArrowLeft,
  Sparkles, CheckCircle, Users, Star, TrendingUp, Award,
  Globe, Heart, Zap, Target, Info, Clock, Rocket, Handshake,
  ChevronLeft, Building2, PieChart, Home, Calculator, BookOpen,
  Shield, Wallet, Quote, Compass
} from 'lucide-react';
import SEO from './SEO';
import BankComparisonGuide from './BankComparisonGuide';
import CostOfLivingComparison from './CostOfLivingComparison';
import NeighborhoodComparison from './NeighborhoodComparison';
import SupplementalInsuranceGuide from './SupplementalInsuranceGuide';

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_IMAGE = "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=800&q=80";

// ==========================================
// COMPARISON CATEGORIES
// ==========================================
const comparisonCategories = [
  {
    title: "بانک‌ها و خدمات مالی",
    description: "مقایسه کارمزدها، نرخ بهره، و خدمات بانک‌های اتریش",
    longDescription: "انتخاب بانک مناسب در اتریش یکی از اولین و مهم‌ترین تصمیم‌های مالی شماست. کارمزد ماهانه، دسترسی به ATM، بانکداری آنلاین و خدمات ویژه مهاجران را بررسی می‌کنیم.",
    icon: Landmark,
    color: "bg-blue-50 text-blue-600",
    gradient: "from-blue-500 to-indigo-600",
    id: "bank-compare",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    component: BankComparisonGuide,
    features: ["۹ بانک اصلی", "کارمزد ماهانه", "بانکداری آنلاین"],
    badge: "پرطرفدار",
  },
  {
    title: "هزینه‌های زندگی",
    description: "تحلیل دقیق هزینه‌های مسکن، مواد غذایی و حمل‌ونقل",
    longDescription: "برنامه‌ریزی مالی برای زندگی در اتریش نیازمند شناخت دقیق هزینه‌هاست. از اجاره مسکن در مناطق مختلف تا هزینه مواد غذایی و حمل‌ونقل عمومی.",
    icon: BarChart3,
    color: "bg-emerald-50 text-emerald-600",
    gradient: "from-emerald-500 to-teal-600",
    id: "compare-living",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    component: CostOfLivingComparison,
    features: ["۹ ایالت", "میانگین اجاره", "سطح زندگی"],
    badge: "کاربردی",
  },
  {
    title: "محله‌ها و سکونت",
    description: "بررسی نقاط مثبت و منفی محله‌های وین و سایر شهرها",
    longDescription: "وین به ۲۳ منطقه (Bezirk) تقسیم شده و هر کدام شخصیت خاص خود را دارند. از مناطق لوکس مرکز تا محله‌های خانوادگی و دانشجویی.",
    icon: MapPin,
    color: "bg-amber-50 text-amber-600",
    gradient: "from-amber-500 to-orange-600",
    id: "neighborhood",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    component: NeighborhoodComparison,
    features: ["۲۳ منطقه وین", "امنیت و دسترسی", "کیفیت زندگی"],
    badge: "محبوب",
  },
  {
    title: "بیمه‌ها",
    description: "مقایسه پوشش‌دهی بیمه‌های درمانی و مسئولیت",
    longDescription: "بیمه سلامت اتریش اجباری است، اما بیمه‌های تکمیلی می‌توانند پوشش شما را بسیار گسترده‌تر کنند. از خدمات دندان‌پزشکی تا بیمه مسئولیت شخصی.",
    icon: ShieldCheck,
    color: "bg-rose-50 text-rose-600",
    gradient: "from-rose-500 to-pink-600",
    id: "supplemental-insurance",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    component: SupplementalInsuranceGuide,
    features: ["بیمه تکمیلی", "پوشش دندان", "بیمه مسئولیت"],
    badge: "ضروری",
  }
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۴", label: "دسته مقایسه‌ای", icon: "📊" },
  { value: "۵۰+", label: "پارامتر مقایسه", icon: "🎯" },
  { value: "۹", label: "ایالت اتریش", icon: "🗺️" },
  { value: "۱۰۰٪", label: "رایگان و مستقل", icon: "✨" },
];

// ==========================================
// HOW IT WORKS
// ==========================================
const HOW_IT_WORKS = [
  {
    n: "۰۱",
    icon: Target,
    title: "دسته موردنظر را انتخاب کنید",
    text: "از میان بانک‌ها، هزینه‌های زندگی، محله‌ها یا بیمه‌ها، موضوع مورد علاقه خود را برگزینید.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    n: "۰۲",
    icon: BarChart3,
    title: "اطلاعات را مقایسه کنید",
    text: "جداول دقیق، نمودارها و معیارهای شفاف به شما کمک می‌کنند انتخاب آگاهانه‌ای داشته باشید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    n: "۰۳",
    icon: CheckCircle,
    title: "تصمیم هوشمندانه بگیرید",
    text: "با اتکا به داده‌های به‌روز و بی‌طرف، بهترین گزینه را برای زندگی خود در اتریش انتخاب کنید.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// FEATURES / VALUES
// ==========================================
const VALUES = [
  {
    icon: Shield,
    title: "کاملاً مستقل",
    text: "بدون تبلیغات تجاری یا وابستگی به هیچ برند یا مؤسسه مالی.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Zap,
    title: "داده‌های به‌روز",
    text: "اطلاعات به‌طور منظم با آخرین نرخ‌ها و تغییرات قوانین به‌روزرسانی می‌شود.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Heart,
    title: "ساخته شده برای مهاجران",
    text: "طراحی‌شده بر اساس تجربه واقعی فارسی‌زبانان مقیم اتریش.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Users,
    title: "جامعه‌محور",
    text: "بازخورد کاربران، کیفیت ابزارها را پیوسته ارتقا می‌دهد.",
    color: "from-blue-500 to-indigo-600",
  },
];

// ==========================================
// TESTIMONIALS
// ==========================================
const TESTIMONIALS = [
  {
    name: "سارا م.",
    location: "وین، منطقه ۷",
    text: "قبل از اجاره خانه، مقایسه محله‌ها واقعاً کمکم کرد. الان دقیقاً می‌دانم کجا زندگی می‌کنم و چرا.",
    avatar: "س",
    color: "from-rose-500 to-pink-600",
  },
  {
    name: "علی ر.",
    location: "لینتس",
    text: "مقایسه بانک‌ها باعث شد ماهی ۱۵ یورو کمتر کارمزد بدم. با یک ابزار ساده، سالانه ۱۸۰ یورو صرفه‌جویی کردم.",
    avatar: "ع",
    color: "from-sky-500 to-blue-600",
  },
  {
    name: "مریم ک.",
    location: "گراتس",
    text: "بخش بیمه‌ها فوق‌العاده بود. دقیقاً فهمیدم چه پوششی نیاز دارم و چقدر باید پرداخت کنم.",
    avatar: "م",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "اطلاعات این مقایسه‌ها چقدر به‌روز است؟",
    a: "تیم اتریش‌نشین اطلاعات را به‌صورت دوره‌ای از منابع رسمی مانند وب‌سایت بانک‌ها، اداره آمار اتریش (Statistik Austria) و نهادهای بیمه‌ای به‌روزرسانی می‌کند. با این حال، نرخ‌ها ممکن است به‌سرعت تغییر کنند؛ قبل از تصمیم نهایی با منبع اصلی چک کنید.",
  },
  {
    q: "آیا استفاده از این ابزارها رایگان است؟",
    a: "بله، تمامی ابزارهای مقایسه‌ای اتریش‌نشین کاملاً رایگان و مستقل هستند. ما هیچ تبلیغ تجاری یا لینک وابسته (affiliate) دریافت نمی‌کنیم و صرفاً بر اساس داده‌های بی‌طرف تصمیم‌گیری می‌کنیم.",
  },
  {
    q: "آیا می‌توانم پیشنهاد یا اصلاحی ارسال کنم؟",
    a: "قطعاً! بازخورد شما ارزشمند است. اگر اطلاعات نادرستی دیدید یا پیشنهادی برای بهبود دارید، از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ یا ایمیل) با ما در تماس باشید.",
  },
  {
    q: "کدام ابزار برای من مناسب است؟",
    a: "بستگی به مرحله‌ای دارد که در آن هستید. اگر تازه مهاجرت کرده‌اید، شروع با «بانک‌ها» و «محله‌ها» منطقی است. اگر سال‌ها در اتریش زندگی می‌کنید، «بیمه‌های تکمیلی» و «هزینه‌های زندگی» می‌تواند به بهینه‌سازی مالی شما کمک کند.",
  },
];

interface ComparisonWizardProps {
  onSelectSegment?: (segment: string) => void;
  initialSegment?: string | null;
}

const ComparisonWizard: React.FC<ComparisonWizardProps> = ({ onSelectSegment, initialSegment = null }) => {
  const [activeSegment, setActiveSegment] = useState<string | null>(initialSegment);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const ActiveComponent = activeSegment
    ? comparisonCategories.find(c => c.id === activeSegment)?.component
    : null;

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "مرکز هوشمند مقایسه اتریش‌نشین",
      url: "https://otrish-iran.ir/comparison",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description:
        "ابزار رایگان مقایسه بانک‌ها، هزینه‌های زندگی، محله‌ها و بیمه‌های اتریش برای فارسی‌زبانان مقیم.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ابزارهای مقایسه‌ای اتریش",
      itemListElement: comparisonCategories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        description: c.description,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="مرکز هوشمند مقایسه اتریش | بانک، هزینه زندگی، محله و بیمه"
        description="ابزار رایگان مقایسه بانک‌های اتریش، هزینه‌های زندگی در ایالت‌ها، محله‌های وین و بیمه‌های درمانی. تصمیم‌گیری آگاهانه برای فارسی‌زبانان مقیم اتریش."
        keywords="مقایسه بانک اتریش, هزینه زندگی اتریش, محله‌های وین, بیمه اتریش, هزینه مسکن وین, اتریش‌نشین, مقایسه بیمه درمانی اتریش"
        schemaData={seoSchema}
      />

      <div className="min-h-screen bg-stone-50 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
          <AnimatePresence mode="wait">
            {!activeSegment ? (
              /* ========================================== */
              /* WIZARD HOME - CATEGORY SELECTION */
              /* ========================================== */
              <motion.div
                key="wizard-home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                {/* HERO */}
                <section
                  className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
                  style={{
                    background:
                      "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
                  }}
                >
                  <div className="absolute inset-0">
                    <img
                      src={HERO_IMAGE}
                      alt="وین، اتریش"
                      className="w-full h-full object-cover opacity-[0.08]"
                      loading="eager"
                    />
                  </div>

                  <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
                    📊
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
                        <Compass className="w-3.5 h-3.5 text-amber-300" />
                        Vergleichsportal Österreich
                      </div>

                      <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                        مرکز هوشمند مقایسه
                      </h1>

                      <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                        تصمیم‌گیری آگاهانه در قلب اروپا؛ از انتخاب بانک مناسب و تحلیل
                        هزینه‌های زندگی تا یافتن بهترین محله برای سکونت و انتخاب بیمه
                        تکمیلی — همه در یک پلتفرم مستقل، بی‌طرف و رایگان.
                      </p>

                      <div className="flex items-center gap-3 mt-5 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>۱۰۰٪ رایگان</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>کاملاً مستقل</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>داده‌های به‌روز</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* STATS */}
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

                {/* CATEGORIES */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                      انتخاب دسته مقایسه
                    </h2>
                    <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                      یکی از چهار حوزه اصلی را انتخاب کنید و مقایسه هوشمند را شروع کنید
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {comparisonCategories.map((cat, index) => {
                      const Icon = cat.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.08 }}
                          whileHover={{ y: -6 }}
                          className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                        >
                          {/* Image banner */}
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={cat.image}
                              alt={cat.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                            {/* Badge */}
                            <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg">
                              <Star className="w-3 h-3 fill-current" />
                              {cat.badge}
                            </div>

                            {/* Icon */}
                            <div
                              className={`absolute -bottom-6 right-5 w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                            >
                              <Icon size={26} />
                            </div>
                          </div>

                          <div className="p-6 pt-8">
                            <h2 className="text-lg md:text-xl font-black text-stone-900 mb-2">
                              {cat.title}
                            </h2>
                            <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                              {cat.longDescription}
                            </p>

                            {/* Feature chips */}
                            <div className="flex flex-wrap gap-2 mb-5">
                              {cat.features.map((f, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 text-[10px] font-black text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full"
                                >
                                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                                  {f}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => {
                                setActiveSegment(cat.id);
                                onSelectSegment?.(cat.id);
                              }}
                              className={`group/btn flex items-center justify-between w-full bg-gradient-to-br ${cat.gradient} text-white font-black text-xs px-4 py-3 rounded-2xl shadow-md hover:scale-[1.02] transition-all`}
                            >
                              <span className="flex items-center gap-2">
                                <Rocket className="w-4 h-4" />
                                شروع مقایسه
                              </span>
                              <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* HOW IT WORKS */}
                <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                      چگونه کار می‌کند؟
                    </h2>
                    <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                      در سه گام ساده به تصمیم هوشمندانه برسید
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {HOW_IT_WORKS.map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -6 }}
                          className="relative bg-white rounded-3xl border border-stone-200 p-6 overflow-hidden group"
                        >
                          <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 group-hover:text-rose-100 transition-colors">
                            {s.n}
                          </div>
                          <div
                            className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="relative font-black text-stone-900 text-sm mb-2">
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

                {/* VALUES */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                      <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                      چرا اتریش‌نشین؟
                    </h2>
                    <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                      چهار اصل که اعتبار ابزارهای ما را تضمین می‌کند
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {VALUES.map((v, i) => {
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

                {/* TESTIMONIALS */}
                <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative mb-6">
                    <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                      <Quote className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                      تجربه کاربران
                    </h2>
                    <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                      چه فارسی‌زبانانی درباره ابزارهای ما می‌گویند
                    </p>
                  </div>

                  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TESTIMONIALS.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl border border-indigo-100 p-5 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-black text-sm shadow-md`}
                          >
                            {t.avatar}
                          </div>
                          <div>
                            <div className="text-xs font-black text-stone-900">{t.name}</div>
                            <div className="text-[10px] text-stone-500 font-bold flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              {t.location}
                            </div>
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                          «{t.text}»
                        </p>
                        <div className="flex items-center gap-0.5 mt-3">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-3 h-3 text-amber-400 fill-current"
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
                  <div className="mb-5">
                    <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                      <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                      سوالات متداول
                    </h2>
                    <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
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

                {/* FINAL CTA */}
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
                      همراه شما در تصمیم‌گیری
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black mb-3">
                      سوالی دارید یا پیشنهادی؟
                    </h2>

                    <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                      تیم اتریش‌نشین آماده شنیدن بازخورد، پیشنهاد محتوا و پاسخ به
                      سوالات شما درباره مقایسه‌هاست. با ما در تماس باشید.
                    </p>

                    <div className="flex gap-3 justify-center flex-wrap">
                      <a
                        href="https://wa.me/436889763256"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                      >
                        <Users className="w-4 h-4" />
                        واتس‌اپ اتریش
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

                {/* DISCLAIMER */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-black text-amber-900 text-xs mb-1">
                      یادآوری مهم
                    </h5>
                    <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                      اطلاعات این مقایسه‌ها صرفاً جنبه راهنمایی دارد و ممکن است بر
                      اساس تغییرات بازار یا قوانین به‌روز نباشد. قبل از هر تصمیم
                      مالی یا حقوقی، با منابع رسمی یا مشاوران واجد شرایط مشورت
                      کنید. اتریش‌نشین هیچ مسئولیتی در قبال تصمیمات مبتنی بر این
                      اطلاعات نمی‌پذیرد.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ========================================== */
              /* WIZARD SUB - ACTIVE COMPONENT */
              /* ========================================== */
              <motion.div
                key="wizard-sub"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-6"
              >
                {/* Back bar */}
                <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-center justify-between gap-3 shadow-sm">
                  <button
                    onClick={() => setActiveSegment(null)}
                    className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs px-4 py-2.5 rounded-2xl transition"
                  >
                    <ArrowRight size={16} />
                    بازگشت به لیست مقایسه
                  </button>

                  <div className="flex items-center gap-2 text-[10px] font-black text-stone-500">
                    <Compass className="w-3.5 h-3.5 text-[#c8102e]" />
                    در حال مشاهده:
                    <span className="text-[#c8102e]">
                      {comparisonCategories.find(c => c.id === activeSegment)?.title}
                    </span>
                  </div>
                </div>

                {/* Active content */}
                <div className="bg-white rounded-3xl border border-stone-200 p-4 md:p-6 shadow-sm">
                  {ActiveComponent && <ActiveComponent />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
        isOpen ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md" : "border-stone-200"
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
        <ChevronLeft
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "-rotate-90 text-[#c8102e]" : ""
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

export default ComparisonWizard;