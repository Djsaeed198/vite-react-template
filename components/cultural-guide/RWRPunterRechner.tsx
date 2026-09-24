import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calculator, User, GraduationCap, Briefcase, Languages, Award,
  CheckCircle, AlertTriangle, Info, TrendingUp, Target, Star,
  Send, Phone, ExternalLink, RefreshCw, ChevronDown, ChevronLeft,
  Sparkles, ShieldCheck, Clock, Users, Globe, FileText, HelpCircle,
  ThumbsUp, ThumbsDown, MessageCircle, Share2, Download, Printer
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
type RWRCategory = "veryHighlyQualified" | "skilledWorker" | "otherKeyWorker";

interface PointsBreakdown {
  age: number;
  education: number;
  experience: number;
  language: number;
  bonus: number;
}

interface AgeOption {
  label: string;
  value: number;
  points: number;
  description: string;
}

interface EducationOption {
  label: string;
  value: string;
  points: number;
  description: string;
  category: RWRCategory[];
}

interface ExperienceOption {
  label: string;
  value: number;
  points: number;
  description: string;
}

interface LanguageOption {
  label: string;
  value: string;
  points: number;
  description: string;
  type: "german" | "english" | "other";
}

// ==========================================
// DATA: RWR POINTS SYSTEM
// ==========================================
const AGE_OPTIONS: AgeOption[] = [
  { label: "تا ۳۰ سال", value: 30, points: 15, description: "حداکثر امتیاز سنی — بهترین گزینه" },
  { label: "۳۱ تا ۴۰ سال", value: 40, points: 10, description: "امتیاز خوب برای سن" },
  { label: "۴۱ تا ۵۰ سال", value: 50, points: 5, description: "امتیاز محدود سنی" },
  { label: "بیش از ۵۰ سال", value: 51, points: 0, description: "بدون امتیاز سنی" },
];

const EDUCATION_OPTIONS: EducationOption[] = [
  {
    label: "دکترا یا فوق‌لیسانس در رشته STEM",
    value: "stem_master",
    points: 30,
    description: "علوم، فناوری، مهندسی، ریاضیات — حداکثر امتیاز تحصیلی",
    category: ["veryHighlyQualified", "skilledWorker", "otherKeyWorker"],
  },
  {
    label: "دکترا یا فوق‌لیسانس در سایر رشته‌ها",
    value: "non_stem_master",
    points: 25,
    description: "سایر رشته‌های دانشگاهی در سطح ارشد",
    category: ["veryHighlyQualified", "skilledWorker", "otherKeyWorker"],
  },
  {
    label: "لیسانس در رشته STEM",
    value: "stem_bachelor",
    points: 20,
    description: "کارشناسی در علوم، فناوری، مهندسی، ریاضیات",
    category: ["veryHighlyQualified", "skilledWorker", "otherKeyWorker"],
  },
  {
    label: "لیسانس در سایر رشته‌ها",
    value: "non_stem_bachelor",
    points: 15,
    description: "کارشناسی در سایر رشته‌ها",
    category: ["veryHighlyQualified", "skilledWorker", "otherKeyWorker"],
  },
  {
    label: "دیپلم یا تحصیلات متوسطه",
    value: "high_school",
    points: 5,
    description: "حداقل مدرک تحصیلی قابل قبول",
    category: ["otherKeyWorker"],
  },
  {
    label: "بدون مدرک دانشگاهی",
    value: "none",
    points: 0,
    description: "بدون مدرک تحصیلی قابل توجه",
    category: ["veryHighlyQualified", "skilledWorker"],
  },
];

const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { label: "بیش از ۵ سال سابقه", value: 6, points: 20, description: "حداکثر امتیاز سابقه کاری" },
  { label: "۳ تا ۵ سال سابقه", value: 4, points: 15, description: "سابقه کاری قوی" },
  { label: "۱ تا ۳ سال سابقه", value: 2, points: 10, description: "سابقه کاری متوسط" },
  { label: "کمتر از ۱ سال سابقه", value: 1, points: 0, description: "بدون امتیاز سابقه" },
];

const GERMAN_LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: "آلمانی سطح B1 یا بالاتر", value: "b1", points: 15, description: "استفاده مستقل از زبان — حداکثر امتیاز", type: "german" },
  { label: "آلمانی سطح A2", value: "a2", points: 10, description: "استفاده پایه از زبان", type: "german" },
  { label: "آلمانی سطح A1", value: "a1", points: 5, description: "سطح مبتدی", type: "german" },
  { label: "بدون آلمانی", value: "none", points: 0, description: "بدون دانش زبان آلمانی", type: "german" },
];

const ENGLISH_LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: "انگلیسی سطح C1 یا بالاتر", value: "c1", points: 10, description: "تسلط کامل — IELTS 7.0+", type: "english" },
  { label: "انگلیسی سطح B2", value: "b2", points: 5, description: "سطح متوسط بالا — IELTS 6.0-6.5", type: "english" },
  { label: "انگلیسی سطح پایین‌تر", value: "low", points: 0, description: "بدون امتیاز زبان انگلیسی", type: "english" },
];

// ==========================================
// THRESHOLDS
// ==========================================
const THRESHOLDS: Record<RWRCategory, { min: number; max: number; label: string; description: string }> = {
  veryHighlyQualified: {
    min: 70,
    max: 100,
    label: "نیروی بسیار متخصص",
    description: "نیازمند ۷۰ امتیاز از ۱۰۰ — برای متخصصان برجسته",
  },
  skilledWorker: {
    min: 55,
    max: 90,
    label: "کارگر متخصص (RWR)",
    description: "نیازمند ۵۵ امتیاز از ۹۰ — نیازمند پیشنهاد شغلی",
  },
  otherKeyWorker: {
    min: 55,
    max: 90,
    label: "سایر نیروهای کلیدی",
    description: "نیازمند ۵۵ امتیاز از ۹۰ — برای سایر مشاغل کلیدی",
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const RWRPunterRechner: React.FC = () => {
  const [category, setCategory] = useState<RWRCategory>("skilledWorker");
  const [age, setAge] = useState<number | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [experience, setExperience] = useState<number | null>(null);
  const [germanLang, setGermanLang] = useState<string | null>(null);
  const [englishLang, setEnglishLang] = useState<string | null>(null);
  const [englishBonus, setEnglishBonus] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // ==========================================
  // CALCULATIONS
  // ==========================================
  const points: PointsBreakdown = useMemo(() => {
    const agePoints = AGE_OPTIONS.find((a) => a.value === age)?.points || 0;

    const eduOption = EDUCATION_OPTIONS.find((e) => e.value === education);
    const eduPoints = eduOption && eduOption.category.includes(category) ? eduOption.points : 0;

    const expPoints = EXPERIENCE_OPTIONS.find((e) => e.value === experience)?.points || 0;

    const germanPoints = GERMAN_LANGUAGE_OPTIONS.find((l) => l.value === germanLang)?.points || 0;
    const englishPoints = ENGLISH_LANGUAGE_OPTIONS.find((l) => l.value === englishLang)?.points || 0;
    const langPoints = Math.min(germanPoints + englishPoints, 25);

    const bonusPoints = englishBonus ? 5 : 0;

    return {
      age: agePoints,
      education: eduPoints,
      experience: expPoints,
      language: langPoints,
      bonus: bonusPoints,
    };
  }, [category, age, education, experience, germanLang, englishLang, englishBonus]);

  const total = points.age + points.education + points.experience + points.language + points.bonus;
  const threshold = THRESHOLDS[category];
  const maxPoints = threshold.max;
  const percentage = Math.min((total / maxPoints) * 100, 100);
  const isQualified = total >= threshold.min;
  const gap = Math.max(0, threshold.min - total);

  const progressColor = isQualified
    ? "from-emerald-500 to-green-600"
    : total >= threshold.min - 10
    ? "from-amber-500 to-orange-500"
    : "from-rose-500 to-red-600";

  // ==========================================
  // ACTIONS
  // ==========================================
  const resetForm = () => {
    setAge(null);
    setEducation(null);
    setExperience(null);
    setGermanLang(null);
    setEnglishLang(null);
    setEnglishBonus(false);
    setShowResult(false);
  };

  const generateWhatsAppMessage = (): string => {
    const statusEmoji = isQualified ? "✅" : "⚠️";
    const statusText = isQualified
      ? "شما واجد شرایط دریافت کارت قرمز-سفید-قرمز هستید!"
      : `شما ${gap} امتیاز کمتر از حداقل لازم (${threshold.min} امتیاز) دارید.`;

    const message = `
🇦🇹 *نتیجه محاسبه امتیاز RWR — اتریش‌نشین*

📋 نوع درخواست: ${threshold.label}
🎯 امتیاز کل: *${total} از ${maxPoints}*
${statusEmoji} وضعیت: ${statusText}

━━━━━━━━━━━━━━━━
*جزئیات امتیاز:*
👤 سن: ${points.age} امتیاز
🎓 تحصیلات: ${points.education} امتیاز
💼 سابقه کاری: ${points.experience} امتیاز
🗣️ زبان: ${points.language} امتیاز
⭐ امتیاز ویژه: ${points.bonus} امتیاز
━━━━━━━━━━━━━━━━

${isQualified
  ? "🎉 تبریک! شما می‌توانید برای دریافت RWR Card اقدام کنید."
  : "📞 برای مشاوره رایگان و بررسی شرایط خود، با کارشناسان اتریش‌نشین در واتس‌اپ تماس بگیرید."}

🔗 مشاوره رایگان: https://wa.me/436889763256
🌐 اتریش‌نشین — همیار فارسی‌زبانان مقیم اتریش
    `.trim();

    return encodeURIComponent(message);
  };

  const sendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/436889763256?text=${message}`;
    window.open(url, "_blank");
    toast.success("در حال انتقال به واتس‌اپ…");
  };

  const shareResult = async () => {
    const message = decodeURIComponent(generateWhatsAppMessage());
    if (navigator.share) {
      try {
        await navigator.share({
          title: "محاسبه امتیاز RWR — اتریش‌نشین",
          text: message,
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(message);
      toast.success("متن نتیجه کپی شد!");
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "ماشین‌حساب امتیاز RWR — اتریش‌نشین",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      description:
        "محاسبه آنلاین امتیاز کارت قرمز-سفید-قرمز (RWR) اتریش بر اساس سن، تحصیلات، سابقه کار و زبان",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
  ];

  return (
    <>
      <SEO
        title="محاسبه امتیاز کارت قرمز-سفید-قرمز (RWR) اتریش ۲۰۲۶ | اتریش‌نشین"
        description="ماشین‌حساب آنلاین امتیاز RWR Card اتریش بر اساس سن، تحصیلات، سابقه کار، زبان آلمانی و انگلیسی. بررسی سریع واجد شرایط بودن + مشاوره رایگان واتس‌اپ."
        keywords="RWR Card, کارت قرمز سفید قرمز, امتیاز RWR, ویزای کار اتریش, مهاجرت کاری اتریش, محاسبه امتیاز RWR, RWR Punkterechner"
        schemaData={seoSchema}
      />

      <div className="space-y-6 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO HEADER */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-8 -bottom-12 text-[220px] opacity-5 pointer-events-none select-none">
            🎯
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              بر اساس آخرین قوانین ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl font-black leading-tight mt-4 mb-3">
              ماشین‌حساب امتیاز
              <br />
              کارت قرمز-سفید-قرمز (RWR)
            </h1>

            <p className="text-sm text-rose-100 leading-relaxed max-w-2xl">
              با پاسخ به چند سوال ساده، امتیاز خود را برای ویزای کار اتریش محاسبه کنید و بلافاصله
              متوجه شوید که واجد شرایط هستید یا خیر. نتیجه به‌صورت مستقیم برای مشاوره رایگان به
              واتس‌اپ اتریش‌نشین ارسال می‌شود.
            </p>

            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 text-[11px] font-bold text-rose-200">
                <ShieldCheck className="w-4 h-4" />
                <span>رایگان و بدون نیاز به ثبت‌نام</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-rose-200">
                <Clock className="w-4 h-4" />
                <span>کمتر از ۲ دقیقه</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* CATEGORY SELECTOR */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm">
          <h2 className="font-black text-stone-800 text-sm mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#c8102e]" />
            نوع درخواست RWR Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(Object.keys(THRESHOLDS) as RWRCategory[]).map((cat) => {
              const t = THRESHOLDS[cat];
              const active = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat);
                    setShowResult(false);
                  }}
                  className={`text-right p-4 rounded-2xl border-2 transition-all ${
                    active
                      ? "border-[#c8102e] bg-gradient-to-br from-[#c8102e]/5 to-transparent shadow-md"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        active ? "bg-[#c8102e] text-white" : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {t.min} امتیاز از {t.max}
                    </span>
                    {active && <CheckCircle className="w-4 h-4 text-[#c8102e]" />}
                  </div>
                  <div className="font-black text-xs text-stone-800 mb-1">{t.label}</div>
                  <div className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {t.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* FORM SECTIONS */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            {/* --- AGE --- */}
            <FormSection
              icon={<User className="w-4 h-4" />}
              title="سن متقاضی"
              subtitle="حداکثر ۱۵ امتیاز"
              points={points.age}
              color="bg-blue-50 text-blue-700"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {AGE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    active={age === opt.value}
                    onClick={() => setAge(opt.value)}
                    label={opt.label}
                    sub={`${opt.points} امتیاز`}
                  />
                ))}
              </div>
            </FormSection>

            {/* --- EDUCATION --- */}
            <FormSection
              icon={<GraduationCap className="w-4 h-4" />}
              title="تحصیلات"
              subtitle="حداکثر ۳۰ امتیاز — بر اساس نوع درخواست"
              points={points.education}
              color="bg-purple-50 text-purple-700"
            >
              <div className="space-y-2">
                {EDUCATION_OPTIONS.filter((e) => e.category.includes(category)).map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      education === opt.value
                        ? "border-[#c8102e] bg-[#c8102e]/5"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="education"
                      checked={education === opt.value}
                      onChange={() => setEducation(opt.value)}
                      className="mt-1 accent-[#c8102e]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-xs text-stone-800">{opt.label}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            education === opt.value
                              ? "bg-[#c8102e] text-white"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {opt.points} امتیاز
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                        {opt.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </FormSection>

            {/* --- EXPERIENCE --- */}
            <FormSection
              icon={<Briefcase className="w-4 h-4" />}
              title="سابقه کار مرتبط"
              subtitle="حداکثر ۲۰ امتیاز — در ۵ سال گذشته"
              points={points.experience}
              color="bg-amber-50 text-amber-700"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    active={experience === opt.value}
                    onClick={() => setExperience(opt.value)}
                    label={opt.label}
                    sub={`${opt.points} امتیاز`}
                  />
                ))}
              </div>
            </FormSection>

            {/* --- GERMAN LANGUAGE --- */}
            <FormSection
              icon={<Languages className="w-4 h-4" />}
              title="زبان آلمانی"
              subtitle="حداکثر ۱۵ امتیاز"
              points={
                GERMAN_LANGUAGE_OPTIONS.find((l) => l.value === germanLang)?.points || 0
              }
              color="bg-emerald-50 text-emerald-700"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {GERMAN_LANGUAGE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    active={germanLang === opt.value}
                    onClick={() => setGermanLang(opt.value)}
                    label={opt.label}
                    sub={`${opt.points} امتیاز`}
                  />
                ))}
              </div>
            </FormSection>

            {/* --- ENGLISH LANGUAGE --- */}
            <FormSection
              icon={<Globe className="w-4 h-4" />}
              title="زبان انگلیسی"
              subtitle="حداکثر ۱۰ امتیاز — مجموع زبان حداکثر ۲۵"
              points={
                ENGLISH_LANGUAGE_OPTIONS.find((l) => l.value === englishLang)?.points || 0
              }
              color="bg-indigo-50 text-indigo-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {ENGLISH_LANGUAGE_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    active={englishLang === opt.value}
                    onClick={() => setEnglishLang(opt.value)}
                    label={opt.label}
                    sub={`${opt.points} امتیاز`}
                  />
                ))}
              </div>

              {/* Bonus */}
              <div className="mt-4 p-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={englishBonus}
                    onChange={(e) => setEnglishBonus(e.target.checked)}
                    className="w-4 h-4 accent-[#c8102e]"
                  />
                  <div>
                    <div className="font-black text-xs text-amber-900 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      امتیاز ویژه: زبان شرکت انگلیسی است (+۵)
                    </div>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">
                      اگر زبان اصلی شرکت مقصد انگلیسی باشد، ۵ امتیاز اضافه دریافت می‌کنید.
                    </p>
                  </div>
                </label>
              </div>
            </FormSection>
          </div>

          {/* ========================================== */}
          {/* SIDEBAR: LIVE RESULT */}
          {/* ========================================== */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Score Card */}
              <motion.div
                layout
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8102e]/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-[#c8102e]" />
                    <h3 className="font-black text-stone-800 text-sm">امتیاز زنده شما</h3>
                  </div>

                  {/* Big number */}
                  <div className="text-center mb-4">
                    <motion.div
                      key={total}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl font-black text-stone-900"
                    >
                      {total}
                    </motion.div>
                    <div className="text-xs font-black text-stone-400 mt-1">
                      از {maxPoints} امتیاز
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${progressColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] font-black text-stone-400">
                      <span>۰</span>
                      <span className="text-[#c8102e]">حداقل: {threshold.min}</span>
                      <span>{maxPoints}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`rounded-2xl p-4 text-center ${
                      isQualified
                        ? "bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200"
                        : total > 0
                        ? "bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200"
                        : "bg-stone-50 border border-stone-200"
                    }`}
                  >
                    {isQualified ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                        <div className="font-black text-emerald-800 text-xs">
                          واجد شرایط هستید! 🎉
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold mt-1">
                          شما {total} امتیاز دارید و حداقل لازم {threshold.min} است.
                        </p>
                      </>
                    ) : total > 0 ? (
                      <>
                        <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto mb-1" />
                        <div className="font-black text-amber-800 text-xs">
                          {gap} امتیاز دیگر نیاز دارید
                        </div>
                        <p className="text-[10px] text-amber-600 font-bold mt-1">
                          با بهبود زبان یا سابقه کار می‌توانید جبران کنید.
                        </p>
                      </>
                    ) : (
                      <>
                        <Info className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                        <div className="font-black text-stone-600 text-xs">
                          فرم را تکمیل کنید
                        </div>
                        <p className="text-[10px] text-stone-500 font-bold mt-1">
                          امتیاز شما به‌صورت خودکار محاسبه می‌شود.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Breakdown */}
                  <div className="mt-4 space-y-2">
                    <BreakdownRow icon="👤" label="سن" value={points.age} max={15} />
                    <BreakdownRow icon="🎓" label="تحصیلات" value={points.education} max={30} />
                    <BreakdownRow icon="💼" label="سابقه کار" value={points.experience} max={20} />
                    <BreakdownRow icon="🗣️" label="زبان" value={points.language} max={25} />
                    {points.bonus > 0 && (
                      <BreakdownRow icon="⭐" label="امتیاز ویژه" value={points.bonus} max={5} />
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-5 space-y-2">
                    <button
                      onClick={sendToWhatsApp}
                      disabled={total === 0}
                      className={`w-full flex items-center justify-center gap-2 font-black text-xs py-3 rounded-2xl transition-all ${
                        total === 0
                          ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                          : "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg hover:scale-[1.02]"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      ارسال نتیجه به واتس‌اپ اتریش‌نشین
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={resetForm}
                        className="flex items-center justify-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-[11px] py-2.5 rounded-2xl transition"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        شروع مجدد
                      </button>
                      <button
                        onClick={shareResult}
                        disabled={total === 0}
                        className={`flex items-center justify-center gap-1.5 font-black text-[11px] py-2.5 rounded-2xl transition ${
                          total === 0
                            ? "bg-stone-100 text-stone-400 cursor-not-allowed"
                            : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                        }`}
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        اشتراک‌گذاری
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Card */}
              {total > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-5 text-white"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="font-black text-sm">مشاوره رایگان با اتریش‌نشین</h3>
                  </div>
                  <p className="text-[11px] text-stone-300 font-bold leading-relaxed mb-4">
                    {isQualified
                      ? "تبریک! شما واجد شرایط هستید. برای تکمیل مراحل و بررسی مدارک، همین حالا با کارشناسان ما مشورت کنید."
                      : `شما ${gap} امتیاز کمتر دارید. کارشناسان ما می‌توانند راهکارهای عملی برای تقویت پرونده شما ارائه دهند.`}
                  </p>
                  <a
                    href={`https://wa.me/436889763256?text=${generateWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs py-3 rounded-2xl shadow-lg hover:scale-[1.02] transition"
                  >
                    <Phone className="w-4 h-4" />
                    مشاوره تخصصی رایگان
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO SECTION */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            icon="🎯"
            title="حداقل امتیاز"
            text={`برای ویزای کار معمولی (RWR) حداقل ${THRESHOLDS.skilledWorker.min} امتیاز از ${THRESHOLDS.skilledWorker.max} نیاز است.`}
          />
          <InfoCard
            icon="📋"
            title="پیشنهاد شغلی"
            text="داشتن پیشنهاد شغلی معتبر از یک کارفرمای اتریشی الزامی است."
          />
          <InfoCard
            icon="💰"
            title="حداقل حقوق"
            text="حقوق ناخالص ماهانه حداقل € 3,465 (۲۰۲۶) به‌همراه پرداخت‌های ویژه."
          />
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="font-black text-stone-800 text-sm mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#c8102e]" />
            سوالات متداول درباره امتیاز RWR
          </h3>
          <div className="space-y-3">
            {[
              {
                q: "حداقل امتیاز برای دریافت RWR Card چقدر است؟",
                a: "برای نیروی بسیار متخصص ۷۰ امتیاز از ۱۰۰، و برای کارگران متخصص و سایر نیروهای کلیدی ۵۵ امتیاز از ۹۰ امتیاز لازم است.",
              },
              {
                q: "آیا مدرک زبان فارسی امتیاز دارد؟",
                a: "خیر، در سیستم امتیازدهی RWR فقط زبان‌های آلمانی، انگلیسی، فرانسوی، اسپانیایی و بوسنیایی-کروات-صربی امتیاز دارند.",
              },
              {
                q: "سابقه کار در ایران قابل قبول است؟",
                a: "بله، اما باید با مدرک تحصیلی شما مرتبط باشد و مدارک آن ترجمه رسمی و تاییدشده ارائه شود.",
              },
              {
                q: "چقدر طول می‌کشد تا نتیجه مشخص شود؟",
                a: "فرآیند بررسی معمولاً ۸ تا ۱۲ هفته طول می‌کشد. برای مشاوره و بررسی سریع، با ما در واتس‌اپ تماس بگیرید.",
              },
            ].map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
            <b>توجه:</b> این ماشین‌حساب صرفاً جنبه راهنمایی دارد و جایگزین ارزیابی رسمی AMS (اداره
            کار اتریش) نمی‌شود. امتیاز نهایی توسط مقامات اتریشی بر اساس مدارک ارسالی شما محاسبه
            می‌شود. برای مشاوره تخصصی و رایگان، با اتریش‌نشین در واتس‌اپ تماس بگیرید.
          </p>
        </div>
      </div>
    </>
  );
};

// ==========================================
// SUB-COMPONENTS
// ==========================================
function FormSection({
  icon,
  title,
  subtitle,
  points,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  points: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-black text-stone-800 text-sm">{title}</h3>
            <p className="text-[10px] text-stone-400 font-bold">{subtitle}</p>
          </div>
        </div>
        {points > 0 && (
          <motion.span
            key={points}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-[11px] font-black bg-[#c8102e]/10 text-[#c8102e] px-3 py-1 rounded-full"
          >
            +{points} امتیاز
          </motion.span>
        )}
      </div>
      {children}
    </motion.div>
  );
}

function OptionButton({
  active,
  onClick,
  label,
  sub,
}: {
  key?: React.Key;
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-2xl border-2 text-right transition-all ${
        active
          ? "border-[#c8102e] bg-[#c8102e]/5 shadow-sm"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      <div className="font-black text-[11px] text-stone-800 leading-tight">{label}</div>
      <div
        className={`text-[9px] font-bold mt-1 ${active ? "text-[#c8102e]" : "text-stone-400"}`}
      >
        {sub}
      </div>
    </button>
  );
}

function BreakdownRow({
  icon,
  label,
  value,
  max,
}: {
  icon: string;
  label: string;
  value: number;
  max: number;
}) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <span className="text-[10px] font-black text-stone-500 flex-1">{label}</span>
      <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${
            pct > 66 ? "bg-emerald-500" : pct > 33 ? "bg-amber-400" : "bg-stone-300"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-black text-stone-700 w-4 text-left">{value}</span>
    </div>
  );
}

function InfoCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-5">
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="font-black text-stone-800 text-xs mb-1">{title}</h4>
      <p className="text-[11px] text-stone-500 font-bold leading-relaxed">{text}</p>
    </div>
  );
}

function FaqItem({
  q,
  a,
}: {
  key?: React.Key;
  q: string;
  a: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all ${
        open ? "border-[#c8102e]/30 bg-[#c8102e]/[0.02]" : "border-stone-200"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full p-3 flex items-center justify-between text-right"
      >
        <span className="font-black text-[11px] text-stone-800 flex-1">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-3 pb-3 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default RWRPunterRechner;