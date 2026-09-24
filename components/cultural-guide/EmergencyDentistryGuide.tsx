import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope, Phone, AlertCircle, Clock, MapPin, Building2, Heart,
  ShieldCheck, Sparkles, CheckCircle, ChevronDown, ChevronLeft, Info,
  Users, Star, TrendingUp, Award, Zap, Globe, Rocket, Handshake,
  Search, X, Filter, LayoutGrid, PhoneCall, Ambulance, Siren, Cross,
  Activity, HeartPulse, Syringe, Pill, Bandage, AlertTriangle, Target,
  BookOpen, FileText, Wallet, Euro, CreditCard, Calendar, Navigation,
  Smile, Eye, Baby, UserCheck, BadgeCheck, Timer, Sun, Moon, Hospital,
  MessageCircle, Send, ChevronRight, Copy, Check, Quote, Landmark,
  Umbrella, Snowflake, Plane, Coffee, GraduationCap, Briefcase
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&q=80";
const CLINIC_IMAGE = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80";
const DENTAL_IMG = "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80";

// ==========================================
// EMERGENCY HOTLINES
// ==========================================
const EMERGENCY_HOTLINES = [
  {
    id: "144",
    number: "۱۴۴",
    display: "144",
    title: "اورژانس عمومی اتریش",
    subtitle: "Rettung",
    description: "خط اورژانس پزشکی برای حوادث جدی و تهدیدکننده زندگی",
    available: "۲۴/۷ - شبانه‌روزی",
    icon: Ambulance,
    gradient: "from-rose-500 to-red-600",
    urgency: "critical",
  },
  {
    id: "141",
    number: "۱۴۱",
    display: "141",
    title: "پزشک کشیک",
    subtitle: "Ärztefunkdienst",
    description: "خدمات پزشک کشیک در ساعات تعطیل و شب‌ها",
    available: "شب‌ها و تعطیلات",
    icon: Stethoscope,
    gradient: "from-[#c8102e] to-[#970d22]",
    urgency: "high",
  },
  {
    id: "1450",
    number: "۱۴۵۰",
    display: "1450",
    title: "مشاوره سلامت ۲۴ ساعته",
    subtitle: "Gesundheitshotline",
    description: "مشاوره پزشکی تلفنی رایگان برای راهنمایی سریع",
    available: "۲۴/۷ - شبانه‌روزی",
    icon: PhoneCall,
    gradient: "from-sky-500 to-blue-600",
    urgency: "medium",
  },
  {
    id: "dental",
    number: "۰۱ ۵۱۲ ۲۰۷۶",
    display: "01 512 20 76",
    title: "دندانپزشک کشیک وین",
    subtitle: "Zahndienst Wien",
    description: "شماره دائم دندانپزشکی کشیک شهر وین",
    available: "شب‌ها، آخر هفته و تعطیلات",
    icon: Smile,
    gradient: "from-amber-500 to-orange-600",
    urgency: "high",
  },
];

// ==========================================
// EMERGENCY TYPES
// ==========================================
const EMERGENCY_TYPES = [
  {
    id: "pain",
    title: "درد شدید دندان",
    subtitle: "Zahnschmerzen",
    description: "درد مداوم و شدید دندان، لثه یا فک که تسکین نمی‌یابد",
    priority: "high",
    icon: AlertCircle,
    gradient: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
    waitTime: "فوری - زیر ۲ ساعت",
    actions: ["تماس با ۱۴۱", "مصرف مسکن (Ibuprofen)", "کمپرس سرد"],
  },
  {
    id: "trauma",
    title: "ضربه و شکستگی دندان",
    subtitle: "Zahntrauma",
    description: "شکستن، درآمدن یا آسیب فیزیکی به دندان در اثر ضربه یا زمین خوردن",
    priority: "critical",
    icon: Bandage,
    gradient: "from-[#c8102e] to-[#970d22]",
    bg: "bg-red-50",
    text: "text-red-700",
    waitTime: "بسیار فوری - زیر ۳۰ دقیقه",
    actions: ["حفظ دندان در شیر", "مراجعه فوری", "عدم دست زدن به ریشه"],
  },
  {
    id: "bleeding",
    title: "خونریزی شدید لثه",
    subtitle: "Blutung",
    description: "خونریزی مداوم پس از کشیدن دندان یا در اثر جراحت",
    priority: "high",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
    waitTime: "فوری - زیر ۱ ساعت",
    actions: ["کمپرس گاز استریل", "فشار ۱۰ دقیقه", "عدم مصرف نوشیدنی گرم"],
  },
  {
    id: "swelling",
    title: "تورم و آبسه",
    subtitle: "Abszess",
    description: "تورم صورت، تب و عفونت که نشانه آبسه دندانی است",
    priority: "critical",
    icon: Syringe,
    gradient: "from-orange-500 to-red-600",
    bg: "bg-orange-50",
    text: "text-orange-700",
    waitTime: "بسیار فوری - زیر ۱ ساعت",
    actions: ["مراجعه به اورژانس", "کمپرس سرد", "عدم دستکاری تورم"],
  },
  {
    id: "lost",
    title: "افتادن دندان دائمی",
    subtitle: "Zahnverlust",
    description: "کنده شدن کامل دندان در اثر ضربه ورزشی یا حادثه",
    priority: "critical",
    icon: AlertTriangle,
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-700",
    waitTime: "بسیار فوری - زیر ۳۰ دقیقه",
    actions: ["دندان را از تاج بگیرید", "در شیر یا سرم نمکی", "مراجعه فوری"],
  },
  {
    id: "broken",
    title: "شکستن تاج یا روکش",
    subtitle: "Krone abgebrochen",
    description: "شکستن روکش، پرکردگی یا تاج دندان دائمی",
    priority: "medium",
    icon: Cross,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    waitTime: "ظرف ۲۴ ساعت",
    actions: ["حفظ قطعات شکسته", "پرهیز از خوردن سمت آسیب‌دیده", "تماس با دندانپزشک"],
  },
];

// ==========================================
// VIENNA DENTAL CLINICS
// ==========================================
const VIENNA_CLINICS = [
  {
    id: "akh",
    name: "بیمارستان عمومی وین (AKH)",
    englishName: "Universitätsklinik für Zahn-, Mund- und Kieferheilkunde",
    city: "Wien",
    district: "منطقه ۹",
    address: "Währinger Gürtel 18-20, 1090 Wien",
    phone: "+43 1 40400 4252",
    hours: "اورژانس ۲۴ ساعته",
    services: ["اورژانس شبانه‌روزی", "جراحی فک و صورت", "دندانپزشکی تخصصی"],
    languages: ["آلمانی", "انگلیسی"],
    isEmergency247: true,
    gradient: "from-[#c8102e] to-[#970d22]",
    badge: "بزرگترین مرکز",
    badgeIcon: Hospital,
  },
  {
    id: "dental-wien",
    name: "مرکز دندانپزشکی اورژانس وین",
    englishName: "Zahngesundheitszentrum Wien",
    city: "Wien",
    district: "منطقه ۴",
    address: "Favoritenstraße 8, 1040 Wien",
    phone: "+43 1 512 20 76",
    hours: "شبانه‌روزی و تعطیلات",
    services: ["اورژانس دندانی", "کشیدن دندان", "ترمیم اضطراری"],
    languages: ["آلمانی", "انگلیسی"],
    isEmergency247: true,
    gradient: "from-sky-500 to-blue-600",
    badge: "تخصصی دندانی",
    badgeIcon: Smile,
  },
  {
    id: "barmherzige",
    name: "بیمارستان برادران مهربان",
    englishName: "Barmherzige Brüder Wien",
    city: "Wien",
    district: "منطقه ۲",
    address: "Große Mohrengasse 9, 1020 Wien",
    phone: "+43 1 211 21 0",
    hours: "اورژانس ۲۴ ساعته",
    services: ["اورژانس عمومی", "دندانپزشکی همکار", "خدمات درمانی"],
    languages: ["آلمانی", "انگلیسی"],
    isEmergency247: true,
    gradient: "from-emerald-500 to-teal-600",
    badge: "مرکز معتبر",
    badgeIcon: BadgeCheck,
  },
  {
    id: "south",
    name: "کلینیک دندانپزشکی جنوب وین",
    englishName: "Zahnklinik Wien-Süd",
    city: "Wien",
    district: "منطقه ۱۰",
    address: "Favoritenstraße 226, 1100 Wien",
    phone: "+43 1 60191 0",
    hours: "۸:۰۰ - ۲۰:۰۰ روزهای کاری",
    services: ["کشیک دندانی", "درمان ریشه", "پروتز فوری"],
    languages: ["آلمانی"],
    isEmergency247: false,
    gradient: "from-purple-500 to-indigo-600",
    badge: "دسترسی آسان",
    badgeIcon: MapPin,
  },
];

// ==========================================
// OTHER CITIES EMERGENCY
// ==========================================
const OTHER_CITIES = [
  {
    id: "graz",
    city: "گراتس",
    englishName: "Graz",
    hotline: "+43 316 877 0",
    hospital: "LKH-Universitätsklinikum Graz",
    gradient: "from-sky-500 to-blue-600",
    emoji: "🏥",
  },
  {
    id: "linz",
    city: "لینتس",
    englishName: "Linz",
    hotline: "+43 732 7806 0",
    hospital: "Kepler Universitätsklinikum",
    gradient: "from-amber-500 to-orange-600",
    emoji: "🏥",
  },
  {
    id: "salzburg",
    city: "سالزبورگ",
    englishName: "Salzburg",
    hotline: "+43 5 7255 0",
    hospital: "Universitätsklinikum Salzburg",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🏥",
  },
  {
    id: "innsbruck",
    city: "اینسبروک",
    englishName: "Innsbruck",
    hotline: "+43 50 504 0",
    hospital: "Universitätsklinik Innsbruck",
    gradient: "from-purple-500 to-indigo-600",
    emoji: "🏥",
  },
];

// ==========================================
// COST & INSURANCE INFO
// ==========================================
const COST_INFO = [
  {
    icon: Wallet,
    title: "با بیمه ÖGK",
    text: "اکثر درمان‌های اورژانسی دندانپزشکی با بیمه ÖGK پوشش داده می‌شوند. سهم بیمار معمولاً بین ۲۰٪ تا ۳۵٪ است.",
    color: "from-emerald-500 to-teal-600",
    highlight: "پوشش بالا",
  },
  {
    icon: CreditCard,
    title: "بدون بیمه",
    text: "هزینه معاینه اورژانسی بین ۱۰۰ تا ۲۵۰ یورو. درمان ریشه بین ۳۰۰ تا ۸۰۰ یورو و کشیدن دندان حدود ۱۵۰ یورو.",
    color: "from-amber-500 to-orange-600",
    highlight: "هزینه بالا",
  },
  {
    icon: ShieldCheck,
    title: "بیمه تکمیلی",
    text: "بیمه‌های تکمیلی (Zusatzversicherung) می‌توانند تا ۸۰٪ هزینه‌های درمانی دندانپزشکی را پوشش دهند.",
    color: "from-sky-500 to-blue-600",
    highlight: "توصیه می‌شود",
  },
  {
    icon: Heart,
    title: "کمک‌های مالی",
    text: "برای خانواده‌های کم‌درآمد، کمک‌های مالی از طریق Sozialamt یا Rotes Kreuz در دسترس است.",
    color: "from-rose-500 to-pink-600",
    highlight: "حمایت اجتماعی",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۲۴/۷", label: "پوشش اورژانس", icon: "⏰" },
  { value: "۵", label: "شهر بزرگ", icon: "🏙️" },
  { value: "۶", label: "نوع اورژانس", icon: "🚨" },
  { value: "۴", label: "خط تلفن", icon: "📞" },
];

// ==========================================
// WHY USE / TRUST
// ==========================================
const WHY_USE = [
  {
    icon: Clock,
    title: "پاسخ سریع ۲۴/۷",
    text: "تمام اطلاعات اورژانسی شبانه‌روزی و شامل تعطیلات رسمی به‌روزرسانی می‌شود.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: ShieldCheck,
    title: "منابع رسمی و تأیید‌شده",
    text: "شماره‌های تلفن و آدرس کلینیک‌ها از منابع رسمی ÖGK و بیمارستان‌ها.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "پشتیبانی چندزبانه",
    text: "اکثر بیمارستان‌ها و کلینیک‌های اورژانس دارای پرسنل انگلیسی‌زبان هستند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "ساخته‌شده برای مهاجران",
    text: "راهنمای کامل مراحل، هزینه‌ها و پوشش بیمه ویژه فارسی‌زبانان.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "شماره اورژانس دندانپزشکی در وین چیست؟",
    a: "شماره دائم دندانپزشکی کشیک وین ۰۱ ۵۱۲ ۲۰ ۷۶ (01 512 20 76) است که در ساعات شب، آخر هفته و تعطیلات فعال است. برای اورژانس عمومی نیز شماره ۱۴۱ (پزشک کشیک) و ۱۴۴ (اورژانس) در دسترس است.",
  },
  {
    q: "هزینه اورژانس دندانپزشکی با بیمه ÖGK چقدر است؟",
    a: "با بیمه ÖGK، اکثر درمان‌های اورژانسی دندانی پوشش داده می‌شوند و سهم بیمار معمولاً بین ۲۰ تا ۳۵ درصد کل هزینه است. مثلاً معاینه اورژانسی با بیمه حدود ۳۰ تا ۵۰ یورو هزینه دارد.",
  },
  {
    q: "اگر دندانم کامل افتاد چه کنم؟",
    a: "دندان را از تاج (نه از ریشه) بگیرید و اگر آلوده شد با آب یا سرم فیزیولوژیک بشویید. آن را در شیر یا سرم نمکی نگه دارید و حداکثر ظرف ۳۰ دقیقه به دندانپزشک یا اورژانس برسانید. شانس پیوند مجدد دندان در این بازه زمانی بالای ۸۰٪ است.",
  },
  {
    q: "آیا می‌توانم بدون بیمه به اورژانس دندانپزشکی بروم؟",
    a: "بله، تمام بیمارستان‌های دولتی و کلینیک‌های اورژانس، بیماران بدون بیمه را نیز پذیرش می‌کنند. اما هزینه‌ها به‌طور کامل بر عهده شما خواهد بود و برای خدمات تخصصی می‌تواند تا چند صد یورو برسد.",
  },
  {
    q: "آیا خدمات دندانپزشکی اورژانس در تمام ایالت‌ها یکسان است؟",
    a: "بله، در تمام ۹ ایالت اتریش، شماره ۱۴۱ برای پزشک کشیک و ۱۴۴ برای اورژانس فعال است. علاوه بر آن، هر ایالت شماره مخصوص دندانپزشکی کشیک خود را دارد که می‌توانید از وب‌سایت ÖGK ایالت خود دریافت کنید.",
  },
  {
    q: "چه مدارکی باید همراه داشته باشم؟",
    a: "حتماً کارت بیمه (e-card)، کارت شناسایی معتبر (پاسپورت یا اقامت)، و لیست داروهای مصرفی خود را همراه داشته باشید. اگر بیماری زمینه‌ای دارید، مدارک پزشکی مربوطه نیز توصیه می‌شود.",
  },
  {
    q: "آیا خدمات دندانپزشکی شبانه‌روزی در وین وجود دارد؟",
    a: "بله، بیمارستان عمومی وین (AKH) دارای بخش اورژانس دندانپزشکی ۲۴ ساعته است. همچنین برخی کلینیک‌های خصوصی نیز خدمات شبانه‌روزی ارائه می‌دهند اما هزینه‌های بالاتری دارند.",
  },
];

// ==========================================
// SEARCH PRIORITY CONFIG
// ==========================================
const PRIORITY_CONFIG = {
  critical: {
    label: "بحرانی",
    bg: "bg-red-500/10",
    text: "text-red-700",
    border: "border-red-500/30",
    dotColor: "bg-red-500",
  },
  high: {
    label: "فوری",
    bg: "bg-rose-500/10",
    text: "text-rose-700",
    border: "border-rose-500/30",
    dotColor: "bg-rose-500",
  },
  medium: {
    label: "متوسط",
    bg: "bg-amber-500/10",
    text: "text-amber-700",
    border: "border-amber-500/30",
    dotColor: "bg-amber-500",
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const EmergencyDentistryGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCity, setActiveCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const filteredClinics = useMemo(() => {
    return VIENNA_CLINICS.filter(c => {
      const matchesSearch = !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  const handleCopyNumber = (number: string, label: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    toast.success(`شماره «${label}» کپی شد!`);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "راهنمای اورژانس دندانپزشکی اتریش ۲۰۲۶",
      url: "https://otrish-iran.ir/emergency-dentistry",
      description:
        "راهنمای کامل اورژانس دندانپزشکی اتریش: شماره‌های اضطراری، کلینیک‌های کشیک وین، هزینه‌ها و پوشش بیمه برای فارسی‌زبانان.",
      inLanguage: "fa",
      medicalAudience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
      },
      lastReviewed: "2025-01-01",
      about: {
        "@type": "MedicalCondition",
        name: "درد و اورژانس دندانپزشکی",
      },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
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
      "@type": "ItemList",
      name: "کلینیک‌های اورژانس دندانپزشکی وین",
      numberOfItems: VIENNA_CLINICS.length,
      itemListElement: VIENNA_CLINICS.map((c, i) => ({
        "@type": "MedicalClinic",
        position: i + 1,
        name: c.name,
        alternateName: c.englishName,
        address: {
          "@type": "PostalAddress",
          streetAddress: c.address,
          addressLocality: "Wien",
          addressCountry: "AT",
        },
        telephone: c.phone,
        openingHours: c.hours,
        medicalSpecialty: "Dentistry",
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "EmergencyService",
      name: "اورژانس دندانپزشکی اتریش",
      telephone: "141",
      availableLanguage: ["German", "English", "Persian"],
      areaServed: "Austria",
    },
  ];

  return (
    <>
      <SEO
        title="اورژانس دندانپزشکی اتریش ۲۰۲۶ | شماره‌ها، کلینیک‌های کشیک و هزینه‌ها"
        description="راهنمای فوری اورژانس دندانپزشکی در اتریش: شماره‌های اضطراری (۱۴۱، ۱۴۴)، کلینیک‌های کشیک وین، آدرس و تلفن، هزینه‌ها با بیمه ÖGK و پوشش بیمه تکمیلی."
        keywords="اورژانس دندانپزشکی اتریش, دندانپزشکی شبانه‌روزی وین, شماره اورژانس وین, AKH دندانپزشکی, ÖGK دندانپزشکی, درد دندان در اتریش, دندانپزشک کشیک, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* EMERGENCY BANNER - TOP */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border-2 border-rose-200 bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 p-4 md:p-5"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg flex-shrink-0"
            >
              <Siren className="w-6 h-6" />
            </motion.div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[10px] font-black text-rose-700 mb-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                اورژانس در حال جریان؟
              </div>
              <div className="text-xs md:text-sm font-black text-stone-900">
                برای شرایط حاد و تهدیدکننده جان، فوراً با شماره{' '}
                <a href="tel:144" className="inline-flex items-center gap-1 text-rose-700 bg-rose-100 px-2 py-0.5 rounded-lg mx-1 hover:bg-rose-200 transition">
                  <Phone className="w-3 h-3" />
                  ۱۴۴
                </a>
                تماس بگیرید
              </div>
            </div>
          </div>
        </motion.div>

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
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="اورژانس دندانپزشکی اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🦷
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                <Smile className="w-3.5 h-3.5 text-amber-300" />
                Zahn-Notdienst Österreich 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای اورژانس دندانپزشکی اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                راهنمای جامع و به‌روز اورژانس دندانپزشکی در اتریش — از شماره‌های
                اضطراری و کلینیک‌های شبانه‌روزی وین تا هزینه‌های درمان با بیمه
                ÖGK. برای هر نوع درد دندان، شکستگی یا عفونت، راهکار سریع در
                دسترس شماست.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Zap className="w-3.5 h-3.5" />
                  <span>پاسخ ۲۴/۷</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
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
        {/* EMERGENCY HOTLINES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              شماره‌های اضطراری اتریش
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار شماره کلیدی که باید در گوشی خود ذخیره کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_HOTLINES.map((h, i) => {
              const Icon = h.icon;
              const isCopied = copiedNumber === h.display;
              return (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`group relative bg-white rounded-3xl border-2 shadow-sm hover:shadow-xl transition-all overflow-hidden ${
                    h.urgency === "critical"
                      ? "border-rose-200 hover:border-rose-400"
                      : h.urgency === "high"
                      ? "border-[#c8102e]/20 hover:border-[#c8102e]/40"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  {h.urgency === "critical" && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg"
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      بحرانی
                    </motion.div>
                  )}

                  <div className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${h.gradient} opacity-[0.08] rounded-full group-hover:opacity-[0.15] transition-opacity`} />

                  <div className="relative p-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${h.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-sm font-black text-stone-900 mb-0.5">
                      {h.title}
                    </h3>
                    <p className="text-[10px] font-mono text-stone-500 mb-2">
                      {h.subtitle}
                    </p>

                    <p className="text-[10.5px] text-stone-600 font-bold leading-relaxed mb-4">
                      {h.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${h.display.replace(/\s/g, "")}`}
                        className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-br ${h.gradient} text-white font-black text-sm py-3 rounded-2xl shadow-md hover:scale-[1.02] transition-all`}
                        dir="ltr"
                      >
                        <Phone className="w-4 h-4" />
                        {h.display}
                      </a>

                      <motion.button
                        onClick={() => handleCopyNumber(h.display, h.title)}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-11 h-11 rounded-2xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-all flex-shrink-0"
                        title="کپی شماره"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>

                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[9px] font-black text-stone-500">
                      <Clock className="w-3 h-3" />
                      {h.available}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* EMERGENCY TYPES GUIDE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              راهنمای انواع اورژانس دندانی
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              نوع مشکل خود را پیدا کنید و اقدامات فوری مناسب را انجام دهید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGENCY_TYPES.map((type, i) => {
              const Icon = type.icon;
              const priority = PRIORITY_CONFIG[type.priority as keyof typeof PRIORITY_CONFIG];
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className={`relative p-5 bg-gradient-to-br ${type.bg} border-b border-stone-100`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className={`inline-flex items-center gap-1.5 ${priority.bg} ${priority.text} border ${priority.border} px-2.5 py-1 rounded-full text-[9px] font-black`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${priority.dotColor} animate-pulse`}></span>
                        {priority.label}
                      </div>
                    </div>

                    <h3 className="font-black text-stone-900 text-sm mb-1">
                      {type.title}
                    </h3>
                    <p className="text-[10px] font-mono text-stone-500 mb-3">
                      {type.subtitle}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-700">
                      <Timer className="w-3 h-3" />
                      {type.waitTime}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-4 min-h-[50px]">
                      {type.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-[10px] font-black text-stone-700 flex items-center gap-1.5 mb-2">
                        <Target className="w-3 h-3 text-[#c8102e]" />
                        اقدامات فوری:
                      </div>
                      {type.actions.map((action, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-[10.5px] font-bold text-stone-600 bg-stone-50 rounded-lg p-2"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* CLINICS DIRECTORY */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="absolute-line top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

          {/* Header */}
          <div className="p-5 md:p-6 border-b border-stone-100">
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
              <div>
                <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                  <Hospital className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                  کلینیک‌های اورژانس دندانپزشکی وین
                </h2>
                <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                  {filteredClinics.length} مرکز معتبر با خدمات اورژانس دندانی
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-700">فعال ۲۴/۷</span>
              </div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                placeholder="جستجوی کلینیک... (نام، منطقه یا تخصص)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-10 pl-4 py-3 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-3.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Clinics Grid */}
          <div className="p-5 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredClinics.map((clinic, i) => {
                  const BadgeIcon = clinic.badgeIcon;
                  return (
                    <motion.div
                      key={clinic.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                    >
                      {/* Image banner */}
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={CLINIC_IMAGE}
                          alt={clinic.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${clinic.gradient} opacity-80`} />

                        {clinic.isEmergency247 && (
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-rose-700 text-[9px] font-black px-2 py-1 rounded-full shadow-lg"
                          >
                            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                            ۲۴ ساعته
                          </motion.div>
                        )}

                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded-full">
                          {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5" />}
                          {clinic.badge}
                        </div>

                        <div className="absolute bottom-3 right-3 text-white">
                          <div className="text-sm font-black leading-tight">{clinic.name}</div>
                          <div className="text-[9px] font-mono opacity-90 mt-0.5">
                            {clinic.district}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        {/* Address */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-[#c8102e]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-black text-stone-500 mb-0.5">آدرس</div>
                            <div className="text-[11px] font-bold text-stone-800 leading-snug" dir="ltr">
                              {clinic.address}
                            </div>
                          </div>
                        </div>

                        {/* Hours */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-black text-stone-500 mb-0.5">ساعات کاری</div>
                            <div className="text-[11px] font-black text-stone-800">
                              {clinic.hours}
                            </div>
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Globe className="w-3.5 h-3.5 text-emerald-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-black text-stone-500 mb-1">زبان‌ها</div>
                            <div className="flex flex-wrap gap-1">
                              {clinic.languages.map((lang, j) => (
                                <span
                                  key={j}
                                  className="inline-flex items-center text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"
                                >
                                  {lang}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="pt-3 border-t border-stone-100">
                          <div className="text-[9px] font-black text-stone-500 mb-2 flex items-center gap-1">
                            <Stethoscope className="w-3 h-3" />
                            خدمات تخصصی
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {clinic.services.map((s, j) => (
                              <span
                                key={j}
                                className="inline-flex items-center gap-1 text-[9.5px] font-black text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full"
                              >
                                <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Call button */}
                        <a
                          href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-br ${clinic.gradient} text-white font-black text-xs py-3 rounded-2xl shadow-md hover:scale-[1.02] transition-all mt-3`}
                          dir="ltr"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{clinic.phone}</span>
                        </a>
                      </div>
                    </motion.div>
                  );
                })}

                {filteredClinics.length === 0 && (
                  <div className="col-span-2 text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                    <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-stone-400" />
                    </div>
                    <p className="text-sm font-black text-stone-700 mb-1">
                      کلینیکی منطبق با جستجو یافت نشد
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all mt-3"
                    >
                      <X className="w-3 h-3" />
                      پاک‌سازی جستجو
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* OTHER CITIES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              اورژانس دندانپزشکی در سایر شهرها
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              شماره‌های اورژانس دندانی در چهار شهر بزرگ دیگر اتریش
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_CITIES.map((city, i) => (
              <motion.a
                key={city.id}
                href={`tel:${city.hotline.replace(/\s/g, "")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden p-5 text-center"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${city.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform text-2xl`}>
                  {city.emoji}
                </div>

                <h3 className="font-black text-stone-900 text-sm mb-0.5">
                  {city.city}
                </h3>
                <p className="text-[10px] font-mono text-stone-500 mb-3">
                  {city.englishName}
                </p>

                <div className="text-[10.5px] font-bold text-stone-600 mb-3 leading-relaxed">
                  {city.hospital}
                </div>

                <div className={`inline-flex items-center gap-2 bg-gradient-to-br ${city.gradient} text-white font-black text-xs py-2.5 px-4 rounded-2xl shadow-md group-hover:scale-[1.02] transition-all`} dir="ltr">
                  <PhoneCall className="w-3.5 h-3.5" />
                  {city.hotline}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* COST & INSURANCE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Wallet className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              هزینه‌ها و پوشش بیمه
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              اطلاعات کامل هزینه‌های درمان اورژانسی دندانی در اتریش
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COST_INFO.map((v, i) => {
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

                  <div className={`inline-flex items-center gap-1 text-[9px] font-black text-white bg-gradient-to-br ${v.color} px-2 py-0.5 rounded-full mb-2 shadow-sm`}>
                    {v.highlight}
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
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              چرا این راهنما؟
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیل که این راهنما را به مرجع اول فارسی‌زبانان تبدیل می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_USE.map((v, i) => {
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
        {/* TIPS / PREVENTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-black text-stone-900 mb-3">
                آمادگی قبل از اورژانس دندانی
              </h3>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                جلوگیری از بحران، بهترین راهکار است. توصیه می‌کنیم همیشه این موارد را
                آماده داشته باشید:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: Phone, label: "شماره دندانپزشک خانوادگی" },
                  { icon: CreditCard, label: "کارت بیمه e-card در دسترس" },
                  { icon: FileText, label: "لیست داروهای مصرفی" },
                  { icon: HeartPulse, label: "سابقه بیماری‌های خاص" },
                  { icon: Pill, label: "جعبه کمک‌های اولیه" },
                  { icon: MapPin, label: "آدرس نزدیک‌ترین کلینیک" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl p-2.5 border border-indigo-100"
                    >
                      <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="text-[10.5px] font-black text-stone-700">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              سوالات متداول
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              پاسخ به پرتکرارترین سوالات فارسی‌زبانان درباره اورژانس دندانپزشکی
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
        {/* WARNING */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 flex items-start gap-4"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0"
          >
            <AlertTriangle className="w-6 h-6" />
          </motion.div>
          <div>
            <h5 className="font-black text-amber-900 text-sm mb-1.5">
              نکات حیاتی در اورژانس دندانی
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>در صورت خونریزی مداوم بیش از ۲۰ دقیقه، فوراً به اورژانس مراجعه کنید.</li>
              <li>دندان افتاده را با آب یا سرم فیزیولوژیک بشویید — به ریشه دست نزنید.</li>
              <li>برای تورم شدید همراه با تب، خطر سپسیس (خون‌مسمومیت) جدی است و باید فوراً به اورژانس بروید.</li>
              <li>هرگز از آسپرین برای تسکین درد دندان استفاده نکنید — خونریزی را بدتر می‌کند.</li>
              <li>در صورت عدم دسترسی به دندانپزشک، به اورژانس عمومی بیمارستان‌ها مراجعه کنید.</li>
            </ul>
          </div>
        </motion.div>

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
              همراه شما در لحظات حساس
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوال یا تجربه‌ای دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخ به سوالات شما درباره اورژانس دندانی،
              کلینیک‌ها و پوشش بیمه است. تجربه خود را با ما به اشتراک بگذارید تا
              به سایر هموطنان کمک کنیم.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                واتس‌اپ اتریش
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
              اطلاعات این راهنما بر اساس منابع رسمی ÖGK و تجربه‌های میدانی
              تهیه شده و صرفاً جنبه راهنمایی دارد. اتریش‌نشین یک پلتفرم مستقل و
              داوطلبانه است و هیچ ارتباطی با هیچ بیمارستان، کلینیک یا نهاد درمانی
              ندارد. برای تصمیم‌های درمانی، همیشه با دندانپزشک یا پزشک متخصص
              مشورت کنید. در شرایط اورژانسی حاد، فوراً با شماره ۱۴۴ تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

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

export default EmergencyDentistryGuide;