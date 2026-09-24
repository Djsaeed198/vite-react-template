import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Award,
  Globe,
  ExternalLink,
  HeartPlus,
  Compass,
  Building,
  GraduationCap,
  Train,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Search,
  Scale,
  Users,
  ArrowLeftRight,
  ShieldCheck,
  Home,
  Calendar,
  MapPin,
  Heart,
  Palette,
  Smartphone,
  Phone,
  Clock,
  Activity,
  Sparkles,
  Map,
  Languages,
  Stethoscope,
  ShieldAlert,
  ChevronLeft,
  ChevronDown,
  Quote,
  Star,
  Mountain,
  Snowflake,
  Coffee,
  Landmark,
  Music,
  TrendingUp,
  BadgeCheck
} from "lucide-react";

/* ================================================================
   🏔️  L O G O   C O M P O N E N T  —  «اتریش‌نشین»
   ================================================================ */
function AustriaResidentLogo({ size = 52 }) {
  return (
    <div className="relative flex items-center gap-2 group" style={{ direction: "ltr" }}>
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600 via-rose-500 to-red-700 shadow-lg shadow-red-500/40 group-hover:shadow-red-500/70 transition-shadow duration-500 animate-logo-glow" />
        <div className="absolute inset-[2px] rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <defs>
              <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="redBand" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            {/* پس‌زمینه آسمان آلپی */}
            <rect x="0" y="0" width="64" height="64" fill="#f8fafc" />
            {/* نوار قرمز بالا و پایین پرچم اتریش */}
            <rect x="0" y="0" width="64" height="8" fill="url(#redBand)" />
            <rect x="0" y="56" width="64" height="8" fill="url(#redBand)" />
            {/* کوه آلپ */}
            <path d="M2 54 L20 22 L32 40 L44 16 L62 54 Z" fill="url(#mtnGrad)" />
            {/* برف قله */}
            <path d="M20 22 L26 30 L22 32 L17 28 Z" fill="url(#snowGrad)" />
            <path d="M44 16 L52 26 L46 28 L40 22 Z" fill="url(#snowGrad)" />
            <path d="M44 16 L47 20 L44 21 L41 19 Z" fill="#ffffff" />
            {/* گل ادلوایس (نماد اتریش) */}
            <circle cx="32" cy="50" r="2.2" fill="#fbbf24" />
            <ellipse cx="32" cy="45" rx="1.6" ry="3" fill="#ffffff" />
            <ellipse cx="28" cy="48" rx="3" ry="1.6" fill="#ffffff" />
            <ellipse cx="36" cy="48" rx="3" ry="1.6" fill="#ffffff" />
            <ellipse cx="29" cy="52" rx="2.4" ry="1.4" fill="#ffffff" transform="rotate(45 29 52)" />
            <ellipse cx="35" cy="52" rx="2.4" ry="1.4" fill="#ffffff" transform="rotate(-45 35 52)" />
          </svg>
        </div>
        {/* نقطه‌ی فعالیت آنلاین */}
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse-slow" />
      </div>
      <div className="text-right leading-tight" style={{ direction: "rtl" }}>
        <div className="text-[15px] font-black text-stone-900 tracking-tight">
          اتریش‌نشین<span className="text-red-600">.</span>
        </div>
        <div className="text-[9px] font-bold text-stone-400 tracking-widest">
          AUSTRIA · RESIDENT
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   🌍  D A T A
   ================================================================ */
interface VisaCategory {
  id: string;
  title: string;
  sub: string;
  pointsRequired?: string;
  target: string;
  description: string;
  requirements: string[];
  challenges: string;
  officialSource: string;
  difficulty: number; // 1-5
  duration: string;
  successRate: string;
  tags: string[];
}

const VISAS_DATA: VisaCategory[] = [
  {
    id: "rwr-card",
    title: "کارت سرخ-سفید-سرخ (Rot-Weiß-Rot Karte)",
    sub: "اقامت کاری بر پایه سیستم امتیازدهی تخصصی",
    pointsRequired: "۷۰ امتیاز از ۱۰۰ (برای متخصصین عالی) یا ۵۵ امتیاز (برای مشاغل کمیاب)",
    target: "متخصصان بسیار عالی، دانش‌آموختگان دانشگاه‌های اتریش، کلید‌کاران و نیروی ماهر در مشاغل با کمبودِ نیروی کار (Mangelberufe)",
    description: "کارت سرخ-سفید-سرخ کارآمدترین مجوز اقامت موقت ۲ ساله در اتریش است که حق کارفرما یابیِ انحصاری به همراه دارد. پس از طی ۲۴ ماه کار مداوم و بیمه‌شده، متقاضی می‌تواند آن را به کارت سرخ-سفید-سرخ پلاس (RWR-Karte Plus) ارتقا دهد تا دسترسی او به بازار کار سراسر اتریش کاملاً نامحدود شود.",
    requirements: [
      "پیشنهاد شغلی حداقل (Job Offer) منطبق با جدول دستمزدهای صنفی اتحادیه صنفی اتریش (Kollektivvertrag)",
      "رسیدن به حدنصاب امتیازات قانونی بر اساس معیارهای سن، مدارک تحصیلی، سابقه کاری مرتبط، و تسلط به زبان آلمانی (A1/A2/B1) یا انگلیسی (IELTS/TOEFL)",
      "مدرک معتبر مسکن (قرارداد اجاره ثبت شده یا Mietvertrag)",
      "تمکن مالی و بیمه مسافرتی کامل تا زمان صدور تأییدیه کار ملی"
    ],
    challenges: "طولانی بودن زمان ارزیابی صلاحیت توسط اداره خدمات بازار کار اتریش (AMS) که ممکن است بین ۸ الی ۱۲ هفته طول بکشد. کارفرما باید صبور باشد و تا قبل از دریافت کارت فیزیکی تعهد کاری را منحل نکند.",
    officialSource: "https://www.migration.gv.at",
    difficulty: 4,
    duration: "۸ – ۱۲ هفته",
    successRate: "متوسط به بالا",
    tags: ["کاری", "امتیازی", "بلندمدت"]
  },
  {
    id: "blue-card",
    title: "کارت آبی اتحادیه اروپا (Blaue Karte EU)",
    sub: "اقامت کاری برای کارمندان یقه سفید با درآمد بالا",
    pointsRequired: "بدون نیاز به سیستم امتیازدهی عددی",
    target: "فارغ‌التحصیلان دانشگاه‌های معتبر بین‌المللی با قرارداد کاری متناسب با حداقل دستمزد کلان",
    description: "مجوز اقامتی کاری بسیار معتبر که برخلاف سیستم امتیازدهی معمولی، بر مبنای حقوق پیشنهادی کارفرما ارزیابی می‌شود. حقوق ناخالص سالانه پیشنهادی باید حداقل برابر با متوسط درآمد ناخالص ملی اتریش باشد (نزدیک به ۴۷,۸۰۰ یورو سالانه در سال ۲۰۲۶). گزینه‌ای عالی برای مهندسین، متخصصین فناوری اطلاعات و مدیران.",
    requirements: [
      "قرارداد کار رسمی با حقوق ناخالص با کف حداقلی تعیین شده توسط وزارت کار اتریش",
      "ارائه مدرک تحصیلی لیسانس یا بالاتر که مستقیماً به حوزه فعالیت شغلی مربوط باشد",
      "تایید انحصاری اداره کار اتریش (AMS) مبنی بر عدم وجود نیروی بیکار واجد شرایط"
    ],
    challenges: "بوروکراسی شدید در مطابقت دقیق مدرک تحصیلی با وظایف مندرج در قرارداد کاری و کف درآمدی ناخالص بالا.",
    officialSource: "https://www.migration.gv.at",
    difficulty: 3,
    duration: "۶ – ۱۰ هفته",
    successRate: "بالا",
    tags: ["یقه سفید", "درآمد بالا", "سریع"]
  },
  {
    id: "student-visa",
    title: "ویزای تحصیلی اتریش (Aufenthaltsbewilligung - Student)",
    sub: "مجوز اقامت تحصیلی دانشگاهی و کالجی",
    target: "دانشجویان پذیرفته شده در دانشگاه‌های سراسری (Universität)، دانشگاه‌های کاربردی (Fachhochschule) یا دوره‌های زبان پیش‌نیاز رسمی",
    description: "این مجوز اقامت سالانه به دانشجویان غیر اتحادیه اروپا اجازه می‌دهد تا در حین تحصیل تا سقف ۲۰ ساعت در هفته کار کنند. پس از فارغ‌التحصیلی، دولت اتریش مجوز جستجوی کار ۱۲ ماهه صادر می‌کند تا فرد بتواند آن را به ویزای کاری رسمی تبدیل کند.",
    requirements: [
      "تاییدیه پذیرش رسمی غیرمشروط از یکی از موسسات آموزشی مورد تایید اتریش (Zulassungsbescheid)",
      "تمکن مالی نقدی قوی (سند اثبات تضمین معیشت قانونی برای سنین بالای ۲۴ سال سالانه نزدیک به ۱۵,۰۰۰ یورو در سال ۲۰۲۶)",
      "تعهدنامه یا قرارداد معتبر خوابگاه دانشجویی (ÖAD) یا اجاره‌نامه مسکونی شخصی",
      "بیمه درمانی کامل دانشجویی اتریش (Studierendenselbstversicherung) صادره از سازمان ÖGK"
    ],
    challenges: "یکی از چالش‌های مکرر ایرانیان، اثبات منشاء قانونی پول تمکن مالی (Source of Funds) به اداره مهاجرت MA 35 است.",
    officialSource: "https://oead.at",
    difficulty: 3,
    duration: "۴ – ۸ هفته",
    successRate: "متوسط",
    tags: ["تحصیلی", "دانشجویی", "بلندمدت"]
  },
  {
    id: "family-reunification",
    title: "الحاق به خانواده (Familienzusammenführung)",
    sub: "پیوستن همسر و فرزندان زیر ۱۸ سال به شهروندان یا مقیمان اتریش",
    target: "همسر رسمی قانونی، همسر ثبت شده مدنی (Eingetragene Partnerschaft) و فرزندان صغیر مجردِ متقاضی مقیم اتریش",
    description: "روند پیوستن به خانواده یکی از حقوق پذیرفته شده قانونی است اما سخت‌گیری‌های مالی و اداری شدیدی روی آن اعمال می‌شود. همسر پیوند‌خورنده معمولاً از همان ابتدای ورود، مجاز به کار تمام وقت در سراسر قلمرو اتریش خواهد بود (مجوز RWR پلاس).",
    requirements: [
      "گواهی تسلط مقدماتی به زبان آلمانی در سطح A1 قبل از ورود به اتریش",
      "اثبات درآمد منظم و ماهانه متقاضی مستقر در اتریش بر اساس نرخ پایه‌ای تعیین شده (Berechnungssatz)",
      "سند ازدواج رسمی ترجمه شده با تأیید نهایی وزارت امور خارجه و سفارت اتریش (Apostille/Superlegalization)",
      "مسکن به میزان مساحت کافی و با سقف خواب مجزا برای کودکان در اتریش"
    ],
    challenges: "محاسبه دقیق فرمول درآمدهای خالص و کسر بدهی‌ها عاقبت‌ساز است. کوچک‌ترین کسر مالی حتی تا میزان ۱۰ یورو, پرونده را ماه‌ها وارد جریان حقوقی می‌کند.",
    officialSource: "https://www.bmeia.gv.at",
    difficulty: 4,
    duration: "۳ – ۹ ماه",
    successRate: "متوسط",
    tags: ["خانواده", "همسر", "فرزند"]
  },
  {
    id: "job-seeker",
    title: "ویزای جستجوی کار اتریش (Job Seeker Visa)",
    sub: "ویزای ۶ ماهه حضور سنگ فرش اتریش جهت کارجویی",
    pointsRequired: "۷۰ امتیاز از ۱۰۰ برای متقاضیان فوق متخصص",
    target: "نخبگان و نیروهای بسیار متخصص بین‌المللی با رزومه‌های برجسته علمی و صنعتی",
    description: "این ویزا به افراد بسیار ماهر اجازه می‌دهد تا بدون کارفرمای از پیش تعیین شده، وارد مرزهای رسمی اتریش شده و به مدت ۶ ماه به جستجوی کار بپردازند. به محض یافتن پیشنهاد کاری منطبق بر شرایط RWR، بدون نیاز به خروج از کشور کارت کاری موقت دریافت می‌دارید.",
    requirements: [
      "مجموع امتیاز بالای ۷۰ برمبنای جدول امتیازات نخبگان دانشگاهی",
      "داشتن مدرک حداقل فوق لیسانس یا معادل آن از دانشگاه‌های رده بالای بین‌المللی",
      "گواهی تمکن مالی تامین هزینه‌های ۶ ماه معیشت انفرادی در اتریش",
      "بیمه مسافرتی کامل با پوشش حداقل ۳۰,۰۰۰ یورویی درمانگاهی"
    ],
    challenges: "با توجه به کمبود فرصت‌های مستقیم کار بدون تسلط به زبان آلمانی عالی در شرکت‌های اتریشی محلی، نهایی کردن کار در زمان کوتاه ۶ ماه بسیار فشرده و پر استرس است.",
    officialSource: "https://www.migration.gv.at",
    difficulty: 5,
    duration: "۸ – ۱۴ هفته",
    successRate: "پایین به متوسط",
    tags: ["نخبگان", "کارجویی", "کوتاه‌مدت"]
  }
];

/* ================================================================
   🎨  S T Y L E S  (Global CSS via style tag)
   ================================================================ */
function GuideStyles() {
  return (
    <style jsx global>{`
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes logoGlow {
        0%, 100% { box-shadow: 0 8px 24px -6px rgba(220,38,38,0.35); }
        50% { box-shadow: 0 12px 32px -4px rgba(220,38,38,0.6); }
      }
      @keyframes pulseSlow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.15); }
      }
      @keyframes shimmerText {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes stripeMove {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
      @keyframes spinSlow {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes barGrow {
        from { width: 0; }
      }
      .animate-fade-in { animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      .animate-fade-only { animation: fadeIn 0.4s ease; }
      .animate-float-slow { animation: floatSlow 4s ease-in-out infinite; }
      .animate-logo-glow { animation: logoGlow 3s ease-in-out infinite; }
      .animate-pulse-slow { animation: pulseSlow 2s ease-in-out infinite; }
      .animate-slide-in-right { animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      .animate-spin-slow { animation: spinSlow 14s linear infinite; }
      .gradient-text-shimmer {
        background: linear-gradient(90deg, #7f1d1d 0%, #dc2626 30%, #f59e0b 50%, #dc2626 70%, #7f1d1d 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmerText 6s linear infinite;
      }
      .flag-stripe-anim {
        background-size: 200% 200%;
        animation: stripeMove 8s ease infinite;
      }
      .card-hover-lift {
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
      }
      .card-hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px -20px rgba(127,29,29,0.25);
      }
      .bar-grow { animation: barGrow 1s cubic-bezier(0.16, 1, 0.3, 1); }
      .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
      .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
      .scrollbar-thin::-webkit-scrollbar-thumb { background: #d6d3d1; border-radius: 999px; }
      .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #dc2626; }
      .noise-overlay {
        background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0);
        background-size: 18px 18px;
      }
      .persian-num { font-feature-settings: "ss01"; }
    `}</style>
  );
}

/* ================================================================
   🧭  D I F F I C U L T Y   B A R
   ================================================================ */
function DifficultyBar({ level }) {
  const labels = ["بسیار ساده", "ساده", "متوسط", "دشوار", "بسیار دشوار"];
  const colors = ["bg-emerald-500", "bg-lime-500", "bg-amber-500", "bg-orange-500", "bg-red-600"];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] font-black">
        <span className="text-stone-500">سختی مسیر</span>
        <span className="text-stone-800">{labels[level - 1]}</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full bar-grow ${i <= level ? colors[level - 1] : "bg-stone-200"}`}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   🏠  M A I N   C O M P O N E N T
   ================================================================ */
export default function AustriaComprehensiveGuide() {
  const [activeTab, setActiveTab] = useState<"immigration" | "lifestyle" | "culture" | "ed_health" | "tourism">("immigration");
  const [immigrationSearch, setImmigrationSearch] = useState<string>("");
  const [selectedVisa, setSelectedVisa] = useState<string>("rwr-card");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredVisas = useMemo(
    () =>
      VISAS_DATA.filter(
        (v) =>
          v.title.toLowerCase().includes(immigrationSearch.toLowerCase()) ||
          v.target.toLowerCase().includes(immigrationSearch.toLowerCase()) ||
          v.description.toLowerCase().includes(immigrationSearch.toLowerCase()) ||
          v.tags.some((t) => t.includes(immigrationSearch))
      ),
    [immigrationSearch]
  );

  const currentVisaDetail = VISAS_DATA.find((v) => v.id === selectedVisa) || VISAS_DATA[0];

  const TABS = [
    { id: "immigration", icon: "📜", label: "راه‌های مهاجرت و اقامت", sub: "Immigration & Visas" },
    { id: "lifestyle", icon: "💡", label: "سبک زندگی و قوانین ضروری", sub: "Lifestyle & Rules" },
    { id: "culture", icon: "🎭", label: "فرهنگ و آداب رفتار", sub: "Culture & Etiquette" },
    { id: "ed_health", icon: "🏥", label: "درمان و سیستم آموزشی", sub: "Health & Education" },
    { id: "tourism", icon: "🏔️", label: "گردشگری و جاذبه‌های آلپ", sub: "Tourism & Alps" },
  ];

  return (
    <article
      id="comprehensive-austria-guide"
      itemScope
      itemType="https://schema.org/Article"
      className="relative bg-white rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/40 overflow-hidden text-right font-sans max-w-7xl mx-auto"
      dir="rtl"
      lang="fa"
    >
      <GuideStyles />

      {/* ============ نوار پرچمی اتریش با انیمیشن ============ */}
      <div className="absolute top-0 left-0 w-full h-1.5 z-20 overflow-hidden">
        <div className="w-full h-full flag-stripe-anim bg-gradient-to-l from-red-700 via-white via-50% to-red-700" />
      </div>

      {/* ============ نویز بافت پس‌زمینه ============ */}
      <div className="absolute inset-0 noise-overlay opacity-40 pointer-events-none" />

      {/* ============ هدر اصلی با لوگو ============ */}
      <header className="relative z-10 px-6 md:px-9 pt-9 pb-7 border-b border-stone-100">
        {/* نوار بالای هدر */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <AustriaResidentLogo size={54} />

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-[10px] font-black text-emerald-800">منبع رسمی فدرال</span>
            </div>
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
              <span className="text-[10px] font-black text-stone-700 font-mono">2026 Edition</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black text-amber-800">راهنمای برتر</span>
            </div>
          </div>
        </div>

        {/* تیتر اصلی */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-gradient-to-l from-red-600 to-red-700 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm shadow-red-500/30">
              <Sparkles className="w-3 h-3" />
              دانشنامه جامع اتریش‌نشین
            </span>
            <span className="text-[10px] font-black text-stone-400 tracking-widest">ÖSTERREICH-LEXIKON 2026</span>
          </div>

          <h1
            itemProp="headline"
            className="text-xl md:text-2xl lg:text-[28px] font-black leading-[1.35] gradient-text-shimmer"
          >
            دایرةالمعارف جامع مهاجرت و زندگی در اتریش
          </h1>

          <p
            itemProp="description"
            className="text-[12px] md:text-[13px] text-stone-500 font-bold leading-relaxed max-w-2xl"
          >
            راهنمای بومی به زبان فارسی: شرح دقیق راه‌های مهاجرت، قوانین طلایی زیست‌محیطی، آداب بومی،
            سیستم درمانی ÖGK، آموزش دانشگاهی و گردشگری آلپ — همراه با تحلیل چالش‌های واقعی و خط قرمزهای
            متقاضیان ایرانی.
          </p>

          {/* آمار سریع */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 max-w-2xl">
            {[
              { num: "۵", label: "مسیر مهاجرتی", color: "text-red-600" },
              { num: "۲۴+", label: "قانون کلیدی", color: "text-amber-600" },
              { num: "۹", label: "ایالت فدرال", color: "text-emerald-600" },
              { num: "∞", label: "چشم‌انداز آلپ", color: "text-indigo-600" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-stone-50 to-white border border-stone-150 rounded-xl px-3 py-2.5 text-center card-hover-lift"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`text-lg font-black ${s.color}`}>{s.num}</div>
                <div className="text-[9.5px] font-extrabold text-stone-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ============ تب‌بار ============ */}
      <nav
        className="relative z-10 px-4 md:px-9 py-5 bg-gradient-to-b from-stone-50/50 to-white"
        aria-label="دسته‌بندی راهنمای اتریش"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-stone-100 border border-stone-200 rounded-2xl p-1.5">
          {TABS.map((tab, idx) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                aria-label={tab.label}
                className={`group relative py-3 px-2 rounded-xl text-[11px] font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  active
                    ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 scale-[1.02]"
                    : "text-stone-600 hover:text-stone-950 hover:bg-white/70"
                } ${idx === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <span className={`text-base transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
                  {tab.icon}
                </span>
                <span className="leading-tight text-center">{tab.label}</span>
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/60 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ============ محتوا ============ */}
      <div className="relative z-10 px-4 md:px-9 pb-9">

        {/* ============ تب ۱: مهاجرت ============ */}
        {activeTab === "immigration" && (
          <section className="space-y-8 animate-fade-in">
            {/* هدر جستجو */}
            <div className="bg-gradient-to-l from-rose-50 via-white to-rose-50 border border-rose-100 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-right">
                <h2 className="font-black text-rose-950 text-sm flex items-center justify-end md:justify-start gap-2">
                  <Award className="w-4 h-4 text-red-600" />
                  <span>مسیرهای قانونی و مستند ورود به اتریش</span>
                </h2>
                <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                  اداره خدمات بازار کار (AMS)، سفارت‌خانه‌ها و ادارات استانی اقامت (MA35) صلاحیت مهاجران را پایش می‌کنند.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-3.5" />
                <input
                  type="text"
                  placeholder="جستجوی ویزا، تخصص یا تگ..."
                  value={immigrationSearch}
                  onChange={(e) => setImmigrationSearch(e.target.value)}
                  className="w-full text-xs font-bold border border-stone-200 outline-none p-3 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 bg-white pr-10 text-right transition-all"
                  aria-label="جستجوی ویزا"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* لیست ویزاها */}
              <div className="lg:col-span-5 space-y-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-stone-400 font-black uppercase tracking-wide">
                    {filteredVisas.length} مسیر یافت شد
                  </span>
                  <span className="text-[10px] text-stone-400 font-black uppercase tracking-wide">
                    انواع ویزا
                  </span>
                </div>

                <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto scrollbar-thin pl-1">
                  {filteredVisas.map((visa, idx) => {
                    const isSelected = visa.id === selectedVisa;
                    return (
                      <button
                        key={visa.id}
                        onClick={() => setSelectedVisa(visa.id)}
                        aria-label={visa.title}
                        style={{ animationDelay: `${idx * 60}ms` }}
                        className={`group text-right p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden animate-fade-in ${
                          isSelected
                            ? "bg-gradient-to-l from-stone-900 to-stone-800 text-white border-stone-900 shadow-xl shadow-stone-900/20"
                            : "bg-white border-stone-150 text-stone-700 hover:border-red-300 hover:bg-red-50/30"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-700" />
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 text-right">
                            <h3 className="font-extrabold text-[12.5px] leading-tight">{visa.title}</h3>
                            <p className={`text-[10px] font-bold mt-1 ${isSelected ? "text-red-300" : "text-stone-400"}`}>
                              {visa.sub}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {visa.tags.map((t) => (
                                <span
                                  key={t}
                                  className={`text-[8.5px] font-black px-1.5 py-0.5 rounded ${
                                    isSelected
                                      ? "bg-white/15 text-red-200"
                                      : "bg-stone-100 text-stone-500"
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ChevronLeft
                            className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                              isSelected ? "text-red-400 rotate-180" : "text-stone-300 group-hover:-translate-x-0.5"
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                  {filteredVisas.length === 0 && (
                    <div className="text-center py-8 text-stone-400 text-xs font-bold bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                      موردی یافت نشد. عبارت دیگری را جستجو کنید.
                    </div>
                  )}
                </div>
              </div>

              {/* جزئیات ویزا */}
              <div
                key={currentVisaDetail.id}
                className="lg:col-span-7 bg-gradient-to-b from-stone-50/70 to-white border border-stone-200 rounded-3xl p-6 space-y-5 animate-fade-in"
              >
                <div className="border-b border-stone-150 pb-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <span className="text-[9.5px] bg-gradient-to-l from-red-600 to-red-700 text-white font-black px-2.5 py-1 rounded-md shadow-sm">
                      مسیر پیگیری قانونی اقامت
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-stone-400 font-mono">
                      <Clock className="w-3 h-3" />
                      <span>{currentVisaDetail.duration}</span>
                    </div>
                  </div>

                  <h2
                    itemProp="name"
                    className="font-black text-stone-900 text-base md:text-lg mt-3 flex items-center justify-end gap-2"
                  >
                    <span>{currentVisaDetail.title}</span>
                    <FileCheck className="w-5 h-5 text-red-600 shrink-0" />
                  </h2>

                  {currentVisaDetail.pointsRequired && (
                    <div className="mt-3 text-[11px] font-black text-rose-800 bg-gradient-to-l from-rose-50 to-white border border-rose-150 p-3 rounded-xl inline-flex items-center gap-2">
                      <Award className="w-3.5 h-3.5" />
                      <span>حد نصاب امتیاز مورد نیاز:</span>
                      <strong className="text-rose-900">{currentVisaDetail.pointsRequired}</strong>
                    </div>
                  )}

                  {/* نوارهای آماری */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <DifficultyBar level={currentVisaDetail.difficulty} />
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-black">
                        <span className="text-stone-500">نرخ موفقیت تقریبی</span>
                        <span className="text-stone-800">{currentVisaDetail.successRate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-l from-emerald-500 to-emerald-600 bar-grow"
                            style={{
                              width:
                                currentVisaDetail.successRate === "بالا"
                                  ? "80%"
                                  : currentVisaDetail.successRate.includes("متوسط") && currentVisaDetail.successRate.includes("پایین")
                                  ? "40%"
                                  : currentVisaDetail.successRate === "متوسط"
                                  ? "55%"
                                  : "65%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* واجدین شرایط */}
                <div className="space-y-2">
                  <h3 className="text-[11px] text-stone-400 font-black tracking-wide uppercase">واجدین شرایط و مخاطبین اصلی</h3>
                  <p className="text-[12px] text-stone-800 font-bold bg-white p-3.5 rounded-xl border border-stone-150 leading-relaxed">
                    {currentVisaDetail.target}
                  </p>
                </div>

                {/* توضیحات */}
                <div className="space-y-2">
                  <h3 className="text-[11px] text-stone-400 font-black tracking-wide uppercase">توضیحات و فرآیند کلی</h3>
                  <p className="text-[12px] text-stone-600 leading-relaxed font-bold bg-white p-4 rounded-xl border border-stone-150">
                    {currentVisaDetail.description}
                  </p>
                </div>

                {/* مدارک */}
                <div className="space-y-2">
                  <h3 className="text-[11px] text-stone-400 font-black tracking-wide uppercase">مهم‌ترین مدارک اساسی و شرایط لازم</h3>
                  <div className="space-y-2">
                    {currentVisaDetail.requirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2.5 bg-white p-3 rounded-xl border border-stone-150 items-start hover:border-emerald-300 transition-colors"
                        style={{ animationDelay: `${idx * 60}ms` }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-[11.5px] text-stone-650 leading-relaxed font-bold">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* چالش‌ها */}
                <div className="bg-gradient-to-l from-amber-50 to-white border border-amber-200 p-4 rounded-2xl space-y-2">
                  <h3 className="text-[12px] font-black text-amber-950 flex items-center justify-end gap-1.5">
                    <span>چالش‌های کلیدی و خط قرمزهای متقاضیان</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </h3>
                  <p className="text-[11.5px] text-stone-600 leading-relaxed font-bold">
                    {currentVisaDetail.challenges}
                  </p>
                </div>

                {/* پورتال رسمی */}
                <div className="border-t border-stone-150 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-[10.5px] text-stone-400 font-bold">
                    جهت آغاز ثبت رسمی این درخواست به پورتال اصلی مهاجرت فدرال مراجعه کنید:
                  </span>
                  <a
                    href={currentVisaDetail.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="url"
                    className="group bg-gradient-to-l from-stone-900 to-stone-800 hover:from-red-700 hover:to-red-800 text-white font-black px-4 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-stone-900/20 hover:shadow-red-700/30 transition-all text-[11px] cursor-pointer"
                  >
                    <span>ورود به درگاه رسمی مربوطه</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* بخش معادل‌سازی مدارک */}
            <div className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white p-6 md:p-7 rounded-3xl border border-stone-800">
              {/* افکت پس‌زمینه */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-red-600 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
              </div>

              <div className="relative space-y-5">
                <div className="flex items-center gap-3 justify-end border-b border-stone-800 pb-4">
                  <div className="text-right">
                    <h3 className="text-[11px] font-black text-red-400 tracking-wider">NOSTRIFIZIERUNG PROZESS</h3>
                    <h2 className="font-black text-white text-base md:text-lg mt-1">
                      ارزشیابی مدارک تحصیلی ایرانیان در اتریش
                    </h2>
                  </div>
                  <Building className="w-7 h-7 text-red-500 animate-float-slow" />
                </div>

                <p className="text-[12px] text-stone-300 leading-relaxed font-bold max-w-4xl">
                  برای کار در مشاغل قانون‌مند (پزشکان، پرستاران، آموزگاران و برخی رشته‌های مهندسی)، برابرسازی
                  مدرک تحصیلی ایران اجباری است. روند کار برای سایر رشته‌ها به صورت ارزشیابی عمومی جهت ارائه به
                  کارفرمایان خصوصی انجام می‌شود:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      n: "۱",
                      title: "ارزشیابی ENIC-NARIC",
                      desc: "مدارک ترجمه‌شده خود را در پورتال رسمی وزارت علوم اتریش (bmbwf) یا سازمان ENIC-NARIC بارگذاری کنید تا تاییدیه هم‌سطحی دانشگاهی دریافت نمایید.",
                    },
                    {
                      n: "۲",
                      title: "آزمون‌های تطبیقی (Ergänzungsprüfungen)",
                      desc: "برای رشته‌های درمانی، دانشگاه ذیربط پس از مقایسه چارت‌های درسی مشخص می‌سازد که آیا نیاز به گذراندن آزمون‌های تطبیقی بالینی و اخلاق دارویی به زبان آلمانی دارید.",
                    },
                    {
                      n: "۳",
                      title: "تایید گواهی اشتغال (Berufsanerkennung)",
                      desc: "اتاق بازرگانی اتریش (WKO) گواهی‌های سابقه کار صادرشده از تامین اجتماعی ایران را جهت تراز شغلی به عنوان سابقه مستدل کاری شما مانیتور و تایید می‌کند.",
                    },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className="relative bg-stone-800/60 backdrop-blur-sm p-5 border border-stone-700/60 rounded-2xl space-y-2 card-hover-lift"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-red-600/40">
                        {step.n}
                      </div>
                      <h4 className="text-white text-[12.5px] font-black pt-2">{step.title}</h4>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-bold">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============ تب ۲: سبک زندگی ============ */}
        {activeTab === "lifestyle" && (
          <section className="space-y-7 animate-fade-in">
            <div className="bg-gradient-to-l from-amber-50 via-white to-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-3 items-start">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-float-slow" />
              <div className="space-y-1">
                <h2 className="text-sm font-black text-amber-950">کلید سازگاری با سیستم شهروندی اتریش</h2>
                <p className="text-[11.5px] text-stone-600 leading-relaxed font-bold">
                  قوانین اجتماعی در اتریش با قاطعیت اجرا می‌شوند. درک مسئولیت‌های شهروندی از جمله تفکیک زباله،
                  ساعات سکوت آپارتمان و بیمه‌نامه‌های اجباری، تجربه زندگی شما را به دور از تذکرها و جریمه‌های
                  اداری سنگین تضمین می‌کند.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: "🤫",
                  badge: "مقررات آپارتمانی فدرال",
                  badgeColor: "bg-amber-100 text-amber-800",
                  title: "ساعات آرامش و تعطیلی یکشنبه (Ruhezeit)",
                  desc: "ساعت آرامش خانگی از ساعت ۲۲:۰۰ شب الی ۶:۰۰ صبح است. علاوه بر این، کل روز یکشنبه به عنوان Sonntagsruhe به استراحت عمیق اختصاص دارد. هر فعالیت پر سر و صدا در این اوقات پیگرد دارد.",
                  tip: "روزهای یکشنبه تمام فروشگاه‌های Spar و Billa (به استثنای فرودگاه و ایستگاه‌های مرکزی) تعطیل هستند.",
                  accent: "hover:border-amber-400",
                },
                {
                  icon: "♻️",
                  badge: "حفاظت از محیط زیست",
                  badgeColor: "bg-red-50 text-red-800",
                  title: "تفکیک وسواس‌گونه زباله‌ها (Mülltrennung)",
                  desc: "کاغذ (Altpapier)، پلاستیک و فلز (Gelber Sack)، پسماند تر ارگانیک (Biomüll)، شیشه بی‌رنگ (Weißglas) و رنگی (Buntglas) باید دقیقاً تفکیک شوند.",
                  tip: "بطری‌های پلاستیکی و قوطی‌ها مشمول بیعانه بازیافت (Pfand) هستند و باید به دستگاه‌های برگشت عودت شوند.",
                  accent: "hover:border-red-400",
                },
                {
                  icon: "🚗",
                  badge: "قوانین رانندگی",
                  badgeColor: "bg-blue-50 text-blue-800",
                  title: "قانون تایر زمستانی (Winterreifenpflicht)",
                  desc: "از ۱ نوامبر الی ۱۵ آوریل استفاده از تایرهای زمستانه در شرایط جوی زمستانی الزامی است. عمق آج باید حداقل ۴ میلی‌متر باشد. جریمه تا ۱۰,۰۰۰ یورو در صورت حادثه.",
                  tip: "رانندگی در بزرگراه‌های اتریش نیازمند خرید برچسب عوارض الکترونیکی Vignette است.",
                  accent: "hover:border-blue-400",
                },
                {
                  icon: "📺",
                  badge: "امور مالی خانگی",
                  badgeColor: "bg-stone-150 text-stone-800",
                  title: "عوارض صدا و سیما (ORF-Beitrag)",
                  desc: "از ۲۰۲۴ سیستم قدیمی ویزیت فیزیکی برچیده شد و جایش را به عوارض ثابت ماهیانه اجباری برای تمامی خانوارها داد. صرف نظر از داشتن گیرنده، هر آدرس مسکونی ملزم به پرداخت است.",
                  tip: "عدم توجه به نامه‌های تسویه عوارض، پرونده شما را به سازمان اجرای احکام مالیاتی منتقل می‌سازد.",
                  accent: "hover:border-stone-400",
                },
                {
                  icon: "🐕",
                  badge: "حیوانات خانگی",
                  badgeColor: "bg-red-50 text-red-800",
                  title: "مالیات و قوانین سگ‌ها (Hundeabgabe)",
                  desc: "نگهداری سگ در شهرهای اتریش مشمول قوانین مدون شهرداری است. ثبت در شهرداری، پرداخت مالیات سالانه، بیمه مسئولیت مدنی (Hundehaftpflicht) و استفاده از قلاده و پوزه‌بند در وسایل نقلیه عمومی اجباری است.",
                  tip: "عدم پاکسازی مدفوع سگ در معابر مشمول جریمه نقدی فوری در محل است.",
                  accent: "hover:border-red-400",
                },
                {
                  icon: "🎫",
                  badge: "حمل‌ونقل عمومی",
                  badgeColor: "bg-indigo-50 text-indigo-800",
                  title: "بلیت اقلیم Klimaticket و سالانه وین",
                  desc: "بلیت سالانه Wiener Linien با قیمت نمادین ۳۶۵ یورو در سال (روزی ۱ یورو) از بهترین سرمایه‌گذاری‌هاست. برای سراسر اتریش، Klimaticket Ö با ارزش روزی ۳ یورو اجازه استفاده نامحدود می‌دهد.",
                  tip: "کودکان زیر ۶ سال در سیستم حمل‌ونقل اتریش کاملاً رایگان جابه‌جا می‌شوند.",
                  accent: "hover:border-indigo-400",
                },
              ].map((rule, idx) => (
                <article
                  key={idx}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className={`animate-fade-in bg-white border border-stone-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between card-hover-lift ${rule.accent}`}
                >
                  <div className="space-y-2">
                    <span className="text-2xl block">{rule.icon}</span>
                    <span className={`text-[9.5px] ${rule.badgeColor} px-2.5 py-0.5 rounded-md font-black inline-block`}>
                      {rule.badge}
                    </span>
                    <h3 className="font-black text-stone-850 text-[13px] mt-1 leading-snug">{rule.title}</h3>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-bold">{rule.desc}</p>
                  </div>
                  <div className="bg-gradient-to-l from-stone-50 to-white p-3 rounded-xl border border-stone-150 text-[10px] text-stone-500 font-extrabold leading-relaxed">
                    💡 {rule.tip}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ============ تب ۳: فرهنگ ============ */}
        {activeTab === "culture" && (
          <section className="space-y-7 animate-fade-in">
            <div className="bg-gradient-to-l from-rose-50 via-white to-rose-50 border border-rose-100 rounded-2xl p-5 flex gap-3 items-start">
              <Palette className="w-5 h-5 text-red-600 shrink-0 mt-0.5 animate-float-slow" />
              <div className="space-y-1">
                <h2 className="text-sm font-black text-rose-955">هنر زندگی به سبک اتریشی (Gemütlichkeit)</h2>
                <p className="text-[11.5px] text-stone-600 leading-relaxed font-bold">
                  مفهوم بومی Gemütlichkeit به معنی ایجاد آرامش دنج، لذت از لحظه و احترام متقابل به حریم شخصی
                  دیگران است. با شناخت اصول گفتمان و تعارفات بومی، به سرعت جایگاه ویژه‌ای در اجتماعات پیدا خواهید کرد.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: "☕",
                  badge: "میراث یونسکو",
                  badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                  title: "فرهنگ نفیس کافه‌نشینی وین (Kaffeehauskultur)",
                  desc: "در کافه‌های ریشه‌دار وین، هرگز برای تخلیه سریع میز تحت فشار قرار نمی‌گیرید. پس از سفارش Wiener Melange، خدمتکار سنتی (Herr Ober) یک لیوان آب خنک به همراه قاشق خوابانیده روی لیوان می‌آورد.",
                  tip: "آداب انعام (Trinkgeld): رند کردن صورت‌حساب به بالا (۵ تا ۱۰ درصد) نشانه قدردانی است.",
                },
                {
                  icon: "⌚",
                  badge: "احترام متقابل",
                  badgeColor: "bg-stone-150 text-stone-800 border-stone-200",
                  title: "وقت‌شناسی پولادین (Pünktlichkeit)",
                  desc: "سر وقت حاضر شدن در ملاقات‌ها، کلاس‌ها و نوبت‌های اداری، بالاترین نشانه تعهد است. حتی ۵ دقیقه تاخیر نوعی بی‌احترامی آشکار پنداشته می‌شود.",
                  tip: "قرارهای سرزده، حتی بازدید بستگان صمیمی، رایج نیست و همیشه باید با هماهنگی پیشین باشد.",
                },
                {
                  icon: "🤝",
                  badge: "آداب کلامی",
                  badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                  title: "احوالپرسی بومی و ارتباط چشمی محکم",
                  desc: "سلام رسمی Grüß Gott در ادارات و شهرهای آلپی کاربرد دارد. دوستان جوان‌تر از Servus استفاده می‌کنند. دست دادن محکم همراه با نگاه مستقیم به چشم‌ها نشانگر صمیمیت است. در نوشیدن، واژه Prost استفاده می‌شود.",
                  tip: "حتماً از فرم رسمی Sie به جای Du در مکاتبه با غریبه‌ها، پزشک و روسای اداری استفاده فرمایید.",
                },
                {
                  icon: "💃",
                  badge: "میراث اشرافی",
                  badgeColor: "bg-pink-50 text-pink-800 border-pink-200",
                  title: "فصل پرشکوه مهمانی و رقص وین (Ballsaison)",
                  desc: "سالانه بیش از ۴۰۰ رویداد مجلل رقص برگزار می‌شود که والاترین آنها رقص اپرای وین (Opernball) در سالن دولتی اپرا است. هر صنفی شب مخصوص خود را با کدهای پوشش سنتی و باشکوه نظیر Frack برگذار می‌کند.",
                  tip: "والس معروف وینی اثر یوهان اشتراوس بخش جدانشدنی از افتتاحیه این مجالس اشرافی است.",
                },
                {
                  icon: "🍇",
                  badge: "طعم محلی",
                  badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
                  title: "کافه‌های سنتی باغ انگور (Heuriger)",
                  desc: "یک Heuriger، رستوران سنتی دنجی در دامنه تاکستان‌های وین (مانند Grinzing) است که فقط نوشیدنی‌های خانگی سال جاری و بوفه سلف‌سرویس سنتی ارائه می‌دهد. فضای دنج با موسیقی زنده Zither، روح اتریش را متبلور می‌کند.",
                  tip: "این باغ‌ها را با آویزان کردن شاخه برگ صنوبر سوزنی روی درب تشخیص می‌دهند.",
                },
                {
                  icon: "💶",
                  badge: "حریم مالی",
                  badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
                  title: "رغبت شدید به مبادلات نقدی (Bargeld)",
                  desc: "برخلاف کشورهای همسایه، مردمان اتریش علاقه قلبی به استفاده از پول کاغذی دارند. در بسیاری از رستوران‌های بومی و فروشگاه‌های خرد تابلوهای Nur Bargeld (فقط نقدی) به چشم می‌خورد.",
                  tip: "همواره در جیب خود اسکنه‌های ریز ۱۰ و ۲۰ یورویی داشته باشید.",
                },
              ].map((c, idx) => (
                <article
                  key={idx}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className="animate-fade-in bg-white border border-stone-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between card-hover-lift hover:border-rose-300"
                >
                  <div className="space-y-2">
                    <span className="text-2xl block">{c.icon}</span>
                    <span className={`text-[9px] ${c.badgeColor} border px-2 py-0.5 rounded font-black inline-block`}>
                      {c.badge}
                    </span>
                    <h3 className="font-black text-stone-850 text-[13px] mt-1 leading-snug">{c.title}</h3>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-bold">{c.desc}</p>
                  </div>
                  <div className="bg-gradient-to-l from-stone-50 to-white p-2.5 rounded-xl border border-stone-150 text-[10px] text-stone-500 font-extrabold leading-relaxed">
                    💡 {c.tip}
                  </div>
                </article>
              ))}
            </div>

            {/* نقل قول */}
            <div className="relative bg-gradient-to-l from-stone-900 to-stone-950 text-white p-6 rounded-3xl overflow-hidden">
              <Quote className="absolute -top-3 -left-3 w-20 h-20 text-red-500/20" />
              <div className="relative space-y-2 text-right">
                <p className="text-[12.5px] md:text-sm font-bold leading-relaxed text-stone-200">
                  «اتریشی‌ها با واژه <span className="text-red-400 font-black">Gemütlichkeit</span> فلسفه‌ای از آرامش، نظم و
                  احترام به دیگری را می‌سازند. برای مهاجر موفق، این نه یک رفتار تشریفاتی، بلکه یک کلید ورود به قلب اجتماع است.»
                </p>
                <div className="text-[10px] text-stone-400 font-black">— راهنمای فرهنگی اتریش‌نشین</div>
              </div>
            </div>
          </section>
        )}

        {/* ============ تب ۴: درمان و آموزش ============ */}
        {activeTab === "ed_health" && (
          <section className="space-y-7 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* درمان */}
              <article className="bg-gradient-to-b from-stone-50/70 to-white border border-stone-200 hover:border-red-200 transition-colors p-6 rounded-3xl space-y-4">
                <header className="flex items-center gap-3 justify-end border-b border-stone-150 pb-4">
                  <div className="text-right flex-1">
                    <h2 className="font-black text-stone-850 text-base flex items-center justify-end gap-2">
                      <span>سیستم بهداشت و بیمه درمانی اتریش</span>
                      <HeartPlus className="w-5 h-5 text-red-600" />
                    </h2>
                    <p className="text-[10px] text-stone-400 font-bold mt-1">
                      صندوق بیمه تامین اجتماعی فدرال ÖGK و الگوهای درمانی
                    </p>
                  </div>
                </header>

                <div className="space-y-3.5 text-[11.5px] font-bold text-stone-650 leading-relaxed">
                  <p className="text-stone-800">
                    اتریش یکی از پایدارترین و در دسترس‌ترین سیستم‌های درمانی اروپا را دارد؛ هر شهروند به همراه
                    بستگان درجه یک تحت یک نظام واحد پایش قرار دارد:
                  </p>

                  {[
                    {
                      title: "کارت درمانی هوشمند (E-Card)",
                      desc: "هر شخص بیمه‌شده یک کارت سبز با تراشه دریافت می‌کند که در زمان مراجعه ارائه می‌شود. نسخه پزشک به صورت الکترونیکی (E-Rezept) ثبت شده و با ارائه آن به داروخانه (Apotheke) تحویل می‌گیرید.",
                    },
                    {
                      title: "پزشک عمومی (Kassenarzt) در برابر Wahlarzt",
                      desc: "پزشک کانترکت: خدمات رایگان با کارت ÖGK. پزشک خصوصی: هزینه را نقد پرداخت کرده، فیش را در اکانت ÖGK آنلاین اسکن کرده و تا ۸۰٪ برگشت دریافت می‌کنید.",
                    },
                    {
                      title: "پزشک خانواده (Hausarzt) و ارجاع متخصص",
                      desc: "درمان را با پزشک عمومی محله آغاز می‌کنید. در صورت لزوم، برگه ارجاع (Überweisung) جهت ویزیت متخصص (Facharzt) یا رادیولوژی صادر می‌شود.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 border border-stone-150 rounded-xl space-y-1 hover:border-red-200 transition-colors"
                    >
                      <h3 className="font-black text-stone-900 text-[12px]">{item.title}</h3>
                      <p className="text-[11px] text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}

                  {/* شماره‌های اضطراری */}
                  <div className="bg-gradient-to-l from-red-50 to-white border border-red-200 rounded-2xl p-4 space-y-2.5">
                    <h3 className="text-[12px] font-black text-red-950 flex items-center justify-end gap-1.5">
                      <span>شماره‌های حیاتی و فرآیندهای اضطراری فدرال</span>
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-[10.5px] font-bold">
                      {[
                        { num: "۱۴۴", label: "اورژانس و آمبولانس", color: "text-red-600" },
                        { num: "۱۴۱", label: "پزشک کشیک شبانه", color: "text-amber-600" },
                        { num: "۱۳۳", label: "پلیس فدرال اتریش", color: "text-blue-700" },
                        { num: "۱۲۲", label: "آتش‌نشانی (Feuerwehr)", color: "text-orange-600" },
                      ].map((n, i) => (
                        <div
                          key={i}
                          className="bg-white p-2.5 rounded-lg border border-red-100 flex justify-between items-center hover:bg-red-50 transition-colors"
                        >
                          <span className={`font-mono font-black ${n.color}`}>{n.num}</span>
                          <span className="text-stone-700">{n.label}</span>
                        </div>
                      ))}
                      <div className="col-span-2 bg-white p-2.5 rounded-lg border border-red-100 flex justify-between items-center">
                        <span className="font-mono font-black text-indigo-700">۱۴۵۵۰</span>
                        <span className="text-stone-700">اطلاع‌رسانی شبانه‌روزی داروخانه‌های کشیک</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* آموزش */}
              <article className="bg-gradient-to-b from-stone-50/70 to-white border border-stone-200 hover:border-red-200 transition-colors p-6 rounded-3xl space-y-4">
                <header className="flex items-center gap-3 justify-end border-b border-stone-150 pb-4">
                  <div className="text-right flex-1">
                    <h2 className="font-black text-stone-850 text-base flex items-center justify-end gap-2">
                      <span>سیستم آموزشی و دانشگاه‌های اتریش</span>
                      <GraduationCap className="w-5 h-5 text-red-600" />
                    </h2>
                    <p className="text-[10px] text-stone-400 font-bold mt-1">
                      آموزش اجباری و چارت Matura اتریش
                    </p>
                  </div>
                </header>

                <div className="space-y-3.5 text-[11.5px] font-bold text-stone-650 leading-relaxed">
                  <p className="text-stone-800">
                    آموزش در اتریش تا پایان دوره نهم اجباری است و یکی از کاربردی‌ترین سیستم‌های پرورش نیروی کار
                    ماهر دنیا محسوب می‌شود:
                  </p>

                  {[
                    {
                      title: "دبستان و دوراهی غربال‌گری سرنوشت‌ساز",
                      desc: "کودکان از ۶ سالگی وارد Volksschule ۴ ساله می‌شوند. سپس مسیر یا به Gymnasium (نظری) یا Mittelschule (فنی کارگاهی) منشعب می‌شود.",
                    },
                    {
                      title: "کالج‌های عالی فنی (HTL و HAK)",
                      desc: "مؤسساتی بسیار خوش‌نام با دوره ۵ ساله و دیپلم معتبر Matura. فارغ‌التحصیلان HTL بلافاصله تراز شغلی مهندسی فدرال را کسب می‌کنند.",
                    },
                    {
                      title: "دانشگاه و علوم کاربردی (Fachhochschule)",
                      desc: "دانشگاه‌های دولتی با شهریه ترمی حدود ۷۲۶ یورو برای دانشجویان ایرانی. FH ها پروژه‌محور و صنعت‌محور با تمرکز بر بازار کار هستند.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-3.5 border border-stone-150 rounded-xl space-y-1 hover:border-red-200 transition-colors"
                    >
                      <h3 className="font-black text-stone-900 text-[12px]">{item.title}</h3>
                      <p className="text-[11px] text-stone-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}

                  <div className="bg-gradient-to-l from-indigo-50 to-white border border-indigo-150 rounded-2xl p-4 text-[11px] text-stone-600 leading-relaxed">
                    🎓 <strong className="text-indigo-950">ثبت نام مهدکودک (Kindergarten-Anmeldung):</strong>{" "}
                    مهدکودک‌ها در بسیاری از ایالت‌ها (مانند وین) با بلیت سوبسید شهری تقریباً رایگان ارائه می‌شوند.
                    جهت تخصیص سهمیه دولتی، مدارک را در ماه نوامبر یا دسامبر سال قبل تسلیم نمایید.
                  </div>
                </div>
              </article>

            </div>
          </section>
        )}

        {/* ============ تب ۵: گردشگری ============ */}
        {activeTab === "tourism" && (
          <section className="space-y-7 animate-fade-in">
            <div className="bg-gradient-to-l from-emerald-50 via-white to-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse-slow" />
              <div className="space-y-1">
                <h2 className="text-sm font-black text-emerald-950">طبیعت فریبنده و میراث تاریخی سرزمین آلپ</h2>
                <p className="text-[11.5px] text-stone-600 leading-relaxed font-bold">
                  اتریش تلاقی‌گاه شکوهمند موسیقی کلاسیک دنیا و مناظر طبیعی باورنکردنی دریاچه‌های نیلگون و
                  قله‌های برفی است.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  img: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&auto=format&fit=crop&q=60",
                  region: "وین (Wien)",
                  title: "کاخ باشکوه شون‌برون",
                  desc: "کاخ تابستانی پادشاهان هابسبورگ با ۱۴۴۱ اتاق مجلل. گشت‌وگذار در باغ‌های مجسمه‌کاری شده تا تپه گرولیت و قدیمی‌ترین باغ‌وحش جهان روح‌افزا است.",
                  tip: "پیاده‌روی در محوطه بیرونی باغ بزرگ و شاهانه رایگان است.",
                },
                {
                  img: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=600&auto=format&fit=crop&q=60",
                  region: "سالزکامرگوت",
                  title: "روستای کارت‌پستالی هالشتات",
                  desc: "دریاچه نیلگون هالشتات در میان قله‌های مه‌آلود آلپ. این دهکده تاریخی میزبان قدیمی‌ترین معدن سنگ نمک جهان با ۷۰۰۰ سال قدمت باستانی است.",
                  tip: "ساده‌ترین روش سفر با قطار ÖBB و سپس کشتی تفریحی از دریاچه است.",
                },
                {
                  img: "https://images.unsplash.com/photo-1589146142721-f09ed79e6024?w=600&auto=format&fit=crop&q=60",
                  region: "کارینتیا",
                  title: "شاهراه رویایی گروسگلوکنر",
                  desc: "جاده‌ای کوهستانی به طول ۴۸ کیلومتر با ۳۶ پیچ و خم که چشم‌انداز بلندترین قله اتریش به ارتفاع ۳,۷۹۸ متر و یخچال پاسترتسه را می‌گشاید.",
                  tip: "این شاهراه از اوایل نوامبر تا اواخر آوریل کاملاً مسدود می‌گردد.",
                },
                {
                  img: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=600&auto=format&fit=crop&q=60",
                  region: "زالتسبورگ",
                  title: "شهر موسیقی زادگاه موتزارت",
                  desc: "شهری با کلاهک باروک مجلل در کنار رودخانه زالساخ. خانه تاریخی موتزارت و باغ‌های موزیکال کاخ میرابل (محل فیلم‌برداری اشک‌ها و لبخندها) نماد این شهر است.",
                  tip: "شکلات‌های بومی موتزارت‌کوگل اصلی‌ترین سوغات شهر زالتسبورگ هستند.",
                },
                {
                  img: "https://images.unsplash.com/photo-1627664819818-e147d6221422?w=600&auto=format&fit=crop&q=60",
                  region: "اتریش سفلی",
                  title: "دره تاریخی واخائو",
                  desc: "دره‌ای در حاشیه پیچ‌وخم رود دانوب با باغ‌های زردآلو و قلعه‌های باستانی. صومعه زردرنگ ملک بر فراز صخره، شاهکاری از هنر باروک است.",
                  tip: "اجاره دوچرخه و رکاب‌زنی در حاشیه دانوب از بهترین تفریحات تابستانی است.",
                },
                {
                  img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60",
                  region: "تیرول",
                  title: "اسکی و پیاده‌روی آلپی",
                  desc: "سرزمین کلوپ‌های اسکی پیشرفته جهان مانند سنت آنتون و کیتسبوهل. پیاده‌روی در مسیرهای علامت‌گذاری‌شده (Bergwandern) اولویت اصلی در بهار و تابستان است.",
                  tip: "همواره در مسیرهای پاک‌کوب رسمی بمانید و به علائم هشدار گاوهای آلپی توجه کنید.",
                },
              ].map((attr, idx) => (
                <article
                  key={idx}
                  style={{ animationDelay: `${idx * 70}ms` }}
                  className="animate-fade-in bg-white border border-stone-200 rounded-2xl overflow-hidden card-hover-lift hover:border-emerald-400 group"
                >
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={attr.img}
                      alt={attr.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-sm text-white font-black text-[9px] px-2.5 py-1 rounded-md">
                      {attr.region}
                    </span>
                    <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Mountain className="w-3.5 h-3.5 text-emerald-700" />
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-black text-stone-900 text-[13px] leading-snug">{attr.title}</h3>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-bold">{attr.desc}</p>
                    <div className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 p-2.5 border border-emerald-100 rounded-lg leading-relaxed">
                      💡 {attr.tip}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ترفندهای سفر ارزان */}
            <div className="bg-gradient-to-l from-emerald-50 to-white border border-emerald-150 p-5 md:p-6 rounded-3xl space-y-4">
              <h3 className="font-black text-emerald-950 text-sm flex items-center justify-end gap-2">
                <span>رازهای سفرهای ارزان‌قیمت ریلی اتریش (ÖBB Savings)</span>
                <Train className="w-5 h-5 text-emerald-600" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 border border-emerald-100 rounded-xl space-y-1.5 hover:border-emerald-300 transition-colors">
                  <h4 className="font-black text-stone-900 text-[12px]">🎟️ فیش‌های زودرس (Sparschiene)</h4>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                    بلیت‌های معمولی بین‌شهری در گیشه بسیار گران هستند. راه‌آهن ÖBB از ماه‌ها قبل آفر
                    Sparschiene با تخفیف تا ۸۰ درصد فعال می‌کند که غیرقابل بازگشت اما بسیار مقتصدانه است.
                  </p>
                </div>
                <div className="bg-white p-4 border border-emerald-100 rounded-xl space-y-1.5 hover:border-emerald-300 transition-colors">
                  <h4 className="font-black text-stone-900 text-[12px]">💳 کارت تخفیف نیمی (Vorteilscard)</h4>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                    خرید کارت سالانه Vorteilscard (جوانان زیر ۲۶ سال: ۱۹ یورو، بزرگسالان: ۶۶ یورو) تخفیف ۵۰
                    درصدی روی تمام بلیت‌های داخلی اعمال می‌کند و طی ۲ سفر اول سر به سر می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* ============ فوتر ============ */}
      <footer className="relative z-10 border-t border-stone-100 bg-gradient-to-l from-stone-50 to-white px-6 md:px-9 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <AustriaResidentLogo size={42} />
          <div className="text-center md:text-right space-y-1">
            <div className="text-[10px] font-black text-stone-500">
              © 2026 اتریش‌نشین — تمامی حقوق محفوظ است
            </div>
            <div className="text-[9.5px] font-bold text-stone-400">
              اطلاعات این راهنما بر مبنای آخرین قوانین فدرال اتریش تهیه شده و صرفاً جنبه اطلاع‌رسانی دارد.
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[Globe, ShieldCheck, BadgeCheck].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-red-50 border border-stone-200 hover:border-red-200 flex items-center justify-center transition-all cursor-pointer group"
              >
                <Icon className="w-4 h-4 text-stone-500 group-hover:text-red-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* ============ نوار پرچمی پایین ============ */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 overflow-hidden">
        <div className="w-full h-full flag-stripe-anim bg-gradient-to-l from-red-700 via-white via-50% to-red-700" />
      </div>
    </article>
  );
}