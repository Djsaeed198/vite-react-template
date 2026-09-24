import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Ticket, Music, Clock, Euro, Users, Star, Award, Heart,
  CheckCircle, Info, ChevronDown, Sparkles, Zap, MapPin,
  PhoneCall, Send, Globe, Calendar, AlertCircle, Flame,
  Eye, Landmark, Building2, Coffee, Timer, Wallet, Percent,
  Theater, Mic2, Crown, Armchair, TicketCheck, Banknote,
  ArrowUpRight, BookOpen, TrendingUp, Quote, Shield, CircleDollarSign,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna Opera themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=1600&q=80",
  interior: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80",
  stage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
  crowd: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type AreaId = "parterre" | "balcony" | "balcony-view";

type Area = {
  id: AreaId;
  name: string;
  nameDe: string;
  price: string;
  capacity: number;
  view: string;
  crowd: string;
  vibe: string;
  icon: any;
  gradient: string;
  color: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  recommended?: boolean;
};

// ==========================================
// STANDING AREAS DATA
// ==========================================
const AREAS: Area[] = [
  {
    id: "parterre",
    name: "پارتر (طبقه همکف)",
    nameDe: "Parterre Stehplätze",
    price: "€۱۳",
    capacity: 250,
    view: "دید عالی به صحنه، نزدیک به ارکستر",
    crowd: "شلوغ‌ترین و پرانرژی‌ترین",
    vibe: "صف طولانی، پر از عاشقان واقعی اپرا، تشویق‌های پرشور",
    icon: Theater,
    gradient: "from-[#c8102e] to-[#970d22]",
    color: "text-[#c8102e]",
    pros: [
      "بهترین دید به صحنه و ارکستر",
      "حس واقعی «اپرا زنده» با تشویق‌های پرشور",
      "دسترسی سریع به بوفه در اینتراکت",
    ],
    cons: [
      "شلوغ‌ترین بخش — صف از ۲ ساعت قبل پر می‌شود",
      "فضای محدود بین ایستگاه‌ها",
      "اگر قد بلندی ندارید، ممکن است دید مسدود شود",
    ],
    bestFor: "عاشقان واقعی اپرا که می‌خواهند نزدیک صحنه باشند",
    recommended: true,
  },
  {
    id: "balcony",
    name: "بالکن مرکزی",
    nameDe: "Balkon Stehplätze (Mitte)",
    price: "€۱۳",
    capacity: 120,
    view: "دید مرکزی به صحنه از بالا",
    crowd: "متوسط — آرام‌تر از پارتر",
    vibe: "دید پانورامیک، فضای تنفس بیشتر",
    icon: Crown,
    gradient: "from-indigo-600 to-purple-700",
    color: "text-indigo-700",
    pros: [
      "دید پانورامیک کامل به صحنه",
      "فضای کمتر شلوغ نسبت به پارتر",
      "می‌توان روی نرده تکیه داد و راحت ایستاد",
    ],
    cons: [
      "فاصله بیشتر از صحنه (جزئیات کمتر)",
      "صدای ارکستر ممکن است تا حدودی دیرتر برسد",
    ],
    bestFor: "کسانی که اولویت‌شان راحتی و دید کامل است",
  },
  {
    id: "balcony-view",
    name: "بالکن کناری",
    nameDe: "Balkon Stehplätze (Seite)",
    price: "€۱۳",
    capacity: 197,
    view: "دید جزئی — برخی بخش‌های صحنه پنهان",
    crowd: "کم‌ترین شلوغی بین سه بخش",
    vibe: "آرام، اغلب فضای خالی موجود است",
    icon: Eye,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    pros: [
      "کمترین صف و راحت‌ترین دسترسی",
      "معمولاً تا دقایق آخر هم بلیت موجود است",
      "مناسب برای تجربه اول اپرا",
    ],
    cons: [
      "بخشی از صحنه پنهان می‌ماند",
      "برای اپراهای پرجزئیات توصیه نمی‌شود",
    ],
    bestFor: "تجربه اول، بودجه محدود، یا خرید لحظه آخر",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "€۱۳", label: "قیمت هر بلیت ایستاده", icon: Euro },
  { value: "۵۶۷", label: "بلیت ایستاده در هر اجرا", icon: Users },
  { value: "۸۰ دقیقه", label: "پیش از اجرا، شروع فروش", icon: Clock },
  { value: "€۲۵۰+", label: "قیمت بلیت صندلی استاندارد", icon: TrendingUp },
];

// ==========================================
// TIMELINE
// ==========================================
const TIMELINE = [
  {
    time: "۳ ساعت قبل",
    title: "شروع صف",
    desc: "برای اپراهای محبوب (کارمن، لا تراویاتا، فلوت جادویی)، صف از ۲-۳ ساعت قبل شروع می‌شود.",
    icon: Clock,
    color: "from-amber-500 to-orange-600",
  },
  {
    time: "۹۰ دقیقه قبل",
    title: "دسترسی به ساختمان",
    desc: "ورودی صف ایستاده در سمت Opernring (خیابان رینگ) باز می‌شود. صف به داخل هدایت می‌شود.",
    icon: Building2,
    color: "from-sky-500 to-blue-600",
  },
  {
    time: "۸۰ دقیقه قبل",
    title: "شروع فروش بلیت",
    desc: "باجه Stehkassa شروع به فروش بلیت‌های €۱۳ می‌کند. فقط پول نقد پذیرفته می‌شود.",
    icon: Ticket,
    color: "from-emerald-500 to-teal-600",
  },
  {
    time: "بلافاصله",
    title: "رزرو جای ایستاده",
    desc: "به محض دریافت بلیت، با شال، کمربند یا کاغذ جای خود را روی نرده علامت بزنید (روش سنتی 'Schal-Trick').",
    icon: Heart,
    color: "from-rose-500 to-red-600",
  },
  {
    time: "۳۰ دقیقه قبل",
    title: "ورود به سالن",
    desc: "سالن باز می‌شود. کافه‌ها و فروشگاه‌های داخل اپرا نیز فعال می‌شوند.",
    icon: Music,
    color: "from-violet-500 to-purple-600",
  },
  {
    time: "دقیقه صفر",
    title: "شروع اجرا",
    desc: "پرده بالا می‌رود. موبایل‌ها خاموش، سکوت کامل. تجربه‌ای فراموش‌نشدنی شروع می‌شود.",
    icon: Theater,
    color: "from-[#c8102e] to-[#970d22]",
  },
];

// ==========================================
// TIPS
// ==========================================
const TIPS = [
  {
    icon: Banknote,
    title: "فقط پول نقد",
    desc: "باجه ایستاده فقط یورو نقدی می‌پذیرد. حتماً مبلغ خرد آماده کنید — معمولاً €۱۳ یا €۲۶ برای دو نفر.",
  },
  {
    icon: Heart,
    title: "ترفند شال (Schal-Trick)",
    desc: "بعد از گرفتن بلیت، فوراً با شال، کیف یا کمربند جای خود را روی نرده علامت بزنید. اگر خودتان نباشید، کسی جایتان را نمی‌گیرد.",
  },
  {
    icon: Users,
    title: "زوج‌ها در صف",
    desc: "اگر با کسی می‌روید، یکی در صف بماند و دیگری جای مورد نظر را در پارتر رزرو کند.",
  },
  {
    icon: Timer,
    title: "اینتراکت را از دست ندهید",
    desc: "در بین پرده‌ها، بوفه اپرا سرویس‌های سبک و نوشیدنی سرو می‌کند. فرصت عالی برای گشت در سالن.",
  },
  {
    icon: Coffee,
    title: "کافه‌های اپرا",
    desc: "کافه‌ی سنا در طبقه بالا و کافه‌ی بار طبقه پایین، مکانی عالی برای انتظار قبل از اجرا هستند.",
  },
  {
    icon: Calendar,
    title: "روزهای خلوت",
    desc: "اپراهای کمتر شناخته‌شده (مثل آثار ریچارد اشتراوس یا آلبان برگ) معمولاً صف کمتری دارند.",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "قیمت بلیت‌های ایستاده اپرای وین چقدر است؟",
    a: "تمام بلیت‌های ایستاده (Stehplätze) در اپرای دولتی وین (Wiener Staatsoper) قیمت یکسان €۱۳ دارند، بدون توجه به نوع اپرا، زمان اجرا یا طبقه. این قیمت شامل مالیات می‌شود و از سال ۲۰۲۵ به بعد ثابت مانده است.",
  },
  {
    q: "کی باید در صف بایستم تا بلیت بگیرم؟",
    a: "بلیت‌های ایستاده فقط ۸۰ دقیقه قبل از شروع اجرا و فقط در باجه Stehkassa (سمت Opernring) فروخته می‌شوند. برای اپراهای محبوب مثل کارمن، فلوت جادویی یا لا تراویاتا، توصیه می‌شود ۲ تا ۳ ساعت قبل در صف باشید. برای اپراهای کمتر شناخته‌شده، ۱ ساعت کافی است.",
  },
  {
    q: "تفاوت پارتر و بالکن در بلیت‌های ایستاده چیست؟",
    a: "پارتر (Parterre) در طبقه همکف و نزدیک به صحنه و ارکستر است — شلوغ‌تر اما پرانرژی و با دید عالی. بالکن مرکزی (Balkon Mitte) دید پانورامیک از بالا ارائه می‌دهد و آرام‌تر است. بالکن کناری (Balkon Seite) کم‌ترین صف را دارد اما بخشی از صحنه ممکن است پنهان بماند.",
  },
  {
    q: "آیا می‌توانم بلیت ایستاده را آنلاین بخرم؟",
    a: "خیر. بلیت‌های ایستاده اپرای وین صرفاً به صورت حضوری در باجه Stehkassa فروخته می‌شوند. این یک سنت دیرینه است که حس 'تجربه جمعی' را زنده نگه می‌دارد. اما بلیت‌های صندلی را می‌توان آنلاین از وب‌سایت رسمی خریداری کرد.",
  },
  {
    q: "آیا با بلیت ایستاده می‌توانم در طول اجرا بنشینم؟",
    a: "خیر، ایستاده به معنای ایستاده است! با این حال، در پشت نرده‌های ایستاده نرده‌های چرمی مخصوصی وجود دارد که می‌توانید به آن‌ها تکیه دهید. جالب است که برخی از صندلی‌های خالی در طول اجرا (وقتی کسی نمی‌آید) می‌توانند به ایستاده‌ها داده شوند — این 'Nachrücken' نام دارد.",
  },
  {
    q: "ترفند شال (Schal-Trick) چیست؟",
    a: "یک سنت بین‌المللی در اپرای وین. پس از گرفتن بلیت ایستاده، با شال، کمربند، روسری یا حتی یک تکه کاغذ، جای خود را روی نرده علامت می‌زنید. این علامت به دیگران نشان می‌دهد که جای شما رزرو شده است. حتی اگر بروید کافه یا دستشویی، کسی جای شما را نمی‌گیرد.",
  },
  {
    q: "آیا در تمام اجراها بلیت ایستاده فروخته می‌شود؟",
    a: "تقریباً همیشه بله. اما در اجراهای افتتاحیه فصل، گالاهای ویژه یا اجراهای VIP، ممکن است تعداد محدودی بلیت ایستاده در دسترس باشد. برای این اجراها، بهتر است صندلی رزرو کنید.",
  },
  {
    q: "بعد از اجرا چطور به خانه برگردم؟",
    a: "ایستگاه‌های مترو Karlsplatz (U1, U2, U4) و Stephansplatz (U1, U3) در فاصله ۵ دقیقه پیاده از اپرا هستند. در شب‌های اجرا، مترو وین تا حدود ۱۲:۳۰ فعال است. برای شب‌های دیرتر، از اتوبوس‌های شبانه (Nightline) استفاده کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const OperaStandingTicketGuide: React.FC = () => {
  const [activeArea, setActiveArea] = useState<AreaId>("parterre");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeAreaData = useMemo(
    () => AREAS.find((a) => a.id === activeArea)!,
    [activeArea]
  );

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای کامل خرید بلیت ایستاده اپرای دولتی وین (Stehplatz)",
      description:
        "راهنمای گام‌به‌گام خرید بلیت‌های ایستاده اپرا در وین با قیمت €۱۳ — زمان‌بندی صف، انتخاب پارتر یا بالکن و ترفندهای حرفه‌ای.",
      inLanguage: "fa-IR",
      totalTime: "PT3H",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: 13 },
      step: [
        { "@type": "HowToStep", position: 1, name: "برنامه اپرا را از وب‌سایت رسمی Staatsoper بررسی کنید" },
        { "@type": "HowToStep", position: 2, name: "۲ تا ۳ ساعت قبل از اجرا در صف Stehkassa حاضر شوید" },
        { "@type": "HowToStep", position: 3, name: "به محض دریافت بلیت €۱۳، جای خود را با شال رزرو کنید" },
        { "@type": "HowToStep", position: 4, name: "در سالن به نرده تکیه دهید و تجربه اپرا را آغاز کنید" },
        { "@type": "HowToStep", position: 5, name: "در بین پرده‌ها به بوفه یا کافه‌های اپرا سر بزنید" },
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
      "@type": "Article",
      headline: "بلیت‌های ایستاده اپرای وین — راهنمای €۱۳ در قلب اروپا",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      },
      inLanguage: "fa-IR",
      datePublished: "2025-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
  ];

  return (
    <GuideContainer
      title="راهنمای بلیت‌های ایستاده اپرای وین"
      description="ترفند خرید بلیت‌های ایستاده €۱۳ برای اپرای دولتی وین (Wiener Staatsoper) — زمان‌بندی صف، انتخاب بخش و نکات حرفه‌ای"
    >
      <SEO
        title="بلیت ایستاده اپرای وین ۲۰۲۶ | راهنمای کامل Stehplatz €۱۳"
        description="راهنمای کامل خرید بلیت‌های ایستاده (Stehplatz) اپرای دولتی وین با قیمت فقط €۱۳. زمان‌بندی صف، تفاوت پارتر و بالکن، ترفند شال و تجربه اول اپرا در وین."
        keywords="بلیت ایستاده اپرا وین, Stehplatz Wiener Staatsoper, اپرای دولتی وین, بلیت ارزان اپرا, Staatsoper Stehplatz, ترفند شال اپرا, اپرا در وین, بلیت اپرا €13"
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
              "radial-gradient(80% 150% at 90% 0, #7f1d1d 0, #3f0a0a 48%, #1a0505 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <img
              src={IMAGES.hero}
              alt="اپرای دولتی وین"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1a0505]/90 via-[#3f0a0a]/75 to-[#7f1d1d]/55" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🎭
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای ویژه اپرای دولتی وین
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              با فقط €۱۳ در اپرای افسانه‌ای وین حاضر شوید
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              درحالی‌که بلیت‌های صندلی اپرای دولتی وین (Wiener Staatsoper) به
              <strong className="text-amber-300"> €۲۵۰ تا €۴۰۰</strong> می‌رسند،
              بلیت‌های ایستاده (Stehplätze) با قیمت ثابت
              <strong className="text-amber-300"> فقط €۱۳</strong> فرصتی است که هر
              عاشق موسیقی کلاسیک باید یکبار تجربه کند. این راهنما، تمام رازها و
              ترفندهای این سنت دیرینه را به شما می‌آموزد.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>قیمت ثابت €۱۳</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>۵۶۷ جای ایستاده</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجربه واقعی ساکنان وین</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#areas"
                className="inline-flex items-center gap-2 bg-white text-[#7f1d1d] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Theater className="w-4 h-4" />
                انتخاب بخش ایستاده
              </a>
              <a
                href="https://www.wiener-staatsoper.at/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Globe className="w-4 h-4" />
                برنامه اجراهای اپرا
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-red-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#c8102e]" />
                </div>
                <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* WHY IT'S A SECRET */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Quote className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-700 mb-1">
                راز محبوب ساکنان وین
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-amber-700">اپرای دولتی وین یکی از معدود اپراهای جهان است که هنوز سنت «ایستاده» را
                با قیمت نمادین زنده نگه داشته.</strong> طرفداران واقعی اپرا — نه توریست‌ها —
                ساعتها در صف می‌ایستند تا تجربه‌ای خالص و بی‌واسطه را در قلب موسیقی
                کلاسیک جهان داشته باشند. بسیاری از خوانندگان بزرگ اپرا، اولین اجراهای
                بین‌المللی خود را در همین صف‌ها دیده‌اند.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* STANDING AREAS */}
        {/* ========================================== */}
        <div id="areas" className="scroll-mt-24">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Theater className="w-5 h-5 text-[#c8102e]" />
              سه بخش ایستاده در اپرای وین — کدام را انتخاب کنید؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              همه قیمت €۱۳ — تفاوت در تجربه است
            </p>
          </div>

          {/* Area tabs */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {AREAS.map((a) => {
              const Icon = a.icon;
              const isActive = activeArea === a.id;
              return (
                <motion.button
                  key={a.id}
                  onClick={() => setActiveArea(a.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-3 text-center transition-all ${
                    isActive
                      ? "border-[#c8102e] shadow-lg shadow-red-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  {a.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      محبوب
                    </div>
                  )}
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-black text-stone-900 leading-tight">{a.name}</div>
                  <div className={`text-[10px] font-black mt-1 ${isActive ? a.color : "text-stone-500"}`}>
                    {a.price}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active area detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 md:h-auto min-h-[340px] overflow-hidden">
                  <img
                    src={
                      activeArea === "parterre"
                        ? IMAGES.stage
                        : activeArea === "balcony"
                        ? IMAGES.interior
                        : IMAGES.crowd
                    }
                    alt={activeAreaData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeAreaData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <Users className="w-3 h-3 text-[#c8102e]" />
                    {activeAreaData.capacity} جای ایستاده
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">قیمت ثابت</div>
                    <div className="text-3xl font-black text-white leading-tight font-mono" dir="ltr">
                      {activeAreaData.price}
                    </div>
                    <div className="text-[9px] text-white/70 font-bold mt-0.5">{activeAreaData.nameDe}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeAreaData.color} mb-3`}>
                    <Star className="w-3 h-3 fill-current" />
                    بخش ایستاده
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-3 leading-tight">
                    {activeAreaData.name}
                  </h3>

                  {/* View + Crowd info */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Eye className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">دید</div>
                      <div className="text-[10px] font-black text-stone-800 leading-tight">
                        {activeAreaData.view}
                      </div>
                    </div>
                    <div className="bg-stone-50 border border-stone-100 rounded-2xl p-3">
                      <Users className="w-4 h-4 text-stone-500 mb-1" />
                      <div className="text-[9px] text-stone-500 font-bold">شلوغی</div>
                      <div className="text-[10px] font-black text-stone-800 leading-tight">
                        {activeAreaData.crowd}
                      </div>
                    </div>
                  </div>

                  {/* Vibe */}
                  <div className="bg-gradient-to-br from-stone-50 to-amber-50/50 border border-stone-100 rounded-2xl p-3 mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-1 flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      اتمسفر بخش
                    </div>
                    <div className="text-[11px] text-stone-700 font-bold leading-relaxed">
                      {activeAreaData.vibe}
                    </div>
                  </div>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700 mb-2">
                        <CheckCircle className="w-3.5 h-3.5" />
                        مزایا
                      </div>
                      <ul className="space-y-1">
                        {activeAreaData.pros.map((p, i) => (
                          <li key={i} className="text-[10px] text-emerald-800 font-bold leading-snug">
                            • {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-700 mb-2">
                        <AlertCircle className="w-3.5 h-3.5" />
                        محدودیت‌ها
                      </div>
                      <ul className="space-y-1">
                        {activeAreaData.cons.map((p, i) => (
                          <li key={i} className="text-[10px] text-rose-800 font-bold leading-snug">
                            • {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Best for */}
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 flex items-start gap-2">
                    <Users className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-sky-700 mb-0.5">
                        مناسب برای:
                      </div>
                      <div className="text-[10px] text-sky-800 font-bold leading-snug">
                        {activeAreaData.bestFor}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* TIMELINE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Timer className="w-5 h-5 text-[#c8102e]" />
              تایم‌لاین یک شب اپرا — از صف تا تشویق پایانی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دقیقاً چه اتفاقی می‌افتد و در چه ساعتی
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-gradient-to-b from-amber-300 via-rose-300 to-[#c8102e]/40 hidden md:block" />

            <div className="space-y-3">
              {TIMELINE.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative bg-white rounded-2xl border border-stone-200 p-4 md:mr-16 hover:shadow-md transition-all group"
                  >
                    {/* Dot on timeline */}
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-[58px] w-10 h-10 rounded-full bg-white border-4 border-stone-100 items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className={`md:hidden w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                          <h3 className="text-xs font-black text-stone-900">{t.title}</h3>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-white bg-gradient-to-br from-stone-800 to-stone-900 px-2.5 py-1 rounded-full font-mono" dir="ltr">
                            <Clock className="w-3 h-3" />
                            {t.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* INSIDER TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی که فقط حرفه‌ای‌ها می‌دانند
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ترفندهای تجربه‌شده‌ی ساکنان وین برای تجربه‌ی بی‌نقص اپرا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className="bg-white rounded-2xl border border-stone-200 p-4 hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold leading-relaxed">
                    {tip.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* 3 IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" />
              یک شب اپرا در سه قاب
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از معماری باشکوه سالن تا لحظه‌های فراموش‌نشدنی روی صحنه
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.hero,
                title: "عمارت اپرای وین",
                subtitle: "شاهکار معماری ۱۸۶۹",
                desc: "ساختمان اپرای دولتی وین یکی از زیباترین بناهای تاریخی اروپا و قلب فرهنگی پایتخت موسیقی جهان است.",
                icon: Landmark,
                gradient: "from-[#c8102e] to-[#970d22]",
                stat: "۱۵۰+ سال",
              },
              {
                img: IMAGES.interior,
                title: "سالن اصلی",
                subtitle: "شکوه نئو-رنسانس",
                desc: "سالن اپرا با ظرفیت ۱۷۰۹ صندلی و ۵۶۷ جای ایستاده، هر شب میزبان بزرگ‌ترین ستارگان موسیقی کلاسیک است.",
                icon: Music,
                gradient: "from-indigo-600 to-purple-700",
                stat: "۲۲۷۶ نفر",
              },
              {
                img: IMAGES.stage,
                title: "صحنه جادویی",
                subtitle: "جایی که افسانه‌ها متولد می‌شوند",
                desc: "بسیاری از بزرگ‌ترین خوانندگان اپرا اولین اجرای بین‌المللی خود را روی همین صحنه انجام داده‌اند.",
                icon: Mic2,
                gradient: "from-amber-500 to-orange-600",
                stat: "۳۰۰+ اجرا در سال",
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
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-45 mix-blend-multiply`} />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                      <Icon className="w-5 h-5 text-stone-800" />
                    </div>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-black text-white">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {c.stat}
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
        {/* SAVINGS COMPARISON */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-lg">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900">
                  تفاوت قیمت‌ها شگفت‌انگیز است
                </h3>
                <p className="text-[10px] text-stone-500 font-bold">
                  مقایسه بلیت ایستاده با بلیت‌های صندلی در اپرای وین
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "ایستاده پارتر/بالکن", price: "€۱۳", color: "from-emerald-600 to-green-700", note: "همان اجرا، همان صحنه" },
                { label: "صندلی ردیف بالا", price: "€۵۵ تا €۹۰", color: "from-amber-500 to-orange-600", note: "دید محدود از بالا" },
                { label: "صندلی پارتر یا VIP", price: "€۲۵۰ تا €۴۰۰", color: "from-rose-600 to-red-700", note: "بهترین دید از نزدیک" },
              ].map((p, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.color} p-5 text-white`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="text-[10px] font-black text-white/70 mb-2">
                      {p.label}
                    </div>
                    <div className="text-3xl font-black mb-1 font-mono" dir="ltr">
                      {p.price}
                    </div>
                    <div className="text-[10px] font-bold text-white/80">
                      {p.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-stone-800 font-bold leading-relaxed">
                <strong className="text-emerald-700">صرفه‌جویی تا ۹۷٪!</strong> با پرداخت فقط €۱۳، همان
                اجرای افسانه‌ای را می‌بینید که یک بلیت VIP آن €۲۵۰ تا €۴۰۰ قیمت دارد. تنها
                تفاوت: نبودن صندلی — که با تکیه دادن به نرده‌های چرمی اپرا، حتی
                می‌تواند راحت‌تر از صندلی‌های فشرده ردیف‌های بالا باشد.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره بلیت‌های ایستاده اپرا
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0505] via-[#3f0a0a] to-[#7f1d1d] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Theater className="w-3.5 h-3.5 text-amber-300" />
              همراهی در اولین تجربه اپرا
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              برای اولین بار به اپرا می‌روید؟
            </h2>

            <p className="text-sm text-stone-200 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین می‌تواند بهترین زمان مراجعه، انتخاب اپرا برای
              شروع و برنامه‌ریزی کامل شب شما را راهنمایی کند. همین حالا پیام دهید.
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

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-300 flex-wrap">
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
              اطلاعات این راهنما بر اساس رویه‌های جاری اپرای دولتی وین (Wiener Staatsoper) در
              سال ۲۰۲۵–۲۰۲۶ تهیه شده است. قیمت‌ها، زمان‌بندی و شرایط فروش بلیت ایستاده ممکن
              است توسط اپرا تغییر کند. برای اطلاعات قطعی، همیشه وب‌سایت رسمی
              wiener-staatsoper.at را بررسی کنید.
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
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
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

export default OperaStandingTicketGuide;