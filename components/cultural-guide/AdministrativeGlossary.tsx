import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, ChevronDown, BookOpen, Sparkles, Copy, Check, Star,
  Bookmark, TrendingUp, Award, Users, FileText, Shield, Home,
  Heart, Coins, Car, Briefcase, GraduationCap, Phone, MessageCircle,
  Share2, Printer, X, Filter, Hash, Lightbulb, ArrowUp, HelpCircle,
  ChevronLeft, ExternalLink, Info, Clock
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
type Category =
  | "residence"
  | "insurance"
  | "tax"
  | "work"
  | "housing"
  | "documents"
  | "banking"
  | "family"
  | "transport"
  | "general";

interface GlossaryItem {
  term: string;
  definition: string;
  category: Category;
  relatedTerms?: string[];
  example?: string;
  tip?: string;
  popularity?: number;
}

// ==========================================
// CATEGORY CONFIG
// ==========================================
const CATEGORIES: Record<Category, { label: string; icon: string; color: string; bgColor: string }> = {
  residence: { label: "اقامت و مهاجرت", icon: "🪪", color: "text-red-700", bgColor: "bg-red-50 border-red-200" },
  insurance: { label: "بیمه و سلامت", icon: "🏥", color: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-200" },
  tax: { label: "مالیات", icon: "💰", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200" },
  work: { label: "کار و استخدام", icon: "💼", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  housing: { label: "مسکن و اجاره", icon: "🏠", color: "text-purple-700", bgColor: "bg-purple-50 border-purple-200" },
  documents: { label: "مدارک و ثبت‌احوال", icon: "📄", color: "text-stone-700", bgColor: "bg-stone-100 border-stone-200" },
  banking: { label: "بانکداری", icon: "🏦", color: "text-indigo-700", bgColor: "bg-indigo-50 border-indigo-200" },
  family: { label: "خانواده و کودکان", icon: "👨‍👩‍👧", color: "text-pink-700", bgColor: "bg-pink-50 border-pink-200" },
  transport: { label: "حمل‌ونقل", icon: "🚆", color: "text-cyan-700", bgColor: "bg-cyan-50 border-cyan-200" },
  general: { label: "عمومی", icon: "📚", color: "text-stone-700", bgColor: "bg-stone-100 border-stone-200" },
};

// ==========================================
// GLOSSARY DATA (Enhanced with categories & metadata)
// ==========================================
const glossaryData: GlossaryItem[] = [
  {
    term: "Abmeldung",
    definition: "اعلام خروج یا فسخ آدرس و قراردادها (مانند خروج از بیمه یا محل سکونت).",
    category: "residence",
    relatedTerms: ["Anmeldung", "Meldezettel"],
    example: "پیش از ترک اتریش باید Abmeldung خود را از اداره ثبت انجام دهید.",
    tip: "این فرم را حتماً قبل از خروج از کشور پر کنید تا جریمه نشوید.",
    popularity: 4,
  },
  {
    term: "AMS",
    definition: "اداره کاریابی اتریش (Arbeitsmarktservice) که مسئول ثبت‌نام کارجویان، ارائه دوره‌های آموزشی و پرداخت مزایای بیکاری است.",
    category: "work",
    relatedTerms: ["Arbeitsvertrag", "Krankmeldung"],
    example: "برای دریافت کمک‌هزینه بیکاری، در AMS ثبت‌نام کنید.",
    tip: "ثبت‌نام در AMS به شما دسترسی به دوره‌های رایگان زبان و مهارت می‌دهد.",
    popularity: 5,
  },
  {
    term: "Anmeldung",
    definition: "فرآیند ثبت‌نام رسمی برای دوره‌ها، کلاس‌ها یا سازمان‌های مختلف.",
    category: "residence",
    relatedTerms: ["Abmeldung", "Meldezettel"],
    example: "Anmeldung برای دانشگاه‌ها معمولاً در فصل پاییز انجام می‌شود.",
    popularity: 4,
  },
  {
    term: "Arbeitsvertrag",
    definition: "قرارداد رسمی استخدام که شرایط کار، شرح وظایف و میزان حقوق را مشخص می‌کند.",
    category: "work",
    relatedTerms: ["AMS", "Lohnsteuer"],
    example: "پیش از امضا، بندهای مربوط به ساعات کاری و مرخصی را مطالعه کنید.",
    tip: "نسخه آلمانی قرارداد را با دقت بخوانید و در صورت نیاز از مترجم کمک بگیرید.",
    popularity: 5,
  },
  {
    term: "Aufenthaltsbewilligung",
    definition: "عنوان کلی برای انواع مجوزهای اقامت محدود زمانی که برای شهروندان کشورهای غیراروپایی صادر می‌شود.",
    category: "residence",
    relatedTerms: ["MA35", "Meldezettel"],
    example: "دانشجویان معمولاً Aufenthaltsbewilligung Studienzwecke دریافت می‌کنند.",
    popularity: 5,
  },
  {
    term: "Bankomat",
    definition: "دستگاه خودپرداز در اتریش که برای برداشت وجه نقد و خرید با کارت بانکی استفاده می‌شود.",
    category: "banking",
    relatedTerms: ["Online Banking"],
    example: "با کارت بانکی خود می‌توانید از هر Bankomat پول برداشت کنید.",
    popularity: 3,
  },
  {
    term: "Betriebskosten",
    definition: "هزینه‌های جاری ساختمان شامل آب، زباله، تمیزکاری و مشاعات که به اجاره‌بها اضافه می‌شود.",
    category: "housing",
    relatedTerms: ["Mietvertrag", "Hauptwohnsitz"],
    example: "Betriebskosten معمولاً ۲۰ تا ۳۰ درصد اجاره‌بها است.",
    tip: "درخواست تفصیلی Betriebskosten را از صاحب‌خانه بگیرید.",
    popularity: 4,
  },
  {
    term: "E-Card",
    definition: "کارت الکترونیکی بیمه سلامت هوشمند که حاوی اطلاعات وضعیت بیمه‌شده است.",
    category: "insurance",
    relatedTerms: ["ÖGK", "Zusatzversicherung"],
    example: "هنگام مراجعه به پزشک، E-Card خود را همراه داشته باشید.",
    tip: "در صورت گم شدن، بلافاصله با ÖGK تماس بگیرید.",
    popularity: 5,
  },
  {
    term: "Familienbeihilfe",
    definition: "کمک‌هزینه مالی دولت برای حمایت از خانواده‌ها و فرزندان تحت تکفل.",
    category: "family",
    relatedTerms: ["Steuererklärung"],
    example: "خانواده‌های مقیم اتریش می‌توانند ماهانه Familienbeihilfe دریافت کنند.",
    popularity: 4,
  },
  {
    term: "Finanzamt",
    definition: "اداره مالیات مرکزی که مسئول امور مربوط به مالیات بر درآمد، بازگشت مالیات و کدهای مالیاتی است.",
    category: "tax",
    relatedTerms: ["Steuererklärung", "Steuernummer", "Lohnsteuer"],
    example: "برای دریافت Steuernummer باید در Finanzamt ثبت‌نام کنید.",
    popularity: 5,
  },
  {
    term: "Führungszeugnis",
    definition: "گواهی رسمی پلیس مبنی بر نداشتن سابقه کیفری که برای بسیاری از استخدام‌ها ضروری است.",
    category: "documents",
    relatedTerms: ["Meldezettel"],
    example: "برای کار در مدارس یا مهدکودک‌ها Führungszeugnis لازم است.",
    popularity: 4,
  },
  {
    term: "Geburtsurkunde",
    definition: "گواهی رسمی تولد که برای بسیاری از امور ثبت‌احوال و اداری ضروری است.",
    category: "documents",
    relatedTerms: ["Meldezettel"],
    example: "برای ثبت‌نام کودک در مدرسه، Geburtsurkunde ترجمه‌شده نیاز است.",
    popularity: 3,
  },
  {
    term: "Haushaltsversicherung",
    definition: "بیمه وسایل منزل که در برابر آتش‌سوزی، سرقت و آسیب به وسایل داخلی خانه محافظت می‌کند.",
    category: "insurance",
    relatedTerms: ["Mietvertrag"],
    example: "برخی صاحب‌خانه‌ها داشتن Haushaltsversicherung را الزامی می‌کنند.",
    tip: "شهریه این بیمه بسیار مقرون‌به‌صرفه و توصیه‌شده است.",
    popularity: 3,
  },
  {
    term: "Hauptwohnsitz",
    definition: "محل اقامت اصلی و رسمی ثبت‌شده شخص در سامانه نفوس اتریش.",
    category: "housing",
    relatedTerms: ["Meldezettel", "Wohnsitzbestätigung"],
    example: "Hauptwohnsitz شما بر اساس Meldezettel ثبت می‌شود.",
    popularity: 4,
  },
  {
    term: "ID Austria",
    definition: "سیستم هویت دیجیتال جدید اتریش برای دسترسی ایمن به خدمات دولتی آنلاین.",
    category: "documents",
    relatedTerms: ["Finanzamt", "MA35"],
    example: "با ID Austria می‌توانید اظهارنامه مالیاتی خود را آنلاین پر کنید.",
    tip: "برای فعال‌سازی ID Austria نیاز به حضور حضوری در دفتر ثبت دارید.",
    popularity: 5,
  },
  {
    term: "Jahreskarte",
    definition: "کارت تردد سالانه که هزینه‌های رفت‌وآمد با حمل‌ونقل عمومی را بسیار بهینه می‌کند.",
    category: "transport",
    relatedTerms: [],
    example: "Jahreskarte وین تنها € 365 در سال هزینه دارد.",
    tip: "برای وین، Klimaticket یا Jahreskarte Wiener Linien را بررسی کنید.",
    popularity: 4,
  },
  {
    term: "Krankmeldung",
    definition: "گواهی پزشکی که برای تأیید بیماری در طول دوره غیبت از کار برای کارفرما ارائه می‌شود.",
    category: "work",
    relatedTerms: ["Arbeitsvertrag", "AMS"],
    example: "پس از ۳ روز غیبت، Krankmeldung از پزشک الزامی است.",
    popularity: 4,
  },
  {
    term: "Lohnsteuer",
    definition: "مالیات بر درآمد که مستقیماً از حقوق ماهانه توسط کارفرما کسر می‌شود.",
    category: "tax",
    relatedTerms: ["Finanzamt", "Steuererklärung"],
    example: "Lohnsteuer به صورت خودکار از حقوق کسر و به Finanzamt پرداخت می‌شود.",
    popularity: 5,
  },
  {
    term: "MA35",
    definition: "اداره مهاجرت وین که مسئول پرونده‌های اقامت، تابعیت و مسائل مربوط به مجوزهای شهروندی است.",
    category: "residence",
    relatedTerms: ["Aufenthaltsbewilligung", "Meldezettel", "ID Austria"],
    example: "برای تمدید اقامت، باید در MA35 نوبت بگیرید.",
    tip: "نوبت‌های MA35 معمولاً چند ماه انتظار دارند؛ زودتر اقدام کنید.",
    popularity: 5,
  },
  {
    term: "Meldezettel",
    definition: "برگه ثبت‌نام محل اقامت که پس از ورود به هر خانه تهیه می‌شود و برای بسیاری از امور اداری ضروری است.",
    category: "residence",
    relatedTerms: ["Hauptwohnsitz", "Abmeldung"],
    example: "ظرف ۳ روز پس از امضای قرارداد اجاره باید Meldezettel بگیرید.",
    tip: "این فرم را با امضای صاحب‌خانه در Meldeamt ثبت کنید.",
    popularity: 5,
  },
  {
    term: "Mietvertrag",
    definition: "قرارداد قانونی اجاره برای مشخص کردن حقوق و وظایف مستأجر و صاحب‌خانه.",
    category: "housing",
    relatedTerms: ["Betriebskosten", "Nachmieter", "Hauptwohnsitz"],
    example: "پیش از امضای Mietvertrag، شرایط فسخ قرارداد را بررسی کنید.",
    popularity: 5,
  },
  {
    term: "Nachmieter",
    definition: "مستأجر جدیدی که با توافق صاحب‌خانه جایگزین مستأجر فعلی در قرارداد اجاره می‌شود.",
    category: "housing",
    relatedTerms: ["Mietvertrag"],
    example: "برای خروج زودتر از موعد، می‌توانید Nachmieter معرفی کنید.",
    popularity: 3,
  },
  {
    term: "ÖGK",
    definition: "صندوق بیمه سلامت اتریش (Österreichische Gesundheitskasse) که بخش اصلی بیمه درمانی اجباری است.",
    category: "insurance",
    relatedTerms: ["E-Card", "Zusatzversicherung"],
    example: "ÖGK پوشش‌دهنده اصلی درمان برای کارمندان است.",
    popularity: 5,
  },
  {
    term: "Online Banking",
    definition: "خدمات دیجیتال بانکی برای مدیریت حساب، انتقال وجه و پرداخت قبوض.",
    category: "banking",
    relatedTerms: ["Bankomat"],
    example: "اکثر بانک‌های اتریش اپلیکیشن Online Banking با احراز هویت دو مرحله‌ای دارند.",
    popularity: 4,
  },
  {
    term: "Quittung",
    definition: "رسید رسمی پرداخت که برای مستندسازی هزینه‌های مالی در ادارات کاربرد دارد.",
    category: "documents",
    relatedTerms: ["Steuererklärung"],
    example: "برای کسر هزینه‌ها از مالیات، Quittung را نگه دارید.",
    popularity: 3,
  },
  {
    term: "Rentenversicherung",
    definition: "حق بیمه بازنشستگی که بخشی از حقوق سهم آینده شماست.",
    category: "work",
    relatedTerms: ["Lohnsteuer", "AMS"],
    example: "بخشی از حقوق ماهانه شما به Rentenversicherung واریز می‌شود.",
    popularity: 4,
  },
  {
    term: "Steuererklärung",
    definition: "اظهارنامه سالانه که برای محاسبه نهایی مالیات و احتمال بازگشت بخشی از آن پر می‌شود.",
    category: "tax",
    relatedTerms: ["Finanzamt", "Steuernummer", "Lohnsteuer"],
    example: "هر سال تا پایان ژوئن می‌توانید Steuererklärung ارسال کنید.",
    tip: "ارسال Steuererklärung معمولاً به بازگشت مالیات منجر می‌شود.",
    popularity: 5,
  },
  {
    term: "Steuernummer",
    definition: "شماره مالیاتی که برای انجام هرگونه فعالیت اقتصادی یا امور مالیاتی نیاز خواهید داشت.",
    category: "tax",
    relatedTerms: ["Finanzamt", "Steuererklärung"],
    example: "فریلنسرها باید Steuernummer از Finanzamt دریافت کنند.",
    popularity: 4,
  },
  {
    term: "Wohnsitzbestätigung",
    definition: "گواهی تأیید محل سکونت رسمی که برای اثبات آدرس در بسیاری از ادارات استفاده می‌شود.",
    category: "housing",
    relatedTerms: ["Hauptwohnsitz", "Meldezettel"],
    example: "برای افتتاح حساب بانکی ممکن است Wohnsitzbestätigung بخواهند.",
    popularity: 3,
  },
  {
    term: "Zusatzversicherung",
    definition: "بیمه تکمیلی درمانی که امکان دسترسی سریع‌تر به خدمات و پزشکان متخصص را فراهم می‌کند.",
    category: "insurance",
    relatedTerms: ["ÖGK", "E-Card"],
    example: "Zusatzversicherung هزینه‌های دندانپزشکی را بهتر پوشش می‌دهد.",
    tip: "برای خانواده‌ها، Zusatzversicherung توصیه می‌شود.",
    popularity: 4,
  },
];

// ==========================================
// POPULAR TERMS
// ==========================================
const POPULAR_TERMS = ["Meldezettel", "MA35", "ÖGK", "Finanzamt", "AMS", "ID Austria"];

// ==========================================
// MAIN COMPONENT
// ==========================================
const AdministrativeGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("glossary-bookmarks") || "[]");
      setBookmarks(saved);
    } catch { /* noop */ }
  }, []);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem("glossary-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Letters available
  const letters = useMemo(
    () => Array.from(new Set(glossaryData.map((item) => item.term[0].toUpperCase()))).sort(),
    []
  );

  // Stats
  const stats = useMemo(() => {
    const categoryCount: Partial<Record<Category, number>> = {};
    glossaryData.forEach((item) => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    return {
      total: glossaryData.length,
      categories: Object.keys(categoryCount).length,
      bookmarked: bookmarks.length,
      categoryCount,
    };
  }, [bookmarks]);

  // Filtering
  const filteredItems = useMemo(() => {
    let items = [...glossaryData];

    if (showOnlyBookmarks) {
      items = items.filter((item) => bookmarks.includes(item.term));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.term.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          (item.example && item.example.toLowerCase().includes(q)) ||
          (item.tip && item.tip.toLowerCase().includes(q))
      );
    }

    if (selectedLetter) {
      items = items.filter((item) => item.term.toUpperCase().startsWith(selectedLetter));
    }

    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    return items.sort((a, b) => a.term.localeCompare(b.term, "de"));
  }, [searchTerm, selectedLetter, selectedCategory, showOnlyBookmarks, bookmarks]);

  // Handlers
  const toggleBookmark = (term: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(term) ? prev.filter((t) => t !== term) : [...prev, term];
      toast.success(prev.includes(term) ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
      return next;
    });
  };

  const copyToClipboard = async (text: string, term: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTerm(term);
      setTimeout(() => setCopiedTerm(null), 2000);
      toast.success("متن کپی شد!");
    } catch {
      toast.error("خطا در کپی");
    }
  };

  const shareGlossary = async () => {
    const message = `📚 واژه‌نامه اداری اتریش‌نشین\n\n${glossaryData.length} اصطلاح کاربردی برای زندگی در اتریش\n\nhttps://otrish-iran.ir/?segment=glossary`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "واژه‌نامه اداری اتریش", text: message });
      } catch { /* cancelled */ }
    } else {
      navigator.clipboard.writeText(message);
      toast.success("لینک کپی شد!");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLetter(null);
    setSelectedCategory("all");
    setShowOnlyBookmarks(false);
  };

  const hasActiveFilters = searchTerm || selectedLetter || selectedCategory !== "all" || showOnlyBookmarks;

  // SEO Schema
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "واژه‌نامه مفاهیم اداری اتریش",
      description: "فرهنگ جامع اصطلاحات اداری، اقامتی و مالی اتریش برای فارسی‌زبانان",
      hasDefinedTerm: glossaryData.map((item) => ({
        "@type": "DefinedTerm",
        name: item.term,
        description: item.definition,
        inDefinedTermSet: "واژه‌نامه اتریش‌نشین",
      })),
    },
  ];

  return (
    <GuideContainer
      title="واژه‌نامه مفاهیم اداری"
      description="فرهنگ جامع و کاربردی از اصطلاحات ضروری برای پیمایش در سیستم اداری اتریش"
    >
      <SEO
        title="واژه‌نامه مفاهیم اداری اتریش ۲۰۲۶ | اتریش‌نشین"
        description="فرهنگ جامع اصطلاحات اداری، اقامتی، مالی و بیمه‌ای اتریش (MA35، AMS، ÖGK، Finanzamt) برای فارسی‌زبانان مقیم و مهاجران"
        keywords="واژه نامه اداری اتریش, اصطلاحات اقامتی, MA35, Meldezettel, ÖGK, AMS, Finanzamt, فرهنگ اصطلاحات اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-6" dir="rtl">
        {/* ========================================== */}
        {/* HERO HEADER */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-8 -bottom-12 text-[220px] opacity-5 pointer-events-none select-none">
            📚
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border-2 border-white/20 rounded-3xl p-2 backdrop-blur-sm shadow-2xl rotate-[-4deg] hover:rotate-[4deg] transition-transform duration-500">
                <img
                  src="/otrish_logo_1779961596526.png"
                  alt="اتریش‌نشین"
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                مرجع تخصصی اصطلاحات اداری اتریش
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mt-4 mb-3">
                واژه‌نامه
                <br />
                مفاهیم اداری اتریش
              </h1>

              <p className="text-sm text-rose-100 leading-relaxed max-w-2xl">
                {stats.total} اصطلاح کاربردی در {stats.categories} دسته‌بندی موضوعی، همراه با مثال‌های
                عملی و نکات تجربی — همه در یک قاب برای فارسی‌زبانان مقیم اتریش.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {[
                  { n: stats.total, l: "اصطلاح", icon: "📖" },
                  { n: stats.categories, l: "دسته‌بندی", icon: "🗂️" },
                  { n: stats.bookmarked, l: "نشان‌شده", icon: "⭐" },
                  { n: "۲۰۲۶", l: "به‌روزرسانی", icon: "🔄" },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 border border-white/15 rounded-2xl p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2 text-rose-200 text-[10px] font-bold">
                      <span>{s.icon}</span>
                      <span>{s.l}</span>
                    </div>
                    <div className="text-xl font-black mt-1">{s.n}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={shareGlossary}
              className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-black text-xs px-4 py-2.5 rounded-2xl transition backdrop-blur-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              اشتراک‌گذاری واژه‌نامه
            </button>
            <a
              href="https://wa.me/436889763256?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AF%D8%B1%20%D9%85%D9%88%D8%B1%D8%AF%20%DB%8C%DA%A9%DB%8C%20%D8%A7%D8%B2%20%D8%A7%D8%B5%D8%B7%D9%84%D8%A7%D8%AD%D8%A7%D8%AA%20%D8%A7%D8%AF%D8%A7%D8%B1%DB%8C%20%D8%A7%D8%AA%D8%B1%DB%8C%D8%B4%20%D8%B3%D9%88%D8%A7%D9%84%20%D8%AF%D8%A7%D8%B4%D8%AA%D9%85"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:scale-[1.02] text-white font-black text-xs px-4 py-2.5 rounded-2xl transition shadow-lg"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              سوال دارید؟ واتس‌اپ
            </a>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* SEARCH + CATEGORIES */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجوی اصطلاح، توضیح یا مثال… (مثال: MA35)"
              className="w-full bg-stone-50 border-2 border-stone-200 rounded-2xl py-4 pr-12 pl-12 text-sm font-bold focus:outline-none focus:border-[#c8102e] focus:ring-4 focus:ring-[#c8102e]/10 transition-all"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedLetter(null);
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-stone-200 rounded-full flex items-center justify-center hover:bg-stone-300 transition"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Popular Terms */}
          {!searchTerm && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-[#c8102e]" />
                <span className="text-[11px] font-black text-stone-500">پرطرفدارترین اصطلاحات:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_TERMS.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="text-[11px] font-black text-[#c8102e] bg-[#c8102e]/8 hover:bg-[#c8102e]/15 px-3 py-1.5 rounded-full border border-[#c8102e]/20 transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-3.5 h-3.5 text-[#c8102e]" />
              <span className="text-[11px] font-black text-stone-500">دسته‌بندی موضوعی:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === "all"
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white border-stone-200 hover:border-stone-400"
                }`}
              >
                همه ({stats.total})
              </button>
              {(Object.keys(CATEGORIES) as Category[]).map((cat) => {
                const c = CATEGORIES[cat];
                const count = stats.categoryCount[cat] || 0;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[11px] font-black px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? "bg-stone-900 text-white border-stone-900"
                        : `${c.bgColor} ${c.color} hover:shadow-sm`
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                    <span className={`text-[9px] px-1.5 rounded-full ${selectedCategory === cat ? "bg-white/25" : "bg-white/60"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alphabet */}
          {!searchTerm && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-3.5 h-3.5 text-[#c8102e]" />
                <span className="text-[11px] font-black text-stone-500">فیلتر الفبایی:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => setSelectedLetter(null)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                    !selectedLetter ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  All
                </button>
                {letters.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                    className={`w-8 h-8 rounded-xl text-xs font-black transition ${
                      selectedLetter === letter
                        ? "bg-[#c8102e] text-white shadow-md"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Status */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-stone-500">
                {filteredItems.length} اصطلاح یافت شد
              </span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyBookmarks}
                  onChange={(e) => setShowOnlyBookmarks(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#c8102e]"
                />
                <span className="text-[11px] font-black text-stone-600">
                  فقط نشان‌شده‌ها ({bookmarks.length})
                </span>
              </label>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-black text-[#c8102e] hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                پاک کردن فیلترها
              </button>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* RESULTS */}
        {/* ========================================== */}
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <TermCard
                  key={item.term}
                  item={item}
                  index={index}
                  isBookmarked={bookmarks.includes(item.term)}
                  onBookmark={() => toggleBookmark(item.term)}
                  onCopy={() => copyToClipboard(`${item.term}\n\n${item.definition}`, item.term)}
                  isCopied={copiedTerm === item.term}
                  onRelatedClick={(term) => {
                    setSearchTerm(term);
                    setSelectedLetter(null);
                    setSelectedCategory("all");
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-3"
          >
            <div className="text-5xl">🔍</div>
            <h3 className="font-black text-stone-800">اصطلاحی یافت نشد</h3>
            <p className="text-xs text-stone-500 font-bold">
              فیلترها یا کلمه جستجو را تغییر دهید تا نتایج بیشتری ببینید.
            </p>
            <button
              onClick={resetFilters}
              className="mt-3 px-5 py-2.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs rounded-2xl shadow-lg hover:scale-[1.02] transition"
            >
              نمایش همه اصطلاحات
            </button>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* CTA BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-8 text-white"
        >
          <div className="absolute -right-8 -bottom-8 text-[180px] opacity-5 pointer-events-none select-none">
            💬
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#c8102e] to-[#970d22] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg">
              💬
            </div>
            <div className="flex-1">
              <h3 className="font-black text-lg mb-2">
                در مورد یک اصطلاح اداری سوال دارید؟
              </h3>
              <p className="text-xs text-stone-300 font-bold leading-relaxed mb-4">
                کارشناسان اتریش‌نشین آماده پاسخگویی به سوالات شما درباره اصطلاحات، مدارک، فرم‌ها و
                فرآیندهای اداری اتریش هستند. مشاوره کاملاً رایگان است.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://wa.me/436889763256?text=%D8%B3%D9%84%D8%A7%D9%85%D8%8C%20%D8%AF%D8%B1%20%D9%85%D9%88%D8%B1%D8%AF%20%D8%A7%D8%B5%D8%B7%D9%84%D8%A7%D8%AD%D8%A7%D8%AA%20%D8%A7%D8%AF%D8%A7%D8%B1%DB%8C%20%D8%A7%D8%AA%D8%B1%DB%8C%D8%B4%20%D8%B3%D9%88%D8%A7%D9%84%20%D8%AF%D8%A7%D8%B4%D8%AA%D9%85"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  پرسش در واتس‌اپ
                </a>
                <a
                  href="tel:+436889763256"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs px-5 py-3 rounded-2xl transition backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4" />
                  تماس تلفنی
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* INFO NOTE */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-amber-900 font-bold leading-relaxed">
              <b>نکته:</b> این واژه‌نامه صرفاً جنبه آموزشی و راهنمایی دارد. تعاریف ممکن است در
              شهرها یا ایالت‌های مختلف اتریش تفاوت‌های جزئی داشته باشند. برای تصمیم‌های رسمی،
              همیشه به منابع رسمی مراجعه کنید یا با کارشناسان ما مشورت نمایید.
            </p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <a
                href="https://www.oesterreich.gv.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black text-amber-800 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                پرتال رسمی اتریش
              </a>
              <a
                href="https://www.migration.gv.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black text-amber-800 hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                راهنمای مهاجرت اتریش
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SCROLL TO TOP */}
      {/* ========================================== */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-24 left-6 z-[400] w-12 h-12 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition"
            aria-label="بازگشت به بالا"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </GuideContainer>
  );
};

// ==========================================
// TERM CARD COMPONENT (Enhanced)
// ==========================================
function TermCard({
  item,
  index,
  isBookmarked,
  onBookmark,
  onCopy,
  isCopied,
  onRelatedClick,
}: {
  key?: React.Key;
  item: GlossaryItem;
  index: number;
  isBookmarked: boolean;
  onBookmark: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onRelatedClick: (term: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const category = CATEGORIES[item.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -2 }}
      className={`bg-white border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all ${
        isOpen ? "border-[#c8102e]/40 ring-2 ring-[#c8102e]/10" : "border-stone-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-5 pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center gap-4 text-right group"
        >
          {/* Category Icon */}
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-2xl flex-shrink-0 transition ${category.bgColor}`}
          >
            {category.icon}
          </div>

          {/* Term Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-black text-stone-900 text-base group-hover:text-[#c8102e] transition-colors">
                {item.term}
              </h3>
              {item.popularity && item.popularity >= 5 && (
                <span className="text-[9px] font-black bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" />
                  پرطرفدار
                </span>
              )}
            </div>
            <span
              className={`inline-block text-[9px] font-black px-2 py-0.5 rounded-full border ${category.bgColor} ${category.color}`}
            >
              {category.label}
            </span>
          </div>

          {/* Chevron */}
          <ChevronDown
            className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform ${
              isOpen ? "rotate-180 text-[#c8102e]" : ""
            }`}
          />
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onBookmark}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
              isBookmarked
                ? "bg-[#c8102e] text-white shadow-md"
                : "bg-stone-100 text-stone-400 hover:text-[#c8102e] hover:bg-stone-200"
            }`}
            aria-label="نشان‌گذاری"
          >
            <Star className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={onCopy}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
              isCopied
                ? "bg-emerald-500 text-white"
                : "bg-stone-100 text-stone-400 hover:text-stone-700 hover:bg-stone-200"
            }`}
            aria-label="کپی"
          >
            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-stone-100 mt-1">
              {/* Definition */}
              <div className="pt-4">
                <div className="flex items-start gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-[#c8102e] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-700 font-bold leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                {/* Example */}
                {item.example && (
                  <div className="bg-blue-50 border-r-4 border-blue-400 rounded-l-2xl p-3 mb-3">
                    <div className="flex items-center gap-2 text-blue-700 text-[10px] font-black mb-1">
                      <Info className="w-3 h-3" />
                      مثال کاربردی
                    </div>
                    <p className="text-[11px] text-blue-900 font-bold leading-relaxed">
                      {item.example}
                    </p>
                  </div>
                )}

                {/* Tip */}
                {item.tip && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[10px] font-black text-emerald-700 mb-1">
                          💡 نکته تجربی
                        </div>
                        <p className="text-[11px] text-emerald-800 font-bold leading-relaxed">
                          {item.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Related Terms */}
                {item.relatedTerms && item.relatedTerms.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-stone-500 mb-2">
                      <Hash className="w-3 h-3" />
                      اصطلاحات مرتبط:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.relatedTerms.map((rt) => (
                        <button
                          key={rt}
                          onClick={() => onRelatedClick(rt)}
                          className="text-[10px] font-black text-[#c8102e] bg-[#c8102e]/8 hover:bg-[#c8102e]/15 px-2.5 py-1 rounded-full border border-[#c8102e]/20 transition flex items-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          {rt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popularity */}
                {item.popularity && (
                  <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                    <span className="text-[10px] font-black text-stone-400">اهمیت:</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < item.popularity!
                              ? "fill-amber-400 text-amber-400"
                              : "text-stone-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdministrativeGlossary;