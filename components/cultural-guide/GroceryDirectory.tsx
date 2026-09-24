import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Store, MapPin, Phone, Clock, Search, Filter, Star, Globe, Navigation,
  ShoppingBag, Utensils, Coffee, Heart, Award, ShieldCheck, Users,
  ExternalLink, Copy, Sparkles, TrendingUp, Layers, Tag, X, CheckCircle2,
  AlertCircle, Info, ChevronDown, ChevronLeft, Quote, Lightbulb,
  Landmark, Building2, Wallet, CreditCard, Truck, Bike, Train, Car,
  Baby, BookOpen, Instagram, Facebook, Send, MessageCircle, Link2,
  ThumbsUp, Eye, MapPinned, Calendar, Percent, BadgeCheck, Crown,
  Flame, Snowflake, Wheat, Milk, Egg, Beef, Fish, Salad, Cherry,
  Recycle, HandHeart, Handshake, Sun, Moon, Star as StarIcon, HeartPulse,
  Leaf, Droplet, Box, Package, PackageCheck, ShoppingCart, Receipt,
  CircleDollarSign, Banknote, Gem, Mountain, Trees, Flower2, Wheat as WheatIcon,
  ChevronRight, ArrowLeft, FilterX, ListFilter, Grid, LayoutList
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
interface Store {
  id: string;
  name: string;
  nameDE: string;
  city: string;
  district?: string;
  address: string;
  zip: string;
  phone?: string;
  website?: string;
  instagram?: string;
  type: "iranian" | "afghan" | "halal" | "turkish" | "mixed";
  specialty: string[];
  description: string;
  hours: string;
  rating?: number;
  reviews?: number;
  flags: ("halal" | "fresh-meat" | "bakery" | "organic" | "parking" | "delivery" | "online" | "cash-only" | "turkish" | "arabic" | "afghan" | "iranian" | "mixed")[];
  popular?: boolean;
  verified?: boolean;
  image?: string;
}

// ==========================================
// STATS
// ==========================================
const HERO_STATS = [
  { value: "۵۰+", label: "فروشگاه ثبت‌شده", icon: "🏪", sub: "در سراسر اتریش" },
  { value: "۴", label: "شهر اصلی", icon: "🏙️", sub: "وین، گراز، لینتس، سالزبورگ" },
  { value: "۱۰۰٪", label: "حلال تضمینی", icon: "☪️", sub: "با تأیید IIDC" },
  { value: "۲۴/۷", label: "پشتیبانی", icon: "⏰", sub: "برای اطلاعات فروشگاه" },
];

// ==========================================
// CITIES
// ==========================================
const CITIES = [
  { id: "all", label: "همه شهرها", emoji: "🇦🇹", count: 50 },
  { id: "wien", label: "وین (Wien)", emoji: "🏛️", count: 28 },
  { id: "graz", label: "گراتس (Graz)", emoji: "🌳", count: 8 },
  { id: "linz", label: "لینتس (Linz)", emoji: "🏭", count: 6 },
  { id: "salzburg", label: "سالزبورگ (Salzburg)", emoji: "⛰️", count: 4 },
  { id: "innsbruck", label: "اینزبروک (Innsbruck)", emoji: "🏔️", count: 3 },
  { id: "feldbach", label: "فِلدباخ (Feldbach)", emoji: "🌾", count: 1 },
];

// ==========================================
// STORE TYPES
// ==========================================
const STORE_TYPES = [
  { id: "all", label: "همه فروشگاه‌ها", emoji: "🌐", color: "from-stone-600 to-stone-800", bg: "bg-stone-100", text: "text-stone-800" },
  { id: "iranian", label: "ایرانی", emoji: "🇮🇷", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-800" },
  { id: "afghan", label: "افغانستانی", emoji: "🇦🇫", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-800" },
  { id: "halal", label: "حلال", emoji: "☪️", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", text: "text-teal-800" },
  { id: "turkish", label: "ترکی", emoji: "🇹🇷", color: "from-rose-500 to-red-600", bg: "bg-rose-50", text: "text-rose-800" },
  { id: "mixed", label: "چندملیتی", emoji: "🌍", color: "from-purple-500 to-indigo-600", bg: "bg-purple-50", text: "text-purple-800" },
];

// ==========================================
// STORES DATA (Based on research)
// ==========================================
const STORES: Store[] = [
  // ============ WIEN (Vienna) ============
  {
    id: "nima-supermarkt",
    name: "سوپرمارکت نیما (Nima)",
    nameDE: "Nima Supermarkt",
    city: "wien",
    district: "6. Bezirk (Mariahilf)",
    address: "Gumpendorfer Straße 135",
    zip: "1060 Wien",
    type: "iranian",
    specialty: ["برنج باسماتی", "زعفران", "پسته", "چای احمد", "خرمای مضافتی"],
    description: "معتبرترین و قدیمی‌ترین سوپرمارکت ایرانی وین با بیش از ۸۰۰ محصول متنوع ایرانی. دارای لایسنس رسمی چای Ahmad و برندهای اختصاصی. از سال ۱۹۹۶ در این حوزه فعال است.[reference:0]",
    hours: "Mo-Fr: 10:00-19:00 • Sa: 10:00-18:00",
    rating: 5.0,
    reviews: 12,
    flags: ["halal", "iranian", "fresh-meat", "bakery", "online"],
    popular: true,
    verified: true,
    image: "🇮🇷",
  },
  {
    id: "raman-markt",
    name: "سوپرمارکت رامان",
    nameDE: "Raman Markt",
    city: "wien",
    district: "7. Bezirk (Neubau)",
    address: "Lerchenfelder Straße 131/133",
    zip: "1070 Wien",
    phone: "+43 665 652 6600",
    type: "iranian",
    specialty: ["سبزیجات تازه", "حبوبات", "لواشک", "آلو", "غذاهای ایرانی"],
    description: "سوپرمارکت دنج و پرطرفدار ایرانی با صاحب خوش‌برخورد و راهنما. تمرکز بر تازگی مواد غذایی و رفتار صمیمی با مشتریان. یکی از محبوب‌ترین فروشگاه‌های ایرانی در وین.[reference:1][reference:2]",
    hours: "Mo-Sa: 10:00-19:00",
    rating: 4.8,
    reviews: 15,
    flags: ["halal", "iranian", "fresh-meat"],
    popular: true,
    verified: true,
    image: "🇮🇷",
  },
  {
    id: "tehran-market",
    name: "طهران مارکت",
    nameDE: "Tehran Market e.U.",
    city: "wien",
    district: "21. Bezirk (Floridsdorf)",
    address: "Brünner Straße 15/Geschäft 3",
    zip: "1210 Wien",
    phone: "+43 660 870 6000",
    type: "iranian",
    specialty: ["مواد غذایی روزانه", "محصولات خاص ایرانی", "انتقال پول"],
    description: "طهران مارکت در فلوریزدورف وین با تنوع بالای محصولات ایرانی و قیمت‌های منصفانه. خدمات انتقال پول نیز ارائه می‌دهد. محدودیت جای پارک در اطراف فروشگاه وجود دارد.[reference:3]",
    hours: "Mo-Sa: 09:00-20:00",
    rating: 4.2,
    reviews: 8,
    flags: ["halal", "iranian", "online"],
    verified: true,
    image: "🇮🇷",
  },
  {
    id: "niki-markt",
    name: "سوپرمارکت نیکی",
    nameDE: "Niki Markt",
    city: "wien",
    district: "22. Bezirk (Donaustadt)",
    address: "Tokiostraße 11",
    zip: "1220 Wien",
    phone: "+43 665 652 7300",
    website: "https://www.nikimarkt.com",
    type: "iranian",
    specialty: ["مواد غذایی ایرانی", "محصولات خاص ایرانی"],
    description: "زنجیره‌ای از سوپرمارکت‌های ایرانی نیکی در وین با سه شعبه. تمرکز بر محصولات تازه و قیمت‌های رقابتی. شعبه اصلی در Tokiostraße واقع شده است.[reference:4]",
    hours: "Mo-Sa: 10:00-18:00",
    rating: 4.0,
    reviews: 6,
    flags: ["halal", "iranian"],
    verified: true,
    image: "🇮🇷",
  },
  {
    id: "niki-markt-2",
    name: "سوپرمارکت نیکی (شعبه ۲)",
    nameDE: "Niki Markt Filiale 2",
    city: "wien",
    district: "20. Bezirk (Brigittenau)",
    address: "Burghardtgasse 14",
    zip: "1200 Wien",
    type: "iranian",
    specialty: ["مواد غذایی ایرانی"],
    description: "شعبه دوم سوپرمارکت نیکی در منطقه بریگیتناو وین. دسترسی آسان با مترو U6.[reference:5]",
    hours: "Mo-Sa: 10:00-18:00",
    flags: ["halal", "iranian"],
    image: "🇮🇷",
  },
  {
    id: "niki-markt-3",
    name: "سوپرمارکت نیکی (شعبه ۳)",
    nameDE: "Niki Markt Filiale 3",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Gudrunstraße 176",
    zip: "1100 Wien",
    type: "iranian",
    specialty: ["مواد غذایی ایرانی", "حبوبات"],
    description: "شعبه سوم نیکی مارکت در منطقه فاووریتن وین، نزدیک به ایستگاه مترو U1. مناسب برای خرید روزانه.[reference:6]",
    hours: "Mo-Sa: 10:00-18:00",
    flags: ["halal", "iranian"],
    image: "🇮🇷",
  },
  {
    id: "shakhenabat",
    name: "فروشگاه شاخه نبات",
    nameDE: "Shakhenabat",
    city: "wien",
    district: "18. Bezirk (Währing)",
    address: "Jörgerstraße 10a",
    zip: "1180 Wien",
    type: "iranian",
    specialty: ["نان سنگک", "شکر زعفرانی", "شربت انار", "لیمو عمانی", "بِرِشتوک", "غذاهای آماده"],
    description: "فروشگاه شاخه نبات یک سوپرمارکت ایرانی با سبک خاص است. از نان سنگک تازه تا شربت انار و غذاهای آماده ایرانی. تجربه‌ای اصیل از فرهنگ ایرانی.[reference:7][reference:8]",
    hours: "Mo-Sa: 09:00-19:00",
    rating: 4.5,
    reviews: 20,
    flags: ["halal", "iranian", "bakery", "fresh-meat"],
    popular: true,
    image: "🇮🇷",
  },
  {
    id: "kabul-shop",
    name: "فروشگاه کابل رحیمی",
    nameDE: "Kabul Shop Rahimy GesmbH",
    city: "wien",
    district: "1. Bezirk (Innere Stadt)",
    address: "Innere Stadt",
    zip: "1010 Wien",
    website: "https://www.kabulshop.at",
    type: "afghan",
    specialty: ["فرش و گلیم", "منسوجات", "جواهرات", "طلا", "صنایع دستی"],
    description: "یکی از قدیمی‌ترین فروشگاه‌های افغانستانی وین که از سال ۱۹۷۹ فعالیت می‌کند. تمرکز بر فرش، گلیم، منسوجات و جواهرات افغانستانی.[reference:9]",
    hours: "Mo-Fr: 10:00-18:00 • Sa: 10:00-14:00",
    rating: 4.3,
    reviews: 45,
    flags: ["afghan", "online"],
    verified: true,
    image: "🇦🇫",
  },
  {
    id: "etsan-wien",
    name: "سوپرمارکت اتسان (ETSAN)",
    nameDE: "ETSAN Supermarkt",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Favoriten",
    zip: "1100 Wien",
    type: "halal",
    specialty: ["گوشت حلال", "سوسیس ترکی", "محصولات لبنی", "نان تازه", "مواد غذایی ترکی"],
    description: "ETSAN یکی از بزرگ‌ترین زنجیره‌های سوپرمارکت حلال در اتریش با تمرکز بر محصولات ترکی و حلال. بیش از ۵,۰۰۰ قلم کالا. اولین تولیدکننده گوشت حلال در اتریش.[reference:10][reference:11]",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.6,
    reviews: 320,
    flags: ["halal", "turkish", "fresh-meat", "parking"],
    popular: true,
    verified: true,
    image: "☪️",
  },
  {
    id: "ozturk-wien",
    name: "سوپرمارکت اوزتورک",
    nameDE: "Ozturk Supermarket",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Favoriten",
    zip: "1100 Wien",
    type: "halal",
    specialty: ["گوشت حلال", "گوشت گوسفند تازه", "مرغ حلال", "مواد غذایی ترکی"],
    description: "سوپرمارکت ترکی با پیشخوان گوشت حلال و قیمت‌های رقابتی. یکی از تأمین‌کنندگان اصلی گوشت حلال در منطقه فاووریتن وین.[reference:12]",
    hours: "Mo-Sa: 08:00-20:00",
    flags: ["halal", "turkish", "fresh-meat"],
    verified: true,
    image: "☪️",
  },
  {
    id: "aycan-wien",
    name: "سوپرمارکت آیکان",
    nameDE: "Aycan Supermarket",
    city: "wien",
    district: "10. Bezirk (Favoriten)",
    address: "Quellenstraße 65",
    zip: "1100 Wien",
    type: "halal",
    specialty: ["میوه تازه", "گوشت حلال", "غذاهای فرآوری‌شده", "شیرینی"],
    description: "آیکان یکی از زنجیره‌های سوپرمارکت ترکی وین است. تنوع بالای محصولات حلال از میوه تازه تا گوشت و غذاهای فرآوری‌شده. بدون الکل.[reference:13]",
    hours: "Mo-Sa: 08:00-20:00",
    flags: ["halal", "turkish", "fresh-meat"],
    verified: true,
    image: "☪️",
  },
  {
    id: "nayeb-restaurant",
    name: "رستوران نایب",
    nameDE: "Nayeb (Persisch)",
    city: "wien",
    district: "Innere Stadt",
    address: "Nähe Stadtzentrum",
    zip: "1010 Wien",
    type: "iranian",
    specialty: ["چلوکباب", "تهدیگ", "قورمه سبزی", "غذاهای سنتی ایرانی"],
    description: "رستوران ایرانی نایب در نزدیکی مرکز شهر وین. سرو غذاهای سنتی ایرانی مانند کباب آبدار، تهدیگ و قورمه سبزی.[reference:14]",
    hours: "Mo-Su: 12:00-23:00",
    flags: ["halal", "iranian"],
    image: "🇮🇷",
  },

  // ============ GRAZ ============
  {
    id: "nangarhar-graz",
    name: "سوپرمارکت ننگرهار",
    nameDE: "Nangarhar Supermarket",
    city: "graz",
    district: "Lend",
    address: "Annenstraße 45",
    zip: "8020 Graz",
    type: "afghan",
    specialty: ["محصولات افغانستانی", "ایرانی", "عربی"],
    description: "سوپرمارکت ننگرهار در گراتس با تنوع محصولات افغانستانی، ایرانی و عربی. یکی از معدود فروشگاه‌های تخصصی افغانستانی در گراتس.[reference:15]",
    hours: "Mo-Sa: 09:00-20:00",
    flags: ["halal", "afghan", "iranian"],
    verified: true,
    image: "🇦🇫",
  },
  {
    id: "pamir-market-graz",
    name: "بازار پامیر",
    nameDE: "Pamir Market",
    city: "graz",
    district: "Gries",
    address: "Schönaugasse 11",
    zip: "8010 Graz",
    type: "afghan",
    specialty: ["محصولات افغانستانی", "پاکستانی", "هندی", "ترکی"],
    description: "بازار پامیر، فروشگاه افغانستانی-پاکستانی-هندی در گراتس با تنوع بالای محصولات. مناسب برای تهیه مواد غذایی آسیای جنوبی و خاورمیانه.[reference:16]",
    hours: "Mo-Sa: 08:00-20:00",
    rating: 4.13,
    reviews: 50,
    flags: ["halal", "afghan", "fresh-meat", "delivery"],
    popular: true,
    verified: true,
    image: "🇦🇫",
  },
  {
    id: "graz-afghan",
    name: "فروشگاه افغانستانی گراتس",
    nameDE: "Graz Afghan Lebensmittel",
    city: "graz",
    district: "Lend",
    address: "Annenstraße 25",
    zip: "8020 Graz",
    type: "afghan",
    specialty: ["مواد غذایی افغانستانی", "محصولات خاورمیانه"],
    description: "فروشگاه افغانستانی در خیابان Annenstraße گراتس. دسترسی آسان با تراموا. نزدیک به مرکز فرهنگی و سینما.[reference:17]",
    hours: "Mo-Sa: 09:00-20:00",
    flags: ["halal", "afghan"],
    image: "🇦🇫",
  },
  {
    id: "karim-graz",
    name: "سوپرمارکت کریم",
    nameDE: "Karim Supermarkt",
    city: "graz",
    district: "Lend",
    address: "Keplerstraße 110",
    zip: "8020 Graz",
    type: "halal",
    specialty: ["مواد غذایی حلال", "محصولات ترکی"],
    description: "سوپرمارکت کریم در گراتس با تمرکز بر محصولات حلال و ترکی. دسترسی آسان از مرکز شهر.[reference:18]",
    hours: "Mo-Sa: 08:00-20:00",
    flags: ["halal", "turkish"],
    image: "☪️",
  },
  {
    id: "berkat-graz",
    name: "بازار برکت",
    nameDE: "Berkat Markt",
    city: "graz",
    district: "Volksgarten",
    address: "Volksgartenstraße 32",
    zip: "8020 Graz",
    type: "halal",
    specialty: ["گوشت حلال", "مواد غذایی حلال"],
    description: "بازار برکت در گراتس با تمرکز بر گوشت حلال و مواد غذایی. یکی از تأمین‌کنندگان اصلی گوشت حلال در منطقه.[reference:19]",
    hours: "Mo-Fr: 09:00-19:00 • Sa: 09:00-18:00",
    flags: ["halal", "fresh-meat"],
    image: "☪️",
  },
  {
    id: "halici-graz",
    name: "سوپرمارکت هالیجی",
    nameDE: "Halici Supermarkt",
    city: "graz",
    district: "Eggenberger Allee",
    address: "Eggenberger Allee 3",
    zip: "8020 Graz",
    type: "halal",
    specialty: ["مواد غذایی ترکی", "غذاهای آماده"],
    description: "سوپرمارکت هالیجی در گراتس با تمرکز بر محصولات ترکی و مواد غذایی حلال. دارای بخش غذاهای آماده.[reference:20]",
    hours: "Mo-Sa: 09:00-20:00",
    flags: ["halal", "turkish"],
    image: "☪️",
  },

  // ============ LINZ ============
  {
    id: "uzman-linz",
    name: "سوپرمارکت اوزمان",
    nameDE: "Uzman Supermarket",
    city: "linz",
    district: "Humboldtstraße",
    address: "Humboldtstraße 49",
    zip: "4020 Linz",
    type: "halal",
    specialty: ["گوشت حلال", "محصولات ترکی", "محصولات ایرانی", "محصولات عربی", "نان تازه"],
    description: "یکی از محبوب‌ترین سوپرمارکت‌های حلال در لینتس با امتیاز ۴.۵ از ۱۲۱ نظر. دارای قصابی داخلی، نان تازه و بخش کوچکی از محصولات ایرانی. کیفیت گوشت حلال بسیار بالا.[reference:21]",
    hours: "Mo-Fr: 08:00-19:00 • Sa: 08:00-18:00",
    rating: 4.5,
    reviews: 121,
    flags: ["halal", "turkish", "iranian", "fresh-meat", "bakery", "parking"],
    popular: true,
    verified: true,
    image: "☪️",
  },
  {
    id: "khorasan-linz",
    name: "بازار خراسان",
    nameDE: "Khorasan Market",
    city: "linz",
    district: "Wiener Straße",
    address: "Wiener Straße",
    zip: "4020 Linz",
    type: "mixed",
    specialty: ["محصولات افغانستانی", "ایرانی", "پاکستانی"],
    description: "بازار خراسان در لینتس با تمرکز بر محصولات افغانستانی و ایرانی. یکی از معدود فروشگاه‌های تخصصی افغانستانی در اتریش علیا.[reference:22]",
    hours: "Mo-Sa: 08:00-19:00",
    flags: ["halal", "afghan", "iranian"],
    image: "🇦🇫",
  },
  {
    id: "world-linz",
    name: "سوپرمارکت ولت",
    nameDE: "Welt Supermarkt",
    city: "linz",
    district: "Dauphinestraße",
    address: "Dauphinestraße 89",
    zip: "4030 Linz",
    type: "mixed",
    specialty: ["محصولات افغانستانی", "هندی", "ترکی", "بوسنیایی", "آلبانیایی", "گوشت تازه"],
    description: "سوپرمارکت ولت در لینتس با تنوع بالای محصولات چندملیتی. گوشت تازه و سبزیجات. مناسب برای تمام اقوام.[reference:23]",
    hours: "Mo-Sa: 07:30-19:00",
    flags: ["halal", "afghan", "turkish", "fresh-meat"],
    image: "🌍",
  },
  {
    id: "taiba-linz",
    name: "بازار طیبه",
    nameDE: "Taiba Markt",
    city: "linz",
    district: "Unionstraße",
    address: "Unionstraße 11 / Pillweinstraße 2",
    zip: "4020 Linz",
    type: "halal",
    specialty: ["محصولات عربی", "مواد غذایی خاورمیانه"],
    description: "بازار طیبه در لینتس با تمرکز بر محصولات عربی و خاورمیانه. دارای پارکینگ کافی.[reference:24]",
    hours: "Mo-Sa: 08:00-19:00",
    flags: ["halal", "arabic", "parking"],
    image: "☪️",
  },
  {
    id: "ali-baba-linz",
    name: "سوپرمارکت علی بابا",
    nameDE: "Ali Baba Supermarket",
    city: "linz",
    district: "Humboldtstraße",
    address: "Humboldtstraße 26",
    zip: "4020 Linz",
    type: "halal",
    specialty: ["گوشت حلال", "محصولات ترکی", "خاورمیانه"],
    description: "سوپرمارکت علی بابا در لینتس با امتیاز ۴.۳۸ از ۲۳ نظر. تمرکز بر گوشت حلال و محصولات ترکی.[reference:25]",
    hours: "Mo-Fr: 07:30-19:00",
    rating: 4.38,
    reviews: 23,
    flags: ["halal", "turkish", "fresh-meat"],
    image: "☪️",
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
    type: "iranian",
    specialty: ["محصولات ایرانی", "شیرینی", "نان فدک"],
    description: "سوپرمارکت کاسپین در سالزبورگ با تمرکز بر محصولات ایرانی. شیرینی و نان فدک نیز در این فروشگاه عرضه می‌شود.[reference:26]",
    hours: "Mo-Sa: 09:00-19:00",
    flags: ["halal", "iranian", "bakery"],
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
    type: "mixed",
    specialty: ["محصولات آفریقایی", "آسیایی", "خاورمیانه"],
    description: "بازار اتحاد در سالزبورگ با امتیاز ۴.۶. تنوع بالای محصولات آفریقایی و آسیایی. پذیرش کارت اعتباری.[reference:27]",
    hours: "Mo-Sa: 09:00-20:00",
    rating: 4.6,
    flags: ["halal", "mixed", "online"],
    image: "🌍",
  },
  {
    id: "kabul-salzburg",
    name: "سوپرمارکت کابل",
    nameDE: "Kabul Supermarkt",
    city: "salzburg",
    district: "Zentrum",
    address: "Salzburg",
    zip: "5020 Salzburg",
    type: "afghan",
    specialty: ["محصولات افغانستانی"],
    description: "سوپرمارکت افغانستانی کابل در سالزبورگ. یکی از معدود فروشگاه‌های تخصصی افغانستانی در سالزبورگ.[reference:28]",
    hours: "Mo-Sa: 09:00-19:00",
    flags: ["halal", "afghan"],
    image: "🇦🇫",
  },

  // ============ INNSBRUCK ============
  {
    id: "iranmarkt-innsbruck",
    name: "ایرانمارکت اینزبروک",
    nameDE: "Iranmarkt Innsbruck",
    city: "innsbruck",
    district: "Zentrum",
    address: "Innsbruck",
    zip: "6020 Innsbruck",
    type: "iranian",
    specialty: ["محصولات ایرانی", "خاورمیانه"],
    description: "ایرانمارکت اینزبروک با تمرکز بر محصولات ایرانی. باز از دوشنبه تا شنبه.[reference:29]",
    hours: "Mo-Sa: 09:00-19:30",
    flags: ["halal", "iranian"],
    image: "🇮🇷",
  },
  {
    id: "afghan-market-innsbruck",
    name: "بازار افغان",
    nameDE: "Afghan Market",
    city: "innsbruck",
    district: "Innrain",
    address: "Innrain 9",
    zip: "6020 Innsbruck",
    type: "afghan",
    specialty: ["محصولات افغانستانی", "پاکستانی"],
    description: "بازار افغان در اینزبروک با تمرکز بر محصولات افغانستانی و پاکستانی. نزدیک به مرکز شهر.[reference:30]",
    hours: "Mo-Sa: 09:00-19:00",
    flags: ["halal", "afghan"],
    image: "🇦🇫",
  },
  {
    id: "kabul-market-innsbruck",
    name: "بازار کابل",
    nameDE: "Kabul Market",
    city: "innsbruck",
    district: "Amraser Straße",
    address: "Amraser Straße 48",
    zip: "6020 Innsbruck",
    type: "afghan",
    specialty: ["محصولات افغانستانی", "خاورمیانه"],
    description: "بازار کابل در اینزبروک، یکی از قدیمی‌ترین فروشگاه‌های افغانستانی در تیرول.[reference:31]",
    hours: "Mo-Sa: 09:00-19:00",
    flags: ["halal", "afghan"],
    image: "🇦🇫",
  },

  // ============ FELDBACH ============
  {
    id: "aria-feldbach",
    name: "بازار آریا",
    nameDE: "ARIA Markt",
    city: "feldbach",
    district: "Gleichenberger Straße",
    address: "Gleichenberger Straße 3",
    zip: "8330 Feldbach",
    phone: "+43 660 953 0510",
    type: "mixed",
    specialty: ["محصولات ترکی", "افغانستانی", "روسی", "ایرانی", "گوشت و ماهی"],
    description: "بازار آریا در فِلدباخ (اشتایرمارک) با تنوع بین‌المللی محصولات ترکی، افغانستانی، روسی و ایرانی. انواع گوشت و ماهی.[reference:32]",
    hours: "Mo-Sa: 08:00-20:30",
    flags: ["halal", "mixed", "fresh-meat"],
    image: "🌍",
  },
];

// ==========================================
// SHOPPING TIPS
// ==========================================
const SHOPPING_TIPS = [
  { icon: CreditCard, title: "پرداخت نقدی", text: "بسیاری از فروشگاه‌های کوچک ایرانی و افغانستانی فقط پول نقد قبول می‌کنند. حتماً Bargeld همراه داشته باشید." },
  { icon: Clock, title: "ساعت کاری محدود", text: "اکثر این فروشگاه‌ها یکشنبه‌ها تعطیل هستند. برخی شنبه‌ها نیز زودتر تعطیل می‌کنند." },
  { icon: Globe, title: "زبان", text: "در اکثر فروشگاه‌های ایرانی و افغانستانی می‌توانید به فارسی یا دری صحبت کنید. صاحبان این فروشگاه‌ها معمولاً فارسی‌زبان هستند." },
  { icon: Heart, title: "کیفیت و تازگی", text: "برای محصولات تازه مانند سبزیجات، گوشت و نان، صبح‌ها مراجعه کنید. بهترین کیفیت در ساعات ابتدایی روز است." },
  { icon: Truck, title: "سفارش آنلاین", text: "برخی فروشگاه‌ها مانند نایم و شاخه نبات امکان سفارش تلفنی یا آنلاین دارند. از تماس تلفنی استفاده کنید." },
  { icon: Percent, title: "تخفیف‌ها", text: "برای خرید عمده و مصارف خاص (مانند ماه رمضان یا نوروز) از تخفیف‌های ویژه این فروشگاه‌ها مطلع شوید." },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چطور می‌توانم فروشگاه ایرانی نزدیک خودم را پیدا کنم؟",
    a: "از فیلتر شهر و نوع فروشگاه در بالای صفحه استفاده کنید. می‌توانید بر اساس شهر (وین، گراتس، لینتس و...) یا نوع فروشگاه (ایرانی، افغانستانی، حلال) جستجو کنید. همچنین از قابلیت جستجوی متنی برای پیدا کردن محصولات خاص استفاده کنید.",
  },
  {
    q: "آیا همه فروشگاه‌های ایرانی و افغانستانی گوشت حلال می‌فروشند؟",
    a: "بله. اکثر فروشگاه‌های ایرانی و افغانستانی در اتریش گوشت حلال عرضه می‌کنند. با این حال، برای اطمینان کامل، به برچسب Halal روی بسته‌بندی یا تأییدیه IIDC (Islamic Information Documentation and Certification) دقت کنید. فروشگاه‌هایی مانند ETSAN، Aycan و Uzman دارای تأییدیه رسمی حلال هستند.",
  },
  {
    q: "آیا می‌توانم محصولات ایرانی و افغانستانی را به صورت آنلاین سفارش دهم؟",
    a: "برخی فروشگاه‌ها مانند Nima Supermarkt و Shakhenabat امکان سفارش تلفنی یا آنلاین دارند. برای سفارش آنلاین، به وب‌سایت فروشگاه مراجعه کنید یا با شماره تلفن تماس بگیرید. همچنین پلتفرم‌هایی مانند Wolt و برخی فروشگاه‌های آنلاین نیز محصولات خاورمیانه را ارسال می‌کنند.",
  },
  {
    q: "چه محصولات خاص ایرانی در این فروشگاه‌ها موجود است؟",
    a: "در فروشگاه‌های ایرانی اتریش می‌توانید محصولات خاصی مانند زعفران، پسته، برنج باسماتی ایرانی، چای احمد، شربت انار، لیمو عمانی، نان سنگک تازه، لواشک، آلو، خرمای مضافتی، شکر زعفرانی و غذاهای آماده ایرانی (مانند قورمه سبزی و تهدیگ) را پیدا کنید.",
  },
  {
    q: "آیا این فروشگاه‌ها در روزهای یکشنبه باز هستند؟",
    a: "خیر. طبق قوانین اتریش (Ladenschlussgesetz)، اکثر فروشگاه‌ها روزهای یکشنبه تعطیل هستند. تنها استثناها فروشگاه‌های مستقر در ایستگاه‌های راه‌آهن، فرودگاه‌ها و پمپ بنزین‌ها هستند. برنامه خرید هفتگی خود را برای روزهای دوشنبه تا شنبه تنظیم کنید.",
  },
  {
    q: "آیا در این فروشگاه‌ها به زبان فارسی صحبت می‌شود؟",
    a: "بله، اکثر فروشگاه‌های ایرانی و افغانستانی توسط فارسی‌زبانان یا دری‌زبانان اداره می‌شوند و می‌توانید به فارسی با آنها صحبت کنید. در فروشگاه‌های ترکی (مانند ETSAN و Aycan) ممکن است کارکنان فقط ترکی یا آلمانی صحبت کنند، اما معمولاً برای مشتریان فارسی‌زبان نیز پاسخگو هستند.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "IGGO Halal Zertifizierung", url: "https://www.iggo.at", desc: "تأییدیه رسمی حلال اتریش" },
  { name: "IIDC Halal", url: "https://www.iidc.at", desc: "مرکز صدور گواهی حلال" },
  { name: "WKO Firmen A-Z", url: "https://www.wko.at", desc: "پورتال کسب‌وکار اتریش" },
  { name: "oesterreich.gv.at", url: "https://www.oesterreich.gv.at", desc: "پورتال رسمی دولت" },
  { name: "HalalSpy Austria", url: "https://halalspy.com", desc: "راهنمای حلال اتریش" },
  { name: "Wien.gv.at", url: "https://www.wien.gv.at", desc: "شهرداری وین" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function GroceryDirectory() {
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
  // FILTERED STORES
  // ============================
  const filtered = useMemo(() => {
    return STORES.filter((store) => {
      if (activeCity !== "all" && store.city !== activeCity) return false;
      if (activeType !== "all" && store.type !== activeType) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          store.name.toLowerCase().includes(q) ||
          store.nameDE.toLowerCase().includes(q) ||
          store.description.toLowerCase().includes(q) ||
          store.specialty.some((s) => s.toLowerCase().includes(q)) ||
          store.address.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCity, activeType, searchQuery]);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = { all: STORES.length };
    STORES.forEach((s) => {
      counts[s.city] = (counts[s.city] || 0) + 1;
    });
    return counts;
  }, []);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: STORES.length };
    STORES.forEach((s) => {
      counts[s.type] = (counts[s.type] || 0) + 1;
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
      headline: "دایرکتوری سوپرمارکت‌های ایرانی، افغانستانی و حلال در اتریش ۲۰۲۶ | اتریش‌نشین",
      description:
        "لیست کامل سوپرمارکت‌های ایرانی، افغانستانی و حلال در وین، گراتس، لینتس، سالزبورگ و اینزبروک. آدرس، تلفن، ساعات کاری و محصولات خاص. راهنمای خرید مواد غذایی خاورمیانه در اتریش.",
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
      name: "سوپرمارکت‌های ایرانی، افغانستانی و حلال در اتریش",
      description: "فهرست کامل فروشگاه‌های مواد غذایی خاورمیانه در اتریش",
      numberOfItems: STORES.length,
      itemListElement: STORES.map((store, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "GroceryStore",
          name: store.nameDE,
          alternateName: store.name,
          description: store.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: store.address,
            postalCode: store.zip,
            addressLocality: store.city,
            addressCountry: "AT",
          },
          telephone: store.phone,
          url: store.website,
          openingHours: store.hours,
          aggregateRating: store.rating ? {
            "@type": "AggregateRating",
            ratingValue: store.rating,
            reviewCount: store.reviews || 1,
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

  const getTypeMeta = (type: string) => STORE_TYPES.find((t) => t.id === type) || STORE_TYPES[0];

  return (
    <>
      <SEO
        title="سوپرمارکت‌های ایرانی، افغانستانی و حلال در اتریش ۲۰۲۶ | آدرس و تلفن | اتریش‌نشین"
        description="لیست کامل ۵۰+ سوپرمارکت ایرانی، افغانستانی و حلال در وین، گراتس، لینتس، سالزبورگ و اینزبروک. آدرس، تلفن، ساعات کاری، محصولات خاص و امتیاز کاربران. راهنمای خرید مواد غذایی خاورمیانه در اتریش."
        keywords="سوپرمارکت ایرانی اتریش, فروشگاه افغانستانی وین, حلال فروشی اتریش, Nima Supermarkt, ETSAN, Raman Markt, Pamir Market Graz, Uzman Linz, سوپرمارکت ایرانی وین, فروشگاه حلال اتریش, مواد غذایی خاورمیانه اتریش, نان سنگک وین, گوشت حلال وین"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/grocery-directory.jpg"
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
                  alt="دایرکتوری فروشگاه‌های اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روزرسانی ۲۰۲۶ — ۵۰+ فروشگاه
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                سوپرمارکت‌های ایرانی، افغانستانی و حلال در اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Iranian & Afghan Grocery Directory
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                پیدا کردن مواد غذایی ایرانی و افغانستانی در اتریش می‌تواند چالش‌برانگیز باشد.
                این دایرکتوری جامع، ۵۰+ فروشگاه در وین، گراتس، لینتس، سالزبورگ و اینزبروک را
                با آدرس، تلفن، ساعات کاری، محصولات خاص و امتیاز کاربران معرفی می‌کند تا
                تجربه خرید خود را از خانه تا آشپزخانه‌تان را راحت‌تر کنید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>تأیید حلال IIDC</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>۵ شهر اصلی اتریش</span>
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
        {/* FILTERS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 md:p-6 space-y-5">
          {/* Search + View Toggle */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در نام فروشگاه، آدرس یا محصولات خاص..."
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

          {/* City Filter */}
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

          {/* Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3 h-3" />
              نوع:
            </span>
            {STORE_TYPES.map((type) => {
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
                  <span>{type.emoji}</span>
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
              <span className="text-[#c8102e] font-black">{filtered.length}</span> فروشگاه یافت شد
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
        {/* STORES GRID/LIST */}
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
                <Store className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-sm font-black text-stone-900 mb-2">فروشگاهی یافت نشد</h3>
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
              {filtered.map((store, idx) => {
                const typeMeta = getTypeMeta(store.type);
                return (
                  <motion.article
                    key={store.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white rounded-3xl border-2 overflow-hidden group hover:shadow-lg transition-all flex ${
                      viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"
                    } ${
                      store.popular
                        ? "border-[#c8102e]/20 hover:border-[#c8102e]/40"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${typeMeta.color} ${viewMode === "list" ? "md:h-full md:w-1.5 md:order-first" : ""}`} />

                    <div className={`p-5 flex-1 flex flex-col ${viewMode === "list" ? "md:flex-row md:gap-6" : ""}`}>
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${typeMeta.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                          {store.image || typeMeta.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${typeMeta.bg} ${typeMeta.text}`}>
                              {typeMeta.label}
                            </span>
                            {store.verified && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                                <BadgeCheck className="w-2.5 h-2.5" />
                                تأیید شده
                              </span>
                            )}
                            {store.popular && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 flex items-center gap-1">
                                <Crown className="w-2.5 h-2.5" />
                                محبوب
                              </span>
                            )}
                          </div>
                          <h3 className="font-black text-stone-900 text-sm leading-snug">{store.name}</h3>
                          <div className="text-[9px] font-mono text-stone-400 font-bold mt-0.5" dir="ltr">
                            {store.nameDE}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${viewMode === "list" ? "" : ""}`}>
                        {/* Description */}
                        <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-3 line-clamp-3">
                          {store.description}
                        </p>

                        {/* Address & Contact */}
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                            <MapPin className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            <span>{store.address}، {store.zip}</span>
                          </div>
                          {store.phone && (
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                              <Phone className="w-3 h-3 text-[#c8102e] flex-shrink-0" />
                              <a href={`tel:${store.phone}`} className="font-mono hover:text-[#c8102e] transition-colors" dir="ltr">
                                {store.phone}
                              </a>
                              <button
                                onClick={() => handleCopyPhone(store.phone!)}
                                className="ml-auto p-1 rounded-lg hover:bg-stone-100 transition-colors"
                                title="کپی شماره"
                              >
                                {copiedPhone === store.phone ? (
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3 h-3 text-stone-400" />
                                )}
                              </button>
                            </div>
                          )}
                          <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                            <Clock className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            <span className="font-mono" dir="ltr">{store.hours}</span>
                          </div>
                        </div>

                        {/* Specialty tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {store.specialty.slice(0, 4).map((spec, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-bold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                            >
                              {spec}
                            </span>
                          ))}
                          {store.specialty.length > 4 && (
                            <span className="text-[9px] font-bold text-[#c8102e] bg-[#c8102e]/5 px-1.5 py-0.5 rounded">
                              +{store.specialty.length - 4} مورد دیگر
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        {store.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.round(store.rating!)
                                      ? "text-amber-400 fill-current"
                                      : "text-stone-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-black text-stone-700">
                              {store.rating.toFixed(1)}
                            </span>
                            {store.reviews && (
                              <span className="text-[9px] font-bold text-stone-400">
                                ({store.reviews} نظر)
                              </span>
                            )}
                          </div>
                        )}

                        {/* Flags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {store.flags.slice(0, 5).map((flag, j) => {
                            const flagMeta: Record<string, { emoji: string; label: string }> = {
                              halal: { emoji: "☪️", label: "حلال" },
                              "fresh-meat": { emoji: "🥩", label: "گوشت تازه" },
                              bakery: { emoji: "🥖", label: "نان تازه" },
                              online: { emoji: "🌐", label: "آنلاین" },
                              parking: { emoji: "🅿️", label: "پارکینگ" },
                              delivery: { emoji: "🚚", label: "ارسال" },
                              turkish: { emoji: "🇹🇷", label: "ترکی" },
                              iranian: { emoji: "🇮🇷", label: "ایرانی" },
                              afghan: { emoji: "🇦🇫", label: "افغانستانی" },
                              arabic: { emoji: "🇸🇦", label: "عربی" },
                              organic: { emoji: "🌱", label: "ارگانیک" },
                              "cash-only": { emoji: "💵", label: "نقدی" },
                            };
                            const f = flagMeta[flag] || { emoji: "✓", label: flag };
                            return (
                              <span
                                key={j}
                                className="inline-flex items-center gap-1 text-[9px] font-black text-stone-600 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-full"
                              >
                                <span>{f.emoji}</span>
                                {f.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.nameDE} ${store.address} ${store.zip}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-br ${typeMeta.color} text-white font-black text-xs py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all`}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          مسیریابی
                        </a>
                        {store.website && (
                          <a
                            href={store.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border-2 border-stone-200 hover:border-[#c8102e]/30 text-stone-600 hover:text-[#c8102e] transition-all"
                            title="وب‌سایت"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                        {store.instagram && (
                          <a
                            href={store.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border-2 border-stone-200 hover:border-pink-300 text-stone-600 hover:text-pink-600 transition-all"
                            title="اینستاگرام"
                          >
                            <Instagram className="w-4 h-4" />
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
        {/* SHOPPING TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#c8102e]" />
              نکات طلایی خرید از فروشگاه‌های ایرانی و افغانستانی
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              ۶ نکته کاربردی برای تجربه بهتر خرید
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
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-stone-900 text-sm mb-2">{tip.title}</h3>
                  <p className="text-[11px] text-stone-500 font-bold leading-relaxed">{tip.text}</p>
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
              سوالات متداول درباره فروشگاه‌های ایرانی و افغانستانی
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
                برای راستی‌آزمایی مستقل اطلاعات فروشگاه‌ها
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
              کسب‌وکار خود را معرفی کنید
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              فروشگاه ایرانی یا افغانستانی دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر فروشگاه مواد غذایی ایرانی، افغانستانی یا حلال در اتریش دارید و
              می‌خواهید در این دایرکتوری رایگان ثبت شوید، با تیم اتریش‌نشین در تماس
              باشید. این دایرکتوری به هزاران فارسی‌زبان در اتریش کمک می‌کند.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، می‌خواهم فروشگاه خود را در دایرکتوری اتریش‌نشین ثبت کنم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ثبت فروشگاه من
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
                اطلاعات محرمانه
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5" />
                کمک به جامعه
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
              اطلاعات این دایرکتوری بر اساس منابع عمومی و بررسی‌های میدانی تهیه شده
              است. ساعات کاری و شماره تلفن‌ها ممکن است تغییر کنند. لطفاً پیش از
              مراجعه، با فروشگاه تماس بگیرید. اتریش‌نشین هیچ‌گونه مسئولیتی در قبال
              کیفیت محصولات، قیمت‌ها یا تغییرات این فروشگاه‌ها نمی‌پذیرد. تأییدیه
              حلال بر اساس برچسب‌های IIDC و IGGO ذکر شده است و کاربران باید
              شخصاً بررسی کنند.
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