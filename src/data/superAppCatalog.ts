import {
  Compass,
  Coins,
  Map,
  BookOpen,
  Users,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  AlertOctagon,
  Calendar,
  Home,
  Clock,
  MapPin,
  Send,
  Award,
  Calculator,
  FileText,
  GraduationCap,
  Globe,
  UserCheck,
  CheckCircle,
  ShoppingBag,
  Heart,
  Building,
  Car,
  ShoppingCart,
  Train,
  Smile,
  Stethoscope,
  Ticket,
  Search,
  Briefcase,
  Phone,
  Landmark,
  Scale,
  FolderLock,
  Bus,
  Utensils,
  KeyRound,
  ShieldAlert,
  Percent,
  CheckSquare,
  IdCard
} from "lucide-react";

export interface SuperAppCategory {
  id: string;
  title: string;
  shortTitle: string;
  icon: any;
  color: string;
  bgLight: string;
  borderColor: string;
  description: string;
}

export interface SuperAppPageItem {
  id: string;
  title: string;
  shortTitle?: string;
  category: string;
  icon: any;
  description: string;
  badge?: "پربازدید" | "هوشمند" | "ویژه" | "ضروری" | "جدید" | "رایگان";
  keywords: string[];
  popular?: boolean;
}

export const SUPER_APP_CATEGORIES: SuperAppCategory[] = [
  {
    id: "all",
    title: "همه خدمات",
    shortTitle: "همه",
    icon: Home,
    color: "text-red-650",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    description: "فهرست جامع کلیه ابزارها و خدمات سوپراپلیکیشن اتریش‌نشین"
  },
  {
    id: "immigration",
    title: "مهاجرت و اقامت",
    shortTitle: "اقامت و ویزا",
    icon: Compass,
    color: "text-red-700",
    bgLight: "bg-red-50",
    borderColor: "border-red-200",
    description: "کارت قرمز-سفید-قرمز، نوبت‌های MA35، ویزای تحصیلی، الحاق خانواده و شهروندی"
  },
  {
    id: "finance",
    title: "کار، حقوق و مالیات",
    shortTitle: "مالیات و حقوق",
    icon: Coins,
    color: "text-emerald-700",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: "محاسبه حقوق ناخالص به خالص، اظهارنامه مالیاتی، فینانس آنلاین و فریلنسری"
  },
  {
    id: "directory",
    title: "دایرکتوری و نقشه خدمات",
    shortTitle: "پزشکان و مشاغل",
    icon: Map,
    color: "text-sky-700",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-200",
    description: "پزشکان طرف قرارداد ÖGK، وکلا، مترجمان رسمی، صرافی‌ها و فروشگاه‌های ایرانی"
  },
  {
    id: "living",
    title: "مسکن و زندگی در اتریش",
    shortTitle: "مسکن و زندگی",
    icon: Building,
    color: "text-amber-700",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Willhaben، اجاره خانه، هزینه‌های شارژ، خرید سوپرمارکت، بیمه و مهدکودک"
  },
  {
    id: "language",
    title: "آموزش و زبان آلمانی",
    shortTitle: "زبان آلمانی",
    icon: BookOpen,
    color: "text-indigo-700",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    description: "آکادمی بقای آلمانی، واژه‌نامه اداری، دوره‌های WIFI و BFI و معادل‌سازی مدرک"
  },
  {
    id: "transport",
    title: "خودرو و حمل‌ونقل",
    shortTitle: "حمل‌ونقل",
    icon: Car,
    color: "text-violet-700",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    description: "گواهینامه، کلیما تیکت، کارت قطار ÖBB، معاینه فنی خودرو و قوانین پارک"
  },
  {
    id: "community",
    title: "کانون، همسفر و گفتگو",
    shortTitle: "همسفر و کانون",
    icon: Users,
    color: "text-rose-700",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
    description: "همسفریاب فرودگاه، دیوار دست‌دوم، تالار گفتگوی مهاجرین و رویدادهای فرهنگی"
  },
  {
    id: "smart",
    title: "سامانه‌های هوشمند ارزیابی",
    shortTitle: "سامانه‌ها",
    icon: Sparkles,
    color: "text-yellow-700",
    bgLight: "bg-yellow-50",
    borderColor: "border-yellow-200",
    description: "ارزیابی هوشمند اقامت، چک مدارک، محاسبه کمک‌هزینه مسکن و دستیار فرم‌ها"
  },
  {
    id: "about",
    title: "درباره و تماس با کانون",
    shortTitle: "تماس با ما",
    icon: MessageSquare,
    color: "text-stone-700",
    bgLight: "bg-stone-100",
    borderColor: "border-stone-300",
    description: "معرفی کانون مستقل ایرانیان اتریش، راه‌های تماس رسمی، واتس‌اپ و ایمیل"
  }
];

export const SUPER_APP_PAGES: SuperAppPageItem[] = [
  // --- IMMIGRATION & RESIDENCY ---
  {
    id: "visa-samples",
    title: "نمونه ویزاها، کارت‌های اقامت و پذیرش‌های تحصیلی اتریش",
    shortTitle: "نمونه ویزاها",
    category: "immigration",
    icon: IdCard,
    description: "نمایش تعاملی کارت‌های اقامت واقعی اتریش (RWR, RWR Plus, دانشجویی، بلوکارت)، نامه‌های پذیرش دانشگاهی (Uni Wien, TU Wien) و کالبدشکافی بندهای حقوقی",
    badge: "جدید",
    popular: true,
    keywords: ["نمونه ویزاها", "نمونه ویزا", "کارت اقامت اتریش", "پذیرش تحصیلی", "Aufenthaltstitel", "Zulassungsbescheid", "کارت قرمز سفید قرمز", "پذیرش دانشگاه وین", "نمونه های ویژه"]
  },
  {
    id: "rwr-calculator",
    title: "محاسبه امتیاز کارت قرمز-سفید-قرمز (RWR-Karte)",
    shortTitle: "امتیازسنج RWR",
    category: "immigration",
    icon: Calculator,
    description: "محاسبه دقیق امتیاز سن، مدرک تحصیلی، سابقه کار و زبان طبق آیین‌نامه رسمی اداره مهاجرت اتریش",
    badge: "پربازدید",
    popular: true,
    keywords: ["کارت قرمز سفید قرمز", "rwr", "اقامت کاری", "امتیاز ویزا", "کار در اتریش", "mangelberuf"]
  },
  {
    id: "ma35",
    title: "پایش نوبت‌های اداره اقامت وین (MA 35)",
    shortTitle: "نوبت‌های MA35",
    category: "immigration",
    icon: FileText,
    description: "بررسی وقت‌های باز اداره اقامت MA35 وین، کنسلی‌ها و راهنمای کامل تحویل پرونده",
    badge: "ضروری",
    popular: true,
    keywords: ["ma35", "وقت سفارت", "اداره اقامت", "تمدید کارت", "نوبت وین", "ma 35"]
  },
  {
    id: "residency-conditions",
    title: "راهنمای شرایط تمدید اقامت و ماندگاری در اتریش",
    shortTitle: "تمدید اقامت",
    category: "immigration",
    icon: ShieldCheck,
    description: "بررسی شروط تمدید انواع اقامت‌های تحصیلی، کاری، بلوکارت و خوداشتغالی",
    badge: "ویژه",
    keywords: ["تمدید اقامت", "شروط تمدید", "اقامت دائم", "اقامت تحصیلی", "aufenthaltstitel"]
  },
  {
    id: "citizenship",
    title: "راهنمای جامع اخذ تابعیت و پاسپورت اتریش (Staatsbürgerschaft)",
    shortTitle: "تابعیت و پاسپورت",
    category: "immigration",
    icon: Award,
    description: "شرایط گذراندن آزمون تابعیت، سطح زبان B2، تمکن مالی ۳ ساله و مدارک مورد نیاز",
    keywords: ["تابعیت اتریش", "پاسپورت اتریش", "سیتیزن شیپ", "شهروندی", "staatsbürgerschaft"]
  },
  {
    id: "immigration-assessment",
    title: "فرم هوشمند ارزیابی شانس مهاجرت و اقامت",
    shortTitle: "ارزیابی شانس مهاجرت",
    category: "immigration",
    icon: Sparkles,
    description: "ارزیابی سیستماتیک شرایط شخصی جهت انتخاب بهترین مسیر قانونی ورود و زندگی در اتریش",
    badge: "هوشمند",
    popular: true,
    keywords: ["ارزیابی اقامت", "شانس ویزا", "مشاوره مهاجرت", "کارت اقامت", "مهاجرت اتریش"]
  },
  {
    id: "student-grad-guide",
    title: "راهنمای اقامت فارغ‌التحصیلان دانشگاه‌های اتریش",
    shortTitle: "اقامت فارغ‌التحصیلان",
    category: "immigration",
    icon: GraduationCap,
    description: "مهلت ۱۲ ماهه جستجوی کار، تبدیل ویزای دانشجویی به کارت قرمز-سفید-قرمز بدون نیاز به تست بازار کار",
    keywords: ["فارغ التحصیل", "دانشجویان وین", "ویزای کار بعد از تحصیل", "دانشگاه اتریش"]
  },
  {
    id: "tracker",
    title: "چک‌لیست گام‌به‌گام و پایش مراحل اقامت",
    shortTitle: "چک‌لیست اقامت",
    category: "immigration",
    icon: Compass,
    description: "پایش لحظه‌ای پیشرفت مدارک، ثبت ملده، افتتاح حساب، کارت بیمه e-card و نوبت‌دهی",
    keywords: ["چک لیست", "ردیاب اقامت", "اقدامات ورود به اتریش", "ثبت ملده", "meldezettel"]
  },
  {
    id: "id-austria-guide",
    title: "راهنمای فعال‌سازی شناسه دیجیتال ID Austria",
    shortTitle: "شناسه ID Austria",
    category: "immigration",
    icon: KeyRound,
    description: "آموزش گام‌به‌گام فعال‌سازی هویت دیجیتال برای دسترسی به سامانه‌های مالیاتی، بهداشتی و امضای دیجیتال",
    keywords: ["id austria", "شناسه دیجیتال", "امضای دیجیتال", "handy signatur", "هویت الکترونیک"]
  },
  {
    id: "criminal-record",
    title: "دریافت گواهی عدم سوءپیشینه در اتریش (Strafregisterbescheinigung)",
    shortTitle: "عدم سوءپیشینه",
    category: "immigration",
    icon: FolderLock,
    description: "نحوه دریافت آنلاین یا حضوری از طریق اداره پلیس با ID Austria با کمترین هزینه",
    keywords: ["عدم سوء پیشینه", "گواهی پلیس", "strafregister", "پلیس اتریش"]
  },
  {
    id: "marriage-divorce",
    title: "راهنمای حقوقی ثبت ازدواج و طلاق در اتریش",
    shortTitle: "ازدواج و طلاق",
    category: "immigration",
    icon: Scale,
    description: "قوانین ازدواج رسمی در Standesamt، ترجمه مدارک، الحاق همسر و آثار حقوقی اقامت",
    keywords: ["ازدواج در اتریش", "طلاق", "الحاق همسر", "standesamt", "خانواده"]
  },

  // --- FINANCE, TAXES & CURRENCY ---
  {
    id: "finance",
    title: "محاسبه‌گر حقوق ناخالص به خالص (Brutto-Netto 2026)",
    shortTitle: "محاسبه حقوق Brutto-Netto",
    category: "finance",
    icon: Coins,
    description: "محاسبه ضرایب بیمه درمانی ÖGK، بازنشستگی PVA، مالیات پلکانی بر درآمد و حقوق ۱۳ و ۱۴",
    badge: "پربازدید",
    popular: true,
    keywords: ["محاسبه حقوق", "brutto netto", "بروتو به نتو", "مالیات حقوق", "حقوق اتریش", "عیدی و پاداش"]
  },
  {
    id: "exchange",
    title: "پایش زنده قیمت ارز، طلا و صرافی‌های معتبر",
    shortTitle: "نرخ زنده ارز",
    category: "finance",
    icon: Coins,
    description: "قیمت لحظه‌ای بازار آزاد یورو، دلار، درهم و تتر به همراه فهرست صرافی‌های مطمئن حواله اتریش",
    badge: "پربازدید",
    popular: true,
    keywords: ["قیمت یورو", "نرخ ارز", "صرافی اتریش", "حواله وین", "قیمت دلار", "تومان به یورو"]
  },
  {
    id: "tax-return",
    title: "راهنمای اظهارنامه مالیاتی سالانه (Arbeitnehmerveranlagung)",
    shortTitle: "اظهارنامه مالیاتی",
    category: "finance",
    icon: FileText,
    description: "آموزش بازپس‌گیری مالیات اضافی از اداره دارایی اتریش از طریق پورتال FinanzOnline تا ۵ سال گذشته",
    badge: "ویژه",
    popular: true,
    keywords: ["استرداد مالیات", "فینانس آنلاین", "finanzonline", "تکس ریترن", "مالیات اضافی"]
  },
  {
    id: "freelance-tax",
    title: "راهنمای جامع مالیات فریلنسرها و مشاغل آزاد (Selbstständig)",
    shortTitle: "مالیات فریلنسرها",
    category: "finance",
    icon: Briefcase,
    description: "قوانین بیمه SVS، مالیات بر ارزش افزوده USt، سقف معافیت مالیاتی و تکالیف اتاق بازرگانی WKO",
    keywords: ["فریلنسری", "مشاغل آزاد", "selbstständig", "بیمه svs", "مالیات بر ارزش افزوده", "wko"]
  },
  {
    id: "familienbonus",
    title: "راهنمای تخفیف مالیاتی فرزندان (Familienbonus Plus)",
    shortTitle: "تخفیف فرزندان",
    category: "finance",
    icon: Smile,
    description: "کسر تا سقف ۲۰۰۰ یورو از مالیات سالانه به ازای هر فرزند زیر ۱۸ سال در اتریش",
    keywords: ["تخفیف مالیاتی فرزندان", "familienbonus", "یارانه کودک", "کمک هزینه فرزند"]
  },
  {
    id: "compare-living",
    title: "مقایسه هزینه‌های زندگی در وین و ایالت‌های اتریش",
    shortTitle: "مقایسه هزینه زندگی",
    category: "finance",
    icon: Coins,
    description: "برآورد میانگین هزینه اجاره، خوراک، انرژی، حمل‌ونقل و تفریح در ۹ ایالت فدرال اتریش",
    keywords: ["هزینه زندگی وین", "خرج ماهانه اتریش", "گرانی وین", "بودجه دانشجویی"]
  },
  {
    id: "student-finance",
    title: "راهنمای وام و بورسیه‌های دانشجویی (Studienbeihilfe)",
    shortTitle: "وام دانشجویی",
    category: "finance",
    icon: GraduationCap,
    description: "شرایط دریافت کمک‌هزینه تحصیلی، کار پاره‌وقت دانشجویی (Geringfügig) و معافیت از شهریه",
    keywords: ["بورسیه اتریش", "وام دانشجویی", "studienbeihilfe", "کار دانشجویی", "شهریه دانشگاه"]
  },
  {
    id: "nova",
    title: "محاسبه‌گر مالیات مصرف خودرو (NoVA Rechner)",
    shortTitle: "مالیات خودرو NoVA",
    category: "finance",
    icon: Car,
    description: "محاسبه مالیات استاندارد مصرف سوخت و انتشار گاز CO2 خودروهای وارداتی به اتریش",
    keywords: ["مالیات ماشین", "nova", "واردات خودرو به اتریش", "پلاک اتریش"]
  },
  {
    id: "real-estate",
    title: "محاسبه مالیات و هزینه‌های جانبی خرید ملک در اتریش",
    shortTitle: "مالیات خرید ملک",
    category: "finance",
    icon: Building,
    description: "محاسبه مالیات انتقال ملک (Grunderwerbsteuer)، ثبت سند، هزینه محضر و کمیسیون مشاور املاک",
    keywords: ["خرید خانه اتریش", "مالیات ملک", "سند وین", "کمیسیون املاک"]
  },
  {
    id: "bank-compare",
    title: "مقایسه حساب‌های بانکی رایگان و دانشجویی اتریش",
    shortTitle: "مقایسه بانک‌ها",
    category: "finance",
    icon: Landmark,
    description: "مقایسه بانک‌های Erste Bank، Bank Austria، Raiffeisen و نئوبانک‌های N26 با کارت دبیت مسترکارت",
    keywords: ["بانک اتریش", "ارسته بانک", "افتتاح حساب", "بانک رایگان", "کارت بانکی"]
  },

  // --- DIRECTORY & MAPS ---
  {
    id: "kassenarzt-directory",
    title: "دایرکتوری پزشکان طرف قرارداد بیمه (Kassenarzt)",
    shortTitle: "پزشکان بیمه ÖGK",
    category: "directory",
    icon: Stethoscope,
    description: "فهرست پزشکان عمومی و متخصص فارسی‌زبان و اتریشی طرف قرارداد بیمه درمانی سراسر اتریش",
    badge: "ضروری",
    popular: true,
    keywords: ["پزشک فارسی زبان", "دکتر ایرانی وین", "kassenarzt", "بیمه ögk", "متخصص زنان وین", "پزشک اطفال"]
  },
  {
    id: "emergency-dentistry",
    title: "راهنمای دندانپزشکی اورژانسی و شبانه‌روزی (Notdienst)",
    shortTitle: "دندانپزشکی اورژانس",
    category: "directory",
    icon: Stethoscope,
    description: "فهرست کلینیک‌های دندانپزشکی شبانه‌روزی و شیفت‌های تعطیلات رسمی تحت پوشش بیمه",
    keywords: ["دندانپزشک اورژانسی", "درد دندان شبانه", "notdienst", "دندانپزشکی وین"]
  },
  {
    id: "mapper",
    title: "نقشه تعاملی مشاغل، کسب‌وکارها و فلومارکت‌های ایرانیان",
    shortTitle: "نقشه مشاغل و نیازمندیها",
    category: "directory",
    icon: Map,
    description: "کشف صرافی‌ها، وکلا، پزشکان، رستوران‌ها، سوپرمارکت‌ها و کارشناسان هم‌زبان در وین و ایالت‌ها",
    popular: true,
    keywords: ["مشاغل ایرانی اتریش", "نقشه وین", "کسب و کار فارسی", "سوپر ایرانی", "رستوران ایرانی"]
  },
  {
    id: "translators",
    title: "فهرست مترجمان رسمی دادگستری اتریش (Gerichtsdolmetscher)",
    shortTitle: "مترجمان رسمی",
    category: "directory",
    icon: Globe,
    description: "مترجمان سوگندخورده زبان فارسی-آلمانی جهت ترجمه رسمی شناسنامه، مدارک تحصیلی و اسناد تجاری",
    keywords: ["مترجم رسمی", "ترجمه مدارک", "مترجم دادگستری وین", "ترجمه آلمانی", "تایید مدارک"]
  },
  {
    id: "experts",
    title: "شبکه کارشناسان، حسابداران و مشاوران امور مالیاتی",
    shortTitle: "کارشناسان و وکلا",
    category: "directory",
    icon: UserCheck,
    description: "ارتباط با مشاوران رسمی ثبت شرکت، امور اقامت، حسابداری و وکلای پایه یک دادگستری",
    keywords: ["وکیل ایرانی اتریش", "مشاور مالیاتی", "steuerberater", "ثبت شرکت اتریش"]
  },
  {
    id: "grocery",
    title: "فروشگاه‌های مواد غذایی ایرانی، نانوایی و قصابی",
    shortTitle: "فروشگاه‌های ایرانی",
    category: "directory",
    icon: ShoppingBag,
    description: "آدرس و ساعات کاری سوپرمارکت‌های ایرانی، برنج، زعفران، سبزیجات قورمه و نان تازه در اتریش",
    keywords: ["سوپرمارکت ایرانی وین", "نان بربری وین", "قصابی حلال", "سبزی قورمه"]
  },
  {
    id: "halal-directory",
    title: "دایرکتوری قصابی‌ها، رستوران‌ها و مراکز غذای حلال",
    shortTitle: "مراکز حلال",
    category: "directory",
    icon: Utensils,
    description: "فهرست مراکز دارای گواهی حلال در شهرهای وین، گراتس، لینتس و زالتسبورگ",
    keywords: ["غذای حلال اتریش", "قصابی حلال وین", "رستوران حلال", "گوشت حلال"]
  },
  {
    id: "organic-markets",
    title: "راهنمای بازارهای محلی و ارگانیک اتریش (Bauernmärkte)",
    shortTitle: "بازارهای ارگانیک",
    category: "directory",
    icon: ShoppingBag,
    description: "بازارهای میوه و تره‌بار تازه کشاورزان اتریشی، Naschmarkt، Brunnenmarkt و کالا‌های Bio",
    keywords: ["بازار محلی وین", "ناش مارکت", "محصولات ارگانیک", "bauernmarkt"]
  },
  {
    id: "schools",
    title: "دایرکتوری مدارس دولتی، بین‌المللی و ایرانی وین",
    shortTitle: "مدارس و آموزش",
    category: "directory",
    icon: GraduationCap,
    description: "راهنمای ثبت‌نام در دبستان (Volksschule)، دبیرستان (Gymnasium) و مدرسه ایرانی شهید باهنر وین",
    keywords: ["مدارس وین", "ثبت نام مدرسه اتریش", "مدرسه ایرانی وین", "volksschule", "gymnasium"]
  },
  {
    id: "kindergarten",
    title: "راهنمای ثبت‌نام در مهدکودک‌های رایگان شهرداری وین",
    shortTitle: "مهدکودک‌ها",
    category: "directory",
    icon: Smile,
    description: "دریافت شماره کودکستان (Kundennummer) از MA 10 و ثبت‌نام مهدکودک‌های با یارانه دولتی",
    keywords: ["مهدکودک وین", "ma10", "kindergarten", "یارانه مهدکودک", "مهد رایگان"]
  },

  // --- LIVING & HOUSING ---
  {
    id: "housesearch",
    title: "راهنمای جامع مسکن، قیمت‌ها، خوابگاه‌ها، خرید ملک و سفارت اتریش",
    shortTitle: "راهنمای جامع مسکن",
    category: "living",
    icon: Building,
    description: "تحلیل قیمت اجاره در ۹ ایالت، لیست خوابگاه‌های دانشجویی All-inclusive، قوانین خرید ملک و تعهدنامه مسکن سفارت",
    badge: "ویژه",
    popular: true,
    keywords: ["مسکن اتریش", "اجاره خانه در وین", "خوابگاه دانشجویی اتریش", "خرید ملک اتریش", "تعهدنامه مسکن سفارت", "Wohnrechtsvereinbarung", "کویشن", "kaution"]
  },
  {
    id: "willhaben",
    title: "راهنمای خرید، فروش و رایگان‌های وبسایت Willhaben",
    shortTitle: "خرید دست‌دوم Willhaben",
    category: "living",
    icon: ShoppingBag,
    description: "نکات خرید اثاثیه ارزان، ترفندهای جستجوی بخش Zu verschenken (رایگان) و ارتباط با فروشندگان",
    badge: "پربازدید",
    popular: true,
    keywords: ["ویلهابن", "willhaben", "خرید دست دوم اتریش", "اثاثیه رایگان", "لوازم خانه ارزان"]
  },
  {
    id: "willhaben-furniture",
    title: "تجهیز صفر تا صد خانه در اتریش با بودجه اقتصادی",
    shortTitle: "تجهیز ارزان خانه",
    category: "living",
    icon: ShoppingCart,
    description: "راهنمای خرید تخت، یخچال، مبل و لوازم برقی با کمترین هزینه از ایکیا و ویلهابن",
    keywords: ["لوازم منزل اتریش", "اثاث کشی وین", "چیدمان خانه ارزان", "ایکیا اتریش"]
  },
  {
    id: "betriebskosten",
    title: "راهنمای هزینه‌های شارژ ماهانه ساختمان (Betriebskosten)",
    shortTitle: "هزینه شارژ ساختمان",
    category: "living",
    icon: Building,
    description: "آشنایی با هزینه‌های آب، نظافت راه‌پله، گرمایش مرکزی (Fernwärme) و تفکیک قبض‌های غیرمنصفانه",
    keywords: ["شارژ ساختمان", "betriebskosten", "هزینه گرمایش", "برق و گاز اتریش"]
  },
  {
    id: "discounter-guide",
    title: "راهنمای خرید ارزان از سوپرمارکت‌های زنجیره‌ای (Hofer, Lidl, Penny)",
    shortTitle: "راهنمای سوپرمارکت‌ها",
    category: "living",
    icon: ShoppingCart,
    description: "مقایسه قیمت‌ها، تخفیف‌های آخر هفته، کارت‌های وفاداری Billa و Spar و صرفه‌جویی خوراک",
    keywords: ["سوپرمارکت هوفر", "لیدل اتریش", "hofer", "lidl", "billa", "spar", "خرید ارزان خوراک"]
  },
  {
    id: "district",
    title: "راهنمای مناطق ۲۳ گانه شهر وین (Bezirke)",
    shortTitle: "راهنمای مناطق وین",
    category: "living",
    icon: MapPin,
    description: "بررسی امنیت، آرامش، دسترسی به مترو و متوسط قیمت اجاره مسکن در مناطق ۱ تا ۲۳ وین",
    keywords: ["مناطق وین", "منطقه ۱ تا ۲۳", "بهترین منطقه وین", "محله های وین", "bezirke"]
  },
  {
    id: "neighborhood",
    title: "ابزار مقایسه محلات و کیفیت زندگی در اتریش",
    shortTitle: "مقایسه محلات",
    category: "living",
    icon: Map,
    description: "مقایسه آماری سرانه فضای سبز، مدارس، شلوغی و امنیت بین محله‌های مختلف",
    keywords: ["مقایسه محلات", "کیفیت زندگی وین", "امن ترین محله وین"]
  },
  {
    id: "contract-cancellation",
    title: "راهنمای فسخ قرارداد مسکن، اینترنت و باشگاه (Kündigung)",
    shortTitle: "فسخ قراردادها",
    category: "living",
    icon: FileText,
    description: "قوانین مهلت‌های قانونی فسخ، متن استاندارد آلمانی و پیشگیری از تمدید خودکار اشتراک‌ها",
    keywords: ["فسخ قرارداد", "kündigung", "کنسل کردن قرارداد", "فسخ اجاره"]
  },
  {
    id: "mutter-kind-pass",
    title: "راهنمای دفترچه مراقبت مادر و کودک (Eltern-Kind-Pass)",
    shortTitle: "دفترچه مادر و کودک",
    category: "living",
    icon: Smile,
    description: "چک‌لیست معاینات دوران بارداری و نوزادی جهت دریافت کمک‌هزینه کامل فرزند (Kinderbetreuungsgeld)",
    badge: "ضروری",
    keywords: ["مادر و کودک", "کمک هزینه زایمان", "mutter kind pass", "kinderbetreuungsgeld", "بارداری در اتریش"]
  },
  {
    id: "supplemental-insurance",
    title: "راهنمای بیمه‌های درمانی تکمیلی خصوصی (Sonderklasse)",
    shortTitle: "بیمه تکمیلی",
    category: "living",
    icon: ShieldCheck,
    description: "تفاوت بیمه دولتی و خصوصی، انتخاب پزشک اختصاصی در بیمارستان و پوشش هزینه‌های دندانپزشکی",
    keywords: ["بیمه تکمیلی اتریش", "sonderklasse", "بیمه خصوصی", "پزشک اختصاصی"]
  },
  {
    id: "liability-insurance",
    title: "بیمه مسئولیت مدنی خانوار (Haftpflichtversicherung)",
    shortTitle: "بیمه مسئولیت مدنی",
    category: "living",
    icon: ShieldCheck,
    description: "پوشش خسارت‌های ناخواسته به دیگران، خرابی آپارتمان اجاره‌ای و کلیدهای گم‌شده",
    keywords: ["بیمه مسئولیت", "haftpflicht", "خسارت مستاجر", "بیمه خانه"]
  },
  {
    id: "phishing-security",
    title: "راهنمای پیشگیری از کلاهبرداری‌های سایبری و پیامک‌های جعلی",
    shortTitle: "امنیت سایبری و فیشینگ",
    category: "living",
    icon: AlertOctagon,
    description: "شناسایی پیامک‌های جعلی اداره پست، پلیس فدرال و فینانس آنلاین و جلوگیری از سرقت بانکی",
    badge: "ضروری",
    keywords: ["کلاهبرداری پیامکی", "فیشینگ اتریش", "امنیت بانکی", "اس ام اس جعلی پست"]
  },
  {
    id: "stadtwanderwege",
    title: "راهنمای مسیرهای پیاده‌روی شهری و طبیعت وین (Stadtwanderwege)",
    shortTitle: "مسیرهای پیاده‌روی وین",
    category: "living",
    icon: Map,
    description: "۱۴ مسیر پیاده‌روی رسمی جنگل‌های وین، تپه‌های Kahlenberg و باغ‌های انگور آلپی",
    keywords: ["طبیعت وین", "کوهنوردی اتریش", "stadtwanderwege", "پیاده روی آلپ"]
  },
  {
    id: "opera-standing-tickets",
    title: "راهنمای خرید بلیت‌های ارزان و ایستاده اپرای ملی وین (Stehplatz)",
    shortTitle: "بلیت‌های ایستاده اپرا",
    category: "living",
    icon: Ticket,
    description: "خرید بلیت‌های اپرا و تئاتر دولتی وین از ۱۰ تا ۱۵ یورو برای علاقه‌مندان به هنر و موسیقی",
    keywords: ["اپرای وین", "بلیت ارزان اپرا", "stehplatz", "موسیقی کلاسیک وین"]
  },

  // --- LANGUAGE & EDUCATION ---
  {
    id: "german",
    title: "آکادمی زبان آلمانی بومی و اصطلاحات بقا (Survival German)",
    shortTitle: "آموزش زبان آلمانی",
    category: "language",
    icon: BookOpen,
    description: "آموزش دیالوگ‌های روزمره ادارات اتریش، اصطلاحات گویش وینی و فایل‌های صوتی استاندارد",
    badge: "پربازدید",
    popular: true,
    keywords: ["آموزش زبان آلمانی", "آلمانی اتریشی", "اصطلاحات وینی", "مکالمه آلمانی", "survival german"]
  },
  {
    id: "glossary",
    title: "واژه‌نامه اصطلاحات اداری، بانکی و حقوقی اتریش",
    shortTitle: "واژه‌نامه اداری",
    category: "language",
    icon: BookOpen,
    description: "فرهنگ جامع معانی لغات رایج در نامه‌های شهرداری، دارایی، دادگستری و فرم‌های دولتی",
    keywords: ["لغت نامه آلمانی", "اصطلاحات اداری اتریش", "ترجمه نامه شهرداری", "واژه نامه ملده"]
  },
  {
    id: "education-wifi-bfi",
    title: "راهنمای دوره‌های تخصصی و فنی‌وحرفه‌ای WIFI و BFI",
    shortTitle: "دوره‌های WIFI و BFI",
    category: "language",
    icon: GraduationCap,
    description: "آشنایی با دوره‌های مهارتی بازار کار اتریش و دریافت کمک‌هزینه و بن آموزشی از WAFF و AMS",
    badge: "ویژه",
    keywords: ["دوره فنی حرفه ای اتریش", "wifi اتریش", "bfi وین", "کمک هزینه waff", "آموزش شغلی"]
  },
  {
    id: "nostrification",
    title: "راهنمای معادل‌سازی مدارک دانشگاهی و شغلی (Nostrifizierung)",
    shortTitle: "معادل‌سازی مدارک",
    category: "language",
    icon: GraduationCap,
    description: "مراحل تایید مدارک پزشکان، مهندسان، پرستاران و معلمان در وزارت آموزش و دانشگاه‌های اتریش",
    keywords: ["معادل سازی مدرک", "نوستریفیکاسیون", "nostrifizierung", "تایید مدرک پزشکی وین"]
  },
  {
    id: "accounting-career",
    title: "نقشه راه ورود به بازار کار حسابداری و مالی در اتریش (Buchhalter)",
    shortTitle: "شغل حسابداری",
    category: "language",
    icon: Briefcase,
    description: "شرایط گذراندن آزمون حسابداری رسمی، نرم‌افزارهای رایج اتریش مانند BMD و میزان درآمد",
    keywords: ["حسابداری در اتریش", "buchhaltung", "نرم افزار bmd", "کار حسابدار در وین"]
  },

  // --- TRANSPORT & MOBILITY ---
  {
    id: "transport",
    title: "راهنمای حمل‌ونقل عمومی، مترو، تراموا و اتوبوس در اتریش",
    shortTitle: "حمل‌ونقل عمومی",
    category: "transport",
    icon: Train,
    description: "بلیت سالانه ۳۶۵ یورویی وین (Jahreskarte)، خطوط شبانه، بلیت‌های تک‌سفره و اپلیکیشن WienMobil",
    popular: true,
    keywords: ["مترو وین", "بلیت سالانه وین", "jahreskarte", "wien mobil", "حمل و نقل عمومی"]
  },
  {
    id: "klimaticket",
    title: "راهنمای کارت سراسری سفر در اتریش (KlimaTicket Österreich)",
    shortTitle: "کارت KlimaTicket",
    category: "transport",
    icon: Train,
    description: "استفاده نامحدود از تمام قطارها، اتوبوس‌ها و متروهای سراسر کشور با یک کارت تخفیف‌دار",
    badge: "ویژه",
    keywords: ["کلیما تیکت", "klimaticket", "قطار اتریش", "سفر در اتریش"]
  },
  {
    id: "obb-vorteilscard",
    title: "کارت تخفیف قطارهای فدرال اتریش (ÖBB Vorteilscard)",
    shortTitle: "کارت تخفیف ÖBB",
    category: "transport",
    icon: Train,
    description: "۵۰ درصد تخفیف بلیت قطار برای جوانان، دانشجویان، خانواده‌ها و افراد بالای ۶۵ سال",
    keywords: ["تخفیف قطار اتریش", "öbb vorteilscard", "سفر با قطار", "بلیت نصف قیمت"]
  },
  {
    id: "license",
    title: "راهنمای تبدیل و اخذ گواهینامه رانندگی اتریشی (Führerschein)",
    shortTitle: "گواهینامه رانندگی",
    category: "transport",
    icon: Car,
    description: "مهلت ۶ ماهه استفاده از گواهینامه بین‌المللی، معاینه چشم، کمک‌های اولیه و آزمون عملی",
    badge: "ضروری",
    keywords: ["گواهینامه اتریش", "تبدیل گواهینامه رانندگی", "führerschein", "امتحان رانندگی وین"]
  },
  {
    id: "theory-test",
    title: "شبیه‌ساز و نمونه سوالات آزمون تئوری گواهینامه اتریش",
    shortTitle: "آزمون تئوری رانندگی",
    category: "transport",
    icon: Car,
    description: "تمرین تست‌های ترافیک، حق تقدم، تابلوهای راهنمایی و سیستم آزمون کامپیوتری",
    keywords: ["تست رانندگی اتریش", "سوالات تئوری رانندگی", "آزمون آیین نامه اتریش"]
  },
  {
    id: "inspection",
    title: "راهنمای معاینه فنی دوره‌ای خودرو (Pickerl §57a)",
    shortTitle: "معاینه فنی Pickerl",
    category: "transport",
    icon: Car,
    description: "قانون ۳-۲-۱ برای معاینه فنی خودروهای شخصی در باشگاه‌های ÖAMTC و ARBÖ",
    keywords: ["معاینه فنی اتریش", "pickerl", "پیکرل ماشین", "öamtc", "arbö"]
  },
  {
    id: "parking",
    title: "راهنمای برچسب و قوانین پارک خودرو در وین (Parkpickerl)",
    shortTitle: "قوانین پارک خودرو",
    category: "transport",
    icon: MapPin,
    description: "هزینه برچسب سالانه پارک ساکنان، مناطق پارک کوتاه‌مدت (Kurzparkzone) و پارکینگ‌های P+R",
    keywords: ["پارک ماشین وین", "parkpickerl", "برچسب پارک", "پارکینگ شبانه روزی"]
  },
  {
    id: "traffic-fine-appeal",
    title: "راهنمای اعتراض به جریمه‌های رانندگی و دوربین‌های سرعت",
    shortTitle: "اعتراض به جریمه رانندگی",
    category: "transport",
    icon: AlertOctagon,
    description: "مهلت ۲ هفته‌ای پرداخت Anonymverfügung، فرم اعتراض قانونی و جلوگیری از افزایش جریمه",
    keywords: ["جریمه رانندگی اتریش", "اعتراض به جریمه", "anonymverfügung", "دوربین سرعت وین"]
  },

  // --- COMMUNITY & CARPOOL ---
  {
    id: "carpool",
    title: "همسفریاب فرودگاه وین، حمل چمدان و کلوپ همیاری",
    shortTitle: "همسفریاب فرودگاه",
    category: "community",
    icon: Users,
    description: "پلتفرم اشتراک تاکسی فرودگاه شوخات (Schwechat)، ارسال بار مسافری تهران-وین و گفتگوی هموطنان",
    badge: "پربازدید",
    popular: true,
    keywords: ["همسفر وین", "تاکسی فرودگاه وین", "حمل بار مسافری", "چمدان تهران وین", "ارسال بسته"]
  },
  {
    id: "stories",
    title: "تجربه‌سرا: داستان‌ها و تجارب واقعی مهاجرت به اتریش",
    shortTitle: "تجربه‌سرا",
    category: "community",
    icon: BookOpen,
    description: "خاطرات و درس‌آموخته‌های هموطنان از مصاحبه سفارت، اولین روزهای ورود، پیدا کردن کار و زبان",
    popular: true,
    keywords: ["تجربه مهاجرت اتریش", "داستان زندگی وین", "چالش های اقامت اتریش"]
  },
  {
    id: "holidays",
    title: "تقویم رسمی تعطیلات عمومی و مناسبت‌های اتریش",
    shortTitle: "تعطیلات رسمی اتریش",
    category: "community",
    icon: Calendar,
    description: "فهرست تعطیلات ملی، مذهبی، تقویم مدارس و روزهای بسته بودن ادارات و فروشگاه‌ها",
    keywords: ["تعطیلات اتریش", "روزهای تعطیل وین", "تعطیلی مدارس اتریش", "feiertage"]
  },
  {
    id: "trust-examples",
    title: "نمونه‌های ویژه، کارت‌های اقامتی و پذیرش‌های تحصیلی اتریش",
    shortTitle: "کارت‌های اقامت و پذیرش‌ها",
    category: "community",
    icon: Sparkles,
    description: "نمایش تعاملی کارت‌های اقامت اتریش (RWR, RWR Plus, دانشجویی، بلوکارت)، نامه‌های پذیرش دانشگاهی (Uni Wien, TU Wien) و آناتومی حقوقی مدارک",
    keywords: ["کارت اقامت اتریش", "پذیرش تحصیلی", "Aufenthaltstitel", "Zulassungsbescheid", "کارت قرمز سفید قرمز", "پذیرش دانشگاه وین", "نمونه های ویژه", "ویزای اتریش", "اعتماد اتریش نشین"]
  },
  {
    id: "volunteer",
    title: "شبکه فعالیت‌های داوطلبانه و کارهای عام‌المنفعه ایرانیان",
    shortTitle: "کارهای داوطلبانه",
    category: "community",
    icon: Heart,
    description: "فرصت‌های همیاری در انجمن‌های خیریه اتریش، کار خیر و تقویت ارتباطات اجتماعی",
    keywords: ["کار داوطلبانه", "خیریه اتریش", "volunteer", "همیاری اجتماعی"]
  },

  // --- SMART SYSTEMS ---
  {
    id: "smart",
    title: "درگاه سامانه‌های محاسباتی و هوشمند اتریش‌نشین",
    shortTitle: "سامانه‌های هوشمند",
    category: "smart",
    icon: Sparkles,
    description: "شبیه‌ساز امتیاز کارت سرخ-سفید-سرخ، تمکن مالی ماهانه ASVG، کمک‌هزینه مسکن و معادل‌سازی",
    badge: "هوشمند",
    popular: true,
    keywords: ["سامانه هوشمند", "محاسبه تمکن مالی", "asvg", "دستیار اقامت"]
  },
  {
    id: "doccheck",
    title: "چک‌لیست اولیه و اعتبارسنجی مدارک سفارت و شهرداری",
    shortTitle: "بررسی مدارک اولیه",
    category: "smart",
    icon: CheckSquare,
    description: "بررسی اصالت و کامل بودن اسناد، ترجمه رسمی، تاییدیه آپوستیل و گردش حساب بانکی",
    keywords: ["مدارک سفارت اتریش", "چک لیست ویزا", "آپوستیل مدارک", "ترجمه شناسنامه"]
  },

  // --- ABOUT & CONTACT ---
  {
    id: "about",
    title: "درباره پورتال مستقل اتریش‌نشین، راه‌های تماس و تایید صلاحیت",
    shortTitle: "درباره و تماس مستقیم",
    category: "about",
    icon: MessageSquare,
    description: "اطلاعات شفاف درباره اهداف کانون، شماره تماس مستقیم اتریش و ایران، پشتیبانی واتس‌اپ و دفتر وین",
    keywords: ["تماس با اتریش نشین", "تلفن کانون اتریش", "واتساپ اتریش", "درباره ما"]
  }
];

export function getPageItem(id: string): SuperAppPageItem | undefined {
  return SUPER_APP_PAGES.find(p => p.id === id);
}

export function getCategory(id: string): SuperAppCategory | undefined {
  return SUPER_APP_CATEGORIES.find(c => c.id === id);
}

export function getPagesByCategory(categoryId: string): SuperAppPageItem[] {
  if (categoryId === "all") return SUPER_APP_PAGES;
  return SUPER_APP_PAGES.filter(p => p.category === categoryId);
}

export function getRelatedPages(pageId: string, limit: number = 4): SuperAppPageItem[] {
  const page = getPageItem(pageId);
  if (!page) return SUPER_APP_PAGES.slice(0, limit);
  return SUPER_APP_PAGES
    .filter(p => p.category === page.category && p.id !== pageId)
    .slice(0, limit);
}
