import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, ShoppingCart, Info, ShoppingBag, Plus, Minus, Trash2, Check,
  Sparkles, Filter, CheckCircle2, ShoppingBasket, Euro, TrendingUp,
  TrendingDown, Award, Star, Heart, ShieldCheck, Clock, Users, Globe,
  Link2, ExternalLink, Quote, Lightbulb, ChevronDown, ChevronLeft,
  Send, MessageCircle, Phone, Rocket, Target, Zap, Eye, X, BadgeCheck,
  Crown, Flame, Snowflake, Milk, Beef, Wheat, Egg, Salad, Wheat as WheatIcon,
  Coffee, Wallet, CreditCard, Package, Truck, MapPin, Store, Navigation,
  Instagram, Facebook, Twitter, Youtube, Percent, Calculator, Scale,
  Landmark, BookOpen, HandHeart, Handshake, Gem, BadgePercent, Recycle,
  FilterX, Grid, LayoutList, ListFilter
} from 'lucide-react';
import SEO from './SEO';
import { toast } from '../utils/toast';

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۰", label: "محصول کلیدی", icon: "🛒", sub: "معادل آلمانی دقیق" },
  { value: "۴", label: "زنجیره اصلی", icon: "🏪", sub: "Lidl، Hofer، Spar، Billa" },
  { value: "۳۵٪", label: "صرفه‌جویی هفتگی", icon: "💰", sub: "با انتخاب هوشمند برند" },
  { value: "۳", label: "فروشگاه حلال", icon: "☪️", sub: "Etsan، Aycan، Damla" },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه دسته‌ها", icon: Grid, emoji: "🌐", color: "from-stone-600 to-stone-800", bg: "bg-stone-100", text: "text-stone-800" },
  { id: "dairy", label: "لبنیات و پنیر", icon: Milk, emoji: "🥛", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-800" },
  { id: "meat", label: "گوشت و پروتئین", icon: Beef, emoji: "🥩", color: "from-rose-500 to-red-600", bg: "bg-rose-50", text: "text-rose-800" },
  { id: "pantry", label: "خواربار و خشکبار", icon: Package, emoji: "🥫", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-800" },
  { id: "bakery", label: "نان و غلات", icon: Wheat, emoji: "🥖", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-800" },
];

// ==========================================
// GROCERY CATALOGUE
// ==========================================
const GROCERY_CATALOGUE = [
  { id: 'g1', farsi: 'ماست سون (ماست خامه‌ای غلیظ)', german: 'Griechisches Joghurt (10%)', category: 'dairy', basePrice: 2.19, unit: '۱ کیلوگرم', stores: ['Spar', 'Billa', 'Hofer', 'Etsan'], halal: true, desc: 'ماست یونانی ۱۰٪ چرب نزدیک‌ترین طعم را به ماست‌های خامه‌ای محبوب ایرانی دارد.', emoji: '🥛', tags: ['ماست', 'Yoghurt', 'خامه‌ای'] },
  { id: 'g2', farsi: 'گوشت چرخ‌کرده مخلوط حلال', german: 'Halal Rinderfaschiertes', category: 'meat', basePrice: 6.99, unit: '۵۰۰ گرم', stores: ['Etsan', 'Aycan', 'Damla'], halal: true, desc: 'فقط در سوپرمارکت‌های ترک (نظیر Etsan) یا بخش حلال برخی شعب مگابیل گوشت حلال چرخ شده عرضه می‌شود.', emoji: '🥩', tags: ['گوشت حلال', 'Faschiertes', 'چرخ‌کرده'] },
  { id: 'g3', farsi: 'سرشیر لبنی ممتاز (کایماک)', german: 'Schlagobers / Kaimak', category: 'dairy', basePrice: 1.49, unit: '۲۵۰ گرم', stores: ['Lidl', 'Spar', 'Hofer', 'Aycan'], halal: true, desc: 'در فروشگاه‌های ترک کایماک (Kaimak) و در اتریشی دوبل‌خامه با چربی بالا وجود دارد.', emoji: '🍶', tags: ['سرشیر', 'Kaimak', 'Schlagobers'] },
  { id: 'g4', farsi: 'برنج باسماتی درجه یک', german: 'Basmati Reis', category: 'pantry', basePrice: 2.49, unit: '۱ کیلوگرم', stores: ['Lidl', 'Hofer', 'Billa', 'Etsan'], halal: true, desc: 'حداکثر تنوع برندهای برنج عطری در فروشگاه‌های ترک و عربی با کیسه‌های ۵ کیلویی فراهم است.', emoji: '🍚', tags: ['برنج', 'Basmati', 'Reis'] },
  { id: 'g5', farsi: 'پنیر فتا گوسفندی (پنیر تبریز)', german: 'Schafskäse in Lake', category: 'dairy', basePrice: 3.49, unit: '۴۰۰ گرم', stores: ['Spar', 'Billa', 'Hofer', 'Etsan'], halal: true, desc: 'پنیر در آب‌نمک با عنوان Schafskäse طعم بسیار مشابهی به پنیر تبریزی دارد.', emoji: '🧀', tags: ['پنیر', 'Feta', 'تبریز'] },
  { id: 'g6', farsi: 'نخود گرد طلایی', german: 'Kichererbsen', category: 'pantry', basePrice: 1.19, unit: '۵۰۰ گرم', stores: ['Lidl', 'Hofer', 'Spar'], halal: true, desc: 'نخود خشک در بخش حبوبات تمام شعب اتریش با قیمت بسیار ارزان یافت می‌شود.', emoji: '🫘', tags: ['نخود', 'Kichererbsen', 'حبوبات'] },
  { id: 'g7', farsi: 'لپه زرد تبریزی', german: 'Gelbe Schälerbsen (halbiert)', category: 'pantry', basePrice: 1.29, unit: '۵۰۰ گرم', stores: ['Spar', 'Etsan'], halal: true, desc: 'برای خورش قیمه، لپه پوست کنده نصفه زرد بهترین گزینه اتریشی است.', emoji: '🥣', tags: ['لپه', 'Erbsen', 'قیمه'] },
  { id: 'g8', farsi: 'سبزی قورمه خشک ممتاز', german: 'Kräutermischung (Petersilie/Schnittlauch)', category: 'pantry', basePrice: 2.99, unit: '۱۰۰ گرم', stores: ['Etsan', 'Aycan'], halal: true, desc: 'سبزی قورمه کامل خشک معمولاً در مارکت‌های ترک یافت می‌شود. در فروشگاه‌های اتریش باید تره (Schnittlauch) و جعفری (Petersilie) تازه بخرید.', emoji: '🌿', tags: ['سبزی', 'قورمه', 'Kräuter'] },
  { id: 'g9', farsi: 'نان تافتون / لواش عربی', german: 'Dürüm / Fladenbrot', category: 'bakery', basePrice: 0.99, unit: '۵ عدد', stores: ['Hofer', 'Lidl', 'Etsan'], halal: true, desc: 'Fladenbrot نان ضخیم گرد و لذیذ است و نان لواش را با عنوان لبنانی دوروم (Dürüm) می‌فروشند.', emoji: '🥖', tags: ['نان', 'لواش', 'Fladenbrot'] },
  { id: 'g10', farsi: 'رب گوجه‌فرنگی غلیظ', german: 'Tomatenmark', category: 'pantry', basePrice: 1.09, unit: '۲۰۰ گرم', stores: ['Lidl', 'Hofer', 'Billa', 'Spar'], halal: true, desc: 'رب با غلظت عالی در تیوپ یا قوطی در تمام قفسه‌های سس اتریش چیده شده است.', emoji: '🍅', tags: ['رب', 'Tomatenmark', 'سس'] },
];

// ==========================================
// STORE COMPARISON
// ==========================================
const STORE_BUDGET_COMPARISON = [
  {
    name: 'Lidl / Hofer',
    tier: 'اقتصادی / دیسکانت',
    rating: 5,
    text: 'ارزان‌ترین نرخ‌های پایه میوه، تخم‌مرغ، برنج و مواد شوینده بهداشتی در این دو وجود دارد.',
    tag: 'بهترین قیمت',
    icon: BadgePercent,
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    text_color: 'text-emerald-800',
  },
  {
    name: 'Turkish Market (Aycan/Etsan)',
    tier: 'متوسط / قومی حلال',
    rating: 4,
    text: 'مرجع تام حلال، چای معطر ایرانی، سبزیجات تازه کیلوئی ارزنده، گوشت مرغ و بره زیر نظر دامپزشکی حلال.',
    tag: 'تنوع شرقی',
    icon: BadgeCheck,
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    text_color: 'text-teal-800',
  },
  {
    name: 'Spar / Eurospar',
    tier: 'متوسط رو به بالا / باکیفیت',
    rating: 4,
    text: 'بزرگترین تنوع برند، بخش محصولات زیستی ارگانیک (Bio) و فروشگاه‌های بزرگ مجهز به کافه.',
    tag: 'کیفیت برتر',
    icon: Award,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text_color: 'text-amber-800',
  },
  {
    name: 'Billa / Billa Plus',
    tier: 'محلی / گران',
    rating: 3,
    text: 'شعب پر تعداد در تمام محلات وین با سهم عمیق گوشت‌های محلی مرغوب اتریش ولی نرخ کلی سبد خرید گرانتر است.',
    tag: 'محلی وین',
    icon: Store,
    color: 'from-rose-500 to-red-600',
    bg: 'bg-rose-50',
    text_color: 'text-rose-800',
  },
];

// ==========================================
// SHOPPING TIPS
// ==========================================
const SHOPPING_TIPS = [
  { icon: Percent, title: "بن تخفیف Jö Bonus Club", text: "با عضویت رایگان در Jö Bonus Club (Billa، Penny، Bipa) از تخفیف‌های هفتگی و کوپن‌های اختصاصی بهره‌مند شوید." },
  { icon: Clock, title: "خرید در ساعات پایانی", text: "پس از ساعت ۱۹، محصولات نزدیک انقضا در Billa و Spar با ۳۰-۵۰٪ تخفیف عرضه می‌شوند." },
  { icon: Sparkles, title: "برچسب زرد تخفیف", text: "برچسب‌های زرد «Aktion» روی بسته‌بندی محصولات در Hofer و Lidl نشانه تخفیف فوری است." },
  { icon: Wallet, title: "برند اختصاصی فروشگاه", text: "برند S-Budget در Spar و Clever در Billa قیمت مشابه Hofer با کیفیت قابل قبول دارند." },
  { icon: Truck, title: "خرید عمده METRO", text: "با کارت METRO یا C&C و خرید گروهی با همسایگان، هزینه هر نفر تا ۲۵٪ کاهش می‌یابد." },
  { icon: Recycle, title: "بازگشت بطری Pfand", text: "بطری‌ها و قوطی‌ها را به Pfandautomat برگردانید و €۰.۲۵ به ازای هر قوطی پس بگیرید." },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چطور می‌توانم ماست سون ایرانی را در اتریش پیدا کنم؟",
    a: "نزدیک‌ترین معادل ماست سون، «Griechisches Joghurt 10%» است که در تمام سوپرمارکت‌های اتریش (Spar، Billa، Hofer، Lidl) موجود است. این ماست یونانی با چربی ۱۰٪ بافت و طعم بسیار مشابه ماست سون ایرانی دارد. برای کیفیت بالاتر، از فروشگاه‌های ترکی (Etsan، Aycan) ماست Kaimak یا Süzme Yogurt تهیه کنید.",
  },
  {
    q: "گوشت حلال در اتریش را از کجا تهیه کنم؟",
    a: "گوشت حلال در اتریش از دو طریق تهیه می‌شود: ۱) فروشگاه‌های ترکی که دارای تأییدیه IIDC یا IGGO هستند مانند ETSAN، Aycan و Uzman که قصابی داخلی دارند. ۲) بخش حلال برخی از شعب بزرگ Billa Plus و SPAR. توصیه می‌شود همیشه برچسب Halal و تأییدیه رسمی را بررسی کنید.",
  },
  {
    q: "نزدیک‌ترین معادل پنیر تبریز در اتریش چیست؟",
    a: "پنیر Schafskäse in Lake (پنیر گوسفندی در آب‌نمک) نزدیک‌ترین طعم را به پنیر تبریز دارد. این محصول در تمام سوپرمارکت‌های اتریش و همچنین فروشگاه‌های ترکی مانند Etsan با کیفیت‌های مختلف موجود است. برندهای معروف: Salakis، Dodoni، Kolios.",
  },
  {
    q: "ارزان‌ترین سوپرمارکت اتریش برای خرید هفتگی کدام است؟",
    a: "بر اساس مقایسه قیمت‌ها، Lidl و Hofer (آلدی اتریش) ارزان‌ترین نرخ‌های پایه را دارند. میانگین سبد خرید هفتگی یک خانواده ۲ نفره: €۸۰-۱۲۰ در Lidl/Hofer، €۱۰۰-۱۵۰ در Spar، €۱۲۰-۱۶۰ در Billa. برای صرفه‌جویی بیشتر، محصولات برند اختصاصی (S-Budget در Spar، Clever در Billa، Zurück zum Ursprung در Hofer) را انتخاب کنید.",
  },
  {
    q: "چگونه از تخفیف‌های هفتگی سوپرمارکت‌های اتریش مطلع شوم؟",
    a: "روش‌های اصلی: ۱) اپلیکیشن Jö Bonus Club (مشترک Billa، Penny، Bipa) با کوپن‌های اختصاصی. ۲) اپلیکیشن Spar App با «Spar PLUS». ۳) بروشورهای هفتگی که در ورودی فروشگاه‌ها پخش می‌شود. ۴) سایت‌های مقایسه قیمت مانند «Durchblicker» و «Preisrunter.at».",
  },
  {
    q: "آیا محصولات برند ایرانی در سوپرمارکت‌های اتریش موجود است؟",
    a: "بله، اما محدود. برندهای اصلی ایرانی مانند چای احمد (Ahmad Tea)، برنج باسماتی، زعفران، خرمای مضافتی، پسته و لواشک در سوپرمارکت‌های ایرانی مانند Nima، Raman Markt، Niki Markt و Shakhenabat موجود است. برای محصولات خاص ایرانی، فروشگاه‌های تخصصی ایرانی در وین بهترین گزینه هستند.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "Statistik Austria", url: "https://www.statistik.at", desc: "آمار رسمی قیمت‌ها" },
  { name: "AK Konsumentenschutz", url: "https://www.arbeiterkammer.at", desc: "پایش قیمت اتاق کارگران" },
  { name: "Jö Bonus Club", url: "https://www.joeclub.at", desc: "باشگاه تخفیف رسمی" },
  { name: "IIDC Halal", url: "https://www.iidc.at", desc: "مرکز تأیید حلال" },
  { name: "WKO Preisspiegel", url: "https://www.wko.at", desc: "مقایسه قیمت اتاق بازرگانی" },
  { name: "Wien.gv.at", url: "https://www.wien.gv.at", desc: "شهرداری وین" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function GroceryMatcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<'all' | 'dairy' | 'meat' | 'pantry' | 'bakery'>('all');
  const [shoppingList, setShoppingList] = useState<{ id: string; qty: number }[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Load list from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('otrish_grocery_list');
    if (saved) {
      try {
        setShoppingList(JSON.parse(saved));
      } catch (e) {
        setShoppingList([]);
      }
    }
  }, []);

  const saveList = (list: { id: string; qty: number }[]) => {
    setShoppingList(list);
    localStorage.setItem('otrish_grocery_list', JSON.stringify(list));
  };

  const addToCart = (id: string) => {
    const existing = shoppingList.find(item => item.id === id);
    if (existing) {
      saveList(shoppingList.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      saveList([...shoppingList, { id, qty: 1 }]);
    }
    toast.success("به سبد خرید اضافه شد 🛒");
  };

  const updateQty = (id: string, delta: number) => {
    const item = shoppingList.find(i => i.id === id);
    if (!item) return;
    const newQty = item.qty + delta;
    if (newQty <= 0) {
      saveList(shoppingList.filter(i => i.id !== id));
    } else {
      saveList(shoppingList.map(i => i.id === id ? { ...i, qty: newQty } : i));
    }
  };

  const removeFromCart = (id: string) => {
    saveList(shoppingList.filter(item => item.id !== id));
  };

  const clearCart = () => {
    saveList([]);
    toast.success("سبد خرید خالی شد");
  };

  const filteredItems = useMemo(() => {
    return GROCERY_CATALOGUE.filter(item => {
      const matchesSearch = item.farsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = selectedCat === 'all' || item.category === selectedCat;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCat]);

  const cartTotal = useMemo(() => {
    return shoppingList.reduce((acc, curr) => {
      const catalogItem = GROCERY_CATALOGUE.find(i => i.id === curr.id);
      return acc + (catalogItem ? catalogItem.basePrice * curr.qty : 0);
    }, 0);
  }, [shoppingList]);

  const cartItemCount = shoppingList.reduce((acc, curr) => acc + curr.qty, 0);

  const activeCategoryMeta = CATEGORIES.find(c => c.id === selectedCat);

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای خرید و معادل آلمانی مواد غذایی ایرانی در اتریش ۲۰۲۶ | اتریش‌نشین",
      description:
        "راهنمای کامل خرید مواد غذایی در اتریش: معادل آلمانی مواد ایرانی (ماست، پنیر تبریز، لپه، نان لواش)، مقایسه قیمت Lidl، Hofer، Spar، Billa و فروشگاه‌های حلال ترک، و ماشین‌حساب سبد خرید.",
      author: { "@type": "Organization", name: "اتریش‌نشین", url: "https://otrish-iran.ir" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      datePublished: "2026-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "fa",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ماشین‌حساب سبد خرید اتریش",
      applicationCategory: "ShoppingApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "412" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مواد غذایی ایرانی و معادل آلمانی آن‌ها",
      numberOfItems: GROCERY_CATALOGUE.length,
      itemListElement: GROCERY_CATALOGUE.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: item.farsi,
          alternateName: item.german,
          description: item.desc,
          category: item.category,
          offers: {
            "@type": "Offer",
            price: item.basePrice,
            priceCurrency: "EUR",
          },
        },
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
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
    },
  ], []);

  return (
    <>
      <SEO
        title="راهنمای خرید مواد غذایی ایرانی در اتریش ۲۰۲۶ | معادل آلمانی + مقایسه قیمت | اتریش‌نشین"
        description="راهنمای کامل خرید مواد غذایی در اتریش: معادل آلمانی ماست سون، پنیر تبریز، لپه، سبزی قورمه، نان لواش و ۱۰ محصول کلیدی ایرانی. مقایسه قیمت Lidl، Hofer، Spar، Billa و فروشگاه‌های حلال ترک."
        keywords="خرید مواد غذایی اتریش, معادل آلمانی مواد ایرانی, ماست سون اتریش, پنیر تبریز اتریش, گوشت حلال اتریش, فروشگاه ترک وین, Jö Bonus Club, Etsan آدرس, Hofer قیمت, سبد خرید اتریش, Basmati Reis اتریش"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/grocery-matcher.jpg"
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
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🛒
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                  alt="راهنمای خرید اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                راهنمای خرید ۲۰۲۶ — به‌روز شده
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای خرید و فرهنگ سوپرمارکت اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Iranian Grocery Guide Austria
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                پیدا کردن معادل آلمانی مواد غذایی ایرانی، یکی از اولین چالش‌های هر تازه‌وارد
                است. این راهنما با معرفی ۱۰ محصول کلیدی، معادل آلمانی دقیق، مقایسه قیمت
                زنجیره‌های اصلی (Lidl، Hofer، Spar، Billa) و فروشگاه‌های حلال ترک، تجربه
                خرید شما را کاملاً بهینه می‌کند. ماشین‌حساب سبد خرید نیز به شما کمک می‌کند
                هزینه‌های هفتگی خود را دقیق تخمین بزنید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>۱۰ محصول کلیدی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>ماشین‌حساب سبد خرید</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>منابع Statistik Austria</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
              <div className="text-[10px] text-stone-700 font-black mt-0.5 leading-tight">{s.label}</div>
              <div className="text-[9px] text-stone-400 mt-0.5 leading-tight">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* MAIN MODULE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-right">

          {/* Header */}
          <div className="p-6 border-b border-stone-100">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2 flex-wrap">
                  <ShoppingCart className="w-5 h-5 text-[#c8102e]" />
                  ماشین‌حساب و راهنمای سبد خرید
                  <span className="text-[10px] bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white px-2.5 py-1 rounded-full font-black">
                    Smart Grocery
                  </span>
                </h2>
                <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed">
                  معادل ملموس آلمانی مواد غذایی محبوب ایرانی، آدرس سوپرمارکت‌های ترک ارزان و تحلیلگر هزینه خرید خانه شما
                </p>
              </div>

              {cartItemCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 px-4 flex items-center gap-3"
                >
                  <ShoppingBasket className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-[10px] text-emerald-700 font-black">
                      سبد شما: {cartItemCount} قلم کالا
                    </div>
                    <div className="text-sm font-black text-emerald-800 font-mono" dir="ltr">
                      €{cartTotal.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* ========================================== */}
          {/* CONTENT GRID */}
          {/* ========================================== */}
          <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* LEFT SIDEBAR: Store Comparison + Cart */}
            <div className="xl:col-span-4 space-y-5 xl:order-last">

              {/* Store Comparison */}
              <div className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">
                      مقایسه زنجیره‌های اصلی
                    </h4>
                    <p className="text-[10px] text-stone-500 font-bold">
                      بر اساس قیمت و کیفیت ۲۰۲۶
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {STORE_BUDGET_COMPARISON.map((store, i) => {
                    const Icon = store.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white border border-stone-200 rounded-2xl p-3.5 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${store.color} flex items-center justify-center text-white`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-black text-stone-800">
                              {store.name}
                            </span>
                          </div>
                          <span className={`text-[9px] ${store.bg} ${store.text_color} px-2 py-0.5 rounded-full font-black`}>
                            {store.tag}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-stone-500">
                          <span>{store.tier}</span>
                          <span className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-2.5 h-2.5 ${
                                  star <= store.rating
                                    ? "text-amber-400 fill-current"
                                    : "text-stone-200"
                                }`}
                              />
                            ))}
                          </span>
                        </div>

                        <p className="text-[10px] text-stone-600 leading-relaxed font-bold">
                          {store.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Shopping Cart */}
              <div className="bg-gradient-to-br from-zinc-900 via-stone-900 to-black border border-stone-800 rounded-3xl p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c8102e]/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                  <span className="text-xs font-black flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-red-400" />
                    سبد خرید شما
                  </span>
                  <span className="text-[10px] font-mono font-black text-zinc-400">
                    {cartItemCount} قلم
                  </span>
                </div>

                {shoppingList.length === 0 ? (
                  <div className="relative text-center py-8 text-zinc-500">
                    <ShoppingBasket className="w-12 h-12 mx-auto mb-3 text-zinc-600 stroke-1" />
                    <p className="text-xs font-black">لیست موقت شما خالی است</p>
                    <p className="text-[10px] text-zinc-600 mt-1.5 font-bold leading-relaxed">
                      با کلیک روی آیکون + در کارت کالاها، آن‌ها را به سبد اضافه کنید
                    </p>
                  </div>
                ) : (
                  <div className="relative space-y-3 max-h-72 overflow-y-auto pl-1 scrollbar-thin">
                    <AnimatePresence>
                      {shoppingList.map(cartItem => {
                        const catalogItem = GROCERY_CATALOGUE.find(i => i.id === cartItem.id);
                        if (!catalogItem) return null;
                        return (
                          <motion.div
                            key={cartItem.id}
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center justify-between gap-3 text-xs font-bold border-b border-zinc-800 pb-2.5 last:border-0 last:pb-0"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base">{catalogItem.emoji}</span>
                                <span className="block text-zinc-200 text-[11px] font-black truncate">
                                  {catalogItem.farsi}
                                </span>
                              </div>
                              <span className="block text-[9px] font-mono text-zinc-500 truncate mt-0.5">
                                {catalogItem.german}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 bg-zinc-800 rounded-lg p-1.5 shrink-0">
                              <button
                                onClick={() => updateQty(cartItem.id, -1)}
                                className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center text-zinc-300 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center font-mono text-xs font-black">
                                {cartItem.qty}
                              </span>
                              <button
                                onClick={() => updateQty(cartItem.id, 1)}
                                className="w-5 h-5 rounded hover:bg-zinc-700 flex items-center justify-center text-zinc-300 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-left shrink-0 font-mono text-red-400 font-black text-xs">
                              €{(catalogItem.basePrice * cartItem.qty).toFixed(2)}
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}

                {shoppingList.length > 0 && (
                  <div className="relative border-t border-zinc-800 pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-extrabold text-zinc-300">
                      <span>مجموع فاکتور (تخمینی):</span>
                      <span className="text-base font-black font-mono text-red-400">
                        €{cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={clearCart}
                      className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-black rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      حذف تمام سبد خرید
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: Products Grid */}
            <div className="xl:col-span-8 space-y-4">

              {/* Search + Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="جستجوی نام فارسی، آلمانی یا برچسب... (مثال: ماست، Kaimak، لپه)"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-11 pl-10 py-3.5 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/10 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center"
                    >
                      <X className="w-3 h-3 text-stone-600" />
                    </button>
                  )}
                </div>

                {/* Category chips */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCat === cat.id;
                    return (
                      <motion.button
                        key={cat.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedCat(cat.id as any)}
                        className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                          isActive
                            ? `bg-gradient-to-br ${cat.color} text-white shadow-md`
                            : `${cat.bg} ${cat.text} hover:opacity-80 border border-current/10`
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {cat.label}
                        {isActive && activeCategoryMeta && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                            {filteredItems.length}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Product Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-2 text-center py-12 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200"
                  >
                    <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-3">
                      <Search className="w-8 h-8 text-stone-300" />
                    </div>
                    <p className="text-sm font-black text-stone-700">
                      کالایی منطبق یافت نشد
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 font-bold">
                      عبارت جستجو یا دسته‌بندی را تغییر دهید.
                    </p>
                  </motion.div>
                ) : (
                  filteredItems.map((item, idx) => {
                    const catMeta = CATEGORIES.find(c => c.id === item.category);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        whileHover={{ y: -4 }}
                        className="bg-white border-2 border-stone-200 hover:border-[#c8102e]/30 rounded-3xl p-5 flex flex-col transition-all hover:shadow-lg group"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${catMeta?.color || "from-stone-500 to-stone-700"} flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span className={`text-[9px] ${catMeta?.bg || "bg-stone-100"} ${catMeta?.text || "text-stone-700"} px-2 py-0.5 rounded-full font-black`}>
                                {catMeta?.label}
                              </span>
                              {item.halal && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-black inline-flex items-center gap-0.5">
                                  ☪️ حلال
                                </span>
                              )}
                            </div>
                            <h5 className="text-xs sm:text-sm font-black text-stone-900 leading-snug">
                              {item.farsi}
                            </h5>
                            <div className="text-[10px] font-mono text-[#c8102e] font-black mt-0.5" dir="ltr">
                              {item.german}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] text-stone-500 font-bold leading-relaxed mb-3">
                          {item.desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-bold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Stores + Price + Add button */}
                        <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t border-stone-100">
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] text-stone-400 font-bold mb-1">
                              موجود در:
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                              {item.stores.slice(0, 3).map((s, j) => (
                                <span
                                  key={j}
                                  className="text-[9px] font-black text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-full"
                                >
                                  {s}
                                </span>
                              ))}
                              {item.stores.length > 3 && (
                                <span className="text-[9px] font-bold text-[#c8102e]">
                                  +{item.stores.length - 3}
                                </span>
                              )}
                            </div>
                            <div className="text-[9px] text-stone-400 font-bold mt-1.5">
                              پیمانه: {item.unit}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-black font-mono text-stone-900 bg-stone-100 rounded-lg px-2.5 py-1">
                              €{item.basePrice.toFixed(2)}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.08 }}
                              whileTap={{ scale: 0.92 }}
                              onClick={() => addToCart(item.id)}
                              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] hover:opacity-90 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                              title="افزودن به سبد خرید"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SHOPPING TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#c8102e]" />
              ۶ ترفند طلایی صرفه‌جویی در سوپرمارکت‌های اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              راهکارهای عملی برای کاهش ۳۵٪ هزینه هفتگی خرید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHOPPING_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border border-stone-200 p-5 relative overflow-hidden group"
                >
                  <div className="absolute top-2 left-3 text-6xl font-black text-stone-100 group-hover:text-stone-200 transition-colors select-none">
                    {i + 1}
                  </div>
                  <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
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
              سوالات متداول درباره خرید مواد غذایی در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های فارسی‌زبانان
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
        {/* OFFICIAL SOURCES */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">منابع رسمی مورد استناد</h3>
              <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                برای راستی‌آزمایی مستقل قیمت‌ها و اطلاعات
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SOURCES.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-white border border-stone-200 hover:border-indigo-300 rounded-2xl p-4 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-stone-800 truncate">{s.name}</div>
                  <div className="text-[9px] text-stone-500 font-bold">{s.desc}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              </a>
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <HandHeart className="w-3.5 h-3.5 text-amber-300" />
              مشاوره خرید رایگان
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در پیدا کردن مواد غذایی ایرانی مشکل دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر تازه به اتریش آمده‌اید یا در پیدا کردن معادل آلمانی مواد غذایی خاص
              ایرانی سوالی دارید، تیم اتریش‌نشین با تجربه سال‌ها زندگی در وین، گراتس،
              لینتس و سالزبورگ آماده راهنمایی رایگان شماست.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، سوالی درباره خرید مواد غذایی در اتریش دارم"
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              قیمت‌های نمایش‌داده‌شده در این ابزار تقریبی و بر اساس میانگین بازار اتریش
              در سال ۲۰۲۶ است. قیمت‌ها ممکن است بسته به شهر، فروشگاه، برند و فصل متفاوت
              باشند. سبد خرید شما به صورت محلی در مرورگر شما ذخیره می‌شود و به هیچ سروری
              ارسال نمی‌گردد. برای راستی‌آزمایی قیمت‌ها، از منابع رسمی (Statistik Austria،
              AK Preismonitor) استفاده کنید.
            </p>
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
  q, a, isOpen, onToggle, index,
}: {
  q: string; a: string; isOpen: boolean; onToggle: () => void; index: number; key?: React.Key;
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
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
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