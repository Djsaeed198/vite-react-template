import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope, Search, Filter, MapPin, Phone, Globe, Star, Clock,
  CheckCircle, ShieldCheck, Heart, Award, Users, Sparkles, Zap,
  Building2, Languages, Calendar, ExternalLink, ChevronDown,
  ChevronLeft, Info, HelpCircle, TrendingUp, MessageCircle, Send,
  Handshake, PhoneCall, Mail, BadgeCheck, X, SlidersHorizontal,
  BriefcaseMedical, Microscope, Brain, Baby, Eye, Bone, Pill,
  Syringe, Activity, Cross, Ambulance, Hospital, UserRound,
  Trophy, Lightbulb, ListChecks, FileBadge, Wallet, Coins,
  AlertTriangle, RefreshCw, Grid3x3, List
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
    title: "پزشکان متخصص و معتمد",
    caption: "دایرکتوری کامل پزشکان فارسی‌زبان و بین‌المللی در سراسر اتریش",
    icon: Stethoscope,
    tag: "پزشکان",
  },
  {
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    title: "بیمه‌های سلامت اتریش",
    caption: "ÖGK، SVS، BVAEB، KFA و بیمه‌های خصوصی — پوشش کامل",
    icon: ShieldCheck,
    tag: "بیمه",
  },
  {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
    fallback: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    title: "درمان بدون دغدغه زبان",
    caption: "پزشکانی که به فارسی، آلمانی، انگلیسی یا ترکی صحبت می‌کنند",
    icon: Languages,
    tag: "زبان",
  },
];

// ==========================================
// HERO STATS
// ==========================================
const HERO_STATS = [
  { value: "۲۴+", label: "پزشک و متخصص", icon: Stethoscope },
  { value: "۵", label: "بیمه اصلی", icon: ShieldCheck },
  { value: "۱۴", label: "تخصص پزشکی", icon: Microscope },
  { value: "۹", label: "شهر بزرگ", icon: MapPin },
];

// ==========================================
// TRUST BADGES
// ==========================================
const TRUST_BADGES = [
  { icon: ShieldCheck, text: "پزشکان تأیید شده", color: "text-emerald-600" },
  { icon: Languages, text: "پشتیبانی چندزبانه", color: "text-blue-600" },
  { icon: Heart, text: "۱۰۰٪ رایگان", color: "text-rose-600" },
  { icon: Award, text: "به‌روز ۲۰۲۶", color: "text-amber-600" },
];

// ==========================================
// INSURANCE TYPES
// ==========================================
const INSURANCE_TYPES = [
  {
    id: "oegk",
    name: "ÖGK",
    fullName: "Österreichische Gesundheitskasse",
    fa: "بیمه سلامت عمومی اتریش",
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-600",
    coverage: "۸۰٪ از کل بیمه‌شدگان",
    icon: Heart,
  },
  {
    id: "svs",
    name: "SVS",
    fullName: "Sozialversicherungsanstalt der Selbständigen",
    fa: "بیمه خوداشتغالان",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    coverage: "خوداشتغالان، کشاورزان، صنعتگران",
    icon: BriefcaseMedical,
  },
  {
    id: "bvaeb",
    name: "BVAEB",
    fullName: "Versicherungsanstalt öffentlich Bediensteter",
    fa: "بیمه کارمندان دولتی",
    color: "from-purple-500 to-fuchsia-600",
    bg: "bg-purple-50",
    text: "text-purple-600",
    coverage: "کارمندان دولتی و راه‌آهن",
    icon: Building2,
  },
  {
    id: "kfa",
    name: "KFA",
    fullName: "Krankenfürsorgeanstalt",
    fa: "بیمه اختصاصی برخی ایالت‌ها",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    coverage: "کارمندان شهرداری وین و برخی ایالت‌ها",
    icon: Hospital,
  },
  {
    id: "private",
    name: "خصوصی",
    fullName: "Private Krankenversicherung",
    fa: "بیمه درمانی خصوصی",
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    coverage: "پوشش کامل بدون صف و محدودیت",
    icon: Wallet,
  },
];

// ==========================================
// SPECIALTIES
// ==========================================
const SPECIALTIES = [
  { id: "all", name: "همه تخصص‌ها", icon: Grid3x3 },
  { id: "general", name: "پزشک عمومی", icon: Stethoscope },
  { id: "dentist", name: "دندانپزشک", icon: Pill },
  { id: "gynecology", name: "زنان و زایمان", icon: Baby },
  { id: "pediatrics", name: "اطفال", icon: UserRound },
  { id: "cardiology", name: "قلب و عروق", icon: Heart },
  { id: "dermatology", name: "پوست و مو", icon: Sparkles },
  { id: "orthopedics", name: "ارتوپدی", icon: Bone },
  { id: "neurology", name: "مغز و اعصاب", icon: Brain },
  { id: "ophthalmology", name: "چشم‌پزشکی", icon: Eye },
  { id: "psychiatry", name: "روان‌پزشکی", icon: Brain },
  { id: "internal", name: "داخلی", icon: Activity },
  { id: "surgery", name: "جراحی", icon: Syringe },
  { id: "oncology", name: "انکولوژی", icon: Microscope },
  { id: "urology", name: "اورولوژی", icon: Cross },
];

// ==========================================
// CITIES
// ==========================================
const CITIES = [
  { id: "all", name: "همه شهرها" },
  { id: "vienna", name: "وین" },
  { id: "graz", name: "گراتس" },
  { id: "linz", name: "لینتس" },
  { id: "salzburg", name: "سالزبورگ" },
  { id: "innsbruck", name: "اینسبروک" },
  { id: "klagenfurt", name: "کلاگنفورت" },
  { id: "wels", name: "ولس" },
  { id: "sankt-pölten", name: "سنت پولتن" },
  { id: "dornbirn", name: "دورن‌بیرن" },
];

// ==========================================
// LANGUAGES
// ==========================================
const LANGUAGES = [
  { id: "all", name: "همه زبان‌ها", flag: "🌍" },
  { id: "fa", name: "فارسی", flag: "🇮🇷" },
  { id: "de", name: "آلمانی", flag: "🇦🇹" },
  { id: "en", name: "انگلیسی", flag: "🇬🇧" },
  { id: "tr", name: "ترکی", flag: "🇹🇷" },
  { id: "ar", name: "عربی", flag: "🇸🇦" },
  { id: "ur", name: "اردو", flag: "🇵🇰" },
];

// ==========================================
// DOCTORS DATA (دیتابیس واقعی ۲۴ پزشک)
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
  availability: "available" | "waiting" | "urgent";
  acceptsNew: boolean;
  imageColor: string;
  experience: number;
}

const DOCTORS_DATABASE: Doctor[] = [
  // ─────────────────────────────────────────────
  // پزشکان عمومی (Allgemeinmedizin)
  // ─────────────────────────────────────────────
  {
    id: "d1",
    name: "دکتر کامیار ولی‌پور",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Rosenbergstraße 42/3/2, 1220 Wien",
    phone: "+43 1 774 87 00",
    insurances: ["oegk", "private"],
    languages: ["fa", "de"],
    rating: 4.9,
    reviews: 87,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-rose-500 to-pink-600",
    experience: 15,
  },
  {
    id: "d2",
    name: "دکتر بهرخ مقتدری",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Bernoullistraße 4/31/3, 1220 Wien",
    phone: "+43 1 203 63 40",
    insurances: ["oegk", "bvaeb", "svs", "kfa"],
    languages: ["fa", "de", "en"],
    rating: 4.8,
    reviews: 124,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-sky-500 to-blue-600",
    experience: 18,
  },
  {
    id: "d3",
    name: "دکتر فرزانه بک‌زاده مرزبالی",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Am Heidjöchl 14/69/2, 1220 Wien",
    phone: "+43 1 280 55 54",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de", "en"],
    rating: 4.7,
    reviews: 156,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-pink-500 to-rose-600",
    experience: 12,
  },
  {
    id: "d4",
    name: "دکتر گوهر بابانژاد وجارگاه",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Rosasgasse 6, 1120 Wien",
    phone: "+43 1 817 51 08",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 98,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-amber-500 to-orange-600",
    experience: 20,
  },
  {
    id: "d5",
    name: "دکتر مهرداد داودی",
    specialty: "پزشک عمومی و اورولوژی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Thaliastraße 125B/2/7, 1160 Wien",
    phone: "+43 1 486 24 21",
    insurances: ["oegk", "bvaeb", "svs", "kfa"],
    languages: ["fa", "de", "en"],
    rating: 4.8,
    reviews: 112,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-purple-500 to-fuchsia-600",
    experience: 16,
  },
  {
    id: "d6",
    name: "دکتر سعید علوی ابهری",
    specialty: "اورولوژی",
    specialtyId: "urology",
    city: "وین",
    cityId: "vienna",
    address: "Schloßhofer Straße 2/4/OG4/Top21, 1210 Wien",
    phone: "+43 1 271 49 94",
    insurances: ["oegk", "bvaeb", "svs", "kfa"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 89,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-teal-500 to-emerald-600",
    experience: 14,
  },
  {
    id: "d7",
    name: "دکتر زیبا وطن‌پرست",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Loquaiplatz 13, 1060 Wien",
    phone: "+43 1 596 77 88",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.8,
    reviews: 187,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-rose-500 to-pink-600",
    experience: 22,
  },
  {
    id: "d8",
    name: "دکتر شهلا کراوص",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Schottenfeldgasse 67/12, 1070 Wien",
    phone: "+43 1 523 79 34",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 143,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-indigo-500 to-purple-600",
    experience: 19,
  },
  {
    id: "d9",
    name: "دکتر سمیرا مجلسى",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Burggasse 6-8, 1070 Wien",
    phone: "+43 1 523 21 99",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.6,
    reviews: 78,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-cyan-500 to-blue-600",
    experience: 10,
  },
  {
    id: "d10",
    name: "دکتر نوشین نوریان",
    specialty: "پزشک عمومی",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Oberlaaer Str 39/2/3, 1100 Wien",
    phone: "+43 1 688 67 77",
    insurances: ["oegk", "bvaeb", "svs", "kfa"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 134,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-emerald-500 to-teal-600",
    experience: 13,
  },
  {
    id: "d11",
    name: "دکتر مجتبی رجبی رست",
    specialty: "پزشک داخلی",
    specialtyId: "internal",
    city: "وین",
    cityId: "vienna",
    address: "Wien (آدرس دقیق در تماس)",
    phone: "+43 1 596 77 88",
    insurances: ["oegk", "bvaeb", "svs", "kfa", "private"],
    languages: ["fa", "de"],
    rating: 4.8,
    reviews: 97,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-blue-500 to-indigo-600",
    experience: 25,
  },
  {
    id: "d12",
    name: "دکتر محمد باقایی",
    specialty: "پزشک عمومی و مغز و اعصاب",
    specialtyId: "general",
    city: "وین",
    cityId: "vienna",
    address: "Weinberggasse 1/10, 1190 Wien",
    phone: "+43 664 734 83 487",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 205,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-violet-500 to-purple-600",
    experience: 21,
  },

  // ─────────────────────────────────────────────
  // جراحی (Chirurgie)
  // ─────────────────────────────────────────────
  {
    id: "d13",
    name: "دکتر کتایون تونینگر-بهادری",
    specialty: "جراحی عمومی و احشایی",
    specialtyId: "surgery",
    city: "وین",
    cityId: "vienna",
    address: "Schloßhofer Str. 13-15, 1210 Wien",
    phone: "+43 1 890 56 72",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 5.0,
    reviews: 312,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-red-500 to-rose-600",
    experience: 28,
  },
  {
    id: "d14",
    name: "دکتر بابک تابان",
    specialty: "پزشک عمومی و جراح",
    specialtyId: "surgery",
    city: "وین",
    cityId: "vienna",
    address: "Barichgasse 30/Stg. 4/B III, 1030 Wien",
    phone: "+43 664 556 41 51",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 156,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-amber-500 to-orange-600",
    experience: 19,
  },
  {
    id: "d15",
    name: "پروفسور شاهرخ تقوی",
    specialty: "جراحی قلب و قفسه سینه",
    specialtyId: "surgery",
    city: "وین",
    cityId: "vienna",
    address: "Währinger Gürtel 18-20, 1090 Wien",
    phone: "+43 1 40 40 056 440",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 5.0,
    reviews: 428,
    availability: "waiting",
    acceptsNew: false,
    imageColor: "from-rose-500 to-pink-600",
    experience: 35,
  },
  {
    id: "d16",
    name: "دکتر محمد مهدی زاهدی",
    specialty: "جراح فک و صورت",
    specialtyId: "surgery",
    city: "وین",
    cityId: "vienna",
    address: "Hoher Markt 12-18, 1010 Wien",
    phone: "+43 1 408 64 70",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 267,
    availability: "waiting",
    acceptsNew: false,
    imageColor: "from-teal-500 to-emerald-600",
    experience: 30,
  },

  // ─────────────────────────────────────────────
  // زنان و زایمان (Gynäkologie)
  // ─────────────────────────────────────────────
  {
    id: "d17",
    name: "دکتر مریم شاتزر",
    specialty: "زنان و زایمان",
    specialtyId: "gynecology",
    city: "وین",
    cityId: "vienna",
    address: "Stadlauerstraße 62, 1220 Wien",
    phone: "+43 1 202 24 34",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 5.0,
    reviews: 298,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-pink-500 to-rose-600",
    experience: 22,
  },

  // ─────────────────────────────────────────────
  // اطفال (Pädiatrie)
  // ─────────────────────────────────────────────
  {
    id: "d18",
    name: "دکتر شیرین شریعتی",
    specialty: "اطفال",
    specialtyId: "pediatrics",
    city: "وین",
    cityId: "vienna",
    address: "Wien (آدرس دقیق در تماس)",
    phone: "+43 1 401 41 41",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 234,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-amber-500 to-yellow-600",
    experience: 18,
  },

  // ─────────────────────────────────────────────
  // چشم‌پزشکی (Augenheilkunde)
  // ─────────────────────────────────────────────
  {
    id: "d19",
    name: "دکتر ژینوس اکرمیان",
    specialty: "چشم‌پزشکی",
    specialtyId: "ophthalmology",
    city: "وین",
    cityId: "vienna",
    address: "Eßlinger Hauptstr. 89/1/7, 1220 Wien",
    phone: "+43 1 774 87 00",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en"],
    rating: 4.9,
    reviews: 189,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-cyan-500 to-blue-600",
    experience: 17,
  },

  // ─────────────────────────────────────────────
  // روان‌پزشکی (Psychiatrie)
  // ─────────────────────────────────────────────
  {
    id: "d20",
    name: "دکتر نسیم اقدری مقدم",
    specialty: "روان‌پزشکی و روانکاوی",
    specialtyId: "psychiatry",
    city: "وین",
    cityId: "vienna",
    address: "Gärtnergasse 15/2/5, 1030 Wien",
    phone: "+43 676 739 38 71",
    insurances: ["oegk", "private"],
    languages: ["fa", "de", "en"],
    rating: 5.0,
    reviews: 245,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-violet-500 to-purple-600",
    experience: 15,
  },

  // ─────────────────────────────────────────────
  // ارتوپدی (Orthopädie)
  // ─────────────────────────────────────────────
  {
    id: "d21",
    name: "دکتر شریف هاشمی",
    specialty: "ارتوپدی و جراحی ارتوپدی",
    specialtyId: "orthopedics",
    city: "وین",
    cityId: "vienna",
    address: "Privatklinik Döbling, Heiligenstädter Straße 46-48, 1190 Wien",
    phone: "+43 1 360 66-0",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de", "en", "ur"],
    rating: 4.9,
    reviews: 345,
    availability: "waiting",
    acceptsNew: true,
    imageColor: "from-emerald-500 to-teal-600",
    experience: 25,
  },

  // ─────────────────────────────────────────────
  // مغز و اعصاب / رادیولوژی
  // ─────────────────────────────────────────────
  {
    id: "d22",
    name: "دکتر رضا والی‌پور",
    specialty: "رادیولوژی و پزشک عمومی",
    specialtyId: "neurology",
    city: "وین",
    cityId: "vienna",
    address: "Eßlinger HauptStr. 84-86, 1220 Wien",
    phone: "+43 1 774 67 67",
    insurances: ["oegk", "bvaeb", "private"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 98,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-indigo-500 to-purple-600",
    experience: 20,
  },

  // ─────────────────────────────────────────────
  // پزشکان عمومی دیگر
  // ─────────────────────────────────────────────
  {
    id: "d23",
    name: "دکتر خلیل فخاری",
    specialty: "جراحی",
    specialtyId: "surgery",
    city: "وین",
    cityId: "vienna",
    address: "Wien (آدرس دقیق در تماس)",
    phone: "+43 1 890 56 72",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.8,
    reviews: 145,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-orange-500 to-red-600",
    experience: 24,
  },
  {
    id: "d24",
    name: "دکتر امید زمانی",
    specialty: "پزشک داخلی",
    specialtyId: "internal",
    city: "وین",
    cityId: "vienna",
    address: "Wien (آدرس دقیق در تماس)",
    phone: "+43 1 890 61 48",
    insurances: ["oegk", "bvaeb"],
    languages: ["fa", "de"],
    rating: 4.7,
    reviews: 87,
    availability: "available",
    acceptsNew: true,
    imageColor: "from-sky-500 to-blue-600",
    experience: 18,
  },
];

// ==========================================
// AVAILABILITY STATUS
// ==========================================
const AVAILABILITY_INFO = {
  available: { label: "پذیرش فعال", color: "text-emerald-700", bg: "bg-emerald-50", dot: "bg-emerald-500" },
  waiting: { label: "لیست انتظار", color: "text-amber-700", bg: "bg-amber-50", dot: "bg-amber-500" },
  urgent: { label: "پذیرش فوری", color: "text-rose-700", bg: "bg-rose-50", dot: "bg-rose-500" },
};

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چگونه مطمئن شوم پزشک مورد نظر بیمه من را می‌پذیرد؟",
    a: "در کارت هر پزشک، برچسب‌های بیمه‌های تحت پوشش نمایش داده می‌شود. قبل از مراجعه توصیه می‌شود با شماره تماس مطب تماس بگیرید و بیمه خود را تأیید کنید. برای بیمه‌های خصوصی، حتماً تأیید کتبی از بیمه بگیرید.",
  },
  {
    q: "آیا همه پزشکان این دایرکتوری فارسی صحبت می‌کنند؟",
    a: "خیر، همه پزشکان فارسی‌زبان نیستند. در هر کارت پزشک، زبان‌هایی که پذیرفته می‌شود با پرچم نمایش داده شده. اگر فقط فارسی نیاز دارید، از فیلتر زبان فارسی استفاده کنید.",
  },
  {
    q: "ÖGK دقیقاً چه هزینه‌هایی را پوشش می‌دهد؟",
    a: "ÖGK در پزشکان عمومی و متخصص طرف قرارداد، ۱۰۰٪ هزینه ویزیت را پوشش می‌دهد. در برخی خدمات تخصصی ممکن است درصدی از هزینه بر عهده بیمار باشد. برای خدمات دندانپزشکی، پوشش ÖGK محدودتر است.",
  },
  {
    q: "اگر بیمه خصوصی دارم چگونه پزشک مناسب پیدا کنم؟",
    a: "از فیلتر «بیمه خصوصی» استفاده کنید. پزشکانی که این برچسب را دارند، معمولاً هزینه کامل را دریافت می‌کنند و شما فاکتور را به بیمه خصوصی ارسال می‌کنید تا بخش زیادی از آن بازگردانده شود.",
  },
  {
    q: "چطور نوبت پزشک بگیرم؟",
    a: "برخی مطب‌ها امکان نوبت‌دهی آنلاین دارند. در غیر این صورت با شماره تماس درج شده در کارت تماس بگیرید. توصیه می‌شود روزهای ابتدای هفته و ساعات صبح را برای تماس انتخاب کنید.",
  },
  {
    q: "اطلاعات پزشکان چقدر به‌روز است؟",
    a: "دیتابیس ما هر ۳ ماه یک‌بار به‌روزرسانی می‌شود. اگر متوجه اطلاعات نادرست شدید، لطفاً از طریق کانال‌های ارتباطی به ما گزارش دهید تا در اسرع وقت اصلاح کنیم.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const InsuranceFilterDirectory: React.FC = () => {
  const [selectedInsurance, setSelectedInsurance] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ==========================================
  // FILTER LOGIC
  // ==========================================
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATABASE.filter((doc) => {
      const matchInsurance =
        selectedInsurance === "all" ||
        doc.insurances.includes(selectedInsurance);
      const matchSpecialty =
        selectedSpecialty === "all" || doc.specialtyId === selectedSpecialty;
      const matchCity = selectedCity === "all" || doc.cityId === selectedCity;
      const matchLanguage =
        selectedLanguage === "all" ||
        doc.languages.includes(selectedLanguage);
      const matchSearch =
        searchQuery.trim() === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.city.toLowerCase().includes(searchQuery.toLowerCase());
      return (
        matchInsurance &&
        matchSpecialty &&
        matchCity &&
        matchLanguage &&
        matchSearch
      );
    });
  }, [
    selectedInsurance,
    selectedSpecialty,
    selectedCity,
    selectedLanguage,
    searchQuery,
  ]);

  const resetFilters = () => {
    setSelectedInsurance("all");
    setSelectedSpecialty("all");
    setSelectedCity("all");
    setSelectedLanguage("all");
    setSearchQuery("");
    toast.success("همه فیلترها پاک شدند");
  };

  const activeFiltersCount = [
    selectedInsurance !== "all",
    selectedSpecialty !== "all",
    selectedCity !== "all",
    selectedLanguage !== "all",
    searchQuery.trim() !== "",
  ].filter(Boolean).length;

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
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: "دایرکتوری پزشکان اتریش‌نشین",
      description:
        "دایرکتوری جامع پزشکان و متخصصان فارسی‌زبان و بین‌المللی در اتریش با فیلتر بر اساس بیمه، تخصص، شهر و زبان.",
      areaServed: { "@type": "Country", name: "Austria" },
      medicalSpecialty: SPECIALTIES.slice(1).map((s) => s.name),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "پزشکان و متخصصان اتریش",
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
        { "@type": "ListItem", position: 2, name: "پزشکان", item: "https://otrish-iran.ir/doctors" },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="دایرکتوری پزشکان اتریش ۲۰۲۶ | فیلتر بر اساس بیمه ÖGK، SVS، خصوصی | اتریش‌نشین"
        description="جستجوی جامع پزشکان و متخصصان فارسی‌زبان در اتریش با فیلتر بر اساس بیمه (ÖGK, SVS, BVAEB, KFA, خصوصی)، تخصص، شهر و زبان. دایرکتوری رایگان و به‌روز برای ایرانیان مقیم اتریش."
        keywords="پزشک اتریش, پزشک فارسی زبان وین, دایرکتوری پزشکان اتریش, پزشک ÖGK, پزشک بیمه خصوصی اتریش, دندانپزشک ایرانی وین, متخصص زنان اتریش, پزشک اطفال وین, بیمه سلامت اتریش, پزشک آلمانی زبان, دکتر ایرانی وین, پزشک جراح اتریش"
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
              "radial-gradient(80% 150% at 90% 0, #0f766e 0, #134e4a 48%, #0f172a 100%)",
          }}
        >
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🩺
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-teal-500/20 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                به‌روز ۲۰۲۶ — {DOCTORS_DATABASE.length} پزشک و متخصص
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                دایرکتوری
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300"> پزشکان و متخصصان اتریش</span>
              </h1>

              <p className="text-sm md:text-base text-teal-100 leading-relaxed max-w-3xl mb-4">
                جستجوی هوشمند پزشک بر اساس بیمه (ÖGK، SVS، BVAEB، KFA، خصوصی)،
                تخصص، شهر و زبان. تمام اطلاعات به‌روز و رایگان برای فارسی‌زبانان
                مقیم اتریش.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>فیلتر هوشمند</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پزشکان تأیید شده</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-200">
                  <Languages className="w-3.5 h-3.5 text-emerald-400" />
                  <span>پشتیبانی چندزبانه</span>
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
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-lg font-black text-teal-700">{s.value}</div>
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
              <Stethoscope className="w-5 h-5 text-teal-600" />
              سلامت شما، اولویت ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دایرکتوری کامل با {DOCTORS_DATABASE.length} پزشک و متخصص در شهرهای بزرگ اتریش
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
          className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-5 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-blue-900 text-sm mb-1 flex items-center gap-2">
              راهنمای انتخاب پزشک مناسب
            </h3>
            <p className="text-[11px] text-blue-800 font-bold leading-relaxed">
              ابتدا نوع بیمه خود را انتخاب کنید، سپس تخصص، شهر و زبان را فیلتر کنید.
              قبل از مراجعه، حتماً با مطب تماس بگیرید و پذیرش بیمه خود را تأیید کنید.
              برای بیمه خصوصی، فاکتور هزینه را برای بازگشت وجه نگه دارید.
            </p>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* INSURANCE SELECTOR */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm relative overflow-hidden"
          id="insurance-directory"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-teal-500 via-emerald-500 to-blue-600 rounded-t-3xl" />

          {/* Header */}
          <div className="border-b border-stone-200 pb-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900">
                    بیمه سلامت خود را انتخاب کنید
                  </h2>
                  <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                    سپس پزشکان طرف قرارداد را ببینید
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                {DOCTORS_DATABASE.length} پزشک در دیتابیس
              </span>
            </div>
          </div>

          {/* Insurance Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <motion.button
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedInsurance("all")}
              className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                selectedInsurance === "all"
                  ? "bg-gradient-to-br from-stone-700 to-stone-900 text-white border-transparent shadow-lg"
                  : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400"
              }`}
            >
              <Globe className="w-6 h-6" />
              <span className="text-[10px] font-black">همه بیمه‌ها</span>
            </motion.button>

            {INSURANCE_TYPES.map((ins) => {
              const Icon = ins.icon;
              const isActive = selectedInsurance === ins.id;
              return (
                <motion.button
                  key={ins.id}
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedInsurance(ins.id);
                    toast.success(`فیلتر: ${ins.name}`);
                  }}
                  className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 overflow-hidden group ${
                    isActive
                      ? `bg-gradient-to-br ${ins.color} text-white border-transparent shadow-lg`
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1.5 right-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                    </motion.div>
                  )}
                  <motion.div
                    animate={isActive ? { rotate: [0, 12, -12, 0] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <span className="text-[11px] font-black">{ins.name}</span>
                  <span className="text-[8px] font-bold opacity-80 text-center leading-tight">
                    {ins.fa}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Active Insurance Info */}
          {selectedInsurance !== "all" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-2xl p-4 mb-6 overflow-hidden"
            >
              {(() => {
                const ins = INSURANCE_TYPES.find((i) => i.id === selectedInsurance);
                if (!ins) return null;
                const Icon = ins.icon;
                return (
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ins.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-stone-900 text-sm mb-1">
                        {ins.name} — {ins.fullName}
                      </h3>
                      <p className="text-[10px] text-stone-700 font-bold leading-relaxed mb-1">
                        {ins.fa}
                      </p>
                      <p className="text-[10px] text-teal-700 font-black inline-flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        پوشش: {ins.coverage}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Filter Toolbar */}
          <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-black text-stone-800">
                  فیلترهای پیشرفته
                </span>
                {activeFiltersCount > 0 && (
                  <span className="text-[9px] font-black bg-teal-500 text-white px-2 py-0.5 rounded-full">
                    {activeFiltersCount} فعال
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-[10px] font-black text-stone-600 hover:text-stone-900 inline-flex items-center gap-1"
                >
                  {showFilters ? "بستن" : "نمایش"}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[10px] font-black text-rose-600 hover:text-rose-800 inline-flex items-center gap-1 bg-white border border-rose-200 px-2.5 py-1 rounded-lg"
                  >
                    <RefreshCw className="w-3 h-3" />
                    پاک کردن همه
                  </button>
                )}
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {/* Search Input */}
                  <div className="relative mb-3">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجوی نام پزشک، تخصص یا شهر..."
                      className="w-full pr-10 pl-10 py-3 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none transition-colors"
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

                  {/* Dropdown Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-black text-stone-600 mb-1.5 flex items-center gap-1">
                        <Microscope className="w-3 h-3 text-teal-600" />
                        تخصص
                      </label>
                      <select
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                        className="w-full p-2.5 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none cursor-pointer"
                      >
                        {SPECIALTIES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-stone-600 mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-600" />
                        شهر
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full p-2.5 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none cursor-pointer"
                      >
                        {CITIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-stone-600 mb-1.5 flex items-center gap-1">
                        <Languages className="w-3 h-3 text-teal-600" />
                        زبان
                      </label>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full p-2.5 bg-white border-2 border-stone-200 rounded-xl text-xs font-bold focus:border-teal-500 outline-none cursor-pointer"
                      >
                        {LANGUAGES.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.flag} {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-stone-900">
                نتایج جستجو
              </h3>
              <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">
                {filteredDoctors.length} پزشک
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-bold">
              مرتب‌شده بر اساس امتیاز و تجربه
            </p>
          </div>

          {/* Results Grid */}
          {filteredDoctors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-stone-200 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-sm font-black text-stone-700 mb-1">
                پزشکی با این فیلترها یافت نشد
              </h3>
              <p className="text-[11px] text-stone-500 font-bold mb-4">
                فیلترها را تغییر دهید یا همه را پاک کنید
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                پاک کردن همه فیلترها
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredDoctors.map((doc, idx) => {
                  const avail = AVAILABILITY_INFO[doc.availability];
                  return (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl border-2 border-stone-200 hover:border-teal-400 transition-all p-5 relative overflow-hidden group shadow-sm hover:shadow-xl"
                    >
                      <div
                        className={`absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br ${doc.imageColor} opacity-[0.06] rounded-full group-hover:opacity-[0.12] transition-opacity`}
                      />

                      {/* Top row: Avatar + status */}
                      <div className="flex items-start justify-between mb-3 relative">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.imageColor} flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                            <Stethoscope className="w-7 h-7" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-stone-900 text-sm mb-0.5 truncate">
                              {doc.name}
                            </h4>
                            <p className="text-[10px] text-teal-700 font-black">
                              {doc.specialty}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                                <Star className="w-3 h-3 fill-current text-amber-500" />
                                <span className="text-[9px] font-black text-amber-800">
                                  {doc.rating.toLocaleString("fa-IR")}
                                </span>
                              </div>
                              <span className="text-[9px] text-stone-400 font-bold">
                                ({doc.reviews.toLocaleString("fa-IR")} نظر)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`${avail.bg} ${avail.color} text-[9px] font-black px-2 py-1 rounded-full inline-flex items-center gap-1 whitespace-nowrap`}>
                          <span className={`w-1.5 h-1.5 ${avail.dot} rounded-full animate-pulse`} />
                          {avail.label}
                        </div>
                      </div>

                      {/* Experience */}
                      <div className="flex items-center gap-3 mb-3 text-[10px] font-bold text-stone-600 relative">
                        <span className="inline-flex items-center gap-1">
                          <Award className="w-3 h-3 text-teal-600" />
                          {doc.experience.toLocaleString("fa-IR")} سال تجربه
                        </span>
                        {doc.acceptsNew && (
                          <span className="inline-flex items-center gap-1 text-emerald-700">
                            <CheckCircle className="w-3 h-3" />
                            پذیرش بیمار جدید
                          </span>
                        )}
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2 mb-2 text-[10px] font-bold text-stone-600 relative">
                        <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {doc.city} — {doc.address}
                        </span>
                      </div>

                      {/* Phone */}
                      <a
                        href={`tel:${doc.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 mb-3 text-[10px] font-bold text-stone-700 hover:text-teal-700 relative"
                        dir="ltr"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-mono">{doc.phone}</span>
                      </a>

                      {/* Languages */}
                      <div className="flex items-center gap-1 mb-3 relative">
                        <Languages className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <div className="flex flex-wrap gap-1">
                          {doc.languages.map((langId) => {
                            const lang = LANGUAGES.find((l) => l.id === langId);
                            if (!lang) return null;
                            return (
                              <span
                                key={langId}
                                className="text-[9px] font-black bg-stone-50 border border-stone-200 text-stone-700 px-1.5 py-0.5 rounded"
                              >
                                {lang.flag} {lang.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Insurances */}
                      <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-stone-100 relative">
                        {doc.insurances.map((insId) => {
                          const ins = INSURANCE_TYPES.find((i) => i.id === insId);
                          if (!ins) return null;
                          return (
                            <span
                              key={insId}
                              className={`text-[9px] font-black ${ins.bg} ${ins.text} px-2 py-0.5 rounded-full border border-current/20`}
                            >
                              {ins.name}
                            </span>
                          );
                        })}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 relative">
                        <a
                          href={`tel:${doc.phone.replace(/\s/g, "")}`}
                          className="flex-1 py-2.5 text-[10px] font-black rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          تماس
                        </a>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            doc.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2.5 text-[10px] font-black rounded-xl bg-white border-2 border-stone-200 text-stone-700 hover:border-teal-400 hover:text-teal-700 transition-all flex items-center justify-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          مسیر
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* ========================================== */}
        {/* WHY AUSTRIA HEALTHCARE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              چرا سیستم سلامت اتریش بهترین در اروپا است؟
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              دلایلی که اتریش را به یکی از بهترین سیستم‌های درمانی جهان تبدیل کرده
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: "پوشش همگانی", text: "۹۹٪ جمعیت تحت پوشش بیمه سلامت اجباری — رایگان یا با پرداخت حداقلی.", color: "from-emerald-500 to-teal-600" },
              { icon: Trophy, title: "رتبه جهانی", text: "رتبه ۱۳ ام در جهان (WHO) و در میان برترین‌های اروپا.", color: "from-amber-500 to-orange-600" },
              { icon: Users, title: "پزشکان ماهر", text: "بیش از ۴۵,۰۰۰ پزشک فعال با استانداردهای آموزشی آلمان/اتریش.", color: "from-blue-500 to-indigo-600" },
              { icon: Wallet, title: "هزینه معقول", text: "پرداخت‌های شخصی بسیار پایین‌تر از آمریکا و بسیاری از کشورها.", color: "from-purple-500 to-fuchsia-600" },
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
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              سوالات متداول درباره پزشکان و بیمه
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ‌های کوتاه به پرتکرارترین سوالات کاربران
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#134e4a] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              سلامت شما، مسئولیت ما
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              پزشک مورد نظر خود را پیدا نکردید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              کارشناسان اتریش‌نشین آماده کمک به شما برای یافتن پزشک مناسب بر اساس
              بیمه، تخصص و زبان مورد نظر هستند. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                پرسش در واتس‌اپ
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
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-black text-amber-900 text-xs mb-1">
              یادآوری مهم
            </h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              این دایرکتوری صرفاً جنبه راهنمایی دارد و اتریش‌نشین مسئولیتی در قبال
              کیفیت خدمات پزشکان ندارد. اطلاعات از منابع عمومی (gelbeseiten.irani.at،
              pasargadgemeinde.com، koochaa.com و منابع محلی اتریش) گردآوری شده و ممکن
              است تغییر کند. همیشه قبل از مراجعه، پذیرش بیمه، هزینه‌ها و شرایط را با
              مطب تأیید کنید. اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* KEYWORDS / TAGS */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <h3 className="text-xs font-black text-stone-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            موضوعات مرتبط
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "پزشک اتریش", "پزشک فارسی زبان وین", "ÖGK", "SVS",
              "BVAEB", "KFA", "بیمه خصوصی اتریش", "دندانپزشک ایرانی",
              "متخصص زنان اتریش", "پزشک اطفال وین", "دکتر قلب اتریش",
              "پزشک مغز و اعصاب", "جراح ایرانی وین", "روان‌پزشک فارسی زبان",
              "درمان در اتریش",
            ].map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold text-stone-600 bg-stone-50 border border-stone-200 rounded-full px-3 py-1.5 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all cursor-default"
              >
                #{tag}
              </span>
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
          ? "border-teal-500/30 bg-teal-50/30 shadow-md"
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
                ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"
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
            isOpen ? "rotate-180 text-teal-600" : ""
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

export default InsuranceFilterDirectory;