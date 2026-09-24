import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Train, Ticket, Search, MapPin, Phone, Star, CheckCircle, ShieldCheck,
  Heart, Award, Users, Sparkles, Zap, Building2, Languages, Clock,
  Calendar, ExternalLink, ChevronDown, Info, HelpCircle, TrendingUp,
  MessageCircle, Send, Handshake, Lightbulb, ListChecks, Target, Trophy,
  BarChart3, Grid3x3, X, RefreshCw, Landmark, Wallet, FileText, Download,
  Eye, Globe, Home, GraduationCap, CreditCard, IdCard, Baby, Euro,
  CheckSquare, Square, MapPinned, Navigation, FileCheck, BookMarked,
  PieChart, ArrowRight, ArrowLeft, Filter, SlidersHorizontal, BellRing,
  PartyPopper, Accessibility, HandHeart, HeartHandshake, Scale, Gavel,
  Bike, Car, Plane, Mountain, Sun, Snowflake, Coffee, Utensils,
  Receipt, Banknote, Calculator, TrendingDown, UsersRound, CircleDollarSign,
  Smartphone, QrCode, Nfc, Monitor, ShoppingCart, Clock4, Timer, Gauge,
  Route, Milestone, Compass, Flag, Sparkle, Crown, Gem, Flame, Rocket
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
    url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    title: "قطارهای سراسری ÖBB",
    caption: "دسترسی نامحدود به تمام خطوط قطار در سراسر اتریش — از وین تا اینسبروک",
    icon: Train,
    tag: "قطار",
  },
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "شهرهای زیبای اتریش",
    caption: "با یک بلیت، به تمام شهرها و روستاهای اتریش سفر کنید",
    icon: MapPinned,
    tag: "سفر",
  },
  {
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    title: "حمل‌ونقل شهری و منطقه‌ای",
    caption: "مترو، تراموا، اتوبوس و قطارهای S-Bahn — همه با یک بلیت",
    icon: Route,
    tag: "شهری",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱,۴۰۰€", label: "هزینه سالانه (Classic)", icon: Euro },
  { value: "۱,۰۵۰€", label: "تخفیف Jugend/Senior", icon: Award },
  { value: "۳۶۵ روز", label: "اعتبار", icon: Calendar },
  { value: "۹ استان", label: "پوشش کامل", icon: MapPin },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق منابع رسمی BMIMI", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "راهنمای رایگان", color: "text-rose-600" },
  { icon: Award, text: "توسط متخصصان", color: "text-indigo-600" },
];

// ==========================================
// TICKET TYPES DATA
// ==========================================
interface TicketType {
  id: string;
  name: string;
  german: string;
  desc: string;
  price2026: string;
  priceMonthly: string;
  eligibility: string;
  icon: any;
  color: string;
  bg: string;
  text: string;
  features: string[];
  ageLimit?: string;
  featured?: boolean;
}

const TICKET_TYPES: TicketType[] = [
  {
    id: "classic",
    name: "کلیما تیکت کلاسیک",
    german: "KlimaTicket Ö Classic",
    desc: "بلیت اصلی برای بزرگسالان ۲۶ تا ۶۵ سال — دسترسی نامحدود به تمام حمل‌ونقل عمومی اتریش.",
    price2026: "۱,۴۰۰ یورو",
    priceMonthly: "۱۱۶.۶۷ یورو",
    eligibility: "همه افراد ۲۶ تا ۶۵ سال",
    icon: Ticket,
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-700",
    features: [
      "دسترسی نامحدود به تمام قطارهای ÖBB (S-Bahn، Regional، Fernverkehr)",
      "مترو، تراموا و اتوبوس در تمام شهرها",
      "قطارهای WESTbahn و RegioJet",
      "حمل رایگان دوچرخه در برخی مسیرها",
      "قابل استفاده در اپلیکیشن‌های ÖBB، WESTbahn و Wiener Linien",
      "امکان پیش‌خرید تا ۱ ماه قبل",
    ],
    featured: true,
  },
  {
    id: "jugend",
    name: "کلیما تیکت جوانان",
    german: "KlimaTicket Ö Jugend",
    desc: "نسخه تخفیف‌دار برای جوانان زیر ۲۶ سال — همان امکانات Classic با قیمت کمتر.",
    price2026: "۱,۰۵۰ یورو",
    priceMonthly: "۸۷.۵۰ یورو",
    eligibility: "جوانان تا ۲۵ سال",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    features: [
      "تمام امکانات KlimaTicket Ö Classic",
      "غیرقابل انتقال به افراد دیگر",
      "نیاز به عکس روی بلیت (در نسخه فیزیکی)",
      "مناسب برای دانشجویان، دانش‌آموزان و کارآموزان",
      "تخفیف ۲۵٪ نسبت به نسخه Classic",
      "مشمول Kennenlern-Aktion (۲ ماه تست)",
    ],
    ageLimit: "زیر ۲۶ سال",
  },
  {
    id: "senior",
    name: "کلیما تیکت سالمندان",
    german: "KlimaTicket Ö Senior",
    desc: "نسخه تخفیف‌دار برای افراد بالای ۶۵ سال — همان امکانات Classic با قیمت کمتر.",
    price2026: "۱,۰۵۰ یورو",
    priceMonthly: "۸۷.۵۰ یورو",
    eligibility: "سالمندان بالای ۶۵ سال",
    icon: Heart,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    features: [
      "تمام امکانات KlimaTicket Ö Classic",
      "مناسب برای بازنشستگان",
      "غیرقابل انتقال به افراد دیگر",
      "مشمول Huckepack-Bonus (آوردن نوه در برخی ایالت‌ها)",
      "تخفیف ۲۵٪ نسبت به نسخه Classic",
      "امکان پرداخت ماهانه یا سالانه",
    ],
    ageLimit: "بالای ۶۵ سال",
  },
  {
    id: "spezial",
    name: "کلیما تیکت ویژه",
    german: "KlimaTicket Ö Spezial",
    desc: "نسخه تخفیف‌دار برای افراد دارای معلولیت (بالای ۷۰٪) یا افرادی با گواهی تخفیف نرخ.",
    price2026: "۱,۰۵۰ یورو",
    priceMonthly: "۸۷.۵۰ یورو",
    eligibility: "معلولیت ۷۰٪+ یا گواهی تخفیف نرخ",
    icon: Accessibility,
    color: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    features: [
      "تمام امکانات KlimaTicket Ö Classic",
      "نیاز به Behindertenpass (کارت معلولیت)",
      "امکان همراهی یک نفر به‌صورت رایگان",
      "مناسب برای افراد با معلولیت شدید",
      "تخفیف ۲۵٪ نسبت به نسخه Classic",
      "امکان درخواست از طریق پورتال رسمی",
    ],
  },
];

// ==========================================
// REGIONAL TICKETS
// ==========================================
const REGIONAL_TICKETS = [
  { id: "vor", name: "KlimaTicket VOR", region: "وین، نیدراوترایش، بورگنلاند", price: "۱,۰۱۹ یورو", color: "from-red-500 to-rose-600", icon: Building2 },
  { id: "noe", name: "KlimaTicket NÖ", region: "نیدراوترایش", price: "۸۳۵ یورو", color: "from-blue-500 to-indigo-600", icon: MapPin },
  { id: "ooe", name: "KlimaTicket OÖ", region: "اوبراوترایش", price: "۷۰۳ یورو", color: "from-emerald-500 to-teal-600", icon: MapPin },
  { id: "stmk", name: "KlimaTicket Stmk", region: "اشتایرمارک", price: "۴۹۹ یورو", color: "from-amber-500 to-orange-600", icon: MapPin },
  { id: "ktn", name: "KlimaTicket Ktn", region: "کارنتن", price: "۴۴۹ یورو", color: "from-cyan-500 to-blue-600", icon: MapPin },
  { id: "sbg", name: "KlimaTicket Sbg", region: "سالزبورگ", price: "۳۹۹ یورو", color: "from-pink-500 to-rose-600", icon: MapPin },
  { id: "tirol", name: "KlimaTicket Tirol", region: "تیرول", price: "۴۹۰ یورو", color: "from-indigo-500 to-purple-600", icon: MapPin },
  { id: "vbg", name: "KlimaTicket Vbg", region: "فورآرلبرگ", price: "۳۶۵ یورو", color: "from-teal-500 to-emerald-600", icon: MapPin },
];

// ==========================================
// PURCHASE STEPS
// ==========================================
const PURCHASE_STEPS = [
  {
    step: 1,
    title: "انتخاب نوع بلیت",
    subtitle: "Classic، Jugend، Senior یا Spezial",
    desc: "بر اساس سن و وضعیت خود، نوع مناسب را انتخاب کنید. اگر زیر ۲۶ سال هستید، Jugend انتخاب اقتصادی‌تری است. اگر بالای ۶۵ سال دارید، Senior.",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
    tips: ["سن زیر ۲۶ = Jugend", "سن بالای ۶۵ = Senior", "معلولیت ۷۰٪+ = Spezial"],
  },
  {
    step: 2,
    title: "خرید از سایت رسمی",
    subtitle: "klimaticket.at یا اپلیکیشن ÖBB",
    desc: "بلیت را می‌توانید از سایت رسمی klimaticket.at، اپلیکیشن ÖBB، یا مراکز خدمات Verkehrsverbünde خریداری کنید. برای خرید آنلاین نیاز به کارت بانکی و ایمیل معتبر دارید.",
    icon: ShoppingCart,
    color: "from-emerald-500 to-teal-600",
    tips: ["klimaticket.at", "اپلیکیشن ÖBB", "مراکز Verkehrsverbünde"],
  },
  {
    step: 3,
    title: "تعیین تاریخ شروع اعتبار",
    subtitle: "حداکثر ۱ ماه قبل یا ۱۵ روز بعد",
    desc: "در خرید آنلاین، تاریخ شروع اعتبار باید حداقل ۱۵ روز بعد از خرید باشد. در مراکز حضوری، بلیت می‌تواند از همان روز اعتبار داشته باشد. حداکثر تا ۱ ماه قبل می‌توانید تاریخ شروع را تعیین کنید.",
    icon: Calendar,
    color: "from-amber-500 to-orange-600",
    tips: ["آنلاین: +۱۵ روز", "حضوری: از همان روز", "پیش‌خرید: تا ۱ ماه"],
  },
  {
    step: 4,
    title: "دریافت بلیت دیجیتال",
    subtitle: "در اپلیکیشن ÖBB، WESTbahn یا Wiener Linien",
    desc: "بلیت دیجیتال در اپلیکیشن‌های ÖBB، WESTbahn و Wiener Linien قابل نمایش است. برای بلیت فیزیکی، باید عکس ارسال کنید و کارت به آدرس شما ارسال می‌شود.",
    icon: Smartphone,
    color: "from-purple-500 to-fuchsia-600",
    tips: ["اپلیکیشن ÖBB", "اپلیکیشن WESTbahn", "اپلیکیشن Wiener Linien"],
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا Klimaticket Ö برای همه حمل‌ونقل‌های عمومی اتریش معتبر است؟",
    a: "بله، Klimaticket Ö در تمام وسایل حمل‌ونقل عمومی اتریش معتبر است: قطارهای ÖBB (S-Bahn، Regional، Fernverkehr)، WESTbahn، مترو، تراموا، اتوبوس‌های شهری و منطقه‌ای. اما برخی سرویس‌های توریستی مانند Schneebergbahn، SchafbergBahn و Flixbus پوشش داده نمی‌شوند.",
  },
  {
    q: "هزینه Klimaticket Ö در سال ۲۰۲۶ چقدر است؟",
    a: "قیمت Klimaticket Ö Classic در سال ۲۰۲۶ برابر ۱,۴۰۰ یورو (۱۱۶.۶۷ یورو در ماه) است. نسخه‌های تخفیف‌دار Jugend (زیر ۲۶ سال)، Senior (بالای ۶۵ سال) و Spezial (معلولیت ۷۰٪+) برابر ۱,۰۵۰ یورو (۸۷.۵۰ یورو در ماه) است.",
  },
  {
    q: "آیا می‌توانم Klimaticket Ö را دو ماه تست کنم؟",
    a: "بله، در طرح Kennenlern-Aktion که در ماه‌های مه و ژوئن اجرا می‌شود، اگر بلیت جدید خریداری کنید، می‌توانید پس از دو ماه استفاده، آن را به‌صورت رایگان لغو کنید. این طرح برای کاهش موانع استفاده از حمل‌ونقل عمومی طراحی شده است.",
  },
  {
    q: "آیا دانشجویان تخفیف ویژه دارند؟",
    a: "بله، دانشجویان زیر ۲۶ سال می‌توانند از Klimaticket Ö Jugend استفاده کنند که ۱,۰۵۰ یورو در سال است. همچنین برخی دانشگاه‌ها امکان خرید Klimaticket با تخفیف از طریق هزینه‌های تحصیلی را فراهم می‌کنند.",
  },
  {
    q: "آیا کارفرما می‌تواند Klimaticket را برای کارمندان بخرد؟",
    a: "بله، کارفرمایان می‌توانند Klimaticket را به‌صورت معاف از مالیات برای کارمندان خود خریداری کنند یا هزینه آن را بازپرداخت کنند. این یک مزیت مالیاتی برای کارفرما و صرفه‌جویی برای کارمند است.",
  },
  {
    q: "آیا Klimaticket Ö قابل انتقال به فرد دیگر است؟",
    a: "خیر، Klimaticket Ö (به‌جز برخی نسخه‌های خاص) غیرقابل انتقال است. نسخه‌های Jugend و Spezial نیاز به عکس دارند و فقط برای فرد صاحب بلیت معتبر هستند. نسخه Classic نیز معمولاً غیرقابل انتقال است.",
  },
];

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
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنمای Klimaticket",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "راهنمای کامل Klimaticket Ö ۲۰۲۶ | قیمت‌ها، انواع بلیت و نحوه خرید",
    description: "راهنمای جامع Klimaticket Ö (بلیت سراسری اتریش): قیمت‌های ۲۰۲۶، انواع بلیت (Classic، Jugend، Senior، Spezial)، بلیت‌های منطقه‌ای، نحوه خرید و شرایط استفاده.",
    author: { "@type": "Organization", name: "اتریش‌نشین" },
    publisher: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
    },
    datePublished: "2026-01-15",
    dateModified: "2026-09-22",
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
      { "@type": "ListItem", position: 2, name: "Klimaticket", item: "https://otrish-iran.ir/klimaticket" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const KlimaTicketGuide: React.FC = () => {
  const [activeTicket, setActiveTicket] = useState<string>("classic");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAllRegional, setShowAllRegional] = useState(false);

  const displayedRegional = showAllRegional ? REGIONAL_TICKETS : REGIONAL_TICKETS.slice(0, 4);

  return (
    <>
      <SEO
        title="راهنمای کامل Klimaticket Ö ۲۰۲۶ | قیمت، انواع بلیت و نحوه خرید | اتریش‌نشین"
        description="راهنمای جامع Klimaticket Ö (بلیت سراسری اتریش) ۲۰۲۶: قیمت‌ها (Classic ۱,۴۰۰€، Jugend/Senior ۱,۰۵۰€)، بلیت‌های منطقه‌ای، نحوه خرید آنلاین و حضوری، شرایط استفاده و مزایای هر نوع بلیت."
        keywords="Klimaticket Österreich, Klimaticket 2026, قیمت Klimaticket, بلیت سالانه اتریش, Klimaticket Jugend, Klimaticket Senior, Klimaticket kaufen, حمل و نقل عمومی اتریش, ÖBB Jahreskarte, بلیت قطار اتریش"
        schemaData={seoSchema}
        type="article"
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
            background: "radial-gradient(80% 150% at 90% 0, #7f1d1d 0, #450a0a 48%, #0a1128 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">🚆</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-red-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img src={otrishLogo} alt="اتریش‌نشین" width="112" height="112" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — طبق منابع رسمی BMIMI
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای کامل
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> Klimaticket Ö اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-red-100 leading-relaxed max-w-3xl mb-4">
                بلیت سالانه سراسری اتریش — دسترسی نامحدود به تمام قطارها،
                متروها، ترامواها و اتوبوس‌ها در سراسر کشور. قیمت‌های ۲۰۲۶،
                انواع بلیت و نحوه خرید.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱,۴۰۰€ (Classic)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱,۰۵۰€ (تخفیف‌دار)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۳۶۵ روز اعتبار</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <a
                  href="https://www.klimaticket.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-amber-400 to-amber-500 text-amber-950 font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  خرید از klimaticket.at
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
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
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.02 }} className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-red-600" /></div>
                <div className="text-lg font-black text-red-700">{s.value}</div>
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
              <Train className="w-5 h-5 text-red-600" />
              با Klimaticket Ö به تمام اتریش سفر کنید
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">یک بلیت، دسترسی نامحدود به تمام حمل‌ونقل عمومی</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { (e.currentTarget as HTMLImageElement).src = img.fallback; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }} className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">#{img.tag}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">{img.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INFO BANNER */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 border-2 border-red-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-red-900 text-sm mb-1 flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              نکته کلیدی: چرا Klimaticket Ö ارزش خرید دارد؟
            </h3>
            <p className="text-[11px] text-red-800 font-bold leading-relaxed">
              هزینه سالانه Klimaticket Ö Classic (۱,۴۰۰ یورو) معادل ۱۱۶.۶۷ یورو
              در ماه است. اگر ماهانه بیش از این مبلغ برای حمل‌ونقل عمومی هزینه
              می‌کنید (مثلاً سفر روزانه بین شهرها یا استفاده مکرر از مترو و
              قطار)، Klimaticket کاملاً مقرون‌به‌صرفه است. علاوه بر این،
              کارفرمایان می‌توانند آن را معاف از مالیات برای کارمندان خریداری کنند.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* TICKET TYPES — TABS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-red-600" />
              ۴ نوع Klimaticket Ö
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">هر نوع بلیت برای گروه سنی یا وضعیت خاصی طراحی شده است</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {TICKET_TYPES.map((ticket) => {
              const Icon = ticket.icon;
              const isActive = activeTicket === ticket.id;
              return (
                <motion.button key={ticket.id} type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => setActiveTicket(ticket.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 text-xs font-black transition-all cursor-pointer ${isActive ? `bg-gradient-to-br ${ticket.color} text-white border-transparent shadow-md` : "bg-white border-stone-200 text-stone-700 hover:border-stone-300"}`}>
                  <Icon className="w-4 h-4" />
                  {ticket.name}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {TICKET_TYPES.filter((t) => t.id === activeTicket).map((ticket) => {
              const Icon = ticket.icon;
              return (
                <motion.div key={ticket.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-3xl border-2 border-stone-200 p-6 md:p-8 relative overflow-hidden">
                  <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${ticket.color} opacity-[0.08] rounded-full`} />

                  {ticket.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" />
                      پرفروش‌ترین
                    </div>
                  )}

                  <div className="relative flex flex-col md:flex-row items-start gap-6">
                    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${ticket.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                      <Icon className="w-8 h-8" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-base font-black text-stone-900">{ticket.name}</h3>
                        <span className="text-[9px] font-mono text-stone-400" dir="ltr">({ticket.german})</span>
                      </div>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">{ticket.desc}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        <div className={`${ticket.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">💰 قیمت سالانه</div>
                          <div className={`text-lg font-black ${ticket.text}`}>{ticket.price2026}</div>
                        </div>
                        <div className={`${ticket.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">📅 معادل ماهانه</div>
                          <div className={`text-lg font-black ${ticket.text}`}>{ticket.priceMonthly}</div>
                        </div>
                        <div className={`${ticket.bg} border border-current/20 rounded-2xl p-3`}>
                          <div className="text-[9px] text-stone-500 font-black mb-1">👤 شرایط</div>
                          <div className={`text-xs font-black ${ticket.text} leading-tight`}>{ticket.eligibility}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {ticket.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] font-bold text-stone-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* PRICE COMPARISON TABLE */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-red-500 via-rose-500 to-amber-500 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">مقایسه قیمت‌ها (۲۰۲۶)</h2>
                <p className="text-[10px] text-stone-500 font-bold mt-0.5">تغییرات قیمت از سال ۲۰۲۱ تا ۲۰۲۶</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="p-3 text-[11px] font-black text-stone-700 text-right">نوع بلیت</th>
                  <th className="p-3 text-[11px] font-black text-stone-500 text-center">۲۰۲۱-۲۰۲۴</th>
                  <th className="p-3 text-[11px] font-black text-stone-500 text-center">۲۰۲۵ (میانه)</th>
                  <th className="p-3 text-[11px] font-black text-red-700 text-center">۲۰۲۶</th>
                  <th className="p-3 text-[11px] font-black text-stone-500 text-center">افزایش</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Classic (بزرگسال)", y2021: "۱,۰۹۵€", y2025: "۱,۳۰۰€", y2026: "۱,۴۰۰€", change: "+۲۸٪" },
                  { type: "Jugend (زیر ۲۶)", y2021: "۸۲۱€", y2025: "۹۷۵€", y2026: "۱,۰۵۰€", change: "+۲۸٪" },
                  { type: "Senior (بالای ۶۵)", y2021: "۸۲۱€", y2025: "۹۷۵€", y2026: "۱,۰۵۰€", change: "+۲۸٪" },
                  { type: "Spezial (معلولیت)", y2021: "۸۲۱€", y2025: "۹۷۵€", y2026: "۱,۰۵۰€", change: "+۲۸٪" },
                ].map((row, i) => (
                  <motion.tr key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`border-b border-stone-100 ${i % 2 === 0 ? "bg-stone-50/50" : ""}`}>
                    <td className="p-3 text-[11px] font-black text-stone-800">{row.type}</td>
                    <td className="p-3 text-[11px] font-bold text-stone-500 text-center line-through">{row.y2021}</td>
                    <td className="p-3 text-[11px] font-bold text-stone-500 text-center line-through">{row.y2025}</td>
                    <td className="p-3 text-[11px] font-black text-red-700 text-center">{row.y2026}</td>
                    <td className="p-3 text-[11px] font-black text-amber-700 text-center bg-amber-50">{row.change}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              <strong>توجه:</strong> قیمت‌ها شامل ۱۰٪ مالیات بر ارزش افزوده است.
              افزایش قیمت در دو مرحله (۱ آگوست ۲۰۲۵ و ۱ ژانویه ۲۰۲۶) اعمال شده
              است. تاریخ شروع اعتبار بلیت (نه تاریخ خرید) تعیین‌کننده قیمت است.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* REGIONAL TICKETS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              بلیت‌های منطقه‌ای (Klimaticket Regional)
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">اگر فقط در یک ایالت سفر می‌کنید، این بلیت‌ها ارزان‌تر هستند</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {displayedRegional.map((ticket, i) => {
              const Icon = ticket.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-stone-200 p-4 text-center hover:shadow-md transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ticket.color} flex items-center justify-center text-white shadow-md mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xs font-black text-stone-900 mb-0.5">{ticket.name}</h3>
                  <p className="text-[10px] text-stone-500 font-bold mb-2">{ticket.region}</p>
                  <div className={`text-sm font-black bg-gradient-to-r ${ticket.color} bg-clip-text text-transparent`}>{ticket.price}</div>
                </motion.div>
              );
            })}
          </div>

          {!showAllRegional && REGIONAL_TICKETS.length > 4 && (
            <div className="mt-4 text-center">
              <button type="button" onClick={() => setShowAllRegional(true)} className="inline-flex items-center gap-2 bg-gradient-to-br from-red-500 to-rose-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all">
                <Eye className="w-3.5 h-3.5" />
                مشاهده همه {REGIONAL_TICKETS.length} بلیت منطقه‌ای
              </button>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* PURCHASE STEPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-[11px] font-black text-red-700 mb-3">
              <ListChecks className="w-3.5 h-3.5" />
              راهنمای گام‌به‌گام
            </div>
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-red-600" />
              ۴ مرحله خرید Klimaticket Ö
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">از انتخاب نوع بلیت تا دریافت بلیت دیجیتال</p>
          </div>

          <div className="space-y-4">
            {PURCHASE_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i} id={`step-${step.step}`} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-300 p-6 transition-all overflow-hidden group">
                  <div className={`absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br ${step.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                  <div className="relative flex flex-col md:flex-row items-start gap-5">
                    <div className="flex-shrink-0 flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="hidden md:flex w-10 h-10 rounded-full bg-stone-100 items-center justify-center text-stone-700 font-black text-sm">
                        {step.step}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white`}>مرحله {step.step}</span>
                        <h3 className="font-black text-stone-900 text-base">{step.title}</h3>
                      </div>
                      <p className="text-[11px] text-stone-500 font-bold mb-2">{step.subtitle}</p>
                      <p className="text-xs text-stone-600 font-bold leading-relaxed mb-3">{step.desc}</p>

                      <div className="flex flex-wrap gap-2">
                        {step.tips.map((tip, ti) => (
                          <span key={ti} className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1">
                            <Lightbulb className="w-3 h-3 text-amber-500" />
                            {tip}
                          </span>
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
        {/* VALIDITY INFO */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-blue-500 via-cyan-500 to-teal-600 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">محدوده اعتبار Klimaticket Ö</h2>
                <p className="text-[10px] text-stone-500 font-bold mt-0.5">چه چیزی شامل می‌شود و چه چیزی شامل نمی‌شود</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-black text-emerald-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                شامل می‌شود
              </h3>
              <div className="space-y-2">
                {[
                  "تمام قطارهای ÖBB (S-Bahn، Regional، Fernverkehr)",
                  "قطارهای WESTbahn و RegioJet",
                  "مترو، تراموا و اتوبوس در تمام شهرها",
                  "قطارهای S-Bahn در تمام ایالت‌ها",
                  "اتوبوس‌های منطقه‌ای Verkehrsverbünde",
                  "حمل رایگان دوچرخه در برخی مسیرها",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-bold text-stone-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-red-700 mb-3 flex items-center gap-2">
                <X className="w-4 h-4" />
                شامل نمی‌شود
              </h3>
              <div className="space-y-2">
                {[
                  "قطارهای توریستی (Schneebergbahn، SchafbergBahn)",
                  "Flixbus و اتوبوس‌های خصوصی",
                  "خطوط فرودگاه وین (Vienna Airport Lines)",
                  "کشتی‌های تفریحی دریاچه‌ها",
                  "تله‌کابین‌ها و ترامواهای کوهستانی",
                  "قطارهای شبانه (Nightjet) — با رزرو اضافه",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] font-bold text-stone-600">
                    <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              چرا Klimaticket Ö ارزشمند است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">مزایای استفاده از بلیت سراسری اتریش</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Banknote, title: "صرفه‌جویی", text: "معادل ۳.۸۴ یورو در روز — کمتر از یک قهوه در وین", color: "from-red-500 to-rose-600" },
              { icon: ShieldCheck, title: "پیش‌بینی‌پذیر", text: "یک سال بدون نگرانی از افزایش قیمت بلیت", color: "from-emerald-500 to-teal-600" },
              { icon: Heart, title: "دوستان محیط زیست", text: "کاهش انتشار CO₂ و حمایت از حمل‌ونقل پایدار", color: "from-blue-500 to-indigo-600" },
              { icon: Users, title: "۳۳۰,۰۰۰ کاربر", text: "بیش از ۳۳۰ هزار نفر در اتریش از Klimaticket استفاده می‌کنند", color: "from-amber-500 to-orange-600" },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>{v.title}</div>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{v.text}</p>
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
              <HelpCircle className="w-5 h-5 text-red-600" />
              سوالات متداول درباره Klimaticket Ö
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#450a0a] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-red-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در مسیر حمل‌ونقل هوشمند
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">سوالی درباره Klimaticket دارید؟</h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای انتخاب نوع مناسب
              Klimaticket، نحوه خرید و استفاده بهینه از آن هستند. همین حالا
              پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> پرسش در واتس‌اپ
              </a>
              <a href="https://t.me/Otrish_neshin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Send className="w-4 h-4" /> پشتیبانی تلگرام
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> کاملاً محرمانه</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> خدمات داوطلبانه</div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* DISCLAIMER */}
        {/* ========================================== */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این راهنما بر اساس منابع رسمی (BMIMI، klimaticket.at،
              oesterreich.gv.at) تهیه شده و صرفاً جنبه آموزشی دارد. قیمت‌ها و
              شرایط ممکن است بدون اطلاع تغییر کند. برای اطلاعات نهایی و به‌روز،
              همیشه به سایت رسمی klimaticket.at مراجعه کنید. اتریش‌نشین یک
              پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Klimaticket Österreich", "Klimaticket 2026", "قیمت Klimaticket",
              "بلیت سالانه اتریش", "Klimaticket Jugend", "Klimaticket Senior",
              "Klimaticket kaufen", "حمل و نقل عمومی اتریش", "ÖBB Jahreskarte",
              "بلیت قطار اتریش", "Klimaticket Regional", "Klimaticket VOR",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all cursor-default">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({ q, a, isOpen, onToggle, index }: { key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-red-500/30 bg-red-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-red-500 to-rose-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-red-600" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default KlimaTicketGuide;