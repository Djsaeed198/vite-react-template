import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award, ShieldCheck, FileText, Clock, Users, Heart, Sparkles,
  CheckCircle, ChevronDown, ExternalLink, Info, Globe, BookOpen,
  Languages, Euro, Scale, Calendar, MapPin, Star, TrendingUp,
  Building2, Rocket, GraduationCap, Baby, AlertTriangle, Target,
  Handshake, Flag, BadgeCheck, FileCheck, Timer, Coins, Plane,
  Quote, Copy, Check, Briefcase, Landmark, HeartHandshake,
  Compass, Search, ArrowLeftRight, Fingerprint, Stamp, ScrollText,
  UserCheck, Gavel, Home, Umbrella, Route, Milestone
} from "lucide-react";
import SEO from "./SEO";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const VIENNA_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80";
const PASSPORT_IMAGE = "https://images.unsplash.com/photo-1544016768-982d1554f0b9?w=800&q=80";
const CEREMONY_IMAGE = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80";

// ==========================================
// PATHWAY METADATA (Dynamic)
// ==========================================
interface PathwayData {
  id: "standard" | "spouse" | "refugee" | "birth";
  faName: string;
  deName: string;
  badge: string;
  duration: string;
  icon: any;
  color: string;
  gradient: string;
  heroTitle: string;
  slogan: string;
  aboutText: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  stats: { value: string; label: string; icon: string }[];
  conditions: { icon: any; title: string; text: string; color: string }[];
  documents: string[];
  steps: { n: string; icon: any; title: string; text: string; color: string }[];
  faqs: { q: string; a: string }[];
}

const PATHWAY_METADATA: Record<string, PathwayData> = {
  standard: {
    id: "standard",
    faName: "تابعیت استاندارد",
    deName: "Reguläres Verfahren",
    badge: "رایج‌ترین مسیر",
    duration: "۱۰ سال اقامت",
    icon: Milestone,
    color: "sky",
    gradient: "from-sky-500 to-blue-600",
    heroTitle: "تابعیت استاندارد اتریش",
    slogan: "مسیر معمول برای اکثر متقاضیان با اقامت قانونی طولانی‌مدت در اتریش",
    aboutText:
      "این مسیر برای اکثر فارسی‌زبانان مقیم اتریش که سال‌ها به‌صورت قانونی در این کشور زندگی کرده‌اند، پیشنهاد می‌شود. با احراز شرایط اقامتی ۱۰ ساله، تسلط زبانی B1، تأمین مالی مستقل و قبولی در آزمون شهروندی، می‌توانید پاسپورت اتریشی دریافت کنید.",
    seoTitle: "تابعیت استاندارد اتریش ۲۰۲۵ | شرایط ۱۰ سال اقامت و مدارک",
    seoDescription:
      "راهنمای کامل مسیر استاندارد تابعیت اتریش: شرایط ۱۰ سال اقامت قانونی، مدرک زبان B1، آزمون شهروندی، تأمین مالی و مدارک مورد نیاز.",
    seoKeywords:
      "تابعیت استاندارد اتریش, ۱۰ سال اقامت, Staatsbürgerschaft, شهروندی اتریش ۲۰۲۵",
    stats: [
      { value: "۱۰ سال", label: "اقامت قانونی", icon: "⏳" },
      { value: "۵ سال", label: "اقامت دائمی", icon: "📅" },
      { value: "B1", label: "سطح زبان", icon: "🗣️" },
      { value: "€۲,۵۰۰", label: "هزینه تقریبی", icon: "💶" },
    ],
    conditions: [
      {
        icon: Timer,
        title: "۱۰ سال اقامت قانونی",
        text: "حداقل ۱۰ سال اقامت بدون وقفه در اتریش، که ۵ سال آخر آن با مجوز اقامت دائمی (Daueraufenthalt) باشد.",
        color: "from-sky-500 to-blue-600",
      },
      {
        icon: Languages,
        title: "مدرک زبان آلمانی B1",
        text: "ارائه مدرک معتبر B1 از مؤسسات ÖSD، Goethe یا Telc. برخی ایالت‌ها B2 را برای برخی مشاغل الزام می‌کنند.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        icon: Coins,
        title: "تأمین مالی مستقل",
        text: "داشتن درآمد ثابت، قرارداد کار یا پس‌انداز کافی برای تأمین مخارج بدون کمک‌های اجتماعی (Sozialhilfe).",
        color: "from-amber-500 to-orange-600",
      },
      {
        icon: ShieldCheck,
        title: "عدم سوء‌پیشینه",
        text: "گواهی عدم سوء‌پیشینه از اتریش و کشور مبدأ، بدون سابقه محکومیت سنگین کیفری.",
        color: "from-rose-500 to-red-600",
      },
      {
        icon: GraduationCap,
        title: "قبولی در آزمون شهروندی",
        text: "آزمون کتبی درباره تاریخ اتریش، نظام سیاسی، جغرافیا و ارزش‌های دموکراتیک جمهوری.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        icon: Heart,
        title: "تعهد به ارزش‌ها",
        text: "پذیرش ارزش‌های قانون اساسی اتریش و اتحادیه اروپا و عدم تهدید امنیت ملی.",
        color: "from-pink-500 to-rose-600",
      },
    ],
    documents: [
      "شناسنامه و پاسپورت معتبر (ترجمه رسمی)",
      "کارت اقامت دائمی و سابقه اقامت ۱۰ ساله",
      "مدرک زبان آلمانی B1",
      "گواهی عدم سوء‌پیشینه اتریش (Strafregisterbescheinigung)",
      "گواهی عدم سوء‌پیشینه از ایران",
      "مدارک درآمد (فیش حقوقی، قرارداد کار، اظهارنامه مالیاتی)",
      "گواهی تولد (Geburtsurkunde) ترجمه‌شده",
      "مدارک وضعیت تأهل (در صورت وجود)",
      "گواهی ثبت آدرس (Meldezettel)",
      "عکس پاسپورت جدید",
    ],
    steps: [
      {
        n: "۰۱",
        icon: FileText,
        title: "جمع‌آوری مدارک",
        text: "گردآوری و ترجمه رسمی کلیه مدارک هویتی، اقامتی، درآمدی و گواهی‌های لازم.",
        color: "from-[#c8102e] to-[#970d22]",
      },
      {
        n: "۰۲",
        icon: BookOpen,
        title: "ثبت‌نام در آزمون زبان و شهروندی",
        text: "ثبت‌نام در دوره آمادگی و آزمون شهروندی در مراکز مجاز ایالتی.",
        color: "from-amber-500 to-orange-600",
      },
      {
        n: "۰۳",
        icon: Building2,
        title: "تسلیم پرونده",
        text: "ارسال پرونده به دفتر ایالتی (Amt der Landesregierung) یا در وین به MA 35.",
        color: "from-sky-500 to-blue-600",
      },
      {
        n: "۰۴",
        icon: BadgeCheck,
        title: "بررسی و مصاحبه",
        text: "بررسی پرونده توسط کارشناسان، احتمال دعوت به مصاحبه و پرداخت هزینه‌های قانونی.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        n: "۰۵",
        icon: Award,
        title: "مراسم تحلیف",
        text: "در صورت تأیید، در مراسم رسمی سوگند وفاداری به جمهوری اتریش یاد می‌کنید.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        n: "۰۶",
        icon: Flag,
        title: "دریافت پاسپورت",
        text: "اخذ گواهی تابعیت و دریافت پاسپورت اتریشی (و پاسپورت اروپایی) در چند هفته.",
        color: "from-rose-500 to-pink-600",
      },
    ],
    faqs: [
      {
        q: "آیا با دریافت تابعیت اتریش، تابعیت ایرانی من از بین می‌رود؟",
        a: "اتریش به‌طور کلی تابعیت دوگانه را نمی‌پذیرد و در هنگام اعطا انتظار دارد تابعیت قبلی ترک شود. برای شهروندان ایرانی به دلیل محدودیت‌های قانونی، استثناها و مسیرهای خاص وجود دارد که نیاز به مشاوره تخصصی حقوقی دارد.",
      },
      {
        q: "آیا ۱۰ سال باید پیوسته باشد؟",
        a: "بله، اقامت باید بدون وقفه باشد. خروج بیش از ۶ ماه متوالی یا مجموعاً بیش از ۱۰ ماه در سال می‌تواند به سابقه اقامت شما آسیب بزند.",
      },
      {
        q: "هزینه کل فرآیند چقدر است؟",
        a: "هزینه‌ها بسته به ایالت و شرایط فردی متفاوت است، اما به‌طور تقریبی بین ۱٬۰۰۰ تا ۲٬۵۰۰ یورو شامل هزینه‌های اداری، آزمون زبان، آزمون شهروندی و صدور مدارک می‌باشد.",
      },
    ],
  },

  spouse: {
    id: "spouse",
    faName: "تابعیت از طریق همسر",
    deName: "Ehe mit Österreicher/in",
    badge: "مسیر سریع‌تر",
    duration: "۶ سال اقامت",
    icon: HeartHandshake,
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    heroTitle: "تابعیت از طریق ازدواج با شهروند اتریشی",
    slogan: "همسران شهروندان اتریشی با شرایط تسهیل‌شده و مدت اقامت کوتاه‌تر",
    aboutText:
      "اگر با یک شهروند اتریشی ازدواج کرده‌اید، می‌توانید پس از ۶ سال اقامت قانونی در اتریش (به‌جای ۱۰ سال) درخواست تابعیت دهید. این مسیر شرایط سبک‌تری برای زبان و آزمون شهروندی دارد و یکی از سریع‌ترین راه‌های دریافت پاسپورت اتریشی است.",
    seoTitle: "تابعیت اتریش از طریق ازدواج ۲۰۲۵ | شرایط ۶ سال اقامت",
    seoDescription:
      "راهنمای کامل تابعیت اتریش از طریق ازدواج با شهروند اتریشی: شرایط ۶ سال اقامت، مدارک، مصاحبه مشترک و تسهیلات ویژه همسران.",
    seoKeywords:
      "تابعیت ازدواج اتریش, شهروندی همسر اتریشی, اقامت ۶ سال, تابعیت تسهیل شده اتریش",
    stats: [
      { value: "۶ سال", label: "اقامت قانونی", icon: "⏳" },
      { value: "۳ سال", label: "ازدواج مستمر", icon: "💍" },
      { value: "B1", label: "سطح زبان", icon: "🗣️" },
      { value: "€۱,۵۰۰", label: "هزینه تقریبی", icon: "💶" },
    ],
    conditions: [
      {
        icon: HeartHandshake,
        title: "ازدواج رسمی ثبت‌شده",
        text: "ازدواج رسمی با شهروند اتریشی که حداقل ۳ سال به‌طور مستمر ادامه داشته باشد.",
        color: "from-rose-500 to-pink-600",
      },
      {
        icon: Timer,
        title: "۶ سال اقامت قانونی",
        text: "حداقل ۶ سال اقامت قانونی در اتریش، که ۳ سال آخر آن اقامت دائمی باشد.",
        color: "from-sky-500 to-blue-600",
      },
      {
        icon: Languages,
        title: "مدرک زبان آلمانی B1",
        text: "ارائه مدرک زبان آلمانی سطح B1 از مؤسسات معتبر مانند ÖSD یا Goethe.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        icon: UserCheck,
        title: "همسر شهروند اتریشی",
        text: "همسر شما باید در زمان درخواست، شهروند اتریشی باشد و حداقل ۲ سال از شهروندی او گذشته باشد.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        icon: ShieldCheck,
        title: "عدم سوء‌پیشینه",
        text: "گواهی عدم سوء‌پیشینه از اتریش و کشور مبدأ، بدون محکومیت سنگین.",
        color: "from-amber-500 to-orange-600",
      },
      {
        icon: Coins,
        title: "تأمین مالی پایدار",
        text: "داشتن درآمد کافی برای تأمین مخارج خانواده، بدون وابستگی به کمک‌های اجتماعی.",
        color: "from-teal-500 to-cyan-600",
      },
    ],
    documents: [
      "شناسنامه و پاسپورت معتبر (ترجمه رسمی)",
      "سند رسمی ازدواج (Heiratsurkunde)",
      "گواهی شهروندی همسر اتریشی (Staatsbürgerschaftsnachweis)",
      "کارت اقامت دائمی و سابقه اقامت",
      "مدرک زبان آلمانی B1",
      "گواهی عدم سوء‌پیشینه از هر دو کشور",
      "مدارک درآمد خانواده",
      "گواهی ثبت آدرس مشترک (Meldezettel)",
      "عکس پاسپورت جدید",
    ],
    steps: [
      {
        n: "۰۱",
        icon: FileText,
        title: "گردآوری مدارک",
        text: "جمع‌آوری کلیه مدارک ازدواج، شهروندی همسر، اقامت و درآمد خانواده.",
        color: "from-rose-500 to-pink-600",
      },
      {
        n: "۰۲",
        icon: BookOpen,
        title: "آزمون زبان و شهروندی",
        text: "شرکت در دوره آمادگی و قبولی در آزمون شهروندی و مدرک زبان B1.",
        color: "from-amber-500 to-orange-600",
      },
      {
        n: "۰۳",
        icon: Building2,
        title: "تسلیم درخواست مشترک",
        text: "ارسال درخواست به‌همراه مدارک همسر به مرجع ذی‌صلاح ایالتی.",
        color: "from-sky-500 to-blue-600",
      },
      {
        n: "۰۴",
        icon: UserCheck,
        title: "مصاحبه مشترک",
        text: "احتمال دعوت هر دو همسر به مصاحبه برای اثبات ادامه ازدواج و شرایط.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        n: "۰۵",
        icon: Award,
        title: "مراسم تحلیف",
        text: "در صورت تأیید، در مراسم رسمی سوگند وفاداری یاد می‌کنید.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        n: "۰۶",
        icon: Flag,
        title: "دریافت پاسپورت",
        text: "اخذ گواهی تابعیت و دریافت پاسپورت اتریشی.",
        color: "from-[#c8102e] to-[#970d22]",
      },
    ],
    faqs: [
      {
        q: "آیا اگر همسرم اتریشی باشد، خودکار شهروند می‌شوم؟",
        a: "خیر، ازدواج با شهروند اتریشی به‌تنهایی منجر به شهروندی نمی‌شود. باید شرایط اقامتی، زبانی و آزمون را احراز کنید، اما مدت اقامت از ۱۰ سال به ۶ سال کاهش می‌یابد.",
      },
      {
        q: "اگر از همسرم جدا شوم چه اتفاقی می‌افتد؟",
        a: "در صورت طلاق قبل از دریافت تابعیت، مسیر شما به مسیر استاندارد (۱۰ سال اقامت) تغییر می‌یابد. پس از دریافت تابعیت، طلاق تأثیری بر تابعیت شما ندارد.",
      },
      {
        q: "آیا فرزندان ما هم شهروند می‌شوند؟",
        a: "فرزندان متولد از پدر یا مادر اتریشی معمولاً از بدو تولد تابعیت اتریشی را دریافت می‌کنند. اگر فرزند قبل از ازدواج متولد شده، روند الحاق (Legitimation) لازم است.",
      },
    ],
  },

  refugee: {
    id: "refugee",
    faName: "تابعیت پناهندگان",
    deName: "Staatsbürgerschaft für Asylberechtigte",
    badge: "شرایط تسهیل‌شده",
    duration: "۶ سال اقامت",
    icon: Umbrella,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    heroTitle: "تابعیت اتریش برای پناهندگان",
    slogan: "مسیر تسهیل‌شده برای پناهندگان به رسمیت شناخته‌شده با شرایط خاص",
    aboutText:
      "پناهندگان به رسمیت شناخته‌شده (Asylberechtigte) و افراد تحت حمایت فرعی (Subsidiär Schutzberechtigte) می‌توانند پس از ۶ سال اقامت قانونی درخواست تابعیت دهند. این مسیر تسهیلات ویژه‌ای برای زبان و آزمون دارد و از سریع‌ترین راه‌های دریافت شهروندی برای پناهندگان است.",
    seoTitle: "تابعیت اتریش برای پناهندگان ۲۰۲۵ | شرایط ۶ سال و مدارک",
    seoDescription:
      "راهنمای کامل تابعیت اتریش برای پناهندگان: شرایط ۶ سال اقامت، مدارک Asyl, تسهیلات زبانی و مراحل دریافت شهروندی ویژه پناهندگان.",
    seoKeywords:
      "تابعیت پناهندگان اتریش, شهروندی Asyl, پناهنده اتریش, ۶ سال اقامت پناهنده, Schutzberechtigte",
    stats: [
      { value: "۶ سال", label: "اقامت قانونی", icon: "⏳" },
      { value: "B1", label: "سطح زبان", icon: "🗣️" },
      { value: "€۱٬۲۰۰", label: "هزینه تقریبی", icon: "💶" },
      { value: "ویژه", label: "تسهیلات زبان", icon: "📚" },
    ],
    conditions: [
      {
        icon: Umbrella,
        title: "وضعیت پناهندگی رسمی",
        text: "دارا بودن وضعیت Asylberechtigt یا Subsidiär Schutzberechtigt به رسمیت شناخته‌شده توسط اتریش.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        icon: Timer,
        title: "۶ سال اقامت قانونی",
        text: "حداقل ۶ سال اقامت قانونی در اتریش از تاریخ اعطای وضعیت پناهندگی.",
        color: "from-sky-500 to-blue-600",
      },
      {
        icon: Languages,
        title: "مدرک زبان آلمانی B1",
        text: "ارائه مدرک زبان آلمانی B1، یا شرکت در دوره‌های ادغام با تسهیلات ویژه.",
        color: "from-amber-500 to-orange-600",
      },
      {
        icon: ShieldCheck,
        title: "عدم سوء‌پیشینه",
        text: "نداشتن سابقه محکومیت کیفری سنگین و عدم تهدید امنیت ملی.",
        color: "from-rose-500 to-red-600",
      },
      {
        icon: Coins,
        title: "تأمین مالی مستقل",
        text: "داشتن درآمد کافی یا وضعیت شغلی مشخص برای تأمین مخارج زندگی.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        icon: GraduationCap,
        title: "آزمون شهروندی",
        text: "قبولی در آزمون شهروندی درباره تاریخ، نظام سیاسی و ارزش‌های دموکراتیک اتریش.",
        color: "from-pink-500 to-rose-600",
      },
    ],
    documents: [
      "سند پناهندگی (Asylbescheid)",
      "کارت اقامت پناهندگی معتبر",
      "شناسنامه و پاسپورت (در صورت وجود)",
      "مدرک زبان آلمانی B1",
      "گواهی عدم سوء‌پیشینه اتریش",
      "مدارک درآمد یا اشتغال",
      "گواهی ثبت آدرس (Meldezettel)",
      "عکس پاسپورت",
    ],
    steps: [
      {
        n: "۰۱",
        icon: FileText,
        title: "گردآوری مدارک",
        text: "جمع‌آوری سند پناهندگی، کارت اقامت و مدارک هویتی در دسترس.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        n: "۰۲",
        icon: BookOpen,
        title: "دوره ادغام و آزمون",
        text: "شرکت در دوره‌های زبان و ادغام با تسهیلات ÖIF و آمادگی آزمون شهروندی.",
        color: "from-amber-500 to-orange-600",
      },
      {
        n: "۰۳",
        icon: Building2,
        title: "تسلیم درخواست",
        text: "ارسال درخواست به مرجع ایالتی ذی‌صلاح به‌همراه مدارک.",
        color: "from-sky-500 to-blue-600",
      },
      {
        n: "۰۴",
        icon: BadgeCheck,
        title: "بررسی و تأیید",
        text: "بررسی پرونده توسط کارشناسان، بررسی سابقه اقامت و شرایط.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        n: "۰۵",
        icon: Award,
        title: "مراسم تحلیف",
        text: "سوگند رسمی وفاداری به جمهوری اتریش در مراسم رسمی.",
        color: "from-rose-500 to-pink-600",
      },
      {
        n: "۰۶",
        icon: Flag,
        title: "دریافت پاسپورت",
        text: "دریافت گواهی تابعیت و پاسپورت اتریشی (اتحادیه اروپا).",
        color: "from-[#c8102e] to-[#970d22]",
      },
    ],
    faqs: [
      {
        q: "آیا می‌توانم به ایران برگردم و پناهندگی‌ام را از دست بدهم؟",
        a: "سفر به کشور مبدأ می‌تواند وضعیت پناهندگی شما را به خطر بیندازد. برای دریافت تابعیت اتریش، سفر به ایران ممکن است پرونده شما را با مشکل مواجه کند. حتماً با وکیل مشورت کنید.",
      },
      {
        q: "آیا تفاوت بین Asylberechtigt و Subsidiär وجود دارد؟",
        a: "بله. دارندگان Asylberechtigt (کنوانسیون ژنو) پس از ۶ سال می‌توانند درخواست تابعیت دهند. دارندگان Subsidiär Schutzberechtigt معمولاً به ۱۰ سال اقامت نیاز دارند، مگر با شرایط استثنایی.",
      },
      {
        q: "آیا فرزندان من هم مشمول این مسیر هستند؟",
        a: "فرزندان زیر ۱۴ سال که با شما اقامت دارند، در پرونده شما لحاظ می‌شوند. فرزندان بالای ۱۴ سال باید به‌طور مستقل درخواست دهند.",
      },
    ],
  },

  birth: {
    id: "birth",
    faName: "تابعیت از طریق تولد",
    deName: "Staatsbürgerschaft durch Geburt",
    badge: "مسیر ویژه",
    duration: "موردی",
    icon: Baby,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    heroTitle: "تابعیت اتریش از طریق تولد",
    slogan: "کودکان متولد اتریش در شرایط خاص می‌توانند شهروند اتریشی شوند",
    aboutText:
      "اتریش به‌طور کلی اصل خون (ius sanguinis) را برای تابعیت دنبال می‌کند، اما در شرایط خاصی کودکان متولد اتریش می‌توانند شهروند شوند. اگر یکی از والدین مقیم دائم اتریش باشد و شرایط خاص قانونی احراز شود، امکان دریافت تابعیت برای کودک وجود دارد.",
    seoTitle: "تابعیت اتریش از طریق تولد ۲۰۲۵ | شرایط و قوانین ius soli",
    seoDescription:
      "راهنمای کامل تابعیت اتریش از طریق تولد: قوانین ius sanguinis و ius soli، شرایط ویژه برای کودکان متولد اتریش، مدارک و مراحل.",
    seoKeywords:
      "تابعیت تولد اتریش, ius soli, شهروندی کودک اتریش, تابعیت نوزاد, Staatsbürgerschaft Geburt",
    stats: [
      { value: "موردی", label: "شرایط ویژه", icon: "📋" },
      { value: "۵ سال", label: "اقامت والدین", icon: "⏳" },
      { value: "Daueraufenthalt", label: "وضعیت والد", icon: "📄" },
      { value: "مستقل", label: "درخواست", icon: "👶" },
    ],
    conditions: [
      {
        icon: Home,
        title: "اقامت دائمی والدین",
        text: "حداقل یکی از والدین باید حداقل ۵ سال اقامت قانونی و مجوز اقامت دائمی (Daueraufenthalt) در اتریش داشته باشد.",
        color: "from-amber-500 to-orange-600",
      },
      {
        icon: Baby,
        title: "تولد در اتریش",
        text: "کودک باید در قلمرو اتریش متولد شده باشد و تولد در سجل رسمی ثبت شده باشد.",
        color: "from-rose-500 to-pink-600",
      },
      {
        icon: UserCheck,
        title: "درخواست والدین",
        text: "درخواست تابعیت باید توسط والد یا قیم قانونی و قبل از سن ۱۸ سالگی کودک تنظیم شود.",
        color: "from-sky-500 to-blue-600",
      },
      {
        icon: ShieldCheck,
        title: "شرایط والدین",
        text: "والدین باید بدون سوء‌پیشینه سنگین، دارای درآمد کافی و تعهد به ارزش‌های اتریش باشند.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        icon: Languages,
        title: "زبان والدین",
        text: "والدین باید مدرک زبان آلمانی A2 یا B1 (بسته به شرایط) ارائه دهند.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        icon: FileCheck,
        title: "ارائه مدارک کامل",
        text: "ارائه سند تولد، مدارک اقامتی والدین، گواهی‌های درآمدی و مدارک هویتی کامل.",
        color: "from-teal-500 to-cyan-600",
      },
    ],
    documents: [
      "گواهی تولد کودک (Geburtsurkunde)",
      "شناسنامه و پاسپورت والدین",
      "کارت اقامت دائمی والد (Daueraufenthalt-EG)",
      "سابقه اقامت ۵ ساله والدین",
      "گواهی عدم سوء‌پیشینه والدین",
      "مدارک درآمد والدین",
      "مدرک زبان والدین",
      "گواهی ثبت آدرس خانوادگی",
    ],
    steps: [
      {
        n: "۰۱",
        icon: Baby,
        title: "تولد و ثبت رسمی",
        text: "ثبت رسمی تولد در Standesamt و دریافت گواهی تولد آلمانی.",
        color: "from-amber-500 to-orange-600",
      },
      {
        n: "۰۲",
        icon: FileText,
        title: "گردآوری مدارک",
        text: "جمع‌آوری مدارک اقامتی والدین، درآمد و گواهی‌ها.",
        color: "from-sky-500 to-blue-600",
      },
      {
        n: "۰۳",
        icon: Building2,
        title: "تسلیم درخواست",
        text: "ارسال درخواست به دفتر ایالتی یا MA 35 در وین.",
        color: "from-emerald-500 to-teal-600",
      },
      {
        n: "۰۴",
        icon: BadgeCheck,
        title: "بررسی پرونده",
        text: "بررسی شرایط والدین و تأیید اقامت قانونی و اقامت دائمی.",
        color: "from-purple-500 to-indigo-600",
      },
      {
        n: "۰۵",
        icon: Award,
        title: "تأیید تابعیت",
        text: "در صورت تأیید، گواهی تابعیت برای کودک صادر می‌شود.",
        color: "from-rose-500 to-pink-600",
      },
      {
        n: "۰۶",
        icon: Flag,
        title: "دریافت پاسپورت",
        text: "درخواست پاسپورت اتریشی برای کودک از سن مجاز.",
        color: "from-[#c8102e] to-[#970d22]",
      },
    ],
    faqs: [
      {
        q: "آیا کودک متولد اتریش خودکار شهروند می‌شود؟",
        a: "خیر، اتریش اصل ius sanguinis (تابعیت از طریق خون) را دنبال می‌کند. برای شهروندی کودک، حداقل یکی از والدین باید شرایط قانونی خاص و اقامت دائمی داشته باشد.",
      },
      {
        q: "آیا کودک می‌تواند بعدها خودش درخواست دهد؟",
        a: "بله، کودک پس از رسیدن به سن قانونی (۱۸ سال) می‌تواند با احراز شرایط اقامتی مستقل درخواست تابعیت دهد.",
      },
      {
        q: "آیا تابعیت کودک با تابعیت ایران تعارض دارد؟",
        a: "ایران تابعیت را بر اساس خون و تولد اعطا می‌کند. برای جلوگیری از تابعیت دوگانه، ممکن است نیاز به بررسی حقوقی تخصصی باشد.",
      },
    ],
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const CitizenshipGuide: React.FC = () => {
  const [activePathwayId, setActivePathwayId] = useState<
    "standard" | "spouse" | "refugee" | "birth"
  >("standard");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const activePathway = PATHWAY_METADATA[activePathwayId];

  // ==========================================
  // DYNAMIC SEO (like CityLandingPages)
  // ==========================================
  useEffect(() => {
    if (!activePathway) return;

    document.title = activePathway.seoTitle;

    const updateMetaTag = (
      name: string,
      content: string,
      isProperty: boolean = false
    ) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", activePathway.seoDescription);
    updateMetaTag("keywords", activePathway.seoKeywords);
    updateMetaTag("og:title", activePathway.seoTitle, true);
    updateMetaTag("og:description", activePathway.seoDescription, true);
    updateMetaTag("twitter:title", activePathway.seoTitle);
    updateMetaTag("twitter:description", activePathway.seoDescription);

    // Dynamic JSON-LD schema injection
    document.querySelectorAll(".citizenship-seo-schema").forEach((el) => el.remove());

    const schemaId = `citizenship-${activePathwayId}-schema`;
    const scriptEl = document.createElement("script");
    scriptEl.id = schemaId;
    scriptEl.className = "citizenship-seo-schema";
    scriptEl.type = "application/ld+json";

    const pathwaySchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: activePathway.seoTitle,
      description: activePathway.seoDescription,
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
      datePublished: "2025-01-01",
      dateModified: "2025-01-01",
      inLanguage: "fa",
      about: {
        "@type": "GovernmentService",
        name: activePathway.faName,
        provider: {
          "@type": "GovernmentOrganization",
          name: "جمهوری اتریش",
        },
        areaServed: {
          "@type": "Country",
          name: "Austria",
        },
      },
    };

    scriptEl.textContent = JSON.stringify(pathwaySchema);
    document.head.appendChild(scriptEl);

    return () => {
      document.querySelectorAll(".citizenship-seo-schema").forEach((el) => el.remove());
    };
  }, [activePathwayId, activePathway]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای کامل تابعیت و پاسپورت اتریش ۲۰۲۵",
      description:
        "شرایط، مراحل، مدارک و هزینه‌های دریافت شهروندی اتریش برای فارسی‌زبانان مقیم. راهنمای گام‌به‌گام تابعیت اتریش.",
      author: { "@type": "Organization", name: "اتریش‌نشین" },
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: {
          "@type": "ImageObject",
          url: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
        },
      },
      datePublished: "2025-01-01",
      dateModified: "2025-01-01",
      inLanguage: "fa",
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "مراحل دریافت تابعیت اتریش",
      step: activePathway.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: activePathway.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEO
        title={activePathway.seoTitle}
        description={activePathway.seoDescription}
        keywords={activePathway.seoKeywords}
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans text-right" dir="rtl" id="citizenship-guide-portal">

        {/* ========================================== */}
        {/* PATHWAY SWITCHER */}
        {/* ========================================== */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-stone-100 p-2.5 rounded-[24px] border border-stone-200">
          <span className="text-xs font-black text-stone-600 px-3 py-1.5 sm:py-0 shrink-0">
            📋 انتخاب مسیر تابعیت جهت لود محتوا و سئوی اختصاصی:
          </span>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center">
            {(Object.keys(PATHWAY_METADATA) as Array<keyof typeof PATHWAY_METADATA>).map(
              (key) => {
                const p = PATHWAY_METADATA[key];
                const Icon = p.icon;
                const isActive = activePathwayId === key;
                const activeColors: Record<string, string> = {
                  standard: "bg-sky-600 text-white shadow-md",
                  spouse: "bg-rose-600 text-white shadow-md",
                  refugee: "bg-emerald-600 text-white shadow-md",
                  birth: "bg-amber-600 text-white shadow-md",
                };
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setActivePathwayId(key);
                      setOpenFaq(0);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? activeColors[key]
                        : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                    }`}
                    id={`btn-seo-pathway-${key}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.faName}</span>
                    <span className="text-[9px] bg-black/10 px-1.5 py-0.5 rounded hidden sm:inline">
                      {p.duration}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ========================================== */}
        {/* HERO SECTION (Dynamic) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activePathwayId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
            style={{
              background:
                "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
            }}
          >
            <div className="absolute inset-0">
              <img
                src={HERO_IMAGE}
                alt={activePathway.heroTitle}
                className="w-full h-full object-cover opacity-[0.08]"
                loading="eager"
              />
            </div>

            <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
              🇦🇹
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
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm">
                    <Flag className="w-3.5 h-3.5 text-amber-300" />
                    {activePathway.deName}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/20 border border-amber-300/30 rounded-full text-[11px] font-black backdrop-blur-sm text-amber-100">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    {activePathway.badge}
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                  {activePathway.heroTitle}
                </h1>

                <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-4">
                  {activePathway.slogan}
                </p>

                <p className="text-xs md:text-sm text-rose-200/80 leading-relaxed max-w-3xl border-t border-white/10 pt-4">
                  {activePathway.aboutText}
                </p>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>به‌روزرسانی ۲۰۲۵</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>منابع رسمی اتریش</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>راهنمای گام‌به‌گام</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* ========================================== */}
        {/* STATS ROW (Dynamic) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`stats-${activePathwayId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {activePathway.stats.map((s, i) => (
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
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* INTRO OVERVIEW WITH IMAGE */}
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
                src={VIENNA_IMAGE}
                alt="وین، اتریش"
                className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-2xl p-4 shadow-xl">
              <Flag className="w-6 h-6 mb-1" />
              <div className="text-[10px] font-black opacity-80">اتریش</div>
              <div className="text-xs font-black">تابعیت ۲۰۲۵</div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#c8102e] mb-3">
              <Info className="w-3.5 h-3.5" />
              چرا این مسیر؟
            </div>
            <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
              مزایای تابعیت اتریش
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
              تابعیت اتریش نه تنها به معنای دریافت یک پاسپورت قدرتمند جهانی است،
              بلکه دسترسی نامحدود به حقوق شهروندی اتحادیه اروپا، آزادی سفر به
              بیش از ۱۹۰ کشور، حق زندگی و کار در تمام اروپا را به همراه دارد.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Globe, text: "سفر به ۱۹۰+ کشور" },
                { icon: Euro, text: "حق کار در اتحادیه اروپا" },
                { icon: Scale, text: "حق رأی و مشارکت سیاسی" },
                { icon: Heart, text: "امنیت اجتماعی کامل" },
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
        {/* REQUIREMENTS (Dynamic) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`requirements-${activePathwayId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mb-5">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#c8102e]" />
                شرایط اصلی دریافت تابعیت — {activePathway.faName}
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                شرایط کلیدی که برای این مسیر باید احراز کنید
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePathway.conditions.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
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
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* DOCUMENTS CHECKLIST (Dynamic + Copy) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`documents-${activePathwayId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8"
          >
            <div className="mb-5 flex items-start justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-[#c8102e]" />
                  چک‌لیست مدارک مورد نیاز
                </h2>
                <p className="text-[11px] text-stone-500 font-bold mt-1">
                  لیست کامل مدارکی که برای این مسیر نیاز دارید
                </p>
              </div>
              <button
                onClick={() =>
                  handleCopy(activePathway.documents.join("\n"))
                }
                className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-[10px] font-black text-stone-700 transition-all"
              >
                {copiedValue === activePathway.documents.join("\n") ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>کپی کل لیست</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {activePathway.documents.map((doc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-2.5 bg-white rounded-xl border border-stone-200 p-3 hover:border-[#c8102e]/30 hover:shadow-sm transition-all group"
                >
                  <div className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c8102e] transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 text-[#c8102e] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[11px] font-black text-stone-700 leading-relaxed pt-0.5">
                    {doc}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* TIMELINE STEPS (Dynamic) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`steps-${activePathwayId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-gradient-to-br from-stone-50 to-white rounded-3xl border border-stone-200 p-6 md:p-8"
          >
            <div className="mb-6">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#c8102e]" />
                مراحل گام‌به‌گام — {activePathway.faName}
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                از جمع‌آوری مدارک تا دریافت پاسپورت اتریشی — شش گام کلیدی
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePathway.steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="relative bg-white rounded-3xl border border-stone-200 p-5 overflow-hidden group"
                  >
                    <div className="absolute top-3 left-3 text-4xl font-black text-stone-100 group-hover:text-rose-100 transition-colors">
                      {s.n}
                    </div>
                    <div
                      className={`relative w-11 h-11 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="relative font-black text-stone-900 text-sm mb-1.5">
                      {s.title}
                    </h3>
                    <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">
                      {s.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* TEST INFO WITH IMAGE */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={CEREMONY_IMAGE}
                  alt="مراسم تحلیف شهروندی اتریش"
                  className="w-full h-56 md:h-64 object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg mb-4">
                <BookOpen className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-stone-900 mb-2">
                آزمون شهروندی (Staatsbürgerschaftsprüfung)
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                آزمون شهروندی اتریش دانش پایه‌ای شما را در چهار حوزه اصلی می‌سنجد.
                این آزمون معمولاً به‌صورت کتبی و در مراکز مجاز ایالتی برگزار می‌شود.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { icon: Landmark, label: "تاریخ اتریش" },
                  { icon: Scale, label: "نظام سیاسی" },
                  { icon: MapPin, label: "جغرافیا" },
                  { icon: Heart, label: "ارزش‌های ملی" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-xl p-2.5 border border-indigo-100"
                    >
                      <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="text-[10px] font-black text-stone-700">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <p className="text-[10px] text-stone-500 font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-500" />
                مدت زمان آزمون حدود ۶۰ دقیقه و شامل حدود ۴۰ سوال چندگزینه‌ای است.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* PASSPORT ADVANTAGES WITH IMAGE */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-center bg-white rounded-3xl border border-stone-200 p-6 md:p-8 overflow-hidden"
        >
          <div className="relative order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-black text-emerald-700 mb-3">
              <Star className="w-3.5 h-3.5" />
              پاسپورت قدرتمند جهانی
            </div>
            <h2 className="text-lg md:text-2xl font-black text-stone-900 mb-4 leading-tight">
              پاسپورت اتریش؛ کلید اروپا
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-5">
              پاسپورت اتریش یکی از قدرتمندترین پاسپورت‌های جهان است که به شما
              امکان سفر بدون ویزا به بیش از ۱۹۰ کشور و زندگی، کار و تحصیل در
              تمام ۲۷ کشور اتحادیه اروپا را می‌دهد.
            </p>

            <div className="space-y-2">
              {[
                { icon: Plane, text: "سفر بدون ویزا به ۱۹۰+ کشور" },
                { icon: Briefcase, text: "حق کار و کسب درآمد در اتحادیه اروپا" },
                { icon: GraduationCap, text: "تحصیل رایگان در دانشگاه‌های اروپا" },
                { icon: Heart, text: "دسترسی کامل به سیستم سلامت و رفاه" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-stone-50 rounded-xl p-3 border border-stone-100 hover:bg-emerald-50/50 hover:border-emerald-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-[11px] font-black text-stone-700">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={PASSPORT_IMAGE}
                alt="پاسپورت اتریش"
                className="w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-4 shadow-xl">
              <Globe className="w-6 h-6 mb-1" />
              <div className="text-[10px] font-black opacity-80">رتبه جهانی</div>
              <div className="text-xs font-black">۵ برتر جهان</div>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* FAQ (Dynamic) */}
        {/* ========================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`faq-${activePathwayId}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8"
          >
            <div className="mb-5">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <Info className="w-5 h-5 text-[#c8102e]" />
                سوالات متداول — {activePathway.faName}
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                پاسخ‌های کوتاه به پرتکرارترین سوالات این مسیر
              </p>
            </div>

            <div className="space-y-3">
              {activePathway.faqs.map((faq, i) => (
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
          </motion.div>
        </AnimatePresence>

        {/* ========================================== */}
        {/* WARNING / IMPORTANT */}
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
              نکات مهم قبل از شروع
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>قوانین تابعیت اتریش ممکن است بر اساس ایالت و شرایط فردی متفاوت باشد.</li>
              <li>برای تصمیم‌های حیاتی، حتماً با وکیل مهاجرت یا مشاور رسمی مشورت کنید.</li>
              <li>مدارک ترجمه‌شده رسمی (با مهر مترجم رسمی) الزامی است.</li>
              <li>فرآیند بررسی پرونده ممکن است از چند ماه تا بیش از یک سال طول بکشد.</li>
            </ul>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* OFFICIAL RESOURCES */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start gap-5">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Globe className="w-8 h-8" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-stone-900 mb-2">
                منابع رسمی برای تحقیق بیشتر
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                برای دسترسی به اطلاعات رسمی و به‌روز، از پورتال‌های دولتی اتریش
                و اتریش‌نشین استفاده کنید:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.oesterreich.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Landmark className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  oesterreich.gv.at
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="https://www.bmi.gv.at"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  وزارت کشور اتریش (BMI)
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>

                <a
                  href="https://www.Otrish-Iran.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                >
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  پورتال اتریش‌نشین
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>

              <p className="text-[10px] text-stone-500 font-bold mt-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                اطلاعات رسمی و به‌روز از منابع دولتی اتریش
              </p>
            </div>
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
              همراه شما در مسیر شهروندی
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوالی درباره تابعیت اتریش دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده پاسخگویی به سوالات شما درباره شرایط، مدارک،
              آزمون‌ها و مراحل دریافت شهروندی اتریش است. با ما در تماس باشید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Users className="w-4 h-4" />
                مشاوره در واتس‌اپ
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
              اطلاعات این راهنما صرفاً جنبه آموزشی و راهنمایی دارد و جایگزین مشاوره
              حقوقی رسمی نیست. قوانین مهاجرت و تابعیت اتریش ممکن است تغییر کنند.
              برای تصمیم‌های نهایی، همیشه با منابع رسمی مانند وزارت کشور اتریش
              (BMI) یا وکلای واجد شرایط مشورت کنید. اتریش‌نشین هیچ مسئولیتی در
              قبال تصمیمات مبتنی بر این اطلاعات نمی‌پذیرد.
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

export default CitizenshipGuide;