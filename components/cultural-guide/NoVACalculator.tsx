import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car, Calculator, Euro, Gauge, Fuel, Leaf, Zap, TrendingUp,
  Info, CheckCircle, AlertCircle, ChevronDown, Sparkles,
  Shield, Heart, PhoneCall, Send, FileText, Scale, Award,
  BarChart3, RefreshCw, Copy, Star, BookOpen, Globe,
  Landmark, Percent, ArrowUpRight, CircleDollarSign, FuelIcon,
  BatteryCharging, Bike, Truck,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  electric: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
  road: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
  vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// VEHICLE TYPES & FUEL
// ==========================================
type VehicleType = "car" | "motorcycle";
type FuelType = "petrol" | "diesel" | "electric" | "hybrid";

const VEHICLE_TYPES: { id: VehicleType; label: string; icon: any; desc: string }[] = [
  { id: "car", label: "خودرو (M1)", icon: Car, desc: "خودرو سواری، شاسی‌بلند، ون" },
  { id: "motorcycle", label: "موتورسیکلت", icon: Bike, desc: "موتور سنگین بالای ۱۲۵cc" },
];

const FUEL_TYPES: { id: FuelType; label: string; icon: any; color: string; gradient: string }[] = [
  { id: "petrol", label: "بنزین", icon: Fuel, color: "text-amber-700", gradient: "from-amber-500 to-orange-600" },
  { id: "diesel", label: "دیزل", icon: Fuel, color: "text-stone-700", gradient: "from-stone-500 to-stone-700" },
  { id: "electric", label: "برقی", icon: BatteryCharging, color: "text-emerald-700", gradient: "from-emerald-500 to-green-600" },
  { id: "hybrid", label: "هیبرید", icon: Leaf, color: "text-teal-700", gradient: "from-teal-500 to-emerald-600" },
];

// ==========================================
// CALCULATION ENGINE (2026 rules)
// ==========================================
function calculateNoVA(
  vehicleType: VehicleType,
  fuelType: FuelType,
  co2: number,
  netPrice: number
) {
  // Electric vehicles are exempt from NoVA
  if (fuelType === "electric") {
    return {
      steuersatz: 0,
      grundbetrag: 0,
      malus: 0,
      abzug: 0,
      total: 0,
      effectiveRate: 0,
      co2Abzug: vehicleType === "car" ? 91 : 51,
      malusGrenze: vehicleType === "car" ? 155 : 150,
      isExempt: true,
      note: "خودروهای برقی کاملاً از NoVA معاف هستند.",
    };
  }

  const isCar = vehicleType === "car";
  // 2026: Car CO2-Abzugsbetrag = 91 g/km, Motorcycle = 51 g/km
  const co2Abzug = isCar ? 91 : 51;
  const maxSteuersatz = isCar ? 80 : 30;
  const malusGrenze = isCar ? 155 : 150;
  const malusRate = isCar ? 80 : 20; // € per g over limit
  const abzugsposten = isCar ? 350 : 0; // Only cars get the 350€ deduction

  // Steuersatz = (CO2 - Abzug) / divisor, rounded commercially
  const divisor = isCar ? 5 : 4;
  const rawSatz = (co2 - co2Abzug) / divisor;
  const steuersatz = Math.min(maxSteuersatz, Math.max(0, Math.round(rawSatz)));

  // Grundbetrag = Bemessungsgrundlage × Steuersatz
  const grundbetrag = netPrice * (steuersatz / 100);

  // Malus for high CO2 emissions
  const malus =
    co2 > malusGrenze ? (co2 - malusGrenze) * malusRate : 0;

  // Total NoVA (can't be negative)
  const total = Math.max(0, grundbetrag + malus - abzugsposten);

  // Effective rate
  const effectiveRate = netPrice > 0 ? (total / netPrice) * 100 : 0;

  return {
    steuersatz,
    grundbetrag,
    malus,
    abzug: abzugsposten,
    total,
    effectiveRate,
    co2Abzug,
    malusGrenze,
    malusRate,
    isExempt: false,
    note: "",
  };
}

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "€91", label: "کسر CO2 در ۲۰۲۶ (خودرو)", icon: Percent },
  { value: "۸۰٪", label: "حداکثر نرخ مالیات", icon: TrendingUp },
  { value: "€۸۰", label: "جریمه هر گرم CO2 اضافه", icon: AlertCircle },
  { value: "€۳۵۰", label: "کسر ثابت از مالیات نهایی", icon: CircleDollarSign },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "NoVA چیست و چه زمانی باید پرداخت شود؟",
    a: "NoVA (Normverbrauchsabgabe) یک مالیات یکباره بر مصرف سوخت است که هنگام خرید خودروی نو از فروشنده اتریشی یا واردات خودرو به اتریش و اولین ثبت پلاک، پرداخت می‌شود. برای خودروهای دست دوم که قبلاً در اتریش ثبت شده‌اند، معمولاً NoVA مجدداً پرداخت نمی‌شود.",
  },
  {
    q: "فرمول محاسبه NoVA در سال ۲۰۲۶ چگونه است؟",
    a: "برای خودرو (M1): نرخ مالیات = (مقدار CO2 به g/km منهای ۹۱) تقسیم بر ۵. حداکثر نرخ ۸۰٪ است. سپس این نرخ در قیمت خالص خودرو ضرب می‌شود. اگر CO2 بالای ۱۵۵ g/km باشد، به ازای هر گرم اضافه ۸۰ یورو جریمه اضافه می‌شود. در نهایت ۳۵۰ یورو از مبلغ کل کسر می‌گردد.",
  },
  {
    q: "آیا خودروهای برقی از NoVA معاف هستند؟",
    a: "بله. خودروهای تمام‌برقی (BEV) و خودروهای پیل سوختی کاملاً از NoVA معاف هستند. برای خودروهای هیبریدی (Plug-in)، فرمول محاسبه بر اساس CO2 ترکیبی آنها اعمال می‌شود.",
  },
  {
    q: "آیا می‌توانم NoVA را هنگام صادرات خودرو پس بگیرم؟",
    a: "بله، در شرایطی خاص (صادرات خودرو به خارج از اتریش یا فروش به خارج)، امکان بازپرداخت NoVA وجود دارد. این بازپرداخت تابع قوانین سختگیرانه‌ای است و مبلغ آن بر اساس ارزش بازار خودرو در زمان صادرات محاسبه می‌شود.",
  },
  {
    q: "تفاوت NoVA خودرو و موتورسیکلت چیست؟",
    a: "فرمول موتورسیکلت متفاوت است: کسر CO2 معادل ۵۱ g/km (در ۲۰۲۶)، تقسیم بر ۴، حداکثر نرخ ۳۰٪، و جریمه ۲۰ یورو به ازای هر گرم CO2 بالای ۱۵۰ g/km. همچنین کسر ثابت ۳۵۰ یورویی برای موتورسیکلت اعمال نمی‌شود.",
  },
  {
    q: "آیا NoVA برای خودروهای وارداتی از ایران هم اعمال می‌شود؟",
    a: "بله. هر خودرویی که برای اولین بار در اتریش ثبت پلاک می‌شود — اعم از نو، دست دوم یا وارداتی — مشمول NoVA است. برای خودروهای وارداتی، ارزش گمرکی و مقدار CO2 اعلامی بر اساس استانداردهای WLTP مبنای محاسبه قرار می‌گیرد.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const NoVACalculator: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [co2, setCo2] = useState<number>(120);
  const [netPrice, setNetPrice] = useState<number>(30000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () => calculateNoVA(vehicleType, fuelType, co2, netPrice),
    [vehicleType, fuelType, co2, netPrice]
  );

  const handleCopy = () => {
    const text = `NoVA محاسبه‌شده: ${result.total.toFixed(2)} یورو (نرخ مؤثر: ${result.effectiveRate.toFixed(2)}%)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("نتیجه کپی شد!");
    setTimeout(() => setCopied(false), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "محاسبه‌گر NoVA اتریش ۲۰۲۶",
      description:
        "ماشین‌حساب آنلاین مالیات NoVA (Normverbrauchsabgabe) اتریش بر اساس آخرین قوانین ۲۰۲۶. محاسبه دقیق مالیات خودرو، موتورسیکلت و خودروی برقی.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
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
      name: "نحوه محاسبه NoVA اتریش ۲۰۲۶",
      description:
        "راهنمای گام‌به‌گام محاسبه مالیات NoVA برای خودرو و موتورسیکلت در اتریش.",
      inLanguage: "fa-IR",
      step: [
        { "@type": "HowToStep", position: 1, name: "نوع وسیله نقلیه را انتخاب کنید (خودرو یا موتورسیکلت)" },
        { "@type": "HowToStep", position: 2, name: "نوع سوخت را مشخص کنید (بنزین، دیزل، برقی، هیبرید)" },
        { "@type": "HowToStep", position: 3, name: "مقدار CO2 خودرو را بر اساس استاندارد WLTP وارد کنید" },
        { "@type": "HowToStep", position: 4, name: "قیمت خالص خودرو (بدون مالیات بر ارزش افزوده) را وارد کنید" },
        { "@type": "HowToStep", position: 5, name: "نتیجه NoVA به صورت خودکار محاسبه و نمایش داده می‌شود" },
      ],
    },
  ];

  return (
    <GuideContainer
      title="محاسبه‌گر مالیات NoVA اتریش"
      description="ماشین‌حساب آنلاین و دقیق مالیات بر خودرو (Normverbrauchsabgabe) در اتریش بر اساس آخرین قوانین ۲۰۲۶"
    >
      <SEO
        title="محاسبه‌گر NoVA اتریش ۲۰۲۶ | ماشین‌حساب آنلاین مالیات خودرو"
        description="محاسبه دقیق مالیات NoVA (Normverbrauchsabgabe) اتریش برای خودرو، موتورسیکلت و خودروی برقی بر اساس آخرین فرمول ۲۰۲۶. نرخ مالیات، جریمه CO2 و کسر ۳۵۰ یورویی به صورت خودکار."
        keywords="NoVA, محاسبه NoVA, مالیات خودرو اتریش, Normverbrauchsabgabe, NoVA Rechner, محاسبه‌گر NoVA, مالیات CO2 اتریش, خرید خودرو در اتریش, واردات خودرو به اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-10 font-sans" dir="rtl">

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #1e3a5f 0, #0f172a 48%, #020617 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="خودرو در جاده اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#020617]/85 via-[#0f172a]/75 to-[#1e3a5f]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🚗
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              ماشین‌حساب رسمی NoVA ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              چقدر باید مالیات NoVA خودرو خود را بپردازید؟
            </h1>

            <p className="text-sm md:text-base text-sky-100 leading-relaxed max-w-3xl mb-6">
              خرید یا واردات خودرو به اتریش بدون محاسبه <strong className="text-amber-300">NoVA (Normverbrauchsabgabe)</strong> می‌تواند
              شما را با هزینه‌های غیرمنتظره روبرو کند. با این ماشین‌حساب دقیق و
              به‌روز، بر اساس آخرین فرمول‌های سال ۲۰۲۶، میزان مالیات خودروی خود را
              در چند ثانیه محاسبه کنید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>فرمول رسمی ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>خودرو + موتورسیکلت</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>رایگان و بدون ثبت‌نام</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-white text-[#1e3a5f] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Calculator className="w-4 h-4" />
                شروع محاسبه
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره رایگان خودرو
              </a>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* QUICK STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-700" />
                </div>
                <div className="text-lg font-black text-sky-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* CALCULATOR */}
        {/* ========================================== */}
        <div id="calculator" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sky-700" />
              ماشین‌حساب NoVA — فرمول ۲۰۲۶
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              مقادیر را وارد کنید تا محاسبه به صورت زنده انجام شود
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            {/* Input panel */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-stone-200 p-6 space-y-5">

              {/* Vehicle type */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-sky-700" />
                  نوع وسیله نقلیه
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {VEHICLE_TYPES.map((v) => {
                    const Icon = v.icon;
                    const isActive = vehicleType === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setVehicleType(v.id);
                          if (v.id === "car" && co2 > 300) setCo2(150);
                        }}
                        className={`relative overflow-hidden rounded-2xl border-2 p-3 text-right transition-all ${
                          isActive
                            ? "border-sky-600 bg-sky-50/50 shadow-md"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1.5 ${isActive ? "text-sky-700" : "text-stone-400"}`} />
                        <div className="text-xs font-black text-stone-900">{v.label}</div>
                        <div className="text-[9px] text-stone-500 font-bold mt-0.5">{v.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fuel type */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-sky-700" />
                  نوع سوخت
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {FUEL_TYPES.map((f) => {
                    const Icon = f.icon;
                    const isActive = fuelType === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFuelType(f.id)}
                        className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                          isActive
                            ? `border-sky-600 bg-gradient-to-br ${f.gradient} bg-opacity-10 shadow-md`
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1.5 ${isActive ? f.color : "text-stone-400"}`} />
                        <div className={`text-[11px] font-black ${isActive ? f.color : "text-stone-600"}`}>
                          {f.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CO2 slider */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-sky-700" />
                    مقدار CO2 (g/km — استاندارد WLTP)
                  </span>
                  <span className="text-sm font-black text-sky-700 font-mono" dir="ltr">
                    {co2} g/km
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={1}
                  value={co2}
                  onChange={(e) => setCo2(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-sky-700"
                />
                <div className="flex justify-between text-[9px] text-stone-400 font-bold mt-1">
                  <span>۰</span>
                  <span className="text-emerald-600">۹۱ (کسر ۲۰۲۶)</span>
                  <span className="text-rose-600">۱۵۵ (آستانه جریمه)</span>
                  <span>۳۰۰</span>
                </div>
              </div>

              {/* Net price */}
              <div>
                <label className="text-[11px] font-black text-stone-700 mb-2 block flex items-center gap-1.5">
                  <Euro className="w-3.5 h-3.5 text-sky-700" />
                  قیمت خالص خودرو (یورو — بدون مالیات بر ارزش افزوده)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={500000}
                    step={500}
                    value={netPrice}
                    onChange={(e) => setNetPrice(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-stone-200 focus:border-sky-600 focus:outline-none text-sm font-black text-stone-900 font-mono transition-colors"
                    dir="ltr"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 font-black text-xs">
                    €
                  </span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {[15000, 25000, 40000, 60000].map((p) => (
                    <button
                      key={p}
                      onClick={() => setNetPrice(p)}
                      className="text-[10px] font-black text-stone-600 bg-stone-100 hover:bg-sky-50 hover:text-sky-700 border border-stone-200 hover:border-sky-200 px-3 py-1 rounded-full transition-all"
                    >
                      €{p.toLocaleString("de-AT")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${vehicleType}-${fuelType}-${co2}-${netPrice}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`relative overflow-hidden rounded-3xl p-6 text-white ${
                    result.isExempt
                      ? "bg-gradient-to-br from-emerald-600 to-green-700"
                      : "bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#020617]"
                  }`}
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/15 border border-white/25 rounded-full text-[9px] font-black backdrop-blur-sm mb-4">
                      {result.isExempt ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-300" />
                          معاف از NoVA
                        </>
                      ) : (
                        <>
                          <BarChart3 className="w-3 h-3 text-amber-300" />
                          نتیجه محاسبه زنده
                        </>
                      )}
                    </div>

                    <div className="text-[10px] font-black text-white/70 mb-1">
                      مالیات NoVA قابل پرداخت
                    </div>
                    <div className="text-4xl md:text-5xl font-black leading-none mb-1 font-mono" dir="ltr">
                      €{result.total.toLocaleString("de-AT", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    {!result.isExempt && (
                      <div className="text-[11px] font-bold text-white/60 mb-4">
                        نرخ مؤثر: {result.effectiveRate.toFixed(1)}٪ از قیمت خالص
                      </div>
                    )}
                    {result.isExempt && (
                      <div className="text-[11px] font-bold text-emerald-100 mb-4">
                        {result.note}
                      </div>
                    )}

                    {!result.isExempt && (
                      <>
                        {/* Breakdown */}
                        <div className="space-y-2 mb-4 pt-4 border-t border-white/15">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-white/70 flex items-center gap-1.5">
                              <Percent className="w-3 h-3" />
                              نرخ مالیات (Steuersatz)
                            </span>
                            <span className="font-black font-mono" dir="ltr">
                              {result.steuersatz}٪
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-bold text-white/70 flex items-center gap-1.5">
                              <Euro className="w-3 h-3" />
                              مالیات پایه
                            </span>
                            <span className="font-black font-mono" dir="ltr">
                              €{result.grundbetrag.toLocaleString("de-AT", { maximumFractionDigits: 0 })}
                            </span>
                          </div>
                          {result.malus > 0 && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-rose-300 flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3" />
                                جریمه CO2 (Malus)
                              </span>
                              <span className="font-black font-mono text-rose-300" dir="ltr">
                                +€{result.malus.toLocaleString("de-AT")}
                              </span>
                            </div>
                          )}
                          {result.abzug > 0 && (
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                                <CheckCircle className="w-3 h-3" />
                                کسر ثابت
                              </span>
                              <span className="font-black font-mono text-emerald-300" dir="ltr">
                                −€{result.abzug}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Info box */}
                        <div className="bg-white/10 border border-white/15 rounded-2xl p-3 mb-4">
                          <div className="text-[9px] font-black text-white/60 mb-1.5">
                            پارامترهای محاسبه ۲۰۲۶
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div>
                              <span className="text-white/60 font-bold">کسر CO2: </span>
                              <span className="font-black font-mono">{result.co2Abzug} g</span>
                            </div>
                            <div>
                              <span className="text-white/60 font-bold">آستانه جریمه: </span>
                              <span className="font-black font-mono">{result.malusGrenze} g</span>
                            </div>
                            <div>
                              <span className="text-white/60 font-bold">نرخ جریمه: </span>
                              <span className="font-black font-mono">€{result.malusRate}/g</span>
                            </div>
                            <div>
                              <span className="text-white/60 font-bold">حداکثر نرخ: </span>
                              <span className="font-black font-mono">{vehicleType === "car" ? "۸۰٪" : "۳۰٪"}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Copy button */}
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur-sm text-white font-black text-[11px] py-2.5 rounded-2xl transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                          کپی شد!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          کپی نتیجه
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Warning */}
              {!result.isExempt && co2 > result.malusGrenze && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-rose-800 font-bold leading-relaxed">
                    CO2 خودروی شما ({co2} g/km) بالای آستانه {result.malusGrenze} g/km است. به ازای هر گرم
                    اضافه، <strong>€{result.malusRate}</strong> جریمه به مالیات شما اضافه می‌شود.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* FORMULA EXPLAINER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-50 border border-sky-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  فرمول رسمی NoVA ۲۰۲۶
                </h3>
                <p className="text-[10px] text-stone-500 font-bold">
                  بر اساس اعلام وزارت دارایی اتریش (BMF)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sky-200 p-5 font-mono text-[11px] space-y-2" dir="ltr">
              <div className="text-stone-500 font-bold">// Formel für Pkw (M1)</div>
              <div className="text-stone-800 font-black">
                Steuersatz = (CO₂ – <span className="text-sky-700">91</span>) ÷ <span className="text-sky-700">5</span>
              </div>
              <div className="text-stone-800 font-black">
                Grundbetrag = Nettopreis × Steuersatz
              </div>
              <div className="text-stone-800 font-black">
                Malus = (CO₂ – <span className="text-rose-600">155</span>) × <span className="text-rose-600">€80</span> <span className="text-stone-400">// nur wenn CO₂ &gt; 155</span>
              </div>
              <div className="text-stone-800 font-black">
                <span className="text-emerald-700">NoVA = max(0, Grundbetrag + Malus – €350)</span>
              </div>
              <div className="text-stone-400 font-bold pt-2 border-t border-stone-100">
                // Höchststeuersatz: 80% · CO₂-Abzugsbetrag sinkt jährlich um 3 g
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-700" />
              NoVA در عمل — سه سناریوی واقعی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از خودروی برقی معاف تا خودروی پرقدرت با جریمه سنگین
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.electric,
                title: "خودروی برقی",
                subtitle: "معافیت کامل",
                desc: "خودروهای تمام‌برقی از NoVA کاملاً معاف هستند — یک مزیت مالیاتی بزرگ برای خریداران.",
                icon: BatteryCharging,
                gradient: "from-emerald-600 to-green-700",
                stat: "€۰",
                statLabel: "مالیات",
              },
              {
                img: IMAGES.road,
                title: "خودروی اقتصادی",
                subtitle: "CO2 پایین",
                desc: "خودروی بنزینی با CO2 زیر ۹۱ g/km نرخ مالیات صفر دارد و فقط جریمه احتمالی لحاظ می‌شود.",
                icon: Car,
                gradient: "from-sky-600 to-blue-700",
                stat: "€۰",
                statLabel: "نرخ پایه",
              },
              {
                img: IMAGES.vienna,
                title: "خودروی پرقدرت",
                subtitle: "CO2 بالا",
                desc: "خودروی اسپرت با CO2 بالای ۲۰۰ g/km هم نرخ بالا و هم جریمه سنگین پرداخت می‌کند.",
                icon: Gauge,
                gradient: "from-rose-600 to-red-700",
                stat: "€۸۰",
                statLabel: "جریمه هر گرم",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-stone-200 hover:shadow-xl transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-40 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1">
                      <div className="text-[9px] font-black text-white/70">{c.statLabel}</div>
                      <div className="text-xs font-black text-white font-mono leading-none">{c.stat}</div>
                    </div>
                    <div className="absolute bottom-3 right-3 left-3">
                      <div className="text-[10px] font-black text-white/90 mb-1">
                        {c.subtitle}
                      </div>
                      <div className="text-sm font-black text-white leading-tight">
                        {c.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-sky-700" />
              سوالات متداول درباره NoVA
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
        {/* CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Car className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی خرید خودرو
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در مورد NoVA سوال دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش، می‌تواند در انتخاب خودرو،
              محاسبه NoVA و فرآیند واردات و ثبت پلاک شما را راهنمایی کند. همین حالا پیام دهید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                مشاوره در واتس‌اپ
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
                <CheckCircle className="w-3.5 h-3.5" />
                پاسخ در کمتر از ۲۴ ساعت
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                خدمات داوطلبانه
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                کاملاً محرمانه
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
              این ماشین‌حساب بر اساس فرمول‌های رسمی وزارت دارایی اتریش (BMF) برای سال
              ۲۰۲۶ تهیه شده است. با این حال، ارقام نهایی ممکن است بسته به تجهیزات
              اضافی، تخفیف‌های فروشنده و شرایط خاص خودرو متفاوت باشد. برای تصمیم‌های
              مالی نهایی، همیشه با فروشنده رسمی یا مشاور مالیاتی مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </GuideContainer>
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
        isOpen ? "border-sky-300 bg-sky-50/30 shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-sky-600 to-indigo-700 text-white"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
            {q}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-sky-700" : ""
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

export default NoVACalculator;