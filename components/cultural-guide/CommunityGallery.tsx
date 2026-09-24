import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera, Tag, Heart, MessageSquare, Send, MapPin, Users, Sparkles,
  Image as ImageIcon, TrendingUp, Star, Award, CheckCircle, Clock,
  ChevronDown, ChevronLeft, ExternalLink, Info, Filter, X,
  Trophy, Flame, Globe, Quote, ShieldCheck, Eye, Bookmark,
  Share2, Compass, Mountain, Building2, Calendar, Handshake
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// TYPES
// ==========================================
interface GalleryPhoto {
  id: string;
  url: string;
  city: string;
  cityLabel: string;
  tag: string;
  caption: string;
  submittedBy: string;
  likes: number;
  comments: string[];
  date: string;
  category: string;
}

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه", icon: Compass, color: "from-stone-700 to-stone-900" },
  { id: "nature", label: "طبیعت", icon: Mountain, color: "from-emerald-500 to-teal-600" },
  { id: "city", label: "شهری", icon: Building2, color: "from-sky-500 to-blue-600" },
  { id: "culture", label: "فرهنگی", icon: Award, color: "from-purple-500 to-indigo-600" },
  { id: "food", label: "غذا و کافه", icon: Sparkles, color: "from-amber-500 to-orange-600" },
];

// ==========================================
// CITIES
// ==========================================
const CITIES = [
  { id: "all", label: "همه شهرها", emoji: "🇦🇹" },
  { id: "vienna", label: "وین", emoji: "🎭" },
  { id: "graz", label: "گراتس", emoji: "🎨" },
  { id: "salzburg", label: "سالزبورگ", emoji: "🎼" },
  { id: "hallstatt", label: "هال‌اشتات", emoji: "🏔️" },
  { id: "innsbruck", label: "اینسبورگ", emoji: "⛷️" },
];

const CITY_MAP: Record<string, string> = {
  vienna: "وین",
  graz: "گراتس",
  salzburg: "سالزبورگ",
  hallstatt: "هال‌اشتات",
  innsbruck: "اینسبورگ",
  linz: "لینتس",
};

// ==========================================
// PRESET SCENES
// ==========================================
const PRESET_SCENE_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&auto=format&fit=crop&q=80", name: "کاخ شون‌برون وین" },
  { url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&auto=format&fit=crop&q=80", name: "دریاچه هال‌اشتات" },
  { url: "https://images.unsplash.com/photo-1541417901777-6f6874ebf4bf?w=800&auto=format&fit=crop&q=80", name: "مرکز تاریخی سالزبورگ" },
  { url: "https://images.unsplash.com/photo-1517949909249-166299b6bf7b?w=800&auto=format&fit=crop&q=80", name: "بلودر گاردن وین" },
  { url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80", name: "آلپ اتریش" },
  { url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80", name: "کافه وین" },
];

// ==========================================
// HERO
// ==========================================
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";

// ==========================================
// INITIAL PHOTOS
// ==========================================
const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&auto=format&fit=crop&q=80",
    city: "vienna",
    cityLabel: "وین",
    tag: "#وین",
    caption: "یک روز دلپذیر و آفتابی پاییزی در محوطه و باغ پشت کاخ تاریخی و بی‌نظیر شون‌برون وین، قلب پایتخت اتریش 🌸",
    submittedBy: "نیما صالحی",
    likes: 54,
    comments: ["بسیار باشکوهه!", "وین واقعاً پایتخت موسیقی و موزه‌هاست."],
    date: "۲۰۲۶-۰۵-۲۴",
    category: "culture",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&auto=format&fit=crop&q=80",
    city: "hallstatt",
    cityLabel: "هال‌اشتات",
    tag: "#هال_اشتات",
    caption: "جادوی کارت‌پستالی و آرامش‌بخش روستای توریستی هال‌اشتات اتریش در ایالت اتریش علیا. واقعاً یکی از زیباترین نقاط دنیاست.",
    submittedBy: "سحر کریمی",
    likes: 72,
    comments: ["بهشت روی زمینه...", "حتماً با قطارهای ÖBB برید."],
    date: "۲۰۲۶-۰۵-۲۳",
    category: "nature",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1541417901777-6f6874ebf4bf?w=800&auto=format&fit=crop&q=80",
    city: "salzburg",
    cityLabel: "سالزبورگ",
    tag: "#زالتسبورگ",
    caption: "غروب دیدنی و باشکوه از بالای قلعه تاریخی هوهن‌زالتسبورگ (Festung Hohensalzburg) مشرف به زادگاه موتزارت بی‌نظیر.",
    submittedBy: "امیر یزدان‌پناه",
    likes: 41,
    comments: ["نمای ۳۶۰ درجه فوق‌العاده‌ای داره."],
    date: "۲۰۲۶-۰۵-۲۰",
    category: "culture",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80",
    city: "innsbruck",
    cityLabel: "اینسبورگ",
    tag: "#آلپ_اتریش",
    caption: "قله‌های برفی آلپ در حوالی اینسبورگ، پایتخت زمستانی اتریش با مناظر خیره‌کننده و پیست‌های اسکی بی‌نظیر.",
    submittedBy: "مریم احمدی",
    likes: 88,
    comments: ["زمستان‌های اتریش واقعاً جادویی‌ست.", "بهترین پیست‌های اسکی اروپا!"],
    date: "۲۰۲۶-۰۵-۱۸",
    category: "nature",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80",
    city: "vienna",
    cityLabel: "وین",
    tag: "#کافه_وین",
    caption: "کافه‌های سنتی وین با آن فضای دنج و قهوه معروف Melange، جایی برای لحظه‌های آرام و گفتگوهای گرم.",
    submittedBy: "رها کاظمی",
    likes: 63,
    comments: ["کافه‌های وین یه دنیای دیگه‌ست!", "Melange و Sacher Torte یادت نره!"],
    date: "۲۰۲۶-۰۵-۱۵",
    category: "food",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1595859703029-9d3e0e3ee0b1?w=800&auto=format&fit=crop&q=80",
    city: "graz",
    cityLabel: "گراتس",
    tag: "#گراتس",
    caption: "شهر گراتس، پایتخت آشپزی و فرهنگ اتریش با بازارهای محلی و معماری خیره‌کننده رنسانس.",
    submittedBy: "کاوه رضایی",
    likes: 37,
    comments: ["گراتس شهر دانشجوییه عالی!"],
    date: "۲۰۲۶-۰۵-۱۲",
    category: "city",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function CommunityGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showUploadForm, setShowUploadForm] = useState<boolean>(false);

  // Form states
  const [authorName, setAuthorName] = useState<string>("");
  const [cityInput, setCityInput] = useState<string>("vienna");
  const [categoryInput, setCategoryInput] = useState<string>("city");
  const [captionInput, setCaptionInput] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isPresetSelect, setIsPresetSelect] = useState<boolean>(true);

  // Comments
  const [activeCommentPhotoId, setActiveCommentPhotoId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("at_community_photos");
      if (stored) {
        setPhotos(JSON.parse(stored));
      } else {
        setPhotos(INITIAL_PHOTOS);
        localStorage.setItem("at_community_photos", JSON.stringify(INITIAL_PHOTOS));
      }
    } catch {
      setPhotos(INITIAL_PHOTOS);
    }
  }, []);

  const persist = (next: GalleryPhoto[]) => {
    setPhotos(next);
    try {
      localStorage.setItem("at_community_photos", JSON.stringify(next));
    } catch {}
  };

  const handleLike = (photoId: string) => {
    const updated = photos.map((p) =>
      p.id === photoId ? { ...p, likes: p.likes + 1 } : p
    );
    persist(updated);
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !captionInput.trim()) return;

    let selectedUrl = imageUrl;
    if (isPresetSelect && !selectedUrl) {
      selectedUrl = PRESET_SCENE_PHOTOS[0].url;
    } else if (!selectedUrl) {
      selectedUrl = PRESET_SCENE_PHOTOS[0].url;
    }

    const newPhoto: GalleryPhoto = {
      id: `photo_${Date.now()}`,
      url: selectedUrl,
      city: cityInput,
      cityLabel: CITY_MAP[cityInput] || cityInput,
      tag: `#${CITY_MAP[cityInput] || cityInput}`,
      caption: captionInput,
      submittedBy: authorName,
      likes: 1,
      comments: [],
      date: new Date().toISOString().split("T")[0],
      category: categoryInput,
    };

    persist([newPhoto, ...photos]);
    toast.success("عکس شما با موفقیت منتشر شد! 🎉");

    setAuthorName("");
    setCaptionInput("");
    setImageUrl("");
    setShowUploadForm(false);
  };

  const handleAddComment = (photoId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const updated = photos.map((p) =>
      p.id === photoId ? { ...p, comments: [...p.comments, newCommentText] } : p
    );

    persist(updated);
    setNewCommentText("");
    toast.success("نظر شما ثبت شد!");
  };

  const filteredPhotos = photos.filter((p) => {
    if (selectedCity !== "all" && p.city !== selectedCity) return false;
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    return true;
  });

  const totalLikes = photos.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = photos.reduce((sum, p) => sum + p.comments.length, 0);
  const topPhoto = [...photos].sort((a, b) => b.likes - a.likes)[0];

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "گالری تصویری اتریش‌نشین",
      description:
        "آلبوم تعاملی ایرانیان و فارسی‌زبانان مقیم اتریش؛ اشتراک‌گذاری تصاویر وین، سالزبورگ، هال‌اشتات و مناطق دیدنی اتریش.",
      inLanguage: "fa",
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
      image: photos.slice(0, 6).map((p) => ({
        "@type": "ImageObject",
        contentUrl: p.url,
        name: p.caption,
        author: { "@type": "Person", name: p.submittedBy },
      })),
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
    <>
      <SEO
        title="گالری تصویری اتریش | آلبوم تعاملی فارسی‌زبانان مقیم اتریش"
        description="گالری تصویری تعاملی اتریش‌نشین: تصاویر وین، سالزبورگ، هال‌اشتات، اینسبورگ و زیبایی‌های اتریش از نگاه فارسی‌زبانان مقیم. عکس‌های خود را به اشتراک بگذارید."
        keywords="گالری تصویری اتریش, عکس های وین, تصاویر سالزبورگ, هال اشتات, عکس اتریش, community gallery, اتریش نشین, آلبوم ایرانیان اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* ========================================== */}
        {/* HERO */}
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
              alt="وین، اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            📸
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
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-2xl text-5xl">
                📸
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Camera className="w-3.5 h-3.5 text-amber-300" />
                Community Gallery · Austria
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                اتریش به روایت تصویر
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                آلبوم و گالری تعاملی ایرانیان و فارسی‌زبانان مقیم اتریش؛ اشتراک‌گذاری
                قاب‌های دیدنی از وین دنج، کوه‌های برفی آلپ، کافه‌های سنتی و
                کارت‌پستال‌های هال‌اشتات. داستان زندگی خود را در اتریش ثبت کنید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>کاملاً رایگان</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>محیط امن و صمیمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Heart className="w-3.5 h-3.5" />
                  <span>ساخته شده با عشق</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "🖼️", value: String(photos.length), label: "قاب ثبت‌شده" },
            { icon: "❤️", value: `${totalLikes}+`, label: "لایک جامعه" },
            { icon: "💬", value: String(totalComments), label: "نظر کاربران" },
            { icon: "🏙️", value: "۶", label: "شهر اتریش" },
          ].map((s, i) => (
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
        {/* TOP PHOTO OF THE WEEK */}
        {/* ========================================== */}
        {topPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border border-amber-200 p-6 md:p-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={topPhoto.url}
                    alt={topPhoto.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full text-[10px] font-black text-amber-800 mb-3">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  محبوب‌ترین قاب جامعه
                </div>
                <h3 className="text-lg font-black text-stone-900 mb-2">
                  {topPhoto.cityLabel} — {topPhoto.submittedBy}
                </h3>
                <p className="text-xs text-stone-600 font-bold leading-relaxed mb-3 line-clamp-2">
                  {topPhoto.caption}
                </p>
                <div className="flex items-center gap-4 text-[11px] font-black text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    {topPhoto.likes} لایک
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-sky-500" />
                    {topPhoto.comments.length} نظر
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* GALLERY MODULE (original enhanced) */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm overflow-hidden relative">
          {/* Austrian flag line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-[#c8102e] via-white to-[#c8102e]" />

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-black text-stone-900 text-lg">
                  آلبوم تعاملی جامعه
                </h2>
                <p className="text-xs text-stone-500 font-bold mt-0.5">
                  قاب‌های ارسالی کاربران — لایک کنید، نظر دهید و ثبت کنید
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:scale-105 text-white text-xs font-black px-5 py-3 rounded-2xl cursor-pointer shadow-lg flex items-center gap-2 transition-all self-start"
            >
              {showUploadForm ? <X className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
              <span>{showUploadForm ? "بستن فرم" : "ارسال عکس جدید"}</span>
            </button>
          </div>

          {/* Upload form */}
          <AnimatePresence>
            {showUploadForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleCreatePhoto}
                className="bg-stone-50 border border-stone-200 p-5 rounded-2xl mb-6 space-y-4 overflow-hidden"
              >
                <h4 className="font-black text-stone-800 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#c8102e]" />
                  اشتراک‌گذاری قاب جدید از زندگی در اتریش
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                      نام یا نام مستعار شما:
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="مثال: آرمان م."
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#c8102e] font-bold transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                      شهر مربوط به تصویر:
                    </label>
                    <select
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#c8102e] font-bold cursor-pointer transition-colors"
                    >
                      {CITIES.filter((c) => c.id !== "all").map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.emoji} {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                      دسته‌بندی:
                    </label>
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#c8102e] font-bold cursor-pointer transition-colors"
                    >
                      {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                    روش انتخاب تصویر:
                  </label>
                  <div className="flex bg-white border border-stone-200 rounded-xl p-1 gap-1">
                    <button
                      type="button"
                      onClick={() => setIsPresetSelect(true)}
                      className={`flex-1 text-[11px] py-2 rounded-lg font-black transition-all ${
                        isPresetSelect
                          ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-sm"
                          : "text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5 inline ml-1" />
                      کارت‌پستال‌ها
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPresetSelect(false)}
                      className={`flex-1 text-[11px] py-2 rounded-lg font-black transition-all ${
                        !isPresetSelect
                          ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-sm"
                          : "text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 inline ml-1" />
                      آدرس تصویر (URL)
                    </button>
                  </div>
                </div>

                {isPresetSelect ? (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-stone-500 block">
                      انتخاب کارت‌پستال:
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {PRESET_SCENE_PHOTOS.map((pic) => (
                        <button
                          key={pic.url}
                          type="button"
                          onClick={() => setImageUrl(pic.url)}
                          className={`relative p-1 rounded-xl border-2 transition-all overflow-hidden group ${
                            imageUrl === pic.url
                              ? "border-[#c8102e] bg-rose-50/30 shadow-md scale-105"
                              : "border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          <img
                            src={pic.url}
                            alt={pic.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-14 object-cover rounded-lg"
                          />
                          {imageUrl === pic.url && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c8102e] flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                      آدرس اینترنتی مستقیم عکس:
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-[#c8102e] font-mono transition-colors"
                      dir="ltr"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-black text-stone-600 block mb-1.5">
                    توضیح کوتاه یا حس و حال عکس:
                  </label>
                  <textarea
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="از کافه‌نشینی وین، بلیت Klimaticket یا کلیسای سن اشتفان بنویسید..."
                    className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none h-20 font-bold focus:border-[#c8102e] transition-colors resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="text-xs text-stone-500 hover:bg-stone-100 font-black px-4 py-2 rounded-xl cursor-pointer transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:scale-105 text-white text-xs font-black px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    انتشار در گالری
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="space-y-3 border-b border-stone-100 pb-4 mb-5">
            {/* Cities */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-stone-500 flex items-center gap-1 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                شهر:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCity(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-black cursor-pointer transition-all whitespace-nowrap ${
                      selectedCity === c.id
                        ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {c.emoji} {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-stone-500 flex items-center gap-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5" />
                دسته:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-black cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? `bg-gradient-to-br ${cat.color} text-white shadow-sm`
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 rounded-2xl">
              <div className="text-5xl mb-3">📭</div>
              <h4 className="font-black text-stone-700 text-sm mb-1">
                هنوز عکسی در این دسته‌بندی ثبت نشده
              </h4>
              <p className="text-[11px] text-stone-500 font-bold">
                اولین نفری باشید که قاب خود را به اشتراک می‌گذارد!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {filteredPhotos.map((photo, idx) => {
                  const catMeta = CATEGORIES.find((c) => c.id === photo.category);
                  return (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -6 }}
                      className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-square overflow-hidden bg-stone-100">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover select-none group-hover:scale-110 transition-transform duration-700"
                          />

                          {/* Tag */}
                          <span className="absolute top-2.5 right-2.5 text-[10px] bg-black/70 backdrop-blur-sm text-white font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Tag className="w-3 h-3 text-rose-400" />
                            <span>{photo.tag}</span>
                          </span>

                          {/* Category badge */}
                          {catMeta && catMeta.id !== "all" && (
                            <span
                              className={`absolute top-2.5 left-2.5 text-[9px] bg-gradient-to-br ${catMeta.color} text-white font-black px-2 py-0.5 rounded-md shadow-md`}
                            >
                              {catMeta.label}
                            </span>
                          )}

                          {/* Author */}
                          <span className="absolute bottom-2.5 left-2.5 text-[9px] bg-white/90 backdrop-blur-sm text-stone-800 font-black px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1">
                            <Users className="w-3 h-3 text-[#c8102e]" />
                            {photo.submittedBy}
                          </span>
                        </div>

                        <div className="p-4 text-right">
                          <p className="text-xs text-stone-700 leading-relaxed font-bold line-clamp-3 min-h-[3rem]">
                            {photo.caption}
                          </p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-100">
                            <span className="text-[10px] text-stone-400 font-mono">
                              {photo.date}
                            </span>
                            <span className="text-[10px] text-stone-400 font-black flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {photo.cityLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactions */}
                      <div className="p-4 pt-0">
                        <div className="flex justify-between items-center text-xs font-black">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveCommentPhotoId(
                                activeCommentPhotoId === photo.id ? null : photo.id
                              )
                            }
                            className="text-stone-600 hover:text-sky-600 hover:bg-sky-50 p-1.5 px-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>{photo.comments.length} نظر</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleLike(photo.id)}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 px-2.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                            <span>{photo.likes} لایک</span>
                          </button>
                        </div>

                        {/* Comments */}
                        <AnimatePresence>
                          {activeCommentPhotoId === photo.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-stone-100 space-y-2 overflow-hidden"
                            >
                              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                                {photo.comments.map((comm, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="bg-stone-50 px-3 py-2 rounded-lg border border-stone-100 text-[10px] text-stone-700 font-bold leading-relaxed flex items-start gap-2"
                                  >
                                    <Quote className="w-3 h-3 text-stone-300 flex-shrink-0 mt-0.5" />
                                    <span>{comm}</span>
                                  </div>
                                ))}
                                {photo.comments.length === 0 && (
                                  <p className="text-[10px] text-stone-400 text-center py-2 font-black">
                                    اولین نفری باشید که نظر می‌دهد!
                                  </p>
                                )}
                              </div>

                              <form
                                onSubmit={(e) => handleAddComment(photo.id, e)}
                                className="flex items-center gap-1.5 mt-2"
                              >
                                <input
                                  type="text"
                                  value={newCommentText}
                                  onChange={(e) => setNewCommentText(e.target.value)}
                                  placeholder="نظر بگذارید..."
                                  className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[10px] outline-none font-bold focus:border-[#c8102e] transition-colors"
                                  required
                                />
                                <button
                                  type="submit"
                                  className="bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white p-1.5 rounded-lg cursor-pointer hover:scale-105 transition-transform"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* GALLERY TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c8102e]" />
              راهنمای اشتراک‌گذاری قاب‌های ویژه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              توصیه‌هایی برای ثبت بهترین لحظات در اتریش
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Compass,
                title: "کشف نقاط بکر",
                text: "مناطقی خارج از توریسم معمول مانند Wachau، Salzkammergut و Styria را کشف کنید.",
                color: "from-sky-500 to-blue-600",
              },
              {
                icon: Sparkles,
                title: "نور طلایی",
                text: "ساعت‌های طلایی صبح و غروب برای عکاسی از وین و کوه‌های آلپ بهترین نور را دارند.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Heart,
                title: "لحظات انسانی",
                text: "قاب‌های خانوادگی، کافه‌نشینی با دوستان یا بازارهای محلی همیشه محبوب‌ترند.",
                color: "from-rose-500 to-pink-600",
              },
              {
                icon: Award,
                title: "کیفیت و اصالت",
                text: "از فیلترهای زیاده استفاده نکنید؛ اصالت قاب شما ارزشمندترین سرمایه است.",
                color: "from-purple-500 to-indigo-600",
              },
            ].map((tip, i) => {
              const Icon = tip.icon;
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
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tip.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">
                    {tip.title}
                  </h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                    {tip.text}
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
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول گالری
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ به پرتکرارترین سوالات کاربران درباره گالری تصویری
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
              داستان شما، قاب ما
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              قاب خود از اتریش را با ما به اشتراک بگذارید
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              هر عکس، یک داستان است. از کافه‌های وین تا قله‌های آلپ،
              با اشتراک‌گذاری قاب‌های خود، بخشی از پازل زیبای جامعه ایرانیان
              مقیم اتریش را کامل کنید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  setShowUploadForm(true);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                ارسال عکس جدید
              </button>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
                ارتباط با تیم
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                محیط امن
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                ساخته شده با عشق
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                جامعه فارسی‌زبان
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
              تصاویر ارسالی به‌صورت داوطلبانه در گالری نمایش داده می‌شوند. لطفاً
              از ارسال تصاویری که حقوق مالکیت معنوی شخص دیگری را نقض می‌کنند
              خودداری کنید. اتریش‌نشین هیچ‌گونه مسئولیتی در قبال محتوای ارسالی
              کاربران ندارد و حق حذف تصاویر نامناسب را محفوظ می‌دارد.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// FAQ DATA
// ==========================================
const FAQS = [
  {
    q: "چگونه می‌توانم عکسم را در گالری اتریش‌نشین منتشر کنم؟",
    a: "کافیست روی دکمه «ارسال عکس جدید» کلیک کنید، نام یا نام مستعار، شهر، دسته‌بندی و توضیح کوتاه را وارد کنید و سپس تصویر خود را از میان کارت‌پستال‌ها انتخاب یا آدرس تصویر خود را وارد کنید. پس از ارسال، عکس بلافاصله در گالری نمایش داده می‌شود.",
  },
  {
    q: "آیا ارسال عکس در گالری رایگان است؟",
    a: "بله، ارسال عکس، لایک و ثبت نظر در گالری اتریش‌نشین کاملاً رایگان است. هدف این گالری ایجاد فضایی صمیمی برای به اشتراک‌گذاری لحظات و دیدگاه‌های فارسی‌زبانان مقیم اتریش است.",
  },
  {
    q: "آیا اطلاعات من محرمانه می‌ماند؟",
    a: "بله، تنها نام یا نام مستعاری که خودتان وارد می‌کنید در گالری نمایش داده می‌شود. عکس‌ها و اطلاعات شما در سرورهای امن ذخیره شده و در اختیار هیچ شخص ثالثی قرار نمی‌گیرد.",
  },
  {
    q: "می‌توانم عکسی که ارسال کرده‌ام را حذف کنم؟",
    a: "برای حذف عکس خود، کافیست از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ یا ایمیل) با تیم اتریش‌نشین در تماس باشید. تیم ما در اسرع وقت نسبت به حذف اقدام می‌کند.",
  },
  {
    q: "چه نوع عکس‌هایی را می‌توانم ارسال کنم؟",
    a: "هر عکسی از زندگی روزمره، مناظر طبیعی، مکان‌های دیدنی، کافه‌ها، جشنواره‌ها و فرهنگ اتریش. لطفاً از ارسال تصاویر نامناسب، غیرقانونی یا ناقض حق نشر دیگران خودداری کنید.",
  },
];

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
        className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition cursor-pointer"
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