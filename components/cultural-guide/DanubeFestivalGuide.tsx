import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Music, Calendar, MapPin, Clock, Ticket, Users, Sparkles, CheckCircle,
  ShieldCheck, Zap, Heart, Star, Award, Globe, Rocket, Handshake,
  ChevronDown, Info, Train, Utensils, Beer, Sun, PartyPopper, Mic2,
  Guitar, Drum, Volume2, Camera, Baby, Leaf, AlertTriangle, Target,
  Building2, Coffee, ShoppingBag, Navigation, Facebook, Instagram,
  Youtube, Send, Quote, Euro, Phone, Bus, Bike, ParkingCircle, Toilet,
  HeartHandshake, PartyPopper as PartyIcon
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80";
const CROWD_IMAGE = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80";
const STAGE_IMAGE = "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80";
const FOOD_IMAGE = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80";

// ==========================================
// EVENT INFO
// ==========================================
const EVENT_INFO = [
  {
    icon: Calendar,
    title: "تاریخ برگزاری",
    value: "۲۷ تا ۲۹ ژوئن ۲۰۲۶",
    sub: "جمعه، شنبه و یکشنبه",
    gradient: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: MapPin,
    title: "مکان",
    value: "Donauinsel, Wien",
    sub: "جزیره دانوب، وین",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    icon: Ticket,
    title: "ورود",
    value: "۱۰۰٪ رایگان",
    sub: "بدون نیاز به بلیت",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Clock,
    title: "ساعت‌ها",
    value: "۱۲:۰۰ - ۲۴:۰۰",
    sub: "سه روز متوالی",
    gradient: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۳", label: "روز جشن", icon: "🎉" },
  { value: "۲۰+", label: "صحنه موسیقی", icon: "🎸" },
  { value: "۱۰۰+", label: "هنرمند", icon: "🎤" },
  { value: "۳M", label: "بازدیدکننده", icon: "👥" },
];

// ==========================================
// STAGES / AREAS
// ==========================================
const STAGES = [
  {
    icon: Mic2,
    title: "صحنه اصلی (Hauptbühne)",
    text: "بزرگ‌ترین صحنه با اجرای هنرمندان بین‌المللی و ملی اتریش. هر شب تا نیمه‌شب.",
    color: "from-rose-500 to-pink-600",
    genres: ["پاپ", "راک", "الکترونیک"],
  },
  {
    icon: Guitar,
    title: "صحنه راک و آلترناتیو",
    text: "برای طرفداران موسیقی راک، متال و ایندی. اجراهای پرانرژی از هنرمندان اروپایی.",
    color: "from-slate-500 to-slate-700",
    genres: ["راک", "متال", "ایندی"],
  },
  {
    icon: Volume2,
    title: "صحنه الکترونیک و DJ",
    text: "موسیقی الکترونیک، هاوس و تکنو با بهترین DJهای اتریش و اروپا.",
    color: "from-purple-500 to-indigo-600",
    genres: ["House", "Techno", "EDM"],
  },
  {
    icon: Music,
    title: "صحنه جهانی و فولک",
    text: "موسیقی جهانی، فولک و سنتی از فرهنگ‌های مختلف جهان.",
    color: "from-amber-500 to-orange-600",
    genres: ["فولک", "جهانی", "سنتی"],
  },
  {
    icon: PartyIcon,
    title: "منطقه تفریح و کودکان",
    text: "بازی‌های کودکان، اجراهای خیابانی، ورکشاپ‌های هنری و سرگرمی خانوادگی.",
    color: "from-emerald-500 to-teal-600",
    genres: ["خانوادگی", "کودکان", "هنری"],
  },
  {
    icon: Utensils,
    title: "دهکده غذایی (Food Village)",
    text: "بیش از ۱۵۰ غرفه غذایی از آشپزهای اتریشی، اروپایی، آسیایی و خاورمیانه.",
    color: "from-red-500 to-rose-600",
    genres: ["اتریشی", "جهانی", "وگان"],
  },
];

// ==========================================
// HOW TO GET THERE
// ==========================================
const ACCESS_ROUTES = [
  {
    icon: Train,
    title: "مترو (U-Bahn)",
    text: "خط U1 (ایستگاه Donauinsel یا Kaisermühlen) و U6 (ایستگاه Handelskai) نزدیک‌ترین ایستگاه‌ها هستند.",
    color: "from-red-500 to-rose-600",
    badge: "توصیه‌شده",
  },
  {
    icon: Bus,
    title: "اتوبوس و تراموا",
    text: "خطوط ۲۵A، ۲۶A و ۳۱A و همچنین تراموا ۲۵ به نزدیکی فستیوال می‌رسند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Bike,
    title: "دوچرخه",
    text: "مسیرهای دوچرخه‌سواری جزیره دانوب باز است. پارکینگ دوچرخه رایگان نزدیک هر ورودی.",
    color: "from-emerald-500 to-teal-600",
    badge: "سالم‌ترین",
  },
  {
    icon: ParkingCircle,
    title: "خودروی شخصی",
    text: "توصیه نمی‌شود! ترافیک سنگین و کمبود پارکینگ. اگر ضروری است، پارکینگ‌های P+R استفاده کنید.",
    color: "from-amber-500 to-orange-600",
    badge: "هشدار",
  },
];

// ==========================================
// TIPS
// ==========================================
const TIPS = [
  {
    icon: Sun,
    title: "لباس و ضدآفتاب",
    text: "فستیوال در فضای باز است. کلاه، عینک آفتابی، کرم ضدآفتاب و لباس سبک فراموش نشود.",
    color: "from-amber-500 to-yellow-600",
  },
  {
    icon: Beer,
    title: "نوشیدنی و غذا",
    text: "می‌توانید نوشیدنی و غذای خود را بیاورید (به جز نوشیدنی الکلی). بطری آب رایگان در محل موجود است.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: Toilet,
    title: "امکانات بهداشتی",
    text: "توالت‌های قابل حمل و ایستگاه‌های شستشو در سراسر جزیره مستقر هستند. رایگان و بهداشتی.",
    color: "from-sky-500 to-cyan-600",
  },
  {
    icon: Phone,
    title: "امنیت و گمشدگان",
    text: "پلیس و امدادگران در محل حاضرند. برای کودکان، دستبند با شماره تماس همراه داشته باشید.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: ShoppingBag,
    title: "چیزهایی که ممنوع است",
    text: "شیشه، سلاح سرد، حیوانات (به جز سگ راهنما)، و مواد منفجره ممنوع است.",
    color: "from-slate-500 to-gray-600",
  },
  {
    icon: Camera,
    title: "عکاسی",
    text: "عکاسی برای استفاده شخصی آزاد است. برای استفاده تجاری یا حرفه‌ای، مجوز لازم است.",
    color: "from-purple-500 to-indigo-600",
  },
];

// ==========================================
// HIGHLIGHTS / WHY VISIT
// ==========================================
const HIGHLIGHTS = [
  {
    icon: Award,
    title: "بزرگ‌ترین فستیوال رایگان اروپا",
    text: "Donauinselfest با بیش از ۳ میلیون بازدیدکننده در ۳ روز، بزرگ‌ترین فستیوال موسیقی رایگان جهان است.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Heart,
    title: "برای همه سنین",
    text: "از کودکان تا سالمندان، برنامه‌های متنوعی برای همه سلیقه‌ها و سنین وجود دارد.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Leaf,
    title: "پایدار و سازگار با محیط زیست",
    text: "فستیوال بر پایه اصول پایداری زیست‌محیطی با تفکیک زباله و انرژی پاک برگزار می‌شود.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Globe,
    title: "چندفرهنگی",
    text: "موسیقی، غذا و فرهنگ از سراسر جهان در یک مکان — تجربه‌ای منحصربه‌فرد از وین چندفرهنگی.",
    color: "from-sky-500 to-blue-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "آیا Donauinselfest واقعاً رایگان است؟",
    a: "بله، ورود به تمام صحنه‌ها و مناطق فستیوال کاملاً رایگان است. فستیوال توسط شهر وین و اسپانسرها تأمین مالی می‌شود. تنها هزینه‌های غذا، نوشیدنی و کالاهای جانبی را پرداخت می‌کنید.",
  },
  {
    q: "آیا می‌توانم حیوان خانگی خود را بیاورم؟",
    a: "به دلیل ازدحام زیاد و موسیقی بلند، آوردن حیوانات خانگی ممنوع است، به جز سگ‌های راهنما (Assistenzhunde). این تصمیم برای ایمنی و آسایش هم حیوانات و هم بازدیدکنندگان است.",
  },
  {
    q: "آیا فستیوال در باران برگزار می‌شود؟",
    a: "بله، Donauinselfest در هر شرایط آب و هوایی برگزار می‌شود. در صورت رعد و برق شدید ممکن است برخی صحنه‌ها موقتاً متوقف شوند. توصیه می‌شود لباس ضدآب همراه داشته باشید.",
  },
  {
    q: "بهترین زمان برای رفتن چه موقع است؟",
    a: "برای دیدن هنرمندان اصلی، عصرها (۱۸ تا ۲۳) بروید. برای فضای آرام‌تر و خانوادگی، صبح‌ها (۱۲ تا ۱۶) مناسب‌تر است. جمعه شب شلوغ‌ترین زمان است.",
  },
  {
    q: "آیا پارکینگ در محل موجود است؟",
    a: "پارکینگ مستقیم در محل بسیار محدود است. توصیه می‌شود از حمل‌ونقل عمومی، دوچرخه یا پارکینگ‌های P+R (مثل Handelskai یا Hütteldorf) استفاده کنید.",
  },
  {
    q: "آیا امکان رزرو هتل نزدیک فستیوال وجود دارد؟",
    a: "بله، اما هتل‌های نزدیک در این بازه زمانی به‌سرعت پر می‌شوند. توصیه می‌شود چند ماه قبل از فستیوال رزرو کنید. هتل‌های مناطق ۱، ۲، ۲۰ و ۲۱ نزدیک‌ترین هستند.",
  },
];

// ==========================================
// TIMELINE
// ==========================================
const DAY_SCHEDULE = [
  {
    day: "جمعه",
    date: "۲۷ ژوئن",
    theme: "شب افتتاحیه",
    highlight: "اجرای هنرمندان بین‌المللی و آتش‌بازی",
    icon: PartyPopper,
    color: "from-rose-500 to-red-600",
  },
  {
    day: "شنبه",
    date: "۲۸ ژوئن",
    theme: "روز اصلی",
    highlight: "بیشترین تعداد اجراها و شلوغ‌ترین روز",
    icon: Music,
    color: "from-sky-500 to-blue-600",
  },
  {
    day: "یکشنبه",
    date: "۲۹ ژوئن",
    theme: "پایان بخشی",
    highlight: "حال‌وهوای خانوادگی و اجرای ویژه اختتامیه",
    icon: Sun,
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const DanubeFestivalGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Donauinselfest 2026 - فستیوال جزیره دانوب",
      startDate: "2026-06-27T12:00:00+02:00",
      endDate: "2026-06-29T24:00:00+02:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Donauinsel",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wien",
          addressCountry: "AT",
        },
      },
      image: "https://otrish-iran.ir/donauinselfest.jpg",
      description:
        "بزرگ‌ترین فستیوال رایگان موسیقی اروپا در جزیره دانوب وین با بیش از ۲۰ صحنه و ۳ میلیون بازدیدکننده.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      organizer: {
        "@type": "Organization",
        name: "Stadt Wien",
        url: "https://www.donauinselfest.at",
      },
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
      "@type": "Article",
      headline: "راهنمای کامل فستیوال جزیره دانوب (Donauinselfest 2026)",
      description:
        "برنامه، نحوه دسترسی، صحنه‌ها، نکات و اطلاعات کاربردی برای شرکت در بزرگ‌ترین فستیوال رایگان موسیقی اروپا.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      inLanguage: "fa",
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای فستیوال جزیره دانوب ۲۰۲۶ | Donauinselfest - برنامه و دسترسی"
        description="راهنمای جامع Donauinselfest ۲۰۲۶ در وین: تاریخ، صحنه‌های موسیقی، نحوه دسترسی با مترو، نکات امنیتی و برنامه روزانه بزرگ‌ترین فستیوال رایگان اروپا."
        keywords="Donauinselfest, فستیوال دانوب, جزیره دانوب وین, فستیوال رایگان وین, Danube Island Festival, برنامه فستیوال وین, موسیقی اتریش, اتریش‌نشین"
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
                alt="فستیوال جزیره دانوب وین"
                className="w-full h-full object-cover opacity-[0.12]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              🎵
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
                  <PartyPopper className="w-3.5 h-3.5 text-amber-300" />
                  Donauinselfest 2026 • Wien
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  فستیوال جزیره دانوب وین
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  بزرگ‌ترین فستیوال موسیقی رایگان اروپا با بیش از ۲۰ صحنه، ۱۰۰+ هنرمند
                  و ۳ میلیون بازدیدکننده در سه روز. تجربه‌ای بی‌نظیر از موسیقی، غذا و
                  فرهنگ در قلب وین — ورود کاملاً رایگان برای همه.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>۱۰۰٪ رایگان</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Users className="w-3.5 h-3.5" />
                    <span>خانوادگی</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>سازگار با محیط‌زیست</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ========================================== */}
          {/* EVENT INFO GRID */}
          {/* ========================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {EVENT_INFO.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all overflow-hidden relative"
                >
                  <div
                    className={`absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br ${info.gradient} opacity-10 rounded-full`}
                  />
                  <div
                    className={`relative w-11 h-11 mx-auto rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white shadow-md mb-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="relative text-[10px] font-black text-stone-500">
                    {info.title}
                  </div>
                  <div className="relative text-sm font-black text-stone-900 mt-0.5">
                    {info.value}
                  </div>
                  <div className="relative text-[9px] text-stone-500 font-bold mt-0.5">
                    {info.sub}
                  </div>
                </motion.div>
              );
            })}
          </div>

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
          {/* INTRO OVERVIEW WITH IMAGE */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
          >
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={CROWD_IMAGE}
                  alt="جمعیت فستیوال دانوب"
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
                <Music className="w-6 h-6 mb-1" />
                <div className="text-[10px] font-black opacity-80">Donauinselfest</div>
                <div className="text-xs font-black">رایگان برای همه</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                درباره فستیوال
              </div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
                چرا Donauinselfest؟
              </h2>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                از سال ۱۹۸۴، Donauinselfest هر ساله در آخرین هفته ژوئن در جزیره
                دانوب برگزار می‌شود. این فستیوال با بیش از ۳ میلیون بازدیدکننده
                در طول سه روز، بزرگ‌ترین فستیوال موسیقی رایگان جهان است و
                بخشی از هویت فرهنگی وین شده است.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Music, text: "بیش از ۲۰ صحنه" },
                  { icon: Globe, text: "فرهنگ‌های جهانی" },
                  { icon: Utensils, text: "۱۵۰+ غرفه غذا" },
                  { icon: Baby, text: "برنامه کودکان" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                    >
                      <Icon className="w-4 h-4 text-[#c8102e] flex-shrink-0" />
                      <span className="text-[10px] font-black text-stone-700">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* DAY SCHEDULE */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                برنامه سه روز فستیوال
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                هر روز حال‌وهوای خاص خود را دارد
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DAY_SCHEDULE.map((day, i) => {
                const Icon = day.icon;
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
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${day.color} opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.16] transition-opacity`}
                    />

                    <div className="relative flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${day.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-black text-stone-900">
                          {day.day}
                        </div>
                        <div className="text-[10px] font-mono text-stone-500">
                          {day.date}
                        </div>
                      </div>
                    </div>

                    <h3 className="relative font-black text-stone-900 text-sm mb-2">
                      {day.theme}
                    </h3>
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                      {day.highlight}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* STAGES */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Mic2 className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                صحنه‌ها و مناطق فستیوال
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                شش منطقه اصلی برای هر سلیقه و سنی
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group"
                  >
                    <div
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stage.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative font-black text-stone-900 text-sm mb-2">
                      {stage.title}
                    </h3>
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                      {stage.text}
                    </p>
                    <div className="relative flex flex-wrap gap-1.5">
                      {stage.genres.map((g, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center text-[9px] font-black text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* ACCESS ROUTES */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative mb-6">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                چگونه به فستیوال برویم؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار روش دسترسی با مزایا و معایب
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCESS_ROUTES.map((route, i) => {
                const Icon = route.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl border border-indigo-100 p-5 relative"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${route.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-black text-stone-900 text-sm">
                            {route.title}
                          </h3>
                          {route.badge && (
                            <span
                              className={`inline-flex items-center text-[9px] font-black px-2 py-0.5 rounded-full ${
                                route.badge === "توصیه‌شده"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : route.badge === "سالم‌ترین"
                                  ? "bg-sky-100 text-sky-700"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {route.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                          {route.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* FOOD VILLAGE */}
          {/* ========================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full text-[10px] font-black text-amber-700 mb-3">
                <Utensils className="w-3.5 h-3.5" />
                تجربه غذایی
              </div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
                دهکده غذایی و نوشیدنی
              </h2>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                بیش از ۱۵۰ غرفه غذایی، از آشپزی سنتی اتریشی (Schnitzel, Würstel)
                تا غذاهای بین‌المللی از سراسر جهان. گزینه‌های وگان، گیاهی و
                حلال نیز در دسترس هستند. تمام قیمت‌ها منصفانه و تحت نظارت
                شهر وین است.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Utensils, text: "غذای اتریشی" },
                  { icon: Globe, text: "آشپزی جهانی" },
                  { icon: Leaf, text: "وگان و گیاهی" },
                  { icon: Beer, text: "نوشیدنی محلی" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                    >
                      <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="text-[10px] font-black text-stone-700">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={FOOD_IMAGE}
                  alt="غذاهای فستیوال دانوب"
                  className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-4 shadow-xl">
                <Utensils className="w-6 h-6 mb-1" />
                <div className="text-[10px] font-black opacity-80">غرفه غذایی</div>
                <div className="text-xs font-black">۱۵۰+</div>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* TIPS */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                نکات کاربردی برای بازدید
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                شش نکته برای تجربه بهتر و امن‌تر
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TIPS.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl border border-stone-200 p-5 relative overflow-hidden group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-stone-900 text-xs mb-1">
                          {tip.title}
                        </h3>
                        <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                          {tip.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* HIGHLIGHTS */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                چرا این فستیوال را از دست ندهیم؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار دلیل که این رویداد را منحصربه‌فرد می‌کند
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {HIGHLIGHTS.map((h, i) => {
                const Icon = h.icon;
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
                      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${h.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="relative font-black text-stone-900 text-sm mb-2">
                      {h.title}
                    </h3>
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                      {h.text}
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
                پاسخ به پرتکرارترین سوالات بازدیدکنندگان
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
                نکات مهم امنیتی
              </h5>
              <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>در روزهای گرم آب کافی همراه داشته باشید و از کم‌آبی جلوگیری کنید.</li>
                <li>اشیا گران‌بها را همراه نبرید؛ در جمعیت زیاد ممکن است گم شوند.</li>
                <li>در صورت گم شدن در جمعیت، نقطه قرار مشخص با همراهان تعیین کنید.</li>
                <li>برای کودکان، دستبند شناسایی با شماره تماس والدین تهیه کنید.</li>
                <li>در صورت احساس ناخوشی، به تیم پزشکی مستقر در محل مراجعه کنید.</li>
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
                <HeartHandshake className="w-3.5 h-3.5 text-amber-300" />
                کنار شما در وین
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">
                سوالی درباره فستیوال دارید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره Donauinselfest،
                اقامت، مسیرهای دسترسی و هر موضوع دیگر در وین است.
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
                اطلاعات این راهنما بر اساس منابع رسمی Donauinselfest و شهر وین
                تهیه شده است. برنامه دقیق هنرمندان، صحنه‌ها و زمان‌بندی ممکن
                است نزدیک به تاریخ رویداد تغییر کند. برای آخرین اطلاعات، به
                وب‌سایت رسمی donauinselfest.at مراجعه کنید. اتریش‌نشین یک
                پلتفرم مستقل و داوطلبانه است و مسئولیتی در قبال تغییرات
                احتمالی رویداد نمی‌پذیرد.
              </p>
            </div>
          </div>
        </div>
      </div>
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

export default DanubeFestivalGuide;