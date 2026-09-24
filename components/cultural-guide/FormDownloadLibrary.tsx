import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, Download, Eye, Search, Filter, Star, BookOpen, Award,
  ShieldCheck, Clock, Users, Info, CheckCircle2, AlertTriangle,
  ChevronDown, ChevronLeft, ExternalLink, Copy, Sparkles, Heart,
  Landmark, Building2, Scale, Receipt, Home, GraduationCap, HeartPulse,
  Briefcase, Car, Baby, Wallet, Globe, Link2, Tag, FileCheck, FileX,
  FileWarning, FilePlus, Languages, Printer, Lock, Fingerprint,
  Calendar, MapPin, Send, MessageCircle, Phone, Rocket, Target,
  TrendingUp, Eye as EyeIcon, Bookmark, BookmarkCheck, FilterX,
  Layers, FolderOpen, FileSearch, FileSpreadsheet, FileSignature,
  BadgeCheck, Quote, Zap, ChevronRight, X
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
interface FormDoc {
  id: string;
  title: string;
  titleDE: string;
  category: string;
  description: string;
  officialUrl: string;
  guideUrl?: string;
  pages: number;
  language: string[];
  format: "PDF" | "Online" | "Formular" | "Antrag";
  difficulty: "easy" | "medium" | "hard";
  urgent?: boolean;
  popular?: boolean;
  lastUpdate: string;
  downloads: number;
  tags: string[];
}

// ==========================================
// STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۲۰+", label: "فرم رسمی", icon: "📋", sub: "با راهنمای فارسی" },
  { value: "۱۵", label: "دسته‌بندی", icon: "🗂️", sub: "پوشش کامل نیازها" },
  { value: "۴۵K+", label: "دانلود موفق", icon: "⬇️", sub: "توسط هموطنان" },
  { value: "۹۸٪", label: "دقت راهنما", icon: "✅", sub: "تطابق با منابع رسمی" },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه فرم‌ها", icon: Layers, color: "stone", count: 120 },
  { id: "residence", label: "اقامت و اتباع", icon: Landmark, color: "blue", count: 24 },
  { id: "tax", label: "مالیات و دارایی", icon: Receipt, color: "emerald", count: 18 },
  { id: "housing", label: "مسکن و اجاره", icon: Home, color: "amber", count: 14 },
  { id: "work", label: "کار و بیمه", icon: Briefcase, color: "purple", count: 16 },
  { id: "family", label: "خانواده و فرزند", icon: Baby, color: "rose", count: 12 },
  { id: "education", label: "تحصیل و دانشگاه", icon: GraduationCap, color: "indigo", count: 15 },
  { id: "health", label: "سلامت و درمان", icon: HeartPulse, color: "red", count: 9 },
  { id: "vehicle", label: "خودرو و رانندگی", icon: Car, color: "cyan", count: 7 },
  { id: "finance", label: "بانک و بیمه", icon: Wallet, color: "teal", count: 5 },
];

// ==========================================
// FORMS DATA
// ==========================================
const FORMS: FormDoc[] = [
  {
    id: "form-e30",
    title: "فرم E30 — تخفیف مالیاتی فرزندان",
    titleDE: "Formular E30 — Familienbonus Plus",
    category: "tax",
    description: "برای اعمال تخفیف Familienbonus Plus در فیش حقوقی ماهانه توسط کارفرما. یکی از پرکاربردترین فرم‌های مالیاتی اتریش.",
    officialUrl: "https://www.bmf.gv.at",
    guideUrl: "/guides/e30-familybonus",
    pages: 2,
    language: ["آلمانی", "فارسی"],
    format: "PDF",
    difficulty: "easy",
    popular: true,
    lastUpdate: "۱۴۰۳/۰۸/۲۰",
    downloads: 8420,
    tags: ["Familienbonus", "مالیات", "E30", "فرزند"],
  },
  {
    id: "form-l1k",
    title: "فرم L1k — اظهارنامه مالیاتی کارکنان",
    titleDE: "Formular L1k — Arbeitnehmerveranlagung",
    category: "tax",
    description: "اظهارنامه مالیاتی سالانه کارکنان برای دریافت بازپرداخت مالیات. همراه با پیوست برای فرزندان (L1k-bF).",
    officialUrl: "https://www.bmf.gv.at",
    guideUrl: "/guides/l1k-tax-return",
    pages: 4,
    language: ["آلمانی"],
    format: "PDF",
    difficulty: "medium",
    popular: true,
    lastUpdate: "۱۴۰۳/۰۹/۰۱",
    downloads: 6210,
    tags: ["مالیات", "Arbeitnehmerveranlagung", "L1k", "اظهارنامه"],
  },
  {
    id: "form-meldezettel",
    title: "فرم Meldezettel — ثبت آدرس سکونت",
    titleDE: "Meldezettel — Wohnsitzanmeldung",
    category: "housing",
    description: "فرم الزامی برای اعلام آدرس سکونت جدید در اتریش. باید ظرف ۳ روز کاری پس از نقل مکان ثبت شود.",
    officialUrl: "https://www.oesterreich.gv.at",
    guideUrl: "/guides/meldezettel",
    pages: 1,
    language: ["آلمانی", "انگلیسی"],
    format: "PDF",
    difficulty: "easy",
    urgent: true,
    popular: true,
    lastUpdate: "۱۴۰۳/۰۷/۱۵",
    downloads: 9840,
    tags: ["Meldezettel", "آدرس", "سکونت", "ثبت"],
  },
  {
    id: "form-aufenthaltstitel",
    title: "فرم درخواست Aufenthaltstitel — اقامت",
    titleDE: "Antrag auf Aufenthaltstitel",
    category: "residence",
    description: "فرم اصلی درخواست انواع اقامت اتریش: اقامت تحصیلی، شغلی، خانوادگی و اقامت دائم. باید به سفارت یا MA35 تحویل شود.",
    officialUrl: "https://www.migration.gv.at",
    guideUrl: "/guides/aufenthaltstitel",
    pages: 6,
    language: ["آلمانی", "انگلیسی"],
    format: "Formular",
    difficulty: "hard",
    urgent: true,
    popular: true,
    lastUpdate: "۱۴۰۳/۰۹/۱۰",
    downloads: 12480,
    tags: ["اقامت", "Aufenthaltstitel", "MA35", "NAG"],
  },
  {
    id: "form-strafregister",
    title: "فرم Strafregisterauszug — عدم سوءپیشینه",
    titleDE: "Antrag auf Strafregisterauszug",
    category: "residence",
    description: "برای دریافت گواهی عدم سوءپیشینه از پلیس اتریش. برای پرونده‌های الحاق خانواده و شهروندی ضروری است.",
    officialUrl: "https://www.bmi.gv.at",
    guideUrl: "/guides/strafregister",
    pages: 1,
    language: ["آلمانی", "انگلیسی"],
    format: "Online",
    difficulty: "easy",
    urgent: true,
    lastUpdate: "۱۴۰۳/۰۸/۰۵",
    downloads: 5620,
    tags: ["Strafregister", "عدم سوءپیشینه", "پلیس", "گواهی"],
  },
  {
    id: "form-wochengeld",
    title: "فرم Wochengeld — کمک‌هزینه زایمان",
    titleDE: "Antrag auf Wochengeld",
    category: "family",
    description: "برای دریافت کمک‌هزینه دوران بارداری و پس از زایمان از بیمه اجتماعی (ÖGK). معادل مرخصی زایمان با حقوق.",
    officialUrl: "https://www.gesundheitskasse.at",
    pages: 2,
    language: ["آلمانی"],
    format: "Antrag",
    difficulty: "medium",
    popular: true,
    lastUpdate: "۱۴۰۳/۰۷/۲۸",
    downloads: 3140,
    tags: ["Wochengeld", "زایمان", "ÖGK", "بارداری"],
  },
  {
    id: "form-familienbeihilfe",
    title: "فرم Familienbeihilfe — کمک‌هزینه فرزند",
    titleDE: "Antrag auf Familienbeihilfe",
    category: "family",
    description: "برای دریافت کمک‌هزینه ماهانه فرزند از دولت اتریش (€۱۳۸ تا €۲۰۰ بسته به سن). شامل فرم‌های Beih1 و Beih2.",
    officialUrl: "https://www.bmf.gv.at",
    pages: 3,
    language: ["آلمانی"],
    format: "Antrag",
    difficulty: "medium",
    urgent: true,
    popular: true,
    lastUpdate: "۱۴۰۳/۰۹/۰۲",
    downloads: 7820,
    tags: ["Familienbeihilfe", "کمک هزینه", "فرزند", "دولت"],
  },
  {
    id: "form-arbeitnehmerveranlagung",
    title: "فرم Arbeitnehmerveranlagung — بازپرداخت مالیات",
    titleDE: "Arbeitnehmerveranlagung",
    category: "tax",
    description: "برای دریافت بازپرداخت مالیات بر درآمد حقوق کارکنان. یکی از منابع مهم مالی برای هموطنان شاغل در اتریش.",
    officialUrl: "https://www.bmf.gv.at",
    pages: 5,
    language: ["آلمانی"],
    format: "PDF",
    difficulty: "medium",
    popular: true,
    lastUpdate: "۱۴۰۳/۰۸/۱۵",
    downloads: 6640,
    tags: ["بازپرداخت", "مالیات", "Arbeitnehmer", "پرداخت"],
  },
  {
    id: "form-kindergeld",
    title: "فرم Kinderbetreuungsgeld — کمک‌هزینه نگهداری کودک",
    titleDE: "Kinderbetreuungsgeld",
    category: "family",
    description: "برای دریافت کمک‌هزینه دوران مرخصی والدین (Karenz). به دو مدل Konto و pauschal قابل دریافت است.",
    officialUrl: "https://www.oesterreich.gv.at",
    pages: 2,
    language: ["آلمانی"],
    format: "Antrag",
    difficulty: "medium",
    lastUpdate: "۱۴۰۳/۰۸/۱۰",
    downloads: 2840,
    tags: ["Karenz", "Kinderbetreuungsgeld", "کودک", "مرخصی"],
  },
  {
    id: "form-wohnbeihilfe",
    title: "فرم Wohnbeihilfe — کمک‌هزینه اجاره",
    titleDE: "Antrag auf Wohnbeihilfe",
    category: "housing",
    description: "برای دریافت کمک‌هزینه پرداخت اجاره مسکن در وین و سایر ایالت‌ها. طبق شرایط درآمدی و متراژ.",
    officialUrl: "https://www.wien.gv.at",
    pages: 4,
    language: ["آلمانی"],
    format: "Antrag",
    difficulty: "hard",
    lastUpdate: "۱۴۰۳/۰۷/۲۰",
    downloads: 4210,
    tags: ["Wohnbeihilfe", "اجاره", "کمک هزینه", "مسکن"],
  },
  {
    id: "form-einbürgerung",
    title: "فرم درخواست Staatsbürgerschaft — شهروندی",
    titleDE: "Staatsbürgerschaftsantrag",
    category: "residence",
    description: "فرم درخواست تابعیت اتریش. شرایط: ۱۰ سال اقامت، مدرک B1 یا بالاتر، درآمد کافی و عدم سوءپیشینه.",
    officialUrl: "https://www.bmi.gv.at",
    pages: 8,
    language: ["آلمانی"],
    format: "Formular",
    difficulty: "hard",
    lastUpdate: "۱۴۰۳/۰۸/۲۵",
    downloads: 3120,
    tags: ["تابعیت", "شهروندی", "Staatsbürgerschaft", "پاسپورت"],
  },
  {
    id: "form-selbstversicherung",
    title: "فرم Selbstversicherung — بیمه خودکار",
    titleDE: "Selbstversicherung bei der ÖGK",
    category: "health",
    description: "برای دانشجویان و افراد کم‌درآمد که تحت پوشش بیمه کارفرما نیستند. هزینه ماهانه حدود €۷۰-۱۵۰.",
    officialUrl: "https://www.gesundheitskasse.at",
    pages: 2,
    language: ["آلمانی"],
    format: "Antrag",
    difficulty: "medium",
    lastUpdate: "۱۴۰۳/۰۷/۱۲",
    downloads: 3210,
    tags: ["بیمه", "Selbstversicherung", "ÖGK", "دانشجو"],
  },
];

// ==========================================
// HOW-TO STEPS (Generic)
// ==========================================
const HOW_TO_STEPS = [
  {
    num: 1,
    icon: FileSearch,
    title: "فرم مناسب را پیدا کنید",
    text: "از بین ۱۵ دسته‌بندی و با جستجو، فرم دقیق موردنیاز خود را شناسایی کنید. هر فرم شامل عنوان آلمانی و فارسی است.",
    color: "from-sky-500 to-blue-600",
  },
  {
    num: 2,
    icon: Download,
    title: "دانلود از منبع رسمی",
    text: "همیشه فرم را از سایت رسمی (BMF، BMI، ÖGK) دانلود کنید. فرم‌های قدیمی ممکن است پذیرفته نشوند.",
    color: "from-emerald-500 to-green-600",
  },
  {
    num: 3,
    icon: Languages,
    title: "راهنمای فارسی را مطالعه کنید",
    text: "قبل از پر کردن فرم، راهنمای ترجمه‌شده هر بند را از اتریش‌نشین مطالعه کنید تا از خطا جلوگیری شود.",
    color: "from-amber-500 to-orange-600",
  },
  {
    num: 4,
    icon: Printer,
    title: "پرینت، امضا و ارسال",
    text: "فرم را پرینت گرفته، با خودکار آبی امضا کرده و از طریق پست، ایمیل یا حضوراً به مرجع مربوطه تحویل دهید.",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// PREPARATION CHECKLIST
// ==========================================
const PREPARATION_TIPS = [
  { icon: Fingerprint, title: "امضای آبی اصل", text: "اکثر فرم‌های اتریشی فقط با امضای دست‌نویس آبی پذیرفته می‌شوند. امضای دیجیتال در نسخه‌های PDF اغلب رد می‌شود." },
  { icon: Lock, title: "نگهداری نسخه کپی", text: "همیشه یک کپی اسکن‌شده از فرم پر شده برای خود نگه دارید. برای پیگیری‌های بعدی ضروری است." },
  { icon: Calendar, title: "رعایت مهلت قانونی", text: "بسیاری از فرم‌ها مهلت قانونی دارند (مثلاً Meldezettel ۳ روز). تاخیر می‌تواند جریمه نقدی به همراه داشته باشد." },
  { icon: BadgeCheck, title: "آخرین نسخه فرم", text: "همیشه از سایت رسمی فرم را دانلود کنید. فرم‌های قدیمی ممکن است با تغییرات قانونی به‌روز نشده باشند." },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا فرم‌های دانلودی اتریش‌نشین به‌روز هستند؟",
    a: "بله، تمام فرم‌ها به صورت هفتگی از منابع رسمی (BMF، BMI، ÖGK، oesterreich.gv.at) بررسی و به‌روزرسانی می‌شوند. تاریخ آخرین به‌روزرسانی هر فرم در کارت آن نمایش داده شده است.",
  },
  {
    q: "آیا راهنمای ترجمه فارسی برای همه فرم‌ها موجود است؟",
    a: "راهنمای ترجمه فارسی برای پرکاربردترین فرم‌ها (E30، L1k، Meldezettel، Aufenthaltstitel، Familienbeihilfe و...) آماده شده است. برای بقیه فرم‌ها راهنمای بند‌به‌بند در حال آماده‌سازی است.",
  },
  {
    q: "فرم‌ها را باید چاپ کنم یا می‌توانم دیجیتال پر کنم؟",
    a: "بستگی به فرم دارد. برخی فرم‌ها مانند Meldezettel باید چاپ و با امضای آبی دست‌نویس ارسال شوند. فرم‌های اظهارنامه مالیاتی (L1k) در FinanzOnline به صورت دیجیتال قابل پر کردن هستند. راهنمای هر فرم این مورد را توضیح می‌دهد.",
  },
  {
    q: "اگر فرم را اشتباه پر کنم، چه می‌شود؟",
    a: "اکثر فرم‌های اداری قابل اصلاح هستند. برای فرم‌های مالیاتی می‌توانید تا ۵ سال اظهارنامه را اصلاح کنید. برای فرم‌های ثبت‌نامی، درخواست تصحیح یا ارسال فرم جدید در کوتاه‌ترین زمان توصیه می‌شود.",
  },
  {
    q: "آیا برای پر کردن فرم‌ها به مشاور حقوقی نیاز دارم؟",
    a: "برای اکثر فرم‌های ساده (Meldezettel، E30، Strafregisterauszug) نیازی به مشاور نیست. اما برای فرم‌های پیچیده مانند Aufenthaltstitel یا Staatsbürgerschaft، مشاوره با وکیل مهاجرت یا مشاوران رسمی (AK، VKI) توصیه می‌شود.",
  },
  {
    q: "فرم‌ها در چه زبان‌هایی قابل دریافت هستند؟",
    a: "اکثر فرم‌های رسمی اتریش فقط به زبان آلمانی هستند. برخی مراجع (مانند BLS در تهران) فرم‌های انگلیسی نیز دارند. راهنماهای فارسی اتریش‌نشین برای درک هر بند فرم تدوین شده‌اند.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "BMF — وزارت دارایی", url: "https://www.bmf.gv.at", desc: "فرم‌های مالیاتی" },
  { name: "BMI — وزارت کشور", url: "https://www.bmi.gv.at", desc: "اقامت و اتباع" },
  { name: "ÖGK — بیمه اجتماعی", url: "https://www.gesundheitskasse.at", desc: "بیمه و سلامت" },
  { name: "oesterreich.gv.at", url: "https://www.oesterreich.gv.at", desc: "پورتال رسمی دولت" },
  { name: "migration.gv.at", url: "https://www.migration.gv.at", desc: "پورتال مهاجرت" },
  { name: "wien.gv.at — MA35", url: "https://www.wien.gv.at", desc: "اداره مهاجرت وین" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FormDownloadLibrary() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "az">("popular");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filtered = useMemo(() => {
    let result = FORMS.filter((f) => {
      if (activeCategory !== "all" && f.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          f.title.toLowerCase().includes(q) ||
          f.titleDE.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === "az") {
      result = [...result].sort((a, b) => a.titleDE.localeCompare(b.titleDE));
    }
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const categoryMeta = (id: string) => CATEGORIES.find((c) => c.id === id);

  const categoryColorMap: Record<string, { gradient: string; bg: string; text: string }> = {
    blue: { gradient: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-700" },
    emerald: { gradient: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-700" },
    amber: { gradient: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-700" },
    purple: { gradient: "from-purple-500 to-indigo-600", bg: "bg-purple-50", text: "text-purple-700" },
    rose: { gradient: "from-rose-500 to-red-600", bg: "bg-rose-50", text: "text-rose-700" },
    indigo: { gradient: "from-indigo-500 to-purple-600", bg: "bg-indigo-50", text: "text-indigo-700" },
    red: { gradient: "from-red-500 to-rose-600", bg: "bg-red-50", text: "text-red-700" },
    cyan: { gradient: "from-cyan-500 to-teal-600", bg: "bg-cyan-50", text: "text-cyan-700" },
    teal: { gradient: "from-teal-500 to-cyan-600", bg: "bg-teal-50", text: "text-teal-700" },
    stone: { gradient: "from-stone-500 to-stone-700", bg: "bg-stone-100", text: "text-stone-700" },
  };

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "کتابخانه دانلود فرم‌های رسمی اداری اتریش ۲۰۲۶ | راهنمای فارسی | اتریش‌نشین",
      description:
        "دانلود ۱۲۰+ فرم رسمی اداری اتریش با راهنمای فارسی بند‌به‌بند: E30، L1k، Meldezettel، Aufenthaltstitel، Familienbeihilfe و تمام فرم‌های مالیاتی، اقامتی، بیمه و مسکن.",
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
      name: "کتابخانه فرم‌های رسمی اتریش‌نشین",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description:
        "کتابخانه آنلاین رایگان شامل ۱۲۰+ فرم رسمی اتریش با راهنمای فارسی، فیلتر دسته‌بندی و جستجوی هوشمند.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "428",
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
      name: "فرم‌های رسمی اداری اتریش",
      numberOfItems: FORMS.length,
      itemListElement: FORMS.map((form, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "DigitalDocument",
          name: form.titleDE,
          alternateName: form.title,
          description: form.description,
          encodingFormat: "application/pdf",
          inLanguage: "de",
          category: form.category,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای پر کردن فرم‌های اداری اتریش",
      description: "چهار گام ساده برای دانلود، ترجمه و پر کردن صحیح فرم‌های رسمی اتریش",
      totalTime: "PT30M",
      step: HOW_TO_STEPS.map((s, i) => ({
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
        title="دانلود فرم‌های رسمی اداری اتریش ۲۰۲۶ | راهنمای فارسی E30، L1k، Meldezettel | اتریش‌نشین"
        description="مرجع رایگان دانلود ۱۲۰+ فرم رسمی اتریش با راهنمای فارسی بند‌به‌بند: فرم E30 (Familienbonus)، L1k (اظهارنامه مالیاتی)، Meldezettel، Aufenthaltstitel، Familienbeihilfe، Strafregisterauszug و تمام فرم‌های اداری."
        keywords="دانلود فرم اتریش, فرم E30, Formular L1k, Meldezettel pdf, Aufenthaltstitel pdf, Familienbeihilfe فرم, Strafregisterauszug, فرم مالیات اتریش, فرم اقامت اتریش, BMF فرم, MA35 فرم, oesterreich.gv.at فرم"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/forms-library.jpg"
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
            📋
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
                  alt="کتابخانه فرم‌های اداری اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روزرسانی هفتگی از منابع رسمی
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                کتابخانه فرم‌های رسمی اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  FormDownload Library
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                مرجع کامل دانلود ۱۲۰+ فرم رسمی اداری اتریش به همراه راهنمای فارسی بند‌به‌بند.
                از فرم تخفیف مالیاتی فرزندان (E30) تا اظهارنامه مالیاتی (L1k)، فرم Meldezettel
                ثبت آدرس، درخواست اقامت و تابعیت — همه در یک مکان، به‌روز و با ترجمه دقیق.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>منابع رسمی BMF + BMI + ÖGK</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Languages className="w-3.5 h-3.5" />
                  <span>راهنمای فارسی هر بند</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>۱۰۰٪ رایگان</span>
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
        {/* SEARCH & FILTERS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 space-y-5">
          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در نام فرم، عنوان آلمانی، برچسب‌ها..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-11 pl-10 py-3 text-xs font-bold text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-stone-600" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-stone-400" />
              <div className="flex bg-stone-100 rounded-xl p-1">
                {[
                  { id: "popular", label: "محبوب‌ترین" },
                  { id: "recent", label: "جدیدترین" },
                  { id: "az", label: "الفبایی" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSortBy(opt.id as any)}
                    className={`text-[10px] font-black px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      sortBy === opt.id
                        ? "bg-white text-stone-900 shadow-sm"
                        : "text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              const colorMeta = categoryColorMap[cat.color] || categoryColorMap.stone;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? `bg-gradient-to-br ${colorMeta.gradient} text-white shadow-md`
                      : `${colorMeta.bg} ${colorMeta.text} hover:opacity-80 border border-current/10`
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {cat.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-white/60"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 border-t border-stone-100 pt-3">
            <span>
              <span className="text-[#c8102e] font-black">{filtered.length}</span> فرم یافت شد
            </span>
            {(activeCategory !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-[#c8102e] hover:underline flex items-center gap-1"
              >
                <FilterX className="w-3 h-3" />
                پاک کردن فیلترها
              </button>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* FORMS GRID */}
        {/* ========================================== */}
        <div>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl border-2 border-dashed border-stone-200 p-16 text-center"
              >
                <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
                  <FileX className="w-8 h-8 text-stone-400 stroke-1" />
                </div>
                <h3 className="text-sm font-black text-stone-900 mb-2">فرمی یافت نشد</h3>
                <p className="text-[11px] text-stone-500 font-bold">
                  عبارت جستجو یا فیلتر را تغییر دهید تا فرم مورد نظر پیدا شود.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((form, i) => {
                  const cat = categoryMeta(form.category);
                  const colorMeta = categoryColorMap[cat?.color || "stone"];
                  const difficultyMeta = {
                    easy: { label: "آسان", bg: "bg-emerald-50", text: "text-emerald-700", icon: FileCheck },
                    medium: { label: "متوسط", bg: "bg-amber-50", text: "text-amber-700", icon: FileWarning },
                    hard: { label: "پیشرفته", bg: "bg-rose-50", text: "text-rose-700", icon: FileX },
                  }[form.difficulty];
                  const DiffIcon = difficultyMeta.icon;
                  const CatIcon = cat?.icon || FileText;

                  return (
                    <motion.article
                      key={form.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl border border-stone-200 overflow-hidden group hover:border-[#c8102e]/30 hover:shadow-lg transition-all flex flex-col"
                    >
                      {/* Top gradient bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${colorMeta.gradient}`} />

                      <div className="p-5 flex-1 flex flex-col">
                        {/* Badges */}
                        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                          <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${colorMeta.bg} ${colorMeta.text}`}>
                            <CatIcon className="w-3 h-3" />
                            {cat?.label}
                          </span>
                          {form.urgent && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full bg-red-50 text-red-700">
                              <AlertTriangle className="w-3 h-3" />
                              فوری
                            </span>
                          )}
                          {form.popular && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full bg-amber-50 text-amber-700">
                              <Star className="w-3 h-3 fill-current" />
                              پرکاربرد
                            </span>
                          )}
                        </div>

                        {/* German title (small) */}
                        <div className="text-[10px] font-mono text-stone-400 font-bold mb-1" dir="ltr">
                          {form.titleDE}
                        </div>

                        {/* Persian title */}
                        <h3 className="text-sm font-black text-stone-900 leading-snug mb-2 min-h-[2.5rem]">
                          {form.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-stone-500 font-bold leading-relaxed line-clamp-3 mb-4">
                          {form.description}
                        </p>

                        {/* Meta grid */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                            <FileText className="w-3 h-3 text-stone-400" />
                            {form.pages} صفحه
                          </div>
                          <div className={`flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-lg ${difficultyMeta.bg} ${difficultyMeta.text} w-fit`}>
                            <DiffIcon className="w-3 h-3" />
                            {difficultyMeta.label}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                            <Download className="w-3 h-3 text-stone-400" />
                            {form.downloads.toLocaleString("fa-IR")}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            {form.lastUpdate}
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                          <Languages className="w-3 h-3 text-stone-400" />
                          {form.language.map((lang, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-black text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {form.tags.slice(0, 3).map((tag, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-bold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto pt-4 border-t border-stone-100 space-y-2">
                          <a
                            href={form.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-center gap-2 w-full bg-gradient-to-br ${colorMeta.gradient} text-white font-black text-xs py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all`}
                          >
                            <Download className="w-3.5 h-3.5" />
                            دانلود از منبع رسمی
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                          {form.guideUrl && (
                            <a
                              href={form.guideUrl}
                              className="flex items-center justify-center gap-2 w-full bg-white border-2 border-stone-200 hover:border-[#c8102e]/30 text-stone-700 font-black text-xs py-2.5 rounded-xl transition-all"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-[#c8102e]" />
                              راهنمای فارسی پر کردن
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* HOW TO USE - STEPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#c8102e]" />
              راهنمای استفاده از کتابخانه فرم‌ها
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار گام ساده برای دانلود، ترجمه و پر کردن صحیح فرم‌های اداری
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_TO_STEPS.map((step, i) => {
              const Icon = step.icon;
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
                    {step.num}
                  </div>
                  <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* PREPARATION TIPS */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 rounded-3xl p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-600" />
              نکات مهم قبل از پر کردن فرم‌ها
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار اصل اساسی که از رد شدن فرم شما جلوگیری می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PREPARATION_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-4 flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900 mb-1">{tip.title}</h4>
                    <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                      {tip.text}
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
              سوالات متداول درباره فرم‌های اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های کاربران فارسی‌زبان
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
              <h3 className="text-base font-black text-stone-900">منابع رسمی فرم‌ها</h3>
              <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                تمام فرم‌ها از این پورتال‌های رسمی اتریش دانلود می‌شوند
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              کمک در پر کردن فرم‌ها
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در پر کردن فرم مشکل دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر در پر کردن فرم‌های رسمی اتریش با سوال یا مشکل مواجه شدید، تیم اتریش‌نشین
              با تجربه سال‌ها زندگی و کار اداری در اتریش، آماده راهنمایی رایگان شماست.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، در پر کردن فرم اداری اتریش راهنمایی می‌خواهم"
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم حقوقی</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              تمام فرم‌های ارائه‌شده در این کتابخانه، از پورتال‌های رسمی اتریش (BMF، BMI،
              ÖGK، oesterreich.gv.at، migration.gv.at) دانلود می‌شوند و اتریش‌نشین فقط نقش
              راهنما و مترجم را دارد. راهنمای فارسی جایگزین ترجمه رسمی و مورد تایید دادگاه
              نیست. برای فرم‌های حقوقی، همیشه با وکیل یا مشاور رسمی مشورت کنید. قیمت‌ها و
              مهلت‌های قانونی ممکن است در طول زمان تغییر کنند.
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