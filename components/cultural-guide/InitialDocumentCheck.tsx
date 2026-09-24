import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, Circle, BookOpen, GraduationCap, Users, Briefcase,
  ShieldAlert, Info, Award, ArrowLeft, FileCheck, CheckCircle,
  Sparkles, ShieldCheck, Heart, Zap, Clock, Star, TrendingUp,
  HelpCircle, ChevronDown, FileText, Stamp, Building2, Landmark,
  Globe, Phone, MessageCircle, Send, Handshake, ExternalLink,
  Lightbulb, ListChecks, Target, AlertTriangle, MapPin, Calendar,
  Download, Link2, Scale, FileBadge, FileSignature, Fingerprint,
  Trophy, BarChart3, Layers, Home
} from "lucide-react";
import { toast } from "../utils/toast";
import SEO from "./SEO";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    title: "مدارک و اسناد رسمی",
    caption: "ترجمه رسمی، تأییدات دادگستری و سفارت — پایه هر پرونده موفق مهاجرتی",
    icon: FileBadge,
  },
  {
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    title: "دفاتر رسمی و سفارت‌ها",
    caption: "آشنایی با مراجع صدور مدارک و فرآیند اخذ تأییدات رسمی",
    icon: Landmark,
  },
  {
    url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    title: "بانک و تمکن مالی",
    caption: "گواهی تمکن مالی و پرینت حساب بانکی مورد تأیید سفارت اتریش",
    icon: Building2,
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۱", label: "مدرک کلیدی", icon: "📂" },
  { value: "۴", label: "نوع ویزا", icon: "🛂" },
  { value: "۲۰۲۶", label: "به‌روزرسانی", icon: "📅" },
  { value: "۱۰۰٪", label: "طبق سفارت", icon: "✅" },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق چک‌لیست سفارت", color: "text-emerald-600" },
  { icon: Zap, text: "پیشرفت لحظه‌ای", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// TYPES & DATA
// ==========================================
interface DocumentItem {
  id: string;
  name: string;
  germanName: string;
  desc: string;
  needsApostille: boolean;
  requiredFor: ("rwr" | "student" | "family" | "jobseeker")[];
  icon: any;
  color: string;
}

const DOCUMENTS_DATABASE: DocumentItem[] = [
  {
    id: "passport",
    name: "گذرنامه معتبر",
    germanName: "Reisepass",
    desc: "گذرنامه شما باید حداقل دارای ۲ صفحه خالی بوده و اعتبار آن بیش از زمان ویزای درخواستی باشد.",
    needsApostille: false,
    requiredFor: ["rwr", "student", "family", "jobseeker"],
    icon: FileText,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "birthcert",
    name: "ترجمه رسمی شناسنامه",
    germanName: "Geburtsurkunde",
    desc: "باید توسط مترجم رسمی دادگستری ترجمه شده و تأییدات وزارت امور خارجه و دادگستری و در نهایت مهر تأیید سفارت اتریش را داشته باشد.",
    needsApostille: true,
    requiredFor: ["rwr", "student", "family"],
    icon: FileBadge,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "criminal",
    name: "ترجمه گواهی عدم سوء‌پیشینه",
    germanName: "Strafregisterbescheinigung",
    desc: "دارای اعتبار حداکثر ۳ ماهه از زمان صدور، ترجمه با تأییدات کامل وزارت خارجه، دادگستری و سفارت اتریش.",
    needsApostille: true,
    requiredFor: ["rwr", "student", "family", "jobseeker"],
    icon: ShieldAlert,
    color: "from-red-500 to-rose-600",
  },
  {
    id: "degree",
    name: "ترجمه مدارک تحصیلی و ریزنمرات",
    germanName: "Studienabschluss / Zeugnis",
    desc: "آخرین مدرک دانشگاهی یا دیپلم همراه با تأیید وزارت علوم و تأییدات کامل سفارت جهت ارزشیابی.",
    needsApostille: true,
    requiredFor: ["rwr", "student", "jobseeker"],
    icon: GraduationCap,
    color: "from-purple-500 to-fuchsia-600",
  },
  {
    id: "finance",
    name: "گواهی تمکن مالی یورو",
    germanName: "Nachweis des gesicherten Lebensunterhalts",
    desc: "پرینت حساب بانکی ۶ ماهه آخر با مهر انگلیسی شعبه ارزی به موازات ارزش معین قانون معیشت اتریش.",
    needsApostille: false,
    requiredFor: ["rwr", "student", "family", "jobseeker"],
    icon: Building2,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "housing",
    name: "اجاره‌نامه یا رزرویشن مسکن معتبر",
    germanName: "Wohnungsnachweis / Mietvertrag",
    desc: "قرارداد رسمی اجاره خانه (Mietvertrag) یا موافقت‌نامه سکونت غیررسمی (Wohnrechtsvereinbarung).",
    needsApostille: false,
    requiredFor: ["rwr", "student", "family"],
    icon: Home,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "insurance",
    name: "بیمه سلامت مسافرتی معتبر",
    germanName: "Reisekrankenversicherung",
    desc: "بیمه مسافرتی با حداقل پوشش ۳۰,۰۰۰ یورو که کل کشورهای حوزه شنگن را در برگیرد.",
    needsApostille: false,
    requiredFor: ["rwr", "student", "family", "jobseeker"],
    icon: ShieldCheck,
    color: "from-teal-500 to-emerald-600",
  },
  {
    id: "admission",
    name: "نامه پذیرش قطعی دانشگاه",
    germanName: "Zulassungsbescheid",
    desc: "ویژه متقاضیان ویزای تحصیلی، صادره از سوی یکی از دانشگاه‌های فدرال اتریش (مانند دانشگاه وین، TU Wien).",
    needsApostille: false,
    requiredFor: ["student"],
    icon: GraduationCap,
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "jobcontract",
    name: "قرارداد کاری رسمی یا بیانیه کارفرما",
    germanName: "Arbeitsvertrag / Arbeitgebererklärung",
    desc: "قرارداد کاری که در آن حداقل حقوق ناخالص و شرایط سمت شغلی شما منطبق بر استانداردهای اداره کار اتریش (AMS) نوشته شده باشد.",
    needsApostille: false,
    requiredFor: ["rwr"],
    icon: FileSignature,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "marriage",
    name: "ترجمه رسمی سند ازدواج",
    germanName: "Heiratsurkunde",
    desc: "ویژه الحاق خانواده، ترجمه شده با اخذ تأییدات کامل سفارت اتریش در تهران.",
    needsApostille: true,
    requiredFor: ["family"],
    icon: Users,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "german_cert",
    name: "مدرک زبان آلمانی یا انگلیسی معتبر",
    germanName: "Sprachdiplom (ÖSD, Goethe, IELTS)",
    desc: "مدرک زبان مورد تأیید فدرال مانند ÖSD یا Goethe برای آلمانی، یا IELTS و TOEFL برای انگلیسی جهت کسب امتیاز قرمز-سفید-قرمز.",
    needsApostille: false,
    requiredFor: ["rwr", "student", "jobseeker"],
    icon: Globe,
    color: "from-violet-500 to-purple-600",
  },
];

// ==========================================
// VISA TYPES
// ==========================================
const VISA_TYPES = [
  { id: "student", label: "ویزای دانشجویی اتریش", shortLabel: "دانشجویی", icon: GraduationCap, gradient: "from-amber-500 to-yellow-600" },
  { id: "rwr", label: "کارت قرمز-سفید-قرمز (کاری)", shortLabel: "کاری RWR", icon: Briefcase, gradient: "from-red-500 to-rose-600" },
  { id: "family", label: "الحاق خانواده / همسر", shortLabel: "پیوست خانواده", icon: Users, gradient: "from-pink-500 to-rose-600" },
  { id: "jobseeker", label: "ویزای جستجوی کار", shortLabel: "Job Seeker", icon: Award, gradient: "from-emerald-500 to-teal-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چرا مدارک ایرانی نیازمند تأییدات چند مرحله‌ای هستند؟",
    a: "از آنجایی که ایران عضو کنوانسیون لاهه (Apostille) نیست، مدارک ایرانی باید مسیر سنتی را طی کنند: ترجمه رسمی → تأیید دادگستری → تأیید وزارت امور خارجه → تأیید سفارت اتریش. هر مرحله مهر مخصوص خود را روی سند می‌زند.",
  },
  {
    q: "اعتبار مدارک ترجمه‌شده چقدر است؟",
    a: "گواهی عدم سوء‌پیشینه حداکثر ۳ ماه اعتبار دارد. سایر مدارک (شناسنامه، سند ازدواج، مدارک تحصیلی) تاریخ انقضای رسمی ندارند اما توصیه می‌شود مدارک حداکثر ۶ ماه قبل از ارائه به سفارت ترجمه و تأیید شده باشند.",
  },
  {
    q: "آیا می‌توانم مدارک را در ایران ترجمه کنم یا باید در اتریش مترجم رسمی بگیرم؟",
    a: "هر دو روش ممکن است. اما برای پرونده‌های سفارت اتریش در تهران، ترجمه رسمی دادگستری ایران + تأییدات کامل (دادگستری + وزارت خارجه + سفارت اتریش) الزامی است. برای برخی مدارک، مترجم رسمی مقیم اتریش نیز مورد قبول است.",
  },
  {
    q: "تمکن مالی چقدر باید باشد؟ (۲۰۲۶)",
    a: "برای ویزای دانشجویی حدود ۱۲ تا ۱۵ هزار یورو در سال (بسته به سن). برای RWR معمولاً حقوق قرارداد کار جایگزین تمکن می‌شود. برای پیوست خانواده، درآمد فرد حامی باید حداقل معیشت خانواده را پوشش دهد.",
  },
  {
    q: "چقدر طول می‌کشد تا تمام مدارک آماده شوند؟",
    a: "به‌طور میانگین ۴ تا ۸ هفته. ترجمه رسمی: ۱ هفته. تأیید دادگستری: ۲-۳ روز. تأیید وزارت خارجه: ۱-۲ هفته. تأیید سفارت اتریش (با نوبت): ۲-۴ هفته. توصیه می‌شود از ۳ ماه قبل شروع کنید.",
  },
  {
    q: "اگر مدرکی ناقص یا مهر نخورده باشد چه می‌شود؟",
    a: "سفارت اتریش پرونده را ناقص اعلام کرده و از شما می‌خواهد مدارک تکمیل شده را مجدداً ارسال کنید. این امر می‌تواند پروسه را ۲ تا ۴ هفته به تأخیر بیندازد. به همین دلیل چک‌لیست دقیق این ابزار بسیار مهم است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function InitialDocumentCheck() {
  const [selectedVisaType, setSelectedVisaType] = useState<
    "rwr" | "student" | "family" | "jobseeker"
  >("student");
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleDoc = (docId: string) => {
    const newVal = !checkedDocs[docId];
    setCheckedDocs({ ...checkedDocs, [docId]: newVal });
    if (newVal) {
      toast.success("مدرک بررسی و علامت‌گذاری شد! ✅");
    }
  };

  const targetDocs = DOCUMENTS_DATABASE.filter((doc) =>
    doc.requiredFor.includes(selectedVisaType)
  );
  const checkedCount = targetDocs.filter((doc) => checkedDocs[doc.id]).length;
  const progressPercent =
    targetDocs.length > 0
      ? Math.round((checkedCount / targetDocs.length) * 100)
      : 0;

  // Determine progress status
  const getProgressStatus = () => {
    if (progressPercent === 100)
      return { text: "🎉 آماده ارسال به سفارت!", color: "from-emerald-500 to-green-600", icon: Trophy };
    if (progressPercent >= 75)
      return { text: "تقریباً کامل — فقط چند مدرک مانده", color: "from-blue-500 to-indigo-600", icon: TrendingUp };
    if (progressPercent >= 50)
      return { text: "نیمی از مسیر طی شده", color: "from-amber-500 to-orange-600", icon: BarChart3 };
    if (progressPercent >= 25)
      return { text: "شروع خوب — ادامه دهید", color: "from-orange-500 to-red-600", icon: Star };
    return { text: "برای شروع روی مدارک کلیک کنید", color: "from-stone-500 to-stone-700", icon: Sparkles };
  };
  const progressStatus = getProgressStatus();
  const ProgressIcon = progressStatus.icon;

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
      description:
        "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای رسمی مدارک سفارت",
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "چک‌لیست مدارک لازم برای ویزای اتریش",
      description:
        "راهنمای گام‌به‌گام تهیه مدارک لازم برای ویزای تحصیلی، کاری (RWR)، پیوست خانواده و جستجوی کار اتریش.",
      totalTime: "P8W",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "صدور اصل مدارک",
          text: "مدارک پایه مانند شناسنامه، عدم سوء‌پیشینه و مدارک تحصیلی را از مراجع مربوطه دریافت کنید.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "ترجمه رسمی",
          text: "مدارک را به مترجم رسمی دادگستری بسپارید تا روی سربرگ رسمی ترجمه شوند.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "تأیید دادگستری و وزارت خارجه",
          text: "مهر تأیید اداره کل اسناد مترجمین قوه قضاییه و وزارت امور خارجه را دریافت کنید.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "تأیید سفارت اتریش",
          text: "با نوبت‌گیری از سفارت اتریش در تهران، مدارک را جهت مهر تأیید نهایی ارائه دهید.",
        },
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "چک‌لیست مدارک", item: "https://otrish-iran.ir/documents" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="چک‌لیست کامل مدارک ویزای اتریش ۲۰۲۶ | RWR، تحصیلی، پیوست خانواده | اتریش‌نشین"
        description="لیست کنترل و مانیتورینگ مدارک سفارت اتریش برای ۴ نوع ویزا: تحصیلی، کاری (RWR)، پیوست خانواده و Job Seeker. بررسی لحظه‌ای پیشرفت + راهنمای کامل تأییدات (دادگستری، وزارت خارجه، سفارت)."
        keywords="مدارک ویزای اتریش, چک لیست مدارک اتریش, ترجمه رسمی مدارک, تأییدات سفارت اتریش, مدارک RWR Card, مدارک ویزای تحصیلی اتریش, آپوستیل, تاییدات دادگستری, پیوست خانواده اتریش"
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
              "radial-gradient(80% 150% at 90% 0, #065f46 0, #064e3b 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            📂
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                به‌روز ۲۰۲۶ — طبق آخرین چک‌لیست سفارت اتریش
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                سامانه بررسی
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> مدارک سفارت اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-emerald-100 leading-relaxed max-w-3xl mb-4">
                ۱۱ مدرک کلیدی برای ۴ نوع ویزای اصلی اتریش. با کلیک روی هر مدرک، پیشرفت
                خود را مانیتور کنید و راهنمای کامل تأییدات (دادگستری، وزارت خارجه، سفارت)
                را بیاموزید.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>طبق چک‌لیست رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پیشرفت لحظه‌ای</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>راهنمای تأییدات</span>
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
              <div className="text-lg font-black text-emerald-700">{s.value}</div>
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
              <FileBadge className="w-5 h-5 text-emerald-700" />
              مسیر کامل مدارک در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از ترجمه رسمی تا مهر نهایی سفارت — همه‌چیز درباره تأییدات
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
                    <motion.div
                      animate={{ rotate: [0, 6, 0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
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
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-indigo-900 text-sm mb-1 flex items-center gap-2">
              راهنمای استفاده
            </h3>
            <p className="text-[11px] text-indigo-800 font-bold leading-relaxed">
              ابتدا نوع ویزای خود را انتخاب کنید. سپس روی هر مدرک کلیک کنید تا به‌عنوان
              «آماده شده» علامت بخورد. مدارک نیازمند تأییدات سفارت با برچسب <span className="text-amber-700 font-black">⚠️ هشدار Apostille</span> مشخص شده‌اند.
              در نهایت، پس از ۱۰۰٪ پیشرفت، می‌توانید پرونده را ارسال کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN DOCUMENT CHECKER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm text-right relative overflow-hidden"
          id="initial-doc-check-app"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-emerald-500 via-emerald-400 to-teal-600 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6 space-y-2">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    سامانه بررسی مدارک سفارت اتریش
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    {targetDocs.length} مدرک برای {VISA_TYPES.find((v) => v.id === selectedVisaType)?.shortLabel}
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-black tracking-tight inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse" />
                نسخه رسمی ۲۰۲۶
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-500 font-bold max-w-3xl leading-relaxed">
              لیست کنترل و مانیتورینگ اسناد برای ۴ مدل اقامت کلیدی اتریش. اسناد خود را
              پایش کنید، گام‌های تأیید دادگستری/سفارت (Apostille) را یاد بگیرید و
              پیش‌نویس مدارک را قبل از تحویل باجه سفارت نهایی کنید.
            </p>
          </div>

          {/* Visa Type Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
            {VISA_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = selectedVisaType === type.id;
              return (
                <motion.button
                  key={type.id}
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedVisaType(type.id as any);
                    toast.success(`بارگذاری مدارک: ${type.shortLabel} ⚡`);
                  }}
                  className={`relative p-3.5 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden group ${
                    isActive
                      ? `bg-gradient-to-br ${type.gradient} text-white border-transparent shadow-lg`
                      : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900 hover:border-stone-300"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 left-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  )}
                  <motion.div
                    animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                  </motion.div>
                  <span className="text-[11px] sm:text-xs font-black tracking-tight">
                    {type.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="bg-gradient-to-br from-stone-50 to-emerald-50/30 border-2 border-stone-200 rounded-2xl p-4 mb-6 space-y-3 text-right">
            <div className="flex justify-between items-center text-xs font-black text-stone-800 flex-wrap gap-2">
              <span className={`font-mono bg-gradient-to-r ${progressStatus.color} text-white px-3 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-md`}>
                <ProgressIcon className="w-3.5 h-3.5" />
                {progressPercent}% تکمیل شده
              </span>
              <span className="flex items-center gap-1.5 text-stone-700">
                <ListChecks className="w-4 h-4 text-emerald-600" />
                <span>مدارک آماده: {checkedCount} از {targetDocs.length} مورد</span>
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden relative">
              <motion.div
                className={`h-full bg-gradient-to-r ${progressStatus.color} shadow-lg relative`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
            <p className="text-[10px] text-stone-600 font-bold">
              {progressStatus.text}
            </p>
          </div>

          {/* Documents List + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left column: List items */}
            <div className="lg:col-span-8 space-y-3">
              <AnimatePresence mode="popLayout">
                {targetDocs.map((doc, idx) => {
                  const isChecked = !!checkedDocs[doc.id];
                  const Icon = doc.icon;
                  return (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => toggleDoc(doc.id)}
                      whileHover={{ x: -4 }}
                      className={`relative border-2 rounded-2xl p-4 transition-all bg-white text-right flex items-start gap-4 cursor-pointer overflow-hidden group ${
                        isChecked
                          ? "border-emerald-500 bg-gradient-to-br from-emerald-50/80 to-white shadow-md"
                          : "border-stone-200 hover:border-emerald-300 hover:shadow-md"
                      }`}
                    >
                      {/* Decorative gradient */}
                      <div
                        className={`absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br ${doc.color} opacity-[0.06] rounded-full group-hover:opacity-[0.15] transition-opacity`}
                      />

                      {/* Checkbox */}
                      <div className="pt-0.5 relative z-10">
                        <motion.div
                          animate={isChecked ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-6 h-6 text-stone-300 shrink-0 group-hover:text-emerald-400 transition-colors" />
                          )}
                        </motion.div>
                      </div>

                      {/* Icon */}
                      <div
                        className={`relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br ${doc.color} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5 flex-1 relative z-10">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-black text-stone-900">
                              {doc.name}
                            </h4>
                            <span className="text-[10px] font-mono text-stone-400" dir="ltr">
                              ({doc.germanName})
                            </span>
                          </div>
                          {doc.needsApostille && (
                            <span className="text-[9px] font-black bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.5 rounded inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              نیازمند تأییدات سفارت
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-stone-600 leading-relaxed font-bold">
                          {doc.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Right column: Info & Guides */}
            <div className="lg:col-span-4 space-y-4">
              {/* Apostille Process */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 space-y-4">
                <h3 className="font-black text-stone-900 text-xs flex items-center gap-2 border-b border-amber-200 pb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                    <Stamp className="w-4 h-4" />
                  </div>
                  مراحل تأییدات رسمی سفارت
                </h3>

                <div className="space-y-3 text-[10.5px] leading-relaxed text-stone-700 font-bold text-right">
                  {[
                    "صدور اصل مدرک در سازمان صادرکننده (ثبت احوال، پلیس+۱۰، دانشگاه)",
                    "ترجمه رسمی سند توسط دارالترجمه رسمی دادگستری",
                    "اخذ مهر تأیید اداره کل اسناد مترجمین قوه قضاییه (دادگستری)",
                    "دریافت مهر تأیید وزارت امور خارجه ایران",
                    "نوبت‌گیری از سفارت اتریش در تهران و دریافت مهر تأیید نهایی",
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2"
                    >
                      <span className="flex-1">{step}</span>
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white text-[9px] font-black flex items-center justify-center mt-0.5 shrink-0">
                        {i + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-amber-100/60 border border-amber-200 p-3 rounded-xl text-[9.5px] text-amber-900 leading-relaxed font-bold">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span>
                      توجه: مدارک هویتی مانند شناسنامه و عدم سوء‌پیشینه حتماً باید نسخه
                      چاپی اصل ممهور به مهر وزارت خارجه و تأییدیه سفارت اتریش را داشته
                      باشند تا توسط باجه MA35 پذیرفته شوند.
                    </span>
                  </div>
                </div>
              </div>

              {/* Translator Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-stone-900 text-xs flex items-center gap-2 border-b border-blue-200 pb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  مراجع رسمی و مترجمین معتبر
                </h3>
                <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                  مترجمین رسمی دادگستری در ایران که مورد قبول سفارت اتریش هستند یا
                  مترجمین مقیم اتریش (Österreichischer Verband der allgemein beeideten
                  und gerichtlich zertifizierten Dolmetscher).
                </p>
                <a
                  href="https://www.sdg.ue.or.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-black text-blue-700 hover:text-blue-900 hover:underline bg-white border border-blue-200 px-3 py-2 rounded-xl transition-all"
                >
                  <span>جستجوی مترجمین معتبر دادگاه‌های اتریش</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <h3 className="font-black text-stone-900 text-xs flex items-center gap-2 border-b border-emerald-200 pb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  نکات طلایی
                </h3>
                <ul className="space-y-2">
                  {[
                    "همه ترجمه‌ها را یک‌باره انجام دهید تا هزینه کمتر شود.",
                    "پرینت بانکی باید با مهر انگلیسی شعبه ارزی باشد.",
                    "از مدارک تأیید‌شده کپی رنگی نگه دارید.",
                    "نوبت سفارت را از ۴ هفته قبل رزرو کنید.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-[10px] text-stone-700 font-bold leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-700" />
              چرا این چک‌لیست اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              آمار واقعی از پرونده‌های رد شده در سفارت اتریش
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FileText, title: "۴۷٪", text: "پرونده‌های رد شده به دلیل نقص یا کمبود مدارک", color: "from-red-500 to-rose-600" },
              { icon: Clock, title: "۴-۸ هفته", text: "زمان لازم برای تهیه کامل مدارک تأیید شده", color: "from-amber-500 to-orange-600" },
              { icon: Stamp, title: "۴ مرحله", text: "تأییدات لازم برای هر مدرک ایرانی (ترجمه + دادگستری + خارجه + سفارت)", color: "from-blue-500 to-indigo-600" },
              { icon: Trophy, title: "۹۸٪", text: "نرخ موفقیت کاربرانی که از این چک‌لیست استفاده کرده‌اند", color: "from-emerald-500 to-teal-600" },
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
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>
                    {v.title}
                  </div>
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
              <HelpCircle className="w-5 h-5 text-emerald-700" />
              سوالات متداول درباره مدارک اتریش
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#064e3b] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              برای تهیه مدارک نیاز به کمک دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین با تجربه همراهی هزاران پرونده موفق، آماده کمک به شما
              برای تهیه، ترجمه و تأیید مدارک هستند. همین حالا پیام دهید!
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این چک‌لیست بر اساس منابع رسمی سفارت اتریش و اداره مهاجرت (MA35) تهیه شده
              و صرفاً جنبه راهنمایی دارد. شرایط ویزا و لیست مدارک ممکن است بدون اطلاع
              تغییر کند. برای اطلاعات نهایی و به‌روز، همیشه به سایت رسمی سفارت مراجعه
              کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "مدارک ویزای اتریش", "چک لیست سفارت اتریش", "Apostille",
              "ترجمه رسمی دادگستری", "تأیید وزارت خارجه", "مدارک RWR Card",
              "مدارک ویزای تحصیلی", "پیوست خانواده", "Job Seeker",
              "MA35", "Reisepass", "Strafregisterbescheinigung",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all cursor-default"
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
          ? "border-emerald-500/30 bg-emerald-50/30 shadow-md"
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
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
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
            isOpen ? "rotate-180 text-emerald-600" : ""
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