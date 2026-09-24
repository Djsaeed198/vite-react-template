import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award, ShieldCheck, FileText, Clock, Users, Heart, Sparkles,
  CheckCircle, ChevronDown, ChevronLeft, ExternalLink, Info,
  Globe, BookOpen, Languages, Home, Euro, Scale, Calendar,
  MapPin, Star, TrendingUp, Building2, Rocket, GraduationCap,
  Briefcase, Landmark, Baby, AlertTriangle, Target, Handshake,
  Flag, BadgeCheck, FileCheck, Timer, Coins, Plane, Quote
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// HERO IMAGE
// ==========================================
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80";

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۱۰ سال", label: "حداقل اقامت قانونی", icon: "⏳" },
  { value: "۶ سال", label: "حداقل اقامت مداوم", icon: "📅" },
  { value: "B1", label: "سطح زبان آلمانی", icon: "🗣️" },
  { value: "€۱٬۲۰۰+", label: "هزینه تقریبی", icon: "💶" },
];

// ==========================================
// REQUIREMENTS
// ==========================================
const REQUIREMENTS = [
  {
    icon: Timer,
    title: "مدت اقامت قانونی",
    text: "حداقل ۱۰ سال اقامت قانونی و بدون وقفه در اتریش، که از این میان حداقل ۵ سال باید دارای مجوز اقامت دائمی (Niederlassungsbewilligung) بوده باشید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Languages,
    title: "تسلط به زبان آلمانی",
    text: "ارائه مدرک زبان آلمانی سطح B1 (طبق چارچوب مرجع اروپایی) از مؤسسات معتبر مانند ÖSD، Goethe یا Telc.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Coins,
    title: "تأمین مالی پایدار",
    text: "داشتن درآمد ثابت و کافی برای تأمین مخارج زندگی خود و خانواده، بدون وابستگی به کمک‌های اجتماعی (Sozialhilfe).",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "عدم سوء‌پیشینه",
    text: "ارائه گواهی عدم سوء‌پیشینه از اتریش و کشور مبدأ، و نداشتن سابقه محکومیت کیفری سنگین.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: GraduationCap,
    title: "آزمون شهروندی",
    text: "قبولی در آزمون دانش پایه از تاریخ، فرهنگ، نظام سیاسی و ارزش‌های دموکراتیک جمهوری اتریش.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    icon: Heart,
    title: "تعهد به ارزش‌ها",
    text: "پذیرش ارزش‌های بنیادین قانون اساسی اتریش و اتحادیه اروپا، و عدم تهدید امنیت ملی.",
    color: "from-pink-500 to-rose-600",
  },
];

// ==========================================
// TIMELINE STEPS
// ==========================================
const STEPS = [
  {
    n: "۰۱",
    icon: FileText,
    title: "جمع‌آوری مدارک",
    text: "گردآوری شناسنامه، پاسپورت، گواهی اقامت، مدارک درآمدی، مدرک زبان و گواهی عدم سوء‌پیشینه.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    n: "۰۲",
    icon: BookOpen,
    title: "ثبت‌نام در آزمون",
    text: "ثبت‌نام در دوره آمادگی و آزمون شهروندی (Staatsbürgerschaftsprüfung) در مراکز مجاز اتریش.",
    color: "from-amber-500 to-orange-600",
  },
  {
    n: "۰۳",
    icon: Building2,
    title: "ارسال درخواست",
    text: "تسلیم پرونده به دفتر ایالتی (Amt der Landesregierung) یا شهرداری محل سکونت در وین (MA 35).",
    color: "from-sky-500 to-blue-600",
  },
  {
    n: "۰۴",
    icon: BadgeCheck,
    title: "مراحل اداری",
    text: "بررسی پرونده، مصاحبه احتمالی و پرداخت هزینه‌های قانونی در طول فرآیند.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    n: "۰۵",
    icon: Award,
    title: "مراسم تحلیف",
    text: "پس از تأیید نهایی، در مراسم رسمی سوگند وفاداری به جمهوری اتریش یاد می‌کنید.",
    color: "from-purple-500 to-indigo-600",
  },
  {
    n: "۰۶",
    icon: Flag,
    title: "دریافت پاسپورت",
    text: "اخذ گواهی تابعیت و دریافت پاسپورت اتریشی (و پاسپورت اتحادیه اروپا) در چند هفته.",
    color: "from-rose-500 to-pink-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا با دریافت تابعیت اتریش، تابعیت ایرانی من از بین می‌رود؟",
    a: "اتریش به‌طور کلی تابعیت دوگانه را به رسمیت نمی‌شناسد و در هنگام اعطای تابعیت، انتظار دارد تابعیت قبلی ترک شود. اما برای شهروندان ایرانی، به دلیل محدودیت‌های قانونی در ترک تابعیت، استثناها و مسیرهای خاصی وجود دارد که نیاز به مشاوره تخصصی حقوقی دارد.",
  },
  {
    q: "آیا همسر و فرزندان من هم به‌طور خودکار شهروند می‌شوند؟",
    a: "خیر، هر فرد باید به‌طور مستقل شرایط قانونی را احراز کند. با این حال، همسر و فرزندان زیر ۱۴ سال در صورت داشتن شرایط اقامتی، ممکن است از تسهیلات و تسریع در فرآیند برخوردار شوند.",
  },
  {
    q: "هزینه کل فرآیند تابعیت چقدر است؟",
    a: "هزینه‌ها بسته به ایالت و شرایط فردی متفاوت است، اما به‌طور تقریبی بین ۱٬۰۰۰ تا ۲٬۵۰۰ یورو شامل هزینه‌های اداری، آزمون زبان، آزمون شهروندی و صدور مدارک می‌باشد.",
  },
  {
    q: "آزمون شهروندی شامل چه موضوعاتی است؟",
    a: "آزمون شامل سوالاتی درباره تاریخ اتریش، نظام سیاسی و دموکراسی، جغرافیای کشور، نمادهای ملی و ارزش‌های بنیادین جمهوری است. منابع رسمی از طریق وب‌سایت دولت اتریش در دسترس هستند.",
  },
  {
    q: "آیا می‌توانم در حین فرآیند، از اتریش خارج شوم؟",
    a: "بله، اما برای حفظ شرایط اقامتی، نباید بیش از ۶ ماه متوالی یا مجموعاً بیش از ۱۰ ماه در سال خارج از اتریش باشید. این موضوع بر اقامت مداوم شما تأثیر می‌گذارد.",
  },
  {
    q: "برای پناهندگان شرایط متفاوت است؟",
    a: "بله، برای پناهندگان به رسمیت شناخته‌شده (Asylberechtigte) و افراد تحت حمایت فرعی، شرایط اقامتی کوتاه‌تر (معمولاً ۶ سال) و مسیرهای تسهیل‌شده‌تری وجود دارد.",
  },
];

// ==========================================
// PATHWAYS
// ==========================================
const PATHWAYS = [
  {
    icon: Clock,
    title: "مسیر استاندارد",
    duration: "۱۰ سال اقامت",
    desc: "برای اکثر متقاضیان با اقامت قانونی طولانی‌مدت در اتریش.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Users,
    title: "همسر شهروند اتریشی",
    duration: "۶ سال اقامت",
    desc: "همسران شهروندان اتریشی با حداقل ۶ سال اقامت و شرایط خاص.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Baby,
    title: "تولد در اتریش",
    duration: "موردی",
    desc: "کودکان متولد اتریش در شرایط خاص ممکن است واجد شرایط باشند.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "پناهندگان",
    duration: "۶ سال",
    desc: "پناهندگان به رسمیت شناخته‌شده با تسهیل شرایط اقامتی.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const CitizenshipGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل تابعیت و پاسپورت اتریش ۲۰۲۵",
      description:
        "شرایط، مراحل، مدارک و هزینه‌های دریافت شهروندی اتریش برای فارسی‌زبانان مقیم. راهنمای گام‌به‌گام تابعیت اتریش.",
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
      },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
      datePublished: "2025-01-01",
      dateModified: "2025-01-01",
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
      "@type": "HowTo",
      name: "مراحل دریافت تابعیت اتریش",
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای تابعیت و پاسپورت اتریش ۲۰۲۵ | شرایط، مراحل و مدارک"
        description="راهنمای جامع دریافت شهروندی اتریش: شرایط اقامت، آزمون زبان B1، آزمون شهروندی، هزینه‌ها، مدارک و مراحل گام‌به‌گام. ویژه فارسی‌زبانان مقیم اتریش."
        keywords="تابعیت اتریش, شهروندی اتریش, پاسپورت اتریش, آزمون شهروندی اتریش, Staatsbürgerschaft, اقامت اتریش, مهاجرت اتریش, اتریش‌نشین"
        schemaData={seoSchema}
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
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="وین، اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🇦🇹
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
                <Flag className="w-3.5 h-3.5 text-amber-300" />
                Staatsbürgerschaft Österreich
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل تابعیت اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                از شرایط قانونی و مدارک مورد نیاز تا آزمون زبان و آزمون شهروندی —
                هر آنچه برای دریافت پاسپورت اتریشی و پیوستن به شهروندان اتحادیه اروپا
                نیاز دارید، در این راهنمای جامع گردآوری شده است.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>به‌روزرسانی ۲۰۲۵</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>راهنمای گام‌به‌گام</span>
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
        {/* INTRO / OVERVIEW */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
        >
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={VIENNA_IMAGE}
                alt="شهر وین، اتریش"
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
              <Flag className="w-6 h-6 mb-1" />
              <div className="text-[10px] font-black opacity-80">اتریش</div>
              <div className="text-xs font-black">شهروندی ۲۰۲۵</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
              <Info className="w-3.5 h-3.5" />
              مقدمه
            </div>
            <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
              چرا تابعیت اتریش؟
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
              تابعیت اتریش نه تنها به معنای دریافت یک پاسپورت قدرتمند جهانی است، بلکه
              دسترسی نامحدود به حقوق شهروندی اتحادیه اروپا، آزادی سفر به بیش از
              ۱۹۰ کشور، حق زندگی و کار در تمام اروپا و مشارکت کامل در حیات سیاسی
              و اجتماعی اتریش را به همراه دارد.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Globe, text: "سفر به ۱۹۰+ کشور" },
                { icon: Euro, text: "حق کار در اتحادیه اروپا" },
                { icon: Scale, text: "حق رأی و مشارکت سیاسی" },
                { icon: Heart, text: "امنیت اجتماعی کامل" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                  >
                    <Icon className="w-4 h-4 text-[#c8102e] flex-shrink-0" />
                    <span className="text-[10px] font-black text-stone-700">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* REQUIREMENTS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#c8102e]" />
              شرایط اصلی دریافت تابعیت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              شش شرط کلیدی که برای دریافت شهروندی اتریش باید احراز کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REQUIREMENTS.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group"
                >
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
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
        {/* PATHWAYS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#c8102e]" />
              مسیرهای دریافت شهروندی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              بر اساس وضعیت شما، مسیر و مدت اقامت متفاوت است
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PATHWAYS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-br from-white to-stone-50 rounded-3xl border border-stone-200 p-5 relative overflow-hidden group"
                >
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="inline-flex items-center gap-1 text-[9px] font-black text-[#c8102e] bg-rose-50 px-2 py-0.5 rounded-full mb-2">
                    <Clock className="w-2.5 h-2.5" />
                    {p.duration}
                  </div>
                  <h3 className="font-black text-stone-900 text-xs mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* TIMELINE STEPS */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#c8102e]" />
              مراحل گام‌به‌گام دریافت تابعیت
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از جمع‌آوری مدارک تا دریافت پاسپورت اتریشی — شش گام کلیدی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group"
                >
                  <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 group-hover:text-rose-100 transition-colors">
                    {s.n}
                  </div>
                  <div
                    className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-1.5">
                    {s.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {s.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* TEST INFO */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-stone-900 mb-2">
                آزمون شهروندی (Staatsbürgerschaftsprüfung)
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                آزمون شهروندی اتریش دانش پایه‌ای شما را در چهار حوزه اصلی می‌سنجد.
                این آزمون معمولاً به‌صورت کتبی و در مراکز مجاز ایالتی برگزار می‌شود.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: Landmark, label: "تاریخ اتریش" },
                  { icon: Scale, label: "نظام سیاسی" },
                  { icon: MapPin, label: "جغرافیا" },
                  { icon: Heart, label: "ارزش‌های ملی" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl p-2.5 border border-indigo-100"
                    >
                      <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="text-[10px] font-black text-stone-700">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-stone-500 font-bold mt-4 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                مدت زمان آزمون حدود ۶۰ دقیقه و شامل حدود ۴۰ سوال چندگزینه‌ای است.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول تابعیت اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان درباره شهروندی اتریش
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
        {/* WARNING / IMPORTANT */}
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
              نکات مهم قبل از شروع
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>قوانین تابعیت اتریش ممکن است بر اساس ایالت و شرایط فردی متفاوت باشد.</li>
              <li>برای تصمیم‌های حیاتی، حتماً با وکیل مهاجرت یا مشاور رسمی مشورت کنید.</li>
              <li>مدارک ترجمه‌شده رسمی (با مهر مترجم رسمی) الزامی است.</li>
              <li>فرآیند بررسی پرونده ممکن است از چند ماه تا بیش از یک سال طول بکشد.</li>
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
              همراه شما در مسیر شهروندی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوالی درباره تابعیت اتریش دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره شرایط، مدارک،
              آزمون‌ها و مراحل دریافت شهروندی اتریش است. با ما در تماس باشید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Users className="w-4 h-4" />
                مشاوره در واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4" />
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
              اطلاعات این راهنما صرفاً جنبه آموزشی و راهنمایی دارد و جایگزین مشاوره
              حقوقی رسمی نیست. قوانین مهاجرت و تابعیت اتریش ممکن است تغییر کنند.
              برای تصمیم‌های نهایی، همیشه با منابع رسمی مانند وزارت کشور اتریش
              (BMI) یا وکلای واجد شرایط مشورت کنید. اتریش‌نشین هیچ مسئولیتی در
              قبال تصمیمات مبتنی بر این اطلاعات نمی‌پذیرد.
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

export default CitizenshipGuide;