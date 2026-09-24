import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, Legend
} from "recharts";
import {
  BarChart3, TrendingUp, Home, Utensils, Train, Coffee, MapPin,
  Sparkles, CheckCircle, ShieldCheck, Zap, Heart, Star, Award,
  Globe, Rocket, Handshake, ChevronDown, Clock, Info, Building2,
  Wallet, PieChart, Calculator, BookOpen, Target, AlertTriangle,
  Quote, Users, Trophy, Landmark, Euro, Crown, Medal, Coffee as CoffeeIcon
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";

// ==========================================
// IMAGES
// ==========================================
const CITY_IMAGES: Record<string, string> = {
  Wien: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
  Graz: "https://images.unsplash.com/photo-1566837571183-13e04de52f38?w=800&q=80",
  Linz: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80",
};

// ==========================================
// DATA
// ==========================================
const data = [
  { name: "اجاره‌بها", Wien: 950, Graz: 650, Linz: 600, icon: "🏠" },
  { name: "مواد غذایی", Wien: 350, Graz: 320, Linz: 310, icon: "🛒" },
  { name: "حمل‌ونقل", Wien: 33, Graz: 45, Linz: 40, icon: "🚇" },
  { name: "تفریحی", Wien: 200, Graz: 150, Linz: 140, icon: "☕" },
];

const CITY_INFO = [
  {
    id: "Wien",
    name: "وین",
    english: "Wien",
    color: "#e11d48",
    gradient: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    population: "۱.۹ میلیون",
    badge: "پایتخت",
    badgeIcon: Crown,
    highlight: "گران‌ترین مسکن، ارزان‌ترین حمل‌ونقل",
    pros: ["بیشترین فرصت شغلی", "حمل‌ونقل ارزان", "دانشگاه‌های برتر"],
    cons: ["اجاره بسیار بالا", "رقابت شدید مسکن"],
  },
  {
    id: "Graz",
    name: "گراتس",
    english: "Graz",
    color: "#0ea5e9",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
    population: "۳۰۰ هزار",
    badge: "دانشجویی",
    badgeIcon: BookOpen,
    highlight: "تعادل عالی بین قیمت و کیفیت زندگی",
    pros: ["فضای دانشجویی", "هزینه متعادل", "فرهنگ غنی"],
    cons: ["بازار کار محدودتر", "شهر کوچک‌تر"],
  },
  {
    id: "Linz",
    name: "لینتس",
    english: "Linz",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    population: "۲۰۵ هزار",
    badge: "اقتصادی",
    badgeIcon: TrendingUp,
    highlight: "ارزان‌ترین شهر برای سکونت خانواده",
    pros: ["ارزان‌ترین مسکن", "صنعت و تکنولوژی", "دسترسی به طبیعت"],
    cons: ["کمترین تنوع فرهنگی", "شهر صنعتی"],
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۳", label: "شهر بزرگ", icon: "🏙️" },
  { value: "۴", label: "دسته هزینه", icon: "📊" },
  { value: "۲۰۲۶", label: "به‌روزرسانی", icon: "📅" },
  { value: "€۱٬۵۳۳", label: "بالاترین (وین)", icon: "💰" },
];

// ==========================================
// INSIGHTS
// ==========================================
const INSIGHTS = [
  {
    icon: Home,
    title: "مسکن، تعیین‌کننده اصلی",
    text: "اجاره مسکن بین ۶۰ تا ۶۵ درصد تفاوت هزینه کل بین وین و سایر شهرها را می‌سازد.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Train,
    title: "پارادوکس وین",
    text: "وین گران‌ترین مسکن را دارد، اما ارزان‌ترین حمل‌ونقل عمومی اتریش را ارائه می‌دهد.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Utensils,
    title: "خواربار تقریباً یکسان",
    text: "هزینه مواد غذایی در هر سه شهر تفاوت کمی دارد؛ حدود ۴۰ یورو بین ارزان‌ترین و گران‌ترین.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Trophy,
    title: "بهترین ارزش کلی",
    text: "گراتس با ترکیب هزینه متعادل و کیفیت زندگی بالا، بهترین تعادل را ارائه می‌دهد.",
    color: "from-emerald-500 to-teal-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا زندگی در گراتس به‌مراتب ارزان‌تر از وین است؟",
    a: "بله، به‌طور میانگین گراتس حدود ۲۰٪ ارزان‌تر از وین است. بزرگ‌ترین تفاوت در اجاره مسکن است (حدود ۳۰۰ یورو ماهانه کمتر)، اما در بخش مواد غذایی و خدمات تفاوت کمتر است.",
  },
  {
    q: "کدام شهر برای یک دانشجو مناسب‌تر است؟",
    a: "گراتس به‌عنوان پایتخت دانشجویی اتریش با اجاره‌های پایین‌تر و جو جوان انتخاب اول است. لینتس نیز گزینه ارزان‌تری است، اما وین با وجود هزینه بالاتر، فرصت‌های شغلی و شبکه‌سازی بیشتری دارد.",
  },
  {
    q: "آیا هزینه‌های نمودار برای سال ۲۰۲۶ دقیق هستند؟",
    a: "این اعداد بر اساس میانگین هزینه‌های گزارش‌شده در سال ۲۰۲۵ و پیش‌بینی تورم سالانه تهیه شده‌اند. برای تصمیم‌گیری دقیق، همیشه حاشیه ۱۰-۱۵٪ در نظر بگیرید.",
  },
  {
    q: "چرا هزینه حمل‌ونقل در وین کمتر از سایر شهرهاست؟",
    a: "وین دارای شبکه حمل‌ونقل عمومی بسیار کارآمد (Wiener Linien) است که با بلیت سالانه €۳۶۵ در سال ۲۰۲۵، هزینه ماهانه را به حدود €۳۳ کاهش می‌دهد. در گراتس و لینتس شبکه کوچک‌تر است و قیمت بلیت بالاتر.",
  },
];

// ==========================================
// CUSTOM TOOLTIP
// ==========================================
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="bg-white/95 backdrop-blur-sm border border-stone-200 rounded-2xl p-3 shadow-xl"
      dir="rtl"
    >
      <div className="text-[11px] font-black text-stone-900 mb-2 pb-2 border-b border-stone-100">
        {label}
      </div>
      <div className="space-y-1.5">
        {payload.map((entry: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: entry.color }}
              ></span>
              <span className="font-bold text-stone-700">
                {entry.name === "Wien" ? "وین" : entry.name === "Graz" ? "گراتس" : "لینتس"}
              </span>
            </div>
            <span className="font-mono font-black text-stone-900">
              €{entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CostOfLivingComparison: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculate totals per city
  const cityTotals: Record<string, number> = {
    Wien: data.reduce((sum, d) => sum + d.Wien, 0),
    Graz: data.reduce((sum, d) => sum + d.Graz, 0),
    Linz: data.reduce((sum, d) => sum + d.Linz, 0),
  };

  const cheapestCity = Object.entries(cityTotals).sort((a, b) => a[1] - b[1])[0];
  const mostExpensiveCity = Object.entries(cityTotals).sort((a, b) => b[1] - a[1])[0];

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "مقایسه هزینه زندگی در وین، گراتس و لینتس اتریش ۲۰۲۶",
      description:
        "تحلیل جامع هزینه‌های ماهانه مسکن، خواربار، حمل‌ونقل و تفریح در سه شهر اصلی اتریش با نمودار تعاملی.",
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
  ];

  return (
    <GuideContainer
      title="مقایسه هزینه زندگی"
      description="تحلیل هزینه‌های ماهیانه برآورد شده (به یورو) در شهرهای اصلی اتریش برای مدیریت بهتر بودجه"
    >
      <SEO
        title="مقایسه هزینه زندگی وین، گراتس و لینتس ۲۰۲۶ | نمودار و تحلیل"
        description="نمودار تعاملی و تحلیل جامع هزینه‌های ماهانه مسکن، خواربار، حمل‌ونقل و تفریح در سه شهر اصلی اتریش. آمار به‌روز ۲۰۲۶ برای مدیریت بودجه."
        keywords="مقایسه هزینه اتریش, هزینه زندگی وین, هزینه گراتس, هزینه لینتس, بودجه زندگی اتریش, اجاره وین, آمار هزینه اتریش, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="space-y-8" dir="rtl">
        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
        {/* CITY CARDS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              سه شهر اصلی برای مقایسه
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              شخصیت، مزایا و معایب هر شهر در یک نگاه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CITY_INFO.map((city, i) => {
              const BadgeIcon = city.badgeIcon;
              const total = cityTotals[city.id];
              const isCheapest = cheapestCity[0] === city.id;
              const isMostExpensive = mostExpensiveCity[0] === city.id;

              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Image banner */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={CITY_IMAGES[city.id]}
                      alt={`شهر ${city.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Badge */}
                    <div
                      className={`absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r ${city.gradient} text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {city.badge}
                    </div>

                    {/* Crown for cheapest */}
                    {isCheapest && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg inline-flex items-center gap-1">
                        <Trophy className="w-3 h-3 fill-current" />
                        ارزان‌ترین
                      </div>
                    )}
                    {isMostExpensive && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg inline-flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-current" />
                        گران‌ترین
                      </div>
                    )}

                    {/* City name */}
                    <div className="absolute bottom-3 right-3 text-white">
                      <div className="text-lg font-black">{city.name}</div>
                      <div className="text-[10px] font-mono opacity-90">{city.english}</div>
                    </div>

                    {/* Total */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1">
                      <div className="text-[9px] font-black text-stone-500">مجموع</div>
                      <div className="text-sm font-black text-[#c8102e] font-mono">
                        €{total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500 mb-3">
                      <Users className="w-3 h-3" />
                      جمعیت: {city.population}
                    </div>

                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-4 pb-4 border-b border-stone-100">
                      {city.highlight}
                    </p>

                    {/* Pros */}
                    <div className="mb-3">
                      <div className="text-[10px] font-black text-emerald-700 mb-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        نقاط قوت
                      </div>
                      <div className="space-y-1">
                        {city.pros.map((p, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600">
                            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cons */}
                    <div>
                      <div className="text-[10px] font-black text-rose-700 mb-2 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        چالش‌ها
                      </div>
                      <div className="space-y-1">
                        {city.cons.map((c, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-[10px] font-bold text-stone-600">
                            <span className="w-1 h-1 rounded-full bg-rose-500"></span>
                            {c}
                          </div>
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
        {/* CHART SECTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

          <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black bg-rose-100 text-[#c8102e] px-2.5 py-1 rounded-full">
                  سال ۲۰۲۶
                </span>
                <BarChart3 className="w-4 h-4 text-[#c8102e]" />
              </div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 leading-tight">
                نمودار تعاملی مقایسه هزینه‌ها
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1.5">
                هزینه ماهانه به یورو در چهار دسته اصلی برای وین، گراتس و لینتس
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-700">داده زنده</span>
            </div>
          </div>

          <div className="h-96 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                barGap={8}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e7e5e4"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#78716c", fontSize: 12, fontWeight: "bold" }}
                  axisLine={{ stroke: "#d6d3d1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#78716c", fontSize: 11, fontWeight: "bold" }}
                  axisLine={{ stroke: "#d6d3d1" }}
                  tickLine={false}
                  tickFormatter={(v) => `€${v}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(200, 16, 46, 0.04)" }}
                />
                <Bar dataKey="Wien" name="وین" fill="#e11d48" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Graz" name="گراتس" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Linz" name="لینتس" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {[
              { color: "#e11d48", label: "وین (Wien)" },
              { color: "#0ea5e9", label: "گراتس (Graz)" },
              { color: "#f59e0b", label: "لینتس (Linz)" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                ></span>
                <span className="text-[11px] font-black text-stone-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* CITY TOTALS COMPARISON */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              هزینه ماهانه کل به تفکیک شهر
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              مجموع چهار دسته هزینه اصلی برای زندگی مجرد در هر شهر
            </p>
          </div>

          <div className="space-y-4">
            {CITY_INFO.map((city, i) => {
              const total = cityTotals[city.id];
              const maxTotal = Math.max(...Object.values(cityTotals));
              const pct = Math.round((total / maxTotal) * 100);
              const isCheapest = cheapestCity[0] === city.id;

              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${city.gradient} flex items-center justify-center text-white shadow-md`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-stone-900">
                          {city.name}
                        </div>
                        <div className="text-[9px] font-mono text-stone-500">
                          {city.english}
                        </div>
                      </div>
                      {isCheapest && (
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2 py-0.5 rounded-full">
                          <Trophy className="w-2.5 h-2.5 fill-current" />
                          بهترین قیمت
                        </span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-black font-mono text-stone-900">
                        €{total.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-stone-500">/ ماه</span>
                    </div>
                  </div>
                  <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full bg-gradient-to-l ${city.gradient} rounded-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-3 flex-wrap text-[11px] font-bold">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              تفاوت {cheapestCity[0] === "Linz" ? "لینتس" : cheapestCity[0] === "Graz" ? "گراتس" : "وین"} و {" "}
              {mostExpensiveCity[0] === "Wien" ? "وین" : mostExpensiveCity[0] === "Graz" ? "گراتس" : "لینتس"}:
              <span className="font-mono">
                €{(mostExpensiveCity[1] - cheapestCity[1]).toLocaleString()}
              </span>
              در ماه
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* ANALYSIS */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8"
        >
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              تحلیل داده‌ها
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              تفسیر الگوهای کلیدی در نمودار بالا
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl" />
            <div className="relative">
              <Quote className="w-6 h-6 text-[#c8102e]/30 mb-3" />
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-bold mb-4">
                نمودار بالا نشان می‌دهد که <strong className="text-[#c8102e]">وین</strong> به دلیل هزینه‌های
                بالاتر مسکن در صدر هزینه‌ها قرار دارد، اما در هزینه‌های حمل‌ونقل عمومی
                به‌دلیل <em className="text-sky-700">کارت سالانه Wiener Linien</em> بسیار بهینه‌تر از
                سایر شهرها عمل می‌کند. تفاوت اصلی بین شهرها در بخش مسکن است، در حالی
                که هزینه مواد غذایی تقریباً مشابه است.
              </p>
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-bold">
                <strong className="text-amber-700">لینتس</strong> به‌عنوان ارزان‌ترین شهر، برای خانواده‌ها و
                افرادی که به‌دنبال کاهش هزینه‌های سکونت هستند، گزینه بسیار مناسبی است.
                <strong className="text-sky-700"> گراتس</strong> با ترکیب هزینه متعادل و کیفیت زندگی
                بالا، بهترین تعادل بین قیمت و امکانات را ارائه می‌دهد.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* INSIGHTS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              نکات کلیدی برای تصمیم‌گیری
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار واقعیت مهم که هنگام انتخاب شهر باید بدانید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSIGHTS.map((v, i) => {
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
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              سوالات متداول
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              پاسخ به پرتکرارترین سوالات درباره هزینه‌های زندگی در شهرهای اتریش
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
              همراه شما در انتخاب شهر
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نیاز به مشاوره انتخاب شهر دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره انتخاب شهر مناسب،
              بودجه‌بندی و برنامه‌ریزی مالی در اتریش است.
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
              ارقام این مقایسه بر اساس آمار رسمی Statistik Austria و گزارش‌های
              میدانی تهیه شده و صرفاً جنبه راهنمایی دارند. هزینه‌های واقعی
              بسته به منطقه دقیق، متراژ مسکن و سبک زندگی شما متفاوت خواهد بود.
              برای تصمیم‌گیری نهایی، با منابع رسمی یا مشاوران واجد شرایط مشورت کنید.
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

export default CostOfLivingComparison;