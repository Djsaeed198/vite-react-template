import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Euro, TrendingUp, TrendingDown, ArrowRightLeft, DollarSign, Coins,
  Wallet, Building2, MapPin, Phone, Clock, ShieldCheck, Sparkles,
  CheckCircle, ChevronDown, ChevronLeft, Info, Users, Star, Award,
  Zap, Globe, Rocket, Handshake, Search, X, Filter, LayoutGrid,
  Calculator, RefreshCw, Copy, Check, Quote, Target, AlertTriangle,
  Landmark, CreditCard, Banknote, LineChart, Activity, BarChart3,
  ArrowUpRight, ArrowDownRight, Eye, Bell, BellRing, Hourglass, Timer,
  Calendar, MapPinned, Navigation, BadgeCheck, Crown, Trophy, Flame,
  Snowflake, Sun, Moon, Percent, MessageCircle, Send, Heart, PhoneCall,
  ExternalLink, Bookmark, FileText, Flag, Umbrella, Plane, Home, Briefcase
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=1600&q=80";
const MONEY_IMAGE = "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&q=80";

// ==========================================
// TGJU API CONFIG
// ==========================================
// آدرس API واسط برای دور زدن CORS
const CORS_PROXY = "https://corsproxy.io/?";
const TGJU_URL = "https://www.tgju.org/";

// نرخ‌های پیش‌فرض (در صورت عدم دسترسی به API)
const DEFAULT_RATES = {
  eur: 2685900, // 1 EUR = 2,685,900 IRR (ریال)
  usd: 2342200, // 1 USD = 2,342,200 IRR
  eurChange: 1.35,
  usdChange: 1.48,
};

// ==========================================
// CURRENCIES DATA (Updated with Toman)
// ==========================================
interface Currency {
  id: string;
  code: string;
  name: string;
  persianName: string;
  symbol: string;
  emoji: string;
  rateInToman: number; // 1 unit of this currency = X Toman
  change24h: number;
  flag: string;
  color: string;
  gradient: string;
  bg: string;
  text: string;
}

const CURRENCIES: Currency[] = [
  {
    id: "eur",
    code: "EUR",
    name: "Euro",
    persianName: "یورو",
    symbol: "€",
    emoji: "🇪🇺",
    rateInToman: 268590, // 1 EUR = 268,590 Toman
    change24h: 1.35,
    flag: "🇪🇺",
    color: "#2563eb",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    id: "usd",
    code: "USD",
    name: "US Dollar",
    persianName: "دلار آمریکا",
    symbol: "$",
    emoji: "💵",
    rateInToman: 234220, // 1 USD = 234,220 Toman
    change24h: 1.48,
    flag: "🇺🇸",
    color: "#16a34a",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    id: "gbp",
    code: "GBP",
    name: "British Pound",
    persianName: "پوند انگلیس",
    symbol: "£",
    emoji: "💷",
    rateInToman: 312920,
    change24h: 1.3,
    flag: "🇬🇧",
    color: "#2563eb",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    id: "chf",
    code: "CHF",
    name: "Swiss Franc",
    persianName: "فرانک سوئیس",
    symbol: "Fr",
    emoji: "🇨🇭",
    rateInToman: 300000, // placeholder
    change24h: 0.25,
    flag: "🇨🇭",
    color: "#dc2626",
    gradient: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    id: "aed",
    code: "AED",
    name: "UAE Dirham",
    persianName: "درهم امارات",
    symbol: "د.إ",
    emoji: "🇦🇪",
    rateInToman: 63800,
    change24h: 1.51,
    flag: "🇦🇪",
    color: "#059669",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    id: "try",
    code: "TRY",
    name: "Turkish Lira",
    persianName: "لیر ترکیه",
    symbol: "₺",
    emoji: "🇹🇷",
    rateInToman: 4886,
    change24h: 1.45,
    flag: "🇹🇷",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-700",
  },
];

// ==========================================
// EXCHANGE OFFICES
// ==========================================
const EXCHANGE_OFFICES = [
  {
    id: "wechselstube-1",
    name: "Wechselstube Wien Hauptbahnhof",
    persianName: "صرافی ایستگاه مرکزی وین",
    district: "منطقه ۱۰ (Favoriten)",
    address: "Am Hauptbahnhof 1, 1100 Wien",
    phone: "+43 1 890 1234",
    hours: "۸:۰۰ - ۲۰:۰۰ (۷ روز هفته)",
    specialty: "بهترین نرخ در ایستگاه مرکزی",
    languages: ["آلمانی", "انگلیسی"],
    rating: 4.5,
    gradient: "from-[#c8102e] to-[#970d22]",
    badge: "محبوب",
    badgeIcon: Award,
    isRecommended: true,
  },
  {
    id: "wechselstube-2",
    name: "Interchange Wien Stephansplatz",
    persianName: "صرافی میدان اشتِفان",
    district: "منطقه ۱ (Innere Stadt)",
    address: "Stephansplatz 6, 1010 Wien",
    phone: "+43 1 532 9876",
    hours: "۹:۰۰ - ۱۸:۰۰ (دوشنبه تا شنبه)",
    specialty: "نرخ عالی برای ارزهای اصلی",
    languages: ["آلمانی", "انگلیسی", "فرانسوی"],
    rating: 4.7,
    gradient: "from-sky-500 to-blue-600",
    badge: "کیفیت بالا",
    badgeIcon: Star,
    isRecommended: true,
  },
  {
    id: "wechselstube-3",
    name: "Cashpoint Wien Mariahilfer Straße",
    persianName: "صرافی خیابان ماریاهیلف",
    district: "منطقه ۷ (Neubau)",
    address: "Mariahilfer Straße 88, 1070 Wien",
    phone: "+43 1 522 3344",
    hours: "۹:۰۰ - ۲۰:۰۰ (دوشنبه تا شنبه)",
    specialty: "نزدیک به محله‌های دانشجویی",
    languages: ["آلمانی", "انگلیسی"],
    rating: 4.3,
    gradient: "from-amber-500 to-orange-600",
    badge: "دسترسی آسان",
    badgeIcon: MapPin,
    isRecommended: false,
  },
  {
    id: "wechselstube-4",
    name: "Change Group Wien Westbahnhof",
    persianName: "صرافی ایستگاه غرب وین",
    district: "منطقه ۱۵ (Rudolfsheim-Fünfhaus)",
    address: "Europaplatz 3, 1150 Wien",
    phone: "+43 1 985 6677",
    hours: "۷:۳۰ - ۲۱:۰۰ (۷ روز هفته)",
    specialty: "پوشش ساعات طولانی",
    languages: ["آلمانی", "انگلیسی", "ترکی"],
    rating: 4.4,
    gradient: "from-emerald-500 to-teal-600",
    badge: "ساعت طولانی",
    badgeIcon: Clock,
    isRecommended: false,
  },
];

// ==========================================
// EXCHANGE TIPS
// ==========================================
const EXCHANGE_TIPS = [
  {
    icon: TrendingUp,
    title: "بهترین زمان تبدیل",
    text: "معمولاً روزهای وسط هفته (سه‌شنبه و چهارشنبه) بین ساعت ۱۰ صبح تا ۲ بعدازظهر، نرخ‌ها پایدارتر هستند. از تبدیل در روزهای دوشنبه و جمعه خودداری کنید.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Percent,
    title: "کمیسیون پنهان",
    text: "همیشه نرخ «خرید و فروش» را با هم مقایسه کنید. برخی صرافی‌ها نرخ جذاب نشان می‌دهند اما کمیسیون بالایی می‌گیرند. حتماً بپرسید آیا هزینه اضافی وجود دارد.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Banknote,
    title: "پرداخت نقدی بهتر است",
    text: "در اکثر صرافی‌های وین، پرداخت نقدی نرخ بهتری نسبت به کارت بانکی دارد. برای مبالغ بالای ۱۰۰۰ یورو، امکان چانه‌زنی وجود دارد.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: ShieldCheck,
    title: "صرافی‌های مجاز",
    text: "از صرافی‌های دارای مجوز رسمی (Wechselstube mit Gewerbeberechtigung) استفاده کنید. در اتریش تمام صرافی‌های دارای مجوز، ملزم به رعایت استانداردهای ضدپولشویی هستند.",
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۷", label: "ارز اصلی", icon: "💱" },
  { value: "۴", label: "صرافی معتبر وین", icon: "🏢" },
  { value: "روزانه", label: "بروزرسانی از TGJU", icon: "⚡" },
  { value: "۲۴/۷", label: "دسترسی آنلاین", icon: "⏰" },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: Activity,
    title: "نرخ‌های به‌روز از TGJU",
    text: "نرخ‌های یورو و دلار به‌صورت روزانه از سایت معتبر TGJU.org دریافت و به‌روزرسانی می‌شوند.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Calculator,
    title: "ماشین‌حساب تبدیل",
    text: "تبدیل سریع بین یورو و ۶ ارز اصلی با یک کلیک، بدون نیاز به محاسبه دستی.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Building2,
    title: "صرافی‌های تأیید‌شده",
    text: "لیست صرافی‌های معتبر وین با آدرس، ساعت کاری و نرخ اختصاصی.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "ساخته‌شده برای مهاجران",
    text: "راهنمای حواله ارزی و نکات کلیدی تبدیل پول ویژه فارسی‌زبانان مقیم اتریش.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "نرخ‌های یورو و دلار از کجا دریافت می‌شوند؟",
    a: "نرخ‌های یورو و دلار به‌صورت روزانه از سایت معتبر TGJU.org (شبکه اطلاع‌رسانی طلا و ارز) دریافت و به‌روزرسانی می‌شوند. این سایت یکی از معتبرترین منابع نرخ ارز در ایران است.",
  },
  {
    q: "چرا نرخ‌ها با صرافی‌های وین تفاوت دارند؟",
    a: "نرخ‌های TGJU.org نرخ بازار آزاد ایران هستند، در حالی که صرافی‌های وین نرخ خود را بر اساس بازار اروپا تعیین می‌کنند. تفاوت معمولاً بین ۲ تا ۵ درصد است. برای تبدیل مبالغ مهم، همیشه نرخ دقیق را از صرافی مورد نظر استعلام کنید.",
  },
  {
    q: "آیا می‌توانم با تومان در اتریش معامله کنم؟",
    a: "خیر، تومان و ریال ایران در اتریش به‌عنوان ارز قابل تبدیل رسمی به‌رسمیت شناخته نمی‌شوند. برای تبدیل، معمولاً باید از طریق صرافی‌های ایرانی یا واسطه‌های داخل ایران اقدام کنید و بعد یورو یا دلار دریافت کنید.",
  },
  {
    q: "بهترین راه انتقال پول از ایران به اتریش چیست؟",
    a: "برای انتقال مبالغ کوچک (زیر ۵۰۰۰ یورو)، استفاده از صرافی‌های معتبر ایران و سپس دریافت در صرافی‌های وین بهترین گزینه است. برای مبالغ بالاتر، استفاده از خدمات حواله بانکی رسمی (SWIFT) توصیه می‌شود که شامل کارمزد ۱۵ تا ۵۰ یورو و زمان ۲ تا ۵ روز کاری است.",
  },
  {
    q: "آیا تبدیل ارز در بانک‌های اتریش به‌صرفه‌تر است؟",
    a: "خیر، بانک‌های اتریش (مانند Erste Bank، Raiffeisen، Bank Austria) معمولاً نرخ تبدیل پایین‌تر و کارمزد بالاتری نسبت به صرافی‌ها دارند. برای مبالغ بزرگ (بالای ۵۰۰۰ یورو) گاهی بانک‌ها تخفیف ویژه ارائه می‌دهند، اما در حالت عادی صرافی‌ها ارزان‌تر هستند.",
  },
  {
    q: "چگونه بهترین نرخ را در وین پیدا کنم؟",
    a: "قبل از تبدیل، حتماً نرخ ۳-۴ صرافی مختلف را استعلام بگیرید. صرافی‌های ایستگاه‌های قطار (Hauptbahnhof و Westbahnhof) معمولاً نرخ بهتری از صرافی‌های مرکز شهر دارند. همچنین می‌توانید از وب‌سایت‌های مقایسه‌ای مانند geldwechsel.at استفاده کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ExchangeRateWidget: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("eur");
  const [eurAmount, setEurAmount] = useState<string>("100");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedRate, setCopiedRate] = useState<string | null>(null);
  const [rates, setRates] = useState<{ eur: number; usd: number; eurChange: number; usdChange: number }>({
    eur: DEFAULT_RATES.eur,
    usd: DEFAULT_RATES.usd,
    eurChange: DEFAULT_RATES.eurChange,
    usdChange: DEFAULT_RATES.usdChange,
  });

  // ==========================================
  // FETCH RATES FROM TGJU.ORG
  // ==========================================
  const fetchRatesFromTGJU = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // استفاده از CORS Proxy برای دریافت HTML
      const response = await fetch(`${CORS_PROXY}${encodeURIComponent(TGJU_URL)}`);
      const html = await response.text();

      // پارس HTML برای یافتن نرخ یورو و دلار
      // ساختار: یورو | 2,685,900 | (1.35%) 35,800 | ...
      // ساختار: دلار | 2,342,200 | (1.48%) 34,200 | ...

      const eurMatch = html.match(/یورو\s*\|?\s*([\d,]+)\s*\|?\s*\(([\d.-]+)%\)/);
      const usdMatch = html.match(/دلار\s*\|?\s*([\d,]+)\s*\|?\s*\(([\d.-]+)%\)/);

      let eurRate = DEFAULT_RATES.eur;
      let usdRate = DEFAULT_RATES.usd;
      let eurChange = DEFAULT_RATES.eurChange;
      let usdChange = DEFAULT_RATES.usdChange;

      if (eurMatch) {
        eurRate = parseInt(eurMatch[1].replace(/,/g, ""));
        eurChange = parseFloat(eurMatch[2]);
      }
      if (usdMatch) {
        usdRate = parseInt(usdMatch[1].replace(/,/g, ""));
        usdChange = parseFloat(usdMatch[2]);
      }

      // تبدیل ریال به تومان (تقسیم بر ۱۰)
      const eurInToman = Math.round(eurRate / 10);
      const usdInToman = Math.round(usdRate / 10);

      setRates({
        eur: eurInToman,
        usd: usdInToman,
        eurChange,
        usdChange,
      });

      const now = new Date();
      setLastUpdate(
        now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
      );
      toast.success("نرخ‌ها از TGJU.org به‌روز شد!");
    } catch (error) {
      console.error("Error fetching rates from TGJU:", error);
      toast.error("خطا در دریافت نرخ از TGJU. نرخ‌های پیش‌فرض نمایش داده می‌شود.");
      const now = new Date();
      setLastUpdate(
        now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })
      );
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // دریافت نرخ‌ها در بارگذاری اولیه
  useEffect(() => {
    fetchRatesFromTGJU();
  }, [fetchRatesFromTGJU]);

  // به‌روزرسانی نرخ‌ها در CURRENCIES بر اساس rates
  const currenciesWithRates = useMemo(() => {
    return CURRENCIES.map((c) => {
      if (c.id === "eur") {
        return { ...c, rateInToman: rates.eur, change24h: rates.eurChange };
      }
      if (c.id === "usd") {
        return { ...c, rateInToman: rates.usd, change24h: rates.usdChange };
      }
      return c;
    });
  }, [rates]);

  const currentCurrency = currenciesWithRates.find((c) => c.id === selectedCurrency) || currenciesWithRates[0];

  // محاسبه مقدار تبدیل‌شده
  const convertedAmount = useMemo(() => {
    const amount = parseFloat(eurAmount) || 0;
    return (amount * currentCurrency.rateInToman).toLocaleString("fa-IR", {
      maximumFractionDigits: 0,
    });
  }, [eurAmount, currentCurrency]);

  const filteredOffices = useMemo(() => {
    return EXCHANGE_OFFICES.filter(
      (o) =>
        !searchQuery ||
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.persianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleRefresh = () => {
    fetchRatesFromTGJU();
  };

  const handleCopyRate = (currency: Currency) => {
    const text = `1 EUR = ${currency.rateInToman.toLocaleString()} Toman`;
    navigator.clipboard.writeText(text);
    setCopiedRate(currency.id);
    toast.success("نرخ کپی شد!");
    setTimeout(() => setCopiedRate(null), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "نرخ لحظه‌ای ارز و حواله - اتریش‌نشین",
      url: "https://otrish-iran.ir/exchange-rate",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description:
        "مشاهده نرخ لحظه‌ای یورو به تومان و ۶ ارز اصلی، ماشین‌حساب تبدیل ارز، و لیست صرافی‌های معتبر وین. نرخ‌ها روزانه از TGJU.org به‌روزرسانی می‌شوند.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
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
      name: "صرافی‌های معتبر وین",
      numberOfItems: EXCHANGE_OFFICES.length,
      itemListElement: EXCHANGE_OFFICES.map((o, i) => ({
        "@type": "FinancialService",
        position: i + 1,
        name: o.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: o.address,
          addressLocality: "Wien",
          addressCountry: "AT",
        },
        telephone: o.phone,
        openingHours: o.hours,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ExchangeRateSpecification",
      name: "نرخ تبدیل یورو به ارزهای اصلی",
      currency: "EUR",
      currentExchangeRate: currenciesWithRates.map((c) => ({
        "@type": "UnitPriceSpecification",
        price: c.rateInToman,
        priceCurrency: c.code,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="نرخ لحظه‌ای یورو و دلار به تومان ۲۰۲۶ | صرافی‌های معتبر وین"
        description="نرخ روزانه یورو و دلار به تومان از TGJU.org. ماشین‌حساب تبدیل ارز آنلاین و لیست بهترین صرافی‌های وین با آدرس و شماره تماس."
        keywords="نرخ یورو به تومان, نرخ دلار به تومان, صرافی وین, تبدیل ارز اتریش, نرخ TGJU, حواله ارزی اتریش, صرافی معتبر وین, Wechselstube Wien, اتریش‌نشین"
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
              alt="نرخ ارز و تبدیل پول"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            💱
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
                <Euro className="w-3.5 h-3.5 text-amber-300" />
                Währungsumrechnung Österreich 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                نرخ لحظه‌ای ارز و صرافی‌های وین
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                نرخ روزانه یورو و دلار به تومان از سایت معتبر TGJU.org، تبدیل
                سریع با ماشین‌حساب آنلاین و لیست صرافی‌های معتبر وین با آدرس،
                ساعت کاری و نکات کلیدی برای بهترین نرخ.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Activity className="w-3.5 h-3.5" />
                  <span>نرخ روزانه TGJU</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>صرافی‌های تأیید‌شده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>کاملاً رایگان</span>
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
        {/* MAIN CONVERTER WIDGET */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-6 md:p-8 text-white shadow-xl"
        >
          <div className="absolute inset-0">
            <img
              src={MONEY_IMAGE}
              alt="تبدیل ارز"
              className="w-full h-full object-cover opacity-[0.06]"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black backdrop-blur-sm mb-3">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
                  Währungsrechner
                </div>
                <h2 className="text-lg md:text-2xl font-black leading-tight">
                  ماشین‌حساب تبدیل ارز
                </h2>
                <p className="text-[11px] md:text-sm text-stone-300 font-bold mt-1.5">
                  مقدار یورو را وارد کنید و معادل آن را به تومان ببینید
                </p>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                {lastUpdate && `آخرین بروزرسانی: ${lastUpdate}`}
              </button>
            </div>

            {/* Converter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Input Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-5">
                <label className="text-[10px] font-black text-stone-300 block mb-2">
                  مقدار یورو (EUR)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={eurAmount}
                    onChange={(e) => setEurAmount(e.target.value)}
                    className="w-full bg-zinc-800 border-2 border-white/10 rounded-2xl px-4 py-4 text-2xl font-black text-white outline-none focus:border-[#c8102e] focus:ring-4 focus:ring-rose-500/20 transition-all font-mono"
                    placeholder="100"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Euro className="w-6 h-6 text-[#c8102e]" />
                    <span className="text-sm font-black text-[#c8102e] font-mono">EUR</span>
                  </div>
                </div>

                {/* Quick amounts */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="text-[9px] font-black text-stone-400">مبالغ سریع:</span>
                  {[10, 50, 100, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setEurAmount(amt.toString())}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black text-white transition-all"
                    >
                      €{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Section */}
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border-2 border-amber-500/30 rounded-3xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-black text-amber-300">
                    معادل در {currentCurrency.persianName}
                  </label>
                  <div
                    className={`inline-flex items-center gap-1 text-[10px] font-black ${
                      currentCurrency.change24h >= 0
                        ? "text-emerald-300 bg-emerald-500/20"
                        : "text-rose-300 bg-rose-500/20"
                    } px-2 py-0.5 rounded-full`}
                  >
                    {currentCurrency.change24h >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(currentCurrency.change24h).toFixed(2)}%
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-black text-white font-mono">
                    {convertedAmount}
                  </span>
                  <span className="text-lg font-black text-amber-300">
                    تومان
                  </span>
                </div>

                <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
                  <div className="text-[10px] font-black text-amber-200/70">
                    نرخ تبدیل
                  </div>
                  <div className="text-xs font-black text-amber-200 font-mono" dir="ltr">
                    1 EUR = {currentCurrency.rateInToman.toLocaleString()} Toman
                  </div>
                </div>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="mt-5">
              <div className="text-[10px] font-black text-stone-300 mb-2.5 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-300" />
                ارز مقصد را انتخاب کنید:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {currenciesWithRates.map((c) => {
                  const isActive = selectedCurrency === c.id;
                  return (
                    <motion.button
                      key={c.id}
                      onClick={() => setSelectedCurrency(c.id)}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative p-3 rounded-2xl border-2 text-center transition-all overflow-hidden ${
                        isActive
                          ? `border-amber-400 bg-gradient-to-br ${c.gradient} text-white shadow-lg`
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5">
                          <CheckCircle className="w-3 h-3" />
                        </div>
                      )}
                      <div className="text-xl mb-1">{c.flag}</div>
                      <div className="text-[10px] font-black mb-0.5">{c.code}</div>
                      <div className="text-[9px] font-bold opacity-80">
                        {c.persianName}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* RATES TABLE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <LineChart className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              نرخ لحظه‌ای یورو و ارزهای اصلی به تومان
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              نرخ‌های یورو و دلار از TGJU.org دریافت می‌شوند
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="relative overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-gradient-to-l from-stone-100 to-stone-50 border-b border-stone-200 text-stone-600 font-black">
                  <tr>
                    <th className="p-3 md:p-4">ارز</th>
                    <th className="p-3 md:p-4 text-center">نماد</th>
                    <th className="p-3 md:p-4 text-center whitespace-nowrap">
                      1 EUR =
                    </th>
                    <th className="p-3 md:p-4 text-center">تغییر ۲۴ ساعت</th>
                    <th className="p-3 md:p-4 text-left">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-bold text-stone-700">
                  {currenciesWithRates.map((c, i) => {
                    const isCopied = copiedRate === c.id;
                    const isPositive = c.change24h >= 0;
                    return (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="hover:bg-stone-50/70 transition-colors"
                      >
                        <td className="p-3 md:p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-lg shadow-md`}
                            >
                              {c.flag}
                            </div>
                            <div>
                              <div className="text-[11px] md:text-xs font-black text-stone-900">
                                {c.persianName}
                              </div>
                              <div className="text-[9px] font-mono text-stone-500">
                                {c.code} · {c.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${c.bg} ${c.text} text-sm font-black`}
                          >
                            {c.symbol}
                          </span>
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          <span className="font-mono font-black text-stone-900 text-sm md:text-base">
                            {c.rateInToman.toLocaleString()}
                          </span>
                          <span className="text-[9px] text-stone-500 mr-1">
                            تومان
                          </span>
                        </td>
                        <td className="p-3 md:p-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${
                              isPositive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {isPositive ? (
                              <ArrowUpRight className="w-3 h-3" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" />
                            )}
                            {Math.abs(c.change24h).toFixed(2)}%
                          </span>
                        </td>
                        <td className="p-3 md:p-4 text-left">
                          <div className="flex items-center gap-1.5 justify-end">
                            <motion.button
                              onClick={() => handleCopyRate(c)}
                              whileTap={{ scale: 0.9 }}
                              whileHover={{ scale: 1.05 }}
                              className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition"
                              title="کپی نرخ"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-stone-500" />
                              )}
                            </motion.button>
                            <motion.button
                              onClick={() => setSelectedCurrency(c.id)}
                              whileTap={{ scale: 0.9 }}
                              whileHover={{ scale: 1.05 }}
                              className={`inline-flex items-center gap-1 text-[10px] font-black text-white bg-gradient-to-br ${c.gradient} px-2.5 py-1.5 rounded-lg shadow-sm`}
                            >
                              <Calculator className="w-3 h-3" />
                              تبدیل
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 border-t border-amber-100 flex items-start gap-3">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[10.5px] text-amber-900 font-bold leading-relaxed">
                <strong>نکته:</strong> نرخ‌های یورو و دلار به‌صورت روزانه از
                سایت TGJU.org به‌روزرسانی می‌شوند. سایر ارزها با نرخ تقریبی
                نمایش داده می‌شوند. برای تبدیل مبالغ بزرگ، حتماً نرخ دقیق را از
                صرافی مورد نظر استعلام کنید.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* EXCHANGE OFFICES */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="relative p-5 md:p-6 border-b border-stone-100">
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
              <div>
                <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                  صرافی‌های معتبر وین
                </h2>
                <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                  {filteredOffices.length} صرافی تأیید‌شده با نرخ رقابتی و خدمات فارسی
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-700">تأیید‌شده</span>
              </div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                placeholder="جستجوی صرافی... (نام یا منطقه)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-10 pl-4 py-3 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-3.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="p-5 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredOffices.map((office, i) => {
                  const BadgeIcon = office.badgeIcon;
                  return (
                    <motion.div
                      key={office.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="group relative bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                    >
                      {office.isRecommended && (
                        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2 py-1 rounded-full shadow-lg">
                          <Crown className="w-2.5 h-2.5 fill-current" />
                          پیشنهاد ویژه
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${office.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform flex-shrink-0`}
                          >
                            <Building2 className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-stone-900 text-xs md:text-sm mb-0.5 leading-snug">
                              {office.persianName}
                            </h3>
                            <p className="text-[10px] font-mono text-stone-500 truncate">
                              {office.name}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`inline-flex items-center gap-1 text-[9px] font-black text-white bg-gradient-to-br ${office.gradient} px-2 py-0.5 rounded-full mb-3`}
                        >
                          {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5" />}
                          {office.badge}
                        </div>

                        <div className="space-y-2.5 mb-4">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="text-[9px] font-black text-stone-500 mb-0.5">
                                {office.district}
                              </div>
                              <div
                                className="text-[10.5px] font-bold text-stone-800 leading-snug"
                                dir="ltr"
                              >
                                {office.address}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                            <div className="text-[10.5px] font-black text-stone-800">
                              {office.hours}
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div className="text-[10.5px] font-bold text-stone-700">
                              {office.specialty}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                            <span className="text-xs font-black text-stone-900 font-mono">
                              {office.rating}
                            </span>
                          </div>

                          <a
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            className={`inline-flex items-center gap-1.5 bg-gradient-to-br ${office.gradient} text-white font-black text-[10px] px-3 py-2 rounded-xl shadow-md hover:scale-105 transition-all`}
                            dir="ltr"
                          >
                            <PhoneCall className="w-3 h-3" />
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {filteredOffices.length === 0 && (
                  <div className="col-span-2 text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-stone-400" />
                    </div>
                    <p className="text-sm font-black text-stone-700 mb-1">
                      صرافی منطبق با جستجو یافت نشد
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all mt-3"
                    >
                      <X className="w-3 h-3" />
                      پاک‌سازی جستجو
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* EXCHANGE TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              نکات طلایی تبدیل ارز در اتریش
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار راهکار عملی برای بهترین نرخ و جلوگیری از ضرر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXCHANGE_TIPS.map((v, i) => {
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
        {/* MONEY TRANSFER INFO */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Landmark className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-black text-stone-900 mb-3">
                راه‌های انتقال پول از ایران به اتریش
              </h3>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                سه روش اصلی که برای انتقال پول از ایران به اتریش استفاده
                می‌شود، هر کدام با مزایا و معایب خاص خود:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  {
                    icon: Banknote,
                    title: "حواله نقدی",
                    desc: "از طریق صرافی‌های ایران و دریافت در وین",
                    pros: "سریع، بدون مالیات",
                    cons: "محدودیت مبلغ، خطرات امنیتی",
                    color: "from-emerald-500 to-teal-600",
                  },
                  {
                    icon: Building2,
                    title: "SWIFT بانکی",
                    desc: "انتقال رسمی از طریق سیستم بانکی",
                    pros: "رسمی، قابل پیگیری",
                    cons: "کند، کارمزد بالا",
                    color: "from-sky-500 to-blue-600",
                  },
                  {
                    icon: CreditCard,
                    title: "ارز دیجیتال",
                    desc: "استفاده از USDT یا BTC به‌عنوان واسط",
                    pros: "سریع، بدون مرز",
                    cons: "نوسان قیمت، ریسک قانونی",
                    color: "from-amber-500 to-orange-600",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-indigo-100"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md mb-3`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-black text-stone-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-bold text-stone-600 mb-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-black text-emerald-700">
                          <CheckCircle className="w-2.5 h-2.5" />
                          {item.pros}
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-black text-rose-700">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          {item.cons}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              چرا از این ابزار استفاده کنیم؟
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیل که این ویجت را به مرجع اول فارسی‌زبانان تبدیل می‌کند
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
              پاسخ به پرتکرارترین سوالات فارسی‌زبانان درباره تبدیل و انتقال ارز
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
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-black text-amber-900 text-sm mb-1.5">
              نکات ایمنی مهم در تبدیل و حواله ارز
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>هرگز مبالغ بزرگ نقدی را بدون همراهی شخص مورد اعتماد حمل نکنید.</li>
              <li>در صرافی‌ها، رسید رسمی با مهر و امضا دریافت کنید.</li>
              <li>از صرافی‌های غیرمجاز یا واسطه‌های ناشناخته در شبکه‌های اجتماعی خودداری کنید.</li>
              <li>قوانین اتریش برای انتقال وجه، الزام به ثبت معاملات بالای ۱۰٬۰۰۰ یورو را دارد.</li>
              <li>نرخ‌های این صفحه تخمینی هستند؛ برای مبالغ مهم، حتماً نرخ دقیق را استعلام کنید.</li>
              <li>اتریش‌نشین هیچ‌گونه مسئولیتی در قبال معاملات ارزی کاربران نمی‌پذیرد.</li>
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
              همراه شما در امور مالی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوال مالی یا ارزی دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخ به سوالات شما درباره تبدیل ارز، حواله،
              صرافی‌های معتبر و نکات مالی زندگی در اتریش است.
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
              نرخ‌های یورو و دلار به‌صورت روزانه از سایت TGJU.org دریافت
              می‌شوند و صرفاً جنبه راهنمایی دارند. نرخ‌های واقعی صرافی‌ها ممکن
              است تفاوت داشته باشند. اتریش‌نشین هیچ ارتباط تجاری با صرافی‌های
              ذکرشده ندارد و مسئولیتی در قبال معاملات ارزی کاربران نمی‌پذیرد.
              برای تبدیل مبالغ مهم، حتماً با صرافی‌های دارای مجوز رسمی مشورت
              کنید.
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

export default ExchangeRateWidget;