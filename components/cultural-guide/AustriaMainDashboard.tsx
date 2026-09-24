import React, { useState, useEffect, useMemo } from "react";
import IranianEventsCalendar from "./IranianEventsCalendar";
import AustriaSmartSuite from "./AustriaSmartSuite";
import QuickSearch from "./QuickSearch";
import { toast } from "../utils/toast";
import {
  Search, Users, Calendar, Stethoscope, Scale, ShoppingBag, PartyPopper,
  Siren, Pin, Languages, Target, Coins, Trophy, BookOpen, MessageSquare,
  CloudSun, Clipboard, Train, ChevronLeft, X, Play, Pause, Volume2,
  Trash2, MapPin, ChevronRight, Info, Share2, Check, GraduationCap, Zap,
  Compass, Lock, FileText, Settings, Sparkles, TrendingUp, ShieldCheck,
  Globe2, Award, Building2, HeartHandshake, Newspaper, Radio, Mountain,
  Flag, Star, ArrowUpRight, Timer, BadgeCheck, Users2
} from "lucide-react";

/* ============================================================
   🔹 SEO HEAD INJECTOR (React-based head manager)
   ============================================================ */
function SEOHead() {
  useEffect(() => {
    // Update document title
    document.title = "اتریش‌نشین | پلتفرم جامع ایرانیان مقیم اتریش — اقامت، کار، مالیات، بیمه و زندگی";

    // Meta tags
    const metas: Record<string, string> = {
      "description": "اتریش‌نشین؛ پلتفرم جامع و مستقل فارسی‌زبانان مقیم اتریش. راهنمای ویزا و اقامت، محاسبه‌گر Brutto-Netto، بیمه ÖGK، مالیات، مسکن، مشاغل کمبود، رویدادها و اخبار وین، گراتس، لینتس، سالزبورگ و اینسبروک.",
      "keywords": "اتریش, ایرانیان اتریش, ویزا اتریش, اقامت اتریش, کار در اتریش, تحصیل در اتریش, بیمه ÖGK, مالیات اتریش, Brutto Netto, وین, گراتس, مشاغل کمبود اتریش, MA35, RWR, زندگی در اتریش, اتریش‌نشین",
      "author": "اتریش‌نشین | Otrish-Iran.ir",
      "robots": "index, follow, max-image-preview:large",
      "theme-color": "#C8102E",
      "og:title": "اتریش‌نشین — همیار هوشمند ایرانیان مقیم اتریش",
      "og:description": "از ویزا و اقامت تا مالیات، بیمه و زندگی روزمره در اتریش — همه چیز در یک پلتفرم مستقل.",
      "og:type": "website",
      "og:locale": "fa_IR",
      "og:site_name": "اتریش‌نشین",
      "twitter:card": "summary_large_image",
      "twitter:title": "اتریش‌نشین | پلتفرم جامع ایرانیان اتریش",
      "twitter:description": "پلتفرم جامع و مستقل فارسی‌زبانان مقیم اتریش.",
    };
    Object.entries(metas).forEach(([name, content]) => {
      const isOg = name.startsWith("og:") || name.startsWith("twitter:");
      const selector = isOg ? `meta[property="${name}"], meta[name="${name}"]` : `meta[name="${name}"]`;
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(isOg ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    });

    // Canonical
    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = window.location.origin + "/";
      document.head.appendChild(canonical);
    }

    // JSON-LD Structured Data
    const ldId = "otrish-iran-ld-json";
    document.getElementById(ldId)?.remove();
    const script = document.createElement("script");
    script.id = ldId;
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "اتریش‌نشین",
          "alternateName": "Otrish-Iran",
          "url": window.location.origin,
          "inLanguage": "fa-IR",
          "description": "پلتفرم جامع اطلاعات، ابزارها و خدمات برای ایرانیان مقیم اتریش",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "Organization",
          "name": "اتریش‌نشین",
          "url": window.location.origin,
          "logo": `${window.location.origin}/logo.png`,
          "sameAs": ["https://otrish-iran.ir"],
          "areaServed": { "@type": "Country", "name": "Austria" },
          "audience": { "@type": "Audience", "audienceType": "Iranian residents in Austria" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "چگونه برای اقامت اتریش اقدام کنیم؟",
              "acceptedAnswer": { "@type": "Answer", "text": "از طریق پورتال اتریش‌نشین می‌توانید ارزیابی هوشمند شانس اقامت، چک‌لیست مدارک و پایش پرونده خود را به صورت گام به گام انجام دهید." }
            },
            {
              "@type": "Question",
              "name": "محاسبه حقوق خالص (Netto) از ناخالص (Brutto) در اتریش چگونه است؟",
              "acceptedAnswer": { "@type": "Answer", "text": "با محاسبه‌گر آنلاین اتریش‌نشین می‌توانید بر اساس قوانین مالیاتی ۲۰۲۶ اتریش، حقوق خالص ماهانه خود را دقیق محاسبه کنید." }
            },
            {
              "@type": "Question",
              "name": "بیمه سلامت ÖGK در اتریش چه پوششی دارد؟",
              "acceptedAnswer": { "@type": "Answer", "text": "بیمه سلامت ÖGK بخش بزرگی از خدمات پزشکی، دندانپزشکی و بیمارستانی را پوشش می‌دهد. اتریش‌نشین دایرکتوری پزشکان فارسی‌زبان طرف قرارداد را ارائه می‌دهد." }
            }
          ]
        }
      ]
    });
    document.head.appendChild(script);
  }, []);
  return null;
}

/* ============================================================
   🔹 اتریش‌نشین BRAND LOGO (Animated SVG)
   ============================================================ */
function OtrishLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_4px_12px_rgba(200,16,46,0.35)]"
      role="img"
      aria-label="لوگوی اتریش‌نشین"
    >
      <defs>
        <linearGradient id="otrishRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E51636" />
          <stop offset="100%" stopColor="#970D22" />
        </linearGradient>
        <linearGradient id="otrishGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <linearGradient id="otrishWhite" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F5F5F5" />
        </linearGradient>
      </defs>

      {/* Rounded square base with Austrian flag colors */}
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#otrishWhite)" stroke="url(#otrishRed)" strokeWidth="1.5" />
      {/* Red bands top/bottom (Austrian flag motif) */}
      <rect x="2" y="2" width="60" height="18" rx="16" fill="url(#otrishRed)" />
      <path d="M2 20 H62 V46 H2 Z" fill="#FFFFFF" />
      <rect x="2" y="44" width="60" height="18" rx="16" fill="url(#otrishRed)" />
      <rect x="2" y="44" width="60" height="4" fill="url(#otrishRed)" />

      {/* Snow-capped Alpine mountain (Austria symbolism) */}
      <path d="M12 44 L26 22 L34 34 L42 24 L54 44 Z" fill="#1A060A" opacity="0.85" />
      <path d="M22 30 L26 22 L31 30 Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M40 30 L42 24 L46 30 Z" fill="#FFFFFF" opacity="0.9" />

      {/* Crescent + Star (Persian cultural motif) */}
      <path
        d="M46 14 a6 6 0 1 0 0 12 a5 5 0 1 1 0 -12 Z"
        fill="url(#otrishGold)"
      />
      <circle cx="53" cy="16" r="1.4" fill="url(#otrishGold)" />
    </svg>
  );
}

/* ============================================================
   🔹 MAIN COMPONENT
   ============================================================ */
interface AustriaMainDashboardProps {
  onNavigate: (segment: string) => void;
  setSelectedCity?: (city: string) => void;
}

export default function AustriaMainDashboard({ onNavigate, setSelectedCity }: AustriaMainDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [radioVolume, setRadioVolume] = useState(70);
  const [activeTab, setActiveTab] = useState<"articles" | "events" | "services">("articles");

  // Custom Modals State
  const [selectedMullColor, setSelectedMullColor] = useState<string | null>(null);
  const [showMullModal, setShowMullModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [show100DaysModal, setShow100DaysModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState<any | null>(null);
  const [showEventModal, setShowEventModal] = useState<any | null>(null);
  const [articleSearchQuery, setArticleSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleShareArticle = (art: any) => {
    const shareUrl = `${window.location.origin}/?article=${art.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => toast.success("لینک مقاله در حافظه موقت کپی شد! 🔗"))
      .catch((err) => console.error("Failed to copy link:", err));
  };

  const scrollArticlesRef = React.useRef<HTMLDivElement>(null);
  const scrollServicesRef = React.useRef<HTMLDivElement>(null);
  const scrollEventsRef = React.useRef<HTMLDivElement>(null);

  const scrollBy = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
    }
  };

  // Dynamic Date calculation
  const [shamsiDateStr, setShamsiDateStr] = useState("۸ خرداد ۱۴۰۵");
  const [miladiDateStr, setMiladiDateStr] = useState("28 May 2026");
  const [liveClock, setLiveClock] = useState("");

  useEffect(() => {
    try {
      const now = new Date();
      const formatterPersian = new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" });
      const formatterMiladi = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });
      setShamsiDateStr(formatterPersian.format(now));
      setMiladiDateStr(formatterMiladi.format(now));
      const tick = () => {
        const t = new Date();
        setLiveClock(t.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      };
      tick();
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    } catch (e) { /* noop */ }
  }, []);

  // Equalizer animation
  const [eqBars, setEqBars] = useState([20, 40, 30, 60, 15, 45, 25]);
  useEffect(() => {
    let interval: any;
    if (isRadioPlaying) {
      interval = setInterval(() => {
        setEqBars((prev) => prev.map(() => Math.floor(Math.random() * 80) + 15));
      }, 150);
    } else {
      setEqBars([15, 15, 15, 15, 15, 15, 15]);
    }
    return () => clearInterval(interval);
  }, [isRadioPlaying]);

  /* ====================== CATEGORIES ====================== */
  const categories = [
    { id: "physicians", title: "پزشکان", icon: Stethoscope, color: "bg-rose-50 border-rose-100 text-rose-800 hover:bg-rose-100/50", badge: "بسته", badgeColor: "bg-red-500", onClick: () => setShowDoctorModal(true), seo: "دایرکتوری پزشکان فارسی‌زبان در اتریش" },
    { id: "legal", title: "حقوقی", icon: Scale, color: "bg-blue-50 border-blue-100 text-blue-800 hover:bg-blue-100/50", onClick: () => onNavigate("tracker"), seo: "مشاوره حقوقی و قراردادهای اتریش" },
    { id: "stores", title: "فروشگاه", icon: ShoppingBag, color: "bg-amber-50 border-amber-100 text-amber-900 hover:bg-amber-100/50", onClick: () => onNavigate("mapper"), seo: "فروشگاه‌های ایرانی در اتریش" },
    { id: "events", title: "رویدادها", icon: PartyPopper, color: "bg-purple-50 border-purple-100 text-purple-800 hover:bg-purple-100/50", badge: "جدید", badgeColor: "bg-purple-600", onClick: () => document.getElementById("events-section")?.scrollIntoView({ behavior: "smooth" }), seo: "رویدادهای جامعه ایرانی اتریش" },
    { id: "emergency", title: "اضطراری", icon: Siren, color: "bg-red-50 border-red-150 text-red-800 hover:bg-red-100/80 font-bold", onClick: () => setShowEmergencyModal(true), seo: "شماره‌های اضطراری اتریش" },
    { id: "classifieds", title: "نیازمندی‌ها", icon: Pin, color: "bg-emerald-50 border-emerald-100 text-emerald-800 hover:bg-emerald-100/50", onClick: () => onNavigate("mapper"), seo: "نیازمندی‌های ایرانیان اتریش" },
    { id: "translator", title: "مترجم", icon: Languages, color: "bg-cyan-50 border-cyan-100 text-cyan-800 hover:bg-cyan-100/50", onClick: () => onNavigate("tracker"), seo: "مترجم رسمی فارسی-آلمانی" },
    { id: "discounts", title: "تخفیف‌ها", icon: Target, color: "bg-orange-50 border-orange-100 text-orange-900 hover:bg-orange-100/50", badge: "داغ", badgeColor: "bg-orange-500", onClick: () => onNavigate("finance"), seo: "تخفیف‌های ویژه ایرانیان اتریش" },
    { id: "exchange", title: "تبدیل ارز", icon: Coins, color: "bg-green-50 border-green-105 text-green-800 hover:bg-green-100/50", onClick: () => onNavigate("finance"), seo: "مبدل نرخ ارز یورو به تومان" },
    { id: "100days", title: "۱۰۰ روز اول", icon: Trophy, color: "bg-yellow-50 border-yellow-100 text-yellow-900 hover:bg-yellow-110/50", onClick: () => setShow100DaysModal(true), seo: "چک‌لیست ۱۰۰ روز اول ورود به اتریش" },
    { id: "guides", title: "راهنماها", icon: BookOpen, color: "bg-sky-50 border-sky-100 text-sky-800 hover:bg-sky-100/50", onClick: () => onNavigate("tracker"), seo: "راهنماهای جامع زندگی در اتریش" },
    { id: "language_pair", title: "تبادل زبان", icon: MessageSquare, color: "bg-pink-50 border-pink-100 text-pink-800 hover:bg-pink-100/50", onClick: () => onNavigate("german"), seo: "تبادل زبان آلمانی-فارسی" },
    { id: "weather", title: "آب و هوا", icon: CloudSun, color: "bg-indigo-50 border-indigo-100 text-indigo-800 hover:bg-indigo-100/50", onClick: () => setShowWeatherModal(true), seo: "آب و هوای زنده شهرهای اتریش" },
    { id: "forms", title: "فرم‌ها", icon: Clipboard, color: "bg-stone-50 border-stone-150 text-stone-800 hover:bg-stone-150/50", onClick: () => onNavigate("german"), seo: "فرم‌های اداری اتریش" },
    { id: "transport", title: "حمل و نقل", icon: Train, color: "bg-violet-50 border-violet-100 text-violet-800 hover:bg-violet-100/50", onClick: () => onNavigate("carpool"), seo: "حمل و نقل عمومی و اشتراکی اتریش" }
  ];

  /* ====================== ARTICLES ====================== */
  const articles = useMemo(() => [
    {
      id: "g_student_intern_1",
      title: "نحوه پیدا کردن کارآموزی دانشجویی در رشته‌های مهندسی در وین 🎓",
      date: "۱۸ آوریل ۲۰۲۶",
      badge: "تحصیل و کارآموزی",
      badgeStyle: "bg-indigo-600 text-white",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
      content: `برای دانشجویان دانشگاه تکنیک وین (TU Wien) و سایر مؤسسات آکادمیک، پیدا کردن کارآموزی صنعتی (Pflichtpraktikum) می‌تواند دروازه ورود به بازار کار اتریش باشد. بهترین وب‌سایت‌ها کدامند؟ آیا بیمه سلامت مرسوم تامین اجتماعی (ÖGK) در این مدت برقرار است؟

      بهترین وب‌سایت‌ها ملزم به جستجو شامل Karriere.at، LinkedIn، و بخش فرصت‌های دانشگاهی هستند. طبق قانون، در صورت داشتن کارآموزی اجباری تحصیلی، بیمه سلامت مرسوم تامین اجتماعی (ÖGK) توسط کارفرما پرداخت می‌شود و دریافتی ماهانه مشمول قوانین کمک‌هزینه دانشجویی ویژه ملی است.`
    },
    {
      id: "g_family_reunion_1",
      title: "تجربیات واقعی از دریافت ویزای پیوست به خانواده اتریش 👥",
      date: "۱۸ آوریل ۲۰۲۶",
      badge: "قوانین و اقامت",
      badgeStyle: "bg-red-600 text-white",
      image: "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=600&auto=format&fit=crop&q=60",
      content: `شرح مدارک لازم نظیر گواهی عدم سوء‌پیشینه، ملده (ثبت محل سکونت در شهرداری)، اجاره‌نامه با فضای مانیتور شده کافی به اضافه درآمد خالص همسر در اتریش با رعایت شاخص آمار سال ۲۰۲۶. کلیه مراحل از ارسال مدارک به سفارت تهران تا تحویل کارت اقامت.

      کلیه مراحل از ارسال مدارک به سفارت تهران تا تحویل کارت اقامت نیازمند گواهی معتبر آلمانی A1 و گواهی مسکن قانونی است. روند تایید صلاحیت و مصاحبه‌ها آزمون‌های استانی ممکن است بین ۶ تا ۹ ماه به طول بینجامد.`
    },
    {
      id: "g_online_tax_1",
      title: "آیا مالیات بر کسب و کارهای آنلاین در اتریش مشمول معافیت منصفانه می‌شود؟ ⚖",
      date: "۱۸ آوریل ۲۰۲۶",
      badge: "امور مالیاتی",
      badgeStyle: "bg-amber-600 text-white",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
      content: `برای گواهی کسب و کارهای کوچک (Kleinunternehmer)، تا سقف درآمد ۳۵,۰۰۰ یا ۴۰,۰۰۰ یورو در سال، معافیت مالیات بر ارزش افزوده (USt) تعلق می‌گیرد. جزییات مربوط به چگونگی ثبت این وضعیت در FinanzOnline و پرداخت سهم بیمه اجتماعی (SVS).

      در صورتی که تحت این سقف کار کنید، نیاز به صادر کردن فاکتور با ۲۰ درصد مالیات افزوده ندارید و بروکراسی گزارش سالانه شما فوق‌العاده سبک خواهد بود.`
    },
    {
      id: "g_living_cost_graz_1",
      title: "بررسی میزان تفاوت هزینه‌های معیشتی در شهرهای گراتس و وین 🏡",
      date: "۱۸ آوریل ۲۰۲۶",
      badge: "زندگی در اتریش",
      badgeStyle: "bg-emerald-600 text-white",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=60",
      content: `مقایسه قیمت مهدکودک تخصصی، خدمات بهداشتی اطفال، حمل‌ونقل شهری و اجاره منازل بین پایتخت شلوغ و دومین شهر بزرگ اتریش (گراتس).

      گراتس با داشتن چندین دانشگاه ممتاز و هزینه‌های مسکن که حدود ۲۰ الی ۳۰ درصد ارزان‌تر از پایتخت کشور اتریش است، گزینه‌ای فوق‌العاده برای خانواده‌های نوپا و دانشجویانی است که آرامش بیشتر و زندگی اقتصادی‌تر را جستجو می‌کنند.`
    },
    {
      id: "art-1",
      title: "گریل در وین؛ بهترین مکان‌های مجاز، قوانین، محدودیت‌ها و جریمه‌ها",
      date: "۲ مه ۲۰۲۶",
      badge: "زندگی در اتریش",
      badgeStyle: "bg-emerald-600 text-white",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=60",
      content: `گریل کردن (باربیکیو) در وین یکی از تفریحات محبوب تابستانی است. با این حال شهرداری وین قوانین بسیار سختگیرانه‌ای برای جلوگیری از آتش‌سوزی و آلودگی صوتی یا زیست‌محیطی پیاده‌سازی کرده است:

      ۱. مناطق مجاز گریل عمومی (Grillplätze): مناطق اختصاصی در دانوب آیلند (Donauinsel) و پارک دونو پارک (Donaupark).
      ۲. ممنوعیت‌ها در بالکن‌ها: گریل زغالی در بالکن اکثر آپارتمان‌ها به دلیل دود غلیظ ممنوع است.
      ۳. جریمه‌های آتش‌نشانی: روشن کردن آتش خودسرانه تا سقف ۱۰،۰۰۰ یورو جریمه خواهد داشت!`
    },
    {
      id: "art-2",
      title: "بهترین کتابخانه‌های وین — راهنمای کامل عضویت شهرداری (Hauptbücherei)",
      date: "۲ مه ۲۰۲۶",
      badge: "تحصیل و آموزش",
      badgeStyle: "bg-indigo-600 text-white",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&auto=format&fit=crop&q=60",
      content: `کتابخانه‌های شهرداری وین (Büchereien Wien) امکانات فوق‌العاده‌ای را با هزینه اشتراک سالانه ناچیز (حدود ۳۰ یورو برای بزرگسالان و رایگان برای کودکان) در اختیار شما قرار می‌دهد:

      • کتابخانه مرکزی وین (Hauptbücherei) واقع در ایستگاه مترو Gürtel.
      • با کارت عضویت می‌توانید به هزاران منبع دیجیتال دسترسی یابید.
      • امکانات سالن مطالعه، اینترنت پرسرعت رایگان و میزهای کار گروهی.`
    },
    {
      id: "art-3",
      title: "۱۰۰ لینک ضروری برای زندگی، ادغام فرهنگی و مهاجرت مطمئن به اتریش",
      date: "۱ مه ۲۰۲۶",
      badge: "راهنماهای کاربردی",
      badgeStyle: "bg-amber-600 text-white",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&auto=format&fit=crop&q=60",
      content: `این لیست گرانبها شامل برترین پرتال‌های دولتی، کاریابی و خدماتی اتریش است:

      • پرتال رسمی HELP.gv.at برای چک تمام کار اداری اتریش.
      • سایت AMS برای جستجوی کار و دوره‌های زبان آلمانی رایگان.
      • پرتال Willhaben برای معاملات خانه، ابزار دست دوم، مبلمان و خرید ماشین.
      • سایت MA 35 جهت پیگیری تمدید اقامت‌ها.`
    },
    {
      id: "art-4",
      title: "لینک پزشکان و مشاغل فارسی‌زبان و ایرانی در ایالات مختلف اتریش",
      date: "۲۹ آپریل ۲۰۲۶",
      badge: "زندگی در اتریش",
      badgeStyle: "bg-emerald-600 text-white",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60",
      content: `یافتن پزشک متخصص هم‌زبان در اتریش به خصوص در دوران شروع ادغام بسیار نجات‌بخش است. سیستم درمانی اتریش (ÖGK) بخش بزرگی از خدمات این پزشکان طرف‌قرارداد (Kassenarzt) را پوشش مالی می‌دهد.`
    },
    {
      id: "art-5",
      title: "شرایط دریافت خانه دولتی Gemeindewohnung در اتریش و شهر وین چیست؟",
      date: "۲۹ آپریل ۲۰۲۶",
      badge: "مسکن و اجاره",
      badgeStyle: "bg-pink-600 text-white",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60",
      content: `خانه‌های تعاونی و دولتی وین (Gemeindewohnung) ارزان‌ترین، پایدارترین و عادلانه‌ترین روش سکونت در پایتخت هستند:

      • داشتن حداقل ۲ سال اقامت بی‌وقفه ثبت شده (Hauptwohnsitz) در شهر وین.
      • سقف درآمد سالانه معین.
      • سن بالای ۱۷ سال و داشتن کارت معتبر اقامتی.`
    },
    {
      id: "art-6",
      title: "آمار جدید و نهایی جمعیت خارجی‌ها در مناطق مختلف وین و ایالات اتریش",
      date: "۲۹ آپریل ۲۰۲۶",
      badge: "زندگی در اتریش",
      badgeStyle: "bg-emerald-600 text-white",
      image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=60",
      content: `طبق برآورد جدید آماری اتریش، حدود ۳۲٪ از کل ساکنان شهر وین را اتباع غیراتریشی تشکیل می‌دهند. مناطق ۱۰ و ۱۶ وین بالاترین گستردگی تنوع مهاجرین را دارا هستند.`
    }
  ], []);

  /* ====================== EVENTS ====================== */
  const events = useMemo(() => [
    { id: "ev-1", title: "فستیوال بزرگ جزیره دانوب وین (Donauinselfest)", date: "۴ تا ۵ جولای ۲۰۲۶", badge: "کنسرت و جشنواره", badgeColor: "bg-rose-500", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60", location: "جزیره تفریحی دانوب وین" },
    { id: "ev-2", title: "جشن بزرگ تیرگان فرهنگی تفریحی وین", date: "۱۳ جولای ۲۰۲۶", badge: "رویداد فرهنگی و ملی", badgeColor: "bg-emerald-500", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=60", location: "Tivoli park, 1120 Wien" },
    { id: "ev-3", title: "روز عروج مریم کاتولیک مقدس (Mariä Himmelfahrt)", date: "۱۵ آگوست ۲۰۲۶", badge: "تعطیل سراسری مذهبی", badgeColor: "bg-blue-500", image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&auto=format&fit=crop&q=60", location: "کلیسای جامع استفن وین" },
    { id: "ev-4", title: "سمینار بزرگداشت روز پزشک (حکیم ابن سینا) اتریش", date: "۲۵ آگوست ۲۰۲۶", badge: "همایش تخصصی علمی", badgeColor: "bg-indigo-500", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60", location: "مرکز همایش‌های ایالتی سالزبورگ" },
    { id: "ev-5", title: "جشنواره سنتی برداشت محصول اتریش (Erntedankfest)", date: "۱۲ سپتامبر ۲۰۲۶", badge: "فولکلور اتریش", badgeColor: "bg-amber-500", image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&auto=format&fit=crop&q=60", location: "میدان شهرداری وین (Rathausplatz)" },
    { id: "ev-6", title: "فستیوال پاییزی سنتی وین (Wiener Wiesn-Fest)", date: "۲۲ سپتامبر ۲۰۲۶", badge: "جشنواره تفریحی سنتی", badgeColor: "bg-pink-500", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=60", location: "پراتر وین (Prater, 1020)" },
    { id: "ev-7", title: "جشن مهرگان و همبستگی آغاز سال تحصیلی گراتس", date: "۲۳ سپتامبر ۲۰۲۶", badge: "جشن فرهنگی دانشورزان", badgeColor: "bg-orange-500", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60", location: "مرکز فرهنگی فارسی‌زبانان گراتس" },
    { id: "ev-8", title: "جشن روز کارگر و روز همبستگی اتریش", date: "۱ مه ۲۰۲۶", badge: "تعطیل رسمی دولت", badgeColor: "bg-yellow-500", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60", location: "میدان استفان وین" },
    { id: "ev-9", title: "همایش بزرگداشت حکیم فردوسی و حماسه سرایی وین", date: "۱۵ مه ۲۰۲۶", badge: "دورهمی ادبی هنری", badgeColor: "bg-purple-500", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60", location: "مرکز فرهنگی ادبی فارسی‌زبانان وین" },
    { id: "ev-10", title: "عید مذهبی عروج عیسی مسیح (Christi Himmelfahrt)", date: "۱۴ مه ۲۰۲۶", badge: "تعطیل سراسری مذهبی", badgeColor: "bg-cyan-500", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60", location: "کلیه کلیساهای جامع ایالات اتریش" },
    { id: "ev-11", title: "جشن بزرگ عید غدیر خم همراه با اطعام متبرک", date: "۳ ژوئن ۲۰۲۶", badge: "جشن مذهبی و اعتقادی", badgeColor: "bg-green-500", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60", location: "مرکز اسلامی امام علی (ع) وین" },
    { id: "ev-12", title: "مراسم مذهبی اتریشی بدن مسیح (Fronleichnam) وین", date: "۴ ژوئن ۲۰۲۶", badge: "آیین سنتی مذهبی", badgeColor: "bg-teal-500", image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=600&auto=format&fit=crop&q=60", location: "میدان هیروها، وین" },
    { id: "ev-13", title: "شب شعر خیام، ریاضیات و اخترشناسی دانشجویی", date: "۲۸ مه ۲۰۲۶", badge: "دورهمی پرشور حسی", badgeColor: "bg-pink-500", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&auto=format&fit=crop&q=60", location: "دانوب پارک وین" },
    { id: "ev-14", title: "تئاتر کمدی «ایران در دوره رنسانس»", date: "۱۲ تا ۱۶ آپریل ۲۰۲۶", badge: "فیلم و تئاتر", badgeColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=600&auto=format&fit=crop&q=60", location: "تالار تئاتر منطقه ۷ وین" },
    { id: "ev-15", title: "اکران و نقد نمایش فیلم مستند «آخرین سفیر»", date: "۲۵ تا ۲۹ آپریل ۲۰۲۶", badge: "فیلم و تئاتر", badgeColor: "bg-blue-600", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=60", location: "سینما متروپولیس وین" }
  ], []);

  /* ====================== SERVICES ====================== */
  const services = useMemo(() => [
    { title: "مشاوره اقامت و ویزا", text: "ارزیابی هوشمند شانس اقامت بر اساس آخرین قوانین مهاجرتی و کارنامه امتیازدهی ۲۰۲۶ شما", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60", segment: "tracker" },
    { title: "محاسبه مالیات و حقوق", text: "محاسبه دقیق حقوق خالص ماهیانه و سالانه (Netto) از روی درآمد ناخالص شما (Brutto)", image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=60", segment: "finance" },
    { title: "حقوق مسکن و اجاره", text: "بررسی تمام بندهای قراردادهای اجاره اتریش (Mietvertrag) و قوانین حمایتی", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=60", segment: "tracker" },
    { title: "تحصیل و آکادمی", text: "مقایسه جامع دانشگاه‌های وین، گراتس و لینتز و شرایط اخذ بورسیه‌های تحصیلی", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60", segment: "german" },
    { title: "شغلیابی هوشمند", text: "تحلیل سریع بازار کار اتریش، شناسایی مشاغل کمیاب و بهینه‌سازی حرفه‌ای رزومه شما", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60", segment: "mapper" },
    { title: "بیمه سلامت (ÖGK)", text: "راهنماهای ثبت‌نام بیمه، کارت بیمه درمانی (e-card) و دایرکتوری پزشکان هم‌زبان", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60", segment: "tracker" }
  ], []);

  const filteredArticles = articles.filter(art =>
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ====================== RENDER ====================== */
  return (
    <>
      <SEOHead />

      <main
        className="space-y-8 animate-fade-in"
        id="portal-root"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <meta itemProp="inLanguage" content="fa-IR" />
        <meta itemProp="name" content="اتریش‌نشین — پلتفرم جامع ایرانیان مقیم اتریش" />
        <meta itemProp="description" content="راهنمای ویزا، اقامت، مالیات، بیمه، مسکن و زندگی روزمره در اتریش" />

        {/* ============================================================
            1) BRANDED HEADER / HERO WITH LOGO
           ============================================================ */}
        <header
          className="relative bg-gradient-to-br from-stone-50 via-white to-rose-50/40 dark:from-[#15110f] dark:via-[#1c1512] dark:to-[#2b0e14] border border-stone-200/60 dark:border-[#2b211d] rounded-3xl p-6 md:p-8 shadow-3xs overflow-hidden"
          itemScope itemType="https://schema.org/WPHeader"
        >
          {/* ambient glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#C8102E]/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Left: Logo & Brand */}
            <div className="flex items-center gap-4">
              <OtrishLogo size={64} />
              <div className="text-right space-y-0.5">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-stone-850 dark:text-[#ede4d8] leading-tight tracking-tight">
                  اتریش‌نشین
                </h1>
                <p className="text-[10px] sm:text-xs font-extrabold text-[#C8102E] dark:text-[#e5455f] tracking-wider">
                  OTRISH-IRAN.IR · همیار هوشمند فارسی‌زبانان در اتریش
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-black">
                    <BadgeCheck className="w-2.5 h-2.5" /> مستقل
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-black">
                    <ShieldCheck className="w-2.5 h-2.5" /> بدون وابستگی
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full font-black">
                    <Sparkles className="w-2.5 h-2.5" /> به‌روز ۲۰۲۶
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live meta info */}
            <div className="flex flex-col items-end gap-2 text-right" dir="rtl">
              <div className="flex items-center gap-2 text-[10px] font-black text-stone-600 dark:text-[#a4917f]">
                <Timer className="w-3.5 h-3.5 text-[#C8102E]" />
                <span className="font-mono">{liveClock || "--:--:--"}</span>
                <span className="text-stone-300 dark:text-stone-700">|</span>
                <span>{shamsiDateStr}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-black text-stone-400 font-mono">{miladiDateStr}</span>
                <Globe2 className="w-3 h-3 text-stone-400" />
              </div>
              <div className="hidden md:flex items-center gap-1.5 mt-1">
                {["🇦🇹", "🇮🇷", "🇪🇺"].map((f, i) => (
                  <span key={i} className="text-base drop-shadow-sm">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Subtitle / SEO-rich content */}
          <div className="relative pt-5 border-t border-stone-200/60 dark:border-[#2b211d] mt-5">
            <p className="text-xs sm:text-sm text-stone-600 dark:text-[#a4917f] font-extrabold max-w-4xl mx-auto leading-relaxed text-center">
              پلتفرم جامع و مستقل فارسی‌زبانان مقیم اتریش — از نخستین قدم‌های مهاجرت و اخذ ویزا تا زندگی روزمره،
              حمل‌ونقل با S-Bahn و U-Bahn، امور اداری MA35، مالیات، بیمه سلامت ÖGK و مشاغل کمبود؛
              همراه مطمئن شما در وین، گراتس، لینتس، سالزبورگ و اینسبروک.
            </p>
          </div>
        </header>

        {/* ============================================================
            2) RED PROPOSAL BANNER
           ============================================================ */}
        <aside
          onClick={() => onNavigate("tracker")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onNavigate("tracker")}
          className="group relative bg-gradient-to-l from-[#C8102E] via-[#aa0f26] to-[#970D22] text-white p-4 sm:p-5 rounded-2xl md:rounded-3xl shadow-[0_8px_24px_rgba(200,16,46,0.22)] cursor-pointer select-none transition-all duration-300 hover:brightness-105 hover:scale-[1.01] flex items-center justify-between overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-center gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#2657CC] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ml-3 group-hover:rotate-6 transition-transform duration-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="text-right space-y-0.5">
              <h4 className="text-xs sm:text-sm font-black tracking-tight text-white">پیشنهاد امروز: ویزای تحصیلی و کاری</h4>
              <p className="text-[10px] sm:text-xs text-white/90 font-bold">ادامه مسیر مهاجرتی خود را بررسی کنید</p>
            </div>
          </div>
          <div className="relative flex items-center gap-1 pl-1">
            <ChevronLeft className="w-5 h-5 text-white/80 group-hover:translate-x-[-3px] transition-transform duration-200" />
          </div>
        </aside>

        {/* ============================================================
            3) SEARCH BAR & QUICKSEARCH
           ============================================================ */}
        <section
          className="text-center space-y-4 max-w-2xl mx-auto py-2"
          aria-label="جستجوی سریع در اتریش‌نشین"
        >
          <div className="relative group max-w-xl mx-auto mb-4">
            <QuickSearch />
          </div>

          <div className="relative group max-w-xl mx-auto">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در اتریش‌نشین (پزشکان، قوانین، مالیات، رویدادها)..."
              aria-label="جستجو در اتریش‌نشین"
              className="w-full bg-white text-stone-900 pr-12 pl-4 py-3.5 rounded-2xl border border-stone-250 focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-650 transition-all text-xs font-extrabold shadow-sm placeholder-stone-400 group-hover:border-stone-300 dark:bg-[#1c1512] dark:border-[#382b25] dark:text-[#ede4d8]"
            />
            <Search className="absolute right-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-hover:text-stone-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 bg-stone-100 rounded-full dark:bg-stone-800"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* ============================================================
            4) WHY US — شش کارت مزیت
           ============================================================ */}
        <section
          className="bg-stone-50/55 border border-stone-200/50 rounded-3xl p-6 md:p-8 space-y-6 text-center shadow-3xs dark:bg-[#15110f] dark:border-[#2b211d] max-w-5xl mx-auto"
          aria-labelledby="why-us-heading"
          itemScope itemType="https://schema.org/ItemList"
        >
          <h2
            id="why-us-heading"
            className="text-sm sm:text-base font-black text-[#C8102E] dark:text-[#e5455f] flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-4 bg-[#C8102E] dark:bg-[#e5455f] rounded-xs" />
            چرا اتریش‌نشین؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right">
            {[
              { emoji: "✅", title: "اطلاعات به‌روز", desc: "بر پایه منابع رسمی اتریش (migration.gv.at, ÖGK, SVS, AMS, Wien.gv.at) با به‌روزرسانی مستمر.", img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80", alt: "اطلاعات به‌روز منابع رسمی اتریش" },
              { emoji: "🧮", title: "ابزارهای هوشمند محاسباتی", desc: "محاسبه‌گر Brutto-Netto، امتیاز RWR، بیمه SVS، تمکن مالی و انقضای اقامت – همه در یک اپلیکیشن.", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80", alt: "ابزارهای محاسباتی هوشمند اتریش" },
              { emoji: "📱", title: "ساختار کاربرپسند", desc: "طراحی مدرن، سریع و کاملاً واکنش‌گرا برای موبایل، تبلت و دسکتاپ – با دارک‌مود اختصاصی.", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80", alt: "طراحی کاربرپسند و مدرن" },
              { emoji: "🤝", title: "همیار مستقل", desc: "پلتفرم مستقل و بدون وابستگی به دفاتر مهاجرتی – دسترسی مستقیم به درگاه‌های رسمی دولت اتریش.", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80", alt: "پلتفرم مستقل همیار" },
              { emoji: "🎯", title: "اعتماد و شفافیت", desc: "تجربیات واقعی کاربران، مقایسه‌گر بانک و بیمه، و آزمون آمادگی مهاجرت.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80", alt: "اعتماد و شفافیت اطلاعات" },
              { emoji: "🇦🇹", title: "پوشش جامع اتریش", desc: "از وین تا گراتس، لینتس، سالزبورگ و اینسبروک – راهنمای مهاجرت به اتریش و زندگی در همه شهرها.", img: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=300&q=40", alt: "پوشش جامع شهرهای اتریش" }
            ].map((c, i) => (
              <article
                key={i}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="relative overflow-hidden group border border-stone-200/70 rounded-2xl p-5 hover:shadow-md hover:border-stone-300/90 transition-all duration-300 dark:bg-[#1c1512] dark:border-[#382b25] min-h-[155px] flex flex-col justify-between shadow-3xs hover:-translate-y-0.5"
              >
                <meta itemProp="position" content={String(i + 1)} />
                <div className="absolute inset-0 z-0">
                  <img
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-[0.14] dark:opacity-[0.08] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-50/70 via-transparent to-transparent dark:from-[#1c1512]/60" />
                </div>
                <div className="relative z-10 space-y-2">
                  <h3 itemProp="name" className="text-xs sm:text-sm font-black text-stone-850 dark:text-[#ede4d8] flex items-center gap-2">
                    <span className="text-lg">{c.emoji}</span>
                    {c.title}
                  </h3>
                  <p itemProp="description" className="text-[11px] sm:text-xs text-stone-600 dark:text-[#a4917f] font-bold leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Search results banner */}
        {searchQuery && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs font-bold text-amber-900 max-w-5xl mx-auto" role="status">
            🔍 یافته‌های جستجو برای "{searchQuery}": {filteredArticles.length} مورد پیدا شد.
          </div>
        )}

        {/* ============================================================
            5) INTERACTIVE ECOSYSTEM HERO HUB
           ============================================================ */}
        <section
          className="bg-gradient-to-br from-[#2D0B12] via-[#1A060A] to-[#120406] text-white p-6 md:p-10 rounded-[32px] relative overflow-hidden border border-[#3D141C] shadow-[0_20px_50px_rgba(45,11,18,0.35)] max-w-5xl mx-auto text-center space-y-6"
          aria-labelledby="ecosystem-heading"
        >
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-red-650/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

          <div className="relative flex justify-center md:justify-end select-none">
            <span className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#E5C158] text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full font-black tracking-tight shadow-[0_4px_12px_rgba(212,175,55,0.1)]">
              <OtrishLogo size={16} />
              سرویس‌دهی مستقل — OTRISH-IRAN.IR
            </span>
          </div>

          <div className="relative space-y-3.5 max-w-2xl mx-auto">
            <h2
              id="ecosystem-heading"
              className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight"
            >
              در اتریش، <span className="text-[#EDC575] drop-shadow-[0_2px_10px_rgba(237,197,117,0.2)]">همه چیز در یک جا</span> برای همراهی شما
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-stone-350 font-bold leading-relaxed">
              بزرگترین پورتال هوشمند فارسی‌زبانان — راهنمای اقامت، ابزارهای مالی، محاسبه Brutto–Netto،
              واژه‌نامه لهجه اتریشی و تسهیل مسیرهای اداری برای شما.
            </p>
          </div>

          <div className="w-full space-y-6 pt-4 text-right" dir="rtl">
            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
              <button
                onClick={() => { onNavigate("immigration-assessment"); toast.success("در حال بارگذاری فرم ارزیابی مهاجرت... ⚡"); }}
                className="bg-gradient-to-r from-[#C8102E] to-[#AA0F26] hover:from-[#E51636] hover:to-[#C8102E] active:scale-95 text-white text-[11px] sm:text-xs font-black px-6 py-3.5 rounded-full shadow-[0_8px_25px_rgba(200,16,46,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E5455F]/20 hover:shadow-[0_10px_35px_rgba(200,16,46,0.5)]"
              >
                <Zap className="w-4 h-4" />
                <span>محاسبه شانس مهاجرت</span>
              </button>

              <button
                onClick={() => { onNavigate("finance"); toast.success("بارگذاری محاسبه‌گر پیشرفته Brutto-Netto 📊"); }}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-[11px] sm:text-xs font-black px-5 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-amber-300" />
                <span>محاسبه‌گر حقوق خالص (Brutto-Netto)</span>
              </button>

              <button
                onClick={() => { setShow100DaysModal(true); toast.success("بارگذاری چک‌لیست طلایی ورود به اتریش 📋"); }}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white text-[11px] sm:text-xs font-black px-5 py-3.5 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <Clipboard className="w-4 h-4 text-emerald-300" />
                <span>چک‌لیست ۱۰۰ روز اول ورود</span>
              </button>
            </div>

            {/* Grouped Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {[
                {
                  title: "مهاجرت و اقامت اتریش", icon: "💼",
                  desc: "فرم‌ها، ارزیابی مدارک و پایش دائم پرونده‌های اقامتی",
                  color: "from-amber-500/10 to-red-500/5 border-red-500/15",
                  items: [
                    { id: "doccheck", label: "بررسی مدارک اولیه", icon: "✅", borderColor: "hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]", segment: "doccheck", badge: "هوشمند" },
                    { id: "appointment", label: "درخواست وقت ملاقات", icon: "📅", borderColor: "hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]", segment: "appointment", badge: "MA35" },
                    { id: "caseprofile", label: "پروفایل پرونده مهاجرتی", icon: "📁", borderColor: "hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]", segment: "tracker" },
                    { id: "shortagemap", label: "نقشه مشاغل کمبود", icon: "🗺️", borderColor: "hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]", segment: "mapper" }
                  ]
                },
                {
                  title: "امور مسکن و معیشت روزمره", icon: "🏠",
                  desc: "سامانه جستجوی املاک، نیازمندی‌ها و هزینه‌های زندگی",
                  color: "from-emerald-500/10 to-teal-500/5 border-teal-500/15",
                  items: [
                    { id: "housesearch", label: "جستجوی هوشمند مسکن", icon: "🏠", borderColor: "hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]", segment: "housesearch", badge: "طلایی" },
                    { id: "livingcost", label: "ماشین‌حساب هزینه زندگی", icon: "📊", borderColor: "hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]", segment: "finance" },
                    { id: "classifieds", label: "نیازمندی‌های ایرانیان", icon: "🛒", borderColor: "hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]", segment: "carpool" }
                  ]
                },
                {
                  title: "پرتال حقوقی، اداری و اخبار", icon: "⚖️",
                  desc: "فسخ و قالب قراردادها، رتبه‌بندی خدمات و خبرنامه فوری",
                  color: "from-blue-500/10 to-indigo-500/5 border-blue-500/15",
                  items: [
                    { id: "contracttmpl", label: "قالب قراردادها", icon: "📄", borderColor: "hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]", segment: "contract-cancellation" },
                    { id: "ratings", label: "امتیازدهی خدمات", icon: "⭐", borderColor: "hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]", segment: "ratings", badge: "نظرسنجی" },
                    { id: "newsalerts", label: "اخبار فوری اتریش", icon: "📰", borderColor: "hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]", segment: "home" }
                  ]
                },
                {
                  title: "سامانه‌های هوشمند و زبان", icon: "🤖",
                  desc: "ربات‌های کمکی هوشمند، فرم‌سازها و آموزش آلمانی بومی",
                  color: "from-purple-500/10 to-pink-500/5 border-purple-500/15",
                  items: [
                    { id: "smartsearch", label: "دستیار جستجوی هوشمند", icon: "🤖", borderColor: "hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]", segment: "smart", badge: "AI" },
                    { id: "germaneguide", label: "راهنمای یادگیری آلمانی", icon: "📖", borderColor: "hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]", segment: "german" }
                  ]
                }
              ].map((group, gIdx) => (
                <div
                  key={gIdx}
                  className={`bg-gradient-to-b ${group.color} backdrop-blur-md border rounded-[24px] p-5 text-right space-y-3.5 transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-2.5 border-b border-white/5 pb-2.5">
                    <span className="text-xl">{group.icon}</span>
                    <div>
                      <h3 className="text-[12.5px] font-black text-[#EDC575]">{group.title}</h3>
                      <p className="text-[10px] text-stone-400 font-bold">{group.desc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {group.items.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          if (cat.id === "newsalerts") {
                            onNavigate("home");
                            const newsEl = document.getElementById("news-banner-section") || document.getElementById("news-headline");
                            if (newsEl) {
                              newsEl.scrollIntoView({ behavior: "smooth" });
                              toast.success("دریافت آخرین خبرنامه فوری اتریش‌نشین 📰");
                            } else {
                              toast.success("دریافت آخرین خبرنامه فوری اتریش‌نشین 📰");
                            }
                          } else {
                            onNavigate(cat.segment);
                            toast.success(`بارگذاری سامانه هوشمند: ${cat.label} ⚡`);
                          }
                        }}
                        className={`bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white text-[11px] sm:text-xs font-black p-3.5 rounded-xl flex items-center justify-between transition-all duration-300 hover:scale-[1.02] select-none cursor-pointer ${cat.borderColor}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm shrink-0">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </div>
                        {cat.badge && (
                          <span className="bg-red-650 text-white text-[7.5px] px-1.5 py-0.5 rounded-full border border-red-500/20 shadow-xs scale-90">
                            {cat.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            6) FLOW CARDS + STATS
           ============================================================ */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right max-w-5xl mx-auto" aria-label="ویژگی‌های کلیدی اتریش‌نشین">
          {[
            { title: "به‌روزرسانی لحظه‌ای", desc: "اخبار، فرم‌ها و مسیرهای مهم در یک فضای سریع و قابل‌فهم.", icon: Zap, color: "text-amber-500 dark:text-amber-400" },
            { title: "مسیر روشن برای شروع", desc: "از ویزا و اقامت تا مالیات و زندگی روزمره، همه در یک جریان.", icon: Compass, color: "text-amber-600 dark:text-amber-500" },
            { title: "منابع رسمی و قابل اتکا", desc: "اطلاعات بر پایه منابع معتبر اتریش و دسترسی مستقیم به خدمات مهم.", icon: Lock, color: "text-amber-700 dark:text-amber-650" }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <article key={i} className="bg-stone-50/45 border border-stone-200/50 dark:bg-[#15110f]/45 dark:border-[#2b211d] p-5 rounded-3xl flex items-center justify-between gap-4 shadow-3xs hover:shadow-2xs transition-all duration-300 hover:scale-[1.01]">
                <div className="space-y-1 flex-1">
                  <h4 className="text-xs sm:text-sm font-black text-stone-850 dark:text-[#ede4d8]">{card.title}</h4>
                  <p className="text-[11px] sm:text-xs text-stone-600 dark:text-[#a4917f] font-bold leading-relaxed">{card.desc}</p>
                </div>
                <div className="w-12 h-12 bg-[#FFFDF5] dark:bg-[#2b211d] border border-amber-100 dark:border-[#4d3b33] rounded-full flex items-center justify-center shrink-0 shadow-3xs">
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </article>
            );
          })}
        </section>

        {/* ============================================================
            7) STATS
           ============================================================ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-5xl mx-auto" aria-label="آمار پلتفرم">
          {[
            { value: "+۲۵۰۰", label: "سند و مقاله ثبت‌شده", icon: FileText, border: "border-red-500 dark:border-[#e5455f]" },
            { value: "+۵۰۰", label: "رویداد فعال", icon: Calendar, border: "border-emerald-500 dark:border-emerald-600" },
            { value: "+۱K", label: "کاربر همیار", icon: Users, border: "border-blue-500 dark:border-blue-600" },
            { value: "۸", label: "ابزار هوشمند", icon: Settings, border: "border-amber-500 dark:border-amber-600" }
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`bg-stone-50/20 dark:bg-[#1c1512] border border-stone-200/50 dark:border-[#382b25] p-5 rounded-3xl shadow-3xs hover:shadow-2xs transition-all duration-300 flex flex-col items-center justify-between min-h-[140px] border-b-4 ${s.border} hover:scale-[1.02]`}>
                <Icon className="w-6 h-6 text-stone-400 dark:text-stone-500 mb-1" />
                <span className="text-2xl md:text-3xl font-black text-stone-850 dark:text-[#ede4d8] leading-none my-1 tracking-tight font-mono">{s.value}</span>
                <span className="text-[10px] sm:text-xs text-stone-500 dark:text-[#a4917f] font-extrabold">{s.label}</span>
              </div>
            );
          })}
        </section>

        {/* ============================================================
            8) CATEGORIES BENTO GRID
           ============================================================ */}
        <section className="space-y-3" aria-labelledby="categories-heading">
          <h3 id="categories-heading" className="text-xs font-black text-stone-700 flex items-center gap-1.5 px-1">
            <span className="w-1.5 h-3.5 bg-red-600 rounded-xs" />
            دسته‌بندی‌های کلیدی اتریش‌نشین (Austria Portal)
          </h3>
          <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5" aria-label="دسته‌بندی‌های کلیدی">
            {categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={idx}
                  id={`cat-${cat.id}`}
                  onClick={cat.onClick}
                  title={cat.seo}
                  aria-label={cat.seo}
                  className={`p-3.5 rounded-2xl border text-right flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md shadow-3xs ${cat.color}`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="p-1.5 rounded-xl bg-white text-stone-800 shrink-0 shadow-3xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-black truncate">{cat.title}</span>
                  </div>
                  {cat.badge && (
                    <span className={`text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded-xs shrink-0 ${cat.badgeColor || 'bg-red-500'} animate-pulse`}>
                      {cat.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </section>

        {/* ============================================================
            9) URGENT BROADCAST
           ============================================================ */}
        <aside
          className="bg-red-50 border border-red-200 rounded-2xl p-3 flex items-center justify-between text-xs font-bold gap-4 overflow-hidden shadow-2xs max-w-5xl mx-auto"
          role="alert"
          id="news-banner-section"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-[9px] text-white font-black px-2 py-1 rounded bg-red-600 shrink-0 animate-pulse">فوری</span>
            <p className="text-[11px] text-stone-800 truncate text-right font-black" id="news-headline">
              قانون جدید اقامت اتریش ۲۰۲۶ — ابلاغیه جدید قوانین امتیازدهی صادر شد. (تغییرات مهم برای متقاضیان)
            </p>
          </div>
          <button
            onClick={() => setShow100DaysModal(true)}
            className="text-[10px] text-red-700 hover:text-red-900 cursor-pointer select-none font-black shrink-0 underline"
          >
            جزییات تعهدات ←
          </button>
        </aside>

        <IranianEventsCalendar />

        {/* ============================================================
            10) PRACTICAL TOOLS GRID
           ============================================================ */}
        <section className="space-y-2 border-t border-stone-150 pt-3" aria-labelledby="tools-heading">
          <h3 id="tools-heading" className="text-xs sm:text-sm font-black text-stone-850 flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded-lg bg-red-50 text-red-600 font-extrabold text-[10px]">ابزارهای ویژه</span>
            ابزارهای کاربردی و حیاتی (Practical Swiss-Army Tools)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* 1) Brutto-Netto */}
            <div
              onClick={() => onNavigate("finance")}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("finance")}
              className="flex items-center justify-between p-4 rounded-2.5xl border border-amber-100 bg-amber-50/50 hover:bg-amber-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-amber-400 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs group-hover:rotate-6 transition-transform">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="text-right space-y-0.5">
                  <h4 className="text-xs font-black text-stone-800">محاسبه آنلاین حقوق خالص از ناخالص</h4>
                  <p className="text-[10px] text-amber-700 font-extrabold font-mono">Brutto ➔ Netto Calculator 2026</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-stone-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 2) Residence Tracker */}
            <div
              onClick={() => onNavigate("tracker")}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("tracker")}
              className="flex items-center justify-between p-4 rounded-2.5xl border border-pink-100 bg-pink-50/50 hover:bg-pink-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-pink-400 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs group-hover:rotate-6 transition-transform">
                  <Clipboard className="w-5 h-5" />
                </div>
                <div className="text-right space-y-0.5">
                  <h4 className="text-xs font-black text-stone-800">پرونده اقامت و مانیتورینگ کارتابل</h4>
                  <p className="text-[10px] text-pink-700 font-extrabold">پیگیری گام به گام تا صدور کارت سرخ‌سفیدسرخ</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-stone-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 3) Currency */}
            <div
              onClick={() => onNavigate("finance")}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("finance")}
              className="flex items-center justify-between p-2 rounded-xl border border-green-100 bg-green-50/50 hover:bg-green-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="text-right space-y-0">
                  <h4 className="text-[10px] font-black text-stone-800">ماشین حساب مبدل نرخ ارز (یورو / تومان)</h4>
                  <p className="text-[9px] text-green-700 font-extrabold">بروزرسانی زنده صرافی</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-stone-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 4) 100 days */}
            <div
              onClick={() => setShow100DaysModal(true)}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShow100DaysModal(true)}
              className="flex items-center justify-between p-2 rounded-xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-sky-400 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="text-right space-y-0">
                  <h4 className="text-[10px] font-black text-stone-800">۱۰۰ روز اول مهاجرت به اتریش</h4>
                  <p className="text-[9px] text-sky-700 font-extrabold">کارهای واجبی که باید در هفته‌های اول انجام دهید</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-stone-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 5) Doctors */}
            <div
              onClick={() => setShowDoctorModal(true)}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowDoctorModal(true)}
              className="flex items-center justify-between p-2 rounded-xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-400 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="text-right space-y-0">
                  <h4 className="text-[10px] font-black text-stone-800">راهنمای سلامت و دایرکتوری پزشکان</h4>
                  <p className="text-[9px] text-purple-700 font-extrabold">پیدا کردن متخصصین پزشک فارسی‌زبان</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-stone-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 6) Waste */}
            <div
              onClick={() => setShowMullModal(true)}
              role="link" tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowMullModal(true)}
              className="flex items-center justify-between p-2 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100/30 transition-all cursor-pointer group shadow-3xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Trash2 className="w-4 h-4" />
                </div>
                <div className="text-right space-y-0">
                  <h4 className="text-[10px] font-black text-stone-800">راهنمای تفکیک زباله</h4>
                  <p className="text-[9px] text-emerald-700 font-extrabold">جلوگیری از جریمه شهرداری</p>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-emerald-400 group-hover:translate-x-[-3px] transition-transform" />
            </div>

            {/* 7) Radio */}
            <div className="p-3 rounded-xl border border-stone-200 bg-stone-900 text-white transition-all shadow-xs flex flex-row items-center justify-between gap-2 md:col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent pointer-events-none" />
              <div className="relative flex items-center gap-2 text-right">
                <button
                  onClick={() => setIsRadioPlaying(!isRadioPlaying)}
                  className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
                  aria-label={isRadioPlaying ? "توقف پخش رادیو" : "پخش رادیو"}
                >
                  {isRadioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <div className="space-y-0">
                  <h4 className="text-[10px] font-black text-white flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-red-400" />
                    رادیو اتریش‌نشین
                  </h4>
                  <p className="text-[9px] text-stone-400 font-bold">پخش زنده پادکست و موسیقی</p>
                </div>
                {/* Equalizer */}
                <div className="flex items-end gap-[2px] h-5 ml-3" aria-hidden="true">
                  {eqBars.map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-sm bg-gradient-to-t from-red-600 to-amber-400 transition-all duration-150"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative flex items-center gap-2 shrink-0">
                <Volume2 className="w-4 h-4 text-stone-400" />
                <label htmlFor="radio-volume-slider" className="sr-only">میزان صدای رادیو</label>
                <input
                  id="radio-volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={radioVolume}
                  onChange={(e) => setRadioVolume(Number(e.target.value))}
                  className="w-16 accent-red-600 cursor-pointer h-1 rounded-lg bg-stone-700"
                  aria-label="میزان صدای رادیو"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Austria Smart Suite */}
        <div className="border-t border-stone-150 pt-8 mt-4">
          <AustriaSmartSuite />
        </div>

        {/* ============================================================
            11) SERVICES SLIDER
           ============================================================ */}
        <section className="space-y-2 border-t border-stone-150 pt-3" aria-labelledby="services-heading">
          <div className="flex flex-row items-center justify-between">
            <div className="text-right space-y-1">
              <span className="text-[10px] font-extrabold text-red-600 tracking-wider">خدمات اتریش‌نشین</span>
              <h3 id="services-heading" className="text-sm sm:text-base font-black text-stone-900 leading-tight">
                همه چیز در یک جا برای همراهی شما
              </h3>
              <p className="text-[11px] text-stone-500 font-bold">از اولین روز ورود به قلمرو اتریش تا اخذ تابعیت، در هر مرحله در کنارتان هستیم</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0" dir="ltr">
              <button
                onClick={() => scrollBy(scrollServicesRef, "left")}
                className="p-2.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                aria-label="قبلی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(scrollServicesRef, "right")}
                className="p-2.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                aria-label="بعدی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollServicesRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth text-right no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((serv, i) => (
              <article
                key={i}
                itemScope
                itemType="https://schema.org/Service"
                className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-3xs hover:shadow-xs hover:border-stone-300 hover:-translate-y-0.5 transition-all flex flex-col justify-between w-[280px] sm:w-[325px] snap-start shrink-0"
              >
                <div className="relative h-44">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-stone-900/40 backdrop-blur-md p-1.5 rounded-xl text-white">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between text-right">
                  <div className="space-y-1">
                    <h4 itemProp="name" className="text-xs sm:text-sm font-black text-stone-850">{serv.title}</h4>
                    <p itemProp="description" className="text-[10.5px] text-stone-500 font-bold leading-relaxed">{serv.text}</p>
                  </div>
                  <button
                    onClick={() => onNavigate(serv.segment as any)}
                    className="mt-3 text-[11px] font-black text-red-650 hover:text-red-800 transition-colors flex items-center gap-1.5 pt-2 border-t border-stone-100 self-start"
                  >
                    <span>اقدام و مشاهده ابزار مربوطه</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            12) EVENTS SLIDER
           ============================================================ */}
        <section className="space-y-2 border-t border-stone-150 pt-3" id="events-section" aria-labelledby="events-heading">
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider">بخش رویدادها</span>
              <h3 id="events-heading" className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                رویدادهای جامعه ایرانی اتریش
              </h3>
              <p className="text-[11px] text-stone-500 font-bold">کنسرت‌ها، جشن‌های سنتی، فستیوال‌ها، فیلم و تئاترها در وین و سایر ایالات</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0" dir="ltr">
              <button
                onClick={() => scrollBy(scrollEventsRef, "left")}
                className="p-2.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                aria-label="قبلی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollBy(scrollEventsRef, "right")}
                className="p-2.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                aria-label="بعدی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollEventsRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth text-right no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((ev) => (
              <article
                key={ev.id}
                onClick={() => setShowEventModal(ev)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowEventModal(ev)}
                itemScope itemType="https://schema.org/Event"
                className="group relative h-48 rounded-2.5xl overflow-hidden cursor-pointer shadow-3xs hover:shadow-xs hover:scale-[1.01] transition-all w-[240px] sm:w-[280px] snap-start shrink-0"
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-between p-3.5 text-right">
                  <span className={`self-start text-[8px] font-black px-2 py-0.5 rounded text-white ${ev.badgeColor}`}>
                    {ev.badge}
                  </span>
                  <div className="space-y-1">
                    <h4 itemProp="name" className="text-[11px] font-black text-white leading-tight">{ev.title}</h4>
                    <div className="flex items-center gap-1.5 text-stone-300 text-[9px] font-bold">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span itemProp="startDate">{ev.date}</span>
                    </div>
                    <div className="text-[8.5px] text-stone-400 font-semibold truncate" itemProp="location">
                      📍 {ev.location}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate("carpool")}
              className="w-full sm:w-auto bg-stone-900 hover:bg-stone-850 text-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-md cursor-pointer transition-colors active:scale-98 flex items-center justify-center gap-2 mx-auto"
            >
              <span>مشاهده و ثبت نام تمام رویدادها 📅</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ============================================================
            13) ARTICLES SLIDER
           ============================================================ */}
        <section className="space-y-2 border-t border-stone-150 pt-3" aria-labelledby="articles-heading">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 id="articles-heading" className="text-sm sm:text-base font-black text-stone-900">
                آخرین مقالات و مجله آموزشی
              </h3>
              <p className="text-[11px] text-stone-500 font-bold">راهنماها، آخرین کار‌های اداری، اطلاعیه‌ها و مطالب کاربردی و دانستنی توسعه‌دهنده</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="search"
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="جستجوی سریع بین مقالات..."
                  aria-label="جستجو در مقالات"
                  className="w-full bg-white text-stone-950 pr-9 pl-3 py-2 rounded-xl border border-stone-250 focus:outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-650 text-xs font-semibold shadow-3xs"
                />
                <Search className="absolute right-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-1.5 shrink-0" dir="ltr">
                <button
                  onClick={() => scrollBy(scrollArticlesRef, "left")}
                  className="p-2 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                  aria-label="قبلی"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollBy(scrollArticlesRef, "right")}
                  className="p-2 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 active:scale-95 transition-all rounded-xl cursor-pointer shadow-3xs"
                  aria-label="بعدی"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            ref={scrollArticlesRef}
            className="flex gap-4.5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth text-right no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {(() => {
              const filteredLocalArticles = articles.filter(art => {
                const query = (articleSearchQuery || "").trim().toLowerCase();
                if (!query) return true;
                return art.title.toLowerCase().includes(query) ||
                  art.content.toLowerCase().includes(query) ||
                  art.badge.toLowerCase().includes(query);
              });

              if (filteredLocalArticles.length === 0) {
                return (
                  <div className="w-full p-8 text-center bg-stone-50 border border-stone-150 rounded-2xl text-stone-450 text-xs font-extrabold flex flex-col items-center justify-center gap-2">
                    <span>🔍 مقاله‌ای با این شرایط یافت نشد.</span>
                    <button
                      onClick={() => setArticleSearchQuery("")}
                      className="text-red-650 hover:underline text-[10.5px]"
                    >
                      پاک کردن جستجو
                    </button>
                  </div>
                );
              }

              return filteredLocalArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => setShowArticleModal(art)}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setShowArticleModal(art)}
                  itemScope itemType="https://schema.org/NewsArticle"
                  className="bg-white border border-stone-200 rounded-2.5xl overflow-hidden shadow-3xs cursor-pointer hover:border-stone-300 hover:shadow-2xs hover:-translate-y-0.5 transition-all flex flex-col justify-between group w-[280px] sm:w-[325px] snap-start shrink-0"
                >
                  <div className="relative h-40">
                    <img
                      src={art.image}
                      alt={art.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-300"
                      itemProp="image"
                    />
                    <span className={`absolute top-3.5 right-3.5 text-[8.5px] font-black px-2 py-1 rounded-md shadow-xs ${art.badgeStyle}`}>
                      {art.badge}
                    </span>
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-right">
                    <h4 itemProp="headline" className="text-[11.5px] font-black text-stone-850 leading-relaxed group-hover:text-red-700 transition-colors">
                      {art.title}
                    </h4>
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[10px] text-stone-400 font-bold">
                      <span>📅 انتشار در <span itemProp="datePublished">{art.date}</span></span>
                      <span className="text-red-650 hover:underline font-black">مشاهده مقاله</span>
                    </div>
                  </div>
                </article>
              ));
            })()}
          </div>

          <div className="text-center pt-1">
            <button
              onClick={() => onNavigate("tracker")}
              className="w-full sm:w-auto border border-stone-300 hover:border-stone-400 text-stone-800 bg-white font-black text-xs px-8 py-3.5 rounded-2xl shadow-3xs cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2 mx-auto"
            >
              <span>مشاهده همه مقالات و کاتالوگ‌های آموزشی 📄</span>
            </button>
          </div>
        </section>

        {/* ============================================================
            14) SEO-RICH FOOTER CONTENT
           ============================================================ */}
        <footer className="border-t border-stone-150 pt-6 mt-6 space-y-5 max-w-5xl mx-auto" itemScope itemType="https://schema.org/WPFooter">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-right">
            <div className="space-y-2">
              <h3 className="text-xs font-black text-stone-850 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#C8102E]" />
                درباره اتریش‌نشین
              </h3>
              <p className="text-[10.5px] text-stone-500 font-bold leading-relaxed">
                اتریش‌نشین یک پلتفرم مستقل و غیرانتفاعی است که به منظور تسهیل مسیر ادغام، اقامت و زندگی فارسی‌زبانان در اتریش طراحی شده است.
                تمام اطلاعات بر اساس منابع رسمی اتریش (migration.gv.at, ÖGK, AMS, MA35, Wien.gv.at) به‌روزرسانی می‌شود.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-black text-stone-850 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-[#C8102E]" />
                شهرهای تحت پوشش
              </h3>
              <ul className="text-[10.5px] text-stone-500 font-bold leading-relaxed space-y-1">
                <li>• وین (Wien) — پایتخت و بزرگترین شهر اتریش</li>
                <li>• گراتس (Graz) — پایتخت ایالت اشتایرمارک</li>
                <li>• لینتس (Linz) — اتریش علیا</li>
                <li>• سالزبورگ (Salzburg) — شهر موتزارت</li>
                <li>• اینسبروک (Innsbruck) — قلب آلپ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-black text-stone-850 flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#C8102E]" />
                خدمات کلیدی
              </h3>
              <ul className="text-[10.5px] text-stone-500 font-bold leading-relaxed space-y-1">
                <li>• مشاوره اقامت و ویزا</li>
                <li>• محاسبه‌گر Brutto-Netto و مالیات</li>
                <li>• دایرکتوری پزشکان فارسی‌زبان ÖGK</li>
                <li>• مسکن و Gemeindewohnung</li>
                <li>• آموزش آلمانی اتریشی</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-stone-400 font-bold">
            <div className="flex items-center gap-2">
              <OtrishLogo size={24} />
              <span>© ۲۰۲۶ اتریش‌نشین · OTRISH-IRAN.IR</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> اطلاعات مستقل و بدون وابستگی</span>
              <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> به‌روز ۲۰۲۶</span>
            </div>
          </div>
        </footer>

        {/* ============================================================
            MODALS
           ============================================================ */}

        {/* WASTE SEPARATION MODAL */}
        {showMullModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="bg-emerald-600 text-white p-5 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5">
                  <Trash2 className="w-6 h-6" />
                  <div>
                    <h3 className="text-sm font-black">راهنمای جامع تفکیک زباله اتریش (Mülltrennung)</h3>
                    <p className="text-[10px] text-emerald-100 font-bold">پیشگیری از جریمه‌های جدی زیست‌محیطی محلی</p>
                  </div>
                </div>
                <button
                  onClick={() => { setShowMullModal(false); setSelectedMullColor(null); }}
                  className="p-1 px-2.5 bg-emerald-700 rounded-xl hover:bg-emerald-800 text-xs font-bold transition-all"
                  aria-label="بستن"
                >بستن ×</button>
              </div>

              <div className="p-6 space-y-6 text-right overflow-y-auto max-h-[70vh]">
                <p className="text-[11px] text-stone-500 font-bold leading-relaxed">
                  در اتریش تفکیک زباله یک قانون به شدت جدی و عمومی است. شهرداری‌ها سطل‌های رنگی مجزایی را تدارک دیده‌اند. لطفاً روی هر سطل کلیک کنید تا متوجه شوید چه موادی داخل آن مجاز است:
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { id: "yellow", name: "زغال / زرد", color: "bg-yellow-400 border-yellow-500 text-white", text: "Gelbe Tonne", desc: "پلاستیک و فلز" },
                    { id: "blue", name: "کارتن / آبی", color: "bg-blue-500 border-blue-600 text-white", text: "Papiertonne", desc: "کاغذ و کارتن" },
                    { id: "brown", name: "ارگانیک / بیو", color: "bg-amber-800 border-amber-900 text-white", text: "Biotonne", desc: "پسماند غذایی گیاهی" },
                    { id: "glass", name: "شیشه / سبز", color: "bg-emerald-700 border-emerald-800 text-white", text: "Altglas", desc: "بطری و ظروف شیشه‌ای" },
                    { id: "black", name: "سایرین / سیاه", color: "bg-stone-800 border-stone-900 text-white", text: "Restmüll", desc: "باقی مانده زباله" }
                  ].map((tc) => (
                    <button
                      key={tc.id}
                      onClick={() => setSelectedMullColor(tc.id)}
                      className={`p-3 rounded-2xl border text-center font-bold text-[10.5px] transition-all cursor-pointer hover:scale-102 flex flex-col items-center gap-1.5 ${tc.color} ${selectedMullColor === tc.id ? 'ring-4 ring-emerald-500/25 border-emerald-500 scale-102 font-black' : ''}`}
                    >
                      <span>{tc.name}</span>
                      <span className="text-[8px] opacity-80">{tc.text}</span>
                    </button>
                  ))}
                </div>

                {selectedMullColor ? (
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 animate-fade-in space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      <h5 className="font-extrabold text-stone-850 text-xs">
                        جزئیات سطل {selectedMullColor === "yellow" ? "زرد (پلاستیک و فلز)" : selectedMullColor === "blue" ? "آبی (کاغذ و کارتن)" : selectedMullColor === "brown" ? "قهوه‌ای (بیو)" : selectedMullColor === "glass" ? "شیشه‌های تفکیکی" : "سیاه (سایر زباله‌ها)"}:
                      </h5>
                    </div>
                    <p className="text-[11px] text-stone-600 font-bold leading-relaxed">
                      👉 {
                        selectedMullColor === "yellow" ? "شامل انواع بطری‌های پت (PET) نوشابه، شوینده‌ها بدون درپوش، تتراپک‌های شیر و آبمیوه، و قوطی‌های کنسرو فلزی." :
                        selectedMullColor === "blue" ? "شامل انواع کارتن‌های تا شده خالی، کاغذ باطله، پاکت‌های کاغذی خرید، روزنامه‌ها و دفاتر قدیمی." :
                        selectedMullColor === "brown" ? "شامل پوست میوه‌ها و ریشه سبزی‌ها، باقی‌مانده غذای گیاهی، گل و گیاه گلدانی بدون خاک زیاد." :
                        selectedMullColor === "glass" ? "شیشه‌ها باید کاملاً خالی باشند. شیشه زرد، قهوه‌ای و سبز در بخش شیشه‌های رنگی و شیشه بی‌رنگ در بخش شیشه‌های شفاف انداخته می‌شوند." :
                        "شامل تمام پسماندهایی که زیستی نیستند و قابل بازیافت هم نمی‌باشند. مانند نوار‌های بهداشتی، سرامیک‌های شکسته، پوشک و دستمال‌های یکبار مصرف."
                      }
                    </p>
                  </div>
                ) : (
                  <div className="p-3 text-center bg-stone-100 rounded-xl text-[10px] text-stone-400 font-bold">
                    برای نمایش اقلام مجاز و ترفندهای تفکیک، یکی از سطل‌های رنگی بالا را انتخاب کنید.
                  </div>
                )}
              </div>

              <div className="bg-stone-50 p-4 border-t border-stone-100 text-center text-[10px] text-stone-400 font-bold font-mono">
                Otrish-Iran Trash Recycling Compliance
              </div>
            </div>
          </div>
        )}

        {/* DOCTOR DIRECTORY MODAL */}
        {showDoctorModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="bg-rose-600 text-white p-5 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-6 h-6" />
                  <div>
                    <h3 className="text-sm font-black">پزشکان و دندانپزشکان فارسی زبان در وین و اتریش</h3>
                    <p className="text-[10px] text-rose-100 font-bold">سازگار با بیمه‌های سلامت اتریش (ÖGK, SVS, BVAEB)</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDoctorModal(false)}
                  className="p-1 px-2.5 bg-rose-700 hover:bg-rose-800 text-xs font-bold rounded-xl transition-all"
                  aria-label="بستن"
                >بستن ×</button>
              </div>

              <div className="p-6 space-y-4 text-right overflow-y-auto max-h-[60vh]">
                <div className="p-3 bg-red-50 text-red-800 border border-red-100 rounded-2xl text-[10px] font-bold">
                  ⚠️ توجه: قبل از مراجعه حضوری به مطب این پزشکان، حتماً از طریق تلفن مطب وقت ملاقات رزرو کنید و از فعال بودن پوشش درمانی ÖGK خود (داشتن e-card معتبر) مطمئن شوید.
                </div>

                {[
                  { name: "دکتر مریم امینی", spec: "متخصص جراح عمومی و زیبایی", city: "وین - منطقه ۱", phone: "+43 1 543 21 00", bg: "ÖGK, خصوصی" },
                  { name: "دکتر خسرو روحانی", spec: "متخصص طب کودکان و نوزادان", city: "گراتس - ایالت اشتایرمارک", phone: "+43 316 887 66 11", bg: "ÖGK, تمام بیمه‌ها" },
                  { name: "دکتر نادیا صانعی", spec: "دندانپزشک و متخصص پروتز", city: "وین - منطقه ۹", phone: "+43 1 908 77 66", bg: "SVS, ÖGK" },
                  { name: "دکتر رامین بهاری", spec: "متخصص پوست و بیماری‌های مو", city: "زالتسبورگ", phone: "+43 662 432 11 99", bg: "خصوصی (Wahlarzt)" },
                  { name: "دکتر سارا شریفی", spec: "متخصص مغز و روان‌پزشک", city: "لینتس - اتریش علیا", phone: "+43 732 123 45 67", bg: "ÖGK, BVAEB" }
                ].map((doc, idx) => (
                  <div key={idx} className="p-4 border border-stone-200 rounded-2xl flex items-center justify-between hover:border-rose-300 transition-all bg-stone-50/40">
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-stone-800">{doc.name}</h4>
                      <p className="text-[10px] text-stone-500 font-bold">{doc.spec} • {doc.city}</p>
                      <span className="inline-block text-[9px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-100">
                        بیمه‌های طرف قرارداد: {doc.bg}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <a href={`tel:${doc.phone}`} className="inline-block text-[11px] font-mono font-black text-rose-650 bg-white border border-rose-200 p-2 rounded-xl hover:bg-rose-50 transition-all">
                        📞 {doc.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-50 text-center border-t border-stone-100">
                <button
                  onClick={() => { setShowDoctorModal(false); onNavigate("mapper"); }}
                  className="text-[11px] font-black text-red-650 hover:underline"
                >
                  جستجوی سایر پزشکان و مترجمان رسمی در نقشه خدماتی ←
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 100 DAYS MODAL */}
        {show100DaysModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="bg-sky-600 text-white p-5 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-6 h-6 animate-bounce" />
                  <div>
                    <h3 className="text-sm font-black">برنامه ۱۰۰ روز اول زندگی و ورود در اتریش (Entry Steps)</h3>
                    <p className="text-[10px] text-sky-100 font-bold">بسته‌های اداری حیاتی از روز اول تا ماه سوم</p>
                  </div>
                </div>
                <button
                  onClick={() => setShow100DaysModal(false)}
                  className="p-1 px-2.5 bg-sky-700 hover:bg-sky-800 text-xs font-bold rounded-xl transition-all"
                  aria-label="بستن"
                >بستن ×</button>
              </div>

              <div className="p-6 space-y-4 text-right overflow-y-auto max-h-[60vh]">
                {[
                  { title: "روز ۱ الی ۳: ثبت آدرس سکونت (Meldezettel)", desc: "ثبت آدرس رسمی در شهرداری محل (Meldeamt) ظرف ۳ روز کاری از ورود الزامی است." },
                  { title: "روز ۳ الی ۷: افتتاح حساب بانکی", desc: "افتتاح حساب جاری برای دریافت حقوق یا تراکنش‌های حواله در Erste Bank یا Bank Austria." },
                  { title: "هفته اول: فعال‌سازی سیم‌کارت اتریشی", desc: "خرید سیم‌کارت اپراتورهای محلی مانند Drei (3) یا Magenta و ثبت هویت الزامی آن." },
                  { title: "ماه اول: ثبت‌نام بیمه سلامت ملی (ÖGK)", desc: "ثبت‌نام و دریافت برگه رسمی بیمه از ÖGK و گرفتن e-card عکس‌دار شما." },
                  { title: "ماه دوم: تایید محل خدمت اداری (Anmeldebescheinigung)", desc: "ویژه دارندگان کارت اقامت‌های ارزیابی شده که باید مراحل تکمیلی اداری را در MA 35 طی کنند." }
                ].map((step, index) => (
                  <div key={index} className="p-4 border-r-4 border-r-sky-500 bg-stone-50 border border-stone-200 rounded-l-2xl text-right">
                    <h4 className="text-xs font-black text-stone-850 flex items-center gap-2">
                      <span className="w-5 h-5 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center text-[10px] font-bold font-mono">
                        {index + 1}
                      </span>
                      {step.title}
                    </h4>
                    <p className="text-[10.5px] text-stone-500 font-bold mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-50 text-center border-t border-stone-100">
                <button
                  onClick={() => { setShow100DaysModal(false); onNavigate("tracker"); }}
                  className="text-[11.5px] font-black text-sky-700 hover:underline"
                >
                  ورود به ردیاب گام به گام اقامت و مانیتورینگ کارتابل ←
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EMERGENCY MODAL */}
        {showEmergencyModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="bg-red-650 text-white p-5 flex items-center justify-between text-right">
                <div className="flex items-center gap-2.5">
                  <Siren className="w-6 h-6 text-white shrink-0" />
                  <div>
                    <h3 className="text-sm font-black">شماره‌های اضطراری اتریش</h3>
                    <p className="text-[10px] text-red-100 font-bold">تماس شبانه‌روزی رایگان از تمام شماره‌ها</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="p-1 px-2.5 bg-red-800 hover:bg-red-900 text-xs font-bold rounded-xl transition-all"
                  aria-label="بستن"
                >بستن ×</button>
              </div>

              <div className="p-5 space-y-3.5 text-right">
                {[
                  { name: "پلیس اتریش", num: "133", desc: "Polizei für Notfälle" },
                  { name: "آتش‌نشانی شهرداری", num: "122", desc: "Feuerwehr" },
                  { name: "اورژانس و امداد پزشکی زنده", num: "144", desc: "Rettung" },
                  { name: "خط اضطراری اتحادیه اروپا", num: "112", desc: "Euronotruf" },
                  { name: "اورژانس شبانه‌روزی سم‌شناسی", num: "01 406 43 43", desc: "Poison Information Center" }
                ].map((em, index) => (
                  <div key={index} className="p-3 border border-stone-200 rounded-2xl flex items-center justify-between bg-stone-50/50 hover:border-red-300 transition-colors">
                    <div className="text-right">
                      <h5 className="text-xs font-black text-stone-850">{em.name}</h5>
                      <p className="text-[9px] text-stone-400 font-bold">{em.desc}</p>
                    </div>
                    <a href={`tel:${em.num}`} className="text-sm font-mono font-black text-white bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition-all">
                      📞 {em.num}
                    </a>
                  </div>
                ))}
              </div>

              <div className="bg-stone-50 p-4 border-t border-stone-100 text-[10px] text-stone-400 font-mono text-center">
                Austria Emergency Protocol Services
              </div>
            </div>
          </div>
        )}

        {/* WEATHER MODAL */}
        {showWeatherModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-indigo-950 text-indigo-50 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-400/20 blur-2xl"></div>

              <div className="p-5 flex items-center justify-between text-right border-b border-indigo-900">
                <div className="flex items-center gap-2.5">
                  <CloudSun className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="text-sm font-black text-white">آب و هوای زنده در شهرهای اتریش</h3>
                    <p className="text-[10px] text-indigo-300 font-bold">بروزرسانی بر اساس کاتالوگ ZAMG</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWeatherModal(false)}
                  className="p-1 px-2.5 bg-indigo-900 hover:bg-indigo-850 text-xs font-bold rounded-xl text-indigo-200 transition-all border border-indigo-805"
                  aria-label="بستن"
                >بستن ×</button>
              </div>

              <div className="p-5 space-y-4 text-right">
                {[
                  { city: "وین (Wien)", temp: "18°C", status: "صاف و خنک آلپی دنج", wind: "۱۲ کیلومتر بر ساعت" },
                  { city: "گراتس (Graz)", temp: "16°C", status: "نیمه ابری همراه با وزش باد", wind: "۱۸ کیلومتر بر ساعت" },
                  { city: "لینتس (Linz)", temp: "15°C", status: "ابری ملایم پاییزی", wind: "۹ کیلومتر بر ساعت" },
                  { city: "زالتسبورگ (Salzburg)", temp: "14°C", status: "بارانی ملایم در ارتفاعات", wind: "۲۲ کیلومتر بر ساعت" },
                  { city: "اینسبروک (Innsbruck)", temp: "11°C", status: "مه‌آلود کوهستانی خنک", wind: "۲۵ کیلومتر بر ساعت" }
                ].map((wt, idx) => (
                  <div key={idx} className="p-3.5 bg-indigo-900/40 border border-indigo-850 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-black text-white">{wt.city}</h5>
                      <p className="text-[10px] text-indigo-300 font-bold">{wt.status} • باد: {wt.wind}</p>
                    </div>
                    <span className="text-sm font-sans font-black text-amber-400 bg-indigo-950 px-3 py-1.5 rounded-xl border border-indigo-900">
                      {wt.temp}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-indigo-950 p-4 border-t border-indigo-900 text-center text-[10px] text-indigo-400 font-bold font-mono">
                Zentralanstalt für Meteorologie und Geodynamik
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE MODAL */}
        {showArticleModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="relative h-60">
                <img
                  src={showArticleModal.image}
                  alt={showArticleModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                  <div className="space-y-1.5 text-right">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded text-white ${showArticleModal.badgeStyle}`}>
                      {showArticleModal.badge}
                    </span>
                    <h3 className="text-sm md:text-base font-black text-white leading-tight">
                      {showArticleModal.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowArticleModal(null)}
                  className="absolute top-4 left-4 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="بستن مقاله"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 text-right space-y-4 font-sans text-xs md:text-sm leading-relaxed overflow-y-auto max-h-[50vh]">
                <div className="text-stone-400 text-[10px] font-bold">
                  انتشار در: {showArticleModal.date} • نویسنده: کارشناس ادغام اتریش‌نشین
                </div>
                <p className="text-stone-700 whitespace-pre-line font-medium leading-relaxed">
                  {showArticleModal.content || "متن کامل مقاله به زودی بارگذاری می‌شود."}
                </p>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400 text-[10px]">منبع: پورتال حقوقی و ادغام اتریش</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShareArticle(showArticleModal)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>اشتراک‌گذاری</span>
                  </button>
                  <button
                    onClick={() => setShowArticleModal(null)}
                    className="bg-red-650 hover:bg-red-700 text-white font-black px-4 py-2 rounded-xl transition-all"
                  >
                    تایید و بستن
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EVENT MODAL */}
        {showEventModal && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" dir="rtl" role="dialog" aria-modal="true">
            <div className="bg-slate-900 text-slate-100 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in flex flex-col my-8">
              <div className="relative h-48">
                <img
                  src={showEventModal.image}
                  alt={showEventModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex items-end p-4">
                  <span className="text-[9px] font-black bg-amber-500 text-black px-2.5 py-1 rounded-md shadow-xs label-badge">
                    {showEventModal.badge}
                  </span>
                </div>
                <button
                  onClick={() => setShowEventModal(null)}
                  className="absolute top-4 left-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  aria-label="بستن رویداد"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 text-right space-y-4">
                <h3 className="text-xs sm:text-sm font-black text-white">{showEventModal.title}</h3>

                <div className="space-y-2 border-t border-slate-800 pt-3 text-[11px] text-slate-300 font-semibold leading-relaxed">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>زمان برگزاری: {showEventModal.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                    <span>آدرس و لوکیشن: {showEventModal.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>مخاطبین: فارسی‌زبانان مقیم اتریش و عموم فرهنگ‌ها</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 font-bold leading-relaxed pt-2">
                  این رویداد به منظور زنده نگه‌داشتن فرهنگ و سنت غنی سرزمین مادری همراه با تعامل صمیمی با هنرمندان و جامعه میزبان تدارک دیده شده است.
                </p>

                <div className="pt-3 flex items-center justify-between gap-3 text-xs font-bold">
                  <button
                    onClick={() => { setShowEventModal(null); onNavigate("carpool"); }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-3 rounded-xl transition-all flex-1"
                  >
                    ثبت‌نام و عضویت در تالار گفتگو 🎟️
                  </button>
                  <button
                    onClick={() => setShowEventModal(null)}
                    className="bg-slate-850 hover:bg-slate-800 text-white px-4 py-3 rounded-xl transition-all"
                  >
                    انصراف
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-950 text-center text-[9px] text-slate-500 font-mono border-t border-slate-850">
                Otrish-Iran Community Event Management © 2026
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}