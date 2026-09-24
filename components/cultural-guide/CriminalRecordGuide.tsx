import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, FileText, FileCheck, Clock, MapPin, Users, Heart, Sparkles,
  CheckCircle, ChevronDown, ChevronLeft, ExternalLink, Info, Globe, BookOpen,
  Award, Star, TrendingUp, Building2, Rocket, GraduationCap, Briefcase,
  Baby, AlertTriangle, Target, Handshake, Flag, BadgeCheck, Timer, Coins,
  Plane, Quote, Scale, Landmark, Mail, Send, Home, CreditCard, Lock,
  FileSignature, Download, Calendar, UserCheck, Eye, Ban, Gavel, Bell,
  ArrowRight, Zap, Phone
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80";
const CERT_IMAGE = "https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=800&q=80";

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "€۴۷", label: "هزینه آنلاین", icon: "💶" },
  { value: "€۷۳", label: "هزینه حضوری", icon: "🏢" },
  { value: "۵", label: "روز کاری", icon: "📅" },
  { value: "۶ ماه", label: "اعتبار گواهی", icon: "⏳" },
];

// ==========================================
// STEPS
// ==========================================
const STEPS = [
  {
    n: "۰۱",
    icon: Globe,
    title: "ورود به پورتال رسمی",
    text: "به وب‌سایت رسمی oesterreich.gv.at مراجعه کرده و گزینه «Strafregisterbescheinigung» را انتخاب کنید.",
    color: "from-[#c8102e] to-[#970d22]",
    duration: "۱ دقیقه",
  },
  {
    n: "۰۲",
    icon: Lock,
    title: "احراز هویت دیجیتال",
    text: "با استفاده از ID Austria (پیش‌نیاز: ثبت‌نام اولیه در FinanzOnline یا پلیس) وارد حساب کاربری شوید.",
    color: "from-sky-500 to-blue-600",
    duration: "۵ دقیقه",
  },
  {
    n: "۰۳",
    icon: FileSignature,
    title: "تکمیل درخواست",
    text: "نوع گواهی (برای ارائه به کارفرما، سفارت یا مرجع خارجی) و دلیل درخواست را انتخاب کنید.",
    color: "from-amber-500 to-orange-600",
    duration: "۳ دقیقه",
  },
  {
    n: "۰۴",
    icon: CreditCard,
    title: "پرداخت آنلاین",
    text: "هزینه €۴۷ (در حالت آنلاین) را با کارت بانکی یا بانکداری الکترونیکی پرداخت کنید.",
    color: "from-emerald-500 to-teal-600",
    duration: "۲ دقیقه",
  },
  {
    n: "۰۵",
    icon: Download,
    title: "دریافت گواهی",
    text: "گواهی دیجیتال امضاشده (PDF) به‌صورت آنی در پورتال برای دانلود در دسترس قرار می‌گیرد.",
    color: "from-purple-500 to-indigo-600",
    duration: "آنی",
  },
  {
    n: "۰۶",
    icon: FileCheck,
    title: "نسخه چاپی رسمی",
    text: "در صورت نیاز، نسخه پستی نیز با امضای دیجیتال به آدرس شما ارسال می‌شود (۵ روز کاری).",
    color: "from-rose-500 to-pink-600",
    duration: "۵ روز",
  },
];

// ==========================================
// TYPES OF CERTIFICATE
// ==========================================
const CERTIFICATE_TYPES = [
  {
    icon: Briefcase,
    title: "برای کارفرمای اتریشی",
    desc: "گواهی ساده برای ارائه به کارفرما در حین استخدام. مبلغ €۴۷ (آنلاین) یا €۷۳ (حضوری).",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  {
    icon: Landmark,
    title: "برای مراجع رسمی داخلی",
    desc: "برای ارائه به اداره تابعیت، دادگاه یا سایر مراجع اتریشی. فرمت یکسان با نوع کارفرما.",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    icon: Plane,
    title: "برای سفارت‌های خارجی",
    desc: "برای ارائه به سفارتخانه، ویزا یا اقامت خارجی نیاز به تأییدیه Apostille یا Überbeglaubigung دارد.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    icon: Gavel,
    title: "برای استفاده رسمی حقوقی",
    desc: "گواهی تفصیلی با جزئیات کامل سابقه، تنها برای اهداف حقوقی خاص و با درخواست مستقیم دادگاه.",
    color: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
];

// ==========================================
// WHO NEEDS IT
// ==========================================
const WHO_NEEDS = [
  { icon: Briefcase, label: "کارفرمایان" },
  { icon: Home, label: "موجران" },
  { icon: Globe, label: "سفارت‌ها" },
  { icon: UserCheck, label: "اداره تابعیت" },
  { icon: GraduationCap, label: "دانشگاه‌ها" },
  { icon: Building2, label: "ادارات دولتی" },
];

// ==========================================
// REQUIREMENTS
// ==========================================
const REQUIREMENTS = [
  {
    icon: Lock,
    title: "ID Austria فعال",
    text: "برای درخواست آنلاین نیاز به حساب ID Austria فعال با احراز هویت دو مرحله‌ای دارید.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: MapPin,
    title: "اقامت قانونی در اتریش",
    text: "برای دریافت گواهی از اتریش، باید دارای اقامت قانونی ثبت‌شده در Meldeamt باشید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: CreditCard,
    title: "روش پرداخت معتبر",
    text: "کارت بانکی اتریشی (Bankomatkarte, Visa, Mastercard) یا حساب بانکی فعال.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Mail,
    title: "آدرس پستی صحیح",
    text: "برای دریافت نسخه فیزیکی، آدرس ثبت‌شده در سامانه Meldeamt باید به‌روز باشد.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// VALIDITY INFO
// ==========================================
const VALIDITY_INFO = [
  {
    icon: Clock,
    title: "۶ ماه اعتبار",
    text: "گواهی صادرشده معمولاً ۶ ماه از تاریخ صدور برای مصارف عمومی معتبر است.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Landmark,
    title: "برای سفارت: ۳ ماه",
    text: "برخی سفارت‌ها فقط گواهی‌های کمتر از ۳ ماه را می‌پذیرند. قبل از درخواست چک کنید.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: FileSignature,
    title: "Apostille جداگانه",
    text: "برای استفاده در خارج از اتریش، نیاز به تأییدیه Apostille از وزارت خارجه دارید.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Sparkles,
    title: "قابل تمدید نیست",
    text: "گواهی عدم سوءپیشینه قابل تمدید نیست؛ باید درخواست جدید ثبت کنید.",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "تفاوت درخواست آنلاین و حضوری چیست؟",
    a: "درخواست آنلاین از طریق oesterreich.gv.at با ID Austria فقط €۴۷ هزینه دارد و گواهی PDF آنی صادر می‌شود. درخواست حضوری در Bezirkshauptmannschaft یا Magistrat حدود €۷۳ هزینه دارد و معمولاً ۳ تا ۵ روز کاری زمان می‌برد. در هر دو حالت، نسخه فیزیکی با امضای رسمی صادر می‌شود.",
  },
  {
    q: "آیا خارجی‌های مقیم اتریش هم می‌توانند این گواهی را بگیرند؟",
    a: "بله، تمام افراد دارای اقامت قانونی در اتریش (صرف‌نظر از ملیت) می‌توانند Strafregisterbescheinigung درخواست کنند. تنها پیش‌نیاز، ثبت اقامت در Meldeamt و داشتن ID Austria است.",
  },
  {
    q: "چگونه مطمئن شوم گواهی من برای سفارت ایران معتبر است؟",
    a: "برای مصارف سفارت ایران، توصیه می‌شود: (۱) گواهی جدید کمتر از ۳ ماه، (۲) تأییدیه Apostille از وزارت خارجه اتریش (Bundesministerium für europäische und internationale Angelegenheiten)، (۳) ترجمه رسمی به فارسی توسط مترجم مورد تأیید سفارت. برخی سفارت‌ها ممکن است Überbeglaubigung بیشتری بخواهند.",
  },
  {
    q: "چرا گواهی عدم سوءپیشینه من ممکن است رد شود؟",
    a: "دلایل رایج رد: (۱) اقامت غیرقانونی یا بدون ثبت در Meldeamt، (۲) وجود محکومیت کیفری معتبر در سوابق اتریش، (۳) اطلاعات نادرست در فرم درخواست، (۴) عدم پرداخت هزینه. در صورت رد، می‌توانید درخواست تجدیدنظر (Beschwerde) ثبت کنید.",
  },
  {
    q: "آیا گواهی من شامل محکومیت‌های جزئی هم می‌شود؟",
    a: "بله، گواهی عدم سوءپیشینه اتریش شامل تمام محکومیت‌های ثبت‌شده در سامانه Strafregister است، مگر اینکه طبق قانون پس از گذشت مدت مشخصی از سابقه حذف (Tilgung) شده باشند. جریمه‌های اداری مانند تخلف رانندگی معمولاً در این گواهی ذکر نمی‌شوند.",
  },
  {
    q: "برای انجام کار داوطلبانه با کودکان چه گواهی خاصی لازم است؟",
    a: "برای کار با کودکان یا افراد آسیب‌پذیر، علاوه بر گواهی عدم سوءپیشینه عادی، ممکن است نیاز به «Erweiterte Strafregisterbescheinigung» (گواهی تفصیلی) باشد که از طریق سازمان مربوطه درخواست می‌شود.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const CriminalRecordGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل گواهی عدم سوءپیشینه در اتریش ۲۰۲۶",
      description:
        "آموزش گام‌به‌گام درخواست آنلاین و حضوری Strafregisterbescheinigung در اتریش، هزینه‌ها، مدارک و تأییدیه Apostille برای سفارت‌ها.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
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
      name: "مراحل دریافت گواهی عدم سوءپیشینه در اتریش",
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
        title="گواهی عدم سوءپیشینه اتریش ۲۰۲۶ | Strafregisterbescheinigung راهنمای کامل"
        description="راهنمای گام‌به‌گام دریافت گواهی عدم سوءپیشینه (Strafregisterbescheinigung) در اتریش: هزینه €۴۷ آنلاین، مراحل ID Austria، تأییدیه Apostille برای سفارت‌ها و شرایط دریافت."
        keywords="گواهی عدم سوءپیشینه اتریش, Strafregisterbescheinigung, عدم سوءپیشینه وین, گواهی سوءپیشینه سفارت, Apostille اتریش, ID Austria, oesterreich.gv.at, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="min-h-screen bg-stone-50 font-sans" dir="rtl">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
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
                alt="گواهی عدم سوءپیشینه اتریش"
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              🛡️
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
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  Strafregisterbescheinigung 2026
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  راهنمای کامل گواهی عدم سوءپیشینه
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  هر آنچه برای دریافت گواهی عدم سوءپیشینه (Führungszeugnis) در
                  اتریش نیاز دارید — از درخواست آنلاین با ID Austria و هزینه €۴۷
                  تا دریافت تأییدیه Apostille برای سفارت‌ها و مراجع خارجی.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>راهنمای گام‌به‌گام</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>منابع رسمی دولتی</span>
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
                  src={CERT_IMAGE}
                  alt="گواهی رسمی اتریش"
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
                <BadgeCheck className="w-6 h-6 mb-1" />
                <div className="text-[10px] font-black opacity-80">اتریش</div>
                <div className="text-xs font-black">گواهی رسمی</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
                <Info className="w-3.5 h-3.5" />
                مقدمه
              </div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
                گواهی عدم سوءپیشینه چیست؟
              </h2>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                گواهی عدم سوءپیشینه (Strafregisterbescheinigung) سندی رسمی است
                که نشان می‌دهد شما در سوابق کیفری اتریش محکومیت معتبری ندارید.
                این گواهی معمولاً برای استخدام، اجاره مسکن، درخواست اقامت،
                ویزا یا ارائه به سفارت‌ها استفاده می‌شود.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Timer, text: "صدور در ۵ روز کاری" },
                  { icon: CreditCard, text: "پرداخت آنلاین" },
                  { icon: Download, text: "دانلود PDF آنی" },
                  { icon: ShieldCheck, text: "امضای دیجیتال رسمی" },
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
          {/* CERTIFICATE TYPES */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                انواع گواهی و موارد استفاده
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                بر اساس هدف شما، نوع گواهی و مراحل متفاوت است
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATE_TYPES.map((v, i) => {
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
                      {v.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* WHO NEEDS IT */}
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
                <Users className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-stone-900 mb-2">
                  چه کسانی به این گواهی نیاز دارند؟
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                  گواهی عدم سوءپیشینه در موقعیت‌های متعددی درخواست می‌شود. در
                  ادامه به برخی از رایج‌ترین موارد اشاره می‌کنیم:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {WHO_NEEDS.map((item, i) => {
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
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* STEPS TIMELINE */}
          {/* ========================================== */}
          <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                مراحل گام‌به‌گام دریافت گواهی
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                شش گام کلیدی از ورود به پورتال تا دریافت گواهی رسمی
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
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                      {s.text}
                    </p>
                    <div className="relative inline-flex items-center gap-1 text-[9px] font-black text-[#c8102e] bg-rose-50 px-2 py-0.5 rounded-full">
                      <Clock className="w-2.5 h-2.5" />
                      {s.duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* REQUIREMENTS */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                پیش‌نیازها و مدارک
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار پیش‌نیاز اساسی قبل از ثبت درخواست
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {REQUIREMENTS.map((v, i) => {
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
          {/* VALIDITY INFO */}
          {/* ========================================== */}
          <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                اعتبار و تأییدیه‌ها
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                نکات مهم درباره اعتبار زمانی و تأییدیه‌های بین‌المللی
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {VALIDITY_INFO.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl border border-stone-200 p-5 relative overflow-hidden group"
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-stone-900 text-xs mb-1.5">
                      {v.title}
                    </h3>
                    <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                      {v.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* APOSTILLE INFO */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <Landmark className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-stone-900 mb-2">
                  تأییدیه Apostille برای مصارف خارج از اتریش
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                  اگر می‌خواهید گواهی خود را به سفارت، دانشگاه یا مرجع خارجی ارائه
                  دهید، معمولاً نیاز به تأییدیه Apostille از وزارت امور خارجه
                  اتریش (BMEIA) دارید. این تأییدیه اعتبار بین‌المللی گواهی شما
                  را تضمین می‌کند.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { icon: Landmark, title: "مرجع صدور", desc: "Bundesministerium für europäische und internationale Angelegenheiten (BMEIA)" },
                    { icon: Coins, title: "هزینه", desc: "حدود €۴۰ برای هر گواهی" },
                    { icon: Clock, title: "زمان پردازش", desc: "معمولاً ۳ تا ۵ روز کاری" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-100"
                      >
                        <Icon className="w-5 h-5 text-amber-600 mb-2" />
                        <div className="text-[10px] font-black text-amber-800 mb-1">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-stone-600 font-bold leading-relaxed">
                          {item.desc}
                        </div>
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
                پاسخ به پرتکرارترین سوالات درباره گواهی عدم سوءپیشینه
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
            className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-3xl p-6 flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-black text-rose-900 text-sm mb-1.5">
                هشدارهای مهم
              </h5>
              <ul className="text-[11px] text-rose-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>گواهی صادرشده از اتریش <strong>فقط محکومیت‌های ثبت‌شده در اتریش</strong> را نشان می‌دهد، نه سابقه بین‌المللی.</li>
                <li>اطلاعات نادرست در فرم درخواست می‌تواند منجر به رد گواهی یا پیگرد قانونی شود.</li>
                <li>در صورت داشتن محکومیت معتبر، گواهی صادر <strong>ممکن است موارد را ذکر کند</strong> یا از صدور خودداری شود.</li>
                <li>هیچ واسطه‌ای نمی‌تواند گواهی را سریع‌تر از مسیر رسمی صادر کند — مراقب کلاهبرداران باشید.</li>
              </ul>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* OFFICIAL LINKS */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <Globe className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-stone-900 mb-2">
                  پورتال‌های رسمی دولتی
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                  برای ثبت درخواست و اطلاعات رسمی، از این منابع استفاده کنید:
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.oesterreich.gv.at"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                  >
                    <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    oesterreich.gv.at
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href="https://www.bmeia.gv.at"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                  >
                    <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    BMEIA (Apostille)
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  </a>
                </div>

                <p className="text-[10px] text-stone-500 font-bold mt-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  تمام خدمات از طریق پورتال‌های رسمی دولتی اتریش ارائه می‌شود
                </p>
              </div>
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
                همراه شما در مسیر اداری
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">
                سوالی درباره گواهی عدم سوءپیشینه دارید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                اگر در مراحل درخواست، اخذ تأییدیه Apostille یا ارائه به سفارت
                سوالی دارید، تیم اتریش‌نشین آماده کمک رایگان به شماست.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Users className="w-4 h-4" />
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
              <h5 className="font-black text-amber-900 text-xs mb-1">
                یادآوری مهم
              </h5>
              <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
                اطلاعات این راهنما صرفاً جنبه آموزشی دارد و جایگزین مشاوره حقوقی
                رسمی نیست. قوانین صدور گواهی عدم سوءپیشینه ممکن است تغییر کنند و
                شرایط هر پرونده متفاوت است. برای تصمیم‌های نهایی، همیشه با منابع
                رسمی مانند oesterreich.gv.at یا وکلای واجد شرایط مشورت کنید.
                اتریش‌نشین هیچ مسئولیتی در قبال تصمیمات مبتنی بر این اطلاعات نمی‌پذیرد.
              </p>
            </div>
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

export default CriminalRecordGuide;