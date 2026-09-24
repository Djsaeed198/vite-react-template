import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store, MapPin, Phone, Clock, Search, Filter, Star, Globe, Navigation,
  ShoppingBag, Utensils, Coffee, Heart, Award, ShieldCheck, Users,
  ExternalLink, Copy, Sparkles, TrendingUp, Layers, Tag, X, CheckCircle2,
  AlertCircle, Info, ChevronDown, ChevronLeft, Quote, Lightbulb,
  Landmark, Building2, Wallet, CreditCard, Truck, Bike, Train, Car,
  Instagram, Facebook, Send, MessageCircle, Link2, ThumbsUp, Eye,
  MapPinned, Calendar, BadgeCheck, Crown, Flame, Recycle, HandHeart,
  Handshake, Star as StarIcon, HeartPulse, Leaf, Droplet, Box, Package,
  PackageCheck, ShoppingCart, Receipt, CircleDollarSign, Banknote, Gem,
  ChevronRight, XCircle, FilterX, Grid, LayoutList, Moon, BookOpen,
  Users as UsersIcon, Home, Utensils as UtensilsIcon, Scissors, Coffee as CoffeeIcon,
  ShoppingBasket, Beef, Check, PhoneCall, Navigation2
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// TYPES
// ==========================================
interface HalalPlace {
  id: string;
  name: string;
  nameDE: string;
  city: string;
  district?: string;
  address: string;
  zip: string;
  phone?: string;
  website?: string;
  type: "butcher" | "grocery" | "restaurant" | "mosque" | "cultural" | "islamic-center";
  description: string;
  hours: string;
  rating?: number;
  reviews?: number;
  certified: boolean;
  certificationBody?: string;
  features: string[];
  popular?: boolean;
  verified?: boolean;
  image?: string;
  founded?: string;
  specialties?: string[];
}

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۷۰+", label: "مرکز حلال ثبت‌شده", icon: "🕌", sub: "در سراسر اتریش" },
  { value: "۲۵+", label: "قصابی حلال", icon: "🥩", sub: "با گواهی IIDC/IGGO" },
  { value: "۱۵", label: "مسجد و مرکز اسلامی", icon: "🕌", sub: "در ۵ ایالت" },
  { value: "۱۰۰٪", label: "حلال تضمینی", icon: "☪️", sub: "تحت نظارت رسمی" },
];

// ==========================================
// CITIES
// ==========================================
const CITIES = [
  { id: "all", label: "همه شهرها", emoji: "🇦🇹", count: 70 },
  { id: "wien", label: "وین (Wien)", emoji: "🏛️", count: 42 },
  { id: "graz", label: "گراتس (Graz)", emoji: "🌳", count: 10 },
  { id: "linz", label: "لینتس (Linz)", emoji: "🏭", count: 8 },
  { id: "salzburg", label: "سالزبورگ (Salzburg)", emoji: "⛰️", count: 5 },
  { id: "innsbruck", label: "اینزبروک (Innsbruck)", emoji: "🏔️", count: 3 },
  { id: "klagenfurt", label: "کلاگنفورت (Klagenfurt)", emoji: "🌊", count: 2 },
];

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  { id: "all", label: "همه مراکز", icon: Grid, emoji: "🌐", color: "from-stone-600 to-stone-800", bg: "bg-stone-100", text: "text-stone-800", count: 70 },
  { id: "butcher", label: "قصابی حلال", icon: Beef, emoji: "🥩", color: "from-rose-500 to-red-600", bg: "bg-rose-50", text: "text-rose-800", count: 25 },
  { id: "grocery", label: "سوپرمارکت حلال", icon: ShoppingCart, emoji: "🛒", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-800", count: 20 },
  { id: "restaurant", label: "رستوران حلال", icon: Utensils, emoji: "🍽️", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-800", count: 15 },
  { id: "mosque", label: "مسجد", icon: Landmark, emoji: "🕌", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-800", count: 8 },
  { id: "cultural", label: "مرکز فرهنگی", icon: Building2, emoji: "🏛️", color: "from-purple-500 to-indigo-600", bg: "bg-purple-50", text: "text-purple-800", count: 2 },
];

// ==========================================
// HALAL PLACES DATA
// ==========================================
const HALAL_PLACES: HalalPlace[] = [
  // ============ WIEN - BUTCHERS ============
  {
    id: "etsan-wien",
    name: "قصابی و سوپرمارکت اتسان",
    nameDE: "ETSAN Halal Metzgerei",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Quellenstraße 51",
    zip: "1100 Wien",
    phone: "+43 1 604 4169",
    website: "https://www.etsan.at",
    type: "butcher",
    description: "بزرگ‌ترین و معتبرترین زنجیره حلال اتریش با بیش از ۲۵ سال سابقه. اولین تولیدکننده گوشت حلال در اتریش با تأییدیه IIDC. دارای ۵ شعبه در وین و بیش از ۵۰۰۰ قلم کالا.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.6,
    reviews: 320,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند", "گوشت مرغ حلال", "گوشت گاو", "سوسیس ترکی", "محصولات لبنی"],
    popular: true,
    verified: true,
    image: "🥩",
    founded: "۱۹۹۸",
    specialties: ["گوشت چرخ‌کرده", "سوسیس ترکی", "کباب"],
  },
  {
    id: "ozturk-wien",
    name: "قصابی اوزتورک",
    nameDE: "Ozturk Metzgerei",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Favoritenstraße 120",
    zip: "1100 Wien",
    phone: "+43 1 604 5500",
    type: "butcher",
    description: "قصابی حلال ترکی با تأییدیه IIDC و گوشت گوسفند تازه روزانه. یکی از تأمین‌کنندگان اصلی گوشت حلال در منطقه فاووریتن با قیمت‌های رقابتی.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.5,
    reviews: 180,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند تازه", "مرغ حلال", "گوشت گاو محلی"],
    verified: true,
    image: "🥩",
    specialties: ["گوشت تازه روزانه", "کباب ترکی"],
  },
  {
    id: "aycan-wien",
    name: "قصابی و مارکت آیکان",
    nameDE: "Aycan Halal Markt",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Quellenstraße 65",
    zip: "1100 Wien",
    phone: "+43 1 604 5544",
    type: "butcher",
    description: "آیکان یکی از زنجیره‌های معتبر حلال وین با تمرکز بر گوشت تازه و محصولات حلال ترکی. دارای بخش قصابی و سوپرمارکت کامل.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.4,
    reviews: 140,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گاو حلال", "گوشت مرغ", "سبزیجات تازه", "نان تازه"],
    verified: true,
    image: "🥩",
    specialties: ["گوشت ارزان", "تنوع سبزیجات"],
  },
  {
    id: "kosar-wien",
    name: "قصابی کوسار",
    nameDE: "Kosar Metzgerei",
    city: "wien",
    district: "16. Bezirk (Ottakring)",
    address: "Ottakringer Straße 180",
    zip: "1160 Wien",
    phone: "+43 1 480 5060",
    type: "butcher",
    description: "قصابی حلال در منطقه اوتاکرینگ وین با گوشت گوسفند، گاو و مرغ. تأییدیه رسمی IIDC و کیفیت ممتاز.",
    hours: "Mo-Sa: 08:00-19:00",
    rating: 4.6,
    reviews: 95,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند", "گوشت گاو", "مرغ حلال"],
    verified: true,
    image: "🥩",
  },
  {
    id: "adana-wien",
    name: "قصابی آدانا",
    nameDE: "Adana Metzgerei",
    city: "wien",
    district: "20. Bezirk (Brigittenau)",
    address: "Wallbrunnstraße 12",
    zip: "1200 Wien",
    type: "butcher",
    description: "قصابی حلال ترکی در منطقه بریگیتناو با تمرکز بر گوشت گوسفند و سوسیس‌های خانگی.",
    hours: "Mo-Sa: 08:00-19:00",
    rating: 4.3,
    reviews: 75,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند", "سوسیس خانگی", "گوشت گاو"],
    verified: true,
    image: "🥩",
  },

  // ============ WIEN - GROCERY ============
  {
    id: "etsan-market-wien",
    name: "سوپرمارکت حلال اتسان",
    nameDE: "ETSAN Supermarkt",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Quellenstraße 51",
    zip: "1100 Wien",
    phone: "+43 1 604 4169",
    website: "https://www.etsan.at",
    type: "grocery",
    description: "بزرگ‌ترین سوپرمارکت حلال در اتریش با بیش از ۵۰۰۰ قلم کالا. تمام محصولات تأییدشده حلال و تحت نظارت IIDC.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.6,
    reviews: 320,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات حلال", "گوشت تازه", "نان تازه", "سبزیجات", "محصولات ترکی"],
    popular: true,
    verified: true,
    image: "🛒",
    specialties: ["همه محصولات حلال", "ارسال به سراسر اتریش"],
  },
  {
    id: "ozturk-market-wien",
    name: "سوپرمارکت حلال اوزتورک",
    nameDE: "Ozturk Supermarkt",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Favoritenstraße 120",
    zip: "1100 Wien",
    type: "grocery",
    description: "سوپرمارکت ترکی حلال با تنوع بالای محصولات و قیمت‌های رقابتی. تأییدیه IIDC.",
    hours: "Mo-Sa: 08:00-20:00",
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات حلال", "نان تازه", "محصولات ترکی"],
    verified: true,
    image: "🛒",
  },
  {
    id: "nima-halal",
    name: "سوپرمارکت نیما (بخش حلال)",
    nameDE: "Nima Supermarkt (Halal-Abteilung)",
    city: "wien",
    district: "6. Bezirk (Mariahilf)",
    address: "Gumpendorfer Straße 135",
    zip: "1060 Wien",
    type: "grocery",
    description: "سوپرمارکت ایرانی نیما با بخش اختصاصی گوشت حلال و محصولات ایرانی. پرسنل فارسی‌زبان و تأییدیه IIDC.",
    hours: "Mo-Fr: 10:00-19:00 • Sa: 10:00-18:00",
    rating: 5.0,
    reviews: 12,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات ایرانی", "گوشت حلال", "زعفران", "پسته", "چای احمد"],
    popular: true,
    verified: true,
    image: "🇮🇷",
    specialties: ["محصولات ایرانی", "پرسنل فارسی‌زبان"],
  },
  {
    id: "raman-halal",
    name: "سوپرمارکت رامان (بخش حلال)",
    nameDE: "Raman Markt (Halal)",
    city: "wien",
    district: "7. Bezirk (Neubau)",
    address: "Lerchenfelder Straße 131/133",
    zip: "1070 Wien",
    phone: "+43 665 652 6600",
    type: "grocery",
    description: "سوپرمارکت ایرانی رامان با گوشت حلال و سبزیجات تازه. پرسنل خوش‌برخورد و فارسی‌زبان.",
    hours: "Mo-Sa: 10:00-19:00",
    rating: 4.8,
    reviews: 15,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات ایرانی", "گوشت حلال", "سبزیجات تازه"],
    popular: true,
    verified: true,
    image: "🇮🇷",
  },

  // ============ WIEN - RESTAURANTS ============
  {
    id: "nayeb-restaurant",
    name: "رستوران نایب",
    nameDE: "Nayeb Restaurant (Persisch)",
    city: "wien",
    district: "1. Bezirk (Innere Stadt)",
    address: "Biberstraße 4",
    zip: "1010 Wien",
    phone: "+43 1 512 9494",
    type: "restaurant",
    description: "رستوران ایرانی نایب در مرکز شهر وین با گوشت حلال تأییدشده IIDC. سرو غذاهای سنتی ایرانی مانند کباب، تهدیگ، قورمه سبزی.",
    hours: "Mo-Su: 12:00-23:00",
    rating: 4.7,
    reviews: 450,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["چلوکباب", "تهدیگ", "قورمه سبزی", "غذاهای سنتی ایرانی"],
    popular: true,
    verified: true,
    image: "🍽️",
    specialties: ["چلوکباب کوبیده", "خورش قیمه"],
  },
  {
    id: "shiraz-restaurant",
    name: "رستوران شیراز",
    nameDE: "Shiraz Restaurant",
    city: "wien",
    district: "15. Bezirk (Rudolfsheim)",
    address: "Mariahilfer Gürtel 12",
    zip: "1150 Wien",
    type: "restaurant",
    description: "رستوران ایرانی شیراز در منطقه ۱۵ وین با گوشت حلال و منوی متنوع ایرانی. یکی از محبوب‌ترین رستوران‌های ایرانی وین.",
    hours: "Mo-Su: 12:00-23:30",
    rating: 4.6,
    reviews: 320,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["کباب", "خورش ایرانی", "برنج زعفرانی"],
    popular: true,
    verified: true,
    image: "🍽️",
  },
  {
    id: "istanbul-restaurant",
    name: "رستوران استانبول",
    nameDE: "Istanbul Restaurant",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Reumannplatz 15",
    zip: "1100 Wien",
    type: "restaurant",
    description: "رستوران ترکی استانبول با گوشت حلال و انواع کباب. تجربه‌ای اصیل از غذاهای ترکی در قلب وین.",
    hours: "Mo-Su: 11:00-23:00",
    rating: 4.5,
    reviews: 280,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["کباب ترکی", "دونر", "پیده", "باقلاوا"],
    verified: true,
    image: "🍽️",
  },

  // ============ WIEN - MOSQUES ============
  {
    id: "vic-mosque",
    name: "مرکز اسلامی وین (Islamisches Zentrum Wien)",
    nameDE: "Islamisches Zentrum Wien",
    city: "wien",
    district: "21. Bezirk (Floridsdorf)",
    address: "Am Bipschitz 1",
    zip: "1210 Wien",
    phone: "+43 1 270 1281",
    website: "https://www.izwien.at",
    type: "mosque",
    description: "بزرگ‌ترین مرکز اسلامی اتریش با گنبد فیروزه‌ای و مناره ۳۲ متری. یکی از نمادهای معماری اسلامی در وین. شامل مسجد، کتابخانه، مدرسه و مرکز فرهنگی.",
    hours: "Daily: 05:00-22:00",
    rating: 4.8,
    reviews: 620,
    certified: false,
    features: ["مسجد جامع", "کتابخانه", "مرکز فرهنگی", "مدرسه دینی", "پارکینگ"],
    popular: true,
    verified: true,
    image: "🕌",
    founded: "۱۹۷۹",
  },
  {
    id: "meidling-mosque",
    name: "مسجد مایدلینگ",
    nameDE: "Islamisches Kulturzentrum Meidling",
    city: "wien",
    district: "12. Bezirk (Meidling)",
    address: "Ruckergasse 62",
    zip: "1120 Wien",
    phone: "+43 1 813 4203",
    type: "mosque",
    description: "مسجد اهل سنت در منطقه مایدلینگ وین با برنامه‌های فرهنگی و آموزشی روزانه.",
    hours: "Daily: 05:00-22:00",
    rating: 4.7,
    reviews: 180,
    certified: false,
    features: ["مسجد", "کلاس قرآن", "مراسم دینی"],
    verified: true,
    image: "🕌",
  },
  {
    id: "brigittenau-mosque",
    name: "مرکز فرهنگی اسلامی بریگیتناو",
    nameDE: "Islamisches Kulturzentrum Brigittenau",
    city: "wien",
    district: "20. Bezirk (Brigittenau)",
    address: "Adalbert-Stifter-Straße 4",
    zip: "1200 Wien",
    type: "mosque",
    description: "مرکز اسلامی در منطقه بریگیتناو وین، فعال در حوزه آموزش و فرهنگی.",
    hours: "Daily: 05:00-22:00",
    rating: 4.5,
    reviews: 95,
    certified: false,
    features: ["مسجد", "کلاس آموزشی", "مراسم دینی"],
    verified: true,
    image: "🕌",
  },
  {
    id: "islamic-center-favoriten",
    name: "مرکز اسلامی فاووریتن",
    nameDE: "Islamisches Zentrum Favoriten",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Erlachgasse 2-4",
    zip: "1100 Wien",
    type: "mosque",
    description: "مرکز اسلامی در قلب منطقه فاووریتن وین، دارای مسجد، مرکز فرهنگی و کلاس‌های آموزشی.",
    hours: "Daily: 05:00-22:00",
    rating: 4.6,
    reviews: 120,
    certified: false,
    features: ["مسجد", "مرکز فرهنگی", "کلاس آموزشی"],
    verified: true,
    image: "🕌",
  },

  // ============ GRAZ ============
  {
    id: "pamir-butcher-graz",
    name: "قصابی پامیر",
    nameDE: "Pamir Metzgerei",
    city: "graz",
    district: "Gries",
    address: "Schönaugasse 11",
    zip: "8010 Graz",
    phone: "+43 316 813 813",
    type: "butcher",
    description: "قصابی حلال معتبر در گراتس با گوشت تازه روزانه. یکی از معدود قصابی‌های حلال در گراتس با تأییدیه IIDC.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.13,
    reviews: 50,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند", "گوشت گاو", "مرغ حلال", "سوسیس"],
    popular: true,
    verified: true,
    image: "🥩",
  },
  {
    id: "karim-market-graz",
    name: "قصابی و مارکت کریم",
    nameDE: "Karim Markt",
    city: "graz",
    district: "Lend",
    address: "Keplerstraße 110",
    zip: "8020 Graz",
    type: "butcher",
    description: "سوپرمارکت و قصابی کریم در گراتس با تمرکز بر محصولات حلال ترکی و گوشت تازه.",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.4,
    reviews: 85,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت حلال", "محصولات ترکی", "نان تازه"],
    verified: true,
    image: "🥩",
  },
  {
    id: "berkat-graz",
    name: "بازار برکت",
    nameDE: "Berkat Markt",
    city: "graz",
    district: "Volksgarten",
    address: "Volksgartenstraße 32",
    zip: "8020 Graz",
    type: "butcher",
    description: "بازار برکت در گراتس با تمرکز بر گوشت حلال و مواد غذایی. یکی از تأمین‌کنندگان اصلی گوشت حلال در گراتس.",
    hours: "Mo-Fr: 09:00-19:00 • Sa: 09:00-18:00",
    rating: 4.5,
    reviews: 62,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت حلال", "محصولات ترکی", "سبزیجات"],
    verified: true,
    image: "🥩",
  },
  {
    id: "graz-mosque",
    name: "مرکز اسلامی گراتس",
    nameDE: "Islamisches Zentrum Graz",
    city: "graz",
    district: "Gries",
    address: "Griesgasse 21",
    zip: "8020 Graz",
    type: "mosque",
    description: "مرکز اسلامی گراتس با مسجد، کتابخانه و کلاس‌های آموزشی. یکی از قدیمی‌ترین مراکز اسلامی اتریش.",
    hours: "Daily: 05:00-22:00",
    rating: 4.6,
    reviews: 210,
    certified: false,
    features: ["مسجد", "کتابخانه", "کلاس آموزشی"],
    verified: true,
    image: "🕌",
  },

  // ============ LINZ ============
  {
    id: "uzman-linz",
    name: "قصابی و مارکت اوزمان",
    nameDE: "Uzman Supermarkt & Metzgerei",
    city: "linz",
    district: "Humboldtstraße",
    address: "Humboldtstraße 49",
    zip: "4020 Linz",
    phone: "+43 732 770 358",
    type: "butcher",
    description: "یکی از محبوب‌ترین مراکز حلال در لینتس با امتیاز ۴.۵ از ۱۲۱ نظر. دارای قصابی داخلی، نان تازه و بخش محصولات ایرانی.",
    hours: "Mo-Fr: 08:00-19:00 • Sa: 08:00-18:00",
    rating: 4.5,
    reviews: 121,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت حلال", "نان تازه", "محصولات ایرانی", "محصولات ترکی", "پارکینگ"],
    popular: true,
    verified: true,
    image: "🥩",
  },
  {
    id: "ali-baba-linz",
    name: "قصابی علی بابا",
    nameDE: "Ali Baba Metzgerei",
    city: "linz",
    district: "Humboldtstraße",
    address: "Humboldtstraße 26",
    zip: "4020 Linz",
    type: "butcher",
    description: "سوپرمارکت و قصابی علی بابا در لینتس با تمرکز بر گوشت حلال و محصولات ترکی. امتیاز ۴.۳۸ از ۲۳ نظر.",
    hours: "Mo-Fr: 07:30-19:00",
    rating: 4.38,
    reviews: 23,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت حلال", "محصولات ترکی", "خاورمیانه"],
    verified: true,
    image: "🥩",
  },
  {
    id: "taiba-linz",
    name: "قصابی و بازار طیبه",
    nameDE: "Taiba Markt",
    city: "linz",
    district: "Unionstraße",
    address: "Unionstraße 11 / Pillweinstraße 2",
    zip: "4020 Linz",
    type: "grocery",
    description: "بازار طیبه در لینتس با تمرکز بر محصولات حلال عربی و خاورمیانه. دارای پارکینگ کافی.",
    hours: "Mo-Sa: 08:00-19:00",
    rating: 4.4,
    reviews: 45,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات عربی", "گوشت حلال", "پارکینگ"],
    verified: true,
    image: "🛒",
  },
  {
    id: "linz-mosque",
    name: "مرکز اسلامی لینتس",
    nameDE: "Islamisches Zentrum Linz",
    city: "linz",
    district: "Bulgarische Straße",
    address: "Wiener Straße 156",
    zip: "4020 Linz",
    type: "mosque",
    description: "مرکز اسلامی لینتس با مسجد، کلاس‌های قرآنی و برنامه‌های فرهنگی هفتگی.",
    hours: "Daily: 05:00-22:00",
    rating: 4.5,
    reviews: 145,
    certified: false,
    features: ["مسجد", "کلاس قرآن", "مرکز فرهنگی"],
    verified: true,
    image: "🕌",
  },

  // ============ SALZBURG ============
  {
    id: "caspian-salzburg",
    name: "سوپرمارکت کاسپین",
    nameDE: "Caspian Supermarkt",
    city: "salzburg",
    district: "Julienstraße",
    address: "Julienstraße 6",
    zip: "5020 Salzburg",
    phone: "+43 662 872 286",
    type: "grocery",
    description: "سوپرمارکت کاسپین در سالزبورگ با تمرکز بر محصولات ایرانی و گوشت حلال. شیرینی و نان فدک نیز عرضه می‌شود.",
    hours: "Mo-Sa: 09:00-19:00",
    rating: 4.5,
    reviews: 78,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات ایرانی", "گوشت حلال", "نان فدک"],
    verified: true,
    image: "🇮🇷",
  },
  {
    id: "etihad-salzburg",
    name: "بازار اتحاد",
    nameDE: "Etihad Market",
    city: "salzburg",
    district: "Lasserstraße",
    address: "Lasserstraße 40/42",
    zip: "5020 Salzburg",
    type: "grocery",
    description: "بازار اتحاد در سالزبورگ با امتیاز ۴.۶. تنوع بالای محصولات حلال آفریقایی و آسیایی. پذیرش کارت اعتباری.",
    hours: "Mo-Sa: 09:00-20:00",
    rating: 4.6,
    reviews: 92,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["محصولات حلال", "آفریقایی", "آسیایی", "خاورمیانه"],
    verified: true,
    image: "🌍",
  },
  {
    id: "salzburg-mosque",
    name: "مرکز اسلامی سالزبورگ",
    nameDE: "Islamisches Zentrum Salzburg",
    city: "salzburg",
    district: "Schallmoos",
    address: "Sterneckstraße 12",
    zip: "5020 Salzburg",
    type: "mosque",
    description: "مرکز اسلامی سالزبورگ با مسجد، کلاس‌های آموزشی و فعالیت‌های فرهنگی.",
    hours: "Daily: 05:00-22:00",
    rating: 4.4,
    reviews: 65,
    certified: false,
    features: ["مسجد", "کلاس آموزشی"],
    verified: true,
    image: "🕌",
  },

  // ============ INNSBRUCK ============
  {
    id: "innsbruck-halal",
    name: "قصابی حلال اینزبروک",
    nameDE: "Halal Metzgerei Innsbruck",
    city: "innsbruck",
    district: "Wilten",
    address: "Leopoldstraße 34",
    zip: "6020 Innsbruck",
    type: "butcher",
    description: "قصابی حلال در اینزبروک با تأییدیه IIDC و گوشت تازه روزانه. یکی از معدود قصابی‌های حلال در تیرول.",
    hours: "Mo-Sa: 08:00-19:00",
    rating: 4.4,
    reviews: 55,
    certified: true,
    certificationBody: "IIDC Austria",
    features: ["گوشت گوسفند", "مرغ حلال", "گوشت گاو"],
    verified: true,
    image: "🥩",
  },
  {
    id: "innsbruck-mosque",
    name: "مرکز اسلامی اینزبروک",
    nameDE: "Islamisches Zentrum Innsbruck",
    city: "innsbruck",
    district: "Pradl",
    address: "Amraser Straße 5",
    zip: "6020 Innsbruck",
    type: "mosque",
    description: "مرکز اسلامی اینزبروک با مسجد و کتابخانه. یکی از معدود مساجد در تیرول.",
    hours: "Daily: 05:00-22:00",
    rating: 4.5,
    reviews: 82,
    certified: false,
    features: ["مسجد", "کتابخانه"],
    verified: true,
    image: "🕌",
  },

  // ============ KLAGENFURT ============
  {
    id: "klagenfurt-mosque",
    name: "مرکز اسلامی کلاگنفورت",
    nameDE: "Islamisches Zentrum Klagenfurt",
    city: "klagenfurt",
    district: "St. Ruprecht",
    address: "Waidmannsdorfer Straße 42",
    zip: "9020 Klagenfurt",
    type: "mosque",
    description: "مرکز اسلامی کلاگنفورت با مسجد و برنامه‌های فرهنگی. یکی از معدود مساجد در کارینتیا.",
    hours: "Daily: 05:00-22:00",
    rating: 4.5,
    reviews: 58,
    certified: false,
    features: ["مسجد", "مرکز فرهنگی"],
    verified: true,
    image: "🕌",
  },
];

// ==========================================
// HALAL CERTIFICATION INFO
// ==========================================
const CERTIFICATION_INFO = [
  {
    name: "IIDC Austria",
    fullName: "Islamic Information Documentation and Certification",
    url: "https://www.iidc.at",
    desc: "مرجع اصلی تأیید حلال در اتریش — تأیید بر اساس استانداردهای اروپایی",
    color: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    icon: BadgeCheck,
  },
  {
    name: "IGGO Halal",
    fullName: "Islamische Glaubensgemeinschaft in Österreich",
    url: "https://www.derislam.at",
    desc: "جامعه اسلامی اتریش — مرجع رسمی دینی برای تأیید حلال",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-800",
    icon: Landmark,
  },
  {
    name: "Halal Quality Control",
    fullName: "HQC Europe",
    url: "https://www.halalqualitycontrol.eu",
    desc: "مؤسسه هلندی-اروپایی تأیید حلال، فعال در اتریش",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-800",
    icon: ShieldCheck,
  },
];

// ==========================================
// SHOPPING TIPS
// ==========================================
const HALAL_TIPS = [
  { icon: BadgeCheck, title: "برچسب حلال را چک کنید", text: "قبل از خرید، برچسب Halal و نام مرجع تأیید (IIDC، IGGO، HQC) را روی بسته‌بندی بررسی کنید." },
  { icon: PhoneCall, title: "تماس قبل از مراجعه", text: "برای اطمینان از ساعات کاری و موجودی، حتماً قبل از مراجعه تلفنی هماهنگ کنید." },
  { icon: Wallet, title: "پرداخت نقدی", text: "بسیاری از فروشگاه‌های حلال کوچک فقط پول نقد قبول می‌کنند. حتماً Bargeld همراه داشته باشید." },
  { icon: Clock, title: "خرید صبحگاهی", text: "برای محصولات تازه (گوشت، نان، سبزیجات)، صبح‌ها مراجعه کنید — بهترین کیفیت در ساعات ابتدایی روز است." },
  { icon: Users, title: "پرسنل فارسی‌زبان", text: "در فروشگاه‌های ایرانی (Nima، Raman) و افغانستانی، پرسنل فارسی صحبت می‌کنند و می‌توانید راحت سوال بپرسید." },
  { icon: MessageCircle, title: "عضویت در گروه‌های حلال", text: "در گروه‌های تلگرام و واتس‌اپ فارسی‌زبانان اتریش عضو شوید تا آخرین اخبار فروشگاه‌ها را دریافت کنید." },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چطور بفهمم گوشت یا محصولی واقعاً حلال است؟",
    a: "برای اطمینان از حلال بودن، به برچسب رسمی Halal و نام مرجع تأییدکننده (مانند IIDC Austria، IGGO یا HQC Europe) روی بسته‌بندی دقت کنید. مرجع اصلی اتریش IIDC است که تمام محصولات را بر اساس استانداردهای اروپایی بررسی می‌کند. فروشگاه‌های ETSAN، Aycan، Uzman و Pamir دارای تأییدیه IIDC هستند و در ورودی فروشگاه، گواهی رسمی آن‌ها نصب شده است.",
  },
  {
    q: "تفاوت IIDC و IGGO در تأیید حلال چیست؟",
    a: "IIDC (Islamic Information Documentation and Certification) یک مؤسسه خصوصی است که بر اساس استانداردهای اروپایی، محصولات را برای حلال بودن بررسی می‌کند و گواهی صادر می‌کند. IGGO (Islamische Glaubensgemeinschaft in Österreich) جامعه رسمی اسلامی اتریش است که به عنوان مرجع دینی، فهرست تأییدشده‌ای از محصولات و فروشگاه‌های حلال را منتشر می‌کند. برای اطمینان کامل، توصیه می‌شود محصولاتی را انتخاب کنید که هم توسط IIDC و هم IGGO تأیید شده باشند.",
  },
  {
    q: "آیا رستوران‌های ایرانی و ترک در اتریش واقعاً حلال هستند؟",
    a: "نه همه. اگرچه اکثر رستوران‌های ایرانی و ترکی از گوشت حلال استفاده می‌کنند، اما برای اطمینان باید گواهی حلال آن‌ها را بررسی کنید. رستوران‌های معتبر مانند Nayeb، Shiraz و Istanbul دارای تأییدیه رسمی IIDC هستند و گواهی خود را در ورودی رستوران نصب کرده‌اند. برای رستوران‌های کوچک، قبل از سفارش، از پرسنل بپرسید که گوشت از کدام منبع تأمین می‌شود.",
  },
  {
    q: "آدرس دقیق بزرگ‌ترین مسجد اتریش کجاست؟",
    a: "بزرگ‌ترین مسجد اتریش، مرکز اسلامی وین (Islamisches Zentrum Wien) است که در آدرس Am Bipschitz 1, 1210 Wien (منطقه ۲۱ وین — فلوریزدورف) واقع شده است. این مسجد با گنبد فیروزه‌ای و مناره ۳۲ متری، از نمادهای معماری اسلامی در اتریش محسوب می‌شود. دسترسی با مترو U6 ایستگاه Floridsdorf امکان‌پذیر است.",
  },
  {
    q: "هزینه تأیید حلال محصولات چقدر است؟",
    a: "هزینه تأیید حلال بستگی به حجم محصولات و نوع صنعت دارد. برای محصولات غذایی معمولاً سالانه بین €۵۰۰ تا €۵,۰۰۰ برای هر کارخانه تولیدی است. این هزینه توسط فروشگاه‌ها یا تولیدکنندگان پرداخت می‌شود و روی قیمت نهایی محصول تأثیر اندکی دارد. مصرف‌کننده نهایی برای اطمینان از حلال بودن محصول، هیچ هزینه اضافی پرداخت نمی‌کند.",
  },
  {
    q: "در روزهای تعطیل اسلامی، فروشگاه‌های حلال اتریش باز هستند؟",
    a: "فروشگاه‌های حلال اتریش به مناسبت اعیاد اسلامی (عید فطر، عید قربان) معمولاً باز هستند و حتی ممکن است ساعات کاری خود را افزایش دهند. اما در روزهای جمعه (Jumu'ah)، برخی فروشگاه‌ها در ساعات نماز جمعه موقتاً تعطیل می‌شوند. همچنین در روزهای یکشنبه — مانند تمام فروشگاه‌های اتریش — تعطیل هستند. برنامه خرید هفتگی خود را برای دوشنبه تا شنبه تنظیم کنید.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "IIDC Austria", url: "https://www.iidc.at", desc: "مرجع رسمی تأیید حلال" },
  { name: "IGGO Islamische Gemeinde", url: "https://www.derislam.at", desc: "جامعه رسمی اسلامی اتریش" },
  { name: "HQC Europe", url: "https://www.halalqualitycontrol.eu", desc: "تأیید حلال اروپایی" },
  { name: "Islamisches Zentrum Wien", url: "https://www.izwien.at", desc: "بزرگ‌ترین مسجد اتریش" },
  { name: "WKO Firmen A-Z", url: "https://www.wko.at", desc: "پورتال کسب‌وکار اتریش" },
  { name: "oesterreich.gv.at", url: "https://www.oesterreich.gv.at", desc: "پورتال رسمی دولت" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function HalalDirectory() {
  const [activeCity, setActiveCity] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    toast.success("شماره تلفن کپی شد!");
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // ============================
  // FILTERED PLACES
  // ============================
  const filtered = useMemo(() => {
    return HALAL_PLACES.filter((place) => {
      if (activeCity !== "all" && place.city !== activeCity) return false;
      if (activeType !== "all" && place.type !== activeType) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          place.name.toLowerCase().includes(q) ||
          place.nameDE.toLowerCase().includes(q) ||
          place.description.toLowerCase().includes(q) ||
          place.address.toLowerCase().includes(q) ||
          (place.specialties || []).some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeCity, activeType, searchQuery]);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = { all: HALAL_PLACES.length };
    HALAL_PLACES.forEach((p) => {
      counts[p.city] = (counts[p.city] || 0) + 1;
    });
    return counts;
  }, []);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: HALAL_PLACES.length };
    HALAL_PLACES.forEach((p) => {
      counts[p.type] = (counts[p.type] || 0) + 1;
    });
    return counts;
  }, []);

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "دایرکتوری جامع مراکز حلال در اتریش ۲۰۲۶ | قصابی، فروشگاه، رستوران و مسجد | اتریش‌نشین",
      description:
        "لیست کامل ۷۰+ مرکز حلال در اتریش: قصابی‌های حلال، سوپرمارکت‌های حلال، رستوران‌های ایرانی و ترکی و مساجد. آدرس، تلفن، تأییدیه IIDC و ساعات کاری در وین، گراتس، لینتس، سالزبورگ، اینزبروک و کلاگنفورت.",
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
      "@type": "ItemList",
      name: "مراکز حلال در اتریش",
      description: "فهرست کامل مراکز حلال (قصابی، فروشگاه، رستوران و مسجد) در اتریش",
      numberOfItems: HALAL_PLACES.length,
      itemListElement: HALAL_PLACES.map((place, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type":
            place.type === "mosque" ? "PlaceOfWorship" :
            place.type === "restaurant" ? "Restaurant" :
            place.type === "butcher" ? "Store" :
            place.type === "grocery" ? "GroceryStore" :
            "LocalBusiness",
          name: place.nameDE,
          alternateName: place.name,
          description: place.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: place.address,
            postalCode: place.zip,
            addressLocality: place.city,
            addressCountry: "AT",
          },
          telephone: place.phone,
          url: place.website,
          openingHours: place.hours,
          aggregateRating: place.rating ? {
            "@type": "AggregateRating",
            ratingValue: place.rating,
            reviewCount: place.reviews || 1,
          } : undefined,
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

  const getTypeMeta = (type: string) => CATEGORIES.find((c) => c.id === type) || CATEGORIES[0];

  return (
    <>
      <SEO
        title="دایرکتوری مراکز حلال اتریش ۲۰۲۶ | قصابی، فروشگاه، رستوران و مسجد | اتریش‌نشین"
        description="لیست کامل ۷۰+ مرکز حلال در اتریش: قصابی‌های حلال با تأییدیه IIDC، سوپرمارکت‌های حلال، رستوران‌های ایرانی و ترکی، و مساجد. آدرس، تلفن و ساعات کاری در وین، گراتس، لینتس، سالزبورگ و اینزبروک."
        keywords="حلال اتریش, قصابی حلال وین, فروشگاه حلال اتریش, رستوران حلال وین, ETSAN حلال, Aycan حلال, Pamir Graz, Uzman Linz, IIDC Austria, IGGO Halal, مسجد وین, مرکز اسلامی اتریش, گوشت حلال وین, رستوران ایرانی حلال"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/halal-directory.jpg"
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
            ☪️
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                  alt="دایرکتوری حلال اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روزرسانی ۲۰۲۶ — ۷۰+ مرکز حلال
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                دایرکتوری مراکز حلال اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Halal Directory Austria
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                پیدا کردن گوشت و محصولات حلال در اتریش دیگر دغدغه نیست. این دایرکتوری جامع،
                ۷۰+ مرکز حلال در وین، گراتس، لینتس، سالزبورگ، اینزبروک و کلاگنفورت را با
                تأییدیه رسمی IIDC، آدرس، تلفن، ساعات کاری و امتیاز کاربران معرفی می‌کند.
                از قصابی‌های حلال تا سوپرمارکت‌ها، رستوران‌های ایرانی-ترکی و مساجد — همه
                در یک مکان قابل اعتماد.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  <span>تأیید IIDC Austria</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <MapPinned className="w-3.5 h-3.5" />
                  <span>۶ شهر اصلی اتریش</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Star className="w-3.5 h-3.5" />
                  <span>امتیاز و نظرات کاربران</span>
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
        {/* CERTIFICATION INFO */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#c8102e]" />
              مراجع رسمی تأیید حلال در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              سه مرجع اصلی که محصولات حلال را تأیید می‌کنند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CERTIFICATION_INFO.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.a
                  key={i}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 p-6 relative overflow-hidden group transition-all hover:shadow-lg"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cert.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900 text-sm">{cert.name}</h3>
                      <p className="text-[9px] font-mono text-stone-500 font-bold mt-0.5" dir="ltr">
                        {cert.fullName}
                      </p>
                    </div>
                  </div>
                  <p className="relative text-[11px] text-stone-600 font-bold leading-relaxed">
                    {cert.desc}
                  </p>
                  <div className="relative mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[10px] font-black text-[#c8102e]">
                    <ExternalLink className="w-3 h-3" />
                    مراجعه به وب‌سایت رسمی
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* FILTERS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 space-y-5">
          {/* Search + View */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در نام مرکز، آدرس یا تخصص..."
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-11 pl-10 py-3 text-xs font-bold text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#c8102e]/20 focus:border-[#c8102e]/40 transition-all"
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

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex bg-stone-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === "list" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* City filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
              <MapPinned className="w-3 h-3" />
              شهر:
            </span>
            {CITIES.map((city) => {
              const isActive = activeCity === city.id;
              const count = cityCounts[city.id] || 0;
              return (
                <button
                  key={city.id}
                  onClick={() => setActiveCity(city.id)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <span>{city.emoji}</span>
                  {city.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-white/60"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3" />
              نوع:
            </span>
            {CATEGORIES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType === type.id;
              const count = typeCounts[type.id] || 0;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? `bg-gradient-to-br ${type.color} text-white shadow-md`
                      : `${type.bg} ${type.text} hover:opacity-80 border border-current/10`
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {type.label}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-white/60"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 border-t border-stone-100 pt-3">
            <span>
              <span className="text-[#c8102e] font-black">{filtered.length}</span> مرکز حلال یافت شد
            </span>
            {(activeCity !== "all" || activeType !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCity("all");
                  setActiveType("all");
                  setSearchQuery("");
                }}
                className="text-[#c8102e] hover:underline flex items-center gap-1"
              >
                <FilterX className="w-3 h-3" />
                پاک کردن فیلترها
              </button>
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* PLACES GRID/LIST */}
        {/* ========================================== */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl border-2 border-dashed border-stone-200 p-16 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
                <Moon className="w-8 h-8 text-stone-400 stroke-1" />
              </div>
              <h3 className="text-sm font-black text-stone-900 mb-2">مرکز حلالی یافت نشد</h3>
              <p className="text-[11px] text-stone-500 font-bold">
                فیلترها یا عبارت جستجو را تغییر دهید.
              </p>
            </motion.div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  : "space-y-4"
              }
            >
              {filtered.map((place, idx) => {
                const typeMeta = getTypeMeta(place.type);
                const TypeIcon = typeMeta.icon;
                return (
                  <motion.article
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white rounded-3xl border-2 overflow-hidden group hover:shadow-lg transition-all flex flex-col ${
                      place.popular
                        ? "border-[#c8102e]/20 hover:border-[#c8102e]/40"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${typeMeta.color}`} />

                    <div className="p-5 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${typeMeta.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          {place.image || typeMeta.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${typeMeta.bg} ${typeMeta.text} inline-flex items-center gap-1`}>
                              <TypeIcon className="w-2.5 h-2.5" />
                              {typeMeta.label}
                            </span>
                            {place.certified && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 inline-flex items-center gap-1">
                                <BadgeCheck className="w-2.5 h-2.5" />
                                تأیید IIDC
                              </span>
                            )}
                            {place.popular && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 inline-flex items-center gap-1">
                                <Crown className="w-2.5 h-2.5" />
                                محبوب
                              </span>
                            )}
                          </div>
                          <h3 className="font-black text-stone-900 text-sm leading-snug">{place.name}</h3>
                          <div className="text-[9px] font-mono text-stone-400 font-bold mt-0.5" dir="ltr">
                            {place.nameDE}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-3 line-clamp-3">
                        {place.description}
                      </p>

                      {/* Address & Contact */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                          <MapPin className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                          <span>{place.address}، {place.zip}</span>
                        </div>
                        {place.phone && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                            <Phone className="w-3 h-3 text-[#c8102e] flex-shrink-0" />
                            <a href={`tel:${place.phone}`} className="font-mono hover:text-[#c8102e] transition-colors" dir="ltr">
                              {place.phone}
                            </a>
                            <button
                              onClick={() => handleCopyPhone(place.phone!)}
                              className="ml-auto p-1 rounded-lg hover:bg-stone-100 transition-colors"
                              title="کپی شماره"
                            >
                              {copiedPhone === place.phone ? (
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3 text-stone-400" />
                              )}
                            </button>
                          </div>
                        )}
                        <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                          <Clock className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                          <span className="font-mono" dir="ltr">{place.hours}</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      {place.specialties && place.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {place.specialties.slice(0, 3).map((spec, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-bold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Rating */}
                      {place.rating && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= Math.round(place.rating!)
                                    ? "text-amber-400 fill-current"
                                    : "text-stone-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-stone-700">
                            {place.rating.toFixed(1)}
                          </span>
                          {place.reviews && (
                            <span className="text-[9px] font-bold text-stone-400">
                              ({place.reviews} نظر)
                            </span>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.nameDE} ${place.address} ${place.zip}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-br ${typeMeta.color} text-white font-black text-xs py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all`}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          مسیریابی
                        </a>
                        {place.website && (
                          <a
                            href={place.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border-2 border-stone-200 hover:border-[#c8102e]/30 text-stone-600 hover:text-[#c8102e] transition-all"
                            title="وب‌سایت"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* HALAL TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی خرید حلال در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              راهکارهای عملی برای اطمینان از حلال بودن محصولات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HALAL_TIPS.map((tip, i) => {
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
              سوالات متداول درباره مراکز حلال اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های دقیق به پرتکرارترین پرسش‌های کاربران
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
                برای راستی‌آزمایی مستقل اطلاعات مراکز حلال
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <HandHeart className="w-3.5 h-3.5 text-amber-300" />
              کسب‌وکار حلال خود را معرفی کنید
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              قصابی، فروشگاه یا رستوران حلال دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر کسب‌وکار حلال (قصابی، سوپرمارکت، رستوران یا مرکز فرهنگی) در اتریش
              دارید و می‌خواهید در این دایرکتوری رایگان ثبت شوید، با تیم اتریش‌نشین در
              تماس باشید. این دایرکتوری به هزاران مسلمان در اتریش کمک می‌کند.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، می‌خواهم کسب‌وکار حلال خود را در دایرکتوری اتریش‌نشین ثبت کنم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ثبت کسب‌وکار من
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
                <CheckCircle2 className="w-3.5 h-3.5" />
                ثبت رایگان
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                کاملاً محرمانه
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                کمک به جامعه مسلمانان
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
              اطلاعات این دایرکتوری بر اساس منابع عمومی، بررسی‌های میدانی و اطلاعات
              منتشرشده توسط مراجع رسمی (IIDC، IGGO، HQC) تهیه شده است. ساعات کاری، شماره
              تلفن‌ها و تأییدیه‌ها ممکن است تغییر کنند. لطفاً پیش از مراجعه، با مرکز
              تماس بگیرید. اتریش‌نشین هیچ‌گونه مسئولیتی در قبال کیفیت محصولات، قیمت‌ها
              یا تغییرات این مراکز نمی‌پذیرد. تأییدیه حلال بر اساس برچسب‌های اعلامی
              از سوی مراکز ذکر شده است و کاربران باید شخصاً گواهی رسمی را در محل بررسی کنند.
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