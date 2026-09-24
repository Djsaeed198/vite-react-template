import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car, MapPin, Clock, Euro, Ticket, Smartphone, CreditCard,
  Building2, Users, Shield, CheckCircle, Info, ChevronDown,
  Sparkles, Zap, Star, PhoneCall, Send, Globe, Heart, Award,
  Calendar, TrendingUp, Quote, AlertCircle, Navigation,
  ParkingCircle, CircleDollarSign, Timer, Wallet, Percent,
  Bike, Truck, Home, Key, FileText, Landmark, ArrowUpRight,
  Filter, Grid3x3, Coffee, Sun, Moon, Mountain, BarChart3,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna parking themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80",
  street: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  sign: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=1200&q=80",
  garage: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
  app: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type ZoneType = "kurzparkzone" | "parkpickerl" | "garage" | "free";

type Zone = {
  id: ZoneType;
  name: string;
  nameDe: string;
  price: string;
  priceDetail: string;
  duration: string;
  icon: any;
  gradient: string;
  color: string;
  description: string;
  where: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  recommended?: boolean;
};

// ==========================================
// PARKING ZONES DATA
// ==========================================
const ZONES: Zone[] = [
  {
    id: "kurzparkzone",
    name: "پارک کوتاه‌مدت",
    nameDe: "Kurzparkzone",
    price: "€۲.۶۰",
    priceDetail: "هر ۳۰ دقیقه (۲۰۲۶)",
    duration: "حداکثر ۲ ساعت",
    icon: Timer,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    description:
      "پارک کوتاه‌مدت در تمام مناطق ۱ تا ۹ و بخش‌های بزرگی از مناطق دیگر اعمال می‌شود. از دوشنبه تا جمعه ساعت ۹ تا ۲۲ فعال است. برای پارک چند ساعته در مرکز شهر، بهترین گزینه است. پرداخت از طریق اپلیکیشن یا برگه پارک (Parkschein) انجام می‌شود.",
    where: [
      "مناطق ۱ تا ۹ (تمام ساعات اداری)",
      "بخش‌های بزرگی از مناطق ۱۰ تا ۲۰",
      "مراکز خرید و مناطق تجاری",
    ],
    pros: [
      "بدون نیاز به پیش‌ثبت‌نام یا مجوز",
      "پرداخت لحظه‌ای از طریق اپلیکیشن",
      "مناسب پارک‌های کوتاه‌مدت",
    ],
    cons: [
      "حداکثر ۲ ساعت — باید جابجا شوید",
      "شلوغ در ساعات اداری",
      "هزینه بالا برای پارک طولانی",
    ],
    bestFor: "خرید سریع، قرار ملاقات کوتاه، دیدار اداری",
    recommended: true,
  },
  {
    id: "parkpickerl",
    name: "مجوز پارک ساکنان",
    nameDe: "Parkpickerl",
    price: "€۱۳۰",
    priceDetail: "سالانه (متغیر بر اساس منطقه)",
    duration: "حداکثر ۳ سال",
    icon: Key,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    description:
      "Parkpickerl مجوز پارک برای ساکنان مناطق وین است که به پلاک خودرو وصل می‌شود. از سال ۲۰۲۲، تمام ۲۳ منطقه وین دارای Parkpickerl شده‌اند. این مجوز اجازه پارک بدون محدودیت زمانی در منطقه محل سکونت را می‌دهد. برای اخذ آن، باید مالک یا مستأجر رسمی آدرس باشید.",
    where: [
      "تمام ۲۳ منطقه وین (از ۲۰۲۲)",
      "در معابر عمومی داخل منطقه سکونت",
      "معمولاً فقط منطقه ثبت‌شده در Meldezettel",
    ],
    pros: [
      "بدون محدودیت زمانی در منطقه شما",
      "امکان پارک شبانه و طولانی‌مدت",
      "قیمت‌های مختلف بر اساس منطقه",
    ],
    cons: [
      "نیاز به اقامت رسمی در آن منطقه",
      "فقط برای همان منطقه معتبر است",
      "هزینه سالانه حتی اگر کم استفاده کنید",
    ],
    bestFor: "ساکنان دائمی یک محله، خودروی شخصی، پارک طولانی‌مدت",
    recommended: true,
  },
  {
    id: "garage",
    name: "پارکینگ سرپوشیده",
    nameDe: "Parkgarage",
    price: "€۳ تا €۷",
    priceDetail: "هر ساعت (متوسط شهری)",
    duration: "بدون محدودیت",
    icon: Building2,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    description:
      "پارکینگ‌های سرپوشیده (Parkgarage و Tiefgarage) در مراکز خرید و نقاط مرکزی وین با هزینه ساعتی کار می‌کنند. برای پارک طولانی‌مدت در مرکز شهر یا در روزهای بارانی، راحت‌ترین گزینه هستند. برخی از آن‌ها اشتراک ماهانه هم ارائه می‌دهند.",
    where: [
      "مراکز خرید (Shopping City Süd, Donau Zentrum)",
      "مناطق توریستی مرکزی (Kärntner Straße، Stephansplatz)",
      "برج‌های اداری و هتل‌ها",
    ],
    pros: [
      "بدون محدودیت زمانی",
      "محفوظ از سرقت و آب و هوا",
      "معمولاً ظرفیت بالا و در دسترس",
    ],
    cons: [
      "گران‌تر از پارک خیابانی",
      "در ساعات شلوغی ممکن است پر باشند",
      "برخی پارکینگ‌ها محدودیت ارتفاع دارند",
    ],
    bestFor: "پارک طولانی‌مدت، سفر شهری، روزهای بارانی",
  },
  {
    id: "free",
    name: "پارک رایگان خارج از مناطق",
    nameDe: "Freies Parken",
    price: "€۰",
    priceDetail: "کاملاً رایگان",
    duration: "بدون محدودیت",
    icon: Mountain,
    gradient: "from-amber-500 to-orange-600",
    color: "text-amber-700",
    description:
      "در حاشیه‌های وین و مناطق حومه (Umland)، پارک رایگان و بدون محدودیت وجود دارد. بسیاری از ساکنان وین خودروی خود را در حاشیه شهر پارک کرده و با مترو یا S-Bahn به مرکز می‌روند (روش Park & Ride). این روش اقتصادی‌ترین گزینه برای سفرهای روزانه است.",
    where: [
      "مناطق Umland اطراف وین",
      "Park & Ride در ایستگاه‌های نهایی مترو",
      "خیابان‌های خارج از Kurzparkzone",
    ],
    pros: [
      "کاملاً رایگان",
      "بدون محدودیت زمانی",
      "ترکیب راحت با مترو (P+R)",
    ],
    cons: [
      "دور از مرکز شهر",
      "نیاز به حمل‌ونقل عمومی بعد از پارک",
      "P+R در روزهای کاری سریع پر می‌شود",
    ],
    bestFor: "سفرهای روزانه، ترکیب خودرو + مترو، کم‌بودجه",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "€۲.۶۰", label: "پارک کوتاه‌مدت (۳۰ دقیقه)", icon: Timer },
  { value: "€۱۳۰", label: "Parkpickerl سالانه (متوسط)", icon: Key },
  { value: "۹ صبح", label: "شروع Kurzparkzone", icon: Sun },
  { value: "۲۲ شب", label: "پایان Kurzparkzone", icon: Moon },
];

// ==========================================
// PAYMENT APPS
// ==========================================
const PAYMENT_APPS = [
  {
    name: "Handyparken",
    provider: "شهرداری وین (رسمی)",
    platform: "وب + اپلیکیشن",
    features: "ساده‌ترین گزینه — ثبت نام یک‌بار، استفاده همیشه",
    icon: Smartphone,
    gradient: "from-sky-500 to-blue-600",
    recommended: true,
  },
  {
    name: "EasyPark",
    provider: "اپلیکیشن بین‌المللی",
    platform: "iOS / Android",
    features: "کاربرپسند، کار در ۲۰+ کشور اروپایی",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "PayByPhone",
    provider: "اپلیکیشن بین‌المللی",
    platform: "iOS / Android",
    features: "استفاده در اتریش، آلمان، فرانسه",
    icon: CreditCard,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Parkschein",
    provider: "برگه کاغذی سنتی",
    platform: "فروشگاه‌های Trafik",
    features: "روش قدیمی — نیاز به پر کردن دستی",
    icon: Ticket,
    gradient: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// PARKING ZONES BY DISTRICT (simplified overview)
// ==========================================
const DISTRICT_OVERVIEW = [
  { district: "۱ تا ۹", type: "Kurzparkzone روزانه", info: "تمام مناطق مرکزی — پارک کوتاه‌مدت" },
  { district: "۱۰، ۱۱، ۱۲", type: "Kurzparkzone + Parkpickerl", info: "پارک کوتاه‌مدت در ساعات اداری" },
  { district: "۱۳ تا ۱۹", type: "Parkpickerl ساکنان", info: "پارک طولانی برای ساکنان منطقه" },
  { district: "۲۰، ۲۱، ۲۲، ۲۳", type: "مناطق ترکیبی", info: "بخش‌های مرکزی + Parkpickerl" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "ساعت فعال بودن Kurzparkzone در وین چه موقع است؟",
    a: "پارک کوتاه‌مدت (Kurzparkzone) در وین معمولاً از دوشنبه تا جمعه ساعت ۹:۰۰ صبح تا ۲۲:۰۰ شب فعال است. در برخی مناطق مرکزی، روزهای شنبه نیز از ۹:۰۰ تا ۱۸:۰۰ اعمال می‌شود. یکشنبه‌ها و تعطیلات رسمی (Feiertage)، پارک کوتاه‌مدت در اکثر مناطق رایگان است.",
  },
  {
    q: "چگونه Parkpickerl (مجوز پارک ساکنان) بگیرم؟",
    a: "برای دریافت Parkpickerl، باید ساکن رسمی منطقه مورد نظر باشید (بر اساس Meldezettel). مدارک لازم: پاسپورت، Meldezettel، سند خودرو (Zulassungsschein) و بیمه. درخواست از طریق وب‌سایت شهرداری وین (wien.gv.at) یا حضوری در دفاتر منطقه (Bezirksamt) امکان‌پذیر است. هزینه سالانه بین ۱۲۰ تا ۱۵۰ یورو بسته به منطقه است.",
  },
  {
    q: "آیا با Handyparken می‌توانم در کل وین پارک کنم؟",
    a: "بله، Handyparken (سامانه رسمی شهرداری وین) در تمام مناطق Kurzparkzone وین کار می‌کند. تنها نیاز به ثبت‌نام یک‌باره با پلاک خودرو و اطلاعات پرداخت دارید. پس از آن، با یک کلیک می‌توانید پارک را شروع و پایان دهید. هزینه دقیق بر اساس دقیقه محاسبه می‌شود.",
  },
  {
    q: "آیا پارکینگ در روزهای شنبه و یکشنبه رایگان است؟",
    a: "پارک در روزهای یکشنبه و تعطیلات رسمی در تمام مناطق وین رایگان است — به جز مناطق توریستی خاص. شنبه‌ها در برخی مناطق (مرکز و بخش‌هایی از مناطق ۶، ۷، ۸) پارک کوتاه‌مدت اعمال می‌شود (۹:۰۰ تا ۱۸:۰۰ یا ۱۹:۰۰). بهترین روش: همیشه تابلوهای پارک در محل را بررسی کنید.",
  },
  {
    q: "چقدر جریمه پارک بدون بلیت در وین است؟",
    a: "جریمه پارک بدون بلیت در Kurzparkzone بین ۳۶ تا ۵۰ یورو است. اگر برگه پارک (Organstrafverfügung) نصب نکنید، معمولاً ۳۶ یورو جریمه فوری یا ۴۲ یورو در صورت ارسال پستی. اگر خودروی شما در محل ممنوعه (Halteverbot) پارک شده باشد، احتمال بکسل کردن (Abschleppen) وجود دارد که هزینه آن ۲۰۰-۳۰۰ یورو + جریمه است.",
  },
  {
    q: "Parkpickerl من در چند منطقه معتبر است؟",
    a: "Parkpickerl فقط در منطقه‌ای که در Meldezettel شما ثبت شده (منطقه سکونت) معتبر است. اگر در منطقه ۱۸ ساکن هستید، مجوز شما فقط در همان منطقه ۱۸ کار می‌کند. اما در مناطق مرکزی (Kurzparkzone روزانه)، می‌توانید پارک کوتاه‌مدت کنید بدون نیاز به مجوز اضافی — فقط باید بلیت بخرید.",
  },
  {
    q: "اگر خودروی من خارجی است (پلاک ایرانی/آلمانی) چطور پارک کنم؟",
    a: "خودروهای با پلاک خارجی می‌توانند در Kurzparkzone با خرید بلیت پارک کنند. اما برای Parkpickerl (مجوز ساکنان)، باید خودرو در اتریش ثبت شده باشد (اتریشی یا اروپایی با پلاک اتریش). برای اقامت طولانی‌مدت، توصیه می‌شود خودروی خود را در اتریش ثبت کنید. روند ثبت خودرو در راهنمای مجزای ما توضیح داده شده است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ParkingGuide: React.FC = () => {
  const [activeZone, setActiveZone] = useState<ZoneType>("kurzparkzone");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [hours, setHours] = useState<number>(2);
  const [parkingType, setParkingType] = useState<"street" | "garage">("street");

  const activeZoneData = useMemo(
    () => ZONES.find((z) => z.id === activeZone)!,
    [activeZone]
  );

  // ==========================================
  // COST CALCULATOR
  // ==========================================
  const costEstimate = useMemo(() => {
    if (parkingType === "garage") {
      const hourlyRates = [3, 4, 5, 6];
      const avg = hourlyRates.reduce((a, b) => a + b, 0) / hourlyRates.length;
      const total = hours * avg;
      return {
        total,
        perHour: avg,
        note: "میانگین پارکینگ سرپوشیده شهری",
        currency: "€",
      };
    }
    // Kurzparkzone: €2.60 per 30 min = €5.20 per hour
    const total = hours * 5.2;
    return {
      total,
      perHour: 5.2,
      note: "تعرفه رسمی Kurzparkzone وین ۲۰۲۶",
      currency: "€",
    };
  }, [hours, parkingType]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای کامل پارک خودرو در وین (Kurzparkzone و Parkpickerl)",
      description:
        "راهنمای گام‌به‌گام پارک خودرو در وین — قوانین Kurzparkzone، خرید Parkpickerl، پرداخت با Handyparken و جریمه‌های پارک.",
      inLanguage: "fa-IR",
      step: [
        { "@type": "HowToStep", position: 1, name: "تابلوهای پارک را بررسی کنید (Kurzparkzone یا Parkpickerl)" },
        { "@type": "HowToStep", position: 2, name: "برای پارک کوتاه‌مدت از Handyparken استفاده کنید" },
        { "@type": "HowToStep", position: 3, name: "برای پارک طولانی، Parkpickerl یا پارکینگ سرپوشیده انتخاب کنید" },
        { "@type": "HowToStep", position: 4, name: "بلیت را در شیشه خودرو نصب کنید (اگر Parkschein کاغذی استفاده می‌کنید)" },
        { "@type": "HowToStep", position: 5, name: "در ساعت ۲۲ یا پایان زمان پارک، خودرو را جابجا کنید" },
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
      headline: "راهنمای پارک خودرو در وین ۲۰۲۶ — Kurzparkzone و Parkpickerl",
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
      title="راهنمای پارک خودرو در وین"
      description="راهنمای جامع پارک خودرو در وین — Kurzparkzone، Parkpickerl، پارکینگ سرپوشیده، اپلیکیشن‌های پرداخت و جریمه‌های پارک"
    >
      <SEO
        title="راهنمای پارک خودرو در وین ۲۰۲۶ | Kurzparkzone و Parkpickerl"
        description="راهنمای کامل پارک در وین: قوانین Kurzparkzone، خرید Parkpickerl، اپلیکیشن Handyparken، هزینه پارکینگ و جریمه‌های پارک بدون بلیت. راهنمای فارسی‌زبانان مقیم اتریش."
        keywords="پارک وین, Kurzparkzone, Parkpickerl, Handyparken, پارک خودرو اتریش, جریمه پارک وین, Parkgarage Wien, Parkschein, Park and Ride Wien"
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
              "radial-gradient(80% 150% at 90% 0, #1e40af 0, #1e1b4b 48%, #0a0f1f 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="پارک خودرو در وین"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0f1f]/90 via-[#1e1b4b]/75 to-[#1e40af]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🅿️
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای پارک وین ۲۰۲۶ — بدون جریمه
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              پارک خودرو در وین — از €۲.۶۰ تا Parkpickerl سالانه
            </h1>

            <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-6">
              پارک خودرو در وین می‌تواند یکی از سخت‌ترین تجربه‌های هفته‌های اول شما باشد —
              اما با دانستن <strong className="text-amber-300">قوانین Kurzparkzone</strong>،
              <strong className="text-amber-300"> Parkpickerl</strong> و
              <strong className="text-amber-300"> اپلیکیشن Handyparken</strong>، همه‌چیز ساده می‌شود.
              در این راهنما، تمام آنچه برای پارک بدون جریمه در وین نیاز دارید را یاد می‌گیرید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۲۳ منطقه بررسی‌شده</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>قوانین رسمی ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>نکات ساکنان ایرانی</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#zones"
                className="inline-flex items-center gap-2 bg-white text-[#1e40af] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ParkingCircle className="w-4 h-4" />
                مقایسه گزینه‌های پارک
              </a>
              <a
                href="https://www.handyparken.at"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                ثبت‌نام Handyparken
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-700" />
                </div>
                <div className="text-lg font-black text-blue-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* WHY IT'S TRICKY */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border border-blue-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-blue-700 mb-1">
                چرا پارک در وین پیچیده است؟
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-blue-700">وین یکی از سخت‌گیرترین شهرهای اروپا در پارک خودرو است.</strong> هر
                منطقه قوانین مخصوص خود را دارد، پارک کوتاه‌مدت تنها ۲ ساعت مجاز است، و
                جریمه‌های پارک بدون بلیت در سال ۲۰۲۶ به ۳۶ تا ۵۰ یورو رسیده. اما با دانستن
                سیستم <strong>Kurzparkzone + Parkpickerl + Handyparken</strong>، می‌توانید
                بدون هیچ جریمه‌ای در وین رانندگی کنید.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* PARKING ZONES */}
        {/* ========================================== */}
        <div id="zones" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ParkingCircle className="w-5 h-5 text-blue-700" />
              ۴ گزینه اصلی پارک در وین — کدام برای شما مناسب است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              روی هر کارت کلیک کنید تا جزئیات کامل را ببینید
            </p>
          </div>

          {/* Zone tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            {ZONES.map((z) => {
              const Icon = z.icon;
              const isActive = activeZone === z.id;
              return (
                <motion.button
                  key={z.id}
                  onClick={() => setActiveZone(z.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                    isActive
                      ? "border-blue-600 shadow-lg shadow-blue-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  {z.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      پیشنهادی
                    </div>
                  )}
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${z.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-black text-stone-900 leading-tight">{z.name}</div>
                  <div className={`text-[10px] font-black mt-1 font-mono ${isActive ? z.color : "text-stone-500"}`} dir="ltr">
                    {z.price}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active zone detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image panel */}
                <div className="relative h-72 md:h-auto min-h-[400px] overflow-hidden">
                  <img
                    src={
                      activeZone === "kurzparkzone"
                        ? IMAGES.street
                        : activeZone === "parkpickerl"
                        ? IMAGES.sign
                        : activeZone === "garage"
                        ? IMAGES.garage
                        : IMAGES.vienna
                    }
                    alt={activeZoneData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeZoneData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <Clock className="w-3 h-3 text-blue-700" />
                    {activeZoneData.duration}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">قیمت</div>
                    <div className="text-2xl font-black text-white leading-tight font-mono" dir="ltr">
                      {activeZoneData.price}
                    </div>
                    <div className="text-[9px] text-white/70 font-bold mt-0.5">{activeZoneData.priceDetail}</div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-6 md:p-8">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeZoneData.color} mb-3`}>
                    <MapPin className="w-3 h-3" />
                    {activeZoneData.nameDe}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    {activeZoneData.name}
                  </h3>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeZoneData.description}
                  </p>

                  {/* Where */}
                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      کجا اعمال می‌شود؟
                    </div>
                    <ul className="space-y-1.5">
                      {activeZoneData.where.map((w, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 mb-2">
                        <CheckCircle className="w-3.5 h-3.5" />
                        مزایا
                      </div>
                      <ul className="space-y-1">
                        {activeZoneData.pros.map((p, i) => (
                          <li key={i} className="text-[10px] text-emerald-800 font-bold leading-snug">
                            • {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-700 mb-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        محدودیت‌ها
                      </div>
                      <ul className="space-y-1">
                        {activeZoneData.cons.map((p, i) => (
                          <li key={i} className="text-[10px] text-rose-800 font-bold leading-snug">
                            • {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 flex items-start gap-2">
                    <Users className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-sky-700 mb-0.5">
                        مناسب برای:
                      </div>
                      <div className="text-[10px] text-sky-800 font-bold leading-snug">
                        {activeZoneData.bestFor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* COST CALCULATOR */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-blue-700" />
              ماشین‌حساب هزینه پارک در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چقدر برای پارک خودروی خود در وین پرداخت خواهید کرد؟
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Input panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-5">
              {/* Parking type */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <ParkingCircle className="w-3.5 h-3.5 text-blue-700" />
                  نوع پارک
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "street" as const, label: "پارک خیابانی", sub: "Kurzparkzone", icon: ParkingCircle, gradient: "from-sky-600 to-blue-700" },
                    { id: "garage" as const, label: "پارکینگ سرپوشیده", sub: "Parkgarage", icon: Building2, gradient: "from-violet-600 to-purple-700" },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isActive = parkingType === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setParkingType(p.id)}
                        className={`relative overflow-hidden rounded-2xl border-2 p-3 text-right transition-all ${
                          isActive
                            ? "border-blue-600 bg-blue-50/50 shadow-md"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-black text-stone-900">{p.label}</div>
                        <div className="text-[9px] text-stone-500 font-bold font-mono mt-0.5" dir="ltr">{p.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hours slider */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-blue-700" />
                    مدت زمان پارک
                  </span>
                  <span className="text-sm font-black text-blue-700 font-mono" dir="ltr">
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-bold mt-1">
                  <span>۱ ساعت</span>
                  <span>۲ ساعت (حداکثر Kurzparkzone)</span>
                  <span>۸ ساعت</span>
                </div>
              </div>

              {/* Info boxes */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3">
                  <div className="text-[10px] font-black text-amber-700 mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    محدودیت Kurzparkzone
                  </div>
                  <div className="text-[10px] text-amber-800 font-bold leading-snug">
                    حداکثر ۲ ساعت — اگر بیشتر بمانید، جریمه €۳۶ تا €۵۰
                  </div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                  <div className="text-[10px] font-black text-emerald-700 mb-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    زمان رایگان
                  </div>
                  <div className="text-[10px] text-emerald-800 font-bold leading-snug">
                    یکشنبه‌ها و تعطیلات: پارک رایگان در اکثر مناطق
                  </div>
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${parkingType}-${hours}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden rounded-3xl p-6 text-white bg-gradient-to-br from-[#1e40af] via-[#1e1b4b] to-[#0a0f1f]"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      <BarChart3 className="w-3 h-3 text-amber-300" />
                      هزینه تقریبی پارک
                    </div>

                    <div className="text-[10px] font-black text-white/70 mb-1">
                      {hours} ساعت پارک در وین
                    </div>
                    <div className="text-4xl md:text-5xl font-black leading-none mb-1 font-mono" dir="ltr">
                      €{costEstimate.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-bold text-white/60 mb-5">
                      نرخ ساعتی: €{costEstimate.perHour.toFixed(2)} — {costEstimate.note}
                    </div>

                    {hours > 2 && parkingType === "street" && (
                      <div className="bg-rose-500/20 border border-rose-400/30 backdrop-blur-sm rounded-2xl p-3 mb-4 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-black text-rose-200 mb-0.5">
                            توجه: بیش از ۲ ساعت
                          </div>
                          <p className="text-[10px] text-rose-100 font-bold leading-snug">
                            Kurzparkzone حداکثر ۲ ساعت مجاز است. برای مدت بیشتر، از پارکینگ سرپوشیده یا Parkpickerl استفاده کنید.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-2 mb-4 pt-4 border-t border-white/15">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Timer className="w-3 h-3" />
                          مدت زمان
                        </span>
                        <span className="font-black font-mono" dir="ltr">
                          {hours}h
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white/70 flex items-center gap-1.5">
                          <Euro className="w-3 h-3" />
                          نرخ ساعتی
                        </span>
                        <span className="font-black font-mono" dir="ltr">
                          €{costEstimate.perHour.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/15">
                        <span className="font-black text-white/90 flex items-center gap-1.5">
                          <CircleDollarSign className="w-3 h-3" />
                          مجموع
                        </span>
                        <span className="font-black font-mono text-amber-300" dir="ltr">
                          €{costEstimate.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/10 border border-white/15 rounded-2xl p-3">
                      <div className="text-[9px] font-black text-white/60 mb-1">پیشنهاد اتریش‌نشین</div>
                      <p className="text-[10px] text-white/90 font-bold leading-relaxed">
                        {parkingType === "street" && hours <= 2
                          ? "با Handyparken پرداخت کنید — بدون نیاز به بلیت کاغذی، دقیق و سریع."
                          : parkingType === "street" && hours > 2
                          ? "برای مدت طولانی، پارکینگ سرپوشیده اقتصادی‌تر است و جریمه ندارد."
                          : "برای پارک روزانه در یک محل ثابت، Parkpickerl یا اشتراک ماهانه پارکینگ بهترین گزینه است."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* PAYMENT APPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-700" />
              ۴ روش پرداخت پارک در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              اپلیکیشن‌ها و روش‌های رسمی پرداخت پارک کوتاه‌مدت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PAYMENT_APPS.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className={`relative bg-white rounded-2xl border ${
                    app.recommended ? "border-blue-300 shadow-md" : "border-stone-200"
                  } p-4 hover:shadow-md transition-all group overflow-hidden`}
                >
                  {app.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      رسمی
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-0.5">
                    {app.name}
                  </h3>
                  <div className="text-[9px] text-stone-400 font-bold font-mono mb-1">
                    {app.provider}
                  </div>
                  <div className="text-[9px] text-stone-500 font-bold mb-2">
                    {app.platform}
                  </div>
                  <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                    {app.features}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* DISTRICT OVERVIEW TABLE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-blue-700" />
              نگاه کلی به مناطق وین — کدام منطقه چه نوع پارکی دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              راهنمای سریع بر اساس منطقه سکونت یا مقصد
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-right">منطقه</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-right">نوع پارک</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-right">توضیح</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICT_OVERVIEW.map((d, i) => (
                  <tr key={i} className="border-b border-stone-100 hover:bg-stone-50/50 transition-all">
                    <td className="py-3 px-2">
                      <span className="text-[11px] font-black text-stone-800">{d.district}</span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                        {d.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] font-bold text-stone-600">{d.info}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-800 font-bold leading-relaxed">
              <strong>نکته:</strong> از سال ۲۰۲۲، تمام ۲۳ منطقه وین دارای Parkpickerl ساکنان
              هستند. اما در برخی مناطق (خصوصاً حومه‌ها)، بخش‌هایی همچنان بدون محدودیت یا
              با Kurzparkzone ساده هستند. برای اطلاعات قطعی منطقه خود، به
              <span className="font-mono mx-1" dir="ltr">wien.gv.at</span> مراجعه کنید.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-700" />
              یک روز پارک در وین — سه قاب متفاوت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از پارک خیابانی مرکز تا پارکینگ مدرن زیرزمینی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.street,
                title: "پارک خیابانی",
                subtitle: "Kurzparkzone",
                desc: "پارک کوتاه‌مدت در خیابان‌های مرکز وین — با تابلوی آبی و حرف P مشخص می‌شود.",
                icon: ParkingCircle,
                gradient: "from-sky-600 to-blue-700",
                stat: "۲ ساعت",
              },
              {
                img: IMAGES.garage,
                title: "پارکینگ سرپوشیده",
                subtitle: "Parkgarage",
                desc: "راحت، امن و بدون محدودیت — بهترین گزینه برای پارک طولانی در مرکز شهر.",
                icon: Building2,
                gradient: "from-violet-600 to-purple-700",
                stat: "بدون محدودیت",
              },
              {
                img: IMAGES.vienna,
                title: "پارک در حومه",
                subtitle: "Park & Ride",
                desc: "در ایستگاه‌های نهایی مترو، پارک رایگان + سوار شدن به مترو برای رسیدن به مرکز.",
                icon: Mountain,
                gradient: "from-emerald-600 to-teal-700",
                stat: "رایگان",
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
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
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
        {/* 6 SMART TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-700" />
              ۶ ترفند پارک بدون جریمه در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نکات تجربه‌شده‌ای که فقط ساکنان محلی می‌دانند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Smartphone,
                title: "Handyparken را نصب کنید",
                desc: "قبل از پارک، اپلیکیشن Handyparken (رسمی شهرداری) را نصب و ثبت‌نام کنید. پرداخت با گوشی، دقیق و بدون کاغذ.",
                color: "from-sky-500 to-blue-600",
              },
              {
                icon: Calendar,
                title: "شنبه‌ها بعدازظهر رایگان",
                desc: "در بسیاری از مناطق، پارک شنبه‌ها بعد از ساعت ۱۸ (یا ۱۹) و تمام یکشنبه‌ها رایگان است.",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: MapPin,
                title: "تابلوها را با دقت بخوانید",
                desc: "تابلوهای Kurzparkzone معمولاً آبی با حرف P هستند. تابلوهای Parkpickerl آبی روشن با حرف P مخصوص ساکنان.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Clock,
                title: "دقیقاً ساعت ۹ شروع کنید",
                desc: "اگر قصد پارک طولانی دارید، صبح زود قبل از ۹:۰۰ پارک کنید — تا ۹ رایگان است، بعد باید بلیت بخرید.",
                color: "from-rose-500 to-red-600",
              },
              {
                icon: Building2,
                title: "اشتراک ماهانه پارکینگ",
                desc: "اگر روزانه در یک محل ثابت پارک می‌کنید، اشتراک ماهانه پارکینگ سرپوشیده (€۱۲۰-€۲۰۰) بسیار اقتصادی‌تر است.",
                color: "from-violet-500 to-purple-600",
              },
              {
                icon: AlertCircle,
                title: "جریمه ۳۶ یورویی را نپردازید",
                desc: "اگر جریمه Organstrafverfügung دریافت کردید و معتقدید اشتباه است، می‌توانید در Bezirksamt اعتراض (Einspruch) ثبت کنید.",
                color: "from-stone-500 to-stone-700",
              },
            ].map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {tip.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* PENALTY INFO */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 border border-rose-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white shadow-lg">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  جریمه‌های پارک در وین ۲۰۲۶
                </h3>
                <p className="text-[10px] text-stone-500 font-bold">
                  این اعداد را از قبل بدانید تا هزینه‌های اضافی نداشته باشید
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "پارک بدون بلیت", price: "€۳۶-€۵۰", icon: Ticket, color: "from-amber-500 to-orange-600" },
                { label: "پارک در محل ممنوع", price: "€۵۰-€۱۰۰", icon: AlertCircle, color: "from-rose-500 to-red-600" },
                { label: "بکسل خودرو", price: "€۲۰۰-€۳۰۰+", icon: Truck, color: "from-red-600 to-rose-700" },
                { label: "پارک در جای معلولین", price: "€۵۰۰+", icon: Heart, color: "from-violet-500 to-purple-600" },
              ].map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.color} p-5 text-white`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                    <div className="relative">
                      <Icon className="w-5 h-5 mb-3" />
                      <div className="text-[10px] font-black text-white/80 mb-1">
                        {p.label}
                      </div>
                      <div className="text-xl font-black font-mono leading-none" dir="ltr">
                        {p.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-stone-800 font-bold leading-relaxed">
                <strong className="text-rose-700">نکته حرفه‌ای:</strong> اگر بلیت پارک را گم
                کردید اما واقعاً پرداخت کرده بودید، می‌توانید با ارائه رسید اپلیکیشن به
                Bezirksamt اعتراض کنید. ۸۰٪ موارد اعتراض معتبر، به نفع راننده تمام می‌شود.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-700" />
              سوالات متداول درباره پارک در وین
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a0f1f] via-[#1e1b4b] to-[#1e40af] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <ParkingCircle className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی پارک و رانندگی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در مورد پارک در وین سوال دارید؟
            </h2>

            <p className="text-sm text-blue-100 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین می‌تواند در اخذ Parkpickerl، ثبت‌نام Handyparken،
              یافتن پارکینگ مناسب محله شما و حل جریمه‌های پارک راهنمایی‌تان کند.
              همین حالا پیام دهید.
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

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-blue-200 flex-wrap">
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
              قیمت‌ها، ساعات Kurzparkzone و شرایط Parkpickerl ممکن است توسط شهرداری
              وین تغییر کند. اطلاعات این راهنما بر اساس آخرین داده‌های رسمی سال
              ۲۰۲۶ تهیه شده است. برای اطلاعات قطعی منطقه خود، همیشه به
              <span className="font-mono mx-1" dir="ltr">wien.gv.at/parken</span>
              مراجعه کنید یا با دفاتر Bezirksamt محلی تماس بگیرید.
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
        isOpen ? "border-blue-300 bg-blue-50/30 shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white"
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
            isOpen ? "rotate-180 text-blue-700" : ""
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

export default ParkingGuide;