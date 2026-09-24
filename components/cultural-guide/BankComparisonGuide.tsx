import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  Search,
  ArrowUpDown,
  Landmark,
  ListChecks,
  HelpCircle,
  Star,
  Layers,
  Building2,
  Smartphone,
  Home,
  Wallet,
  Check,
  X,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  FileText,
  Info,
  Euro,
  SearchX,
  MessageCircle,
} from "lucide-react";

interface BankScores {
  fees: number;
  support: number;
  online: number;
  credit: number;
  intl: number;
}

interface BankFeatures {
  onlineOpen: boolean | "partial";
  meldezettel: boolean;
  freeCard: boolean | "partial";
  english: boolean | "partial";
  mortgage: boolean;
  cheapTransfer: boolean;
  mobileApp: boolean;
  passportOnly: boolean;
}

interface Bank {
  id: string;
  name: string;
  tagline: string;
  type: "traditional" | "neo";
  typeLabel: string;
  color: string;
  fees: string;
  monthlyFee: string;
  support: string;
  credit: boolean;
  creditNote: string;
  app: string;
  opening: string;
  bestFor: string;
  scores: BankScores;
  pros: string[];
  cons: string[];
  features: BankFeatures;
}

const banks: Bank[] = [
  {
    id: "erste",
    name: "Erste Bank",
    tagline: "گروه Sparkasse – بزرگ‌ترین شبکه بانکی اتریش",
    type: "traditional",
    typeLabel: "بانک سنتی",
    color: "#0f766e",
    fees: "متوسط",
    monthlyFee: "۵ تا ۱۲ یورو",
    support: "حضوری + آنلاین",
    credit: true,
    creditNote: "وام مسکن، خودرو و اعتبار شخصی",
    app: "George",
    opening: "آنلاین + حضوری",
    bestFor: "کسانی که وام مسکن و پشتیبانی حضوری می‌خواهند",
    scores: { fees: 62, support: 95, online: 82, credit: 95, intl: 45 },
    pros: [
      "گسترده‌ترین شبکه شعبه و ATM در اتریش",
      "اپلیکیشن George با رابط انگلیسی",
      "بهترین گزینه برای وام مسکن و Bausparen",
    ],
    cons: ["کارمزد ماهانه حساب", "برای برخی خدمات باید حضوری مراجعه کنید"],
    features: {
      onlineOpen: "partial",
      meldezettel: true,
      freeCard: "partial",
      english: true,
      mortgage: true,
      cheapTransfer: false,
      mobileApp: true,
      passportOnly: false,
    },
  },
  {
    id: "bankaustria",
    name: "Bank Austria",
    tagline: "عضو گروه UniCredit – بانکی با پشتیبانی چندزبانه",
    type: "traditional",
    typeLabel: "بانک سنتی",
    color: "#b91c1c",
    fees: "متوسط",
    monthlyFee: "۶ تا ۱۴ یورو",
    support: "حضوری + آنلاین",
    credit: true,
    creditNote: "وام مسکن، خودرو و اعتبار شخصی",
    app: "MobileBanking",
    opening: "حضوری + نیمه‌آنلاین",
    bestFor: "مهاجرانی که به پشتیبانی چندزبانه و شعب زیاد نیاز دارند",
    scores: { fees: 58, support: 88, online: 78, credit: 90, intl: 45 },
    pros: [
      "شعب متعدد در تمام اتریش",
      "خدمات چندزبانه در شعب بزرگ",
      "محصولات متنوع سرمایه‌گذاری",
    ],
    cons: ["کارمزد حساب نسبتاً بالا", "فرایند افتتاح حساب کمی کند"],
    features: {
      onlineOpen: "partial",
      meldezettel: true,
      freeCard: false,
      english: true,
      mortgage: true,
      cheapTransfer: false,
      mobileApp: true,
      passportOnly: false,
    },
  },
  {
    id: "raiffeisen",
    name: "Raiffeisenbank",
    tagline: "بانک منطقه‌ای با ریشه در ایالت‌های مختلف اتریش",
    type: "traditional",
    typeLabel: "بانک سنتی",
    color: "#ca8a04",
    fees: "متوسط",
    monthlyFee: "۴ تا ۱۰ یورو",
    support: "حضوری + آنلاین",
    credit: true,
    creditNote: "وام مسکن و کشاورزی",
    app: "Mein ELBA",
    opening: "حضوری",
    bestFor: "ساکنان شهرهای کوچک و مناطق روستایی اتریش",
    scores: { fees: 60, support: 85, online: 70, credit: 88, intl: 42 },
    pros: [
      "حضور قوی در شهرهای کوچک",
      "شرایط مناسب برای وام مسکن منطقه‌ای",
      "پشتیبانی محلی و شخصی",
    ],
    cons: ["اپلیکیشن موبایل ضعیف‌تر از رقبا", "افتتاح حساب فقط حضوری"],
    features: {
      onlineOpen: false,
      meldezettel: true,
      freeCard: "partial",
      english: "partial",
      mortgage: true,
      cheapTransfer: false,
      mobileApp: true,
      passportOnly: false,
    },
  },
  {
    id: "bawag",
    name: "BAWAG P.S.K.",
    tagline: "بانک مقرون‌به‌صرفه با خدمات گسترده خودپرداز",
    type: "traditional",
    typeLabel: "بانک سنتی",
    color: "#1d4ed8",
    fees: "کم تا متوسط",
    monthlyFee: "۰ تا ۸ یورو",
    support: "حضوری + آنلاین",
    credit: true,
    creditNote: "وام شخصی و مسکن",
    app: "BAWAG Banking",
    opening: "آنلاین + حضوری",
    bestFor: "کسانی که حساب ارزان با دسترسی به شعب می‌خواهند",
    scores: { fees: 72, support: 80, online: 75, credit: 82, intl: 45 },
    pros: [
      "پلن‌های ارزان و حتی رایگان",
      "دسترسی به خودپردازهای P.S.K.",
      "افتتاح حساب نیمه‌آنلاین",
    ],
    cons: ["شبکه شعب کوچک‌تر از Erste", "شرایط وام سخت‌گیرانه‌تر"],
    features: {
      onlineOpen: "partial",
      meldezettel: true,
      freeCard: true,
      english: "partial",
      mortgage: true,
      cheapTransfer: false,
      mobileApp: true,
      passportOnly: false,
    },
  },
  {
    id: "n26",
    name: "N26",
    tagline: "نئوبانک آلمانی با افتتاح حساب کاملاً آنلاین",
    type: "neo",
    typeLabel: "نئوبانک",
    color: "#0f172a",
    fees: "کم",
    monthlyFee: "۰ تا ۱۶ یورو",
    support: "آنلاین (چت و ایمیل)",
    credit: false,
    creditNote: "بدون وام مسکن",
    app: "N26 App",
    opening: "کاملاً آنلاین",
    bestFor: "کاربران حرفه‌ای موبایل و سفرهای بین‌المللی",
    scores: { fees: 88, support: 62, online: 96, credit: 20, intl: 80 },
    pros: [
      "افتتاح حساب در چند دقیقه با پاسپورت",
      "اپلیکیشن فوق‌العاده سریع",
      "هزینه ارسال و دریافت پول بین‌المللی پایین",
    ],
    cons: [
      "بدون وام مسکن و خدمات حضوری",
      "پشتیبانی فقط آنلاین",
      "محدودیت برای واریز حقوق نقدی",
    ],
    features: {
      onlineOpen: true,
      meldezettel: false,
      freeCard: true,
      english: true,
      mortgage: false,
      cheapTransfer: true,
      mobileApp: true,
      passportOnly: true,
    },
  },
  {
    id: "revolut",
    name: "Revolut",
    tagline: "فین‌تک بین‌المللی با بهترین نرخ ارز",
    type: "neo",
    typeLabel: "نئوبانک",
    color: "#7c3aed",
    fees: "رایگان / کم",
    monthlyFee: "۰ تا ۱۷ یورو",
    support: "آنلاین",
    credit: false,
    creditNote: "بدون وام مسکن",
    app: "Revolut App",
    opening: "کاملاً آنلاین",
    bestFor: "افراد پرسفر، فریلنسرها و کاربران ارز دیجیتال",
    scores: { fees: 95, support: 68, online: 98, credit: 25, intl: 95 },
    pros: [
      "نرخ تبدیل ارز بسیار نزدیک به بازار",
      "کارت مجازی رایگان و امنیت بالا",
      "امکانات سرمایه‌گذاری و کریپتو",
    ],
    cons: [
      "مجوز بانکی کامل در اتریش ندارد",
      "پشتیبانی فارسی ندارد",
      "مناسب برای وام مسکن نیست",
    ],
    features: {
      onlineOpen: true,
      meldezettel: false,
      freeCard: true,
      english: true,
      mortgage: false,
      cheapTransfer: true,
      mobileApp: true,
      passportOnly: true,
    },
  },
];

interface FeatureRow {
  key: keyof BankFeatures;
  label: string;
}

const featureRows: FeatureRow[] = [
  { key: "onlineOpen", label: "افتتاح حساب کاملاً آنلاین" },
  { key: "meldezettel", label: "نیاز به Meldezettel (گواهی اقامت)" },
  { key: "freeCard", label: "کارت بانکی بدون هزینه سالانه" },
  { key: "english", label: "پشتیبانی انگلیسی" },
  { key: "mortgage", label: "امکان وام مسکن" },
  { key: "cheapTransfer", label: "انتقال بین‌المللی ارزان" },
  { key: "mobileApp", label: "اپلیکیشن موبایل حرفه‌ای" },
  { key: "passportOnly", label: "افتتاح با پاسپورت بدون اقامت" },
];

const faqs = [
  {
    q: "آیا بدون اقامت اتریش می‌توان حساب بانکی باز کرد؟",
    a: "بله. نئوبانک‌هایی مثل N26 و Revolut امکان افتتاح حساب با پاسپورت و بدون نیاز به Meldezettel را فراهم می‌کنند. اما برای بانک‌های سنتی مثل Erste Bank معمولاً به گواهی اقامت (Meldezettel) نیاز دارید.",
  },
  {
    q: "کدام بانک برای ایرانی‌ها در اتریش بهتر است؟",
    a: "اگر به وام مسکن و پشتیبانی حضوری نیاز دارید، Erste Bank بهترین گزینه است. اگر سرعت و کارمزد پایین اولویت شماست، N26 یا Revolut انتخاب بهتری هستند. بسیاری از ایرانی‌ها ترکیبی از یک بانک سنتی و یک نئوبانک را استفاده می‌کنند.",
  },
  {
    q: "تفاوت نئوبانک و بانک سنتی چیست؟",
    a: "بانک‌های سنتی شعبه فیزیکی، پشتیبانی حضوری و خدمات وام کامل دارند اما کارمزد بالاتری می‌گیرند. نئوبانک‌ها کاملاً آنلاین، ارزان‌تر و سریع‌تر هستند اما وام مسکن ارائه نمی‌دهند و پشتیبانی فقط از طریق چت است.",
  },
  {
    q: "کارمزد ماهانه بانک‌های اتریش چقدر است؟",
    a: "بانک‌های سنتی معمولاً بین ۵ تا ۱۴ یورو در ماه کارمزد می‌گیرند که شامل کارت، اپلیکیشن و خدمات پایه است. نئوبانک‌ها پلن رایگان دارند و پلن‌های حرفه‌ای‌شان از ۸ تا ۱۷ یورو متغیر است.",
  },
  {
    q: "برای دریافت وام مسکن در اتریش به کدام بانک مراجعه کنم؟",
    a: "Erste Bank، Bank Austria و Raiffeisenbank بهترین گزینه‌ها برای وام مسکن هستند. برای دریافت وام معمولاً به اقامت دائم یا بلندمدت، درآمد پایدار، سابقه اعتباری و حداقل ۲۰٪ آورده نیاز دارید.",
  },
  {
    q: "آیا می‌توان همزمان در چند بانک حساب داشت؟",
    a: "بله، محدودیتی وجود ندارد و بسیاری از افراد یک حساب اصلی در بانک سنتی و یک حساب جانبی در نئوبانک برای سفر و خرید ارزی نگه می‌دارند. فقط به کارمزد ماهانه هر حساب توجه کنید.",
  },
  {
    q: "اعتبارسنجی KSV در اتریش چیست؟",
    a: "KSV1870 سامانه اعتبارسنجی اتریش است که سابقه مالی شما را ثبت می‌کند. پرداخت به‌موقع اقساط و نداشتن بدهی معوق، امتیاز اعتباری شما را برای دریافت وام بالا می‌برد.",
  },
  {
    q: "برای افتتاح حساب چه مدارکی لازم است؟",
    a: "معمولاً پاسپورت معتبر، Meldezettel، و برای برخی بانک‌ها اثبات درآمد یا قرارداد کار. نئوبانک‌ها فقط پاسپورت و یک شماره تلفن اتریشی می‌خواهند.",
  },
];

const tabsContent = [
  {
    title: "مدارک لازم",
    icon: FileText,
    items: [
      {
        title: "پاسپورت معتبر",
        desc: "حداقل ۶ ماه اعتبار باقی‌مانده داشته باشد.",
      },
      {
        title: "Meldezettel",
        desc: "گواهی ثبت آدرس که از شهرداری (Magistrat) دریافت می‌کنید.",
      },
      {
        title: "اثبات درآمد یا قرارداد کار",
        desc: "برای افتتاح حساب حقوقی و دریافت وام الزامی است.",
      },
      {
        title: "شماره تلفن اتریشی",
        desc: "برای تأیید هویت و دریافت کدهای امنیتی.",
      },
      {
        title: "کارت اقامت (در صورت وجود)",
        desc: "برای بانک‌های سنتی معمولاً درخواست می‌شود.",
      },
    ],
  },
  {
    title: "نکات برای ایرانیان",
    icon: Info,
    items: [
      {
        title: "ترکیب هوشمندانه حساب‌ها",
        desc: "یک حساب سنتی برای حقوق و وام + یک نئوبانک برای سفر و خرید ارزی.",
      },
      {
        title: "دقت در انتقال وجه از ایران",
        desc: "تحریم‌ها می‌تواند باعث مسدودی حساب شود؛ حتماً پیش از مبالغ بزرگ با بانک هماهنگ کنید.",
      },
      {
        title: "استفاده از اپلیکیشن",
        desc: "فعال‌سازی اپلیکیشن بانک، بسیاری از مراجعات حضوری و هزینه‌ها را حذف می‌کند.",
      },
      {
        title: "حفظ سابقه پرداخت",
        desc: "پرداخت به‌موقع قبوض، امتیاز اعتباری شما را در KSV1870 بالا می‌برد.",
      },
      {
        title: "زبان خدمات",
        desc: "در شعب بزرگ شهرهای وین، گراتس و لینتس معمولاً پشتیبانی انگلیسی وجود دارد.",
      },
    ],
  },
  {
    title: "هزینه‌های پنهان",
    icon: Euro,
    items: [
      {
        title: "کارمزد ATM خارج از شبکه",
        desc: "برداشت از خودپردازهای مستقل (مانند Euronet) می‌تواند تا ۵ یورو هزینه داشته باشد.",
      },
      {
        title: "هزینه انتقال بین‌المللی",
        desc: "در بانک‌های سنتی هر انتقال SWIFT می‌تواند ۱۵ تا ۳۰ یورو کارمزد داشته باشد.",
      },
      {
        title: "کارمزد کارت اضافه",
        desc: "دریافت کارت دوم یا کارت اعتباری معمولاً هزینه ماهانه یا سالانه جداگانه دارد.",
      },
      {
        title: "هزینه صدور مجدد کارت",
        desc: "در صورت مفقودی کارت، هزینه صدور مجدد در بانک سنتی حدود ۱۵ یورو است.",
      },
    ],
  },
];

const filters = [
  { id: "all", label: "همه بانک‌ها", icon: Layers },
  { id: "traditional", label: "بانک سنتی", icon: Building2 },
  { id: "neo", label: "نئوبانک", icon: Smartphone },
  { id: "credit", label: "با امکان وام", icon: Home },
  { id: "cheap", label: "کم‌کارمزد", icon: Wallet },
];

function overallScore(bank: Bank): number {
  const s = bank.scores;
  return Math.round((s.fees + s.support + s.online + s.credit + s.intl) / 5);
}

function faNum(n: number | string): string {
  return Number(n).toLocaleString("fa-IR");
}

export default function BankComparisonGuide() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("overall");
  const [searchQuery, setSearchQuery] = useState("");
  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredBanks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = banks.filter((b) => {
      const matchQ =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.typeLabel.toLowerCase().includes(q);

      const matchF =
        activeFilter === "all"
          ? true
          : activeFilter === "traditional"
          ? b.type === "traditional"
          : activeFilter === "neo"
          ? b.type === "neo"
          : activeFilter === "credit"
          ? b.credit === true
          : activeFilter === "cheap"
          ? b.scores.fees >= 70
          : true;

      return matchQ && matchF;
    });

    list.sort((a, b) => {
      if (activeSort === "overall") return overallScore(b) - overallScore(a);
      if (activeSort === "fees") return b.scores.fees - a.scores.fees;
      if (activeSort === "support") return b.scores.support - a.scores.support;
      if (activeSort === "online") return b.scores.online - a.scores.online;
      return 0;
    });

    return list;
  }, [searchQuery, activeFilter, activeSort]);

  const renderFeatureValue = (v: boolean | "partial") => {
    if (v === true) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600">
          <Check className="w-4 h-4" />
        </span>
      );
    }
    if (v === false) {
      return (
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-rose-50 text-rose-500">
          <X className="w-4 h-4" />
        </span>
      );
    }
    return (
      <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1">
        جزئی
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 text-stone-800" dir="rtl">
      {/* Header / Hero */}
      <header className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/80 shadow-sm p-6 md:p-8 mb-8">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white shadow-md">
                <svg
                  viewBox="0 0 30 21"
                  className="w-full h-full"
                  role="img"
                  aria-label="پرچم اتریش"
                >
                  <rect width="30" height="21" fill="#ED2939" />
                  <rect y="7" width="30" height="7" fill="#fff" />
                </svg>
              </div>
              <span className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-emerald-500 grid place-items-center ring-2 ring-white">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </span>
            </div>
            <div className="leading-tight">
              <div className="font-black text-stone-900 text-xl">اتریش‌نشین</div>
              <div className="text-[11px] text-stone-500 tracking-wide uppercase">
                Austria Resident Guide
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-full px-4 py-2">
            <BadgeCheck className="w-4 h-4 text-emerald-500" />
            <span>آخرین بروزرسانی: پاییز ۲۰۲۵</span>
          </div>
        </div>

        <div className="relative mt-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-100 rounded-full px-3 py-1 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            راهنمای تخصصی بانکداری در اتریش
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-stone-900 leading-tight mb-3">
            مقایسه بانک‌های اتریش برای ایرانیان
          </h1>
          <p className="text-stone-600 max-w-2xl text-sm leading-relaxed">
            انتخاب بانک مناسب در اتریش، اولین و مهم‌ترین قدم مالی برای شروع اقامت است. در این راهنما ۶ بانک برتر را بر اساس کارمزد، پشتیبانی، امکان وام و شرایط افتتاح حساب برای مهاجران ایرانی بررسی کرده‌ایم.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-stone-100">
          <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-100">
            <Landmark className="w-5 h-5 mx-auto mb-1 text-teal-600" />
            <div className="text-xl font-black text-stone-900">{faNum(banks.length)} بانک</div>
            <div className="text-xs text-stone-500">بررسی کامل</div>
          </div>
          <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-100">
            <ListChecks className="w-5 h-5 mx-auto mb-1 text-teal-600" />
            <div className="text-xl font-black text-stone-900">{faNum(featureRows.length)} معیار</div>
            <div className="text-xs text-stone-500">ماتریس ویژگی‌ها</div>
          </div>
          <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-100">
            <HelpCircle className="w-5 h-5 mx-auto mb-1 text-teal-600" />
            <div className="text-xl font-black text-stone-900">{faNum(faqs.length)} سوال</div>
            <div className="text-xs text-stone-500">پاسخ تخصصی</div>
          </div>
          <div className="bg-stone-50 rounded-2xl p-3 text-center border border-stone-100">
            <Star className="w-5 h-5 mx-auto mb-1 text-amber-500" />
            <div className="text-xl font-black text-stone-900">۱۰۰٪</div>
            <div className="text-xs text-stone-500">مستقل و کاربردی</div>
          </div>
        </div>
      </header>

      {/* Filters & Search */}
      <section className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی بانک، نئوبانک یا ویژگی..."
              className="w-full rounded-2xl border border-stone-200 bg-white pr-11 pl-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all"
            />
          </div>
          <div className="relative">
            <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="w-full md:w-56 appearance-none rounded-2xl border border-stone-200 bg-white pr-11 pl-4 py-2.5 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all cursor-pointer"
            >
              <option value="overall">مرتب‌سازی: امتیاز کلی</option>
              <option value="fees">کم‌ترین کارمزد</option>
              <option value="support">بهترین پشتیبانی</option>
              <option value="online">بهترین بانکداری آنلاین</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const IconComp = f.icon;
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-4 py-2 border transition-all duration-200 ${
                  isActive
                    ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="grid md:grid-cols-2 gap-5 mb-10">
        {filteredBanks.length === 0 ? (
          <div className="md:col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-stone-300">
            <SearchX className="w-10 h-10 text-stone-300 mx-auto mb-2" />
            <p className="text-stone-500 font-bold text-sm">بانکی با این مشخصات پیدا نشد</p>
            <p className="text-xs text-stone-400 mt-1">فیلترها یا عبارت جستجو را تغییر دهید</p>
          </div>
        ) : (
          filteredBanks.map((b) => {
            const score = overallScore(b);
            return (
              <article
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl"
                  style={{ background: b.color }}
                />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl grid place-items-center text-white font-black text-sm shrink-0 shadow-sm"
                      style={{ background: b.color }}
                    >
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-stone-900 text-base leading-tight">{b.name}</h3>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 ${
                          b.type === "neo"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-teal-50 text-teal-700"
                        }`}
                      >
                        {b.typeLabel}
                      </span>
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="text-xl font-black text-stone-900">{faNum(score)}</div>
                    <div className="text-[10px] text-stone-400">امتیاز کلی</div>
                  </div>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed mb-4">{b.tagline}</p>

                <div className="space-y-2 mb-4">
                  {(["fees", "support", "online", "credit"] as const).map((k) => {
                    const labels: Record<string, string> = {
                      fees: "کارمزد مناسب",
                      support: "پشتیبانی",
                      online: "بانکداری آنلاین",
                      credit: "وام و اعتبار",
                    };
                    const sc = b.scores[k];
                    return (
                      <div key={k}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-stone-500">{labels[k]}</span>
                          <span className="font-bold text-stone-700">{faNum(sc)}٪</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${sc}%`, background: b.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 rounded-xl p-3 mb-3">
                  <Wallet className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>
                    کارمزد ماهانه: <strong className="text-stone-700">{b.monthlyFee}</strong>
                  </span>
                </div>

                <div className="text-[11px] text-stone-500 leading-relaxed">
                  <span className="font-bold text-stone-700">مناسب برای: </span>
                  {b.bestFor}
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Comparison Table */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-stone-900 grid place-items-center">
            <Landmark className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-stone-900">جدول مقایسه کامل</h2>
            <p className="text-xs text-stone-500">برای مشاهده مزایا و معایب، روی هر ردیف کلیک کنید</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-right border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs text-stone-500">
                <th className="p-3.5 font-bold">نام بانک</th>
                <th className="p-3.5 font-bold">نوع</th>
                <th className="p-3.5 font-bold">کارمزد</th>
                <th className="p-3.5 font-bold">پشتیبانی</th>
                <th className="p-3.5 font-bold">امکان وام</th>
                <th className="p-3.5 font-bold">امتیاز</th>
                <th className="p-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBanks.map((b) => {
                const isOpen = openRowId === b.id;
                return (
                  <React.Fragment key={b.id}>
                    <tr
                      onClick={() => setOpenRowId(isOpen ? null : b.id)}
                      className="border-b border-stone-100 hover:bg-stone-50/80 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-lg grid place-items-center text-white text-[10px] font-black shrink-0"
                            style={{ background: b.color }}
                          >
                            {b.name.charAt(0)}
                          </span>
                          <span className="font-bold text-stone-900 text-sm">{b.name}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-xs text-stone-500">{b.typeLabel}</td>
                      <td className="p-3.5 text-xs text-stone-600 font-medium">{b.fees}</td>
                      <td className="p-3.5 text-xs text-stone-600">{b.support}</td>
                      <td className="p-3.5">
                        {b.credit ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-rose-50 text-rose-500">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-black text-stone-900 text-sm">
                        {faNum(overallScore(b))}
                      </td>
                      <td className="p-3.5 text-stone-400">
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-stone-50/70 border-b border-stone-100">
                        <td colSpan={7} className="p-5">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs font-black text-emerald-700 mb-2 flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4" /> مزایا
                              </h4>
                              <ul className="space-y-1.5">
                                {b.pros.map((p, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-stone-600 flex items-start gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-rose-600 mb-2 flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4" /> معایب
                              </h4>
                              <ul className="space-y-1.5">
                                {b.cons.map((c, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-stone-600 flex items-start gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-300 mt-1.5 shrink-0" />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap gap-2 text-[11px]">
                            <span className="bg-white border border-stone-200 rounded-lg px-3 py-1 text-stone-600">
                              اپلیکیشن: <strong className="text-stone-800">{b.app}</strong>
                            </span>
                            <span className="bg-white border border-stone-200 rounded-lg px-3 py-1 text-stone-600">
                              افتتاح حساب: <strong className="text-stone-800">{b.opening}</strong>
                            </span>
                            <span className="bg-white border border-stone-200 rounded-lg px-3 py-1 text-stone-600">
                              وام: <strong className="text-stone-800">{b.creditNote}</strong>
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature Matrix */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-teal-600 grid place-items-center">
            <ListChecks className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-stone-900">ماتریس ویژگی‌ها</h2>
            <p className="text-xs text-stone-500">بررسی دقیق ۸ ویژگی کلیدی برای هر بانک</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table className="w-full text-right border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs text-stone-500">
                <th className="p-3.5 font-bold sticky right-0 bg-stone-50 z-10">ویژگی</th>
                {filteredBanks.map((b) => (
                  <th key={b.id} className="p-3.5 font-bold text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-5 h-5 rounded-md grid place-items-center text-white text-[9px] font-black"
                        style={{ background: b.color }}
                      >
                        {b.name.charAt(0)}
                      </span>
                      {b.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-stone-100 hover:bg-stone-50/60 transition-colors"
                >
                  <td className="p-3.5 text-xs font-bold text-stone-700 sticky right-0 bg-white z-10 whitespace-nowrap">
                    {row.label}
                  </td>
                  {filteredBanks.map((b) => (
                    <td key={b.id} className="p-3.5 text-center">
                      {renderFeatureValue(b.features[row.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabs / Helpful Guides */}
      <section className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {tabsContent.map((t, idx) => {
            const TabIcon = t.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 text-xs font-bold rounded-xl px-4 py-2.5 border transition-all ${
                  isActive
                    ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                    : "bg-white text-stone-600 border-stone-200 hover:border-teal-300 hover:text-teal-700"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {t.title}
              </button>
            );
          })}
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {tabsContent[activeTab].items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-100 bg-stone-50/60"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 grid place-items-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-xs mb-1">{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500 grid place-items-center">
            <HelpCircle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-black text-stone-900">سوالات متداول</h2>
            <p className="text-xs text-stone-500">پاسخ به پرتکرارترین سوالات ایرانیان درباره بانکداری در اتریش</p>
          </div>
        </div>
        <div className="space-y-2.5">
          {faqs.map((f, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-right"
                >
                  <span className="font-bold text-stone-900 text-xs md:text-sm flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-500 grid place-items-center text-[10px] font-black shrink-0 mt-0.5">
                      {faNum(idx + 1)}
                    </span>
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pr-12 text-xs text-stone-600 leading-relaxed border-t border-stone-50 pt-2">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Advice Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-stone-900 p-6 md:p-8 text-center text-white">
        <h3 className="text-lg md:text-xl font-black mb-2">هنوز مطمئن نیستید کدام بانک برای شرایط شما مناسب‌تر است؟</h3>
        <p className="text-stone-300 max-w-lg mx-auto mb-4 text-xs leading-relaxed">
          برای دانشجویان معمولاً پلن‌های دانشجویی رایگان Erste یا BAWAG با کارت بین‌المللی توصیه می‌شود؛ برای متقاضیان وام مسکن، بانک‌های سنتی با سابقه اعتباری پایدار بهترین انتخاب هستند.
        </p>
        <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium text-xs rounded-xl px-4 py-2">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>پیشنهاد: افتتاح یک حساب اصلی (سنتی) + یک حساب جانبی آنلاین (N26 / Revolut)</span>
        </div>
      </section>
    </div>
  );
}
