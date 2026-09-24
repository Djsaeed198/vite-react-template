import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../utils/firebase';
import { useFirebase } from '../utils/firebaseContext';
import {
  Search, Plus, MapPin, Tag, Phone, MessageSquare, Info, Filter,
  Heart, ExternalLink, RefreshCw, X, Loader2, DollarSign, Briefcase,
  Home, Laptop, Car, Bookmark, BellRing, LogIn, Sparkles, CheckCircle,
  ShieldCheck, Zap, Users, Star, TrendingUp, Award, Globe, Rocket,
  Handshake, ChevronDown, Clock, Wallet, Building2, ShoppingBag,
  Package, LayoutGrid, LayoutList, ArrowUpDown, Crown, Trophy,
  Eye, Send, PhoneCall, MessageCircle, Facebook, Instagram, Youtube,
  BadgeCheck, UserCheck, Calendar, Hash, AlertTriangle, Quote, Target
} from 'lucide-react';
import SEO from './SEO';

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80";
const MARKET_IMAGE = "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80";

// Category placeholder images
const CATEGORY_IMAGES: Record<string, string> = {
  property: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  jobs: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  vehicles: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
};

interface Ad {
  id: string;
  title: string;
  price: string;
  priceNum: number;
  location: string;
  category: 'property' | 'vehicles' | 'jobs' | 'furniture';
  date: string;
  desc: string;
  contact: string;
  contactType: 'whatsapp' | 'telegram' | 'phone';
  likes: number;
  authorId?: string;
  author: string;
}

const INITIAL_ADS: Ad[] = [
  {
    id: 'a1',
    title: 'اجاره موقت سوئیت ۲ خوابه مبله کامل - منطقه ۱۰ وین (بازه آگوست)',
    price: '۶۵۰ یورو ماهیانه',
    priceNum: 650,
    location: 'Wien',
    category: 'property',
    date: 'امروز',
    desc: 'سوئیت کاملاً دنج و مبله با اینترنت پرسرعت سالیانه و تمامی وسایل آشپزخانه، فاصله ۵ دقیقه‌ای تا باجه مترو Reumannplatz U1. کارهای معتبر ملدتستل مقدور نیست.',
    contact: '00436889763256',
    contactType: 'whatsapp',
    likes: 24,
    authorId: 'seeded_author',
    author: 'پوریا کاظمی'
  },
  {
    id: 'a2',
    title: 'استخدام باریستا شیفت صبح و عصر در کافه سنترال منطقه ۴ وین',
    price: '۱۴ یورو ساعتی (Kollektiv)',
    priceNum: 14,
    location: 'Wien',
    category: 'jobs',
    date: 'امروز',
    desc: 'نیازمند نیروی کاری منظم، پارت‌تایم یا فول‌تایم با آشنایی متوسط به مکالمه روزمره آلمانی (سطح A2 به بالا) جهت پاسخگویی به مشتریان صمیمی اتریشی.',
    contact: 't.me/cafe_central_wien',
    contactType: 'telegram',
    likes: 12,
    authorId: 'seeded_author',
    author: 'آقای شوبِرت'
  },
  {
    id: 'a3',
    title: 'فروش فوری گلف ۲.۰ مدل ۲۰۲۰ دنده‌ای بژ متالیک بی‌رنگ (زالتسبورگ)',
    price: '۱۶,۹۰۰ یورو',
    priceNum: 16900,
    location: 'Salzburg',
    category: 'vehicles',
    date: 'دیروز',
    desc: 'فنی فوق‌العاده سالم به همراه برگ سبز سرویس سالانه اتریش (ÖAMTC-Pickerl جدید). بیمه بدنه جاری تا آخر دسامبر سال جاری میلادی دایر است.',
    contact: '+436649876543',
    contactType: 'phone',
    likes: 8,
    authorId: 'seeded_author',
    author: 'میثم مرادی'
  },
  {
    id: 'a4',
    title: 'مبل چرمی سه نفره ایکیا بسیار نو چوب راش سوئدی (گراتس)',
    price: '۱۸۰ یورو',
    priceNum: 180,
    location: 'Graz',
    category: 'furniture',
    date: '۲ روز پیش',
    desc: 'بدون هیچ‌گونه فرورفتگی یا خط و خش سطحی، فروش به دلیل جابجایی خوابگاه با ماشین باربری شهری. تخفیف جزئی به دانشجویان شریف تعلق می‌گیرد.',
    contact: 't.me/mehran_austria',
    contactType: 'telegram',
    likes: 19,
    authorId: 'seeded_author',
    author: 'مهران نجفی'
  }
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  {
    id: 'property' as const,
    label: 'مسکن و هم‌اتاقی',
    shortLabel: 'مسکن',
    subtitle: 'Wohnung & WG',
    icon: Building2,
    gradient: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    emoji: '🏢',
  },
  {
    id: 'jobs' as const,
    label: 'کاریابی دانشجویی',
    shortLabel: 'کار',
    subtitle: 'Mini-Job & Teilzeit',
    icon: Briefcase,
    gradient: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    emoji: '💼',
  },
  {
    id: 'vehicles' as const,
    label: 'خودرو و جابجایی بار',
    shortLabel: 'ترابری',
    subtitle: 'Auto & Umzug',
    icon: Car,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    emoji: '🚗',
  },
  {
    id: 'furniture' as const,
    label: 'لوازم خانگی و دست دوم',
    shortLabel: 'اثاثیه',
    subtitle: 'Möbel & Second Hand',
    icon: Package,
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    emoji: '🛋️',
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: '۴', label: 'دسته‌بندی اصلی', icon: '📦' },
  { value: '۲۴/۷', label: 'آگهی رایگان', icon: '⏰' },
  { value: '۵', label: 'ایالت اتریش', icon: '🗺️' },
  { value: '۱۰۰٪', label: 'بدون واسطه', icon: '✨' },
];

// ==========================================
// FEATURES / WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: ShieldCheck,
    title: 'کاملاً بدون واسطه',
    text: 'ارتباط مستقیم با آگهی‌دهنده. بدون کمیسیون و بدون پرداخت اضافی.',
    color: 'from-[#c8102e] to-[#970d22]',
  },
  {
    icon: Zap,
    title: 'آگهی رایگان و فوری',
    text: 'آگهی خود را در چند ثانیه ثبت کنید و بلافاصله در دسترس همگان قرار دهید.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Users,
    title: 'شبکه فارسی‌زبانان',
    text: 'دسترسی به هزاران فارسی‌زبان مقیم اتریش در سراسر ایالت‌ها.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    icon: Heart,
    title: 'ساخته‌شده با عشق',
    text: 'پلتفرم مستقل و داوطلبانه، بدون وابستگی به هیچ سازمانی.',
    color: 'from-emerald-500 to-teal-600',
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: 'آیا ثبت آگهی در دیوار اتریش‌نشین رایگان است؟',
    a: 'بله، ثبت آگهی کاملاً رایگان است. برای ثبت آگهی فقط باید با حساب گوگل خود وارد شوید تا هویت شما تأیید شود و از آگهی‌های جعلی جلوگیری شود.',
  },
  {
    q: 'چگونه از کلاهبرداری در معاملات جلوگیری کنیم؟',
    a: 'هرگز پیش از بازدید حضوری، ودیعه یا پیش‌پرداخت واریز نکنید. برای معاملات بزرگ (مسکن، خودرو) حتماً قرارداد کتبی منعقد کنید و از وکالت‌نامه رسمی استفاده کنید. اگر آگهی مشکوکی دیدید، از طریق پشتیبانی تلگرام به ما اطلاع دهید.',
  },
  {
    q: 'آیا می‌توانم آگهی خود را بعداً ویرایش یا حذف کنم؟',
    a: 'در حال حاضر امکان ویرایش مستقیم وجود ندارد، اما می‌توانید از طریق پشتیبانی تلگرام درخواست ویرایش یا حذف آگهی خود را ارسال کنید. توسعه ویرایش مستقیم در برنامه‌های آینده قرار دارد.',
  },
  {
    q: 'چرا بعضی آگهی‌ها شماره تماس ندارند؟',
    a: 'برای حفاظت از حریم خصوصی، اطلاعات تماس پس از کلیک روی دکمه «اطلاعات در تماس» نمایش داده می‌شود. برای تلگرام و واتس‌اپ، لینک مستقیم به چت ایجاد می‌شود.',
  },
  {
    q: 'آیا آگهی‌ها به‌صورت لحظه‌ای به‌روز می‌شوند؟',
    a: 'بله، این پلتفرم با Cloud Firestore ساخته شده و آگهی‌های جدید بلافاصله برای همه کاربران نمایش داده می‌شوند — بدون نیاز به رفرش صفحه.',
  },
];

export default function Divar() {
  const { user, profile, signIn } = useFirebase();
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'property' | 'vehicles' | 'jobs' | 'furniture'>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showContactMap, setShowContactMap] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'likes' | 'price-asc' | 'price-desc'>('newest');

  // Ad form states
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newPriceNum, setNewPriceNum] = useState<number>(0);
  const [newLocation, setNewLocation] = useState('Wien');
  const [newCategory, setNewCategory] = useState<'property' | 'vehicles' | 'jobs' | 'furniture'>('property');
  const [newContact, setNewContact] = useState('');
  const [newContactType, setNewContactType] = useState<'whatsapp' | 'telegram' | 'phone'>('whatsapp');

  // Load from Cloud Firestore with dynamic auto-seeding
  useEffect(() => {
    let unmounted = false;
    const unsubscribe = onSnapshot(collection(db, "divar_items"), async (snapshot) => {
      if (unmounted) return;
      if (snapshot.empty) {
        console.log("Seeding initial ads on Cloud Divar...");
        try {
          for (const ad of INITIAL_ADS) {
            await setDoc(doc(db, "divar_items", ad.id), ad);
          }
        } catch (e) {
          console.error("Ad context seed error:", e);
        }
      } else {
        const val = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as Ad[];
        setAds(val);
        setLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, "divar_items");
      setLoading(false);
    });

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  const handleCreateAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("لطفاً ابتدا با حساب گوگل خود وارد سایت شوید.");
      signIn();
      return;
    }
    if (!newTitle.trim() || !newDesc.trim() || !newContact.trim()) return;

    const adId = `ad_${Date.now()}`;
    const freshAd: Ad = {
      id: adId,
      title: newTitle.trim(),
      desc: newDesc.trim(),
      price: newPrice.trim() || 'توافقی',
      priceNum: Number(newPriceNum) || 0,
      location: newLocation,
      category: newCategory,
      date: 'لحظاتی پیش',
      contact: newContact.trim(),
      contactType: newContactType,
      likes: 0,
      authorId: user.uid,
      author: profile?.displayName || user.displayName || 'کاربر همکار'
    };

    try {
      await setDoc(doc(db, "divar_items", adId), freshAd);
      setNewTitle('');
      setNewDesc('');
      setNewPrice('');
      setNewPriceNum(0);
      setNewContact('');
      setShowAddForm(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `divar_items/${adId}`);
    }
  };

  const handleToggleLike = async (id: string, currentLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await updateDoc(doc(db, "divar_items", id), {
        likes: currentLikes + 1
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `divar_items/${id}`);
    }
  };

  const toggleContactReveal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContactMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ad.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ad.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'all' || ad.category === selectedCat;
    const matchesCity = selectedCity === 'all' ||
                        ad.location.toLowerCase().includes(selectedCity.toLowerCase());
    return matchesSearch && matchesCat && matchesCity;
  });

  const sortedAds = [...filteredAds].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'price-asc') return a.priceNum - b.priceNum;
    if (sortBy === 'price-desc') return b.priceNum - a.priceNum;
    return 0;
  });

  const getCategoryInfo = (catId: string) => CATEGORIES.find(c => c.id === catId) || CATEGORIES[0];

  // Top-liked ad
  const topAd = ads.length > 0 ? [...ads].sort((a, b) => b.likes - a.likes)[0] : null;

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "دیوار ایرانیان اتریش - اتریش‌نشین",
      url: "https://otrish-iran.ir/divar",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "پلتفرم رایگان آگهی‌های مسکن، کاریابی، خودرو و لوازم دست دوم برای فارسی‌زبانان مقیم اتریش.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
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
    <>
      <SEO
        title="دیوار ایرانیان اتریش | آگهی رایگان مسکن، کار، خودرو و لوازم"
        description="پلتفرم رایگان آگهی‌های نیازمندی برای فارسی‌زبانان مقیم اتریش. مسکن، کاریابی دانشجویی، خودرو و لوازم دست دوم در وین، گراتس، لینتس و سالزبورگ."
        keywords="دیوار اتریش, آگهی مسکن اتریش, کاریابی اتریش, اجاره وین, کار دانشجویی اتریش, خرید خودرو اتریش, لوازم دست دوم وین, اتریش‌نشین"
        schemaData={seoSchema}
      />

      <div className="bg-stone-50 font-sans" dir="rtl">
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
                alt="دیوار ایرانیان اتریش"
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              📦
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
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                  Marktplatz für Iraner in Österreich
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  دیوار ایرانیان اتریش
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                  کریدور معاملاتی بدون واسطه مسکن خوابگاهی، کار دانشجویی، لوازم
                  دست دوم و نیازمندی‌های فوری هموطنان مقیم وین و ایالات اتریش.
                  ثبت آگهی رایگان، ارتباط مستقیم، بدون کمیسیون.
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>آگهی رایگان</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>بلادرنگ ابری</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>بدون واسطه</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ========================================== */}
          {/* STATS */}
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
          {/* CATEGORY CARDS */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                دسته‌بندی آگهی‌ها
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                موضوع مورد نظر خود را انتخاب کنید یا همه آگهی‌ها را مرور کنید
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {/* All */}
              <motion.button
                onClick={() => setSelectedCat('all')}
                whileHover={{ y: -4 }}
                className={`relative p-4 rounded-2xl border-2 text-center transition-all overflow-hidden group ${
                  selectedCat === 'all'
                    ? 'border-[#c8102e] bg-gradient-to-br from-[#c8102e]/10 to-[#970d22]/10 shadow-md'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2 transition-all ${
                    selectedCat === 'all'
                      ? 'bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <LayoutList className="w-5 h-5" />
                </div>
                <div className={`text-[10px] md:text-xs font-black ${selectedCat === 'all' ? 'text-[#c8102e]' : 'text-stone-700'}`}>
                  همه آگهی‌ها
                </div>
                <div className="text-[8.5px] font-bold text-stone-400 mt-0.5 font-mono">
                  {ads.length} مورد
                </div>
              </motion.button>

              {/* Categories */}
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCat === cat.id;
                const count = ads.filter(a => a.category === cat.id).length;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    whileHover={{ y: -4 }}
                    className={`relative p-4 rounded-2xl border-2 text-center transition-all overflow-hidden group ${
                      isActive
                        ? 'border-[#c8102e] bg-gradient-to-br from-[#c8102e]/10 to-[#970d22]/10 shadow-md'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {isActive && (
                      <CheckCircle className="absolute top-2 left-2 w-4 h-4 text-[#c8102e]" />
                    )}
                    <div
                      className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2 transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${cat.gradient} text-white shadow-md`
                          : `${cat.bg} ${cat.text}`
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className={`text-[10px] md:text-xs font-black ${isActive ? 'text-[#c8102e]' : 'text-stone-700'}`}>
                      {cat.shortLabel}
                    </div>
                    <div className="text-[8.5px] font-bold text-stone-400 mt-0.5 font-mono">
                      {count} مورد
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* TOP AD HIGHLIGHT (if exists) */}
          {/* ========================================== */}
          {topAd && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-5 md:p-6 text-white"
            >
              <div className="absolute inset-0">
                <img
                  src={CATEGORY_IMAGES[topAd.category]}
                  alt={topAd.title}
                  className="w-full h-full object-cover opacity-[0.06]"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#c8102e]/15 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-amber-950 shadow-lg flex-shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-amber-300 mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      پرطرفدارترین آگهی امروز
                    </div>
                    <h3 className="text-xs md:text-sm font-black leading-snug line-clamp-1">
                      {topAd.title}
                    </h3>
                    <div className="text-[10px] font-bold text-stone-400 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {topAd.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                        {topAd.likes} لایک
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-[9px] font-black text-stone-400">قیمت</div>
                  <div className="text-sm md:text-base font-black font-mono text-amber-300">
                    {topAd.price}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* MAIN AD WIZARD */}
          {/* ========================================== */}
          <div
            className="bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden"
            id="otrish-divar-module"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

            {/* Header */}
            <div className="p-5 md:p-6 border-b border-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base md:text-lg font-black text-stone-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#c8102e]" />
                  مرکز آگهی‌های نیازمندی
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-black">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    ابری و بلادرنگ
                  </span>
                </h2>
                <p className="text-[11px] text-stone-500 font-bold mt-1 leading-relaxed">
                  {ads.length} آگهی فعال · {filteredAds.length} مورد منطبق با فیلتر
                </p>
              </div>

              <motion.button
                onClick={() => {
                  if (!user) {
                    alert("لطفاً ابتدا وارد حساب گوگل خود شوید.");
                    signIn();
                    return;
                  }
                  setShowAddForm(!showAddForm);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg text-white text-xs font-black px-4 py-3 rounded-2xl flex items-center gap-1.5 transition-all shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>ثبت رایگان آگهی نیازمندی</span>
              </motion.button>
            </div>

            {/* ========================================== */}
            {/* AD CREATION FORM */}
            {/* ========================================== */}
            <AnimatePresence>
              {showAddForm && user && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleCreateAd}
                  className="overflow-hidden border-b border-stone-100"
                >
                  <div className="p-5 md:p-6 bg-stone-50 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <h4 className="text-xs font-black text-stone-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#c8102e]" />
                        فرم ثبت آگهی جدید
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="w-7 h-7 bg-stone-200 rounded-full hover:bg-stone-300 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <X className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Title */}
                      <div className="md:col-span-8">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          عنوان کوتاه و رسا آگهی (فارسی):
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={e => setNewTitle(e.target.value)}
                          placeholder="مثال: واگذاری کارت سالانه Klimaticket وین..."
                          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all text-stone-800"
                        />
                      </div>

                      {/* Category */}
                      <div className="md:col-span-4">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          دسته‌بندی:
                        </label>
                        <select
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value as any)}
                          className="w-full bg-white border border-stone-200 rounded-2xl px-3 py-3 text-xs font-bold outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
                        >
                          <option value="property">🏢 مسکن و هم‌اتاقی</option>
                          <option value="jobs">💼 کاریابی دانشجویی</option>
                          <option value="vehicles">🚗 خودرو و جابجایی بار</option>
                          <option value="furniture">🛋 لوازم خانگی و دست دوم</option>
                        </select>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-4">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          مبلغ / هزینه (یورو یا تومان):
                        </label>
                        <input
                          type="text"
                          required
                          value={newPrice}
                          onChange={e => {
                            setNewPrice(e.target.value);
                            const parsed = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                            setNewPriceNum(parsed || 0);
                          }}
                          placeholder="مثال: ۴۵۰ یورو ماهیانه / توافقی"
                          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all text-stone-800"
                        />
                      </div>

                      {/* Location */}
                      <div className="md:col-span-4">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          ایالت / شهر:
                        </label>
                        <select
                          value={newLocation}
                          onChange={e => setNewLocation(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-2xl px-3 py-3 text-xs font-bold outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
                        >
                          <option value="Wien">وین (Wien)</option>
                          <option value="Graz">گراتس (Graz)</option>
                          <option value="Linz">لینتس (Linz)</option>
                          <option value="Salzburg">زالتسبورگ (Salzburg)</option>
                          <option value="Innsbruck">اینسبروک (Innsbruck)</option>
                        </select>
                      </div>

                      {/* Author */}
                      <div className="md:col-span-4">
                        <label className="text-[10px] font-black text-stone-500 block mb-1 flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          نام آگهی‌دهنده (تأیید‌شده):
                        </label>
                        <input
                          type="text"
                          disabled
                          value={profile?.displayName || user.displayName || "کاربر همکار"}
                          className="w-full bg-stone-100 border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none text-stone-500 cursor-not-allowed"
                        />
                      </div>

                      {/* Contact */}
                      <div className="md:col-span-8">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          آی‌دی تلگرام یا شماره تماس:
                        </label>
                        <input
                          type="text"
                          required
                          value={newContact}
                          onChange={e => setNewContact(e.target.value)}
                          placeholder="مثال: t.me/ali_wien یا +436609998888"
                          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-xs font-bold outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all text-left font-mono text-stone-800"
                          dir="ltr"
                        />
                      </div>

                      {/* Contact Type */}
                      <div className="md:col-span-4">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          بستر پیام‌رسان:
                        </label>
                        <select
                          value={newContactType}
                          onChange={e => setNewContactType(e.target.value as any)}
                          className="w-full bg-white border border-stone-200 rounded-2xl px-3 py-3 text-xs font-bold outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
                        >
                          <option value="whatsapp">واتس‌اپ (WhatsApp)</option>
                          <option value="telegram">تلگرام (Telegram)</option>
                          <option value="phone">تماس صوتی مستقیم</option>
                        </select>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-12">
                        <label className="text-[10px] font-black text-stone-500 block mb-1">
                          توضیحات تکمیلی:
                        </label>
                        <textarea
                          required
                          value={newDesc}
                          onChange={e => setNewDesc(e.target.value)}
                          rows={3}
                          placeholder="اطلاعات تکمیلی، متراژ، نحوه تماس، زمان بازدید یا واگذاری..."
                          className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3.5 text-xs font-bold outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all text-stone-800"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-black rounded-xl cursor-pointer transition"
                      >
                        انصراف
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:shadow-lg text-white text-xs font-black rounded-xl cursor-pointer transition-all shadow-md"
                      >
                        تایید و انتشار فوری
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* ========================================== */}
            {/* FILTERS */}
            {/* ========================================== */}
            <div className="p-5 md:p-6 bg-white border-b border-stone-100">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Search */}
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="جستجو در دیوار... (مثال: سوئیت، باریستا، ایکیا)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-10 pl-4 py-3 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
                  />
                </div>

                {/* City filter */}
                <div className="md:col-span-3">
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-3 text-xs font-black outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
                  >
                    <option value="all">📍 تمامی ایالت‌ها</option>
                    <option value="Wien">وین (Wien)</option>
                    <option value="Graz">گراتس (Graz)</option>
                    <option value="Linz">لینتس (Linz)</option>
                    <option value="Salzburg">زالتسبورگ (Salzburg)</option>
                    <option value="Innsbruck">اینسبروک (Innsbruck)</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="md:col-span-2">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-3 py-3 text-xs font-black outline-none cursor-pointer text-stone-800 focus:border-[#c8102e]"
                  >
                    <option value="newest">جدیدترین</option>
                    <option value="likes">محبوب‌ترین</option>
                    <option value="price-asc">ارزان‌ترین</option>
                    <option value="price-desc">گران‌ترین</option>
                  </select>
                </div>

                {/* View mode */}
                <div className="md:col-span-2 flex items-center gap-1 bg-stone-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                      viewMode === 'grid' ? 'bg-white text-[#c8102e] shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    کارت
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                      viewMode === 'list' ? 'bg-white text-[#c8102e] shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    <LayoutList className="w-3.5 h-3.5" />
                    لیست
                  </button>
                </div>
              </div>

              {/* Active filter chips */}
              {(selectedCat !== 'all' || selectedCity !== 'all' || searchQuery) && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="text-[10px] font-black text-stone-500">فیلترهای فعال:</span>
                  {selectedCat !== 'all' && (
                    <button
                      onClick={() => setSelectedCat('all')}
                      className="inline-flex items-center gap-1 text-[10px] font-black text-[#c8102e] bg-rose-50 px-2 py-1 rounded-full hover:bg-rose-100 transition"
                    >
                      {getCategoryInfo(selectedCat).label}
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                  {selectedCity !== 'all' && (
                    <button
                      onClick={() => setSelectedCity('all')}
                      className="inline-flex items-center gap-1 text-[10px] font-black text-[#c8102e] bg-rose-50 px-2 py-1 rounded-full hover:bg-rose-100 transition"
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      {selectedCity}
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1 text-[10px] font-black text-[#c8102e] bg-rose-50 px-2 py-1 rounded-full hover:bg-rose-100 transition"
                    >
                      <Search className="w-2.5 h-2.5" />
                      {searchQuery}
                      <X className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ========================================== */}
            {/* ADS LIST */}
            {/* ========================================== */}
            <div className="p-5 md:p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-stone-400">
                  <Loader2 className="w-10 h-10 animate-spin text-[#c8102e]" />
                  <span className="text-xs font-bold">در حال همگام‌سازی بلادرنگ دیوار...</span>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${viewMode}-${selectedCat}-${selectedCity}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                        : 'space-y-3'
                    }
                  >
                    {sortedAds.map((ad, i) => {
                      const isContactRevealed = !!showContactMap[ad.id];
                      const catInfo = getCategoryInfo(ad.category);
                      const CatIcon = catInfo.icon;

                      return (
                        <motion.div
                          key={ad.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                          whileHover={{ y: -4 }}
                          className={`group bg-white border-2 border-stone-200 hover:border-[#c8102e]/30 rounded-3xl overflow-hidden transition-all shadow-sm hover:shadow-lg ${
                            viewMode === 'list' ? 'md:flex' : ''
                          }`}
                        >
                          {/* Category image */}
                          <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-56 md:flex-shrink-0 h-40 md:h-auto' : 'h-40'}`}>
                            <img
                              src={CATEGORY_IMAGES[ad.category]}
                              alt={ad.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Category badge */}
                            <div
                              className={`absolute top-3 right-3 inline-flex items-center gap-1 bg-gradient-to-r ${catInfo.gradient} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
                            >
                              <CatIcon className="w-2.5 h-2.5" />
                              {catInfo.shortLabel}
                            </div>

                            {/* Location badge */}
                            <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-stone-800 text-[10px] font-black px-2 py-1 rounded-full shadow-lg">
                              <MapPin className="w-3 h-3 text-[#c8102e]" />
                              {ad.location}
                            </div>

                            {/* Likes */}
                            <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black px-2 py-1 rounded-full">
                              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                              {ad.likes}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <h4 className="text-xs sm:text-sm font-black text-stone-900 leading-relaxed flex-1">
                                  {ad.title}
                                </h4>
                                <span className="inline-flex items-center gap-1 text-[9px] font-black text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full flex-shrink-0">
                                  <Clock className="w-2.5 h-2.5" />
                                  {ad.date}
                                </span>
                              </div>

                              <p className="text-[11px] text-stone-500 font-bold leading-relaxed pb-2 border-b border-stone-100">
                                {ad.desc}
                              </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between gap-3 pt-3 flex-wrap">
                              <div>
                                <span className="text-[9px] text-stone-400 font-bold block mb-0.5 flex items-center gap-1">
                                  <Wallet className="w-2.5 h-2.5" />
                                  قیمت
                                </span>
                                <span className="text-xs font-black text-[#c8102e] font-mono">
                                  {ad.price}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={(e) => handleToggleLike(ad.id, ad.likes, e)}
                                  whileTap={{ scale: 0.9 }}
                                  className="h-9 px-3 rounded-xl border-2 flex items-center gap-1.5 cursor-pointer text-xs font-black bg-white border-stone-200 text-stone-500 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                >
                                  <Heart className="w-3.5 h-3.5" />
                                  <span className="font-mono text-[10.5px]">{ad.likes}</span>
                                </motion.button>

                                <motion.button
                                  onClick={(e) => toggleContactReveal(ad.id, e)}
                                  whileTap={{ scale: 0.95 }}
                                  className="h-9 px-3.5 bg-gradient-to-br from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white text-[10.5px] font-black rounded-xl transition-all flex items-center gap-1.5 shadow-md"
                                >
                                  {isContactRevealed ? (
                                    <>
                                      <X className="w-3.5 h-3.5" />
                                      <span>بستن</span>
                                    </>
                                  ) : (
                                    <>
                                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                                      <span>اطلاعات تماس</span>
                                    </>
                                  )}
                                </motion.button>
                              </div>
                            </div>

                            {/* Contact reveal */}
                            <AnimatePresence>
                              {isContactRevealed && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 mt-3 flex items-center justify-between text-xs font-bold gap-3">
                                    <div className="text-right space-y-0.5 flex-1 min-w-0">
                                      <span className="text-[9px] text-stone-400 font-bold block flex items-center gap-1">
                                        <UserCheck className="w-2.5 h-2.5" />
                                        منتشرکننده: {ad.author}
                                      </span>
                                      <span className="font-mono text-stone-800 block select-all font-black text-[11px] truncate" dir="ltr">
                                        {ad.contact}
                                      </span>
                                    </div>

                                    {ad.contactType === 'whatsapp' || ad.contactType === 'phone' ? (
                                      <a
                                        href={ad.contact.startsWith('+') ? `https://wa.me/${ad.contact.replace('+', '')}` : `tel:${ad.contact}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gradient-to-br from-emerald-500 to-green-600 hover:shadow-lg text-white text-[10px] font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 flex-shrink-0"
                                      >
                                        <MessageCircle className="w-3 h-3" />
                                        <span>واتس‌اپ</span>
                                      </a>
                                    ) : (
                                      <a
                                        href={ad.contact.startsWith('t.me/') ? `https://${ad.contact}` : `https://t.me/${ad.contact.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gradient-to-br from-sky-500 to-blue-600 hover:shadow-lg text-white text-[10px] font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 flex-shrink-0"
                                      >
                                        <Send className="w-3 h-3" />
                                        <span>تلگرام</span>
                                      </a>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}

                    {sortedAds.length === 0 && (
                      <div className="col-span-2 text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                        <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                          <Search className="w-8 h-8 text-stone-400" />
                        </div>
                        <p className="text-sm font-black text-stone-700 mb-1">
                          آگهی منطبق با فیلترها یافت نشد
                        </p>
                        <p className="text-[11px] font-bold text-stone-500 mb-4">
                          فیلترها را تغییر دهید یا کلمه دیگری جستجو کنید
                        </p>
                        <button
                          onClick={() => {
                            setSelectedCat('all');
                            setSelectedCity('all');
                            setSearchQuery('');
                          }}
                          className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                          <RefreshCw className="w-3 h-3" />
                          پاک‌سازی فیلترها
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* ========================================== */}
          {/* WHY USE */}
          {/* ========================================== */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                چرا دیوار اتریش‌نشین؟
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                چهار دلیل که این پلتفرم را به انتخاب اول فارسی‌زبانان تبدیل می‌کند
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {WHY_USE.map((v, i) => {
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
                پاسخ به پرتکرارترین سوالات کاربران دیوار اتریش‌نشین
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
                نکات ایمنی مهم در معاملات
              </h5>
              <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
                <li>هرگز قبل از بازدید حضوری، ودیعه یا پیش‌پرداخت واریز نکنید.</li>
                <li>برای معاملات مسکن و خودرو، حتماً قرارداد کتبی منعقد کنید.</li>
                <li>اطلاعات بانکی خود را در اختیار هیچ آگهی‌دهنده ناشناسی قرار ندهید.</li>
                <li>در صورت مشاهده آگهی مشکوک، از طریق پشتیبانی تلگرام به ما اطلاع دهید.</li>
                <li>اتریش‌نشین هیچ‌گونه مسئولیتی در قبال محتوای آگهی‌ها یا معاملات ندارد.</li>
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
            <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/50 rounded-full blur-[100px] pointer-events-none opacity-30" />

            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
                <Handshake className="w-3.5 h-3.5 text-amber-300" />
                کنار شما در معاملات روزمره
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-3">
                آگهی، سوال یا پیشنهادی دارید؟
              </h2>

              <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
                اگر نیاز به راهنمایی در ثبت آگهی، امنیت معامله یا گزارش آگهی
                مشکوک دارید، تیم اتریش‌نشین آماده کمک رایگان به شماست.
              </p>

              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
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
                اتریش‌نشین یک پلتفرم مستقل و داوطلبانه است و فقط بستری برای
                انتشار آگهی‌های فارسی‌زبانان مقیم اتریش فراهم می‌کند. مسئولیت
                صحت محتوای آگهی‌ها، انجام معاملات و هرگونه اختلاف بین طرفین
                کاملاً بر عهده کاربران است. برای معاملات مهم، با وکیل یا
                مشاوران واجد شرایط مشورت کنید.
              </p>
            </div>
          </div>
        </div>
      </div>
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