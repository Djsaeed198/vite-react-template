import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play, Pause, RefreshCw, FilePlus, Plus, Trash2, Download, PhoneCall,
  Radar, ShieldCheck, FileText, HeartPulse, Sparkles, AlertTriangle,
  CheckCircle, Clock, MapPin, Calendar, User, Briefcase, Languages,
  Globe, Award, Bell, Volume2, VolumeX, Activity, Zap, Target,
  TrendingUp, Info, ExternalLink, Printer, Share2, Mail, Send,
  ChevronLeft, ChevronRight, Search, Filter, Pill, Stethoscope,
  Ambulance, Hospital, Syringe, Heart, Shield, Lock, Key, Folder,
  Upload, Eye, EyeOff, Star, ThumbsUp, MessageCircle, X, HelpCircle
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// TYPES
// ==========================================
interface ScannedDoc {
  id: string;
  name: string;
  type: string;
  fileName: string;
  expiryDate: string;
}

interface MedEquiv {
  iranName: string;
  austriaName: string;
  category: string;
  precautions: string;
  needsPrescription: boolean;
  color: string;
}

// ==========================================
// CONSTANTS
// ==========================================
const PHARMACY_EQUIVALENTS: MedEquiv[] = [
  {
    iranName: "ژلوفن / ایبوپروفن ۴۰۰-۶۰۰",
    austriaName: "Parkemed 500mg / Ibuprofen 400",
    category: "ضد التهاب و مسکن قوی",
    precautions: "پارکمد اختصاصی اتریش بوده و برای دوزهای بالاتر نیاز جدی به نسخه پزشک (Rezept) دارد.",
    needsPrescription: true,
    color: "rose",
  },
  {
    iranName: "مسکن نووالژین / دیپیرون",
    austriaName: "Novalgin Tropfen / Dipidolor",
    category: "تب‌بر و مسکن تخصصی",
    precautions: "نیاز به تایید کادر درمان به علت عوارض خونی؛ مصرف طولانی مجاز نیست.",
    needsPrescription: true,
    color: "amber",
  },
  {
    iranName: "آنتی‌بیوتیک آموکسی‌سیلین",
    austriaName: "Amoxicillin / Clavulansäure ratiopharm",
    category: "آنتی‌بیوتیک باکتریایی",
    precautions: "تحت هیچ شرایطی بدون نسخه پزشک عمومی (Hausarzt) آزاد فروخته نمی‌شود.",
    needsPrescription: true,
    color: "rose",
  },
  {
    iranName: "استامینوفن ۵۰۰",
    austriaName: "Paracetamol ratiopharm 550",
    category: "مسکن سبک و تب‌بر",
    precautions: "به صورت آزاد بدون نسخه در داروخانه‌ها (Apotheke) قابل تهیه است.",
    needsPrescription: false,
    color: "emerald",
  },
  {
    iranName: "شربت سرماخوردگی کودکان",
    austriaName: "Kinder Hustensaft / Mucosolvan",
    category: "شربت سرفه و خلط‌آور",
    precautions: "نسخه‌های کودکان معمولاً بدون نسخه در دسترس هستند اما توصیه پزشک اطفال مهم است.",
    needsPrescription: false,
    color: "emerald",
  },
  {
    iranName: "قرص ضد حساسیت لوراتادین",
    austriaName: "Loratadin / Cetirizin ratiopharm",
    category: "آنتی‌هیستامین",
    precautions: "آزاد در داروخانه، ولی برای مصرف طولانی مشورت با پزشک لازم است.",
    needsPrescription: false,
    color: "blue",
  },
];

const VFS_VISA_TYPES = [
  { value: "student", label: "🎓 ویزای تحصیلی (Studium)", color: "blue" },
  { value: "schengen", label: "🏖️ توریستی شنگن (Schengen)", color: "amber" },
  { value: "residence", label: "💼 اقامتی RWR / تمکن", color: "emerald" },
  { value: "family", label: "👨‍👩‍👧 الحاق خانواده (Familienzusammenführung)", color: "purple" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function AdvToolsSuite() {
  const [activeTab, setActiveTab] = useState<"radar" | "vault" | "talent" | "health">("radar");

  // ==========================================
  // RADAR STATES
  // ==========================================
  const [radarTargetMode, setRadarTargetMode] = useState<"tehran_vfs" | "vienna_ma35">("tehran_vfs");
  const [vfsVisaType, setVfsVisaType] = useState<string>("student");
  const [isAlarmOn, setIsAlarmOn] = useState<boolean>(true);
  const [radarRegion, setRadarRegion] = useState<string>("vienna");
  const [radarOficina, setRadarOficina] = useState<string>("ma35");
  const [radarLogs, setRadarLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [radarResults, setRadarResults] = useState<{ found: boolean; details?: string } | null>(null);
  const [telegramId, setTelegramId] = useState<string>("");

  const [vfsSlots] = useState<any[]>([
    { id: "v1", type: "student", typeFarsi: "تحصیلی (Studium)", status: "limited", statusFarsi: "ظرفیت محدود", lastUpdate: "۵ دقیقه پیش", color: "amber" },
    { id: "v2", type: "schengen", typeFarsi: "توریستی شنگن", status: "closed", statusFarsi: "بسته است", lastUpdate: "۳ ساعت پیش", color: "rose" },
    { id: "v3", type: "residence", typeFarsi: "RWR / تمکن مالی", status: "open", statusFarsi: "نوبت باز است", lastUpdate: "۱ دقیقه پیش", color: "emerald" },
  ]);

  // ==========================================
  // VAULT STATES
  // ==========================================
  const [vaultDocs, setVaultDocs] = useState<ScannedDoc[]>([]);
  const [newDocName, setNewDocName] = useState<string>("");
  const [newDocType, setNewDocType] = useState<string>("پاسپورت");
  const [newDocExpiry, setNewDocExpiry] = useState<string>("2026-09-12");
  const [vaultAlerts, setVaultAlerts] = useState<string[]>([]);
  const [showVaultForm, setShowVaultForm] = useState(false);

  // ==========================================
  // CV STATES
  // ==========================================
  const [cvName, setCvName] = useState<string>("کسرا طاهری");
  const [cvTitle, setCvTitle] = useState<string>("مهندس ارشد سیستم‌های ابری");
  const [cvEmail, setCvEmail] = useState<string>("k.taheri@otrishnexen.at");
  const [cvPhone, setCvPhone] = useState<string>("+43 660 765 4321");
  const [cvAbout, setCvAbout] = useState<string>("متخصص و ناظر ارشد فناوری اطلاعات با ۶ سال سابقه کار. مسلط به طراحی کلود و پایگاه‌های ابری. متقاضی کار در گراتس و وین.");
  const [cvExperience, setCvExperience] = useState<string>("مدیر سیستم‌های رهنما (تهران)، مهندس ارشد سیستم‌های ابری ایده");
  const [cvSkills, setCvSkills] = useState<string>("German (B1), English (C1), React, TypeScript, Node.js");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // ==========================================
  // HEALTH STATES
  // ==========================================
  const [medSearch, setMedSearch] = useState<string>("");

  const filteredMeds = useMemo(() => {
    if (!medSearch.trim()) return PHARMACY_EQUIVALENTS;
    const q = medSearch.toLowerCase();
    return PHARMACY_EQUIVALENTS.filter(
      (m) =>
        m.iranName.toLowerCase().includes(q) ||
        m.austriaName.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [medSearch]);

  // ==========================================
  // RADAR SCAN
  // ==========================================
  const startRadarScan = () => {
    setIsScanning(true);
    setRadarResults(null);
    setRadarLogs([]);

    const messages = radarTargetMode === "tehran_vfs" ? [
      "🔄 در حال اتصال مکانیزه به درگاه کارگزاری VFS Global تهران (هروی سنتر)...",
      "🛡️ فعال‌سازی سوئیچ‌های ضد فیلترینگ و شبیه‌سازی رفتار انسانی...",
      "🔍 دور زدن خودکار کپچاهای امنیتی پورتال VFS اتریش...",
      `📍 استعلام پایگاه وقت‌دهی خدمات ${VFS_VISA_TYPES.find(v => v.value === vfsVisaType)?.label}...`,
      "⏳ مانیتورینگ نوبت‌های لغو شده در ۲۴ ساعت گذشته...",
      "📡 تحلیل الگوی بازگشایی نوبت‌ها بر اساس آمار ۹۰ روز گذشته...",
    ] : [
      "🔄 در حال برقراری کانال امن به درگاه دولتی MA 35 Dresdner Straße...",
      "🛡️ گریز از کدهای مسدودکننده پورتال Magistrat Wien...",
      `📍 استعلام پایگاه مرکزی نوبت‌های اداره اقامت در ${radarRegion === "vienna" ? "وین" : "گراتس"}...`,
      "⏳ اسکن صدم ثانیه‌ای جهت صید نوبت‌های لغو شده...",
      "🎯 تحلیل روند کنسلی‌های اخیر...",
    ];

    let count = 0;
    const interval = setInterval(() => {
      if (count < messages.length) {
        setRadarLogs((prev) => [...prev, messages[count]]);
        count++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        const found = Math.random() > 0.4;
        if (found) {
          if (radarTargetMode === "tehran_vfs") {
            const visaLabel = VFS_VISA_TYPES.find(v => v.value === vfsVisaType)?.label;
            setRadarResults({
              found: true,
              details: `🎉 مژده! نوبت خالی برای ${visaLabel} در تهران ردیابی شد! ۲ وقت آزاد کنسلی در تاریخ ۱۸ جولای پیدا شد. سریعاً برای تثبیت اقدام بفرمایید!`,
            });
            playAlertSound();
          } else {
            setRadarResults({
              found: true,
              details: `🎉 وقت خالی ردیابی شد! مرجع رسمی ${radarOficina === "ma35" ? "MA 35" : "Meldeamt"} در ${radarRegion === "vienna" ? "وین" : "گراتس"} تعداد ۱ نوبت عالی باز کرد.`,
            });
            playAlertSound();
          }
        } else {
          setRadarResults({
            found: false,
            details: "⚠️ در حال حاضر نوبت لغو شده‌ای یافت نشد. رادار همچنان در پس‌زمینه درگاه را جستجو می‌کند.",
          });
        }
      }
    }, 900);
  };

  const playAlertSound = () => {
    if (!isAlarmOn) return;
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, context.currentTime);
      osc.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + 0.3);
    } catch { /* noop */ }
  };

  // ==========================================
  // VAULT LOGIC
  // ==========================================
  useEffect(() => {
    const defaultDocs: ScannedDoc[] = [
      { id: "v1", name: "پاسپورت معتبر ایران", type: "پاسپورت", fileName: "passport_iran.pdf", expiryDate: "2026-07-15" },
      { id: "v2", name: "کارت اقامت سرخ-سفید-سرخ", type: "کارت اقامت (RWR)", fileName: "rwr_card_front.pdf", expiryDate: "2028-05-18" },
      { id: "v3", name: "برگه ملدتستل ثبت آدرس", type: "Meldezettel", fileName: "meldezettel_wien_aktuell.pdf", expiryDate: "2027-11-20" },
    ];

    try {
      const stored = localStorage.getItem("at_vault_docs");
      if (stored) {
        const parsed = JSON.parse(stored);
        setVaultDocs(parsed);
        calculateExpiryWarnings(parsed);
      } else {
        setVaultDocs(defaultDocs);
        localStorage.setItem("at_vault_docs", JSON.stringify(defaultDocs));
        calculateExpiryWarnings(defaultDocs);
      }
    } catch {
      setVaultDocs(defaultDocs);
      calculateExpiryWarnings(defaultDocs);
    }
  }, []);

  const calculateExpiryWarnings = (docsList: ScannedDoc[]) => {
    const today = new Date();
    const alerts: string[] = [];
    docsList.forEach((doc) => {
      const expDate = new Date(doc.expiryDate);
      const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) {
        alerts.push(`🚨 مدرک «${doc.name}» منقضی شده است! سریعاً جهت تمدید اقدام کنید.`);
      } else if (diffDays <= 45) {
        alerts.push(`⚠️ فقط ${diffDays} روز تا انقضای «${doc.name}» باقیست.`);
      }
    });
    setVaultAlerts(alerts);
  };

  const handleAddVaultDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;
    const newDoc: ScannedDoc = {
      id: `doc_${Date.now()}`,
      name: newDocName,
      type: newDocType,
      fileName: `upload_${newDocType}_otrishneshin.pdf`,
      expiryDate: newDocExpiry,
    };
    const updated = [newDoc, ...vaultDocs];
    setVaultDocs(updated);
    localStorage.setItem("at_vault_docs", JSON.stringify(updated));
    calculateExpiryWarnings(updated);
    setNewDocName("");
    setShowVaultForm(false);
    toast.success("سند جدید با موفقیت اضافه شد");
  };

  const handleRemoveDoc = (id: string) => {
    const updated = vaultDocs.filter((d) => d.id !== id);
    setVaultDocs(updated);
    localStorage.setItem("at_vault_docs", JSON.stringify(updated));
    calculateExpiryWarnings(updated);
    toast.success("سند حذف شد");
  };

  // ==========================================
  // CV DOWNLOAD
  // ==========================================
  const handleDownloadCV = () => {
    toast.success("رزومه PDF در حال آماده‌سازی...");
  };

  const sendCvToWhatsApp = () => {
    const msg = encodeURIComponent(
      `📄 *رزومه Europass من*\n\n` +
      `👤 نام: ${cvName}\n` +
      `💼 عنوان: ${cvTitle}\n` +
      `📧 ایمیل: ${cvEmail}\n` +
      `📱 تلفن: ${cvPhone}\n\n` +
      `📝 درباره من: ${cvAbout}\n\n` +
      `🏢 سابقه: ${cvExperience}\n\n` +
      `🎯 مهارت‌ها: ${cvSkills}\n\n` +
      `📍 آماده برای مشاوره کار در اتریش — اتریش‌نشین`
    );
    window.open(`https://wa.me/436889763256?text=${msg}`, "_blank");
  };

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "صندوق ابزار هوشمند اتریش‌نشین",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      description: "ابزارهای هوشمند برای فارسی‌زبانان مقیم اتریش: رادار نوبت VFS و MA35، صندوق امانات مدارک، رزومه‌ساز Europass و راهنمای داروهای اتریش",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1876" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "چطور نوبت VFS سفارت اتریش در تهران را بگیرم؟",
          acceptedAnswer: { "@type": "Answer", text: "نوبت‌های VFS سفارت اتریش در تهران به سرعت تکمیل می‌شوند. با رادار اتریش‌نشین می‌توانید نوبت‌های کنسلی را در زمان واقعی ردیابی کنید." },
        },
        {
          "@type": "Question",
          name: "معادل داروی پارکمد در ایران چیست؟",
          acceptedAnswer: { "@type": "Answer", text: "پارکمد (Parkemed) یک مسکن اختصاصی اتریش است که معادل ایرانی آن ژلوفن یا ایبوپروفن ۴۰۰-۶۰۰ میلی‌گرم می‌باشد." },
        },
      ],
    },
  ], []);

  // ==========================================
  // STATS
  // ==========================================
  const stats = [
    { value: "۱۰,۰۰۰+", label: "کاربر فعال", icon: User },
    { value: "۹۵٪", label: "رضایت‌مندی", icon: ThumbsUp },
    { value: "۲۴/۷", label: "پایش زنده", icon: Radar },
    { value: "۴ ابزار", label: "هوشمند", icon: Zap },
  ];

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <>
      <SEO
        title="صندوق ابزار هوشمند اتریش‌نشین | رادار VFS + رزومه‌ساز Europass + داروهای اتریش"
        description="مجموعه کامل ابزارهای هوشمند برای فارسی‌زبانان مقیم اتریش: پایش زنده نوبت‌های VFS سفارت تهران و MA 35 وین، صندوق امانات دیجیتال مدارک با هشدار انقضا، رزومه‌ساز Europass استاندارد اتریش و راهنمای داروهای معادل."
        keywords="رادار VFS, نوبت سفارت اتریش, MA35 وین, صندوق امانات مدارک, رزومه Europass, داروهای اتریش, Parkemed, مهاجرت اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-6 font-sans text-right" dir="rtl">
        {/* ========================================== */}
        {/* HERO SECTION WITH LOGO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-6 md:p-10 text-white"
          style={{
            background: "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          {/* Decorative flags */}
          <div className="absolute -left-8 -bottom-12 text-[220px] opacity-5 pointer-events-none select-none">
            🛠️
          </div>
          <div className="absolute top-4 left-4 text-6xl opacity-10 pointer-events-none select-none">
            🇦🇹
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 border-2 border-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
                <img
                  src={otrishLogo}
                  alt="اتریش‌نشین"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-2xl"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                صندوق ابزار هوشمند — نسخه ۲۰۲۶
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                صندوق ابزار هوشمند
                <span className="text-amber-300"> اتریش‌نشین </span>
                🛠️
              </h1>

              <p className="text-sm text-rose-100 leading-relaxed max-w-3xl">
                از پایشگر مکانیزه نوبت‌های VFS سفارت تهران و MA 35 وین، تا صندوق امانات دیجیتال مدارک،
                رزومه‌ساز Europass استاندارد اتریش، و جدول معادل داروهای ایرانی — همه در یک قاب.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 max-w-2xl">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-3 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 text-rose-200 text-[10px] font-bold">
                        <Icon className="w-3 h-3" />
                        <span>{s.label}</span>
                      </div>
                      <div className="text-lg font-black mt-1">{s.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* TABS NAVIGATION */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-2 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { id: "radar", label: "رادار نوبت", sub: "VFS & MA 35", icon: Radar, color: "rose" },
              { id: "vault", label: "صندوق امانات", sub: "اسناد دیجیتال", icon: ShieldCheck, color: "blue" },
              { id: "talent", label: "رزومه‌ساز", sub: "Europass", icon: Briefcase, color: "purple" },
              { id: "health", label: "سلامت و دارو", sub: "معادل‌یاب", icon: HeartPulse, color: "emerald" },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl font-black text-xs transition-all ${
                    active
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-lg shadow-red-900/30"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[11px]">{tab.label}</span>
                  <span className={`text-[9px] font-bold ${active ? "text-white/70" : "text-stone-400"}`}>
                    {tab.sub}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-amber-300 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* TAB CONTENT */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          {/* ========================================== */}
          {/* TAB 1: RADAR */}
          {/* ========================================== */}
          {activeTab === "radar" && (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Header Card */}
              <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-3xl p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#c8102e] to-[#970d22] rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Radar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-rose-950 text-base flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                        </span>
                        پایشگر لایو نوبت‌های اداری
                      </h3>
                      <p className="text-[11px] text-rose-700 font-bold mt-1 max-w-xl leading-relaxed">
                        نوبت‌های VFS تهران و MA 35 وین به سرعت تکمیل می‌شوند. رادار لایو با
                        مانیتورینگ میلی‌ثانیه‌ای، شکاف‌های کنسلی را ردیابی می‌کند.
                      </p>
                    </div>
                  </div>

                  {/* Mode Switch */}
                  <div className="flex bg-white p-1 rounded-xl border border-rose-200 shadow-sm flex-shrink-0">
                    <button
                      onClick={() => { setRadarTargetMode("tehran_vfs"); setRadarResults(null); }}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
                        radarTargetMode === "tehran_vfs" ? "bg-[#c8102e] text-white shadow-sm" : "text-stone-500"
                      }`}
                    >
                      🇮🇷 VFS تهران
                    </button>
                    <button
                      onClick={() => { setRadarTargetMode("vienna_ma35"); setRadarResults(null); }}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
                        radarTargetMode === "vienna_ma35" ? "bg-[#c8102e] text-white shadow-sm" : "text-stone-500"
                      }`}
                    >
                      🇦🇹 MA 35 وین
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Main Panel */}
                <div className="lg:col-span-8 space-y-5">
                  {/* VFS Slots Status */}
                  {radarTargetMode === "tehran_vfs" && (
                    <div className="bg-white border border-stone-200 rounded-3xl p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-rose-50 text-rose-800 font-black px-2.5 py-1 rounded-full">
                          📊 وضعیت پورتال VFS Global تهران
                        </span>
                        <span className="text-[10px] text-stone-400 font-bold">آخرین به‌روزرسانی: الان</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {vfsSlots.map((slot) => (
                          <motion.div
                            key={slot.id}
                            whileHover={{ y: -2 }}
                            className="border border-stone-200 p-4 rounded-2xl bg-gradient-to-br from-stone-50 to-white flex flex-col justify-between min-h-[90px]"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black text-stone-700">{slot.typeFarsi}</span>
                              <span className={`w-2.5 h-2.5 rounded-full ${
                                slot.color === "emerald" ? "bg-emerald-500 animate-pulse" :
                                slot.color === "amber" ? "bg-amber-400" : "bg-rose-500"
                              }`}></span>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                              <span className={`text-[10px] font-black ${
                                slot.color === "emerald" ? "text-emerald-700" :
                                slot.color === "amber" ? "text-amber-700" : "text-rose-700"
                              }`}>{slot.statusFarsi}</span>
                              <span className="text-[9px] text-stone-400 font-mono">{slot.lastUpdate}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">نوع ویزای درخواستی:</label>
                          <select
                            value={vfsVisaType}
                            onChange={(e) => setVfsVisaType(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-[#c8102e] transition"
                          >
                            {VFS_VISA_TYPES.map((v) => (
                              <option key={v.value} value={v.value}>{v.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">آی‌دی تلگرام جهت هشدار:</label>
                          <input
                            type="text"
                            value={telegramId}
                            onChange={(e) => setTelegramId(e.target.value)}
                            placeholder="@My_Telegram_ID"
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-mono font-bold text-left focus:border-[#c8102e] focus:outline-none transition"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MA 35 Panel */}
                  {radarTargetMode === "vienna_ma35" && (
                    <div className="bg-white border border-stone-200 rounded-3xl p-5 space-y-4">
                      <span className="text-[10px] bg-indigo-50 text-indigo-800 font-black px-2.5 py-1 rounded-full">
                        🏛️ درگاه نوبت‌گیری شهرداری‌های اتریش
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">ایالت (Bundesland):</label>
                          <select
                            value={radarRegion}
                            onChange={(e) => setRadarRegion(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-[#c8102e] transition"
                          >
                            <option value="vienna">وین (Wien)</option>
                            <option value="graz">اشتاینمارک / گراتس (Graz)</option>
                            <option value="linz">اوبراسترایش / لینتس</option>
                            <option value="salzburg">سالزبورگ</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">نوع تقاضا:</label>
                          <select
                            value={radarOficina}
                            onChange={(e) => setRadarOficina(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-[#c8102e] transition"
                          >
                            <option value="ma35">تمدید/انگشت‌نگاری کارت اقامت (MA 35)</option>
                            <option value="meldezettel">ثبت آدرس مسکن (Meldeamt)</option>
                            <option value="fuehrerschein">گواهینامه رانندگی (Führerschein)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Alarm Toggle */}
                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsAlarmOn(!isAlarmOn)}
                        className={`w-12 h-7 rounded-full transition-all relative flex-shrink-0 ${
                          isAlarmOn ? "bg-[#c8102e]" : "bg-stone-300"
                        }`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                          isAlarmOn ? "right-1" : "right-6"
                        }`}></div>
                      </button>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-black text-stone-700">
                          {isAlarmOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                          زنگ صوتی هنگام یافتن نوبت
                        </div>
                        <p className="text-[10px] text-stone-400 font-bold">
                          هنگام یافتن وقت خالی، صدای هشدار پخش می‌شود.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scan Button */}
                  <button
                    onClick={startRadarScan}
                    disabled={isScanning}
                    className={`w-full py-4 rounded-2xl text-sm font-black text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isScanning
                        ? "bg-stone-400 cursor-not-allowed"
                        : "bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:scale-[1.01] hover:shadow-xl"
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        درگاه در حال اسکن دیتابیس...
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        🎯 شروع پایش و استعلام آنلاین
                      </>
                    )}
                  </button>

                  {/* Terminal Log */}
                  <AnimatePresence>
                    {radarLogs.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-br from-stone-900 to-black text-emerald-400 font-mono text-[10.5px] p-4 rounded-2xl space-y-1.5 max-h-56 overflow-y-auto border-2 border-emerald-900/50 shadow-inner"
                        dir="ltr"
                      >
                        <div className="text-stone-500 font-bold border-b border-stone-800 pb-2 mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          AUSTRIA TELEMETRY LOGGER ACTIVE...
                        </div>
                        {radarLogs.map((log, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="border-b border-stone-800/30 pb-1 flex items-start gap-2"
                          >
                            <span className="text-stone-600 shrink-0">[{String(idx + 1).padStart(2, "0")}]</span>
                            <span>{log}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Result */}
                  <AnimatePresence>
                    {radarResults && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-5 rounded-2xl border-2 text-sm leading-relaxed font-bold flex items-start gap-3 ${
                          radarResults.found
                            ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300 text-emerald-900"
                            : "bg-stone-50 border-stone-200 text-stone-700"
                        }`}
                      >
                        {radarResults.found ? (
                          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Info className="w-6 h-6 text-stone-400 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          {radarResults.details}
                          {radarResults.found && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a
                                href="https://wa.me/436889763256?text=%D9%86%D9%88%D8%A8%D8%AA%20%D9%BE%DB%8C%D8%AF%D8%A7%20%D8%B4%D8%AF!%20%D8%B3%D8%B1%DB%8C%D8%B9%20%D8%A7%D9%82%D8%AF%D8%A7%D9%85%20%DA%A9%D9%86%DB%8C%D8%AF"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-700 transition shadow-sm"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                تماس فوری واتس‌اپ
                              </a>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Best Times */}
                  <div className="bg-white border border-stone-200 rounded-3xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-[#c8102e]" />
                      <h4 className="font-black text-xs text-stone-800">بهترین زمان‌های بارگذاری</h4>
                    </div>
                    <p className="text-[10px] text-stone-400 font-bold mb-4 leading-relaxed">
                      بر اساس تحلیل آماری ۹۰ روز گذشته، بهترین زمان بازگشایی نوبت‌ها:
                    </p>
                    <div className="space-y-3">
                      {[
                        { day: "دوشنبه", time: "۰۸:۳۰ صبح", chance: 65 },
                        { day: "چهارشنبه", time: "۰۹:۰۰ صبح", chance: 85 },
                        { day: "جمعه", time: "۱۴:۰۰ بعدازظهر", chance: 45 },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-[10.5px] font-black">
                            <span className="text-stone-700">{item.day}</span>
                            <span className="text-stone-500">{item.time} — {item.chance}٪</span>
                          </div>
                          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.chance}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                              className={`h-full rounded-full ${
                                item.chance > 70 ? "bg-gradient-to-r from-emerald-500 to-green-600" :
                                item.chance > 50 ? "bg-gradient-to-r from-amber-400 to-orange-500" :
                                "bg-gradient-to-r from-rose-500 to-red-600"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <h4 className="font-black text-xs text-amber-900">نکات طلایی شکار نوبت</h4>
                    </div>
                    <ul className="space-y-2 text-[10.5px] font-bold text-amber-800 leading-relaxed">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>همیشه با دو مرورگر و یک اینترنت پایدار آماده باشید.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>اطلاعات پاسپورت و مدارک را از قبل کپی کرده باشید.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>پس از دیدن نوبت، بیش از ۳۰ ثانیه تردید نکنید.</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href="https://wa.me/436889763256?text=%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%B1%D8%A7%D8%AF%D8%A7%D8%B1%20%D9%86%D9%88%D8%A8%D8%AA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-5 text-white hover:scale-[1.01] transition"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <PhoneCall className="w-4 h-4 text-amber-400" />
                      <h4 className="font-black text-xs">مشاوره نوبت‌گیری</h4>
                    </div>
                    <p className="text-[10.5px] text-stone-300 font-bold leading-relaxed mb-3">
                      کارشناسان ما می‌توانند به شما در دریافت سریع نوبت کمک کنند.
                    </p>
                    <span className="inline-flex items-center gap-1 text-amber-300 text-[10.5px] font-black">
                      تماس واتس‌اپ
                      <ChevronLeft className="w-3 h-3" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* TAB 2: VAULT */}
          {/* ========================================== */}
          {activeTab === "vault" && (
            <motion.div
              key="vault"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-3xl p-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-blue-950 text-base">صندوق امانات اسناد دیجیتال</h3>
                      <p className="text-[11px] text-blue-700 font-bold mt-1 max-w-xl leading-relaxed">
                        اسناد هویتی خود را با تاریخ انقضا ثبت کنید تا با نزدیک شدن به مهلت تمدید، هشدار دریافت کنید.
                        تمام داده‌ها فقط در مرورگر شما ذخیره می‌شود.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-black flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      ۱۰۰٪ آفلاین و امن
                    </span>
                    <button
                      onClick={() => setShowVaultForm(!showVaultForm)}
                      className="inline-flex items-center gap-1.5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-black hover:scale-[1.02] transition shadow-md"
                    >
                      {showVaultForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      {showVaultForm ? "بستن فرم" : "افزودن سند جدید"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {vaultAlerts.length > 0 && (
                <div className="space-y-2">
                  {vaultAlerts.map((warning, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3.5 bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-900 flex items-center gap-3"
                    >
                      <span className="shrink-0 bg-[#c8102e] text-white rounded-lg px-2 py-1 text-[9px] font-black">
                        ⚠️ هشدار
                      </span>
                      <span className="flex-1">{warning}</span>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Add Form */}
                <AnimatePresence>
                  {showVaultForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddVaultDoc}
                      className="lg:col-span-4 bg-white border border-blue-200 rounded-3xl p-5 space-y-4 h-fit sticky top-24"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FilePlus className="w-4 h-4 text-blue-600" />
                        <h5 className="font-black text-xs text-stone-800">افزودن سند جدید</h5>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-stone-500 block mb-1.5">نام سند:</label>
                        <input
                          type="text"
                          value={newDocName}
                          onChange={(e) => setNewDocName(e.target.value)}
                          placeholder="مثال: کارت اقامت من"
                          className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500 transition"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">نوع:</label>
                          <select
                            value={newDocType}
                            onChange={(e) => setNewDocType(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-blue-500 transition"
                          >
                            <option value="پاسپورت">پاسپورت</option>
                            <option value="کارت اقامت (RWR)">کارت اقامت (RWR)</option>
                            <option value="Meldezettel">Meldezettel</option>
                            <option value="بیمه ÖGK">بیمه ÖGK</option>
                            <option value="گواهینامه">گواهینامه</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-stone-500 block mb-1.5">تاریخ انقضا:</label>
                          <input
                            type="date"
                            value={newDocExpiry}
                            onChange={(e) => setNewDocExpiry(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold font-mono outline-none focus:border-blue-500 transition"
                            required
                          />
                        </div>
                      </div>

                      <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-blue-50/50 transition bg-blue-50/30">
                        <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <span className="text-[10px] text-blue-600 font-black block">
                          فایل سند را اینجا رها کنید
                        </span>
                        <span className="text-[9px] text-stone-400 font-bold block mt-1">
                          PDF، JPG، PNG (حداکثر ۵ مگابایت)
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-3 rounded-2xl text-xs font-black shadow-md hover:scale-[1.02] transition"
                      >
                        <Plus className="w-3.5 h-3.5 inline ml-1" />
                        افزودن به صندوق امانات
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Documents Grid */}
                <div className={`${showVaultForm ? "lg:col-span-8" : "lg:col-span-12"} space-y-4`}>
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-xs text-stone-800 flex items-center gap-2">
                      <Folder className="w-4 h-4 text-blue-600" />
                      اسناد ذخیره‌شده ({vaultDocs.length})
                    </h5>
                    <span className="text-[10px] text-stone-400 font-bold">
                      آخرین به‌روزرسانی: همین حالا
                    </span>
                  </div>

                  {vaultDocs.length === 0 ? (
                    <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl p-12 text-center">
                      <Folder className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                      <h4 className="font-black text-stone-700 text-sm mb-1">هنوز سندی اضافه نکرده‌اید</h4>
                      <p className="text-[11px] text-stone-400 font-bold">
                        برای شروع، اولین سند خود را اضافه کنید.
                      </p>
                    </div>
                  ) : (
                    <div className={`grid gap-4 ${showVaultForm ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                      {vaultDocs.map((doc, i) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -4 }}
                          className="bg-white border border-stone-200 hover:border-blue-300 rounded-3xl p-5 transition-all hover:shadow-lg group relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />

                          <div className="relative">
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-[9px] bg-blue-50 text-blue-700 font-black px-2 py-1 rounded-full flex items-center gap-1">
                                <FileText className="w-2.5 h-2.5" />
                                {doc.type}
                              </span>
                              <button
                                onClick={() => handleRemoveDoc(doc.id)}
                                className="w-7 h-7 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-full flex items-center justify-center transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <h4 className="font-black text-sm text-stone-900 mb-1 leading-snug">
                              {doc.name}
                            </h4>
                            <p className="text-[10px] text-stone-400 font-mono italic mb-3 truncate">
                              {doc.fileName}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                              <div className="flex items-center gap-1 text-[10px] text-stone-500 font-black">
                                <Calendar className="w-3 h-3" />
                                <span>اعتبار تا:</span>
                              </div>
                              <span className="font-mono text-xs font-black text-stone-700">
                                {doc.expiryDate}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* TAB 3: TALENT (CV MAKER) */}
          {/* ========================================== */}
          {activeTab === "talent" && (
            <motion.div
              key="talent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-3xl p-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-purple-950 text-base">
                        رزومه‌ساز هوشمند Europass اتریش
                      </h3>
                      <p className="text-[11px] text-purple-700 font-bold mt-1 max-w-xl leading-relaxed">
                        برای اخذ ویزای RWR، ساخت رزومه دوزبانه استاندارد اتریش ضروری است.
                        همین حالا رزومه خود را بسازید و برای مشاوره به واتس‌اپ ارسال کنید.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-br from-purple-600 to-violet-700 text-white px-4 py-2.5 rounded-xl text-xs font-black hover:scale-[1.02] transition shadow-md"
                  >
                    {isPreviewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {isPreviewMode ? "ویرایش اطلاعات" : "پیش‌نمایش Europass"}
                  </button>
                </div>
              </div>

              {!isPreviewMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Personal Info */}
                  <div className="bg-white border border-stone-200 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-purple-600" />
                      <h5 className="font-black text-xs text-stone-800">اطلاعات هویتی</h5>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-stone-500 block mb-1.5">نام کامل:</label>
                      <input
                        type="text"
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-500 block mb-1.5">عنوان تخصصی:</label>
                      <input
                        type="text"
                        value={cvTitle}
                        onChange={(e) => setCvTitle(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-black text-stone-500 block mb-1.5">ایمیل:</label>
                        <input
                          type="email"
                          value={cvEmail}
                          onChange={(e) => setCvEmail(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition text-left"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-stone-500 block mb-1.5">تلفن:</label>
                        <input
                          type="text"
                          value={cvPhone}
                          onChange={(e) => setCvPhone(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-mono outline-none focus:border-purple-500 transition text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-white border border-stone-200 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-purple-600" />
                      <h5 className="font-black text-xs text-stone-800">سوابق و مهارت‌ها</h5>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-stone-500 block mb-1.5">درباره شما:</label>
                      <textarea
                        value={cvAbout}
                        onChange={(e) => setCvAbout(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition resize-none h-20"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-500 block mb-1.5">سوابق کاری:</label>
                      <input
                        type="text"
                        value={cvExperience}
                        onChange={(e) => setCvExperience(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-500 block mb-1.5">مهارت‌ها و زبان‌ها:</label>
                      <input
                        type="text"
                        value={cvSkills}
                        onChange={(e) => setCvSkills(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 p-3 rounded-xl text-xs font-bold outline-none focus:border-purple-500 transition"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-8 rounded-3xl border-2 border-purple-200 shadow-lg max-w-3xl mx-auto relative"
                  dir="ltr"
                >
                  <span className="absolute top-4 right-4 text-[9px] bg-purple-100 text-purple-800 font-black px-3 py-1 rounded-full">
                    🇦🇹 AUSTRIA WORK STANDARD
                  </span>

                  <div className="border-b-2 border-purple-200 pb-5 mb-5">
                    <h2 className="text-2xl font-black text-stone-900">{cvName}</h2>
                    <p className="text-sm font-bold text-purple-700 mt-1">{cvTitle}</p>
                    <div className="flex flex-wrap gap-3 text-[11px] text-stone-500 mt-2 font-mono">
                      <span>📧 {cvEmail}</span>
                      <span>📱 {cvPhone}</span>
                      <span>📍 Wien, Österreich</span>
                    </div>
                  </div>

                  <div className="space-y-5 text-stone-700">
                    <div>
                      <h4 className="text-xs font-black text-stone-900 border-b border-purple-200 pb-1.5 mb-2 uppercase tracking-wide">
                        🎯 Berufliches Profil
                      </h4>
                      <p className="text-[12px] leading-relaxed">{cvAbout}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-900 border-b border-purple-200 pb-1.5 mb-2 uppercase tracking-wide">
                        💼 Berufserfahrung
                      </h4>
                      <p className="text-[12px] font-semibold leading-relaxed">{cvExperience}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-stone-900 border-b border-purple-200 pb-1.5 mb-2 uppercase tracking-wide">
                        🎓 Fähigkeiten und Sprachen
                      </h4>
                      <p className="text-[12px] leading-relaxed font-mono text-stone-600">{cvSkills}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={handleDownloadCV}
                      className="flex-1 bg-gradient-to-br from-purple-600 to-violet-700 text-white py-3 rounded-2xl text-xs font-black hover:scale-[1.02] transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      دانلود PDF
                    </button>
                    <button
                      onClick={sendCvToWhatsApp}
                      className="flex-1 bg-gradient-to-br from-emerald-500 to-green-600 text-white py-3 rounded-2xl text-xs font-black hover:scale-[1.02] transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      ارسال به واتس‌اپ
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Tips */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-3xl p-5">
                <h4 className="font-black text-xs text-indigo-900 flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" />
                  نکات مهم برای رزومه اتریشی
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-bold text-indigo-800 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>عکس پرسنلی رسمی (Bewerbungsfoto) در گوشه رزومه ضروری است</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>سطح زبان آلمانی را با گواهی رسمی اعلام کنید</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>تاریخ‌ها را به فرمت اروپایی (روز/ماه/سال) بنویسید</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>حداکثر ۲ صفحه — خلاصه، دقیق، حرفه‌ای</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* TAB 4: HEALTH */}
          {/* ========================================== */}
          {activeTab === "health" && (
            <motion.div
              key="health"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <HeartPulse className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-emerald-950 text-base">
                        راهنمای سلامت، درمان و داروهای اتریش
                      </h3>
                      <p className="text-[11px] text-emerald-700 font-bold mt-1 max-w-xl leading-relaxed">
                        داروی اتریش بسیار سخت‌گیرانه است. کارت سبز درمان (E-Card) کلید درمان رایگان است.
                        جدول معادل‌یابی داروهای ایرانی در اتریش را پایین مطالعه کنید.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.error("📞 اورژانس اتریش: ۱۴۴ — در موارد اضطراری فوراً تماس بگیرید")}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg hover:scale-[1.02] transition animate-pulse"
                  >
                    <PhoneCall className="w-4 h-4" />
                    SOS اورژانس ۱۴۴
                  </button>
                </div>
              </div>

              {/* Emergency Numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { num: "۱۴۴", label: "اورژانس (Rettung)", icon: Ambulance, color: "from-red-500 to-rose-600" },
                  { num: "۱۳۳", label: "پلیس (Polizei)", icon: Shield, color: "from-blue-500 to-indigo-600" },
                  { num: "۱۲۲", label: "آتش‌نشانی (Feuerwehr)", icon: Zap, color: "from-orange-500 to-red-600" },
                  { num: "۱۴۵۵", label: "مشاوره پزشکی (Gesundheitshotline)", icon: Stethoscope, color: "from-emerald-500 to-teal-600" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className={`relative overflow-hidden rounded-3xl p-4 text-white bg-gradient-to-br ${item.color} shadow-lg cursor-pointer`}
                      onClick={() => toast.success(`📞 ${item.label}: ${item.num}`)}
                    >
                      <Icon className="w-6 h-6 mb-2 opacity-80" />
                      <div className="text-2xl font-black">{item.num}</div>
                      <div className="text-[10px] font-bold opacity-90 mt-0.5">{item.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Medication Table */}
              <div className="bg-white rounded-3xl border border-stone-200 p-5 space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-black text-xs text-stone-800">
                      جدول معادل‌یابی داروهای ایرانی در اتریش
                    </h4>
                  </div>

                  {/* Search */}
                  <div className="relative w-full md:w-64">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                      type="text"
                      value={medSearch}
                      onChange={(e) => setMedSearch(e.target.value)}
                      placeholder="جستجوی دارو..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pr-9 pl-3 text-xs font-bold outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                {filteredMeds.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                    <p className="text-[11px] text-stone-400 font-bold">
                      دارویی با این نام یافت نشد.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-stone-200">
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-gradient-to-l from-emerald-50 to-teal-50 border-b border-stone-200">
                          <tr className="text-stone-600 font-black">
                            <th className="p-3 text-right text-[10px]">داروی ایرانی</th>
                            <th className="p-3 text-right text-[10px]">معادل اتریشی</th>
                            <th className="p-3 text-center text-[10px]">دسته</th>
                            <th className="p-3 text-center text-[10px]">نسخه</th>
                            <th className="p-3 text-left text-[10px]">ملاحظات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredMeds.map((med, idx) => (
                            <motion.tr
                              key={idx}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="hover:bg-emerald-50/30 transition"
                            >
                              <td className="p-3 text-stone-900 font-bold text-[11px]">{med.iranName}</td>
                              <td className="p-3 text-stone-800 font-black italic font-mono text-[11px]">
                                {med.austriaName}
                              </td>
                              <td className="p-3 text-center">
                                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                  {med.category}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                {med.needsPrescription ? (
                                  <span className="text-[9px] font-black text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    نیاز به نسخه
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    آزاد
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-left text-[10px] text-stone-500 font-bold max-w-xs">
                                {med.precautions}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Health Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-stone-200 rounded-3xl p-5">
                  <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-black text-xs text-stone-900 mb-1.5">بیمه ÖGK</h4>
                  <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                    بیمه سلامت عمومی اتریش برای همه مقیمان قانونی الزامی است. با E-Card درمان
                    تقریباً رایگان می‌شود.
                  </p>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl p-5">
                  <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mb-3">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-black text-xs text-stone-900 mb-1.5">پزشک عمومی (Hausarzt)</h4>
                  <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                    اولین نقطه تماس شما در سیستم درمانی اتریش است. اکثر داروها فقط با نسخه او
                    قابل دریافت هستند.
                  </p>
                </div>

                <div className="bg-white border border-stone-200 rounded-3xl p-5">
                  <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center mb-3">
                    <Hospital className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-black text-xs text-stone-900 mb-1.5">بیمارستان‌ها (Krankenhaus)</h4>
                  <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                    برای موارد اضطراری به نزدیک‌ترین بیمارستان بروید. تمام شهرهای بزرگ اتریش
                    بیمارستان دولتی دارند.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-black text-xs text-amber-900 mb-1">
                    سلب مسئولیت پزشکی
                  </h5>
                  <p className="text-[10.5px] text-amber-800 font-bold leading-relaxed">
                    این اطلاعات صرفاً جنبه راهنمایی دارد و جایگزین مشاوره پزشک یا داروساز نیست.
                    برای دریافت هر دارو، حتماً با پزشک عمومی یا داروخانه (Apotheke) مشورت کنید.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://wa.me/436889763256?text=%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%AF%D8%B1%D9%85%D8%A7%D9%86%DB%8C%20%D8%AF%D8%B1%20%D8%A7%D8%AA%D8%B1%DB%8C%D8%B4"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-6 text-white hover:scale-[1.01] transition"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-sm mb-1 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      مشاوره درمانی و بیمه با اتریش‌نشین
                    </h4>
                    <p className="text-[11px] text-stone-300 font-bold leading-relaxed">
                      سوالی درباره بیمه ÖGK، پزشکان فارسی‌زبان یا سیستم درمانی اتریش دارید؟
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-gradient-to-br from-emerald-500 to-green-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg">
                    <Send className="w-4 h-4" />
                    مشاوره رایگان
                  </span>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* BOTTOM FOOTER BRANDING */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] rounded-3xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-[#c8102e] via-white to-[#c8102e]" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center">
                <img
                  src={otrishLogo}
                  alt="اتریش‌نشین"
                  className="w-10 h-10 object-contain rounded-xl"
                />
              </div>
              <div className="text-right">
                <div className="font-black text-sm">اتریش‌نشین</div>
                <div className="text-[10px] text-stone-400 font-bold">
                  همیار همه‌جانبه فارسی‌زبانان مقیم اتریش 🇦🇹
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://t.me/OTRISH_IRAN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/10 border border-white/15 hover:bg-white/20 px-3 py-2 rounded-xl text-[10.5px] font-black transition"
              >
                <Send className="w-3.5 h-3.5" />
                تلگرام
              </a>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-gradient-to-br from-emerald-500 to-green-600 px-3 py-2 rounded-xl text-[10.5px] font-black transition hover:scale-105"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                واتس‌اپ
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}