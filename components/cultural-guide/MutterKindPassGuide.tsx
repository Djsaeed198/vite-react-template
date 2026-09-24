import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, Baby, Stethoscope, Calendar, CheckCircle, Clock, AlertTriangle,
  ChevronDown, Info, Award, ShieldCheck, Sparkles, Star, FileCheck,
  Syringe, Activity, Users, MapPin, MessageCircle,
  Send, ChevronLeft, ClipboardCheck, HeartPulse, Ruler, Weight,
  Microscope, Building2, Rocket, ExternalLink, Flag, BookOpen,
  BadgeCheck, TrendingUp, Quote, Phone, Eye, Brain, Utensils,
  GraduationCap, Home, Zap
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Unsplash (stable, high quality)
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1600&q=85&auto=format&fit=crop",
  motherBaby: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=85&auto=format&fit=crop",
  checkup: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85&auto=format&fit=crop",
  pregnancy: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&q=85&auto=format&fit=crop",
};

// ==========================================
// PREGNANCY EXAMINATIONS (5 مرحله)
// ==========================================
const PREGNANCY_EXAMS = [
  {
    step: 1,
    title: "معاینه اول بارداری",
    window: "هفته ۸ تا ۱۶",
    icon: HeartPulse,
    color: "from-rose-500 to-pink-600",
    items: [
      "تأیید بارداری و تعیین سن دقیق جنین",
      "آزمایش خون و ادرار اولیه",
      "بررسی گروه خونی، Rh و بیماری‌های عفونی",
      "تشکیل پرونده Mutter-Kind-Pass در مطب",
    ],
  },
  {
    step: 2,
    title: "معاینه دوم",
    window: "هفته ۱۷ تا ۲۰",
    icon: Stethoscope,
    color: "from-amber-500 to-orange-600",
    items: [
      "شنیدن صدای قلب جنین",
      "بررسی رشد رحم",
      "آزمایش‌های تکمیلی خون",
      "شروع مکمل‌های لازم (اسید فولیک / آهن)",
    ],
  },
  {
    step: 3,
    title: "معاینه سوم",
    window: "هفته ۲۱ تا ۲۴",
    icon: Microscope,
    color: "from-emerald-500 to-teal-600",
    items: [
      "سونوگرافی دقیق آناتومی جنین",
      "بررسی ارگان‌های حیاتی نوزاد",
      "غربالگری قند خون (OGTT)",
      "اندازه‌گیری دقیق ضربان قلب",
    ],
  },
  {
    step: 4,
    title: "معاینه چهارم",
    window: "هفته ۲۵ تا ۲۸",
    icon: Activity,
    color: "from-sky-500 to-blue-600",
    items: [
      "پایش رشد جنین",
      "بررسی موقعیت جفت",
      "کنترل وزن و فشار خون مادر",
      "مشاوره تغذیه و سبک زندگی",
    ],
  },
  {
    step: 5,
    title: "معاینه پنجم",
    window: "هفته ۲۹ تا ۳۲",
    icon: Heart,
    color: "from-purple-500 to-indigo-600",
    items: [
      "آمادگی برای زایمان",
      "بررسی سلامت عمومی مادر",
      "تعیین وضعیت قرارگیری نوزاد",
      "آموزش علائم هشدار دهنده",
    ],
  },
];

// ==========================================
// CHILD EXAMINATIONS (10 مرحله)
// ==========================================
const CHILD_EXAMS = [
  { step: "نوزادی", title: "معاینه بدو تولد", window: "بلافاصله پس از زایمان", icon: Baby, items: "آپگار، بازتاب‌ها، تنفس، رنگ پوست، معاینه کامل بدنی" },
  { step: "۱", title: "معاینه هفته اول", window: "هفته اول زندگی", icon: HeartPulse, items: "غربالگری متابولیک، بررسی زردی، تغذیه با شیر مادر" },
  { step: "۲", title: "معاینه ۱-۲ ماهگی", window: "ماه اول تا دوم", icon: Eye, items: "واکسیناسیون شش‌گانه، رشد شنوایی و بینایی" },
  { step: "۳", title: "معاینه ۳-۴ ماهگی", window: "ماه سوم تا چهارم", icon: Brain, items: "کنترل گردن‌گیری، واکنش به محرک‌ها، واکسن‌های دور دوم" },
  { step: "۴", title: "معاینه ۷-۸ ماهگی", window: "ماه هفتم تا هشتم", icon: Ruler, items: "نشستن، غلت زدن، شروع غذای کمکی" },
  { step: "۵", title: "معاینه ۱۰-۱۲ ماهگی", window: "حدود ۱ سالگی", icon: Weight, items: "ایستادن با کمک، واکسن MMR، کنجکاوی حرکتی" },
  { step: "۶", title: "معاینه ۱۵-۱۸ ماهگی", window: "حدود ۱.۵ سالگی", icon: Utensils, items: "راه رفتن، اولین کلمات، استقلال در غذا خوردن" },
  { step: "۷", title: "معاینه ۲ سالگی", window: "۲۲ تا ۲۶ ماه", icon: Users, items: "ارتباط اجتماعی، بازی موازی، رشد زبانی" },
  { step: "۸", title: "معاینه ۳ سالگی", window: "۳۴ تا ۳۸ ماه", icon: GraduationCap, items: "جمله‌سازی، مهارت حرکتی، آمادگی مهدکودک" },
  { step: "۹", title: "معاینه ۴ سالگی", window: "۴۶ تا ۵۰ ماه", icon: Home, items: "آمادگی مدرسه، شنوایی و بینایی دقیق" },
  { step: "۱۰", title: "معاینه ۵ سالگی", window: "۵۸ تا ۶۲ ماه", icon: BadgeCheck, items: "معاینه نهایی قبل از مدرسه، ارزیابی جامع رشد" },
];

// ==========================================
// BENEFITS / WHY IT MATTERS
// ==========================================
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "الزامی برای Kinderbetreuungsgeld",
    text: "بدون تکمیل ۵ معاینه بارداری و ۵ معاینه اول کودک، دریافت کمک‌هزینه فرزند قطع یا کاهش می‌یابد.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Stethoscope,
    title: "تشخیص زودهنگام",
    text: "شناسایی سریع اختلالات رشد، شنوایی، بینایی و تکامل کودک در مراحل قابل درمان.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: FileCheck,
    title: "سند پزشکی رسمی",
    text: "دفترچه به‌عنوان پرونده سلامت دائمی کودک نزد والدین باقی می‌ماند و در مدرسه و پزشکان آینده کاربرد دارد.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "آرامش خاطر والدین",
    text: "برنامه زمان‌بندی مشخص از بارداری تا ۵ سالگی، بدون نگرانی از فراموشی معاینات حیاتی.",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "دفترچه مادر و کودک (Mutter-Kind-Pass) چیست؟",
    a: "یک دفترچه رسمی اتریشی که پرونده سلامت مادر در دوران بارداری و کودک تا ۵ سالگی را ثبت می‌کند. شامل ۵ معاینه بارداری و ۱۰ معاینه کودک است.",
  },
  {
    q: "آیا معاینات Mutter-Kind-Pass اجباری است؟",
    a: "بله — برای دریافت کامل Kinderbetreuungsgeld (کمک‌هزینه فرزند) و همچنین برای برخی مدارک بیمه، تکمیل معاینات الزامی است.",
  },
  {
    q: "هزینه معاینات چقدر است؟",
    a: "برای افراد تحت پوشش بیمه ÖGK و سایر صندوق‌های بیمه اتریش، معاینات Mutter-Kind-Pass معمولاً رایگان یا با فرانشیز ناچیز انجام می‌شود.",
  },
  {
    q: "اگر معاینه‌ای را از دست بدهم چه می‌شود؟",
    a: "در برخی موارد ممکن است بخشی از کمک‌هزینه کسر شود. باید سریعاً با پزشک زنان یا Kinderarzt تماس بگیرید و معاینه از دست رفته را در نزدیک‌ترین بازه انجام دهید.",
  },
  {
    q: "دفترچه را از کجا تهیه کنم؟",
    a: "معمولاً پزشک متخصص زنان یا Allgemeinmediziner در اولین ویزیت بارداری آن را صادر می‌کند. نسخه دیجیتال نیز از طریق ELGA قابل دسترسی است.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const MutterKindPassGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openChild, setOpenChild] = useState<number | null>(0);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل دفترچه مادر و کودک (Mutter-Kind-Pass) در اتریش",
      description:
        "همه‌چیز درباره Mutter-Kind-Pass اتریش: ۵ معاینه بارداری، ۱۰ معاینه کودک، الزامات Kinderbetreuungsgeld و پاسخ به سوالات متداول فارسی‌زبانان.",
      image: IMAGES.hero,
      inLanguage: "fa",
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
      about: [
        { "@type": "Thing", name: "Mutter-Kind-Pass" },
        { "@type": "Thing", name: "Kinderbetreuungsgeld" },
        { "@type": "Thing", name: "سلامت مادر و کودک اتریش" },
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
        { "@type": "ListItem", position: 1, name: "اتریش‌نشین", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "راهنماها", item: "https://otrish-iran.ir/guides" },
        { "@type": "ListItem", position: 3, name: "دفترچه مادر و کودک" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای کامل دفترچه مادر و کودک (Mutter-Kind-Pass) اتریش | ۵+۱۰ معاینه اجباری"
        description="راهنمای جامع فارسی Mutter-Kind-Pass اتریش: ۵ معاینه دوران بارداری، ۱۰ معاینه کودک تا ۵ سالگی، الزام Kinderbetreuungsgeld، هزینه‌ها و سوالات متداول. به‌روز و کاربردی."
        keywords="Mutter-Kind-Pass, دفترچه مادر و کودک اتریش, معاینات بارداری اتریش, Kinderbetreuungsgeld, معاینه کودک اتریش, پزشک زنان وین, Persian Austria, اتریش نشین"
        schemaData={seoSchema}
        image={IMAGES.hero}
      />

      <div className="space-y-8 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white min-h-[420px]"
        >
          <img
            src={IMAGES.hero}
            alt="مادر باردار در حال معاینه پزشکی در اتریش — راهنمای Mutter-Kind-Pass"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(30,15,12,0.92) 0%, rgba(90,15,25,0.80) 45%, rgba(30,15,12,0.55) 100%)",
            }}
          />
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/25 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end h-full min-h-[420px]">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                راهنمای رسمی ۲۰۲۵
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-[11px] font-black backdrop-blur-sm">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-300" />
                مطابق آخرین قوانین ÖGK
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 max-w-3xl">
              راهنمای کامل{" "}
              <span className="text-amber-300">دفترچه مادر و کودک</span>{" "}
              در اتریش
            </h1>

            <p className="text-sm md:text-base text-rose-100/90 leading-relaxed max-w-2xl mb-6">
              از لحظه مثبت شدن تست بارداری تا ۵ سالگی کودک، تمام معاینات اجباری، زمان‌بندی دقیق،
              الزامات کمک‌هزینه فرزند (Kinderbetreuungsgeld) و نکات کاربردی — یک‌جا و به فارسی.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ۵ معاینه بارداری
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ۱۰ معاینه کودک
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                الزامی برای کمک‌هزینه
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* QUICK STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "۵", label: "معاینه بارداری", icon: "🤰" },
            { value: "۱۰", label: "معاینه کودک", icon: "👶" },
            { value: "۵ سال", label: "پوشش زمانی", icon: "📅" },
            { value: "۱۰۰٪", label: "تحت پوشش بیمه", icon: "🛡️" },
          ].map((s, i) => (
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
        {/* WHAT IS IT? + IMAGE */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center bg-white rounded-3xl border border-stone-200 overflow-hidden"
        >
          <div className="md:col-span-2 relative h-64 md:h-full min-h-[280px]">
            <img
              src={IMAGES.motherBaby}
              alt="مادر و نوزاد — دفترچه سلامت Mutter-Kind-Pass اتریش"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/0 via-white/0 to-white md:to-white/80" />
          </div>

          <div className="md:col-span-3 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[11px] font-black text-[#c8102e] mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              چرا این راهنما مهم است؟
            </div>

            <h2 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
              Mutter-Kind-Pass چیست و چرا نباید نادیده گرفته شود؟
            </h2>

            <p className="text-[13px] text-stone-600 font-bold leading-relaxed mb-4">
              دفترچه مادر و کودک (Mutter-Kind-Pass) یک <strong>پرونده سلامت رسمی اتریش</strong> است
              که از ابتدای بارداری تا ۵ سالگی کودک را همراهی می‌کند. این دفترچه شامل
              <strong className="text-[#c8102e]"> ۵ معاینه اجباری دوران بارداری</strong> و
              <strong className="text-[#c8102e]"> ۱۰ معاینه دوره‌ای کودک</strong> است.
            </p>

            <p className="text-[13px] text-stone-600 font-bold leading-relaxed mb-4">
              عدم تکمیل معاینات، نه‌تنها سلامت مادر و کودک را به خطر می‌اندازد، بلکه منجر به
              <strong className="text-[#c8102e]"> قطع یا کاهش Kinderbetreuungsgeld</strong>{" "}
              (کمک‌هزینه فرزند) می‌شود.
            </p>

            <div className="flex flex-wrap gap-2">
              {["ÖGK", "BVAEB", "SVS", "ELGA", "Kinderarzt"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-black text-stone-700 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* PREGNANCY EXAMS — TIMELINE */}
        {/* ========================================== */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-[#c8102e]" />
                ۵ معاینه اجباری دوران بارداری
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                طبق استاندارد Mutter-Kind-Pass — وزارت بهداشت اتریش
              </p>
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-black text-[#c8102e] bg-red-50 px-3 py-1 rounded-full items-center gap-1">
              <Clock className="w-3 h-3" />
              ۴۰ هفته
            </span>
          </div>

          <div className="relative">
            <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-rose-100 to-transparent hidden md:block" />

            <div className="space-y-4">
              {PREGNANCY_EXAMS.map((exam, i) => {
                const Icon = exam.icon;
                return (
                  <motion.div
                    key={exam.step}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="relative md:pr-16"
                  >
                    <div
                      className={`absolute right-2 top-5 hidden md:flex w-9 h-9 rounded-xl bg-gradient-to-br ${exam.color} items-center justify-center text-white shadow-lg ring-4 ring-white z-10`}
                    >
                      <span className="text-xs font-black">{exam.step}</span>
                    </div>

                    <div className="bg-white rounded-3xl border border-stone-200 hover:border-rose-200 hover:shadow-lg transition-all p-5 md:p-6 group">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${exam.color} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-black text-stone-900 text-sm">
                              {exam.title}
                            </h3>
                            <span className="text-[10px] font-black text-[#c8102e] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                              {exam.window}
                            </span>
                          </div>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3">
                            {exam.items.map((it, k) => (
                              <li
                                key={k}
                                className="flex items-start gap-1.5 text-[11px] text-stone-600 font-bold leading-relaxed"
                              >
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* CHILD EXAMS — ACCORDION */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Baby className="w-5 h-5 text-[#c8102e]" />
                ۱۰ معاینه کودک (از بدو تولد تا ۵ سالگی)
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                هر معاینه شامل بررسی رشد جسمی، شناختی و روانی کودک است
              </p>
            </div>
            <a
              href="https://www.gesundheitskasse.at"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#c8102e] hover:text-[#970d22] transition"
            >
              منبع رسمی ÖGK
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {CHILD_EXAMS.map((exam, i) => {
              const Icon = exam.icon;
              const isOpen = openChild === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <button
                    onClick={() => setOpenChild(isOpen ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition"
                  >
                    <span className="flex items-center gap-3 flex-1">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isOpen
                            ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                            : "bg-stone-100 text-stone-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="font-black text-xs text-stone-900 leading-snug">
                            {exam.title}
                          </span>
                          <span className="text-[9px] font-black text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
                            {exam.window}
                          </span>
                        </span>
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
                        <div className="px-4 pb-4 pr-16 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3 flex items-start gap-2">
                          <ClipboardCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {exam.items}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================== */}
        {/* BENEFITS GRID */}
        {/* ========================================== */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              چرا Mutter-Kind-Pass اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ۴ دلیل کلیدی که این دفترچه را به یک ضرورت تبدیل می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
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
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${b.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.14] transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {b.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {b.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================== */}
        {/* ALERT / WARNING BOX */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-200 rounded-3xl p-6 md:p-8"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-black text-amber-900 mb-2">
                هشدار مهم: کمک‌هزینه فرزند را از دست ندهید!
              </h3>
              <p className="text-[12px] text-amber-800 font-bold leading-relaxed mb-3">
                طبق قانون اتریش، برای دریافت کامل <strong>Kinderbetreuungsgeld</strong> باید
                <strong> ۵ معاینه دوران بارداری</strong> و
                <strong> ۵ معاینه اول کودک</strong> (تا ۱۴ ماهگی) انجام شده باشد. در صورت
                عدم تکمیل، ممکن است هفتگی مبلغ قابل توجهی از کمک‌هزینه شما کسر شود.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-amber-900 font-black">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                توصیه: تاریخ معاینات را در تقویم دیجیتال ثبت کنید.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره Mutter-Kind-Pass
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین سوالات فارسی‌زبانان مقیم اتریش
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02] shadow-md"
                      : "border-stone-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
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
                        {i + 1}
                      </span>
                      <span className="font-black text-xs text-stone-900 leading-snug">
                        {faq.q}
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
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================== */}
        {/* OFFICIAL RESOURCES */}
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
              <Building2 className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-stone-900 mb-2">
                منابع رسمی و پورتال‌های مفید
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                برای اطلاعات دقیق‌تر و به‌روز، مستقیماً از منابع رسمی اتریش استفاده کنید:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.gesundheitskasse.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  ÖGK رسمی
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="https://www.sozialministerium.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  وزارت بهداشت اتریش
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>
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
              <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
              سوالی دارید؟ در کنارتان هستیم
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نیاز به راهنمایی شخصی دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه سال‌ها زندگی در اتریش، آماده پاسخ به سوالات شما درباره
              Mutter-Kind-Pass، Kinderbetreuungsgeld و مسیر بارداری در اتریش است.
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
              این راهنما صرفاً جنبه اطلاع‌رسانی دارد و جایگزین مشاوره پزشکی، حقوقی یا اداری رسمی
              نیست. زمان‌بندی و شرایط دقیق معاینات ممکن است توسط پزشک شما یا صندوق بیمه تغییر
              کند. برای تصمیم‌های نهایی، همیشه با پزشک متخصص و منابع رسمی ÖGK مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MutterKindPassGuide;