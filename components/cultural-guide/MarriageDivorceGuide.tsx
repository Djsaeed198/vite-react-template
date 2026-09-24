import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, HeartHandshake, Calendar, MapPin, Phone, Mail, CheckCircle,
  ShieldCheck, AlertTriangle, Info, HelpCircle, ChevronDown, ExternalLink,
  MessageCircle, Send, Handshake, Award, Users, Sparkles, Zap, Clock,
  FileText, Scale, Gavel, Wallet, Landmark, Building2, Languages, Globe,
  Grid3x3, List, X, RefreshCw, Lightbulb, ListChecks, Target, Trophy,
  BarChart3, Filter, SlidersHorizontal, BellRing, CheckSquare, Square,
  UserCheck, Briefcase, Home, CreditCard, Smartphone, Monitor, Timer,
  Gauge, Route, Milestone, Compass, Flag, Rocket, Crown, Gem, Flame,
  ThumbsUp, XCircle, AlertCircle, Plane, Ship, Train, Car, Bike, Hotel,
  Utensils, Coffee, ShoppingBag, Baby, Accessibility, UserPlus,
  FileSignature, Stamp, FileCheck, BookMarked, PieChart, TrendingUp,
  TrendingDown, Euro, Banknote, Calculator, Receipt, UsersRound,
  CircleDollarSign, Scale as ScaleIcon, BabyIcon, PersonStanding,
  Heart as HeartIcon, Sparkle, Star, Verified, BadgeCheck,
  Landmark as LandmarkIcon, Church, FileText as FileTextIcon,
  IdCard, ClipboardList, CalendarCheck, CalendarX, CalendarClock,
  MapPinned, Navigation, Locate, LocateFixed, Printer, Download,
  Share2, Bookmark, Eye, Play, Pause, Volume2, Mic, Camera,
  Image as ImageIcon, Video, Film, Music, Headphones, Radio,
  Podcast, FileAudio, BookOpen, GraduationCap, School, University,
  Library, PenTool, Brush, Palette, Theater, Drama, Brain,
  PartyPopper, Cake, Wine, Beer, CupSoda, GlassWater, Flame as FlameIcon
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
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    title: "ثبت ازدواج رسمی در اتریش",
    caption: "مراسم در دفتر ثبت احوال (Standesamt) با تشریفات قانونی کامل",
    icon: HeartHandshake,
    tag: "ازدواج",
  },
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    title: "مشاوره حقوقی طلاق",
    caption: "راهنمایی تخصصی برای طلاق توافقی و غیرتوافقی در اتریش",
    icon: Scale,
    tag: "طلاق",
  },
  {
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    title: "اسناد و مدارک قانونی",
    caption: "مدارک لازم برای ازدواج و طلاق در اتریش",
    icon: FileCheck,
    tag: "مدارک",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۸ سال", label: "حداقل سن ازدواج", icon: Users },
  { value: "۶ ماه", label: "اعتبار گواهی Ehefähigkeit", icon: Calendar },
  { value: "۷۰-۱۷۰€", label: "هزینه ثبت ازدواج", icon: Euro },
  { value: "۸۵٪", label: "طلاق توافقی در اتریش", icon: Scale },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق منابع رسمی oesterreich.gv.at", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "راهنمای رایگان", color: "text-rose-600" },
  { icon: Award, text: "توسط متخصصان", color: "text-indigo-600" },
];

// ==========================================
// MARRIAGE REQUIREMENTS
// ==========================================
const MARRIAGE_REQUIREMENTS = [
  {
    id: "age",
    title: "حداقل سن ۱۸ سال",
    desc: "هر دو طرف باید حداقل ۱۸ سال داشته باشند و از نظر قانونی بالغ شناخته شوند. افراد زیر ۱۸ سال تنها با اجازه دادگاه و در شرایط خاص می‌توانند ازدواج کنند.",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "capacity",
    title: "اهلیت قانونی (Entscheidungsfähigkeit)",
    desc: "طرفین باید توانایی درک عواقب ازدواج و تصمیم‌گیری آگاهانه را داشته باشند. افراد دارای اختلال روانی شدید ممکن است نتوانند ازدواج کنند.",
    icon: Brain,
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "single",
    title: "عدم وجود ازدواج قبلی",
    desc: "هیچ‌کدام از طرفین نباید در ازدواج قبلی یا شراکت ثبت‌شده (eingetragene Partnerschaft) باشد. این امر حتی اگر طرفین با هم زندگی نکنند، صدق می‌کند.",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "no-blood",
    title: "عدم نسبت خویشاوندی",
    desc: "ازدواج بین خویشاوندان در خط مستقیم (والدین، فرزندان، نوه‌ها) و خویشاوندان جانبی تا درجه چهارم (خواهر، برادر، عمو، خاله، پسرعمو، دخترخاله) ممنوع است.",
    icon: UsersRound,
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// MARRIAGE DOCUMENTS
// ==========================================
const MARRIAGE_DOCUMENTS = [
  { icon: IdCard, name: "کارت شناسایی معتبر (Reisepass/Personalausweis)", required: true, note: "اصل + کپی" },
  { icon: FileText, name: "شناسنامه (Geburtsurkunde)", required: true, note: "ترجمه رسمی برای متقاضیان خارجی" },
  { icon: ShieldCheck, name: "گواهی تابعیت (Staatsbürgerschaftsnachweis)", required: true, note: "برای شهروندان اتریشی" },
  { icon: MapPin, name: "گواهی سکونت (Meldezettel)", required: true, note: "اگر محل سکونت در اتریش است" },
  { icon: Heart, name: "گواهی عدم ازدواج قبلی (Ledigkeitsbescheinigung)", required: true, note: "برای متقاضیان خارجی" },
  { icon: FileCheck, name: "ترجمه رسمی مدارک خارجی", required: true, note: "با تأیید سفارت/آپوستیل" },
  { icon: Calendar, name: "گواهی Ehefähigkeit", required: true, note: "اعتبار حداکثر ۶ ماه" },
  { icon: Users, name: "گواهی طلاق یا فوت همسر قبلی", required: false, note: "در صورت وجود ازدواج قبلی" },
];

// ==========================================
// MARRIAGE STEPS
// ==========================================
const MARRIAGE_STEPS = [
  {
    step: 1,
    title: "دریافت گواهی Ehefähigkeit",
    subtitle: "گواهی اهلیت ازدواج",
    desc: "اولین قدم دریافت گواهی Ehefähigkeit از دفتر ثبت احوال (Standesamt) است. این گواهی تأیید می‌کند که هیچ مانعی قانونی برای ازدواج شما وجود ندارد. اعتبار این گواهی حداکثر ۶ ماه است.",
    icon: FileCheck,
    color: "from-blue-500 to-indigo-600",
    tips: ["اعتبار ۶ ماه", "نیاز به حضور شخصی", "هزینه حدود ۵۰-۱۳۰ یورو"],
  },
  {
    step: 2,
    title: "ثبت‌نام ازدواج (Anmeldung)",
    subtitle: "حداقل ۶ ماه قبل",
    desc: "ثبت‌نام ازدواج باید حداقل ۶ ماه قبل از تاریخ مراسم انجام شود. در این مرحله، اسناد و مدارک لازم بررسی و تاریخ مراسم تعیین می‌شود. در شهرهای بزرگ، زمان انتظار ۲ تا ۶ هفته است.",
    icon: CalendarCheck,
    color: "from-emerald-500 to-teal-600",
    tips: ["۶ ماه قبل", "حضور شخصی هر دو", "انتخاب تاریخ مراسم"],
  },
  {
    step: 3,
    title: "مراسم ازدواج رسمی",
    subtitle: "در دفتر ثبت احوال (Standesamt)",
    desc: "مراسم ازدواج رسمی با حضور ثبت‌کننده (Standesbeamter) و دو شاهد انجام می‌شود. طرفین باید شخصاً اعلام کنند که می‌خواهند با یکدیگر ازدواج کنند. مراسم می‌تواند در دفتر رسمی یا مکان‌های مجاز برگزار شود.",
    icon: HeartHandshake,
    color: "from-rose-500 to-pink-600",
    tips: ["حضور دو شاهد", "مدت ۱۵-۳۰ دقیقه", "هزینه ۷۰-۱۷۰ یورو"],
  },
  {
    step: 4,
    title: "دریافت سند ازدواج",
    subtitle: "Heiratsurkunde",
    desc: "پس از پایان مراسم، سند ازدواج (Heiratsurkunde) صادر می‌شود. این سند برای ثبت تغییرات در مدارک هویتی، بیمه، مالیات و سایر امور اداری ضروری است.",
    icon: FileSignature,
    color: "from-amber-500 to-orange-600",
    tips: ["صادر شده در همان روز", "هزینه ۲.۱۰ یورو", "نیاز به ترجمه برای خارج"],
  },
];

// ==========================================
// DIVORCE TYPES
// ==========================================
const DIVORCE_TYPES = [
  {
    id: "mutual",
    name: "طلاق توافقی (Einvernehmliche Scheidung)",
    german: "Einvernehmliche Scheidung",
    desc: "سریع‌ترین و ارزان‌ترین روش طلاق. هر دو طرف توافق دارند که ازدواج غیرقابل جبران است و درباره همه مسائل (حضانت، نفقه، تقسیم اموال) توافق کرده‌اند.",
    conditions: [
      "توافق هر دو طرف بر طلاق",
      "ازدواج غیرقابل جبران (unheilbar zerrüttet)",
      "حداقل ۶ ماه جدایی زندگی مشترک",
      "حداقل ۶ ماه از عقد ازدواج گذشته باشد",
      "در صورت وجود فرزند: مشاوره والدین اجباری",
    ],
    duration: "۴ تا ۱۲ هفته",
    cost: "۳۱۲ یورو + ۳۱۲ یورو هزینه توافق",
    icon: HeartHandshake,
    color: "from-emerald-500 to-teal-600",
    featured: true,
  },
  {
    id: "contested",
    name: "طلاق غیرتوافقی (Strittige Scheidung)",
    german: "Strittige Scheidung",
    desc: "زمانی که یکی از طرفین مخالف طلاق است یا توافق بر سر مسائل وجود ندارد. یکی از طرفین با ارائه دلایل قانونی (مانند خیانت، خشونت) علیه طرف دیگر شکایت می‌کند.",
    conditions: [
      "عدم توافق بر طلاق یا شرایط آن",
      "وجود دلیل قانونی (Eheverfehlung)",
      "مانند خیانت، خشونت، ترک خانه",
      "دادگاه مقصر را تعیین می‌کند",
      "مدت زمان طولانی‌تر و هزینه بالاتر",
    ],
    duration: "چند ماه تا چند سال",
    cost: "بیش از ۵,۰۰۰ یورو",
    icon: Gavel,
    color: "from-red-500 to-rose-600",
  },
  {
    id: "separation",
    name: "طلاق پس از جدایی ۳ ساله",
    german: "Scheidung nach 3 Jahren Trennung",
    desc: "اگر زوجین حداقل ۳ سال جدا از هم زندگی کرده باشند، می‌توانند طلاق بگیرند حتی اگر یک طرف مخالف باشد. در این حالت نیازی به اثبات تقصیر نیست.",
    conditions: [
      "حداقل ۳ سال جدایی کامل",
      "زندگی مشترک قطع شده باشد",
      "امکان طلاق حتی با مخالفت یک طرف",
      "نیاز به ارائه دلایل قانونی",
      "بدون تعیین مقصر",
    ],
    duration: "چند ماه",
    cost: "متغیر",
    icon: CalendarX,
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// DIVORCE DOCUMENTS
// ==========================================
const DIVORCE_DOCUMENTS = [
  { icon: FileText, name: "سند ازدواج (Heiratsurkunde)", required: true, note: "اصل" },
  { icon: IdCard, name: "کارت شناسایی معتبر", required: true, note: "اصل" },
  { icon: MapPin, name: "گواهی سکونت (Meldezettel)", required: true, note: "آدرس فعلی" },
  { icon: FileCheck, name: "گواهی تابعیت", required: true, note: "برای اتباع خارجی" },
  { icon: Users, name: "شناسنامه فرزندان", required: false, note: "در صورت وجود فرزند" },
  { icon: Heart, name: "مشاوره والدین (Elternberatung)", required: false, note: "اجباری در صورت وجود فرزند" },
  { icon: Wallet, name: "لیست دارایی و بدهی", required: true, note: "برای تقسیم اموال" },
  { icon: Home, name: "اسناد ملکی یا اجاره‌نامه", required: false, note: "در صورت وجود ملک" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "حداقل سن ازدواج در اتریش چقدر است؟",
    a: "طبق قانون اتریش، حداقل سن ازدواج ۱۸ سال است. افراد زیر ۱۸ سال تنها با اجازه دادگاه و در شرایط بسیار خاص (مانند بارداری) می‌توانند ازدواج کنند. همچنین طرفین باید از نظر قانونی بالغ و دارای اهلیت تصمیم‌گیری باشند.",
  },
  {
    q: "هزینه ثبت ازدواج در اتریش چقدر است؟",
    a: "هزینه ثبت ازدواج در اتریش بسته به شهر و نوع مراسم متفاوت است. هزینه‌های رسمی معمولاً بین ۷۰ تا ۱۷۰ یورو است. برای مراسم در خارج از دفتر رسمی (مثلاً در باغ یا مکان خاص)، هزینه‌ها بالاتر و معمولاً بین ۵۰۰ تا ۶۵۰ یورو است. هزینه گواهی Ehefähigkeit نیز حدود ۵۰ تا ۱۳۰ یورو است.",
  },
  {
    q: "آیا گواهی Ehefähigkeit در ایران یا کشورهای دیگر قابل استفاده است؟",
    a: "بله، گواهی Ehefähigkeit صادرشده توسط دفتر ثبت احوال اتریش برای ازدواج در خارج از اتریش قابل استفاده است. این گواهی تأیید می‌کند که هیچ مانعی قانونی برای ازدواج شما وجود ندارد. برای استفاده در ایران، باید ترجمه رسمی شده و تأییدات لازم (وزارت خارجه و سفارت) را دریافت کند. اعتبار این گواهی حداکثر ۶ ماه است.",
  },
  {
    q: "تفاوت طلاق توافقی و غیرتوافقی در اتریش چیست؟",
    a: "طلاق توافقی سریع‌تر (۴ تا ۱۲ هفته) و ارزان‌تر (حدود ۶۲۴ یورو) است، اما نیاز به توافق هر دو طرف بر همه مسائل (حضانت، نفقه، اموال) دارد. طلاق غیرتوافقی زمانی است که یک طرف مخالف طلاق است یا توافق وجود ندارد. این نوع طلاق طولانی‌تر (ماه‌ها تا سال‌ها) و گران‌تر (بیش از ۵,۰۰۰ یورو) است و دادگاه باید مقصر را تعیین کند.",
  },
  {
    q: "آیا پس از طلاق، امکان دریافت اقامت وجود دارد؟",
    a: "بستگی به نوع اقامت شما دارد. اگر دارنده اقامت وابسته به همسر (Familienzusammenführung) هستید، طلاق ممکن است بر وضعیت اقامت شما تأثیر بگذارد. طبق قانون، اگر حداقل ۵ سال از اقامت قانونی شما در اتریش گذشته باشد، ممکن است بتوانید اقامت خود را تمدید کنید. توصیه می‌شود در این زمینه با یک وکیل مهاجرت مشورت کنید.",
  },
  {
    q: "چگونه می‌توانم ازدواجی که در خارج از اتریش انجام شده را در اتریش به رسمیت بشناسم؟",
    a: "اگر ازدواج شما در خارج از اتریش انجام شده، برای به رسمیت شناختن آن در اتریش باید سند ازدواج را با ترجمه رسمی و تأییدات (آپوستیل یا تأیید سفارت) به دفتر ثبت احوال اتریش ارائه دهید. همچنین ممکن است نیاز به ارائه گواهی Ehefähigkeit یا مدارک تکمیلی باشد. توصیه می‌شود قبل از ارائه درخواست، با دفتر ثبت احوال محل سکونت خود تماس بگیرید.",
  },
];

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
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای ازدواج و طلاق",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل ازدواج و طلاق در اتریش ۲۰۲۶ | شرایط، مدارک و هزینه‌ها",
    description: "راهنمای جامع ازدواج و طلاق در اتریش: شرایط قانونی ازدواج، مدارک لازم، هزینه‌ها، مراحل ثبت ازدواج، انواع طلاق (توافقی و غیرتوافقی)، مدارک مورد نیاز و نکات کلیدی برای فارسی‌زبانان. به‌روز ۲۰۲۶.",
    author: { "@type": "Organization", name: "اتریش‌نشین" },
    publisher: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
    },
    datePublished: "2026-01-15",
    dateModified: "2026-09-22",
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
      { "@type": "ListItem", position: 2, name: "ازدواج و طلاق", item: "https://otrish-iran.ir/marriage-divorce" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const MarriageDivorceGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"marriage" | "divorce">("marriage");
  const [activeMarriageStep, setActiveMarriageStep] = useState<number>(1);
  const [activeDivorceType, setActiveDivorceType] = useState<string>("mutual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [checkedMarriageDocs, setCheckedMarriageDocs] = useState<Record<string, boolean>>({});
  const [checkedDivorceDocs, setCheckedDivorceDocs] = useState<Record<string, boolean>>({});

  const toggleMarriageDoc = (docName: string) => {
    setCheckedMarriageDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const toggleDivorceDoc = (docName: string) => {
    setCheckedDivorceDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const marriageCheckedCount = Object.values(checkedMarriageDocs).filter(Boolean).length;
  const divorceCheckedCount = Object.values(checkedDivorceDocs).filter(Boolean).length;
  const marriageProgressPercent = Math.round((marriageCheckedCount / MARRIAGE_DOCUMENTS.length) * 100);
  const divorceProgressPercent = Math.round((divorceCheckedCount / DIVORCE_DOCUMENTS.length) * 100);

  const currentMarriageStep = MARRIAGE_STEPS.find((s) => s.step === activeMarriageStep);
  const currentDivorceType = DIVORCE_TYPES.find((d) => d.id === activeDivorceType);

  return (
    <>
      <SEO
        title="راهنمای کامل ازدواج و طلاق در اتریش ۲۰۲۶ | شرایط، مدارک و هزینه‌ها | اتریش‌نشین"
        description="راهنمای جامع ازدواج و طلاق در اتریش: شرایط قانونی ازدواج، مدارک لازم، هزینه‌ها (۷۰-۱۷۰€)، مراحل ثبت ازدواج، انواع طلاق (توافقی و غیرتوافقی)، مدارک مورد نیاز و نکات کلیدی برای فارسی‌زبانان. به‌روز ۲۰۲۶."
        keywords="ازدواج در اتریش, ثبت ازدواج اتریش, مدارک ازدواج اتریش, هزینه ازدواج اتریش, طلاق در اتریش, طلاق توافقی اتریش, طلاق غیرتوافقی اتریش, Ehefähigkeit, Standesamt, Scheidung Österreich"
        schemaData={seoSchema}
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
            background: "radial-gradient(80% 150% at 90% 0, #831843 0, #4c0519 48%, #1e0512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">💍</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                به‌روز ۲۰۲۶ — طبق منابع رسمی oesterreich.gv.at
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> ازدواج و طلاق در اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-4">
                از شرایط قانونی ازدواج و مدارک لازم تا انواع طلاق (توافقی و غیرتوافقی).
                همه‌چیز درباره فرآیندهای حقوقی ازدواج و طلاق در اتریش — به‌روز ۲۰۲۶.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>شرایط قانونی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مدارک کامل</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>هزینه‌های دقیق</span>
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
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-rose-600" /></div>
                <div className="text-lg font-black text-rose-700">{s.value}</div>
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
              <Heart className="w-5 h-5 text-rose-600" />
              ازدواج و طلاق در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از مراسم ازدواج رسمی تا فرآیندهای حقوقی طلاق</p>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border-2 border-rose-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-rose-900 text-sm mb-1 flex items-center gap-2">
              <Info className="w-4 h-4" />
              نکته کلیدی برای زوج‌های فارسی‌زبان
            </h3>
            <p className="text-[11px] text-rose-800 font-bold leading-relaxed">
              برای ازدواج در اتریش، حتماً قبل از مراسم، گواهی Ehefähigkeit (اهلیت ازدواج) را از دفتر ثبت احوال
              دریافت کنید. این گواهی تأیید می‌کند که هیچ مانع قانونی برای ازدواج شما وجود ندارد و اعتبار آن
              حداکثر ۶ ماه است. برای زوج‌هایی که یکی از طرفین خارجی است، ترجمه رسمی و تأییدات (آپوستیل یا سفارت)
              مدارک ضروری است.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN TABS: MARRIAGE / DIVORCE */}
        {/* ========================================== */}
        <div>
          <div className="flex justify-center mb-6">
            <div className="bg-stone-100 p-1.5 rounded-2xl flex items-center gap-1 shadow-sm">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("marriage")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === "marriage"
                    ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                راهنمای ازدواج
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab("divorce")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === "divorce"
                    ? "bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-md"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <Scale className="w-4 h-4" />
                راهنمای طلاق
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ========================================== */}
            {/* MARRIAGE SECTION */}
            {/* ========================================== */}
            {activeTab === "marriage" && (
              <motion.div
                key="marriage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Marriage Requirements */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-rose-600" />
                      شرایط قانونی ازدواج در اتریش
                    </h2>
                    <p className="text-[11px] text-stone-500 font-bold mt-1">پیش‌نیازهای اساسی برای ثبت ازدواج رسمی</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MARRIAGE_REQUIREMENTS.map((req, i) => {
                      const Icon = req.icon;
                      return (
                        <motion.div key={req.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border-2 border-stone-200 hover:border-rose-300 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-lg">
                          <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${req.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />
                          <div className="relative flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${req.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-black text-stone-900 text-sm mb-1">{req.title}</h3>
                              <p className="text-[11px] text-stone-600 font-bold leading-relaxed">{req.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Marriage Steps */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-rose-600" />
                      ۴ مرحله ثبت ازدواج در اتریش
                    </h2>
                    <p className="text-[11px] text-stone-500 font-bold mt-1">از دریافت گواهی Ehefähigkeit تا دریافت سند ازدواج</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {MARRIAGE_STEPS.map((step) => {
                      const Icon = step.icon;
                      const isActive = activeMarriageStep === step.step;
                      return (
                        <motion.button key={step.step} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveMarriageStep(step.step)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${step.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"}`}>
                          <Icon className="w-4 h-4" />
                          مرحله {step.step}
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence mode="wait">
                    {currentMarriageStep && (
                      <motion.div key={currentMarriageStep.step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 relative overflow-hidden">
                        <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${currentMarriageStep.color} opacity-[0.08] rounded-full`} />

                        <div className="relative flex flex-col md:flex-row items-start gap-6">
                          <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${currentMarriageStep.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                            {React.createElement(currentMarriageStep.icon, { className: "w-8 h-8" })}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="text-base font-black text-stone-900">{currentMarriageStep.title}</h3>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${currentMarriageStep.color} text-white`}>مرحله {currentMarriageStep.step}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 font-bold mb-2">{currentMarriageStep.subtitle}</p>
                            <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{currentMarriageStep.desc}</p>

                            <div className="flex flex-wrap gap-2">
                              {currentMarriageStep.tips.map((tip, ti) => (
                                <span key={ti} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                                  <Lightbulb className="w-3 h-3 text-amber-500" />
                                  {tip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Marriage Documents Checklist */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-rose-500 via-pink-500 to-amber-500 rounded-t-3xl" />

                  <div className="border-b border-stone-200 pb-5 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">چک‌لیست مدارک ازدواج</h2>
                        <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                          {marriageCheckedCount} از {MARRIAGE_DOCUMENTS.length} مدرک آماده شده
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2.5 text-xs font-black text-stone-800">
                      <span className="font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">{marriageProgressPercent}% تکمیل شده</span>
                      <span>مدارک الزامی: {MARRIAGE_DOCUMENTS.filter((d) => d.required).length} مدرک</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div className="bg-gradient-to-r from-rose-500 to-pink-500 h-full" initial={{ width: 0 }} animate={{ width: `${marriageProgressPercent}%` }} transition={{ duration: 0.5 }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MARRIAGE_DOCUMENTS.map((doc, i) => {
                      const Icon = doc.icon;
                      const isChecked = checkedMarriageDocs[doc.name];
                      return (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => toggleMarriageDoc(doc.name)} className={`border-2 rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${isChecked ? "border-emerald-500 bg-emerald-50/50" : "border-stone-200 hover:border-rose-300"}`}>
                          <div className="pt-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-stone-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`text-xs font-black ${isChecked ? "text-emerald-900 line-through" : "text-stone-900"}`}>{doc.name}</h4>
                              {doc.required ? (
                                <span className="text-[8px] font-black bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded">الزامی</span>
                              ) : (
                                <span className="text-[8px] font-black bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">اختیاری</span>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-500 font-bold mt-0.5">{doc.note}</p>
                          </div>
                          <Icon className={`w-5 h-5 flex-shrink-0 ${isChecked ? "text-emerald-500" : "text-stone-400"}`} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* DIVORCE SECTION */}
            {/* ========================================== */}
            {activeTab === "divorce" && (
              <motion.div
                key="divorce"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Divorce Types */}
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                      <Scale className="w-5 h-5 text-rose-600" />
                      ۳ نوع طلاق در اتریش
                    </h2>
                    <p className="text-[11px] text-stone-500 font-bold mt-1">هر نوع طلاق شرایط، مدت زمان و هزینه‌های خاص خود را دارد</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DIVORCE_TYPES.map((type, i) => {
                      const Icon = type.icon;
                      return (
                        <motion.div key={type.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className={`relative bg-white rounded-3xl border-2 transition-all p-5 overflow-hidden group shadow-sm hover:shadow-lg ${type.featured ? "border-emerald-300 hover:border-emerald-400" : "border-stone-200 hover:border-rose-300"}`}>
                          {type.featured && (
                            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              سریع‌ترین
                            </div>
                          )}

                          <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${type.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                          <div className="relative flex items-start gap-3 mb-3">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-black text-stone-900 text-xs leading-snug mb-0.5">{type.name}</h3>
                              <p className="text-[9px] font-mono text-stone-400" dir="ltr">{type.german}</p>
                            </div>
                          </div>

                          <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-3">{type.desc}</p>

                          <div className="space-y-1.5 mb-3">
                            {type.conditions.map((cond, ci) => (
                              <div key={ci} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-600">
                                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>{cond}</span>
                              </div>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100">
                            <div className="bg-stone-50 rounded-lg p-2 text-center">
                              <div className="text-[8px] text-stone-500 font-black mb-0.5">مدت زمان</div>
                              <div className="text-[10px] font-black text-stone-800">{type.duration}</div>
                            </div>
                            <div className="bg-stone-50 rounded-lg p-2 text-center">
                              <div className="text-[8px] text-stone-500 font-black mb-0.5">هزینه</div>
                              <div className="text-[10px] font-black text-stone-800">{type.cost}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Divorce Documents Checklist */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-red-500 via-rose-500 to-pink-500 rounded-t-3xl" />

                  <div className="border-b border-stone-200 pb-5 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">چک‌لیست مدارک طلاق</h2>
                        <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                          {divorceCheckedCount} از {DIVORCE_DOCUMENTS.length} مدرک آماده شده
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2.5 text-xs font-black text-stone-800">
                      <span className="font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded-md">{divorceProgressPercent}% تکمیل شده</span>
                      <span>مدارک الزامی: {DIVORCE_DOCUMENTS.filter((d) => d.required).length} مدرک</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div className="bg-gradient-to-r from-red-500 to-rose-500 h-full" initial={{ width: 0 }} animate={{ width: `${divorceProgressPercent}%` }} transition={{ duration: 0.5 }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DIVORCE_DOCUMENTS.map((doc, i) => {
                      const Icon = doc.icon;
                      const isChecked = checkedDivorceDocs[doc.name];
                      return (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} onClick={() => toggleDivorceDoc(doc.name)} className={`border-2 rounded-2xl p-4 flex items-start gap-3 cursor-pointer transition-all ${isChecked ? "border-emerald-500 bg-emerald-50/50" : "border-stone-200 hover:border-red-300"}`}>
                          <div className="pt-0.5">
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-stone-300" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`text-xs font-black ${isChecked ? "text-emerald-900 line-through" : "text-stone-900"}`}>{doc.name}</h4>
                              {doc.required ? (
                                <span className="text-[8px] font-black bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.5 rounded">الزامی</span>
                              ) : (
                                <span className="text-[8px] font-black bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded">اختیاری</span>
                              )}
                            </div>
                            <p className="text-[10px] text-stone-500 font-bold mt-0.5">{doc.note}</p>
                          </div>
                          <Icon className={`w-5 h-5 flex-shrink-0 ${isChecked ? "text-emerald-500" : "text-stone-400"}`} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-600" />
              چرا آگاهی از قوانین ازدواج و طلاق اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">آمار و حقایقی درباره ازدواج و طلاق در اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Heart, title: "۳۵,۰۰۰+", text: "ازدواج سالانه در اتریش — یکی از بالاترین نرخ‌ها در اروپا", color: "from-rose-500 to-pink-600" },
              { icon: Scale, title: "۸۵٪", text: "طلاق‌ها در اتریش به‌صورت توافقی انجام می‌شود", color: "from-emerald-500 to-teal-600" },
              { icon: Clock, title: "۶ ماه", text: "حداقل مدت جدایی قبل از درخواست طلاق توافقی", color: "from-amber-500 to-orange-600" },
              { icon: Wallet, title: "۶۲۴€", text: "هزینه طلاق توافقی (شامل هزینه درخواست و توافق)", color: "from-blue-500 to-indigo-600" },
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
              <HelpCircle className="w-5 h-5 text-rose-600" />
              سوالات متداول درباره ازدواج و طلاق
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#4c0519] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">سوالی درباره ازدواج یا طلاق دارید؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای ازدواج، طلاق و هرگونه سوال حقوقی
              درباره قوانین اتریش هستند. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> پرسش در واتس‌اپ
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
              این راهنما بر اساس منابع رسمی (oesterreich.gv.at، wien.gv.at، justiz.gv.at، ibesich.at)
              تهیه شده و صرفاً جنبه آموزشی دارد. شرایط، هزینه‌ها و رویه‌های قانونی ممکن است
              بدون اطلاع تغییر کند. برای تصمیم‌های حقوقی نهایی، همیشه با وکیل یا مشاور حقوقی
              معتبر مشورت کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-rose-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "ازدواج در اتریش", "ثبت ازدواج اتریش", "مدارک ازدواج اتریش",
              "هزینه ازدواج اتریش", "طلاق در اتریش", "طلاق توافقی اتریش",
              "طلاق غیرتوافقی اتریش", "Ehefähigkeit", "Standesamt",
              "Scheidung Österreich", "Heiratsurkunde", "Scheidungsvereinbarung",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700 transition-all cursor-default">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({ q, a, isOpen, onToggle, index }: { key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-rose-500/30 bg-rose-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-rose-500 to-pink-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-rose-600" : ""}`} />
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

export default MarriageDivorceGuide;