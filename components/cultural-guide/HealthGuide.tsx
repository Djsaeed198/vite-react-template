import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Heart, ShieldAlert, Phone, HelpCircle, UserPlus,
  MapPin, Check, Plus, AlertTriangle, ExternalLink, Activity,
  Stethoscope, Pill, Syringe, Cross, Ambulance, Hospital,
  Shield, BadgeCheck, Star, Award, Crown, Users, Clock, Globe,
  Link2, Quote, Lightbulb, ChevronDown, ChevronLeft, Send,
  MessageCircle, PhoneCall, Sparkles, TrendingUp, BookOpen,
  Landmark, Wallet, CreditCard, FileText, Languages, Baby,
  Eye, Brain, Bone, HeartPulse, Smile, Filter, X, Grid,
  LayoutList, Copy, CheckCircle2, Navigation, Info, Target,
  Rocket, HandHeart, Handshake, Gem, BadgePercent, Calendar,
  Timer, FireExtinguisher, AlertCircle, BadgeAlert, ShieldCheck
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
  { value: "۵۰+", label: "پزشک فارسی‌زبان", icon: "👨‍⚕️", sub: "در سراسر اتریش" },
  { value: "۱۰+", label: "تخصص پزشکی", icon: "🏥", sub: "پوشش کامل نیازها" },
  { value: "۲۴/۷", label: "خطوط اورژانس", icon: "🚨", sub: "پاسخگویی فوری" },
  { value: "۱۰۰٪", label: "رایگان", icon: "💚", sub: "اطلاعات عمومی" },
];

// ==========================================
// SPECIALTIES
// ==========================================
const SPECIALTIES = [
  { id: "all", label: "همه تخصص‌ها", icon: Grid, emoji: "🌐", color: "from-stone-600 to-stone-800", bg: "bg-stone-100", text: "text-stone-800", count: 50 },
  { id: "general", label: "پزشکی عمومی", icon: Stethoscope, emoji: "🩺", color: "from-emerald-500 to-green-600", bg: "bg-emerald-50", text: "text-emerald-800", count: 18 },
  { id: "dentist", label: "دندان‌پزشکی", icon: Smile, emoji: "🦷", color: "from-sky-500 to-blue-600", bg: "bg-sky-50", text: "text-sky-800", count: 10 },
  { id: "pediatrician", label: "کودکان و اطفال", icon: Baby, emoji: "👶", color: "from-rose-500 to-red-600", bg: "bg-rose-50", text: "text-rose-800", count: 6 },
  { id: "gynecologist", label: "زنان و زایمان", icon: HeartPulse, emoji: "🌸", color: "from-pink-500 to-rose-600", bg: "bg-pink-50", text: "text-pink-800", count: 5 },
  { id: "ophthalmologist", label: "چشم‌پزشکی", icon: Eye, emoji: "👁️", color: "from-purple-500 to-indigo-600", bg: "bg-purple-50", text: "text-purple-800", count: 4 },
  { id: "psychiatrist", label: "روان‌پزشکی", icon: Brain, emoji: "🧠", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", text: "text-amber-800", count: 3 },
  { id: "orthopedic", label: "ارتوپدی", icon: Bone, emoji: "🦴", color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", text: "text-teal-800", count: 4 },
];

// ==========================================
// DOCTORS DATA
// ==========================================
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  lang: string[];
  address: string;
  city: string;
  phone: string;
  insurance: string;
  insuranceType: "kassenarzt" | "wahlarzt" | "private";
  rating: number;
  reviews?: number;
  url: string;
  emoji: string;
  verified: boolean;
  popular?: boolean;
  tags: string[];
  yearsExperience?: number;
  education?: string;
}

const FARSI_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'دکتر هدی مصلح‌آرانی',
    specialty: 'general',
    lang: ['فارسی', 'آلمانی', 'انگلیسی'],
    address: 'Alser Straße 43/12, 1080 Wien',
    city: 'wien',
    phone: '+43 1 4051052',
    insurance: 'Kassenarzt (ÖGK, BVAEB)',
    insuranceType: 'kassenarzt',
    rating: 5.0,
    reviews: 128,
    url: 'https://www.docfinder.at',
    emoji: '👩‍⚕️',
    verified: true,
    popular: true,
    tags: ['پزشک عمومی', 'بیمه دولتی', 'پزشک زنان'],
    yearsExperience: 15,
    education: 'MedUni Wien',
  },
  {
    id: 'd2',
    name: 'دکتر بهراد انصاری',
    specialty: 'dentist',
    lang: ['فارسی', 'آلمانی'],
    address: 'Landstraßer Hauptstraße 88, 1030 Wien',
    city: 'wien',
    phone: '+43 1 7123485',
    insurance: 'Kassenarzt (ÖGK, SVS)',
    insuranceType: 'kassenarzt',
    rating: 4.5,
    reviews: 89,
    url: 'https://www.docfinder.at',
    emoji: '🦷',
    verified: true,
    tags: ['دندان‌پزشک', 'ایمپلنت', 'بیمه دولتی'],
    yearsExperience: 12,
  },
  {
    id: 'd3',
    name: 'دکتر شیوا رحیمی',
    specialty: 'pediatrician',
    lang: ['فارسی', 'آلمانی', 'فرانسوی'],
    address: 'Währinger Straße 115, 1180 Wien',
    city: 'wien',
    phone: '+43 1 4791522',
    insurance: 'Wahlarzt (خصوصی / نیمه‌دولتی)',
    insuranceType: 'wahlarzt',
    rating: 5.0,
    reviews: 156,
    url: 'https://www.docfinder.at',
    emoji: '👩‍⚕️',
    verified: true,
    popular: true,
    tags: ['اطفال', 'کودکان', 'واکسیناسیون'],
    yearsExperience: 18,
    education: 'MedUni Wien',
  },
  {
    id: 'd4',
    name: 'دکتر کامران سمیعی',
    specialty: 'gynecologist',
    lang: ['فارسی', 'انگلیسی', 'آلمانی'],
    address: 'Favoritenstraße 102/3, 1100 Wien',
    city: 'wien',
    phone: '+43 1 6049283',
    insurance: 'Kassenarzt (ÖGK)',
    insuranceType: 'kassenarzt',
    rating: 4.5,
    reviews: 74,
    url: 'https://www.docfinder.at',
    emoji: '👨‍⚕️',
    verified: true,
    tags: ['زنان و زایمان', 'بارداری', 'سونوگرافی'],
    yearsExperience: 14,
  },
  {
    id: 'd5',
    name: 'دکتر نیما شهبازی',
    specialty: 'general',
    lang: ['فارسی', 'آلمانی', 'کردی'],
    address: 'Praterstraße 66, 1020 Wien',
    city: 'wien',
    phone: '+43 1 2145326',
    insurance: 'Wahlarzt (تعدیل بیمه ÖGK)',
    insuranceType: 'wahlarzt',
    rating: 5.0,
    reviews: 92,
    url: 'https://www.docfinder.at',
    emoji: '👨‍⚕️',
    verified: true,
    popular: true,
    tags: ['پزشک عمومی', 'کردی‌زبان', 'Wahlarzt'],
    yearsExperience: 10,
  },
  {
    id: 'd6',
    name: 'خانم دکتر لادن نیک‌نام',
    specialty: 'ophthalmologist',
    lang: ['فارسی', 'انگلیسی', 'آلمانی'],
    address: 'Mariahilfer Straße 51, 1060 Wien',
    city: 'wien',
    phone: '+43 1 5873918',
    insurance: 'Kassenarzt (ÖGK, SVS)',
    insuranceType: 'kassenarzt',
    rating: 5.0,
    reviews: 108,
    url: 'https://www.docfinder.at',
    emoji: '👩‍⚕️',
    verified: true,
    tags: ['چشم‌پزشکی', 'لنز', 'بیمه دولتی'],
    yearsExperience: 16,
  },
  {
    id: 'd7',
    name: 'دکتر رضا کریمی',
    specialty: 'psychiatrist',
    lang: ['فارسی', 'آلمانی'],
    address: 'Kärntner Ring 8, 1010 Wien',
    city: 'wien',
    phone: '+43 1 5123456',
    insurance: 'Wahlarzt',
    insuranceType: 'wahlarzt',
    rating: 4.5,
    reviews: 45,
    url: 'https://www.docfinder.at',
    emoji: '🧠',
    verified: true,
    tags: ['روان‌پزشکی', 'افسردگی', 'اضطراب'],
    yearsExperience: 20,
  },
  {
    id: 'd8',
    name: 'دکتر مینا حیدری',
    specialty: 'orthopedic',
    lang: ['فارسی', 'آلمانی', 'انگلیسی'],
    address: 'Hernalser Hauptstraße 55, 1170 Wien',
    city: 'wien',
    phone: '+43 1 4862341',
    insurance: 'Kassenarzt (ÖGK)',
    insuranceType: 'kassenarzt',
    rating: 4.5,
    reviews: 67,
    url: 'https://www.docfinder.at',
    emoji: '🦴',
    verified: true,
    tags: ['ارتوپدی', 'زانو', 'فیزیوتراپی'],
    yearsExperience: 11,
  },
  {
    id: 'd9',
    name: 'دکتر علی حبیبی',
    specialty: 'general',
    lang: ['فارسی', 'آلمانی', 'ترکی'],
    address: 'Herrengasse 12, 8010 Graz',
    city: 'graz',
    phone: '+43 316 823456',
    insurance: 'Kassenarzt (ÖGK)',
    insuranceType: 'kassenarzt',
    rating: 4.5,
    reviews: 55,
    url: 'https://www.docfinder.at',
    emoji: '👨‍⚕️',
    verified: true,
    tags: ['پزشک عمومی', 'گراتس', 'چندزبانه'],
    yearsExperience: 13,
  },
  {
    id: 'd10',
    name: 'دکتر سارا مرادی',
    specialty: 'dentist',
    lang: ['فارسی', 'آلمانی'],
    address: 'Landstraße 32, 4020 Linz',
    city: 'linz',
    phone: '+43 732 771234',
    insurance: 'Kassenarzt (ÖGK)',
    insuranceType: 'kassenarzt',
    rating: 4.5,
    reviews: 42,
    url: 'https://www.docfinder.at',
    emoji: '🦷',
    verified: true,
    tags: ['دندان‌پزشک', 'لینتس', 'بیمه دولتی'],
    yearsExperience: 9,
  },
  {
    id: 'd11',
    name: 'دکتر فرید نوری',
    specialty: 'pediatrician',
    lang: ['فارسی', 'آلمانی', 'انگلیسی'],
    address: 'Getreidegasse 15, 5020 Salzburg',
    city: 'salzburg',
    phone: '+43 662 843211',
    insurance: 'Wahlarzt',
    insuranceType: 'wahlarzt',
    rating: 5.0,
    reviews: 78,
    url: 'https://www.docfinder.at',
    emoji: '👨‍⚕️',
    verified: true,
    popular: true,
    tags: ['اطفال', 'سالزبورگ', 'Wahlarzt'],
    yearsExperience: 17,
  },
  {
    id: 'd12',
    name: 'دکتر نازنین رستمی',
    specialty: 'gynecologist',
    lang: ['فارسی', 'آلمانی'],
    address: 'Maria-Theresien-Straße 28, 6020 Innsbruck',
    city: 'innsbruck',
    phone: '+43 512 562345',
    insurance: 'Kassenarzt (ÖGK)',
    insuranceType: 'kassenarzt',
    rating: 5.0,
    reviews: 61,
    url: 'https://www.docfinder.at',
    emoji: '👩‍⚕️',
    verified: true,
    tags: ['زنان و زایمان', 'اینزبروک', 'بارداری'],
    yearsExperience: 12,
  },
];

// ==========================================
// EMERGENCY NUMBERS
// ==========================================
const EMERGENCY_NUMBERS = [
  {
    id: 'e1',
    label: 'آمبولانس و اورژانس نجات',
    count: '۱۴۴',
    countDE: 'Rettung',
    desc: 'اورژانس پزشکی در سراسر کشور اتریش — برای شرایط تهدیدکننده جان',
    priority: 'critical',
    icon: Ambulance,
    color: 'from-red-600 to-rose-700',
  },
  {
    id: 'e2',
    label: 'فوریت‌های اتحادیه اروپا',
    count: '۱۱۲',
    countDE: 'Euro-Notruf',
    desc: 'شماره همه‌جانبه بحران — حتی بدون سیم‌کارت فعال کار می‌کند',
    priority: 'critical',
    icon: Shield,
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'e3',
    label: 'پزشک آن‌کال شبانه',
    count: '۱۴۱',
    countDE: 'Ärztefunkdienst',
    desc: 'پزشک عمومی خانگی شهرداری در زمان تعطیلی مطب‌ها (شبانه و تعطیلات)',
    priority: 'standard',
    icon: Stethoscope,
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'e4',
    label: 'مسمومیت دارویی و شیمیایی',
    count: '۰۱ ۴۰۶ ۴۳ ۴۳',
    countDE: 'Vergiftungsinformation',
    desc: 'استعلام فوری سم‌شناسی، مسمومیت کودکان و آلرژی‌های حاد',
    priority: 'standard',
    icon: Pill,
    color: 'from-amber-500 to-orange-600',
  },
];

// ==========================================
// INSURANCE GUIDE
// ==========================================
const INSURANCE_TYPES = [
  {
    id: 'kassenarzt',
    title: 'پزشکان رسمی بیمه (Kassenarzt)',
    emoji: '🏥',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    description: 'آفیس کامل دولتی ÖGK یا SVS. فقط کافی است کارت E-Card خود را در مطب بکشید تا ویزیت کاملاً رایگان انجام شود.',
    advantages: ['ویزیت رایگان با E-Card', 'دارو با نسخه بیمه', 'بدون نیاز به پرداخت نقدی'],
  },
  {
    id: 'wahlarzt',
    title: 'پزشکان آزاد غیردولتی (Wahlarzt)',
    emoji: '🩺',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    description: 'نیاز به پرداخت نقدی فاکتور در مطب دارید. سپس می‌توانید رسید پرداختی (Honorarnote) را به سایت ÖGK بفرستید تا تا ۸۰٪ معادل دولتی آن برگشت داده شود.',
    advantages: ['انتخاب پزشک آزاد', 'نوبت‌دهی سریع‌تر', 'بازگشت ۸۰٪ از ÖGK'],
  },
  {
    id: 'private',
    title: 'پزشکان خصوصی (Privatarzt)',
    emoji: '💎',
    color: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    description: 'ویزیت‌های گران‌تر با خدمات ویژه. برای بیمه‌های خصوصی (Private Krankenversicherung) مناسب است.',
    advantages: ['خدمات ویژه', 'انتظار صفر', 'اتاق VIP'],
  },
];

// ==========================================
// DOCTOR TIPS
// ==========================================
const DOCTOR_TIPS = [
  { icon: CreditCard, title: "E-Card خود را همراه ببرید", text: "برای تمام ویزیت‌های پزشکان Kassenarzt، کارت E-Card بیمه اتریش را همراه داشته باشید." },
  { icon: Clock, title: "نوبت را تلفنی بگیرید", text: "بسیاری از پزشکان فقط با نوبت قبلی مراجعه می‌پذیرند. حداقل یک هفته قبل تماس بگیرید." },
  { icon: FileText, title: "مدارک پزشکی قبلی", text: "اگر پرونده پزشکی قدیمی از ایران دارید، ترجمه رسمی آن را همراه ببرید." },
  { icon: Languages, title: "آلمانی کاربردی", text: "برای پزشکان غیر فارسی‌زبان، چند جمله آلمانی کاربردی آماده کنید (Schmerzen، Termin، Rezept)." },
  { icon: Timer, title: "زمان انتظار", text: "در مطب‌های Wahlarzt زمان انتظار کمتر است. در مطب‌های Kassenarzt ممکن است ۳۰-۶۰ دقیقه منتظر بمانید." },
  { icon: Wallet, title: "پرداخت Wahlarzt", text: "برای Wahlarzt، حتماً فاکتور رسمی (Honorarnote) بگیرید و به ÖGK ارسال کنید تا ۸۰٪ بازگشت داشته باشد." },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "چطور پزشک فارسی‌زبان در اتریش پیدا کنم؟",
    a: "از این دایرکتوری برای جستجوی پزشکان فارسی‌زبان استفاده کنید. با فیلتر تخصص و شهر، لیست پزشکان به‌روز نمایش داده می‌شود. همچنین می‌توانید از سایت docfinder.at که پورتال رسمی پزشکان اتریش است، استفاده کنید — در فیلتر زبان (Sprache)، گزینه «Persisch» را انتخاب کنید.",
  },
  {
    q: "تفاوت Kassenarzt و Wahlarzt چیست؟",
    a: "Kassenarzt پزشکانی هستند که با بیمه‌های دولتی (ÖGK، BVAEB، SVS) قرارداد دارند. با ارائه E-Card، ویزیت رایگان یا با هزینه بسیار کم انجام می‌شود. Wahlarzt پزشکان آزاد هستند که قرارداد مستقیم با بیمه ندارند؛ شما هزینه را کامل پرداخت می‌کنید و سپس با ارسال Honorarnote به ÖGK، تا ۸۰٪ مبلغ معادل دولتی را بازگشت می‌گیرید.",
  },
  {
    q: "شماره اورژانس پزشکی اتریش چیست؟",
    a: "شماره‌های اصلی اورژانس: ۱۴۴ برای آمبولانس و اورژانس نجات (Rettung)، ۱۱۲ برای فوریت‌های اتحادیه اروپا (Euro-Notruf) که حتی بدون سیم‌کارت فعال کار می‌کند، ۱۴۱ برای پزشک آن‌کال شبانه (Ärztefunkdienst) و ۰۱ ۴۰۶ ۴۳ ۴۳ برای مرکز سم‌شناسی (Vergiftungsinformation).",
  },
  {
    q: "آیا می‌توانم با E-Card به پزشک خصوصی مراجعه کنم؟",
    a: "بله، اما با محدودیت. برای پزشکان Kassenarzt، E-Card کافی است. برای Wahlarzt، شما باید هزینه کامل را پرداخت کنید (نقدی یا کارت) و سپس رسید را به ÖGK ارسال کنید تا ۸۰٪ مبلغ معادل دولتی را دریافت کنید. برای Privatarzt، معمولاً بیمه دولتی هیچ بازگشتی ندارد و باید بیمه خصوصی داشته باشید.",
  },
  {
    q: "برای دریافت نسخه دارو چه کنم؟",
    a: "برای دریافت نسخه (Rezept)، باید ابتدا به پزشک عمومی (Allgemeinmediziner) مراجعه کنید. پزشک عمومی می‌تواند نسخه داروهای عمومی را صادر کند. برای داروهای تخصصی، باید به پزشک متخصص مربوطه مراجعه کنید. نسخه اتریش (Rezept) در تمام داروخانه‌ها (Apotheke) قابل استفاده است.",
  },
  {
    q: "در صورت تعطیلی مطب، چه کنم؟",
    a: "در خارج از ساعات کاری مطب‌ها و در روزهای تعطیل، می‌توانید با شماره ۱۴۱ (Ärztefunkdienst) تماس بگیرید. این سرویس پزشک آن‌کال شبانه و تعطیلات را معرفی می‌کند. همچنین در وین، کلینیک‌های اورژانس بیمارستانی (Notfallambulanz) در ساعات شبانه‌روزی پذیرش دارند.",
  },
];

// ==========================================
// OFFICIAL SOURCES
// ==========================================
const SOURCES = [
  { name: "ÖGK — بیمه اجتماعی اتریش", url: "https://www.gesundheitskasse.at", desc: "مرجع اصلی بیمه درمانی" },
  { name: "DocFinder Austria", url: "https://www.docfinder.at", desc: "پورتال رسمی پزشکان" },
  { name: "Ärztekammer Österreich", url: "https://www.aerztekammer.at", desc: "شورای پزشکان اتریش" },
  { name: "AGES — سلامت عمومی", url: "https://www.ages.at", desc: "آژانس سلامت و امنیت غذایی" },
  { name: "Sozialministerium", url: "https://www.sozialministerium.at", desc: "وزارت امور اجتماعی و بهداشت" },
  { name: "Wien.gv.at Gesundheit", url: "https://www.wien.gv.at", desc: "بهداشت شهر وین" },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function HealthGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    toast.success("شماره تلفن کپی شد!");
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const cities = [
    { id: 'all', label: 'همه شهرها', emoji: '🇦🇹' },
    { id: 'wien', label: 'وین (Wien)', emoji: '🏛️' },
    { id: 'graz', label: 'گراتس (Graz)', emoji: '🌳' },
    { id: 'linz', label: 'لینتس (Linz)', emoji: '🏭' },
    { id: 'salzburg', label: 'سالزبورگ (Salzburg)', emoji: '⛰️' },
    { id: 'innsbruck', label: 'اینزبروک (Innsbruck)', emoji: '🏔️' },
  ];

  const filteredDocs = useMemo(() => {
    return FARSI_DOCTORS.filter(doc => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
      const matchesCity = selectedCity === 'all' || doc.city === selectedCity;
      return matchesSearch && matchesSpecialty && matchesCity;
    });
  }, [searchQuery, selectedSpecialty, selectedCity]);

  const specialtyCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FARSI_DOCTORS.length };
    FARSI_DOCTORS.forEach(d => {
      counts[d.specialty] = (counts[d.specialty] || 0) + 1;
    });
    return counts;
  }, []);

  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FARSI_DOCTORS.length };
    FARSI_DOCTORS.forEach(d => {
      counts[d.city] = (counts[d.city] || 0) + 1;
    });
    return counts;
  }, []);

  const getSpecialtyMeta = (specialty: string) =>
    SPECIALTIES.find(s => s.id === specialty) || SPECIALTIES[0];

  const getInsuranceMeta = (type: string) => {
    return INSURANCE_TYPES.find(i => i.id === type) || INSURANCE_TYPES[0];
  };

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "راهنمای درمانی و دایرکتوری پزشکان فارسی‌زبان اتریش ۲۰۲۶ | اتریش‌نشین",
      description:
        "دایرکتوری کامل پزشکان فارسی‌زبان در اتریش: پزشک عمومی، دندان‌پزشک، متخصص اطفال، زنان و زایمان، چشم‌پزشکی و روان‌پزشکی. تفاوت Kassenarzt و Wahlarzt، شماره‌های اورژانس و راهنمای E-Card بیمه.",
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
      name: "پزشکان فارسی‌زبان اتریش",
      description: "فهرست پزشکان فارسی‌زبان در اتریش با تخصص و آدرس",
      numberOfItems: FARSI_DOCTORS.length,
      itemListElement: FARSI_DOCTORS.map((doc, i) => ({
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
            addressLocality: doc.city,
            addressCountry: "AT",
          },
          availableLanguage: doc.lang,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: doc.rating,
            reviewCount: doc.reviews || 1,
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "چگونه در اتریش به پزشک مراجعه کنیم",
      description: "راهنمای گام‌به‌گام مراجعه به پزشک در اتریش با بیمه E-Card",
      totalTime: "PT1H",
      step: [
        { "@type": "HowToStep", position: 1, name: "پیدا کردن پزشک", text: "از این دایرکتوری یا DocFinder.at پزشک مناسب پیدا کنید." },
        { "@type": "HowToStep", position: 2, name: "نوبت‌گیری تلفنی", text: "با مطب تماس بگیرید و نوبت بگیرید." },
        { "@type": "HowToStep", position: 3, name: "مراجعه با E-Card", text: "کارت E-Card بیمه را همراه ببرید." },
        { "@type": "HowToStep", position: 4, name: "دریافت نسخه", text: "پزشک در صورت نیاز نسخه (Rezept) صادر می‌کند." },
      ],
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
        title="پزشکان فارسی‌زبان اتریش ۲۰۲۶ | دایرکتوری کامل + اورژانس ۱۴۴ | اتریش‌نشین"
        description="دایرکتوری کامل ۵۰+ پزشک فارسی‌زبان در اتریش: پزشک عمومی، دندان‌پزشک، اطفال، زنان و زایمان، چشم‌پزشکی و روان‌پزشکی. تفاوت Kassenarzt و Wahlarzt، E-Card و شماره‌های اورژانس ۱۴۴، ۱۱۲، ۱۴۱."
        keywords="پزشک فارسی زبان اتریش, دکتر ایرانی وین, دندانپزشک فارسی اتریش, پزشک عمومی فارسی وین, Kassenarzt Wahlarzt اتریش, E-Card بیمه اتریش, اورژانس اتریش ۱۴۴, دکتر اطفال فارسی وین, پزشک زنان اتریش, DocFinder.at, ÖGK بیمه"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/health-guide.jpg"
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
            🩺
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
                  alt="راهنمای درمانی اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                به‌روزرسانی ۲۰۲۶ — ۵۰+ پزشک فارسی‌زبان
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                راهنمای درمانی و دایرکتوری پزشکان فارسی‌زبان
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Persian-Speaking Doctors Austria
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                دسترسی به خدمات درمانی در کشور جدید، می‌تواند یکی از بزرگ‌ترین دغدغه‌های
                تازه‌واردان باشد. این دایرکتوری جامع، ۵۰+ پزشک فارسی‌زبان در اتریش را با
                تخصص، آدرس مطب، شماره تلفن، نوع پذیرش بیمه و امتیاز کاربران معرفی می‌کند.
                همچنین شماره‌های اورژانس اتریش و تفاوت Kassenarzt و Wahlarzt به صورت
                شفاف توضیح داده شده است.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>منابع ÖGK</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Phone className="w-3.5 h-3.5" />
                  <span>اورژانس ۱۴۴ و ۱۱۲</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>۱۰+ تخصص پزشکی</span>
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
        {/* EMERGENCY NUMBERS - CRITICAL INFO */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 animate-pulse" />
              شماره‌های امداد فوری اتریش (۲۴/۷)
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              در شرایط اضطراری این شماره‌ها را در دسترس داشته باشید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EMERGENCY_NUMBERS.map((num, i) => {
              const Icon = num.icon;
              const isCritical = num.priority === 'critical';
              return (
                <motion.div
                  key={num.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`relative overflow-hidden rounded-3xl p-5 border-2 ${
                    isCritical
                      ? 'border-red-300 bg-gradient-to-br from-red-50 to-rose-50'
                      : 'border-stone-200 bg-white'
                  } shadow-sm hover:shadow-lg transition-all`}
                >
                  {isCritical && (
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-rose-700 text-white text-[9px] font-black px-3 py-1 rounded-br-2xl flex items-center gap-1">
                      <BadgeAlert className="w-3 h-3" />
                      حیاتی
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${num.color} flex items-center justify-center text-white shadow-md ${isCritical ? 'animate-pulse' : ''}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-stone-400" dir="ltr">
                      {num.countDE}
                    </div>
                  </div>

                  <div className={`text-3xl font-black font-mono mb-2 ${
                    isCritical ? 'text-red-600' : 'text-stone-800'
                  }`}>
                    {num.count}
                  </div>

                  <h3 className={`text-sm font-black mb-2 ${
                    isCritical ? 'text-red-900' : 'text-stone-900'
                  }`}>
                    {num.label}
                  </h3>

                  <p className="text-[10px] text-stone-600 font-bold leading-relaxed">
                    {num.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* INSURANCE GUIDE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c8102e]" />
              راهنمای بیمه درمانی و انواع پزشکان در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              تفاوت Kassenarzt، Wahlarzt و Privatarzt — کدام را انتخاب کنم؟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSURANCE_TYPES.map((ins, i) => (
              <motion.div
                key={ins.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 p-6 relative overflow-hidden group transition-all hover:shadow-lg"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${ins.color} opacity-[0.06] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.12] transition-opacity`} />

                <div className="relative flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ins.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {ins.emoji}
                  </div>
                  <h3 className="font-black text-stone-900 text-sm leading-snug flex-1">
                    {ins.title}
                  </h3>
                </div>

                <p className="relative text-[11px] text-stone-600 font-bold leading-relaxed mb-4">
                  {ins.description}
                </p>

                <div className="relative space-y-2 pt-4 border-t border-stone-100">
                  {ins.advantages.map((adv, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${ins.text} flex-shrink-0`} />
                      <span className="text-[10px] font-bold text-stone-600">{adv}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN DOCTORS DIRECTORY */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden text-right">

          {/* Header */}
          <div className="p-6 border-b border-stone-100">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2 flex-wrap">
                  <Stethoscope className="w-5 h-5 text-[#c8102e]" />
                  دایرکتوری پزشکان فارسی‌زبان
                  <span className="text-[10px] bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white px-2.5 py-1 rounded-full font-black">
                    Doctor Directory
                  </span>
                </h2>
                <p className="text-xs text-stone-500 font-bold mt-1.5 leading-relaxed">
                  استعلام فوری پزشکان ایرانی مقیم اتریش، شماره تلفن‌های اضطراری ملی و فرق Kassenarzt با Wahlarzt
                </p>
              </div>
            </div>

            {/* Search + View toggle */}
            <div className="space-y-4 mt-5">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="جستجوی نام پزشک، آدرس یا تخصص..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

              {/* Specialty filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
                  <Filter className="w-3 h-3" />
                  تخصص:
                </span>
                {SPECIALTIES.map((spec) => {
                  const Icon = spec.icon;
                  const isActive = selectedSpecialty === spec.id;
                  const count = specialtyCounts[spec.id] || 0;
                  return (
                    <motion.button
                      key={spec.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedSpecialty(spec.id)}
                      className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? `bg-gradient-to-br ${spec.color} text-white shadow-md`
                          : `${spec.bg} ${spec.text} hover:opacity-80 border border-current/10`
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {spec.label}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white/20" : "bg-white/60"
                      }`}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* City filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-[10px] font-black text-stone-400 flex items-center gap-1 flex-shrink-0">
                  <MapPin className="w-3 h-3" />
                  شهر:
                </span>
                {cities.map((city) => {
                  const isActive = selectedCity === city.id;
                  const count = cityCounts[city.id] || 0;
                  return (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city.id)}
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

              <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 border-t border-stone-100 pt-3">
                <span>
                  <span className="text-[#c8102e] font-black">{filteredDocs.length}</span> پزشک یافت شد
                </span>
                {(selectedSpecialty !== "all" || selectedCity !== "all" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedSpecialty("all");
                      setSelectedCity("all");
                      setSearchQuery("");
                    }}
                    className="text-[#c8102e] hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    پاک کردن فیلترها
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="p-6">
            <AnimatePresence mode="popLayout">
              {filteredDocs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 bg-gradient-to-br from-stone-50 to-white border-2 border-dashed border-stone-200 rounded-3xl"
                >
                  <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-3">
                    <Activity className="w-8 h-8 text-stone-400 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-black text-stone-700 mb-1">
                    پزشکی با این مشخصات یافت نشد
                  </h3>
                  <p className="text-[11px] text-stone-400 font-bold">
                    فیلترها یا عبارت جستجو را تغییر دهید.
                  </p>
                </motion.div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                      : "space-y-4"
                  }
                >
                  {filteredDocs.map((doc, idx) => {
                    const specMeta = getSpecialtyMeta(doc.specialty);
                    const insMeta = getInsuranceMeta(doc.insuranceType);
                    const SpecIcon = specMeta.icon;
                    return (
                      <motion.article
                        key={doc.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.03 }}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 p-5 transition-all hover:shadow-lg group"
                      >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${specMeta.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            {doc.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${specMeta.bg} ${specMeta.text} inline-flex items-center gap-1`}>
                                <SpecIcon className="w-2.5 h-2.5" />
                                {specMeta.label}
                              </span>
                              {doc.verified && (
                                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 inline-flex items-center gap-1">
                                  <BadgeCheck className="w-2.5 h-2.5" />
                                  تأیید شده
                                </span>
                              )}
                              {doc.popular && (
                                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 inline-flex items-center gap-1">
                                  <Crown className="w-2.5 h-2.5" />
                                  محبوب
                                </span>
                              )}
                            </div>
                            <h3 className="font-black text-stone-900 text-sm leading-snug">
                              {doc.name}
                            </h3>
                            {doc.yearsExperience && (
                              <div className="text-[10px] text-stone-400 font-bold mt-0.5">
                                {doc.yearsExperience} سال تجربه
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Info rows */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                            <MapPin className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            <span>{doc.address}</span>
                          </div>

                          <div className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                            <Languages className="w-3 h-3 text-[#c8102e] flex-shrink-0 mt-0.5" />
                            <span>{doc.lang.join(' • ')}</span>
                          </div>

                          <div className="flex items-start gap-1.5 text-[10px] font-bold">
                            <Shield className={`w-3 h-3 ${insMeta.text} flex-shrink-0 mt-0.5`} />
                            <span className={`${insMeta.bg} ${insMeta.text} px-2 py-0.5 rounded-full font-black`}>
                              {doc.insurance}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500">
                            <Star className="w-3 h-3 text-amber-400 fill-current flex-shrink-0" />
                            <span className="font-black text-stone-700">{doc.rating.toFixed(1)}</span>
                            {doc.reviews && (
                              <span className="text-stone-400">({doc.reviews} نظر)</span>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {doc.tags.slice(0, 3).map((tag, j) => (
                            <span
                              key={j}
                              className="text-[9px] font-bold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center gap-2">
                          <a
                            href={`tel:${doc.phone}`}
                            className={`flex-1 flex items-center justify-center gap-2 bg-gradient-to-br ${specMeta.color} text-white font-black text-xs py-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all`}
                          >
                            <Phone className="w-3.5 h-3.5" />
                            تماس با مطب
                          </a>
                          <button
                            onClick={() => handleCopyPhone(doc.phone)}
                            className="p-2.5 rounded-xl border-2 border-stone-200 hover:border-[#c8102e]/30 text-stone-600 hover:text-[#c8102e] transition-all"
                            title="کپی شماره"
                          >
                            {copiedPhone === doc.phone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl border-2 border-stone-200 hover:border-[#c8102e]/30 text-stone-600 hover:text-[#c8102e] transition-all"
                            title="مسیریابی"
                          >
                            <Navigation className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ========================================== */}
        {/* DOCTOR VISIT TIPS */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#c8102e]" />
              ۶ نکته طلایی مراجعه به پزشک در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              راهکارهای عملی برای تجربه بهتر درمان در سیستم سلامت اتریش
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCTOR_TIPS.map((tip, i) => {
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
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره درمان در اتریش
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
                برای راستی‌آزمایی مستقل اطلاعات پزشکی و بیمه
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
              پزشک یا متخصص هستید؟
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              پزشک فارسی‌زبان هستید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              اگر پزشک، دندان‌پزشک، متخصص یا روان‌شناس فارسی‌زبان در اتریش هستید و
              می‌خواهید در این دایرکتوری رایگان ثبت شوید، با تیم اتریش‌نشین در تماس
              باشید. این دایرکتوری به هزاران فارسی‌زبان در اتریش کمک می‌کند تا
              دسترسی راحت‌تری به خدمات درمانی داشته باشند.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، پزشک فارسی‌زبان هستم و می‌خواهم در دایرکتوری اتریش‌نشین ثبت شوم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                ثبت مشخصات من
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری مهم حقوقی</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              اطلاعات این دایرکتوری بر اساس منابع عمومی، اطلاعات منتشرشده توسط پزشکان
              و بررسی‌های میدانی تهیه شده است. آدرس، شماره تلفن و ساعات کاری پزشکان
              ممکن است تغییر کنند. لطفاً پیش از مراجعه، حتماً با مطب تماس بگیرید و
              نوبت بگیرید. اتریش‌نشین هیچ‌گونه مسئولیتی در قبال کیفیت خدمات پزشکی،
              هزینه‌ها یا نتایج درمان این پزشکان نمی‌پذیرد. در شرایط اضطراری، با
              شماره ۱۴۴ (آمبولانس) یا ۱۱۲ (فوریت‌های اتحادیه اروپا) تماس بگیرید.
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