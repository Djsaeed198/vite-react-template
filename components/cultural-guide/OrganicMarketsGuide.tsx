import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store, MapPin, Clock, Euro, Leaf, Apple, Coffee, Utensils,
  CheckCircle, Info, ChevronDown, Sparkles, Zap, Star, Users,
  PhoneCall, Send, Globe, Heart, Shield, Award, Calendar,
  TrendingUp, Quote, Sun, Cherry, Beef, Croissant, Wine, Fish,
  Milk, Salad, ShoppingBasket, Navigation, Bike, Train, Wallet,
  Percent, ThumbsUp, AlertCircle, Filter, Grid3x3, List,
} from "lucide-react";
import SEO from "./SEO";
import { GuideContainer } from "./GuideContainer";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna Market themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80",
  naschmarkt: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=1200&q=80",
  brunnenmarkt: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1200&q=80",
  produce: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
  flowers: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
type MarketId =
  | "naschmarkt"
  | "brunnenmarkt"
  | "karmelitermarkt"
  | "viktor-adler"
  | "meiselmarkt"
  | "rochusmarkt"
  | "kutschkermarkt";

type Market = {
  id: MarketId;
  name: string;
  nameDe: string;
  district: number;
  districtName: string;
  tagline: string;
  description: string;
  hours: string;
  bestTime: string;
  vibe: string;
  image: string;
  gradient: string;
  color: string;
  priceLevel: 1 | 2 | 3; // 1=cheap, 2=medium, 3=expensive
  organicFocus: boolean;
  turkishFocus: boolean;
  highlights: string[];
  bestFor: string[];
  tips: string[];
  transport: string;
  recommended?: boolean;
};

// ==========================================
// MARKETS DATA
// ==========================================
const MARKETS: Market[] = [
  {
    id: "naschmarkt",
    name: "ناش‌مارکت",
    nameDe: "Naschmarkt",
    district: 6,
    districtName: "ماریاهیلف / ویدن",
    tagline: "معروف‌ترین بازار وین — قلب خواربار پایتخت",
    description:
      "ناش‌مارکت بزرگ‌ترین و معروف‌ترین بازار وین است که از قرن ۱۶ میلادی فعالیت می‌کند. از سبزیجات تازه و ادویه‌جات شرقی تا رستوران‌های بین‌المللی و غرفه‌های آنتیک در شنبه‌ها — این بازار یک تجربه فرهنگی کامل است. اگرچه قیمت‌ها در بخش‌های توریستی بالاست، اما در بخش‌های داخلی می‌توانید محصولات باکیفیت و گاهی ارزان‌تر از سوپرمارکت پیدا کنید.",
    hours: "دوشنبه تا جمعه ۶:۰۰–۲۱:۰۰ | شنبه ۶:۰۰–۱۸:۰۰",
    bestTime: "پنجشنبه صبح (تازه‌ترین بار) یا جمعه بعدازظهر (تخفیف‌های پایان هفته)",
    vibe: "پرجنب‌وجوش، توریستی + محلی، چندفرهنگی",
    image: IMAGES.naschmarkt,
    gradient: "from-amber-600 to-orange-700",
    color: "text-amber-700",
    priceLevel: 2,
    organicFocus: true,
    turkishFocus: false,
    highlights: [
      "بیش از ۲۰۰ غرفه سبزیجات، میوه، ادویه و پنیر",
      "بازار شنبه‌ها (Flohmarkt) — عتیقه‌جات و اشیاء قدیمی",
      "غرفه‌های ترکی، ایرانی، عربی، هندی و ایتالیایی",
      "محصولات ارگانیک با برچسب Bio-Austria",
    ],
    bestFor: ["خرید سبزیجات تازه", "چشیدن غذاهای بین‌المللی", "گشت توریستی", "شنبه‌های آنتیک"],
    tips: [
      "آخر روز (حدود ۱۷-۱۸) قیمت‌ها تا ۳۰٪ تخفیف می‌خورند — بهترین زمان برای خرید عمده",
      "غرفه‌های سمت چپ (شمال) ارزان‌تر از غرفه‌های توریستی سمت راست هستند",
      "همیشه چانه بزنید، مخصوصاً برای خرید ۲ کیلو یا بیشتر",
    ],
    transport: "U1/U2/U4 Karlsplatz یا U4 Kettenbrückengasse",
    recommended: true,
  },
  {
    id: "brunnenmarkt",
    name: "برونن‌مارکت",
    nameDe: "Brunnenmarkt",
    district: 16,
    districtName: "اتاکرینگ",
    tagline: "بزرگ‌ترین بازار خیابانی اروپا — قلب چندفرهنگی وین",
    description:
      "برونن‌مارکت با بیش از ۱۷۰ غرفه، بزرگ‌ترین بازار خیابانی خاورمیانه در اروپا محسوب می‌شود. اگر به دنبال قیمت‌های واقعاً ارزان، سبزیجات تازه، ادویه‌های ایرانی و ترکی، پنیر و زیتون هستید، این بازار انتخاب اول شماست. بیش از ۵۰٪ مغازه‌داران ترک‌تبار، کرد یا عرب هستند و حس واقعی یک بازار شرقی را به شما می‌دهد.",
    hours: "دوشنبه تا جمعه ۶:۰۰–۱۹:۰۰ | شنبه ۶:۰۰–۱۷:۰۰",
    bestTime: "شنبه صبح (پرترین اما ارزان‌ترین) یا پنجشنبه عصر",
    vibe: "شرقی، پرجنب‌وجوش، ارزان، واقعی",
    image: IMAGES.brunnenmarkt,
    gradient: "from-rose-600 to-red-700",
    color: "text-rose-700",
    priceLevel: 1,
    organicFocus: false,
    turkishFocus: true,
    highlights: [
      "۱۷۰+ غرفه با سبزیجات، میوه، ادویه و محصولات ترکی/ایرانی",
      "پنیر، زیتون، ماست و گوشت حلال با قیمت‌های رقابتی",
      "نان تازه ترکی و ایرانی (سنگک، بربری، لواش)",
      "قیمت‌ها معمولاً ۳۰-۵۰٪ ارزان‌تر از ناش‌مارکت",
    ],
    bestFor: ["خرید ارزان عمده", "محصولات شرقی و ایرانی", "قیمت‌های رقابتی", "نان تازه"],
    tips: [
      "پنجشنبه عصر و شنبه صبح بهترین زمان برای خرید هفتگی است",
      "چانه زدن روی میوه و سبزیجات معمول است — از آن خجالت نکشید",
      "برای گوشت حلال و پنیر، به غرفه‌های انتهای بازار (Yppenplatz) بروید",
    ],
    transport: "U6 Josefstädter Straße یا U6 Thaliastraße",
    recommended: true,
  },
  {
    id: "karmelitermarkt",
    name: "کارملیترمارکت",
    nameDe: "Karmelitermarkt",
    district: 2,
    districtName: "لئوپولداشتات",
    tagline: "بازار اصیل یهودی-شرقی وین در قلب محله تاریخی",
    description:
      "کارملیترمارکت در محله لئوپولداشتات، یک بازار کوچک اما بسیار اصیل است که ترکیبی از تاریخ یهودی وین و فرهنگ مدرن است. اینجا می‌توانید محصولات ارگانیک، پنیرهای دست‌ساز اتریشی، و سبزیجات تازه از مزارع اطراف وین را با قیمت منصفانه پیدا کنید. کافه‌های اطراف بازار، مکانی محبوب برای صبحانه آخر هفته هستند.",
    hours: "دوشنبه تا جمعه ۶:۰۰–۱۹:۳۰ | شنبه ۶:۰۰–۱۷:۰۰",
    bestTime: "شنبه صبح + بازار کشاورزان (Bauernmarkt)",
    vibe: "بوهمی، اصیل، آرام، ارگانیک",
    image: IMAGES.flowers,
    gradient: "from-emerald-600 to-teal-700",
    color: "text-emerald-700",
    priceLevel: 2,
    organicFocus: true,
    turkishFocus: false,
    highlights: [
      "بازار کشاورزان (Bauernmarkt) در شنبه — مستقیم از مزرعه",
      "محصولات ارگانیک با تاییدیه Bio-Austria",
      "کافه‌ها و رستوران‌های بوهمی اطراف",
      "پنیر دست‌ساز و لبنیات محلی اتریشی",
    ],
    bestFor: ["محصولات ارگانیک", "صبحانه آخر هفته", "پنیر دست‌ساز", "تجربه اصیل محلی"],
    tips: [
      "شنبه صبح‌ها در فصل بهار و تابستان، بازار کشاورزان با تخفیف‌های ویژه برپا می‌شود",
      "برای صبحانه، به کافه‌های اطراف بازار بروید — غذای خانگی و قیمت منصفانه",
      "چانه زدن معمول نیست — قیمت‌ها منصفانه و ثابت هستند",
    ],
    transport: "U2 Taborstraße یا U4 Schwedenplatz + پیاده ۸ دقیقه",
  },
  {
    id: "viktor-adler",
    name: "ویکتور آدلر مارکت",
    nameDe: "Viktor-Adler-Markt",
    district: 10,
    districtName: "فاووریتن",
    tagline: "بازار کارگری با قیمت‌های بی‌رقیب",
    description:
      "ویکتور آدلر مارکت در منطقه ۱۰ وین (فاووریتن) واقع شده و یکی از ارزان‌ترین بازارهای وین محسوب می‌شود. این بازار محبوب طبقه کارگر و مهاجران است و از سبزیجات تازه تا پوشاک و لوازم خانه را ارائه می‌دهد. اگر به دنبال بیشترین حجم خرید با کمترین هزینه هستید، اینجا بهترین انتخاب است.",
    hours: "دوشنبه تا جمعه ۶:۰۰–۱۸:۰۰ | شنبه ۶:۰۰–۱۴:۰۰",
    bestTime: "شنبه صبح پیش از ۱۰:۰۰",
    vibe: "کارگری، ارزان، متنوع، محلی",
    image: IMAGES.produce,
    gradient: "from-sky-600 to-blue-700",
    color: "text-sky-700",
    priceLevel: 1,
    organicFocus: false,
    turkishFocus: true,
    highlights: [
      "ارزان‌ترین قیمت‌های سبزیجات در وین",
      "پوشاک و لوازم خانه با قیمت‌های استثنایی",
      "فروشندگان ترک، صرب و کروات",
      "محیط چندفرهنگی واقعی",
    ],
    bestFor: ["خرید اقتصادی", "سبزیجات و میوه ارزان", "پوشاک ارزان", "کشف وین غیرتوریستی"],
    tips: [
      "شنبه صبح پیش از ۱۰:۰۰ بهترین زمان برای خرید ارزان است",
      "بیشتر غرفه‌ها فقط پول نقد می‌پذیرند",
      "پارکینگ رایگان در اطراف بازار موجود است (برای وین کمیاب!)",
    ],
    transport: "U1 Reumannplatz یا U1 Keplerplatz",
  },
  {
    id: "meiselmarkt",
    name: "مایزل‌مارکت",
    nameDe: "Meiselmarkt",
    district: 15,
    districtName: "رودولفشیم-فونفهاوس",
    tagline: "بازار سرپوشیده غرب وین با تمام نیازهای روزانه",
    description:
      "مایزل‌مارکت یک بازار سرپوشیده بزرگ در منطقه ۱۵ وین است که به دلیل تنوع بالای محصولات و قیمت‌های متوسط، محبوب خانواده‌ها است. از سبزیجات تازه تا گوشت، ماهی، نان و حتی لباس، همه‌چیز زیر یک سقف. بازار سرپوشیده بودن آن، خرید در زمستان را نیز راحت می‌کند.",
    hours: "دوشنبه تا جمعه ۶:۳۰–۱۹:۰۰ | شنبه ۶:۳۰–۱۷:۰۰",
    bestTime: "پنجشنبه عصر — تخفیف‌های آخر هفته",
    vibe: "خانوادگی، سرپوشیده، متنوع، راحت",
    image: IMAGES.spices,
    gradient: "from-indigo-600 to-purple-700",
    color: "text-indigo-700",
    priceLevel: 2,
    organicFocus: true,
    turkishFocus: true,
    highlights: [
      "بازار کاملاً سرپوشیده — مناسب زمستان",
      "بیش از ۶۰ غرفه با تنوع کامل",
      "گوشت حلال و محصولات ترکی",
      "دسترسی مستقیم با مترو",
    ],
    bestFor: ["خرید روزانه", "خرید در زمستان", "گوشت حلال", "خرید خانوادگی"],
    tips: [
      "برخلاف بسیاری از بازارهای وین، مایزل‌مارکت روزهای یکشنبه نیز باز است (۱۰:۰۰–۱۷:۰۰)",
      "برای گوشت و مرغ، از غرفه‌های شرقی بازار خرید کنید — تازه‌تر و ارزان‌تر",
      "طبقه بالای بازار پارکینگ دارد",
    ],
    transport: "U3 Johnstraße",
  },
  {
    id: "rochusmarkt",
    name: "روخوس‌مارکت",
    nameDe: "Rochusmarkt",
    district: 3,
    districtName: "لنداشتراسه",
    tagline: "بازار لاکچری شرق وین با کیفیت بی‌نظیر",
    description:
      "روخوس‌مارکت در منطقه ۳ وین (نزدیک به سفارت‌ها) یک بازار کوچک اما گران و باکیفیت است. اینجا می‌توانید محصولات لاکچری، پنیرهای وارداتی، گوشت Wagyu و سبزیجات ارگانیک ممتاز را پیدا کنید. اگر کیفیت برای شما اولویت است و بودجه محدودیتی ندارد، این بازار عالی است.",
    hours: "دوشنبه تا جمعه ۶:۳۰–۱۹:۰۰ | شنبه ۶:۳۰–۱۷:۰۰",
    bestTime: "جمعه صبح — تازه‌ترین محصولات وارداتی",
    vibe: "لاکچری، کیفیت بالا، توریستی، گران",
    image: IMAGES.spices,
    gradient: "from-violet-600 to-purple-700",
    color: "text-violet-700",
    priceLevel: 3,
    organicFocus: true,
    turkishFocus: false,
    highlights: [
      "محصولات لاکچری و وارداتی ممتاز",
      "پنیرفروشی‌های تخصصی و گوشت Wagyu",
      "سبزیجات ارگانیک درجه یک",
      "کافه‌ها و رستوران‌های شیک اطراف",
    ],
    bestFor: ["محصولات لاکچری", "خرید ویژه", "کیفیت بی‌نظیر", "هدیه‌های خاص"],
    tips: [
      "برای خرید عادی گران است — این بازار برای مناسبت‌های خاص است",
      "جمعه صبح‌ها محموله‌های تازه پنیر و ماهی وارد می‌شود",
      "کافه‌ی Rochus و اطراف آن، مکانی محبوب برای صبحانه آخر هفته",
    ],
    transport: "U3 Rochusgasse",
  },
  {
    id: "kutschkermarkt",
    name: "کوچکر‌مارکت",
    nameDe: "Kutschkermarkt",
    district: 18,
    districtName: "واهرینگ",
    tagline: "بازار اصیل اشرافی با حس روستایی در قلب شهر",
    description:
      "کوچکر‌مارکت یک بازار کوچک اما اصیل در محله اشرافی واهرینگ (منطقه ۱۸) است. اینجا بر خلاف بسیاری از بازارهای دیگر، فضای روستایی و آرام حاکم است. کشاورزان اتریشی از حومه وین محصولات خود را مستقیماً می‌فروشند. کیفیت بالاست و قیمت‌ها نسبت به کیفیت منصفانه.",
    hours: "دوشنبه تا جمعه ۷:۰۰–۱۸:۳۰ | شنبه ۷:۰۰–۱۲:۳۰",
    bestTime: "شنبه صبح — بازار کشاورزان",
    vibe: "روستایی، آرام، اصیل، خانوادگی",
    image: IMAGES.produce,
    gradient: "from-amber-600 to-yellow-700",
    color: "text-amber-700",
    priceLevel: 2,
    organicFocus: true,
    turkishFocus: false,
    highlights: [
      "بازار کشاورزان مستقیم از حومه وین",
      "محصولات ارگانیک و فصلی",
      "گل‌فروشی‌های رنگارنگ",
      "کافه‌های اصیل اتریشی اطراف",
    ],
    bestFor: ["محصولات ارگانیک", "محصولات فصلی", "گل‌فروشی", "خرید آرام"],
    tips: [
      "شنبه صبح‌ها بهترین زمان است — بازار فقط تا ۱۲:۳۰ فعال است",
      "برای سبزیجات فصل، اینجا بهترین کیفیت را نسبت به قیمت پیدا می‌کنید",
      "پارکینگ در خیابان‌های اطراف — روزهای شنبه شلوغ است",
    ],
    transport: "U6 Währinger Straße یا تراموا 40, 41",
  },
];

// ==========================================
// QUICK STATS
// ==========================================
const STATS = [
  { value: "۷+", label: "بازار اصلی در وین", icon: Store },
  { value: "۲۰۰+", label: "غرفه در ناش‌مارکت", icon: Users },
  { value: "۲۰-۵۰٪", label: "ارزان‌تر از سوپرمارکت", icon: Percent },
  { value: "۷", label: "روز هفته (با یکشنبه‌ها)", icon: Calendar },
];

// ==========================================
// PRICE LABEL
// ==========================================
const PRICE_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "اقتصادی", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  2: { label: "متوسط", color: "text-amber-700 bg-amber-50 border-amber-200" },
  3: { label: "لوکس", color: "text-violet-700 bg-violet-50 border-violet-200" },
};

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا در بازارهای وین باید چانه بزنیم؟",
    a: "بله، در بازارهای سنتی مثل برونن‌مارکت، ویکتور آدلر و ناش‌مارکت چانه زدن کاملاً رایج است. به‌ویژه برای خرید عمده (۲ کیلو یا بیشتر)، می‌توانید ۱۰-۳۰٪ تخفیف بگیرید. اما در بازارهای اشرافی مثل روخوس‌مارکت و کوچکر‌مارکت چانه زدن معمول نیست و ممکن است بی‌ادبانه تلقی شود.",
  },
  {
    q: "بهترین زمان برای خرید در بازارها چه موقع است؟",
    a: "دو زمان طلایی وجود دارد: ۱) صبح زود (۶-۸) که تازه‌ترین محصولات می‌رسد و صف هنوز شلوغ نشده. ۲) یک ساعت آخر روز (حدود ۱۷-۱۸) که فروشندگان برای خالی کردن موجودی، تخفیف‌های ویژه می‌دهند — تا ۳۰٪ تخفیف معمول است. برای بازارهای کشاورزان، شنبه صبح بهترین گزینه است.",
  },
  {
    q: "آیا بازارها کارت بانکی می‌پذیرند؟",
    a: "بیشتر غرفه‌ها فقط پول نقد می‌پذیرند — به‌ویژه در برونن‌مارکت، ویکتور آدلر و بخش‌های داخلی ناش‌مارکت. تعداد کمی از غرفه‌های بزرگ کارت می‌پذیرند. توصیه می‌شود همیشه ۵۰-۱۰۰ یورو نقد همراه داشته باشید. نزدیک بازارها معمولاً ATM (Geldautomat) وجود دارد.",
  },
  {
    q: "بهترین بازار برای خرید ارزان و باکیفیت کدام است؟",
    a: "برای قیمت‌های ارزان و کیفیت مناسب: برونن‌مارکت (منطقه ۱۶) و ویکتور آدلر مارکت (منطقه ۱۰) بهترین انتخاب هستند. برای ارگانیک ارزان: کارملیترمارکت (منطقه ۲) و کوچکر‌مارکت (منطقه ۱۸) با بازار کشاورزان شنبه. برای تنوع و تجربه توریستی: ناش‌مارکت.",
  },
  {
    q: "آیا در بازارهای وین محصولات ایرانی پیدا می‌شود؟",
    a: "بله. برونن‌مارکت و ویکتور آدلر مارکت غرفه‌های ایرانی و ترک بسیاری دارند که در آن‌ها می‌توانید نان سنگک، بربری، زیتون، پنیر تازه، ادویه‌جات ایرانی (زعفران، سماق، ادویه کباب)، ماست و دوغ پیدا کنید. ناش‌مارکت نیز غرفه‌های خاورمیانه‌ای متعددی دارد.",
  },
  {
    q: "آیا بازارها در روزهای تعطیل باز هستند؟",
    a: "بیشتر بازارهای وین یکشنبه‌ها بسته هستند، به‌جز Meiselmarkt (منطقه ۱۵) که یکشنبه‌ها ۱۰:۰۰ تا ۱۷:۰۰ باز است. روزهای تعطیل رسمی (Feiertage) اکثر بازارها بسته هستند. شنبه‌ها همه بازارها باز هستند، اما معمولاً ساعت‌های پایانی کوتاه‌تر است (۱۳-۱۷ بسته می‌شوند).",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const OrganicMarketsGuide: React.FC = () => {
  const [activeMarket, setActiveMarket] = useState<MarketId>("naschmarkt");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [organicFilter, setOrganicFilter] = useState(false);
  const [turkishFilter, setTurkishFilter] = useState(false);

  const activeMarketData = useMemo(
    () => MARKETS.find((m) => m.id === activeMarket)!,
    [activeMarket]
  );

  const filteredMarkets = useMemo(() => {
    return MARKETS.filter((m) => {
      if (priceFilter && m.priceLevel !== priceFilter) return false;
      if (organicFilter && !m.organicFocus) return false;
      if (turkishFilter && !m.turkishFocus) return false;
      return true;
    });
  }, [priceFilter, organicFilter, turkishFilter]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل بازارهای محلی و ارگانیک وین ۲۰۲۶",
      description:
        "معرفی ۷ بازار اصلی وین شامل ناش‌مارکت، برونن‌مارکت، کارملیترمارکت، ویکتور آدلر، مایزل‌مارکت، روخوس‌مارکت و کوچکر‌مارکت — با ساعات کار، قیمت‌ها و نکات محلی.",
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "بازارهای اصلی وین",
      itemListElement: MARKETS.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${m.name} (${m.nameDe})`,
        description: m.tagline,
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
    <GuideContainer
      title="راهنمای بازارهای محلی و ارگانیک وین"
      description="معرفی ۷ بازار اصلی وین شامل ناش‌مارکت، برونن‌مارکت، کارملیترمارکت و ویکتور آدلر — با ساعات کار، قیمت‌ها و نکات محلی"
    >
      <SEO
        title="بازارهای وین ۲۰۲۶ | راهنمای کامل بازارهای محلی و ارگانیک اتریش"
        description="راهنمای جامع بازارهای وین: ناش‌مارکت، برونن‌مارکت، کارملیترمارکت، ویکتور آدلر و مایزل‌مارکت. ساعات کار، قیمت‌ها، چانه زنی، محصولات ایرانی و ترک در بازارهای وین."
        keywords="بازار وین, ناش‌مارکت, Naschmarkt, برونن‌مارکت, Brunnenmarkt, بازار ارگانیک وین, بازار محلی وین, خرید ارزان وین, بازارهای اتریش, Wiener Märkte"
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
              "radial-gradient(80% 150% at 90% 0, #92400e 0, #451a03 48%, #1c0a02 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-30">
            <img
              src={IMAGES.hero}
              alt="بازار محلی وین"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c0a02]/90 via-[#451a03]/75 to-[#92400e]/55" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🥬
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              راهنمای بازارهای اصیل وین ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              با یک‌سوم قیمت سوپرمارکت، تازه‌تر و باکیفیت‌تر خرید کنید
            </h1>

            <p className="text-sm md:text-base text-amber-100 leading-relaxed max-w-3xl mb-6">
              بازارهای محلی وین فقط مکان خرید نیستند — آنها
              <strong className="text-amber-300"> قلب فرهنگی و اقتصادی پایتخت</strong> هستند. از ناش‌مارکت
              تاریخی تا برونن‌مارکت چندفرهنگی، در این راهنما ۷ بازار اصلی وین را با
              <strong className="text-amber-300"> ساعات کار، قیمت‌ها، نکات چانه‌زنی و ترفندهای محلی</strong>
              بررسی می‌کنیم.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۷ بازار اصلی</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>قیمت‌های ۲۰۲۶</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>نکات محلی فارسی‌زبانان</span>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#markets"
                className="inline-flex items-center gap-2 bg-white text-[#92400e] font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Store className="w-4 h-4" />
                کاوش بازارها
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm text-white font-black text-xs px-5 py-3 rounded-2xl hover:bg-white/20 transition-all"
              >
                <Send className="w-4 h-4" />
                مشاوره محلی رایگان
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
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <div className="text-lg font-black text-amber-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* WHY MARKETS */}
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
                چرا بازار و نه سوپرمارکت؟
              </div>
              <p className="text-sm text-stone-800 font-bold leading-relaxed">
                <strong className="text-amber-700">سوپرمارکت‌های وین ارزان نیستند — بازارها هستند.</strong> یک
                خانوار ۴ نفره می‌تواند با خرید هفتگی از برونن‌مارکت یا ویکتور آدلر،
                ماهانه ۱۵۰ تا ۲۵۰ یورو صرفه‌جویی کند. علاوه بر قیمت، تازگی محصولات،
                حمایت از کشاورزان محلی، و تجربه اجتماعی خرید در بازار، دلایل دیگری
                هستند که هزاران خانواده ایرانی مقیم وین را به بازارها می‌کشاند.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FILTERS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-black text-stone-700">فیلتر بازارها بر اساس نیاز شما</h3>
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Price filter */}
            {[
              { level: null, label: "همه قیمت‌ها", icon: Wallet },
              { level: 1, label: "اقتصادی", icon: Percent },
              { level: 2, label: "متوسط", icon: Euro },
              { level: 3, label: "لوکس", icon: Star },
            ].map((f) => {
              const Icon = f.icon;
              const isActive = priceFilter === f.level;
              return (
                <button
                  key={String(f.level)}
                  onClick={() => setPriceFilter(f.level)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              );
            })}

            <div className="w-px bg-stone-200 mx-1" />

            {/* Organic filter */}
            <button
              onClick={() => setOrganicFilter(!organicFilter)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                organicFilter
                  ? "bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              ارگانیک (Bio)
            </button>

            {/* Turkish/oriental filter */}
            <button
              onClick={() => setTurkishFilter(!turkishFilter)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                turkishFilter
                  ? "bg-gradient-to-br from-rose-600 to-red-700 text-white shadow-md"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
              }`}
            >
              <Cherry className="w-3.5 h-3.5" />
              شرقی / ایرانی
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* MARKETS SELECTOR */}
        {/* ========================================== */}
        <div id="markets" className="scroll-mt-24">
          <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Store className="w-5 h-5 text-amber-700" />
                ۷ بازار اصلی وین — کدام برای شما مناسب است؟
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                {filteredMarkets.length} بازار مطابق با فیلترهای شما
              </p>
            </div>
          </div>

          {/* Market tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
            {MARKETS.map((m) => {
              const isActive = activeMarket === m.id;
              const isFiltered = !filteredMarkets.some((fm) => fm.id === m.id);
              const priceInfo = PRICE_LABELS[m.priceLevel];
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActiveMarket(m.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden rounded-2xl border-2 p-3 text-right transition-all ${
                    isActive
                      ? "border-amber-600 shadow-lg shadow-amber-100"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  } ${isFiltered ? "opacity-40" : ""}`}
                >
                  {m.recommended && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-br-xl flex items-center gap-0.5 z-10">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      پیشنهادی
                    </div>
                  )}
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white shadow-md mb-2`}>
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-black text-stone-900 leading-tight">{m.name}</div>
                  <div className="text-[9px] text-stone-500 font-bold font-mono mt-0.5" dir="ltr">
                    {m.nameDe}
                  </div>
                  <div className={`text-[8px] font-black mt-1 px-1.5 py-0.5 rounded-full border ${priceInfo.color} inline-block`}>
                    {priceInfo.label}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active market detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMarket}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white"
            >
              <div className="grid md:grid-cols-2">
                {/* Image panel */}
                <div className="relative h-72 md:h-auto min-h-[400px] overflow-hidden">
                  <img
                    src={activeMarketData.image}
                    alt={activeMarketData.nameDe}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeMarketData.gradient} opacity-45 mix-blend-multiply`} />
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-black text-stone-800 shadow-md">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    منطقه {activeMarketData.district} · {activeMarketData.districtName}
                  </div>
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap max-w-[60%]">
                    {activeMarketData.organicFocus && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[9px] font-black">
                        <Leaf className="w-2.5 h-2.5" />
                        Bio
                      </span>
                    )}
                    {activeMarketData.turkishFocus && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-600 text-white rounded-full text-[9px] font-black">
                        <Cherry className="w-2.5 h-2.5" />
                        شرقی
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
                    <div className="text-[9px] font-black text-white/80 mb-1">ساعات کار</div>
                    <div className="text-xs font-black text-white leading-tight flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {activeMarketData.hours}
                    </div>
                  </div>
                </div>

                {/* Content panel */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full bg-stone-100 ${activeMarketData.color}`}>
                      <Star className="w-3 h-3 fill-current" />
                      {activeMarketData.vibe}
                    </div>
                    <div className={`inline-flex items-center gap-2 text-[10px] font-black px-3 py-1 rounded-full border ${PRICE_LABELS[activeMarketData.priceLevel].color}`}>
                      <Wallet className="w-3 h-3" />
                      {PRICE_LABELS[activeMarketData.priceLevel].label}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-stone-900 mb-1 leading-tight">
                    {activeMarketData.name}
                  </h3>
                  <div className="text-[11px] text-stone-400 font-bold font-mono mb-3" dir="ltr">
                    {activeMarketData.nameDe}
                  </div>

                  <p className="text-xs text-amber-800 font-black leading-relaxed mb-3">
                    {activeMarketData.tagline}
                  </p>

                  <p className="text-xs text-stone-600 font-bold leading-relaxed mb-5">
                    {activeMarketData.description}
                  </p>

                  {/* Best time */}
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 mb-4 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-amber-700 mb-0.5">
                        بهترین زمان مراجعه:
                      </div>
                      <div className="text-[10px] text-amber-900 font-bold leading-snug">
                        {activeMarketData.bestTime}
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      نکات برجسته
                    </div>
                    <ul className="space-y-1.5">
                      {activeMarketData.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] text-stone-700 font-bold leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best for */}
                  <div className="mb-4">
                    <div className="text-[10px] font-black text-stone-500 mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      مناسب برای
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeMarketData.bestFor.map((b, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-black text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transport */}
                  <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3 mb-4 flex items-start gap-2">
                    <Train className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-sky-700 mb-0.5">
                        دسترسی با حمل‌ونقل عمومی
                      </div>
                      <div className="text-[10px] text-sky-800 font-bold leading-snug">
                        {activeMarketData.transport}
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3">
                    <div className="text-[10px] font-black text-amber-800 mb-2 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      نکات طلایی از ساکنان محلی
                    </div>
                    <ul className="space-y-1.5">
                      {activeMarketData.tips.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5 fill-current" />
                          <span className="text-[10px] text-amber-900 font-bold leading-relaxed">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* COMPARISON TABLE */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Grid3x3 className="w-5 h-5 text-amber-700" />
              جدول مقایسه سریع ۷ بازار وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              همه بازارها در یک نگاه
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right" dir="rtl">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2">بازار</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">منطقه</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">قیمت</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">Bio</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">شرقی</th>
                  <th className="text-[10px] font-black text-stone-500 py-3 px-2 text-center">شنبه باز؟</th>
                </tr>
              </thead>
              <tbody>
                {MARKETS.map((m) => {
                  const priceInfo = PRICE_LABELS[m.priceLevel];
                  const isActive = activeMarket === m.id;
                  return (
                    <tr
                      key={m.id}
                      onClick={() => setActiveMarket(m.id)}
                      className={`border-b border-stone-100 cursor-pointer transition-all ${
                        isActive ? "bg-amber-50/50" : "hover:bg-stone-50/50"
                      }`}
                    >
                      <td className="py-3 px-2">
                        <div className="text-[11px] font-black text-stone-800">{m.name}</div>
                        <div className="text-[9px] text-stone-400 font-bold font-mono" dir="ltr">{m.nameDe}</div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-[10px] font-black text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full">
                          {m.district}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${priceInfo.color}`}>
                          {priceInfo.label}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        {m.organicFocus ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <span className="text-stone-300 text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {m.turkishFocus ? (
                          <CheckCircle className="w-4 h-4 text-rose-600 mx-auto" />
                        ) : (
                          <span className="text-stone-300 text-[10px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mx-auto" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
              <strong>نکته:</strong> تنها Meiselmarkt (منطقه ۱۵) روزهای یکشنبه نیز باز است.
              سایر بازارها یکشنبه‌ها و تعطیلات رسمی بسته هستند. ساعات پایانی روزهای شنبه
              معمولاً ۱۳-۱۷ است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* SHOPPING TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              ۶ ترفند خرید هوشمندانه در بازارهای وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نکات تجربه‌شده‌ای که فقط ساکنان محلی می‌دانند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: Clock,
                title: "ساعت طلایی خرید",
                desc: "یک ساعت آخر روز (۱۷-۱۸) قیمت‌ها تا ۳۰٪ تخفیف می‌خورند چون فروشندگان می‌خواهند موجودی را خالی کنند.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Wallet,
                title: "همیشه نقد همراه داشته باشید",
                desc: "بیشتر غرفه‌ها کارت نمی‌پذیرند. حداقل ۵۰ یورو نقد همراه داشته باشید — مخصوصاً برای برونن‌مارکت و ویکتور آدلر.",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: Percent,
                title: "چانه بزنید، اما محترمانه",
                desc: "در بازارهای شرقی و سنتی چانه زدن رایج است. برای خرید ۲ کیلو یا بیشتر، تخفیف ۱۰-۳۰٪ عادی است.",
                color: "from-rose-500 to-red-600",
              },
              {
                icon: ShoppingBasket,
                title: "سبد پارچه‌ای ببرید",
                desc: "کیسه‌های پلاستیکی معمولاً ۰.۲۰ تا ۰.۵۰ یورو هزینه دارند. سبد پارچه‌ای ببرید تا هم ارزان‌تر، هم دوستدار محیط زیست باشد.",
                color: "from-sky-500 to-blue-600",
              },
              {
                icon: Calendar,
                title: "آخر هفته = شلوغ",
                desc: "اگر می‌توانید، پنجشنبه یا جمعه صبح خرید کنید. شنبه‌ها بسیار شلوغ است و کیفیت پایین‌تر (چون همه می‌آیند).",
                color: "from-violet-500 to-purple-600",
              },
              {
                icon: Leaf,
                title: "به برچسب‌ها دقت کنید",
                desc: "برچسب 'Bio-Austria' یعنی محصول ارگانیک رسمی اتریش. اگر ارزانی مهم‌تر است، سبزیجات بدون برچسب هم همان کیفیت را دارند.",
                color: "from-lime-500 to-green-600",
              },
            ].map((tip, i) => {
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
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tip.color} flex items-center justify-center text-white shadow-md mb-3 group-hover:scale-110 transition-transform`}>
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
              <Globe className="w-5 h-5 text-amber-700" />
              یک روز در بازارهای وین
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از رنگ و بوی سبزیجات تازه تا طعم ادویه‌های شرقی
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.produce,
                title: "سبزیجات تازه",
                subtitle: "کیفیت برتر، قیمت منصفانه",
                desc: "سبزیجات و میوه‌ای که مستقیماً از مزارع اطراف وین می‌آیند، تازه‌تر و باکیفیت‌تر از سوپرمارکت‌ها هستند.",
                icon: Apple,
                gradient: "from-emerald-600 to-green-700",
                stat: "۱۰۰٪ تازه",
              },
              {
                img: IMAGES.spices,
                title: "ادویه‌جات شرقی",
                subtitle: "رنگ و عطر خاورمیانه",
                desc: "از زعفران ایرانی تا ادویه‌های ترکی — طعم اصیل خانه را در قلب وین پیدا کنید.",
                icon: Wine,
                gradient: "from-amber-600 to-orange-700",
                stat: "۵۰+ ادویه",
              },
              {
                img: IMAGES.flowers,
                title: "گل‌های رنگارنگ",
                subtitle: "زیبایی فصل‌ها",
                desc: "گل‌فروشی‌های بازار، با دسته‌گل‌های فصلی، زیبایی طبیعت را به خانه‌های وین می‌آورند.",
                icon: Sun,
                gradient: "from-rose-600 to-pink-700",
                stat: "فصلی",
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
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-700" />
              سوالات متداول درباره بازارهای وین
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1c0a02] via-[#451a03] to-[#92400e] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <ShoppingBasket className="w-3.5 h-3.5 text-amber-300" />
              راهنمای شخصی خرید در وین
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نمی‌دانید از کدام بازار شروع کنید؟
            </h2>

            <p className="text-sm text-amber-100 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین می‌تواند بر اساس محله شما، بودجه و نیازتان، بهترین
              بازار و روز خرید را پیشنهاد دهد. همین حالا پیام دهید.
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

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-amber-200/70 flex-wrap">
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
              ساعات کار و روزهای فعالیت بازارها ممکن است در تعطیلات رسمی
              (Feiertage) یا مناسبت‌های خاص تغییر کند. توصیه می‌شود قبل از
              مراجعه، ساعات کار رسمی بازار را در وب‌سایت شهرداری وین
              (wien.gv.at) بررسی کنید. قیمت‌ها نیز بسته به فصل و نرخ تورم
              می‌تواند متغیر باشد.
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
        isOpen ? "border-amber-300 bg-amber-50/30 shadow-md" : "border-stone-200"
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
                ? "bg-gradient-to-br from-amber-600 to-orange-700 text-white"
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
            isOpen ? "rotate-180 text-amber-700" : ""
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

export default OrganicMarketsGuide;