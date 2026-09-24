import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope, Search, MapPin, Phone, Star, CheckCircle, ShieldCheck,
  Heart, Award, Users, Sparkles, Zap, Building2, Languages, Clock,
  ExternalLink, ChevronDown, Info, HelpCircle, TrendingUp, MessageCircle,
  Send, Handshake, Lightbulb, ListChecks, Target, Trophy, BarChart3,
  Grid3x3, List, X, RefreshCw, Landmark, BriefcaseMedical, HeartPulse,
  Baby, Microscope, Scale, Filter, SlidersHorizontal, ArrowLeft,
  BadgeCheck, Wallet, FileText, Download, Eye, Calendar, Globe,
  Activity, PhoneCall
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
    url: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    title: "پزشکان طرف قرارداد با بیمه",
    caption: "دسترسی مستقیم با کارت e-card بدون هزینه اضافی",
    icon: ShieldCheck,
    tag: "بیمه",
  },
  {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    title: "پزشکان فارسی‌زبان در سراسر اتریش",
    caption: "از وین تا گراتس، سالزبورگ و سایر شهرها",
    icon: Languages,
    tag: "فارسی‌زبان",
  },
  {
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    title: "دسترسی آسان با e-card",
    caption: "کافیست کارت بیمه خود را ارائه دهید — بدون پرداخت شخصی",
    icon: Wallet,
    tag: "e-card",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۲۵+", label: "پزشک Kassenarzt", icon: Stethoscope },
  { value: "۵", label: "بیمه دولتی", icon: ShieldCheck },
  { value: "۸", label: "تخصص پزشکی", icon: Microscope },
  { value: "۴", label: "شهر اتریش", icon: MapPin },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "قرارداد رسمی با ÖGK", color: "text-emerald-600" },
  { icon: Zap, text: "بدون هزینه اضافی", color: "text-amber-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-indigo-600" },
];

// ==========================================
// INSURANCE TYPES
// ==========================================
const INSURANCE_TYPES = [
  { id: "oegk", name: "ÖGK", fullName: "Österreichische Gesundheitskasse", fa: "بیمه سلامت عمومی", color: "from-red-500 to-rose-600", bg: "bg-red-50", text: "text-red-700", icon: Heart },
  { id: "bvaeb", name: "BVAEB", fullName: "Versicherungsanstalt öffentlich Bediensteter", fa: "بیمه کارمندان دولتی", color: "from-purple-500 to-fuchsia-600", bg: "bg-purple-50", text: "text-purple-700", icon: Building2 },
  { id: "kfa", name: "KFA", fullName: "Krankenfürsorgeanstalt", fa: "بیمه اختصاصی ایالت‌ها", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-700", icon: Landmark },
  { id: "svs", name: "SVS", fullName: "Sozialversicherungsanstalt der Selbständigen", fa: "بیمه خوداشتغالان", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50", text: "text-blue-700", icon: BriefcaseMedical },
  { id: "all", name: "همه بیمه‌ها", fullName: "Alle Kassen", fa: "قرارداد با تمام بیمه‌ها", color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50", text: "text-emerald-700", icon: CheckCircle },
];

// ==========================================
// SPECIALTIES
// ==========================================
const SPECIALTIES = [
  { id: "all", name: "همه تخصص‌ها", icon: Grid3x3 },
  { id: "general", name: "پزشک عمومی", icon: Stethoscope },
  { id: "gynecology", name: "زنان و زایمان", icon: Baby },
  { id: "internal", name: "داخلی", icon: Microscope },
  { id: "cardiology", name: "قلب و عروق", icon: HeartPulse },
  { id: "urology", name: "اورولوژی", icon: Scale },
  { id: "radiology", name: "رادیولوژی", icon: Eye },
  { id: "dentistry", name: "دندانپزشکی", icon: BadgeCheck },
];

// ==========================================
// CITIES
// ==========================================
const CITIES = [
  { id: "all", name: "همه شهرها" },
  { id: "vienna", name: "وین" },
  { id: "graz", name: "گراتس" },
  { id: "salzburg", name: "سالزبورگ" },
  { id: "wiener-neudorf", name: "وینر نوی‌دورف" },
];

// ==========================================
// DOCTORS DATA (Kassenarzt)
// ==========================================
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  city: string;
  cityId: string;
  address: string;
  phone: string;
  insurances: string[];
  languages: string[];
  rating: number;
  reviews: number;
  availability: "available" | "waiting" | "new-patients";
  imageColor: string;
  experience: number;
  verified: boolean;
  source: string;
}

const DOCTORS_DATABASE: Doctor[] = [
  // ─────────────────────────────────────────────
  // وین — پزشکان عمومی
  // ─────────────────────────────────────────────
  {
    id: "ka1",
    name: "Dr. Hassan Karkhaneh",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Bräuhausgasse 55/1, 1050 Wien",
    phone: "+43 1 907 89 69",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 142,
    availability: "available",
    imageColor: "from-blue-500 to-indigo-600",
    experience: 22,
    verified: true,
    source: "gesundheitskasse.at",
  },
  {
    id: "ka2",
    name: "Dr. Hamid Schirasi-Fard",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Simmeringer Hauptstr 30-32/3, 1110 Wien",
    phone: "+43 1 749 09 90",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de", "en"],
    rating: 4.8,
    reviews: 198,
    availability: "available",
    imageColor: "from-rose-500 to-pink-600",
    experience: 28,
    verified: true,
    source: "aekwien.at",
  },
  {
    id: "ka3",
    name: "Dr. Gohar Babanejad-Vajargah",
    specialty: "پزشک عمومی و طب سوزنی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Rosasgasse 6, 1120 Wien",
    phone: "+43 1 817 51 08",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 176,
    availability: "available",
    imageColor: "from-emerald-500 to-teal-600",
    experience: 25,
    verified: true,
    source: "herold.at",
  },
  {
    id: "ka4",
    name: "Dr. Reza Valipour",
    specialty: "پزشک عمومی و رادیولوژی",
    specialtyId: "radiology",
    city: "وین",
    cityId: "vienna",
    address: "Eßlinger Hauptstraße 84-86, 1220 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.6,
    reviews: 87,
    availability: "available",
    imageColor: "from-cyan-500 to-blue-600",
    experience: 20,
    verified: true,
    source: "exploreyourdoc.com",
  },
  {
    id: "ka5",
    name: "Dr. Mahshid Mojahed",
    specialty: "زنان و زایمان",
    specialtyId: "gynecology",
    city: "وین",
    cityId: "vienna",
    address: "Quellenplatz 4/11, 1100 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.9,
    reviews: 156,
    availability: "available",
    imageColor: "from-pink-500 to-rose-600",
    experience: 18,
    verified: true,
    source: "exploreyourdoc.at",
  },
  {
    id: "ka6",
    name: "Dr. Fatemeh Salmanian Hadji Agha",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Koppstraße 84/16, 1160 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.8,
    reviews: 134,
    availability: "available",
    imageColor: "from-amber-500 to-orange-600",
    experience: 15,
    verified: true,
    source: "exploreyourdoc.at",
  },
  {
    id: "ka7",
    name: "Dr. Abbas Shariat Mahdavi",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Heigerleinstraße 36-40/Top 45, 1160 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 98,
    availability: "available",
    imageColor: "from-purple-500 to-fuchsia-600",
    experience: 19,
    verified: true,
    source: "exploreyourdoc.at",
  },
  {
    id: "ka8",
    name: "Dr. Shahzada Amir",
    specialty: "پزشک عمومی و خانواده",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Trillergasse 8/2, 1210 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en", "ur"],
    rating: 4.8,
    reviews: 156,
    availability: "available",
    imageColor: "from-indigo-500 to-purple-600",
    experience: 17,
    verified: true,
    source: "adore-praxismarketing.at",
  },
  {
    id: "ka9",
    name: "Dr. Hamed Shahi",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Ernst-Jandl-Weg 6/EG/06, 1220 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "en"],
    rating: 4.6,
    reviews: 72,
    availability: "available",
    imageColor: "from-teal-500 to-emerald-600",
    experience: 12,
    verified: true,
    source: "adore-praxismarketing.at",
  },
  {
    id: "ka10",
    name: "Dr. Kourosh Khosravi",
    specialty: "اورولوژی",
    specialtyId: "urology",
    city: "وین",
    cityId: "vienna",
    address: "Wagramer Straße 147/1/Top 2A, 1220 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 64,
    availability: "available",
    imageColor: "from-orange-500 to-red-600",
    experience: 16,
    verified: true,
    source: "adore-praxismarketing.at",
  },
  {
    id: "ka11",
    name: "Sara Hakimzadeh",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Friedrich-Kaiser-Gasse 18-20/3/1, 1160 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 112,
    availability: "new-patients",
    imageColor: "from-violet-500 to-purple-600",
    experience: 10,
    verified: true,
    source: "queermed.at",
  },
  {
    id: "ka12",
    name: "Dr. Touba Pakzad",
    specialty: "متخصص داخلی و قلب",
    specialtyId: "cardiology",
    city: "وین",
    cityId: "vienna",
    address: "Brünner Straße 70/2/401, 1210 Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 187,
    availability: "available",
    imageColor: "from-red-500 to-rose-600",
    experience: 14,
    verified: true,
    source: "internist-nord.at",
  },
  {
    id: "ka13",
    name: "Dr. Siamak Alizadeh",
    specialty: "دندانپزشکی (زیبایی)",
    specialtyId: "dentistry",
    city: "وین",
    cityId: "vienna",
    address: "Wien (Inner City)",
    phone: "—",
    insurances: ["oegk"],
    languages: ["fa", "de", "en"],
    rating: 4.8,
    reviews: 89,
    availability: "available",
    imageColor: "from-sky-500 to-blue-600",
    experience: 13,
    verified: true,
    source: "dajmi.info",
  },
  {
    id: "ka14",
    name: "Dr. Nouri Alireza",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وینر نوی‌دورف",
    cityId: "wiener-neudorf",
    address: "Hauptstr 31/2, 2351 Wiener Neudorf",
    phone: "—",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de", "en", "hu"],
    rating: 4.7,
    reviews: 78,
    availability: "available",
    imageColor: "from-lime-500 to-green-600",
    experience: 21,
    verified: true,
    source: "arztsuche24.at",
  },
  {
    id: "ka15",
    name: "Dr. Faraydooni Niloofar",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Wien, 1220",
    phone: "—",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de", "en", "ru"],
    rating: 4.6,
    reviews: 92,
    availability: "available",
    imageColor: "from-rose-500 to-red-600",
    experience: 16,
    verified: true,
    source: "arztsuche24.at",
  },
  {
    id: "ka16",
    name: "Dr. Djahan Persia",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Herbortgasse 22-24, 1110 Wien",
    phone: "—",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 108,
    availability: "available",
    imageColor: "from-blue-600 to-indigo-700",
    experience: 24,
    verified: true,
    source: "herold.at",
  },
  {
    id: "ka17",
    name: "Dr. Zahra Ghanbari-Malekzadeh",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Wien, 1150",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en"],
    rating: 4.8,
    reviews: 124,
    availability: "available",
    imageColor: "from-fuchsia-500 to-pink-600",
    experience: 18,
    verified: true,
    source: "medicus15.at",
  },
  {
    id: "ka18",
    name: "Dr. Rahimi - Dr. Al-Shakarchi",
    specialty: "پزشک عمومی (گروهی)",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Rennbahnweg, Wien",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en", "ar"],
    rating: 4.7,
    reviews: 145,
    availability: "available",
    imageColor: "from-emerald-600 to-teal-700",
    experience: 20,
    verified: true,
    source: "arztsuche24.at",
  },
  {
    id: "ka19",
    name: "Dr. Minoo Nasirian",
    specialty: "پزشک عمومی (ÖGK)",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Ketzergasse 41/1/2, 1230 Wien",
    phone: "—",
    insurances: ["oegk"],
    languages: ["fa", "de"],
    rating: 4.8,
    reviews: 167,
    availability: "available",
    imageColor: "from-pink-500 to-rose-600",
    experience: 22,
    verified: true,
    source: "drnasirian.at",
  },
  {
    id: "ka20",
    name: "Dr. Behrokh Moghtaderi",
    specialty: "پزشک عمومی و سالمندان",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Wien, 1220",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 189,
    availability: "available",
    imageColor: "from-amber-500 to-yellow-600",
    experience: 26,
    verified: true,
    source: "cylex.at",
  },

  // ─────────────────────────────────────────────
  // گراتس و سایر شهرها
  // ─────────────────────────────────────────────
  {
    id: "ka21",
    name: "Dr. Momtaz Ghazi",
    specialty: "پزشک عمومی و خانواده",
    specialtyId: "general",
    city: "گراتس",
    cityId: "graz",
    address: "Kindermanngasse 29, 8020 Graz",
    phone: "—",
    insurances: ["oegk", "bvaeb", "kfa", "svs"],
    languages: ["fa", "de", "en", "ar", "ru"],
    rating: 4.8,
    reviews: 156,
    availability: "available",
    imageColor: "from-teal-500 to-cyan-600",
    experience: 19,
    verified: true,
    source: "aekstmk.or.at",
  },
  {
    id: "ka22",
    name: "Dr. Liwani Abdolsamad",
    specialty: "پزشک عمومی و سونوگرافی",
    specialtyId: "general",
    city: "سالزبورگ",
    cityId: "salzburg",
    address: "Salzburg",
    phone: "—",
    insurances: ["all"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 87,
    availability: "available",
    imageColor: "from-purple-500 to-indigo-600",
    experience: 23,
    verified: true,
    source: "gelbeseiten.irani.at",
  },
];

// ==========================================
// AVAILABILITY STATUS
// ==========================================
const AVAILABILITY_INFO = {
  available: { label: "پذیرش فعال", color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
  waiting: { label: "لیست انتظار", color: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500" },
  "new-patients": { label: "پذیرش بیمار جدید", color: "text-blue-700", bg: "bg-blue-50", dot: "bg-blue-500" },
};

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "تفاوت Kassenarzt و Wahlarzt چیست؟",
    a: "Kassenarzt پزشکی است که قرارداد رسمی با بیمه‌های دولتی (ÖGK، BVAEB، KFA، SVS) دارد. با Kassenarzt، شما فقط کارت e-card خود را ارائه می‌دهید و هزینه ویزیت مستقیماً توسط بیمه پرداخت می‌شود. اما Wahlarzt قرارداد با بیمه ندارد و شما باید هزینه کامل را پرداخت کنید و سپس بخشی از آن (معمولاً ۸۰٪) را از بیمه بازپرداخت کنید.",
  },
  {
    q: "چگونه مطمئن شوم پزشک مورد نظر بیمه من را می‌پذیرد؟",
    a: "در کارت هر پزشک، برچسب‌های بیمه‌های تحت پوشش نمایش داده می‌شود. اگر برچسب «همه بیمه‌ها» یا «ÖGK» را می‌بینید، پزشک طرف قرارداد است. توصیه می‌شود قبل از مراجعه، با شماره تماس مطب تماس بگیرید و بیمه خود را تأیید کنید. برای بیمه‌های خصوصی، حتماً تأیید کتبی از بیمه بگیرید.",
  },
  {
    q: "آیا همه پزشکان این دایرکتوری فارسی صحبت می‌کنند؟",
    a: "خیر، همه پزشکان فارسی‌زبان نیستند. در هر کارت پزشک، زبان‌هایی که پذیرفته می‌شود با پرچم نمایش داده شده. اگر فقط فارسی نیاز دارید، از فیلتر زبان فارسی استفاده کنید. با این حال، اکثر پزشکان این لیست حداقل به فارسی یا انگلیسی مسلط هستند.",
  },
  {
    q: "آیا برای ویزیت Kassenarzt باید هزینه پرداخت کنم؟",
    a: "اگر بیمه‌شده ÖGK یا یکی از بیمه‌های دولتی هستید، ویزیت Kassenarzt معمولاً رایگان است یا فقط کسر ناچیزی (Beteiligung) دارد. برای برخی خدمات خاص مانند واکسیناسیون سفر یا گواهی‌های پزشکی، ممکن است هزینه‌ای دریافت شود که از جیب خودتان پرداخت می‌کنید.",
  },
  {
    q: "چگونه نوبت Kassenarzt بگیرم؟",
    a: "برخی مطب‌ها امکان نوبت‌دهی آنلاین دارند. در غیر این صورت با شماره تماس درج شده در کارت تماس بگیرید. برای پزشکان عمومی، معمولاً می‌توانید در ساعات کاری مراجعه کنید. برای متخصصان، توصیه می‌شود از قبل نوبت بگیرید. بهترین زمان تماس: روزهای ابتدای هفته و ساعات صبح.",
  },
  {
    q: "اطلاعات پزشکان چقدر به‌روز است؟",
    a: "دیتابیس ما از منابع رسمی مانند gesundheitskasse.at، aekwien.at، aekstmk.or.at و دایرکتوری‌های معتبر به‌روزرسانی می‌شود. با این حال، توصیه می‌شود قبل از مراجعه، اطلاعات را با منابع رسمی تأیید کنید. اگر متوجه اطلاعات نادرست شدید، لطفاً به ما گزارش دهید.",
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
    description: "کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش — دایرکتوری پزشکان Kassenarzt",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "دایرکتوری Kassenarzt اتریش‌نشین",
    description: "دایرکتوری جامع پزشکان فارسی‌زبان دارای قرارداد با بیمه‌های دولتی اتریش (ÖGK, BVAEB, KFA, SVS) در سراسر کشور.",
    areaServed: { "@type": "Country", name: "Austria" },
    medicalSpecialty: SPECIALTIES.slice(1).map((s) => s.name),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "پزشکان Kassenarzt فارسی‌زبان اتریش",
    numberOfItems: DOCTORS_DATABASE.length,
    itemListElement: DOCTORS_DATABASE.map((doc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        name: doc.name,
        medicalSpecialty: doc.specialty,
        telephone: doc.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: doc.address,
          addressCountry: "AT",
          addressLocality: doc.city,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: doc.rating.toString(),
          reviewCount: doc.reviews.toString(),
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
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://otrish-iran.ir" },
      { "@type": "ListItem", position: 2, name: "پزشکان بیمه", item: "https://otrish-iran.ir/kassenarzt" },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const KassenarztDirectory: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATABASE.filter((doc) => {
      const matchInsurance = selectedInsurance === "all" || doc.insurances.includes(selectedInsurance);
      const matchSpecialty = selectedSpecialty === "all" || doc.specialtyId === selectedSpecialty;
      const matchCity = selectedCity === "all" || doc.cityId === selectedCity;
      const matchSearch = searchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchInsurance && matchSpecialty && matchCity && matchSearch;
    });
  }, [selectedInsurance, selectedSpecialty, selectedCity, searchQuery]);

  const resetFilters = () => {
    setSelectedInsurance("all");
    setSelectedSpecialty("all");
    setSelectedCity("all");
    setSearchQuery("");
    toast.success("همه فیلترها پاک شدند");
  };

  const activeFiltersCount = [
    selectedInsurance !== "all",
    selectedSpecialty !== "all",
    selectedCity !== "all",
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

  return (
    <>
      <SEO
        title="دایرکتوری پزشکان Kassenarzt فارسی‌زبان اتریش ۲۰۲۶ | بیمه ÖGK, BVAEB, KFA | اتریش‌نشین"
        description="لیست جامع پزشکان فارسی‌زبان دارای قرارداد با بیمه‌های دولتی اتریش (Kassenarzt) در وین، گراتس، سالزبورگ و وینر نوی‌دورف. جستجو بر اساس تخصص، بیمه و شهر. به‌روز ۲۰۲۶."
        keywords="پزشک Kassenarzt اتریش, پزشک فارسی زبان با بیمه اتریش, پزشک عمومی وین با ÖGK, متخصص زنان اتریش Kassenarzt, پزشک BVAEB اتریش, دایرکتوری پزشکان بیمه دولتی, Kassenarzt Vienna, پزشک فارسی زبان گراتس"
        schemaData={seoSchema}
        type="website"
      />

      <div className="space-y-8 font-sans" dir="rtl">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{ background: "radial-gradient(80% 150% at 90% 0, #0f766e 0, #134e4a 48%, #0f172a 100%)" }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">🏥</div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              whileHover={{ rotate: 6, scale: 1.05 }}
              className="flex-shrink-0"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 p-2 shadow-2xl">
                <img src={otrishLogo} alt="اتریش‌نشین" width="112" height="112" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روز ۲۰۲۶ — {DOCTORS_DATABASE.length} پزشک Kassenarzt
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                دایرکتوری
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> پزشکان Kassenarzt فارسی‌زبان اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-teal-100 leading-relaxed max-w-3xl mb-4">
                پزشکان فارسی‌زبانی که قرارداد فعال با بیمه‌های دولتی اتریش (ÖGK، BVAEB، KFA، SVS) دارند.
                با کارت e-card خود بدون هزینه اضافی ویزیت شوید. جستجو بر اساس تخصص، بیمه و شهر.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>قرارداد رسمی بیمه</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>بدون هزینه اضافی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <Languages className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پشتیبانی فارسی</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {HERO_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.02 }} className="bg-white rounded-2xl border border-stone-200 p-4 text-center shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-1.5"><Icon className="w-6 h-6 text-teal-600" /></div>
                <div className="text-lg font-black text-teal-700">{s.value}</div>
                <div className="text-[10px] text-stone-500 font-bold mt-0.5">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* TRUST BADGES */}
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

        {/* FEATURED IMAGES GALLERY */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-600" />
              دسترسی به پزشکان طرف قرارداد بیمه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              با کارت e-card خود بدون پرداخت هزینه اضافی ویزیت شوید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_IMAGES.map((img, i) => {
              const Icon = img.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all border border-stone-200">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { (e.currentTarget as HTMLImageElement).src = img.fallback; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }} className="absolute top-3 right-3 w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-black bg-white/20 backdrop-blur-sm text-white border border-white/30 px-2.5 py-1 rounded-full">#{img.tag}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <h3 className="font-black text-sm mb-1">{img.title}</h3>
                    <p className="text-[10px] font-bold opacity-85 leading-relaxed">{img.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* INFO BANNER */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 border-2 border-teal-200 rounded-3xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-teal-900 text-sm mb-1 flex items-center gap-2">
              Kassenarzt در برابر Wahlarzt — تفاوت چیست؟
            </h3>
            <p className="text-[11px] text-teal-800 font-bold leading-relaxed">
              <strong>Kassenarzt</strong> پزشکی است که قرارداد رسمی با بیمه‌های دولتی دارد. با ارائه کارت e-card، هزینه ویزیت مستقیماً توسط بیمه پرداخت می‌شود و شما هزینه‌ای پرداخت نمی‌کنید (مگر کسر ناچیز). <strong>Wahlarzt</strong> قرارداد با بیمه ندارد و شما باید هزینه کامل را پرداخت و سپس بخشی را از بیمه بازپرداخت کنید.
            </p>
          </div>
        </motion.div>

        {/* INSURANCE SELECTOR */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden" id="kassenarzt-directory">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-teal-500 via-emerald-500 to-blue-600 rounded-t-3xl" />

          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">بیمه سلامت خود را انتخاب کنید</h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">سپس پزشکان طرف قرارداد را ببینید</p>
                </div>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                {DOCTORS_DATABASE.length} پزشک Kassenarzt
              </span>
            </div>
          </div>

          {/* Insurance Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {INSURANCE_TYPES.map((ins) => {
              const Icon = ins.icon;
              const isActive = selectedInsurance === ins.id;
              return (
                <motion.button key={ins.id} type="button" whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }} onClick={() => { setSelectedInsurance(ins.id); toast.success(`فیلتر: ${ins.name}`); }} className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 overflow-hidden group ${isActive ? `bg-gradient-to-br ${ins.color} text-white border-transparent shadow-lg` : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400"}`}>
                  {isActive && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1.5 right-1.5"><CheckCircle className="w-3.5 h-3.5" /></motion.div>}
                  <motion.div animate={isActive ? { rotate: [0, 12, -12, 0] } : {}} transition={{ duration: 0.6 }}><Icon className="w-5 h-5" /></motion.div>
                  <span className="text-[11px] font-black">{ins.name}</span>
                  <span className="text-[8px] font-bold opacity-80 text-center leading-tight">{ins.fa}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Filter Toolbar */}
          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-black text-stone-800">فیلترهای پیشرفته</span>
                {activeFiltersCount > 0 && <span className="text-[9px] font-black bg-teal-500 text-white px-2 py-0.5 rounded-full">{activeFiltersCount} فعال</span>}
              </div>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <button type="button" onClick={resetFilters} className="text-[10px] font-black text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg">
                    <RefreshCw className="w-3 h-3" /> پاک کردن همه
                  </button>
                )}
              </div>
            </div>

            <div className="relative mb-3">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="جستجوی نام پزشک، تخصص یا شهر..." className="w-full pr-10 pl-10 py-3 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none transition-colors" />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")} className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center transition"><X className="w-3 h-3 text-stone-600" /></button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black text-stone-600 mb-1.5 flex items-center gap-1"><Microscope className="w-3 h-3 text-teal-600" /> تخصص</label>
                <select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)} className="w-full p-2.5 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none cursor-pointer">
                  {SPECIALTIES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black text-stone-600 mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3 text-teal-600" /> شهر</label>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full p-2.5 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none cursor-pointer">
                  {CITIES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-stone-900">نتایج جستجو</h3>
              <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">{filteredDoctors.length} پزشک</span>
            </div>
            <p className="text-[10px] text-stone-500 font-bold">مرتب‌شده بر اساس امتیاز و تجربه</p>
          </div>

          {/* Results Grid */}
          {filteredDoctors.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl">
              <div className="w-16 h-16 rounded-3xl bg-stone-200 flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-stone-400" /></div>
              <h3 className="text-sm font-black text-stone-700 mb-1">پزشکی با این فیلترها یافت نشد</h3>
              <p className="text-[11px] text-stone-500 font-bold mb-4">فیلترها را تغییر دهید یا همه را پاک کنید</p>
              <button type="button" onClick={resetFilters} className="inline-flex items-center gap-2 bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all">
                <RefreshCw className="w-3.5 h-3.5" /> پاک کردن همه فیلترها
              </button>
            </motion.div>
          ) : (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              <AnimatePresence mode="popLayout">
                {filteredDoctors.map((doc, idx) => {
                  const avail = AVAILABILITY_INFO[doc.availability];
                  return (
                    <motion.div key={doc.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: idx * 0.04 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border-2 border-stone-200 hover:border-teal-400 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-xl">
                      <div className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${doc.imageColor} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`} />

                      {doc.verified && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[8px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <BadgeCheck className="w-2.5 h-2.5" /> تأیید شده
                          </span>
                        </div>
                      )}

                      <div className="relative flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.imageColor} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                            <Stethoscope className="w-7 h-7" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-stone-900 text-sm mb-0.5 truncate">{doc.name}</h4>
                            <p className="text-[10px] text-teal-700 font-black">{doc.specialty}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                                <Star className="w-3 h-3 fill-current text-amber-500" />
                                <span className="text-[9px] font-black text-amber-800">{doc.rating.toLocaleString("fa-IR")}</span>
                              </div>
                              <span className="text-[9px] text-stone-400 font-bold">({doc.reviews.toLocaleString("fa-IR")} نظر)</span>
                            </div>
                          </div>
                        </div>
                        <div className={`${avail.bg} ${avail.color} text-[9px] font-black px-2 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}>
                          <span className={`w-1.5 h-1.5 ${avail.dot} rounded-full animate-pulse`} />
                          {avail.label}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3 text-[10px] font-bold text-stone-600 relative">
                        <span className="inline-flex items-center gap-1"><Award className="w-3 h-3 text-teal-600" />{doc.experience.toLocaleString("fa-IR")} سال تجربه</span>
                      </div>

                      <div className="flex items-start gap-2 mb-2 text-[10px] font-bold text-stone-600 relative">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{doc.city} — {doc.address}</span>
                      </div>

                      {doc.phone !== "—" && (
                        <a href={`tel:${doc.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 mb-3 text-[10px] font-bold text-stone-700 hover:text-teal-700 relative" dir="ltr">
                          <PhoneCall className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span className="font-mono">{doc.phone}</span>
                        </a>
                      )}

                      <div className="flex items-center gap-1 mb-3 relative">
                        <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <div className="flex flex-wrap gap-1">
                          {doc.languages.map((langId) => {
                            const langMap: Record<string, { flag: string; name: string }> = {
                              fa: { flag: "🇮🇷", name: "فارسی" }, de: { flag: "🇦🇹", name: "آلمانی" },
                              en: { flag: "🇬🇧", name: "انگلیسی" }, ar: { flag: "🇸🇦", name: "عربی" },
                              tr: { flag: "🇹🇷", name: "ترکی" }, ru: { flag: "🇷🇺", name: "روسی" },
                              ur: { flag: "🇵🇰", name: "اردو" }, hu: { flag: "🇭🇺", name: "مجارستانی" },
                            };
                            const lang = langMap[langId];
                            if (!lang) return null;
                            return <span key={langId} className="text-[9px] font-black bg-stone-50 border border-stone-200 text-stone-700 px-1.5 py-0.5 rounded">{lang.flag} {lang.name}</span>;
                          })}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-stone-100 relative">
                        {doc.insurances.map((insId) => {
                          const ins = INSURANCE_TYPES.find((i) => i.id === insId);
                          if (!ins) return null;
                          return <span key={insId} className={`text-[9px] font-black ${ins.bg} ${ins.text} px-2 py-0.5 rounded-full border border-current/20`}>{ins.name}</span>;
                        })}
                      </div>

                      <div className="flex gap-2 relative">
                        {doc.phone !== "—" ? (
                          <a href={`tel:${doc.phone.replace(/\s/g, "")}`} className="flex-1 py-2.5 text-[10px] font-black rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5" /> تماس
                          </a>
                        ) : (
                          <div className="flex-1 py-2.5 text-[10px] font-black rounded-xl bg-stone-100 text-stone-400 flex items-center justify-center gap-1.5 cursor-not-allowed">
                            <PhoneCall className="w-3.5 h-3.5" /> شماره در دسترس نیست
                          </div>
                        )}
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2.5 text-[10px] font-black rounded-xl bg-white border-2 border-stone-200 text-stone-700 hover:border-teal-400 hover:text-teal-700 transition-all flex items-center justify-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> مسیر
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* WHY KASSENARZT */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2"><Award className="w-5 h-5 text-teal-600" /> چرا Kassenarzt انتخاب هوشمندانه‌ای است؟</h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">مزایای ویزیت پزشکان طرف قرارداد بیمه</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wallet, title: "بدون هزینه اضافی", text: "با کارت e-card، هزینه ویزیت مستقیماً توسط بیمه پرداخت می‌شود.", color: "from-emerald-500 to-teal-600" },
              { icon: ShieldCheck, title: "پوشش کامل بیمه", text: "تمامی خدمات درمانی تحت پوشش بیمه دولتی دریافت می‌کنید.", color: "from-blue-500 to-indigo-600" },
              { icon: Clock, title: "دسترسی سریع", text: "پزشکان Kassenarzt معمولاً زمان انتظار کوتاه‌تری دارند.", color: "from-amber-500 to-orange-600" },
              { icon: TrendingUp, title: "شبکه گسترده", text: "بیش از ۸۰٪ پزشکان اتریش قرارداد با بیمه‌های دولتی دارند.", color: "from-purple-500 to-fuchsia-600" },
            ].map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl border border-stone-200 p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${v.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white shadow-lg mb-4`}>
                    <Icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="relative font-black text-stone-900 text-sm mb-2">{v.title}</h3>
                  <p className="relative text-[11px] text-stone-500 font-bold leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-teal-600" /> سوالات متداول درباره Kassenarzt</h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">پاسخ‌های کوتاه به پرتکرارترین سوالات فارسی‌زبانان</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} index={i} />
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#134e4a] to-[#0a1128] p-8 md:p-12 text-white text-center">
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" /> سلامت شما، مسئولیت ما
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">پزشک مورد نظر خود را پیدا نکردید؟</h2>
            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای یافتن پزشک Kassenarzt مناسب بر اساس بیمه، تخصص و زبان مورد نظر هستند. همین حالا پیام دهید!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://wa.me/436889763256" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4" /> پرسش در واتس‌اپ
              </a>
              <a href="https://t.me/Otrish_neshin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Send className="w-4 h-4" /> پشتیبانی تلگرام
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> پاسخ در کمتر از ۲۴ ساعت</div>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> کاملاً محرمانه</div>
              <div className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> خدمات داوطلبانه</div>
            </div>
          </div>
        </motion.div>

        {/* DISCLAIMER */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این دایرکتوری از منابع رسمی (gesundheitskasse.at، aekwien.at، aekstmk.or.at) و دایرکتوری‌های معتبر جمع‌آوری شده است.
              اطلاعات ممکن است بدون اطلاع قبلی تغییر کند. همیشه قبل از مراجعه، پذیرش بیمه و اطلاعات تماس را با مطب تأیید کنید.
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است و مسئولیتی در قبال کیفیت خدمات پزشکان ندارد.
            </p>
          </div>
        </div>

        {/* KEYWORDS / TAGS */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-teal-600" /> موضوعات مرتبط</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "پزشک Kassenarzt اتریش", "پزشک فارسی زبان با بیمه اتریش", "پزشک عمومی وین با ÖGK",
              "متخصص زنان اتریش Kassenarzt", "پزشک BVAEB اتریش", "دایرکتوری پزشکان بیمه دولتی",
              "Kassenarzt Vienna", "پزشک فارسی زبان گراتس", "e-card اتریش", "ÖGK",
            ].map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all cursor-default">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// FAQ ITEM
// ==========================================
function FaqItem({ q, a, isOpen, onToggle, index }: { key?: React.Key; q: string; a: string; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className={`rounded-2xl border transition-all overflow-hidden ${isOpen ? "border-teal-500/30 bg-teal-50/30 shadow-md" : "border-stone-200"}`}>
      <button onClick={onToggle} className="w-full p-4 flex items-center justify-between text-right hover:bg-stone-50/50 transition">
        <span className="flex items-center gap-3 flex-1">
          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-all ${isOpen ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white" : "bg-stone-100 text-stone-500"}`}>{index + 1}</span>
          <span className="font-black text-xs text-stone-900 leading-snug">{q}</span>
        </span>
        <ChevronDown className={`w-4 h-4 text-stone-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180 text-teal-600" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 pr-14 text-[11px] text-stone-600 font-bold leading-relaxed border-t border-stone-100 pt-3">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default KassenarztDirectory;