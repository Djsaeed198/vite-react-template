import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, ShieldAlert, ShieldQuestion, Search, Filter,
  CheckCircle, XCircle, AlertCircle, ExternalLink, Quote,
  BookOpen, Scale, Landmark, FileText, Clock, Eye, Share2,
  Copy, Sparkles, TrendingUp, Award, Info, ChevronDown,
  ChevronLeft, Globe, Link2, Users, Star, Newspaper, Tag
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// TYPES
// ==========================================
type Verdict = "true" | "false" | "mixed" | "unverified";

interface FactCheck {
  id: string;
  claim: string;
  verdict: Verdict;
  summary: string;
  details: string;
  category: string;
  tags: string[];
  sources: { name: string; url: string }[];
  date: string;
  readTime: number;
  views: number;
  featured?: boolean;
  image?: string;
}

// ==========================================
// VERDICT META
// ==========================================
const VERDICT_META: Record<Verdict, {
  label: string; short: string; color: string; bg: string; text: string;
  gradient: string; icon: any; ring: string;
}> = {
  true: {
    label: "تأیید شده", short: "صحیح", color: "emerald",
    bg: "bg-emerald-50", text: "text-emerald-700",
    gradient: "from-emerald-500 to-green-600",
    icon: CheckCircle, ring: "ring-emerald-200",
  },
  false: {
    label: "رد شده", short: "نادرست", color: "rose",
    bg: "bg-rose-50", text: "text-rose-700",
    gradient: "from-rose-500 to-red-600",
    icon: XCircle, ring: "ring-rose-200",
  },
  mixed: {
    label: "نیمه‌صحیح", short: "نیمه‌درست", color: "amber",
    bg: "bg-amber-50", text: "text-amber-700",
    gradient: "from-amber-500 to-orange-600",
    icon: AlertCircle, ring: "ring-amber-200",
  },
  unverified: {
    label: "در حال بررسی", short: "نامشخص", color: "sky",
    bg: "bg-sky-50", text: "text-sky-700",
    gradient: "from-sky-500 to-blue-600",
    icon: ShieldQuestion, ring: "ring-sky-200",
  },
};

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۲۴۷", label: "بررسی انجام‌شده", icon: "🔍" },
  { value: "۱۸۹", label: "منبع رسمی", icon: "📚" },
  { value: "۹۶٪", label: "دقت استناد", icon: "🎯" },
  { value: "۴۸h", label: "میانگین پاسخ", icon: "⏱️" },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه", icon: Filter, count: 24 },
  { id: "residency", label: "اقامت و ویزا", icon: Landmark, count: 8 },
  { id: "tax", label: "مالیات", icon: Scale, count: 5 },
  { id: "work", label: "کار و بیمه", icon: Users, count: 4 },
  { id: "citizenship", label: "تابعیت", icon: Award, count: 3 },
  { id: "education", label: "تحصیل", icon: BookOpen, count: 4 },
];

// ==========================================
// FACT CHECKS DATA
// ==========================================
const FACT_CHECKS: FactCheck[] = [
  {
    id: "fc-001",
    claim: "برای دریافت اقامت دائم اتریش، داشتن مدرک زبان آلمانی سطح B1 الزامی است.",
    verdict: "true",
    summary:
      "بر اساس قانون اقامت اتریش (NAG)، سطح B1 زبان آلمانی برای اقامت دائم (Daueraufenthalt-EU) الزامی است.",
    details:
      "طبق پاراگراف ۲۰ قانون اقامت اتریش (Niederlassungs- und Aufenthaltsgesetz - NAG)، متقاضیان اقامت دائم باید مدرک زبان آلمانی حداقل سطح B1 را ارائه دهند. این مدرک باید از مؤسسات معتبر مانند ÖSD، Goethe یا ÖIF صادر شده باشد. استثناهایی برای افراد بالای ۶۰ سال و برخی شرایط پزشکی وجود دارد.",
    category: "residency",
    tags: ["اقامت دائم", "زبان آلمانی", "B1", "NAG", "Daueraufenthalt"],
    sources: [
      { name: "وزارت کشور اتریش (BMI)", url: "https://www.bmi.gv.at" },
      { name: "پورتال مهاجرت اتریش", url: "https://www.migration.gv.at" },
    ],
    date: "۱۴۰۳/۰۹/۱۵",
    readTime: 4,
    views: 2847,
    featured: true,
  },
  {
    id: "fc-002",
    claim: "شهروندان ایرانی از سال ۲۰۲۴ برای سفر توریستی به اتریش بدون ویزا می‌توانند سفر کنند.",
    verdict: "false",
    summary:
      "ایران همچنان در فهرست کشورهای نیازمند ویزا برای ورود به منطقه شنگن قرار دارد.",
    details:
      "اتریش به عنوان عضو منطقه شنگن، تابع سیاست ویزای اتحادیه اروپا است. ایران در ضمیمه I مقررات شورای اروپا (فهرست کشورهای نیازمند ویزا) قرار دارد و هیچ تغییری در این وضعیت تا امروز اعمال نشده است. شهروندان ایرانی برای سفر به اتریش نیاز به ویزای شنگن دارند که از سفارت یا کنسولگری اتریش دریافت می‌شود.",
    category: "residency",
    tags: ["ویزا", "شنگن", "سفر توریستی", "ایران"],
    sources: [
      { name: "کمیسیون اروپا", url: "https://home-affairs.ec.europa.eu" },
      { name: "سفارت اتریش در تهران", url: "https://www.bmeia.gv.at" },
    ],
    date: "۱۴۰۳/۰۹/۱۰",
    readTime: 3,
    views: 5623,
    featured: true,
  },
  {
    id: "fc-003",
    claim: "در اتریش، مالیات بر درآمد برای درآمدهای زیر ۱۲,۰۰۰ یورو در سال صفر است.",
    verdict: "true",
    summary: "طبق قانون مالیات بر درآمد اتریش (EStG)، درآمد سالانه زیر ۱۲,۸۱۶ یورو معاف از مالیات است.",
    details:
      "بر اساس پاراگراف ۳۳ قانون مالیات بر درآمد اتریش (Einkommensteuergesetz)، سقف معافیت مالیاتی سالانه برای سال ۲۰۲۴ مبلغ ۱۲,۸۱۶ یورو است. برای درآمدهای بالاتر، نرخ مالیات به صورت تصاعدی از ۲۰٪ شروع شده و تا ۵۵٪ افزایش می‌یابد. همچنین کسر مالیات‌های اجتماعی (SV) قبل از محاسبه مالیات بر درآمد اعمال می‌شود.",
    category: "tax",
    tags: ["مالیات", "درآمد", "معافیت مالیاتی", "EStG"],
    sources: [
      { name: "وزارت دارایی اتریش (BMF)", url: "https://www.bmf.gv.at" },
      { name: "اتاق بازرگانی اتریش (WKO)", url: "https://www.wko.at" },
    ],
    date: "۱۴۰۳/۰۹/۰۵",
    readTime: 5,
    views: 1923,
  },
  {
    id: "fc-004",
    claim: "بیمه درمانی در اتریش فقط برای شهروندان اتریشی و اتحادیه اروپا رایگان است.",
    verdict: "mixed",
    summary:
      "بیمه درمانی در اتریش برای همه افراد شاغل و تحت پوشش بیمه اجتماعی (SV) قابل دسترسی است، اما رایگان نیست.",
    details:
      "سیستم بیمه درمانی اتریش (Sozialversicherung) برای همه افراد شاغل، از جمله خارجی‌ها و مهاجران، قابل دسترسی است. اما این بیمه از طریق کسر حق بیمه از حقوق ماهانه تأمین می‌شود و رایگان نیست. افرادی که بیمه‌شده هستند، در صورت نیاز به درمان، مبلغ اندکی به عنوان حق ویزیت (Rezeptgebühr) پرداخت می‌کنند. برای افراد کم‌درآمد، امکان معافیت از حق ویزیت وجود دارد.",
    category: "work",
    tags: ["بیمه درمانی", "Sozialversicherung", "حق بیمه", "سلامت"],
    sources: [
      { name: "بیمه اجتماعی اتریش (ÖGK)", url: "https://www.gesundheitskasse.at" },
      { name: "وزارت بهداشت اتریش", url: "https://www.sozialministerium.at" },
    ],
    date: "۱۴۰۳/۰۸/۲۸",
    readTime: 6,
    views: 3412,
  },
  {
    id: "fc-005",
    claim: "برای دریافت تابعیت اتریش، حداقل ۱۰ سال اقامت قانونی در این کشور الزامی است.",
    verdict: "mixed",
    summary:
      "مدت اقامت مورد نیاز برای تابعیت اتریش ۱۰ سال است، اما در برخی موارد خاص این مدت به ۶ سال کاهش می‌یابد.",
    details:
      "طبق قانون تابعیت اتریش (Staatsbürgerschaftsgesetz)، در حالت عادی حداقل ۱۰ سال اقامت قانونی و مستمر برای درخواست تابعیت الزامی است. اما برای افرادی که شرایط خاصی مانند تبار اتریشی، ازدواج با شهروند اتریشی، یا پناهندگی دارند، این مدت می‌تواند به ۶ سال یا حتی کمتر کاهش یابد. همچنین در سال‌های اخیر، آزمون زبان آلمانی سطح B2 و آزمون دانش مدنی الزامی شده است.",
    category: "citizenship",
    tags: ["تابعیت", "شهروندی", "اقامت", "Staatsbürgerschaft"],
    sources: [
      { name: "وزارت کشور اتریش", url: "https://www.bmi.gv.at" },
      { name: "دولت اتریش", url: "https://www.oesterreich.gv.at" },
    ],
    date: "۱۴۰۳/۰۸/۲۰",
    readTime: 7,
    views: 4521,
  },
  {
    id: "fc-006",
    claim: "دانشجویان ایرانی در اتریش می‌توانند بدون محدودیت ساعت کار کنند.",
    verdict: "false",
    summary:
      "دانشجویان غیر اتحادیه اروپا در اتریش به ۲۰ ساعت کار در هفته محدود هستند.",
    details:
      "طبق قانون اقامت دانشجویی (Aufenthaltsbewilligung Studierende)، دانشجویان کشورهای غیر اتحادیه اروپا مجاز به کار حداکثر ۲۰ ساعت در هفته هستند. این محدودیت برای اطمینان از تمرکز دانشجو بر تحصیل وضع شده است. کار بیش از این مقدار می‌تواند به لغو اقامت منجر شود. برای کارهای فصلی و پروژه‌ای، قوانین خاصی وجود دارد.",
    category: "education",
    tags: ["دانشجو", "کار دانشجویی", "۲۰ ساعت", "اقامت تحصیلی"],
    sources: [
      { name: "وزارت آموزش اتریش", url: "https://www.bmbwf.gv.at" },
      { name: "ÖH (اتحادیه دانشجویان)", url: "https://www.oeh.ac.at" },
    ],
    date: "۱۴۰۳/۰۸/۱۲",
    readTime: 4,
    views: 6127,
  },
];

// ==========================================
// METHODOLOGY
// ==========================================
const METHODOLOGY = [
  {
    icon: Search,
    title: "شناسایی ادعا",
    text: "پایش مستمر شبکه‌های اجتماعی و منابع خبری فارسی‌زبان برای یافتن ادعاهای مشکوک.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Landmark,
    title: "بررسی منابع رسمی",
    text: "استناد به قوانین اتریش، پورتال‌های دولتی و اسناد رسمی اتحادیه اروپا.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Scale,
    title: "تحلیل حقوقی",
    text: "بررسی دقیق متن قوانین با کمک متخصصان حقوقی آشنا به سیستم اتریش.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: ShieldCheck,
    title: "انتشار شفاف",
    text: "انتشار نتیجه با ذکر منابع قابل راستی‌آزمایی و امکان بازخورد کاربران.",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "منابع حقیقت‌سنجی اتریش‌نشین چیست؟",
    a: "ما منحصراً به منابع رسمی اتریش و اتحادیه اروپا از جمله وزارت کشور (BMI)، وزارت دارایی (BMF)، پورتال مهاجرت (migration.gv.at) و متون قوانین (RIS) استناد می‌کنیم.",
  },
  {
    q: "چگونه می‌توانم یک ادعا را برای بررسی ارسال کنم؟",
    a: "از طریق تلگرام یا واتس‌اپ، ادعا یا لینک منبع را برای تیم ما ارسال کنید. ادعاهای پرتکرار و مؤثر در اولویت بررسی قرار می‌گیرند.",
  },
  {
    q: "مدت زمان بررسی هر ادعا چقدر است؟",
    a: "بسته به پیچیدگی ادعا، فرآیند بررسی بین ۴۸ ساعت تا یک هفته زمان می‌برد. ادعاهای فوری در کمتر از ۲۴ ساعت منتشر می‌شوند.",
  },
  {
    q: "آیا نتایج حقیقت‌سنجی جایگزین مشاوره حقوقی است؟",
    a: "خیر. نتایج ما صرفاً جنبه اطلاع‌رسانی دارند و جایگزین مشاوره حقوقی تخصصی نیستند. برای پرونده‌های خاص، حتماً با وکیل یا مشاور رسمی مشورت کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FactCheckArticles() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeVerdict, setActiveVerdict] = useState<Verdict | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return FACT_CHECKS.filter((fc) => {
      if (activeCategory !== "all" && fc.category !== activeCategory) return false;
      if (activeVerdict !== "all" && fc.verdict !== activeVerdict) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          fc.claim.toLowerCase().includes(q) ||
          fc.summary.toLowerCase().includes(q) ||
          fc.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeCategory, activeVerdict, searchQuery]);

  const handleCopyLink = (id: string) => {
    const url = `https://otrish-iran.ir/fact-check/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    toast.success("لینک کپی شد!");
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // ============================
  // SEO SCHEMA (ClaimReview)
  // ============================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
    ...FACT_CHECKS.map((fc) => ({
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      url: `https://otrish-iran.ir/fact-check/${fc.id}`,
      claimReviewed: fc.claim,
      itemReviewed: {
        "@type": "Claim",
        appearance: fc.sources.map((s) => ({
          "@type": "CreativeWork",
          url: s.url,
          name: s.name,
        })),
        firstAppearance: {
          "@type": "CreativeWork",
          url: "https://otrish-iran.ir/fact-check",
        },
      },
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        url: "https://otrish-iran.ir",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue:
          fc.verdict === "true" ? 5 :
          fc.verdict === "false" ? 1 :
          fc.verdict === "mixed" ? 3 : 2,
        bestRating: 5,
        worstRating: 1,
        alternateName: VERDICT_META[fc.verdict].label,
      },
    })),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="حقیقت‌سنجی قوانین اتریش | رد شایعات مهاجرتی با منابع رسمی | اتریش‌نشین"
        description="بررسی صحت و سقم ادعاها درباره قوانین اقامت، مالیات، بیمه و تابعیت اتریش با استناد به منابع رسمی. کسب اطلاع از شایعات رایج مهاجرتی و اصلاح اطلاعات نادرست."
        keywords="حقیقت سنجی اتریش, فکت چک قوانین اتریش, شایعات مهاجرت اتریش, بررسی ادعاهای اقامت, NAG اتریش, قوانین رسمی مهاجرت, fact check Austria, ClaimReview"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/fact-check.jpg"
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
            🔍
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
                  alt="حقیقت‌سنجی اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                حقیقت‌سنجی مستقل با منابع رسمی
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                حقیقت‌سنجی قوانین اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                در دنیای اطلاعات پراکنده امروز، تشخیص صحت ادعاها درباره قوانین اقامتی، مالیاتی و
                تابعیت اتریش کار ساده‌ای نیست. تیم اتریش‌نشین با استناد به منابع رسمی اتریش و
                اتحادیه اروپا، ادعاهای رایج را بررسی و صحت یا سقم آن‌ها را به صورت شفاف منتشر
                می‌کند تا از تصمیم‌های نادرست بر اساس اطلاعات غلط جلوگیری شود.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>استناد به منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>بی‌طرف و مستقل</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>به‌روزرسانی مستمر</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS */}
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
        {/* SEARCH & FILTERS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در ادعاها، برچسب‌ها و موضوعات..."
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-11 pl-4 py-3 text-xs font-bold text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 transition-all"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
              <Tag className="w-3 h-3" />
              دسته:
            </span>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20" : "bg-stone-200"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Verdict filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
              <ShieldCheck className="w-3 h-3" />
              نتیجه:
            </span>
            <button
              onClick={() => setActiveVerdict("all")}
              className={`text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                activeVerdict === "all"
                  ? "bg-stone-800 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              همه نتایج
            </button>
            {(Object.keys(VERDICT_META) as Verdict[]).map((v) => {
              const meta = VERDICT_META[v];
              const Icon = meta.icon;
              const isActive = activeVerdict === v;
              return (
                <button
                  key={v}
                  onClick={() => setActiveVerdict(v)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${meta.gradient} text-white shadow-md`
                      : `${meta.bg} ${meta.text} hover:opacity-80`
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {meta.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 border-t border-stone-100 pt-3">
            <span>
              <span className="text-[#c8102e] font-black">{filtered.length}</span> نتیجه یافت شد
            </span>
            {(activeCategory !== "all" || activeVerdict !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveVerdict("all");
                  setSearchQuery("");
                }}
                className="text-[#c8102e] hover:underline"
              >
                پاک کردن فیلترها
              </button>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* FEATURED CLAIMS */}
        {/* ========================================== */}
        {activeCategory === "all" && activeVerdict === "all" && !searchQuery && (
          <div>
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500 fill-current" />
                  بررسی‌های ویژه
                </h2>
                <p className="text-[11px] text-stone-500 font-bold mt-1">
                  پرتکرارترین ادعاهای اخیر درباره قوانین اتریش
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FACT_CHECKS.filter((f) => f.featured).map((fc, i) => (
                <FeaturedCard key={fc.id} fact={fc} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* FACT CHECK LIST */}
        {/* ========================================== */}
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-[#c8102e]" />
                بایگانی حقیقت‌سنجی
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                همه بررسی‌ها با ذکر منبع رسمی و تاریخ انتشار
              </p>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border border-stone-200 p-12 text-center"
              >
                <div className="text-5xl mb-4">🔎</div>
                <h3 className="text-sm font-black text-stone-900 mb-2">
                  نتیجه‌ای یافت نشد
                </h3>
                <p className="text-[11px] text-stone-500 font-bold">
                  فیلترها یا عبارت جستجو را تغییر دهید.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filtered.map((fc, i) => (
                  <FactCheckCard
                    key={fc.id}
                    fact={fc}
                    index={i}
                    isExpanded={expandedId === fc.id}
                    onToggle={() => setExpandedId(expandedId === fc.id ? null : fc.id)}
                    copiedLink={copiedLink}
                    onCopyLink={handleCopyLink}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* METHODOLOGY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              متدولوژی حقیقت‌سنجی ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار گام علمی برای رسیدن به نتیجه شفاف و قابل استناد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHODOLOGY.map((m, i) => {
              const Icon = m.icon;
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
                  <div className="absolute top-2 left-3 text-6xl font-black text-stone-100 group-hover:text-stone-200 transition-colors select-none">
                    {i + 1}
                  </div>
                  <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {m.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {m.text}
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
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره حقیقت‌سنجی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های شفاف به پرسش‌های رایج کاربران
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
        {/* SUBMIT CLAIM CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              ادعایی مشکوک دیده‌اید؟
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              ادعای مشکوک را برای ما ارسال کنید
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر در شبکه‌های اجتماعی یا گروه‌های فارسی‌زبان با ادعایی درباره قوانین اتریش مواجه
              شدید که صحت آن را نمی‌دانید، آن را برای تیم حقیقت‌سنجی ما ارسال کنید. ما در کمتر از
              ۴۸ ساعت آن را بررسی و منتشر می‌کنیم.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، یک ادعا برای حقیقت‌سنجی دارم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                ارسال از طریق واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                ارسال از طریق تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                بررسی در کمتر از ۴۸ ساعت
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                منابع کاملاً رسمی
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                انتشار عمومی نتیجه
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
              یادآوری حقوقی مهم
            </h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              نتایج حقیقت‌سنجی اتریش‌نشین بر اساس تفسیر متون رسمی و در زمان انتشار است. قوانین
              ممکن است در طول زمان تغییر کنند. این محتوا جایگزین مشاوره حقوقی تخصصی نیست و برای
              تصمیم‌های حساس، همیشه با وکیل یا مشاور رسمی مشورت کنید. تمامی منابع به صورت لینک
              مستقیم در دسترس کاربران قرار گرفته تا صحت آن‌ها به صورت مستقل قابل راستی‌آزمایی باشد.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// FEATURED CARD
// ==========================================
function FeaturedCard({ fact, index }: { fact: FactCheck; index: number; key?: React.Key }) {
  const meta = VERDICT_META[fact.verdict];
  const Icon = meta.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-300 overflow-hidden group shadow-sm hover:shadow-xl transition-all"
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${meta.gradient}`} />

      {/* Verdict badge */}
      <div className="absolute top-6 left-4 z-10">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-br ${meta.gradient} text-white text-[10px] font-black shadow-lg`}>
          <Icon className="w-3.5 h-3.5" />
          {meta.label}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-black text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
            <Newspaper className="w-3 h-3" />
            ادعای مطرح‌شده
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-400">
            <Clock className="w-3 h-3" />
            {fact.date}
          </span>
        </div>

        <div className="relative mb-4 pr-4 border-r-2 border-stone-200">
          <Quote className="absolute -top-1 -right-1 w-3.5 h-3.5 text-stone-300" />
          <p className="text-sm font-black text-stone-900 leading-relaxed">
            «{fact.claim}»
          </p>
        </div>

        <div className={`${meta.bg} border border-current/10 rounded-2xl p-4 mb-4`}>
          <div className={`flex items-center gap-1.5 mb-2 ${meta.text}`}>
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-black">
              نتیجه بررسی: {meta.label}
            </span>
          </div>
          <p className={`text-[11px] font-bold leading-relaxed ${meta.text} opacity-90`}>
            {fact.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {fact.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {fact.views.toLocaleString("fa-IR")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {fact.readTime} دقیقه
            </span>
          </div>
          <span className="text-[10px] font-black text-[#c8102e] flex items-center gap-1 group-hover:gap-2 transition-all">
            مطالعه کامل
            <ChevronLeft className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ==========================================
// FACT CHECK CARD
// ==========================================
function FactCheckCard({
  fact,
  index,
  isExpanded,
  onToggle,
  copiedLink,
  onCopyLink,
}: {
  fact: FactCheck;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  copiedLink: string | null;
  onCopyLink: (id: string) => void;
  key?: React.Key;
}) {
  const meta = VERDICT_META[fact.verdict];
  const Icon = meta.icon;
  const isCopied = copiedLink === fact.id;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all ${
        isExpanded
          ? "border-[#c8102e]/30 shadow-xl"
          : "border-stone-200 hover:border-stone-300 hover:shadow-md"
      }`}
    >
      {/* Verdict strip */}
      <div className={`absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b ${meta.gradient}`} />

      <button
        onClick={onToggle}
        className="w-full text-right p-5 md:p-6 pr-7 md:pr-8"
      >
        <div className="flex items-start gap-4">
          {/* Verdict icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-md`}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-br ${meta.gradient} text-white shadow-sm`}>
                <Icon className="w-3 h-3" />
                {meta.label}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                <Tag className="w-3 h-3" />
                {CATEGORIES.find((c) => c.id === fact.category)?.label}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-400">
                <Clock className="w-3 h-3" />
                {fact.date}
              </span>
            </div>

            {/* Claim */}
            <div className="relative pr-4 mb-2">
              <Quote className="absolute top-0 right-0 w-3 h-3 text-stone-300" />
              <p className="text-sm font-black text-stone-900 leading-relaxed">
                «{fact.claim}»
              </p>
            </div>

            {/* Summary (visible when collapsed) */}
            {!isExpanded && (
              <p className="text-[11px] text-stone-500 font-bold leading-relaxed line-clamp-2 mt-2">
                {fact.summary}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-3 text-[10px] font-bold text-stone-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {fact.views.toLocaleString("fa-IR")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {fact.readTime} دقیقه مطالعه
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {fact.sources.length} منبع رسمی
              </span>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform mt-1 ${
              isExpanded ? "rotate-180 text-[#c8102e]" : ""
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pr-7 md:pr-8 pb-6 border-t border-stone-100 pt-5 space-y-5">
              {/* Verdict summary banner */}
              <div className={`${meta.bg} rounded-2xl p-4 border border-current/10`}>
                <div className={`flex items-center gap-2 mb-2 ${meta.text}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-black">
                    نتیجه بررسی اتریش‌نشین
                  </span>
                </div>
                <p className={`text-xs font-bold leading-relaxed ${meta.text}`}>
                  {fact.summary}
                </p>
              </div>

              {/* Details */}
              <div>
                <h4 className="text-[11px] font-black text-stone-900 mb-2 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#c8102e]" />
                  جزئیات کامل بررسی
                </h4>
                <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                  {fact.details}
                </p>
              </div>

              {/* Sources */}
              <div>
                <h4 className="text-[11px] font-black text-stone-900 mb-3 flex items-center gap-2">
                  <Link2 className="w-3.5 h-3.5 text-[#c8102e]" />
                  منابع رسمی مورد استناد
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fact.sources.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 bg-stone-50 hover:bg-white border border-stone-200 hover:border-[#c8102e]/30 rounded-xl p-3 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black text-stone-800 truncate">
                          {s.name}
                        </div>
                        <div className="text-[9px] text-stone-500 font-bold truncate" dir="ltr">
                          {s.url.replace(/^https?:\/\//, "")}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-[#c8102e] transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-[11px] font-black text-stone-900 mb-2 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#c8102e]" />
                  برچسب‌ها
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {fact.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold text-stone-600 bg-stone-100 hover:bg-[#c8102e]/10 hover:text-[#c8102e] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCopyLink(fact.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-black text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        کپی شد
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        کپی لینک
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (navigator.share) {
                        navigator.share({
                          title: "بررسی ادعا - اتریش‌نشین",
                          text: fact.claim,
                          url: `https://otrish-iran.ir/fact-check/${fact.id}`,
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-black text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    اشتراک
                  </button>
                </div>

                <div className="text-[10px] font-bold text-stone-400">
                  شناسه: {fact.id.toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
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