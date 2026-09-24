import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Award, CheckCircle2, AlertCircle, RefreshCw, Sparkles, ShieldCheck,
  Heart, Zap, Clock, Star, TrendingUp, HelpCircle, ChevronDown,
  Trophy, Target, Lightbulb, BookOpen, Users, Globe, MessageCircle,
  Send, Handshake, Info, ListChecks, GraduationCap, Brain, Recycle,
  Train, Home, Landmark, Scale, Leaf, Gauge, BarChart3, Medal,
  Crown, Gem, Flame, Rocket, ThumbsUp, XCircle, ArrowLeft, ExternalLink
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// FEATURED IMAGES (Unsplash)
// ==========================================
const FEATURED_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    title: "تفکیک زباله در اتریش (Mülltrennung)",
    caption: "قانون کشوری با جریمه‌های تجمعی — تفکیک ۱۰۰٪ الزامی است",
    icon: Recycle,
    tag: "محیط زیست",
  },
  {
    url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    title: "Klimaticket — بلیت اقلیم سراسری",
    caption: "حمل‌ونقل نامحدود در تمام اتریش با یک بلیت سالانه",
    icon: Train,
    tag: "حمل‌ونقل",
  },
  {
    url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    title: "زندگی آپارتمانی در وین",
    caption: "قوانین Hausordnung، ساعات سکوت و آداب همسایگی در اتریش",
    icon: Home,
    tag: "زندگی",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۲", label: "سوال تخصصی", icon: Brain },
  { value: "۹۹٪", label: "قانونی و الزامی", icon: Scale },
  { value: "۴", label: "حوزه ادغام", icon: ListChecks },
  { value: "۳", label: "سطح رتبه", icon: Trophy },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "طبق منابع رسمی ÖIF", color: "text-emerald-600" },
  { icon: Zap, text: "خودآزمایی فوری", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// INTERFACES
// ==========================================
interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
  category: string;
  categoryIcon: any;
  categoryColor: string;
  difficulty: "آسان" | "متوسط" | "سخت";
  source?: string;
}

// ==========================================
// QUIZ QUESTIONS (۱۲ سوال در ۴ حوزه)
// ==========================================
const QUIZ_QUESTIONS: Question[] = [
  // ─────────────────────────────────────────────
  // حوزه ۱: محیط زیست و تفکیک زباله
  // ─────────────────────────────────────────────
  {
    id: 1,
    question: "قوانین تفکیک زباله اتریش (Mülltrennung) چقدر اهمیت دارد و بی‌توجهی به آن چه عواقبی دارد؟",
    options: [
      "اختیاری است و جریمه‌ای متوجه مستاجر نیست.",
      "فوق‌العاده سخت‌گیرانه است؛ رها کردن زباله مخلوط در سطل کاغذ یا پلاستیک، جریمه‌های شارژ تجمعی کل ساختمان را به دنبال دارد.",
      "فقط در شهرهای توریستی نظیر هال‌اشتات اهمیت دارد.",
    ],
    correctIdx: 1,
    explanation: "تفکیک ۱۰۰٪ زباله‌های تر (Biomüll)، کاغذ (Altpapier)، پلاستیک و فلز (Gelber Sack / Gelbe Tonne) و شیشه رنگی و بی‌رنگ (Altglas) در اتریش طبق قانون Abfallwirtschaftsgesetz اجباری است. از ژانویه ۲۰۲۵، تمام بسته‌بندی‌های پلاستیکی و فلزی در سراسر اتریش به‌صورت مشترک در Gelbe Tonne جمع‌آوری می‌شوند. شهرداری‌ها روی سطل‌های زباله آپارتمانی نظارت شدید اعمال می‌کنند و جریمه‌ها به‌صورت تجمعی به کل ساختمان تحمیل می‌شود.",
    category: "تفکیک زباله",
    categoryIcon: Recycle,
    categoryColor: "from-emerald-500 to-teal-600",
    difficulty: "متوسط",
    source: "Abfallwirtschaftsgesetz 2002 §28b",
  },
  {
    id: 2,
    question: "از ژانویه ۲۰۲۵، کدام تغییر اساسی در سیستم جمع‌آوری بسته‌بندی‌های اتریش اعمال شده است؟",
    options: [
      "جمع‌آوری پلاستیک و فلز به‌صورت جداگانه ادامه دارد.",
      "تمام بسته‌بندی‌های سبک و فلزی به‌صورت مشترک در Gelbe Tonne / Gelber Sack جمع‌آوری می‌شوند.",
      "تنها بطری‌های پلاستیکی جمع‌آوری می‌شوند.",
    ],
    correctIdx: 1,
    explanation: "از ۱ ژانویه ۲۰۲۵، در سراسر اتریش تمام بسته‌بندی‌های سبک و فلزی (Leicht- und Metallverpackungen) به‌صورت مشترک در Gelbe Tonne یا Gelber Sack جمع‌آوری می‌شوند. همچنین یک سیستم ودیعه یک‌بارمصرف (Einwegpfand) برای بطری‌ها و قوطی‌های نوشیدنی پلاستیکی و فلزی با ظرفیت ۰.۱ تا ۳ لیتر اجرا شده است — ۲۵ سنت ودیعه به‌ازای هر ظرف که از طریق دستگاه‌های ودیعه در سوپرمارکت‌ها بازگشت داده می‌شود.",
    category: "تفکیک زباله",
    categoryIcon: Recycle,
    categoryColor: "from-emerald-500 to-teal-600",
    difficulty: "سخت",
    source: "tirol.gv.at — Neuerungen in der Abfalltrennung 2025",
  },
  {
    id: 3,
    question: "آیا شیشه رنگی و بی‌رنگ باید جداگانه تفکیک شود و چرا؟",
    options: [
      "خیر، همه شیشه‌ها یکسان هستند.",
      "بله، یک بطری سبز می‌تواند ۵۰۰ کیلوگرم شیشه بی‌رنگ را آلوده کند.",
      "فقط در شهرهای بزرگ تفکیک لازم است.",
    ],
    correctIdx: 1,
    explanation: "بله، تفکیک شیشه رنگی و بی‌رنگ در اتریش کاملاً الزامی است. یک بطری سبز به‌تنهایی می‌تواند ۵۰۰ کیلوگرم شیشه بی‌رنگ را آلوده و غیرقابل استفاده کند. شیشه‌های بی‌رنگ (Weißglas) و رنگی (Buntglas) در مخازن جداگانه جمع‌آوری می‌شوند. این تفکیک دقیق، اتریش را قادر ساخته تا به اهداف بازیافت اتحادیه اروپا دست یابد.",
    category: "تفکیک زباله",
    categoryIcon: Recycle,
    categoryColor: "from-emerald-500 to-teal-600",
    difficulty: "آسان",
    source: "workinaustria.com — Recycling and Waste Management",
  },

  // ─────────────────────────────────────────────
  // حوزه ۲: حمل‌ونقل و Klimaticket
  // ─────────────────────────────────────────────
  {
    id: 4,
    question: "حق اشتراک سالانه حمل‌ونقل عمومی نامحدود اتریش موسوم به چیست؟",
    options: [
      "Kollektivkarte",
      "Meldezettel Ticket",
      "Klimaticket (بلیت اقلیم سراسری)",
    ],
    correctIdx: 2,
    explanation: "بلیت Klimaticket Ö یکی از پیشروترین اقدامات حمل‌ونقلی دنیا است که با بهای سالانه، امکان جابجایی نامحدود با کلیه متروها، اتوبوس‌ها و قطارهای سراسری ÖBB را فراهم می‌آورد. قیمت نسخه سراسری در سال ۲۰۲۶ معادل ۱,۴۰۰ یورو است (۱,۰۵۰ یورو برای جوانان زیر ۲۶ سال و سالمندان بالای ۶۵ سال) و در اپلیکیشن‌های ÖBB، WESTbahn و Wiener Linien قابل نمایش است.",
    category: "حمل‌ونقل",
    categoryIcon: Train,
    categoryColor: "from-blue-500 to-indigo-600",
    difficulty: "متوسط",
    source: "klimaticket.at — KlimaTicket Ö 2026",
  },
  {
    id: 5,
    question: "کدام یک از گزینه‌های زیر در Klimaticket Ö پوشش داده نمی‌شود؟",
    options: [
      "قطارهای منطقه‌ای ÖBB",
      "مترو و اتوبوس شهری وین",
      "قطارهای توریستی مانند Schneebergbahn",
    ],
    correctIdx: 2,
    explanation: "Klimaticket Ö تمام سرویس‌های حمل‌ونقل عمومی برنامه‌ریزی‌شده (قطارهای دولتی و خصوصی، حمل‌ونقل شهری و منطقه‌ای) را در بر می‌گیرد. اما قطارهای توریستی مانند Schneebergbahn، Waldviertelbahn و Schafbergbahn از پوشش خارج هستند. همچنین این بلیت برای پرسنل نظامی و خدمات عمرانی پایه به‌صورت رایگان صادر می‌شود.",
    category: "حمل‌ونقل",
    categoryIcon: Train,
    categoryColor: "from-blue-500 to-indigo-600",
    difficulty: "آسان",
    source: "oesterreich.gv.at — Climate ticket",
  },
  {
    id: 6,
    question: "هزینه Klimaticket Ö در سال ۲۰۲۶ چقدر است؟",
    options: [
      "۱,۳۰۰ یورو",
      "۱,۴۰۰ یورو",
      "۹۷۵ یورو",
    ],
    correctIdx: 1,
    explanation: "قیمت Klimaticket Ö سراسری از ۱ ژانویه ۲۰۲۶ به ۱,۴۰۰ یورو افزایش یافته است (۱,۰۵۰ یورو برای رده‌های سنی جوان/سالمند). این قیمت معادل ۱۱۶.۶۷ یورو در ماه است. همچنین کارفرمایان می‌توانند بلیت Klimaticket را به‌صورت معاف از مالیات برای کارمندان خود خریداری کنند.",
    category: "حمل‌ونقل",
    categoryIcon: Train,
    categoryColor: "from-blue-500 to-indigo-600",
    difficulty: "متوسط",
    source: "BMIMI — Preis des Klimatickets 2026",
  },

  // ─────────────────────────────────────────────
  // حوزه ۳: اداره مهاجرت MA 35
  // ─────────────────────────────────────────────
  {
    id: 7,
    question: "ساعات مجاز جهت تمدید یا تحویل اسناد موقت به اداره اقامت وین MA 35 چگونه است؟",
    options: [
      "باید بدون وقت قبلی در ساعات نیمروز رفت.",
      "صرفاً با داشتن وقت قبلی (Termin) و تأییدیه بارکددار ورودی امکان‌پذیر است، مگر در موارد معدود نقص مدرک اضطراری.",
      "همانند ایران بعد از ظهرها نیز باز هستند.",
    ],
    correctIdx: 1,
    explanation: "اداره MA 35 اتریش فوق‌العاده روی زمان‌بندی دقیق و داشتن برگه نوبت بارکددار رسمی حساس است. مراجعه بدون وقت به سالن‌های انتظار مراجع رسمی اتریش امکان‌پذیر نیست. نوبت‌دهی آنلاین از طریق پورتال رسمی شهر وین (ticket.wien.gv.at/M35) انجام می‌شود. از سال ۲۰۲۰، نوبت‌دهی آنلاین در تمام دفاتر MA 35 در سراسر وین فعال شده است.",
    category: "اداره MA 35",
    categoryIcon: Landmark,
    categoryColor: "from-red-500 to-rose-600",
    difficulty: "متوسط",
    source: "wien.gv.at — MA 35 Online-Terminvereinbarung",
  },
  {
    id: 8,
    question: "مدت زمان انتظار برای اولین جلسه مشاوره (Erstinfo-Gespräch) در MA 35 وین چقدر کاهش یافته است؟",
    options: [
      "از ۱ سال به حدود ۶ ماه",
      "از ۶ ماه به ۱ ماه",
      "بدون تغییر باقی مانده است",
    ],
    correctIdx: 0,
    explanation: "طبق گزارش رسمی شهر وین، زمان انتظار برای اولین جلسه مشاوره (Erstinfo-Gespräch) در MA 35 از حدود ۱ سال به حدود ۶ ماه کاهش یافته است. نوبت‌های آزاد از سپتامبر از طریق پورتال رسمی ticket.wien.gv.at قابل رزرو هستند. این بهبود نتیجه افزایش نیروی انسانی و سیستم نوبت‌دهی آنلاین است.",
    category: "اداره MA 35",
    categoryIcon: Landmark,
    categoryColor: "from-red-500 to-rose-600",
    difficulty: "سخت",
    source: "presse.wien.gv.at — Wartezeit um 50% reduziert",
  },
  {
    id: 9,
    question: "برای درخواست تمدید اقامت (Verlängerungsantrag) در MA 35، کدام روش صحیح است؟",
    options: [
      "مراجعه حضوری بدون وقت قبلی",
      "ارسال پستی مدارک بدون نیاز به نوبت",
      "رزرو نوبت آنلاین از طریق پورتال رسمی شهر وین",
    ],
    correctIdx: 2,
    explanation: "تمامی درخواست‌های تمدید اقامت در MA 35 نیازمند رزرو نوبت آنلاین از طریق پورتال رسمی شهر وین هستند. در حال حاضر نوبت‌دهی در هر یک از دفاتر MA 35 در سراسر وین امکان‌پذیر است. همچنین از طریق شماره سرویس +43 1 4000-3535 می‌توانید اطلاعات لازم را کسب کنید.",
    category: "اداره MA 35",
    categoryIcon: Landmark,
    categoryColor: "from-red-500 to-rose-600",
    difficulty: "آسان",
    source: "wien.gv.at — MA 35 Terminbuchung",
  },

  // ─────────────────────────────────────────────
  // حوزه ۴: زندگی آپارتمانی و ادغام
  // ─────────────────────────────────────────────
  {
    id: 10,
    question: "آیا مستاجر در اتریش می‌تواند بدون اجازه صاحبخانه حیوان خانگی نگه دارد؟",
    options: [
      "بله، همیشه آزاد است.",
      "خیر، باید ابتدا در قرارداد اجاره یا Hausordnung (آیین‌نامه ساختمان) بررسی کند.",
      "فقط سگ و گربه مجاز هستند.",
    ],
    correctIdx: 1,
    explanation: "در اتریش، قوانین نگهداری حیوان خانگی در قرارداد اجاره (Mietvertrag) یا آیین‌نامه ساختمان (Hausordnung) مشخص می‌شود. هر ساختمان ممکن است قوانین متفاوتی داشته باشد. طبق محتوای آزمون Werte- und Orientierungswissen سازمان ÖIF، مستاجر باید ابتدا قوانین ساختمان را بررسی کند. نقض این قوانین می‌تواند به اخطار کتبی یا حتی فسخ قرارداد منجر شود.",
    category: "زندگی آپارتمانی",
    categoryIcon: Home,
    categoryColor: "from-amber-500 to-orange-600",
    difficulty: "متوسط",
    source: "ÖIF — Beispielfragen Werte- und Orientierungswissen A2",
  },
  {
    id: 11,
    question: "کدام یک از موارد زیر جزو قوانین آداب همسایگی در ساختمان‌های اتریشی نیست؟",
    options: [
      "رعایت ساعات سکوت (Ruhezeiten) بین ۲۲:۰۰ تا ۰۶:۰۰",
      "تمیز نگه داشتن راه‌پله و فضاهای مشترک",
      "دعوت از مهمانان بدون هماهنگی قبلی در هر ساعتی از شبانه‌روز",
    ],
    correctIdx: 2,
    explanation: "در ساختمان‌های اتریشی، رعایت ساعات سکوت (Ruhezeiten) معمولاً بین ۲۲:۰۰ تا ۰۶:۰۰ الزامی است. تمیز نگه داشتن فضاهای مشترک (راه‌پله، حیاط) جزو وظایف مستاجر است. برگزاری مهمانی‌های پر سر و صدا در ساعات سکوت می‌تواند منجر به شکایت همسایه‌ها و دخالت پلیس شود. قوانین دقیق در Hausordnung ساختمان مشخص شده و مستاجر موظف به رعایت آن است.",
    category: "زندگی آپارتمانی",
    categoryIcon: Home,
    categoryColor: "from-amber-500 to-orange-600",
    difficulty: "آسان",
    source: "ÖIF — Mein Leben in Österreich",
  },
  {
    id: 12,
    question: "طبق قانون جدید ادغام اتریش (۲۰۲۵)، چه چیزی برای مهاجران جدید الزامی شده است؟",
    options: [
      "شرکت در آزمون رانندگی اتریش",
      "شرکت در دوره ۵ روزه ارزش‌ها و جهت‌یابی (Wertekurs) و امضای Integrationserklärung",
      "عضویت در یک باشگاه ورزشی محلی",
    ],
    correctIdx: 1,
    explanation: "طبق قانون جدید ادغام اتریش، تمامی مهاجران جدید باید در یک دوره ۵ روزه «ارزش‌ها و جهت‌یابی» (Wertekurs) شرکت کنند و در پایان، یک «اعلامیه ادغام» (Integrationserklärung) امضا کنند که در آن به ارزش‌های اجتماعی اتریش تعهد می‌دهند. این دوره حول سه محور «زبان آلمانی، کار و ارزش‌ها» طراحی شده است. عدم شرکت می‌تواند بر وضعیت اقامت تأثیر بگذارد.",
    category: "زندگی آپارتمانی",
    categoryIcon: Home,
    categoryColor: "from-amber-500 to-orange-600",
    difficulty: "سخت",
    source: "Ausländerrecht — Wertekurs 2025",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا این آزمون ادغام رسمی است و در رزومه مهاجرتی تأثیر دارد؟",
    a: "خیر، این یک آزمون خودارزیابی آموزشی است. آزمون رسمی ادغام (Integrationsprüfung) توسط ÖIF برگزار می‌شود و شامل دو بخش زبان (A1/A2/B1) و ارزش‌ها و جهت‌یابی است. این ابزار برای آماده‌سازی شما طراحی شده تا با قوانین کلیدی اتریش قبل از آزمون رسمی آشنا شوید.",
  },
  {
    q: "آزمون ارزش‌ها و جهت‌یابی (Werte- und Orientierungswissen) رسمی شامل چه مباحثی است؟",
    a: "طبق چارچوب ÖIF، آزمون رسمی شامل این حوزه‌ها است: دانش عمومی اتریش (تاریخ، جغرافیا، نظام سیاسی)، آموزش و زبان، کار و اقتصاد، سلامت، مسکن و همسایگی، و اصول قانونی و کثرت‌گرایی. پاسخ‌دهی به سوالات به زبان آلمانی در سطح A2 یا B1 انجام می‌شود.",
  },
  {
    q: "چرا تفکیک زباله در اتریش تا این حد جدی گرفته می‌شود؟",
    a: "اتریش یکی از پیشروترین کشورهای جهان در بازیافت است. طبق قانون Abfallwirtschaftsgesetz (2002)، هر ساکن اتریش قانوناً موظف به تفکیک زباله است. اهداف بازیافت اتحادیه اروپا نیز اتریش را ملزم به رسیدن به نرخ‌های بالای بازیافت کرده است. تخلف می‌تواند جریمه‌های تجمعی برای کل ساختمان به دنبال داشته باشد.",
  },
  {
    q: "آیا Klimaticket Ö برای همه مقرون‌به‌صرفه است؟",
    a: "اگر بیش از ۱۱۶ یورو در ماه برای حمل‌ونقل عمومی هزینه می‌کنید (مثلاً مسافران روزانه بین شهرها)، Klimaticket Ö کاملاً مقرون‌به‌صرفه است. برای ساکنان شهری که فقط از مترو استفاده می‌کنند، بلیت‌های منطقه‌ای (مانند Wiener Linien Jahreskarte) ارزان‌تر است. همچنین کارفرمایان می‌توانند Klimaticket را معاف از مالیات تهیه کنند.",
  },
  {
    q: "چطور برای MA 35 نوبت آنلاین بگیرم؟",
    a: "از طریق پورتال رسمی شهر وین ticket.wien.gv.at/M35 یا وب‌سایت wien.gv.at. ابتدا نوع درخواست خود را انتخاب کنید (تمدید اقامت، اولین درخواست، شهروندی)، سپس نزدیک‌ترین دفتر MA 35 را انتخاب و نوبت رزرو کنید. تأییدیه بارکددار را همراه داشته باشید، در غیر این صورت اجازه ورود نخواهید داشت.",
  },
  {
    q: "اگر در آزمون ادغام رسمی رد شوم چه اتفاقی می‌افتد؟",
    a: "در صورت رد شدن، می‌توانید آزمون را تکرار کنید. طبق قانون، شما اجازه دو بار تلاش مجدد دارید. اگر همچنان موفق نشوید، ممکن است بر تمدید اقامت شما تأثیر بگذارد. به همین دلیل آماده‌سازی با ابزارهایی مانند همین خودآزمایی توصیه می‌شود.",
  },
];

// ==========================================
// RANK SYSTEM
// ==========================================
const RANK_LEVELS = [
  {
    minScore: 100,
    title: "مهاجر نخبه اتریش‌دان",
    german: "Wien-Experte",
    color: "from-amber-400 to-orange-500",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    text: "text-amber-800",
    icon: Crown,
    emoji: "🏆",
    message: "فوق‌العاده! شما آماده آزمون رسمی ادغام هستید. دانش شما از قوانین کلیدی اتریش در سطح عالی است.",
  },
  {
    minScore: 70,
    title: "مهاجر آگاه و متعهد",
    german: "Österreich-Kenner",
    color: "from-blue-400 to-indigo-500",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
    text: "text-blue-800",
    icon: Medal,
    emoji: "🥈",
    message: "عالی! شما دانش خوبی از قوانین اتریش دارید. با مرور نکات ضعف، آماده آزمون رسمی خواهید بود.",
  },
  {
    minScore: 40,
    title: "مهاجر متوسط‌آشنا",
    german: "Österreich-Novize",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    text: "text-emerald-800",
    icon: ThumbsUp,
    emoji: "🥉",
    message: "قابل قبول! با مرور توضیحات سوالات و مطالعه منابع ÖIF می‌توانید آمادگی خود را به‌طور قابل توجهی افزایش دهید.",
  },
  {
    minScore: 0,
    title: "تازه‌وارد در حال یادگیری",
    german: "Neuling",
    color: "from-stone-400 to-stone-600",
    bg: "bg-gradient-to-br from-stone-50 to-stone-100",
    text: "text-stone-700",
    icon: BookOpen,
    emoji: "📚",
    message: "شروع خوبی بود! توصیه می‌کنیم توضیحات هر سوال را با دقت مطالعه کنید و منابع رسمی ÖIF را بررسی کنید.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function IntegrationAcademy() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [answersHistory, setAnswersHistory] = useState<
    { correct: boolean; questionId: number }[]
  >([]);

  // ==========================================
  // HANDLERS
  // ==========================================
  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    const isCorrect = selectedOpt === QUIZ_QUESTIONS[currentIdx].correctIdx;
    if (isCorrect) setScore((prev) => prev + 10);
    setAnswersHistory((prev) => [
      ...prev,
      { correct: isCorrect, questionId: QUIZ_QUESTIONS[currentIdx].id },
    ]);
    setIsSubmitted(true);
    if (isCorrect) {
      toast.success("پاسخ صحیح! +۱۰ امتیاز");
    } else {
      toast.error("پاسخ نادرست — توضیح را مطالعه کنید");
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      toast.success("آزمون به پایان رسید!");
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersHistory([]);
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const maxScore = QUIZ_QUESTIONS.length * 10;
  const percentage = Math.round((score / maxScore) * 100);

  // Get rank based on score
  const getRank = () => {
    for (const rank of RANK_LEVELS) {
      if (score >= rank.minScore) return rank;
    }
    return RANK_LEVELS[RANK_LEVELS.length - 1];
  };
  const rank = getRank();
  const RankIcon = rank.icon;

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
      description:
        "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — راهنماهای رسمی ادغام و فرهنگ",
    },
    {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: "آکادمی ادغام فرهنگی اتریش — خودآزمایی قوانین کلیدی",
      description:
        "خودآزمایی تعاملی ۱۲ سوالی در ۴ حوزه: تفکیک زباله (Mülltrennung)، Klimaticket، اداره مهاجرت MA 35 و زندگی آپارتمانی. بر اساس منابع رسمی ÖIF و قوانین اتریش.",
      educationalLevel: "Beginner to Intermediate",
      about: {
        "@type": "Thing",
        name: "Integration in Österreich",
      },
      hasPart: QUIZ_QUESTIONS.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.options[q.correctIdx],
        },
        suggestedAnswer: q.options
          .filter((_, i) => i !== q.correctIdx)
          .map((opt) => ({
            "@type": "Answer",
            text: opt,
          })),
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
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "خانه",
          item: "https://otrish-iran.ir",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "آکادمی ادغام",
          item: "https://otrish-iran.ir/integration",
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="آکادمی ادغام فرهنگی اتریش ۲۰۲۶ | خودآزمایی ۱۲ سوالی قوانین کلیدی | اتریش‌نشین"
        description="خودآزمایی تعاملی ۱۲ سوالی درباره قوانین کلیدی اتریش: تفکیک زباله (Mülltrennung)، بلیت Klimaticket، اداره مهاجرت MA 35 و زندگی آپارتمانی. با توضیحات کامل و رتبه‌بندی نهایی. رایگان و به‌روز ۲۰۲۶."
        keywords="آزمون ادغام اتریش, Werte- und Orientierungswissen, تفکیک زباله اتریش, Mülltrennung, Klimaticket, MA 35, قوانین زندگی در اتریش, آزمون ÖIF, ادغام در اتریش, فرهنگ اتریش, زندگی آپارتمانی وین, Integrationsprüfung"
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
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🎓
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — بر اساس منابع رسمی ÖIF
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                آکادمی
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300"> ادغام فرهنگی اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-4">
                خودآزمایی ۱۲ سوالی در ۴ حوزه کلیدی: تفکیک زباله (Mülltrennung)،
                بلیت Klimaticket، اداره مهاجرت MA 35 و زندگی آپارتمانی. با توضیحات
                کامل، رتبه‌بندی نهایی و منابع رسمی.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>۱۲ سوال تخصصی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>منابع ÖIF</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روز ۲۰۲۶</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => {
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
                  <Icon className="w-6 h-6 text-[#c8102e]" />
                </div>
                <div className="text-lg font-black text-[#c8102e]">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* TRUST BADGES */}
        {/* ========================================== */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_BADGES.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-center gap-2 justify-center">
                <Icon className={`w-4 h-4 ${b.color}`} />
                <span className="text-[11px] font-black text-stone-700">
                  {b.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* FEATURED IMAGES GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#c8102e]" />
              ۴ حوزه کلیدی ادغام در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دانش خود را در مهم‌ترین قوانین زندگی در اتریش بسنجید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>

                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">
                        #{img.tag}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
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
          className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-blue-900 text-sm mb-1 flex items-center gap-2">
              راهنمای استفاده از خودآزمایی
            </h3>
            <p className="text-[11px] text-blue-800 font-bold leading-relaxed">
              هر پاسخ صحیح ۱۰ امتیاز دارد (حداکثر ۱۲۰). پس از هر پاسخ، توضیح کامل
              با منبع رسمی نمایش داده می‌شود. در پایان، رتبه شما بر اساس ۴ سطح
              (تازه‌وارد تا نخبه) مشخص می‌شود. توصیه می‌کنیم قبل از آزمون رسمی ÖIF،
              این خودآزمایی را تکرار کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN QUIZ */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm overflow-hidden relative"
          id="integration-academy"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-500 to-[#c8102e] rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-md">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    آکادمی ادغام فرهنگی اتریش‌نشین
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    خودآزمایی قوانین تفکیک زباله، Klimaticket، MA 35 و زندگی آپارتمانی
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-red-50 text-[#c8102e] border border-red-200 px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse" />
                نسخه رسمی ۲۰۲۶
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={`q-${currentIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Progress bar */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
                  <div className="flex justify-between items-center mb-2.5 flex-wrap gap-2">
                    <span className="text-[10px] bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white px-3 py-1 rounded-lg font-black inline-flex items-center gap-1.5">
                      <Target className="w-3 h-3" />
                      امتیاز: {score} از {maxScore}
                    </span>
                    <span className="text-xs text-stone-500 font-black flex items-center gap-1.5">
                      <ListChecks className="w-3.5 h-3.5 text-[#c8102e]" />
                      سوال {currentIdx + 1} از {QUIZ_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#c8102e] to-rose-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Category badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-black text-white bg-gradient-to-br ${currentQ.categoryColor} px-3 py-1.5 rounded-full shadow-sm`}
                  >
                    <currentQ.categoryIcon className="w-3.5 h-3.5" />
                    {currentQ.category}
                  </span>
                  <span
                    className={`text-[9px] font-black px-2.5 py-1 rounded-full ${
                      currentQ.difficulty === "آسان"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : currentQ.difficulty === "متوسط"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {currentQ.difficulty}
                  </span>
                </div>

                {/* Question */}
                <h3 className="font-black text-stone-900 text-sm leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* Options */}
                <div className="flex flex-col gap-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    const isCorrect = idx === currentQ.correctIdx;
                    let borderClass = "border-stone-200";
                    let bgClass = "bg-white";
                    let textClass = "text-stone-700";
                    let IconComp = null;

                    if (isSubmitted) {
                      if (isCorrect) {
                        borderClass = "border-emerald-500 bg-emerald-50/50";
                        textClass = "text-emerald-900";
                        IconComp = CheckCircle2;
                      } else if (isSelected) {
                        borderClass = "border-rose-500 bg-rose-50/50";
                        textClass = "text-rose-900";
                        IconComp = XCircle;
                      }
                    } else if (isSelected) {
                      borderClass = "border-[#c8102e] bg-red-50/30";
                      textClass = "text-stone-900";
                    }

                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => setSelectedOpt(idx)}
                        whileHover={!isSubmitted ? { x: -4 } : {}}
                        whileTap={!isSubmitted ? { scale: 0.98 } : {}}
                        className={`w-full text-right p-4 rounded-2xl border-2 ${borderClass} ${bgClass} ${textClass} text-xs font-black leading-relaxed transition-all cursor-pointer flex items-start gap-3 ${
                          isSubmitted ? "cursor-default" : ""
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 transition-all ${
                            isSelected && !isSubmitted
                              ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white"
                              : isSubmitted && isCorrect
                              ? "bg-emerald-500 text-white"
                              : isSubmitted && isSelected && !isCorrect
                              ? "bg-rose-500 text-white"
                              : "bg-stone-100 text-stone-500"
                          }`}
                        >
                          {String.fromCharCode(1575 + idx) /* ا ب ج */}
                        </div>
                        <span className="flex-1">{opt}</span>
                        {IconComp && (
                          <IconComp
                            className={`w-5 h-5 flex-shrink-0 ${
                              isCorrect ? "text-emerald-600" : "text-rose-600"
                            }`}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center gap-2.5 pt-3 flex-wrap">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleSubmitAnswer}
                      disabled={selectedOpt === null}
                      className={`flex-1 min-w-[140px] text-xs font-black px-5 py-3 rounded-2xl cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2 ${
                        selectedOpt === null
                          ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                          : "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white hover:scale-[1.02] shadow-lg"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      بررسی پاسخ
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="flex-1 min-w-[180px] bg-gradient-to-br from-stone-900 to-stone-700 hover:from-stone-800 hover:to-stone-600 text-white text-xs font-black px-5 py-3 rounded-2xl cursor-pointer shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      {currentIdx + 1 < QUIZ_QUESTIONS.length
                        ? "سوال بعدی"
                        : "نمایش کارنامه و رتبه"}
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`p-4 rounded-2xl border-2 ${
                          selectedOpt === currentQ.correctIdx
                            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                            : "bg-gradient-to-br from-rose-50 to-red-50 border-rose-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 justify-end text-right font-black mb-2">
                          <span
                            className={`text-xs ${
                              selectedOpt === currentQ.correctIdx
                                ? "text-emerald-800"
                                : "text-rose-800"
                            }`}
                          >
                            {selectedOpt === currentQ.correctIdx
                              ? "پاسخ صحیح!"
                              : "پاسخ نادرست — توضیح کامل:"}
                          </span>
                          {selectedOpt === currentQ.correctIdx ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-700 leading-relaxed font-bold">
                          {currentQ.explanation}
                        </p>
                        {currentQ.source && (
                          <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center gap-1.5 justify-end">
                            <span className="text-[9px] text-stone-500 font-black">
                              منبع رسمی: {currentQ.source}
                            </span>
                            <ExternalLink className="w-3 h-3 text-stone-400" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* ========================================== */
              /* RESULT SCREEN */
              /* ========================================== */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                {/* Rank Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${rank.color} shadow-2xl`}
                >
                  <span className="text-5xl">{rank.emoji}</span>
                </motion.div>

                <div className="space-y-2">
                  <h4 className="font-black text-stone-900 text-lg">
                    آزمون با موفقیت به پایان رسید!
                  </h4>
                  <p className="text-xs text-stone-500 font-bold max-w-md mx-auto leading-relaxed">
                    {rank.message}
                  </p>
                </div>

                {/* Score Card */}
                <div className="inline-block p-6 bg-gradient-to-br from-stone-50 to-stone-100 border-2 border-stone-200 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-2 justify-center mb-3">
                    <BarChart3 className="w-4 h-4 text-[#c8102e]" />
                    <span className="text-[10px] text-stone-500 font-black uppercase">
                      کارنامه علمی شما
                    </span>
                  </div>

                  {/* Score circle */}
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e7e5e4"
                        strokeWidth="10"
                        fill="none"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#scoreGradient)"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                        animate={{
                          strokeDashoffset:
                            2 * Math.PI * 56 * (1 - percentage / 100),
                        }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient
                          id="scoreGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#c8102e" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-[#c8102e]">
                        {percentage}%
                      </span>
                      <span className="text-[10px] text-stone-500 font-black">
                        {score} / {maxScore}
                      </span>
                    </div>
                  </div>

                  {/* Rank badge */}
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-black px-4 py-2 rounded-2xl bg-gradient-to-br ${rank.color} text-white shadow-md`}
                    >
                      <RankIcon className="w-4 h-4" />
                      {rank.title}
                    </span>
                  </div>

                  <p className="text-[10px] text-stone-500 font-bold mb-1">
                    رتبه بین‌المللی: {rank.german}
                  </p>
                </div>

                {/* Answer Review */}
                <div className="max-w-md mx-auto">
                  <h5 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2 justify-center">
                    <ListChecks className="w-4 h-4 text-[#c8102e]" />
                    مرور پاسخ‌های شما
                  </h5>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {answersHistory.map((ans, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.05 }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black ${
                          ans.correct ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      >
                        {i + 1}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-2.5 flex-wrap pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-xs font-black px-5 py-3 rounded-2xl inline-flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    شروع مجدد خودآزمایی
                  </button>
                  <a
                    href="https://wa.me/436889763256"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-emerald-500 to-green-600 text-white text-xs font-black px-5 py-3 rounded-2xl inline-flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    مشاوره با کارشناس
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#c8102e]" />
              چرا دانش ادغام فرهنگی اهمیت دارد؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              آمار و حقایقی درباره آزمون رسمی و ادغام در اتریش
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "۵ روز",
                text: "دوره اجباری Wertkurs برای تمام مهاجران جدید طبق قانون ۲۰۲۵",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: BookOpen,
                title: "A2 / B1",
                text: "سطح زبان آلمانی لازم برای قبولی در آزمون رسمی ادغام ÖIF",
                color: "from-blue-500 to-indigo-600",
              },
              {
                icon: Users,
                title: "۶ حوزه",
                text: "آزمون رسمی شامل: دانش عمومی، آموزش، کار، سلامت، مسکن و ادغام قانونی",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: Trophy,
                title: "۲ تلاش",
                text: "امکان دو بار تلاش مجدد در صورت رد شدن در آزمون رسمی ادغام",
                color: "from-purple-500 to-fuchsia-600",
              },
            ].map((v, i) => {
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
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div
                    className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}
                  >
                    {v.title}
                  </div>
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره آزمون ادغام
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
        {/* FINAL CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#431407] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در مسیر ادغام
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              نیاز به آماده‌سازی بیشتر برای آزمون رسمی دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین با تجربه همراهی فارسی‌زبانان، آماده کمک به شما
              برای آمادگی آزمون ادغام رسمی ÖIF، منابع مطالعاتی و راهنمایی درباره
              قوانین زندگی در اتریش هستند.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
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
              این خودآزمایی بر اساس منابع رسمی ÖIF (Österreichischer
              Integrationsfonds)، قوانین Abfallwirtschaftsgesetz 2002، پورتال
              klimaticket.at، وب‌سایت رسمی شهر وین و محتوای آزمون Werte- und
              Orientierungswissen تهیه شده است. این ابزار آموزشی است و جایگزین آزمون
              رسمی ادغام (Integrationsprüfung) نمی‌شود. برای اطلاعات نهایی، همیشه به
              منابع رسمی مراجعه کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه
              است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#c8102e]" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "آزمون ادغام اتریش",
              "Werte- und Orientierungswissen",
              "تفکیک زباله اتریش",
              "Mülltrennung",
              "Klimaticket",
              "MA 35",
              "قوانین زندگی در اتریش",
              "ÖIF",
              "آزمون ادغام ÖIF",
              "زندگی آپارتمانی وین",
              "Integrationsprüfung",
              "Abfallwirtschaftsgesetz",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-red-50 hover:border-red-300 hover:text-[#c8102e] transition-all cursor-default"
              >
                #{tag}
              </span>
            ))}
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