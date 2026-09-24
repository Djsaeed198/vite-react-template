import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, Circle, ListTodo, Award, ClipboardCheck, Home,
  Shield, HeartPulse, CreditCard, Briefcase, GraduationCap,
  Car, ShoppingCart, Users, MapPin, FileText, Building2,
  Calendar, Clock, Sparkles, Star, ChevronDown, Info,
  CheckCircle, AlertCircle, TrendingUp, PhoneCall, Send,
  Globe, Landmark, Zap, Target, Key, Wallet, Baby, Coffee,
  Smartphone, Wifi, Train, Bike, Utensils, Landmark as LandmarkIcon,
  Scale, BookOpen, Stethoscope, Sun, Heart, Filter, Trophy,
  BadgeCheck, Percent, CircleDollarSign, Quote, Download,
  Upload, RefreshCw, Trash2, RotateCcw, Grid3x3,
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// IMAGES — Vienna themed
// ==========================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80",
  meldeamt: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80",
  wien: "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=1200&q=80",
};

// ==========================================
// TYPES
// ==========================================
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
  deadline?: string;
  link?: string;
}

// ==========================================
// 50 COMPREHENSIVE CHECKLIST ITEMS
// ==========================================
const INITIAL_CHECKLIST: ChecklistItem[] = [
  // ========== ۱. ثبت‌نام و مدارک هویتی (۸ مورد) ==========
  { id: "c1", title: "ثبت آدرس در Meldeamt (Meldezettel)", description: "ظرف حداکثر ۳ روز کاری پس از ورود به اتریش، آدرس مسکن خود را در Meldeamt محلی ثبت کنید. فرم Meldezettel توسط صاحب‌خانه یا مستأجر اصلی باید امضا شود.", category: "ثبت‌نام", completed: false, priority: "high", deadline: "۳ روز" },
  { id: "c2", title: "دریافت Anmeldebescheinigung", description: "برای اتباع EU/EEA — گواهی ثبت اقامت از MA 35. برای اتباع غیر-EU معمولاً Platzhalter می‌خواهید.", category: "ثبت‌نام", completed: false, priority: "high" },
  { id: "c3", title: "ثبت‌نام در پلیس (Polizei-Anmeldung)", description: "برای اتباع غیر-EU، ثبت‌نام در پلیس اتریش لازم است (Fremdenpolizei).", category: "ثبت‌نام", completed: false, priority: "high" },
  { id: "c4", title: "درخواست RWR Card", description: "کارت اقامت موقت Rot-Weiß-Rot Karte برای کار یا تحصیل. نیازمند تاییدیه AMS یا دانشگاه.", category: "ثبت‌نام", completed: false, priority: "high", deadline: "۹۰ روز پیش از انقضا" },
  { id: "c5", title: "تمدید پاسپورت ایرانی", description: "پاسپورت باید حداقل ۶ ماه اعتبار داشته باشد. برای تمدید به سفارت ایران در وین مراجعه کنید.", category: "ثبت‌نام", completed: false, priority: "high" },
  { id: "c6", title: "دریافت ID Austria", description: "هویت دیجیتال رسمی اتریش برای دسترسی به خدمات دولتی آنلاین. ثبت در FinanzOnline + Handysignatur.", category: "ثبت‌نام", completed: false, priority: "medium" },
  { id: "c7", title: "ثبت‌نام در FinanzOnline", description: "پورتال مالیاتی اتریش. برای اظهارنامه مالیاتی و دریافت Steuernummer.", category: "ثبت‌نام", completed: false, priority: "medium" },
  { id: "c8", title: "ثبت در سیستم بیمه اتریش", description: "پرونده بیمه‌ای با ÖGK/SVS/BVAEB — برای کارمندان به صورت خودکار توسط کارفرما.", category: "ثبت‌نام", completed: false, priority: "high" },

  // ========== ۲. بیمه و سلامت (۶ مورد) ==========
  { id: "c9", title: "دریافت E-Card", description: "کارت بیمه سلامت اتریش. ظرف ۲-۴ هفته پس از ثبت‌نام به آدرس شما ارسال می‌شود.", category: "بیمه و سلامت", completed: false, priority: "high" },
  { id: "c10", title: "ثبت‌نام پزشک خانواده (Hausarzt)", description: "انتخاب یک Hausarzt به عنوان اولین نقطه تماس پزشکی. یافتن پزشکی که بیمار جدید می‌پذیرد سخت است — زودتر اقدام کنید.", category: "بیمه و سلامت", completed: false, priority: "high" },
  { id: "c11", title: "دریافت کارت بیمه تکمیلی", description: "در صورت نیاز، بیمه تکمیلی خصوصی (Zusatzversicherung) برای دندان‌پزشکی، چشم و موارد غیرپوشش ÖGK.", category: "بیمه و سلامت", completed: false, priority: "low" },
  { id: "c12", title: "ثبت‌نام در پزشک متخصص (Facharzt)", description: "برای هر تخصصی (داخلی، زنان، چشم و...) نیازمند ارجاع (Überweisung) از Hausarzt یا ثبت‌نام مستقیم.", category: "بیمه و سلامت", completed: false, priority: "medium" },
  { id: "c13", title: "بیمه درمانی خصوصی", description: "برای اتباع غیر-EU که شاغل نیستند (دانشجو)، بیمه درمانی دانشجویی یا خصوصی الزامی است.", category: "بیمه و سلامت", completed: false, priority: "high" },
  { id: "c14", title: "واکسیناسیون و ثبت در e-Impfpass", description: "ثبت واکسن‌ها در پاسپورت دیجیتال اتریش. برای کودکان و بزرگسالان مهم است.", category: "بیمه و سلامت", completed: false, priority: "medium" },

  // ========== ۳. مسکن (۷ مورد) ==========
  { id: "c15", title: "یافتن مسکن دائمی", description: "جستجو در willhaben.at، immoscout24.at و Der Standard. آماده‌سازی مدارک (Einkommensnachweis، Meldezettel، پاسپورت) ضروری است.", category: "مسکن", completed: false, priority: "high" },
  { id: "c16", title: "امضای قرارداد اجاره (Mietvertrag)", description: "بررسی دقیق شرایط قرارداد — مدت، تخفیف، Betriebskosten. جلسه Schlüsselübergabe برای تحویل کلید.", category: "مسکن", completed: false, priority: "high" },
  { id: "c17", title: "پرداخت Kaution (ودیعه)", description: "معمولاً ۳ ماه اجاره. در برخی موارد می‌توانید از Versicherung جایگزین استفاده کنید.", category: "مسکن", completed: false, priority: "high" },
  { id: "c18", title: "ثبت‌نام در Wiener Wohnen", description: "برای مسکن اجتماعی شهرداری وین (Gemeindewohnung). صف طولانی است اما برای بلندمدت ارزشمند.", category: "مسکن", completed: false, priority: "low" },
  { id: "c19", title: "ثبت کنتور برق و گاز", description: "برای خانه جدید، ثبت نام در Wiener Netze برای برق و گاز. در برخی آدرس‌ها تأسیسات از قبل فعال است.", category: "مسکن", completed: false, priority: "high" },
  { id: "c20", title: "درخواست Wohnbeihilfe", description: "کمک هزینه مسکن شهرداری وین برای خانواده‌های کم‌درآمد. از طریق MA 50 درخواست دهید.", category: "مسکن", completed: false, priority: "medium" },
  { id: "c21", title: "ثبت خانوار در GIS (رادیو و تلویزیون)", description: "برای هر خانه با تلویزیون یا رادیو، پرداخت ماهانه GIS اجباری است — به‌جز معافیت‌های خاص.", category: "مسکن", completed: false, priority: "medium" },

  // ========== ۴. بانک و امور مالی (۶ مورد) ==========
  { id: "c22", title: "افتتاح حساب بانکی اتریشی", description: "Erste Bank، Bank Austria، Raiffeisen یا N26. مدارک: پاسپورت، Meldezettel، اثبات درآمد یا ثبت‌نام دانشگاه.", category: "امور مالی", completed: false, priority: "high" },
  { id: "c23", title: "دریافت Steuernummer (Tax ID)", description: "شماره مالیاتی از Finanzamt. برای کار یا فعالیت آزاد ضروری است.", category: "امور مالی", completed: false, priority: "high" },
  { id: "c24", title: "ثبت‌نام در FinanzOnline", description: "پورتال رسمی برای اظهارنامه مالیاتی (Steuererklärung) و دریافت بازپرداخت‌ها.", category: "امور مالی", completed: false, priority: "medium" },
  { id: "c25", title: "درخواست Familienbeihilfe", description: "کمک‌هزینه خانوادگی ماهانه از دولت اتریش برای والدین دارای فرزند. نیازمند اقامت قانونی و سکونت در اتریش.", category: "امور مالی", completed: false, priority: "high" },
  { id: "c26", title: "درخواست Kinderbetreuungsgeld", description: "کمک‌هزینه مراقبت از کودک برای والدین پس از تولد نوزاد یا فرزندخواندگی.", category: "امور مالی", completed: false, priority: "medium" },
  { id: "c27", title: "درخواست Giropay/Online-Banking", description: "فعال‌سازی سرویس بانکداری آنلاین برای پرداخت‌های روزمره، انتقال وجه و مدیریت حساب.", category: "امور مالی", completed: false, priority: "medium" },

  // ========== ۵. کار و اشتغال (۷ مورد) ==========
  { id: "c28", title: "ثبت‌نام در AMS", description: "Arbeitsmarktservice — سازمان کار اتریش. برای دریافت مشاوره شغلی، کمک هزینه بیکاری و پیشنهادات استخدام.", category: "کار و اشتغال", completed: false, priority: "high" },
  { id: "c29", title: "درخواست Arbeitslosengeld", description: "کمک‌هزینه بیکاری در صورت از دست دادن شغل. نیازمند حداقل ۵۲ هفته سابقه بیمه.", category: "کار و اشتغال", completed: false, priority: "high" },
  { id: "c30", title: "ثبت‌نام در eAMS-Konto", description: "حساب آنلاین AMS برای مشاهده پیشنهادات شغلی و پیگیری پرونده.", category: "کار و اشتغال", completed: false, priority: "medium" },
  { id: "c31", title: "آماده‌سازی Lebenslauf اتریشی", description: "رزومه به سبک اتریشی — با عکس، تاریخ دقیق، سطح زبان و مدارک. ترجمه آلمانی برای مشاغل محلی.", category: "کار و اشتغال", completed: false, priority: "high" },
  { id: "c32", title: "نوستریفیکاسیون مدارک", description: "معادل‌سازی مدارک تحصیلی و حرفه‌ای از طریق ENIC NARIC یا وزارت بهداشت (برای پزشکان).", category: "کار و اشتغال", completed: false, priority: "high" },
  { id: "c33", title: "دریافت Sozialversicherungsnummer", description: "شماره بیمه اجتماعی — توسط کارفرما پس از اولین استخدام صادر می‌شود.", category: "کار و اشتغال", completed: false, priority: "medium" },
  { id: "c34", title: "ثبت‌نام در Wirtschaftskammer", description: "برای خوداشتغال‌ها (Selbständige) و مشاغل آزاد. اجباری برای فعالیت‌های خاص.", category: "کار و اشتغال", completed: false, priority: "medium" },

  // ========== ۶. تحصیل (۵ مورد) ==========
  { id: "c35", title: "ثبت‌نام در دانشگاه/مدرسه", description: "مهلت‌های ثبت‌نام: ۵ سپتامبر (ترم زمستانی) و ۵ فوریه (ترم تابستانی). مدارک ترجمه‌شده الزامی.", category: "تحصیل", completed: false, priority: "high" },
  { id: "c36", title: "درخواست Studierendenbeihilfe", description: "کمک‌هزینه تحصیلی از دانشگاه. نیازمند عملکرد تحصیلی خوب و وضعیت مالی مشخص.", category: "تحصیل", completed: false, priority: "medium" },
  { id: "c37", title: "درخواست ÖH-Beitrag", description: "هزینه عضویت اتحادیه دانشجویان اتریش — حدود ۲۴ یورو در هر ترم. اجباری برای همه دانشجویان.", category: "تحصیل", completed: false, priority: "medium" },
  { id: "c38", title: "ثبت‌نام فرزندان در مدرسه", description: "Schulpflicht برای همه کودکان ۶ تا ۱۵ سال. ثبت‌نام در مدرسه محلی منطقه سکونت.", category: "تحصیل", completed: false, priority: "high" },
  { id: "c39", title: "درخواست Schülerfreifahrt", description: "کارت حمل‌ونقل رایگان یا تخفیف‌دار برای دانش‌آموزان و دانشجویان اتریش.", category: "تحصیل", completed: false, priority: "medium" },

  // ========== ۷. حمل‌ونقل (۵ مورد) ==========
  { id: "c40", title: "خرید کارت Wiener Linien", description: "کارت سالانه (€۳۶۵) یا ماهانه (€۵۱) برای حمل‌ونقل عمومی وین. قابل خرید از اپلیکیشن یا باجه‌ها.", category: "حمل‌ونقل", completed: false, priority: "high" },
  { id: "c41", title: "خرید ÖBB Vorteilscard", description: "کارت تخفیف قطار با ۵۰٪ تخفیف. برای Jugend €۲۱ یا Classic €۷۳.", category: "حمل‌ونقل", completed: false, priority: "medium" },
  { id: "c42", title: "تبدیل گواهینامه رانندگی", description: "گواهینامه ایرانی قابل تبدیل مستقیم نیست — نیازمند آزمون عملی و تئوری. از طریق Fahrschule.", category: "حمل‌ونقل", completed: false, priority: "medium" },
  { id: "c43", title: "ثبت‌نام خودرو (Zulassung)", description: "برای ثبت خودروی وارداتی یا خرید خودروی اتریشی در Zulassungsstelle. نیازمند بیمه و Pickerl.", category: "حمل‌ونقل", completed: false, priority: "medium" },
  { id: "c44", title: "درخواست Parkpickerl", description: "مجوز پارک ساکنان منطقه. از طریق Bezirksamt درخواست دهید (€۱۳۰ سالانه).", category: "حمل‌ونقل", completed: false, priority: "medium" },

  // ========== ۸. زندگی روزمره (۶ مورد) ==========
  { id: "c45", title: "ثبت‌نام شماره موبایل اتریشی", description: "A1، Magenta یا Drei. سیم‌کارت پیش‌پرداخت یا قرارداد. برای ثبت‌نام آنلاین برخی خدمات لازم است.", category: "زندگی روزمره", completed: false, priority: "high" },
  { id: "c46", title: "عضویت در فروشگاه‌های تخفیف‌دار", description: "Hofer (Aldi)، Lidl، Penny برای خرید ارزان. عضویت در Billa Plus/Jö برای تخفیف‌های ویژه.", category: "زندگی روزمره", completed: false, priority: "low" },
  { id: "c47", title: "ثبت‌نام در کتابخانه شهری وین", description: "Bücherei Wien — عضویت رایگان برای ساکنان. کتاب‌ها، DVD، آموزش زبان و رویدادهای فرهنگی.", category: "زندگی روزمره", completed: false, priority: "low" },
  { id: "c48", title: "عضویت در باشگاه ورزشی (Fitinn)", description: "باشگاه‌های ارزان مانند Fitinn (€۱۵-۳۰ ماهانه). ثبت‌نام آنلاین با پرداخت ماهانه.", category: "زندگی روزمره", completed: false, priority: "low" },
  { id: "c49", title: "ثبت‌نام در سامانه Mahü (دولت دیجیتال)", description: "دسترسی به خدمات آنلاین شهرداری وین: ثبت آدرس، درخواست اسناد، پرداخت قبوض.", category: "زندگی روزمره", completed: false, priority: "medium" },
  { id: "c50", title: "پیوستن به انجمن‌های ایرانی/فارسی‌زبان", description: "کانال‌های تلگرام، گروه‌های فیسبوک و انجمن‌های محلی برای هموطنان. راهنمایی سریع و شبکه اجتماعی.", category: "زندگی روزمره", completed: false, priority: "medium" },
];

// ==========================================
// CATEGORIES META
// ==========================================
const CATEGORIES = [
  { name: "ثبت‌نام", icon: FileText, color: "from-[#c8102e] to-[#970d22]", text: "text-[#c8102e]" },
  { name: "بیمه و سلامت", icon: HeartPulse, color: "from-rose-500 to-red-600", text: "text-rose-600" },
  { name: "مسکن", icon: Home, color: "from-amber-500 to-orange-600", text: "text-amber-600" },
  { name: "امور مالی", icon: Wallet, color: "from-emerald-500 to-teal-600", text: "text-emerald-600" },
  { name: "کار و اشتغال", icon: Briefcase, color: "from-indigo-500 to-blue-600", text: "text-indigo-600" },
  { name: "تحصیل", icon: GraduationCap, color: "from-violet-500 to-purple-600", text: "text-violet-600" },
  { name: "حمل‌ونقل", icon: Train, color: "from-sky-500 to-cyan-600", text: "text-sky-600" },
  { name: "زندگی روزمره", icon: Coffee, color: "from-stone-500 to-stone-700", text: "text-stone-700" },
];

// ==========================================
// 5 PHASE PROCESS (enhanced)
// ==========================================
const AUSTRIAN_STEPS = [
  { num: 1, title: "Antragstellung (ثبت درخواست)", desc: "سابمیت حضوری کل پرونده به سفارت اتریش در تهران (BLS) یا اداره مهاجرت در اتریش.", icon: FileText, gradient: "from-[#c8102e] to-[#970d22]" },
  { num: 2, title: "بررسی معیارهای امتیازدهی AMS", desc: "تاییدیه صلاحیت کار تخصصی و واجد شرایط بودن توسط اداره کار اتریش (Arbeitsmarktservice).", icon: Award, gradient: "from-amber-500 to-orange-600" },
  { num: 3, title: "Meldezettel (ثبت آدرس)", desc: "ورود به اتریش و ثبت الزامی آدرس مسکن در Meldeamt شهرداری اتریش ظرف حداکثر ۳ روز.", icon: Home, gradient: "from-emerald-500 to-teal-600" },
  { num: 4, title: "بیمه‌نامه با کارت سبز E-Card", desc: "عضویت رسمی در بیمه سلامت اتریش (ÖGK/SVS) و دریافت تاییدیه کارت درمانی.", icon: HeartPulse, gradient: "from-sky-500 to-blue-600" },
  { num: 5, title: "تحویل کارت فیزیکی (Abholung)", desc: "مراجعه حضوری به اداره مهاجرت MA 35 وین یا شهرداری استان برای دریافت کارت فیزیکی اقامت RWR.", icon: BadgeCheck, gradient: "from-violet-500 to-purple-600" },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  { q: "Meldezettel چیست و چرا ۳ روز مهلت دارد؟", a: "Meldezettel فرم ثبت آدرس مسکن است که در اتریش اجباری است. طبق قانون Meldegesetz، هر فرد باید ظرف ۳ روز کاری پس از ورود به مسکن جدید، آدرس خود را در Meldeamt محلی ثبت کند. عدم ثبت به موقع ممکن است منجر به جریمه تا €۲۱۸ شود. فرم توسط صاحب‌خانه یا مستأجر اصلی امضا می‌شود." },
  { q: "RWR Card چیست و چقدر طول می‌کشد؟", a: "RWR Card (Rot-Weiß-Rot Karte) کارت اقامت موقت برای کارمندان ماهر، دانشجویان و کارآفرینان غیر-EU است. پروسه درخواست معمولاً ۸ تا ۱۲ هفته از زمان سابمیت کامل طول می‌کشد. تاییدیه AMS (نقطه‌شماری) بخش مهمی از پروسه است." },
  { q: "برای دریافت Familienbeihilfe چه شرایطی لازم است؟", a: "برای دریافت کمک‌هزینه خانوادگی ماهانه (€۱۳۰-€۲۰۰ برای هر فرزند)، باید اقامت قانونی و سکونت در اتریش داشته باشید. برای اتباع غیر-EU معمولاً نیاز به RWR Card یا وضعیت پناهندگی است. از طریق Finanzamt درخواست دهید." },
  { q: "آیا باید حتماً Hausarzt داشته باشم؟", a: "داشتن Hausarzt (پزشک خانواده) در اتریش توصیه می‌شود اما اجباری نیست. Hausarzt اولین نقطه تماس برای اکثر مشکلات است و شما را به متخصصین ارجاع می‌دهد. بدون Hausarzt می‌توانید مستقیم به متخصص مراجعه کنید اما پرداخت هزینه‌ها ممکن است بیشتر باشد و لیست انتظار طولانی‌تر." },
  { q: "چگونه در اتریش حساب بانکی باز کنم؟", a: "برای افتتاح حساب بانکی در اتریش نیاز به: پاسپورت معتبر، Meldezettel (ثبت آدرس) و معمولاً اثبات درآمد (کارمندی) یا ثبت‌نام دانشگاه (دانشجو). بانک‌های اصلی: Erste Bank، Bank Austria، Raiffeisen، BAWAG P.S.K. روند معمولاً ۱ تا ۲ روز کاری طول می‌کشد. N26 و Revolut نیز گزینه‌های آنلاین هستند." },
  { q: "آیا گواهینامه ایرانی در اتریش قابل استفاده است؟", a: "خیر. گواهینامه ایرانی در اتریش معتبر نیست و قابل تبدیل مستقیم به گواهینامه اتریشی نیست. برای دریافت گواهینامه اتریشی باید از طریق Fahrschule در آزمون تئوری و عملی شرکت کنید. در برخی موارد، گواهی‌نامه بین‌المللی برای مدت کوتاه (۶ ماه) قابل استفاده است اما توصیه نمی‌شود." },
  { q: "ID Austria چیست و چرا لازم است؟", a: "ID Austria هویت دیجیتال رسمی اتریش است که جایگزین Handysignatur شده. با ID Austria می‌توانید به خدمات دولتی آنلاین (FinanzOnline، بیمه، درخواست‌های اداری) دسترسی داشته باشید. ثبت‌نام در FinanzOnline یا Bezirksamt به صورت حضوری انجام می‌شود." },
  { q: "آیا می‌توانم همزمان با تحصیل کار کنم؟", a: "بله، دانشجویان غیر-EU با RWR Card معمولاً اجازه کار ۲۰ ساعت در هفته دارند. برای دانشجویان EU محدودیتی نیست. در هر صورت، درآمد بالای €۱۲,۰۰۰ در سال ممکن است بر مالیات و کمک‌هزینه‌ها تأثیر بگذارد." },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ResidenceTracker() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [phase, setPhase] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("همه");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  useEffect(() => {
    const key = `checklist_AT_v2`;
    const phaseKey = `phase_AT_v2`;
    const savedCheck = localStorage.getItem(key);
    const savedPhase = localStorage.getItem(phaseKey);
    if (savedCheck) {
      try {
        const parsed = JSON.parse(savedCheck);
        if (Array.isArray(parsed) && parsed.length === INITIAL_CHECKLIST.length) {
          setChecklist(parsed);
        } else {
          setChecklist(INITIAL_CHECKLIST);
        }
      } catch {
        setChecklist(INITIAL_CHECKLIST);
      }
    } else {
      setChecklist(INITIAL_CHECKLIST);
    }
    setPhase(savedPhase ? parseInt(savedPhase) : 1);
  }, []);

  const handleToggleCheck = (id: string) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setChecklist(updated);
    localStorage.setItem(`checklist_AT_v2`, JSON.stringify(updated));
  };

  const handleSetPhase = (p: number) => {
    setPhase(p);
    localStorage.setItem(`phase_AT_v2`, p.toString());
  };

  const handleResetChecklist = () => {
    if (window.confirm("آیا مطمئن هستید که می‌خواهید تمام چک‌لیست را پاک کنید؟")) {
      setChecklist(INITIAL_CHECKLIST);
      localStorage.setItem(`checklist_AT_v2`, JSON.stringify(INITIAL_CHECKLIST));
      toast.success("چک‌لیست بازنشانی شد");
    }
  };

  const handleExport = () => {
    const data = JSON.stringify({ checklist, phase }, null, 2);
    navigator.clipboard.writeText(data);
    toast.success("داده‌ها کپی شدند!");
  };

  const completedCount = checklist.filter((i) => i.completed).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  const filteredChecklist = useMemo(() => {
    return checklist.filter((item) => {
      if (activeCategory !== "همه" && item.category !== activeCategory) return false;
      if (priorityFilter && item.priority !== priorityFilter) return false;
      if (showOnlyIncomplete && item.completed) return false;
      return true;
    });
  }, [checklist, activeCategory, priorityFilter, showOnlyIncomplete]);

  const categoryProgress = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const items = checklist.filter((i) => i.category === cat.name);
      const completed = items.filter((i) => i.completed).length;
      return { ...cat, total: items.length, completed, percent: items.length > 0 ? Math.round((completed / items.length) * 100) : 0 };
    });
  }, [checklist]);

  // ==========================================
  // SEO SCHEMA
  // ==========================================
  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای اقامت و ۱۰۰ روز اول در اتریش",
      description:
        "چک‌لیست جامع ۵۰ مرحله‌ای اقامت در اتریش — از ثبت Meldezettel تا دریافت Familienbeihilfe و تمدید RWR Card.",
      inLanguage: "fa-IR",
      step: AUSTRIAN_STEPS.map((s) => ({
        "@type": "HowToStep",
        position: s.num,
        name: s.title,
        text: s.desc,
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
      "@type": "WebApplication",
      name: "چک‌لیست اقامت اتریش",
      description: "ابزار تعاملی رایگان برای پیگیری مراحل اقامت و ۱۰۰ روز اول در اتریش.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      inLanguage: "fa-IR",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    },
  ];

  return (
    <>
      <SEO
        title="چک‌لیست اقامت اتریش ۲۰۲۶ | ۵۰ گام حیاتی ۱۰۰ روز اول"
        description="چک‌لیست تعاملی اقامت در اتریش: Meldezettel، RWR Card، بیمه ÖGK، Familienbeihilfe و ۵۰ گام حیاتی ۱۰۰ روز اول. راهنمای فارسی‌زبانان مقیم اتریش."
        keywords="چک‌لیست اقامت اتریش, RWR Card, Meldezettel, ۱۰۰ روز اول اتریش, اقامت وین, Familienbeihilfe, بیمه ÖGK, مهاجرت به اتریش, اقامت ایرانیان اتریش"
        schemaData={seoSchema}
      />

      <div className="space-y-8 font-sans" dir="rtl" id="residence-tracker">

        {/* ========================================== */}
        {/* HERO WITH IMAGE */}
        {/* ========================================== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl text-white"
          style={{
            background:
              "radial-gradient(80% 150% at 90% 0, #9e142d 0, #38100e 48%, #1e1512 100%)",
          }}
        >
          <div className="absolute inset-0 opacity-25">
            <img
              src={IMAGES.hero}
              alt="وین اتریش"
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#1e1512]/90 via-[#38100e]/75 to-[#9e142d]/60" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.05] pointer-events-none select-none">
            🇦🇹
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              پرونده‌ی هوشمند اقامت اتریش — ۲۰۲۶
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 max-w-4xl">
              ۵۰ گام حیاتی برای اقامت قانونی و بی‌دغدغه در اتریش
            </h1>

            <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl mb-6">
              از لحظه ورود به اتریش تا دریافت کارت RWR و تثبیت کامل زندگی — این چک‌لیست
              تعاملی <strong className="text-amber-300">۵۰ گام ضروری</strong> را در ۸ دسته
              سازمان‌دهی کرده است. <strong className="text-amber-300">پیشرفت خود را ذخیره کنید</strong> و
              هرگز گامی حیاتی را فراموش نکنید.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>۵۰ گام تخصصی</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>ذخیره خودکار</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-100">
                <Heart className="w-3.5 h-3.5 text-emerald-400" />
                <span>کاملاً رایگان</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-2xl">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-amber-300 mb-1" />
                <div className="text-[9px] font-black text-rose-100/70">پیشرفت شما</div>
                <div className="text-xl font-black font-mono" dir="ltr">{progressPercent}%</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 mb-1" />
                <div className="text-[9px] font-black text-rose-100/70">انجام‌شده</div>
                <div className="text-xl font-black font-mono" dir="ltr">{completedCount}/{checklist.length}</div>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-3 backdrop-blur-sm">
                <Target className="w-4 h-4 text-sky-300 mb-1" />
                <div className="text-[9px] font-black text-rose-100/70">گام فعلی</div>
                <div className="text-xl font-black font-mono" dir="ltr">{phase}/5</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ========================================== */}
        {/* PROGRESS SUMMARY */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-md">
                <ListTodo className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-stone-900 text-sm">
                  پیشرفت کلی پرونده اقامت
                </h3>
                <p className="text-[10px] text-stone-500 font-bold">
                  {completedCount} از {checklist.length} کار انجام شده
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-[10px] font-black transition-all"
                title="خروجی JSON"
              >
                <Download className="w-3.5 h-3.5" />
                خروجی
              </button>
              <button
                onClick={handleResetChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-[10px] font-black transition-all"
                title="بازنشانی"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                بازنشانی
              </button>
            </div>
          </div>

          <div className="w-full bg-stone-100 rounded-full h-3 relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-[#c8102e] to-[#970d22]"
            />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white mix-blend-difference font-mono">
              {progressPercent}%
            </span>
          </div>

          {/* Category progress chips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {categoryProgress.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className={`bg-stone-50 border border-stone-100 rounded-xl p-2.5 flex items-center gap-2`}
                >
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-black text-stone-700 truncate">
                      {cat.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${cat.color}`}
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-black text-stone-500 font-mono">
                        {cat.completed}/{cat.total}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* MAIN GRID */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* ========================================== */}
          {/* 5 PHASE PROCESS WITH IMAGE */}
          {/* ========================================== */}
          <div className="space-y-4">
            {/* Image card */}
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={IMAGES.wien}
                  alt="وین، اتریش"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#38100e]/90 via-[#9e142d]/50 to-transparent" />
                <div className="absolute bottom-3 right-3 left-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-black text-stone-800 shadow-md mb-2">
                    <MapPin className="w-3 h-3 text-[#c8102e]" />
                    ۵ گام رسمی RWR Card
                  </div>
                  <h3 className="text-base font-black text-white leading-tight">
                    مسیر اخذ کارت اقامت
                  </h3>
                </div>
              </div>
            </div>

            {/* Progress bar for phases */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-bold text-stone-500 px-1">
                <span>شروع درخواست</span>
                <span>دریافت کارت</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 flex overflow-hidden gap-0.5">
                {AUSTRIAN_STEPS.map((s) => (
                  <div
                    key={s.num}
                    className={`h-full transition-all duration-300 flex-1 ${
                      s.num <= phase ? "bg-gradient-to-r from-[#c8102e] to-[#970d22]" : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-rose-100 text-[#c8102e]">
                گام {phase} از ۵
              </span>
              <span className="text-xs font-extrabold text-stone-700">
                مراحل اخذ کارت اقامت RWR
              </span>
            </div>

            <div className="space-y-3 relative pr-4">
              <div className="absolute right-7 top-4 bottom-4 w-0.5 bg-stone-100 -z-10" />
              {AUSTRIAN_STEPS.map((step) => {
                const isCompleted = step.num < phase;
                const isActive = step.num === phase;
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    whileHover={{ x: -4 }}
                    onClick={() => handleSetPhase(step.num)}
                    className={`flex gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                      isActive
                        ? "bg-rose-50/40 border-[#c8102e]/30 shadow-md"
                        : isCompleted
                        ? "bg-stone-50 border-stone-100 opacity-80"
                        : "bg-white border-transparent hover:bg-stone-50 hover:border-stone-200"
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${step.gradient} text-white shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-right flex-1">
                      <h4 className={`text-xs font-black mb-0.5 ${isActive ? "text-[#c8102e]" : "text-stone-800"}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 leading-relaxed font-bold">{step.desc}</p>
                    </div>
                    <button
                      type="button"
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border-2 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-600 text-white"
                          : isActive
                          ? "bg-[#c8102e] border-[#970d22] text-white"
                          : "bg-white border-stone-200 text-stone-500"
                      } text-[10px] font-black`}
                    >
                      {isCompleted ? "✓" : step.num}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ========================================== */}
          {/* 50-ITEM CHECKLIST WITH FILTERS */}
          {/* ========================================== */}
          <div className="flex flex-col">
            {/* Filter bar */}
            <div className="bg-white rounded-3xl border border-stone-200 p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-[#c8102e]" />
                <span className="text-[11px] font-black text-stone-700">فیلتر پیشرفته</span>
              </div>

              {/* Category chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide mb-2" dir="rtl">
                <button
                  onClick={() => setActiveCategory("همه")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all ${
                    activeCategory === "همه"
                      ? "bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Grid3x3 className="w-3 h-3" />
                  همه ({checklist.length})
                </button>
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const count = checklist.filter((i) => i.category === cat.name).length;
                  const isActive = activeCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${cat.color} text-white shadow-md`
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Priority + Incomplete filter */}
              <div className="flex gap-2 flex-wrap">
                {[
                  { key: null, label: "همه اولویت‌ها", icon: ListTodo },
                  { key: "high", label: "فوری", icon: AlertCircle },
                  { key: "medium", label: "متوسط", icon: Clock },
                  { key: "low", label: "پایین", icon: Coffee },
                ].map((p) => {
                  const Icon = p.icon;
                  const isActive = priorityFilter === p.key;
                  return (
                    <button
                      key={String(p.key)}
                      onClick={() => setPriorityFilter(p.key)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black transition-all ${
                        isActive
                          ? "bg-gradient-to-br from-stone-700 to-stone-900 text-white shadow-md"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {p.label}
                    </button>
                  );
                })}

                <button
                  onClick={() => setShowOnlyIncomplete(!showOnlyIncomplete)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-black transition-all ml-auto ${
                    showOnlyIncomplete
                      ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-200"
                  }`}
                >
                  <Circle className="w-3 h-3" />
                  فقط انجام‌نشده‌ها
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="bg-white rounded-3xl border border-stone-200 p-4 flex-1">
              <div className="border-b border-stone-100 pb-3 mb-3 flex items-center justify-between">
                <span className="text-[10px] text-stone-500 font-bold">
                  {filteredChecklist.length} مورد نمایش داده شده
                </span>
                <span className="text-xs font-extrabold text-stone-700 flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-[#c8102e]" />
                  چک‌لیست ۵۰ گام
                </span>
              </div>

              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {filteredChecklist.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <AlertCircle className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                      <p className="text-[11px] text-stone-500 font-bold">
                        موردی با این فیلتر یافت نشد
                      </p>
                    </motion.div>
                  ) : (
                    filteredChecklist.map((item, idx) => {
                      const catMeta = CATEGORIES.find((c) => c.name === item.category);
                      const Icon = catMeta?.icon || FileText;
                      const priorityColors = {
                        high: "bg-rose-100 text-rose-700 border-rose-200",
                        medium: "bg-amber-100 text-amber-700 border-amber-200",
                        low: "bg-stone-100 text-stone-600 border-stone-200",
                      };
                      const priorityLabels = { high: "فوری", medium: "متوسط", low: "پایین" };

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.01 }}
                          onClick={() => handleToggleCheck(item.id)}
                          className={`flex items-start gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer group ${
                            item.completed
                              ? "bg-emerald-50/40 border-emerald-100"
                              : "bg-white border-stone-150 hover:bg-stone-50/50 hover:border-[#c8102e]/30"
                          }`}
                        >
                          <div className="shrink-0 mt-0.5">
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-stone-300 group-hover:text-[#c8102e]" />
                            )}
                          </div>

                          <div className="flex-1 text-right min-w-0">
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded ${
                                catMeta ? `bg-gradient-to-br ${catMeta.color} text-white` : "bg-stone-100 text-stone-600"
                              }`}>
                                <Icon className="w-2.5 h-2.5" />
                                {item.category}
                              </span>
                              {item.priority && (
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${priorityColors[item.priority]}`}>
                                  {priorityLabels[item.priority]}
                                </span>
                              )}
                              {item.deadline && (
                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {item.deadline}
                                </span>
                              )}
                            </div>
                            <h4 className={`text-xs font-black leading-snug mb-0.5 ${
                              item.completed ? "text-stone-400 line-through" : "text-stone-900"
                            }`}>
                              {item.title}
                            </h4>
                            <p className={`text-[10px] leading-relaxed font-bold ${
                              item.completed ? "text-stone-400" : "text-stone-500"
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* 3-IMAGE GALLERY */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#c8102e]" />
              سه تصویر، سه لحظه از مسیر اقامت شما در اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              از اولین روز ثبت آدرس تا لحظه دریافت کارت اقامت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                img: IMAGES.meldeamt,
                title: "Meldezettel",
                subtitle: "اولین گام رسمی",
                desc: "ثبت آدرس در Meldeamt ظرف ۳ روز اول، پایه تمام مراحل بعدی زندگی قانونی شماست.",
                icon: FileText,
                gradient: "from-[#c8102e] to-[#970d22]",
                stat: "۳ روز",
              },
              {
                img: IMAGES.wien,
                title: "RWR Card",
                subtitle: "کارت اقامت",
                desc: "کارت RWR، مجوز قانونی اقامت و کار شما در اتریش است — از MA 35 درخواست می‌شود.",
                icon: BadgeCheck,
                gradient: "from-amber-500 to-orange-600",
                stat: "۵ گام",
              },
              {
                img: IMAGES.hero,
                title: "زندگی تثبیت‌شده",
                subtitle: "بعد از ۱۰۰ روز",
                desc: "با تکمیل چک‌لیست ۵۰ گانه، زندگی، بیمه، مسکن و امور مالی شما در اتریش قانونی و پایدار می‌شود.",
                icon: Home,
                gradient: "from-emerald-500 to-teal-600",
                stat: "۱۰۰ روز",
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
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول درباره اقامت اتریش
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
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-8 md:p-12 text-white text-center"
        >
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#c8102e]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Key className="w-3.5 h-3.5 text-amber-300" />
              مشاوره تخصصی اقامت اتریش
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در یکی از گام‌ها گیر کرده‌اید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با تجربه زیسته در اتریش، می‌تواند در هر یک از ۵۰ گام
              اقامت شما را راهنمایی کند. از Meldezettel تا تمدید RWR Card.
              همین حالا پیام دهید.
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

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-6 text-[10px] font-bold text-stone-400 flex-wrap">
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
              اطلاعات این چک‌لیست بر اساس آخرین قوانین مهاجرتی اتریش در سال ۲۰۲۶ تهیه
              شده است. قوانین و رویه‌های اداری ممکن است توسط مقامات اتریشی تغییر کنند.
              برای تصمیم‌های نهایی، همیشه با مراجع رسمی مانند MA 35 وین، AMS و
              Finanzamt مشورت کنید. پیشرفت چک‌لیست شما به صورت محلی در مرورگر ذخیره
              می‌شود و به هیچ سروری ارسال نمی‌شود.
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
          <span className="font-black text-xs text-stone-900 leading-snug text-right">
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