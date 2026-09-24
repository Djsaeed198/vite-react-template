import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Instagram, Sparkles, Heart, MessageCircle, ExternalLink, Users,
  TrendingUp, Camera, Play, Image as ImageIcon, Award, Star, Zap,
  ShieldCheck, Clock, ChevronDown, HelpCircle, Send, Handshake,
  Info, CheckCircle, ArrowLeft, Bookmark, Share2, Eye, Hash,
  Globe, MapPin, Coffee, Lightbulb, BarChart3, Trophy, Rocket,
  GraduationCap
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// INSTAGRAM HANDLE
// ==========================================
const INSTAGRAM_HANDLE = "otrish__iran";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}/`;

// ==========================================
// FEATURED IMAGES (Unsplash — placeholders تا وقتی API متصل شود)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "وین — قلب اتریش",
    caption: "زیبایی‌های پایتخت و زندگی روزمره در اتریش",
    icon: MapPin,
    tag: "وین",
  },
  {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    title: "دانشگاه‌های معتبر",
    caption: "مسیر تحصیل و دانش‌آموختگی در اتریش",
    icon: GraduationCap,
    tag: "تحصیل",
  },
  {
    url: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    title: "فرصت‌های شغلی",
    caption: "بازار کار قوی و درآمد بالا برای متخصصان",
    icon: Rocket,
    tag: "کار",
  },
];

// ==========================================
// PLACEHOLDER POSTS (در صورت نبود API)
// ==========================================
const PLACEHOLDER_POSTS = [
  { id: "p1", media_url: FEATURED_IMAGES[0].url, permalink: INSTAGRAM_URL, caption: "وین، زیبایی بی‌پایان", likes: 1240, type: "image" },
  { id: "p2", media_url: FEATURED_IMAGES[1].url, permalink: INSTAGRAM_URL, caption: "دانشگاه وین", likes: 890, type: "image" },
  { id: "p3", media_url: FEATURED_IMAGES[2].url, permalink: INSTAGRAM_URL, caption: "فرصت‌های کاری اتریش", likes: 1560, type: "image" },
  { id: "p4", media_url: FEATURED_IMAGES[0].url, permalink: INSTAGRAM_URL, caption: "قلب اروپا", likes: 2100, type: "reel" },
  { id: "p5", media_url: FEATURED_IMAGES[1].url, permalink: INSTAGRAM_URL, caption: "زندگی دانشجویی", likes: 720, type: "image" },
  { id: "p6", media_url: FEATURED_IMAGES[2].url, permalink: INSTAGRAM_URL, caption: "پشت صحنه پروژه", likes: 980, type: "image" },
];

// ==========================================
// STATS
// ==========================================
const INSTAGRAM_STATS = [
  { value: "۵۰K+", label: "فالوور", icon: Users },
  { value: "۲۴۰+", label: "پست", icon: Camera },
  { value: "۱M+", label: "تعامل", icon: Heart },
  { value: "روزانه", label: "به‌روزرسانی", icon: Clock },
];

// ==========================================
// CONTENT CATEGORIES
// ==========================================
const CONTENT_CATEGORIES = [
  { icon: MapPin, title: "زندگی در اتریش", text: "گزارش‌های روزمره، شهرهای زیبا و فرهنگ اتریشی", color: "from-red-500 to-rose-600" },
  { icon: Lightbulb, title: "نکات کاربردی", text: "ترفندهای مهاجرت، اداری و مالی برای هموطنان", color: "from-amber-500 to-orange-600" },
  { icon: Trophy, title: "داستان موفقیت", text: "تجربه‌های الهام‌بخش مهاجران فارسی‌زبان", color: "from-emerald-500 to-teal-600" },
  { icon: Coffee, title: "پشت صحنه", text: "نگاهی به کار تیم و پروژه‌های در حال توسعه", color: "from-purple-500 to-fuchsia-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چند وقت یک‌بار پست جدید منتشر می‌کنید؟",
    a: "به‌طور میانگین روزانه ۱ تا ۲ پست و استوری منتشر می‌شود. محتوای اصلی شامل راهنمای مهاجرت، نکات زندگی در اتریش، اخبار مهم و داستان‌های موفقیت است.",
  },
  {
    q: "چطور می‌توانم پیشنهاد محتوا بدم یا سوال بپرسم؟",
    a: "کافیست در دایرکت اینستاگرام پیام دهید یا کامنت بگذارید. تیم ما روزانه دایرکت‌ها را بررسی می‌کند. برای سوالات فوری، تلگرام و واتس‌اپ سریع‌تر پاسخ می‌دهند.",
  },
  {
    q: "آیا در اینستاگرام خدمات مشاوره ارائه می‌دهید؟",
    a: "بله، بسیاری از مشاوره‌های اولیه از طریق دایرکت اینستاگرام انجام می‌شود. برای مشاوره‌های تخصصی‌تر شما را به کارشناسان مربوطه ارجاع می‌دهیم.",
  },
  {
    q: "چرا اینستاگرام را برای انتشار محتوا انتخاب کرده‌اید؟",
    a: "اینستاگرام بستری سریع، بصری و پرطرفدار بین فارسی‌زبانان است. انتشار استوری و ریلز امکان می‌دهد نکات کاربردی را در قالب تصویری و کوتاه منتقل کنیم که برای کاربران جذاب‌تر است.",
  },
  {
    q: "چطور می‌توانم اتریش‌نشین را در اینستاگرام حمایت کنم؟",
    a: "با لایک، کامنت، اشتراک‌گذاری پست‌ها و معرفی پیج به دوستانتان. این کار به رشد ما کمک می‌کند و باعث می‌شود محتوای بیشتری برای هموطنان تولید کنیم.",
  },
  {
    q: "آیا محتوای اینستاگرام با مقالات سایت یکسان است؟",
    a: "محتوای اینستاگرام مکمل سایت است. در سایت راهنماهای جامع و طولانی داریم، در اینستاگرام نکات کوتاه، خلاصه‌شده و بصری که سریع‌تر به دست مخاطب می‌رسد.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        } else {
          setPosts(PLACEHOLDER_POSTS);
        }
      })
      .catch(() => setPosts(PLACEHOLDER_POSTS))
      .finally(() => setIsLoading(false));
  }, []);

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
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "SocialMediaPosting",
      headline: "تازه‌های اتریش‌نشین در اینستاگرام",
      description:
        "آخرین پست‌ها، استوری‌ها و محتوای بصری اتریش‌نشین — راهنمای زندگی، کار و تحصیل در اتریش برای فارسی‌زبانان.",
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
      },
      sharedContent: INSTAGRAM_URL,
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
        { "@type": "ListItem", position: 2, name: "اینستاگرام", item: INSTAGRAM_URL },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="اینستاگرام اتریش‌نشین | زندگی، کار و تحصیل در اتریش | @otrish__iran"
        description="دنبال کنید پیج اینستاگرام اتریش‌نشین برای نکات روزانه مهاجرت، زندگی در اتریش، داستان‌های موفقیت و پشت‌صحنه پروژه‌ها. راهنمای فارسی‌زبانان مقیم اتریش."
        keywords="اینستاگرام اتریش‌نشین, otrish iran instagram, پیج اینستاگرام ایرانیان اتریش, زندگی در اتریش, مهاجرت به اتریش, فارسی زبانان اتریش, Otrish Neshin"
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
              "radial-gradient(80% 150% at 90% 0, #831843 0, #4c0519 48%, #1e0512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            📷
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-1 shadow-2xl">
                <div className="w-full h-full rounded-[20px] bg-white/10 backdrop-blur-sm border-2 border-white/20 p-1.5">
                  <img
                    src={otrishLogo}
                    alt="اتریش‌نشین"
                    width="112"
                    height="112"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg border-2 border-white"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                ما را در اینستاگرام دنبال کنید
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                تازه‌های
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300"> اتریش‌نشین در اینستاگرام</span>
              </h1>

              <p className="text-sm md:text-base text-pink-100 leading-relaxed max-w-3xl mb-4">
                روزانه نکات کاربردی، راهنمای مهاجرت، داستان‌های موفقیت و زیبایی‌های
                زندگی در اتریش را در پیج اینستاگرام ما دنبال کنید. یک جامعه فعال از
                هزاران فارسی‌زبان مقیم اتریش.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>روزانه به‌روز</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>محتوای رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۵۰K+ فالوور</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6 flex-wrap">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  دنبال کردن @{INSTAGRAM_HANDLE}
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
          {INSTAGRAM_STATS.map((s, i) => {
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
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-lg font-black text-pink-600">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* FEATURED IMAGES GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-pink-600" />
              نگاهی به محتوای اینستاگرام ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ترکیبی از زیبایی‌های اتریش، نکات کاربردی و پشت‌صحنه پروژه‌ها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.a
                  key={i}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200 cursor-pointer"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Instagram icon overlay */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[2px] shadow-lg"
                      >
                        <div className="w-full h-full rounded-[14px] bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                        <Hash className="w-2.5 h-2.5" />
                        {img.tag}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-amber-300" />
                        <h3 className="font-black text-sm">{img.title}</h3>
                      </div>
                      <p className="text-[10px] font-bold opacity-85 leading-relaxed">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                </motion.a>
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
          className="bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-50 border-2 border-pink-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-pink-900 text-sm mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              چرا ما را در اینستاگرام دنبال کنید؟
            </h3>
            <p className="text-[11px] text-pink-800 font-bold leading-relaxed">
              محتوای اختصاصی و روزانه که در سایت منتشر نمی‌شود: استوری‌های لحظه‌ای از
              اتریش، نکات کوتاه کاربردی، پشت‌صحنه پروژه‌ها و پاسخ سریع به دایرکت‌ها.
              یک جامعه فعال از فارسی‌زبانان مقیم اتریش و علاقه‌مندان به مهاجرت.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* CONTENT CATEGORIES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-600" />
              دسته‌بندی محتوای اینستاگرام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ۴ ستون اصلی محتوایی که روزانه منتشر می‌شود
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTENT_CATEGORIES.map((c, i) => {
              const Icon = c.icon;
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
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${c.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {c.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {c.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INSTAGRAM FEED */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-yellow-400 via-pink-500 to-purple-600 rounded-t-3xl" />

          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[2px] shadow-md">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-black text-stone-900">
                  آخرین پست‌های اینستاگرام
                </h3>
                <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                  @{INSTAGRAM_HANDLE} — به‌روزرسانی روزانه
                </p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[11px] bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              مشاهده همه
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Grid of posts */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 animate-pulse"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-stone-400" />
              </div>
              <p className="text-xs text-stone-500 font-bold">
                در حال حاضر پستی برای نمایش وجود ندارد
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-black text-pink-600 hover:text-pink-800 hover:underline"
              >
                مشاهده در اینستاگرام
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <AnimatePresence>
                {posts.map((post, i) => (
                  <motion.a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="relative group rounded-2xl overflow-hidden border-2 border-stone-200 hover:border-pink-400 transition-all shadow-sm hover:shadow-xl"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={post.media_url}
                        alt={post.caption || "Instagram post"}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = FEATURED_IMAGES[0].fallback;
                        }}
                      />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <p className="text-[10px] text-white font-bold line-clamp-2 mb-1.5">
                        {post.caption || "مشاهده پست"}
                      </p>
                      <div className="flex items-center justify-between text-white text-[9px] font-black">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-current text-pink-400" />
                          <span>{post.likes ? post.likes.toLocaleString("fa-IR") : "۹۹۹"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>مشاهده</span>
                        </div>
                      </div>
                    </div>

                    {/* Reel badge */}
                    {post.type === "reel" && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-current" />
                      </div>
                    )}

                    {/* Instagram icon badge */}
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-[1.5px] shadow-md">
                      <div className="w-full h-full rounded-[6px] bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <Instagram className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-stone-500 font-bold text-center sm:text-right">
              💡 برای دیدن استوری‌ها و ریلزهای جدید، ما را در اینستاگرام دنبال کنید
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white font-black text-xs px-5 py-2.5 rounded-2xl shadow-lg hover:scale-105 transition-all"
            >
              <Instagram className="w-4 h-4" />
              دنبال کردن
            </a>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-pink-600" />
              سوالات متداول درباره اینستاگرام
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات فالوورها
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#4c0519] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-pink-300" />
              یک جامعه فعال از فارسی‌زبانان
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              به ما در اینستاگرام بپیوندید
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              بیش از ۵۰ هزار فارسی‌زبان مقیم اتریش و علاقه‌مندان به مهاجرت، ما را در
              اینستاگرام دنبال می‌کنند. شما هم بخشی از این جامعه پویا باشید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Instagram className="w-4 h-4" />
                دنبال کردن @{INSTAGRAM_HANDLE}
              </a>
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                پرسش در واتس‌اپ
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                محتوای روزانه
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                پاسخ به دایرکت
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                جامعه ۵۰K+ نفره
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              تمام محتوای منتشرشده در اینستاگرام اتریش‌نشین صرفاً جنبه آموزشی و
              راهنمایی دارد. برای تصمیم‌های مهم، همیشه به منابع رسمی مراجعه کنید یا با
              کارشناسان ما مشورت نمایید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <Hash className="w-4 h-4 text-pink-600" />
            هشتگ‌های پرطرفدار ما
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "اتریش", "وین", "زندگی در اتریش", "مهاجرت به اتریش",
              "فارسی زبانان اتریش", "ایرانیان اتریش", "تحصیل در اتریش",
              "کار در اتریش", "OTRISH_IRAN", "اتریش نشین",
              "Austria", "Vienna", "IranianInAustria",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700 transition-all cursor-default"
              >
                #{tag}
              </span>
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
          ? "border-pink-500/30 bg-pink-50/30 shadow-md"
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
                ? "bg-gradient-to-br from-pink-500 to-purple-600 text-white"
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
            isOpen ? "rotate-180 text-pink-600" : ""
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

export default InstagramFeed;