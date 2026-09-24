import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, Shield, Train, Euro, Trees, Users, GraduationCap,
  Building2, Home, Star, TrendingUp, ArrowUpRight, ChevronDown,
  ChevronLeft, Sparkles, Award, Compass, Landmark, CheckCircle,
  Info, Heart, Sun, Coffee, Baby, Briefcase, Zap, Globe,
  BarChart3, Calculator, MapPinned, Quote, PhoneCall, Send,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";

// ==========================================
// IMAGES (Vienna-themed, hosted assets)
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80",
  inner: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
  family: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  modern: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// DISTRICT DATA — 23 Vienna Districts grouped
// ==========================================
type District = {
  id: number;
  name: string;
  nameDe: string;
  group: "inner" | "family" | "modern" | "green";
  score: number; // 0-100
  rent: number; // €/m²
  safety: number; // 1-5
  transit: number; // 1-5
  green: number; // 1-5
  vibe: string;
  tags: string[];
};

const DISTRICTS: District[] = [
  { id: 1,  name: "اینره اشتات",   nameDe: "Innere Stadt",  group: "inner",  score: 88, rent: 24.5, safety: 5, transit: 5, green: 3, vibe: "قلب تاریخی و لوکس وین", tags: ["لوکس","توریستی","اداری"] },
  { id: 2,  name: "لئوپولداشتات",  nameDe: "Leopoldstadt",  group: "inner",  score: 82, rent: 18.5, safety: 4, transit: 5, green: 4, vibe: "پارک پراتر و جامعه چندفرهنگی", tags: ["پارک","چندفرهنگی","مترو"] },
  { id: 3,  name: "لنداشتراسه",    nameDe: "Landstraße",    group: "inner",  score: 85, rent: 19.8, safety: 5, transit: 5, green: 4, vibe: "سفارت‌ها و بلوارهای اشرافی", tags: ["سفارت","مدرن","مترو"] },
  { id: 4,  name: "ویدن",          nameDe: "Wieden",        group: "inner",  score: 86, rent: 21.0, safety: 5, transit: 5, green: 3, vibe: "بازار نصر و کافه‌های هنری", tags: ["بازار","هنری","مرکزی"] },
  { id: 5,  name: "مارگارتن",      nameDe: "Margareten",    group: "inner",  score: 78, rent: 17.5, safety: 4, transit: 5, green: 3, vibe: "خانوادگی و متنوع", tags: ["خانوادگی","ارزان‌تر"] },
  { id: 6,  name: "ماریاهیلف",     nameDe: "Mariahilf",     group: "inner",  score: 84, rent: 20.2, safety: 5, transit: 5, green: 3, vibe: "خیابان خرید ماریاهیلفر", tags: ["خرید","شلوغ","جوان"] },
  { id: 7,  name: "نوی‌باو",        nameDe: "Neubau",        group: "inner",  score: 85, rent: 20.5, safety: 5, transit: 5, green: 3, vibe: "هنر، طراحان و شب‌زنده‌داری", tags: ["هنری","بوتیک","جوان"] },
  { id: 8,  name: "یوزف‌اشتات",     nameDe: "Josefstadt",    group: "inner",  score: 87, rent: 21.5, safety: 5, transit: 5, green: 3, vibe: "آرام و اشرافیِ مرکزی", tags: ["آرام","گران","کلاسیک"] },
  { id: 9,  name: "آلسرگروند",     nameDe: "Alsergrund",    group: "inner",  score: 86, rent: 20.0, safety: 5, transit: 5, green: 3, vibe: "دانشگاهی و پزشکی", tags: ["دانشگاهی","بیمارستان","آرام"] },
  { id: 10, name: "فاووریتن",      nameDe: "Favoriten",     group: "modern", score: 72, rent: 13.8, safety: 3, transit: 5, green: 3, vibe: "پرجمعیت، در حال تحول", tags: ["ارزان","چندفرهنگی","مرکز خرید"] },
  { id: 11, name: "زیمرینگ",       nameDe: "Simmering",     group: "modern", score: 74, rent: 13.2, safety: 3, transit: 4, green: 3, vibe: "صنعتی-مسکونی، ارزان", tags: ["ارزان","کارگری","صنعتی"] },
  { id: 12, name: "مایدلینگ",      nameDe: "Meidling",      group: "modern", score: 77, rent: 15.0, safety: 4, transit: 5, green: 3, vibe: "اتصال عالی، قیمت متوسط", tags: ["مترو","قطار","متوسط"] },
  { id: 13, name: "هیتسینگ",       nameDe: "Hietzing",      group: "green",  score: 90, rent: 22.5, safety: 5, transit: 4, green: 5, vibe: "کاخ شونبرون و اشراف", tags: ["لوکس","سبز","آرام"] },
  { id: 14, name: "پنزینگ",        nameDe: "Penzing",       group: "family", score: 79, rent: 15.5, safety: 4, transit: 4, green: 4, vibe: "خانوادگی با فضای سبز", tags: ["خانوادگی","سبز","متوسط"] },
  { id: 15, name: "رودولفشیم-فونفهاوس", nameDe: "Rudolfsheim-Fünfhaus", group: "modern", score: 70, rent: 14.5, safety: 3, transit: 5, green: 2, vibe: "چندفرهنگی و پرجنب‌وجوش", tags: ["چندفرهنگی","ارزان","مرکزی"] },
  { id: 16, name: "اتاکرینگ",      nameDe: "Ottakring",     group: "family", score: 75, rent: 14.8, safety: 3, transit: 5, green: 3, vibe: "جوان، بالکان‌نشین، پرانرژی", tags: ["جوان","فرهنگی","ارزان"] },
  { id: 17, name: "هرنالز",        nameDe: "Hernals",       group: "green",  score: 80, rent: 16.0, safety: 4, transit: 4, green: 5, vibe: "تپه‌های سبز و آرام", tags: ["سبز","آرام","تپه"] },
  { id: 18, name: "واهرینگ",       nameDe: "Währing",       group: "green",  score: 84, rent: 18.0, safety: 5, transit: 4, green: 4, vibe: "اشرافی-آرام، خانواده‌پسند", tags: ["آرام","خانوادگی","کلاسیک"] },
  { id: 19, name: "دوبلینگ",       nameDe: "Döbling",       group: "green",  score: 91, rent: 23.0, safety: 5, transit: 4, green: 5, vibe: "تاکستان‌ها و ویلاهای گران", tags: ["لوکس","تاکستان","سبز"] },
  { id: 20, name: "بریگیتنau",     nameDe: "Brigittenau",   group: "modern", score: 73, rent: 14.0, safety: 3, transit: 5, green: 3, vibe: "کنار دانوب، در حال رشد", tags: ["دانوب","ارزان","مترو"] },
  { id: 21, name: "فلوریدسدورف",   nameDe: "Floridsdorf",   group: "family", score: 78, rent: 14.2, safety: 4, transit: 4, green: 4, vibe: "خانوادگی، شمال دانوب", tags: ["خانوادگی","شمال","سبز"] },
  { id: 22, name: "دوناواشتات",    nameDe: "Donaustadt",    group: "family", score: 82, rent: 15.5, safety: 4, transit: 4, green: 5, vibe: "مدرن، آسمان‌خراش‌های دانوب", tags: ["مدرن","دانوب","خانوادگی"] },
  { id: 23, name: "لیزینگ",        nameDe: "Liesing",       group: "family", score: 81, rent: 15.0, safety: 5, transit: 3, green: 5, vibe: "آرام، دامنه‌های وینرwald", tags: ["آرام","سبز","خانوادگی"] },
];

// ==========================================
// GROUP PRESETS
// ==========================================
const GROUPS = [
  {
    id: "inner",
    title: "مناطق داخلی (توریستی و گران)",
    subtitle: " districts 1–9 · قلب تاریخی وین",
    image: IMAGES.inner,
    gradient: "from-rose-600 to-[#c8102e]",
    accent: "text-[#c8102e]",
    icon: Landmark,
    description:
      "مناطق ۱ تا ۹ هسته تاریخی وین را می‌سازند. دسترسی مترو در حد بی‌نظیر، فاصله پیاده تا اپرای دولتی، کلیسای اشتفان و خیابان‌های خرید لوکس. قیمت اجاره بالاست اما برای کسانی که «زندگی در قلب اروپا» را می‌خواهند، بی‌رقیب است.",
    pros: ["دسترسی پیاده به همه‌چیز", "مترو در هر گوشه", "فرهنگ و کافه‌های بی‌نظیر"],
    cons: ["گران‌ترین اجاره‌ها", "پارکینگ تقریباً ناموجود", "شلوغی توریستی"],
    idealFor: "جوانان مجرد، دانشجوها، افراد حرفه‌ای بدون خودرو",
  },
  {
    id: "family",
    title: "مناطق خانوادگی و آرام",
    subtitle: "districts 21–23 · فضای سبز و مدارس",
    image: IMAGES.family,
    gradient: "from-emerald-600 to-teal-600",
    accent: "text-emerald-600",
    icon: Baby,
    description:
      "مناطق ۲۱ تا ۲۳ (فلوریدسدورف، دوناواشتات و لیزینگ) شمال و جنوب دانوب، انتخاب اول خانواده‌های ایرانی در وین هستند. آپارتمان‌های بزرگ‌تر، پارک‌های متعدد، مدارس خوب و اجاره‌های منطقی — همه در فاصله ۲۰ تا ۳۰ دقیقه با مترو از مرکز.",
    pros: ["آپارتمان‌های بزرگ‌تر با قیمت منطقی", "پارک‌ها و زمین بازی فراوان", "مدارس و مهدکودک‌های خوب"],
    cons: ["وابستگی بیشتر به مترو", "شب‌های آرام‌تر (نه برای شب‌زنده‌دارها)"],
    idealFor: "خانواده‌های با فرزند، زوج‌های جوان در حال خانه‌دار شدن",
  },
  {
    id: "modern",
    title: "مناطق مدرن و در حال تحول",
    subtitle: "districts 10, 11, 12, 15, 20 · رشد قیمت سریع",
    image: IMAGES.modern,
    gradient: "from-indigo-600 to-blue-700",
    accent: "text-indigo-600",
    icon: Building2,
    description:
      "مناطقی مانند فاووریتن، زیمرینگ، مایدلینگ و بریگیتنau ترکیبی از اجاره‌های ارزان، پروژه‌های نوسازی شهری و جامعه‌ای چندفرهنگی هستند. برای تازه‌واردها و بودجه‌های محدود، این مناطق بهترین نقطه شروع محسوب می‌شوند.",
    pros: ["ارزان‌ترین اجاره‌های وین", "پروژه‌های نوسازی و آینده‌رو", "تنوع فرهنگی بالا"],
    cons: ["کیفیت محله در سطح خیابان متفاوت است", "برخی محلات نیازمند تحقیق دقیق"],
    idealFor: "تازه‌واردها، دانشجوها، کارمندان با بودجه محدود",
  },
  {
    id: "green",
    title: "مناطق سبز و لوکس",
    subtitle: "districts 13, 17, 18, 19 · دامنه‌های وینرwald",
    image: IMAGES.hero,
    gradient: "from-amber-500 to-orange-600",
    accent: "text-amber-600",
    icon: Trees,
    description:
      "هیتسینگ، واهرینگ، دوبلینگ و هرنالز در دامنه‌های جنگل وین قرار دارند و ترکیبی از آرامش، هوای پاک و معماری اشرافی هستند. کاخ شونبرون، تاکستان‌های گریزینگ و ویلاهای تاریخی اینجا هستند.",
    pros: ["هوای پاک و طبیعت در دسترس", "محلات بسیار امن", "معماری زیبا و ویلا"],
    cons: ["گران‌ترین مناطق بعد از مرکز", "کمتر مناسب زندگی بدون خودرو"],
    idealFor: "خانواده‌های مرفه، بازنشسته‌ها، عاشقان طبیعت",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۲۳", label: "منطقه (Bezirke)", icon: MapPinned },
  { value: "€13.2", label: "ارزان‌ترین اجاره (€/m²)", icon: Euro },
  { value: "€24.5", label: "گران‌ترین اجاره (€/m²)", icon: TrendingUp },
  { value: "۵ خط", label: "مترو (U1–U6)", icon: Train },
];

// ==========================================
// COMPARISON CRITERIA
// ==========================================
const CRITERIA = [
  { key: "rent", label: "اجاره (€/m²)", icon: Euro, invert: true },
  { key: "safety", label: "امنیت", icon: Shield, invert: false },
  { key: "transit", label: "دسترسی مترو", icon: Train, invert: false },
  { key: "green", label: "فضای سبز", icon: Trees, invert: false },
] as const;

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "بهترین منطقه وین برای یک خانواده ایرانی کجاست؟",
    a: "برای خانواده‌ها، مناطق ۲۲ (دوناواشتات)، ۲۱ (فلوریدسدورف) و ۲۳ (لیزینگ) به دلیل آپارتمان‌های بزرگ‌تر، پارک‌های فراوان، مدارس خوب و اجاره‌های منطقی معمولاً انتخاب اول هستند. منطقه ۱۸ (واهرینگ) هم برای خانواده‌های مرفه گزینه ایده‌آلی است.",
  },
  {
    q: "ارزان‌ترین مناطق وین برای اجاره کدام‌اند؟",
    a: "طبق داده‌های ۲۰۲۴، مناطق ۱۱ (زیمرینگ)، ۱۰ (فاووریتن)، ۲۰ (بریگیتنau) و ۱۵ (رودولفشیم-فونفهاوس) با میانگین اجاره‌ای بین ۱۳ تا ۱۵ یورو در هر متر مربع، ارزان‌ترین گزینه‌ها محسوب می‌شوند.",
  },
  {
    q: "آیا مناطق ارزان وین امن هستند؟",
    a: "به طور کلی وین یکی از امن‌ترین پایتخت‌های جهان است. اما در مناطق ۱۰، ۱۱ و ۱۵، کیفیت محله‌به‌محله متفاوت است. توصیه می‌کنیم قبل از اجاره، در ساعات مختلف شبانه‌روز از محله بازدید کنید و از ساکنان محلی سوال بپرسید.",
  },
  {
    q: "منطقه ۱ وین برای زندگی ارزش دارد؟",
    a: "منطقه ۱ (اینره اشتات) قلب تاریخی وین است. اگر عاشق زندگی شهری، کافه‌های کلاسیک و دسترسی پیاده به همه‌چیز هستید، بی‌نظیر است. اما اجاره‌ها بسیار بالا، پارکینگ تقریباً ناموجود و صدای توریست‌ها ۲۴ ساعته شنیده می‌شود.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const NeighborhoodComparison: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("inner");
  const [sortKey, setSortKey] = useState<"score" | "rent" | "safety" | "transit" | "green">("score");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredDistricts = useMemo(() => {
    const list = DISTRICTS.filter((d) => d.group === activeGroup);
    return [...list].sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      // For rent, ascending (cheaper first). For others, descending.
      return sortKey === "rent" ? av - bv : bv - av;
    });
  }, [activeGroup, sortKey]);

  const activeGroupData = GROUPS.find((g) => g.id === activeGroup)!;

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "ماتریس مقایسه‌ای مناطق ۲۳ گانه وین | راهنمای کامل انتخاب محله",
      description:
        "مقایسه هوشمند مناطق وین بر اساس امنیت، دسترسی به مترو، فضای سبز و قیمت مسکن. راهنمای کامل برای ایرانیان و فارسی‌زبانان مقیم اتریش.",
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
      name: "مناطق ۲۳ گانه وین",
      itemListElement: DISTRICTS.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.name} (${d.nameDe})`,
        description: d.vibe,
      })),
    },
  ];

  return (
    <GuideContainer
      title="ماتریس مقایسه محلات وین"
      description="بررسی هوشمندِ شاخص‌های امنیت، دسترسی به مترو، فضای سبز و قیمت مسکن در مناطق ۲۳ گانه وین — راهنمای نهایی انتخاب محله برای فارسی‌زبانان"
    >
      <SEO
        title="ماتریس مقایسه مناطق ۲۳ گانه وین ۲۰۲۵ | امنیت، مترو و قیمت مسکن"
        description="مقایسه کامل ۲۳ منطقه وین (Bezirke) بر اساس امنیت، دسترسی به مترو U-Bahn، فضای سبز، قیمت اجاره و کیفیت زندگی. راهنمای انتخاب محله برای ایرانیان و فارسی‌زبانان مقیم اتریش."
        keywords="مناطق وین, محلات وین, اجاره خانه وین, بهترین منطقه وین, Bezirke Wien, زندگی در وین, ایرانیان وین, قیمت مسکن وین, امنیت وین, مترو وین"
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
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="نمای شهر وین اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/80 via-[#38100e]/70 to-[#9e142d]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🏙️
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای تخصصی زندگی در اتریش
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              کدام منطقه وین برای زندگی شما مناسب است؟
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              از کاخ‌های اشرافی منطقه ۱ تا آپارتمان‌های مدرن دوناواشتات — انتخاب محله در وین
              یکی از مهم‌ترین تصمیم‌های زندگی مهاجرتی شماست. این ماتریس مقایسه‌ای، ۲۳ منطقه وین را
              بر اساس <strong className="text-amber-300">امنیت</strong>، <strong className="text-amber-300">دسترسی مترو</strong>،
              <strong className="text-amber-300"> فضای سبز</strong> و <strong className="text-amber-300">قیمت مسکن</strong> به صورت
              دینامیک و شفاف مقایسه می‌کند.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>۲۳ منطقه بررسی‌شده</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <Shield className="w-3.5 h-3.5" />
                <span>داده‌های ۲۰۲۵</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                <Heart className="w-3.5 h-3.5" />
                <span>تجربه واقعی ساکنان</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#matrix"
                className="inline-flex items-center gap-2 bg-white text-[#9e142d] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                مشاهده ماتریس مقایسه
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره رایگان محله
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
        {/* GROUP SELECTOR — TABS */}
        {/* ========================================== */}
        <div>
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#c8102e]" />
                دسته‌بندی هوشمند مناطق
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                چهار خوشه اصلی شخصیتی — روی هر کدام کلیک کنید تا مقایسه به‌روز شود
              </p>
            </div>
            <span className="text-[10px] font-black text-[#c8102e] bg-red-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              داده‌ها زنده
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GROUPS.map((g) => {
              const Icon = g.icon;
              const isActive = activeGroup === g.id;
              return (
                <motion.button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-4 text-right transition-all ${
                    isActive
                      ? "border-[#c8102e] shadow-lg shadow-red-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${g.gradient} opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2`} />
                  <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${g.gradient} flex items-center justify-center text-white shadow-md mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative text-xs font-black text-stone-900 leading-tight">
                    {g.title}
                  </div>
                  <div className="relative text-[9px] text-stone-500 font-bold mt-1">
                    {g.subtitle}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* ACTIVE GROUP — HERO CARD WITH IMAGE */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
          >
            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                <img
                  src={activeGroupData.image}
                  alt={activeGroupData.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${activeGroupData.gradient} opacity-30 mix-blend-multiply`} />
                <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                  <MapPin className="w-3 h-3 text-[#c8102e]" />
                  {activeGroupData.subtitle}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeGroupData.accent} mb-3`}>
                  <Zap className="w-3 h-3" />
                  تحلیل اختصاصی اتریش‌نشین
                </div>

                <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                  {activeGroupData.title}
                </h3>

                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                  {activeGroupData.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 mb-2">
                      <CheckCircle className="w-3.5 h-3.5" />
                      مزایا
                    </div>
                    <ul className="space-y-1">
                      {activeGroupData.pros.map((p, i) => (
                        <li key={i} className="text-[10px] text-emerald-800 font-bold leading-snug">
                          • {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-700 mb-2">
                      <Info className="w-3.5 h-3.5" />
                      چالش‌ها
                    </div>
                    <ul className="space-y-1">
                      {activeGroupData.cons.map((p, i) => (
                        <li key={i} className="text-[10px] text-rose-800 font-bold leading-snug">
                          • {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3 flex items-start gap-2">
                  <Users className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-stone-700 mb-0.5">
                      مناسب برای:
                    </div>
                    <div className="text-[10px] text-stone-600 font-bold leading-snug">
                      {activeGroupData.idealFor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* MATRIX — DYNAMIC TABLE */}
        {/* ========================================== */}
        <div id="matrix" className="scroll-mt-24">
          <div className="flex items-end justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#c8102e]" />
                ماتریس مقایسه‌ای مناطق
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                مرتب‌سازی دینامیک — روی هر ستون کلیک کنید
              </p>
            </div>
          </div>

          {/* Sort chips */}
          <div className="flex gap-2 flex-wrap mb-4">
            {[
              { key: "score", label: "امتیاز کلی", icon: Award },
              { key: "rent", label: "ارزان‌ترین", icon: Euro },
              { key: "safety", label: "امن‌ترین", icon: Shield },
              { key: "transit", label: "مترو", icon: Train },
              { key: "green", label: "سبزترین", icon: Trees },
            ].map((s) => {
              const Icon = s.icon;
              const isActive = sortKey === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setSortKey(s.key as any)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Matrix cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDistricts.map((d, i) => (
              <DistrictCard key={d.id} district={d} index={i} />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* INSIGHT BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-indigo-700 mb-1">
                نکته کلیدی اتریش‌نشین
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                در وین، «آدرس» تنها یک مکان نیست؛ یک سبک زندگی است. بر خلاف بسیاری از
                شهرهای اروپایی، تفاوت امنیت بین مناطق وین بسیار کم است، اما تفاوت در
                <strong className="text-indigo-700"> دسترسی، نور طبیعی، سر و صدا و فضای سبز</strong> می‌تواند کیفیت زندگی
                شما را به شدت تغییر دهد. پیشنهاد ما: قبل از امضای قرارداد، حتماً یک‌بار در
                ساعات شلوغی مترو و یک‌بار در شب از محله بازدید کنید.
              </p>
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
              نگاهی تصویری به سه سبک زندگی در وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از مرکز تاریخی تا حاشیه‌های سبز — هر تصویر، یک تجربه متفاوت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.inner,
                title: "زندگی در قلب تاریخی",
                subtitle: "مناطق ۱ تا ۹",
                desc: "کافه‌های کلاسیک، اپرای دولتی و بلوارهای اشرافی در فاصله پیاده.",
                icon: Landmark,
                gradient: "from-[#c8102e] to-[#970d22]",
              },
              {
                img: IMAGES.family,
                title: "زندگی خانوادگی و آرام",
                subtitle: "مناطق ۲۱ تا ۲۳",
                desc: "پارک‌ها، مدارس خوب و آپارتمان‌های بزرگ‌تر با قیمت منطقی.",
                icon: Baby,
                gradient: "from-emerald-600 to-teal-600",
              },
              {
                img: IMAGES.modern,
                title: "زندگی مدرن و رو به رشد",
                subtitle: "مناطق ۱۰ تا ۲۰",
                desc: "پروژه‌های نوسازی، جامعه چندفرهنگی و اجاره‌های ارزان‌تر.",
                icon: Building2,
                gradient: "from-indigo-600 to-blue-700",
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
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره مناطق وین
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
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              مشاوره رایگان انتخاب محله
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نمی‌دانید کدام منطقه برای شما مناسب است؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در وین، بر اساس بودجه، سبک زندگی و نیازهای
              شما بهترین محله را پیشنهاد می‌دهد. همین حالا پیام دهید.
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
              ارقام اجاره بر اساس میانگین بازار سال ۲۰۲۴–۲۰۲۵ ارائه شده‌اند و ممکن است
              بسته به نوع ملک، طبقه، امکانات و شرایط بازار تغییر کنند. این داده‌ها صرفاً
              جنبه راهنمایی دارند و جایگزین بازدید حضوری یا مشاوره املاک رسمی نیستند.
            </p>
          </div>
        </div>
      </div>
    </GuideContainer>
  );
};

// ==========================================
// DISTRICT CARD
// ==========================================
function DistrictCard({ district, index }: { key?: React.Key; district: District; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const scoreColor =
    district.score >= 85
      ? "from-emerald-500 to-green-600"
      : district.score >= 75
      ? "from-amber-500 to-orange-600"
      : "from-rose-500 to-red-600";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="bg-white rounded-3xl border border-stone-200 hover:border-stone-300 p-5 transition-all overflow-hidden relative group"
    >
      <div className="flex items-start gap-4">
        {/* Number badge */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${scoreColor} flex flex-col items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
          <span className="text-[9px] font-black opacity-80 leading-none">منطقه</span>
          <span className="text-xl font-black leading-tight">{district.id}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="text-sm font-black text-stone-900">{district.name}</h3>
            <span className="text-[9px] font-bold text-stone-400 font-mono" dir="ltr">
              {district.nameDe}
            </span>
          </div>
          <p className="text-[10px] text-stone-500 font-bold leading-snug mb-3">
            {district.vibe}
          </p>

          {/* Criteria bars */}
          <div className="space-y-2">
            {CRITERIA.map((c) => {
              const Icon = c.icon;
              const raw = district[c.key as keyof District] as number;
              const normalized =
                c.key === "rent"
                  ? Math.max(0, Math.min(100, ((25 - raw) / 12) * 100))
                  : (raw / 5) * 100;
              return (
                <div key={c.key} className="flex items-center gap-2">
                  <div className="w-20 flex items-center gap-1 text-[9px] font-black text-stone-500">
                    <Icon className="w-3 h-3" />
                    <span>{c.label.split(" ")[0]}</span>
                  </div>
                  <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${normalized}%` }}
                      transition={{ delay: index * 0.04 + 0.2, duration: 0.6 }}
                      className={`h-full rounded-full bg-gradient-to-r ${scoreColor}`}
                    />
                  </div>
                  <span className="w-10 text-[9px] font-black text-stone-600 text-left font-mono" dir="ltr">
                    {c.key === "rent" ? `€${raw}` : `${raw}/5`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {district.tags.map((t, i) => (
              <span
                key={i}
                className="text-[9px] font-black text-stone-500 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-full"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Score circle */}
        <div className="flex-shrink-0 text-center">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${scoreColor} flex items-center justify-center text-white shadow-md`}>
            <span className="text-sm font-black">{district.score}</span>
          </div>
          <div className="text-[8px] font-black text-stone-400 mt-1">امتیاز</div>
        </div>
      </div>
    </motion.div>
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

export default NeighborhoodComparison;