import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart, TrendingDown, TrendingUp, Store, Award, Sparkles,
  CheckCircle, ShieldCheck, Zap, Heart, Star, Users, Globe, Rocket,
  Handshake, ChevronDown, ChevronLeft, Clock, MapPin, Info, Wallet,
  PieChart, Calculator, BookOpen, Target, AlertTriangle, Quote,
  Euro, Tag, BadgePercent, ThumbsUp, ThumbsDown, Leaf, Package,
  Coffee, Apple, Beef, Milk, Croissant, Home, Trophy, Crown, Medal,
  Layers, LayoutGrid, Table as TableIcon, Filter, ArrowUpDown,
  Smartphone, Gift, Bell, Percent, TrendingUpIcon, PiggyBank,
  Check, X, Minus, ShoppingBag, Scale, Bookmark, Calendar
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80";
const SHOPPING_IMAGE = "https://images.unsplash.com/photo-1601599963565-b7f49deb352a?w=800&q=80";
const BASKET_IMAGE = "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80";

// ==========================================
// STORES DATA
// ==========================================
interface Store {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  logoEmoji: string;
  gradient: string;
  bg: string;
  text: string;
  color: string;
  priceLevel: 1 | 2 | 3;
  qualityLevel: 1 | 2 | 3;
  branches: string;
  specialty: string;
  pros: string[];
  cons: string[];
  image: string;
  badge?: string;
  badgeIcon?: any;
}

const STORES: Store[] = [
  {
    id: "hofer",
    name: "هوفر",
    englishName: "Hofer",
    tagline: "ارزان‌ترین و محبوب‌ترین دیسکانتر اتریش",
    description:
      "هوفر (زیرمجموعه Aldi Süd) با کمترین قیمت و کیفیت قابل‌قبول، انتخاب اول اکثر خانواده‌های اتریشی است. تنوع محدود اما قیمت واقعاً رقابتی.",
    logoEmoji: "🟦",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    color: "#2563eb",
    priceLevel: 1,
    qualityLevel: 2,
    branches: "۵۰۰+ شعبه در اتریش",
    specialty: "برندهای اختصاصی ارزان",
    pros: ["ارزان‌ترین قیمت‌ها", "کیفیت قابل‌قبول", "برند اختصاصی قوی"],
    cons: ["تنوع محدود", "ساعات کاری کوتاه", "صف‌های طولانی"],
    image: "https://images.unsplash.com/photo-1601599963565-b7f49deb352a?w=800&q=80",
    badge: "محبوب‌ترین",
    badgeIcon: Award,
  },
  {
    id: "lidl",
    name: "لیدل",
    englishName: "Lidl",
    tagline: "تعادل قیمت و کیفیت",
    description:
      "لیدل با ترکیبی از قیمت مناسب و تنوع بیشتر، گزینه‌ای عالی برای خرید هفتگی است. محصولات تازه آن کیفیت بالاتری نسبت به هوفر دارد.",
    logoEmoji: "🟨",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
    color: "#0284c7",
    priceLevel: 1,
    qualityLevel: 3,
    branches: "۲۵۰+ شعبه در اتریش",
    specialty: "محصولات تازه با کیفیت",
    pros: ["کیفیت بهتر از هوفر", "تنوع بالاتر", "پیشنهادهای هفتگی"],
    cons: ["قیمت کمی گران‌تر", "شعبه‌های کمتر"],
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80",
    badge: "بهترین تعادل",
    badgeIcon: ThumbsUp,
  },
  {
    id: "penny",
    name: "پنی",
    englishName: "Penny",
    tagline: "دیسکانتر آلمانی با تخفیف‌های ویژه",
    description:
      "پنی (زیرمجموعه Rewe Group) با ترکیبی از قیمت‌های مناسب و کمپین‌های تخفیفی جذاب، گزینه‌ای عالی برای شکار تخفیف است.",
    logoEmoji: "🔴",
    gradient: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    color: "#e11d48",
    priceLevel: 2,
    qualityLevel: 2,
    branches: "۳۰۰+ شعبه در اتریش",
    specialty: "کمپین‌های تخفیفی قوی",
    pros: ["تخفیف‌های مکرر", "برندهای آلمانی", "دسترسی راحت"],
    cons: ["کیفیت متغیر", "قیمت پایه بالاتر"],
    image: "https://images.unsplash.com/photo-1580913428706-c311e67898b3?w=800&q=80",
    badge: "شکارچی تخفیف",
    badgeIcon: BadgePercent,
  },
  {
    id: "spar",
    name: "اسپار",
    englishName: "Spar",
    tagline: "کیفیت و راحتی بالاتر",
    description:
      "اسپار و زیرمجموعه‌های آن (Eurospar، Interspar) با کیفیت بالا، تنوع گسترده و شعبه‌های فراوان، انتخاب اول کسانی است که به راحتی اهمیت می‌دهند.",
    logoEmoji: "🟩",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    color: "#059669",
    priceLevel: 3,
    qualityLevel: 3,
    branches: "۱۵۰۰+ شعبه در اتریش",
    specialty: "کیفیت و تنوع برتر",
    pros: ["کیفیت عالی", "شعبه در همه‌جا", "برندهای اسپار خوب"],
    cons: ["گران‌تر", "هزینه بالا"],
    image: "https://images.unsplash.com/photo-1584009783942-2d0a8f8acac4?w=800&q=80",
    badge: "کیفیت برتر",
    badgeIcon: Star,
  },
];

// ==========================================
// PRICE COMPARISON DATA
// ==========================================
interface PriceItem {
  name: string;
  icon: string;
  hofer: number;
  lidl: number;
  penny: number;
  spar: number;
}

const PRICE_ITEMS: PriceItem[] = [
  { name: "شیر تازه (۱ لیتر)", icon: "🥛", hofer: 1.09, lidl: 1.15, penny: 1.19, spar: 1.29 },
  { name: "نان تست (بسته ۵۰۰ گرمی)", icon: "🍞", hofer: 0.99, lidl: 1.09, penny: 1.15, spar: 1.39 },
  { name: "تخم‌مرغ (۱۰ عددی)", icon: "🥚", hofer: 2.19, lidl: 2.29, penny: 2.39, spar: 2.79 },
  { name: "سینه مرغ (۱ کیلوگرم)", icon: "🍗", hofer: 7.99, lidl: 8.49, penny: 8.99, spar: 10.49 },
  { name: "سیب (۱ کیلوگرم)", icon: "🍎", hofer: 1.49, lidl: 1.59, penny: 1.69, spar: 1.99 },
  { name: "پنیر گودا (۲۰۰ گرم)", icon: "🧀", hofer: 2.19, lidl: 2.39, penny: 2.49, spar: 2.99 },
  { name: "ماکارونی (۵۰۰ گرم)", icon: "🍝", hofer: 0.79, lidl: 0.85, penny: 0.89, spar: 1.09 },
  { name: "روغن زیتون (۵۰۰ میلی‌لیتر)", icon: "🫒", hofer: 4.99, lidl: 5.49, penny: 5.79, spar: 6.99 },
];

// ==========================================
// BRAND COMPARISON (NEW)
// ==========================================
const BRANDS = [
  {
    store: "هوفر",
    storeColor: "bg-blue-600",
    brands: [
      { name: "Clever", cat: "مواد غذایی عمومی", save: "۳۰-۴۰٪" },
      { name: "Milfina", cat: "لبنیات", save: "۲۵-۳۵٪" },
      { name: "Zurück zum Ursprung", cat: "Bio (ارگانیک)", save: "۱۵-۲۵٪" },
    ],
  },
  {
    store: "لیدل",
    storeColor: "bg-sky-600",
    brands: [
      { name: "Combino", cat: "پاستا و برنج", save: "۲۵-۳۵٪" },
      { name: "Pilos", cat: "لبنیات", save: "۲۰-۳۰٪" },
      { name: "Vitasia", cat: "آسیایی", save: "۲۰-۳۰٪" },
    ],
  },
  {
    store: "پنی",
    storeColor: "bg-rose-600",
    brands: [
      { name: "Ja! Natürlich", cat: "Bio (ارگانیک)", save: "۱۵-۲۵٪" },
      { name: "Billa Clever", cat: "مواد عمومی", save: "۳۰-۴۰٪" },
      { name: "Today", cat: "غذای آماده", save: "۲۰-۳۰٪" },
    ],
  },
  {
    store: "اسپار",
    storeColor: "bg-emerald-600",
    brands: [
      { name: "S-Budget", cat: "مواد عمومی", save: "۳۰-۴۰٪" },
      { name: "Natur*pur", cat: "Bio (ارگانیک)", save: "۱۰-۲۰٪" },
      { name: "Spar Vital", cat: "سالم و پروتئینی", save: "۱۰-۲۰٪" },
    ],
  },
];

// ==========================================
// WEEKLY ACTIONS (NEW)
// ==========================================
const WEEKLY_ACTIONS = [
  {
    icon: BadgePercent,
    day: "دوشنبه",
    title: "شروع هفته با تخفیف‌ها",
    tip: "بروشورهای تخفیف هفتگی (Aktionsprospekt) در دوشنبه‌ها منتشر می‌شوند. برنامه خرید خود را از قبل تنظیم کنید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Clock,
    day: "پنجشنبه",
    title: "زمان طلایی نان تازه",
    tip: "نان‌های تازه در پنجشنبه‌ها تخفیف ۳۰٪ می‌خورند. اگر فضای فریزر دارید، بهترین فرصت برای خرید عمده است.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Tag,
    day: "جمعه عصر",
    title: "پاکسازی گوشت و لبنیات",
    tip: "فروشگاه‌ها برای موجودی هفته آینده، جمعه عصر محصولات فاسدشدنی را با ۵۰٪ تخفیف می‌فروشند.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Bell,
    day: "اپلیکیشن‌ها",
    title: "اعلان‌های لحظه‌ای",
    tip: "jö (Spar) و Lidl Plus اعلان‌های تخفیف لحظه‌ای می‌فرستند. فعال بودن نوتیفیکیشن = صرفه‌جویی بیشتر.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۴", label: "فروشگاه اصلی", icon: "🏪" },
  { value: "۲٬۵۵۰+", label: "شعبه در اتریش", icon: "📍" },
  { value: "۳۴٪", label: "صرفه‌جویی ممکن", icon: "💰" },
  { value: "۸", label: "قلم مقایسه‌ای", icon: "📊" },
];

// ==========================================
// SHOPPING TIPS
// ==========================================
const TIPS = [
  {
    icon: Clock,
    title: "زمان طلایی خرید",
    text: "آخر شب (بعد از ساعت ۱۹) اغلب تخفیف‌های ۳۰-۵۰٪ روی محصولات تازه اعمال می‌شود. شنبه‌ها نیز فرصت خوبی برای شکار تخفیف است.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: BadgePercent,
    title: "کارت‌های وفاداری",
    text: "کارت jö (Spar) و Lidl Plus تخفیف‌های اختصاصی و امتیازهای جمع‌آوری‌شونده ارائه می‌دهند که صرفه‌جویی ماهانه قابل‌توجهی دارند.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Leaf,
    title: "برندهای اختصاصی",
    text: "برندهای اختصاصی (S-Budget، Clever، Milfina) بین ۲۰ تا ۴۰ درصد ارزان‌تر از برندهای معروف هستند، با کیفیتی تقریباً یکسان.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Package,
    title: "خرید عمده",
    text: "خرید بسته‌های بزرگ (۵ یا ۱۰ کیلوگرمی) و مواد غذایی با تاریخ انقضای طولانی، هزینه هر واحد را به‌طور قابل‌توجهی کاهش می‌دهد.",
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا خرید از هوفر واقعاً ارزان‌تر است؟",
    a: "بله، مطالعات مستقل نشان می‌دهد سبد خرید هفتگی در هوفر به‌طور میانگین ۱۵ تا ۲۵ درصد ارزان‌تر از اسپار است. با این حال، کیفیت برخی محصولات ممکن است پایین‌تر باشد.",
  },
  {
    q: "چرا فروشگاه‌های دیسکانتر در اتریش این‌قدر محبوب هستند؟",
    a: "اتریشی‌ها به کیفیت و قیمت مناسب اهمیت زیادی می‌دهند. مدل کسب‌وکار دیسکانترها (تنوع محدود، برند اختصاصی، هزینه عملیاتی پایین) به آن‌ها امکان می‌دهد قیمت‌های رقابتی ارائه دهند.",
  },
  {
    q: "آیا تمام فروشگاه‌ها یکشنبه‌ها باز هستند؟",
    a: "خیر، در اتریش تمام فروشگاه‌های مواد غذایی یکشنبه‌ها تعطیل هستند. تنها استثناها، فروشگاه‌های داخل ایستگاه‌های قطار (مانند Hauptbahnhof Wien) و پمپ بنزین‌ها هستند که قیمت‌های بالاتری دارند.",
  },
  {
    q: "کدام فروشگاه برای خرید ارگانیک (Bio) مناسب‌تر است؟",
    a: "برای محصولات ارگانیک، Spar (برند Natur*pur) و Hofer (برند Zurück zum Ursprung) بهترین ترکیب قیمت و کیفیت را ارائه می‌دهند. Lidl نیز بخش Bio قوی دارد.",
  },
  {
    q: "آیا می‌توانم بدون دانستن آلمانی خرید کنم؟",
    a: "بله، تمام فروشگاه‌ها سیستم بارکد دارند و نیازی به مکالمه نیست. برای محصولات خاص، می‌توانید از اپلیکیشن Google Translate با قابلیت ترجمه تصویری (Lens) استفاده کنید.",
  },
  {
    q: "تفاوت قیمت بین فروشگاه‌های زنجیره‌ای چقدر است؟",
    a: "بر اساس جدول مقایسه ما، سبد ۸ قلم اساسی در هوفر (ارزان‌ترین) حدود ۲۱.۷۲ یورو و در اسپار (گران‌ترین) حدود ۲۹.۰۲ یورو است — یعنی ۳۴٪ تفاوت که در سال به بیش از ۸۷ یورو صرفه‌جویی می‌رسد.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const DiscounterGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState<"name" | "cheapest">("name");

  // Calculate totals per store
  const storeTotals = {
    hofer: PRICE_ITEMS.reduce((s, i) => s + i.hofer, 0),
    lidl: PRICE_ITEMS.reduce((s, i) => s + i.lidl, 0),
    penny: PRICE_ITEMS.reduce((s, i) => s + i.penny, 0),
    spar: PRICE_ITEMS.reduce((s, i) => s + i.spar, 0),
  };

  const sortedStores = Object.entries(storeTotals).sort((a, b) => a[1] - b[1]);
  const cheapestStore = sortedStores[0];
  const mostExpensiveStore = sortedStores[sortedStores.length - 1];
  const maxTotal = mostExpensiveStore[1];
  const minTotal = cheapestStore[1];
  const diffAmount = mostExpensiveStore[1] - minTotal;
  const diffPercent = Math.round((diffAmount / minTotal) * 100);

  const storeNames: Record<string, string> = {
    hofer: "هوفر",
    lidl: "لیدل",
    penny: "پنی",
    spar: "اسپار",
  };

  const storeColors: Record<string, string> = {
    hofer: "#2563eb",
    lidl: "#0284c7",
    penny: "#e11d48",
    spar: "#059669",
  };

  const storeGradients: Record<string, string> = {
    hofer: "from-blue-500 to-indigo-600",
    lidl: "from-sky-500 to-blue-600",
    penny: "from-rose-500 to-red-600",
    spar: "from-emerald-500 to-green-600",
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "مقایسه کامل فروشگاه‌های زنجیره‌ای اتریش ۲۰۲۶ | Hofer، Lidl، Penny، Spar",
      description:
        "راهنمای جامع مقایسه Hofer، Lidl، Penny و Spar در اتریش با جدول قیمت واقعی ۸ قلم اساسی، برندهای اختصاصی و نکات خرید هوشمند.",
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
      name: "فروشگاه‌های زنجیره‌ای اتریش",
      itemListElement: STORES.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        description: s.description,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Table",
      about: "مقایسه قیمت اقلام اساسی در فروشگاه‌های اتریش",
    },
  ];

  const getCheapest = (item: PriceItem) => {
    const prices = { hofer: item.hofer, lidl: item.lidl, penny: item.penny, spar: item.spar };
    return Object.entries(prices).sort((a, b) => a[1] - b[1])[0][0];
  };

  return (
    <>
      <SEO
        title="مقایسه فروشگاه‌های زنجیره‌ای اتریش ۲۰۲۶ | Hofer، Lidl، Penny، Spar"
        description="مقایسه جامع قیمت و کیفیت سوپرمارکت‌های اتریش با جدول قیمت واقعی ۸ قلم اساسی، برندهای اختصاصی و نکات صرفه‌جویی. راهنمای خرید هوشمند برای فارسی‌زبانان."
        keywords="فروشگاه اتریش, Hofer اتریش, Lidl اتریش, Penny اتریش, Spar اتریش, مقایسه سوپرمارکت, خرید ارزان اتریش, دیسکانتر اتریش, برندهای اختصاصی, jö Karte, Lidl Plus, اتریش‌نشین"
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
              alt="فروشگاه زنجیره‌ای اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🛒
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
                <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
                Supermarkt Vergleich Österreich 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل فروشگاه‌های زنجیره‌ای اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                مقایسه جامع قیمت و کیفیت چهار فروشگاه اصلی اتریش — از دیسکانترهای
                ارزان مانند هوفر و لیدل تا فروشگاه‌های پرچمدار اسپار. با جدول قیمت
                واقعی ۸ قلم اساسی و راهنمای برندهای اختصاصی، خرید هوشمندانه را
                تجربه کنید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>قیمت‌های واقعی ۲۰۲۶</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>کاملاً مستقل</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>نکات صرفه‌جویی</span>
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
        {/* TOTAL BASKET COMPARISON (NEW) */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-6 md:p-8 text-white"
        >
          <div className="absolute inset-0">
            <img
              src={BASKET_IMAGE}
              alt="سبد خرید"
              className="w-full h-full object-cover opacity-[0.05]"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative">
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black backdrop-blur-sm mb-3">
                  <PiggyBank className="w-3.5 h-3.5 text-amber-300" />
                  سبد کامل ۸ قلم اساسی
                </div>
                <h2 className="text-lg md:text-2xl font-black leading-tight">
                  کدام فروشگاه ارزان‌ترین سبد را دارد؟
                </h2>
                <p className="text-[11px] md:text-sm text-stone-300 font-bold mt-1.5">
                  مجموع قیمت ۸ قلم پرمصرف برای یک خانوار دو نفره
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <Trophy className="w-6 h-6 text-amber-300" />
                <div>
                  <div className="text-[9px] font-black text-stone-300">ارزان‌ترین</div>
                  <div className="text-sm font-black">
                    {storeNames[cheapestStore[0]]} · €{minTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(storeTotals)
                .sort((a, b) => a[1] - b[1])
                .map(([id, total], i) => {
                  const pct = Math.round((total / maxTotal) * 100);
                  const isCheapest = i === 0;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${storeGradients[id]} flex items-center justify-center text-white shadow-md`}
                          >
                            <Store className="w-4 h-4" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black">
                              {storeNames[id]}
                            </span>
                            {isCheapest && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2 py-0.5 rounded-full">
                                <Crown className="w-2.5 h-2.5 fill-current" />
                                برنده
                              </span>
                            )}
                            {i === 3 && (
                              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                                <TrendingUp className="w-2.5 h-2.5" />
                                گران‌ترین
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black font-mono">
                            €{total.toFixed(2)}
                          </span>
                          <span className="text-[10px] font-bold text-stone-400">
                            ({pct}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full bg-gradient-to-l ${storeGradients[id]} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <Wallet className="w-8 h-8 text-amber-300 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-black text-stone-300">صرفه‌جویی ماهانه</div>
                  <div className="text-sm font-black">€{diffAmount.toFixed(2)} ({diffPercent}٪)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <TrendingDown className="w-8 h-8 text-emerald-300 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-black text-stone-300">صرفه‌جویی سالانه</div>
                  <div className="text-sm font-black">€{(diffAmount * 12).toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
                <PiggyBank className="w-8 h-8 text-sky-300 flex-shrink-0" />
                <div>
                  <div className="text-[9px] font-black text-stone-300">در ۵ سال</div>
                  <div className="text-sm font-black">€{(diffAmount * 12 * 5).toFixed(0)}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TABS: STORES CARDS + PRICE TABLE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          {/* Tabs Header */}
          <div className="border-b border-stone-200 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-lg md:text-xl font-black text-stone-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#c8102e]" />
                  کاوش در فروشگاه‌ها و قیمت‌ها
                </h2>
                <p className="text-[10px] md:text-xs text-stone-500 font-bold mt-1">
                  بین نمای کارت و جدول قیمت جابجا شوید
                </p>
              </div>

              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl">
                <button
                  onClick={() => setActiveTab("cards")}
                  className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all ${
                    activeTab === "cards"
                      ? "bg-white text-[#c8102e] shadow-sm"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  نمای کارت
                </button>
                <button
                  onClick={() => setActiveTab("table")}
                  className={`inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all ${
                    activeTab === "table"
                      ? "bg-white text-[#c8102e] shadow-sm"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  جدول قیمت
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              {activeTab === "cards" ? (
                <motion.div
                  key="cards-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {STORES.map((store, i) => {
                    const BadgeIcon = store.badgeIcon;
                    const total = storeTotals[store.id as keyof typeof storeTotals];
                    const isCheapest = cheapestStore[0] === store.id;

                    return (
                      <motion.div
                        key={store.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ y: -6 }}
                        className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                      >
                        {/* Image banner */}
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={store.image}
                            alt={store.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {store.badge && (
                            <div
                              className={`absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r ${store.gradient} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
                            >
                              {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5" />}
                              {store.badge}
                            </div>
                          )}

                          {isCheapest && (
                            <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2 py-1 rounded-full shadow-lg">
                              <Trophy className="w-2.5 h-2.5 fill-current" />
                              ارزان‌ترین
                            </div>
                          )}

                          <div
                            className={`absolute -bottom-6 right-4 w-12 h-12 rounded-2xl bg-white shadow-xl border-2 border-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                          >
                            {store.logoEmoji}
                          </div>

                          <div className="absolute bottom-3 left-3 text-white">
                            <div className="text-[10px] font-mono opacity-90">
                              {store.englishName}
                            </div>
                          </div>

                          {/* Total badge */}
                          <div className="absolute bottom-3 right-20 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-0.5">
                            <div className="text-[8px] font-black text-stone-500">سبد</div>
                            <div className="text-[11px] font-black text-[#c8102e] font-mono">
                              €{total.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-8">
                          <h3 className="font-black text-stone-900 text-sm mb-1">
                            {store.name}
                          </h3>
                          <p className="text-[10px] text-stone-500 font-bold mb-3 leading-relaxed">
                            {store.tagline}
                          </p>

                          {/* Price/Quality meters */}
                          <div className="space-y-2 mb-4 pb-4 border-b border-stone-100">
                            <div>
                              <div className="flex items-center justify-between text-[9px] font-black mb-1">
                                <span className="text-stone-500">قیمت</span>
                                <span className={store.text}>
                                  {store.priceLevel === 1 ? "ارزان" : store.priceLevel === 2 ? "متوسط" : "گران"}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3].map((n) => (
                                  <div
                                    key={n}
                                    className={`flex-1 h-1.5 rounded-full ${
                                      n <= (4 - store.priceLevel)
                                        ? store.text.replace("text-", "bg-")
                                        : "bg-stone-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-[9px] font-black mb-1">
                                <span className="text-stone-500">کیفیت</span>
                                <span className={store.text}>
                                  {store.qualityLevel === 1 ? "پایه" : store.qualityLevel === 2 ? "خوب" : "عالی"}
                                </span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3].map((n) => (
                                  <div
                                    key={n}
                                    className={`flex-1 h-1.5 rounded-full ${
                                      n <= store.qualityLevel
                                        ? store.text.replace("text-", "bg-")
                                        : "bg-stone-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Pros */}
                          <div className="space-y-1.5 mb-3">
                            {store.pros.map((p, j) => (
                              <div key={j} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600">
                                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {p}
                              </div>
                            ))}
                          </div>

                          {/* Cons */}
                          <div className="space-y-1.5">
                            {store.cons.map((c, j) => (
                              <div key={j} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                                <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0 mt-0.5" />
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="table-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-rose-100 text-[#c8102e] px-2.5 py-1 rounded-full">
                        قیمت‌های واقعی ۲۰۲۶
                      </span>
                      <Euro className="w-4 h-4 text-[#c8102e]" />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black text-emerald-700">داده زنده</span>
                    </div>
                  </div>

                  <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-gradient-to-l from-stone-100 to-stone-50 border-b border-stone-200 text-stone-600 font-black">
                          <tr>
                            <th className="p-3 md:p-4">کالا</th>
                            <th className="p-3 md:p-4 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">🟦 هوفر</span>
                            </th>
                            <th className="p-3 md:p-4 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">🟨 لیدل</span>
                            </th>
                            <th className="p-3 md:p-4 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">🔴 پنی</span>
                            </th>
                            <th className="p-3 md:p-4 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">🟩 اسپار</span>
                            </th>
                            <th className="p-3 md:p-4 text-left whitespace-nowrap">ارزان‌ترین</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                          {PRICE_ITEMS.map((item, i) => {
                            const cheapest = getCheapest(item);
                            return (
                              <motion.tr
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                className="hover:bg-stone-50/70 transition-colors"
                              >
                                <td className="p-3 md:p-4 font-black text-stone-800">
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{item.icon}</span>
                                    <span className="text-[10.5px] md:text-xs">{item.name}</span>
                                  </div>
                                </td>
                                <td className={`p-3 md:p-4 text-center font-mono ${cheapest === "hofer" ? "text-emerald-700 font-black bg-emerald-50/50" : "text-stone-700"}`}>
                                  €{item.hofer.toFixed(2)}
                                </td>
                                <td className={`p-3 md:p-4 text-center font-mono ${cheapest === "lidl" ? "text-emerald-700 font-black bg-emerald-50/50" : "text-stone-700"}`}>
                                  €{item.lidl.toFixed(2)}
                                </td>
                                <td className={`p-3 md:p-4 text-center font-mono ${cheapest === "penny" ? "text-emerald-700 font-black bg-emerald-50/50" : "text-stone-700"}`}>
                                  €{item.penny.toFixed(2)}
                                </td>
                                <td className={`p-3 md:p-4 text-center font-mono ${cheapest === "spar" ? "text-emerald-700 font-black bg-emerald-50/50" : "text-stone-700"}`}>
                                  €{item.spar.toFixed(2)}
                                </td>
                                <td className="p-3 md:p-4 text-left">
                                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-black">
                                    <Tag className="w-3 h-3" />
                                    {storeNames[cheapest]}
                                  </span>
                                </td>
                              </motion.tr>
                            );
                          })}
                          {/* Total row */}
                          <tr className="bg-gradient-to-l from-stone-900 to-[#0a1128] text-white font-black">
                            <td className="p-3 md:p-4 text-xs">مجموع سبد ۸ قلم</td>
                            <td className={`p-3 md:p-4 text-center font-mono ${cheapestStore[0] === "hofer" ? "text-amber-300" : ""}`}>
                              €{storeTotals.hofer.toFixed(2)}
                            </td>
                            <td className={`p-3 md:p-4 text-center font-mono ${cheapestStore[0] === "lidl" ? "text-amber-300" : ""}`}>
                              €{storeTotals.lidl.toFixed(2)}
                            </td>
                            <td className={`p-3 md:p-4 text-center font-mono ${cheapestStore[0] === "penny" ? "text-amber-300" : ""}`}>
                              €{storeTotals.penny.toFixed(2)}
                            </td>
                            <td className={`p-3 md:p-4 text-center font-mono ${cheapestStore[0] === "spar" ? "text-amber-300" : ""}`}>
                              €{storeTotals.spar.toFixed(2)}
                            </td>
                            <td className="p-3 md:p-4 text-left">
                              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-950 px-2 py-1 rounded-lg text-[10px]">
                                <Crown className="w-3 h-3 fill-current" />
                                {storeNames[cheapestStore[0]]}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-900 font-bold leading-relaxed">
                      <strong>نکته:</strong> اعداد این جدول میانگین قیمت‌های گزارش‌شده
                      در سال ۲۰۲۵ هستند. قیمت‌های واقعی ممکن است بر اساس منطقه،
                      زمان و موجودی تغییر کنند. برای صرفه‌جویی حداکثری، از
                      کمپین‌های هفتگی (Aktion) هر فروشگاه استفاده کنید.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* BRAND COMPARISON (NEW) */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Bookmark className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              راهنمای برندهای اختصاصی (Eigenmarken)
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              برندهای اختصاصی هر فروشگاه و میزان صرفه‌جویی آن‌ها نسبت به برندهای معروف
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-8 rounded-full ${b.storeColor}`}></div>
                  <h3 className="font-black text-stone-900 text-sm">
                    فروشگاه {b.store}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {b.brands.map((brand, j) => (
                    <div
                      key={j}
                      className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 hover:bg-white hover:border-stone-200 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-black text-stone-900">
                          {brand.name}
                        </span>
                        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                          {brand.save}
                        </span>
                      </div>
                      <div className="text-[9.5px] font-bold text-stone-500">
                        {brand.cat}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
            <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-emerald-900 font-bold leading-relaxed">
              <strong>نکته:</strong> برندهای اختصاصی معمولاً توسط همان تولیدکنندگان
              برندهای معروف تولید می‌شوند اما با بسته‌بندی و قیمت متفاوت. کیفیت
              آن‌ها در آزمون‌های مستقل اغلب برابر یا نزدیک برندهای گران‌تر است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* WEEKLY ACTIONS (NEW) */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative mb-6">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
              تقویم هفتگی تخفیف‌ها
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چه روزهایی از هفته بهترین زمان برای شکار تخفیف‌های اتریش است؟
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEEKLY_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-indigo-100 p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-2 py-1 rounded-full">
                      {a.day}
                    </span>
                  </div>
                  <h3 className="font-black text-stone-900 text-xs mb-1.5">
                    {a.title}
                  </h3>
                  <p className="text-[10.5px] text-stone-600 font-bold leading-relaxed">
                    {a.tip}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* SHOPPING TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              نکات طلایی برای صرفه‌جویی هوشمند
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار راهکار عملی که هزینه خواربار ماهانه شما را کاهش می‌دهد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIPS.map((v, i) => {
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
              پاسخ به پرتکرارترین سوالات درباره خرید در اتریش
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
              نکات مهم درباره خرید در اتریش
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>تمام فروشگاه‌های مواد غذایی در اتریش یکشنبه‌ها تعطیل هستند.</li>
              <li>کیسه‌های پلاستیکی رایگان نیستند؛ حتماً کیسه پارچه‌ای همراه داشته باشید.</li>
              <li>برای جمع‌آوری امتیاز، در صندوق‌های مخصوص بطری (Pfand) بطری‌های خالی را بازگردانید.</li>
              <li>قیمت‌های اعلام‌شده بر اساس گزارش‌های میدانی ۲۰۲۵ هستند و ممکن است تغییر کنند.</li>
              <li>در فروشگاه‌های دیسکانتر، کارت بانکی بین‌المللی (Mastercard، Visa) پذیرفته می‌شود اما پول نقد نیز مفید است.</li>
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
              همراه شما در خرید هوشمند
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوال دیگری دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر درباره خرید، بودجه‌بندی یا زندگی در اتریش سوالی دارید، تیم
              اتریش‌نشین آماده کمک رایگان به شماست.
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
              تمامی قیمت‌ها و اطلاعات این راهنما بر اساس گزارش‌های میدانی و
              منابع عمومی تهیه شده و صرفاً جنبه راهنمایی دارند. قیمت‌های واقعی
              بر اساس منطقه، شعبه و زمان متفاوت خواهند بود. اتریش‌نشین هیچ
              وابستگی تجاری به هیچ‌کدام از فروشگاه‌های ذکرشده ندارد و این مقایسه
              کاملاً مستقل و بی‌طرفانه است.
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

export default DiscounterGuide;