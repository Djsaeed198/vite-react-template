import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale, FileSearch, ShieldCheck, RefreshCw, Layers, Sparkles,
  CheckCircle, Zap, Heart, Users, Star, Award, Globe, Rocket,
  Handshake, ChevronDown, ChevronLeft, Clock, Info, AlertTriangle,
  Building2, FileText, Gavel, BookOpen, Target, Quote, Landmark,
  FileSignature, PenLine, Upload, ScanLine, Languages, Brain,
  TrendingUp, Euro, Home, Briefcase, Lock, Eye, Lightbulb,
  FileCheck, Shield, MessageSquare
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80";
const DOC_IMAGE = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80";

interface ScannedReport {
  detectedEntities: { label: string; value: string; farsiMeaning: string }[];
  translationFarsi: string;
  verdict: string;
}

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۲", label: "نوع سند پشتیبانی", icon: "📄" },
  { value: "۱۰۰٪", label: "رایگان و آنی", icon: "⚡" },
  { value: "DE", label: "آلمانی اتریشی", icon: "🇦🇹" },
  { value: "AI", label: "تحلیل هوشمند", icon: "🧠" },
];

// ==========================================
// FEATURES
// ==========================================
const FEATURES = [
  {
    icon: ScanLine,
    title: "استخراج خودکار داده‌ها",
    text: "اطلاعات کلیدی مثل موجر، اجاره پایه، ودیعه و هزینه‌های جانبی از متن سند استخراج می‌شود.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Languages,
    title: "ترجمه فارسی روان",
    text: "متن حقوقی آلمانی به فارسی روان ترجمه شده و اصطلاحات تخصصی توضیح داده می‌شوند.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: ShieldCheck,
    title: "بررسی حقوقی سریع",
    text: "سند از نظر مطابقت با قوانین اتریش (MRG, ABGB) و نشانه‌های کلاهبرداری بررسی می‌شود.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Lock,
    title: "کاملاً محرمانه",
    text: "تمام پردازش در مرورگر شما انجام می‌شود و هیچ اطلاعاتی به سرور ارسال نمی‌گردد.",
    color: "from-rose-500 to-pink-600",
  },
];

// ==========================================
// HOW IT WORKS
// ==========================================
const HOW_IT_WORKS = [
  {
    n: "۰۱",
    icon: FileText,
    title: "نوع سند را انتخاب کنید",
    text: "قرارداد اجاره (Mietvertrag) یا وکالت‌نامه (Vollmacht) را از فهرست انتخاب نمایید.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    n: "۰۲",
    icon: Upload,
    title: "متن سند را وارد کنید",
    text: "متن آلمانی سند را در کادر مربوطه پیست کنید یا از نمونه آماده استفاده نمایید.",
    color: "from-sky-500 to-blue-600",
  },
  {
    n: "۰۳",
    icon: Brain,
    title: "تحلیل هوشمند را دریافت کنید",
    text: "گزارش کامل با استخراج داده‌ها، ترجمه فارسی و بررسی حقوقی در چند لحظه آماده می‌شود.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// USE CASES
// ==========================================
const USE_CASES = [
  {
    icon: Home,
    title: "قرارداد اجاره مسکن",
    text: "بررسی Mietvertrag برای اطمینان از رعایت مهلت‌ها، مبلغ اجاره و شرایط قانونی.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: FileSignature,
    title: "وکالت‌نامه اداری",
    text: "تحلیل Vollmacht برای واگذاری اختیارات به وکیل در ادارات مهاجرت و مالیاتی.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Briefcase,
    title: "قرارداد کاری",
    text: "درک شرایط استخدام، مهلت‌های اعلامیه و حقوق قانونی در Arbeitsvertrag.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Landmark,
    title: "اسناد بیمه‌ای",
    text: "درک پوشش بیمه درمانی، مسئولیت و مستمری از اسناد رسمی آلمانی.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا این سامانه متن سند را به‌طور واقعی ترجمه می‌کند؟",
    a: "در نسخه فعلی، سامانه بر اساس قالب‌های از پیش تعریف‌شده (Mietvertrag و Vollmacht) عمل می‌کند و گزارش نمونه ارائه می‌دهد. این نسخه نمایشی برای نمایش قابلیت‌های کامل سامانه است. نسخه نهایی با اتصال به سرویس‌های OCR و ترجمه هوشمند، قادر به پردازش هر متنی خواهد بود.",
  },
  {
    q: "آیا اطلاعات من ذخیره می‌شود؟",
    a: "خیر، کاملاً امن است. در نسخه فعلی تمام پردازش در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال یا ذخیره نمی‌شود. اطلاعات پس از بستن صفحه پاک می‌شوند.",
  },
  {
    q: "آیا این تحلیل جایگزین مشاوره حقوقی است؟",
    a: "خیر. این ابزار برای کمک به درک سریع اسناد طراحی شده است، اما جایگزین مشاوره حقوقی رسمی نیست. برای تصمیم‌های مهم یا پرونده‌های پیچیده، همیشه با وکیل یا مشاور رسمی مشورت کنید.",
  },
  {
    q: "چه نوع اسنادی را می‌توانم تحلیل کنم؟",
    a: "در نسخه فعلی، دو نوع سند پشتیبانی می‌شود: قرارداد اجاره مسکن (Mietvertrag) و وکالت‌نامه اداری (Vollmacht). نسخه‌های آینده شامل قرارداد کاری، اسناد بیمه، مالیات و سایر اسناد رسمی اتریش خواهند بود.",
  },
  {
    q: "چگونه می‌توانم متنی برای تست وارد کنم؟",
    a: "دکمه «پست نمونه سند آلمانی تستی» را در فرم کلیک کنید تا متن نمونه به‌طور خودکار وارد شود. سپس دکمه پردازش را بزنید تا گزارش کامل تحلیل را مشاهده کنید.",
  },
];

export default function DigitalPaperworkWizard() {
  const [docContent, setDocContent] = useState<string>("");
  const [docType, setDocType] = useState<string>("mietvertrag");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [report, setReport] = useState<ScannedReport | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSimulateOCR = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setReport(null);

    setTimeout(() => {
      setIsProcessing(false);
      if (docType === "mietvertrag") {
        setReport({
          detectedEntities: [
            { label: "Vermieter", value: "Dr. Johann Huber", farsiMeaning: "موجر / صاحب آپارتمان" },
            { label: "Kaltmiete", value: "€ 730,00", farsiMeaning: "اجاره پایه سرد بدون شارژ" },
            { label: "Betriebskosten", value: "€ 150,00", farsiMeaning: "هزینه‌های نگهداری ساختمان" },
            { label: "Kaution", value: "€ 2.640,00", farsiMeaning: "ودیعه ضمانت مسکن (۳ ماه اجاره)" },
          ],
          translationFarsi:
            "قرارداد اجاره مسکونی منعقده فی‌مابین دکتر یوهان هوبر و شخص مستاجر. مبلغ اجاره سرد ماهانه ۷۳۰ یورو بوده که مضافاً ۱۵۰ یورو هزینه جانبی شارژ آپارتمان پرداخت خواهد شد. مستاجر موظف به تودیع مبلغ ۲,۶۴۰ یورو ودیعه نقدی بازیافتی می‌باشد.",
          verdict:
            "✅ این سند یک قرارداد استاندارد اجاره آپارتمان مسکونی در وین اتریش (Mietvertrag) منطبق با قانون حمایت از مستاجری MRG اتریش بوده و عاری از کلاه‌برداری‌های فیشینگ است.",
        });
      } else {
        setReport({
          detectedEntities: [
            { label: "Vollmachtgeber", value: "Sina Karimi", farsiMeaning: "موکل / فرستنده نیابت" },
            { label: "Bevollmächtigter", value: "Arash Bahrami", farsiMeaning: "وکیل / پذیرا" },
            { label: "Wirkungskreis", value: "Magistrat 35", farsiMeaning: "کالیبره قانونی اختیارات رسمی" },
          ],
          translationFarsi:
            "برگه رسمی تفویض اختیارات تام و وکالت کاری جهت ثبت نام خوابگاه یا تحویل ملدتستل توسط آرش بهرامی به نمایندگی از سینا کریمی در اداره مهاجرت وین MA 35.",
          verdict:
            "✅ برگه وکالت‌نامه کاری Vollmacht تنظیم شده فاقد تعهدات مالی بوده و صرفاً صلاحیت‌های اداری را واگذار می‌کند.",
        });
      }
    }, 1500);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "آنالیزور هوشمند اسناد اداری اتریش - اتریش‌نشین",
      url: "https://otrish-iran.ir/digital-paperwork",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "ابزار رایگان تحلیل و ترجمه اسناد حقوقی اتریشی مانند Mietvertrag و Vollmacht با استخراج هوشمند داده‌های مالی به فارسی.",
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
      name: "چگونه اسناد اداری اتریش را تحلیل کنیم",
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
        title="آنالیزور هوشمند اسناد اداری اتریش | تحلیل و ترجمه Mietvertrag و Vollmacht"
        description="ابزار رایگان تحلیل اسناد حقوقی اتریشی: استخراج خودکار داده‌های کلیدی، ترجمه فارسی روان و بررسی حقوقی Mietvertrag و Vollmacht. مخصوص فارسی‌زبانان مقیم اتریش."
        keywords="ترجمه سند اتریش, تحلیل Mietvertrag, Vollmacht ترجمه, OCR آلمانی, اسناد حقوقی اتریش, اجاره نامه اتریش, وکالت نامه MA35, اتریش‌نشین"
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
                alt="اسناد حقوقی اتریش"
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              ⚖️
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
                  <Gavel className="w-3.5 h-3.5 text-amber-300" />
                  Austrian Legal Document Analyzer
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  آنالیزور هوشمند اسناد اداری اتریش
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  سند حقوقی آلمانی خود را پیست کنید و در چند لحظه، گزارش کاملی از
                  اصطلاحات کلیدی، ترجمه فارسی روان و بررسی حقوقی دریافت نمایید.
                  طراحی‌شده برای فارسی‌زبانان مقیم اتریش، مطابق قوانین MRG و ABGB.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>کاملاً رایگان</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Lock className="w-3.5 h-3.5" />
                    <span>محرمانه و امن</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>تحلیل آنی</span>
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
          {/* MAIN WIZARD */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden relative"
            id="digital-paperwork-wizard-module"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

            {/* Header */}
            <div className="p-6 md:p-8 border-b border-stone-100">
              <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black bg-rose-100 text-[#c8102e] px-2.5 py-1 rounded-full">
                      نسخه آزمایشی
                    </span>
                    <Scale className="w-4 h-4 text-[#c8102e]" />
                  </div>
                  <h2 className="font-black text-stone-900 text-lg md:text-2xl leading-tight">
                    سامانه تحلیل و ترجمه اسناد حقوقی اتریش
                  </h2>
                  <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed max-w-2xl">
                    تست مفاد اجاره‌نامه‌های اتریش (Mietvertrag) و تفویض وکالت
                    (Vollmacht) با استخراج خودکار اصطلاحات مالی به زبان فارسی
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-emerald-700">
                    آماده پردازش
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <form onSubmit={handleSimulateOCR} className="space-y-5">
                {/* Doc Type & Sample Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-stone-600 block mb-2 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-[#c8102e]" />
                      نوع سند حقوقی اتریش:
                    </label>
                    <select
                      value={docType}
                      onChange={(e) => {
                        setDocType(e.target.value);
                        setReport(null);
                      }}
                      className="w-full bg-stone-50 border-2 border-stone-200 p-3 rounded-xl text-xs outline-none cursor-pointer font-black text-stone-800 focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
                    >
                      <option value="mietvertrag">
                        📝 قرارداد اجاره مسکن رسمی (Mietvertrag)
                      </option>
                      <option value="vollmacht">
                        📜 تفویض وکالت اداری (Vollmacht)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-stone-600 block mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#c8102e]" />
                      شبیه‌ساز متن اسناد حقوقی اتریشی (برای تست):
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setDocContent(
                          docType === "mietvertrag"
                            ? "Mietvertrag zwischen Dr. Johann Huber (Vermieter) und Herrn Toyserkani. Die monatliche Kaltmiete beträgt EUR 730,00 zuzüglich EUR 150,00 Betriebskosten. Die Kaution beläuft sich auf EUR 2.640,00."
                            : "Hiermit bevollmächtige ich, Sina Karimi (Vollmachtgeber), Herrn Arash Bahrami (Bevollmächtigter) für alle Angelegenheiten bezüglich Magistrat 35 vienna."
                        )
                      }
                      className="w-full text-[11px] py-3 bg-gradient-to-br from-stone-100 to-stone-200 hover:from-amber-100 hover:to-amber-200 text-stone-800 font-black rounded-xl border-2 border-stone-200 hover:border-amber-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      پست نمونه سند آلمانی تستی 📋
                    </button>
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="text-[10px] font-black text-stone-600 block mb-2 flex items-center gap-1">
                    <PenLine className="w-3 h-3 text-[#c8102e]" />
                    متن خام سند آلمانی را وارد یا پیست کنید (آلمانی اتریشی):
                  </label>
                  <textarea
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    placeholder="مثال: Mietvertrag zwischen Dr. Johann Huber..."
                    className="w-full bg-white border-2 border-stone-200 p-4 rounded-xl text-xs font-mono outline-none h-32 focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all resize-none leading-relaxed"
                    dir="ltr"
                    required
                  />
                  <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
                    <span className="text-[10px] font-bold text-stone-400">
                      {docContent.length} کاراکتر
                    </span>
                    <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-500" />
                      اطلاعات شما کاملاً محرمانه پردازش می‌شود
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.01 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.99 }}
                  className="w-full bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-sm cursor-pointer shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>استخراج واژگان اداری و بررسی حقوقی...</span>
                    </>
                  ) : (
                    <>
                      <FileSearch className="w-4 h-4" />
                      <span>پردازش سند اداری و استخراج داده‌های مالی</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Report */}
              <AnimatePresence>
                {report && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 border-2 border-emerald-200 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50/50 to-white p-5 md:p-6 space-y-5"
                  >
                    {/* Report Header */}
                    <div className="flex items-center justify-between gap-3 border-b border-emerald-200 pb-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-emerald-500 text-white font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          تایید شد
                        </span>
                        <span className="text-[10px] bg-white border border-emerald-200 text-emerald-700 font-black px-2.5 py-1 rounded-lg">
                          OCR
                        </span>
                      </div>
                      <h4 className="font-black text-stone-900 text-xs md:text-sm flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        گزارش پردازش و استخراج اصطلاحات اتریشی
                      </h4>
                    </div>

                    {/* Detected Entities */}
                    <div>
                      <div className="text-[10px] font-black text-stone-500 mb-3 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-[#c8102e]" />
                        اصطلاحات کلیدی استخراج‌شده:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {report.detectedEntities.map((entity, id) => (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: id * 0.08 }}
                            className="bg-white border border-emerald-100 hover:border-emerald-300 p-4 rounded-2xl flex justify-between items-center gap-3 shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="text-left font-mono flex-shrink-0">
                              <span className="text-[12px] font-black text-[#c8102e] block">
                                {entity.value}
                              </span>
                              <p className="text-[9px] text-stone-400 font-black uppercase block mt-1 tracking-wider">
                                {entity.label}
                              </p>
                            </div>
                            <div className="text-right flex-1 border-r-2 border-emerald-100 pr-3">
                              <span className="text-[11px] font-black text-stone-800 leading-tight">
                                {entity.farsiMeaning}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Translation */}
                    <div className="p-4 bg-white border-2 border-stone-100 rounded-2xl space-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
                      <div className="relative">
                        <span className="text-[9px] bg-indigo-500 text-white font-black px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                          <Languages className="w-3 h-3" />
                          تعبیر ترجمه فارسی
                        </span>
                        <p className="text-xs text-stone-700 leading-relaxed font-bold mt-3 pr-1">
                          {report.translationFarsi}
                        </p>
                      </div>
                    </div>

                    {/* Verdict */}
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl font-black text-xs leading-relaxed flex items-start gap-3 shadow-md"
                    >
                      <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{report.verdict}</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* FEATURES */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                قابلیت‌های کلیدی
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار ویژگی که این سامانه را به ابزاری ضروری برای مهاجران تبدیل می‌کند
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
          {/* HOW IT WORKS */}
          {/* ========================================== */}
          <div className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                چگونه کار می‌کند؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                در سه گام ساده، سند حقوقی خود را تحلیل کنید
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
          {/* USE CASES */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                کاربردهای این سامانه
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                برای چه اسنادی می‌توانید از این ابزار استفاده کنید
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {USE_CASES.map((u, i) => {
                const Icon = u.icon;
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
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${u.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-stone-900 text-xs mb-1.5">
                      {u.title}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                      {u.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* PRIVACY BANNER */}
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
                <Lock className="w-8 h-8 md:w-10 md:h-10" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-black text-stone-900 mb-2">
                  حریم خصوصی و امنیت داده‌های شما
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                  ما به حفاظت از اطلاعات حساس شما متعهد هستیم. این سامانه با
                  رعایت کامل استانداردهای GDPR اروپا طراحی شده است.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { icon: Eye, label: "بدون ذخیره‌سازی" },
                    { icon: Shield, label: "پردازش محلی" },
                    { icon: Lock, label: "رمزنگاری کامل" },
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
                پاسخ به پرتکرارترین سوالات درباره این سامانه هوشمند
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
                نکات مهم و محدودیت‌ها
              </h5>
              <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>این سامانه در نسخه آزمایشی بوده و از قالب‌های از پیش تعریف‌شده برای نمایش استفاده می‌کند.</li>
                <li>تحلیل حقوقی این ابزار جایگزین مشاوره وکیل رسمی نیست.</li>
                <li>برای پرونده‌های پیچیده حقوقی، حتماً با وکیل متخصص در حقوق مهاجرت مشورت کنید.</li>
                <li>اتریش‌نشین مسئولیتی در قبال تصمیمات مبتنی بر این تحلیل‌ها نمی‌پذیرد.</li>
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
                سند حقوقی دارید که نمی‌فهمید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                اگر سند اداری آلمانی دارید و به کمک نیاز دارید، تیم اتریش‌نشین
                آماده ارائه مشاوره رایگان و کمک به درک مفاد سند شماست.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
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
                این سامانه در حال حاضر در نسخه نمایشی است و از قالب‌های از پیش
                تعریف‌شده برای نمایش قابلیت‌ها استفاده می‌کند. تحلیل‌های ارائه‌شده
                جنبه آموزشی دارند و جایگزین مشاوره حقوقی رسمی نیستند. برای پرونده‌های
                مهم، حتماً با وکیل یا مشاور رسمی مشورت کنید. اتریش‌نشین مسئولیتی
                در قبال تصمیمات مبتنی بر این تحلیل‌ها نمی‌پذیرد.
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