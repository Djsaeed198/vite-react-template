import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Train, Ticket, Euro, Clock, Users, GraduationCap, Heart,
  Baby, Shield, CheckCircle, Info, ChevronDown, Sparkles,
  Zap, Star, Calculator, TrendingUp, MapPin, PhoneCall, Send,
  Globe, Award, BookOpen, ArrowUpRight, CreditCard, Smartphone,
  Percent, RefreshCw, Copy, AlertCircle, Landmark, Leaf,
  CircleDollarSign, BarChart3, Route, Building2, Mountain,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Austria train themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80",
  railjet: "https://images.unsplash.com/photo-1535532331788-38d3a00f5f3f?auto=format&fit=crop&w=1200&q=80",
  alpine: "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type CardId = "classic" | "comfort" | "jugend" | "family" | "senior";

type CardType = {
  id: CardId;
  name: string;
  nameDe: string;
  price: number;
  priceLabel: string;
  ageRange: string;
  discount: number;
  seatReservation: boolean;
  digitalOnly: boolean;
  icon: any;
  color: string;
  gradient: string;
  description: string;
  bestFor: string;
  perks: string[];
  requirements: string[];
  recommended?: boolean;
};

// ==========================================
// CARDS DATA (2026 official prices)
// ==========================================
const CARDS: CardType[] = [
  {
    id: "classic",
    name: "کلاسیک",
    nameDe: "Vorteilscard Classic",
    price: 73,
    priceLabel: "€۷۳ / سال",
    ageRange: "بدون محدودیت سنی (۲۶ تا ۶۴ سال)",
    discount: 50,
    seatReservation: false,
    digitalOnly: false,
    icon: CreditCard,
    color: "text-sky-700",
    gradient: "from-sky-600 to-blue-700",
    description:
      "کارت استاندارد و همه‌کاره ÖBB که از ژانویه ۲۰۲۵ جایگزین Vorteilscard 66 و 99 یورویی قدیمی شده است. با قیمت ۷۳ یورو، برای اکثر مسافران بزرگسال بهترین انتخاب محسوب می‌شود.",
    bestFor: "بزرگسالان ۲۶ تا ۶۴ سال که چند بار در سال با قطار سفر می‌کنند",
    perks: [
      "۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB",
      "امکان دریافت کارت فیزیکی (سوگند خورده) + دیجیتال",
      "قابل استفاده در اکثر خطوط خصوصی اتریش",
      "امکان جمع‌آوری ÖBB Vorzugspunkte",
    ],
    requirements: ["بدون محدودیت سنی"],
    recommended: true,
  },
  {
    id: "comfort",
    name: "کامفورت",
    nameDe: "Vorteilscard Comfort",
    price: 89,
    priceLabel: "€۸۹ / سال",
    ageRange: "بدون محدودیت سنی",
    discount: 50,
    seatReservation: true,
    digitalOnly: true,
    icon: Smartphone,
    color: "text-violet-700",
    gradient: "from-violet-600 to-purple-700",
    description:
      "نسخه پریمیوم دیجیتال ÖBB Vorteilscard. علاوه بر ۵۰٪ تخفیف روی بلیت، ۵۰٪ تخفیف اضافی روی رزرو صندلی در قطارهای ملی و بین‌المللی را نیز ارائه می‌دهد.",
    bestFor: "مسافران مکرر و افرادی که می‌خواهند صندلی خود را از قبل رزرو کنند",
    perks: [
      "۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB",
      "۵۰٪ تخفیف اضافی روی رزرو صندلی (ملی و بین‌المللی)",
      "کاملاً دیجیتال — بدون نیاز به کارت فیزیکی",
      "قیمت ویژه €۷۹ هنگام ارتقا از Classic",
    ],
    requirements: ["بدون محدودیت سنی", "نیاز به حساب ÖBB"],
  },
  {
    id: "jugend",
    name: "جوانان",
    nameDe: "Vorteilscard Jugend",
    price: 21,
    priceLabel: "€۲۱ / سال",
    ageRange: "زیر ۲۶ سال (تا ۲۵ سال کامل)",
    discount: 50,
    seatReservation: false,
    digitalOnly: false,
    icon: GraduationCap,
    color: "text-emerald-700",
    gradient: "from-emerald-600 to-teal-700",
    description:
      "برای جوانان و دانشجویان زیر ۲۶ سال. یکی از ارزان‌ترین کارت‌های تخفیف اروپا که با قیمت فقط ۲۱ یورو در سال، تخفیف ۵۰٪ روی تمام بلیت‌های استاندارد ÖBB ارائه می‌دهد.",
    bestFor: "دانشجویان، دانش‌آموزان و جوانان زیر ۲۶ سال",
    perks: [
      "۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB",
      "قیمت فوق‌العاده اقتصادی (€۲۱ در سال)",
      "قابل استفاده در اکثر خطوط خصوصی اتریش",
      "امکان جمع‌آوری ÖBB Vorzugspunkte",
    ],
    requirements: ["زیر ۲۶ سال", "ارائه مدرک سنی معتبر"],
    recommended: true,
  },
  {
    id: "family",
    name: "خانوادگی",
    nameDe: "Vorteilscard Family",
    price: 21,
    priceLabel: "€۲۱ / سال",
    ageRange: "هر فرد از ۱۵ سال به بالا",
    discount: 45,
    seatReservation: false,
    digitalOnly: false,
    icon: Baby,
    color: "text-rose-700",
    gradient: "from-rose-600 to-red-700",
    description:
      "برای سفرهای خانوادگی طراحی شده است. دارنده کارت هنگام سفر با حداقل یک کودک، ۴۵٪ تخفیف روی بلیت استاندارد دریافت می‌کند و تا ۴ کودک زیر ۱۵ سال کاملاً رایگان همراه او سفر می‌کنند.",
    bestFor: "خانواده‌های دارای فرزند زیر ۱۵ سال",
    perks: [
      "۴۵٪ تخفیف روی بلیت استاندارد هنگام سفر با کودک",
      "تا ۴ کودک زیر ۱۵ سال رایگان",
      "۵٪ تخفیف اضافی Selfbuchung آنلاین",
      "بدون نیاز به اثبات دریافت کمک‌هزینه خانوادگی",
    ],
    requirements: ["حداقل ۱۵ سال سن", "سفر با حداقل یک کودک زیر ۱۵ سال"],
  },
  {
    id: "senior",
    name: "سالمندان",
    nameDe: "Vorteilscard Senior",
    price: 31,
    priceLabel: "€۳۱ / سال",
    ageRange: "۶۵ سال به بالا",
    discount: 50,
    seatReservation: false,
    digitalOnly: false,
    icon: Heart,
    color: "text-amber-700",
    gradient: "from-amber-500 to-orange-600",
    description:
      "برای افراد ۶۵ سال به بالا. با قیمت ۳۱ یورو در سال، ۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB ارائه می‌دهد. نسخه Vorteilscard Senior Frei برای افراد کم‌درآمد کاملاً رایگان است.",
    bestFor: "بازنشسته‌ها و افراد ۶۵ سال به بالا",
    perks: [
      "۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB",
      "نسخه Frei رایگان برای کم‌درآمدها",
      "۲ بلیت رایگان هدیه هنگام درخواست (کمپین ۲۰۲۶)",
      "قابل استفاده در اکثر خطوط خصوصی اتریش",
    ],
    requirements: ["۶۵ سال به بالا", "ارائه مدرک سنی معتبر"],
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۵۰٪", label: "تخفیف روی هر بلیت", icon: Percent },
  { value: "€۷۳", label: "کارت کلاسیک ۲۰۲۶", icon: Euro },
  { value: "€۲۱", label: "کارت جوانان/خانوادگی", icon: TrendingUp },
  { value: "۱ سال", label: "اعتبار از تاریخ صدور", icon: Clock },
];

// ==========================================
// ROUTE EXAMPLES (for savings calculation)
// ==========================================
const ROUTES = [
  { from: "وین", to: "زالتسبورگ", standard: 59.90, discounted: 29.95, duration: "۲:۲۲" },
  { from: "وین", to: "گراتس", standard: 39.90, discounted: 19.95, duration: "۲:۳۵" },
  { from: "وین", to: "اینسبروک", standard: 89.90, discounted: 44.95, duration: "۴:۰۵" },
  { from: "وین", to: "لینتس", standard: 35.60, discounted: 17.80, duration: "۱:۳۲" },
  { from: "سالزبورگ", to: "اینسبوروک", standard: 49.90, discounted: 24.95, duration: "۱:۵۰" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "تفاوت Vorteilscard Classic و Comfort چیست؟",
    a: "هر دو کارت ۵۰٪ تخفیف روی بلیت‌های استاندارد ÖBB ارائه می‌دهند. اما Comfort که کاملاً دیجیتال است، ۵۰٪ تخفیف اضافی روی رزرو صندلی در قطارهای ملی و بین‌المللی نیز دارد. Classic کارت فیزیکی (سوگند خورده) نیز ارائه می‌دهد و ۷۳ یورو قیمت دارد، در حالی که Comfort فقط ۸۹ یورو است. اگر به ندرت صندلی رزرو می‌کنید، Classic انتخاب اقتصادی‌تری است.",
  },
  {
    q: "آیا Vorteilscard 66 هنوز قابل خرید است؟",
    a: "خیر. از ژانویه ۲۰۲۵، Vorteilscard 66 به طور کامل متوقف شده و در Vorteilscard Classic ادغام شده است. قیمت Classic از ۹۹ یورو به ۷۳ یورو کاهش یافته و به این ترتیب جایگزین اقتصادی‌تری برای ۶۶ یورویی قدیمی محسوب می‌شود.",
  },
  {
    q: "آیا کارت Vorteilscard روی Westbahn و خطوط خصوصی هم کار می‌کند؟",
    a: "بله. مسافران دارای Vorteilscard معتبر ÖBB می‌توانند در Westbahn نیز تا ۵۰٪ تخفیف (WestVorteilspreis) دریافت کنند. همچنین اکثر خطوط خصوصی اتریش تا نیمه قیمت تخفیف می‌دهند، به جز Vorteilscard Family که فقط در برخی خطوط خاص معتبر است.",
  },
  {
    q: "آیا می‌توانم Vorteilscard را در ایران خریداری کنم؟",
    a: "خرید کارت نیازمند یک حساب کاربری ÖBB و آدرس در اتریش یا اروپا است. اما می‌توانید از طریق دوستان یا آشنایان در اتریش درخواست دهید. پس از دریافت شماره کارت، می‌توانید بلیت‌های تخفیف‌دار را از هر جایی در جهان خریداری کنید.",
  },
  {
    q: "چند سفر طول می‌کشد تا هزینه کارت جبران شود؟",
    a: "با قیمت ۷۳ یورو برای Classic: اگر بلیت وین-زالتسبورگ حدود ۶۰ یورو باشد، تخفیف ۵۰٪ به معنای صرفه‌جویی ۳۰ یورو در هر سفر است. بنابراین با حدود ۲.۵ سفر طولانی یا ۴ تا ۵ سفر متوسط، هزینه کارت جبران می‌شود. برای Jugend و Senior با قیمت ۲۱ تا ۳۱ یورو، معمولاً یک سفر کافی است.",
  },
  {
    q: "آیا Vorteilscard با Klimaticket قابل استفاده است؟",
    a: "خیر، این دو محصول جداگانه هستند. Klimaticket Ö یک بلیت سالانه برای تمام وسایل حمل‌ونقل عمومی اتریش است (۱,۴۰۰ یورو در ۲۰۲۶)، در حالی که Vorteilscard فقط تخفیف‌دهنده بلیت است. اگر Vorteilscard دارید و می‌خواهید Klimaticket بخرید، امکان ارتقا وجود دارد.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ObbVorteilscardGuide: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardId>("classic");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [tripsPerYear, setTripsPerYear] = useState<number>(3);
  const [avgTicketPrice, setAvgTicketPrice] = useState<number>(40);
  const [copied, setCopied] = useState(false);

  const activeCardData = useMemo(
    () => CARDS.find((c) => c.id === activeCard)!,
    [activeCard]
  );

  // Savings calculation
  const savings = useMemo(() => {
    const discountPerTrip = avgTicketPrice * (activeCardData.discount / 100);
    const totalSavings = discountPerTrip * tripsPerYear;
    const netResult = totalSavings - activeCardData.price;
    const breakEven = discountPerTrip > 0 ? Math.ceil(activeCardData.price / discountPerTrip) : 0;
    return { discountPerTrip, totalSavings, netResult, breakEven };
  }, [tripsPerYear, avgTicketPrice, activeCardData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Vorteilscard ${activeCardData.nameDe} — ${activeCardData.priceLabel} — صرفه‌جویی سالانه: €${savings.totalSavings.toFixed(2)}`
    );
    setCopied(true);
    toast.success("نتیجه کپی شد!");
    setTimeout(() => setCopied(false), 2000);
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای کامل خرید و استفاده از ÖBB Vorteilscard در اتریش",
      description:
        "راهنمای گام‌به‌گام خرید کارت تخفیف قطار ÖBB Vorteilscard — مقایسه انواع کارت، قیمت‌های ۲۰۲۶ و محاسبه صرفه‌جویی.",
      inLanguage: "fa-IR",
      step: [
        { "@type": "HowToStep", position: 1, name: "نوع کارت مناسب سن و وضعیت خود را انتخاب کنید" },
        { "@type": "HowToStep", position: 2, name: "حساب کاربری ÖBB بسازید (رایگان)" },
        { "@type": "HowToStep", position: 3, name: "کارت را از اپلیکیشن یا وب‌سایت ÖBB خریداری کنید" },
        { "@type": "HowToStep", position: 4, name: "شماره کارت را در حساب ÖBB ذخیره کنید" },
        { "@type": "HowToStep", position: 5, name: "هنگام خرید بلیت، شماره Vorteilscard را وارد کنید" },
      ],
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
      headline: "ÖBB Vorteilscard 2026 — راهنمای کامل کارت تخفیف قطار اتریش",
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
      title="راهنمای کارت تخفیف قطار ÖBB Vorteilscard"
      description="راهنمای جامع خرید، مقایسه و استفاده از کارت تخفیف سالانه قطار ÖBB Vorteilscard — قیمت‌های ۲۰۲۶ و محاسبه صرفه‌جویی"
    >
      <SEO
        title="ÖBB Vorteilscard 2026 | راهنمای کامل کارت تخفیف قطار اتریش"
        description="راهنمای کامل ÖBB Vorteilscard 2026: مقایسه Classic، Comfort، Jugend، Family و Senior، قیمت‌ها، تخفیف ۵۰٪ و محاسبه صرفه‌جویی. خرید کارت تخفیف قطار اتریش."
        keywords="ÖBB Vorteilscard, کارت تخفیف قطار اتریش, Vorteilscard Classic, Vorteilscard Jugend, Vorteilscard Family, قطار اتریش, ÖBB تخفیف, Vorteilscard Preis 2026, Klimaticket اتریش"
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
              "radial-gradient(80% 150% at 90% 0, #991b1b 0, #450a0a 48%, #1a0505 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="قطار ÖBB در اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a0505]/85 via-[#450a0a]/75 to-[#991b1b]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🚆
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای رسمی ÖBB Vorteilscard ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              با کارت تخفیف قطار ÖBB، نصف قیمت سفر کنید
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              اگر در اتریش زندگی می‌کنید و چند بار در سال با قطار سفر می‌کنید،
              <strong className="text-amber-300">Vorteilscard</strong> یکی از بهترین سرمایه‌گذاری‌های مالی شماست.
              با قیمت فقط <strong className="text-amber-300">€۷۳</strong> در سال، ۵۰٪ تخفیف روی
              تمام بلیت‌های استاندارد ÖBB دریافت می‌کنید. در این راهنمای جامع،
              انواع کارت، قیمت‌ها، شرایط و محاسبه صرفه‌جویی را بررسی می‌کنیم.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۵ نوع کارت مختلف</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>قیمت‌های رسمی ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>محاسبه‌گر صرفه‌جویی</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#cards"
                className="inline-flex items-center gap-2 bg-white text-[#991b1b] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Ticket className="w-4 h-4" />
                مقایسه کارت‌ها
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره رایگان سفر
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#c8102e]" />
                </div>
                <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* CARDS SELECTOR */}
        {/* ========================================== */}
        <div id="cards" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#c8102e]" />
              پنج نوع کارت Vorteilscard — کدام برای شما مناسب است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر کارت کلیک کنید تا جزئیات کامل را ببینید
            </p>
          </div>

          {/* Card tabs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-5">
            {CARDS.map((c) => {
              const Icon = c.icon;
              const isActive = activeCard === c.id;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setActiveCard(c.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                    isActive
                      ? "border-[#c8102e] shadow-lg shadow-red-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  {c.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      پیشنهادی
                    </div>
                  )}
                  <div className={`w-9 h-9 mx-auto rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] font-black text-stone-900">{c.name}</div>
                  <div className={`text-[10px] font-black mt-0.5 ${isActive ? c.color : "text-stone-500"}`}>
                    {c.priceLabel}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active card detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image panel */}
                <div className="relative h-64 md:h-auto min-h-[320px] overflow-hidden">
                  <img
                    src={
                      activeCard === "comfort"
                        ? IMAGES.railjet
                        : activeCard === "family"
                        ? IMAGES.alpine
                        : activeCard === "jugend"
                        ? IMAGES.vienna
                        : IMAGES.hero
                    }
                    alt={activeCardData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeCardData.gradient} opacity-40 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <MapPin className="w-3 h-3 text-[#c8102e]" />
                    {activeCardData.ageRange}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">قیمت سالانه ۲۰۲۶</div>
                    <div className="text-2xl font-black text-white leading-tight font-mono" dir="ltr">
                      {activeCardData.priceLabel}
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeCardData.color}`}>
                      <Zap className="w-3 h-3" />
                      {activeCardData.nameDe}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                      <Percent className="w-3 h-3" />
                      {activeCardData.discount}٪ تخفیف
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    Vorteilscard {activeCardData.name}
                  </h3>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeCardData.description}
                  </p>

                  {/* Perks */}
                  <div className="mb-5">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      مزایا
                    </div>
                    <ul className="space-y-2">
                      {activeCardData.perks.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 mb-5">
                    <div className="text-[10px] font-black text-stone-700 mb-1.5 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      پیش‌نیازها
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCardData.requirements.map((r, i) => (
                        <span key={i} className="text-[9px] font-black text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3">
                    <div className="text-[10px] font-black text-sky-700 mb-0.5">مناسب برای:</div>
                    <div className="text-[10px] text-sky-800 font-bold leading-snug">{activeCardData.bestFor}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* SAVINGS CALCULATOR */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#c8102e]" />
              ماشین‌حساب صرفه‌جویی Vorteilscard
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چند سفر با قطار در سال انجام می‌دهید؟ محاسبه کنید چقدر صرفه‌جویی می‌کنید
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Input panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-5">
              {/* Card selector inside calculator */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#c8102e]" />
                  نوع کارت انتخابی
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {CARDS.map((c) => {
                    const Icon = c.icon;
                    const isActive = activeCard === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveCard(c.id)}
                        className={`rounded-xl border-2 p-2 text-center transition-all ${
                          isActive
                            ? "border-[#c8102e] bg-red-50/50"
                            : "border-stone-200 hover:border-stone-300"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mx-auto mb-1 ${isActive ? "text-[#c8102e]" : "text-stone-400"}`} />
                        <div className="text-[9px] font-black text-stone-700">{c.name}</div>
                        <div className="text-[9px] font-bold text-stone-500 font-mono" dir="ltr">€{c.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trips per year */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Route className="w-3.5 h-3.5 text-[#c8102e]" />
                    تعداد سفرهای طولانی در سال
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">
                    {tripsPerYear} {tripsPerYear === 1 ? "trip" : "trips"}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={tripsPerYear}
                  onChange={(e) => setTripsPerYear(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#c8102e]"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-bold mt-1">
                  <span>۱</span>
                  <span>۵</span>
                  <span>۱۰</span>
                  <span>۱۵</span>
                  <span>۲۰</span>
                </div>
              </div>

              {/* Average ticket price */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Euro className="w-3.5 h-3.5 text-[#c8102e]" />
                    میانگین قیمت هر بلیت (بدون تخفیف)
                  </span>
                  <span className="text-sm font-black text-[#c8102e] font-mono" dir="ltr">
                    €{avgTicketPrice}
                  </span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={avgTicketPrice}
                  onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#c8102e]"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-bold mt-1">
                  <span>€۱۰</span>
                  <span>€۴۰</span>
                  <span>€۷۰</span>
                  <span>€۱۰۰</span>
                </div>
              </div>

              {/* Route examples */}
              <div>
                <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  نمونه قیمت بلیت‌های رایج (بدون تخفیف)
                </div>
                <div className="space-y-1.5">
                  {ROUTES.slice(0, 3).map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-stone-50 border border-stone-100 rounded-xl px-3 py-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600">
                        <Train className="w-3 h-3 text-stone-400" />
                        {r.from} → {r.to}
                        <span className="text-[9px] text-stone-400 font-mono">({r.duration}h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black">
                        <span className="text-stone-400 line-through font-mono" dir="ltr">€{r.standard}</span>
                        <span className="text-emerald-600 font-mono" dir="ltr">€{r.discounted}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCard}-${tripsPerYear}-${avgTicketPrice}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`relative overflow-hidden rounded-3xl p-6 text-white ${
                    savings.netResult > 0
                      ? "bg-gradient-to-br from-emerald-600 to-green-700"
                      : "bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#020617]"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      {savings.netResult > 0 ? (
                        <>
                          <TrendingUp className="w-3 h-3 text-emerald-300" />
                          سرمایه‌گذاری سودده
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-amber-300" />
                          هنوز به صرفه نیست
                        </>
                      )}
                    </div>

                    <div className="text-[10px] font-black text-white/70 mb-1">
                      صرفه‌جویی خالص سالانه
                    </div>
                    <div className={`text-4xl md:text-5xl font-black leading-none mb-1 font-mono ${savings.netResult > 0 ? "text-emerald-100" : "text-amber-100"}`} dir="ltr">
                      {savings.netResult >= 0 ? "+" : ""}€{Math.abs(savings.netResult).toFixed(0)}
                    </div>
                    <div className="text-[11px] font-bold text-white/60 mb-5">
                      {savings.netResult > 0
                        ? `با ${tripsPerYear} سفر در سال، ${savings.netResult.toFixed(0)} یورو بیشتر از هزینه کارت صرفه‌جویی می‌کنید`
                        : `برای جبران هزینه کارت به ${savings.breakEven} سفر نیاز دارید`}
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 mb-5 pt-4 border-t border-white/15">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Euro className="w-3 h-3" />
                          قیمت کارت
                        </span>
                        <span className="font-black font-mono" dir="ltr">
                          −€{activeCardData.price}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Percent className="w-3 h-3" />
                          تخفیف هر سفر
                        </span>
                        <span className="font-black font-mono text-emerald-300" dir="ltr">
                          +€{savings.discountPerTrip.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Calculator className="w-3 h-3" />
                          کل تخفیف سالانه
                        </span>
                        <span className="font-black font-mono text-emerald-300" dir="ltr">
                          +€{savings.totalSavings.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/15">
                        <span className="font-black text-white/90 flex items-center gap-1.5">
                          <BarChart3 className="w-3 h-3" />
                          نقطه سربه‌سر
                        </span>
                        <span className="font-black font-mono text-amber-300" dir="ltr">
                          {savings.breakEven} {savings.breakEven === 1 ? "trip" : "trips"}
                        </span>
                      </div>
                    </div>

                    {/* Info note */}
                    <div className="bg-white/10 border border-white/15 rounded-2xl p-3 mb-4">
                      <div className="text-[9px] font-black text-white/60 mb-1">نکته مهم</div>
                      <p className="text-[10px] text-white/90 font-bold leading-relaxed">
                        تخفیف ۵۰٪ روی قیمت <strong>بلیت استاندارد</strong> اعمال می‌شود، نه روی
                        بلیت‌های تخفیف‌دار Sparschiene. اگر بلیت‌های ارزان Sparschiene می‌خرید،
                        محاسبه متفاوت است.
                      </p>
                    </div>

                    {/* Copy button */}
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-sm text-white font-black text-[11px] py-2.5 rounded-2xl transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                          کپی شد!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          کپی نتیجه
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* PURCHASE GUIDE */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  چگونه Vorteilscard بخریم؟
                </h3>
                <p className="text-[10px] text-stone-500 font-bold">
                  ۵ روش رسمی خرید — آنلاین یا حضوری
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { icon: Smartphone, title: "اپلیکیشن ÖBB", desc: "سریع‌ترین روش — کارت فوراً فعال می‌شود", color: "from-emerald-500 to-teal-600" },
                { icon: Globe, title: "shop.oebbtickets.at", desc: "خرید آنلاین با حساب ÖBB", color: "from-sky-500 to-blue-600" },
                { icon: Building2, title: "باجه‌های بلیت ایستگاه", desc: "خرید حضوری در تمام ایستگاه‌های اصلی", color: "from-amber-500 to-orange-600" },
                { icon: Users, title: "آژانس‌های مسافرتی ÖBB", desc: "مشاوره حضوری در دفاتر ÖBB Reisebüro", color: "from-rose-500 to-red-600" },
                { icon: Landmark, title: "شرکای فروش ÖBB", desc: "برخی دفاتر خدمات مسافرتی معتبر", color: "from-purple-500 to-indigo-600" },
                { icon: CheckCircle, title: "بدون نیاز به عکس", desc: "برای صدور کارت نیازی به عکس پرسنلی نیست", color: "from-stone-500 to-stone-700" },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-stone-900 mb-0.5">{m.title}</h4>
                      <p className="text-[10px] text-stone-500 font-bold leading-snug">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" />
              با Vorteilscard کجا می‌توانید سفر کنید؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از قلب وین تا قله‌های آلپ — همه با نصف قیمت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.vienna,
                title: "وین — پایتخت",
                subtitle: "شروع همه سفرها",
                desc: "قطارهای Railjet از ایستگاه مرکزی وین (Hauptbahnhof) به تمام نقاط اتریش و اروپا حرکت می‌کنند.",
                icon: Building2,
                gradient: "from-sky-600 to-blue-700",
                stat: "۵ خط مترو",
              },
              {
                img: IMAGES.railjet,
                title: "Railjet — قطار سریع‌السیر",
                subtitle: "تا ۲۳۰ کیلومتر بر ساعت",
                desc: "قطارهای مدرن Railjet ÖBB شما را با سرعت و راحتی به مقاصد اصلی اتریش و کشورهای همسایه می‌رسانند.",
                icon: Train,
                gradient: "from-rose-600 to-red-700",
                stat: "۵۰٪ تخفیف",
              },
              {
                img: IMAGES.alpine,
                title: "آلپ — طبیعت بکر",
                subtitle: "خطوط کوهستانی افسانه‌ای",
                desc: "از Semmering تا Arlberg، مسیرهای کوهستانی اتریش با Vorteilscard بسیار مقرون‌به‌صرفه می‌شوند.",
                icon: Mountain,
                gradient: "from-emerald-600 to-teal-700",
                stat: "مناظر بی‌نظیر",
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
        {/* COMPARISON TABLE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#c8102e]" />
              جدول مقایسه کامل کارت‌های Vorteilscard ۲۰۲۶
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              همه گزینه‌ها در یک نگاه — قیمت، تخفیف و مزایا
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2">نوع کارت</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">قیمت سالانه</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">تخفیف</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">رزرو صندلی</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">شرط سنی</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">فرمت</th>
                </tr>
              </thead>
              <tbody>
                {CARDS.map((c, i) => {
                  const Icon = c.icon;
                  const isActive = activeCard === c.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setActiveCard(c.id)}
                      className={`border-b border-stone-100 cursor-pointer transition-all ${
                        isActive ? "bg-red-50/50" : "hover:bg-stone-50/50"
                      }`}
                    >
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[11px] font-black text-stone-800">{c.name}</div>
                            <div className="text-[9px] text-stone-400 font-bold font-mono" dir="ltr">{c.nameDe}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-[11px] font-black text-[#c8102e] font-mono" dir="ltr">{c.priceLabel}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-[11px] font-black text-emerald-600">{c.discount}٪</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {c.seatReservation ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <span className="text-stone-300 text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-[9px] font-bold text-stone-500">{c.ageRange}</span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                          c.digitalOnly ? "bg-violet-50 text-violet-700" : "bg-stone-100 text-stone-600"
                        }`}>
                          {c.digitalOnly ? "دیجیتال" : "فیزیکی + دیجیتال"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              <strong>نکته:</strong> قیمت Vorteilscard Classic از ۹۹ یورو (۲۰۲۴) به ۷۳ یورو (۲۰۲۶)
              کاهش یافته و Vorteilscard 66 قدیمی کاملاً حذف شده است. کارت Comfort فقط دیجیتال
              است و از طریق اپلیکیشن ÖBB یا وب‌سایت خریداری می‌شود.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Vorteilscard
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
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Train className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی سفر با قطار
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در انتخاب کارت مناسب مطمئن نیستید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش می‌تواند بر اساس الگوی سفر شما،
              بهترین نوع Vorteilscard را پیشنهاد دهد. همین حالا پیام دهید.
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
              قیمت‌های ذکرشده بر اساس اطلاعات رسمی ÖBB در سال ۲۰۲۶ تهیه شده‌اند و ممکن
              است تغییر کنند. همچنین تخفیف ۵۰٪ روی قیمت <strong>بلیت استاندارد</strong> اعمال
              می‌شود، نه روی بلیت‌های تخفیف‌دار Sparschiene. برای تصمیم‌های نهایی،
              همیشه وب‌سایت رسمی ÖBB (oebb.at) را بررسی کنید.
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
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
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

export default ObbVorteilscardGuide;