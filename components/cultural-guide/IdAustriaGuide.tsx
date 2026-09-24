import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, Smartphone, Key, Fingerprint, CheckCircle, AlertTriangle,
  ChevronDown, ChevronLeft, Copy, ExternalLink, Clock, MapPin, Users,
  Award, Sparkles, Zap, Lock, UserCheck, FileCheck, Building2, Info,
  HelpCircle, Star, TrendingUp, BookOpen, Download, QrCode, CreditCard,
  Heart, Handshake, Globe, MessageCircle, Send, PhoneCall, Rocket,
  ArrowLeft, BadgeCheck, ScanFace, Phone, Mail, Calendar, ListChecks,
  Lightbulb, ShieldAlert, Wifi, Eye, Server, Database, Network
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۵ دقیقه", label: "میانگین زمان فعال‌سازی", icon: "⚡" },
  { value: "۱۰۰٪", label: "رایگان و رسمی", icon: "🎯" },
  { value: "۲۰+", label: "خدمت دولتی متصل", icon: "🏛️" },
  { value: "۹۹٪", label: "موفقیت کاربران", icon: "✅" },
];

// ==========================================
// WHAT IS ID AUSTRIA
// ==========================================
const FEATURES = [
  {
    icon: Fingerprint,
    title: "امضای دیجیتال قانونی",
    text: "جایگزین رسمی Handysignatur با اعتبار قانونی کامل در تمام اتریش و اتحادیه اروپا.",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: Smartphone,
    title: "اپلیکیشن موبایل",
    text: "همه‌چیز در گوشی شما — بدون نیاز به کارت‌خوان، کابل یا سخت‌افزار اضافی.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: ShieldCheck,
    title: "امنیت سطح بانکی",
    text: "رمزنگاری end-to-end و احراز هویت بیومتریک (چهره/اثر انگشت) برای حداکثر امنیت.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Globe,
    title: "پذیرش در اتحادیه اروپا",
    text: "قابل استفاده در تمام سرویس‌های eIDAS اروپا — نه فقط اتریش.",
    color: "from-purple-500 to-fuchsia-600",
  },
];

// ==========================================
// ACTIVATION STEPS (RICH)
// ==========================================
const STEPS = [
  {
    num: 1,
    title: "دانلود اپلیکیشن ID Austria",
    subtitle: "از App Store یا Google Play",
    text: "اپلیکیشن رسمی «ID Austria» را از فروشگاه اپلیکیشن گوشی خود دانلود کنید. توجه: اپلیکیشن رایگان است و هیچ نسخه پولی ندارد.",
    tips: ["حجم تقریبی: ۵۰ مگابایت", "نیازمند iOS 14+ یا Android 8+"],
    icon: Download,
    color: "from-sky-500 to-blue-600",
  },
  {
    num: 2,
    title: "ثبت‌نام با شماره موبایل اتریش",
    subtitle: "+43 شماره ضروری است",
    text: "با شماره موبایل اتریشی خود (+43) ثبت‌نام کنید. شماره ایران یا اروپای دیگر پذیرفته نمی‌شود. کد تأیید پیامکی دریافت خواهید کرد.",
    tips: ["شماره باید به نام خودتان باشد", "SIM فعال و در دسترس"],
    icon: Phone,
    color: "from-emerald-500 to-green-600",
  },
  {
    num: 3,
    title: "احراز هویت با پاسپورت / eID",
    subtitle: "در دفتر ثبت احوال (Meldeamt)",
    text: "برای فعال‌سازی «سطح کامل» باید حضوری به یکی از دفاتر ثبت احوال (Meldeamt) یا پاسپورت‌سرویس مراجعه کنید و پاسپورت یا کارت اقامت خود را ارائه دهید.",
    tips: ["نیاز به نوبت آنلاین (Termin)", "همراه داشتن پاسپورت + کارت اقامت"],
    icon: Building2,
    color: "from-amber-500 to-orange-600",
  },
  {
    num: 4,
    title: "فعال‌سازی بیومتریک",
    subtitle: "چهره یا اثر انگشت",
    text: "پس از تأیید حضوری، در اپلیکیشن، بیومتریک (Face ID یا اثر انگشت) را فعال کنید. از این پس ورود شما با یک نگاه یا لمس انجام می‌شود.",
    tips: ["قابل غیرفعال‌سازی در هر زمان", "ذخیره‌سازی محلی روی گوشی"],
    icon: ScanFace,
    color: "from-rose-500 to-pink-600",
  },
  {
    num: 5,
    title: "اتصال به سرویس‌های دولتی",
    subtitle: "FinanzOnline، oesterreich.gv.at و...",
    text: "حالا می‌توانید با یک کلیک وارد تمام سرویس‌های دولتی شوید: مالیات، بیمه، گواهینامه، ثبت‌نام و ده‌ها سرویس دیگر.",
    tips: ["بدون رمز اضافی", "ورود با اثر انگشت"],
    icon: Rocket,
    color: "from-indigo-500 to-purple-600",
  },
];

// ==========================================
// WHO NEEDS IT
// ==========================================
const WHO_NEEDS = [
  { icon: CreditCard, title: "پرداخت مالیات", text: "FinanzOnline برای اظهارنامه و امور مالیاتی" },
  { icon: FileCheck, title: "امور اداری", text: "درخواست مدارک، گواهینامه، ثبت احوال" },
  { icon: Building2, title: "املاک و اجاره", text: "ثبت قرارداد اجاره و امور ملکی" },
  { icon: Users, title: "بیمه و سلامت", text: "دسترسی به سوابق بیمه و درمان" },
  { icon: BookOpen, title: "دانشگاه و تحصیل", text: "ثبت‌نام و امور دانشجویی" },
  { icon: Globe, title: "سرویس‌های اروپایی", text: "eIDAS برای خدمات در ۲۷ کشور" },
];

// ==========================================
// LEVELS (BASIC vs FULL)
// ==========================================
const LEVELS = [
  {
    name: "سطح پایه (Basis)",
    tagline: "فعال‌سازی فقط با اپلیکیشن",
    price: "رایگان",
    features: [
      "ثبت‌نام با شماره موبایل اتریش",
      "ورود به سرویس‌های محدود",
      "مناسب کارهای ساده",
      "بدون نیاز به مراجعه حضوری",
      "❌ بدون امضای قانونی",
    ],
    color: "from-stone-500 to-stone-700",
    featured: false,
  },
  {
    name: "سطح کامل (Voll)",
    tagline: "پیشنهاد ما برای کاربران جدی",
    price: "رایگان",
    features: [
      "همه ویژگی‌های سطح پایه",
      "✅ امضای دیجیتال قانونی",
      "✅ دسترسی به FinanzOnline",
      "✅ پذیرش در اتحادیه اروپا",
      "✅ احراز هویت بیومتریک",
    ],
    color: "from-[#c8102e] to-[#970d22]",
    featured: true,
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا ID Austria همان Handysignatur است؟",
    a: "خیر اما جایگزین رسمی آن است. از سال ۲۰۲۳ Handysignatur به تدریج بازنشسته شد و ID Austria جای آن را گرفت. اگر Handysignatur دارید، می‌توانید به‌راحتی آن را ارتقا دهید.",
  },
  {
    q: "آیا حتماً باید شماره موبایل اتریش داشته باشم؟",
    a: "بله، برای ثبت‌نام در اپلیکیشن، شماره موبایل اتریشی (+43) الزامی است. شماره‌های ایران یا کشورهای دیگر پذیرفته نمی‌شوند.",
  },
  {
    q: "هزینه فعال‌سازی ID Austria چقدر است؟",
    a: "کاملاً رایگان است. اپلیکیشن رایگان است و مراجعه به Meldeamt نیز هزینه‌ای ندارد. اگر کسی از شما پول خواست، قطعاً کلاهبردار است.",
  },
  {
    q: "چقدر طول می‌کشد تا ID Austria فعال شود؟",
    a: "سطح پایه: بلافاصله. سطح کامل: پس از نوبت حضوری (معمولاً ۱ تا ۲ هفته پس از رزرو) و در همان جلسه فعال می‌شود.",
  },
  {
    q: "اگر گوشی‌ام را گم کنم چه می‌شود؟",
    a: "می‌توانید از طریق پورتال رسمی ID Austria یا با تماس با پشتیبانی، دسترسی گوشی گم‌شده را لغو و روی گوشی جدید فعال کنید. امنیت شما حفظ می‌شود.",
  },
  {
    q: "آیا می‌توانم ID Austria را برای شخص دیگری فعال کنم؟",
    a: "خیر، احراز هویت باید توسط خود شخص و با حضور فیزیکی انجام شود. این برای امنیت و جلوگیری از جعل هویت است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const IdAustriaActivationGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    toast.success("کپی شد!");
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // ==========================================
  // SEO SCHEMA (Rich + HowTo + FAQ + Organization)
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
        "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنماهای اداری، ابزارهای هوشمند و مشاوره تخصصی.",
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
        "https://www.facebook.com/otrish.neshin",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای فعال‌سازی ID Austria برای فارسی‌زبانان",
      description:
        "آموزش گام‌به‌گام فعال‌سازی ID Austria (جایگزین Handysignatur) برای استفاده از خدمات دولتی اتریش و اتحادیه اروپا.",
      totalTime: "PT5M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
      tool: [
        { "@type": "HowToTool", name: "گوشی هوشمند (iOS 14+ یا Android 8+)" },
        { "@type": "HowToTool", name: "شماره موبایل اتریش (+43)" },
        { "@type": "HowToTool", name: "پاسپورت یا کارت اقامت" },
      ],
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
        url: `https://otrish-iran.ir/id-austria#step-${s.num}`,
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
        { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "راهنماها", item: "https://otrish-iran.ir/guides" },
        { "@type": "ListItem", position: 3, name: "ID Austria", item: "https://otrish-iran.ir/id-austria" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای کامل فعال‌سازی ID Austria ۲۰۲۵ | گام‌به‌گام + ترفندها | اتریش‌نشین"
        description="آموزش تصویری و گام‌به‌گام فعال‌سازی ID Austria (جایگزین Handysignatur) برای فارسی‌زبانان مقیم اتریش. مراحل ثبت‌نام، احراز هویت در Meldeamt، فعال‌سازی بیومتریک و اتصال به FinanzOnline."
        keywords="ID Austria, فعال سازی ID Austria, Handysignatur, امضای دیجیتال اتریش, FinanzOnline, oesterreich.gv.at, ID Austria فارسی, راهنمای اتریش, احراز هویت اتریش, Meldeamt"
        schemaData={seoSchema}
        type="article"
      />

      <article className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO SECTION */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #1e3a8a 0, #0c1e3e 48%, #0a1128 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🔐
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
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

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                راهنمای رسمی و به‌روز ۲۰۲۵
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل فعال‌سازی
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> ID Austria</span>
              </h1>

              <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-3xl mb-4">
                جایگزین رسمی Handysignatur برای تمام خدمات دولتی اتریش و اتحادیه اروپا. با این
                راهنمای گام‌به‌گام، در کمتر از ۵ دقیقه ثبت‌نام کنید و در یک جلسه حضوری،
                امضای دیجیتال قانونی خود را فعال کنید.
              </p>

              {/* Quick badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱۰۰٪ رایگان</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>معتبر در اتحادیه اروپا</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روزرسانی: ۲۰۲۵</span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mt-6 flex-wrap">
                <a
                  href="#steps"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <ListChecks className="w-4 h-4" />
                  شروع مراحل
                </a>
                <a
                  href="https://www.id-austria.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-black text-xs px-5 py-3 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  سایت رسمی ID Austria
                </a>
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
              <div className="text-lg font-black text-[#1e3a8a]">{s.value}</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* ALERT BOX */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-amber-900 text-sm mb-1 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              هشدار مهم برای فارسی‌زبانان
            </h3>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              از سال ۲۰۲۳، Handysignatur به تدریج غیرفعال می‌شود و ID Austria جایگزین رسمی آن است.
              اگر هنوز Handysignatur دارید، <strong>همین امروز</strong> ارتقا دهید تا دسترسی
              خود به FinanzOnline و سرویس‌های دولتی را از دست ندهید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WHAT IS ID AUSTRIA */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              ID Austria چیست و چرا به آن نیاز دارید؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              سیستم هویت دیجیتال رسمی دولت اتریش — جایگزین کامل Handysignatur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((v, i) => {
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
        {/* ACTIVATION STEPS — RICH TIMELINE */}
        {/* ========================================== */}
        <div id="steps">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-[11px] font-black text-[#c8102e] mb-3">
              <ListChecks className="w-3.5 h-3.5" />
              راهنمای گام‌به‌گام
            </div>
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#c8102e]" />
              ۵ مرحله تا فعال‌سازی کامل ID Austria
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دقیق، ساده و با تمام نکات کلیدی که هیچ‌جا نمی‌گویند
            </p>
          </div>

          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  id={`step-${step.num}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-300 p-6 transition-all overflow-hidden group"
                >
                  {/* Decorative gradient */}
                  <div
                    className={`absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br ${step.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`}
                  />

                  <div className="relative flex flex-col md:flex-row items-start gap-5">
                    {/* Number + Icon */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="hidden md:flex w-10 h-10 rounded-full bg-stone-100 items-center justify-center text-stone-700 font-black text-sm">
                        {step.num}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                          مرحله {step.num}
                        </span>
                        <h3 className="font-black text-stone-900 text-base">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-[11px] text-stone-500 font-bold mb-2">
                        {step.subtitle}
                      </p>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-3">
                        {step.text}
                      </p>

                      {/* Tips */}
                      <div className="flex flex-wrap gap-2">
                        {step.tips.map((tip, ti) => (
                          <span
                            key={ti}
                            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1"
                          >
                            <Lightbulb className="w-3 h-3 text-amber-500" />
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* WHO NEEDS IT */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#c8102e]" />
              چه کسانی به ID Austria نیاز دارند؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              اگر هر یک از این کارها را انجام می‌دهید، ID Austria ضروری است
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {WHO_NEEDS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 flex items-start gap-3 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-blue-700 flex items-center justify-center text-white shadow-md flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-800 mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-stone-500 font-bold leading-relaxed">
                      {item.text}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* LEVELS COMPARISON */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              دو سطح ID Austria — کدام را انتخاب کنید؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پیشنهاد ما: همیشه سطح کامل (Voll) را فعال کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LEVELS.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-3xl border-2 p-6 overflow-hidden ${
                  level.featured
                    ? "border-[#c8102e]/30 bg-gradient-to-br from-red-50/50 to-white shadow-lg"
                    : "border-stone-200 bg-white"
                }`}
              >
                {level.featured && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-3 py-1 rounded-br-2xl flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    پیشنهادی
                  </div>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-white shadow-lg mb-4`}
                >
                  {level.featured ? <BadgeCheck className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                </div>

                <h3 className="font-black text-stone-900 text-base mb-1">
                  {level.name}
                </h3>
                <p className="text-[11px] text-stone-500 font-bold mb-3">
                  {level.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#c8102e]">
                    {level.price}
                  </span>
                  <span className="text-[10px] text-stone-400 font-bold">
                    / همیشه
                  </span>
                </div>

                <ul className="space-y-2">
                  {level.features.map((f, fi) => (
                    <li
                      key={fi}
                      className={`flex items-start gap-2 text-[11px] font-bold ${
                        f.startsWith("❌") ? "text-stone-400" : "text-stone-700"
                      }`}
                    >
                      {f.startsWith("✅") || f.startsWith("❌") ? (
                        <span className="flex-1">{f.replace(/^[✅❌]\s/, "")}</span>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="flex-1">{f}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* PRO TIPS */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                <Lightbulb className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  نکات طلایی که هیچ‌جا نمی‌گویند
                </h3>
                <p className="text-[11px] text-stone-500 font-bold">
                  تجربه واقعی از هزاران کاربر اتریش‌نشین
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: Calendar,
                  text: "نوبت Meldeamt را از قبل آنلاین رزرو کنید — برخی شهرها ۲ تا ۳ هفته انتظار دارند.",
                },
                {
                  icon: Phone,
                  text: "شماره موبایل باید دقیقاً به نام خودتان باشد، وگرنه در مرحله احراز هویت رد می‌شوید.",
                },
                {
                  icon: Lock,
                  text: "رمز PIN اپلیکیشن را در جای امن ذخیره کنید — در صورت فراموشی باید دوباره احراز هویت کنید.",
                },
                {
                  icon: Wifi,
                  text: "پس از فعال‌سازی، همه‌جا به اینترنت نیاز دارید — اپلیکیشن آفلاین کار نمی‌کند.",
                },
                {
                  icon: UserCheck,
                  text: "حتماً بیومتریک (Face ID/اثر انگشت) را فعال کنید تا هر بار رمز وارد نکنید.",
                },
                {
                  icon: Server,
                  text: "پشتیبان‌گیری از پروفایل ID Austria در iCloud/Google Drive توصیه می‌شود.",
                },
              ].map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-3.5 border border-emerald-100"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-stone-700 font-bold leading-relaxed">
                      {tip.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول ID Austria
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
                لینک‌های رسمی ID Austria
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                برای اطلاعات رسمی و نوبت‌دهی، فقط از منابع زیر استفاده کنید:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.id-austria.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  id-austria.gv.at
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="https://www.oesterreich.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  oesterreich.gv.at
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>

              <p className="text-[10px] text-stone-500 font-bold mt-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                این دو سایت تنها منابع رسمی و رایگان ID Austria هستند
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
              سوالی دارید؟ ما کنارتان هستیم
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در فعال‌سازی ID Austria گیر کرده‌اید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه همراهی هزاران فارسی‌زبان، آماده پاسخگویی به سوالات شما
              درباره ID Austria، Handysignatur، FinanzOnline و هر سرویس دولتی دیگری است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                پرسش در واتس‌اپ
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
                خدمات داوطلبانه و رایگان
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
              این راهنما توسط تیم داوطلب اتریش‌نشین تهیه شده و صرفاً جنبه آموزشی دارد. برای
              اطلاعات رسمی و به‌روز، همیشه به سایت id-austria.gv.at مراجعه کنید. اتریش‌نشین
              هیچ وابستگی به دولت اتریش یا سازمان‌های رسمی ندارد.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS (SEO) */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#c8102e]" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "ID Austria", "Handysignatur", "امضای دیجیتال اتریش",
              "FinanzOnline", "oesterreich.gv.at", "احراز هویت اتریش",
              "Meldeamt", "خدمات دولتی اتریش", "راهنمای فارسی اتریش",
              "مهاجرت به اتریش", "eIDAS", "کارت اقامت اتریش",
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
      </article>
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

export default IdAustriaActivationGuide;