import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin, MapPinned, Building2, Users, Train, ShieldCheck, Home,
  Sparkles, CheckCircle, Star, TrendingUp, Award, Heart, Zap,
  Globe, Rocket, Handshake, ChevronDown, ChevronLeft, Clock, Info,
  Wallet, PieChart, BookOpen, Target, AlertTriangle, Quote, Euro,
  Landmark, Baby, GraduationCap, Briefcase, TreePine, Coffee, Music,
  ShoppingBag, Leaf, Sun, Moon, Compass, Navigation, Route,
  Crown, Trophy, Filter, Layers, LayoutGrid, Search, X, ChevronRight,
  School, Hospital, Store, Bus, Bike, Car
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_OVERVIEW = "https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?w=1200&q=80";

// ==========================================
// VIENNA DISTRICTS (23 Bezirke)
// ==========================================
interface District {
  id: string;
  number: string;
  name: string;
  englishName: string;
  zone: "inner" | "outer" | "danube";
  tagline: string;
  description: string;
  gradient: string;
  bg: string;
  text: string;
  image: string;
  rentLevel: 1 | 2 | 3;
  familyScore: 1 | 2 | 3;
  nightlifeScore: 1 | 2 | 3;
  transportScore: 1 | 2 | 3;
  bestFor: string[];
  highlights: string[];
  watchOut: string;
  badge?: string;
  badgeIcon?: any;
}

const VIENNA_DISTRICTS: District[] = [
  // ===== INNER ZONE (1-9) =====
  {
    id: "d1",
    number: "۱",
    name: "اینره اشتات",
    englishName: "Innere Stadt",
    zone: "inner",
    tagline: "قلب تاریخی و اداری وین",
    description: "مرکز تاریخی وین با کاخ هافبورگ، کلیسای جامع سنت اشتفان و خیابان‌های لوکس. منطقه‌ای برای سکونت اشرافی و دفاتر رسمی.",
    gradient: "from-amber-500 to-yellow-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    rentLevel: 3,
    familyScore: 2,
    nightlifeScore: 3,
    transportScore: 3,
    bestFor: ["سرمایه‌گذاران", "توریست‌ها", "دفاتر رسمی"],
    highlights: ["هافبورگ", "اشتفان‌پلاتز", "خیابان گرابن"],
    watchOut: "اجاره‌های بسیار بالا و کمبود مسکن",
    badge: "تاریخی",
    badgeIcon: Crown,
  },
  {
    id: "d2",
    number: "۲",
    name: "لئوپولداشتات",
    englishName: "Leopoldstadt",
    zone: "inner",
    tagline: "محله یهودیان سابق، متنوع امروز",
    description: "منطقه‌ای با ترکیب جمعیتی متنوع، پارک پراتر، و کافه‌های بوهمی. یکی از پویاترین مناطق وین برای جوانان.",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
    image: "https://images.unsplash.com/photo-1583125814814-32a04c2f10bf?w=800&q=80",
    rentLevel: 2,
    familyScore: 2,
    nightlifeScore: 3,
    transportScore: 3,
    bestFor: ["جوانان", "خانواده‌های جوان", "هنرمندان"],
    highlights: ["پارک پراتر", "خیابان Taborstraße", "Karmelitermarkt"],
    watchOut: "برخی محلات کمتر امن در شب",
    badge: "متنوع",
    badgeIcon: Sparkles,
  },
  {
    id: "d3",
    number: "۳",
    name: "لانداشتراسه",
    englishName: "Landstraße",
    zone: "inner",
    tagline: "محله سفرا و دیپلمات‌ها",
    description: "منطقه‌ای امن و شیک در نزدیکی مرکز، میزبان سفارتخانه‌ها و اقامتگاه‌های دیپلماتیک. کاخ بلودر در این منطقه است.",
    gradient: "from-indigo-500 to-purple-600",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    image: "https://images.unsplash.com/photo-1580745086518-84e4f6ce1c9d?w=800&q=80",
    rentLevel: 3,
    familyScore: 3,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["خانواده‌ها", "دیپلمات‌ها", "کارمندان مرکز"],
    highlights: ["کاخ بلودر", "خیابان Landstraßer Hauptstraße"],
    watchOut: "قیمت‌های مسکن بالا",
    badge: "لوکس",
    badgeIcon: Award,
  },
  {
    id: "d4",
    number: "۴",
    name: "ویدن",
    englishName: "Wieden",
    zone: "inner",
    tagline: "محله هنری و بازار Naschmarkt",
    description: "منطقه‌ای کوچک اما پویا با بازار معروف Naschmarkt و صحنه هنری قوی. اقامتگاه تاریخی بسیاری از هنرمندان.",
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "bg-fuchsia-50",
    text: "text-fuchsia-700",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
    rentLevel: 3,
    familyScore: 2,
    nightlifeScore: 3,
    transportScore: 3,
    bestFor: ["هنرمندان", "جوانان", "دانشجویان"],
    highlights: ["بازار Naschmarkt", "Karlskirche", "Theater an der Wien"],
    watchOut: "شلوغی و سر و صدا در اطراف بازار",
    badge: "هنری",
    badgeIcon: Music,
  },
  {
    id: "d5",
    number: "۵",
    name: "مارگارتن",
    englishName: "Margareten",
    zone: "inner",
    tagline: "منطقه‌ای چندفرهنگی و مقرون‌به‌صرفه",
    description: "منطقه‌ای متنوع و چندفرهنگی، گزینه‌ای اقتصادی برای زندگی در نزدیکی مرکز وین. کافه‌ها و رستوران‌های متنوع.",
    gradient: "from-teal-500 to-cyan-600",
    bg: "bg-teal-50",
    text: "text-teal-700",
    image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&q=80",
    rentLevel: 2,
    familyScore: 2,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["مهاجران", "خانواده‌های جوان", "دانشجویان"],
    highlights: ["خیابان Reinprechtsdorfer", "پارک Bruno-Kreisky"],
    watchOut: "نسبتاً شلوغ و پرتراکم",
    badge: "چندفرهنگی",
    badgeIcon: Globe,
  },
  {
    id: "d6",
    number: "۶",
    name: "ماریاهیلف",
    englishName: "Mariahilf",
    zone: "inner",
    tagline: "خیابان خرید و زندگی شهری",
    description: "خانه خیابان خرید معروف Mariahilfer Straße، منطقه‌ای پرجنب‌وجوش و مدرن با دسترسی عالی به تمام امکانات شهری.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    rentLevel: 2,
    familyScore: 2,
    nightlifeScore: 3,
    transportScore: 3,
    bestFor: ["جوانان", "خریداران", "زوج‌های جوان"],
    highlights: ["Mariahilfer Straße", "Haus des Meeres"],
    watchOut: "سر و صدا و شلوغی خیابان اصلی",
    badge: "خرید",
    badgeIcon: ShoppingBag,
  },
  {
    id: "d7",
    number: "۷",
    name: "نوی‌باو",
    englishName: "Neubau",
    zone: "inner",
    tagline: "محله هیپستر وین",
    description: "پایتخت خلاقیت وین با گالری‌ها، بوتیک‌های مستقل و کافه‌های تخصصی. منطقه‌ای برای افراد با سبک زندگی مدرن.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
    image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?w=800&q=80",
    rentLevel: 3,
    familyScore: 2,
    nightlifeScore: 3,
    transportScore: 3,
    bestFor: ["هنرمندان", "فریلنسرها", "جوانان"],
    highlights: ["موزه‌کوارتیر", "Spittelberg", "Kirchengasse"],
    watchOut: "اجاره‌های بالای آپارتمان‌های کوچک",
    badge: "هیپ",
    badgeIcon: Sparkles,
  },
  {
    id: "d8",
    number: "۸",
    name: "یوزف‌اشتات",
    englishName: "Josefstadt",
    zone: "inner",
    tagline: "کوچک‌ترین منطقه وین، آرام و فرهنگی",
    description: "کوچک‌ترین منطقه وین اما یکی از جذاب‌ترین‌ها. خیابان‌های باریک، تئاترها و کافه‌های سنتی در فضایی آرام.",
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    image: "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=800&q=80",
    rentLevel: 3,
    familyScore: 3,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["خانواده‌ها", "افراد آرام‌دوست", "فرهنگی‌ها"],
    highlights: ["تئاتر Josefstadt", "خیابان Lange Gasse"],
    watchOut: "قیمت‌های بالا و کوچک بودن منطقه",
    badge: "آرام",
    badgeIcon: Leaf,
  },
  {
    id: "d9",
    number: "۹",
    name: "آلزرگروند",
    englishName: "Alsergrund",
    zone: "inner",
    tagline: "منطقه دانشگاهی و پزشکی",
    description: "خانه دانشگاه وین، بیمارستان عمومی (AKH) و مراکز تحقیقاتی. منطقه‌ای برای دانشجویان و کارکنان حوزه سلامت.",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["دانشجویان", "پزشکان", "کارکنان دانشگاه"],
    highlights: ["دانشگاه وین", "بیمارستان AKH", "Votivkirche"],
    watchOut: "بازار مسکن رقابتی برای دانشجویان",
    badge: "دانشگاهی",
    badgeIcon: GraduationCap,
  },

  // ===== OUTER ZONE (10-19) =====
  {
    id: "d10",
    number: "۱۰",
    name: "فاووریتن",
    englishName: "Favoriten",
    zone: "outer",
    tagline: "پرتراکم‌ترین منطقه وین",
    description: "بزرگ‌ترین و پرجمعیت‌ترین منطقه وین با ترکیب جمعیتی متنوع. گزینه‌ای اقتصادی برای شروع زندگی در وین.",
    gradient: "from-slate-500 to-gray-600",
    bg: "bg-slate-50",
    text: "text-slate-700",
    image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&q=80",
    rentLevel: 1,
    familyScore: 2,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["مهاجران تازه‌وارد", "دانشجویان", "خانواده‌های اقتصادی"],
    highlights: ["خیابان Favoritenstraße", "Therme Wien"],
    watchOut: "برخی محلات کمتر امن، تنوع کیفیت محله",
    badge: "اقتصادی",
    badgeIcon: Wallet,
  },
  {
    id: "d11",
    number: "۱۱",
    name: "زیمِرینگ",
    englishName: "Simmering",
    zone: "outer",
    tagline: "منطقه صنعتی با دسترسی خوب",
    description: "منطقه‌ای صنعتی-مسکونی با قیمت‌های مقرون‌به‌صرفه. دسترسی عالی به بزرگراه‌ها و منطقه فرودگاه.",
    gradient: "from-stone-500 to-neutral-600",
    bg: "bg-stone-100",
    text: "text-stone-700",
    image: "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&q=80",
    rentLevel: 1,
    familyScore: 2,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["کارگران", "خانواده‌های اقتصادی"],
    highlights: ["گورستان مرکزی", "Zentralfriedhof"],
    watchOut: "کمتر تفریحی، منطقه‌ای صنعتی",
    badge: "صنعتی",
    badgeIcon: Building2,
  },
  {
    id: "d12",
    number: "۱۲",
    name: "مایدلینگ",
    englishName: "Meidling",
    zone: "outer",
    tagline: "محله‌ای چندفرهنگی و متعادل",
    description: "منطقه‌ای با ترکیب متعادل مسکونی و تجاری، دسترسی عالی به مترو و ایستگاه قطار Meidling.",
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    text: "text-orange-700",
    image: "https://images.unsplash.com/photo-1567448400815-59fcf1e95f81?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 3,
    bestFor: ["خانواده‌ها", "کارمندان", "مهاجران"],
    highlights: ["ایستگاه Meidling", "پارک Haydn"],
    watchOut: "کمتر تفریحی، محله‌ای کاملاً مسکونی",
    badge: "متعادل",
    badgeIcon: Users,
  },
  {
    id: "d13",
    number: "۱۳",
    name: "هیتزینگ",
    englishName: "Hietzing",
    zone: "outer",
    tagline: "لوکس‌ترین منطقه بیرونی وین",
    description: "منطقه‌ای شیک و آرام در نزدیکی کاخ شونبرون، با ویلاها و خانه‌های باغی. لوکس‌ترین منطقه حاشیه وین.",
    gradient: "from-yellow-500 to-amber-600",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    image: "https://images.unsplash.com/photo-1566837571183-13e04de52f38?w=800&q=80",
    rentLevel: 3,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌های ثروتمند", "سالمندان", "علاقه‌مندان به آرامش"],
    highlights: ["کاخ شونبرون", "باغ‌وحش Schönbrunn"],
    watchOut: "دور از مرکز، قیمت‌های بالا",
    badge: "لوکس",
    badgeIcon: Crown,
  },
  {
    id: "d14",
    number: "۱۴",
    name: "پنتزینگ",
    englishName: "Penzing",
    zone: "outer",
    tagline: "محله‌ای سبز با طبیعت شهری",
    description: "منطقه‌ای با فضای سبز فراوان، پارک‌ها و دسترسی به جنگل وین (Wienerwald). ایده‌آل برای طبیعت‌دوستان.",
    gradient: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    text: "text-green-700",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌ها", "طبیعت‌دوستان", "ورزشکاران"],
    highlights: ["جنگل وین", "پارک Dehnepark"],
    watchOut: "دسترسی کمتر به مرکز در برخی محلات",
    badge: "سبز",
    badgeIcon: TreePine,
  },
  {
    id: "d15",
    number: "۱۵",
    name: "رودولفشهایم-فونفهاوس",
    englishName: "Rudolfsheim-Fünfhaus",
    zone: "outer",
    tagline: "منطقه‌ای مهاجرپذیر و در حال تحول",
    description: "یکی از متنوع‌ترین مناطق وین با تمرکز بالای جامعه مهاجر. در حال بازسازی و تحول تدریجی.",
    gradient: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-700",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
    rentLevel: 1,
    familyScore: 2,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["مهاجران", "خانواده‌های اقتصادی"],
    highlights: ["خیابان Mariahlifer", "بازار Meiselmarkt"],
    watchOut: "تراکم بالا، کیفیت متغیر محله",
    badge: "مهاجرپذیر",
    badgeIcon: Globe,
  },
  {
    id: "d16",
    number: "۱۶",
    name: "اوتاکرینگ",
    englishName: "Ottakring",
    zone: "outer",
    tagline: "محله سنتی طبقه کارگر با روح کافه‌ای",
    description: "منطقه‌ای سنتی با کافه‌های قدیمی و بازار Brunnenmarkt. ترکیب جذابی از سنت و مدرنیته.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    rentLevel: 1,
    familyScore: 2,
    nightlifeScore: 2,
    transportScore: 2,
    bestFor: ["جوانان", "مهاجران", "هنرمندان"],
    highlights: ["بازار Brunnenmarkt", "Ottakringer Brauerei"],
    watchOut: "برخی محلات شلوغ و پرصدا",
    badge: "سنتی",
    badgeIcon: Coffee,
  },
  {
    id: "d17",
    number: "۱۷",
    name: "هرنالس",
    englishName: "Hernals",
    zone: "outer",
    tagline: "ورودی جنگل‌های وین",
    description: "منطقه‌ای آرام در دامنه جنگل‌های وین با چشم‌اندازهای زیبا. ترکیب خانه‌های سنتی و مدرن.",
    gradient: "from-lime-500 to-green-600",
    bg: "bg-lime-50",
    text: "text-lime-700",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌ها", "طبیعت‌دوستان"],
    highlights: ["تپه‌های Wienerwald", "Kongresspark"],
    watchOut: "دور از مرکز در محلات بالایی",
    badge: "طبیعی",
    badgeIcon: Sun,
  },
  {
    id: "d18",
    number: "۱۸",
    name: "وه‌رینگ",
    englishName: "Währing",
    zone: "outer",
    tagline: "محله دانشگاهی و آرام",
    description: "منطقه‌ای آرام و دانشگاهی با فضای سبز فراوان و دسترسی به مرکز. خانه چندین سفارتخانه و دانشکده.",
    gradient: "from-sky-500 to-cyan-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    image: "https://images.unsplash.com/photo-1518818419609-8dd9e8f60cf5?w=800&q=80",
    rentLevel: 3,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌ها", "دانشگاهیان", "ساکنان آرام‌دوست"],
    highlights: ["پارک Türkenschanzpark", "دانشگاه منابع طبیعی"],
    watchOut: "قیمت‌های بالا برای منطقه بیرونی",
    badge: "دانشگاهی",
    badgeIcon: BookOpen,
  },
  {
    id: "d19",
    number: "۱۹",
    name: "دوبلینگ",
    englishName: "Döbling",
    zone: "outer",
    tagline: "منطقه گرین‌هیلز وین",
    description: "منطقه‌ای لوکس در دامنه تپه‌های کالِنبرگ با ویلاها و باغ‌های انگور. گران‌ترین منطقه بیرونی وین.",
    gradient: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    text: "text-purple-700",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    rentLevel: 3,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌های لوکس", "سالمندان", "علاقه‌مندان به آرامش"],
    highlights: ["تپه Kahlenberg", "روستای Grinzing"],
    watchOut: "دور از مرکز، قیمت‌های بالا",
    badge: "لوکس و سبز",
    badgeIcon: Trophy,
  },

  // ===== DANUBE ZONE (20-23) =====
  {
    id: "d20",
    number: "۲۰",
    name: "بریگیتناو",
    englishName: "Brigittenau",
    zone: "danube",
    tagline: "منطقه‌ای پرتراکم و پرجمعیت",
    description: "منطقه‌ای پرتراکم در شمال دانوب با قیمت‌های اقتصادی. دسترسی خوب به مرکز از طریق مترو U6.",
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    text: "text-pink-700",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    rentLevel: 1,
    familyScore: 2,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["مهاجران", "دانشجویان", "خانواده‌های اقتصادی"],
    highlights: ["پارک Augarten", "Millennium City"],
    watchOut: "تراکم بالا، تنوع کیفیت محله",
    badge: "اقتصادی",
    badgeIcon: Wallet,
  },
  {
    id: "d21",
    number: "۲۱",
    name: "فلوریدسدورف",
    englishName: "Floridsdorf",
    zone: "danube",
    tagline: "بزرگ‌ترین منطقه از نظر مساحت",
    description: "بزرگ‌ترین منطقه وین از نظر مساحت، با ترکیب مناطق مسکونی، روستایی و طبیعی. ایده‌آل برای خانواده‌ها.",
    gradient: "from-blue-500 to-teal-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌ها", "علاقه‌مندان به طبیعت"],
    highlights: ["تپه Bisamberg", "پارک Donauinsel"],
    watchOut: "پراکندگی زیاد، نیاز به ماشین در برخی محلات",
    badge: "خانوادگی",
    badgeIcon: Baby,
  },
  {
    id: "d22",
    number: "۲۲",
    name: "دوناواشتات",
    englishName: "Donaustadt",
    zone: "danube",
    tagline: "مدرن‌ترین منطقه وین",
    description: "منطقه‌ای مدرن با معماری جدید، برج‌های DC Tower، و دریاچه Alte Donau. محل زندگی نسل جدید وین.",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    image: "https://images.unsplash.com/photo-1565013956975-52f2da15d3b2?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 2,
    transportScore: 3,
    bestFor: ["خانواده‌های مدرن", "جوانان", "کارمندان"],
    highlights: ["برج DC Tower", "دریاچه Alte Donau", "UNO City"],
    watchOut: "برخی محلات دور از مرکز",
    badge: "مدرن",
    badgeIcon: Building2,
  },
  {
    id: "d23",
    number: "۲۳",
    name: "لیزینگ",
    englishName: "Liesing",
    zone: "danube",
    tagline: "منطقه‌ای سبز و خانوادگی",
    description: "منطقه‌ای آرام در جنوب وین با خانه‌های خانوادگی، پارک‌ها و دسترسی به جنگل. ایده‌آل برای خانواده‌ها.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&q=80",
    rentLevel: 2,
    familyScore: 3,
    nightlifeScore: 1,
    transportScore: 2,
    bestFor: ["خانواده‌ها", "طبیعت‌دوستان"],
    highlights: ["پارک Wotruba", "جنگل Wienerwald"],
    watchOut: "دور از مرکز، وابستگی به ماشین در برخی محلات",
    badge: "خانوادگی",
    badgeIcon: TreePine,
  },
];

// ==========================================
// OTHER MAJOR CITIES
// ==========================================
const OTHER_CITIES = [
  {
    id: "graz",
    name: "گراتس",
    englishName: "Graz",
    tagline: "پایتخت دانشجویی اتریش",
    description: "دومین شهر بزرگ اتریش با فضای دانشگاهی، مرکز تاریخی زیبا و کیفیت زندگی بالا.",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    image: "https://images.unsplash.com/photo-1566837571183-13e04de52f38?w=800&q=80",
    population: "۳۰۰ هزار",
    badge: "دانشجویی",
    badgeIcon: GraduationCap,
    bestFor: "دانشجویان، خانواده‌های جوان",
  },
  {
    id: "linz",
    name: "لینتس",
    englishName: "Linz",
    tagline: "قطب صنعتی و تکنولوژی",
    description: "شهری صنعتی در کنار دانوب با تمرکز بالای شرکت‌های تکنولوژی و صنعتی. هزینه زندگی پایین‌تر از وین.",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80",
    population: "۲۰۵ هزار",
    badge: "صنعتی",
    badgeIcon: Building2,
    bestFor: "مهندسان، کارمندان صنعت",
  },
  {
    id: "salzburg",
    name: "سالزبورگ",
    englishName: "Salzburg",
    tagline: "شهر موتزارت و گردشگری",
    description: "شهر موتزارت، جشنواره‌های موسیقی جهانی و مناظر آلپی خیره‌کننده. اما هزینه مسکن بالاست.",
    gradient: "from-indigo-500 to-purple-600",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    image: "https://images.unsplash.com/photo-1580745086518-84e4f6ce1c9d?w=800&q=80",
    population: "۱۵۵ هزار",
    badge: "گردشگری",
    badgeIcon: Music,
    bestFor: "هنرمندان، توریست‌ها",
  },
  {
    id: "innsbruck",
    name: "اینسبروک",
    englishName: "Innsbruck",
    tagline: "پایتخت آلپ و اسکی",
    description: "شهر کوهستانی در قلب آلپ، میزبان المپیک‌های زمستانی. ایده‌آل برای علاقه‌مندان به اسکی و کوهنوردی.",
    gradient: "from-cyan-500 to-blue-600",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80",
    population: "۱۳۲ هزار",
    badge: "کوهستانی",
    badgeIcon: TreePine,
    bestFor: "ورزشکاران، طبیعت‌دوستان",
  },
];

// ==========================================
// SELECTION CRITERIA
// ==========================================
const CRITERIA = [
  {
    icon: Wallet,
    title: "بودجه و اجاره",
    text: "مهم‌ترین فاکتور در انتخاب محله. مرکز وین ۲-۳ برابر حاشیه اجاره دارد. برای شروع، مناطق ۱۰-۱۲-۱۵-۲۰ اقتصادی‌ترین گزینه‌ها هستند.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Train,
    title: "دسترسی حمل‌ونقل",
    text: "نزدیکی به مترو (U-Bahn) ارزش ملک را افزایش و زمان رفت‌وآمد را کاهش می‌دهد. محلات نزدیک به خطوط U1 تا U6 اولویت بالاتری دارند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Baby,
    title: "مناسب بودن برای خانواده",
    text: "پارک‌ها، مدارس خوب و محیط امن برای کودکان. مناطق ۱۳، ۱۴، ۱۸، ۱۹، ۲۲ و ۲۳ برای خانواده‌ها ایده‌آل هستند.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Coffee,
    title: "سبک زندگی",
    text: "اگر به زندگی شبانه و کافه‌ها علاقه دارید، مناطق ۲ تا ۷ بهترین هستند. اگر آرامش می‌خواهید، به مناطق حاشیه‌ای نگاه کنید.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۲۳", label: "منطقه وین", icon: "🏙️" },
  { value: "۹", label: "ایالت اتریش", icon: "🗺️" },
  { value: "۴", label: "شهر بزرگ دیگر", icon: "🏛️" },
  { value: "۳", label: "دسته منطقه‌ای", icon: "📊" },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "بهترین منطقه وین برای یک مهاجر تازه‌وارد کدام است؟",
    a: "برای مهاجر تازه‌وارد، مناطق ۱۰ (Favoriten)، ۱۵ (Rudolfsheim-Fünfhaus) و ۲۰ (Brigittenau) به دلیل اجاره‌های پایین‌تر و دسترسی خوب به حمل‌ونقل عمومی گزینه‌های مناسبی هستند. با این حال، هر محله ترکیب متنوعی از کیفیت دارد و بهتر است از نزدیک بازدید کنید.",
  },
  {
    q: "تفاوت قیمت اجاره بین مرکز و حاشیه وین چقدر است؟",
    a: "اجاره یک آپارتمان ۶۰ متری در مرکز (مناطق ۱ تا ۹) به‌طور میانگین بین ۱٬۲۰۰ تا ۱٬۸۰۰ یورو است، در حالی که همان آپارتمان در مناطق حاشیه‌ای (۱۰-۲۳) بین ۷۰۰ تا ۱٬۰۰۰ یورو اجاره می‌رود — یعنی تقریباً نصف قیمت.",
  },
  {
    q: "کدام مناطق وین برای زندگی خانوادگی مناسب‌تر هستند؟",
    a: "مناطق ۱۳ (Hietzing)، ۱۴ (Penzing)، ۱۸ (Währing)، ۱۹ (Döbling)، ۲۲ (Donaustadt) و ۲۳ (Liesing) به دلیل فضای سبز فراوان، مدارس خوب، محیط امن و امکانات خانوادگی، بهترین گزینه‌ها برای خانواده‌ها هستند.",
  },
  {
    q: "آیا زندگی در وین بهتر است یا شهرهای دیگر اتریش؟",
    a: "بستگی به سبک زندگی و شغل شما دارد. وین فرصت‌های شغلی، فرهنگی و آموزشی بیشتری دارد اما گران‌تر است. شهرهایی مانند گراتس و لینتس هزینه زندگی پایین‌تر و کیفیت زندگی بالایی دارند اما فرصت‌های شغلی محدودتری ارائه می‌دهند.",
  },
  {
    q: "آیا مناطق حاشیه‌ای وین امن هستند؟",
    a: "به‌طور کلی وین یکی از امن‌ترین پایتخت‌های جهان است. آمار جرم در مناطق حاشیه‌ای معمولاً کمی بالاتر از مرکز است، اما حتی این ارقام نیز در مقایسه با سایر شهرهای بزرگ اروپا بسیار پایین هستند. صرفاً در شب‌های دیروقت در برخی محلات احتیاط کنید.",
  },
  {
    q: "چگونه بهترین منطقه را برای خودم پیدا کنم؟",
    a: "عوامل کلیدی: ۱) بودجه ماهانه شما، ۲) فاصله تا محل کار یا دانشگاه، ۳) سبک زندگی (زندگی شبانه، آرامش، خانواده)، ۴) دسترسی به حمل‌ونقل عمومی، ۵) کیفیت مدارس برای خانواده‌ها. توصیه می‌کنیم قبل از اجاره، حتماً از محله بازدید حضوری داشته باشید و در ساعات مختلف روز (روز و شب) آن را بررسی کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const DistrictGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeZone, setActiveZone] = useState<"all" | "inner" | "outer" | "danube">("all");
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  const filteredDistricts = activeZone === "all"
    ? VIENNA_DISTRICTS
    : VIENNA_DISTRICTS.filter((d) => d.zone === activeZone);

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای جامع محلات و مناطق اتریش ۲۰۲۶ | انتخاب بهترین محل سکونت",
      description:
        "بررسی کامل ۲۳ منطقه وین (Bezirke) و شهرهای بزرگ اتریش با معیارهای اجاره، امنیت، حمل‌ونقل و کیفیت زندگی.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      datePublished: "2025-01-01",
      dateModified: "2025-01-01",
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "مناطق وین",
      itemListElement: VIENNA_DISTRICTS.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.name} (${d.englishName})`,
        description: d.description,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="راهنمای محلات و مناطق اتریش ۲۰۲۶ | بهترین منطقه وین برای زندگی"
        description="راهنمای جامع ۲۳ منطقه وین (Bezirke) و شهرهای بزرگ اتریش. بررسی اجاره، امنیت، حمل‌ونقل، خانواده‌پذیری و کیفیت زندگی. ویژه فارسی‌زبانان مقیم اتریش."
        keywords="مناطق وین, محلات وین, بهترین منطقه وین, Bezirk وین, Innere Stadt, Favoriten, Donaustadt, راهنمای محله وین, زندگی در وین, اتریش‌نشین"
        schemaData={seoSchema}
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
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE}
              alt="نمای هوایی وین اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🗺️
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
                <MapPinned className="w-3.5 h-3.5 text-amber-300" />
                Bezirksguide Österreich 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای جامع محلات و مناطق اتریش
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                بررسی کامل ۲۳ منطقه وین (Bezirke) و شهرهای بزرگ اتریش. از مناطق
                لوکس مرکز تا محلات خانوادگی حاشیه — با معیارهای اجاره، امنیت،
                حمل‌ونقل و کیفیت زندگی، تصمیم آگاهانه برای انتخاب محل سکونت خود
                بگیرید.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>۲۳ منطقه وین</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>معیارهای کاربردی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>کاملاً مستقل</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
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
        {/* VIENNA OVERVIEW */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
        >
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={VIENNA_OVERVIEW}
                alt="نمای شهر وین"
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
              <MapPin className="w-6 h-6 mb-1" />
              <div className="text-[10px] font-black opacity-80">۲۳ منطقه</div>
              <div className="text-xs font-black">Bezirke Wien</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
              <Compass className="w-3.5 h-3.5" />
              نگاه کلی
            </div>
            <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
              چرا انتخاب محله مهم‌ترین تصمیم شماست؟
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
              محله شما در وین تعیین‌کننده ۴۰ تا ۶۰ درصد کیفیت زندگی روزانه شماست —
              از قیمت اجاره و زمان رفت‌وآمد تا امکانات، امنیت و همسایگان. وین با ۲۳
              منطقه (Bezirk) هر کدام شخصیت خاص خود را دارد: از مناطق لوکس مرکز
              (۱، ۱۳، ۱۹) تا محلات خانوادگی حاشیه (۲۲، ۲۳) و مناطق اقتصادی (۱۰، ۱۱، ۱۵).
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Train, text: "شبکه مترو U1-U6" },
                { icon: ShieldCheck, text: "امنیت بالا" },
                { icon: TreePine, text: "فضای سبز فراوان" },
                { icon: Users, text: "تنوع فرهنگی" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-stone-50 rounded-xl p-2.5 border border-stone-100"
                  >
                    <Icon className="w-4 h-4 text-[#c8102e] flex-shrink-0" />
                    <span className="text-[10px] font-black text-stone-700">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* ZONE FILTER + DISTRICTS */}
        {/* ========================================== */}
        <div>
          <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row mb-5">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <Layers className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                ۲۳ منطقه وین (Wiener Bezirke)
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                بر اساس موقعیت جغرافیایی، سه دسته اصلی مناطق وین
              </p>
            </div>

            {/* Zone filter tabs */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl flex-wrap">
              {[
                { id: "all", label: "همه" },
                { id: "inner", label: "مرکز (۱-۹)" },
                { id: "outer", label: "بیرونی (۱۰-۱۹)" },
                { id: "danube", label: "دانوب (۲۰-۲۳)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveZone(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-[10px] md:text-xs font-black transition-all ${
                    activeZone === tab.id
                      ? "bg-white text-[#c8102e] shadow-sm"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredDistricts.map((d, i) => {
                const BadgeIcon = d.badgeIcon;
                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedDistrict(d)}
                    className="group cursor-pointer bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    {/* Image banner */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={d.image}
                        alt={`منطقه ${d.name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* District number badge */}
                      <div className="absolute top-3 right-3 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center">
                        <div className="text-[8px] font-black text-stone-500">منطقه</div>
                        <div className="text-sm font-black text-[#c8102e] font-mono">
                          {d.number}
                        </div>
                      </div>

                      {d.badge && (
                        <div
                          className={`absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r ${d.gradient} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
                        >
                          {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5" />}
                          {d.badge}
                        </div>
                      )}

                      <div className="absolute bottom-3 right-3 text-white">
                        <div className="text-sm font-black leading-tight">{d.name}</div>
                        <div className="text-[9px] font-mono opacity-90">
                          {d.englishName}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-[10px] text-stone-500 font-bold mb-3 leading-relaxed line-clamp-2">
                        {d.tagline}
                      </p>

                      {/* Scores */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {[
                          { icon: Wallet, label: "اجاره", val: d.rentLevel, invert: true },
                          { icon: Baby, label: "خانواده", val: d.familyScore, invert: false },
                          { icon: Coffee, label: "تفریح", val: d.nightlifeScore, invert: false },
                          { icon: Train, label: "حمل‌ونقل", val: d.transportScore, invert: false },
                        ].map((score, j) => {
                          const Icon = score.icon;
                          const dots = score.invert ? 4 - score.val : score.val;
                          return (
                            <div key={j} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Icon className="w-2.5 h-2.5 text-stone-400" />
                                  <span className="text-[8px] font-black text-stone-500">
                                    {score.label}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-0.5">
                                {[1, 2, 3].map((n) => (
                                  <div
                                    key={n}
                                    className={`flex-1 h-1 rounded-full ${
                                      n <= dots
                                        ? d.text.replace("text-", "bg-")
                                        : "bg-stone-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Best for chips */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {d.bestFor.slice(0, 2).map((b, j) => (
                          <span
                            key={j}
                            className="text-[8.5px] font-black text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded-full"
                          >
                            {b}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-end text-[#c8102e] text-[10px] font-black group-hover:gap-2 transition-all">
                        جزئیات بیشتر
                        <ChevronLeft className="w-3 h-3 mr-0.5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* DISTRICT MODAL */}
        {/* ========================================== */}
        <AnimatePresence>
          {selectedDistrict && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDistrict(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Header image */}
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedDistrict.image}
                    alt={selectedDistrict.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition"
                  >
                    <X className="w-4 h-4 text-stone-700" />
                  </button>

                  <div className="absolute bottom-4 right-4 text-white">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full mb-2">
                      <MapPin className="w-3 h-3" />
                      منطقه {selectedDistrict.number}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black">
                      {selectedDistrict.name}
                    </h2>
                    <div className="text-[11px] font-mono opacity-90">
                      {selectedDistrict.englishName}
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <p className="text-xs md:text-sm text-stone-700 font-bold leading-relaxed">
                    {selectedDistrict.description}
                  </p>

                  {/* Scores */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: Wallet, label: "سطح اجاره", val: selectedDistrict.rentLevel, invert: true, text: "ارزان" },
                      { icon: Baby, label: "خانواده‌پذیری", val: selectedDistrict.familyScore, text: "عالی" },
                      { icon: Coffee, label: "زندگی شبانه", val: selectedDistrict.nightlifeScore, text: "فعال" },
                      { icon: Train, label: "حمل‌ونقل", val: selectedDistrict.transportScore, text: "خوب" },
                    ].map((score, i) => {
                      const Icon = score.icon;
                      const level = score.invert
                        ? score.val === 1 ? "عالی" : score.val === 2 ? "متوسط" : "گران"
                        : score.val === 1 ? "کم" : score.val === 2 ? "خوب" : "عالی";
                      return (
                        <div
                          key={i}
                          className={`rounded-2xl ${selectedDistrict.bg} p-3 text-center border border-stone-100`}
                        >
                          <Icon className={`w-5 h-5 mx-auto mb-1.5 ${selectedDistrict.text}`} />
                          <div className="text-[9px] font-black text-stone-500 mb-0.5">
                            {score.label}
                          </div>
                          <div className={`text-[11px] font-black ${selectedDistrict.text}`}>
                            {level}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      جاذبه‌های کلیدی
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistrict.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] font-black text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Best for */}
                  <div>
                    <h3 className="text-xs font-black text-stone-900 mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-sky-500" />
                      مناسب برای
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistrict.bestFor.map((b, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center gap-1 text-[10px] font-black ${selectedDistrict.bg} ${selectedDistrict.text} px-2.5 py-1 rounded-full`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Watch out */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black text-amber-900 mb-0.5">
                        نکته مهم
                      </div>
                      <p className="text-[10.5px] font-bold text-amber-800 leading-relaxed">
                        {selectedDistrict.watchOut}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================== */}
        {/* OTHER CITIES */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              شهرهای بزرگ دیگر اتریش
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              گزینه‌های جایگزین وین با هزینه زندگی پایین‌تر و کیفیت زندگی بالا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_CITIES.map((city, i) => {
              const BadgeIcon = city.badgeIcon;
              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div
                      className={`absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r ${city.gradient} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
                    >
                      <BadgeIcon className="w-2.5 h-2.5" />
                      {city.badge}
                    </div>

                    <div className="absolute bottom-3 right-3 text-white">
                      <div className="text-base font-black">{city.name}</div>
                      <div className="text-[9px] font-mono opacity-90">{city.englishName}</div>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-0.5">
                      <div className="text-[8px] font-black text-stone-500">جمعیت</div>
                      <div className="text-[10px] font-black text-[#c8102e]">
                        {city.population}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-black text-stone-900 text-xs mb-1">
                      {city.tagline}
                    </h3>
                    <p className="text-[10px] text-stone-500 font-bold leading-relaxed mb-3">
                      {city.description}
                    </p>
                    <div className="flex items-center gap-1 text-[9px] font-black text-stone-500">
                      <Users className="w-3 h-3 text-[#c8102e]" />
                      مناسب برای: {city.bestFor}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* SELECTION CRITERIA */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Target className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              ۴ معیار کلیدی انتخاب محله
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              قبل از اجاره، این چهار فاکتور را به دقت بررسی کنید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CRITERIA.map((v, i) => {
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
              پاسخ به پرتکرارترین سوالات درباره انتخاب محله در اتریش
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
              نکات مهم قبل از اجاره
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>قبل از امضا، حتماً از محله بازدید حضوری داشته باشید — در روز و شب.</li>
              <li>به متراژ مفید (Wohnfläche) و امکانات آپارتمان دقت کنید، نه فقط قیمت.</li>
              <li>هزینه‌های جانبی (Betriebskosten) می‌توانند ۲۰-۳۰٪ به اجاره اضافه کنند.</li>
              <li>شرایط قرارداد، مهلت فسخ و ودیعه (Kaution) را با دقت بررسی کنید.</li>
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              همراه شما در انتخاب محله
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوالی درباره انتخاب محله دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره مناطق وین، شهرهای
              دیگر و انتخاب بهترین محل سکونت بر اساس بودجه و سبک زندگی شماست.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Users className="w-4 h-4" />
                مشاوره واتس‌اپ
              </a>
              <a
                href="https://t.me/Otrish_neshin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4" />
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
              اطلاعات این راهنما بر اساس تجربه‌های میدانی و منابع عمومی تهیه شده
              و صرفاً جنبه راهنمایی دارد. شرایط هر محله ممکن است در طول زمان تغییر
              کند و تجربه هر فرد متفاوت باشد. برای تصمیم نهایی، حتماً بازدید
              حضوری، مشاوره با ساکنان محلی و بررسی منابع رسمی (MA 23 و Statistik
              Austria) را در نظر بگیرید. اتریش‌نشین هیچ مسئولیتی در قبال تصمیمات
              مبتنی بر این اطلاعات نمی‌پذیرد.
            </p>
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

export default DistrictGuide;