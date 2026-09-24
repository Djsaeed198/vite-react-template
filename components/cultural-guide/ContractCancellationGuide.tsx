import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, Copy, Check, Trash2, Info, FileCheck, ArrowLeft,
  BookOpen, Calendar, Layers, Sparkles, ShieldCheck, Zap, Heart,
  Users, Star, TrendingUp, Award, Globe, Rocket, Handshake,
  ChevronLeft, ChevronDown, Clock, MapPin, Mail, Send, Building2,
  AlertTriangle, Target, Scale, FileSignature, PenLine, Download,
  Smartphone, Home, Briefcase, Dumbbell, Quote, CheckCircle, Gavel
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80";
const DOCS_IMAGE = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80";

interface TemplateType {
  id: string;
  label: string;
  shortLabel: string;
  germanTitle: string;
  defaultSubject: string;
  defaultBody: string;
  placeholderCompany: string;
  icon: any;
  gradient: string;
  bg: string;
  text: string;
  description: string;
  examples: string[];
}

const TEMPLATES_DATA: TemplateType[] = [
  {
    id: "mobile",
    label: "فسخ قرارداد موبایل و اینترنت همراه",
    shortLabel: "موبایل و اینترنت",
    germanTitle: "Kündigung Handy- und Internetvertrag",
    defaultSubject: "Kündigung des Mobilfunkvertrags - Rufnummer: [شماره تلفن شما]",
    defaultBody: "Sehr geehrte Damen und Herren,\n\nhiermit kündige ich meinen oben genannten Mobilfunkvertrag fristgerecht zum nächstmöglichen Zeitpunkt.\n\nBitte senden Sie mir eine schriftliche Bestätigung der Kündigung unter Angabe des Beendigungszeitpunkts zu.\n\nEine erteilte Einzugsermächtigung für mein Bankkonto entziehe ich hiermit mit dem Wirksamwerden dieser Kündigung.\n\nMit freundlichen Grüßen,",
    placeholderCompany: "Drei (Hutchison Drei Austria GmbH) / Magenta Telekom / A1 Telekom",
    icon: Smartphone,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
    description: "فسخ قرارداد اپراتورهای موبایل، اینترنت خانگی و بسته‌های ترکیبی در اتریش.",
    examples: ["A1 Telekom", "Magenta (T-Mobile)", "Drei", "Spusu", "HoT"],
  },
  {
    id: "rental",
    label: "فسخ قرارداد اجاره خانه توسط مستأجر",
    shortLabel: "اجاره مسکن",
    germanTitle: "Kündigung des Mietvertrags durch den Mieter",
    defaultSubject: "Kündigung des Mietvertrags für das Objekt: [آدرس دقیق آپارتمان شما]",
    defaultBody: "Sehr geehrte(r) Damen und Herren / Vermieter,\n\nhiermit kündige ich den Mietvertrag für die oben genannte Wohnung unter Einhaltung der gesetzlichen bzw. vertraglich vereinbarten Kündigungsfrist zum [تاریخ دقیق خروج، مثلا ۳ ماه دیگر].\n\nAls Termin für die gemeinsame Wohnungsübergabe und Schlüsselrückgabe schlage ich den letzten Tag des Mietverhältnisses vor. Bitte setzen Sie sich zwecks Terminabsprache mit mir in Verbindung.\n\nIch bitte Sie höflich, mir den Erhalt dieser Kündigung und den Beendigungszeitpunkt schriftlich zu bestätigen.\n\nMit freundlichen Grüßen,",
    placeholderCompany: "نام مالک ساختمان یا بنگاه مدیریت املاک (Hausverwaltung)",
    icon: Home,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    description: "فسخ قانونی قرارداد اجاره مسکن با رعایت مهلت‌های قانونی MRG در اتریش.",
    examples: ["Hausverwaltung", "Vermieter", "Genossenschaft", "Wiener Wohnen"],
  },
  {
    id: "resignation",
    label: "استعفا و فسخ قرارداد کاری (توسط کارمند)",
    shortLabel: "استعفا از کار",
    germanTitle: "Kündigung des Dienstverhältnisses durch den Arbeitnehmer",
    defaultSubject: "Kündigung meines Dienstverhältnisses - Personalnummer: [کد پرسنلی یا شماره بیمه ملی]",
    defaultBody: "Sehr geehrte(r) [نام مدیر یا مسئول منابع انسانی],\n\nhiermit kündige ich mein bestehendes Dienstverhältnis ordnungsgemäß unter Einhaltung der vertraglich vereinbarten Kündigungsfrist zum nächstmöglichen Zeitpunkt.\n\nIch bedanke mich für die angenehme Zusammenarbeit in Ihrem Unternehmen und wünsche Ihnen für die Zukunft alles Gute.\n\nBitte stellen Sie mir ein qualifiziertes Dienstzeugnis aus und senden Sie mir die Endabrechnung sowie die Arbeitspapiere zu.\n\nMit freundlichen Grüßen,",
    placeholderCompany: "نام شرکت یا کارفرمای اتریشی شما",
    icon: Briefcase,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    description: "استعفای رسمی از کار با رعایت مهلت قانونی و درخواست گواهی کار (Dienstzeugnis).",
    examples: ["AG", "GmbH", "Einzelunternehmen", "Konzern"],
  },
  {
    id: "gym",
    label: "فسخ قرارداد باشگاه ورزشی / متفرقه",
    shortLabel: "باشگاه و متفرقه",
    germanTitle: "Kündigung der Fitnessstudio-Mitgliedschaft",
    defaultSubject: "Kündigung meiner Mitgliedschaft - Mitgliedsnummer: [شماره عضویت باشگاه]",
    defaultBody: "Sehr geehrte Damen und Herren,\n\nhiermit kündige ich meine Mitgliedschaft bei Ihrem Fitnessstudio fristgerecht zum nächstmöglichen Zeitpunkt.\n\nBitte bestätigen Sie mir den Erhalt dieses Schreibens sowie den genauen Beendigungszeitpunkt meiner Mitgliedschaft schriftlich.\n\nMit freundlichen Grüßen,",
    placeholderCompany: "نام باشگاه ورزشی (FitInn, McFIT, Holmes Place) یا صادرکننده اشتراک",
    icon: Dumbbell,
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    description: "فسخ عضویت باشگاه ورزشی، اشتراک مجلات و سایر خدمات اشتراکی.",
    examples: ["FitInn", "McFIT", "Holmes Place", "John Harris", "Magazine"],
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۴", label: "قالب حقوقی آماده", icon: "📄" },
  { value: "۱۰۰٪", label: "رایگان و آنی", icon: "⚡" },
  { value: "DE", label: "آلمانی رسمی", icon: "🇦🇹" },
  { value: "A4", label: "فرمت نامه استاندارد", icon: "📐" },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: Gavel,
    title: "مطابق قوانین اتریش",
    text: "قالب‌ها بر اساس قوانین حمایت از مصرف‌کننده (KSchG) و حقوق tenants اتریش طراحی شده‌اند.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Zap,
    title: "تولید آنی نامه",
    text: "با پر کردن فرم، نامه رسمی آلمانی به‌صورت لحظه‌ای آماده کپی و ارسال می‌شود.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "محرمانه و امن",
    text: "تمام اطلاعات در مرورگر شما پردازش می‌شود و هیچ داده‌ای به سرور ارسال نمی‌گردد.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "ساخته‌شده برای مهاجران",
    text: "طراحی‌شده توسط فارسی‌زبانان مقیم اتریش با درک نیازهای واقعی شما.",
    color: "from-rose-500 to-pink-600",
  },
];

// ==========================================
// HOW IT WORKS
// ==========================================
const HOW_IT_WORKS = [
  {
    n: "۰۱",
    icon: Layers,
    title: "قالب مناسب را انتخاب کنید",
    text: "از میان موبایل، اجاره مسکن، استعفا یا باشگاه، قالب موردنظر خود را برگزینید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    n: "۰۲",
    icon: PenLine,
    title: "اطلاعات خود را وارد کنید",
    text: "مشخصات فرستنده، گیرنده و شناسه قرارداد را در فرم ساده وارد نمایید.",
    color: "from-amber-500 to-orange-600",
  },
  {
    n: "۰۳",
    icon: Send,
    title: "نامه را کپی و ارسال کنید",
    text: "متن نهایی را کپی کرده و از طریق پست Einschreiben یا ایمیل رسمی ارسال کنید.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// SENDING TIPS
// ==========================================
const SENDING_TIPS = [
  {
    icon: Mail,
    title: "پست سفارشی (Einschreiben)",
    text: "برای مسکن، مالیات و موضوعات مالی حتماً از پست Einschreiben با رسید استفاده کنید.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: FileSignature,
    title: "امضای دستی",
    text: "نامه را چاپ و با خودکار آبی امضا کنید. در نسخه اسکن، امضا را در پیش‌نمایش اضافه کنید.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Clock,
    title: "مهلت قانونی",
    text: "تاریخ ارسال مهم است. Kündigung باید قبل از پایان مهلت (معمولاً یک ماه یا سه ماه) ارسال شود.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Copy,
    title: "نگه‌داشتن رونوشت",
    text: "همیشه یک کپی از نامه و رسید ارسال را برای خود نگه دارید تا سند محکمه‌پسند داشته باشید.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا این قالب‌ها در دادگاه اتریش اعتبار قانونی دارند؟",
    a: "بله، این قالب‌ها بر اساس اصول Kündigung در حقوق اتریش (ABGB, KSchG, MRG) طراحی شده‌اند و به‌عنوان نامه رسمی فسخ قابل استفاده هستند. با این حال، در پرونده‌های پیچیده یا اختلافی، مشورت با وکیل توصیه می‌شود.",
  },
  {
    q: "اگر نامه فسخ را ارسال نکنم، قرارداد خودبه‌خود تمدید می‌شود؟",
    a: "بله. اکثر قراردادها در اتریش به‌طور خودکار تمدید می‌شوند اگر در بازه مقرر فسخ نشوند. به همین دلیل ارسال Kündigung در زمان درست بسیار حیاتی است و از پرداخت هزینه‌های اضافی جلوگیری می‌کند.",
  },
  {
    q: "چگونه می‌فهمم مهلت فسخ قراردادم چقدر است؟",
    a: "مهلت فسخ (Kündigungsfrist) در قرارداد شما ذکر شده است. برای موبایل معمولاً ۱ ماه، برای اجاره مسکن بین ۱ تا ۳ ماه و برای بیمه‌ها معمولاً ۱ ماه قبل از تمدید است. اگر مطمئن نیستید، قرارداد را با دقت مطالعه کنید.",
  },
  {
    q: "آیا می‌توانم نامه را به‌جای پست، ایمیل کنم؟",
    a: "برای اپراتورهای موبایل و باشگاه‌های ورزشی، ایمیل رسمی یا آپلود در پرتال کاربری معمولاً کافی است. اما برای اجاره مسکن و استعفای کاری، همیشه نسخه چاپی امضا شده با پست Einschreiben توصیه می‌شود تا رسید رسمی داشته باشید.",
  },
  {
    q: "آیا اطلاعات واردشده من ذخیره می‌شود؟",
    a: "خیر، کاملاً امن است. تمام پردازش‌ها در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال یا ذخیره نمی‌گردد. پس از بستن صفحه، اطلاعات پاک می‌شوند.",
  },
  {
    q: "اگر شرکتی فسخ من را نپذیرد چه کنم؟",
    a: "اگر نامه فسخ را با رسید ارسال کرده باشید، مبنای قانونی محکمی دارید. در صورت رد شدن، می‌توانید از AK (اتاق کارگران) یا VKI (انجمن اطلاعات مصرف‌کنندگان) کمک بگیرید یا در دادگاه Konsumentenschutz اقدام کنید.",
  },
];

export default function ContractCancellationGuide() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TEMPLATES_DATA[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [custName, setCustName] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custZipCity, setCustZipCity] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyZipCity, setCompanyZipCity] = useState("");

  const [contractNum, setContractNum] = useState("");
  const [customSubject, setCustomSubject] = useState("");

  const [copied, setCopied] = useState(false);

  const compiledSubject =
    customSubject ||
    selectedTemplate.defaultSubject
      .replace("[شماره تلفن شما]", contractNum || "123456")
      .replace("[آدرس دقیق آپارتمان شما]", contractNum || "Hauptstraße 12, Wien")
      .replace("[کد پرسنلی یا شماره بیمه ملی]", contractNum || "SV-Nr: 1234 010190")
      .replace("[شماره عضویت باشگاه]", contractNum || "M-9988");

  const todayStr = new Date().toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const fullLetterText = `
${custName || "[نام کامل شما]"}
${custAddress || "[آدرس خیابان و پلاک شما]"}
${custZipCity || "[کد پستی و شهر شما, مثلا 1100 Wien]"}

An:
${companyName || "[نام شرکت یا گیرنده]"}
${companyAddress || "[آدرس خیابان شرکت]"}
${companyZipCity || "[کد پستی و شهر شرکت]"}


Österreich, den ${todayStr}


Betreff: ${compiledSubject}
${contractNum ? `Kundennummer / Vertragsnummer: ${contractNum}` : ""}

${selectedTemplate.defaultBody}

___________________________
${custName || "[امضا و نام کامل شما]"}
`.trim();

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    toast.success("نامه فسخ آلمانی با موفقیت در کلیپ‌بورد کپی شد! 📋");
    setTimeout(() => setCopied(false), 2500);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "سامانه فسخ قرارداد اتریش - اتریش‌نشین",
      url: "https://otrish-iran.ir/contract-cancellation",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "ابزار رایگان تولید نامه رسمی Kündigung برای فسخ قرارداد موبایل، اجاره مسکن، استعفا و باشگاه در اتریش.",
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
      "@type": "HowTo",
      name: "چگونه نامه فسخ قرارداد در اتریش بنویسیم",
      step: HOW_IT_WORKS.map((s, i) => ({
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
        title="سامانه فسخ قرارداد در اتریش | قالب آماده Kündigung موبایل، اجاره، استعفا"
        description="ابزار رایگان تولید نامه فسخ قرارداد آلمانی برای موبایل، اجاره مسکن، استعفا و باشگاه در اتریش. قالب رسمی Kündigung مطابق قوانین Konsumentenschutzgesetz."
        keywords="فسخ قرارداد اتریش, Kündigung, نامه فسخ آلمانی, فسخ اجاره مسکن وین, استعفا اتریش, فسخ موبایل A1, Magenta, Drei, Konsumentenschutz, اتریش‌نشین"
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
                alt="نامه رسمی فسخ قرارداد اتریش"
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              📄
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
                  <FileSignature className="w-3.5 h-3.5 text-amber-300" />
                  Kündigungsschreiben Generator
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  سامانه خودکار فسخ قرارداد اتریش
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  قالب‌های رسمی آلمانی برای فسخ قرارداد موبایل، اجاره مسکن، استعفای
                  کاری و باشگاه — مطابق قوانین حقوقی اتریش. مشخصات خود را وارد
                  کنید، نامه رسمی را به‌صورت آنی دریافت و کپی کنید.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>مطابق قوانین KSchG</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>کاملاً محرمانه</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>تولید آنی</span>
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
          {/* MAIN GENERATOR WIZARD */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
            id="contract-cancellation-wizard"
          >
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-purple-500 via-rose-400 to-purple-600" />

            {/* Header */}
            <div className="border-b border-stone-100 pb-5 mb-6 space-y-2">
              <div className="flex items-center gap-2.5 justify-end">
                <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                  سامانه خودکار صدور نامه‌های اداری و فسخ قرارداد اتریش 📄
                </h2>
                <div className="p-2 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 font-bold max-w-2xl ml-auto leading-relaxed">
                قالب‌های متنی آماده آلمانی ممهور به قوانین حقوقی اتریش (Konsumentenschutzgesetz).
                مشخصات خود را وارد کنید، متن رسمی آلمانی را به‌صورت آنی دریافت کرده و
                جهت ارسال با ایمیل یا پست سفارشی کپی نمایید.
              </p>
            </div>

            {/* Template Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {TEMPLATES_DATA.map((tmpl) => {
                const Icon = tmpl.icon;
                const isActive = selectedTemplate.id === tmpl.id;
                return (
                  <motion.button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl);
                      setCustomSubject("");
                      toast.success(`بارگذاری قالب: ${tmpl.shortLabel} ⚡`);
                    }}
                    whileHover={{ y: -3 }}
                    className={`relative p-4 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all overflow-hidden ${
                      isActive
                        ? "border-[#c8102e] bg-gradient-to-br from-[#c8102e]/5 to-[#970d22]/5 shadow-md"
                        : "bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-2 left-2">
                        <CheckCircle className="w-4 h-4 text-[#c8102e]" />
                      </div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${tmpl.gradient} text-white shadow-md`
                          : `${tmpl.bg} ${tmpl.text}`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-black tracking-tight leading-tight ${
                        isActive ? "text-[#c8102e]" : "text-stone-700"
                      }`}
                    >
                      {tmpl.shortLabel}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active template info banner */}
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 rounded-2xl border-2 ${selectedTemplate.bg} border-stone-200/50 p-4 flex items-start gap-3`}
            >
              <div
                className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${selectedTemplate.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
              >
                <selectedTemplate.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-stone-900 text-xs mb-1">
                  {selectedTemplate.label}
                </h4>
                <p className="text-[10px] text-stone-600 font-bold leading-relaxed mb-2">
                  {selectedTemplate.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTemplate.examples.map((ex, i) => (
                    <span
                      key={i}
                      className={`inline-flex items-center text-[9px] font-black text-stone-600 bg-white/80 px-2 py-0.5 rounded-full border border-stone-200`}
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT: Form Inputs */}
              <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 text-xs font-bold text-stone-700">
                <h3 className="font-extrabold text-stone-900 text-xs sm:text-sm border-b border-stone-200 pb-2 mb-1 flex items-center justify-end gap-1.5">
                  <span>جزئیات فرستنده و گیرنده نامه</span>
                  <Calendar className="w-4 h-4 text-purple-600" />
                </h3>

                <div className="space-y-3.5">
                  {/* Sender */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-purple-700 font-black block border-r-2 border-purple-500 pr-1.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      مشخصات شما (فرستنده):
                    </span>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="نام و نام خانوادگی به انگلیسی (مثلاً Ali Tehrani)"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                    <input
                      type="text"
                      value={custAddress}
                      onChange={(e) => setCustAddress(e.target.value)}
                      placeholder="آدرس خیابان و پلاک شما (مثلاً Favoritenstraße 20)"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                    <input
                      type="text"
                      value={custZipCity}
                      onChange={(e) => setCustZipCity(e.target.value)}
                      placeholder="کد پستی و شهر شما (مثلاً 1100 Wien)"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  </div>

                  {/* Recipient */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-rose-700 font-black block border-r-2 border-rose-500 pr-1.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      مشخصات شرکت یا مالک (گیرنده):
                    </span>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={`نام طرف قرارداد (مثال: ${selectedTemplate.placeholderCompany})`}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="آدرس خیابان شرکت گیرنده"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                    <input
                      type="text"
                      value={companyZipCity}
                      onChange={(e) => setCompanyZipCity(e.target.value)}
                      placeholder="کد پستی و شهر شرکت گیرنده"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                  </div>

                  {/* Contract Info */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-stone-500 font-black block border-r-2 border-stone-400 pr-1.5 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      شناسه قرارداد:
                    </span>
                    <input
                      type="text"
                      value={contractNum}
                      onChange={(e) => setContractNum(e.target.value)}
                      placeholder="شماره قرارداد (Kundennummer / Vertragsnummer)"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-stone-800 text-right outline-none font-mono focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: Letter Preview */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col flex-1">
                  <div className="bg-gradient-to-l from-stone-100 to-stone-50 border-b border-stone-200 p-3.5 flex items-center justify-between">
                    <motion.button
                      onClick={handleCopyText}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg text-white text-[10.5px] font-black py-2 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? "کپی شد!" : "کپی کل متن آلمانی"}</span>
                    </motion.button>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10.5px] font-mono text-stone-500">
                        Kündigungsschreiben Preview
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 bg-stone-50/50">
                    <pre
                      className="font-mono text-[10.5px] text-stone-800 whitespace-pre-wrap text-left leading-relaxed max-h-[420px] overflow-y-auto bg-white p-4 border border-stone-200 rounded-xl"
                      dir="ltr"
                    >
                      {fullLetterText}
                    </pre>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-right">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <h5 className="font-extrabold text-stone-900">
                      نحوه ارسال قانونی نامه فسخ در اتریش:
                    </h5>
                    <p className="text-[10.5px] text-stone-600 leading-relaxed font-bold">
                      توصیه می‌شود نامه‌های فسخ مسکن یا موارد مالی مهم را حتماً به
                      صورت نسخه چاپی امضا شده و با پست پیشتاز سفارشی (Einschreiben)
                      ارسال نمایید تا رسید پستی آن سند محکمه‌پسند وصول نامه باشد. در
                      خصوص اپراتورهای موبایل، معمولاً آپلود اسکن نامه در پرتال
                      کاربری کافی است.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* WHY USE SECTION */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                چرا از این سامانه استفاده کنیم؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار دلیل که این ابزار را به انتخاب اول مهاجران تبدیل می‌کند
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
          {/* HOW IT WORKS */}
          {/* ========================================== */}
          <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                چگونه کار می‌کند؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                در سه گام ساده، نامه فسخ قانونی خود را بسازید
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_IT_WORKS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="relative bg-white rounded-3xl border border-stone-200 p-6 overflow-hidden group"
                  >
                    <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 group-hover:text-rose-100 transition-colors">
                      {s.n}
                    </div>
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative font-black text-stone-900 text-sm mb-2">
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
          {/* SENDING TIPS */}
          {/* ========================================== */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Send className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                نکات کلیدی برای ارسال موفق نامه فسخ
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار نکته که اعتبار قانونی نامه شما را تضمین می‌کند
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SENDING_TIPS.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl border border-indigo-100 p-5"
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white shadow-lg mb-3`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-stone-900 text-xs mb-1.5">
                      {t.title}
                    </h3>
                    <p className="text-[10.5px] text-stone-600 font-bold leading-relaxed">
                      {t.text}
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
                سوالات متداول فسخ قرارداد
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                پاسخ به پرتکرارترین سوالات فارسی‌زبانان درباره Kündigung در اتریش
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
                یادآوری حقوقی مهم
              </h5>
              <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>هر قرارداد ممکن است شرایط فسخ خاص خود را داشته باشد؛ متن قرارداد را دقیق مطالعه کنید.</li>
                <li>مهلت فسخ (Kündigungsfrist) بسیار حیاتی است؛ ارسال دیرهنگام ممکن است موجب تمدید خودکار شود.</li>
                <li>برای مسائل پیچیده یا اختلافی، حتماً با وکیل حقوقی مشورت کنید.</li>
                <li>اتریش‌نشین مسئولیتی در قبال پیامدهای قانونی ناشی از استفاده از این قالب‌ها نمی‌پذیرد.</li>
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
                کنار شما در مسیر اداری
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">
                سوال دیگری دارید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                اگر درباره فسخ قرارداد، مهلت‌ها یا شرایط خاص سوالی دارید، تیم
                اتریش‌نشین آماده کمک رایگان به شماست.
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
                اتریش‌نشین یک پلتفرم مستقل و داوطلبانه است. قالب‌های ارائه‌شده
                صرفاً جنبه راهنمایی دارند و جایگزین مشاوره حقوقی رسمی نیستند. قوانین
                اتریش ممکن است تغییر کنند. برای تصمیم‌های نهایی، با منابع رسمی
                مانند AK (اتاق کارگران) یا وکلای واجد شرایط مشورت کنید.
              </p>
            </div>
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