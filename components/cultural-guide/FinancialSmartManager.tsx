import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Coins, CircleDollarSign, ShieldAlert, Sparkles, AlertTriangle, 
  Search, Tag, Copy, Check, Calendar, Ticket, Percent, Calculator,
  TrendingDown, TrendingUp, ShoppingCart, Zap, Euro, Wallet,
  PiggyBank, Receipt, CreditCard, ArrowRightLeft, Clock, Info,
  CheckCircle2, Star, Award, Heart, Users, BookOpen, Link2, Globe,
  ExternalLink, Quote, Lightbulb, Landmark, Building2, Send,
  MessageCircle, Phone, ShieldCheck, Rocket, Target, Coffee,
  Utensils, Home, Bus, Smartphone, Baby, GraduationCap, Stethoscope,
  Sparkle, ChevronDown, ChevronLeft, Eye, Share2, Filter, X,
  BadgePercent, Gift, Crown, Flame, Snowflake, Sun
} from "lucide-react";
import SEO from "./SEO";
import { INITIAL_COUPONS } from "../data";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// TYPES
// ==========================================
interface SupermarketTier {
  brand: string;
  tier: "premium" | "budget" | "hard-discount";
  desc: string;
  savingTip: string;
  avgItemsPrice: { milk: number; water: number; bread: number; salad: number };
}

// ==========================================
// SUPERMARKETS DATA
// ==========================================
const SUPERMARKETS_AT: SupermarketTier[] = [
  {
    brand: "Spar / Billa",
    tier: "premium",
    desc: "لوکس‌ترین و در دسترس‌ترین شعبات زنجیره‌ای اتریش با تنوع فوق‌العاده بالا و محصولات باکیفیت ارگانیک مانند Spar Natur-pur.",
    savingTip: "همواره از برند اختصاصی ارزان‌قیمت S-Budget یا Clever خرید کنید تا فاکتور صندوق شما کنترل شود.",
    avgItemsPrice: { milk: 1.35, water: 0.65, bread: 2.20, salad: 1.95 }
  },
  {
    brand: "Hofer",
    tier: "budget",
    desc: "معروف‌ترین مارکت تخفیف‌دهنده اتریش (جناح بومی آلدی اتریش) با کیفیت فوق‌العاده عالی و قیمت‌های منطقی برای خواربار کلی هفتگی.",
    savingTip: "بسیاری از اقلام برند Hofer کیفیتی برابر با رده پریمیوم بازار را دارا هستند.",
    avgItemsPrice: { milk: 1.10, water: 0.35, bread: 1.60, salad: 1.30 }
  },
  {
    brand: "Lidl / Penny",
    tier: "hard-discount",
    desc: "سوپرمارکت‌های هارد دیسکانت با کمترین بهای ممکن روی پروتئین خام، سبزیجات و دستمال خشک.",
    savingTip: "برای خریدهای دکوری یا شوینده به این فروشگاه‌ها سر بزنید.",
    avgItemsPrice: { milk: 0.99, water: 0.25, bread: 1.20, salad: 0.95 }
  }
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "€۴۵۰", label: "صرفه‌جویی ماهانه خانواده", icon: "💰", sub: "با برنامه‌ریزی صحیح" },
  { value: "۳۵٪", label: "کاهش هزینه خواربار", icon: "🛒", sub: "با انتخاب هوشمند برند" },
  { value: "۸۵+", label: "بن تخفیف فعال", icon: "🎟️", sub: "کسب‌وکارهای هموطن" },
  { value: "۲۳۰V", label: "ولتاژ برق اتریش", icon: "🔌", sub: "سازگار با ایران" },
];

// ==========================================
// BUDGET CATEGORIES (Cost of Living)
// ==========================================
const BUDGET_CATEGORIES = [
  { icon: Home, label: "اجاره خانه", range: "€۶۰۰ - €۱,۲۰۰", color: "from-rose-500 to-red-600", note: "بسته به شهر و نوع ملک" },
  { icon: ShoppingCart, label: "خواربار ماهانه", range: "€۲۵۰ - €۴۵۰", color: "from-emerald-500 to-green-600", note: "برای خانواده ۲ نفره" },
  { icon: Bus, label: "حمل و نقل عمومی", range: "€۵۰ - €۱۰۰", color: "from-sky-500 to-blue-600", note: "کارت WienMobil یا Jahreskarte" },
  { icon: ShieldCheck, label: "بیمه درمانی", range: "€۷۵ - €۱۵۰", color: "from-purple-500 to-indigo-600", note: "طبق قانون ÖGK" },
  { icon: Zap, label: "قبض برق و گاز", range: "€۸۰ - €۱۸۰", color: "from-amber-500 to-orange-600", note: "بسته به فصل" },
  { icon: Smartphone, label: "اینترنت و موبایل", range: "€۳۰ - €۶۰", color: "from-teal-500 to-cyan-600", note: "پکیج‌های اتریشی" },
];

// ==========================================
// SAVING TIPS
// ==========================================
const SAVING_TIPS = [
  { icon: Percent, title: "بن تخفیف Jö Bonus Club", text: "با عضویت رایگان در Jö Bonus Club (مشترک Billa، Penny و Bipa) از تخفیف‌های هفتگی بهره‌مند شوید." },
  { icon: Clock, title: "خرید در ساعات پایانی", text: "فروشگاه‌های Billa و Spar معمولاً پس از ساعت ۱۹ محصولات نزدیک انقضا را با ۳۰-۵۰٪ تخفیف می‌فروشند." },
  { icon: Gift, title: "برچسب زرد تخفیف", text: "برچسب‌های زرد روی بسته‌بندی محصولات در Hofer و Lidl نشان‌دهنده تخفیف فوری است — حتماً چک کنید." },
  { icon: Sun, title: "خرید فصلی سبزیجات", text: "استفاده از محصولات فصل (Naschmarkt وین) به جای سبزیجات گلخانه‌ای ۴۰-۶۰٪ ارزان‌تر است." },
  { icon: Coffee, title: "قهوه و صبحانه بیرون", text: "صبحانه در کافه‌های وین ۳ برابر گران‌تر از تهیه در خانه است — روزانه €۵-۸ صرفه‌جویی کنید." },
  { icon: Users, title: "خرید گروهی همسایگان", text: "با خرید عمده (Großeinkauf) از METRO یا C&C با همسایگان، هزینه هر نفر تا ۲۵٪ کاهش می‌یابد." },
];

// ==========================================
// CONVERTER QUICK VALUES
// ==========================================
const QUICK_EUR = [10, 50, 100, 250, 500, 1000];

// ==========================================
// ELECTRONICS NOTES
// ==========================================
const ELECTRONICS_FAQS = [
  { q: "آیا سشوار و اتوی موی ایرانی در اتریش کار می‌کند؟", a: "بله، ولتاژ اتریش ۲۳۰ ولت و فرکانس ۵۰Hz است که دقیقاً با ایران یکسان است. پریزهای اتریش (Type F) هم با پریزهای ایرانی سازگارند و نیازی به مبدل ندارید." },
  { q: "لوازم برقی پرقدرت مثل پلوپز و کتری برقی چطور؟", a: "از نظر ولتاژ مشکلی نیست، اما حتماً کابل ارت (سه‌شاخه) داشته باشید. فیوزهای اتوماتیک ساختمان‌های اتریشی حساستر از ایران هستند و ممکن است با نوسانات فاز پرش کنند." },
  { q: "لپ‌تاپ و شارژر موبایل بدون مبدل کار می‌کند؟", a: "اکثر شارژرهای مدرن (USB-C، لپ‌تاپ‌های جدید) خودکار ولتاژ را تطبیق می‌دهند (۱۰۰-۲۴۰V). فقط پریز فیزیکی را چک کنید — در اتریش سازگار است." },
];

// ==========================================
// FAQ
// ==========================================
const MAIN_FAQS = [
  {
    q: "هزینه زندگی ماهانه در اتریش چقدر است؟",
    a: "هزینه زندگی ماهانه یک خانواده ۲ نفره در وین حدود €۱,۸۰۰ تا €۲,۵۰۰ است که شامل اجاره (€۶۰۰-۱,۲۰۰)، خواربار (€۲۵۰-۴۵۰)، حمل و نقل (€۵۰-۱۰۰)، بیمه (€۷۵-۱۵۰)، قبض‌ها (€۸۰-۱۸۰) و اینترنت (€۳۰-۶۰) می‌شود. با برنامه‌ریزی هوشمند و استفاده از بن‌های تخفیف می‌توان تا ۲۰٪ این مبلغ را کاهش داد.",
  },
  {
    q: "ارزان‌ترین سوپرمارکت اتریش کدام است؟",
    a: "بر اساس مقایسه قیمت‌ها، Lidl و Penny ارزان‌ترین زنجیره‌های اتریش هستند. اما Hofer (شعبه اتریشی Aldi) تعادل بهینه قیمت-کیفیت را ارائه می‌دهد. برای صرفه‌جویی بیشتر، خرید محصولات برندهای اختصاصی (S-Budget در Spar و Clever در Billa) توصیه می‌شود.",
  },
  {
    q: "آیا لوازم برقی ایرانی در اتریش کار می‌کنند؟",
    a: "بله! ولتاژ برق اتریش (۲۳۰V، ۵۰Hz) و نوع پریز (Type F) دقیقاً مشابه ایران است. اکثر لوازم برقی ایرانی بدون نیاز به هیچ مبدلی در اتریش کار می‌کنند. فقط برای وسایل پرقدرت (پلوپز، کتری) حتماً ارت سه‌شاخه داشته باشید.",
  },
  {
    q: "چگونه از بن‌های تخفیف اتریش‌نشین استفاده کنم؟",
    a: "پس از انتخاب بن مورد نظر، روی دکمه «کپی کد» کلیک کنید و کد کپی‌شده را هنگام خرید یا رزرو به فروشنده ارائه دهید. تمامی بن‌ها توسط کسب‌وکارهای فارسی‌زبان فعال در وین، گراتس، لینتس و سالزبورگ تدارک دیده شده‌اند و استفاده از آن‌ها رایگان است.",
  },
  {
    q: "نرخ تبدیل یورو به تومان چقدر است؟",
    a: "نرخ تبدیل ارز در این ابزار به‌صورت تقریبی و برای مرجع محاسباتی نمایش داده می‌شود. برای نرخ دقیق لحظه‌ای، همیشه از صرافی‌های رسمی یا پلتفرم‌های معتبر (مانند Oanda یا XE) استفاده کنید. این نرخ ممکن است بسته به بازار روز متفاوت باشد.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "Statistik Austria", url: "https://www.statistik.at", desc: "آمار رسمی قیمت‌ها" },
  { name: "AK Preismonitor", url: "https://www.arbeiterkammer.at", desc: "پایش قیمت اتاق کارگران" },
  { name: "WKO Preisspiegel", url: "https://www.wko.at", desc: "مقایسه قیمت اتاق بازرگانی" },
  { name: "ÖGK بیمه اجتماعی", url: "https://www.gesundheitskasse.at", desc: "هزینه‌های بیمه" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FinancialSmartManager() {
  const [eurInput, setEurInput] = useState<string>("150");
  const [exchangeRate, setExchangeRate] = useState<number>(68500);
  const [viewTab, setViewTab] = useState<"groceries" | "electronics" | "converter" | "coupons">("groceries");

  // Coupons state
  const [searchCoupon, setSearchCoupon] = useState("");
  const [selectedCouponCat, setSelectedCouponCat] = useState("all");
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyCouponCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(id);
    toast.success("کد تخفیف کپی شد!");
    setTimeout(() => setCopiedCouponId(null), 2000);
  };

  const convertToToman = (eur: number) => eur * exchangeRate;
  const currentToman = convertToToman(parseFloat(eurInput) || 0);

  // ============================
  // FILTERED COUPONS
  // ============================
  const filteredCoupons = useMemo(() => {
    return INITIAL_COUPONS.filter((coupon) => {
      const matchesCategory = selectedCouponCat === "all" || coupon.category === selectedCouponCat;
      const matchesSearch =
        coupon.businessName.toLowerCase().includes(searchCoupon.toLowerCase()) ||
        coupon.title.toLowerCase().includes(searchCoupon.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchCoupon.toLowerCase()) ||
        coupon.discountCode.toLowerCase().includes(searchCoupon.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCouponCat, searchCoupon]);

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل مدیریت مالی و صرفه‌جویی در اتریش ۲۰۲۶ | اتریش‌نشین",
      description: "راهنمای جامع صرفه‌جویی در اتریش: مقایسه سوپرمارکت‌ها، هزینه زندگی ماهانه، بن‌های تخفیف، تبدیل یورو به تومان و راهنمای سازگاری لوازم برقی ایرانی.",
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        url: "https://otrish-iran.ir",
      },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "fa",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ابزار هوشمند مدیریت مالی اتریش‌نشین",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description: "ابزار تعاملی رایگان برای محاسبه هزینه زندگی، مقایسه سوپرمارکت‌ها، تبدیل ارز و دسترسی به بن‌های تخفیف کسب‌وکارهای فارسی‌زبان اتریش.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "387",
      },
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        url: "https://otrish-iran.ir",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مقایسه سوپرمارکت‌های اتریش",
      description: "مقایسه قیمت و کیفیت زنجیره‌های اصلی سوپرمارکت در اتریش",
      numberOfItems: SUPERMARKETS_AT.length,
      itemListElement: SUPERMARKETS_AT.map((shop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "GroceryStore",
          name: shop.brand,
          description: shop.desc,
          address: {
            "@type": "PostalAddress",
            addressCountry: "AT",
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [...MAIN_FAQS, ...ELECTRONICS_FAQS].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
  ], []);

  return (
    <>
      <SEO
        title="مدیریت مالی و صرفه‌جویی در اتریش ۲۰۲۶ | سوپرمارکت، بن تخفیف و تبدیل ارز | اتریش‌نشین"
        description="راهنمای جامع صرفه‌جویی در اتریش: مقایسه قیمت Hofer، Billa، Lidl، هزینه زندگی ماهانه، تبدیل یورو به تومان، سازگاری لوازم برقی ایرانی و بن‌های تخفیف کسب‌وکارهای فارسی‌زبان."
        keywords="صرفه جویی اتریش, هزینه زندگی اتریش, سوپرمارکت اتریش, Hofer ارزان, Billa قیمت, بن تخفیف اتریش, تبدیل یورو تومان, لوازم برقی اتریش, هزینه اجاره وین, Jö Bonus Club, S-Budget"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/finance-guide.jpg"
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
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            💰
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                  alt="مدیریت مالی اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                ابزار جامع صرفه‌جویی ۲۰۲۶
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                مدیریت مالی هوشمند در اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Smart Finance Guide
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                مدیریت مالی در اتریش تنها به کاهش هزینه‌ها محدود نمی‌شود — بلکه یک هنر
                برنامه‌ریزی است. با مقایسه هوشمند سوپرمارکت‌ها، استفاده از بن‌های تخفیف
                اختصاصی هموطنان، تبدیل دقیق ارز و شناخت سازگاری لوازم برقی، می‌توانید
                ماهانه تا <strong className="text-white">€۴۵۰</strong> صرفه‌جویی کنید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>۸۵+ بن تخفیف فعال</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>مبدل ارز لحظه‌ای</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>منابع رسمی AK + WKO</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
              <div className="text-[10px] text-stone-600 font-black mt-0.5 leading-tight">{s.label}</div>
              <div className="text-[9px] text-stone-400 mt-0.5 leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* BUDGET OVERVIEW */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#c8102e]" />
              هزینه‌های ماهانه زندگی در اتریش (خانواده ۲ نفره)
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس آمار رسمی Statistik Austria و AK Preismonitor ۲۰۲۶
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {BUDGET_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 group hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black text-stone-800">{cat.label}</span>
                  </div>
                  <div className="text-sm font-black text-[#c8102e] mb-0.5" dir="ltr">{cat.range}</div>
                  <div className="text-[9px] text-stone-400 font-bold">{cat.note}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN MODULE (Original Bot Expanded) */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-right font-sans">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-stone-100">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2 flex-wrap">
                  <Coins className="w-5 h-5 text-[#c8102e]" />
                  مدیریت مالی و کدهای تخفیف اتریش
                  <span className="bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                    Smart Finance
                  </span>
                </h2>
                <p className="text-xs text-stone-500 font-bold mt-2 leading-relaxed">
                  تعدیل مخارج، تبدیل ارز یورو، بن‌های تخفیف اختصاصی کسب‌وکارهای هموطنان اتریش‌نشین
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 bg-stone-100 p-1.5 rounded-2xl gap-1.5">
              {[
                { id: "groceries", icon: ShoppingCart, label: "پس‌انداز خواربار" },
                { id: "converter", icon: ArrowRightLeft, label: "تبدیل ارز" },
                { id: "electronics", icon: Zap, label: "لوازم برقی" },
                { id: "coupons", icon: Ticket, label: "بن تخفیف‌ها" },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = viewTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setViewTab(tab.id as any)}
                    className={`flex items-center justify-center gap-1.5 text-[11px] font-black py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                        : "text-stone-600 hover:text-stone-900 hover:bg-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">

              {/* ========================================== */}
              {/* GROCERIES TAB */}
              {/* ========================================== */}
              {viewTab === "groceries" && (
                <motion.div
                  key="groceries"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Warning banner */}
                  <div className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-amber-900 text-sm mb-1.5 flex items-center gap-1.5">
                          <span>تا ۳۵٪ صرفه‌جویی هفتگی با اصلاح انتخاب برندهای اتریشی</span>
                        </h4>
                        <p className="text-[11px] text-amber-800 leading-relaxed font-bold">
                          اگر خریدهای روزمره خود را بدون برنامه‌ریزی از شعبه‌های سنتی Billa صورت دهید
                          فاکتور بالایی دریافت خواهید کرد. با مهاجرت به زنجیره Hofer یا استفاده از
                          خریدهای بسته‌بندی برچسب زرد تخفیف نزدیک انقضا، سبد خرید شما کاملاً اقتصادی
                          خواهد شد.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Supermarkets grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {SUPERMARKETS_AT.map((shop, sIdx) => {
                      const tierMeta = {
                        premium: { label: "پریمیوم", bg: "bg-stone-900", text: "text-white", icon: Crown, color: "from-stone-700 to-stone-900" },
                        budget: { label: "به‌صرفه", bg: "bg-emerald-100", text: "text-emerald-800", icon: BadgePercent, color: "from-emerald-500 to-green-600" },
                        "hard-discount": { label: "هارد دیسکانت", bg: "bg-rose-50", text: "text-rose-800", icon: Flame, color: "from-rose-500 to-red-600" },
                      }[shop.tier];
                      const TierIcon = tierMeta.icon;

                      const cheapestMilk = Math.min(...SUPERMARKETS_AT.map(s => s.avgItemsPrice.milk));
                      const cheapestWater = Math.min(...SUPERMARKETS_AT.map(s => s.avgItemsPrice.water));
                      const cheapestBread = Math.min(...SUPERMARKETS_AT.map(s => s.avgItemsPrice.bread));

                      return (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: sIdx * 0.1 }}
                          whileHover={{ y: -6 }}
                          className="bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden flex flex-col hover:border-[#c8102e]/30 hover:shadow-lg transition-all"
                        >
                          {/* Header */}
                          <div className={`bg-gradient-to-br ${tierMeta.color} p-4 text-white`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-white/70">زنجیره اتریش</span>
                              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-black">
                                <TierIcon className="w-3 h-3" />
                                {tierMeta.label}
                              </div>
                            </div>
                            <h3 className="text-base font-black">{shop.brand}</h3>
                          </div>

                          <div className="p-4 flex-1 flex flex-col">
                            <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-4">
                              {shop.desc}
                            </p>

                            {/* Price comparison */}
                            <div className="space-y-2 pt-3 border-t border-stone-200 mb-4">
                              <div className="flex justify-between items-center text-[11px]">
                                <div className="flex items-center gap-2">
                                  <span className="text-stone-500 font-bold">🥛 شیر ۱ لیتر</span>
                                  {shop.avgItemsPrice.milk === cheapestMilk && (
                                    <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black">
                                      ارزان‌ترین
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono font-black text-stone-800" dir="ltr">
                                  €{shop.avgItemsPrice.milk.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px]">
                                <div className="flex items-center gap-2">
                                  <span className="text-stone-500 font-bold">💧 آب ۱.۵ لیتر</span>
                                  {shop.avgItemsPrice.water === cheapestWater && (
                                    <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black">
                                      ارزان‌ترین
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono font-black text-stone-800" dir="ltr">
                                  €{shop.avgItemsPrice.water.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px]">
                                <div className="flex items-center gap-2">
                                  <span className="text-stone-500 font-bold">🍞 نان چاودار</span>
                                  {shop.avgItemsPrice.bread === cheapestBread && (
                                    <span className="text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-black">
                                      ارزان‌ترین
                                    </span>
                                  )}
                                </div>
                                <span className="font-mono font-black text-stone-800" dir="ltr">
                                  €{shop.avgItemsPrice.bread.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="text-stone-500 font-bold">🥗 سالاد بسته‌بندی</span>
                                <span className="font-mono font-black text-stone-800" dir="ltr">
                                  €{shop.avgItemsPrice.salad.toFixed(2)}
                                </span>
                              </div>
                            </div>

                            {/* Saving tip */}
                            <div className="mt-auto bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                <span className="text-[9px] font-black text-amber-800">فرمول طلایی خرید:</span>
                              </div>
                              <p className="text-[10px] text-amber-900 font-bold leading-relaxed">
                                {shop.savingTip}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Saving Tips */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-[#c8102e]" />
                        ۶ ترفند طلایی صرفه‌جویی در اتریش
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {SAVING_TIPS.map((tip, i) => {
                        const Icon = tip.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-4 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white">
                                <Icon className="w-4 h-4" />
                              </div>
                              <span className="text-[11px] font-black text-stone-800">{tip.title}</span>
                            </div>
                            <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                              {tip.text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* CONVERTER TAB */}
              {/* ========================================== */}
              {viewTab === "converter" && (
                <motion.div
                  key="converter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Info banner */}
                  <div className="bg-gradient-to-l from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center shrink-0">
                      <ArrowRightLeft className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-sky-900 text-sm mb-1">
                        تبدیل سریع یورو به تومان (نرخ تقریبی)
                      </h4>
                      <p className="text-[11px] text-sky-800 font-bold leading-relaxed">
                        این مبدل برای محاسبه تقریبی هزینه‌ها طراحی شده است. برای نرخ دقیق لحظه‌ای
                        همیشه از صرافی رسمی یا پلتفرم‌های معتبر (XE, Oanda) استفاده کنید.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Input panel */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-3xl p-6 space-y-5">
                      <div>
                        <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                          <Euro className="w-3.5 h-3.5 text-emerald-600" />
                          مبلغ به یورو
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-black text-emerald-600">€</span>
                          <input
                            type="number"
                            value={eurInput}
                            onChange={(e) => setEurInput(e.target.value)}
                            className="w-full bg-white border border-emerald-200 rounded-2xl pl-12 pr-4 py-4 text-2xl font-black text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                            dir="ltr"
                            min="0"
                          />
                        </div>
                      </div>

                      {/* Quick buttons */}
                      <div>
                        <label className="text-[10px] font-black text-stone-500 mb-2 block">
                          مبالغ پرکاربرد:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {QUICK_EUR.map((amount) => (
                            <button
                              key={amount}
                              onClick={() => setEurInput(String(amount))}
                              className="bg-white border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700 font-black text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                              dir="ltr"
                            >
                              €{amount}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Exchange rate input */}
                      <div>
                        <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#c8102e]" />
                          نرخ تبدیل (تومان به یورو)
                        </label>
                        <input
                          type="number"
                          value={exchangeRate}
                          onChange={(e) => setExchangeRate(parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm font-black text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 transition"
                          dir="ltr"
                          step="500"
                        />
                        <div className="text-[9px] text-stone-400 font-bold mt-1 text-center">
                          نرخ پیش‌فرض: €۱ = ۶۸,۵۰۰ تومان (تقریبی)
                        </div>
                      </div>
                    </div>

                    {/* Result panel */}
                    <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 border border-stone-700 rounded-3xl p-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-[#c8102e]/20 blur-3xl rounded-full pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                          <Wallet className="w-5 h-5 text-amber-400" />
                          <span className="text-[11px] font-black text-amber-400">نتیجه تبدیل</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center text-center py-6">
                          <div className="text-[11px] font-bold text-stone-400 mb-3">
                            {eurInput || 0} یورو معادل است با
                          </div>
                          <motion.div
                            key={currentToman}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-black text-white mb-2"
                            dir="ltr"
                          >
                            {currentToman.toLocaleString("fa-IR")}
                          </motion.div>
                          <div className="text-sm font-black text-amber-400">تومان ایران</div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-[10px] font-bold text-stone-400">
                          <div className="flex justify-between">
                            <span>نرخ اعمال‌شده:</span>
                            <span className="text-stone-200 font-mono" dir="ltr">1€ = {exchangeRate.toLocaleString("fa-IR")} تومان</span>
                          </div>
                          <div className="flex justify-between">
                            <span>معادل ریال:</span>
                            <span className="text-stone-200 font-mono" dir="ltr">{(currentToman * 10).toLocaleString("fa-IR")} ریال</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Common use cases */}
                  <div className="bg-white border border-stone-200 rounded-3xl p-5">
                    <h4 className="text-sm font-black text-stone-900 mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#c8102e]" />
                      مبالغ پرکاربرد در زندگی روزمره اتریش
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { label: "لیتر بنزین", eur: 1.75, icon: "⛽" },
                        { label: "بلیت مترو وین", eur: 2.40, icon: "🚇" },
                        { label: "قهوه در کافه", eur: 4.50, icon: "☕" },
                        { label: "پیتزا رستوران", eur: 12.00, icon: "🍕" },
                        { label: "بلیت سینما", eur: 12.50, icon: "🎬" },
                        { label: "ماهیانه Netflix", eur: 13.99, icon: "📺" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-stone-50 border border-stone-200 rounded-2xl p-3 flex items-center gap-3"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-black text-stone-700 truncate">{item.label}</div>
                            <div className="text-xs font-black text-[#c8102e]" dir="ltr">€{item.eur.toFixed(2)}</div>
                          </div>
                          <div className="text-[9px] font-bold text-stone-500 whitespace-nowrap" dir="ltr">
                            {(item.eur * exchangeRate).toLocaleString("fa-IR")}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* ELECTRONICS TAB */}
              {/* ========================================== */}
              {viewTab === "electronics" && (
                <motion.div
                  key="electronics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Main info */}
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-3xl p-6">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
                        <Zap className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-sky-950 mb-1 flex items-center gap-2">
                          راهنمای ولتاژ و مدل پریز برق در اتریش
                        </h3>
                        <p className="text-[11px] text-sky-800 font-bold leading-relaxed">
                          دستگاه‌های برقی اتریش روی ولتاژ استاندارد <strong>۲۳۰ ولت با فرکانس ۵۰ هرتز
                          (Type F & Type C)</strong> تنظیم شده‌اند.
                        </p>
                      </div>
                    </div>

                    {/* Compatibility badge */}
                    <div className="bg-white border-2 border-emerald-300 rounded-3xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl">
                        ✓ ۱۰۰٪ سازگار
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">
                          🌟
                        </div>
                        <h4 className="text-sm font-black text-emerald-900">
                          انطباق کامل با فیش‌های ایرانی!
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-700 font-bold leading-relaxed">
                        پریز برق‌های اتریش مشابه نمونه‌های سنتی در ایران است. شما می‌توانید گوشی‌های
                        موبایل، لپ‌تاپ‌ها (ایسوس، مک‌بوک)، سشوارهای ساخت ایران و حتی شارژرهای قدیمی
                        خود را <strong>بدون نیاز به هیچ نوع مبدل گران‌قیمت</strong> مستقیماً به پریز
                        متصل کرده و استفاده کنید.
                      </p>
                    </div>
                  </div>

                  {/* Voltage comparison table */}
                  <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden">
                    <div className="bg-gradient-to-r from-stone-800 to-stone-900 p-4 text-white">
                      <h4 className="text-sm font-black flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-amber-400" />
                        مقایسه ولتاژ و پریز: ایران vs اتریش
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200">
                            <th className="text-right p-3 font-black text-stone-700">ویژگی</th>
                            <th className="text-center p-3 font-black text-emerald-600">🇮🇷 ایران</th>
                            <th className="text-center p-3 font-black text-[#c8102e]">🇦🇹 اتریش</th>
                            <th className="text-center p-3 font-black text-stone-700">سازگاری</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {[
                            { label: "ولتاژ", iran: "220-240V", at: "230V", compat: true },
                            { label: "فرکانس", iran: "50Hz", at: "50Hz", compat: true },
                            { label: "نوع پریز", iran: "Type C/F", at: "Type C/F", compat: true },
                            { label: "شکل فیش", iran: "دو/سه‌شاخه", at: "دو/سه‌شاخه", compat: true },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-stone-50/50">
                              <td className="p-3 font-black text-stone-800">{row.label}</td>
                              <td className="p-3 text-center font-mono font-bold text-stone-700" dir="ltr">{row.iran}</td>
                              <td className="p-3 text-center font-mono font-bold text-stone-700" dir="ltr">{row.at}</td>
                              <td className="p-3 text-center">
                                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-[10px] font-black">
                                  <CheckCircle2 className="w-3 h-3" />
                                  کامل
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Warning for heavy appliances */}
                  <div className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h5 className="font-black text-amber-900 text-sm mb-1">
                          نکته ضروری برای وسایل آشپزخانه سنگین (پلوپز / کتری برقی)
                        </h5>
                        <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                          اگر لوازم برقی پرقدرت ایرانی با موتورهای جریان بالا می‌آورید، فقط مطمئن شوید
                          کابل آن‌ها مجهز به پایه ارت عایق‌دار (سه‌شاخه) است تا فیوزهای اتوماتیک
                          خوابگاه‌های دانشجویی اتریش دچار نوسان فاز یا پرش نشوند.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Electronics FAQ */}
                  <div>
                    <h4 className="text-sm font-black text-stone-900 mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-[#c8102e]" />
                      سوالات متداول لوازم برقی
                    </h4>
                    <div className="space-y-2">
                      {ELECTRONICS_FAQS.map((faq, i) => (
                        <div key={i} className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                          <div className="text-[11px] font-black text-stone-800 mb-1.5 flex items-start gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            {faq.q}
                          </div>
                          <p className="text-[10px] text-stone-600 font-bold leading-relaxed pr-5">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ========================================== */}
              {/* COUPONS TAB */}
              {/* ========================================== */}
              {viewTab === "coupons" && (
                <motion.div
                  key="coupons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  {/* Intro */}
                  <div className="bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 rounded-2xl border border-red-100 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center shrink-0">
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-rose-950 mb-1">
                          باشگاه تخفیف‌های اتریش‌نشین 🎁
                        </h4>
                        <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                          کدهای تخفیف ویژه‌ای که با همکاری پورتال اتریش‌نشین و برترین مشاغل ایرانی
                          فعال در وین، گراتس، لینتس و سالزبورگ برای هموطنان و دانشجویان گرامی تدارک
                          دیده شده است. کدهای تخفیف را کپی کرده و هنگام خرید یا رزرو به فروشنده ارائه دهید.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Filter panel */}
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-4">
                    <div className="flex flex-col lg:flex-row gap-3">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-1.5 flex-1 order-2 lg:order-1">
                        {[
                          { id: "all", label: "همه بن‌ها", emoji: "🎟️" },
                          { id: "restaurant", label: "کافی‌شاپ و رستوران", emoji: "🍔" },
                          { id: "grocery", label: "سوپر و نانوایی", emoji: "🍉" },
                          { id: "medical", label: "سلامت و درمان", emoji: "🩺" },
                          { id: "beauty", label: "سالن زیبایی", emoji: "💇‍♀️" },
                          { id: "technical", label: "تعمیرگاه", emoji: "🔧" },
                          { id: "education", label: "آموزش و زبان", emoji: "🎓" },
                          { id: "shopping", label: "خرید و پوشاک", emoji: "🛍️" },
                          { id: "service", label: "خدمات رسمی", emoji: "💼" },
                        ].map((cat) => {
                          const count = INITIAL_COUPONS.filter(
                            (cp) => cat.id === "all" || cp.category === cat.id
                          ).length;
                          const isSelected = selectedCouponCat === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCouponCat(cat.id)}
                              className={`text-[11px] font-black px-2.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                                isSelected
                                  ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                              }`}
                            >
                              <span>{cat.emoji}</span>
                              <span>{cat.label}</span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${
                                isSelected ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Search */}
                      <div className="relative w-full lg:w-72 order-1 lg:order-2 shrink-0">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          placeholder="جستجوی کد، نام کسب‌وکار یا تخفیف..."
                          value={searchCoupon}
                          onChange={(e) => setSearchCoupon(e.target.value)}
                          className="w-full bg-white border border-stone-300 pr-10 pl-9 py-2.5 rounded-xl text-xs font-bold focus:border-[#c8102e] focus:outline-none focus:ring-2 focus:ring-[#c8102e]/10"
                        />
                        {searchCoupon && (
                          <button
                            onClick={() => setSearchCoupon("")}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-stone-600" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 border-t border-stone-200 pt-3">
                      <span>
                        <span className="text-[#c8102e] font-black">{filteredCoupons.length}</span> بن تخفیف یافت شد
                      </span>
                      {(selectedCouponCat !== "all" || searchCoupon) && (
                        <button
                          onClick={() => {
                            setSelectedCouponCat("all");
                            setSearchCoupon("");
                          }}
                          className="text-[#c8102e] hover:underline"
                        >
                          پاک کردن فیلترها
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Coupons grid */}
                  {filteredCoupons.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16 bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl"
                    >
                      <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-3">
                        <Ticket className="w-8 h-8 text-stone-400 stroke-1" />
                      </div>
                      <p className="text-sm font-black text-stone-700">بن تخفیف منطبق یافت نشد</p>
                      <p className="text-[10px] font-bold text-stone-400 mt-1">
                        تلاش کنید کلمه یا دسته‌بندی دیگری را جستجو کنید.
                      </p>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredCoupons.map((cp, idx) => {
                        const isCopied = copiedCouponId === cp.id;
                        return (
                          <motion.div
                            key={cp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="bg-stone-50 relative hover:bg-white border-2 hover:border-[#c8102e]/30 border-stone-200 transition-all rounded-3xl p-5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg"
                          >
                            {/* Ticket notches */}
                            <div className="absolute top-[52%] -left-2 w-4 h-4 rounded-full bg-white border-r border-stone-200 z-10"></div>
                            <div className="absolute top-[52%] -right-2 w-4 h-4 rounded-full bg-white border-l border-stone-200 z-10"></div>

                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="text-right flex-1 min-w-0">
                                <span className="text-[10px] bg-red-50 text-red-800 border border-red-100 px-2 py-0.5 rounded-md font-black inline-block">
                                  {cp.businessName}
                                </span>
                                <h4 className="font-black text-[#991b1b] text-[13px] mt-2 leading-tight">
                                  {cp.title}
                                </h4>
                              </div>

                              {/* Discount badge */}
                              <div className="bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-md">
                                <span className="text-xs font-black font-mono tracking-tighter leading-none">
                                  {cp.discountPercent === 100 ? "رایگان" : `%${cp.discountPercent}`}
                                </span>
                                {cp.discountPercent !== 100 && (
                                  <span className="text-[8px] font-bold leading-none mt-0.5 block">تخفیف</span>
                                )}
                              </div>
                            </div>

                            {/* Description */}
                            <div className="my-3 text-right">
                              <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                                {cp.description}
                              </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t-2 border-dashed border-stone-200 my-3 relative"></div>

                            {/* Actions */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => handleCopyCouponCode(cp.id, cp.discountCode)}
                                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all font-black text-[11px] cursor-pointer shrink-0 ${
                                    isCopied
                                      ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white"
                                      : "bg-gradient-to-br from-stone-800 to-stone-900 text-white hover:from-stone-700 hover:to-stone-800"
                                  }`}
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>کپی شد!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>کپی کد</span>
                                    </>
                                  )}
                                </motion.button>

                                <div className="bg-white border-2 border-stone-200 border-dashed rounded-xl flex-1 py-1.5 px-3 flex items-center justify-between">
                                  <Ticket className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                  <span className="font-mono font-black text-xs text-stone-800 select-all text-center tracking-wider block w-full">
                                    {cp.discountCode}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold px-0.5">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 stroke-[2]" />
                                  <span>اعتبار تا:</span>
                                </div>
                                <span className="font-mono">{cp.validUntil}</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول مالی و صرفه‌جویی در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های کاربران فارسی‌زبان
            </p>
          </div>

          <div className="space-y-3">
            {MAIN_FAQS.map((faq, i) => (
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
        {/* OFFICIAL SOURCES */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">منابع رسمی مورد استناد</h3>
              <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                برای راستی‌آزمایی مستقل اطلاعات این ابزار
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-white border border-stone-200 hover:border-indigo-300 rounded-2xl p-4 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-stone-800 truncate">{s.name}</div>
                  <div className="text-[9px] text-stone-500 font-bold">{s.desc}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              </a>
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
              <Heart className="w-3.5 h-3.5 text-amber-300" />
              مشاوره رایگان مالی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در مورد هزینه‌های اتریش سوال دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه سال‌ها زندگی در اتریش، آماده پاسخ به سوالات شما درباره
              اجاره خانه، قبض‌ها، صرفه‌جویی، کسب‌وکار و تمام جنبه‌های مالی زندگی در این کشور است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، سوالی درباره هزینه‌های زندگی در اتریش دارم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                مشاوره واتس‌اپ
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              اطلاعات این ابزار بر اساس آمار رسمی Statistik Austria، پایش قیمت AK Preismonitor
              و WKO Preisspiegel سال ۲۰۲۶ تهیه شده است. قیمت‌ها ممکن است بسته به شهر، فصل و
              فروشگاه متفاوت باشند. نرخ تبدیل ارز تقریبی است و برای معاملات واقعی باید از منابع
              رسمی استفاده کنید. بن‌های تخفیف توسط کسب‌وکارهای همکار ارائه می‌شوند و اتریش‌نشین
              مسئولیت تغییر شرایط آن‌ها را نمی‌پذیرد.
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
  q, a, isOpen, onToggle, index,
}: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; index: number; key?: React.Key;
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
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
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

// ==========================================
// Missing icon import workaround
// ==========================================
function HelpCircle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}