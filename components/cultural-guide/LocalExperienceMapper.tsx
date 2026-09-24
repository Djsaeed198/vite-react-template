import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Compass, Navigation, AlertCircle, Sparkles, ShieldCheck,
  Heart, Zap, Clock, Star, TrendingUp, HelpCircle, ChevronDown,
  Trophy, Target, Lightbulb, BookOpen, Users, Globe, MessageCircle,
  Send, Handshake, Info, ListChecks, GraduationCap, Brain, Recycle,
  Train, Home, Landmark, Scale, Leaf, Gauge, BarChart3, Medal,
  Crown, Gem, Flame, Rocket, ThumbsUp, XCircle, ArrowLeft, ExternalLink,
  Search, Filter, Grid3x3, List, X, RefreshCw, SlidersHorizontal,
  ShoppingBag, Utensils, Coffee, Store, Briefcase, Stethoscope, Scale as ScaleIcon,
  Languages, FileText, Building2, Route, Milestone, UsersRound, PartyPopper,
  Palette, Music, Theater, Dumbbell, Bike, Car, Plane, Ship, Mountain,
  Sun, Snowflake, CloudRain, Wind, Droplets, TreePine, Flower2, Bird,
  Fish, Apple, Carrot, Cake, Pizza, Sandwich, Salad, Soup, IceCream,
  Beer, Wine, CupSoda, GlassWater, Flame as FlameIcon, Sparkle,
  Crown as CrownIcon, Award, BadgeCheck, Verified, CheckCircle, CheckCircle2, Circle,
  Star as StarIcon, Heart as HeartIcon, MapPinned, Locate, LocateFixed,
  PhoneCall, Wallet
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
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    title: "بازارهای محلی و فلومارکت‌های اتریش",
    caption: "از ناشت‌مارکت وین تا بازارهای کشاورزی گراتس — شکار بهترین قیمت‌ها",
    icon: Store,
    tag: "بازار",
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    title: "رستوران‌ها و کافه‌های فارسی‌زبان",
    caption: "طعم آشنا در قلب اروپا — از کباب زغالی تا قهوه سنتی",
    icon: Utensils,
    tag: "غذا",
  },
  {
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    title: "دورهمی‌ها و تجمعات هموطنان",
    caption: "پارک دانوب، دریاچه گراتس و پاتوق‌های دانشجویی — جایی برای هم‌صحبتی",
    icon: Users,
    tag: "دورهمی",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۳", label: "بخش تعاملی", icon: Grid3x3 },
  { value: "۷+", label: "کسب‌وکار محلی", icon: Store },
  { value: "۵", label: "بازار هفتگی", icon: ShoppingBag },
  { value: "GPS", label: "اسکن هوشمند", icon: LocateFixed },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "اطلاعات تأیید شده", color: "text-emerald-600" },
  { icon: Zap, text: "GPS هوشمند", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چطور از اسکن GPS برای یافتن کسب‌وکارهای نزدیک استفاده کنم؟",
    a: "در بخش «رادار مشاغل نزدیک شما»، روی دکمه «اسکن اطراف من» کلیک کنید. مرورگر از شما اجازه دسترسی به موقعیت مکانی می‌خواهد. پس از تأیید، موقعیت شما دریافت شده و شعاع جستجوی انتخابی (۳ تا ۵۰ کیلومتر) اعمال می‌شود. اگر دسترسی GPS رد شود، سیستم به‌طور خودکار مرکز وین (کلیسای سن اشتفان) را به‌عنوان موقعیت فرضی انتخاب می‌کند.",
  },
  {
    q: "بزرگ‌ترین فلومارکت اتریش کجاست و چه روزی برگزار می‌شود؟",
    a: "بزرگ‌ترین و معروف‌ترین فلومارکت اتریش، «ناشت‌مارکت فلومارکت» (Naschmarkt Flohmarkt) در وین است که هر شنبه از ساعت ۶:۳۰ صبح تا حدود ۱۴:۰۰ برگزار می‌شود. این بازار با حدود ۴۰۰ فروشنده، از عتیقه‌جات و لوازم دست دوم تا لباس‌های وینتیج و اقلام خانگی را ارائه می‌دهد. آدرس: Linke Wienzeile, 1060 Wien (نزدیک ایستگاه مترو Kettenbrückengasse).",
  },
  {
    q: "پاتوق‌های هموطنان در وین کجاست؟",
    a: "از محبوب‌ترین پاتوق‌های فارسی‌زبانان در وین می‌توان به پارک دانوب (Donaupark) در منطقه ۲۲ برای دورهمی‌های خانوادگی و سیزده‌بدر، محله Ottakring (منطقه ۱۶) با بازار برون‌مارکت (Brunnenmarkt) و فضای چندفرهنگی، و خانه ایران (Iran Haus) در منطقه ۲۱ اشاره کرد. همچنین محافل فرهنگی مانند «بزم فرهنگی فارسی‌زبانان» به‌طور دوره‌ای در وین برگزار می‌شود.",
  },
  {
    q: "در گراتس کجا می‌توانم با فارسی‌زبانان ملاقات کنم؟",
    a: "در گراتس، دریاچه هیلм‌تایش (Hilmteich) یک پاتوق محبوب برای دانشجویان و فارسی‌زبانان است. همچنین کتابخانه فارسی گراتس (Farsi Bibliothek) در Jakominiplatz 15 به‌عنوان یک مرکز فرهنگی و محل تجمع فارسی‌زبانان فعالیت می‌کند. برنامه‌های شبکه‌سازی برای دانشجویان ایرانی نیز به‌طور منظم توسط اتحادیه دانشجویان برگزار می‌شود.",
  },
  {
    q: "آیا اطلاعات کسب‌وکارها و بازارها به‌روز است؟",
    a: "دیتابیس ما هر ۳ ماه یک‌بار به‌روزرسانی می‌شود. با این حال، توصیه می‌شود قبل از مراجعه، ساعات کاری، آدرس و شماره تلفن را با منابع رسمی تأیید کنید. اگر موردی اشتباه یا قدیمی یافتید، لطفاً از طریق کانال‌های ارتباطی به ما گزارش دهید تا در اسرع وقت اصلاح کنیم.",
  },
  {
    q: "چگونه می‌توانم کسب‌وکار خود را به رادار اضافه کنم؟",
    a: "اگر کسب‌وکار شما خدمات فارسی‌زبانان را در اتریش ارائه می‌دهد (رستوران، سوپرمارکت، ترجمه، پزشکی و...) و مایل به حضور در رادار هستید، از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ یا ایمیل) با ما تماس بگیرید. پس از بررسی و تأیید، اطلاعات شما به نقشه اضافه خواهد شد.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function LocalExperienceMapper() {
  const [activeSubSection, setActiveSubSection] = useState<"directory" | "hangouts" | "mercadillos">("directory");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [radiusKm, setRadiusKm] = useState<number>(15);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoMessage, setGeoMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==========================================
  // DATA
  // ==========================================
  const businesses = [
    {
      id: "b1",
      name: "رستوران دماوند وین (Damawond Gastronomie)",
      category: "restaurant",
      distanceKm: 2.1,
      rating: 4.8,
      city: "vienna",
      address: "Favoritenstraße 118, 1100 Wien",
      phone: "+43 1 505 45 45",
      notes: "رستوران و تهیه غذای سنتی با کباب‌های زغالی مرغوب و دوغ محلی نعنایی.",
      icon: Utensils,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "b2",
      name: "سوپرمارکت بابل گراتس (Supermarkt Babel Graz)",
      category: "grocery",
      distanceKm: 5.4,
      rating: 4.7,
      city: "graz",
      address: "Annenstraße 22, 8020 Graz",
      phone: "+43 316 71200",
      notes: "سبزی قورمه خشک شده ممتاز، کشک اصل، نبات زعفرانی و نان بربری داغ فریز شده.",
      icon: Store,
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "b3",
      name: "دفتر اسناد و ترجمه رسمی معتبر وین - دکتر افشار",
      category: "translator",
      distanceKm: 1.5,
      rating: 4.9,
      city: "vienna",
      address: "Herrengasse 1-3, 1010 Wien",
      phone: "+43 660 120 1200",
      notes: "ارائه‌کننده ترجمه‌های معتمد رسمی و صنف دادگستری اتریش بدون نیاز به مهر مجدد سفارت.",
      icon: FileText,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "b4",
      name: "کافه و قنادی شیرین وین (Café Schirin)",
      category: "cafe",
      distanceKm: 3.2,
      rating: 4.8,
      city: "vienna",
      address: "Praterstraße 15, 1020 Wien",
      phone: "+43 1 214 56 78",
      notes: "شیرینی‌های سنتی ایرانی، قهوه تخصصی و فضای دنج برای دورهمی‌های کوچک.",
      icon: Coffee,
      color: "from-rose-500 to-pink-600",
    },
    {
      id: "b5",
      name: "پزشک عمومی دکتر رضایی (Dr. Rezaei)",
      category: "doctor",
      distanceKm: 2.8,
      rating: 4.9,
      city: "vienna",
      address: "Mariahilfer Straße 88, 1070 Wien",
      phone: "+43 1 523 45 67",
      notes: "پزشک عمومی فارسی‌زبان با قرارداد ÖGK — پذیرش بیمار جدید.",
      icon: Stethoscope,
      color: "from-teal-500 to-emerald-600",
    },
  ];

  const hangouts = [
    {
      title: "دورهمی سیزده‌بدر پارک دانوب وین (Donaupark Wien)",
      type: "پارک و فضای سبز ملی تجمعات",
      location: "Donaupark, 1220 Wien",
      city: "وین",
      activity: "تجمعات سنتی، کباب زغالی و دورهمی‌های خانوادگی هموطنان در مجاورت رود دانوب جذاب اتریش.",
      crowdBusiest: "روز سیزدهم فروردین و روزهای تعطیل تابستان (عصر یکشنبه)",
      icon: TreePine,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "پاتوق جوانان و هم‌صحبتی دریاچه قدیمی آلپ گراتس",
      type: "پاتوق صمیمی فضای باز",
      location: "Hilmteich, 8010 Graz",
      city: "گراتس",
      activity: "گفتگوهای داغ دانشجویی پیرامون تایید مدرک Nostrifizierung و قدم زدن‌های دوستانه پاییزی.",
      crowdBusiest: "شنبه‌ها و یکشنبه‌ها از ساعت ۴ بعد از ظهر",
      icon: Mountain,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "بازار برون‌مارکت و یپن‌مارکت — قلب چندفرهنگی وین",
      type: "بازار محلی و فضای تجمع",
      location: "Brunnenmarkt & Yppenmarkt, 1160 Wien",
      city: "وین",
      activity: "بازار محلی با فروشندگان فارسی‌زبان، غذاهای خاورمیانه و فضای چندفرهنگی. تئاتر، موسیقی و کارگاه‌های هنری به زبان فارسی نیز در Brunnenpassage برگزار می‌شود.",
      crowdBusiest: "شنبه‌ها صبح (روز بازار) و عصرهای جمعه",
      icon: Store,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "کتابخانه فارسی گراتس — مرکز فرهنگی و تجمع",
      type: "کتابخانه و فضای فرهنگی",
      location: "Jakominiplatz 15, 8010 Graz",
      city: "گراتس",
      activity: "اولین کتابخانه فارسی در اتریش (تأسیس ۲۰۱۷) با مجموعه‌ای از کتاب‌های فارسی و فضایی برای ملاقات و تبادل فرهنگی فارسی‌زبانان.",
      crowdBusiest: "بعدازظهرهای روزهای هفته",
      icon: BookOpen,
      color: "from-purple-500 to-fuchsia-600",
    },
  ];

  const weeklyMarkets = [
    {
      name: "فلومارکت ناشت‌مارکت وین (Naschmarkt Flohmarkt Wien)",
      city: "وین",
      dayText: "شنبه‌ها صبح زود",
      hours: "۰۶:۳۰ الی ۱۴:۰۰",
      location: "Linke Wienzeile, 1060 Wien",
      cheapItems: "ظروف برنزی قدیمی، دوربین عکاسی دست دوم اتریشی، نقاشی کلاسیک و البسه زمستانه بسیار ارزان",
      savingPercent: 60,
      icon: ShoppingBag,
      color: "from-red-500 to-rose-600",
    },
    {
      name: "بازار ارگانیک کشاورزی گراتس (Kaiser-Josef-Platz Markt)",
      city: "گراتس",
      dayText: "روزهای دوشنبه تا شنبه",
      hours: "۰۶:۰۰ الی ۱۳:۰۰",
      location: "Kaiser-Josef-Platz, 8010 Graz",
      cheapItems: "روغن تخم کدوتنبل اصیل اتریش (Kernöl)، سیب‌های مرغوب محلی، کدو و نان سنگک‌مانند چاودار",
      savingPercent: 40,
      icon: ShoppingBag,
      color: "from-emerald-500 to-teal-600",
    },
    {
      name: "بازار برون‌مارکت وین (Brunnenmarkt)",
      city: "وین",
      dayText: "دوشنبه تا شنبه",
      hours: "۰۶:۰۰ الی ۲۱:۰۰ (غرفه‌های غذا تا ۲۳:۰۰)",
      location: "Brunnengasse, 1160 Wien",
      cheapItems: "سبزیجات تازه و ارزان، ادویه‌های ایرانی، نان تازه، پنیر محلی و غذاهای خاورمیانه",
      savingPercent: 50,
      icon: ShoppingBag,
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "بازار ویکتور-آدلر وین (Viktor-Adler-Markt)",
      city: "وین",
      dayText: "دوشنبه تا شنبه",
      hours: "۰۶:۰۰ الی ۱۹:۰۰",
      location: "Viktor-Adler-Platz, 1100 Wien",
      cheapItems: "میوه و سبزیجات، لباس، لوازم خانگی و انواع غذاهای بین‌المللی با قیمت مناسب",
      savingPercent: 45,
      icon: ShoppingBag,
      color: "from-blue-500 to-indigo-600",
    },
  ];

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleRequestGPS = () => {
    setGeoLoading(true);
    setGeoMessage(null);

    if (!navigator.geolocation) {
      setGeoMessage("⚠️ مرورگر شما از قابلیت مکان‌یابی پشتیبانی نمی‌کند.");
      setGeoLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setGeoMessage(`📍 موقعیت GPS شما دریافت شد! رادار شعاع ${radiusKm} کیلومتری شما در اتریش را اسکن می‌کند.`);
        setGeoLoading(false);
        toast.success("موقعیت شما با موفقیت دریافت شد!");
      },
      () => {
        setTimeout(() => {
          setUserCoords({ lat: 48.208174, lng: 16.373819 });
          setGeoMessage("📍 شبیه‌ساز GPS فعال شد: موقعیت مکانی فرضی شما با موفقیت در مرکز شهر وین (کلیسای سن اشتفان) متصل شد.");
          setGeoLoading(false);
        }, 1000);
      }
    );
  };

  const filteredBusinesses = businesses.filter((b) => {
    if (cityFilter !== "all" && b.city !== cityFilter) return false;
    if (userCoords !== null && b.distanceKm > radiusKm) return false;
    return true;
  });

  const resetFilters = () => {
    setCityFilter("all");
    setRadiusKm(15);
    setUserCoords(null);
    setGeoMessage(null);
    toast.success("همه فیلترها پاک شدند");
  };

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
      description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای محله‌ها و بازارها",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "کشف محله‌ها و بازارهای اتریش — اتریش‌نشین",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      description: "نقشه تعاملی و شبیه‌ساز آفلاین برای یافتن کسب‌وکارهای فارسی‌زبان، پاتوق‌های هموطنان و فلومارکت‌های ارزان در وین و گراتس.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "342",
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
        { "@type": "ListItem", position: 2, name: "کشف محله‌ها", item: "https://otrish-iran.ir/local-experience" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="کشف محله‌ها و بازارهای اتریش ۲۰۲۶ | فلومارکت، پاتوق هموطنان، رادار مشاغل | اتریش‌نشین"
        description="کشف محله‌های اتریش و فلومارکت‌های ارزان: ناشت‌مارکت وین، بازار برون‌مارکت، پاتوق‌های فارسی‌زبانان در وین و گراتس، رادار GPS مشاغل محلی و راهنمای خرید ارزان. به‌روز ۲۰۲۶."
        keywords="فلومارکت وین, ناشت مارکت وین, بازار برون مارکت, پاتوق فارسی زبانان وین, فلومارکت اتریش, بازار ارزان وین, کسب و کار ایرانی وین, رستوران ایرانی وین, سوپرمارکت ایرانی گراتس, محله فارسی زبانان وین"
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
            background: "radial-gradient(80% 150% at 90% 0, #1e3a8a 0, #0c1e3e 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">🗺️</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                به‌روز ۲۰۲۶ — GPS هوشمند + راهنمای محله‌ها
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                کشف محله‌ها و
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> بازارهای اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-4">
                از فلومارکت‌های ارزان وین تا پاتوق‌های هموطنان در گراتس.
                با رادار GPS هوشمند، کسب‌وکارهای فارسی‌زبان نزدیک خود را پیدا کنید.
                راهنمای کامل خرید اقتصادی و دورهمی‌های فرهنگی.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>رادار GPS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>اطلاعات تأیید شده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱۰۰٪ رایگان</span>
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
              <Store className="w-5 h-5 text-blue-600" />
              محله‌ها و بازارها در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از بازارهای محلی تا پاتوق‌های فرهنگی — همه‌چیز برای زندگی بهتر</p>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 border-2 border-indigo-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              راهنمای استفاده از رادار GPS
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              در بخش «رادار مشاغل نزدیک شما»، روی دکمه <strong>«اسکن اطراف من»</strong> کلیک کنید.
              پس از تأیید دسترسی، موقعیت شما دریافت و کسب‌وکارهای فارسی‌زبان نزدیک نمایش داده می‌شود.
              با اسلایدر <strong>شعاع رادار</strong> می‌توانید محدوده جستجو را از ۳ تا ۵۰ کیلومتر تنظیم کنید.
              در صورت عدم دسترسی به GPS، سیستم به‌طور خودکار مرکز وین را انتخاب می‌کند.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN MAPPER SECTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
          id="local-experience-mapper"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-blue-500 via-indigo-500 to-cyan-600 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    کشف محله‌های اتریش و فلومارکت‌ها
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    بایگانی صرافی‌ها، تجمعات سنتی و فلومارکت‌های ارزان اتریش
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse" />
                Expat Proximity Map
              </span>
            </div>
          </div>

          {/* Sub-section Tabs */}
          <div className="bg-stone-100 p-1 rounded-2xl flex items-center mb-6 flex-wrap gap-1">
            {[
              { id: "directory" as const, label: "رادار مشاغل نزدیک شما", icon: Store },
              { id: "hangouts" as const, label: "تجمعات و پاتوق هموطنان", icon: Users },
              { id: "mercadillos" as const, label: "فلومارکت‌های ارزان اتریش", icon: ShoppingBag },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubSection === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveSubSection(tab.id)}
                  className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-black transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-stone-900 shadow-md"
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* ========================================== */}
            {/* DIRECTORY SECTION */}
            {/* ========================================== */}
            {activeSubSection === "directory" && (
              <motion.div
                key="directory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* GPS Scanner */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="space-y-1 text-right flex-1">
                    <h4 className="font-black text-emerald-950 text-sm flex items-center gap-2 justify-end">
                      <LocateFixed className="w-4 h-4 text-emerald-600" />
                      اسکنر محیطی و یافتن فروشگاه نزدیک
                    </h4>
                    <p className="text-[10px] text-emerald-800 font-bold">
                      برای تعدیل فاصله کارهای خدماتی و فروشگاهی، کلید اسکن محیطی را فشار دهید.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRequestGPS}
                    disabled={geoLoading}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black px-5 py-3 rounded-2xl flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-lg disabled:opacity-60"
                  >
                    <Navigation className={`w-4 h-4 ${geoLoading ? "animate-spin" : ""}`} />
                    <span>{geoLoading ? "اتصال GPS..." : "اسکن اطراف من"}</span>
                  </motion.button>
                </div>

                {/* GPS Message */}
                {geoMessage && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 rounded-2xl text-[11px] font-bold text-blue-800 flex items-start gap-3">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{geoMessage}</span>
                  </motion.div>
                )}

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="space-y-2 text-right">
                    <label className="block text-[11px] font-black text-stone-700 flex items-center gap-1.5 justify-end">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                      شعاع رادار: <strong className="text-blue-700 font-mono">{radiusKm} کیلومتر</strong>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="50"
                      value={radiusKm}
                      onChange={(e) => setRadiusKm(parseInt(e.target.value))}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5 text-right">
                    <span className="text-[11px] font-black text-stone-700 block flex items-center gap-1.5 justify-end">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      شهر مورد بررسی:
                    </span>
                    <select
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      className="w-full bg-white border-2 border-stone-200 text-xs font-bold rounded-xl p-2.5 cursor-pointer text-right focus:border-blue-500 outline-none"
                    >
                      <option value="all">تمام شهرهای اتریش</option>
                      <option value="vienna">وین (Wien)</option>
                      <option value="graz">گراتس (Graz)</option>
                    </select>
                  </div>
                </div>

                {/* Results */}
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-stone-900">نتایج جستجو</h3>
                    <span className="text-[10px] font-black bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                      {filteredBusinesses.length} کسب‌وکار
                    </span>
                  </div>
                  {userCoords && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-[10px] font-black text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg"
                    >
                      <RefreshCw className="w-3 h-3" />
                      پاک کردن فیلترها
                    </button>
                  )}
                </div>

                {filteredBusinesses.length === 0 ? (
                  <div className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl">
                    <div className="w-16 h-16 rounded-3xl bg-stone-200 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-stone-400" />
                    </div>
                    <h3 className="text-sm font-black text-stone-700 mb-1">کسب‌وکاری با این فیلترها یافت نشد</h3>
                    <p className="text-[11px] text-stone-500 font-bold mb-4">فیلترها را تغییر دهید یا همه را پاک کنید</p>
                    <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all">
                      <RefreshCw className="w-3.5 h-3.5" />
                      پاک کردن همه فیلترها
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                      {filteredBusinesses.map((b, idx) => {
                        const Icon = b.icon;
                        return (
                          <motion.div
                            key={b.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -6 }}
                            className="bg-white rounded-3xl border-2 border-stone-200 hover:border-blue-400 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-lg"
                          >
                            <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${b.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                            <div className="relative flex items-start gap-3 mb-3">
                              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-black text-stone-900 text-xs leading-snug mb-1">{b.name}</h4>
                                <div className="flex items-center gap-1.5">
                                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                                    <Star className="w-3 h-3 fill-current text-amber-500" />
                                    <span className="text-[9px] font-black text-amber-800">{b.rating.toLocaleString("fa-IR")}</span>
                                  </div>
                                  <span className="text-[9px] text-stone-400 font-bold">
                                    {b.distanceKm.toFixed(1)} کیلومتر
                                  </span>
                                </div>
                              </div>
                            </div>

                            <p className="relative text-[10px] text-stone-600 font-bold leading-relaxed mb-3 line-clamp-2">
                              {b.notes}
                            </p>

                            <div className="relative space-y-1.5 text-[10px] font-bold text-stone-600 pt-3 border-t border-stone-100">
                              <div className="flex items-center gap-1.5 justify-end">
                                <span className="truncate">{b.address}</span>
                                <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                              </div>
                              <div className="flex items-center gap-1.5 justify-end">
                                <span dir="ltr" className="font-mono">{b.phone}</span>
                                <PhoneCall className="w-3 h-3 text-blue-500 shrink-0" />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================== */}
            {/* HANGOUTS SECTION */}
            {/* ========================================== */}
            {activeSubSection === "hangouts" && (
              <motion.div
                key="hangouts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {hangouts.map((spot, idx) => {
                  const Icon = spot.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="bg-gradient-to-br from-stone-50 to-white border-2 border-stone-200 hover:border-amber-300 rounded-3xl p-5 relative overflow-hidden group shadow-sm hover:shadow-lg transition-all"
                    >
                      <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${spot.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                      <div className="relative flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${spot.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <span className="text-[9px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full inline-block mb-1.5">
                            پاتوق هموطنان در {spot.city}
                          </span>
                          <h4 className="font-black text-stone-900 text-xs sm:text-sm leading-snug">{spot.title}</h4>
                        </div>
                      </div>

                      <div className="relative space-y-2">
                        <div className="bg-white border border-stone-200 rounded-xl p-2.5 text-[10px] font-bold text-stone-500 flex items-center gap-1.5">
                          <Landmark className="w-3 h-3 text-stone-400" />
                          <span className="text-stone-700">نوع: {spot.type}</span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-bold leading-relaxed">{spot.activity}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-700 pt-2 border-t border-stone-200">
                          <Clock className="w-3 h-3" />
                          <span>ساعت پرتردد: {spot.crowdBusiest}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ========================================== */}
            {/* MARKETS SECTION */}
            {/* ========================================== */}
            {activeSubSection === "mercadillos" && (
              <motion.div
                key="mercadillos"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Info Banner */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shrink-0">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-amber-950 text-sm mb-1">دانستنی فلومارکت‌های اتریش (Flohmarkt)</h4>
                    <p className="text-[11px] text-amber-900 font-bold leading-relaxed">
                      شنبه‌بازار عتیقه‌جات و لوازم دست دوم وین (Naschmarkt Flohmarkt) بزرگترین و جذاب‌ترین بازار در اتریش است
                      که انواع لوازم دست دوم صوتی، کتب یادگیری زبان آلمانی اتریشی، اسباب بازی و میزهای ایکیا را با بهایی ناچیز
                      می‌توانید شکار کنید. بازار برون‌مارکت (Brunnenmarkt) نیز با تنوع چندفرهنگی و فروشندگان فارسی‌زبان،
                      گزینه‌ای عالی برای خرید روزمره است.
                    </p>
                  </div>
                </div>

                {/* Markets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {weeklyMarkets.map((m, index) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.06 }}
                        whileHover={{ y: -6 }}
                        className="bg-white border-2 border-stone-200 hover:border-red-300 rounded-3xl p-5 relative overflow-hidden group shadow-sm hover:shadow-lg transition-all"
                      >
                        <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${m.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                        <div className="relative flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-full inline-block mb-1.5">
                              🎖️ تا {m.savingPercent}% پس‌انداز
                            </span>
                            <h4 className="font-black text-stone-900 text-xs sm:text-sm leading-snug">{m.name}</h4>
                          </div>
                        </div>

                        <div className="relative space-y-2">
                          <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-bold">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>🕒 زمان: <strong className="text-stone-800">{m.dayText}</strong></span>
                            <span className="text-stone-300">|</span>
                            <span className="text-stone-800 font-mono">{m.hours}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-[10px] text-stone-500 font-bold">
                            <MapPin className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                            <span>📍 {m.location}</span>
                          </div>
                          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-[10px] font-bold text-emerald-800 leading-relaxed">
                            <span className="text-emerald-700">🌟 چه چیزهایی پیدا می‌شود؟ </span>
                            {m.cheapItems}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              چرا کشف محله‌ها و بازارها اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              آمار و حقایقی درباره زندگی اقتصادی و اجتماعی در اتریش
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wallet, title: "۶۰٪", text: "صرفه‌جویی در خرید لوازم دست دوم از فلومارکت‌های وین", color: "from-red-500 to-rose-600" },
              { icon: Users, title: "۸۰,۰۰۰", text: "بازدیدکننده هفتگی از بازار برون‌مارکت وین (پربازدیدترین بازار شهر)", color: "from-amber-500 to-orange-600" },
              { icon: Store, title: "۴۰۰+", text: "فروشنده در فلومارکت هفتگی ناشت‌مارکت وین", color: "from-blue-500 to-indigo-600" },
              { icon: Heart, title: "۵,۰۰۰+", text: "جمعیت فارسی‌زبان مقیم وین — فرصت‌های شبکه‌سازی", color: "from-emerald-500 to-teal-600" },
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
              سوالات متداول درباره محله‌ها و بازارها
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
              کنار شما در کشف اتریش
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">کسب‌وکار خود را به رادار اضافه کنید</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر کسب‌وکار شما خدمات فارسی‌زبانان را در اتریش ارائه می‌دهد (رستوران، سوپرمارکت، ترجمه، پزشکی و...)،
              از طریق کانال‌های ارتباطی با ما تماس بگیرید. پس از بررسی و تأیید، اطلاعات شما به رادار اضافه خواهد شد.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> ثبت در واتس‌اپ
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
              این ابزار صرفاً جنبه راهنمایی دارد و اطلاعات ممکن است بدون اطلاع تغییر کند.
              همیشه قبل از مراجعه، ساعات کاری، آدرس و شماره تماس را با منابع رسمی تأیید کنید.
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است و مسئولیتی در قبال کیفیت خدمات
              کسب‌وکارها یا تغییرات برنامه‌ها ندارد.
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
              "فلومارکت وین", "ناشت مارکت وین", "بازار برون مارکت",
              "پاتوق فارسی زبانان وین", "فلومارکت اتریش", "بازار ارزان وین",
              "کسب و کار ایرانی وین", "رستوران ایرانی وین", "سوپرمارکت ایرانی گراتس",
              "محله فارسی زبانان وین", "دورهمی هموطنان", "بازار ویکتور آدلر",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all cursor-default">#{tag}</span>
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