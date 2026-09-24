import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, FileText, Compass, ArrowLeft, CheckCircle, ShieldCheck,
  Clock, Award, Users, Heart, Zap, Star, TrendingUp, HelpCircle,
  ChevronDown, Info, Briefcase, GraduationCap, Building2, Globe,
  Rocket, Home, Plane, Landmark, BadgeCheck, MapPin, Calendar,
  FileCheck, AlertCircle, ListChecks, Target, PhoneCall, MessageCircle,
  Send, Handshake, ExternalLink, BookOpen, Trophy, Lightbulb,
  BarChart3, Search, Filter, Layers, Coins
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES (Unsplash - external URLs)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "وین — قلب اداری و حقوقی اتریش",
    caption: "پایتخت اتریش، مرکز اصلی دفاتر مهاجرت، سفارت‌ها و دانشگاه‌های برتر",
    icon: Landmark,
  },
  {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    title: "دانشگاه‌های معتبر اروپایی",
    caption: "تحصیل در دانشگاه‌های دولتی اتریش با شهریه ناچیز و امکانات جهانی",
    icon: GraduationCap,
  },
  {
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    title: "اقتصاد پایدار و فرصت‌های شغلی",
    caption: "بازار کار اتریش یکی از قوی‌ترین‌های اروپا با درآمد و رفاه بالا",
    icon: Briefcase,
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۷+", label: "مسیر قانونی", icon: "🛤️" },
  { value: "۹", label: "دسته اصلی", icon: "📂" },
  { value: "۲۰۲۶", label: "به‌روزرسانی", icon: "📅" },
  { value: "۱۰۰٪", label: "منابع رسمی", icon: "✅" },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "منابع رسمی اتریش", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "رایگان و مستقل", color: "text-rose-600" },
  { icon: Award, text: "توسط متخصصان", color: "text-indigo-600" },
];

// ==========================================
// TYPES
// ==========================================
export interface ImmigrationVisaItem {
  title: string;
  german: string;
  target: string;
  duration: string;
  description: string;
  requirements: string[];
  path: string;
}

export interface ImmigrationSubSection {
  id: string;
  title: string;
  subtitle?: string;
  items: ImmigrationVisaItem[];
}

export interface ImmigrationCategory {
  id: string;
  subtitle: string;
  subsections: ImmigrationSubSection[];
}

// ==========================================
// DATA
// ==========================================
export const IMMIGRATION_WAY_CATEGORIES: ImmigrationCategory[] = [
  {
    id: "temp",
    subtitle:
      "انواع ویزاها و مجوزهای اقامت موقت، تحصیلی یا کوتاه‌مدت در جمهوری اتریش",
    subsections: [
      {
        id: "study",
        title: "اقامت تحصیلی و دوره‌های آموزشی دانشگاهی",
        subtitle:
          "ویژه دانشجویان دانشگاه‌های دولتی، آزاد، دوره‌های زبان پیش‌نیاز و پژوهشگران",
        items: [
          {
            title: "اقامت دانشجویی (Aufenthaltsbewilligung Student)",
            german: "Aufenthaltsbewilligung - Student",
            target: "دانشجویان دوره‌های کارشناسی، کارشناسی ارشد و دکتری",
            duration: "۱ ساله (قابل تمدید سالانه تا پایان تحصیل)",
            description:
              "مجوز قانونی اقامت تحصیلی با اجازه اشتغال پاره‌وقت تا ۲۰ ساعت در هفته برای کسب تجربه کاری و تأمین بخشی از مخارج.",
            requirements: [
              "نامه پذیرش قطعی (Zulassungsbescheid) از دانشگاه معتبر اتریش",
              "اثبات تمکن مالی سالانه در حساب بانکی معتبر شخصی",
              "بیمه درمانی دانشجویی معتبر (ÖGK Selbstversicherung)",
              "قرارداد اجاره خوابگاه یا منزل مسکونی (Mietvertrag / Wohnrechtsvereinbarung)",
            ],
            path: "study",
          },
          {
            title: "ویزای جستجوی کار برای متخصصین (Job Seeker Visa)",
            german: "Visum D für Arbeitsuchende",
            target: "نخبگان و دانش‌آموختگان دارای مهارت بسیار بالا",
            duration: "۶ ماهه",
            description:
              "ویزای نوع D جهت حضور قانونی در اتریش برای مصاحبه و بستن قرارداد کاری واجد شرایط کارت قرمز-سفید-قرمز با حداقل ۷۰ امتیاز.",
            requirements: [
              "کسب حداقل ۷۰ امتیاز از فاکتورهای سن، تحصیلات، سابقه کار و زبان",
              "ارزشیابی مدارک تحصیلی توسط مؤسسه رسمی Anabin / BMBWF",
              "تمکن مالی کافی برای اقامت ۶ ماهه بدون استفاده از کمک‌های دولتی",
              "بیمه مسافرتی شنگن با سقف پوشش حداقل ۳۰,۰۰۰ یورو",
            ],
            path: "rwr",
          },
        ],
      },
      {
        id: "work_temp",
        title: "مجوزهای کار موقت، فصلی و انتقال درون‌شرکتی",
        subtitle: "نیروی کار پروژه‌ای، فصلی و ماموریت‌های شرکتی",
        items: [
          {
            title: "نیروی کار فصلی (Saisonarbeitskraft)",
            german: "Beschäftigungsbewilligung für Saisoniers",
            target: "شاغلین گردشگری زمستانی/تابستانی و کشاورزی",
            duration: "تا ۹ ماه در سال",
            description:
              "مجوز اشتغال موقت در بخش‌های پرتقاضا بر اساس سهمیه‌های اعلامی اداره کار اتریش (AMS).",
            requirements: [
              "قرارداد کاری قطعی با کارفرمای اتریشی در بخش‌های دارای سهمیه",
              "تأییدیه مستقیم اداره بازار کار اتریش (AMS Gutachten)",
              "محل سکونت تعیین‌شده و تأییدشده",
            ],
            path: "work",
          },
        ],
      },
    ],
  },
  {
    id: "perm",
    subtitle:
      "مسیرهای اقامت بلندمدت کاری، کارت قرمز-سفید-قرمز و اقامت دائم اتریش",
    subsections: [
      {
        id: "rwr_perm",
        title: "کارت قرمز-سفید-قرمز (Rot-Weiß-Rot – Karte)",
        subtitle: "مسیر اصلی مهاجرت کاری و اقامت تخصصی در اتریش",
        items: [
          {
            title: "نیروی کلیدی در مشاغل با کمبود (Mangelberufe)",
            german: "Fachkräfte in Mangelberufen",
            target:
              "مهندسان، تکنسین‌ها و متخصصان رشته‌های اعلامی در لیست کمبود سالانه",
            duration: "۲۴ ماهه (سپس تمدید به RWR Plus)",
            description:
              "اقامت کاری دو ساله وابسته به کارفرمای مشخص با حداقل ۵۵ امتیاز در جدول امتیازبندی رسمی اتریش.",
            requirements: [
              "قرارداد کاری با حداقل حقوق مصوب قانون کار اتحادیه مربوطه (Kollektivvertrag)",
              "کسب حداقل ۵۵ امتیاز از فاکتورهای سن، زبان آلمانی/انگلیسی و تحصیلات مرتبط",
              "تأییدیه تخصصی و تست بازار کار توسط AMS",
            ],
            path: "rwr",
          },
          {
            title: "فارغ‌التحصیلان دانشگاه‌های اتریش (StudienabsolventInnen)",
            german: "StudienabsolventInnen",
            target: "دانش‌آموختگان مقاطع کارشناسی، ارشد یا دکتری از اتریش",
            duration: "۲۴ ماهه (سپس RWR Plus)",
            description:
              "فرآیند سریع و مستقیم تبدیل اقامت تحصیلی به اقامت کاری بدون نیاز به امتیازشماری با پیشنهاد کاری مرتبط.",
            requirements: [
              "مدرک رسمی فارغ‌التحصیلی از یکی از دانشگاه‌های مورد تأیید اتریش",
              "پیشنهاد شغلی تمام وقت مرتبط با رشته تحصیلی",
              "حداقل حقوق ناخالص ماهیانه قانونی تعیین‌شده برای فارغ‌التحصیلان",
            ],
            path: "grad",
          },
          {
            title: "کارت قرمز-سفید-قرمز پلاس (RWR Plus)",
            german: "Rot-Weiß-Rot – Karte Plus",
            target: "دارندگان ۲ سال سابقه RWR، یا الحاق خانواده متخصصین",
            duration: "۱ تا ۳ ساله",
            description:
              "آزادی کامل و نامحدود در بازار کار اتریش بدون وابستگی به یک کارفرمای مشخص با حق اشتغال یا خوداشتغالی آزاد.",
            requirements: [
              "اثبات اشتغال قانونی حداقل ۲۱ ماه در طی ۲۴ ماه گذشته با کارت RWR قبلی",
              "برگه سابقه پرداخت‌های بیمه و بازنشستگی (Versicherungsdatenauszug)",
              "محل سکونت قانونی و ثبت آدرس (Meldezettel)",
            ],
            path: "rwr_plus",
          },
          {
            title: "اقامت دائم اتحادیه اروپا (Daueraufenthalt – EU)",
            german: "Daueraufenthalt – EU",
            target: "افرادی با حداقل ۵ سال اقامت قانونی متوالی در اتریش",
            duration: "۵ ساله (تمدید نامحدود)",
            description:
              "بالاترین سطح اقامت دائم با حقوق برابر با شهروندان اتریش (به جز حق رأی در انتخابات سراسری).",
            requirements: [
              "۵ سال اقامت قانونی، پیوسته و بدون وقفه در اتریش",
              "تکمیل ماژول دوم قرارداد ادغام با مدرک زبان آلمانی سطح B1",
              "اثبات درآمد و تمکن مالی مستقل و پایدار در طول کل دوره",
              "عدم وجود هرگونه سابقه کیفری یا بار مالی غیرمجاز بر سیستم رفاهی",
            ],
            path: "daueraufenthalt",
          },
        ],
      },
    ],
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "تفاوت اقامت موقت و دائم اتریش چیست؟",
    a: "اقامت موقت (Befristet) محدود به مدت مشخص (معمولاً ۱ تا ۳ سال) است و باید تمدید شود. اقامت دائم (Daueraufenthalt) به شما حق نامحدود ماندن و کار کردن بدون نیاز به تمدید می‌دهد و پس از ۵ سال اقامت قانونی قابل درخواست است.",
  },
  {
    q: "آیا برای ویزای تحصیلی اتریش باید زبان آلمانی بلد باشم؟",
    a: "بستگی به رشته دارد. برای اکثر رشته‌های کارشناسی در دانشگاه‌های دولتی، مدرک B2/C1 آلمانی الزامی است. اما برخی رشته‌های ارشد و دکتری (به‌ویژه در علوم کامپیوتر و مهندسی) به زبان انگلیسی ارائه می‌شوند و فقط نیاز به IELTS یا TOEFL دارند.",
  },
  {
    q: "کارت قرمز-سفید-قرمز (RWR) چه تفاوتی با ویزای کاری عادی دارد؟",
    a: "RWR یک سیستم امتیازدهی مدرن برای جذب متخصصان است که در آن سن، تحصیلات، سابقه کار، زبان و مدرک فنی امتیاز دارند. برخلاف ویزای کاری سنتی که نیاز به تأیید سختگیرانه AMS داشت، RWR فرآیندی سریع‌تر و شفاف‌تر با مسیر مشخصی برای اقامت دائم دارد.",
  },
  {
    q: "حداقل تمکن مالی برای ویزای دانشجویی چقدر است؟",
    a: "برای سال ۲۰۲۶ حدود ۱۲ تا ۱۵ هزار یورو در سال (بسته به سن) به‌عنوان تمکن مالی در حساب بانکی لازم است. این مبلغ باید در یک حساب بانکی اتریشی یا بین‌المللی به نام خودتان باشد.",
  },
  {
    q: "آیا می‌توانم با ویزای جستجوی کار (Job Seeker) کار کنم؟",
    a: "خیر، ویزای Job Seeker فقط برای حضور در اتریش و انجام مصاحبه‌های کاری است. پس از یافتن کار و دریافت کارت RWR، می‌توانید به‌طور قانونی مشغول به کار شوید.",
  },
  {
    q: "چند سال طول می‌کشد تا اقامت دائم اتریش را بگیرم؟",
    a: "بسته به مسیر، معمولاً ۵ سال اقامت قانونی پیوسته در اتریش لازم است. دارندگان RWR Plus پس از ۳ سال ممکن است واجد شرایط باشند. کل زمان از ورود اولیه تا اقامت دائم معمولاً ۵ تا ۷ سال است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
interface ImmigrationDirectoryProps {
  onNavigate?: (segment: string) => void;
}

export default function ImmigrationDirectory({
  onNavigate,
}: ImmigrationDirectoryProps) {
  const [activeVisaCategory, setActiveVisaCategory] = useState<string>("temp");
  const [expandedVisaId, setExpandedVisaId] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const allVisas = IMMIGRATION_WAY_CATEGORIES.flatMap((cat) =>
    cat.subsections.flatMap((sub) =>
      sub.items.map((item) => ({
        "@type": "ItemPage",
        name: item.title,
        alternateName: item.german,
        description: item.description,
        url: `https://otrish-iran.ir/immigration/${item.path}`,
      }))
    )
  );

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      description:
        "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنماهای رسمی و به‌روز مهاجرت",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "کتابچه جامع مسیرهای مهاجرتی اتریش ۲۰۲۶",
      description:
        "لیست کامل ۱۷+ مسیر قانونی اقامت، ویزا، کار و تحصیل در اتریش با مدارک و شرایط هر مسیر.",
      numberOfItems: allVisas.length,
      itemListElement: allVisas.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: v,
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
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "خانه",
          item: "https://otrish-iran.ir",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "مسیرهای مهاجرتی اتریش",
          item: "https://otrish-iran.ir/immigration",
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="کتابچه جامع مسیرهای مهاجرتی اتریش ۲۰۲۶ | ۱۷+ ویزا و اقامت رسمی | اتریش‌نشین"
        description="راهنمای کامل و به‌روز تمامی مسیرهای قانونی مهاجرت به اتریش: ویزای تحصیلی، کارت قرمز-سفید-قرمز (RWR)، Job Seeker، اقامت دائم، پیوست خانواده و کار فصلی. با شرایط، مدارک و مراحل هر مسیر."
        keywords="مسیرهای مهاجرت اتریش, RWR Card, کارت قرمز سفید قرمز, ویزای تحصیلی اتریش, Job Seeker اتریش, اقامت دائم اتریش, Daueraufenthalt EU, ویزای کاری اتریش, مهاجرت به اتریش, شرایط ویزای اتریش"
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
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🇦🇹
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[110px] pointer-events-none" />
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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روزرسانی رسمی ۲۰۲۶ — منابع معتبر
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                کتابچه جامع
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> مسیرهای مهاجرتی اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-4">
                ۱۷+ مسیر قانونی اقامت، تحصیل، کار و اقامت دائم — با شرایط، مدارک و مراحل
                کامل. از ویزای دانشجویی و Job Seeker تا کارت قرمز-سفید-قرمز، RWR Plus و
                اقامت دائم اتحادیه اروپا.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱۰۰٪ رایگان</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روزرسانی ۲۰۲۶</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
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
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
            </motion.div>
          ))}
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
              <Globe className="w-5 h-5 text-[#c8102e]" />
              اتریش در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              کشوری با بالاترین استاندارد زندگی، آموزش رایگان و اقتصاد پایدار
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = img.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              راهنمای استفاده از این کتابچه
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              مسیرهای مهاجرتی در دو دسته «اقامت‌های موقت» و «اقامت‌های بلندمدت» تقسیم
              شده‌اند. روی هر کارت کلیک کنید تا مدارک تفصیلی هر مسیر نمایش داده شود. در
              پایان هر کارت، دکمه «ارزیابی امتیاز» شما را به فرم هوشمند هدایت می‌کند.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN DIRECTORY */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-right relative overflow-hidden"
          id="immigration-ways-dir"
        >
          {/* Top accent line */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-500 to-[#c8102e] rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-md">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-black text-stone-900">
                    کتابچه جامع مسیرهای مهاجرتی اتریش
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    {allVisas.length} مسیر رسمی + ارزیابی امتیاز لحظه‌ای
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-red-50 text-[#c8102e] border border-red-200 px-3 py-1 rounded-full font-black tracking-tight inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse" />
                ویزاها و اقامت‌های رسمی ۲۰۲۶
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
              جستجو، استعلام و ارزیابی در لحظه تمامی مسیرهای قانونی اقامت‌های
              کوتاه‌مدت، موقت، فصلی، سرخ-سفید-سرخ، تمکن مالی و الحاق اعضای خانواده.
              مسیر مورد نظر خود را برگزینید تا قالب شبیه‌ساز امتیاز متناسب با آن پیکربندی
              گردد.
            </p>
          </div>

          {/* Category Toggle Pills */}
          <div className="flex justify-center gap-2 p-1.5 bg-stone-100 rounded-2xl w-full max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => {
                setActiveVisaCategory("temp");
                setExpandedVisaId(null);
              }}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeVisaCategory === "temp"
                  ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                  : "text-stone-600 bg-white border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              اقامت‌های کوتاه‌مدت و موقت
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveVisaCategory("perm");
                setExpandedVisaId(null);
              }}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeVisaCategory === "perm"
                  ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                  : "text-stone-600 bg-white border border-stone-200 hover:bg-stone-50"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              اقامت‌های بلندمدت و دائمی
            </button>
          </div>

          {/* Active Category Content */}
          <AnimatePresence mode="wait">
            {IMMIGRATION_WAY_CATEGORIES.filter(
              (cat) => cat.id === activeVisaCategory
            ).map((cat) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Category subtitle */}
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-2xl p-4 text-xs font-black text-stone-700 leading-relaxed flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white flex-shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <span className="flex-1 pt-1">💡 {cat.subtitle}</span>
                </div>

                {cat.subsections.map((sub) => (
                  <div key={sub.id} className="space-y-4">
                    {/* Subsection title */}
                    <div className="border-r-4 border-[#c8102e] pr-4 space-y-1 text-right">
                      <h3 className="font-black text-stone-900 text-sm md:text-base flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#c8102e]" />
                        {sub.title}
                      </h3>
                      {sub.subtitle && (
                        <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                          {sub.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {sub.items.map((item, idx) => {
                        const isExpanded = expandedVisaId === item.title;

                        return (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                            whileHover={{ y: -6 }}
                            className="flex flex-col justify-between border-2 border-stone-200 hover:border-[#c8102e]/30 bg-white rounded-3xl p-5 transition-all relative overflow-hidden group text-right shadow-sm hover:shadow-lg"
                          >
                            {/* Decorative gradient */}
                            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#c8102e] to-[#970d22] opacity-[0.04] rounded-full group-hover:opacity-[0.1] transition-opacity" />

                            <div className="relative space-y-3">
                              {/* Header */}
                              <div className="space-y-1.5 text-right">
                                <span className="font-mono text-[9px] text-[#c8102e] font-black tracking-wider block" dir="ltr">
                                  {item.german}
                                </span>
                                <h4 className="font-black text-stone-900 text-xs leading-snug">
                                  {item.title}
                                </h4>
                              </div>

                              {/* Meta */}
                              <div className="space-y-2 text-[10px] font-bold text-stone-500">
                                <div className="flex items-start justify-end gap-1.5">
                                  <span className="text-stone-600 flex-1">
                                    <span className="text-stone-400">منظور: </span>
                                    {item.target}
                                  </span>
                                  <Target className="w-3.5 h-3.5 text-[#c8102e] shrink-0 mt-0.5" />
                                </div>
                                <div className="flex items-start justify-end gap-1.5">
                                  <span className="text-stone-600 flex-1">
                                    <span className="text-stone-400">اعتبار: </span>
                                    {item.duration}
                                  </span>
                                  <Calendar className="w-3.5 h-3.5 text-[#c8102e] shrink-0 mt-0.5" />
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3 text-justify">
                                {item.description}
                              </p>

                              {/* Requirements Accordion */}
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedVisaId(
                                      isExpanded ? null : item.title
                                    )
                                  }
                                  className="w-full flex items-center justify-between text-[10px] font-black text-[#c8102e] hover:text-[#970d22] bg-red-50/50 hover:bg-red-50 p-2.5 rounded-xl transition-all cursor-pointer border border-red-100"
                                >
                                  <span className="flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    {isExpanded
                                      ? "بستن مدارک"
                                      : "مشاهده الزامات و مدارک"}
                                  </span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-3 p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-2 text-[10px] text-stone-700 font-bold leading-relaxed text-right">
                                        <div className="font-black text-[9px] text-[#c8102e] border-b border-stone-200 pb-1.5 mb-2 flex items-center gap-1.5">
                                          <ListChecks className="w-3 h-3" />
                                          مدارک و پیش‌شرط‌های اصلی:
                                        </div>
                                        {item.requirements.map((req, i) => (
                                          <div
                                            key={i}
                                            className="flex gap-2 justify-end text-right"
                                          >
                                            <span className="flex-1">{req}</span>
                                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 font-extrabold shrink-0 mt-0.5" />
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            {/* Action button */}
                            <button
                              type="button"
                              onClick={() => {
                                localStorage.setItem(
                                  "otr_direct_migration_path",
                                  item.path
                                );
                                onNavigate?.("home");
                                setTimeout(() => {
                                  const el = document.getElementById(
                                    "austria-smart-suite-module"
                                  );
                                  if (el) {
                                    el.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                }, 300);
                              }}
                              className="relative w-full mt-4 py-2.5 text-[10.5px] font-black rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:scale-[1.02]"
                            >
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span>ارزیابی امتیاز این مسیر</span>
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ========================================== */}
        {/* WHY AUSTRIA */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              چرا اتریش مقصد اول متخصصان است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دلایلی که اتریش را به یکی از بهترین کشورهای مهاجرپذیر اروپا تبدیل کرده
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: TrendingUp, title: "اقتصاد قدرتمند", text: "پنجمین اقتصاد ثروتمند اروپا با درآمد سرانه بالا و بیکاری پایین.", color: "from-emerald-500 to-green-600" },
              { icon: GraduationCap, title: "آموزش رایگان", text: "دانشگاه‌های دولتی با شهریه ناچیز و رتبه جهانی بالا.", color: "from-blue-500 to-indigo-600" },
              { icon: Heart, title: "کیفیت زندگی", text: "رتبه ۱ جهان در کیفیت زندگی (Numbeo) — امنیت، بهداشت و فرهنگ.", color: "from-rose-500 to-pink-600" },
              { icon: Globe, title: "پذیرش اروپایی", text: "شهروندی اتریش = آزادی کار و زندگی در ۲۷ کشور اتحادیه اروپا.", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
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
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <div className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول مهاجرت به اتریش
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
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              مطمئن نیستید کدام مسیر مناسب شماست؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین با تجربه سال‌ها زندگی و کار در اتریش، آماده کمک به شما
              برای انتخاب درست‌ترین مسیر و آماده‌سازی مدارک هستند. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
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
              اطلاعات این کتابچه از منابع رسمی اتریش (oesterreich.gv.at،
              migration.gv.at، AMS) استخراج شده و صرفاً جنبه راهنمایی دارد. شرایط ویزا
              ممکن است تغییر کند. برای تصمیم‌های نهایی، همیشه به منابع رسمی مراجعه کنید.
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#c8102e]" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "RWR Card", "کارت قرمز سفید قرمز", "ویزای تحصیلی اتریش",
              "Job Seeker Visa", "اقامت دائم اتریش", "Daueraufenthalt EU",
              "Mangelberufe", "RWR Plus", "Aufenthaltsbewilligung",
              "ویزای کاری اتریش", "مهاجرت به اتریش", "تحصیل در اتریش",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-[#c8102e]/5 hover:border-[#c8102e]/30 hover:text-[#c8102e] transition-all cursor-default"
              >
                #{tag}
              </span>
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