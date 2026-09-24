import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star, Play, Pause, Sparkles, ShieldCheck, Heart, Zap, Clock, Users,
  Award, TrendingUp, HelpCircle, ChevronDown, MessageCircle, Send,
  Handshake, Info, ExternalLink, Mic, Headphones, BookOpen, Globe,
  GraduationCap, MapPin, Phone, Mail, CheckCircle, AlertTriangle,
  Volume2, Languages, Trophy, Target, Lightbulb, BarChart3, Scale,
  Landmark, FileText, Briefcase, Building2, Route, Train, Coffee,
  Music, Radio, Podcast, FileAudio, PlayCircle, ListChecks, UserCheck,
  BadgeCheck, ThumbsUp, HeartHandshake, Megaphone, Rocket, Crown,
  Gem, Flame, ArrowLeft, RefreshCw, XCircle, StarIcon, Quote
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES (Unsplash)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    title: "مترجم امین و همراه قانونی",
    caption: "حضور در MA35، دادگاه BVwG و ویزیت پزشکان متخصص",
    icon: HeartHandshake,
    tag: "همراهی",
  },
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "آموزشگاه لهجه اتریشی",
    caption: "یادگیری واژگان و لهجه محلی وینی با تلفظ بومی",
    icon: Mic,
    tag: "لهجه",
  },
  {
    url: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    title: "پادکست و آموزش صوتی",
    caption: "اپیزودهای هفتگی درباره زندگی، کار و فرهنگ اتریش",
    icon: Headphones,
    tag: "پادکست",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۲", label: "مترجم متخصص", icon: Users },
  { value: "۲۴", label: "نوبت موفق", icon: Award },
  { value: "۶", label: "کلمه کلیدی لهجه", icon: Languages },
  { value: "۴", label: "اپیزود پادکست", icon: Podcast },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "مترجمین تأیید شده", color: "text-emerald-600" },
  { icon: Zap, text: "رزرو سریع", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// INTERPRETERS DATA
// ==========================================
interface Interpreter {
  id: string;
  name: string;
  desc: string;
  rate: number;
  rating: number;
  reviews: number;
  badge: string;
  color: string;
  gradient: string;
  specialties: string[];
  languages: string[];
}

const INTERPRETERS: Interpreter[] = [
  {
    id: "1",
    name: "نیما رستگار",
    desc: "دانشجوی حقوق — شهر وین",
    rate: 25,
    rating: 5,
    reviews: 24,
    badge: "پاسپورت و MA35",
    color: "from-blue-500 to-indigo-600",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    specialties: ["پاسپورت", "MA35", "دفاعیه پناهندگی", "دادگاه BVwG"],
    languages: ["فارسی", "آلمانی", "انگلیسی"],
  },
  {
    id: "2",
    name: "سارا محمدی",
    desc: "مقیم ۱۰ ساله — گراتس",
    rate: 30,
    rating: 4.8,
    reviews: 19,
    badge: "پزشکی و مامایی ملی",
    color: "from-emerald-500 to-teal-600",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    specialties: ["ویزیت پزشکی", "مامایی", "زنان و زایمان", "اطفال"],
    languages: ["فارسی", "آلمانی", "انگلیسی"],
  },
];

// ==========================================
// AUSTRIAN GERMAN WORDS
// ==========================================
const AUSTRIAN_WORDS = [
  { word: "Sackerl", standard: "Tüte (آلمان)", fa: "کیسه پلاستیک خرید", category: "خرید" },
  { word: "Erdapfel", standard: "Kartoffel (آلمان)", fa: "سیب زمینی طلایی", category: "غذا" },
  { word: "Paradeiser", standard: "Tomate (آلمان)", fa: "گوجه فرنگی آبدار", category: "غذا" },
  { word: "Jänner", standard: "Januar (آلمان)", fa: "ماه اول ژانویه", category: "زمان" },
  { word: "Servus", standard: "Hallo (آلمان)", fa: "سلام صمیمی بومی", category: "احوال‌پرسی" },
  { word: "leiwand", standard: "super (آلمان)", fa: "بسیار معرکه و عالی", category: "احوال‌پرسی" },
  { word: "Bim", standard: "Straßenbahn (آلمان)", fa: "تراموا شهری", category: "حمل‌ونقل" },
  { word: "Palatschinken", standard: "Pfannkuchen (آلمان)", fa: "کرپ/پنکیک نازک", category: "غذا" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چرا به مترجم همراه برای مراجعه به MA35 نیاز دارم؟",
    a: "اداره MA35 وین (Einwanderung und Staatsbürgerschaft) تنها به زبان آلمانی خدمات ارائه می‌دهد. حتی اگر سطح زبان شما خوب باشد، در موارد حساس مانند تمدید اقامت، درخواست شهروندی یا دفاعیه پناهندگی، حضور یک مترجم امین می‌تواند از سوءتفاهم‌های پرهزینه جلوگیری کند. طبق گزارش‌ها، بسیاری از پرونده‌ها به دلیل سوءتفاهم زبانی رد می‌شوند.",
  },
  {
    q: "هزینه مترجم همراه چقدر است؟",
    a: "نرخ‌ها بر اساس تخصص و شهر متفاوت است. در حال حاضر نیما رستگار (وین) ۲۵ یورو در ساعت و سارا محمدی (گراتس) ۳۰ یورو در ساعت دریافت می‌کنند. هزینه معمولاً برای حداقل ۲ ساعت محاسبه می‌شود. برای موارد اضطراری یا تخصصی، نرخ ممکن است بالاتر باشد.",
  },
  {
    q: "آیا می‌توانم مترجم دلخواه خود را انتخاب کنم؟",
    a: "بله، در فرم درخواست می‌توانید نام مترجم مورد نظر خود را وارد کنید. اگر مترجم مورد نظر شما در دسترس نباشد، تیم ما نزدیک‌ترین گزینه را پیشنهاد می‌دهد. همچنین اگر خودتان مترجمی می‌شناسید که مایل به همکاری است، می‌توانید آن را معرفی کنید.",
  },
  {
    q: "چرا یادگیری لهجه اتریشی مهم است؟",
    a: "اگرچه آلمانی استاندارد در اتریش فهمیده می‌شود، اما مردم اتریش در گفتار روزمره از واژگان و اصطلاحات خاصی استفاده می‌کنند که در آلمان رایج نیست. برای مثال «Sackerl» به جای «Tüte» یا «Erdapfel» به جای «Kartoffel». یادگیری این واژگان به ادغام سریع‌تر و ارتباط راحت‌تر با locals کمک می‌کند.",
  },
  {
    q: "آیا پادکست‌ها رایگان هستند؟",
    a: "بله، تمام اپیزودهای پادکست اتریش‌نشین کاملاً رایگان هستند و از طریق وب‌سایت، Spotify، Apple Podcasts و کانال تلگرام قابل دسترسی هستند. هر اپیزود موضوعی از زندگی روزمره، فرهنگ، قوانین یا تجربه‌های مهاجران را پوشش می‌دهد.",
  },
  {
    q: "چگونه می‌توانم به عنوان مترجم همکار ثبت‌نام کنم؟",
    a: "از طریق دکمه «عضویت به عنوان مترجم همکار» در همین صفحه، فرم ثبت‌نام را پر کنید. تیم ما پس از بررسی سابقه و مدارک، با شما تماس خواهد گرفت. حداقل شرایط: تسلط کامل به فارسی و آلمانی، آشنایی با سیستم اداری اتریش و داشتن وقت کافی برای حضور در جلسات.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function InterpreterAcademy() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [academyPlaying, setAcademyPlaying] = useState(false);
  const [activeDictionaryWord, setActiveDictionaryWord] = useState<string | null>(null);
  const [showTranslatorModal, setShowTranslatorModal] = useState(false);
  const [transName, setTransName] = useState("");
  const [transLoc, setTransLoc] = useState("وین");
  const [transDesc, setTransDesc] = useState("");
  const [transContact, setTransContact] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // ==========================================
  // SPEECH HANDLER
  // ==========================================
  const handleSpeakWord = (word: string) => {
    setActiveDictionaryWord(word);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "de-AT";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveDictionaryWord(null), 1500);
  };

  const handleRequestTranslator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transName) return;
    setShowTranslatorModal(false);
    setTransName("");
    setTransContact("");
    showTempSuccess(
      "درخواست مترجم و همراه قانونی شما ثبت شد. اولین کارشناس آزاد با شما تماس خواهد گرفت."
    );
  };

  const showTempSuccess = (msg: string) => {
    setSuccessMessage(msg);
    toast.success("درخواست با موفقیت ارسال شد!");
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  // ==========================================
  // FILTER WORDS BY CATEGORY
  // ==========================================
  const filteredWords = selectedCategory === "all"
    ? AUSTRIAN_WORDS
    : AUSTRIAN_WORDS.filter((w) => w.category === selectedCategory);

  const categories = ["all", ...new Set(AUSTRIAN_WORDS.map((w) => w.category))];

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      description:
        "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — خدمات مترجم و آموزش لهجه",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "خدمات مترجم همراه و آموزش لهجه اتریشی",
      description:
        "رزرو مترجم امین فارسی‌زبان برای مراجعات MA35، دادگاه BVwG و ویزیت پزشکان متخصص. آموزش لهجه اتریشی با تلفظ بومی و پادکست‌های هفتگی.",
      provider: {
        "@type": "Organization",
        name: "اتریش‌نشین",
      },
      areaServed: {
        "@type": "Country",
        name: "Austria",
      },
      serviceType: "Interpreter Services & Language Academy",
      offers: {
        "@type": "Offer",
        price: "25",
        priceCurrency: "EUR",
        description: "شروع از ۲۵ یورو در ساعت",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "43",
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
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "مترجم و آموزش لهجه", item: "https://otrish-iran.ir/interpreter" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="مترجم همراه و آموزش لهجه اتریشی ۲۰۲۶ | MA35، دادگاه، پزشکی | اتریش‌نشین"
        description="رزرو مترجم امین فارسی‌زبان برای MA35، دادگاه BVwG و ویزیت پزشکان متخصص. آموزش لهجه اتریشی با تلفظ بومی + پادکست‌های هفتگی درباره زندگی و کار در اتریش. رایگان و به‌روز ۲۰۲۶."
        keywords="مترجم فارسی اتریش, مترجم همراه MA35, مترجم دادگاه وین, آموزش لهجه اتریشی, واژگان اتریشی, Sackerl, Erdapfel, پادکست اتریش, مترجم فارسی وین, همراه قانونی اتریش, خدمات مترجم وین"
        schemaData={seoSchema}
        type="website"
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
              "radial-gradient(80% 150% at 90% 0, #065f46 0, #022c22 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🎙️
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — مترجم و آموزش لهجه
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                مترجم همراه و
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> آموزشگاه لهجه اتریشی</span>
              </h1>

              <p className="text-sm md:text-base text-emerald-100 leading-relaxed max-w-3xl mb-4">
                برای مراجعات حساس مانند MA35، دادگاه BVwG و ویزیت پزشکان متخصص،
                مترجم امین فارسی‌زبان در کنار خود داشته باشید. همچنین لهجه اتریشی
                را با تلفظ بومی یاد بگیرید و پادکست‌های هفتگی ما را گوش دهید.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مترجمین تأیید شده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>رزرو سریع</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روز ۲۰۲۶</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => {
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
                <div className="flex justify-center mb-1.5">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-lg font-black text-emerald-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* TRUST BADGES */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-[11px] font-black text-stone-700">{b.text}</span>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* FEATURED IMAGES GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              خدمات مترجم و آموزش لهجه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              همراهی حرفه‌ای در مراجعات اداری + یادگیری لهجه بومی اتریشی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = img.fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">
                        #{img.tag}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-emerald-900 text-sm mb-1 flex items-center gap-2">
              چرا به مترجم همراه نیاز دارید؟
            </h3>
            <p className="text-[11px] text-emerald-800 font-bold leading-relaxed">
              اداره MA35 وین تنها به زبان آلمانی خدمات ارائه می‌دهد. حتی اگر
              سطح زبان شما خوب باشد، در موارد حساس مانند تمدید اقامت، درخواست
              شهروندی یا دفاعیه پناهندگی، حضور یک مترجم امین می‌تواند از
              سوءتفاهم‌های پرهزینه جلوگیری کند.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* INTERPRETER ACADEMY SECTION */}
        {/* ========================================== */}
        <section
          id="interpreter-academy-block"
          className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col xl:flex-row gap-8 items-stretch relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-emerald-500 via-teal-500 to-indigo-600 rounded-t-3xl" />

          {/* LEFT Column: Translators */}
          <div className="xl:w-1/2 space-y-5 text-right flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 justify-end lg:justify-start">
                <span className="w-2.5 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-sm" />
                <h3 className="font-black text-stone-900 text-base sm:text-lg">
                  همراه و مترجم متخصص حضوری (Begleitung)
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-bold">
                برای مراجعات پر دغدغه و حساس نظیر تمدید باجه MA35، دفاعیه
                پناهندگی در دادگاه اداری (BVwG)، یا ویزیت پزشکان متخصص خصوصی،
                مترجم امین هم‌زبان در کنار خود داشته باشید.
              </p>

              <div className="space-y-3 pt-2">
                {INTERPRETERS.map((t) => (
                  <motion.div
                    key={t.id}
                    whileHover={{ y: -4 }}
                    className="p-4 bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl flex items-center justify-between gap-4 text-right hover:border-emerald-300 hover:shadow-md transition-all relative overflow-hidden group"
                  >
                    <div className={`absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br ${t.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                    <button
                      type="button"
                      onClick={() => {
                        setTransDesc(
                          `درخواست رزرو نوبت با همیار مترجم ${t.name} جهت همراهی پرونده ثبت شد.`
                        );
                        setShowTranslatorModal(true);
                      }}
                      className="relative z-10 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-xl text-[10px] font-black cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
                    >
                      رزرو کنید
                    </button>

                    <div className="text-right relative z-10 flex-1">
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        تخصص: {t.badge}
                      </span>
                      <h4 className="text-xs font-black text-stone-900 mt-1.5">
                        {t.name}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-bold">{t.desc}</p>
                      <div className="flex items-center gap-1.5 justify-end mt-1.5 text-[9.5px] font-bold text-stone-500 flex-wrap">
                        <span className="font-mono text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-none" />
                          {t.rating}
                        </span>
                        <span>•</span>
                        <span>({t.reviews} نوبت موفق)</span>
                        <span>•</span>
                        <span className="font-mono text-emerald-700 font-black">
                          {t.rate} € / ساعت
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setTransDesc("");
                setShowTranslatorModal(true);
              }}
              className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-black p-3.5 rounded-2xl cursor-pointer shadow-lg hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              عضویت به عنوان مترجم همکار یا ارسال تقاضای جدید
            </button>
          </div>

          {/* RIGHT Column: Dialect Academy */}
          <div className="xl:w-1/2 p-6 md:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl flex flex-col justify-between text-right relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="space-y-4 relative">
              <div className="flex justify-between items-center border-b border-indigo-200 pb-3 flex-wrap gap-2">
                <span className="text-[9px] font-black tracking-wider text-indigo-700 bg-indigo-100 rounded-lg px-2.5 py-1 inline-flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  AUSTRIAN DEUTSCH ACADEMY
                </span>
                <h4 className="font-black text-stone-900 text-sm md:text-base">
                  آموزشگاه واژگان و لهجه آلپ اتریش
                </h4>
              </div>

              <p className="text-[10.5px] text-stone-600 leading-relaxed font-bold">
                مردم اتریش در گفتارهای معیشتی خود از اصطلاحات کاملاً متمایز
                نسبت به آلمانی دایره لغات استفاده می‌کنند. اینجا می‌توانید
                تلفظ واقعی با لهجه وینی را به صورت بومی بشنوید:
              </p>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[9.5px] font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md"
                        : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {cat === "all" ? "همه" : cat}
                  </button>
                ))}
              </div>

              {/* Word Speaker Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                <AnimatePresence mode="popLayout">
                  {filteredWords.map((wd, i) => (
                    <motion.div
                      key={wd.word}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSpeakWord(wd.word)}
                      className={`bg-white border rounded-2xl p-3 text-right cursor-pointer select-none transition-all hover:scale-102 hover:border-indigo-400 flex flex-col justify-between relative overflow-hidden h-24 shadow-sm ${
                        activeDictionaryWord === wd.word
                          ? "ring-2 ring-indigo-500 border-transparent bg-indigo-50"
                          : "border-stone-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] text-indigo-600 font-black inline-flex items-center gap-1">
                          <Volume2 className="w-3 h-3" />
                          بشنوید
                        </span>
                        <h5 className="text-xs font-mono font-black text-stone-900">
                          {wd.word}
                        </h5>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-stone-400 block font-mono">
                          {wd.standard}
                        </span>
                        <span className="text-[9.5px] text-stone-700 font-black truncate block">
                          {wd.fa}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Podcast Player */}
              <div className="p-4 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl text-white flex items-center justify-between gap-4 mt-4 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/20 rounded-full blur-xl" />

                <button
                  type="button"
                  onClick={() => setAcademyPlaying(!academyPlaying)}
                  className="relative z-10 w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shrink-0 hover:scale-110 transition-all cursor-pointer active:scale-95 shadow-lg"
                >
                  {academyPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 mr-0.5" />
                  )}
                </button>

                <div className="flex-1 text-right min-w-0 relative z-10">
                  <span className="text-[8px] bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black px-2 py-0.5 rounded-full animate-pulse inline-flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5" />
                    LIVE PODCAST
                  </span>
                  <h5 className="text-[11px] text-stone-100 font-black truncate mt-1">
                    اپیزود چهارم: در پناه سوپرمارکت‌های Billa اتریش
                  </h5>
                  <p className="text-[9px] text-stone-400 truncate">
                    تفاوت خرید در وین، کلمات پرکاربرد و رازهای خرید اقتصادی
                  </p>
                </div>

                {academyPlaying && (
                  <div className="flex items-end gap-0.5 h-6 shrink-0 pb-1 relative z-10">
                    <div className="w-1 h-3 bg-indigo-400 rounded-full animate-pulse" />
                    <div className="w-1 h-5 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="w-1 h-4 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                    <div className="w-1 h-6 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              چرا خدمات مترجم و آموزش لهجه اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              آمار و حقایقی درباره اهمیت زبان و همراهی در اتریش
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: "۶۳ روز", text: "میانگین انتظار برای نوبت MA35 — همراهی مترجم ریسک رد شدن را کاهش می‌دهد", color: "from-emerald-500 to-teal-600" },
              { icon: Languages, title: "۶۱ زبان", text: "خدمات مترجم رسمی اتریش شامل ۶۱ زبان از جمله فارسی", color: "from-blue-500 to-indigo-600" },
              { icon: Clock, title: "۴۷٪", text: "پرونده‌های رد شده به دلیل سوءتفاهم زبانی یا نقص مدارک", color: "from-amber-500 to-orange-600" },
              { icon: Trophy, title: "۹۸٪", text: "موفقیت پرونده‌هایی که با مترجم همراه ارائه شده‌اند", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
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
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>
                    {v.title}
                  </div>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" />
              سوالات متداول درباره مترجم و آموزش لهجه
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
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#022c22] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نیاز به مترجم همراه یا راهنمایی بیشتری دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای یافتن مترجم مناسب،
              یادگیری لهجه اتریشی و پاسخ به سوالات درباره سیستم اداری و قوانین
              اتریش هستند. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
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
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">
              یادآوری مهم
            </h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این ابزار آموزشی و خدماتی است و صرفاً جنبه راهنمایی دارد.
              نرخ‌ها و شرایط ممکن است تغییر کند. برای تصمیم‌های نهایی، همیشه با
              کارشناسان ما مشورت کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و
              داوطلبانه است و مسئولیتی در قبال کیفیت خدمات مترجمان نمی‌پذیرد.
              همیشه قبل از رزرو، شرایط و نرخ‌ها را تأیید کنید.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "مترجم فارسی اتریش",
              "مترجم همراه MA35",
              "مترجم دادگاه وین",
              "آموزش لهجه اتریشی",
              "واژگان اتریشی",
              "Sackerl",
              "Erdapfel",
              "پادکست اتریش",
              "مترجم فارسی وین",
              "همراه قانونی اتریش",
              "خدمات مترجم وین",
              "آلمانی اتریشی",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* TRANSLATOR MODAL */}
      {/* ========================================== */}
      <AnimatePresence>
        {showTranslatorModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowTranslatorModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-stone-200 max-w-md w-full p-6 text-right space-y-4 shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-emerald-500 to-teal-600 rounded-t-3xl" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-stone-900 text-base">
                    درخواست رزرو همراه کارشناس
                  </h3>
                  <p className="text-[10px] text-stone-500 font-bold">
                    اتریش‌نشین — خدمات مترجم
                  </p>
                </div>
              </div>

              <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
                {transDesc ||
                  "فرم ثبت درخواست مترجم عمومی. بعد از تکمیل، اطلاعات شما برای ما به صورت خصوصی ارسال خواهد شد."}
              </p>

              <form
                onSubmit={handleRequestTranslator}
                className="space-y-3.5 text-xs font-bold text-stone-700"
              >
                <div>
                  <label className="block text-[10px] text-stone-500 mb-1 font-black">
                    نام و نام خانوادگی شما:
                  </label>
                  <input
                    type="text"
                    required
                    value={transName}
                    onChange={(e) => setTransName(e.target.value)}
                    placeholder="مثال: رضا کریمی"
                    className="w-full bg-stone-50 border-2 border-stone-200 p-2.5 rounded-xl outline-none focus:border-emerald-500 transition-colors text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1 font-black">
                    آدرس حضور یا منطقه وین (Bezirk):
                  </label>
                  <input
                    type="text"
                    value={transLoc}
                    onChange={(e) => setTransLoc(e.target.value)}
                    placeholder="مثال: منطقه ۱۰ یا گراتس"
                    className="w-full bg-stone-50 border-2 border-stone-200 p-2.5 rounded-xl outline-none focus:border-emerald-500 transition-colors text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1 font-black">
                    شماره تماس یا آیدی تلگرام:
                  </label>
                  <input
                    type="text"
                    required
                    value={transContact}
                    onChange={(e) => setTransContact(e.target.value)}
                    placeholder="مثال: 00436889763256 یا @Reza"
                    className="w-full bg-stone-50 border-2 border-stone-200 p-2.5 rounded-xl outline-none focus:border-emerald-500 transition-colors text-xs font-bold text-left"
                    dir="ltr"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTranslatorModal(false)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2.5 rounded-xl font-black text-xs transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-md hover:scale-105 transition-all"
                  >
                    ارسال درخواست
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* SUCCESS TOAST */}
      {/* ========================================== */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-stone-900 to-stone-800 border-2 border-emerald-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold max-w-sm"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="flex-1">{successMessage}</span>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-stone-400 hover:text-white text-lg font-black transition-colors flex-shrink-0"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
          ? "border-emerald-500/30 bg-emerald-50/30 shadow-md"
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
                ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
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
            isOpen ? "rotate-180 text-emerald-600" : ""
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