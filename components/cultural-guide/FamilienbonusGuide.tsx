import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, Euro, Baby, GraduationCap, Users, FileText, CheckCircle,
  AlertCircle, Info, ChevronDown, ChevronLeft, ExternalLink, Copy,
  Sparkles, Award, ShieldCheck, Clock, BookOpen, Landmark, Scale,
  TrendingUp, Star, Quote, Globe, Link2, Tag, HelpCircle, Lightbulb,
  Percent, Calendar, ArrowLeftRight, Heart, Zap, Download, Eye,
  Share2, MessageSquare, Phone, Mail, Send, Building2, Wallet,
  Receipt, BadgeCheck, CircleDollarSign, PiggyBank, BabyIcon
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// CONSTANTS 2026
// ==========================================
const AMOUNTS = {
  minorMonthly: 166.68,
  minorYearly: 2000.16,
  adultMonthly: 58.34,
  adultYearly: 700.08,
  kindermehrbetrag: 700,
  familienbeihilfe: {
    birth: 138.4,
    age3: 148,
    age10: 171.8,
    age19: 200.4,
  },
};

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "€۲,۰۰۰", label: "تخفیف سالانه هر فرزند", icon: "💰", sub: "تا ۱۸ سالگی" },
  { value: "€۷۰۰", label: "تخفیف فرزند بالای ۱۸", icon: "🎓", sub: "در صورت دریافت Familienbeihilfe" },
  { value: "€۱۶۶.۶۸", label: "معادل ماهانه (فرزند کم‌سن)", icon: "📅", sub: "کسر مستقیم از مالیات" },
  { value: "۲۸۸,۰۰۰+", label: "خانواده بهره‌مند", icon: "👨‍👩‍👧‍👦", sub: "در سراسر اتریش" },
];

// ==========================================
// ELIGIBILITY CHECKLIST
// ==========================================
const ELIGIBILITY = [
  {
    icon: Receipt,
    title: "دریافت Familienbeihilfe",
    text: "برای فرزند مورد نظر باید کمک‌هزینه خانواده (Familienbeihilfe) از اتریش دریافت شود.",
    color: "from-emerald-500 to-green-600",
    critical: true,
  },
  {
    icon: Globe,
    title: "اقامت در EU/EWR/سوئیس",
    text: "فرزند باید اقامت دائمی در اتحادیه اروپا، منطقه اقتصادی اروپا یا سوئیس داشته باشد.",
    color: "from-sky-500 to-blue-600",
    critical: true,
  },
  {
    icon: Landmark,
    title: "مسئولیت مالیاتی نامحدود",
    text: "والدین باید در اتریش مشمول مالیات نامحدود (unbeschränkt steuerpflichtig) باشند.",
    color: "from-amber-500 to-orange-600",
    critical: true,
  },
  {
    icon: Wallet,
    title: "داشتن درآمد مشمول مالیات",
    text: "تخفیف فقط تا سقف مالیات بر درآمد قابل اعمال است (حداکثر تا صفر).",
    color: "from-purple-500 to-indigo-600",
    critical: false,
  },
];

// ==========================================
// APPLICATION STEPS (HowTo)
// ==========================================
const STEPS = [
  {
    num: 1,
    icon: Building2,
    title: "فرم E30 را به کارفرما تحویل دهید",
    text: "اگر می‌خواهید تخفیف از همان ابتدا در فیش حقوقی ماهانه اعمال شود، فرم E30 را تکمیل و به کارفرما تحویل دهید. این فرم یک بار برای همیشه کافی است.",
    hint: "مناسب برای شاغلین با درآمد ثابت",
    color: "from-emerald-500 to-green-600",
  },
  {
    num: 2,
    icon: FileText,
    title: "در اظهارنامه مالیاتی (L1k) مجدداً درخواست دهید",
    text: "حتی اگر فرم E30 را داده باشید، در Arbeitnehmerveranlagung (اظهارنامه مالیاتی) سالانه باید مجدداً Familienbonus Plus را با پیوست L1k یا L1k-bF درخواست کنید. عدم انجام این کار ممکن است منجر به مالیات اضافی شود.",
    hint: "الزامی — هر سال",
    color: "from-sky-500 to-blue-600",
  },
  {
    num: 3,
    icon: ArrowLeftRight,
    title: "تقسیم بین والدین را مشخص کنید",
    text: "می‌توانید تخفیف را به طور کامل به یک والد اختصاص دهید یا بین هر دو والد ۵۰-۵۰ تقسیم کنید. برای چند فرزند می‌توانید ترکیب‌های مختلف انتخاب کنید.",
    hint: "قابل تنظیم برای هر فرزند",
    color: "from-amber-500 to-orange-600",
  },
  {
    num: 4,
    icon: BadgeCheck,
    title: "نتیجه را در FinanzOnline بررسی کنید",
    text: "پس از ثبت اظهارنامه، از طریق پورتال FinanzOnline وضعیت بررسی و مبلغ نهایی تخفیف را مشاهده کنید. در صورت نیاز، می‌توانید درخواست را تا ۵ سال بعد نیز اصلاح کنید.",
    hint: "امکان اصلاح تا ۵ سال",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// SPLIT SCENARIOS
// ==========================================
const SPLIT_SCENARIOS = [
  {
    icon: Heart,
    title: "والدین متأهل / زندگی مشترک",
    options: [
      "۱۰۰٪ به یک والد",
      "۵۰٪ - ۵۰٪ بین هر دو",
      "ترکیب متفاوت برای هر فرزند",
    ],
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Users,
    title: "والدین جدا شده (با تعهد نفقه)",
    options: [
      "۱۰۰٪ به دریافت‌کننده Familienbeihilfe",
      "۱۰۰٪ به پرداخت‌کننده نفقه",
      "۵۰٪ - ۵۰٪ بین هر دو",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Scale,
    title: "والدین جدا شده (بدون تعهد نفقه)",
    options: [
      "۱۰۰٪ به دریافت‌کننده Familienbeihilfe",
      "۵۰٪ - ۵۰٪ بین هر دو",
    ],
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "Familienbonus Plus دقیقاً چقدر است و چه تفاوتی با Familienbeihilfe دارد؟",
    a: "Familienbonus Plus یک تخفیف مالیاتی (Absetzbetrag) است که مستقیماً مالیات بر درآمد شما را کاهش می‌دهد: €۲,۰۰۰.۱۶ در سال (€۱۶۶.۶۸ ماهانه) برای هر فرزند زیر ۱۸ سال و €۷۰۰.۰۸ در سال (€۵۸.۳۴ ماهانه) برای فرزند بالای ۱۸ سال. در مقابل، Familienbeihilfe یک کمک‌هزینه نقدی است که مستقل از درآمد، هر ماه به حساب شما واریز می‌شود. Familienbonus Plus فقط در صورتی اثر دارد که مالیات بر درآمد پرداخت کنید.",
  },
  {
    q: "اگر درآمد کمی داشته باشم و مالیاتم صفر باشد، چه اتفاقی می‌افتد؟",
    a: "Familienbonus Plus نمی‌تواند مالیات را به زیر صفر برساند. اگر درآمد شما به قدری کم باشد که مالیات بر درآمدی نداشته باشید، این تخفیف اثر کامل خود را نشان نمی‌دهد. در این حالت می‌توانید Kindermehrbetrag (حداکثر €۷۰۰ در سال برای هر فرزند) را درخواست کنید. همچنین می‌توانید تخفیف را به همسر خود منتقل کنید تا از آن بهره‌مند شود.",
  },
  {
    q: "آیا فرم E30 برای دریافت Familienbonus Plus کافی است؟",
    a: "خیر. فرم E30 فقط برای اعمال تخفیف در فیش حقوقی ماهانه است. حتی اگر این فرم را تحویل داده باشید، باید هر سال در اظهارنامه مالیاتی (Arbeitnehmerveranlagung) با پیوست L1k یا L1k-bF مجدداً درخواست دهید. عدم انجام این کار می‌تواند منجر به بازپرداخت مالیات شود.",
  },
  {
    q: "چگونه Familienbonus Plus را بین والدین تقسیم کنم؟",
    a: "شما آزادی کامل دارید: می‌توانید ۱۰۰٪ به یک والد اختصاص دهید یا ۵۰-۵۰ تقسیم کنید. برای چند فرزند نیز می‌توانید ترکیب‌های مختلف انتخاب کنید (مثلاً برای یک فرزند ۱۰۰٪ به مادر و برای فرزند دیگر ۵۰-۵۰). مهم این است که مجموع درخواست برای هر فرزند از ۱۰۰٪ فراتر نرود، در غیر این صورت به طور خودکار ۵۰-۵۰ اعمال می‌شود.",
  },
  {
    q: "آیا Familienbonus Plus برای فرزندان ساکن خارج از اتریش هم قابل دریافت است؟",
    a: "بله، به شرطی که فرزند در کشورهای EU، EWR یا سوئیس ساکن باشد و شرایط دریافت Familienbeihilfe (یا Differenzzahlung) احراز شود. برای فرزندان ساکن کشورهای ثالث، هیچ Familienbonus Plus پرداخت نمی‌شود.",
  },
  {
    q: "آیا می‌توانم درخواست Familienbonus Plus را پس بگیرم یا اصلاح کنم؟",
    a: "بله. می‌توانید تا ۵ سال پس از قطعی شدن برگه مالیاتی، درخواست خود را پس بگیرید (nachträglicher Verzicht). این کار زمانی مفید است که متوجه شوید مالیات کافی برای بهره‌مندی کامل ندارید و همسرتان می‌تواند از آن بهتر استفاده کند. اصلاح درخواست نیز از طریق FinanzOnline امکان‌پذیر است.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "وزارت دارایی اتریش (BMF)", url: "https://www.bmf.gv.at", desc: "مرجع اصلی قوانین مالیاتی" },
  { name: "پورتال رسمی اتریش", url: "https://www.oesterreich.gv.at", desc: "اطلاعات رسمی دولتی" },
  { name: "قانون مالیات بر درآمد (EStG §33)", url: "https://www.ris.bka.gv.at", desc: "متن قانونی" },
  { name: "اتاق کارگران (AK)", url: "https://www.arbeiterkammer.at", desc: "راهنمای کارکنان" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function FamilienbonusGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(0);
  const [calcChildren, setCalcChildren] = useState(1);
  const [calcAdultChildren, setCalcAdultChildren] = useState(0);
  const [calcIncome, setCalcIncome] = useState(30000);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    toast.success("کپی شد!");
    setTimeout(() => setCopiedValue(null), 2000);
  };

  // ============================
  // CALCULATOR LOGIC
  // ============================
  const calcResult = useMemo(() => {
    const minorBonus = calcChildren * AMOUNTS.minorYearly;
    const adultBonus = calcAdultChildren * AMOUNTS.adultYearly;
    const totalBonus = minorBonus + adultBonus;

    // Approximate tax calculation (simplified progressive rates)
    let tax = 0;
    if (calcIncome > 12816) {
      if (calcIncome <= 20818) tax = (calcIncome - 12816) * 0.2;
      else if (calcIncome <= 34513) tax = (20818 - 12816) * 0.2 + (calcIncome - 20818) * 0.3;
      else if (calcIncome <= 66007) tax = (20818 - 12816) * 0.2 + (34513 - 20818) * 0.3 + (calcIncome - 34513) * 0.4;
      else if (calcIncome <= 99266) tax = (20818 - 12816) * 0.2 + (34513 - 20818) * 0.3 + (66007 - 34513) * 0.4 + (calcIncome - 66007) * 0.48;
      else tax = (20818 - 12816) * 0.2 + (34513 - 20818) * 0.3 + (66007 - 34513) * 0.4 + (99266 - 66007) * 0.48 + (calcIncome - 99266) * 0.5;
    }

    const effectiveBonus = Math.min(totalBonus, tax);
    const unusedBonus = totalBonus - effectiveBonus;
    const kindermehr = effectiveBonus < totalBonus ? Math.min(AMOUNTS.kindermehrbetrag * (calcChildren + calcAdultChildren), unusedBonus) : 0;

    return {
      minorBonus,
      adultBonus,
      totalBonus,
      tax,
      effectiveBonus,
      unusedBonus,
      kindermehr,
      monthlyBenefit: effectiveBonus / 12,
    };
  }, [calcChildren, calcAdultChildren, calcIncome]);

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل Familienbonus Plus ۲۰۲۶ — تخفیف مالیاتی فرزندان در اتریش",
      description:
        "راهنمای جامع و به‌روز تخفیف مالیاتی Familienbonus Plus اتریش: مبلغ ۲۰۰۰ یورو برای هر فرزند، شرایط، مدارک، نحوه درخواست با فرم E30 و L1k، تقسیم بین والدین و مقایسه با Familienbeihilfe.",
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
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "fa",
      about: {
        "@type": "Thing",
        name: "Familienbonus Plus",
        description: "تخفیف مالیاتی فرزندان در اتریش",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "نحوه دریافت Familienbonus Plus در اتریش",
      description:
        "مراحل گام‌به‌گام درخواست تخفیف مالیاتی فرزندان (Familienbonus Plus) در اتریش با فرم‌های E30 و L1k",
      totalTime: "P1D",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0" },
      step: STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
        url: `https://otrish-iran.ir/familienbonus#step-${i + 1}`,
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
  ];

  return (
    <>
      <SEO
        title="Familienbonus Plus ۲۰۲۶ | راهنمای کامل تخفیف مالیاتی فرزندان اتریش | اتریش‌نشین"
        description="راهنمای جامع Familienbonus Plus اتریش ۲۰۲۶: مبلغ €۲,۰۰۰ برای هر فرزند، شرایط واجد شرایط بودن، نحوه درخواست با فرم E30 و L1k، تقسیم بین والدین، ماشین‌حساب آنلاین و مقایسه با Familienbeihilfe."
        keywords="Familienbonus Plus, تخفیف مالیاتی فرزندان اتریش, Familienbeihilfe اتریش, فرم E30, L1k اتریش, مالیات اتریش, Familienbonus 2026, Kindermehrbetrag, مالیات خانواده اتریش, عیدی فرزند اتریش"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/familienbonus.jpg"
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
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            👶
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                  alt="راهنمای Familienbonus Plus اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                راهنمای رسمی ۲۰۲۶ — به‌روز شده
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                Familienbonus Plus
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  تخفیف مالیاتی فرزندان در اتریش
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                Familienbonus Plus یک تخفیف مالیاتی مستقیم است که به ازای هر فرزند، سالانه
                تا <strong className="text-white">€۲,۰۰۰.۱۶</strong> مالیات بر درآمد شما را کاهش
                می‌دهد. این راهنما تمامی جزئیات از شرایط واجد شرایط بودن تا نحوه درخواست با
                فرم‌های E30 و L1k، تقسیم بین والدین و محاسبه دقیق سود شما را پوشش می‌دهد.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>منابع رسمی BMF</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>ماشین‌حساب آنلاین</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>قانون EStG §33</span>
                </div>
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-2 gap-3 mt-6 max-w-md">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
                  <div className="text-[10px] font-bold text-rose-200 mb-1">فرزند زیر ۱۸ سال</div>
                  <div className="text-lg font-black">€۲,۰۰۰.۱۶</div>
                  <div className="text-[9px] text-rose-300">€۱۶۶.۶۸ ماهانه</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3">
                  <div className="text-[10px] font-bold text-rose-200 mb-1">فرزند بالای ۱۸ سال</div>
                  <div className="text-lg font-black">€۷۰۰.۰۸</div>
                  <div className="text-[9px] text-rose-300">€۵۸.۳۴ ماهانه</div>
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
              <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
              <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              <div className="text-[9px] text-stone-400 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* INTERACTIVE CALCULATOR */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border-2 border-[#c8102e]/20 overflow-hidden shadow-lg"
        >
          <div className="bg-gradient-to-r from-[#c8102e] to-[#970d22] p-5 md:p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-black">ماشین‌حساب Familienbonus Plus ۲۰۲۶</h2>
                <p className="text-[11px] text-rose-200 font-bold mt-0.5">
                  میزان تخفیف مالیاتی خود را به صورت دقیق محاسبه کنید
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-5">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Minor children */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-[11px] font-black text-stone-700 mb-3 block flex items-center gap-1.5">
                  <Baby className="w-3.5 h-3.5 text-[#c8102e]" />
                  فرزندان زیر ۱۸ سال
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCalcChildren(Math.max(0, calcChildren - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200 font-black text-stone-600 hover:bg-stone-100 transition text-lg"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-black text-[#c8102e]">{calcChildren}</div>
                    <div className="text-[9px] text-stone-500 font-bold">فرزند</div>
                  </div>
                  <button
                    onClick={() => setCalcChildren(calcChildren + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200 font-black text-stone-600 hover:bg-stone-100 transition text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Adult children */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-[11px] font-black text-stone-700 mb-3 block flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  فرزندان بالای ۱۸ سال
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCalcAdultChildren(Math.max(0, calcAdultChildren - 1))}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200 font-black text-stone-600 hover:bg-stone-100 transition text-lg"
                  >
                    −
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-black text-sky-600">{calcAdultChildren}</div>
                    <div className="text-[9px] text-stone-500 font-bold">فرزند</div>
                  </div>
                  <button
                    onClick={() => setCalcAdultChildren(calcAdultChildren + 1)}
                    className="w-10 h-10 rounded-xl bg-white border border-stone-200 font-black text-stone-600 hover:bg-stone-100 transition text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Income */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
                <label className="text-[11px] font-black text-stone-700 mb-3 block flex items-center gap-1.5">
                  <Euro className="w-3.5 h-3.5 text-emerald-600" />
                  درآمد سالانه (یورو)
                </label>
                <input
                  type="number"
                  value={calcIncome}
                  onChange={(e) => setCalcIncome(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-sm font-black text-stone-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition"
                  dir="ltr"
                  step="1000"
                />
                <div className="text-[9px] text-stone-400 font-bold text-center mt-1">
                  درآمد مشمول مالیات سالانه
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span className="text-[11px] font-black text-emerald-800">
                  نتیجه محاسبه برای سال ۲۰۲۶
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">مجموع تخفیف</div>
                  <div className="text-lg font-black text-emerald-700" dir="ltr">
                    €{calcResult.totalBonus.toFixed(2)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">مالیات قابل پرداخت</div>
                  <div className="text-lg font-black text-stone-700" dir="ltr">
                    €{calcResult.tax.toFixed(2)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border-2 border-emerald-300">
                  <div className="text-[9px] text-emerald-700 font-black mb-1">تخفیف مؤثر</div>
                  <div className="text-lg font-black text-emerald-700" dir="ltr">
                    €{calcResult.effectiveBonus.toFixed(2)}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-emerald-100">
                  <div className="text-[9px] text-stone-500 font-bold mb-1">معادل ماهانه</div>
                  <div className="text-lg font-black text-[#c8102e]" dir="ltr">
                    €{calcResult.monthlyBenefit.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Kindermehrbetrag hint */}
              {calcResult.unusedBonus > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-black text-amber-900 mb-1">
                      💡 فرصت از دست رفته: €{calcResult.unusedBonus.toFixed(2)}
                    </div>
                    <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                      درآمد شما برای استفاده کامل از تخفیف کافی نیست. می‌توانید:
                      ۱) تخفیف را به همسر خود منتقل کنید، یا
                      ۲) Kindermehrbetrag تا سقف €{calcResult.kindermehr.toFixed(2)} درخواست کنید.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="mt-3 text-[9px] text-stone-500 font-bold leading-relaxed">
                ⚠️ محاسبه فوق تقریبی است و بر اساس نرخ‌های تصاعدی ساده‌شده انجام شده. برای محاسبه
                دقیق، از ماشین‌حساب رسمی BMF یا مشاور مالیاتی استفاده کنید.
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* ELIGIBILITY CHECKLIST */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#c8102e]" />
              آیا واجد شرایط دریافت هستید؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار شرط اصلی که باید همزمان احراز شوند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ELIGIBILITY.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`bg-white rounded-3xl border-2 p-5 relative overflow-hidden group ${
                    item.critical ? "border-[#c8102e]/20" : "border-stone-200"
                  }`}
                >
                  {item.critical && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white text-[9px] font-black px-3 py-1 rounded-br-2xl">
                      ضروری
                    </div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-stone-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* HOW TO APPLY - STEPS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c8102e]" />
              راهنمای گام‌به‌گام درخواست
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار گام ساده برای دریافت تخفیف مالیاتی فرزندان
            </p>
          </div>

          {/* Step tabs */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all ${
                  activeStep === i
                    ? `bg-gradient-to-br ${s.color} text-white shadow-md`
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-[10px] ${
                  activeStep === i ? "bg-white/20" : "bg-white"
                }`}>
                  {s.num}
                </span>
                {s.title.split(" ").slice(0, 3).join(" ")}...
              </button>
            ))}
          </div>

          {/* Active step content */}
          <AnimatePresence mode="wait">
            {STEPS.map(
              (s, i) =>
                activeStep === i && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col md:flex-row items-start gap-6"
                  >
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-xl flex-shrink-0`}
                    >
                      <s.icon className="w-10 h-10 md:w-12 md:h-12" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl font-black text-stone-200">{s.num}</span>
                        <h3 className="text-base font-black text-stone-900">{s.title}</h3>
                      </div>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                        {s.text}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-[10px] font-black text-amber-800">{s.hint}</span>
                      </div>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* SPLIT SCENARIOS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-[#c8102e]" />
              تقسیم تخفیف بین والدین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              سناریوهای مختلف بر اساس وضعیت تأهل و تعهدات نفقه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SPLIT_SCENARIOS.map((sc, i) => {
              const Icon = sc.icon;
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
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${sc.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${sc.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-3">
                    {sc.title}
                  </h3>
                  <ul className="relative space-y-2">
                    {sc.options.map((opt, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-[11px] font-bold text-stone-600"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* COMPARISON TABLE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 p-5 text-white">
            <h2 className="text-base font-black flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              مقایسه: Familienbonus Plus vs Familienbeihilfe
            </h2>
            <p className="text-[10px] text-stone-300 font-bold mt-1">
              تفاوت‌های کلیدی دو مزیت اصلی مالی خانواده در اتریش
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-right p-4 font-black text-stone-700">ویژگی</th>
                  <th className="text-center p-4 font-black text-[#c8102e]">Familienbonus Plus</th>
                  <th className="text-center p-4 font-black text-emerald-600">Familienbeihilfe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { label: "نوع", bonus: "تخفیف مالیاتی", beihilfe: "کمک‌هزینه نقدی" },
                  { label: "مبلغ (زیر ۱۸)", bonus: "€۲,۰۰۰.۱۶ / سال", beihilfe: "€۱۳۸.۴۰ - €۱۷۱.۸۰ / ماه" },
                  { label: "مبلغ (بالای ۱۸)", bonus: "€۷۰۰.۰۸ / سال", beihilfe: "€۲۰۰.۴۰ / ماه" },
                  { label: "وابستگی به درآمد", bonus: "بله — نیاز به مالیات", beihilfe: "خیر — مستقل از درآمد" },
                  { label: "نحوه دریافت", bonus: "کسر از مالیات", beihilfe: "واریز به حساب" },
                  { label: "شرط اصلی", bonus: "دریافت Familienbeihilfe", beihilfe: "اقامت + شرایط قانونی" },
                  { label: "درخواست", bonus: "فرم E30 / L1k", beihilfe: "خودکار پس از ثبت‌نام" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50/50 transition">
                    <td className="p-4 font-black text-stone-800">{row.label}</td>
                    <td className="p-4 text-center font-bold text-[#c8102e]">{row.bonus}</td>
                    <td className="p-4 text-center font-bold text-emerald-700">{row.beihilfe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول Familienbonus Plus
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های کاربران فارسی‌زبان
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
        {/* OFFICIAL SOURCES */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">منابع رسمی مورد استناد</h3>
              <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                برای راستی‌آزمایی مستقل اطلاعات این راهنما
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOURCES.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-white border border-stone-200 hover:border-indigo-300 rounded-2xl p-4 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-stone-800 truncate">{s.name}</div>
                  <div className="text-[9px] text-stone-500 font-bold">{s.desc}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              </a>
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
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              سوالی درباره Familienbonus دارید؟
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              تیم اتریش‌نشین کنار شماست
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر در مورد شرایط واجد شرایط بودن، نحوه درخواست یا تقسیم تخفیف بین والدین سوالی
              دارید، کارشناسان ما آماده پاسخگویی هستند. مشاوره کاملاً رایگان و داوطلبانه است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، سوالی درباره Familienbonus Plus دارم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Phone className="w-4 h-4" />
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری حقوقی مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این راهنما بر اساس قوانین و مقررات مالیاتی اتریش (EStG §33) و اطلاعات منتشرشده
              توسط وزارت دارایی (BMF) تا سال ۲۰۲۶ تهیه شده است. مبالغ و شرایط ممکن است در
              سال‌های آینده تغییر کنند. این محتوا جایگزین مشاوره مالیاتی تخصصی نیست. برای
              پرونده‌های خاص، حتماً با یک مشاور مالیاتی (Steuerberater) یا کارشناس رسمی مشورت
              کنید. تمامی مبالغ به یورو و بر اساس آخرین به‌روزرسانی قوانین اتریش است.
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
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  key?: React.Key;
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
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
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