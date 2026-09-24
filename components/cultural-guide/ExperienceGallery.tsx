import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, MessageSquare, Tag, Clock, BookOpen, Sparkles, CheckCircle,
  ShieldCheck, Zap, Users, Star, TrendingUp, Award, Globe, Rocket,
  Handshake, ChevronDown, ChevronLeft, MapPin, Info, AlertTriangle,
  Quote, Target, Search, X, Filter, LayoutGrid, Eye, Bookmark,
  Share2, Copy, Check, User, Calendar, ArrowUpRight, Crown, Trophy,
  Flame, Sun, Moon, Coffee, GraduationCap, Briefcase, Home, Plane,
  Flag, Landmark, Smile, ThumbsUp, TrendingUp as TrendingUpIcon,
  Send, MessageCircle
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO & IMAGES
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";
const HERO_IMAGE = "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1600&q=80";
const COMMUNITY_IMAGE = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80";

// ==========================================
// CATEGORIES
// ==========================================
const CATEGORIES = [
  {
    id: "مهاجرت موفق",
    label: "مهاجرت موفق",
    shortLabel: "مهاجرت",
    englishName: "Successful Migration",
    icon: Rocket,
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    emoji: "🚀",
    description: "داستان‌های موفقیت در مسیر ویزا، کار و اقامت",
  },
  {
    id: "فرهنگ و لایف‌استایل",
    label: "فرهنگ و لایف‌استایل",
    shortLabel: "فرهنگ",
    englishName: "Culture & Lifestyle",
    icon: Coffee,
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-700",
    emoji: "☕",
    description: "تجربه‌های زندگی روزمره، فرهنگ و تفریح در اتریش",
  },
  {
    id: "چالش‌های اداری",
    label: "چالش‌های اداری",
    shortLabel: "اداری",
    englishName: "Administrative Challenges",
    icon: Briefcase,
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-700",
    emoji: "📋",
    description: "راهکارها و تجربه‌های عبور از چالش‌های اداری",
  },
];

// ==========================================
// STORIES DATA
// ==========================================
const initialStories = [
  { id: 1, category: 'مهاجرت موفق', title: 'داستان دریافت ویزای RWR در ۳ ماه', author: 'علی', likes: 12, comments: 3, excerpt: 'مسیر دریافت ویزای کار (RWR) در وین برای من پیچیده‌تر از تصورم بود. از آماده‌سازی مدارک در سفارت تهران تا پیدا کردن کارِ تخصصی در وین، هر مرحله درس‌های مهمی داشت. کلید موفقیتم، پیگیریِ مستمر و یادگیری زبان آلمانی قبل از سفر بود.', image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=600', date: '۲ روز پیش', readTime: '۵ دقیقه', featured: true },
  { id: 2, category: 'فرهنگ و لایف‌استایل', title: 'خرید از فلومارکت‌های وین', author: 'مریم', likes: 25, comments: 8, excerpt: 'خرید لوازم کامل خانه با ۵۰ یورو غیرممکن به نظر می‌رسید، اما در فلومارکت‌های وین و سایت Willhaben، فرانتِ (Furnished) کردن خانه با وسایل دست‌دومِ باکیفیت به یک سرگرمی جذاب تبدیل شد. ترفند اصلی، چانه‌زنی دوستانه و صبوری برای پیدا کردنِ بهترین اجناس است.', image: 'https://images.unsplash.com/photo-1517646287270-a5a9b6020757?q=80&w=600', date: '۳ روز پیش', readTime: '۴ دقیقه' },
  { id: 3, category: 'چالش‌های اداری', title: 'نکات مخفی تمدید اقامت در اداره MA35', author: 'رضا', likes: 18, comments: 5, excerpt: 'اداره مهاجرت وین (MA35) قوانین خاصی دارد که گاهی گیج‌کننده است. برای تمدید اقامت، یاد گرفتم که همیشه مدارکِ اثبات درآمد باید شفاف و طبق فرمتِ موردِ نظرشان باشد. آرامش و آمادگیِ کامل، بهترین سلاحِ شما در این راهروهاست.', image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=600', date: '۵ روز پیش', readTime: '۶ دقیقه', featured: true },
  { id: 4, category: 'مهاجرت موفق', title: 'پیدا کردن خانه ارزان در وین', author: 'علی', likes: 15, comments: 2, excerpt: 'پیدا کردن خانه ارزان در وین ممکن است؟ بله! با گشتنِ مداوم در گروپ‌های فیس‌بوک و سایت‌های محلی مثل Willhaben. رازِ موفقیت من، آماده بودن برای بازدیدهایِ سریع و ارائهِ مدارکِ لازم بلافاصله پس از پسندیدنِ خانه بود.', image: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=600', date: 'یک هفته پیش', readTime: '۴ دقیقه' },
  { id: 5, category: 'مهاجرت موفق', title: 'قبولی در آزمون زبان B2 با متد خودم', author: 'سارا', likes: 20, comments: 5, excerpt: 'یادگیری آلمانی برایِ کارِ تخصصی ضروری است. برنامه‌ریزیِ روزانهِ من شاملِ چهار ساعت تمرینِ متمرکز، گوش دادن به پادکست‌های آلمانی و صحبت کردن با هم‌زبانانِ محلی بود که سرعتِ پیشرفتم را چندین برابر کرد.', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600', date: 'یک هفته پیش', readTime: '۵ دقیقه' },
  { id: 6, category: 'فرهنگ و لایف‌استایل', title: 'کنسرت اپرا با بلیت ۱۵ یورویی', author: 'محمد', likes: 30, comments: 4, excerpt: 'تماشایِ اپرایِ وین با ۱۵ یورو؟ یک ترفندِ کلاسیکِ وینی است. کافیست در روزِ اجرا، زودتر به صفِ بلیت‌های ایستاده (Stehplatz) در ورودیِ جانبی بروید. تجربه‌ی اپرا با ایستادنِ دو سه ساعته، به شدت ارزشش را دارد.', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a75?q=80&w=600', date: 'یک هفته پیش', readTime: '۳ دقیقه', featured: true },
  { id: 7, category: 'فرهنگ و لایف‌استایل', title: 'خرید ارزان از بازار معروف Naschmarkt', author: 'کیمیا', likes: 18, comments: 6, excerpt: 'بازارِ ناش‌مارکت فقط برای گردشگران نیست. ترفتندِ من برای خریدِ اقتصادی، رفتن به آخرینِ ساعاتِ کاریِ غرفه‌ها در روزهایِ آخرِ هفته است که فروشندگان برایِ خالی کردنِ بارشان، میوه‌ها و سبزیجاتِ تازه را تا ۶۰٪ هم تخفیف می‌زنند.', image: 'https://images.unsplash.com/photo-1559494007-9f5847c5d07b?q=80&w=600', date: '۲ هفته پیش', readTime: '۴ دقیقه' },
  { id: 8, category: 'فرهنگ و لایف‌استایل', title: 'فرهنگ دوچرخه‌سواری در شهر وین', author: 'امیر', likes: 22, comments: 3, excerpt: 'وین شهرِ دوچرخه‌هاست! استفاده از دوچرخه برایِ جابجایی بینِ خانه و کار نه تنها هزینه‌هایِ حمل‌ونقل را صفر می‌کند، بلکه لذتِ دیدنِ خیابان‌هایِ زیبایِ وین را هم به همراه دارد. فقط قوانینِ دوچرخه‌سواران را جدی بگیرید.', image: 'https://images.unsplash.com/photo-1523906236-70e28f7318ec?q=80&w=600', date: '۲ هفته پیش', readTime: '۳ دقیقه' },
  { id: 9, category: 'فرهنگ و لایف‌استایل', title: 'استفاده از کتابخانه‌های عمومی وین', author: 'نسترن', likes: 14, comments: 2, excerpt: 'کتابخانه‌هایِ عمومیِ وین (Büchereien Wien) پاتوقِ موردِ علاقه من برایِ تمرکز رویِ پروژه‌هایِ کاری است. این‌جا نه تنها فضا بسیار آرام است، بلکه اشتراکِ سالانه‌اش هزینه‌یِ بسیار ناچیزی دارد و کتاب‌هایِ زبان‌آلمانیِ فوق‌العاده‌ای هم دارد.', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=600', date: '۲ هفته پیش', readTime: '۳ دقیقه' },
  { id: 10, category: 'چالش‌های اداری', title: 'اعتراض به جریمه رانندگی اشتباه', author: 'پویا', likes: 12, comments: 7, excerpt: 'جریمه‌یِ رانندگیِ اشتباه تجربه‌ی پر استرسی بود. دوربینِ سرعت‌سنج اشتباهاً ماشینِ من را ثبت کرده بود. با نوشتنِ یک نامه اعتراضیِ مودبانه و مستدل به اداره مسئول و پیوست کردنِ مدرکی از محلِ حضورم، اشتباه اصلاح شد.', image: 'https://images.unsplash.com/photo-1486016001155-38f35f0e309f?q=80&w=600', date: '۳ هفته پیش', readTime: '۵ دقیقه' },
  { id: 11, category: 'چالش‌های اداری', title: 'فسخ قرارداد اینترنت و تغییر اپراتور', author: 'شادی', likes: 10, comments: 4, excerpt: 'فسخِ قراردادِ اینترنت در اتریش نیاز به دقتِ زمانی دارد. چون اکثرِ قراردادها ۱۲ یا ۲۴ ماهه هستند، باید حتماً ۳ ماه قبل از تمام‌شدنِ آن، نامه رسمیِ فسخ (Kündigung) را ارسال کنید. من با فرمتِ استاندارد، مشکلی نداشتم.', image: 'https://images.unsplash.com/photo-1593642634367-d9adaa23dc03?q=80&w=600', date: '۳ هفته پیش', readTime: '۴ دقیقه' },
  { id: 12, category: 'چالش‌های اداری', title: 'تمدید دفترچه مادر و کودک - نکات ضروری', author: 'شبنم', likes: 28, comments: 9, excerpt: 'دفترچه‌یِ مادر و کودک برایِ مهاجرانی که قصدِ دریافتِ کمک‌هزینه‌هایِ دولتی دارند، حیاتی است. مطمئن شوید تمامِ معایناتِ دوره‌ای را در زمانِ مقرر انجام دهید و پزشکِ اطفال ممهورِ کند.', image: 'https://images.unsplash.com/photo-1516627145467-45ede3083626?q=80&w=600', date: '۳ هفته پیش', readTime: '۶ دقیقه' },
  { id: 14, category: 'چالش‌های اداری', title: 'چالش‌های ودیعه (Kaution) خانه', author: 'سپهر', likes: 13, comments: 4, excerpt: 'پس گرفتنِ ودیعه (Kaution) از صاحب‌خانه‌هایِ وسواسی در وین سخت است. برایِ جلوگیری از کسرِ پولِ بی‌دلیل، روزِ اولِ تحویلِ خانه، از تمامِ ریزِ مشکلاتِ دیوارها و کفپوش عکس بگیرید و به صلح‌نامه اضافه کنید.', image: 'https://images.unsplash.com/photo-1595873523773-6a0d691bd9b7?q=80&w=600', date: 'یک ماه پیش', readTime: '۴ دقیقه' },
  { id: 15, category: 'چالش‌های اداری', title: 'اهمیت مدارک کامل برای MA35', author: 'آرزو', likes: 23, comments: 6, excerpt: 'در MA35، کامل بودنِ مدارک حرفِ اول را می‌زند. حتی یک کپیِ ناخوانا می‌تواند پروسه‌یِ رسیدگی را ماه‌ها عقب بیندازد. لیستِ مدارکِ مورد نیازِ پرونده‌تان را از وب‌سایتِ خودشان دقیقِ قبلِ جلسه چک کنید.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=600', date: 'یک ماه پیش', readTime: '۵ دقیقه' },
  { id: 16, category: 'مهاجرت موفق', title: 'کار دانشجویی در کافه‌های وین', author: 'هادی', likes: 19, comments: 5, excerpt: 'کار در کافه‌هایِ وین برایِ دانشجویان فوق‌العاده است. هم با فرهنگِ کافه‌نشینیِ آن‌ها آشنا می‌شوی و هم صحبتِ مداوم با مشتری‌ها، اعتمادبه‌نفسِ زبانی‌ات را چندین برابر می‌کند.', image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600', date: 'یک ماه پیش', readTime: '۳ دقیقه' },
  { id: 17, category: 'فرهنگ و لایف‌استایل', title: 'خوشگذرانی در فستیوال جزیره دانوب', author: 'نگین', likes: 35, comments: 10, excerpt: 'فستیوالِ جزیره‌یِ دانوب (Donauinselfest) یکی از بزرگترین فستیوال‌هایِ روبازِ رایگانِ دنیاست. حتماً برنامه‌یِ آن را در جولای چک کنید و با دوستانتان برایِ شنیدنِ موسیقیِ زنده بروید.', image: 'https://images.unsplash.com/photo-1459749411155-0435417ab76d?q=80&w=600', date: 'یک ماه پیش', readTime: '۳ دقیقه', featured: true },
  { id: 18, category: 'چالش‌های اداری', title: 'دردسر هم‌خانه شدن در وین', author: 'نیما', likes: 11, comments: 8, excerpt: 'هم‌خانه شدن در وین می‌تواند چالش‌برانگیز باشد. مهم‌تر از سن، هم‌خوانیِ عادت‌هایِ نظافتی و سبکِ زندگی است. قبل از بستنِ قرارداد، یک ساعت وقت صرفِ گفتگو درباره‌یِ قانون‌هایِ مشترکِ خانه کنید.', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600', date: 'یک ماه پیش', readTime: '۴ دقیقه' },
  { id: 19, category: 'چالش‌های اداری', title: 'برخورد با کارمند سخت‌گیر MA35', author: 'سارا', likes: 21, comments: 4, excerpt: 'یک بار با کارمندِ بسیار سخت‌گیرِ MA35 روبرو شدم. بجایِ عصبانیت، با آرامش به سوالاتش پاسخ دادم و مدارکِ مالی‌ام را خیلی شفاف نشانش دادم. نتیجه این شد که وقتی دید همه‌چیز دقیق است، سخت‌گیری‌اش را کنار گذاشت.', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600', date: 'یک ماه پیش', readTime: '۵ دقیقه' },
  { id: 20, category: 'فرهنگ و لایف‌استایل', title: 'آشنایی با سیستم تفکیک پسماند', author: 'کیان', likes: 17, comments: 3, excerpt: 'سیستمِ تفکیکِ زباله در اتریش (Mülltrennung) واقعاً دقیق است و جدی گرفتنِ آن نشانه‌یِ احترام به فرهنگِ آنهاست. با کمی تمرین، این تفکیکِ زباله‌ها دیگر برایت طبیعی می‌شود.', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600', date: 'یک ماه پیش', readTime: '۳ دقیقه' },
  { id: 21, category: 'مهاجرت موفق', title: 'پارتیتایم در شرکت‌های لجستیک', author: 'فرناز', likes: 15, comments: 2, excerpt: 'به عنوانِ دانشجویِ تازه وارد، کارِ پارت‌تایم در لجستیک برای من عالی بود. شیفت‌هایِ منعطفِ شبانه یا آخرِ هفته به من اجازه می‌داد با خیالِ راحت به کلاس‌هایِ دانشگاه برسم.', image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=600', date: 'یک ماه پیش', readTime: '۳ دقیقه' },
  { id: 22, category: 'فرهنگ و لایف‌استایل', title: 'حس و حال بازارهای کریسمس', author: 'مهدی', likes: 40, comments: 12, excerpt: 'بازار‌هایِ کریسمسِ وین (Christkindlmarkt) واقعاً جادویی هستند. نوشیدنِ یک لیوانِ پونشِ گرم در هوایِ سرد و تماشایِ نورپردازی‌ها در مقابلِ شهرداری (Rathaus) تجربه‌ای است که هر مهاجری باید حداقل یک بار داشته باشد.', image: 'https://images.unsplash.com/photo-1577740209689-53e77f0ce969?q=80&w=600', date: 'یک ماه پیش', readTime: '۴ دقیقه', featured: true },
  { id: 23, category: 'مهاجرت موفق', title: 'پیدا کردن خانه از طریق آشنایان', author: 'یلدا', likes: 14, comments: 3, excerpt: 'در موردِ خانه همیشه پرس‌وجو کنید. بهترین خانه‌ای که در وین داشتم، نه از سایت‌ها، بلکه از طریقِ معرفیِ یکی از دوستانِ قدیمی پیدا شد. حتماً در گروه‌هایِ دوستانه بپرسید!', image: 'https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=600', date: 'یک ماه پیش', readTime: '۳ دقیقه' },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: `${initialStories.length}+`, label: "داستان واقعی", icon: "📖" },
  { value: "۳", label: "دسته تجربه", icon: "📂" },
  { value: "۱۰۰٪", label: "تجربه واقعی", icon: "✨" },
  { value: "۲۴/۷", label: "دسترسی رایگان", icon: "⏰" },
];

// ==========================================
// WHY USE
// ==========================================
const WHY_USE = [
  {
    icon: CheckCircle,
    title: "تجربه‌های واقعی",
    text: "همه داستان‌ها از تجربه واقعی فارسی‌زبانان مقیم اتریش نوشته شده‌اند.",
    color: "from-[#c8102e] to-[#970d22]",
  },
  {
    icon: Users,
    title: "جامعه‌محور",
    text: "شما هم می‌توانید تجربه خود را ثبت کنید و به دیگران کمک کنید.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Sparkles,
    title: "دسته‌بندی هوشمند",
    text: "داستان‌ها بر اساس موضوع (مهاجرت، فرهنگ، اداری) دسته‌بندی شده‌اند.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "کاملاً رایگان",
    text: "دسترسی به تمام داستان‌ها بدون نیاز به ثبت‌نام یا پرداخت هزینه.",
    color: "from-amber-500 to-orange-600",
  },
];

// ==========================================
// FAQS
// ==========================================
const FAQS = [
  {
    q: "چگونه می‌توانم تجربه خود را در این گالری ثبت کنم؟",
    a: "برای ثبت تجربه خود، کافیست از طریق کانال‌های ارتباطی ما (تلگرام، واتس‌اپ یا ایمیل) با تیم اتریش‌نشین تماس بگیرید. داستان خود را به‌صورت متنی یا صوتی ارسال کنید، تیم ما آن را بررسی و پس از تأیید، منتشر می‌کند.",
  },
  {
    q: "آیا داستان‌ها واقعی هستند؟",
    a: "بله، تمام داستان‌های این گالری از تجربه‌های واقعی فارسی‌زبانان مقیم اتریش نوشته شده‌اند. برخی نام‌ها به درخواست نویسندگان تغییر یافته یا تنها با نام کوچک منتشر می‌شوند.",
  },
  {
    q: "آیا می‌توانم با نویسندگان داستان‌ها تماس بگیرم؟",
    a: "به دلیل حفظ حریم خصوصی نویسندگان، اطلاعات تماس مستقیم منتشر نمی‌شود. اما اگر سوال خاصی دارید، می‌توانید از طریق کانال‌های اتریش‌نشین مطرح کنید تا در صورت تمایل نویسنده، ارتباط برقرار شود.",
  },
  {
    q: "چرا دسته‌بندی داستان‌ها محدود است؟",
    a: "ما در حال توسعه دسته‌بندی‌های بیشتری هستیم. در حال حاضر، داستان‌ها در سه دسته اصلی (مهاجرت موفق، فرهنگ و لایف‌استایل، چالش‌های اداری) دسته‌بندی شده‌اند تا جستجو و یافتن داستان‌های مرتبط ساده‌تر شود.",
  },
  {
    q: "آیا می‌توانم داستانم را ویرایش یا حذف کنم؟",
    a: "بله، اگر داستان شما منتشر شده و می‌خواهید آن را ویرایش یا حذف کنید، از طریق کانال‌های ارتباطی با ما تماس بگیرید. تیم اتریش‌نشین در اسرع وقت درخواست شما را بررسی می‌کند.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
const ExperienceGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [stories, setStories] = useState(initialStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Filter stories
  const filteredStories = useMemo(() => {
    return stories.filter(s => {
      const matchesCat = s.category === selectedCategory;
      const matchesSearch = !searchQuery ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [stories, selectedCategory, searchQuery]);

  // Top liked story across all categories
  const topStory = useMemo(() => {
    return [...stories].sort((a, b) => b.likes - a.likes)[0];
  }, [stories]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = stories.filter(s => s.category === cat.id).length;
      return acc;
    }, {} as Record<string, number>);
  }, [stories]);

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
    setLikedIds(prev => new Set(prev).add(id));
    toast.success("داستان لایک شد!");
  };

  const handleCopyLink = (story: typeof initialStories[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${story.title} - نوشته ${story.author}\n${window.location.href}#story-${story.id}`;
    navigator.clipboard.writeText(text);
    setCopiedId(story.id);
    toast.success("لینک داستان کپی شد!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryInfo = (catId: string) => CATEGORIES.find(c => c.id === catId) || CATEGORIES[0];

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "گالری تجربه‌های مهاجرتی ایرانیان در اتریش",
      url: "https://otrish-iran.ir/experiences",
      description:
        "مجموعه داستان‌ها و تجربه‌های واقعی فارسی‌زبانان مقیم اتریش در سه دسته: مهاجرت موفق، فرهنگ و لایف‌استایل، و چالش‌های اداری.",
      inLanguage: "fa",
      publisher: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        logo: { "@type": "ImageObject", url: "https://otrish-iran.ir/otrish_logo_1779961596526.png" },
      },
      hasPart: initialStories.map((s) => ({
        "@type": "Article",
        headline: s.title,
        author: { "@type": "Person", name: s.author },
        image: s.image,
        articleSection: s.category,
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: s.likes,
        },
        commentCount: s.comments,
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
        { "@type": "ListItem", position: 1, name: "اتریش‌نشین", item: "https://otrish-iran.ir" },
        { "@type": "ListItem", position: 2, name: "گالری تجربه", item: "https://otrish-iran.ir/experiences" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "دسته‌بندی تجربه‌ها",
      itemListElement: CATEGORIES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        description: c.description,
      })),
    },
  ];

  return (
    <>
      <SEO
        title="گالری تجربه‌های مهاجرتی ایرانیان در اتریش | داستان‌های واقعی ۲۰۲۶"
        description="مجموعه داستان‌ها و تجربه‌های واقعی فارسی‌زبانان مقیم اتریش: مهاجرت موفق، فرهنگ و لایف‌استایل و چالش‌های اداری. الهام‌بخش برای مهاجران تازه‌وارد."
        keywords="تجربه مهاجرت اتریش, داستان موفقیت وین, چالش‌های اداری MA35, لایف‌استایل اتریش, تجربه ایرانیان اتریش, گالری تجربه, اتریش‌نشین"
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
              alt="وین اتریش"
              className="w-full h-full object-cover opacity-[0.08]"
              loading="eager"
            />
          </div>

          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            📖
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
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                Erfahrungsgalerie 2026
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                گالری تجربه‌های مهاجرتی
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                مجموعه‌ای از داستان‌ها و تجربه‌های واقعی فارسی‌زبانان مقیم اتریش —
                از موفقیت‌های مهاجرتی و چالش‌های اداری تا نکات زندگی روزمره،
                فرهنگ و تفریح. الهام‌بخش برای هر فارسی‌زبانی که مسیر اتریش را
                انتخاب کرده است.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{stories.length} داستان واقعی</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Users className="w-3.5 h-3.5" />
                  <span>جامعه‌محور</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>کاملاً رایگان</span>
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
        {/* TOP STORY HIGHLIGHT */}
        {/* ========================================== */}
        {topStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1128] via-[#001f54] to-[#0a1128] p-5 md:p-6 text-white"
          >
            <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#c8102e]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative flex items-center gap-4 flex-wrap">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-amber-950 shadow-lg flex-shrink-0"
              >
                <Trophy className="w-6 h-6" />
              </motion.div>
              <div className="flex-1 min-w-[200px]">
                <div className="text-[10px] font-black text-amber-300 mb-0.5 flex items-center gap-1.5">
                  <Flame className="w-3 h-3" />
                  محبوب‌ترین داستان هفته
                </div>
                <h3 className="text-xs md:text-sm font-black leading-snug line-clamp-1">
                  {topStory.title}
                </h3>
                <div className="text-[10px] font-bold text-stone-400 mt-0.5 flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {topStory.author}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    {topStory.likes} لایک
                  </span>
                </div>
              </div>
              <div className="text-left">
                <div className="text-[9px] font-black text-stone-400">دسته</div>
                <div className="text-xs font-black text-amber-300">
                  {getCategoryInfo(topStory.category).emoji} {getCategoryInfo(topStory.category).shortLabel}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* CATEGORY SELECTOR + SEARCH */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b border-stone-100">
            <div className="mb-5">
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                کاوش در دسته‌بندی‌ها
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                دسته مورد نظر خود را انتخاب کنید و داستان‌های مرتبط را بخوانید
              </p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery("");
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-4 rounded-2xl border-2 text-right transition-all overflow-hidden group ${
                      isActive
                        ? `border-[#c8102e] bg-gradient-to-br ${cat.gradient} text-white shadow-lg`
                        : "bg-white border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {isActive && (
                      <CheckCircle className="absolute top-2 left-2 w-4 h-4" />
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
                          isActive
                            ? "bg-white/20 text-white"
                            : `bg-gradient-to-br ${cat.gradient} text-white shadow-md group-hover:scale-110`
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base">{cat.emoji}</span>
                          <h3
                            className={`font-black text-sm ${
                              isActive ? "text-white" : "text-stone-900"
                            }`}
                          >
                            {cat.label}
                          </h3>
                        </div>
                        <p
                          className={`text-[10px] font-bold leading-relaxed mb-2 ${
                            isActive ? "text-white/80" : "text-stone-500"
                          }`}
                        >
                          {cat.description}
                        </p>
                        <span
                          className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          <BookOpen className="w-2.5 h-2.5" />
                          {categoryCounts[cat.id] || 0} داستان
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                placeholder="جستجو در داستان‌ها... (عنوان، نویسنده یا محتوا)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl pr-10 pl-10 py-3 text-xs font-black text-stone-800 outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-rose-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-3.5 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* STORIES GRID */}
        {/* ========================================== */}
        <div>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
                {getCategoryInfo(selectedCategory).emoji}{" "}
                {getCategoryInfo(selectedCategory).label}
              </h2>
              <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
                {filteredStories.length} داستان در این دسته
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredStories.map((story, i) => {
                const catInfo = getCategoryInfo(story.category);
                const CatIcon = catInfo.icon;
                const isLiked = likedIds.has(story.id);
                const isCopied = copiedId === story.id;

                return (
                  <motion.article
                    key={story.id}
                    id={`story-${story.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-3xl border-2 border-stone-200 hover:border-[#c8102e]/30 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
                  >
                    {/* Image banner */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Featured badge */}
                      {story.featured && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-2 py-1 rounded-full shadow-lg">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          ویژه
                        </div>
                      )}

                      {/* Category badge */}
                      <div
                        className={`absolute top-3 right-3 inline-flex items-center gap-1 bg-gradient-to-r ${catInfo.gradient} text-white text-[9px] font-black px-2 py-1 rounded-full shadow-lg`}
                      >
                        <CatIcon className="w-2.5 h-2.5" />
                        {catInfo.shortLabel}
                      </div>

                      {/* Read time */}
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded-full">
                        <Clock className="w-2.5 h-2.5" />
                        {story.readTime}
                      </div>

                      {/* Author */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${catInfo.gradient} flex items-center justify-center text-white font-black text-[11px] shadow-lg border-2 border-white`}>
                          {story.author.charAt(0)}
                        </div>
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-2 py-0.5">
                          <span className="text-[9px] font-black text-stone-800">
                            {story.author}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-[9px] font-black text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                          <Calendar className="w-2.5 h-2.5" />
                          {story.date}
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-stone-900 leading-snug mb-2 min-h-[40px] group-hover:text-[#c8102e] transition-colors">
                        {story.title}
                      </h3>

                      <p className="text-[11px] text-stone-600 font-bold leading-relaxed mb-4 flex-1">
                        {story.excerpt}
                      </p>

                      {/* Action footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={(e) => handleLike(story.id, e)}
                            whileTap={{ scale: 0.9 }}
                            className={`inline-flex items-center gap-1.5 text-[10.5px] font-black px-2.5 py-1.5 rounded-full transition-all ${
                              isLiked
                                ? "bg-rose-50 text-rose-600"
                                : "bg-stone-100 text-stone-600 hover:bg-rose-50 hover:text-rose-600"
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                isLiked ? "fill-rose-500 text-rose-500" : ""
                              }`}
                            />
                            {story.likes}
                          </motion.button>

                          <div className="inline-flex items-center gap-1.5 text-[10.5px] font-black text-stone-500 px-2.5 py-1.5">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {story.comments}
                          </div>
                        </div>

                        <motion.button
                          onClick={(e) => handleCopyLink(story, e)}
                          whileTap={{ scale: 0.9 }}
                          whileHover={{ scale: 1.1 }}
                          className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition"
                          title="کپی لینک"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}

              {/* Empty State */}
              {filteredStories.length === 0 && (
                <div className="col-span-full text-center py-16 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                  <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8 text-stone-400" />
                  </div>
                  <p className="text-sm font-black text-stone-700 mb-1">
                    داستانی منطبق با جستجو یافت نشد
                  </p>
                  <p className="text-[11px] font-bold text-stone-500 mb-4">
                    عبارت دیگری را جستجو کنید یا دسته را تغییر دهید
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(CATEGORIES[0].id);
                    }}
                    className="inline-flex items-center gap-1.5 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <X className="w-3 h-3" />
                    پاک‌سازی فیلترها
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========================================== */}
        {/* WHY USE */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg md:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-[#c8102e]" />
              چرا این گالری منحصر به‌فرد است؟
            </h2>
            <p className="text-[11px] md:text-sm text-stone-500 font-bold mt-1">
              چهار دلیلی که این گالری را به مرجع اول فارسی‌زبانان تبدیل می‌کند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_USE.map((v, i) => {
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
        {/* SHARE YOUR STORY CTA */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border-2 border-indigo-200 p-6 md:p-8"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-base md:text-lg font-black text-stone-900 mb-2">
                تجربه‌ات را با ما به اشتراک بگذار!
              </h3>
              <p className="text-xs md:text-sm text-stone-600 font-bold leading-relaxed mb-4">
                اگر تجربه‌ای از مهاجرت، زندگی یا کار در اتریش داری، آن را با
                هموطنانت به اشتراک بگذار. داستان تو می‌تواند راهنمای صدها
                فارسی‌زبان دیگر باشد که در مسیر مشابهی قدم می‌گذارند.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/Otrish_neshin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4" />
                  ارسال داستان در تلگرام
                </a>
                <a
                  href="https://wa.me/436889763256"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border-2 border-indigo-200 hover:border-indigo-300 text-indigo-700 font-black text-xs px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  ارسال در واتس‌اپ
                </a>
              </div>
            </div>
          </div>
        </motion.div>

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
              پاسخ به پرتکرارترین سوالات درباره گالری تجربه
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
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-6 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-black text-amber-900 text-sm mb-1.5">
              نکات مهم درباره داستان‌ها
            </h5>
            <ul className="text-[11px] text-amber-800 font-bold leading-relaxed space-y-1.5 list-disc pr-5">
              <li>همه داستان‌ها تجربه شخصی هستند و ممکن است با شرایط شما متفاوت باشند.</li>
              <li>تجربه‌های فردی جایگزین مشاوره حقوقی یا اداری رسمی نیستند.</li>
              <li>نام برخی نویسندگان به درخواست خودشان تغییر یافته یا فقط نام کوچک ذکر شده است.</li>
              <li>قوانین اتریش ممکن است در طول زمان تغییر کنند؛ همیشه به منابع رسمی مراجعه کنید.</li>
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
              همراه شما در مسیر مهاجرت
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              سوال یا داستانی دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین آماده شنیدن داستان شما و پاسخ به سوالاتتان درباره
              زندگی، کار و مهاجرت در اتریش است. با ما در تماس باشید.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                واتس‌اپ اتریش
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
              اتریش‌نشین یک پلتفرم مستقل و داوطلبانه است. تمام داستان‌های این
              گالری، تجربه‌های شخصی فارسی‌زبانان مقیم اتریش هستند و اتریش‌نشین
              مسئولیتی در قبال صحت کامل آن‌ها نمی‌پذیرد. برای تصمیم‌های مهم
              (حقوقی، اداری یا مالی)، همیشه با منابع رسمی یا مشاوران واجد شرایط
              مشورت کنید.
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

export default ExperienceGallery;