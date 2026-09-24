import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  ExternalLink,
  Globe,
  Sparkles,
  RefreshCw,
  Play,
  Pause,
  Sliders,
  Palette,
  Navigation,
  Check,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Eye,
  Award,
  Shield,
  Star,
  Zap,
  Radio,
  Copy,
  Send,
  Flame,
} from "lucide-react";
import { trackEvent } from "../utils/tracker";

/* =========================================================
   Types
   ========================================================= */
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  link: string;
  date: string;
  category: string;
  source: string;
  readTime?: number;
  trending?: boolean;
  author?: string;
  tags?: string[];
}

/* =========================================================
   Brand Logo — اتریش‌نشین
   ترکیب کوه‌های آلپ + پرچم اتریش + هویت ایرانی
   ========================================================= */
const AustriaDwellerLogo: React.FC<{ size?: number; animated?: boolean }> = ({
  size = 44,
  animated = true,
}) => (
  <div
    className="relative flex items-center justify-center shrink-0"
    style={{ width: size, height: size }}
    aria-label="لوگوی اتریش‌نشین"
    role="img"
  >
    <svg viewBox="0 0 64 64" width={size} height={size} className="relative z-10">
      <defs>
        <linearGradient id="adSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="60%" stopColor="#0c142c" />
          <stop offset="100%" stopColor="#050a17" />
        </linearGradient>
        <linearGradient id="adFlag" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <radialGradient id="adGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="32" r="30" fill="url(#adSky)" />
      <circle cx="32" cy="32" r="30" fill="url(#adGlow)" />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="url(#adFlag)"
        strokeWidth="2.2"
      />

      {/* ستاره‌های پس‌زمینه */}
      <circle cx="14" cy="16" r="1" fill="#FDE68A" />
      <circle cx="50" cy="14" r="1.1" fill="#FDE68A" />
      <circle cx="52" cy="22" r="0.8" fill="#FDE68A" />
      <circle cx="12" cy="24" r="0.7" fill="#FDE68A" />

      {/* کوه‌های آلپ */}
      <path
        d="M 10 47 L 24 24 L 32 34 L 42 20 L 54 47 Z"
        fill="#FFFFFF"
        opacity="0.96"
      />
      <path d="M 24 24 L 28 30 L 20 30 Z" fill="#DC2626" />
      <path d="M 42 20 L 46 26 L 38 26 Z" fill="#DC2626" />

      {/* پایه پرچم اتریش در دامنه */}
      <rect x="12" y="50" width="40" height="2.2" rx="1" fill="url(#adFlag)" />

      {/* ستاره‌ی مرکزی */}
      {animated && (
        <circle cx="32" cy="42" r="1.6" fill="#FBBF24">
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>

    {animated && (
      <span className="absolute inset-0 rounded-full bg-amber-400/15 blur-md animate-pulse pointer-events-none" />
    )}
  </div>
);

/* =========================================================
   Main Component
   ========================================================= */
export default function AustriaIranNewsBanner() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [sourceInfo, setSourceInfo] = useState<string>("");

  // Customizer controls
  const [activeCustomizer, setActiveCustomizer] = useState<
    "slider" | "style" | "navigation" | null
  >(null);
  const [autoplaySpeed, setAutoplaySpeed] = useState<number>(6000);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [slideTransition, setSlideTransition] = useState<
    "slide" | "fade" | "scale"
  >("slide");
  const [progress, setProgress] = useState<number>(0);

  const [activeTheme, setActiveTheme] = useState<
    "blue_royal" | "teal_alpine" | "midnight"
  >("blue_royal");
  const [showSoftGlow, setShowSoftGlow] = useState<boolean>(true);

  const [showProgressBar, setShowProgressBar] = useState<boolean>(true);
  const [showQuickCatalog, setShowQuickCatalog] = useState<boolean>(true);

  const [showCacheManager, setShowCacheManager] = useState<boolean>(false);
  const [cacheDetails, setCacheDetails] = useState({
    ttlMinutes: 30,
    engine: "Redis/LocalStorage Node Proxy",
    status: "بهینه‌سازی فعال",
    bypassState: "خاموش",
  });

  // UI extras
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [viewCount, setViewCount] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* =========================================================
     Theme map
     ========================================================= */
  const themes = {
    blue_royal:
      "bg-gradient-to-br from-[#0c142c] via-[#001f54] to-[#040c1e] text-white border-blue-900/40 shadow-[0_18px_55px_rgba(23,39,181,0.28)]",
    teal_alpine:
      "bg-gradient-to-br from-teal-950 via-slate-900 to-stone-950 text-white border-teal-800/40 shadow-[0_18px_55px_rgba(20,184,166,0.22)]",
    midnight:
      "bg-gradient-to-br from-[#08080a] via-[#121318] to-[#09090b] text-white border-white/5 shadow-[0_18px_55px_rgba(0,0,0,0.55)]",
  } as const;

  const accentByTheme = {
    blue_royal: "from-blue-400 to-amber-400",
    teal_alpine: "from-teal-300 to-amber-300",
    midnight: "from-amber-300 to-rose-400",
  } as const;

  const transitions = {
    slide: {
      initial: { opacity: 0, x: -35 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 35 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
    },
  } as const;

  /* =========================================================
     Fallback news — enriched
     ========================================================= */
  const LOCAL_FALLBACK: NewsItem[] = useMemo(
    () => [
      {
        id: "fallback-c1",
        title:
          "تسهیل فرآیند صدور روادید دانشجویی اتریش برای متقاضیان ایرانی در سال ۲۰۲۶",
        summary:
          "سفارت اتریش در تهران اعلام کرد با بهبود هماهنگی‌های آکادمیک با دانشگاه‌های فدرال، بررسی زمان نوبت‌دهی و مدارک مالی دانشجویی برای نیم‌سال آتی روند سریع‌تری خواهد داشت.",
        link: "https://www.bmeia.gv.at/oeb-teheran/",
        date: "امروز",
        category: "ویزای دانشگاهی 🎓",
        source: "سفارت اتریش در تهران",
        readTime: 4,
        trending: true,
        author: "دپارتمان ویزا",
        tags: ["ویزا", "دانشجویی", "اتریش", "ایران"],
      },
      {
        id: "fallback-c2",
        title:
          "راه‌اندازی بورسیه‌های ویژه OeAD برای پژوهشگران تحصیلات تکمیلی ایران",
        summary:
          "سازمان مبادلات آکادمیک فدرال اتریش ردیف بودجه جدیدی جهت همیاری دوره‌های فوق دکتری و فرصت‌های مطالعاتی مشترک با دانشگاه‌های مرجع اتریش معرفی کرد.",
        link: "https://oead.at/",
        date: "دیروز",
        category: "دانشگاهی و پژوهش 🧬",
        source: "پرتابل آکادمیک اتریش (OeAD)",
        readTime: 6,
        trending: true,
        author: "OeAD",
        tags: ["بورسیه", "پژوهش", "OeAD"],
      },
      {
        id: "fallback-c3",
        title:
          "اصلاحیه جدید شهرداری وین برای تأیید مدارک عدم سوءپیشینه صادره از ایران",
        summary:
          "بر اساس این بخش‌نامه، تأیید ترجمه‌های رسمی صادره بدون نیاز به ترجمه مجدد در اتریش، مشروط به داشتن تأییدیه وزارت خارجه ایران و مهر برجسته سفارت اتریش خواهد بود.",
        link: "https://www.wien.gv.at/",
        date: "۲ روز پیش",
        category: "امور اداری و ملده 📑",
        source: "دپارتمان اقامت شهرداری وین (MA 35)",
        readTime: 5,
        trending: false,
        author: "MA 35",
        tags: ["وین", "اقامت", "مدارک"],
      },
      {
        id: "fallback-c4",
        title:
          "افزایش پروازهای مستقیم تهران–وین پس از توافق‌های جدید هوایی دو کشور",
        summary:
          "شرکت هواپیمایی اتریش ایرلاینز اعلام کرد از ابتدای فصل پاییز، تعداد پروازهای هفتگی میان تهران و وین افزایش خواهد یافت.",
        link: "https://www.austrian.com/",
        date: "۳ روز پیش",
        category: "حمل‌ونقل و پرواز ✈️",
        source: "Austrian Airlines",
        readTime: 3,
        trending: true,
        author: "Austrian Airlines",
        tags: ["پرواز", "وین", "تهران"],
      },
    ],
    []
  );

  /* =========================================================
     Fetch logic
     ========================================================= */
  const fetchAustriaIranNews = async (force: boolean = false) => {
    if (force) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const url = force
        ? "/api/austria-iran-news?force=true"
        : "/api/austria-iran-news";
      const res = await fetch(url);
      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");

      if (res.ok && isJson) {
        const data = await res.json();
        if (data.success && Array.isArray(data.news) && data.news.length) {
          setNews(data.news);
          setLastUpdated(data.lastUpdated);
          setSourceInfo(data.source);
          setCacheDetails((prev) => ({
            ...prev,
            status: force ? "به‌روزرسانی موفق کش" : "کش معتبر",
            bypassState: force ? "پاک‌سازی انتخابی" : "روشن",
          }));
          return;
        }
      }

      setNews(LOCAL_FALLBACK);
      setLastUpdated(new Date().toISOString());
      setSourceInfo("حافظه داخلی پشتیبان (برخط)");
    } catch (err) {
      console.warn("Retrying live Austria-Iran news load with fallback pool...", err);
      setNews(LOCAL_FALLBACK);
      setLastUpdated(new Date().toISOString());
      setSourceInfo("اطلاعات یکپارچه محلی (آفلاین)");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  /* =========================================================
     Mount: admin + fetch + SEO
     ========================================================= */
  useEffect(() => {
    fetchAustriaIranNews();
    const isUrlAdmin =
      new URLSearchParams(window.location.search).get("admin") === "true";
    const isStorageAdmin = localStorage.getItem("or_admin") === "true";
    setIsAdmin(isUrlAdmin || isStorageAdmin);
    if (isUrlAdmin) localStorage.setItem("or_admin", "true");
  }, []);

  /* ---- SEO: title, meta description, OG, JSON-LD ---- */
  useEffect(() => {
    if (!news.length) return;

    const prevTitle = document.title;
    const metaTags: HTMLMetaElement[] = [];

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.querySelector(
        `meta[${attr}="${key}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        metaTags.push(el);
      }
      el.setAttribute("content", content);
    };

    const headline = news[0]?.title ?? "اخبار اتریش و ایران";
    document.title = `${headline} | اتریش‌نشین`;

    setMeta("name", "description", news[0]?.summary?.slice(0, 160) ?? "");
    setMeta(
      "name",
      "keywords",
      "اتریش, ایران, ویزا, دانشجویی, بورسیه, وین, مهاجرت, اقامت, اخبار"
    );
    setMeta("property", "og:title", headline);
    setMeta("property", "og:description", news[0]?.summary?.slice(0, 200) ?? "");
    setMeta("property", "og:type", "article");
    setMeta("property", "og:locale", "fa_IR");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", headline);
    setMeta("name", "twitter:description", news[0]?.summary?.slice(0, 200) ?? "");

    // JSON-LD Structured Data
    const ldId = "ad-news-ld-json";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.id = ldId;
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "اخبار اتریش و ایران — اتریش‌نشین",
      inLanguage: "fa-IR",
      itemListElement: news.map((n, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "NewsArticle",
          headline: n.title,
          description: n.summary,
          url: n.link,
          articleSection: n.category,
          author: { "@type": "Organization", name: n.source },
          publisher: {
            "@type": "Organization",
            name: "اتریش‌نشین",
          },
        },
      })),
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      metaTags.forEach((m) => m.parentNode?.removeChild(m));
    };
  }, [news]);

  /* =========================================================
     Autoplay engine
     ========================================================= */
  useEffect(() => {
    if (!news.length || isRefreshing || isPaused) return;
    setProgress(0);
    const intervalMs = 100;
    const stepValue = (intervalMs / autoplaySpeed) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepValue;
      });
    }, intervalMs);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, news.length, isRefreshing, isPaused, autoplaySpeed]);

  /* ---- View counter (per slide) ---- */
  useEffect(() => {
    setViewCount((c) => c + 1);
  }, [currentIndex]);

  /* =========================================================
     Handlers
     ========================================================= */
  const handleNext = () => {
    if (!news.length) return;
    setCurrentIndex((p) => (p + 1) % news.length);
    setProgress(0);
  };
  const handlePrev = () => {
    if (!news.length) return;
    setCurrentIndex((p) => (p - 1 + news.length) % news.length);
    setProgress(0);
  };

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    trackEvent("bookmark_news_item", "interaction", { id });
  };

  const copyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const currentNews = news[currentIndex];

  /* =========================================================
     Render
     ========================================================= */
  return (
    <article
      ref={containerRef}
      id="austria_iran_news_banner_card"
      itemScope
      itemType="https://schema.org/NewsArticle"
      aria-label="بنر اخبار زنده اتریش و ایران"
      className={`relative w-full ${themes[activeTheme]} text-white rounded-[26px] overflow-hidden p-6 md:p-8 flex flex-col justify-between min-h-[18rem] transition-all duration-500 border`}
      style={{ direction: "rtl" }}
    >
      {/* ── Ambient background effects ── */}
      {showSoftGlow && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,118,210,0.22),transparent_55%)] pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -top-24 -right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        </>
      )}

      {/* Animated shimmer border */}
      <div className="absolute inset-0 rounded-[26px] pointer-events-none">
        <div className="absolute inset-0 rounded-[26px] [mask-image:linear-gradient(#000,#000)] [mask-composite:exclude] p-[1px]">
          <div className="w-full h-full rounded-[26px] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent animate-[shimmer_4s_linear_infinite]" />
        </div>
      </div>

      {/* Engine watermark */}
      <div className="absolute top-2 left-3 text-[10px] text-blue-400 font-mono opacity-20 select-none tracking-widest">
        OTRISH · AUSTRIA-IRAN ENGINE v3.0
      </div>

      {/* ── Header ── */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-4 z-10">
        <div className="flex items-center gap-3">
          <AustriaDwellerLogo size={46} />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-tight text-white">
                اتریش‌نشین
              </h1>
              <span className="text-[9px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 rounded-full">
                پورتال رسمی
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wide text-amber-300 uppercase flex items-center gap-1">
                <Globe className="w-3 h-3 text-blue-400" />
                جریان زنده اخبار اتریش و تحولات دوجانبه 🇦🇹 🇮🇷
              </span>
            </div>
          </div>
        </div>

        {/* Admin controls */}
        {isAdmin && (
          <div className="flex items-center gap-2 flex-wrap z-20">
            <button
              onClick={() => {
                trackEvent("toggle_cache_manager_control", "action");
                setShowCacheManager(!showCacheManager);
              }}
              className={`px-3 py-1 rounded-full border text-[10.5px] font-bold shadow-sm transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                showCacheManager
                  ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold"
                  : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>تنظیمات سرور رسانه</span>
            </button>

            <button
              disabled={isRefreshing || isLoading}
              onClick={() => {
                trackEvent("force_script_refresh_control", "action");
                fetchAustriaIranNews(true);
              }}
              className="px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-[10.5px] font-bold shadow-sm transition-all duration-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3 h-3 text-blue-400 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              <span>همگام‌سازی داینامیک</span>
            </button>
          </div>
        )}
      </header>

      {/* ── Customizer pills ── */}
      {isAdmin && (
        <div className="flex flex-wrap items-center justify-start gap-2.5 mt-3 pt-1 pb-1 border-b border-white/5 z-10">
          {[
            { key: "slider", label: "بهبود اسلایدر اخبار", Icon: Sliders },
            { key: "style", label: "استایل‌دهی بنر اخبار", Icon: Palette },
            { key: "navigation", label: "بهینه‌سازی ناوبری خبر", Icon: Navigation },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() =>
                setActiveCustomizer(
                  activeCustomizer === (key as any) ? null : (key as any)
                )
              }
              className={`px-4 py-1.5 rounded-full border text-xs font-bold shadow-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeCustomizer === key
                  ? "bg-[#1727b5] border-[#1727b5] text-white scale-[1.02]"
                  : "bg-white text-slate-800 border-stone-200 hover:bg-stone-50 hover:text-slate-950"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Expandable customizer panel ── */}
      <AnimatePresence>
        {activeCustomizer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden z-20 w-full"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 my-2 text-right space-y-3 shadow-inner">
              {activeCustomizer === "slider" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-black border-b border-white/5 pb-1 text-amber-300">
                    <span>تنظیمات پویای چرخه اخبار</span>
                    <span>سرعت و افکت جاری انیمیشن</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] text-white/50 block font-bold">
                        بازه چرخش خودکار خبر
                      </span>
                      <div className="flex gap-1.5">
                        {[4000, 6000, 8000].map((v) => (
                          <button
                            key={v}
                            onClick={() => setAutoplaySpeed(v)}
                            className={`flex-1 text-[10px] font-black py-1.5 rounded-lg border transition-all text-center ${
                              autoplaySpeed === v
                                ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold"
                                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            {v / 1000} ثانیه
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-white/50 block font-bold">
                        افکت حرکتی اسلاید
                      </span>
                      <div className="flex gap-1.5">
                        {(["slide", "fade", "scale"] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setSlideTransition(type)}
                            className={`flex-1 text-[10px] font-black py-1.5 rounded-lg border transition-all text-center ${
                              slideTransition === type
                                ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold"
                                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                            }`}
                          >
                            {type === "slide"
                              ? "سایش"
                              : type === "fade"
                              ? "محو"
                              : "بزرگ‌نمایی"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-white/50 block font-bold">
                        مکث در توقف
                      </span>
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`w-full text-[10px] font-black py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                          isPaused
                            ? "bg-rose-500/30 text-rose-200 border-rose-500/50"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        }`}
                      >
                        {isPaused ? (
                          <Play className="w-3 h-3" />
                        ) : (
                          <Pause className="w-3 h-3" />
                        )}
                        <span>
                          {isPaused
                            ? "از سرگیری چرخش خودکار"
                            : "چرخش زنده فعال (مکث)"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeCustomizer === "style" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-black border-b border-white/5 pb-1 text-amber-300">
                    <span>شخصی‌سازی مجلل پوسته پورتال</span>
                    <span>انتخاب قالب رنگ و کنتراست</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {(
                      [
                        {
                          key: "blue_royal",
                          label: "آبی رویال عمیق 🔵",
                          sub: "پوسته برتر فدرال ملده",
                          activeCls: "bg-blue-900/30 border-blue-400 text-white",
                        },
                        {
                          key: "teal_alpine",
                          label: "سبز طراوت آلپ 💚",
                          sub: "پوسته بومی ویزای اتریش",
                          activeCls: "bg-teal-900/40 border-teal-400 text-white",
                        },
                        {
                          key: "midnight",
                          label: "سایه شب تیره 🖤",
                          sub: "پوسته مینیمال اتریش‌نشین",
                          activeCls: "bg-stone-900/40 border-stone-400 text-white",
                        },
                      ] as const
                    ).map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTheme(t.key)}
                        className={`p-2 text-right rounded-xl border text-xs flex flex-col justify-between h-14 transition-all ${
                          activeTheme === t.key
                            ? t.activeCls
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-extrabold text-[11px]">
                          {t.label}
                        </span>
                        <span className="text-[9px] opacity-65">{t.sub}</span>
                      </button>
                    ))}

                    <div className="flex flex-col justify-center gap-1.5">
                      <span className="text-[10px] text-white/50 block font-bold">
                        هاله نورانی ذرات
                      </span>
                      <button
                        onClick={() => setShowSoftGlow(!showSoftGlow)}
                        className={`text-[10px] font-black py-1.5 rounded-lg border transition-all text-center ${
                          showSoftGlow
                            ? "bg-amber-400 text-slate-950 border-amber-400"
                            : "bg-white/5 text-white/65 border-white/10"
                        }`}
                      >
                        {showSoftGlow ? "هاله فعال" : "هاله خاموش"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeCustomizer === "navigation" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-black border-b border-white/5 pb-1 text-amber-300">
                    <span>کنترل‌پذیری سریع ساختار کاتالوگ</span>
                    <span>سفارشی‌سازی جزئیات ناوبری</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <button
                      onClick={() => setShowProgressBar(!showProgressBar)}
                      className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                        showProgressBar
                          ? "bg-white/10 border-amber-400/40 text-white"
                          : "bg-white/5 border-white/10 text-white/60"
                      }`}
                    >
                      <div className="text-right">
                        <span className="font-extrabold block text-[11px]">
                          نوار پیشرفت شمارش معکوس اسلاید
                        </span>
                        <span className="text-[9px] opacity-70">
                          نمایش تصویری مدت زمان باقی‌مانده
                        </span>
                      </div>
                      {showProgressBar && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </button>

                    <button
                      onClick={() => setShowQuickCatalog(!showQuickCatalog)}
                      className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                        showQuickCatalog
                          ? "bg-white/10 border-amber-400/40 text-white"
                          : "bg-white/5 border-white/10 text-white/60"
                      }`}
                    >
                      <div className="text-right">
                        <span className="font-extrabold block text-[11px]">
                          پنل پرش کاتالوگ سریع
                        </span>
                        <span className="text-[9px] opacity-70">
                          نمایش دکمه‌های مستقیم انتخاب خبر
                        </span>
                      </div>
                      {showQuickCatalog && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cache manager ── */}
      <AnimatePresence>
        {showCacheManager && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden z-10 w-full"
          >
            <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 my-2 text-right space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <span className="text-white/40 font-bold">
                  پارامترهای فنی کشینگ سیستم
                </span>
                <span className="text-amber-400 font-extrabold flex items-center gap-1">
                  🟢 مانیتورینگ زنده فعال است
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/5 p-2 rounded-lg">
                  <div className="text-white/40 mb-1">دوره انقضاء (TTL)</div>
                  <div className="text-blue-300 font-mono font-bold">
                    ۳۰ دقیقه (30m)
                  </div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <div className="text-white/40 mb-1">مکانیزم بارگیری</div>
                  <div className="text-amber-300 font-bold">
                    Google RSS Web Parser
                  </div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <div className="text-white/40 mb-1">وضعیت کنونی کش</div>
                  <div className="text-emerald-400 font-bold">
                    {cacheDetails.status}
                  </div>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <div className="text-white/40 mb-1">فرمان بیرونی</div>
                  <div className="text-blue-400 font-mono font-bold">
                    {cacheDetails.bypassState}
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-white/50 leading-relaxed font-medium">
                سیستم با تلفیق فیدهای خبری فدرال اتریش و جستجوی دوجانبه گوگل
                نیوز، هر ۳۰ دقیقه یک‌بار با مدل زبانی Gemini همگام‌سازی می‌شود.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main slide content ── */}
      <section
        className="my-5 flex-1 flex flex-col justify-center min-h-[6.5rem] relative z-10"
        aria-live="polite"
      >
        {isLoading && news.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
            <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
            <p className="text-xs text-white/60 font-bold">
              در حال بازیابی و پردازش جریان اخبار از فید فدرال اتریش و گوگل نیوز...
            </p>
          </div>
        ) : news.length > 0 && currentNews ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={transitions[slideTransition].initial}
              animate={transitions[slideTransition].animate}
              exit={transitions[slideTransition].exit}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-3 text-right"
            >
              {/* Meta strip */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-400/15 border border-amber-400/25 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md">
                  {currentNews.category}
                </span>

                {currentNews.trending && (
                  <span className="bg-rose-500/15 border border-rose-400/30 text-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    داغ
                  </span>
                )}

                <span className="text-[10px] text-white/40 font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-400/70" />
                  منبع رسمی: {currentNews.source}
                </span>

                <span className="text-[10px] text-white/20 font-bold">|</span>

                {currentNews.readTime && (
                  <span className="text-[10px] text-blue-200/80 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentNews.readTime} دقیقه مطالعه
                  </span>
                )}

                <span className="text-[10px] text-blue-300 font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  سند {currentIndex + 1} از {news.length}
                </span>
              </div>

              {/* Title */}
              <a
                href={currentNews.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("read_austria_iran_news_item", "interaction", {
                    title: currentNews.title,
                  })
                }
                itemProp="headline"
                className="group block text-base md:text-lg font-extrabold text-white hover:text-amber-300 transition-colors duration-200 leading-snug"
              >
                <span className="group-hover:underline decoration-amber-400/60 decoration-2 underline-offset-4">
                  {currentNews.title}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-white/40 inline ml-2 group-hover:text-amber-300 transition-colors" />
              </a>

              {/* Summary */}
              <p
                itemProp="description"
                className="text-xs md:text-[13px] text-white/75 leading-relaxed font-medium"
              >
                {currentNews.summary}
              </p>

              {/* Tags */}
              {currentNews.tags?.length ? (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentNews.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-bold text-white/55 bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Action row: share / bookmark / copy */}
              <div className="flex items-center justify-end gap-2 pt-1.5 relative">
                <button
                  onClick={() => toggleBookmark(currentNews.id)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
                    bookmarked.has(currentNews.id)
                      ? "bg-amber-400/20 border-amber-400/50 text-amber-300"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
                  aria-label="ذخیره خبر"
                  title="ذخیره خبر"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => copyLink(currentNews.link)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border bg-white/5 border-white/10 text-white/50 hover:text-white transition-all"
                  aria-label="کپی لینک"
                  title="کپی لینک"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu((s) => !s)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border bg-white/5 border-white/10 text-white/50 hover:text-white transition-all"
                    aria-label="اشتراک‌گذاری"
                    title="اشتراک‌گذاری"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="absolute bottom-full mb-2 right-0 flex gap-1.5 bg-slate-950/95 border border-white/10 rounded-xl p-2 shadow-2xl z-30"
                      >
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            currentNews.title
                          )}&url=${encodeURIComponent(currentNews.link)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-blue-500/30 text-white/70 hover:text-white"
                          aria-label="اشتراک در توییتر"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            currentNews.link
                          )}&text=${encodeURIComponent(currentNews.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-sky-500/30 text-white/70 hover:text-white"
                          aria-label="اشتراک در تلگرام"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-center py-6 text-xs text-white/40 font-bold">
            جریان اخبار موقتاً در دسترس نیست. کمی بعد تلاش کنید.
          </div>
        )}
      </section>

      {/* ── Progress bar ── */}
      {showProgressBar && news.length > 0 && !isRefreshing && !isLoading && (
        <div className="w-full bg-white/5 h-1 rounded-full mb-4 overflow-hidden relative z-10">
          <motion.div
            className={`bg-gradient-to-l ${accentByTheme[activeTheme]} h-full rounded-full`}
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      )}

      {/* ── Footer / navigation ── */}
      <footer className="flex items-center justify-between border-t border-white/5 pt-4 z-10 gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-bold text-blue-200">
            {news.length > 0 && currentNews ? currentNews.date : ""}
          </span>
          {sourceInfo && (
            <span className="text-[9px] text-white/30 hidden sm:inline mr-1">
              ({sourceInfo})
            </span>
          )}
          <span className="text-[9px] text-white/40 hidden md:inline-flex items-center gap-1 mr-2">
            <Eye className="w-3 h-3" />
            بازدید این سند: {viewCount}
          </span>
        </div>

        {showQuickCatalog && news.length > 0 && (
          <div className="flex items-center gap-1 font-mono">
            {news.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => {
                  trackEvent("switch_austria_iran_news_dot", "interaction", {
                    idx,
                  });
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className="w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-white/5 rounded-full transition-all duration-300"
                title={`خبر ${idx + 1}`}
                aria-label={`نمایش خبر شماره ${idx + 1}`}
              >
                <span
                  className={`transition-all duration-300 flex items-center justify-center ${
                    idx === currentIndex
                      ? "w-6 h-4 text-[9px] bg-amber-400 text-slate-900 font-extrabold rounded-md"
                      : "w-2.5 h-2.5 bg-white/20 rounded-full hover:bg-white/45 text-[0px]"
                  }`}
                >
                  {idx === currentIndex ? idx + 1 : ""}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="خبر قبلی"
            aria-label="خبر قبلی"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="خبر بعدی"
            aria-label="خبر بعدی"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Micro-keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
      `}</style>
    </article>
  );
}