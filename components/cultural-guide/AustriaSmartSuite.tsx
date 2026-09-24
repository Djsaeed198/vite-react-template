import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, Bell, FileText, CheckCircle2, RefreshCw, ShieldCheck, Send,
  Download, Award, Volume2, Check, AlertTriangle, Coins, MapPin, Sparkles,
  ExternalLink, ChevronRight, Calculator, UserCheck, ChevronLeft, Search,
  Globe, Building2, GraduationCap, HeartPulse, Briefcase, Home, Bus,
  UtensilsCrossed, Car, BookOpen, Users, Star, MessageCircle, PhoneCall,
  Menu, X, ArrowUpRight, BadgeCheck, Flag
} from "lucide-react";

/* ============================================================
   🇦🇹 AUSTRIAN RESIDENT BRAND LOGO — SVG INLINE COMPONENT
   ============================================================ */
export const AustriaResidentLogo: React.FC<{ size?: number; variant?: "dark" | "light" }> = ({
  size = 46,
  variant = "dark",
}) => {
  const textColor = variant === "dark" ? "#0c0a09" : "#ffffff";
  return (
    <svg
      width={size * 4.2}
      height={size}
      viewBox="0 0 210 52"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="لوگوی رسمی اتریش‌نشین - Austria Resident"
    >
      <defs>
        <linearGradient id="atFlagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
      </defs>

      {/* Shield with Austrian flag stripes */}
      <g transform="translate(2, 3)">
        <path
          d="M22 0 L42 6 L42 26 C42 38 32 46 22 50 C12 46 2 38 2 26 L2 6 Z"
          fill="url(#shieldGrad)"
          stroke="#7f1d1d"
          strokeWidth="1.2"
        />
        {/* White center stripe */}
        <rect x="2" y="20" width="40" height="12" fill="#FFFFFF" opacity="0.95" />
        {/* Red top stripe */}
        <rect x="2" y="8" width="40" height="12" fill="#DC2626" opacity="0.98" />
        {/* Red bottom stripe */}
        <rect x="2" y="32" width="40" height="10" fill="#DC2626" opacity="0.98" />
        {/* Inner symbol - star for Austria */}
        <path
          d="M22 15 L23.8 20.5 L29.5 20.5 L24.9 24 L26.6 29.5 L22 26 L17.4 29.5 L19.1 24 L14.5 20.5 L20.2 20.5 Z"
          fill="#FCD34D"
          opacity="0.95"
        />
        {/* Subtle highlight */}
        <path
          d="M22 0 L42 6 L42 12 C30 14 14 14 2 12 L2 6 Z"
          fill="#FFFFFF"
          opacity="0.15"
        />
      </g>

      {/* Text: اتریش‌نشین */}
      <text
        x="58"
        y="26"
        fontFamily="'Vazirmatn','Tahoma',system-ui,sans-serif"
        fontSize="17"
        fontWeight="900"
        fill={textColor}
        textAnchor="start"
        direction="rtl"
      >
        اتریش‌نشین
      </text>
      <text
        x="58"
        y="42"
        fontFamily="'Inter',system-ui,sans-serif"
        fontSize="8.5"
        fontWeight="700"
        fill={variant === "dark" ? "#DC2626" : "#FCA5A5"}
        textAnchor="start"
        letterSpacing="1.6"
      >
        AUSTRIA RESIDENT
      </text>
    </svg>
  );
};

/* ============================================================
   🔎 SEO HEAD — Meta + JSON-LD + canonical + hreflang
   ============================================================ */
const SEOHead: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = "اتریش‌نشین | پلتفرم هوشمند مهاجرت، اقامت و زندگی در اتریش ۲۰۲۶";

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let tag = document.querySelector(selector) as HTMLLinkElement | null;
      if (!tag) {
        tag = document.createElement("link");
        tag.setAttribute("rel", rel);
        if (hreflang) tag.setAttribute("hreflang", hreflang);
        document.head.appendChild(tag);
      }
      tag.setAttribute("href", href);
    };

    setMeta("description", "اتریش‌نشین — پلتفرم هوشمند ارزیابی مهاجرت، کارت سرخ‌سفید‌سرخ (RWR)، اقامت تحصیلی، تمکن مالی، الحاق خانواده، نوستریفیکاسیون مدارک، محاسبه مالیات، قوانین کار AK، مدارس و دیوار نیازمندی‌های ایرانیان اتریش ۲۰۲۶.");
    setMeta("keywords", "اتریش, مهاجرت اتریش, کارت سرخ سفید سرخ, RWR, اقامت اتریش, ویزای دانشجویی اتریش, تمکن مالی, الحاق خانواده, نوستریفیکاسیون, MA 35, ایرانیان اتریش, وین, گراتس, سالزبورگ, قوانین کار اتریش, بیمه ÖGK");
    setMeta("author", "Austria Resident | اتریش‌نشین");
    setMeta("robots", "index, follow, max-snippet:-1, max-image-preview:large");
    setMeta("theme-color", "#DC2626");
    setMeta("og:title", "اتریش‌نشین | پلتفرم هوشمند مهاجرت و اقامت اتریش", "property");
    setMeta("og:description", "ارزیابی امتیاز RWR، محاسبه مالیات، نوستریفیکاسیون مدارک، قوانین کار AK و ابزارهای اختصاصی برای ایرانیان اتریش.", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:locale", "fa_IR", "property");
    setMeta("og:site_name", "اتریش‌نشین | Austria Resident", "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", "اتریش‌نشین | مهاجرت و زندگی هوشمند در اتریش");
    setMeta("twitter:description", "پلتفرم جامع ایرانیان اتریش: RWR، مالیات، نوستریفیکاسیون، مدارس، دیوار محلی.");

    setLink("canonical", "https://austria-resident.at/");
    setLink("alternate", "https://austria-resident.at/", "fa-IR");
    setLink("alternate", "https://austria-resident.at/en", "en");

    // JSON-LD Structured Data
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "اتریش‌نشین | Austria Resident",
          "url": "https://austria-resident.at",
          "logo": "https://austria-resident.at/logo.svg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+43-688-976-3256",
            "contactType": "Customer Service",
            "areaServed": "AT",
            "availableLanguage": ["fa", "de", "en"],
          },
        },
        {
          "@type": "WebApplication",
          "name": "Austria Smart Suite | اتریش‌نشین",
          "applicationCategory": "ImmigrationApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1284" },
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "شرایط دریافت کارت سرخ‌سفید‌سرخ (RWR) اتریش چیست؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "داشتن حداقل ۵۵ امتیاز برای مشاغل دارای کمبود یا ۷۰ امتیاز برای نخبگان، مدرک زبان آلمانی یا انگلیسی و پیشنهاد شغلی (Job Offer) از کارفرمای اتریشی.",
              },
            },
            {
              "@type": "Question",
              "name": "چگونه برای نوستریفیکاسیون مدارک پزشکی اتریش اقدام کنیم؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ارسال مدارک به یکی از سه دانشگاه پزشکی وین، گراتس یا اینسبروک، پرداخت هزینه ارزیابی، شرکت در آزمون معادل‌سازی و ثبت‌نام در Ärztekammer اتریش.",
              },
            },
            {
              "@type": "Question",
              "name": "تمکن مالی برای اقامت اتریش چقدر است؟",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "حداقل ۲,۳۰۰ یورو درآمد ماهیانه ثابت از خارج اتریش، بالای ۴۰,۰۰۰ یورو سپرده بانکی و مدرک زبان آلمانی A1.",
              },
            },
          ],
        },
      ],
    };
    const scriptId = "austria-resident-jsonld";
    let jsonScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!jsonScript) {
      jsonScript = document.createElement("script");
      jsonScript.id = scriptId;
      jsonScript.type = "application/ld+json";
      document.head.appendChild(jsonScript);
    }
    jsonScript.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
};

/* ============================================================
   🎨 ANIMATED HERO BANNER (Branded Header)
   ============================================================ */
const HeroBanner: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const headlineMap: Record<string, { title: string; sub: string; badge: string }> = {
    assessment: { title: "سامانه ارزیابی هوشمند مهاجرت اتریش", sub: "Rot-Weiß-Rot Karte • Punktesystem 2026", badge: "🇦🇹 RWR Calculator" },
    forms: { title: "بانک فرم‌ها و نامه‌های رسمی آلمانی", sub: "MA 35 • Meldezettel • Einspruch", badge: "📝 Document Engine" },
    scams: { title: "سپر امنیتی ضدکلاهبرداری جاب‌آفر", sub: "Real vs. Fake Offer Detection", badge: "🛡️ Fraud Shield" },
    rights: { title: "حقوق کار، مالیات و بیمه ÖGK", sub: "Arbeiterkammer • Brutto-Netto Rechner", badge: "⚖️ AK Tax Engine" },
    events: { title: "تقویم رویدادهای جامعه ایرانی اتریش", sub: "Vienna • Graz • Salzburg", badge: "📅 Community Hub" },
    alerts: { title: "رادار زنده نوبت‌های MA 35", sub: "Live Appointment Scanner", badge: "🔔 Radar Live" },
    budget: { title: "نمودار بودجه و معیشت اتریش", sub: "Cost of Living Visualizer", badge: "📊 Budget Planner" },
    pdf_export: { title: "چک‌لیست طلایی مدارک اقامتی", sub: "Document Export Tool", badge: "📥 PDF Export" },
    animations: { title: "نمایش انیمیشن و افکت‌های بصری", sub: "Motion & Micro-interactions", badge: "✨ Motion Lab" },
    nostrifizierung: { title: "ارزشیابی مدارک تحصیلی Nostrifizierung", sub: "Berufsanerkennung • BMBWF", badge: "🎓 Academic Recognition" },
    laws: { title: "موتور جستجوی قوانین اتریش", sub: "MRG • NAG • Arbeitsrecht", badge: "📜 Legal Search" },
    school_guide: { title: "راهنمای ثبت‌نام مدارس و مهدکودک", sub: "Schulpflicht • MA 10", badge: "🎒 Education Guide" },
    traffic_fines: { title: "اعتراض به جریمه‌های رانندگی", sub: "Strafverfügung Einspruch", badge: "🚗 Traffic Appeal" },
    success_stories: { title: "تالار افتخارات ایرانیان اتریش", sub: "Iranian Achievers in Austria", badge: "⭐ Success Wall" },
    classifieds: { title: "دیوار نیازمندی‌های بومی ایرانیان", sub: "WG • Furniture • Jobs • Rideshare", badge: "🛒 Local Board" },
  };
  const info = headlineMap[activeTab] || headlineMap.assessment;

  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-rose-50 p-5 md:p-7 mb-8"
      aria-label="Austria Resident Hero Banner"
    >
      {/* Decorative gradients */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-red-700 via-red-500 to-red-700" />

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 text-right">
        <div className="flex items-center gap-4 order-2 md:order-1">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
            whileHover={{ scale: 1.06, rotateZ: -1.5 }}
            className="shrink-0 drop-shadow-lg"
          >
            <AustriaResidentLogo size={52} variant="dark" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="font-black text-stone-900 text-base md:text-xl leading-tight flex flex-wrap items-center gap-2 justify-end md:justify-start">
              <span>{info.title}</span>
              <Sparkles className="w-4 h-4 text-red-600 animate-pulse" />
            </h1>
            <p className="text-[11px] md:text-xs text-stone-500 font-bold tracking-wide">
              {info.sub}
            </p>
          </div>
        </div>

        <div className="order-1 md:order-2 flex items-center gap-2">
          <span className="text-[10px] bg-stone-900 text-white px-3 py-1.5 rounded-full font-black shadow-sm">
            {info.badge}
          </span>
          <span className="text-[10px] bg-white border border-red-200 text-red-700 px-3 py-1.5 rounded-full font-black shadow-sm">
            ✦ 2026 Edition
          </span>
        </div>
      </div>

      {/* Live stats ticker */}
      <div className="relative mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-right">
        {[
          { k: "کاربران فعال", v: "۱۲٬۴۸۰+" },
          { k: "پرونده موفق RWR", v: "۲٬۱۰۶" },
          { k: "رضایت کاربران", v: "۴.۹ / ۵" },
          { k: "پاسخ مشاور", v: "< ۲ ساعت" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.06 }}
            className="bg-white/70 backdrop-blur border border-stone-150 rounded-2xl px-3 py-2"
          >
            <div className="text-[9px] text-stone-500 font-bold">{s.k}</div>
            <div className="text-xs font-black text-red-700 font-mono">{s.v}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

/* ============================================================
   🔗 DYNAMIC TAB PILL COMPONENT
   ============================================================ */
type TabKey =
  | "alerts" | "budget" | "pdf_export" | "animations" | "assessment" | "forms"
  | "scams" | "rights" | "events" | "nostrifizierung" | "laws" | "school_guide"
  | "traffic_fines" | "success_stories" | "classifieds";

const TabPill: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color?: string;
}> = ({ active, onClick, icon, label, color = "red" }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ y: -2, scale: 1.03 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 320, damping: 22 }}
    className={`cursor-pointer transition-all rounded-full px-3.5 py-2 text-[11px] font-black flex items-center gap-1.5 whitespace-nowrap ${
      active
        ? "bg-red-600 text-white shadow-md shadow-red-600/25 ring-2 ring-red-500/20"
        : "text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 hover:border-red-200"
    }`}
    aria-pressed={active}
    aria-label={label}
  >
    <span className="text-[13px] leading-none">{icon}</span>
    <span>{label}</span>
  </motion.button>
);

/* ============================================================
   🚀 MAIN COMPONENT — ENHANCED
   ============================================================ */
export default function AustriaSmartSuite() {
  SEOHead();

  const [activeTab, setActiveTab] = useState<TabKey>("assessment");

  // ============ ALL ORIGINAL STATE PRESERVED ============
  const [nostriProfession, setNostriProfession] = useState<string>("medicine");
  const [lawSearchQuery, setLawSearchQuery] = useState<string>("");
  const [selectedLawCat, setSelectedLawCat] = useState<string>("all");
  const [classifiedsList, setClassifiedsList] = useState<any[]>([
    { id: "c1", title: "سوئیت مستقل مبله همخانه (وین منطقه ۱۰)", category: "wg", categoryFarsi: "همخانگی مسکن", price: "۳۸۰ یورو/ماه", city: "vienna", cityFarsi: "وین", desc: "یک اتاق مستر دنج مبله از آپارتمان مشترک (WG) مجهز به اینترنت خط فیبر نوری، نزدیک ایستگاه متروی Reumannplatz وین مخصوص دانشجویان ایرانی کانون زبان.", contact: "آی‌دی تلگرام: @s_bagheri" },
    { id: "c2", title: "صندلی اداری و میز ارگونومیک برند IKEA", category: "furniture", categoryFarsi: "وسایل منزل", price: "۴۵ یورو", city: "graz", cityFarsi: "گراتس", desc: "به علت جابجایی خوابگاه، میز تحریر و صندلی چرخ‌دار مشکی ایکیا در حد نو به فروش می‌رسد. تحویل حضوری در مرکز گراتس.", contact: "واتساپ: +436881232123" },
    { id: "c3", title: "سفر اشتراکی وین به سالزبورگ (آلپ کارپول)", category: "rideshare", categoryFarsi: "همسفری", price: "۱۵ یورو سهم سوخت", city: "salzburg", cityFarsi: "سالزبورگ", desc: "حرکت روز جمعه صبح از ایستگاه Westbahnhof وین با خودروی پژو ۲۰۸ جادار. ظرفیت خالی ۲ نفر با ساک دستی کوچک.", contact: "تماس: +436889988112" },
    { id: "c4", title: "نیاز به نیروی کار نیمه‌وقت (Geringfügig) در رستوران ایرانی", category: "job", categoryFarsi: "فرصت‌های شغلی", price: "۵۱۸ یورو مقرر رسمی", city: "vienna", cityFarsi: "وین", desc: "به یک ظرفشور یا کمک‌آشپز با اخلاق مسلط به زبان فارسی برای کار در روزهای آخر هفته نیازمندیم. پوشش قانونی کامل بیمه ÖGK.", contact: "تلگرام: @Damavand_Gastro" }
  ]);
  const [newClassifiedTitle, setNewClassifiedTitle] = useState("");
  const [newClassifiedCat, setNewClassifiedCat] = useState("wg");
  const [newClassifiedPrice, setNewClassifiedPrice] = useState("");
  const [newClassifiedCity, setNewClassifiedCity] = useState("vienna");
  const [newClassifiedDesc, setNewClassifiedDesc] = useState("");
  const [newClassifiedContact, setNewClassifiedContact] = useState("");
  const [letterTypeEx, setLetterTypeEx] = useState<string>("insurance_termination");
  const [childAge, setChildAge] = useState<number>(6);
  const [fineAmount, setFineAmount] = useState<number>(90);
  const [fineReason, setFineReason] = useState<string>("speeding");
  const [fineCity, setFineCity] = useState<string>("wien");
  const [assessStep, setAssessStep] = useState<number>(1);
  const [migrationPath, setMigrationPath] = useState<any>("rwr");
  const [researcherHostingAgreement, setResearcherHostingAgreement] = useState<boolean>(true);
  const [researcherFundsInsurance, setResearcherFundsInsurance] = useState<boolean>(true);
  const [ictEmployedBefore, setIctEmployedBefore] = useState<boolean>(true);
  const [ictWageMatch, setIctWageMatch] = useState<boolean>(true);
  const [specialWorkAgeRange, setSpecialWorkAgeRange] = useState<boolean>(true);
  const [specialWorkContractA1, setSpecialWorkContractA1] = useState<boolean>(true);
  const [volunteerContract, setVolunteerContract] = useState<boolean>(true);
  const [volunteerNGOProvision, setVolunteerNGOProvision] = useState<boolean>(true);
  const [selfEmployedContracts, setSelfEmployedContracts] = useState<boolean>(true);
  const [selfEmployedBizPlan, setSelfEmployedBizPlan] = useState<boolean>(true);
  const [seasonalAMSQuota, setSeasonalAMSQuota] = useState<boolean>(true);
  const [seasonalWageMatch, setSeasonalWageMatch] = useState<boolean>(true);
  const [age, setAge] = useState<number>(32);
  const [education, setEducation] = useState<string>("master");
  const [studiedInAustria, setStudiedInAustria] = useState<boolean>(false);
  const [germanSkill, setGermanSkill] = useState<string>("A2");
  const [englishSkill, setEnglishSkill] = useState<string>("IELTS_6.0");
  const [experienceYears, setExperienceYears] = useState<number>(6);
  const [isShortageOccup, setIsShortageOccup] = useState<boolean>(true);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(true);
  const [grossMonthlySalary, setGrossMonthlySalary] = useState<number>(3100);
  const [hasUniAdmission, setHasUniAdmission] = useState<boolean>(true);
  const [hasStudyProofOfFunds, setHasStudyProofOfFunds] = useState<boolean>(true);
  const [hasAustrianAccommodation, setHasAustrianAccommodation] = useState<boolean>(true);
  const [preparatoryLanguage, setPreparatoryLanguage] = useState<boolean>(false);
  const [passiveMonthlyIncome, setPassiveMonthlyIncome] = useState<number>(2400);
  const [liquidEuroSavings, setLiquidEuroSavings] = useState<number>(45000);
  const [germanA1Certificate, setGermanA1Certificate] = useState<boolean>(true);
  const [familySponsorStatus, setFamilySponsorStatus] = useState<string>("citizen");
  const [familySponsorMonthlyIncome, setFamilySponsorMonthlyIncome] = useState<number>(1950);
  const [familyA1Certificate, setFamilyA1Certificate] = useState<boolean>(true);
  const [familyApostilledMarriageCert, setFamilyApostilledMarriageCert] = useState<boolean>(true);
  const [rwrPoints, setRwrPoints] = useState<number>(0);
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [activeVisaCategory, setActiveVisaCategory] = useState<string>("temp");
  const [expandedVisaId, setExpandedVisaId] = useState<string | null>(null);
  const [radarRegion, setRadarRegion] = useState<string>("wien");
  const [radarOficina, setRadarOficina] = useState<string>("ma35");
  const [isAlertScanning, setIsAlertScanning] = useState<boolean>(false);
  const [radarLogs, setRadarLogs] = useState<string[]>([]);
  const [radarResults, setRadarResults] = useState<string | null>(null);
  const [playAlarm, setPlayAlarm] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, type: "cita", title: "نوبت خالی MA 35 وین", body: "تعداد ۴ نوبت آزاد برای نقص مدرک اقامت کاری در شعبه اصلی MA 35 وین ردیابی شد.", time: "۲ دقیقه پیش", badge: "فوری", color: "border-red-500 bg-red-50 text-red-950" },
    { id: 2, type: "law", title: "قانون کار نیمه‌وقت دانشجویی اتریش", body: "پارلمان سراسری سقف ساعت کاری مجاز دانشجویان خارجی را بدون قید و شرط به ۲۰ ساعت تثبیت کرد.", time: "۱ ساعت پیش", badge: "حقوقی", color: "border-amber-500 bg-amber-50 text-amber-950" },
    { id: 3, type: "currency", title: "کاهش کمیسیون صرافی ملکی اروپا", body: "صرافی رسمی وین، نرخ انتقال حواله تمکن مالی برای بانک‌های اتریش را کاهش داد.", time: "۳ ساعت پیش", badge: "ارز معیشت", color: "border-emerald-500 bg-emerald-50 text-emerald-950" }
  ]);
  const [budgetCity, setBudgetCity] = useState<string>("wien");
  const [rentCost, setRentCost] = useState<number>(850);
  const [foodCost, setFoodCost] = useState<number>(350);
  const [transportCost, setTransportCost] = useState<number>(30);
  const [insuranceCost, setInsuranceCost] = useState<number>(65);
  const [leisureCost, setLeisureCost] = useState<number>(200);
  const [letterName, setLetterName] = useState<string>("علیرضا رنجبری");
  const [letterGz, setLetterGz] = useState<string>("GZ: 104523/2026");
  const [letterType, setLetterType] = useState<string>("status_request");
  const [isLetterCopied, setIsLetterCopied] = useState<boolean>(false);
  const [scamOfferTitle, setScamOfferTitle] = useState<string>("");
  const [scamPrepayment, setScamPrepayment] = useState<boolean>(false);
  const [scamPersianAgency, setScamPersianAgency] = useState<boolean>(false);
  const [scamRiskLevel, setScamRiskLevel] = useState<string>("");
  const [workerGrossIncome, setWorkerGrossIncome] = useState<number>(3100);
  const [workerHas13Month, setWorkerHas13Month] = useState<boolean>(true);
  const [rsvpEvents, setRsvpEvents] = useState<{ [key: string]: boolean }>({});
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "تاییدیه پذیرش یا قرارداد کاری رسمی اتریش", checked: true },
    { id: 2, text: "ثبت خوابگاه یا آپارتمان مسکونی در وین (Meldezettel)", checked: true },
    { id: 3, text: "بیمه درمانی کامل خوداشتغال یا دانشجویی اتریش (ÖGK)", checked: false },
    { id: 4, text: "تمکن مقتضی بانکی معادل ۱۵,۰۰۰ یورو نقدینگی", checked: false },
    { id: 5, text: "گواهی عدم سوءپیشینه موشح به مهر سفارت اتریش در تهران", checked: false },
    { id: 6, text: "برگه فرم درخواست فیزیکی امضا شده (Antrag EX-15/EX-17)", checked: false }
  ]);

  // ============ HANDLERS ============
  const handleToggleCheck = (id: number) =>
    setChecklistItems(prev => prev.map(item => (item.id === id ? { ...item, checked: !item.checked } : item)));

  const handleCreateClassified = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassifiedTitle.trim() || !newClassifiedDesc.trim() || !newClassifiedContact.trim()) return;
    const newAd = {
      id: `c_${Date.now()}`,
      title: newClassifiedTitle,
      category: newClassifiedCat,
      categoryFarsi: newClassifiedCat === "wg" ? "همخانگی مسکن" : newClassifiedCat === "furniture" ? "وسایل منزل" : newClassifiedCat === "rideshare" ? "همسفری" : "فرصت‌های شغلی",
      price: newClassifiedPrice || "توافقی",
      city: newClassifiedCity,
      cityFarsi: newClassifiedCity === "vienna" ? "وین" : newClassifiedCity === "graz" ? "گراتس" : "سالزبورگ",
      desc: newClassifiedDesc,
      contact: newClassifiedContact
    };
    setClassifiedsList([newAd, ...classifiedsList]);
    setNewClassifiedTitle(""); setNewClassifiedPrice(""); setNewClassifiedDesc(""); setNewClassifiedContact("");
    alert("📢 آگهی مکتوب شما با موفقیت به صندوق دیوار اتریش‌نشین تزریق گردید!");
  };

  useEffect(() => {
    const handleCheckDirect = () => {
      const savedPath = localStorage.getItem("otr_direct_migration_path");
      if (savedPath) {
        setActiveTab("assessment");
        setMigrationPath(savedPath as any);
        setAssessStep(1);
        setAssessmentResult(null);
        localStorage.removeItem("otr_direct_migration_path");
      }
    };
    handleCheckDirect();
    window.addEventListener("storage", handleCheckDirect);
    const interval = setInterval(handleCheckDirect, 300);
    return () => { window.removeEventListener("storage", handleCheckDirect); clearInterval(interval); };
  }, []);

  const handleCalculateAssessment = () => {
    let points = 0;
    let reportLog = "";
    let recommendedPath = "";
    let statusMessage = "";

    if (migrationPath === "rwr") {
      if (age <= 30) { points += 20; reportLog += "🔹 سن ≤ ۳۰ سال: ۲۰ امتیاز\n"; }
      else if (age <= 35) { points += 15; reportLog += "🔹 سن ۳۱-۳۵: ۱۵ امتیاز\n"; }
      else if (age <= 40) { points += 10; reportLog += "🔹 سن ۳۶-۴۰: ۱۰ امتیاز\n"; }
      else if (age <= 45) { points += 5; reportLog += "🔹 سن ۴۱-۴۵: ۵ امتیاز\n"; }
      else { reportLog += "🔹 سن بالای ۴۵: بدون امتیاز\n"; }

      if (education === "phd") { points += 40; reportLog += "🔹 دکترا (PhD): ۴۰ امتیاز\n"; }
      else if (education === "master") { points += 30; reportLog += "🔹 فوق لیسانس: ۳۰ امتیاز\n"; }
      else if (education === "bachelor") { points += 20; reportLog += "🔹 لیسانس: ۲۰ امتیاز\n"; }
      else if (education === "vocational") { points += 15; reportLog += "🔹 فنی‌وحرفه‌ای: ۱۵ امتیاز\n"; }
      else { reportLog += "🔹 بدون مدرک: ۰ امتیاز\n"; }

      if (studiedInAustria) { points += 10; reportLog += "🔹 فارغ‌التحصیلی اتریش: ۱۰ امتیاز\n"; }

      const expPoints = Math.min(20, experienceYears * 2);
      points += expPoints;
      reportLog += `🔹 سابقه کار (${experienceYears} سال): ${expPoints} امتیاز\n`;

      if (germanSkill === "B2+" || germanSkill === "B1") { points += 15; reportLog += "🔹 آلمانی B1+: ۱۵ امتیاز\n"; }
      else if (germanSkill === "A2") { points += 10; reportLog += "🔹 آلمانی A2: ۱۰ امتیاز\n"; }
      else if (germanSkill === "A1") { points += 5; reportLog += "🔹 آلمانی A1: ۵ امتیاز\n"; }

      if (englishSkill !== "none") { points += 10; reportLog += "🔹 انگلیسی IELTS 6+: ۱۰ امتیاز\n"; }

      setRwrPoints(points);
      const minRequired = isShortageOccup ? 55 : 70;

      if (hasJobOffer) {
        if (points >= minRequired) {
          recommendedPath = "کارت سرخ-سفید-سرخ اتریش (Rot-Weiß-Rot Karte)";
          statusMessage = `🎉 شانس قبولی بسیار کثیر! امتیاز شما ${points} بالاتر از حد نصاب (${minRequired}) است.`;
        } else {
          recommendedPath = "ویزای تحصیلی اتریش (Aufenthaltsbewilligung - Student)";
          statusMessage = `⚠️ امتیاز ${points} کمتر از حد نصاب (${minRequired}). تقویت زبان یا مسیر دانشجویی توصیه می‌شود.`;
        }
      } else {
        recommendedPath = "ویزای جستجوی کار اتریش (Job Seeker Visa)";
        statusMessage = `📍 امتیاز ${points} محاسبه شد. برای ویزای ۶ ماهه کارجویی نخبگان نیاز به ۷۰ امتیاز دارید.`;
      }
    } else if (migrationPath === "study") {
      if (hasUniAdmission) { points += 40; reportLog += "🔹 پذیرش رسمی: ۴۰ امتیاز\n"; }
      if (hasStudyProofOfFunds) { points += 40; reportLog += "🔹 تمکن مالی: ۴۰ امتیاز\n"; }
      if (hasAustrianAccommodation) { points += 20; reportLog += "🔹 اسکان اتریش: ۲۰ امتیاز\n"; }
      recommendedPath = "اقامت دانشجویی اتریش (Aufenthaltsbewilligung - Student)";
      statusMessage = points >= 80 ? `🎉 تایید صلاحیت ایده‌آل! امتیاز ${points} از ۱۰۰.` : `⚠️ نقص شرایط! امتیاز ${points} — پذیرش یا تمکن را کامل کنید.`;
    } else if (migrationPath === "financial") {
      if (passiveMonthlyIncome >= 2300) { points += 40; reportLog += `🔹 درآمد غیرفعال (${passiveMonthlyIncome}€): ۴۰ امتیاز\n`; }
      else if (passiveMonthlyIncome >= 1500) { points += 20; reportLog += `🔸 درآمد غیرفعال (${passiveMonthlyIncome}€): ۲۰ امتیاز\n`; }
      if (liquidEuroSavings >= 40000) { points += 30; reportLog += `🔹 سپرده (${liquidEuroSavings}€): ۳۰ امتیاز\n`; }
      if (germanA1Certificate) { points += 30; reportLog += "🔹 مدرک A1 آلمانی: ۳۰ امتیاز\n"; }
      recommendedPath = "اقامت تمکن مالی بدون اجازه کار (Privatiers)";
      statusMessage = points >= 100 ? "🎉 تایید صلاحیت طلایی تمکن مالی اتریش!" : `⚠️ عدم کفایت تمکن مالی! امتیاز ${points}.`;
    } else if (migrationPath === "family") {
      if (familySponsorStatus === "citizen") { points += 40; reportLog += "🔹 اسپانسر شهروند اتریش: ۴۰ امتیاز\n"; }
      else if (familySponsorStatus === "rwrPlus") { points += 30; reportLog += "🔹 اسپانسر RWR+: ۳۰ امتیاز\n"; }
      if (familyA1Certificate) { points += 30; reportLog += "🔹 آلمانی A1 همسر: ۳۰ امتیاز\n"; }
      if (familySponsorMonthlyIncome >= 1800) { points += 20; reportLog += `🔹 حقوق حامی (${familySponsorMonthlyIncome}€): ۲۰ امتیاز\n`; }
      if (familyApostilledMarriageCert) { points += 10; reportLog += "🔹 سند ازدواج: ۱۰ امتیاز\n"; }
      recommendedPath = "ویزای الحاق به خانواده اتریش (Familienzusammenführung)";
      statusMessage = points >= 80 ? `🎉 شرایط شما عالی است! امتیاز ${points}.` : `⚠️ هشدار جدی الحاق! امتیاز ${points}.`;
    } else if (migrationPath === "researcher") {
      if (researcherHostingAgreement) { points += 50; reportLog += "🔹 قرارداد پذیرش: ۵۰ امتیاز\n"; }
      if (researcherFundsInsurance) { points += 50; reportLog += "🔹 تمکن و بیمه: ۵۰ امتیاز\n"; }
      recommendedPath = "پژوهشگران و محققان موقت (Forscher-Mobilität)";
      statusMessage = points === 100 ? "🎉 شرایط ایده‌آل است!" : "⚠️ بدون توافق‌نامه موسسه، امکان صدور وجود ندارد.";
    } else if (migrationPath === "ict") {
      if (ictEmployedBefore) { points += 50; reportLog += "🔹 سابقه هولدینگ: ۵۰ امتیاز\n"; }
      if (ictWageMatch) { points += 50; reportLog += "🔹 تطابق حقوق: ۵۰ امتیاز\n"; }
      recommendedPath = "نیروهای کار اعزامی شرکت‌ها (ICT / Mobile ICT)";
      statusMessage = points === 100 ? "🎉 واجد شرایط اعزام!" : "⚠️ سابقه شرکت مادر و تطابق حقوق الزامی است.";
    } else if (migrationPath === "special-work") {
      if (specialWorkAgeRange) { points += 50; reportLog += "🔹 محدوده سنی: ۵۰ امتیاز\n"; }
      if (specialWorkContractA1) { points += 50; reportLog += "🔹 قرارداد Au-Pair و A1: ۵۰ امتیاز\n"; }
      recommendedPath = "قراردادهای کاری خاص (Au-Pair)";
      statusMessage = points === 100 ? "🎉 همپوشانی عالی مدارک و سن!" : "⚠️ سن ۱۸-۲۸ و آلمانی A1 الزامی است.";
    } else if (migrationPath === "volunteer") {
      if (volunteerContract) { points += 50; reportLog += "🔹 قرارداد خیریه: ۵۰ امتیاز\n"; }
      if (volunteerNGOProvision) { points += 50; reportLog += "🔹 پوشش ارگان: ۵۰ امتیاز\n"; }
      recommendedPath = "نیروهای خدمات اجتماعی و داوطلب (Freiwillige)";
      statusMessage = points === 100 ? "🎉 شایستگی کامل داوطلبانه!" : "⚠️ توافق خیریه معتبر الزامی است.";
    } else if (migrationPath === "self-employed-temp") {
      if (selfEmployedContracts) { points += 50; reportLog += "🔹 قراردادهای محلی: ۵۰ امتیاز\n"; }
      if (selfEmployedBizPlan) { points += 50; reportLog += "🔹 بیزنس پلن: ۵۰ امتیاز\n"; }
      recommendedPath = "کارکنان مستقل موقت (Selbständige)";
      statusMessage = points === 100 ? "🎉 بیزنس پروژه شما سازنده ارزیابی شد!" : "⚠️ قرارداد و بیزنس پلن لازم است.";
    } else if (migrationPath === "seasonal") {
      if (seasonalAMSQuota) { points += 50; reportLog += "🔹 سهمیه AMS: ۵۰ امتیاز\n"; }
      if (seasonalWageMatch) { points += 50; reportLog += "🔹 تطابق صنف: ۵۰ امتیاز\n"; }
      recommendedPath = "اشتغال فصلی اتریش (Befristete Beschäftigung)";
      statusMessage = points === 100 ? "🎉 مجوز فصلی برقرار است!" : "⚠️ سهمیه AMS و تطابق صنف الزامی است.";
    }

    setAssessmentResult({ points, path: recommendedPath, message: statusMessage, log: reportLog });
    setAssessStep(3);
  };

  const handleStartRadar = () => {
    setIsAlertScanning(true);
    setRadarResults(null);
    setRadarLogs([]);
    const messages = [
      "🔄 اتصال ایمن به سامانه سراسری امور اتباع خارجی اتریش (Sede/MA-35)...",
      "🛡️ فعال‌سازی ماژول‌های ضد ربات و کدهای عبور کپچای گرافیکی...",
      "🔍 جستجوی شکاف‌های نوبت خالی لغو شده در ۲۴ ساعت گذشته...",
      `📍 استعلام نوبت‌های ادارات ایالت ${radarRegion === "wien" ? "وین (Wien)" : radarRegion === "graz" ? "گراتس" : "سالزبورگ"}...`,
      "⏳ مانیتورینگ صدم‌ثانیه‌ای وب‌پیج نوبت‌دهی..."
    ];
    let count = 0;
    const interval = setInterval(() => {
      if (count < messages.length) {
        setRadarLogs(prev => [...prev, messages[count]]);
        count++;
      } else {
        clearInterval(interval);
        setIsAlertScanning(false);
        const success = Math.random() > 0.4;
        if (success) {
          setRadarResults(`🎉 شبیه‌ساز: وقت آزاد ردیابی شد! تعداد ۲ نوبت خالی در بخش اداره اقامت MA 35 وین در منطقه Dresdner Straße برای دوره‌های تمدید ۲ ساله RWR پیدا شد.`);
          if (playAlarm) {
            try {
              const audCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = audCtx.createOscillator();
              osc.type = "sine";
              osc.frequency.setValueAtTime(600, audCtx.currentTime);
              osc.connect(audCtx.destination);
              osc.start();
              osc.stop(audCtx.currentTime + 0.15);
            } catch {}
          }
        } else {
          setRadarResults("⚠️ در این لحظه وقت خالی جدیدی در درگاه MA 35 اتریش صید نشد.");
        }
      }
    }, 900);
  };

  const generateWhatsAppLink = () => {
    if (!assessmentResult) return "";
    const reportText = `🇦🇹 کارنامه ارزیابی هوشمند اتریش‌نشین 🇦🇹
کاربر گرامی: ing.ranjbari@gmail.com
امتیاز سرخ-سفید-سرخ محاسبه شده: ${assessmentResult.points} از ۱۰۰
روش پیشنهادی نهایی: ${assessmentResult.path}
امتیازات کسب شده به تفکیک:
${assessmentResult.log}
خلاصه بررسی پرونده:
${assessmentResult.message}

جهت بررسی نهائی ارسال شد.`;
    return `https://api.whatsapp.com/send?phone=436889763256&text=${encodeURIComponent(reportText)}`;
  };

  const exportChecklistToTxt = () => {
    const checkedStr = checklistItems.map(item => `[${item.checked ? "✔" : " "}] ${item.text}`).join("\n");
    const blob = new Blob([`🇦🇹 چک‌لیست طلایی مدارک اقامت اتریش‌نشین 🇦🇹\n\n${checkedStr}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "austria_checklist_otrishnexen.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("📥 چک‌لیست مدارک با موفقیت در قالب فایل متنی صادر و دانلود شد!");
  };

  const workerTax = useMemo(() => {
    const sv = workerGrossIncome * 0.1812;
    const taxable = workerGrossIncome - sv;
    let tax = 0;
    if (taxable > 2600) tax += (taxable - 2600) * 0.40 + 1000 * 0.30 + 500 * 0.20;
    else if (taxable > 1600) tax += (taxable - 1600) * 0.30 + 500 * 0.20;
    else if (taxable > 1100) tax += (taxable - 1100) * 0.20;
    return { sv: Math.round(sv), tax: Math.round(tax), net: Math.round(workerGrossIncome - sv - tax) };
  }, [workerGrossIncome]);

  const budgetTotal = rentCost + foodCost + transportCost + insuranceCost + leisureCost;

  /* ============ TAB CONFIG ============ */
  const tabs: { key: TabKey; icon: string; label: string }[] = [
    { key: "assessment", icon: "📜", label: "ارزیابی هوشمند" },
    { key: "forms", icon: "📝", label: "بانک فرم‌ها" },
    { key: "scams", icon: "⚠️", label: "امنیت و ضدکلاهبرداری" },
    { key: "rights", icon: "⚖️", label: "حقوق کار و بیمه" },
    { key: "events", icon: "📅", label: "رویدادهای جامعه" },
    { key: "alerts", icon: "🔔", label: "رادار نوبت‌ها" },
    { key: "budget", icon: "📊", label: "نمودار بودجه" },
    { key: "pdf_export", icon: "📥", label: "چک‌لیست PDF" },
    { key: "animations", icon: "✨", label: "انیمیشن کارت‌ها" },
    { key: "nostrifizierung", icon: "🎓", label: "ارزشیابی مدارک" },
    { key: "laws", icon: "📜", label: "موتور قوانین" },
    { key: "school_guide", icon: "🎒", label: "ثبت‌نام مدارس" },
    { key: "traffic_fines", icon: "🚗", label: "جریمه رانندگی" },
    { key: "success_stories", icon: "⭐", label: "ایرانیان موفق" },
    { key: "classifieds", icon: "🛒", label: "دیوار نیازمندی‌ها" },
  ];

  /* ============ RENDER ============ */
  return (
    <main
      id="austria-smart-suite-module"
      lang="fa"
      dir="rtl"
      itemScope
      itemType="https://schema.org/WebApplication"
      className="bg-white rounded-3xl border border-stone-200 p-5 md:p-8 shadow-sm overflow-hidden text-right font-sans relative"
    >
      <meta itemProp="name" content="اتریش‌نشین | Austria Smart Suite" />
      <meta itemProp="applicationCategory" content="ImmigrationApplication" />

      {/* Top gradient brand bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-red-700 via-red-500 to-red-700" />

      {/* HERO BANNER */}
      <HeroBanner activeTab={activeTab} />

      {/* TAB NAVIGATION */}
      <nav
        aria-label="ناوبری ابزارهای اتریش‌نشین"
        className="flex justify-center mb-8"
      >
        <div className="inline-flex flex-wrap gap-2 items-center justify-center p-2.5 bg-stone-50 border border-stone-150 rounded-3xl shadow-sm max-w-full">
          {tabs.map(tab => (
            <TabPill
              key={tab.key}
              active={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              icon={tab.icon}
              label={tab.label}
            />
          ))}
        </div>
      </nav>

      {/* CONTENT WRAPPER WITH ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeTab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* ============ FORMS TAB ============ */}
          {activeTab === "forms" && (() => {
            const getGermanLetterText = () => {
              const gz = letterGz || "GZ: 104523/2026";
              const nm = letterName || "علیرضا رنجبری";
              if (letterType === "status_request")
                return `Sehr geehrte Damen und Herren der MA 35,\n\nich wende mich bezüglich meines laufenden Antrags auf Erteilung eines Aufenthaltstitels (${gz}) an Sie. Mein Name ist ${nm}. Ich habe alle erforderlichen Unterlagen vollständig eingereicht und wollte mich höflich nach dem aktuellen Bearbeitungsstand erkundigen.\n\nÜber eine kurze Rückmeldung würde ich mich sehr freuen.\n\nMit freundlichen Grüßen,\n${nm}`;
              if (letterType === "address_change")
                return `Sehr geehrte Damen und Herren,\n\nhiermit möchte ich Ihnen höflich mitteilen, dass sich meine Wohnadresse geändert hat.\n\nName: ${nm}\nGeschäftszahl / GZ: ${gz}\n\nMeine neue Adresse lautet:\n[LANGE WEG ADRESSE IN ÖSTERREICH]\n\nDie neue Meldezettel-Bestätigung füge ich bei.\n\nMit freundlichen Grüßen,\n${nm}`;
              return `Sehr geehrte Damen und Herren,\n\nbezüglich Ihres Schreibens zur Nachreichung von Unterlagen für meinen Aufenthaltstitel (${gz}) übersende ich Ihnen hiermit die angeforderten Dokumente.\n\nMit freundlichen Grüßen,\n${nm}`;
            };
            const handleCopyLetter = () => {
              navigator.clipboard.writeText(getGermanLetterText());
              setIsLetterCopied(true);
              setTimeout(() => setIsLetterCopied(false), 2000);
            };
            return (
              <div className="space-y-6">
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-2">
                  <h3 className="font-extrabold text-red-950 text-sm md:text-base flex items-center justify-end gap-2">
                    <span>بانک فرم‌های اداری و تولیدکننده مکاتبات رسمی 🇦🇹</span><span>📝</span>
                  </h3>
                  <p className="text-xs text-stone-600 font-bold leading-relaxed">
                    دسترسی سریع به سربرگ‌های رسمی MA 35 و تولیدکننده هوشمند نامه‌های حقوقی به زبان آلمانی.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4">
                    <h4 className="font-extrabold text-stone-850 text-xs border-b border-stone-150 pb-2">⚙️ تنظیم مشخصات نامه:</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-black text-stone-700 mb-1">نام کامل (لاتین):</label>
                        <input type="text" value={letterName} onChange={(e) => setLetterName(e.target.value)}
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-left" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-stone-700 mb-1">کد پرونده (GZ):</label>
                        <input type="text" value={letterGz} onChange={(e) => setLetterGz(e.target.value)}
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none text-left" />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-stone-700 mb-1">موضوع نامه:</label>
                        <select value={letterType} onChange={(e) => setLetterType(e.target.value)}
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                          <option value="status_request">🔍 استعلام وضعیت پرونده</option>
                          <option value="address_change">🏠 اعلام تغییر آدرس</option>
                          <option value="missing_documents">📂 ارسال مدارک نقصی</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-150 space-y-2">
                      <span className="block text-xs font-black text-stone-800">📥 فرم‌های رسمی:</span>
                      <a href="https://www.wien.gv.at/formular/pdf/ma35-erteilung-aufenthalt.pdf" target="_blank" rel="noopener noreferrer"
                        className="block p-2.5 bg-white border border-stone-200 rounded-xl text-[10px] font-black text-stone-700 hover:bg-stone-100 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-red-600">PDF ⬇</span>
                        <span>فرم درخواست اقامت MA 35</span>
                      </a>
                      <a href="https://www.wien.gv.at/formular/pdf/meldezettel-formular.pdf" target="_blank" rel="noopener noreferrer"
                        className="block p-2.5 bg-white border border-stone-200 rounded-xl text-[10px] font-black text-stone-700 hover:bg-stone-100 flex items-center justify-between">
                        <span className="font-mono text-[9px] text-red-600">PDF ⬇</span>
                        <span>فرم Meldezettel</span>
                      </a>
                    </div>
                  </div>
                  <div className="lg:col-span-7 bg-white border border-stone-200 p-5 rounded-3xl flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-stone-850 text-xs border-b border-stone-150 pb-2 mb-3">📄 پیش‌نمایش نامه:</h4>
                      <div className="bg-stone-900 text-stone-100 p-4 rounded-2xl font-mono text-[10.5px] whitespace-pre-line text-left leading-relaxed select-all" dir="ltr">
                        {getGermanLetterText()}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-2.5 items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-bold leading-relaxed text-right">
                        ارسال به <code>post@ma35.wien.gv.at</code>
                      </span>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={handleCopyLetter}
                        className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-black text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shadow-sm">
                        <span>{isLetterCopied ? "✔ کپی شد!" : "📋 کپی متن"}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ============ SCAMS TAB ============ */}
          {activeTab === "scams" && (() => {
            let score = 0;
            if (scamPrepayment) score += 45;
            if (scamPersianAgency) score += 35;
            if (/تضمین|بدون سابقه/.test(scamOfferTitle)) score += 20;
            const analysis = score >= 70
              ? { level: "⚠️ فوق‌العاده خطرناک", color: "text-red-700 bg-rose-50 border-rose-200", advice: "هیچ هزینه‌ای پرداخت نکنید. فرآیند جاب آفر اتریش تضمینی نیست." }
              : score >= 35
              ? { level: "⚡ خطر متوسط", color: "text-amber-800 bg-amber-50 border-amber-200", advice: "قبل از پرداخت، شرکت را در WKO.at و Firmenbuch بررسی کنید." }
              : { level: "✔️ ظاهراً ایمن", color: "text-emerald-800 bg-emerald-50 border-emerald-100", advice: "آفر متعارف است، اما اسناد را قبل از امضا با مشاور بررسی کنید." };
            return (
              <div className="space-y-6">
                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 md:p-6 space-y-2">
                  <h3 className="font-extrabold text-amber-950 text-sm md:text-base flex items-center justify-end gap-2">
                    <span>سپر امنیتی: پایش اسناد جعلی و تله‌های کلاهبرداری ⚠️</span><span>🛡️</span>
                  </h3>
                  <p className="text-xs text-stone-650 font-bold leading-relaxed">
                    بررسی روش‌های احراز هویت شرکت‌ها و عواقب جعل سند در اتریش.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4">
                    <span className="block font-extrabold text-stone-850 text-xs border-b border-stone-150 pb-2">🛰️ آنالایزر ریسک جاب‌آفر:</span>
                    <div className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-black text-stone-700 mb-1">عنوان آفر:</label>
                        <input type="text" value={scamOfferTitle} onChange={(e) => setScamOfferTitle(e.target.value)}
                          className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold outline-none"
                          placeholder="مثال: کار فنی تضمینی بدون مدرک زبان" />
                      </div>
                      <label className="flex items-center gap-2 bg-white p-3 border border-stone-200 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={scamPrepayment} onChange={(e) => setScamPrepayment(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-xs font-black text-stone-850">پیش‌پرداخت چندمیلیونی قبل از ویزا؟</span>
                      </label>
                      <label className="flex items-center gap-2 bg-white p-3 border border-stone-200 rounded-xl cursor-pointer">
                        <input type="checkbox" checked={scamPersianAgency} onChange={(e) => setScamPersianAgency(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded" />
                        <span className="text-xs font-black text-stone-850">فقط تلگرام/اینستاگرام بدون دفتر رسمی؟</span>
                      </label>
                    </div>
                    <div className={`p-4 border rounded-xl space-y-2 ${analysis.color}`}>
                      <div className="flex justify-between items-center text-xs font-extrabold">
                        <span>{analysis.level}</span><span>برآورد ریسک</span>
                      </div>
                      <p className="text-[11px] font-bold leading-relaxed">{analysis.advice}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-6 bg-white border border-stone-200 p-5 rounded-3xl space-y-4">
                    <span className="block font-extrabold text-red-950 text-xs border-b border-red-100 pb-2">🚫 هشدارهای دایره جنایی اتریش:</span>
                    {[
                      { icon: "❌", title: "جعل گواهینامه زبان ÖSD/گوته", desc: "سفارت اتریش با استعلام الکترونیکی، اصالت مدرک را تایید می‌کند. جعل منتهی به ریجکتی مادام‌العمر شنگن می‌شود." },
                      { icon: "❌", title: "گردش حساب‌های بانکی فیک", desc: "سوابق ساختگی با بازرسی ثانویه سفارت از بانک صادرکننده منجر به محرومیت ورود به اروپا می‌شود." },
                      { icon: "💡", title: "توصیه رسمی اتریش‌نشین", desc: "موارد مشکوک را به BAK یا پلیس با شماره ۱۳۳ گزارش دهید." }
                    ].map((w, i) => (
                      <div key={i} className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl flex gap-3">
                        <div className="text-lg">{w.icon}</div>
                        <div className="space-y-1">
                          <h5 className="font-extrabold text-xs text-red-950">{w.title}</h5>
                          <p className="text-[10px] text-stone-600 font-bold leading-relaxed">{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ============ RIGHTS TAB ============ */}
          {activeTab === "rights" && (
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-red-950 text-sm md:text-base flex items-center justify-end gap-2">
                  <span>محاسبه مالیات، قوانین کار AK و بیمه ÖGK ⚖️</span><span>📋</span>
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed">
                  حقوق کارمندان در اتریش تحت نظارت شدید Arbeiterkammer (AK) و ÖGK تنظیم می‌شود.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4">
                  <span className="block font-extrabold text-stone-850 text-xs border-b border-stone-150 pb-2">🧮 محاسبه فیش حقوقی (Brutto-Netto):</span>
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-xs text-stone-700 font-bold">
                      <label className="block">حقوق ناخالص: <strong className="text-red-700 font-mono">{workerGrossIncome} €</strong></label>
                      <input type="range" min="1500" max="7000" step="100" value={workerGrossIncome}
                        onChange={(e) => setWorkerGrossIncome(parseInt(e.target.value))}
                        className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                    </div>
                    <div className="p-3 bg-white border border-stone-200 rounded-2xl space-y-2.5 text-xs font-semibold text-stone-700">
                      <div className="flex justify-between"><span className="font-mono text-stone-800">{workerTax.sv} €</span><span>بیمه اجتماعی (۱۸.۱۲%):</span></div>
                      <div className="flex justify-between"><span className="font-mono text-stone-800">{workerTax.tax} €</span><span>مالیات بر درآمد:</span></div>
                      <div className="flex justify-between pt-2.5 border-t border-stone-150 text-stone-900 font-black">
                        <span className="font-mono text-red-600 text-sm">{workerTax.net} €</span><span>خالص دریافتی:</span>
                      </div>
                    </div>
                    <div className="border border-stone-150 bg-stone-100 p-3 rounded-xl text-[10px] text-stone-500 font-bold leading-relaxed">
                      🌟 در اتریش حقوق سالانه در ۱۴ نوبت پرداخت می‌شود (Urlaubsbeihilfe + Weihnachtsgeld).
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 bg-white border border-stone-200 p-5 rounded-3xl space-y-4">
                  <span className="block font-extrabold text-stone-850 text-xs border-b border-stone-150 pb-2">🛡️ حقوق محوری کارگران (AK):</span>
                  {[
                    { t: "۱. چتر حمایتی اتاق کار (Arbeiterkammer)", d: "مشاوره حقوقی رایگان و تقبل هزینه وکالت در صورت اختلاف با کارفرما." },
                    { t: "۲. مرخصی و ساعات کاری قانونی", d: "حداقل ۵ هفته مرخصی سالانه، سقف ۱۲ ساعت روزانه، اضافه‌کاری ۱.۵ برابر." },
                    { t: "۳. بیمه درمانی اتریش (ÖGK/SVS)", d: "پوشش کامل درمانی و امکان بیمه رایگان همسر و فرزندان تحت تکفل." }
                  ].map((r, i) => (
                    <div key={i} className="relative pr-4 border-r-2 border-red-500 space-y-1">
                      <h5 className="font-extrabold text-xs text-stone-850">{r.t}</h5>
                      <p className="text-[10px] text-stone-600 font-semibold leading-relaxed">{r.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ EVENTS TAB ============ */}
          {activeTab === "events" && (() => {
            const eventsList = [
              { id: "ev1", title: "فستیوال جزیره دانوب (Donauinselfest) 🎸", organizer: "شهرداری وین", date: "شنبه، ۱۴ تیر ۱۴۰۵ (4 July 2026)", location: "جزیره دانوب وین", description: "جشنواره بزرگ تابستانی با موسیقی زنده و غذاهای بین‌المللی.", rsvpLimit: "رایگان", type: "جشنواره فرهنگی" },
              { id: "ev2", title: "جشن بزرگ تیرگان در وین 🌊", organizer: "انجمن فرهنگی امید", date: "دوشنبه، ۲۳ تیر ۱۴۰۵", location: "پارک تیولی وین", description: "جشنواره سنتی تیرگان با آیین آب‌پاشی و موسیقی فولکلور.", rsvpLimit: "۱۰ یورو", type: "جشنواره ملی" },
              { id: "ev3", title: "روز عروج حضرت مریم ⛪", organizer: "کلیسای کاتولیک", date: "شنبه، ۲۴ مرداد ۱۴۰۵", location: "کلیسای Stephansdom", description: "مراسم مذهبی تعطیلی رسمی اتریش.", rsvpLimit: "رایگان", type: "تعطیلات رسمی" },
              { id: "ev4", title: "سمینار بزرگداشت روز پزشک 🩺", organizer: "جامعه پزشکان ایرانی", date: "سه‌شنبه، ۳ شهریور ۱۴۰۵", location: "سالزبورگ", description: "سمینار علمی-صنفی پزشکان و کادر درمان.", rsvpLimit: "۲۰ یورو", type: "همایش علمی" },
              { id: "ev5", title: "جشنواره برداشت محصول 🍎", organizer: "اتحادیه کشاورزان", date: "شنبه، ۲۱ شهریور ۱۴۰۵", location: "Rathausplatz وین", description: "بازارچه محصولات ارگانیک و رقص فولکلوریک.", rsvpLimit: "رایگان", type: "فرهنگ عامه" },
              { id: "ev6", title: "فستیوال Wiesn-Fest 🎡", organizer: "گردشگری وین", date: "سه‌شنبه، ۳۱ شهریور ۱۴۰۵", location: "Prater وین", description: "جشنواره شاد پاییزی با لباس‌های سنتی.", rsvpLimit: "۱۵ یورو", type: "تفریحات سنتی" },
              { id: "ev7", title: "دورهمی جشن مهرگان 🍁", organizer: "مدرسه فرهنگی گراتس", date: "چهارشنبه، ۱ مهر ۱۴۰۵", location: "گراتس", description: "جشن پاییزی مهرگان و آغاز سال تحصیلی.", rsvpLimit: "رایگان", type: "دورهمی" },
              { id: "ev8", title: "تعطیلات روز کارگر 🇦🇹", organizer: "شهرداری وین", date: "جمعه، ۱۱ اردیبهشت ۱۴۰۵", location: "Stephansplatz", description: "رژه‌های صنفی و جشن کارگر.", rsvpLimit: "رایگان", type: "تعطیل رسمی" },
              { id: "ev9", title: "بزرگداشت فردوسی 📜", organizer: "انجمن ادبی بهار", date: "جمعه، ۲۵ اردیبهشت ۱۴۰۵", location: "مرکز فرهنگی وین", description: "شاهنامه‌خوانی و تحلیل اشعار اساطیری.", rsvpLimit: "رایگان", type: "همایش ادبی" }
            ];
            return (
              <div className="space-y-6">
                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-2">
                  <h3 className="font-extrabold text-red-950 text-sm md:text-base flex items-center justify-end gap-2">
                    <span>رویدادها و همایش‌های جامعه فارسی‌زبان اتریش 📅</span><span>👥</span>
                  </h3>
                  <p className="text-xs text-stone-600 font-bold leading-relaxed">
                    تقویم تجمع‌های ایرانیان اتریش‌نشین جهت هم‌افزایی و دورهمی‌های فرهنگی.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {eventsList.map(event => {
                    const isRsvped = !!rsvpEvents[event.id];
                    return (
                      <motion.article key={event.id} whileHover={{ y: -4 }}
                        className="bg-white border border-stone-200 rounded-3xl p-5 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] bg-red-50 text-red-700 font-extrabold px-2.5 py-0.5 rounded-full">{event.type}</span>
                          <span className="text-[10px] text-stone-400 font-black">{event.organizer}</span>
                        </div>
                        <div className="space-y-3 flex-1">
                          <h4 className="font-extrabold text-stone-850 text-xs sm:text-sm leading-snug">{event.title}</h4>
                          <div className="space-y-1.5 text-[11px] text-stone-500 font-semibold leading-relaxed">
                            <div className="text-stone-700">📅 <strong>{event.date}</strong></div>
                            <div className="text-stone-600">📍 {event.location}</div>
                            <p className="border-t border-stone-100 pt-2 text-stone-400">{event.description}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-stone-100 mt-4 space-y-2">
                          <div className="text-[9px] text-red-600 font-black">{event.rsvpLimit}</div>
                          <button onClick={() => setRsvpEvents(prev => ({ ...prev, [event.id]: !prev[event.id] }))}
                            className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              isRsvped ? "bg-stone-900 text-white" : "bg-stone-50 text-stone-700 border border-stone-250 hover:bg-stone-100"
                            }`}>
                            {isRsvped ? "✔ رزرو موقت شد" : "🎟️ اعلام تمایل به حضور"}
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* ============ ASSESSMENT TAB ============ */}
          {activeTab === "assessment" && (
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-red-950 text-sm md:text-base flex items-center justify-end gap-2">
                    <span>سامانه ارزیابی هوشمند مهاجرت اتریش 🇦🇹</span>
                    <Sparkles className="w-5 h-5 text-red-600 animate-pulse" />
                  </h3>
                  <p className="text-xs text-stone-400 font-bold">
                    سنجش دقیق و اتوماتیک امکان دریافت کارت اقامت سرخ-سفید-سرخ (RWR 2026)
                  </p>
                </div>
                <span className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-md font-bold">
                  Rot-Weiß-Rot Rechner
                </span>
              </div>

              <div className="bg-stone-50/50 border border-stone-200 rounded-3xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-stone-150 pb-4 text-xs font-black text-stone-400">
                  <span>گام {assessStep} از ۳</span>
                  <span>{assessStep === 1 ? "مشخصات و زبان" : assessStep === 2 ? "سوابق حرفه‌ای" : "کارنامه نهائی"}</span>
                </div>

                {assessStep === 1 && (
                  <div className="space-y-6">
                    <div className="bg-white border border-stone-200 p-4 rounded-2xl space-y-3">
                      <span className="block text-xs font-black text-stone-850">مسیرهای اصلی اقامت:</span>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { k: "rwr", l: "💼 سرخ-سفید-سرخ (RWR)" },
                          { k: "study", l: "🎓 اقامت تحصیلی" },
                          { k: "financial", l: "💰 تمکن مالی" },
                          { k: "family", l: "🏡 الحاق خانواده" }
                        ].map(p => (
                          <button key={p.k} type="button" onClick={() => { setMigrationPath(p.k); setAssessmentResult(null); }}
                            className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black cursor-pointer border transition-all ${
                              migrationPath === p.k ? "bg-red-600 text-white border-red-600" : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                            }`}>{p.l}</button>
                        ))}
                      </div>
                      <span className="block text-xs font-black text-stone-850 pt-2 border-t border-stone-100">روش‌های موقت:</span>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {[
                          { k: "researcher", l: "🔬 پژوهشگران" },
                          { k: "ict", l: "🏢 اعزام ICT" },
                          { k: "special-work", l: "👩‍👦 Au-Pair" },
                          { k: "volunteer", l: "🤝 داوطلبی" },
                          { k: "self-employed-temp", l: "🛠️ خویش‌فرمای موقت" },
                          { k: "seasonal", l: "🍓 کار فصلی" }
                        ].map(p => (
                          <button key={p.k} type="button" onClick={() => { setMigrationPath(p.k); setAssessmentResult(null); }}
                            className={`px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black cursor-pointer border transition-all ${
                              migrationPath === p.k ? "bg-red-600 text-white border-red-600" : "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100"
                            }`}>{p.l}</button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {migrationPath === "rwr" && (
                        <>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">سن: <strong className="text-red-700 font-mono">{age} سال</strong></label>
                            <input type="range" min="18" max="65" value={age} onChange={(e) => setAge(parseInt(e.target.value))}
                              className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                          </div>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">مدرک تحصیلی:</label>
                            <select value={education} onChange={(e) => setEducation(e.target.value)}
                              className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                              <option value="phd">🎓 دکتری (۴۰)</option>
                              <option value="master">🎓 فوق لیسانس (۳۰)</option>
                              <option value="bachelor">🎓 لیسانس (۲۰)</option>
                              <option value="vocational">🛠️ فنی‌وحرفه‌ای (۱۵)</option>
                              <option value="none">فاقد مدرک (۰)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">آلمانی:</label>
                            <select value={germanSkill} onChange={(e) => setGermanSkill(e.target.value)}
                              className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                              <option value="B2+">سطح B2+ (۱۵)</option>
                              <option value="B1">سطح B1 (۱۵)</option>
                              <option value="A2">سطح A2 (۱۰)</option>
                              <option value="A1">سطح A1 (۵)</option>
                              <option value="none">فاقد (۰)</option>
                            </select>
                          </div>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">انگلیسی:</label>
                            <select value={englishSkill} onChange={(e) => setEnglishSkill(e.target.value)}
                              className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                              <option value="IELTS_6.0">IELTS 6.0+ (۱۰)</option>
                              <option value="none">فاقد (۰)</option>
                            </select>
                          </div>
                        </>
                      )}
                      {migrationPath === "study" && (
                        <>
                          <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={hasUniAdmission} onChange={(e) => setHasUniAdmission(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black text-stone-800">پذیرش قطعی (۴۰)</span>
                          </label>
                          <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={hasStudyProofOfFunds} onChange={(e) => setHasStudyProofOfFunds(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black text-stone-800">تمکن مالی (۴۰)</span>
                          </label>
                          <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={hasAustrianAccommodation} onChange={(e) => setHasAustrianAccommodation(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black text-stone-800">اسکان اتریش (۲۰)</span>
                          </label>
                        </>
                      )}
                      {migrationPath === "financial" && (
                        <>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">درآمد غیرفعال: <strong className="text-red-700 font-mono">{passiveMonthlyIncome} €</strong></label>
                            <input type="range" min="1000" max="5000" step="100" value={passiveMonthlyIncome}
                              onChange={(e) => setPassiveMonthlyIncome(parseInt(e.target.value))}
                              className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                          </div>
                          <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={germanA1Certificate} onChange={(e) => setGermanA1Certificate(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black text-stone-800">مدرک A1 آلمانی (۳۰)</span>
                          </label>
                        </>
                      )}
                      {migrationPath === "family" && (
                        <>
                          <div className="space-y-1.5 font-bold text-xs text-stone-700">
                            <label className="block">وضعیت اسپانسر:</label>
                            <select value={familySponsorStatus} onChange={(e) => setFamilySponsorStatus(e.target.value)}
                              className="w-full bg-white border border-stone-250 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                              <option value="citizen">🇦🇹 شهروند اتریش (۴۰)</option>
                              <option value="rwrPlus">📋 RWR+ (۳۰)</option>
                              <option value="none">سایر (۰)</option>
                            </select>
                          </div>
                          <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={familyA1Certificate} onChange={(e) => setFamilyA1Certificate(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black text-stone-800">A1 همسر (۳۰)</span>
                          </label>
                        </>
                      )}
                      {migrationPath === "researcher" && (
                        <>
                          <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={researcherHostingAgreement} onChange={(e) => setResearcherHostingAgreement(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black">Aufnahmevereinbarung (۵۰)</span>
                          </label>
                          <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                            <input type="checkbox" checked={researcherFundsInsurance} onChange={(e) => setResearcherFundsInsurance(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                            <span className="text-xs font-black">تمکن و بیمه (۵۰)</span>
                          </label>
                        </>
                      )}
                      {migrationPath === "ict" && (
                        <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={ictEmployedBefore} onChange={(e) => setIctEmployedBefore(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">۶-۱۲ ماه سابقه شرکت مادر</span>
                        </label>
                      )}
                      {migrationPath === "special-work" && (
                        <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={specialWorkAgeRange} onChange={(e) => setSpecialWorkAgeRange(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">سن ۱۸-۲۸ سال</span>
                        </label>
                      )}
                      {migrationPath === "volunteer" && (
                        <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={volunteerContract} onChange={(e) => setVolunteerContract(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">قرارداد خیریه معتبر</span>
                        </label>
                      )}
                      {migrationPath === "self-employed-temp" && (
                        <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={selfEmployedContracts} onChange={(e) => setSelfEmployedContracts(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">قراردادهای خدمات محلی</span>
                        </label>
                      )}
                      {migrationPath === "seasonal" && (
                        <label className="flex items-center gap-2 bg-white p-3 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={seasonalAMSQuota} onChange={(e) => setSeasonalAMSQuota(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">سهمیه AMS</span>
                        </label>
                      )}
                    </div>

                    <div className="flex justify-end pt-3">
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        type="button" onClick={() => setAssessStep(2)}
                        className="bg-stone-900 hover:bg-stone-850 text-white text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer">
                        مرحله بعدی ←
                      </motion.button>
                    </div>
                  </div>
                )}

                {assessStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {migrationPath === "rwr" && (
                      <>
                        <div className="space-y-1.5 font-bold text-xs text-stone-700">
                          <label className="block">سابقه کار: <strong className="text-red-700 font-mono">{experienceYears} سال</strong></label>
                          <input type="range" min="0" max="15" value={experienceYears} onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                            className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                        </div>
                        <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={studiedInAustria} onChange={(e) => setStudiedInAustria(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">فارغ‌التحصیل اتریش (۱۰)</span>
                        </label>
                        <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={hasJobOffer} onChange={(e) => setHasJobOffer(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">Job Offer</span>
                        </label>
                        <label className="flex items-center gap-2 bg-white p-2.5 border border-stone-250 rounded-xl cursor-pointer">
                          <input type="checkbox" checked={isShortageOccup} onChange={(e) => setIsShortageOccup(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                          <span className="text-xs font-black">شغل در Mangelberufe</span>
                        </label>
                      </>
                    )}
                    {migrationPath === "family" && (
                      <div className="space-y-1.5 font-bold text-xs text-stone-700 md:col-span-2">
                        <label className="block">درآمد ماهیانه حامی: <strong className="text-red-700 font-mono">{familySponsorMonthlyIncome} €</strong></label>
                        <input type="range" min="1200" max="4000" step="50" value={familySponsorMonthlyIncome}
                          onChange={(e) => setFamilySponsorMonthlyIncome(parseInt(e.target.value))}
                          className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                      </div>
                    )}
                    {migrationPath === "financial" && (
                      <div className="space-y-1.5 font-bold text-xs text-stone-700 md:col-span-2">
                        <label className="block">سپرده نقدی: <strong className="text-red-700 font-mono">{liquidEuroSavings} €</strong></label>
                        <input type="range" min="10000" max="100000" step="5000" value={liquidEuroSavings}
                          onChange={(e) => setLiquidEuroSavings(parseInt(e.target.value))}
                          className="w-full accent-red-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer" />
                      </div>
                    )}
                    <div className="col-span-1 md:col-span-2 flex justify-between gap-3 pt-3">
                      <button type="button" onClick={() => setAssessStep(1)}
                        className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer">
                        ← بازگشت
                      </button>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        type="button" onClick={handleCalculateAssessment}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-6 py-2.5 rounded-xl cursor-pointer shadow-sm">
                        محاسبه نهایی و صدور کارنامه 📊
                      </motion.button>
                    </div>
                  </div>
                )}

                {assessStep === 3 && assessmentResult && (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                    <div className="p-5 bg-stone-900 text-white rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded">
                            کارنامه رسمی ارزیابی اتریش
                          </span>
                          <h4 className="font-extrabold text-stone-100 text-xs sm:text-sm mt-1.5">
                            مسیر پیشنهادی: {assessmentResult.path}
                          </h4>
                        </div>
                        <div className="text-center bg-white/10 p-3.5 rounded-2xl border border-white/20 shrink-0">
                          <span className="text-[9px] text-stone-300 block">امتیاز کل:</span>
                          <strong className="text-2xl font-mono text-red-500 block mt-0.5">
                            {assessmentResult.points} <span className="text-xs font-sans text-stone-200">امتیاز</span>
                          </strong>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3">
                        <h5 className="font-black text-stone-850 text-xs border-b border-stone-100 pb-2">📂 ریز محاسبات:</h5>
                        <div className="text-xs text-stone-600 font-bold whitespace-pre-line leading-relaxed">{assessmentResult.log}</div>
                      </div>
                      <div className="bg-white border border-stone-200 p-5 rounded-2xl flex flex-col justify-between">
                        <div className="space-y-3">
                          <h5 className="font-black text-stone-850 text-xs border-b border-stone-100 pb-2 flex items-center justify-end gap-1.5">
                            <span>خلاصه ارزیابی:</span><CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          </h5>
                          <p className="text-xs text-stone-650 font-black leading-relaxed">{assessmentResult.message}</p>
                        </div>
                        <div className="bg-stone-50 p-4 border border-stone-150 rounded-2xl space-y-3 mt-4">
                          <div className="flex gap-2 items-center justify-end text-[10px] text-stone-500 font-black">
                            <span>شماره مشاور: <strong className="font-mono text-stone-900">+43 688 976 3256</strong></span>
                            <MapPin className="w-3.5 h-3.5 text-stone-400" />
                          </div>
                          <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-md text-center">
                            📬 ارسال کارنامه به واتساپ
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                      <button type="button" onClick={() => { setAssessStep(1); setAssessmentResult(null); }}
                        className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-black px-5 py-2.5 rounded-xl cursor-pointer">
                        شروع مجدد
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* ============ ALERTS TAB ============ */}
          {activeTab === "alerts" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-stone-50/50 border border-stone-200 p-5 rounded-3xl space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-stone-150">
                  <button onClick={handleStartRadar} disabled={isAlertScanning}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black text-[11px] p-2 px-4 rounded-xl cursor-pointer shadow-sm">
                    {isAlertScanning ? "در حال اسکن..." : "🛰️ اسکن لایو MA 35"}
                  </button>
                  <h4 className="font-extrabold text-stone-850 text-base">سیستم اعلانات بومی</h4>
                </div>
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto">
                  {notifications.map(notif => (
                    <motion.div key={notif.id} whileHover={{ x: 3 }}
                      className="bg-white border p-4 rounded-2xl flex items-start gap-4 hover:shadow-sm transition-all">
                      <div className={`w-9 h-9 flex items-center justify-center rounded-xl shrink-0 text-lg ${
                        notif.type === "cita" ? "bg-red-50 text-red-700" :
                        notif.type === "law" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                      }`}>{notif.type === "cita" ? "📅" : notif.type === "law" ? "📜" : "💰"}</div>
                      <div className="space-y-0.5 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-stone-400 font-mono font-semibold">{notif.time}</span>
                          <span className="text-[10px] bg-stone-50 border border-stone-150 text-stone-700 font-extrabold px-1.5 py-0.5 rounded-md">{notif.badge}</span>
                        </div>
                        <h5 className="font-extrabold text-stone-800 text-xs sm:text-sm mt-1">{notif.title}</h5>
                        <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">{notif.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-3xl space-y-5">
                <h5 className="font-extrabold text-stone-850 text-base border-b border-stone-100 pb-2">پیکربندی رادار</h5>
                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-[11px] text-stone-500 font-bold mb-1">ایالت:</label>
                    <select value={radarRegion} onChange={(e) => setRadarRegion(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold">
                      <option value="wien">وین (Wien)</option>
                      <option value="graz">گراتس (Styria)</option>
                      <option value="salzburg">سالزبورگ (Salzburg)</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 bg-stone-50 border border-stone-150 p-2.5 px-4 rounded-xl cursor-pointer">
                    <input type="checkbox" checked={playAlarm} onChange={(e) => setPlayAlarm(e.target.checked)} className="w-4 h-4 text-red-600 rounded" />
                    <span className="text-[11px] font-black text-stone-800">پخش صدا موقع صید نوبت</span>
                  </label>
                  {radarLogs.length > 0 && (
                    <div className="bg-stone-900 text-emerald-400 font-mono text-[9px] p-3 rounded-xl space-y-1 text-left max-h-32 overflow-y-auto" dir="ltr">
                      {radarLogs.map((log, id) => (<div key={id} className="border-b border-stone-800/20 pb-0.5">{log}</div>))}
                    </div>
                  )}
                  {radarResults && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 leading-relaxed">
                      {radarResults}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ BUDGET TAB ============ */}
          {activeTab === "budget" && (
            <div className="space-y-6">
              <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-extrabold text-amber-950 text-xs sm:text-sm flex items-center justify-end gap-1.5">
                    <span>نمودار بودجه و معیشت اتریش 📊</span><TrendingUp className="w-5 h-5 text-amber-600" />
                  </h4>
                  <p className="text-[11px] text-stone-550 leading-relaxed font-bold mt-1">
                    محاسبه هزینه‌های ثابت بقا در شهرهای مختلف اتریش.
                  </p>
                </div>
                <select value={budgetCity} onChange={(e) => {
                    setBudgetCity(e.target.value);
                    setRentCost(e.target.value === "graz" ? 670 : e.target.value === "salzburg" ? 790 : 850);
                  }}
                  className="bg-white border border-stone-250 p-2 rounded-xl text-xs font-bold cursor-pointer">
                  <option value="wien">وین (پایتخت)</option>
                  <option value="graz">گراتس (ارزان)</option>
                  <option value="salzburg">سالزبورگ</option>
                </select>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5 bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
                  <h5 className="font-black text-stone-850 text-xs">تنظیم مخارج:</h5>
                  {[
                    { l: "اجاره", v: rentCost, set: setRentCost, min: 350, max: 1800 },
                    { l: "خواربار", v: foodCost, set: setFoodCost, min: 150, max: 800 },
                    { l: "حمل و نقل", v: transportCost, set: setTransportCost, min: 10, max: 100 },
                    { l: "تفریح", v: leisureCost, set: setLeisureCost, min: 50, max: 500 },
                  ].map((s, i) => (
                    <div key={i} className="space-y-1 text-xs font-bold text-stone-700">
                      <label className="block">{s.l}: <strong className="text-red-700 font-mono">{s.v} €</strong></label>
                      <input type="range" min={s.min} max={s.max} value={s.v}
                        onChange={(e) => s.set(parseInt(e.target.value))}
                        className="w-full accent-red-600 h-1 bg-stone-200 rounded-lg cursor-pointer" />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-7 bg-white border border-stone-200 p-5 rounded-2xl space-y-4">
                  <h5 className="font-extrabold text-stone-850 text-xs">سبد معیشت ماهانه:</h5>
                  <div className="flex justify-between items-center p-3 bg-stone-50 rounded-xl border border-stone-150">
                    <span className="text-xs text-stone-400 font-bold">جمع مخارج</span>
                    <strong className="text-lg font-mono text-red-700">{budgetTotal} € / ماه</strong>
                  </div>
                  {[
                    { label: "اجاره مسکن", val: rentCost, color: "bg-red-500" },
                    { label: "خواربار", val: foodCost, color: "bg-amber-500" },
                    { label: "حمل و نقل", val: transportCost, color: "bg-emerald-500" },
                    { label: "بیمه ÖGK", val: insuranceCost, color: "bg-blue-500" },
                    { label: "تفریح", val: leisureCost, color: "bg-stone-500" }
                  ].map((item, idx) => {
                    const perc = Math.round((item.val / budgetTotal) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-black">
                          <span className="text-stone-400 font-mono">{item.val} € ({perc}%)</span>
                          <span className="text-stone-700">{item.label}</span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${perc}%` }} transition={{ duration: 0.6, delay: idx * 0.08 }}
                            className={`h-full ${item.color}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============ PDF EXPORT TAB ============ */}
          {activeTab === "pdf_export" && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-xs">چک‌لیست طلایی مدارک اقامتی</h4>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed mt-1">
                    مدارک تاییدشده را مانیتور و خروجی مکتوب تهیه کنید.
                  </p>
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={exportChecklistToTxt}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm">
                  <Download className="w-4 h-4" /><span>خروجی متنی چک‌لیست</span>
                </motion.button>
              </div>
              <div className="bg-stone-50/50 border border-stone-200 p-5 rounded-3xl space-y-3.5">
                <h5 className="font-black text-stone-800 text-xs">تطبیق مدارک قبل از تسلیم به MA 35:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {checklistItems.map(item => (
                    <motion.div key={item.id} onClick={() => handleToggleCheck(item.id)} whileHover={{ y: -2 }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3 items-start ${
                        item.checked ? "bg-emerald-50/20 border-emerald-200" : "bg-white border-stone-200 hover:border-stone-350"
                      }`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        item.checked ? "bg-emerald-600 text-white" : "border border-stone-300 text-transparent"
                      }`}><Check className="w-3.5 h-3.5 stroke-[3]" /></div>
                      <h6 className={`text-xs font-black leading-snug ${item.checked ? "text-stone-400 line-through" : "text-stone-800"}`}>{item.text}</h6>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ ANIMATIONS TAB ============ */}
          {activeTab === "animations" && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-50 border border-purple-150 rounded-2xl">
                <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded">Motion Lab</span>
                <h4 className="font-extrabold text-stone-850 text-xs sm:text-sm mt-1.5">ساختار بصری و انیمیشن متقارن</h4>
                <p className="text-[11px] text-stone-500 font-semibold leading-relaxed mt-1">
                  با <code>motion/react</code> تجربه بصری نرم و فولوست‌های جذاب را تجربه کنید.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.03, rotateZ: 0.5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-6 rounded-3xl border border-stone-800 max-w-sm cursor-pointer shadow-md relative overflow-hidden"
                  onClick={() => alert("انیمیشن نرم اجرا شد! ✨")}>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] bg-red-600 text-white font-black px-2 py-0.5 rounded">AT-MEMBER</span>
                    <Sparkles className="w-5 h-5 text-red-500 animate-pulse" />
                  </div>
                  <h4 className="font-extrabold text-white text-xs sm:text-sm">کارت اقامت سرخ-سفید-سرخ آزمایشی</h4>
                  <p className="text-[10px] text-stone-400 font-semibold mt-1">تایید صلاحیت رسمی کشور اتریش</p>
                  <div className="border-t border-stone-800 pt-3 mt-4 flex justify-between text-[9px] text-stone-400 font-bold">
                    <span>معتبر تا: ۲۰۲۸-۰۵</span>
                    <span>شماره ملی: AT8921-X</span>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* ============ NOSTRIFIZIERUNG TAB ============ */}
          {activeTab === "nostrifizierung" && (
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-red-950 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>ارزشیابی مدارک تحصیلی (Nostrifizierung) 🎓</span><span>🎓</span>
                </h3>
                <p className="text-xs text-stone-605 font-bold leading-relaxed">
                  ارزشیابی مدارک تحصیلی در اتریش با توجه به رشته تحصیلی به مراجع متفاوت واگذار می‌گردد.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 bg-stone-50 border border-stone-150 p-5 rounded-3xl space-y-4">
                  <span className="block text-xs font-black text-stone-800">۱. انتخاب تخصص:</span>
                  <div className="flex flex-col gap-2">
                    {[
                      { id: "medicine", label: "🩺 پزشکی و دندانپزشکی" },
                      { id: "nursing", label: "🩺 پرستاری و پیراپزشکی" },
                      { id: "engineering", label: "📐 مهندسی و معماری" },
                      { id: "teaching", label: "🏫 کادر آموزشی" }
                    ].map(item => (
                      <button key={item.id} onClick={() => setNostriProfession(item.id)}
                        className={`w-full p-3.5 rounded-2xl text-right transition-all flex flex-col gap-1 border cursor-pointer ${
                          nostriProfession === item.id ? "bg-red-600 text-white border-red-700 shadow-sm" : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                        }`}>
                        <span className="text-xs font-black">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-8 bg-white border border-stone-200 p-6 rounded-3xl space-y-6">
                  {nostriProfession === "medicine" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h4 className="font-extrabold text-stone-900 text-sm">معادل‌سازی مدارک پزشکی</h4>
                      <p className="text-xs text-stone-605 leading-relaxed font-bold">
                        برای کار به عنوان پزشک، باید مدرک خود را در یکی از سه دانشگاه پزشکی اتریش (وین، گراتس، اینسبروک) معادل‌سازی کنید.
                      </p>
                      <div className="bg-stone-50 border border-stone-150 p-4 rounded-2xl space-y-2 text-xs font-bold text-stone-700">
                        <h5 className="font-extrabold text-stone-900">📑 مدارک کلیدی:</h5>
                        <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed pr-3">
                          <li>دانشنامه رسمی و ریزنمرات کامل</li>
                          <li>آلمانی B2 و تخصصی C1</li>
                          <li>عدم سوءپیشینه با تایید سفارت</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                  {nostriProfession === "nursing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h4 className="font-extrabold text-stone-900 text-sm">پرستاری و پیراپزشکی</h4>
                      <p className="text-xs text-stone-605 leading-relaxed font-bold">
                        اتریش با بحران کمبود پرستار مواجه است. مدارک با کسری واحدهای عملی برطرف می‌گردد.
                      </p>
                    </motion.div>
                  )}
                  {nostriProfession === "engineering" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h4 className="font-extrabold text-stone-900 text-sm">مهندسان و معماران</h4>
                      <p className="text-xs text-stone-605 leading-relaxed font-bold">
                        برای مشاغل مهندسی معمولی، ارزیابی از طریق <strong>ENIC-NARIC Austria</strong> کفایت می‌کند.
                      </p>
                    </motion.div>
                  )}
                  {nostriProfession === "teaching" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <h4 className="font-extrabold text-stone-900 text-sm">کادر معلمی</h4>
                      <p className="text-xs text-stone-605 leading-relaxed font-bold">
                        سطح زبان آلمانی برای معلمان دبستان و دبیرستان حداقل C1 است.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ============ LAWS TAB ============ */}
          {activeTab === "laws" && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-amber-950 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>موتور دایرةالمعارف قوانین رسمی اتریش 📜</span><span>📜</span>
                </h3>
                <p className="text-xs text-stone-655 font-bold leading-relaxed">
                  جستجو در قوانین مالی، قرارداد کار و روابط مستاجرین با کارفرمای اتریشی.
                </p>
              </div>
              <div className="flex gap-2 border-b border-stone-150 pb-3 overflow-x-auto">
                {[
                  { id: "all", label: "کل قوانین" },
                  { id: "mrg", label: "🏠 مستاجرین (MRG)" },
                  { id: "labor", label: "💼 کارگر (Arbeitsrecht)" },
                  { id: "immigration", label: "📂 اقامت (NAG)" },
                  { id: "family", label: "🏥 بیمه (Mitversicherung)" }
                ].map(cat => (
                  <button key={cat.id} onClick={() => setSelectedLawCat(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                      selectedLawCat === cat.id ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-605 hover:bg-stone-200"
                    }`}>{cat.label}</button>
                ))}
              </div>
              <div className="bg-stone-50 border border-stone-150 p-4 rounded-2xl">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input type="text" value={lawSearchQuery} onChange={(e) => setLawSearchQuery(e.target.value)}
                    placeholder="جستجوی قوانین (مثال: مستاجر، بیمه، تغییر کارفرما...)"
                    className="w-full bg-white border border-stone-250 p-3 pr-10 rounded-xl text-xs font-bold outline-none focus:border-red-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "l1", title: "قانون استرداد ودیعه (Kaution MRG § 16b)", category: "mrg", desc: "صاحبخانه موظف به استرداد ودیعه با سود بانکی حداکثر ۳-۴ هفته پس از اتمام اجاره است.", tip: "شکایت به Schlichtungsstelle رایگان است." },
                  { id: "l2", title: "تغییر کارفرمای RWR", category: "immigration", desc: "متقاضیان RWR تا قبل از RWR+ حق کار در شرکت دیگر را ندارند. جابجایی باید از AMS تایید شود.", tip: "رعایت Kündigungsfrist الزامی است." },
                  { id: "l3", title: "بیمه رایگان همراهان (Mitversicherung ÖGK)", category: "family", desc: "افراد دارای RWR می‌توانند همسر و فرزندان فاقد درآمد را رایگان بیمه کنند.", tip: "فرم Mitversicherung از پورتال ÖGK." },
                  { id: "l4", title: "قانون اضافه کار (Arbeitszeitgesetz)", category: "labor", desc: "حداکثر ۱۰ ساعت روزانه و ۵۰ ساعت هفتگی. اضافه‌کار با ۲۵٪ یا ۵۰٪ جبران می‌شود.", tip: "AK رایگان شکایات را پیگیری می‌کند." }
                ]
                  .filter(law => {
                    if (selectedLawCat !== "all" && law.category !== selectedLawCat) return false;
                    if (lawSearchQuery && !law.title.includes(lawSearchQuery) && !law.desc.includes(lawSearchQuery)) return false;
                    return true;
                  })
                  .map(law => (
                    <motion.article key={law.id} whileHover={{ y: -3 }}
                      className="bg-white border border-stone-200 rounded-2xl p-5 hover:border-red-200 transition-all flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] bg-stone-100 text-stone-700 font-extrabold px-2 py-0.5 rounded">
                          {law.category === "mrg" ? "مسکن MRG" : law.category === "immigration" ? "مهاجرت NAG" : law.category === "labor" ? "حقوق کار" : "سلامت"}
                        </span>
                        <h4 className="font-extrabold text-stone-850 text-xs sm:text-sm">{law.title}</h4>
                        <p className="text-xs text-stone-550 leading-relaxed font-bold">{law.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-stone-100 bg-amber-50/20 p-2.5 rounded-xl text-[10.5px] text-amber-900 font-black">
                        💬 {law.tip}
                      </div>
                    </motion.article>
                  ))}
              </div>
            </div>
          )}

          {/* ============ SCHOOL GUIDE TAB ============ */}
          {activeTab === "school_guide" && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-stone-850 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>راهنمای ثبت‌نام مدارس اتریش 🎒</span><span>🎒</span>
                </h3>
                <p className="text-xs text-stone-400 font-bold leading-relaxed">
                  تحصیل از ۶ الی ۱۵ سالگی اجباری (Schulpflicht) و کاملاً رایگان است.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-stone-200 p-5 rounded-3xl space-y-5">
                  <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm">🗓️ تقویم و مراحل:</h4>
                  {[
                    { title: "۱. مهدکودک (Kindergarten) - ۳ تا ۶ سال", desc: "ثبت‌نام عمدتاً نوامبر تا دسامبر هر سال برای سپتامبر سال جدید." },
                    { title: "۲. دبستان (Volksschule) - ۶ تا ۱۰ سال", desc: "ثبت‌نام از ژانویه آغاز می‌شود. معاینات Mutter-Kind-Pass الزامی است." },
                    { title: "۳. دبیرستان (Mittelschule / Gymnasium)", desc: "بر اساس نمرات کارنامه دبستان توزیع می‌شوند." }
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-stone-50/50 border border-stone-150 rounded-2xl space-y-1">
                      <h5 className="font-black text-xs text-stone-850">{s.title}</h5>
                      <p className="text-[11px] text-stone-500 leading-relaxed font-bold">{s.desc}</p>
                    </div>
                  ))}
                  <div className="bg-rose-50/40 border border-rose-100 p-4 rounded-2xl space-y-2.5">
                    <h5 className="font-extrabold text-stone-900 text-xs">🧮 شبیه‌ساز تعیین مقطع:</h5>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-605 font-bold">سن کودک:</span>
                      <input type="range" min="3" max="16" value={childAge} onChange={(e) => setChildAge(Number(e.target.value))}
                        className="flex-1 accent-red-600 cursor-pointer" />
                      <span className="text-xs font-black text-red-600 bg-white border border-stone-200 p-1 px-3 rounded-xl">{childAge} سال</span>
                    </div>
                    <p className="text-[11px] text-stone-550 leading-relaxed font-bold">
                      مقطع: <strong className="text-red-950">
                        {childAge < 6 ? "مهدکودک (Kindergarten)"
                          : childAge <= 10 ? `دبستان دولتی (کلاس ${childAge - 5} ام)`
                          : childAge <= 14 ? "Gymnasium Unterstufe"
                          : "Gymnasium Oberstufe / HTL"}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-stone-50 border border-stone-150 p-5 rounded-3xl space-y-4">
                  <span className="block text-xs font-black text-stone-800">📋 مدارک لازم:</span>
                  <ul className="space-y-2.5 text-[11px] font-bold text-stone-600 leading-relaxed">
                    {["Meldezettel مشترک", "شناسنامه و پاسپورت ترجمه‌شده", "کارت Mutter-Kind-Pass", "کارت e-Card کودک"].map((d, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-red-600">✔</span><span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ============ TRAFFIC FINES TAB ============ */}
          {activeTab === "traffic_fines" && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-150 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-red-950 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>راهنمای اعتراض به جریمه‌های رانندگی اتریش 🚗</span><span>🚗</span>
                </h3>
                <p className="text-xs text-stone-605 font-bold leading-relaxed">
                  مراحل بررسی قانونی برگه جریمه و نگارش اعتراض کتبی به Magistrat.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-stone-200 p-6 rounded-3xl space-y-5">
                  <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm">⚖️ انواع برگه‌های جریمه:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-stone-150 p-4 rounded-2xl bg-stone-50/50 space-y-1.5">
                      <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded">نوع اول</span>
                      <h5 className="font-extrabold text-stone-850 text-xs">Anonymverfügung</h5>
                      <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                        جریمه‌های سبک بدون نقطه منفی. پرداخت در مهلت ۲-۴ هفته پرونده را می‌بندد.
                      </p>
                    </div>
                    <div className="border border-stone-150 p-4 rounded-2xl bg-stone-50/50 space-y-1.5">
                      <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded">نوع دوم</span>
                      <h5 className="font-extrabold text-stone-850 text-xs">Strafverfügung</h5>
                      <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                        تخلف سنگین با حق اعتراض (Einspruch) تا ۲ هفته پس از دریافت.
                      </p>
                    </div>
                  </div>
                  <div className="bg-red-50/50 p-4 border border-red-150 rounded-2xl space-y-2">
                    <h5 className="font-black text-red-950 text-xs">📄 نمونه نامه اعتراض (آلمانی):</h5>
                    <div className="bg-stone-900 text-lime-400 p-4 rounded-2xl font-mono text-[10.5px] text-left whitespace-pre-line select-all" dir="ltr">
{`Sehr geehrte Damen und Herren,

hiermit erhebe ich innerhalb offener Frist das Rechtsmittel des Einspruchs gegen die Strafverfügung mit der Geschäftszahl: [GZ-NUMBER].

Begründung: Die Messdaten des Radars sind fehlerhaft.

Mit freundlichen Grüßen,
[IHR NAME]`}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 bg-stone-50 border border-stone-150 p-5 rounded-3xl space-y-4">
                  <span className="block text-xs font-black text-stone-800">🚗 جدول تعرفه جریمه‌ها:</span>
                  {[
                    { r: "تا ۱۰ km/h اضافه", p: "۳۰-۵۰ €" },
                    { r: "تا ۲۰ km/h اضافه", p: "۶۰-۸۰ €" },
                    { r: "تا ۳۰ km/h اضافه", p: "۱۰۰-۱۵۰ €" },
                    { r: "بیش از ۵۰ km/h", p: "+۲۵۰ € + توقیف" }
                  ].map((f, i) => (
                    <div key={i} className="flex justify-between text-[11px] text-stone-550 font-bold">
                      <span>{f.r}</span><span className="text-red-600 font-extrabold">{f.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ SUCCESS STORIES TAB ============ */}
          {activeTab === "success_stories" && (
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-red-950 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>تالار افتخارات ایرانیان فعال در اتریش ⭐</span><span>⭐</span>
                </h3>
                <p className="text-xs text-stone-605 font-bold leading-relaxed">
                  جامعه ایرانیان مقیم اتریش یکی از تحصیل‌کرده‌ترین ملل خارجی است.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "پروفسور دکتر مجید سمیعی", field: "جراح برجسته بین‌المللی", achieve: "از نام‌آورترین پزشکان معاصر جراحی مغز جهان.", avatar: "🩺" },
                  { name: "دکتر مژگان جمشیدی", field: "دانشمند علوم دارویی گراتس", achieve: "پژوهشگر ارشد زیست‌فناوری نانو داروها.", avatar: "🧪" },
                  { name: "مهندس آرمان رحیمی", field: "موسس هلدینگ فناوری وین", achieve: "بنیانگذار شرکت‌های اینشورتک در وین و لینتس.", avatar: "📐" },
                  { name: "دکتر نیما علوی", field: "معمار پایدار وین", achieve: "طراح برجسته مسکن اجتماعی هوشمند.", avatar: "🏗️" },
                  { name: "دکتر سارا فرهادی", field: "متخصص AI و داده‌های اقتصادی", achieve: "مشاور ارشد ابزارهای مالی هوشمند اتریش.", avatar: "💻" },
                  { name: "مهندس رضا کریمی", field: "مدیر انرژی‌های تجدیدپذیر", achieve: "فعال پیشرو پروژه‌های خورشیدی بورگن‌لاند.", avatar: "☀️" }
                ].map((p, i) => (
                  <motion.article key={i} whileHover={{ y: -4 }}
                    className="bg-stone-50 border border-stone-150 p-5 rounded-2xl space-y-3 hover:border-red-200 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-xl shadow-sm">
                      {p.avatar}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-stone-850 text-xs sm:text-sm">{p.name}</h4>
                      <span className="text-[10px] text-red-600 font-black block">{p.field}</span>
                      <p className="text-[11px] text-stone-500 leading-relaxed font-bold pt-2">{p.achieve}</p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          )}

          {/* ============ CLASSIFIEDS TAB ============ */}
          {activeTab === "classifieds" && (
            <div className="space-y-6">
              <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 md:p-6 space-y-2">
                <h3 className="font-extrabold text-stone-850 text-xs sm:text-sm md:text-base flex items-center justify-end gap-2">
                  <span>دیوار کانون نیازمندی‌های ایرانیان اتریش 🛒</span><span>🛒</span>
                </h3>
                <p className="text-xs text-stone-400 font-bold leading-relaxed">
                  مرجعی امن و رایگان برای همخانگی، خرید/فروش وسایل و کاریابی کوچک.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <form onSubmit={handleCreateClassified} className="lg:col-span-4 bg-stone-50 border border-stone-150 p-5 rounded-3xl space-y-4">
                  <h4 className="font-extrabold text-stone-850 text-xs">✍️ ثبت آگهی جدید:</h4>
                  <div className="space-y-3">
                    <input type="text" required value={newClassifiedTitle} onChange={(e) => setNewClassifiedTitle(e.target.value)}
                      placeholder="عنوان آگهی"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-red-500" />
                    <div className="grid grid-cols-2 gap-2">
                      <select value={newClassifiedCat} onChange={(e) => setNewClassifiedCat(e.target.value)}
                        className="bg-white border border-stone-200 p-2 rounded-xl text-xs font-bold cursor-pointer">
                        <option value="wg">همخانگی مسکن</option>
                        <option value="furniture">وسایل منزل</option>
                        <option value="rideshare">همسفری</option>
                        <option value="job">فرصت‌های شغلی</option>
                      </select>
                      <input type="text" value={newClassifiedPrice} onChange={(e) => setNewClassifiedPrice(e.target.value)}
                        placeholder="قیمت"
                        className="bg-white border border-stone-200 p-2 rounded-xl text-xs font-bold outline-none focus:border-red-500" />
                    </div>
                    <select value={newClassifiedCity} onChange={(e) => setNewClassifiedCity(e.target.value)}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs font-bold cursor-pointer">
                      <option value="vienna">وین (Wien)</option>
                      <option value="graz">گراتس (Graz)</option>
                      <option value="salzburg">سالزبورگ (Salzburg)</option>
                    </select>
                    <textarea required value={newClassifiedDesc} onChange={(e) => setNewClassifiedDesc(e.target.value)}
                      placeholder="توضیحات"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none h-20 font-bold focus:border-red-500" />
                    <input type="text" required value={newClassifiedContact} onChange={(e) => setNewClassifiedContact(e.target.value)}
                      placeholder="اطلاعات تماس"
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs font-bold outline-none focus:border-red-500" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-3 rounded-2xl cursor-pointer">
                    انتشار در دیوار محلی
                  </motion.button>
                </form>
                <div className="lg:col-span-8 space-y-4">
                  <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm">📌 آگهی‌های اخیر:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classifiedsList.map(ad => (
                      <motion.article key={ad.id} whileHover={{ y: -3 }}
                        className="bg-white border border-stone-200 rounded-2xl p-4.5 flex flex-col justify-between hover:border-red-200 transition-all p-5">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center flex-wrap gap-1">
                            <span className="text-[9px] bg-red-50 text-red-700 font-black px-2 py-0.5 rounded">{ad.categoryFarsi}</span>
                            <span className="text-[10px] text-stone-400 font-mono">شهر: {ad.cityFarsi}</span>
                          </div>
                          <h5 className="font-extrabold text-stone-850 text-xs sm:text-sm">{ad.title}</h5>
                          <p className="text-xs text-stone-500 leading-relaxed font-bold">{ad.desc}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-stone-150 flex justify-between items-center text-xs font-bold">
                          <span className="text-red-600 font-black">{ad.price}</span>
                          <span className="text-stone-400 text-[10px] font-black underline bg-stone-50 p-1 px-2 rounded-lg">{ad.contact}</span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-10 pt-6 border-t border-stone-150 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 order-2 md:order-1">
          <AustriaResidentLogo size={34} variant="dark" />
        </div>
        <div className="text-center md:text-right text-[10px] text-stone-400 font-bold order-1 md:order-2 leading-relaxed">
          <p>© ۲۰۲۶ اتریش‌نشین | Austria Resident — تمام حقوق محفوظ است.</p>
          <p className="font-mono text-stone-500 mt-0.5">Made with ❤️ for Iranian expats in Austria</p>
        </div>
        <div className="flex items-center gap-2 order-3">
          {[MessageCircle, PhoneCall, Globe].map((Icon, i) => (
            <span key={i} className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer">
              <Icon className="w-3.5 h-3.5" />
            </span>
          ))}
        </div>
      </footer>
    </main>
  );
}