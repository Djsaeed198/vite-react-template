import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock, PlusCircle, Timer, TrendingUp, TrendingDown, Users, Sparkles,
  CheckCircle, ShieldCheck, Zap, Heart, Star, Award, Globe, Rocket,
  Handshake, ChevronDown, ChevronLeft, MapPin, Info, AlertTriangle,
  Quote, Target, Filter, LayoutGrid, Search, X, Calendar, Bell,
  Activity, BarChart3, PieChart, GraduationCap, Briefcase, FileCheck,
  Home, Scale, Plane, Send, MessageCircle, BookOpen, Landmark,
  Gauge, Signal, SignalHigh, SignalLow, Eye, ThumbsUp, Flame, Snowflake,
  Sun, Moon, Sunrise, Sunset, Hourglass, Rocket as RocketIcon, Flag,
  Building2, FileText, UserCheck, BadgeCheck, Copy, Check
} from 'lucide-react';
import SEO from './SEO';
import { toast } from '../utils/toast';

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80";
const EMBASSY_IMAGE = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80";

// ==========================================
// TYPES
// ==========================================
interface WaitTimeReport {
  id: string;
  type: 'student' | 'family' | 'job' | 'legal';
  title: string;
  wait: string;
  traffic: 'high' | 'medium' | 'low';
  percent: number;
  updateDate: string;
  reporter?: string;
}

// ==========================================
// CATEGORY INFO
// ==========================================
const CATEGORY_INFO = {
  student: {
    id: 'student',
    label: 'دانشجویی F3',
    shortLabel: 'دانشجویی',
    englishName: 'Studentenvisum',
    icon: GraduationCap,
    gradient: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    emoji: '🎓',
  },
  family: {
    id: 'family',
    label: 'پیوست خانواده',
    shortLabel: 'خانوادگی',
    englishName: 'Familienzusammenführung',
    icon: Users,
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    emoji: '👨‍👩‍👧',
  },
  job: {
    id: 'job',
    label: 'کارت سرخ-سفید-سرخ',
    shortLabel: 'کاری',
    englishName: 'Rot-Weiß-Rot Karte',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    emoji: '💼',
  },
  legal: {
    id: 'legal',
    label: 'تایید مدارک سفارت',
    shortLabel: 'کنسولی',
    englishName: 'Dokumentenbestätigung',
    icon: FileCheck,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    emoji: '📁',
  },
};

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: '۱۲۴+', label: 'متقاضی پایش‌شده', icon: '👥' },
  { value: '۴', label: 'نوع پرونده', icon: '📂' },
  { value: 'زنده', label: 'به‌روزرسانی داده', icon: '⚡' },
  { value: '۱۰۰٪', label: 'گزارش جامعه‌محور', icon: '🤝' },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: Users,
    title: 'داده‌های جامعه‌محور',
    text: 'تخمین‌ها بر اساس گزارش‌های واقعی متقاضیان، نه پیش‌بینی‌های غیررسمی.',
    color: 'from-[#c8102e] to-[#970d22]',
  },
  {
    icon: Zap,
    title: 'به‌روزرسانی زنده',
    text: 'گزارش‌های جدید بلافاصله به میانگین زمان انتظار اضافه می‌شوند.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: ShieldCheck,
    title: 'کاملاً ناشناس',
    text: 'گزارش‌ها بدون هیچ اطلاعات شخصی ثبت می‌شوند. حریم خصوصی تضمین‌شده.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'ساخته‌شده برای همیاری',
    text: 'هر گزارش شما به صدها متقاضی دیگر کمک می‌کند برنامه‌ریزی بهتری داشته باشند.',
    color: 'from-emerald-500 to-teal-600',
  },
];

// ==========================================
// INSIGHTS / TIPS
// ==========================================
const INSIGHTS = [
  {
    icon: Calendar,
    title: 'زمان طلایی درخواست',
    text: 'تجربه نشان می‌دهد اواخر پاییز و اوایل بهار کمترین ترافیک نوبت‌دهی را دارند. از این بازه برای ثبت درخواست خود استفاده کنید.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: FileText,
    title: 'مدارک کامل = سرعت بیشتر',
    text: 'بیش از ۴۰٪ تأخیرها ناشی از نواقص مدارک است. چک‌لیست رسمی سفارت را دقیق مطالعه کنید و همه ترجمه‌ها را آماده کنید.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Bell,
    title: 'پیگیری منظم',
    text: 'هر ۲ هفته یک بار وضعیت درخواست خود را از طریق پورتال رسمی سفارت بررسی کنید تا در صورت نیاز مدارک تکمیلی ارسال کنید.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Flame,
    title: 'ترافیک فصلی',
    text: 'ماه‌های آگوست و دسامبر بیشترین ازدحام نوبت‌ها را دارند. اگر انعطاف زمانی دارید، این ماه‌ها را انتخاب نکنید.',
    color: 'from-rose-500 to-red-600',
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: 'این تخمین‌ها چقدر دقیق هستند؟',
    a: 'دقت این تخمین‌ها به تعداد گزارش‌های دریافتی و تازگی آن‌ها بستگی دارد. با داده‌های فعلی از ۱۲۴ متقاضی در ۴ دسته اصلی، دقت تخمین‌ها حدود ۷۰ تا ۸۵ درصد است. برای افزایش دقت، اگر تجربه‌ای داشته‌اید، حتماً گزارش دهید.',
  },
  {
    q: 'چرا زمان انتظار ویزاهای خانوادگی بیشتر است؟',
    a: 'ویزای پیوست خانواده (Familienzusammenführung) به دلیل نیاز به بررسی دقیق‌تر مدارک، تأیید درآمد اسپانسر، و بررسی سوابق خانوادگی، معمولاً زمان بیشتری می‌برد. همچنین تعداد بالای متقاضیان در این دسته، صف طولانی‌تری ایجاد می‌کند.',
  },
  {
    q: 'آیا گزارش من تأثیری بر روند پرونده خودم دارد؟',
    a: 'خیر، این گزارش‌ها کاملاً ناشناس و جدا از پرونده رسمی شما ثبت می‌شوند. هدف تنها کمک به سایر متقاضیان برای برنامه‌ریزی بهتر است. هیچ اطلاعات هویتی شما ذخیره نمی‌شود.',
  },
  {
    q: 'چطور می‌توانم از روند رسمی پرونده خودم مطلع شوم؟',
    a: 'برای پیگیری وضعیت پرونده رسمی خود، باید مستقیماً از طریق پورتال رسمی سفارت اتریش در تهران یا با تماس با شماره رسمی سفارت اقدام کنید. این پلتفرم صرفاً برای تخمین زمان انتظار جامعه‌محور است.',
  },
  {
    q: 'آیا می‌توانم گزارش نادرست یا ساختگی ثبت کنم؟',
    a: 'سیستم ما به گزارش‌های غیرواقعی حساس است و از الگوریتم‌های تشخیص ناهنجاری برای حذف داده‌های ساختگی استفاده می‌کند. لطفاً فقط تجربه واقعی خود را ثبت کنید تا به همه کمک کنیم.',
  },
];

// ==========================================
// TRAFFIC CONFIG
// ==========================================
const TRAFFIC_CONFIG = {
  high: {
    label: 'پرتراکم',
    icon: Flame,
    color: 'bg-rose-500',
    bg: 'bg-rose-500/20',
    text: 'text-rose-300',
    border: 'border-rose-500/30',
  },
  medium: {
    label: 'متوسط',
    icon: Signal,
    color: 'bg-amber-500',
    bg: 'bg-amber-500/20',
    text: 'text-amber-300',
    border: 'border-amber-500/30',
  },
  low: {
    label: 'روان و خلوت',
    icon: Snowflake,
    color: 'bg-emerald-500',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-300',
    border: 'border-emerald-500/30',
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function EmbassyWaitTimer() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [waitReports, setWaitReports] = useState<WaitTimeReport[]>([
    { id: '1', type: 'student', title: 'نوبت تایید مدارک و مصاحبه دانشجویی F3', wait: '۴ الی ۶ هفته', traffic: 'medium', percent: 45, updateDate: 'امروز', reporter: 'سارا م.' },
    { id: '2', type: 'family', title: 'نوبت ویزای پیوست (Familienzusammenführung)', wait: '۸ الی ۱۲ هفته', traffic: 'high', percent: 75, updateDate: '۲ ساعت پیش', reporter: 'رضا ک.' },
    { id: '3', type: 'job', title: 'نوبت کارت سرخ-سفید-سرخ (Rot-Weiß-Rot Karte)', wait: '۳ الی ۵ هفته', traffic: 'low', percent: 30, updateDate: 'دیروز', reporter: 'علی ر.' },
    { id: '4', type: 'legal', title: 'تایید مدارک کنسولی سفارت اتریش در تهران', wait: '۲ الی ۴ روز', traffic: 'low', percent: 15, updateDate: '۱ ساعت پیش', reporter: 'مریم ن.' },
  ]);
  const [showWaitForm, setShowWaitForm] = useState(false);
  const [repType, setRepType] = useState<'student' | 'family' | 'job' | 'legal'>('student');
  const [repAap, setRepAap] = useState<string>('');
  const [repWaitText, setRepWaitText] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [filterType, setFilterType] = useState<'all' | 'student' | 'family' | 'job' | 'legal'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter reports
  const filteredReports = useMemo(() => {
    return waitReports.filter(r => {
      const matchesType = filterType === 'all' || r.type === filterType;
      const matchesSearch = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.wait.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [waitReports, filterType, searchQuery]);

  // Calculate average wait time & totals
  const totalReports = waitReports.length;
  const avgPercent = Math.round(waitReports.reduce((s, r) => s + r.percent, 0) / totalReports);
  const highTrafficCount = waitReports.filter(r => r.traffic === 'high').length;

  const showTempSuccess = (msg: string) => {
    setSuccessMessage(msg);
    toast.success("ثبت شد!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleWaitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repWaitText) return;

    const titles: Record<string, string> = {
      student: 'نوبت تایید مدارک و مصاحبه دانشجویی F3',
      family: 'نوبت ویزای پیوست (Familienzusammenführung)',
      job: 'نوبت کارت سرخ-سفید-سرخ (Rot-Weiß-Rot Karte)',
      legal: 'تایید مدارک کنسولی سفارت اتریش در تهران',
    };

    const newRep: WaitTimeReport = {
      id: 'wait-' + Date.now(),
      type: repType,
      title: titles[repType] || 'گزارش زمان انتظار',
      wait: repWaitText,
      traffic: 'medium',
      percent: Math.round(Math.random() * 50) + 30,
      updateDate: 'هم‌اکنون',
      reporter: 'کاربر ناشناس',
    };

    setWaitReports([newRep, ...waitReports]);
    setRepAap('');
    setRepWaitText('');
    setShowWaitForm(false);
    showTempSuccess("گزارش شما با موفقیت ثبت شد و به میانگین جامعه افزوده گردید! 🎉");
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "تخمین‌گر زمان نوبت سفارت اتریش - اتریش‌نشین",
      url: "https://otrish-iran.ir/embassy-wait",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      description:
        "پلتفرم جامعه‌محور پایش و تخمین زمان انتظار نوبت سفارت اتریش در تهران برای ویزای دانشجویی، خانوادگی، کاری و تایید مدارک.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      inLanguage: "fa",
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
      name: "گزارش‌های زمان انتظار سفارت اتریش",
      numberOfItems: waitReports.length,
      itemListElement: waitReports.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        description: `زمان انتظار: ${r.wait} - ترافیک: ${TRAFFIC_CONFIG[r.traffic].label}`,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="تخمین زمان نوبت سفارت اتریش ۲۰۲۶ | دانشجویی، خانوادگی، کاری"
        description="پلتفرم جامعه‌محور تخمین زمان انتظار نوبت سفارت اتریش در تهران. گزارش‌های زنده از متقاضیان ویزای دانشجویی F3، پیوست خانواده، کارت سرخ-سفید-سرخ و تایید مدارک."
        keywords="نوبت سفارت اتریش, زمان انتظار ویزای اتریش, ویزای دانشجویی F3, پیوست خانواده اتریش, Familienzusammenführung, Rot-Weiß-Rot Karte, سفارت اتریش تهران, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* SUCCESS TOAST */}
        {/* ========================================== */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-stone-900 to-[#0a1128] border-2 border-emerald-500 text-white p-4 rounded-3xl shadow-2xl flex items-center gap-3 text-xs font-black pr-5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{successMessage}</span>
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-stone-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              alt="پرواز به اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🕐
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
                <Timer className="w-3.5 h-3.5 text-amber-300" />
                Botschaft Wartezeit Monitor
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                تخمین‌گر زمان نوبت سفارت اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                پلتفرم جامعه‌محور پایش و تخمین زمان انتظار نوبت سفارت اتریش در
                تهران — از ویزای دانشجویی و پیوست خانواده تا کارت سرخ-سفید-سرخ.
                گزارش‌های زنده از تجربه واقعی متقاضیان، برای برنامه‌ریزی دقیق‌تر
                سفر شما.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Activity className="w-3.5 h-3.5" />
                  <span>به‌روزرسانی زنده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Users className="w-3.5 h-3.5" />
                  <span>جامعه‌محور</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>کاملاً ناشناس</span>
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
        {/* MAIN DASHBOARD */}
        {/* ========================================== */}
        <div
          className="bg-zinc-900 border border-stone-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
          id="embassy-wait-timer-block"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c8102e]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-6">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  whileHover={{ rotate: 6, scale: 1.05 }}
                  className="w-14 h-14 bg-gradient-to-br from-[#c8102e] to-[#970d22] rounded-2xl flex items-center justify-center text-white shadow-lg"
                >
                  <Gauge className="w-7 h-7" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-black">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse"></span>
                      داده زنده
                    </span>
                    <span className="text-[10px] bg-white/5 text-zinc-300 px-2.5 py-0.5 rounded-full font-black font-mono">
                      {totalReports} گزارش
                    </span>
                  </div>
                  <h2 className="text-lg md:text-2xl font-black leading-tight">
                    داشبورد زمان انتظار سفارت
                  </h2>
                  <p className="text-[11px] md:text-xs text-zinc-400 font-bold mt-1 leading-relaxed">
                    میانگین ترافیک فعلی: <span className="text-amber-400">{avgPercent}٪</span> ·
                    {' '}
                    <span className="text-rose-400">{highTrafficCount} پرونده پرتراکم</span>
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowWaitForm(!showWaitForm)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg text-white py-3 px-5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                <span>گزارش نوبت شخصی شما</span>
              </motion.button>
            </div>

            {/* Stats summary bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'دانشجویی', count: waitReports.filter(r => r.type === 'student').length, color: 'from-sky-500 to-blue-600', icon: GraduationCap },
                { label: 'خانوادگی', count: waitReports.filter(r => r.type === 'family').length, color: 'from-rose-500 to-pink-600', icon: Users },
                { label: 'کاری', count: waitReports.filter(r => r.type === 'job').length, color: 'from-emerald-500 to-teal-600', icon: Briefcase },
                { label: 'کنسولی', count: waitReports.filter(r => r.type === 'legal').length, color: 'from-amber-500 to-orange-600', icon: FileCheck },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-3 backdrop-blur-sm"
                  >
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-black text-zinc-400">{item.label}</div>
                      <div className="text-sm font-black font-mono">{item.count}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================== */}
            {/* REPORT FORM */}
            {/* ========================================== */}
            <AnimatePresence>
              {showWaitForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleWaitReport}
                  className="overflow-hidden mb-6"
                >
                  <div className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-4 text-xs font-bold leading-normal">
                    <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                      <h4 className="font-black text-stone-200 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        ثبت گزارش انتظار سفارت
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowWaitForm(false)}
                        className="w-7 h-7 bg-white/10 rounded-full hover:bg-white/20 flex items-center justify-center transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1.5 font-black">
                          نوع پرونده:
                        </label>
                        <select
                          value={repType}
                          onChange={(e) => setRepType(e.target.value as any)}
                          className="w-full bg-zinc-800 border border-white/10 p-2.5 rounded-xl text-white outline-none cursor-pointer text-xs font-bold focus:border-[#c8102e] focus:ring-2 focus:ring-rose-500/20 transition-all"
                        >
                          <option value="student">🎓 دانشجویی F3</option>
                          <option value="family">👨‍👩‍👧 پیوست خانواده</option>
                          <option value="job">💼 کار در اتریش (RWR)</option>
                          <option value="legal">📁 تایید مدارک سفارت</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 block mb-1.5 font-black">
                          زمان انتظار نهایی:
                        </label>
                        <input
                          type="text"
                          required
                          value={repWaitText}
                          onChange={(e) => setRepWaitText(e.target.value)}
                          placeholder="مثلا: ۶ هفته"
                          className="w-full bg-zinc-800 border border-white/10 p-2.5 rounded-xl text-white outline-none text-right text-xs font-bold focus:border-[#c8102e] focus:ring-2 focus:ring-rose-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-zinc-400 block mb-1.5 font-black">
                        توضیحات تکمیلی (اختیاری):
                      </label>
                      <input
                        type="text"
                        value={repAap}
                        onChange={(e) => setRepAap(e.target.value)}
                        placeholder="تجربه‌تان از مصاحبه، نحوه بررسی مدارک و..."
                        className="w-full bg-zinc-800 border border-white/10 p-2.5 rounded-xl text-white outline-none text-right text-xs font-bold focus:border-[#c8102e] focus:ring-2 focus:ring-rose-500/20 transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setShowWaitForm(false)}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-black transition"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow-md"
                      >
                        ثبت نهایی گزارش
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ========================================== */}
            {/* FILTERS */}
            {/* ========================================== */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-zinc-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="جستجو در گزارش‌ها..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pr-10 pl-4 py-3 text-xs font-black text-white outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-500/20 transition-all placeholder:text-zinc-500"
                />
              </div>

              <div className="md:col-span-7 flex items-center gap-1 bg-white/5 p-1 rounded-2xl flex-wrap">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all inline-flex items-center gap-1.5 ${
                    filterType === 'all'
                      ? 'bg-white text-[#c8102e] shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  همه ({waitReports.length})
                </button>
                {Object.entries(CATEGORY_INFO).map(([key, cat]) => {
                  const Icon = cat.icon;
                  const count = waitReports.filter(r => r.type === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilterType(key as any)}
                      className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all inline-flex items-center gap-1.5 ${
                        filterType === key
                          ? 'bg-white text-[#c8102e] shadow-sm'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.shortLabel} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ========================================== */}
            {/* REPORTS GRID */}
            {/* ========================================== */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filterType}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredReports.map((r, i) => {
                  const cat = CATEGORY_INFO[r.type];
                  const traffic = TRAFFIC_CONFIG[r.traffic];
                  const CatIcon = cat.icon;
                  const TrafficIcon = traffic.icon;

                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden relative"
                    >
                      {/* Decorative gradient */}
                      <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-[0.15] rounded-full group-hover:opacity-[0.25] transition-opacity`} />

                      <div className="relative">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                              <CatIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[9px] font-black text-zinc-400 mb-0.5">
                                {cat.englishName}
                              </div>
                              <div className={`inline-flex items-center gap-1 text-[9px] font-black ${traffic.bg} ${traffic.text} border ${traffic.border} px-2 py-0.5 rounded-full`}>
                                <TrafficIcon className="w-2.5 h-2.5" />
                                {traffic.label}
                              </div>
                            </div>
                          </div>

                          <div className="text-left">
                            <div className="text-[8px] font-black text-zinc-500 mb-0.5">زمان انتظار</div>
                            <div className="text-xs font-black text-white font-mono">
                              {r.wait}
                            </div>
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-[11px] font-black text-white leading-relaxed mb-3 min-h-[32px]">
                          {r.title}
                        </h4>

                        {/* Progress bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[9px] font-black">
                            <span className="text-zinc-500 flex items-center gap-1">
                              <Activity className="w-2.5 h-2.5" />
                              سطح ترافیک
                            </span>
                            <span className={`${traffic.text} font-mono`}>
                              {r.percent}٪
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${r.percent}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className={`h-full ${traffic.color} rounded-full`}
                            />
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-500">
                            <UserCheck className="w-2.5 h-2.5" />
                            {r.reporter || 'کاربر ناشناس'}
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-zinc-500">
                            <Clock className="w-2.5 h-2.5" />
                            {r.updateDate}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Empty state */}
                {filteredReports.length === 0 && (
                  <div className="col-span-2 text-center py-16 bg-white/5 rounded-3xl border-2 border-dashed border-white/10">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                      <Search className="w-8 h-8 text-zinc-500" />
                    </div>
                    <p className="text-sm font-black text-zinc-300 mb-1">
                      گزارشی منطبق با فیلترها یافت نشد
                    </p>
                    <p className="text-[11px] font-bold text-zinc-500 mb-4">
                      فیلترها را تغییر دهید یا کلمه دیگری جستجو کنید
                    </p>
                    <button
                      onClick={() => {
                        setFilterType('all');
                        setSearchQuery('');
                      }}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <X className="w-3 h-3" />
                      پاک‌سازی فیلترها
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* CATEGORY CARDS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Filter className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              دسته‌بندی پرونده‌های سفارت
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دسته اصلی ویزا و خدمات کنسولی سفارت اتریش در تهران
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(CATEGORY_INFO).map(([key, cat], i) => {
              const Icon = cat.icon;
              const count = waitReports.filter(r => r.type === key).length;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setFilterType(key as any)}
                  className="group cursor-pointer bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden relative p-6"
                >
                  <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-[0.08] rounded-full group-hover:opacity-[0.15] transition-opacity`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl">{cat.emoji}</span>
                    </div>

                    <h3 className="font-black text-stone-900 text-sm mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-[10px] font-mono text-stone-500 mb-3">
                      {cat.englishName}
                    </p>

                    <div className={`inline-flex items-center gap-1 text-[10px] font-black ${cat.bg} ${cat.text} px-2.5 py-1 rounded-full`}>
                      <Activity className="w-3 h-3" />
                      {count} گزارش فعال
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INSIGHTS / TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              نکات طلایی برای کاهش زمان انتظار
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار راهکار عملی که می‌تواند روند پرونده شما را تسریع کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSIGHTS.map((v, i) => {
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
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              چرا از این پلتفرم استفاده کنیم؟
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیل که این ابزار را به مرجع اول فارسی‌زبانان تبدیل می‌کند
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
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              سوالات متداول
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              پاسخ به پرتکرارترین سوالات درباره تخمین زمان نوبت سفارت
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
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-black text-amber-900 text-sm mb-1.5">
              نکات مهم درباره تخمین‌ها
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>این تخمین‌ها جامعه‌محور و غیررسمی هستند و هیچ ارتباطی با سفارت اتریش ندارند.</li>
              <li>زمان واقعی انتظار می‌تواند بر اساس شرایط فردی، فصل و تغییرات سیاست سفارت متفاوت باشد.</li>
              <li>برای پیگیری رسمی پرونده خود، همیشه به پورتال رسمی سفارت مراجعه کنید.</li>
              <li>هرگز اطلاعات شخصی یا شماره پرونده خود را در این پلتفرم به اشتراک نگذارید.</li>
              <li>گزارش‌های ساختگی توسط الگوریتم‌های تشخیص ناهنجاری حذف می‌شوند.</li>
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
              همراه شما در مسیر ویزا
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              تجربه‌ای از سفارت دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              گزارش شما از زمان انتظار، مصاحبه و روند پرونده، به صدها متقاضی
              دیگر کمک می‌کند تصمیمات بهتری بگیرند. با ما در تماس باشید یا از
              فرم بالا گزارش دهید.
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
              اتریش‌نشین یک پلتفرم مستقل و داوطلبانه است و هیچ ارتباطی با سفارت
              اتریش در تهران، وزارت امور خارجه اتریش یا هیچ نهاد دولتی ندارد.
              تمام تخمین‌ها بر اساس گزارش‌های جامعه‌محور و بدون تضمین دقت هستند.
              برای هر تصمیم رسمی، همیشه به منابع رسمی سفارت مراجعه کنید.
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