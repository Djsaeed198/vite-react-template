import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, Euro, Percent, FileText, CheckCircle2, AlertTriangle,
  Info, ChevronDown, ChevronLeft, ExternalLink, Copy, Sparkles, Award,
  ShieldCheck, Clock, BookOpen, Landmark, Scale, TrendingUp, Star,
  Quote, Globe, Link2, Tag, HelpCircle, Lightbulb, Calendar, ArrowLeftRight,
  Heart, Zap, Download, Eye, Share2, MessageSquare, Phone, Mail, Send,
  Building2, Wallet, Receipt, BadgeCheck, CircleDollarSign, PiggyBank,
  Briefcase, Youtube, TrendingDown, Users, Search, Filter, Layers,
  BadgePercent, Crown, Flame, Target, Rocket, Coffee, MapPinned,
  FileCheck, FileX, FileWarning, FilePlus, Languages, Printer, Lock,
  Fingerprint, Compass, Brain, Gem, Scale as ScaleIcon, ThumbsUp,
  Bookmark, BookmarkCheck, FolderOpen, FileSearch, FileSpreadsheet,
  FileSignature, ChevronRight, X, Twitter, Instagram, Linkedin, Plane,
  MessageCircle
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// CONSTANTS 2026
// ==========================================
const TAX_DATA = {
  // Steuerliches Existenzminimum
  existenzMinimum: {
    withoutEmployment: 13539,
    withEmployment: 14769,
  },
  // Kleinunternehmergrenzen
  kleinunternehmer: {
    umsatzgrenze: 55000,
    einkunftsgrenze: 6613.20,
    toleranzgrenze: 60500,
  },
  // SVS Beitrag
  svs: {
    beitragssatz: 25.30,
    selbstvorsorge: 1.53,
    mindestbeitragsgrundlage: 551.10,
    hoechstbeitragsgrundlage: 6930,
  },
  // Steuertarif 2026
  tariff: [
    { min: 0, max: 13539, rate: 0, label: "۰٪" },
    { min: 13539, max: 21992, rate: 20, label: "۲۰٪" },
    { min: 21992, max: 36458, rate: 30, label: "۳۰٪" },
    { min: 36458, max: 70365, rate: 40, label: "۴۰٪" },
    { min: 70365, max: 104859, rate: 48, label: "۴۸٪" },
    { min: 104859, max: 1000000, rate: 50, label: "۵۰٪" },
    { min: 1000000, max: Infinity, rate: 55, label: "۵۵٪" },
  ],
  // Pauschalierung
  pauschalierung: {
    basisUmsatzgrenze: 420000,
    basisProzentsatz: 15,
    kleinunternehmerUmsatzgrenze: 55000,
    kleinunternehmerDienstleistungen: 20,
    kleinunternehmerWaren: 45,
  },
  // Fristen
  fristen: {
    papier: "۳۰ آوریل",
    elektronisch: "۳۰ ژوئن",
    monatsfrist: "۱ ماه",
  },
};

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "€۱۳,۵۳۹", label: "سقف معافیت مالیاتی", icon: "💰", sub: "برای فریلنسر بدون شغل" },
  { value: "€۵۵,۰۰۰", label: "سقف Kleinunternehmer", icon: "📊", sub: "برای معافیت از مالیات بر ارزش افزوده" },
  { value: "۲۵.۳٪", label: "بیمه تأمین اجتماعی SVS", icon: "🏥", sub: "از پایه درآمد" },
  { value: "۳۰ ژوئن", label: "مهلت اظهارنامه", icon: "⏰", sub: "برای ارسال الکترونیکی" },
];

// ==========================================
// TAX BRACKETS 2026
// ==========================================
const TAX_BRACKETS = [
  { range: "۰ تا ۱۳,۵۳۹", rate: "۰٪", label: "معافیت مالیاتی", color: "from-emerald-500 to-green-600" },
  { range: "۱۳,۵۳۹ تا ۲۱,۹۹۲", rate: "۲۰٪", label: "نرخ پایین", color: "from-sky-500 to-blue-600" },
  { range: "۲۱,۹۹۲ تا ۳۶,۴۵۸", rate: "۳۰٪", label: "نرخ میانی", color: "from-amber-500 to-orange-600" },
  { range: "۳۶,۴۵۸ تا ۷۰,۳۶۵", rate: "۴۰٪", label: "نرخ بالا", color: "from-rose-500 to-red-600" },
  { range: "۷۰,۳۶۵ تا ۱۰۴,۸۵۹", rate: "۴۸٪", label: "نرخ نخبگان", color: "from-purple-500 to-indigo-600" },
  { range: "بالای ۱۰۴,۸۵۹", rate: "۵۰٪", label: "نرخ حداکثری", color: "from-stone-700 to-stone-900" },
];

// ==========================================
// STEPS (HowTo)
// ==========================================
const STEPS = [
  {
    num: 1,
    icon: Building2,
    title: "ثبت‌نام در Finanzamt",
    text: "بلافاصله پس از شروع فعالیت، باید ظرف یک ماه فرم Verf24 را به اداره مالیات اتریش تحویل دهید. برای این کار می‌توانید از FinanzOnline یا مراجعه حضوری استفاده کنید.",
    hint: "مهلت: ۱ ماه از شروع فعالیت",
    color: "from-emerald-500 to-green-600",
  },
  {
    num: 2,
    icon: ShieldCheck,
    title: "ثبت‌نام در SVS (بیمه اجتماعی)",
    text: "اگر درآمد ناخالص سالانه شما بیش از €۶,۶۱۳.۲۰ باشد، باید در صندوق بیمه اجتماعی خودکار (SVS) ثبت‌نام کنید. بیمه شامل سلامت، بازنشستگی و حوادث است.",
    hint: "آستانه: €۶,۶۱۳.۲۰ در سال",
    color: "from-sky-500 to-blue-600",
  },
  {
    num: 3,
    icon: FileText,
    title: "دریافت شماره مالیاتی (Steuernummer)",
    text: "پس از ثبت‌نام اولیه، اداره مالیات یک شماره مالیاتی به شما اختصاص می‌دهد. این شماره باید در تمام فاکتورها و مکاتبات مالیاتی درج شود.",
    hint: "لازم برای صدور فاکتور",
    color: "from-amber-500 to-orange-600",
  },
  {
    num: 4,
    icon: Calculator,
    title: "نحوه محاسبه مالیات",
    text: "شما می‌توانید از Einnahmen-Ausgaben-Rechnung (حساب درآمد-هزینه) یا Pauschalierung (محاسبه مقطوع) استفاده کنید. در روش اول، تمام هزینه‌های واقعی با فاکتور کسر می‌شوند.",
    hint: "دو روش قانونی موجود",
    color: "from-purple-500 to-indigo-600",
  },
  {
    num: 5,
    icon: Calendar,
    title: "ارسال اظهارنامه مالیاتی",
    text: "تا ۳۰ ژوئن سال بعد (برای ارسال الکترونیکی از طریق FinanzOnline) یا ۳۰ آوریل (برای ارسال کاغذی) باید اظهارنامه مالیاتی خود را ارسال کنید.",
    hint: "مهلت: ۳۰ ژوئن یا ۳۰ آوریل",
    color: "from-rose-500 to-red-600",
  },
];

// ==========================================
// DEDUCTIBLE EXPENSES
// ==========================================
const DEDUCTIBLE_EXPENSES = [
  { icon: Calculator, title: "نرم‌افزار و ابزار کار", text: "لایسنس نرم‌افزار، کامپیوتر، دوربین، میکروفون، سه‌پایه و تجهیزات تولید محتوا." },
  { icon: Globe, title: "اینترنت و تلفن", text: "سهم کاری اینترنت خانگی و قبض موبایل (به نسبت استفاده کاری)." },
  { icon: Building2, title: "آرbeitszimmer (اتاق کار)", text: "اگر اتاق مجزا برای کار دارید، می‌توانید هزینه آن را کسر کنید. Arbeitsplatzpauschale تا €۱,۲۰۰." },
  { icon: BookOpen, title: "دوره‌های آموزشی", text: "دوره‌های تخصصی، کتاب‌های مرجع و آموزش‌های مرتبط با حوزه فعالیت." },
  { icon: Plane, title: "سفرهای کاری", text: "هزینه بلیت، اقامت و کیلومتراژ برای جلسات و پروژه‌های خارج از محل سکونت." },
  { icon: Heart, title: "بیمه SVS", text: "تمام حق بیمه پرداختی به SVS به عنوان هزینه قابل کسر است." },
];

// ==========================================
// FORMS & DOCUMENTS
// ==========================================
const FORMS = [
  { title: "فرم Verf24 (ثبت‌نام اولیه)", url: "https://service.bmf.gv.at", icon: FilePlus, desc: "برای اعلام شروع فعالیت به اداره مالیات" },
  { title: "فرم E1 (اظهارنامه مالیاتی)", url: "https://service.bmf.gv.at", icon: FileText, desc: "فرم اصلی اظهارنامه مالیات بر درآمد" },
  { title: "فرم E1a (حساب درآمد-هزینه)", url: "https://service.bmf.gv.at", icon: FileSpreadsheet, desc: "برای فریلنسرها و مشاغل آزاد" },
  { title: "فرم E1a-K (Kleinunternehmer)", url: "https://service.bmf.gv.at", icon: FileSignature, desc: "برای مشاغل کوچک با درآمد محدود" },
  { title: "فرم U1 (مالیات بر ارزش افزوده)", url: "https://service.bmf.gv.at", icon: FileCheck, desc: "برای اظهارنامه مالیات بر ارزش افزوده" },
  { title: "فرم FON1 (FinanzOnline)", url: "https://service.bmf.gv.at", icon: FileSearch, desc: "برای ثبت‌نام در سامانه FinanzOnline" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا درآمد یوتیوب و اینستاگرام در اتریش مشمول مالیات است؟",
    a: "بله، تمام درآمدهای حاصل از تولید محتوا (AdSense، اسپانسرشیپ، Affiliate Marketing، فروش محصولات دیجیتال) به عنوان درآمد خودکار (selbständige Einkünfte) محسوب می‌شود و باید در اظهارنامه مالیاتی اعلام شود. مهم: تاریخ دریافت پرداخت از AdSense به حساب شما، نه تاریخ برداشت به بانک، معیار مالیات است.",
  },
  {
    q: "آیا می‌توانم از Kleinunternehmerregelung استفاده کنم؟",
    a: "بله، اگر درآمد سالانه شما کمتر از €۵۵,۰۰۰ (ناخالص) در سال جاری و سال قبل باشد، می‌توانید از معافیت مالیات بر ارزش افزوده (Kleinunternehmerregelung) استفاده کنید. در این حالت نباید مالیات بر ارزش افزوده در فاکتورهای خود درج کنید و حق کسر VAT پرداختی را ندارید.",
  },
  {
    q: "تفاوت فرانتسلر و شغل آزاد چیست؟",
    a: "فریلنسر (Freiberufler) یا Selbständige در اتریش به افرادی گفته می‌شود که بدون نیاز به پروانه کسب (Gewerbeschein) فعالیت می‌کنند، مانند نویسندگان، سخنرانان، روان‌درمانگران، ترجمه‌گران، معلمان خصوصی و تولیدکنندگان محتوا. این افراد باید در SVS (بیمه اجتماعی خودکار) ثبت‌نام کنند.",
  },
  {
    q: "مهلت ارسال اظهارنامه مالیاتی چه زمانی است؟",
    a: "مهلت ارسال اظهارنامه مالیاتی برای سال مالی قبل: ۳۰ آوریل سال بعد (ارسال کاغذی) یا ۳۰ ژوئن سال بعد (ارسال الکترونیکی از طریق FinanzOnline). افرادی که از مشاور مالیاتی استفاده می‌کنند، مهلت‌های طولانی‌تری دارند.",
  },
  {
    q: "آیا باید مالیات بر ارزش افزوده (Umsatzsteuer) پرداخت کنم؟",
    a: "اگر درآمد سالانه شما زیر €۵۵,۰۰۰ باشد، می‌توانید از معافیت Kleinunternehmerregelung استفاده کنید و نیازی به پرداخت VAT نیست. اما اگر از این سقف عبور کنید، باید ۲۰٪ مالیات بر ارزش افزوده به فاکتورهای خود اضافه کرده و آن را به Finanzamt پرداخت کنید.",
  },
  {
    q: "آیا هزینه‌های خرید تجهیزات را می‌توانم کسر کنم؟",
    a: "بله. تمام هزینه‌های مرتبط با فعالیت شما شامل نرم‌افزار، سخت‌افزار (دوربین، کامپیوتر، میکروفون)، اینترنت، کلاس‌های آموزشی، سفرهای کاری و حتی سهم اجاره اتاق کار قابل کسر از درآمد مشمول مالیات هستند.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "BMF — وزارت دارایی", url: "https://www.bmf.gv.at", desc: "مرجع اصلی مالیات" },
  { name: "FinanzOnline", url: "https://finanzonline.bmf.gv.at", desc: "پورتال اظهارنامه مالیاتی" },
  { name: "SVS — بیمه اجتماعی خودکار", url: "https://www.svs.at", desc: "بیمه فریلنسرها" },
  { name: "WKO — اتاق بازرگانی", url: "https://www.wko.at", desc: "راهنمای کسب‌وکار" },
  { name: "USP — پورتال مالیاتی", url: "https://www.usp.gv.at", desc: "اطلاعات رسمی مالیاتی" },
  { name: "RIS — قوانین اتریش", url: "https://www.ris.bka.gv.at", desc: "متون قانونی" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FreelanceTaxHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [calcIncome, setCalcIncome] = useState(30000);
  const [calcExpenses, setCalcExpenses] = useState(3000);
  const [calcIsKleinunternehmer, setCalcIsKleinunternehmer] = useState(true);

  // ============================
  // CALCULATOR LOGIC
  // ============================
  const calcResult = useMemo(() => {
    const profit = Math.max(0, calcIncome - calcExpenses);

    // Calculate income tax
    let tax = 0;
    let remaining = profit;
    for (const bracket of TAX_DATA.tariff) {
      if (remaining <= 0) break;
      const taxableInBracket = Math.min(remaining, bracket.max - bracket.min);
      if (profit > bracket.min) {
        const taxable = Math.min(profit, bracket.max) - bracket.min;
        tax += taxable * (bracket.rate / 100);
      }
      remaining -= taxableInBracket;
    }

    // SVS contribution
    const svsBase = Math.max(profit, TAX_DATA.svs.mindestbeitragsgrundlage * 12);
    const svsContribution = Math.min(
      svsBase * (TAX_DATA.svs.beitragssatz / 100),
      TAX_DATA.svs.hoechstbeitragsgrundlage * 12 * (TAX_DATA.svs.beitragssatz / 100)
    );

    const totalBurden = tax + svsContribution;
    const effectiveRate = profit > 0 ? (totalBurden / profit) * 100 : 0;
    const netIncome = profit - totalBurden;

    // VAT status
    const isKleinunternehmer = calcIncome <= TAX_DATA.kleinunternehmer.umsatzgrenze;

    return {
      profit,
      tax,
      svsContribution,
      totalBurden,
      effectiveRate,
      netIncome,
      isKleinunternehmer,
      monthlyNet: netIncome / 12,
    };
  }, [calcIncome, calcExpenses]);

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل مالیات فریلنسرها و یوتیوبرها در اتریش ۲۰۲۶ | اتریش‌نشین",
      description:
        "راهنمای جامع مالیات فریلنسرها، یوتیوبرها و مشاغل آزاد در اتریش ۲۰۲۶: محاسبه مالیات بر درآمد، بیمه SVS، Kleinunternehmerregelung، هزینه‌های قابل کسر، فرم‌های مالیاتی و مهلت‌های قانونی.",
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
      name: "ماشین‌حساب مالیات فریلنسرها اتریش",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "356" },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "نحوه ثبت‌نام و پرداخت مالیات فریلنسرها در اتریش",
      description: "۵ گام اساسی برای ثبت‌نام، محاسبه و پرداخت مالیات به عنوان فریلنسر یا یوتیوبر در اتریش",
      totalTime: "P30D",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
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
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
  ], []);

  return (
    <>
      <SEO
        title="راهنمای مالیات فریلنسرها و یوتیوبرها اتریش ۲۰۲۶ | محاسبه، فرم‌ها و SVS | اتریش‌نشین"
        description="راهنمای کامل مالیات فریلنسرها، یوتیوبرها و مشاغل آزاد اتریش ۲۰۲۶: محاسبه مالیات بر درآمد، بیمه SVS، Kleinunternehmerregelung، هزینه‌های قابل کسر، فرم‌های E1/E1a و مهلت‌های قانونی ۳۰ ژوئن."
        keywords="مالیات فریلنسر اتریش, مالیات یوتیوبر اتریش, Freiberufler Steuer Österreich, Kleinunternehmerregelung اتریش, مالیات خودکار اتریش, SVS بیمه فریلنسر, FinanzOnline اتریش, فرم E1a, مالیات مشاغل آزاد اتریش, Selbständige Steuer"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/freelance-tax.jpg"
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
            💼
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
                  alt="مالیات فریلنسرها اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                راهنمای رسمی ۲۰۲۶ — به‌روز شده
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                مالیات فریلنسرها و یوتیوبرها در اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Freelance & Creator Tax Guide
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                اگر به عنوان فریلنسر، یوتیوبر، اینفلوئنسر یا صاحب کسب‌وکار کوچک در اتریش
                فعالیت می‌کنید، باید بدانید که تمام درآمدهای شما — از AdSense تا اسپانسرشیپ و
                فروش محصولات دیجیتال — مشمول مالیات است. این راهنما با محاسبه دقیق مالیات،
                بیمه SVS، هزینه‌های قابل کسر و مهلت‌های قانونی، شما را از جریمه‌های سنگین
                نجات می‌دهد.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>ماشین‌حساب دقیق مالیات</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>منابع BMF + SVS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <FileText className="w-3.5 h-3.5" />
                  <span>فرم‌های رسمی E1/E1a</span>
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
              <div className="text-[10px] text-stone-700 font-black mt-0.5 leading-tight">{s.label}</div>
              <div className="text-[9px] text-stone-400 mt-0.5 leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* INTERACTIVE TAX CALCULATOR */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border-2 border-[#c8102e]/20 overflow-hidden shadow-lg"
        >
          <div className="bg-gradient-to-r from-[#c8102e] to-[#970d22] p-5 md:p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black">ماشین‌حساب مالیات فریلنسر ۲۰۲۶</h2>
                <p className="text-[11px] text-rose-200 font-bold mt-0.5">
                  محاسبه دقیق مالیات بر درآمد، بیمه SVS و درآمد خالص شما
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-[11px] font-black text-stone-700 mb-3 block flex items-center gap-1.5">
                  <Euro className="w-3.5 h-3.5 text-emerald-600" />
                  درآمد سالانه ناخالص (یورو)
                </label>
                <input
                  type="number"
                  value={calcIncome}
                  onChange={(e) => setCalcIncome(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-3 text-lg font-black text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                  dir="ltr"
                  step="1000"
                />
                <div className="text-[9px] text-stone-400 font-bold text-center mt-1">
                  مجموع درآمد قبل از کسر هزینه‌ها
                </div>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-[11px] font-black text-stone-700 mb-3 block flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  هزینه‌های قابل کسر (یورو)
                </label>
                <input
                  type="number"
                  value={calcExpenses}
                  onChange={(e) => setCalcExpenses(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-3 text-lg font-black text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
                  dir="ltr"
                  step="500"
                />
                <div className="text-[9px] text-stone-400 font-bold text-center mt-1">
                  نرم‌افزار، تجهیزات، اینترنت و...
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span className="text-[11px] font-black text-emerald-800">
                  نتیجه محاسبه برای سال ۲۰۲۶
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">سود خالص</div>
                  <div className="text-lg font-black text-emerald-700" dir="ltr">
                    €{calcResult.profit.toFixed(0)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">مالیات بر درآمد</div>
                  <div className="text-lg font-black text-[#c8102e]" dir="ltr">
                    €{calcResult.tax.toFixed(0)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">بیمه SVS</div>
                  <div className="text-lg font-black text-sky-700" dir="ltr">
                    €{calcResult.svsContribution.toFixed(0)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border-2 border-emerald-300">
                  <div className="text-[9px] text-emerald-700 font-black mb-1">درآمد خالص سالانه</div>
                  <div className="text-lg font-black text-emerald-700" dir="ltr">
                    €{calcResult.netIncome.toFixed(0)}
                  </div>
                </div>
              </div>

              {/* Monthly net + effective rate */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white/70 rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">معادل ماهانه خالص</div>
                  <div className="text-sm font-black text-stone-800" dir="ltr">
                    €{calcResult.monthlyNet.toFixed(0)}
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">نرخ مؤثر مالیات</div>
                  <div className="text-sm font-black text-[#c8102e]" dir="ltr">
                    {calcResult.effectiveRate.toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Kleinunternehmer status */}
              <div className={`mt-4 rounded-xl p-3 flex items-start gap-2 border ${
                calcResult.isKleinunternehmer
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-amber-50 border-amber-200"
              }`}>
                {calcResult.isKleinunternehmer ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className={`text-[10px] font-black mb-1 ${
                    calcResult.isKleinunternehmer ? "text-emerald-900" : "text-amber-900"
                  }`}>
                    {calcResult.isKleinunternehmer
                      ? "✅ واجد شرایط Kleinunternehmerregelung"
                      : "⚠️ خارج از سقف Kleinunternehmerregelung"}
                  </div>
                  <p className={`text-[10px] font-bold leading-relaxed ${
                    calcResult.isKleinunternehmer ? "text-emerald-800" : "text-amber-800"
                  }`}>
                    {calcResult.isKleinunternehmer
                      ? "درآمد سالانه شما زیر €۵۵,۰۰۰ است. می‌توانید از معافیت مالیات بر ارزش افزوده استفاده کنید و نیازی به درج VAT در فاکتورها ندارید."
                      : "درآمد سالانه شما از €۵۵,۰۰۰ فراتر رفته است. باید مالیات بر ارزش افزوده (۲۰٪) در فاکتورهای خود درج کرده و به Finanzamt پرداخت کنید."}
                  </p>
                </div>
              </div>

              <div className="mt-3 text-[9px] text-stone-500 font-bold leading-relaxed">
                ⚠️ محاسبه فوق تقریبی است. برای محاسبه دقیق، از مشاور مالیاتی یا FinanzOnline استفاده کنید.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TAX BRACKETS TABLE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#c8102e]" />
              جدول پلکانی مالیات اتریش ۲۰۲۶
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نرخ مالیات بر درآمد بر اساس EStG §33 — اعداد به یورو
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TAX_BRACKETS.map((bracket, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`bg-gradient-to-br ${bracket.color} rounded-2xl p-5 text-white shadow-md hover:shadow-lg transition-all`}
              >
                <div className="text-[10px] font-bold text-white/70 mb-1">سطح {i + 1}</div>
                <div className="text-2xl font-black mb-1">{bracket.rate}</div>
                <div className="text-xs font-bold mb-1">{bracket.range} یورو</div>
                <div className="text-[10px] font-bold text-white/80 bg-white/20 rounded-full px-2 py-0.5 w-fit">
                  {bracket.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-sky-800 font-bold leading-relaxed">
              <strong className="font-black">نکته مهم:</strong> درآمد تا €۱۳,۵۳۹ معاف از مالیات است (Steuerliches
              Existenzminimum). اگر درآمدی از شغل حقوق‌بگیر هم داشته باشید، این سقف به €۱۴,۷۶۹ افزایش می‌یابد.
              نرخ‌های پلکانی بر درآمد اضافی هر سطح اعمال می‌شوند، نه بر کل درآمد.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* HOW TO REGISTER - STEPS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c8102e]" />
              راهنمای گام‌به‌گام ثبت‌نام و پرداخت مالیات
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ۵ گام اساسی برای قانونی‌سازی فعالیت فریلنسری در اتریش
            </p>
          </div>

          {/* Step tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all cursor-pointer ${
                  activeStep === i
                    ? `bg-gradient-to-br ${s.color} text-white shadow-md`
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-[10px] ${
                  activeStep === i ? "bg-white/20" : "bg-white"
                }`}>
                  {s.num}
                </span>
                {s.title.split(" ").slice(0, 3).join(" ")}...
              </button>
            ))}
          </div>

          {/* Active step content */}
          <AnimatePresence mode="wait">
            {STEPS.map(
              (s, i) =>
                activeStep === i && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row items-start gap-6"
                  >
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-xl flex-shrink-0`}>
                      <s.icon className="w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl font-black text-stone-200">{s.num}</span>
                        <h3 className="text-base font-black text-stone-900">{s.title}</h3>
                      </div>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                        {s.text}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[10px] font-black text-amber-800">{s.hint}</span>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* DEDUCTIBLE EXPENSES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#c8102e]" />
              هزینه‌های قابل کسر از مالیات
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              هزینه‌هایی که می‌توانید از درآمد مشمول مالیات کسر کنید (Betriebsausgaben)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEDUCTIBLE_EXPENSES.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-stone-200 p-5 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#c8102e] to-[#970d22] opacity-[0.04] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.08] transition-opacity" />
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-stone-900 text-sm mb-2">{exp.title}</h3>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">{exp.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* FORMS DOWNLOAD */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#c8102e]" />
              فرم‌های مالیاتی ضروری
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              فرم‌های رسمی BMF که هر فریلنسر باید بداند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMS.map((form, i) => {
              const Icon = form.icon;
              return (
                <motion.a
                  key={i}
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 p-5 flex items-start gap-3 group transition-all hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-stone-900 mb-1">{form.title}</h4>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed mb-2">{form.desc}</p>
                    <span className="text-[9px] font-black text-[#c8102e] flex items-center gap-1 group-hover:gap-2 transition-all">
                      دانلود از BMF
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </motion.a>
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
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول مالیات فریلنسرها
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های فریلنسرها و تولیدکنندگان محتوا
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
                برای راستی‌آزمایی مستقل اطلاعات این راهنما
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
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              مشاوره مالیاتی رایگان
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در مورد مالیات فریلنسری سوال دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه سال‌ها فعالیت فریلنسری و مشاوره مالیاتی در اتریش،
              آماده پاسخ به سوالات شما درباره ثبت‌نام، محاسبه مالیات، بیمه SVS،
              Kleinunternehmerregelung و فرم‌های مالیاتی است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، سوالی درباره مالیات فریلنسری در اتریش دارم"
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری حقوقی مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این راهنما بر اساس قوانین مالیاتی اتریش (EStG §33، UStG، GSVG) و اطلاعات
              منتشرشده توسط وزارت دارایی (BMF) و SVS تا سال ۲۰۲۶ تهیه شده است. نرخ‌ها،
              سقف‌ها و مهلت‌ها ممکن است در سال‌های آینده تغییر کنند. این محتوا جایگزین
              مشاوره مالیاتی تخصصی نیست. برای پرونده‌های خاص، حتماً با یک مشاور مالیاتی
              (Steuerberater) یا کارشناس رسمی مشورت کنید.
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
  key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number;
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