import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar, ChevronLeft, ChevronDown, MapPin, Clock, Users, Sparkles,
  Award, Star, Heart, Share2, Bookmark, Ticket, ExternalLink, Filter,
  Globe, Music, Palette, MessageCircle, Send, Handshake, Info,
  CheckCircle, HelpCircle, TrendingUp, Zap, ShieldCheck, Camera,
  Mic, Coffee, PartyPopper, Cake, Theater, BookOpen, GraduationCap,
  Landmark, Sun, Moon, Snowflake, Flower2, Play, ArrowLeft, X,
  Search, SlidersHorizontal, Grid3x3, List, Eye, HeartHandshake,
  Lightbulb, UserCheck, Radio, Podcast, Trophy, Target, BarChart3,
  RefreshCw, Bell, BellRing, Download, Share
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
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    title: "کنسرت‌ها و اجراهای زنده",
    caption: "هنرمندان برجسته ایرانی و بین‌المللی در وین و اتریش",
    icon: Music,
    tag: "موسیقی",
  },
  {
    url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    title: "جشن‌ها و مهمانی‌های ایرانی",
    caption: "شب یلدا، نوروز و دورهمی‌های فرهنگی فارسی‌زبانان",
    icon: PartyPopper,
    tag: "جشن",
  },
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    title: "کارگاه‌ها و رویدادهای آموزشی",
    caption: "وبینارها، کارگاه‌ها و رویدادهای فرهنگی و حقوقی",
    icon: GraduationCap,
    tag: "آموزشی",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۱۰+", label: "رویداد فعال", icon: Calendar },
  { value: "۶", label: "دسته رویداد", icon: Filter },
  { value: "۴", label: "شهر اتریش", icon: MapPin },
  { value: "۲۰۲۶", label: "به‌روزرسانی", icon: Clock },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "منابع رسمی", color: "text-emerald-600" },
  { icon: Zap, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "منابع معتبر", color: "text-indigo-600" },
];

// ==========================================
// EVENT CATEGORIES
// ==========================================
const EVENT_CATEGORIES = [
  { id: "all", name: "همه رویدادها", icon: Grid3x3, color: "from-indigo-500 to-blue-600" },
  { id: "concert", name: "کنسرت و اجرا", icon: Music, color: "from-purple-500 to-fuchsia-600" },
  { id: "festival", name: "جشن و فستیوال", icon: PartyPopper, color: "from-rose-500 to-pink-600" },
  { id: "workshop", name: "کارگاه و وبینار", icon: GraduationCap, color: "from-blue-500 to-indigo-600" },
  { id: "cultural", name: "فرهنگی و هنری", icon: Palette, color: "from-emerald-500 to-teal-600" },
  { id: "social", name: "دورهمی اجتماعی", icon: Users, color: "from-amber-500 to-orange-600" },
  { id: "comedy", name: "کمدی و تئاتر", icon: Theater, color: "from-red-500 to-rose-600" },
];

// ==========================================
// EVENTS DATA
// ==========================================
interface Event {
  id: number;
  title: string;
  titleEn: string;
  date: string;
  dateEn: string;
  month: string;
  day: string;
  location: string;
  venue: string;
  city: string;
  type: string;
  category: string;
  description: string;
  price: string;
  time: string;
  icon: any;
  color: string;
  featured: boolean;
  source: string;
  sourceUrl: string;
  tags: string[];
}

const EVENTS_DATA: Event[] = [
  {
    id: 1,
    title: "نمایشگاه هنرهای تجسمی معاصر ایران و اتریش",
    titleEn: "Contemporary Iranian-Austrian Visual Arts Exhibition",
    date: "۲۰ تیر ۱۴۰۵",
    dateEn: "July 11, 2026",
    month: "تیر",
    day: "۲۰",
    location: "موزه هنرهای معاصر وین",
    venue: "Museum Moderner Kunst Wien",
    city: "وین",
    type: "نمایشگاه",
    category: "cultural",
    description: "نمایشگاه مشترک هنرمندان معاصر ایرانی و اتریشی با محوریت تبادل فرهنگی و هنرهای تجسمی مدرن.",
    price: "رایگان",
    time: "۱۰:۰۰ - ۱۸:۰۰",
    icon: Palette,
    color: "from-emerald-500 to-teal-600",
    featured: true,
    source: "gelbeseiten.irani.at",
    sourceUrl: "https://gelbeseiten.irani.at/events/austria/wien/wien/",
    tags: ["هنر", "نمایشگاه", "فرهنگی"],
  },
  {
    id: 2,
    title: "کنسرت زنده ساسی (Sasy) در وین",
    titleEn: "Sasy Live in Vienna",
    date: "۶ نوامبر ۲۰۲۶",
    dateEn: "November 6, 2026",
    month: "نوامبر",
    day: "۶",
    location: "سالن پارادایس (Paradise Hall)",
    venue: "Paradise Hall",
    city: "وین",
    type: "کنسرت",
    category: "concert",
    description: "اجرای زنده ساسی، خواننده محبوب ایرانی، با رپرتوار جدید در سالن پارادایس وین.",
    price: "از ۴۵ یورو",
    time: "۲۰:۰۰",
    icon: Music,
    color: "from-purple-500 to-fuchsia-600",
    featured: true,
    source: "volek.events",
    sourceUrl: "https://volek.events/event-tag/vienna/",
    tags: ["موسیقی", "کنسرت", "پاپ"],
  },
  {
    id: 3,
    title: "وبینار مجازی: آشنایی با قوانین مهاجرت و اقامت ۲۰۲۶",
    titleEn: "Webinar: Immigration & Residence Laws 2026",
    date: "۲۸ تیر ۱۴۰۵",
    dateEn: "July 19, 2026",
    month: "تیر",
    day: "۲۸",
    location: "آنلاین (Zoom)",
    venue: "Online Webinar",
    city: "آنلاین",
    type: "وبینار حقوقی",
    category: "workshop",
    description: "وبینار تخصصی درباره آخرین تغییرات قوانین مهاجرت و اقامت اتریش در سال ۲۰۲۶ با حضور کارشناسان حقوقی.",
    price: "رایگان",
    time: "۱۸:۰۰ - ۲۰:۰۰",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    featured: false,
    source: "persianality.at",
    sourceUrl: "https://www.persianality.at/events/",
    tags: ["حقوقی", "وبینار", "مهاجرت"],
  },
  {
    id: 4,
    title: "جشن نوروز ۱۴۰۵ در وین",
    titleEn: "Nowruz 2026 Celebration in Vienna",
    date: "۱ فروردین ۱۴۰۵",
    dateEn: "March 21, 2026",
    month: "فروردین",
    day: "۱",
    location: "میدان قهرمانان (Heldenplatz)",
    venue: "Heldenplatz",
    city: "وین",
    type: "جشن سال نو",
    category: "festival",
    description: "جشن سال نو ایرانی (نوروز) با برنامه‌های فرهنگی، موسیقی سنتی و حضور گسترده فارسی‌زبانان در میدان قهرمانان وین.",
    price: "رایگان",
    time: "۱۲:۰۰ - ۱۸:۰۰",
    icon: Flower2,
    color: "from-emerald-500 to-teal-600",
    featured: true,
    source: "ots.at",
    sourceUrl: "https://www.ots.at/",
    tags: ["نوروز", "جشن", "سال نو"],
  },
  {
    id: 5,
    title: "شب یلدا در وین — جشن طولانی‌ترین شب سال",
    titleEn: "Yalda Night in Vienna — Longest Night Celebration",
    date: "۲۹ آذر ۱۴۰۵",
    dateEn: "December 20, 2026",
    month: "آذر",
    day: "۲۹",
    location: "مرکز رویداد لوتوس",
    venue: "Lotus Event Center",
    city: "وین",
    type: "جشن سنتی",
    category: "festival",
    description: "جشن شب یلدا با برنامه‌های سنتی ایرانی: شعرخوانی حافظ، موسیقی زنده و پذیرایی با انار و آجیل.",
    price: "از ۳۰ یورو",
    time: "۱۹:۰۰ - ۰۱:۰۰",
    icon: Moon,
    color: "from-rose-500 to-pink-600",
    featured: true,
    source: "volek.events",
    sourceUrl: "https://volek.events/event-tag/vienna/",
    tags: ["یلدا", "سنتی", "شعر"],
  },
  {
    id: 6,
    title: "دورهمی عصرانه و تبادل زبان فارسی‌زبانان",
    titleEn: "Persian Language Exchange & Social Meetup",
    date: "۵ مرداد ۱۴۰۵",
    dateEn: "July 27, 2026",
    month: "مرداد",
    day: "۵",
    location: "پارک شهر وین (Stadtpark)",
    venue: "Stadtpark",
    city: "وین",
    type: "دورهمی اجتماعی",
    category: "social",
    description: "دورهمی دوستانه فارسی‌زبانان مقیم وین برای تبادل زبان، آشنایی و شبکه‌سازی. مناسب برای تازه‌واردان و قدیمی‌ها.",
    price: "رایگان",
    time: "۱۷:۰۰ - ۲۰:۰۰",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    featured: false,
    source: "gelbeseiten.irani.at",
    sourceUrl: "https://gelbeseiten.irani.at/events/austria/wien/wien/",
    tags: ["اجتماعی", "زبان", "دورهمی"],
  },
  {
    id: 7,
    title: "کنسرت گلنار و ماهان — جاز فیوژن ایرانی",
    titleEn: "Golnar & Mahan — Iranian Jazz Fusion Concert",
    date: "۱۰ مهر ۱۴۰۵",
    dateEn: "October 2, 2026",
    month: "مهر",
    day: "۱۰",
    location: "سارگ‌فابریک (Sargfabrik)",
    venue: "Sargfabrik",
    city: "وین",
    type: "کنسرت",
    category: "concert",
    description: "کنسرت گروه گلنار و ماهان، ترکیبی از جاز، موسیقی فولک ایرانی و ریتم‌های پیچیده در سارگ‌فابریک وین.",
    price: "از ۳۵ یورو",
    time: "۱۹:۳۰",
    icon: Music,
    color: "from-indigo-500 to-purple-600",
    featured: false,
    source: "events.at",
    sourceUrl: "https://events.at/",
    tags: ["جاز", "فیوژن", "کنسرت"],
  },
  {
    id: 8,
    title: "کمدی زنده: نیما ناز و مارک آنتونی",
    titleEn: "Neema Naz & Marc-Anthony — Live Comedy",
    date: "۲۹ اسفند ۱۴۰۴",
    dateEn: "March 20, 2026",
    month: "اسفند",
    day: "۲۹",
    location: "کمدی پاب وین (The Comedy Pub)",
    venue: "The Comedy Pub Vienna",
    city: "وین",
    type: "کمدی",
    category: "comedy",
    description: "شوی کمدی دو نفره با حضور نیما ناز، کمدین ایرانی-کانادایی، و مارک آنتونی سیناگوگا در کمدی پاب وین.",
    price: "از ۲۰ یورو",
    time: "۲۱:۳۰",
    icon: Theater,
    color: "from-red-500 to-rose-600",
    featured: false,
    source: "eventbrite.at",
    sourceUrl: "https://www.eventbrite.at/d/va--vienna/persian-event/",
    tags: ["کمدی", "استندآپ", "سرگرمی"],
  },
  {
    id: 9,
    title: "کارگاه آموزشی دف برای همه سنین",
    titleEn: "Daf Workshop for All Ages with Hamidreza Ojaghi",
    date: "۲۵ مهر ۱۴۰۵",
    dateEn: "October 17, 2026",
    month: "مهر",
    day: "۲۵",
    location: "رائوم سالماگاسه (Raum Salmgasse)",
    venue: "Raum Salmgasse",
    city: "وین",
    type: "کارگاه",
    category: "workshop",
    description: "کارگاه آموزشی ساز دف با حمیدرضا اوجاقی برای همه سنین از ۵ سال به بالا، همراه با داستان‌خوانی و برنامه فرهنگی.",
    price: "رایگان",
    time: "۱۴:۰۰ - ۱۸:۰۰",
    icon: Mic,
    color: "from-teal-500 to-emerald-600",
    featured: false,
    source: "eventim-light.com",
    sourceUrl: "https://www.eventim-light.com/",
    tags: ["دف", "کارگاه", "موسیقی"],
  },
  {
    id: 10,
    title: "کنسرت خیریه PEOPLE FOR PEOPLE",
    titleEn: "PEOPLE FOR PEOPLE — Charity Concert",
    date: "۲۸ شهریور ۱۴۰۵",
    dateEn: "September 19, 2026",
    month: "شهریور",
    day: "۲۸",
    location: "وین",
    venue: "Wien",
    city: "وین",
    type: "کنسرت خیریه",
    category: "concert",
    description: "کنسرت خیریه با هدف حمایت از بیماران MS در ایران. شبی که موسیقی به امید تبدیل می‌شود.",
    price: "رایگان",
    time: "۱۸:۳۰",
    icon: HeartHandshake,
    color: "from-rose-500 to-pink-600",
    featured: false,
    source: "wien.gv.at",
    sourceUrl: "https://www.wien.gv.at/",
    tags: ["خیریه", "موسیقی", "امید"],
  },
  {
    id: 11,
    title: "فستیوال موسیقی سلام — آهنگ‌های ایرانی و عربی",
    titleEn: "Salam Music Festival — Persian & Arabic Music",
    date: "۱۵ اردیبهشت ۱۴۰۵",
    dateEn: "May 5, 2026",
    month: "اردیبهشت",
    day: "۱۵",
    location: "مکان‌های مختلف وین",
    venue: "Various Venues",
    city: "وین",
    type: "فستیوال",
    category: "festival",
    description: "فستیوال موسیقی سلام با اجرای گروه‌های ایرانی، عربی و ترکی و روایت داستان شاعر ایرانی عطار نیشابوری.",
    price: "متفاوت",
    time: "متفاوت",
    icon: Globe,
    color: "from-orange-500 to-amber-600",
    featured: false,
    source: "events.at",
    sourceUrl: "https://events.at/",
    tags: ["فستیوال", "موسیقی", "فرهنگ"],
  },
  {
    id: 12,
    title: "نمایشنامه‌خوانی و اجرای تئاتر dreamscraper",
    titleEn: "dreamscraper — Theater Performance",
    date: "۲۵ مهر ۱۴۰۵",
    dateEn: "October 17, 2026",
    month: "مهر",
    day: "۲۵",
    location: "تئاتر هاماکوم (Theater Hamakom)",
    venue: "Theater Nestroyhof Hamakom",
    city: "وین",
    type: "تئاتر",
    category: "cultural",
    description: "اجرای تئاتر dreamscraper بر اساس اشعار فروغ فرخزاد، شاعر زن ایرانی، با ترکیب موسیقی و هنرهای نمایشی.",
    price: "از ۲۵ یورو",
    time: "۲۰:۰۰",
    icon: Theater,
    color: "from-purple-500 to-violet-600",
    featured: false,
    source: "eventbrite.at",
    sourceUrl: "https://www.eventbrite.at/d/va--vienna/persian-event/",
    tags: ["تئاتر", "شعر", "فروغ"],
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "رویدادهای ایرانیان در اتریش را از کجا می‌توانم پیدا کنم؟",
    a: "این تقویم به‌طور خودکار رویدادها را از منابع معتبر مانند Volek.events، Eventbrite، Persianality، Gelbe Seiten Iranian و Events.at جمع‌آوری و به‌روزرسانی می‌کند. همچنین می‌توانید از کانال‌های ارتباطی ما (تلگرام و واتس‌اپ) برای دریافت اطلاع‌رسانی لحظه‌ای رویدادها استفاده کنید.",
  },
  {
    q: "آیا شرکت در رویدادها نیاز به پیش‌ثبت‌نام دارد؟",
    a: "بستگی به نوع رویداد دارد. جشن‌های عمومی مانند نوروز و دورهمی‌های اجتماعی معمولاً رایگان و بدون پیش‌ثبت‌نام هستند. کنسرت‌ها، تئاترها و کارگاه‌ها نیاز به خرید بلیت از طریق سایت‌های مربوطه دارند. توصیه می‌شود قبل از شرکت، از طریق لینک منبع، اطلاعات بلیت و ثبت‌نام را بررسی کنید.",
  },
  {
    q: "آیا رویدادها برای کودکان هم مناسب هستند؟",
    a: "بسیاری از رویدادها مانند جشن نوروز، کارگاه دف و دورهمی‌های اجتماعی برای کودکان نیز مناسب هستند. در توضیحات هر رویداد، اطلاعات مربوط به مناسب بودن برای کودکان ذکر شده است. برای رویدادهای خاص کودکان، توصیه می‌کنیم قبل از شرکت با برگزارکننده تماس بگیرید.",
  },
  {
    q: "چگونه می‌توانم رویداد خود را به این تقویم اضافه کنم؟",
    a: "اگر رویداد فرهنگی، هنری یا اجتماعی مرتبط با فارسی‌زبانان در اتریش برگزار می‌کنید، از طریق کانال‌های ارتباطی (تلگرام، واتس‌اپ یا ایمیل) با ما تماس بگیرید. پس از بررسی و تأیید، رویداد شما به تقویم اضافه خواهد شد. لطفاً اطلاعات کامل شامل تاریخ، مکان، توضیحات و لینک ثبت‌نام را ارسال کنید.",
  },
  {
    q: "آیا رویدادهای آنلاین هم در تقویم گنجانده می‌شوند؟",
    a: "بله، رویدادهای آنلاین مانند وبینارها و کارگاه‌های مجازی نیز در تقویم نمایش داده می‌شوند. برای این رویدادها، در بخش مکان عبارت «آنلاین» ذکر شده و لینک شرکت در جلسه از طریق منبع اصلی قابل دسترسی است.",
  },
  {
    q: "اطلاعات رویدادها چقدر به‌روز است؟",
    a: "تقویم رویدادها هر هفته از منابع اصلی به‌روزرسانی می‌شود. با این حال، ممکن است برخی رویدادها لغو یا جابجا شوند. توصیه می‌شود قبل از شرکت، حتماً از طریق لینک منبع اصلی، اطلاعات نهایی را بررسی کنید. در صورت مشاهده هرگونه مغایرت، لطفاً به ما گزارش دهید.",
  },
];

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
      "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — تقویم رویدادها و فرهنگ",
  },
  {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "تقویم رویدادهای ایرانیان در اتریش ۲۰۲۶",
    description:
      "تقویم جامع رویدادهای فرهنگی، هنری، اجتماعی و آموزشی فارسی‌زبانان در اتریش. شامل کنسرت‌ها، جشن‌ها، کارگاه‌ها و دورهمی‌ها.",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Austria",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AT",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "اتریش‌نشین",
      url: "https://otrish-iran.ir",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
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
      { "@type": "ListItem", position: 2, name: "تقویم رویدادها", item: "https://otrish-iran.ir/events" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const IranianEventsCalendar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAll, setShowAll] = useState(false);

  // ==========================================
  // FILTER LOGIC
  // ==========================================
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 6);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setShowAll(false);
    toast.success("همه فیلترها پاک شدند");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

  return (
    <>
      <SEO
        title="تقویم رویدادهای ایرانیان در اتریش ۲۰۲۶ | کنسرت، جشن، کارگاه | اتریش‌نشین"
        description="تقویم جامع رویدادهای فرهنگی، هنری، اجتماعی و آموزشی فارسی‌زبانان در اتریش. کنسرت‌های ایرانی، جشن نوروز و یلدا، کارگاه‌ها، وبینارها و دورهمی‌های اجتماعی در وین و شهرهای دیگر. به‌روز ۲۰۲۶."
        keywords="رویدادهای ایرانیان اتریش, تقویم رویدادهای وین, کنسرت ایرانی وین, جشن نوروز وین, شب یلدا اتریش, دورهمی فارسی زبانان وین, رویدادهای فرهنگی اتریش, وبینار حقوقی اتریش, Persian events Vienna"
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
            🎭
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-[110px] pointer-events-none" />
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
                به‌روز ۲۰۲۶ — {EVENTS_DATA.length} رویداد فعال
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                تقویم
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300"> رویدادهای ایرانیان در اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-pink-100 leading-relaxed max-w-3xl mb-4">
                کنسرت‌های ایرانی، جشن‌های نوروز و یلدا، کارگاه‌ها، وبینارها و
                دورهمی‌های اجتماعی — همه در یک تقویم جامع. به‌روزرسانی خودکار
                از منابع معتبر.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{EVENTS_DATA.length} رویداد</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>منابع رسمی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pink-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>به‌روزرسانی هفتگی</span>
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
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <div className="text-lg font-black text-pink-600">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
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
                <span className="text-[11px] font-black text-stone-700">{b.text}</span>
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
              <Sparkles className="w-5 h-5 text-pink-600" />
              رویدادها در یک نگاه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از کنسرت‌های زنده تا کارگاه‌های آموزشی و جشن‌های سنتی
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
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
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
          className="bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 border-2 border-pink-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <BellRing className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-pink-900 text-sm mb-1 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              اطلاع‌رسانی خودکار رویدادها
            </h3>
            <p className="text-[11px] text-pink-800 font-bold leading-relaxed">
              این تقویم به‌طور خودکار از منابع معتبر مانند Volek.events،
              Eventbrite، Persianality، Gelbe Seiten Iranian و Events.at
              به‌روزرسانی می‌شود. برای دریافت اطلاع‌رسانی لحظه‌ای رویدادهای
              جدید، ما را در تلگرام و واتس‌اپ دنبال کنید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN CALENDAR SECTION */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
          id="events-calendar"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-pink-500 via-rose-500 to-amber-500 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    تقویم رویدادهای ایرانیان در اتریش
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    {filteredEvents.length} رویداد در {EVENT_CATEGORIES.length - 1} دسته
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-black text-stone-800">
                  جستجو و فیلتر
                </span>
                {activeFiltersCount > 0 && (
                  <span className="text-[9px] font-black bg-pink-500 text-white px-2 py-0.5 rounded-full">
                    {activeFiltersCount} فعال
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-[10px] font-black text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg"
                >
                  <RefreshCw className="w-3 h-3" />
                  پاک کردن
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی رویداد، مکان یا برچسب..."
                className="w-full pr-10 pl-10 py-3 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-pink-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition"
                >
                  <X className="w-3 h-3 text-stone-600" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5">
              {EVENT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-[10px] font-black transition-all cursor-pointer ${
                      isActive
                        ? `bg-gradient-to-br ${cat.color} text-white border-transparent shadow-md`
                        : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Results */}
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-stone-200 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-sm font-black text-stone-700 mb-1">
                رویدادی با این فیلترها یافت نشد
              </h3>
              <p className="text-[11px] text-stone-500 font-bold mb-4">
                فیلترها را تغییر دهید یا همه را پاک کنید
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-pink-500 to-rose-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                پاک کردن همه فیلترها
              </button>
            </motion.div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {displayedEvents.map((event, idx) => {
                  const EventIcon = event.icon;
                  return (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl border-2 border-stone-200 hover:border-pink-300 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-xl cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div
                        className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${event.color} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`}
                      />

                      {event.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[8px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          ویژه
                        </div>
                      )}

                      <div className="relative flex items-start gap-3 mb-3">
                        {/* Date badge */}
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${event.color} flex flex-col items-center justify-center text-white shadow-md shrink-0`}>
                          <span className="text-[8px] font-black opacity-90">{event.month}</span>
                          <span className="text-lg font-black leading-none">{event.day}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-stone-900 text-xs leading-snug mb-1 line-clamp-2">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${event.color}`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="relative text-[10px] text-stone-500 font-bold leading-relaxed mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="relative space-y-1.5 text-[10px] font-bold text-stone-600 mb-3">
                        <div className="flex items-center gap-1.5 justify-end">
                          <span className="truncate">{event.location}</span>
                          <MapPin className="w-3 h-3 text-pink-500 shrink-0" />
                        </div>
                        <div className="flex items-center gap-1.5 justify-end">
                          <span>{event.time}</span>
                          <Clock className="w-3 h-3 text-pink-500 shrink-0" />
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="relative flex flex-wrap gap-1 mb-3 pt-3 border-t border-stone-100">
                        {event.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[8px] font-bold text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="relative flex items-center justify-between">
                        <span className="text-[10px] font-black text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full">
                          {event.price}
                        </span>
                        <span className="text-[9px] font-bold text-stone-400 inline-flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          جزئیات
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-3">
              {displayedEvents.map((event, idx) => {
                const EventIcon = event.icon;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ x: -4 }}
                    className="bg-white rounded-2xl border-2 border-stone-200 hover:border-pink-300 transition-all p-4 flex items-center gap-4 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${event.color} flex flex-col items-center justify-center text-white shadow-md shrink-0`}>
                      <span className="text-[8px] font-black opacity-90">{event.month}</span>
                      <span className="text-lg font-black leading-none">{event.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-stone-900 text-xs mb-1">{event.title}</h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500 flex-wrap">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-pink-500" />
                          {event.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-500" />
                          {event.time}
                        </span>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft className="w-5 h-5 text-stone-400 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Show All Button */}
          {filteredEvents.length > 6 && !showAll && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-pink-500 to-rose-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <Eye className="w-4 h-4" />
                مشاهده همه {filteredEvents.length} رویداد
              </button>
            </div>
          )}
        </motion.div>

        {/* ========================================== */}
        {/* WHY IT MATTERS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-pink-600" />
              چرا رویدادهای اجتماعی اهمیت دارند؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              نقش رویدادها در ادغام و حفظ هویت فرهنگی
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "۳۰۰K+", text: "جمعیت فارسی‌زبان مقیم اتریش — بزرگترین جامعه ایرانی در اروپای مرکزی", color: "from-pink-500 to-rose-600" },
              { icon: Heart, title: "هویت فرهنگی", text: "حفظ ارتباط با فرهنگ ایرانی و انتقال آن به نسل‌های بعدی", color: "from-emerald-500 to-teal-600" },
              { icon: Globe, title: "ادغام اجتماعی", text: "فرصت آشنایی با فرهنگ اتریشی و شبکه‌سازی حرفه‌ای", color: "from-blue-500 to-indigo-600" },
              { icon: Trophy, title: "فرصت‌های شغلی", text: "رویدادها بستری برای آشنایی با کارآفرینان و فرصت‌های شغلی", color: "from-amber-500 to-orange-600" },
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
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <div className={`relative text-2xl font-black bg-gradient-to-r ${v.color} bg-clip-text text-transparent mb-1`}>
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
              <HelpCircle className="w-5 h-5 text-pink-600" />
              سوالات متداول درباره رویدادها
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#4c0519] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              رویداد خود را با ما به اشتراک بگذارید
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              رویداد فرهنگی یا اجتماعی برگزار می‌کنید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر رویداد مرتبط با فارسی‌زبانان در اتریش برگزار می‌کنید، آن را به
              تقویم ما اضافه کنید تا هزاران فارسی‌زبان از آن باخبر شوند. این
              خدمت کاملاً رایگان است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ارسال رویداد در واتس‌اپ
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
                به‌روزرسانی هفتگی
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                منابع رسمی
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
              این تقویم به‌طور خودکار از منابع معتبر (Volek.events، Eventbrite،
              Persianality، Gelbe Seiten Iranian، Events.at) جمع‌آوری می‌شود.
              اطلاعات ممکن است بدون اطلاع قبلی تغییر کند. همیشه قبل از شرکت در
              رویداد، اطلاعات نهایی (تاریخ، مکان، قیمت) را از منبع اصلی بررسی
              کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "رویدادهای ایرانیان اتریش",
              "تقویم رویدادهای وین",
              "کنسرت ایرانی وین",
              "جشن نوروز وین",
              "شب یلدا اتریش",
              "دورهمی فارسی زبانان وین",
              "رویدادهای فرهنگی اتریش",
              "وبینار حقوقی اتریش",
              "Persian events Vienna",
              "Nowruz Vienna",
              "Yalda Night Vienna",
              "Iranian events Austria",
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

      {/* ========================================== */}
      {/* EVENT DETAIL MODAL */}
      {/* ========================================== */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <div className={`h-2 bg-gradient-to-r ${selectedEvent.color} rounded-t-3xl`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedEvent.color} flex flex-col items-center justify-center text-white shadow-md shrink-0`}>
                      <span className="text-[9px] font-black opacity-90">{selectedEvent.month}</span>
                      <span className="text-2xl font-black leading-none">{selectedEvent.day}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900 text-sm mb-1">
                        {selectedEvent.title}
                      </h3>
                      <p className="text-[10px] text-stone-400 font-mono" dir="ltr">
                        {selectedEvent.titleEn}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition shrink-0"
                  >
                    <X className="w-4 h-4 text-stone-600" />
                  </button>
                </div>

                <div className="space-y-3 text-[11px] font-bold text-stone-600">
                  <p className="leading-relaxed">{selectedEvent.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-black">📅 تاریخ</span>
                      <p className="text-stone-800">{selectedEvent.date}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-black">🕐 زمان</span>
                      <p className="text-stone-800">{selectedEvent.time}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-black">📍 مکان</span>
                      <p className="text-stone-800">{selectedEvent.location}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-stone-400 font-black">💰 قیمت</span>
                      <p className="text-pink-700">{selectedEvent.price}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-[9px] text-stone-400 font-black block mb-1.5">🏷️ برچسب‌ها</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEvent.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold text-pink-700 bg-pink-50 border border-pink-200 px-2.5 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[9px] text-stone-400 font-bold">
                      منبع: {selectedEvent.source}
                    </span>
                    <a
                      href={selectedEvent.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-black text-pink-700 hover:text-pink-900 bg-pink-50 border border-pink-200 px-3 py-1.5 rounded-lg transition-all"
                    >
                      مشاهده منبع اصلی
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white"
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

export default IranianEventsCalendar;