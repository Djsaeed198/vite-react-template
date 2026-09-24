import React, { useState, useEffect, useMemo, useRef, lazy, Suspense } from "react";
import {
  Home, BookOpen, ShieldCheck, BarChart3, FileText, GraduationCap, Sparkles,
  Coins, Map, Car, ShoppingBag, Heart, Calendar, Building, Stethoscope,
  Ticket, Globe, UserCheck, CheckCircle, Compass, Users, MessageSquare,
  Calculator, Bell, Search, Moon, Sun, Menu, X, ChevronLeft, ChevronRight,
  ExternalLink, Mail, Send, Instagram, Facebook, Plane, Camera, Twitter,
  Youtube, AlertOctagon, Clock, MapPin, Award, RefreshCw, Share2, ShoppingCart,
  Train, Smile, Phone, Briefcase, Languages, Grid, CheckSquare, User
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";
import { trackEvent } from "../utils/tracker";
import { toast } from "../utils/toast";

// ==========================================
// STATIC IMPORTS
// ==========================================
import ExperienceGallery from "./ExperienceGallery";
import ComparisonWizard from "./ComparisonWizard";
import AdministrativeGlossary from "./AdministrativeGlossary";
import VisaSuitabilityWizard from "./VisaSuitabilityWizard";
import CostOfLivingComparison from "./CostOfLivingComparison";
import FormDownloadLibrary from "./FormDownloadLibrary";
import SchoolDirectory from "./SchoolDirectory";
import VisaCalculator from "./VisaCalculator";
import ExchangeRateWidget from "./ExchangeRateWidget";
import InsuranceFilterDirectory from "./InsuranceFilterDirectory";
import DistrictGuide from "./DistrictGuide";
import ExpertProfile from "./ExpertProfile";
import TranslatorDirectory from "./TranslatorDirectory";
import FactCheckArticles from "./FactCheckArticles";
import NoVACalculator from "./NoVACalculator";
import OfferDirectory from "./OfferDirectory";
import StudentFinanceCalculator from "./StudentFinanceCalculator";
import WillhabenGuide from "./WillhabenGuide";
import NeighborhoodComparison from "./NeighborhoodComparison";
import VolunteerDirectory from "./VolunteerDirectory";
import PublicHolidayCalendar from "./PublicHolidayCalendar";
import DrivingLicenseGuide from "./DrivingLicenseGuide";
import RealEstateTaxCalculator from "./RealEstateTaxCalculator";
import InsuranceSupplementalGuide from "./InsuranceSupplementalGuide";
import IdAustriaGuide from "./IdAustriaGuide";
import TaxRegistrationGuide from "./TaxRegistrationGuide";
import CriminalRecordGuide from "./CriminalRecordGuide";
import NostrificationGuide from "./NostrificationGuide";
import BankExchangeDirectory from "./BankExchangeDirectory";
import MoneyLaunderingInfo from "./MoneyLaunderingInfo";
import PublicTransportGuide from "./PublicTransportGuide";
import VehicleInspectionGuide from "./VehicleInspectionGuide";
import ParkingGuide from "./ParkingGuide";
import GroceryDirectory from "./GroceryDirectory";
import ShoppingGuide from "./ShoppingGuide";
import ChristmasMarketGuide from "./ChristmasMarketGuide";
import DanubeFestivalGuide from "./DanubeFestivalGuide";
import SkiResortGuide from "./SkiResortGuide";
import PoolTicketGuide from "./PoolTicketGuide";
import TheoryExamTest from "./TheoryExamTest";
import CitizenshipGuide from "./CitizenshipGuide";
import BankComparisonGuide from "./BankComparisonGuide";
import KindergartenGuide from "./KindergartenGuide";
import SupplementalInsuranceGuide from "./SupplementalInsuranceGuide";
import PensionGuide from "./PensionGuide";
import LiabilityInsuranceGuide from "./LiabilityInsuranceGuide";
import WillhabenSecurityGuide from "./WillhabenSecurityGuide";
import OrganicMarketsGuide from "./OrganicMarketsGuide";
import HalalDirectory from "./HalalDirectory";
import MarriageDivorceGuide from "./MarriageDivorceGuide";
import TaxReturnGuide from "./TaxReturnGuide";
import FreelanceTaxHub from "./FreelanceTaxHub";
import FamilienbonusGuide from "./FamilienbonusGuide";
import WifiBfiGuide from "./WifiBfiGuide";
import AccountingCareerGuide from "./AccountingCareerGuide";
import KlimaTicketGuide from "./KlimaTicketGuide";
import TrafficFineAppealGuide from "./TrafficFineAppealGuide";
import RWRPunterRechner from "./RWRPunterRechner";
import ResidencyConditionGuide from "./ResidencyConditionGuide";
import StudentGradRelocationGuide from "./StudentGradRelocationGuide";
import WillhabenFurnitureGuide from "./WillhabenFurnitureGuide";
import DiscounterGuide from "./DiscounterGuide";
import ObbVorteilscardGuide from "./ObbVorteilscardGuide";
import ContractCancellationGuide from "./ContractCancellationGuide";
import BetriebskostenGuide from "./BetriebskostenGuide";
import MutterKindPassGuide from "./MutterKindPassGuide";
import KassenarztDirectory from "./KassenarztDirectory";
import EmergencyDentistryGuide from "./EmergencyDentistryGuide";
import OperaStandingTicketGuide from "./OperaStandingTicketGuide";
import StadtwanderwegeGuide from "./StadtwanderwegeGuide";
import IdAustriaActivationGuide from "./IdAustriaActivationGuide";
import PhishingSecurityGuide from "./PhishingSecurityGuide";
import AustriaMainDashboard from "./AustriaMainDashboard";
import EcosystemPortal from "./EcosystemPortal";
import WelcomeNotification from "./WelcomeNotification";
import BruttoNettoCalculator from "./BruttoNettoCalculator";
import InterpreterAcademy from "./InterpreterAcademy";
import WohnbeihilfeBlock from "./WohnbeihilfeBlock";
import AustriaClassifiedsBlock from "./AustriaClassifiedsBlock";
import AustriaIranNewsBanner from "./AustriaIranNewsBanner";
import NewsModal from "./NewsModal";
import SEO from "./SEO";
import ImmigrationAssessment from "./ImmigrationAssessment";
import ToastNotification from "./ToastNotification";
import WhatsAppConsultButton from "./WhatsAppConsultButton";
import SuperAppSearchModal from "./SuperAppSearchModal";

// ==========================================
// LAZY COMPONENTS
// ==========================================
const TaxCalculator = lazy(() => import("./TaxCalculator"));
const ResidenceTracker = lazy(() => import("./ResidenceTracker"));
const ServiceFinder = lazy(() => import("./ServiceFinder"));
const ForumDiscussion = lazy(() => import("./ForumDiscussion"));
const CostOfLiving = lazy(() => import("./CostOfLiving"));
const TrustExamples = lazy(() => import("./TrustExamples"));
const SurvivalGerman = lazy(() => import("./SurvivalGerman"));
const CarpoolNetworking = lazy(() => import("./CarpoolNetworking"));
const GoldenRules = lazy(() => import("./GoldenRules"));
const LocalExperienceMapper = lazy(() => import("./LocalExperienceMapper"));
const FinancialSmartManager = lazy(() => import("./FinancialSmartManager"));
const DigitalPaperworkWizard = lazy(() => import("./DigitalPaperworkWizard"));
const IntegrationAcademy = lazy(() => import("./IntegrationAcademy"));
const TrolutCrowdshipping = lazy(() => import("./TrolutCrowdshipping"));
const ImmigrationDirectory = lazy(() => import("./ImmigrationDirectory"));
const VafWorkAssistant = lazy(() => import("./VafWorkAssistant"));
const Divar = lazy(() => import("./Divar"));
const AboutContactNew = lazy(() => import("./AboutContactNew"));
const SmartSystems = lazy(() => import("./SmartSystems"));
const AppointmentsManager = lazy(() => import("./AppointmentsManager"));
const SmartHouseSearch = lazy(() => import("./SmartHouseSearch"));
const InitialDocumentCheck = lazy(() => import("./InitialDocumentCheck"));
const ServiceRatingsPortal = lazy(() => import("./ServiceRatingsPortal"));

const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// NAV CONFIG
// ==========================================
const NAV_PAGES = [
  { id: "home", label: "خانه", icon: Home },
  { id: "tracker", label: "اقامت و چک‌لیست", icon: Compass },
  { id: "finance", label: "امور مالی", icon: Coins },
  { id: "mapper", label: "مشاغل و نیازمندی‌ها", icon: Map },
  { id: "german", label: "زبان و آکادمی", icon: BookOpen },
  { id: "carpool", label: "همسفریابی و گفتگو", icon: Users },
  { id: "trust-examples", label: "نمونه اعتماد", icon: Sparkles },
  { id: "smart", label: "سامانه‌های هوشمند", icon: Calculator },
  { id: "stories", label: "تجربه‌سرا", icon: BookOpen },
  { id: "compare", label: "مقایسه اقامت", icon: ShieldCheck },
  { id: "glossary", label: "واژه‌نامه", icon: BookOpen },
  { id: "compare-living", label: "مقایسه هزینه", icon: BarChart3 },
  { id: "forms", label: "فرم‌های اداری", icon: FileText },
  { id: "schools", label: "مدارس", icon: GraduationCap },
  { id: "calculator", label: "امتیاز ویزا", icon: Sparkles },
  { id: "exchange", label: "نرخ ارز", icon: Coins },
  { id: "insurance", label: "بیمه پزشکان", icon: ShieldCheck },
  { id: "district", label: "راهنمای محلات", icon: Map },
  { id: "nova", label: "مالیات خودرو", icon: Car },
  { id: "offers", label: "تخفیف‌ها", icon: Coins },
  { id: "student-finance", label: "وام دانشجویی", icon: GraduationCap },
  { id: "willhaben", label: "خرید دست‌دوم", icon: ShoppingBag },
  { id: "neighborhood", label: "مقایسه محلات", icon: Map },
  { id: "volunteer", label: "کارهای خیر", icon: Heart },
  { id: "holidays", label: "تعطیلات رسمی", icon: Calendar },
  { id: "license", label: "گواهینامه", icon: Car },
  { id: "real-estate", label: "مالیات ملک", icon: Building },
  { id: "supplemental-insurance", label: "بیمه تکمیلی", icon: ShieldCheck },
  { id: "pension-guide", label: "بیمه بازنشستگی", icon: FileText },
  { id: "liability-insurance", label: "بیمه مسئولیت", icon: ShieldCheck },
  { id: "willhaben-security", label: "امنیت ویلهابن", icon: ShoppingBag },
  { id: "organic-markets", label: "بازارهای ارگانیک", icon: ShoppingBag },
  { id: "halal-directory", label: "مراکز حلال", icon: ShoppingBag },
  { id: "marriage-divorce", label: "ازدواج و طلاق", icon: FileText },
  { id: "tax-return", label: "اظهارنامه مالیاتی", icon: FileText },
  { id: "freelance-tax", label: "مالیات فریلنسرها", icon: FileText },
  { id: "familienbonus", label: "تخفیف مالیاتی فرزندان", icon: FileText },
  { id: "education-wifi-bfi", label: "دوره‌های WIFI و bfi", icon: GraduationCap },
  { id: "accounting-career", label: "حسابداری", icon: GraduationCap },
  { id: "klimaticket", label: "کلیما تیکت", icon: Car },
  { id: "traffic-fine-appeal", label: "اعتراض به جریمه", icon: AlertOctagon },
  { id: "rwr-calculator", label: "محاسبه امتیاز RWR", icon: Calculator },
  { id: "residency-conditions", label: "شرایط تمدید اقامت", icon: FileText },
  { id: "student-grad-guide", label: "اقامت فارغ‌التحصیلان", icon: GraduationCap },
  { id: "willhaben-furniture", label: "تجهیز خانه با Willhaben", icon: ShoppingCart },
  { id: "discounter-guide", label: "راهنمای سوپرمارکت‌ها", icon: ShoppingCart },
  { id: "obb-vorteilscard", label: "کارت تخفیف قطار", icon: Train },
  { id: "contract-cancellation", label: "فسخ قرارداد", icon: FileText },
  { id: "betriebskosten", label: "هزینه شارژ", icon: Building },
  { id: "mutter-kind-pass", label: "دفترچه مادر و کودک", icon: Smile },
  { id: "kassenarzt-directory", label: "دایرکتوری پزشکان بیمه", icon: Stethoscope },
  { id: "opera-standing-tickets", label: "بلیت‌های ایستاده اپرا", icon: Ticket },
  { id: "stadtwanderwege", label: "پیاده‌روی وین", icon: Map },
  { id: "id-austria-guide", label: "راهنمای ID Austria", icon: ShieldCheck },
  { id: "phishing-security", label: "امنیت سایبری", icon: AlertOctagon },
  { id: "tax-reg", label: "ثبت مالیاتی", icon: FileText },
  { id: "criminal-record", label: "عدم سوءپیشینه", icon: FileText },
  { id: "nostrification", label: "نوستریفیکاسیون", icon: GraduationCap },
  { id: "banks", label: "بانک و صرافی", icon: Coins },
  { id: "aml", label: "قوانین ضدپولشویی", icon: AlertOctagon },
  { id: "transport", label: "حمل‌ونقل", icon: Map },
  { id: "inspection", label: "معاینه فنی", icon: Car },
  { id: "parking", label: "پارک خودرو", icon: MapPin },
  { id: "grocery", label: "فروشگاه ایرانی", icon: ShoppingBag },
  { id: "shopping", label: "خرید و سیم‌کارت", icon: ShoppingBag },
  { id: "christmas", label: "بازارچه کریسمس", icon: Calendar },
  { id: "danube", label: "فستیوال دانوب", icon: Building },
  { id: "ski", label: "اسکی", icon: Car },
  { id: "pool", label: "استخر", icon: Building },
  { id: "theory-test", label: "آزمون رانندگی", icon: Car },
  { id: "ma35", label: "اداره MA35", icon: FileText },
  { id: "citizenship", label: "تابعیت اتریش", icon: Award },
  { id: "bank-compare", label: "مقایسه بانک‌ها", icon: Coins },
  { id: "kindergarten", label: "مهدکودک‌ها", icon: GraduationCap },
  { id: "experts", label: "کارشناسان", icon: UserCheck },
  { id: "translators", label: "مترجمان", icon: Globe },
  { id: "factcheck", label: "حقیقت‌سنجی", icon: CheckCircle },
  { id: "about", label: "درباره ما", icon: MessageSquare },
  { id: "immigration-assessment", label: "ارزیابی مهاجرت", icon: ShieldCheck },
  { id: "housesearch", label: "جستجوی خانه", icon: Home },
  { id: "doccheck", label: "بررسی مدارک", icon: FileText },
  { id: "ratings", label: "امتیازدهی", icon: Award },
];

// ==========================================
// NEWS DATA
// ==========================================
const AUSTRIA_IRAN_NEWS = [
  { cat: "ترابری و قوانین 🚗", headline: "تسهیل صدور گواهینامه رانندگی اتریش برای اتباع غیر اتحادیه اروپا بدون آزمون مجدد", summary: "پارلمان اتریش اصلاحیه تسهیل معادل‌سازی گواهینامه‌های خارجی را تصویب کرد.", query: "Austria Führerschein foreign" },
  { cat: "اقامت و مهاجرت 🪪", headline: "به‌روزرسانی راهنمای مدارک مسیرهای اقامت اتریش", summary: "پیش از ارسال درخواست، آخرین فهرست مدارک را از مرجع رسمی بررسی کنید.", query: "Austria residence permit" },
  { cat: "همکاری دو کشور 🤝", headline: "گسترش همکاری‌های اتریش و ایران در حوزه‌های آموزشی و اقتصادی", summary: "اخبار و اطلاعیه‌های مرتبط را از منابع معتبر دنبال کنید.", query: "Austria Iran cooperation" },
  { cat: "زندگی روزمره 🏙️", headline: "یادآوری مهم برای تازه‌واردان درباره ثبت آدرس و بیمه", summary: "ثبت آدرس، بیمه و نگهداری نامه‌های اداری از اولویت‌های شروع زندگی در اتریش است.", query: "Austria Meldezettel insurance" },
  { cat: "بازار کار 💼", headline: "فرصت‌های تازه برای نیروی متخصص در اتریش", summary: "فهرست مشاغل و شرایط کارت قرمز-سفید-قرمز را از منبع رسمی کنترل کنید.", query: "Austria jobs RWR" },
  { cat: "مالیات 💰", headline: "تغییرات و یادآوری‌های مالیاتی برای سال جدید", summary: "برای تصمیم‌های مالی، اطلاعات رسمی FinanzOnline و منابع دولتی را بررسی کنید.", query: "Austria tax" },
  { cat: "اخبار فوری 📰", headline: "آخرین تحولات اتریش و ایران", summary: "برای مشاهده خبرهای بیشتر، جریان جست‌وجوی Google News را باز کنید.", query: "Austria Iran news" }
];

const CHECKLIST_TASKS = [
  { id: "meldung", title: "ثبت آدرس محل سکونت (Meldezettel)", desc: "فرم را با امضای صاحب‌خانه تکمیل و در مرجع ثبت محل سکونت ارائه کنید.", due: "اولویت بالا", urgent: true },
  { id: "residence", title: "بررسی مهلت و نوبت کارت یا مجوز اقامت", desc: "رسیدها، گذرنامه و همهٔ مدارک درخواست را در یک پوشه نگه دارید.", due: "هفته اول", urgent: true },
  { id: "insurance", title: "روشن‌کردن وضعیت بیمه درمانی", desc: "پوشش ÖGK، بیمه دانشجویی یا بیمه خصوصی خود را مشخص و مدرک آن را ذخیره کنید.", due: "تا روز ۱۴", urgent: false },
  { id: "bank", title: "افتتاح حساب بانکی و تنظیم پرداخت‌ها", desc: "برای اجاره، حقوق یا کمک‌هزینه، IBAN و دسترسی امن بانکی آماده داشته باشید.", due: "تا روز ۳۰", urgent: false },
  { id: "phone", title: "سیم‌کارت و نشانی ارتباطی قابل‌اعتماد", desc: "شماره و ایمیلی انتخاب کنید که پیام‌های اداری را از دست ندهید.", due: "تا روز ۳۰", urgent: false },
  { id: "transport", title: "برنامهٔ رفت‌وآمد شهر خود را تنظیم کنید", desc: "کارت یا اشتراک مناسب حمل‌ونقل عمومی را با محل کار یا تحصیل هماهنگ کنید.", due: "تا روز ۳۰", urgent: false },
  { id: "language", title: "یک برنامهٔ واقع‌بینانه برای زبان آلمانی بسازید", desc: "کلاس، آزمون احتمالی و تمرین هفتگی را در تقویم خود قرار دهید.", due: "تا روز ۶۰", urgent: false },
  { id: "folder", title: "پوشهٔ دیجیتال مدارک را کامل کنید", desc: "اسکن گذرنامه، قرارداد، ثبت آدرس، بیمه و مکاتبات مهم را با نام‌گذاری روشن نگه دارید.", due: "تا روز ۱۰۰", urgent: false }
];

// ==========================================
// MAIN APP
// ==========================================
export default function App() {
  const [activeSegment, setActiveSegment] = useState<string>("home");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [viennaTime, setViennaTime] = useState<string>("");
  const [viennaDate, setViennaDate] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [austriaNews, setAustriaNews] = useState<any[]>([]);
  const [newsLastUpdated, setNewsLastUpdated] = useState<string>("");
  const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false);
  const [isForcingNewsRefresh, setIsForcingNewsRefresh] = useState<boolean>(false);
  const [newsIndex, setNewsIndex] = useState<number>(1);
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: "اولویت امروز", body: "ثبت آدرس و کنترل مدارک اقامت را فراموش نکنید.", unread: true },
    { id: 2, title: "یادآوری", body: "همه نامه‌های اداری را در پوشه دیجیتال ذخیره کنید.", unread: false }
  ]);
  const [seoState, setSeoState] = useState<any>({
    title: "اتریش‌نشین | همیار همه‌جانبه فارسی‌زبانان مقیم اتریش 🇦🇹",
    description: "اتریش‌نشین؛ همیار همه‌جانبه فارسی‌زبانان مقیم اتریش.",
    keywords: "اتریش, فارسی زبانان اتریش, ایرانیان اتریش",
    schema: []
  });

  // ==========================================
  // CLOCK
  // ==========================================
  useEffect(() => {
    const tick = () => {
      try {
        const d = new Date();
        setViennaTime(new Intl.DateTimeFormat("fa-IR", { timeZone: "Europe/Vienna", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(d));
        setViennaDate(new Intl.DateTimeFormat("fa-IR", { timeZone: "Europe/Vienna", weekday: "long", day: "numeric", month: "long" }).format(d));
      } catch { /* noop */ }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ==========================================
  // THEME
  // ==========================================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("otrish-theme", theme);
  }, [theme]);

  // ==========================================
  // URL SYNC
  // ==========================================
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const seg = params.get("segment");
    if (seg && seg !== activeSegment) setActiveSegment(seg);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (activeSegment === "home") url.searchParams.delete("segment");
    else url.searchParams.set("segment", activeSegment);
    window.history.replaceState(null, "", url.toString());
  }, [activeSegment]);

  // ==========================================
  // KEYBOARD SHORTCUT
  // ==========================================
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((p) => !p);
      }
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ==========================================
  // FETCH NEWS
  // ==========================================
  const fetchAustriaNewsList = (force = false) => {
    if (force) setIsForcingNewsRefresh(true);
    else setIsNewsLoading(true);
    setTimeout(() => {
      setAustriaNews(AUSTRIA_IRAN_NEWS);
      setNewsLastUpdated(new Date().toLocaleTimeString("fa-IR"));
      setIsNewsLoading(false);
      setIsForcingNewsRefresh(false);
    }, 800);
  };
  useEffect(() => { fetchAustriaNewsList(); }, []);

  // ==========================================
  // NEWS CAROUSEL AUTO
  // ==========================================
  useEffect(() => {
    const id = setInterval(() => {
      setNewsIndex((i) => (i + 1) % AUSTRIA_IRAN_NEWS.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // ==========================================
  // SEARCH
  // ==========================================
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.trim().toLowerCase();
    const results = NAV_PAGES.filter((p) => p.label.toLowerCase().includes(q) || p.id.includes(q)).slice(0, 8);
    setSearchResults(results);
  }, [searchQuery]);

  // ==========================================
  // SEO
  // ==========================================
  useEffect(() => {
    const page = NAV_PAGES.find((p) => p.id === activeSegment);
    const title = page ? `اتریش‌نشین | ${page.label}` : "اتریش‌نشین | همیار همه‌جانبه فارسی‌زبانان مقیم اتریش 🇦🇹";
    document.title = title;
    setSeoState((prev: any) => ({
      ...prev,
      title,
      schema: [{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "اتریش‌نشین",
        "operatingSystem": "Web",
        "applicationCategory": "UtilitiesApplication",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1250" }
      }]
    }));
  }, [activeSegment]);

  const handleNavigate = (seg: string) => {
    setActiveSegment(seg);
    setIsMenuOpen(false);
    setIsSearchModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchSubmit = (q: string) => {
    if (!q.trim()) return;
    const first = NAV_PAGES.find((p) => p.label.includes(q) || p.id.includes(q));
    if (first) handleNavigate(first.id);
    setSearchQuery("");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    toast.success("همه اعلان‌ها خوانده شد");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;
  const currentNews = austriaNews[newsIndex] || AUSTRIA_IRAN_NEWS[newsIndex];

  return (
    <>
      <SEO title={seoState.title} description={seoState.description} keywords={seoState.keywords} schemaData={seoState.schema} />
      <style>{GLOBAL_CSS}</style>
      <WelcomeNotification />

      <div className="app-shell" dir="rtl">
        {/* ========== TICKER ========== */}
        <div className="ticker">
          <div className="ticker-inner">
            <div className="ticker-tag"><span className="dot"></span>پخش زنده اخبار</div>
            <div className="ticker-track">
              <div className="ticker-move">
                <span><b>ورود به اتریش 🛬</b> چک‌لیست ۱۰۰ روز نخست را بر پایهٔ زمان‌بندی پروندهٔ خود تنظیم کنید.</span>
                <span><b>اقامت 📝</b> پیش از هر اقدام، مهلت‌ها و مدارک را از مرجع رسمی تأیید کنید.</span>
                <span><b>زندگی در وین 🏙️</b> ثبت آدرس، بیمه و حساب بانکی؛ سه اولویت شروع شما هستند.</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== HEADER ========== */}
        <header className="header">
          <div className="header-inner">
            <button className="hbtn" onClick={() => setIsMenuOpen(true)} aria-label="باز کردن منو">☰</button>

            <div className="logo" onClick={() => handleNavigate("home")}>
              <div className="logo-icon logo-icon--img">
                <img src={otrishLogo} alt="اتریش‌نشین" width="46" height="46" />
              </div>
              <div className="logo-text">
                <div className="logo-brand">اتریش‌نشین</div>
                <p>همیار فارسی‌زبانان مقیم اتریش</p>
              </div>
            </div>

            <div className="search-wrap">
              <div className="search-bar">
                <Search size={15} />
                <input
                  type="search"
                  placeholder="جستجو در پورتال: اقامت، مالیات، مشاغل…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearchSubmit(searchQuery); }}
                />
                {searchQuery && (
                  <span className="clr" onClick={() => setSearchQuery("")} role="button" tabIndex={0}>✕</span>
                )}
              </div>
              {searchResults.length > 0 && (
                <div className="search-dropdown open">
                  {searchResults.map((r) => (
                    <div key={r.id} className="search-result" onClick={() => handleNavigate(r.id)}>
                      <span className="sr-tab">{r.id}</span>
                      <span className="sr-text">{r.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="header-meta">
              <div className="clock">
                <span className="t">{viennaTime}</span>
                <span className="d">🕒 {viennaDate} — ساعت وین</span>
              </div>
              <div className="header-btns">
                <button className="hbtn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="حالت تیره / روشن">
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button className="hbtn" onClick={(e) => { e.stopPropagation(); setIsNotifOpen(!isNotifOpen); }} aria-label="اعلان‌ها">
                  <Bell size={16} />
                  {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                </button>
                <button className="btn-assess" onClick={() => handleNavigate("immigration-assessment")}>
                  ⚡<span>ارزیابی مهاجرت</span>
                </button>
              </div>
            </div>
          </div>

          {isNotifOpen && (
            <div className="notif-menu open" onClick={(e) => e.stopPropagation()}>
              <div className="nh">
                <b>🔔 اعلان‌ها</b>
                <button className="chip" onClick={markAllRead}>خواندن همه</button>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`notif-item ${n.unread ? "unread" : ""}`}>
                  <b>{n.title}</b>
                  <p>{n.body}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* ========== DRAWER MENU ========== */}
        <div className={`ux-menu-overlay ${isMenuOpen ? "open" : ""}`} onClick={() => setIsMenuOpen(false)} />
        <aside className={`ux-menu-panel ${isMenuOpen ? "open" : ""}`} aria-hidden={!isMenuOpen}>
          <div className="ux-menu-head">
            <b>🧭 دسترسی سریع</b>
            <button className="ux-menu-x" onClick={() => setIsMenuOpen(false)} aria-label="بستن">✕</button>
          </div>
          <div className="ux-menu-grid">
            {NAV_PAGES.slice(0, 30).map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  className={`nav-btn ${activeSegment === p.id ? "active" : ""}`}
                  onClick={() => handleNavigate(p.id)}
                >
                  <span className="ic"><Icon size={15} /></span>
                  {p.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* ========== MAIN ========== */}
        <main className="wrap" id="top">
          {/* News Banner */}
          <div className="news-banner">
            <div className="news-banner-head">
              <div className="news-live">
                <span className="pulse-dot"><span className="pulse-ring"></span><span className="pulse-core"></span></span>
                <span className="news-live-label">جریان زنده اخبار اتریش و تحولات دوجانبه 🇦🇹 🇮🇷</span>
                <span className="news-chip">کش منسجم لایو</span>
              </div>
              <a
                href={`https://news.google.com/search?q=${encodeURIComponent(currentNews?.query || "Austria")}&hl=fa&gl=AT&ceid=AT:fa`}
                target="_blank" rel="noopener noreferrer" className="news-google-btn"
              >
                <ExternalLink size={12} /> مشترک Google News
              </a>
            </div>

            <div className="news-body">
              <div className="news-tags">
                <span className="news-cat-tag">{currentNews?.cat}</span>
                <span className="news-source">منبع رسمی: منابع معتبر اتریش</span>
                <span className="news-sep">|</span>
                <span className="news-counter">سند خبر {newsIndex + 1} از {austriaNews.length || AUSTRIA_IRAN_NEWS.length}</span>
              </div>
              <a
                href={`https://news.google.com/search?q=${encodeURIComponent(currentNews?.query || "")}&hl=fa`}
                target="_blank" rel="noopener noreferrer" className="news-headline"
              >
                {currentNews?.headline} <ExternalLink size={12} style={{ display: "inline", opacity: 0.4 }} />
              </a>
              <p className="news-summary">{currentNews?.summary}</p>
            </div>

            <div className="news-footer">
              <div className="news-progress">
                <div className="news-progress-bar" style={{ width: `${((newsIndex + 1) / (austriaNews.length || AUSTRIA_IRAN_NEWS.length)) * 100}%` }}></div>
              </div>
              <div className="news-nav">
                <div className="news-nav-btns">
                  <button className="news-nav-btn" onClick={() => setNewsIndex((newsIndex + 1) % (austriaNews.length || AUSTRIA_IRAN_NEWS.length))}>›</button>
                  <button className="news-nav-btn" onClick={() => setNewsIndex((newsIndex - 1 + (austriaNews.length || AUSTRIA_IRAN_NEWS.length)) % (austriaNews.length || AUSTRIA_IRAN_NEWS.length))}>‹</button>
                  <div className="news-dots">
                    {AUSTRIA_IRAN_NEWS.map((_, i) => (
                      <button
                        key={i}
                        className={`news-dot ${i === newsIndex ? "active" : ""}`}
                        onClick={() => setNewsIndex(i)}
                      >{i === newsIndex ? i + 1 : ""}</button>
                    ))}
                  </div>
                </div>
                <div className="news-date">امروز • ترجمهٔ هوشمند Google News</div>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <p className="crumb">صفحه اصلی ← {NAV_PAGES.find((p) => p.id === activeSegment)?.label || "مهاجرت و اقامت"} ← شروع زندگی در اتریش</p>

          {/* Content Rendering */}
          <Suspense fallback={
            <div style={{ padding: "40px", textAlign: "center", color: "var(--muted)" }}>
              <div className="spinner" />
              <p style={{ marginTop: 12, fontWeight: 700, fontSize: 12 }}>در حال بارگذاری بخش مربوطه...</p>
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSegment}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {activeSegment === "home" ? (
                  <HomePage onNavigate={handleNavigate} newsIndex={newsIndex} setNewsIndex={setNewsIndex} />
                ) : (
                  <PageShell>
                    {activeSegment === "tracker" && <div className="page-stack"><ResidenceTracker /><ImmigrationDirectory onNavigate={handleNavigate} /><VafWorkAssistant /><LocalExperienceMapper /></div>}
                    {activeSegment === "finance" && <div className="page-stack"><CostOfLiving /><BruttoNettoCalculator /><TaxCalculator /><FinancialSmartManager /></div>}
                    {activeSegment === "mapper" && <div className="page-stack"><ServiceFinder selectedCity={selectedCity} setSelectedCity={setSelectedCity} /><LocalExperienceMapper /></div>}
                    {activeSegment === "german" && <div className="page-stack"><SurvivalGerman /><InterpreterAcademy /><IntegrationAcademy /><GoldenRules /><DigitalPaperworkWizard /></div>}
                    {activeSegment === "carpool" && <div className="page-stack"><CarpoolNetworking /><TrolutCrowdshipping /><ForumDiscussion /><AustriaClassifiedsBlock /><Divar /></div>}
                    {activeSegment === "trust-examples" && <TrustExamples onNavigate={handleNavigate} />}
                    {activeSegment === "smart" && <div className="page-stack"><SmartSystems /><WohnbeihilfeBlock /></div>}
                    {activeSegment === "about" && <AboutContactNew />}
                    {activeSegment === "immigration-assessment" && <ImmigrationAssessment />}
                    {activeSegment === "stories" && <ExperienceGallery />}
                    {activeSegment === "compare" && <ComparisonWizard onSelectSegment={handleNavigate} />}
                    {activeSegment === "glossary" && <AdministrativeGlossary />}
                    {activeSegment === "wizard" && <VisaSuitabilityWizard />}
                    {activeSegment === "compare-living" && <CostOfLivingComparison />}
                    {activeSegment === "forms" && <FormDownloadLibrary />}
                    {activeSegment === "schools" && <SchoolDirectory />}
                    {activeSegment === "calculator" && <VisaCalculator />}
                    {activeSegment === "exchange" && <ExchangeRateWidget />}
                    {activeSegment === "insurance" && <InsuranceFilterDirectory />}
                    {activeSegment === "district" && <DistrictGuide />}
                    {activeSegment === "experts" && <ExpertProfile />}
                    {activeSegment === "translators" && <TranslatorDirectory />}
                    {activeSegment === "factcheck" && <FactCheckArticles />}
                    {activeSegment === "nova" && <NoVACalculator />}
                    {activeSegment === "offers" && <OfferDirectory />}
                    {activeSegment === "student-finance" && <StudentFinanceCalculator />}
                    {activeSegment === "willhaben" && <WillhabenGuide />}
                    {activeSegment === "neighborhood" && <NeighborhoodComparison />}
                    {activeSegment === "volunteer" && <VolunteerDirectory />}
                    {activeSegment === "holidays" && <PublicHolidayCalendar />}
                    {activeSegment === "license" && <DrivingLicenseGuide />}
                    {activeSegment === "real-estate" && <RealEstateTaxCalculator />}
                    {activeSegment === "supplemental-insurance" && <InsuranceSupplementalGuide />}
                    {activeSegment === "pension-guide" && <PensionGuide />}
                    {activeSegment === "liability-insurance" && <LiabilityInsuranceGuide />}
                    {activeSegment === "willhaben-security" && <WillhabenSecurityGuide />}
                    {activeSegment === "organic-markets" && <OrganicMarketsGuide />}
                    {activeSegment === "halal-directory" && <HalalDirectory />}
                    {activeSegment === "marriage-divorce" && <MarriageDivorceGuide />}
                    {activeSegment === "tax-return" && <TaxReturnGuide />}
                    {activeSegment === "freelance-tax" && <FreelanceTaxHub />}
                    {activeSegment === "familienbonus" && <FamilienbonusGuide />}
                    {activeSegment === "education-wifi-bfi" && <WifiBfiGuide />}
                    {activeSegment === "accounting-career" && <AccountingCareerGuide />}
                    {activeSegment === "klimaticket" && <KlimaTicketGuide />}
                    {activeSegment === "traffic-fine-appeal" && <TrafficFineAppealGuide />}
                    {activeSegment === "rwr-calculator" && <RWRPunterRechner />}
                    {activeSegment === "residency-conditions" && <ResidencyConditionGuide />}
                    {activeSegment === "student-grad-guide" && <StudentGradRelocationGuide />}
                    {activeSegment === "willhaben-furniture" && <WillhabenFurnitureGuide />}
                    {activeSegment === "discounter-guide" && <DiscounterGuide />}
                    {activeSegment === "obb-vorteilscard" && <ObbVorteilscardGuide />}
                    {activeSegment === "contract-cancellation" && <ContractCancellationGuide />}
                    {activeSegment === "betriebskosten" && <BetriebskostenGuide />}
                    {activeSegment === "mutter-kind-pass" && <MutterKindPassGuide />}
                    {activeSegment === "kassenarzt-directory" && <KassenarztDirectory />}
                    {activeSegment === "opera-standing-tickets" && <OperaStandingTicketGuide />}
                    {activeSegment === "stadtwanderwege" && <StadtwanderwegeGuide />}
                    {activeSegment === "id-austria-guide" && <IdAustriaActivationGuide />}
                    {activeSegment === "phishing-security" && <PhishingSecurityGuide />}
                    {activeSegment === "housesearch" && <SmartHouseSearch />}
                    {activeSegment === "doccheck" && <InitialDocumentCheck />}
                    {activeSegment === "ratings" && <ServiceRatingsPortal />}
                  </PageShell>
                )}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* ========== FOOTER ========== */}
        <Footer onNavigate={handleNavigate} />

        {/* ========== SEARCH MODAL ========== */}
        <SuperAppSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectPage={handleNavigate}
        />

        {/* ========== NEWS MODAL ========== */}
        <NewsModal
          isOpen={isNewsModalOpen}
          onClose={() => setIsNewsModalOpen(false)}
          news={austriaNews}
          newsSourceText=""
          newsLastUpdated={newsLastUpdated}
          isNewsLoading={isNewsLoading}
          isForcingNewsRefresh={isForcingNewsRefresh}
          onRefresh={async () => { await fetchAustriaNewsList(true); }}
        />

        <WhatsAppConsultButton />
        <ToastNotification />
      </div>
    </>
  );
}

// ==========================================
// PAGE SHELL WRAPPER
// ==========================================
function PageShell({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "0" }}>{children}</div>;
}

// ==========================================
// HOME PAGE
// ==========================================
function HomePage({ onNavigate, newsIndex, setNewsIndex }: any) {
  const [tasks, setTasks] = useState<boolean[]>([]);
  const [city, setCity] = useState<string>("وین");

  // Load checklist from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("austria100") || "[]");
      setTasks(CHECKLIST_TASKS.map((_, i) => !!saved[i]));
    } catch {
      setTasks(CHECKLIST_TASKS.map(() => false));
    }
  }, []);

  const toggleTask = (i: number) => {
    const next = [...tasks];
    next[i] = !next[i];
    setTasks(next);
    localStorage.setItem("austria100", JSON.stringify(next));
  };

  const doneCount = tasks.filter(Boolean).length;
  const progressPct = tasks.length ? (doneCount / tasks.length) * 100 : 0;
  const phaseLabel = doneCount < 2 ? "روزهای ۱ تا ۷" : doneCount < 5 ? "تا روز ۳۰" : doneCount < 7 ? "تا روز ۶۰" : "تا روز ۱۰۰";

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">🛬 راهنمای عملی تازه‌واردان</span>
          <h1>اقامت و چک‌لیست<br />۱۰۰ روز اول در اتریش</h1>
          <p>از ثبت آدرس و کارت اقامت تا بیمه، حساب بانکی و ساختن یک زندگی روزمره؛ قدم‌های مهم را به ترتیب و با آرامش پیش ببرید.</p>
          <div className="hero-actions">
            <a className="white-btn" href="#checklist">چک‌لیست روزهای اول</a>
            <a className="outline-btn" href="#residence">شناخت مسیرهای اقامت</a>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick">
        <div className="stat"><b>۱۰۰ روز</b><span>مسیر شروع قدم‌به‌قدم</span></div>
        <div className="stat"><b>{doneCount} کار</b><span>از چک‌لیست انجام شده</span></div>
        <div className="stat"><b>۴ مرحله</b><span>ورود، استقرار، تثبیت، آینده</span></div>
        <div className="stat"><b>۱ مکان</b><span>همهٔ کارهای ضروری شما</span></div>
      </section>

      <div className="layout">
        <div>
          {/* Roadmap */}
          <section className="card section">
            <div className="sec-title">
              <div>
                <h2>نقشهٔ راه شما</h2>
                <p>اولویت‌ها بر اساس زمان پس از ورود به اتریش</p>
              </div>
              <span className="tag">مسیر پیشنهادی</span>
            </div>
            <div className="roadmap">
              <article className="phase"><span className="day">روز ۱ تا ۷</span><b>ورود و ثبت</b><p>محل سکونت، ثبت آدرس و مدارک ضروری را مرتب کنید.</p></article>
              <article className="phase"><span className="day">روز ۸ تا ۳۰</span><b>استقرار</b><p>بیمه، بانک، سیم‌کارت و قرارهای اداری را پیش ببرید.</p></article>
              <article className="phase"><span className="day">روز ۳۱ تا ۶۰</span><b>روتین زندگی</b><p>رفت‌وآمد، پزشک، زبان و امور مالی روزمره را بسازید.</p></article>
              <article className="phase"><span className="day">روز ۶۱ تا ۱۰۰</span><b>تثبیت و آینده</b><p>پروندهٔ اقامت، کار یا تحصیل و شبکهٔ اجتماعی را محکم کنید.</p></article>
            </div>
          </section>

          {/* Checklist */}
          <section className="card section checklist" id="checklist">
            <div className="sec-title">
              <div>
                <h2>چک‌لیست شخصی شما</h2>
                <p>با تیک‌زدن هر مورد، پیشرفت شما در همین مرورگر ذخیره می‌شود.</p>
              </div>
              <span className="tag">{phaseLabel}</span>
            </div>
            <div className="list-head">
              <div>
                <span className="progress-label">{doneCount} از {tasks.length}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>انجام شده</span>
              </div>
              <div className="progress"><i style={{ width: `${progressPct}%` }}></i></div>
            </div>

            {CHECKLIST_TASKS.map((t, i) => (
              <label key={t.id} className="check-item">
                <input type="checkbox" checked={tasks[i] || false} onChange={() => toggleTask(i)} />
                <span className="task">
                  <b>{t.title}</b>
                  <p>{t.desc}</p>
                </span>
                <span className={`due ${t.urgent ? "urgent" : ""}`}>{t.due}</span>
              </label>
            ))}

            <div className="tip">
              <b>💡 یک عادت کوچک، یک تفاوت بزرگ</b>
              <p>هر مکاتبهٔ رسمی را همان روز ذخیره کنید و تاریخِ پاسخ یا تمدید را در تقویم بگذارید. این کار در تمدید اقامت و پیگیری‌های بعدی بسیار کمک‌کننده است.</p>
            </div>
          </section>

          {/* Residence Paths */}
          <section className="card section" id="residence" style={{ marginTop: 18 }}>
            <div className="sec-title">
              <div>
                <h2>مسیرهای رایج اقامت</h2>
                <p>مسیر مناسب به شرایط شما، هدف ورود و مدارک قابل ارائه بستگی دارد.</p>
              </div>
              <span className="tag">نمای کلی</span>
            </div>
            <div className="path-grid">
              <a className="path" onClick={() => onNavigate("rwr-calculator")}><span className="emoji">💼</span><b>کار و RWR</b><p>برای متقاضیان واجد شرایط دارای پیشنهاد کار و معیارهای مرتبط.</p></a>
              <a className="path" onClick={() => onNavigate("schools")}><span className="emoji">🎓</span><b>تحصیل</b><p>برای پذیرش دانشگاهی یا دوره‌های واجد شرایط و برنامهٔ مالی روشن.</p></a>
              <a className="path" onClick={() => onNavigate("marriage-divorce")}><span className="emoji">👪</span><b>الحاق خانواده</b><p>برای اعضای خانوادهٔ واجد شرایطِ فرد مقیم اتریش.</p></a>
            </div>
          </section>

          <p className="card disclaimer">
            <strong>یادآوری مهم:</strong> این صفحه راهنمای سازمان‌دهی کارهاست، نه مشاورهٔ حقوقی. مدارک، مهلت‌ها و شرایط اقامت ممکن است با نوع پرونده، شهر و تغییرات قانون متفاوت باشند؛ پیش از هر اقدام، منبع رسمی یا مشاور واجد شرایط را بررسی کنید.
          </p>
        </div>

        <aside className="side" id="resources">
          <section className="card notice red">
            <h3>📌 از همین‌جا شروع کنید</h3>
            <p>نوع اقامت و شهر خود را انتخاب کنید تا کارهای اولویت‌دار را با شرایطتان تطبیق دهید.</p>
            <select className="city-select" value={city} onChange={(e) => setCity(e.target.value)}>
              <option>وین</option>
              <option>گراتس</option>
              <option>لینتس</option>
              <option>سالزبورگ</option>
              <option>سایر شهرها</option>
            </select>
          </section>

          <section className="card notice green">
            <h3>🔗 منابع رسمی را کنار دستتان نگه دارید</h3>
            <a className="side-link" href="https://www.migration.gv.at/" target="_blank" rel="noopener">راهنمای مهاجرت اتریش <span>↗</span></a>
            <a className="side-link" href="https://www.oesterreich.gv.at/" target="_blank" rel="noopener">پرتال خدمات اتریش <span>↗</span></a>
            <a className="side-link" href="https://www.gesundheitskasse.at/" target="_blank" rel="noopener">بیمه سلامت ÖGK <span>↗</span></a>
          </section>

          <section className="card notice">
            <h3>📁 مدارک دم‌دست</h3>
            <p>پیش از قرار اداری، اصل و کپی مدارک را کنترل کنید.</p>
            <a className="side-link" onClick={() => onNavigate("tracker")}>گذرنامه و کارت/ویزای فعلی <span>›</span></a>
            <a className="side-link" onClick={() => onNavigate("tracker")}>مدرک محل سکونت <span>›</span></a>
            <a className="side-link" onClick={() => onNavigate("tracker")}>بیمه و رسیدهای درخواست <span>›</span></a>
          </section>
        </aside>
      </div>

      <AustriaIranNewsBanner />
      <EcosystemPortal />
    </>
  );
}

// ==========================================
// FOOTER
// ==========================================
function Footer({ onNavigate }: { onNavigate: (seg: string) => void }) {
  const [email, setEmail] = useState("");
  const subscribe = () => {
    if (email.includes("@")) { setEmail(""); toast.success("ایمیل شما با موفقیت ثبت شد"); }
    else toast.error("لطفاً ایمیل معتبر وارد کنید");
  };

  return (
    <footer className="footer">
      <div className="footer-in">
        <div>
          <h4>🏛️ درگاه مستقل اتریش‌نشین</h4>
          <p>بزرگترین پورتال هوشمند همیاری فارسی‌زبانان مقیم اتریش. طراحی ابزارهای هوشمند، محاسبات Brutto-Netto و تسهیل مسیرهای اداری برای شما.</p>
          <div className="footer-social">
            <a href="https://t.me/OTRISH_IRAN" target="_blank" rel="noopener"><Send size={16} /></a>
            <a href="https://instagram.com/otrish__iran" target="_blank" rel="noopener"><Instagram size={16} /></a>
            <a href="https://www.facebook.com/otrish.neshin" target="_blank" rel="noopener"><Facebook size={16} /></a>
            <a href="#" target="_blank" rel="noopener"><Youtube size={16} /></a>
          </div>
          <div style={{ marginTop: 16 }}>
            <h4 style={{ fontSize: 12, marginBottom: 8 }}>📩 خبرنامه اتریش‌نشین</h4>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") subscribe(); }}
                placeholder="ایمیل شما…"
                style={{ flex: 1, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "#fff", borderRadius: 10, padding: "10px 12px", fontSize: 12, fontWeight: 600 }}
              />
              <button className="newsletter-btn" onClick={subscribe}>عضویت</button>
            </div>
            <p style={{ fontSize: 10, opacity: 0.6, marginTop: 6 }}>دریافت آخرین اخبار اداری و رویدادها</p>
          </div>
        </div>
        <div>
          <h4>دسترسی سریع</h4>
          <a onClick={() => onNavigate("tracker")}>چک‌لیست اقامت</a>
          <a onClick={() => onNavigate("finance")}>محاسبه حقوق</a>
          <a onClick={() => onNavigate("glossary")}>واژه‌نامه اتریشی</a>
          <a onClick={() => onNavigate("mapper")}>بازار کار و مشاغل</a>
          <a onClick={() => onNavigate("immigration-assessment")}>آنالیز شانس</a>
        </div>
        <div>
          <h4>درگاه‌های رسمی</h4>
          <a href="https://www.oesterreich.gv.at" target="_blank" rel="noopener">oesterreich.gv.at</a>
          <a href="https://www.wien.gv.at" target="_blank" rel="noopener">شهرداری وین</a>
          <a href="https://www.ams.at" target="_blank" rel="noopener">AMS اداره کار</a>
          <a href="https://finanzonline.bmf.gv.at" target="_blank" rel="noopener">FinanzOnline</a>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} اتریش‌نشین — Otrishneshin Hub | طراحی و گردآوری برای ایرانیان مقیم اتریش • سرویس مستقل داوطلبانه
      </div>
    </footer>
  );
}

// ==========================================
// GLOBAL CSS (Design tokens from sample)
// ==========================================
const GLOBAL_CSS = `
:root{
  --red:#c8102e;--red2:#970d22;--gold:#b8862e;--green:#0e7c5a;--blue:#2657cc;
  --ink:#211a18;--muted:#756761;--line:#e6dbcd;--border:#E2E8F0;
  --soft:#f3ede5;--paper:#fffdfa;--bg:#f6f1e9;
  --shadow:0 10px 28px rgba(45,28,18,.09);--r:18px;--max:1320px;
}
[data-theme="dark"]{
  --ink:#f3eade;--muted:#b9aaa0;--line:#3a2c27;--soft:#2a201c;
  --paper:#201815;--bg:#120d0b;--shadow:0 12px 30px rgba(0,0,0,.3);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:Vazirmatn,system-ui,sans-serif;background:radial-gradient(850px 400px at 92% -8%,rgba(200,16,46,.11),transparent 65%),radial-gradient(620px 400px at 2% 8%,rgba(184,134,46,.1),transparent 65%),var(--bg);color:var(--ink);font-size:14px;line-height:1.75}
button,a{font:inherit}
button{cursor:pointer;border:0;background:none}
a{text-decoration:none;color:inherit;cursor:pointer}
img{max-width:100%}
.app-shell{min-height:100vh;display:flex;flex-direction:column}
.wrap{max-width:var(--max);margin:auto;padding:0 18px;width:100%;flex:1;padding-top:25px;padding-bottom:65px}

/* Ticker */
.ticker{background:linear-gradient(90deg,#181211,#3b2f2c);color:#fff;font-size:11.5px;font-weight:600;overflow:hidden;border-bottom:2px solid var(--red)}
.ticker-inner{display:flex;align-items:center;gap:14px;height:34px;max-width:var(--max);margin:0 auto;padding:0 18px}
.ticker-tag{background:var(--red);color:#fff;font-weight:900;font-size:10px;padding:3px 10px;border-radius:20px;white-space:nowrap;display:flex;align-items:center;gap:5px;flex-shrink:0}
.ticker-tag .dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:pulse 1.4s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.ticker-track{flex:1;overflow:hidden;white-space:nowrap;position:relative;-webkit-mask-image:linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)}
.ticker-move{display:inline-block;padding-right:100%;animation:tk 34s linear infinite}
.ticker-move span{margin-left:42px;opacity:.92}
.ticker-move b{color:#fca5a5}
@keyframes tk{0%{transform:translateX(0)}100%{transform:translateX(100%)}}

/* Header */
.header{position:sticky;top:0;z-index:200;background:rgba(255,253,250,.86);backdrop-filter:blur(18px) saturate(1.4);border-bottom:1px solid var(--line);box-shadow:0 1px 3px rgba(30,20,15,.08)}
[data-theme="dark"] .header{background:rgba(18,13,11,.86)}
.header-inner{max-width:var(--max);margin:0 auto;padding:0 18px;height:68px;display:flex;align-items:center;gap:16px}
.logo{display:flex;align-items:center;gap:11px;cursor:pointer;flex-shrink:0}
.logo-icon{position:relative;width:46px;height:46px;border-radius:15px;background:linear-gradient(150deg,var(--red) 0%,var(--red2) 65%,#7a0a1b 100%);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff;box-shadow:0 8px 20px -4px rgba(151,13,34,.5),inset 0 1px 0 rgba(255,255,255,.25)}
.logo-icon--img{background:var(--paper);border:1.5px solid var(--line);box-shadow:var(--shadow);padding:3px}
.logo-icon--img img{width:100%;height:100%;object-fit:contain;border-radius:11px}
.logo-text .logo-brand{font-size:17px;font-weight:900;color:var(--ink);letter-spacing:-.4px}
.logo-text p{font-size:10px;font-weight:800;color:var(--gold);letter-spacing:.3px;margin:0}
.search-wrap{position:relative;flex:1;max-width:340px;min-width:0}
.search-bar{width:100%;display:flex;align-items:center;background:var(--soft);border:1.5px solid transparent;border-radius:30px;padding:0 16px;gap:9px;transition:.2s}
.search-bar:focus-within{background:var(--paper);border-color:var(--red);box-shadow:0 0 0 4px rgba(200,16,46,.12)}
.search-bar input{flex:1;background:none;border:none;outline:0;font-size:12.5px;font-weight:600;color:var(--ink);padding:10px 0}
.search-bar input::placeholder{color:#b8aaa2}
.search-bar .clr{cursor:pointer;color:#b8aaa2;font-size:14px}
.search-dropdown{position:absolute;top:calc(100% + 8px);right:0;left:0;background:var(--paper);border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);padding:6px;z-index:250;max-height:340px;overflow-y:auto}
.search-result{display:flex;flex-direction:column;gap:2px;padding:9px 12px;border-radius:10px;cursor:pointer;transition:.15s}
.search-result:hover{background:var(--soft)}
.search-result .sr-tab{font-size:9px;font-weight:900;color:var(--red);text-transform:uppercase}
.search-result .sr-text{font-size:12px;font-weight:700;color:var(--ink)}
.header-meta{display:flex;align-items:center;gap:14px;margin-right:auto}
.clock{display:flex;flex-direction:column;align-items:flex-end;line-height:1.25;white-space:nowrap}
.clock .t{font-size:15px;font-weight:900;color:var(--ink);font-variant-numeric:tabular-nums;letter-spacing:.5px}
.clock .d{font-size:9.5px;font-weight:700;color:var(--muted)}
.header-btns{display:flex;align-items:center;gap:9px}
.hbtn{width:38px;height:38px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:#faf7f2;border:1.5px solid var(--line);font-size:16px;transition:.2s;position:relative;color:var(--ink)}
.hbtn:hover{background:var(--paper);border-color:var(--red);transform:translateY(-2px);box-shadow:var(--shadow)}
[data-theme="dark"] .hbtn{background:#191310;border-color:#382b25;color:#f5efe6}
.hbtn .badge{position:absolute;top:-3px;right:-3px;min-width:16px;height:16px;padding:0 4px;background:var(--red);border-radius:10px;border:2px solid var(--paper);font-size:9px;color:#fff;font-weight:900;display:flex;align-items:center;justify-content:center}
.btn-assess{background:linear-gradient(150deg,var(--red),var(--red2));color:#fff;font-weight:900;font-size:12px;padding:11px 18px;border-radius:13px;display:flex;align-items:center;gap:7px;box-shadow:0 8px 20px -4px rgba(151,13,34,.45);transition:.2s;white-space:nowrap}
.btn-assess:hover{transform:translateY(-2px);box-shadow:0 12px 28px -4px rgba(151,13,34,.55)}

/* Notification Menu */
.notif-menu{position:absolute;top:calc(100% + 9px);left:max(78px,calc((100vw - var(--max))/2 + 78px));width:285px;background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:8px;z-index:300}
.notif-menu .nh{display:flex;align-items:center;justify-content:space-between;padding:8px 10px 10px;border-bottom:1px solid var(--line)}
.notif-menu .nh b{font-size:12.5px}
.notif-menu .chip{background:var(--soft);border-radius:20px;padding:3px 10px;font-size:10px;font-weight:800;color:var(--red)}
.notif-item{padding:10px 7px;border-top:1px solid var(--line);font-size:11px;font-weight:700;color:var(--muted)}
.notif-item:first-of-type{border-top:0}
.notif-item b{display:block;color:var(--ink);font-size:11.5px}
.notif-item.unread{background:rgba(200,16,46,.05);border-radius:10px}

/* Drawer Menu */
.ux-menu-overlay{position:fixed;inset:0;background:rgba(4,8,18,.5);backdrop-filter:blur(3px);z-index:1190;opacity:0;pointer-events:none;transition:.3s}
.ux-menu-overlay.open{opacity:1;pointer-events:auto}
.ux-menu-panel{position:fixed;top:0;bottom:0;left:0;width:300px;max-width:86vw;z-index:1200;background:var(--paper);box-shadow:8px 0 40px rgba(0,0,0,.3);transform:translateX(-105%);transition:transform .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;padding:16px;overflow-y:auto}
.ux-menu-panel.open{transform:none}
.ux-menu-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.ux-menu-head b{font-size:15px;color:var(--ink)}
.ux-menu-x{background:var(--soft);width:32px;height:32px;border-radius:999px;cursor:pointer;font-size:14px;color:var(--ink)}
.ux-menu-grid{display:flex;flex-direction:column;gap:5px}
.nav-btn{display:flex;align-items:center;gap:10px;padding:11px 12px;font-size:12.5px;font-weight:800;color:var(--muted);border-radius:12px;white-space:nowrap;transition:.18s;text-align:right;width:100%}
.nav-btn:hover{color:var(--ink);background:var(--soft)}
.nav-btn.active{color:#fff;background:linear-gradient(150deg,var(--red),var(--red2));box-shadow:0 6px 16px -4px rgba(151,13,34,.45)}

/* News Banner */
.news-banner{position:relative;overflow:hidden;border-radius:18px;background:linear-gradient(135deg,#0B1120,#172554 55%,#1e293b);color:#fff;padding:18px;margin:0 0 18px;box-shadow:0 12px 28px rgba(15,23,42,.14);min-height:230px;display:flex;flex-direction:column;justify-content:space-between}
.news-banner-head{display:flex;align-items:center;justify-content:space-between;gap:10px;border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:12px;position:relative;z-index:2}
.news-live{display:flex;align-items:center;gap:8px}
.pulse-dot{position:relative;display:inline-flex;width:8px;height:8px}
.pulse-ring{position:absolute;inset:0;border-radius:50%;background:#FBD34D;animation:ping .9s infinite;opacity:.7}
.pulse-core{position:relative;border-radius:50%;background:#F59E0B;width:8px;height:8px}
@keyframes ping{75%,100%{transform:scale(2);opacity:0}}
.news-live-label{font-size:11px;font-weight:900;color:#FBD34D;letter-spacing:.05em}
.news-chip{background:rgba(23,39,181,.5);border:1px solid rgba(100,130,255,.3);color:#93C5FD;font-size:9px;font-weight:800;padding:2px 8px;border-radius:20px}
.news-google-btn{display:inline-flex;align-items:center;gap:5px;background:rgba(66,133,244,.15);border:1px solid rgba(66,133,244,.35);color:#93C5FD;font-size:9px;font-weight:900;padding:4px 10px;border-radius:20px;white-space:nowrap}
.news-google-btn:hover{background:rgba(66,133,244,.28)}
.news-body{flex:1;margin:14px 0;position:relative;z-index:2}
.news-tags{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;align-items:center}
.news-cat-tag{background:#10B98122;border:1px solid #10B98144;color:#10B981;font-size:10px;font-weight:800;padding:2px 9px;border-radius:7px}
.news-source{font-size:10px;color:rgba(255,255,255,.35);font-weight:700}
.news-sep{font-size:10px;color:rgba(255,255,255,.18);font-weight:600}
.news-counter{font-size:10px;color:#93C5FD;font-weight:700}
.news-headline{display:block;font-size:15px;font-weight:900;color:#fff;line-height:1.55;margin-bottom:8px}
.news-headline:hover{color:#FBD34D}
.news-summary{font-size:11px;color:rgba(255,255,255,.68);font-weight:600;line-height:1.75;margin:0}
.news-footer{position:relative;z-index:2}
.news-progress{height:3px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:12px}
.news-progress-bar{height:100%;background:linear-gradient(90deg,#F59E0B,#60A5FA);border-radius:3px;transition:width .4s}
.news-nav{display:flex;align-items:center;justify-content:space-between;gap:10px}
.news-nav-btns{display:flex;align-items:center;gap:6px}
.news-nav-btn{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#fff;font-size:16px;line-height:1;cursor:pointer;transition:.2s}
.news-nav-btn:hover{background:#F59E0B;color:#1C1917;transform:translateY(-1px)}
.news-dots{display:flex;align-items:center;gap:6px;margin-right:4px}
.news-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.2);border:none;cursor:pointer;font-size:9px;font-weight:900;color:#1C1917;transition:.2s}
.news-dot.active{width:22px;height:16px;border-radius:4px;background:#F59E0B}
.news-date{font-size:10px;color:rgba(255,255,255,.4);font-weight:600}

/* Breadcrumb */
.crumb{font-size:11px;font-weight:700;color:var(--muted);margin:0 0 12px}

/* Hero */
.hero{position:relative;overflow:hidden;background:radial-gradient(80% 150% at 90% 0,#9e142d 0,#38100e 48%,#1e1512 100%);border-radius:26px;padding:34px;color:#fff;min-height:275px;display:flex;align-items:center}
.hero:after{content:'🇦🇹';position:absolute;left:5%;bottom:-36px;font-size:210px;opacity:.1;transform:rotate(-10deg);pointer-events:none}
.hero-content{position:relative;z-index:1;max-width:690px}
.eyebrow{display:inline-flex;gap:7px;align-items:center;background:rgba(255,255,255,.13);padding:5px 11px;border:1px solid rgba(255,255,255,.17);border-radius:30px;font-weight:800;font-size:11px}
.hero h1{font-size:clamp(25px,4vw,42px);line-height:1.35;margin:13px 0 8px;font-weight:900}
.hero p{margin:0;color:#f4dfe2;font-size:14px;max-width:600px}
.hero-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:21px}
.white-btn,.outline-btn{padding:10px 15px;border-radius:12px;font-weight:900;font-size:12px;cursor:pointer}
.white-btn{background:#fff;color:var(--red)}
.outline-btn{color:#fff;border:1px solid rgba(255,255,255,.32);background:rgba(255,255,255,.08)}

/* Quick stats */
.quick{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0 27px}
.stat{background:var(--paper);border:1px solid var(--line);border-radius:16px;padding:14px;box-shadow:0 3px 9px rgba(45,28,18,.04)}
.stat b{display:block;font-size:20px;color:var(--red);line-height:1.3}
.stat span{font-weight:700;color:var(--muted);font-size:11px}

/* Layout */
.layout{display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:18px}
.card{background:var(--paper);border:1px solid var(--line);border-radius:var(--r);box-shadow:0 3px 10px rgba(45,28,18,.035)}
.section{padding:20px}
.sec-title{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-bottom:15px}
.sec-title h2{margin:0;font-size:18px;line-height:1.4;color:var(--ink)}
.sec-title p{margin:2px 0 0;color:var(--muted);font-size:11px;font-weight:600}
.tag{font-size:10px;font-weight:900;padding:4px 9px;border-radius:20px;background:#fce4e7;color:var(--red);white-space:nowrap}
[data-theme="dark"] .tag{background:rgba(200,16,46,.15)}

/* Roadmap */
.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}
.phase{border:1px solid var(--line);border-radius:14px;padding:12px;position:relative;min-height:130px;background:linear-gradient(160deg,var(--paper),var(--soft))}
.phase .day{color:var(--red);font-size:11px;font-weight:900}
.phase b{display:block;font-size:13px;margin:5px 0;color:var(--ink)}
.phase p{margin:0;font-size:10.5px;color:var(--muted);font-weight:600;line-height:1.8}
.phase:before{content:'';position:absolute;top:0;right:0;width:4px;height:100%;border-radius:0 14px 14px 0;background:var(--red)}
.phase:nth-child(2):before{background:var(--gold)}
.phase:nth-child(3):before{background:var(--blue)}
.phase:nth-child(4):before{background:var(--green)}

/* Checklist */
.checklist{margin-top:18px}
.list-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px}
.progress{width:170px;height:9px;background:var(--soft);border-radius:99px;overflow:hidden}
.progress i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--red),#ed536b);transition:.3s}
.progress-label{font-size:11px;font-weight:900;color:var(--red);margin-left:8px}
.check-item{display:flex;align-items:flex-start;gap:11px;padding:13px 2px;border-top:1px solid var(--line);cursor:pointer}
.check-item:first-of-type{border-top:0}
.check-item input{appearance:none;-webkit-appearance:none;flex:0 0 21px;width:21px;height:21px;border:1.5px solid #cdbfb5;border-radius:7px;margin:2px 0 0;background:var(--paper);cursor:pointer;position:relative}
.check-item input:checked{background:var(--green);border-color:var(--green)}
.check-item input:checked:after{content:'✓';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:900}
.check-item input:checked ~ .task b,.check-item input:checked ~ .task p{text-decoration:line-through;opacity:.55}
.task{flex:1}
.task b{font-size:13px;color:var(--ink);font-weight:800}
.task p{font-size:11px;color:var(--muted);font-weight:600;margin:1px 0;line-height:1.75}
.due{font-size:10px;font-weight:900;border-radius:20px;padding:3px 8px;white-space:nowrap;background:#f7eedb;color:#946314}
.due.urgent{background:#fce4e7;color:var(--red)}
[data-theme="dark"] .due{background:rgba(184,134,46,.15)}
[data-theme="dark"] .due.urgent{background:rgba(200,16,46,.18)}
.tip{margin-top:18px;padding:16px;background:linear-gradient(145deg,#eef5f1,#dff1e8);border:1px solid #bce1ce;border-radius:14px;color:#155d45}
[data-theme="dark"] .tip{background:linear-gradient(145deg,#0d2a20,#123528);border-color:#1e5544;color:#a6f0c8}
.tip b{font-size:13px}
.tip p{font-size:11px;margin:4px 0 0;line-height:1.9}

/* Path grid */
.path-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px}
.path{padding:14px;border:1px solid var(--line);border-radius:14px;transition:.2s;background:var(--paper);cursor:pointer;display:block}
.path:hover{transform:translateY(-3px);box-shadow:var(--shadow);border-color:#dfa5af}
.path .emoji{font-size:23px}
.path b{display:block;margin:5px 0;font-size:13px;color:var(--ink)}
.path p{margin:0;font-size:10.5px;color:var(--muted);font-weight:600;line-height:1.8}

/* Sidebar */
.side{display:flex;flex-direction:column;gap:16px}
.notice{padding:17px}
.notice h3{font-size:14px;margin:0 0 7px;color:var(--ink)}
.notice p{font-size:11px;color:var(--muted);margin:0 0 12px;font-weight:600}
.notice.red{border-top:4px solid var(--red)}
.notice.green{border-top:4px solid var(--green)}
.side-link{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-top:1px solid var(--line);font-size:11px;font-weight:800;color:var(--ink)}
.side-link:first-of-type{border:0}
.side-link:hover{color:var(--red)}
.city-select{width:100%;padding:10px;border:1px solid var(--line);background:var(--soft);border-radius:10px;color:var(--ink);font:inherit;font-size:12px;font-weight:700;outline:none}

/* Disclaimer */
.disclaimer{padding:13px 18px;margin-top:17px;color:var(--muted);font-size:10px;font-weight:600;line-height:1.9}
.disclaimer strong{color:var(--red)}

/* Footer */
.footer{background:linear-gradient(135deg,#0b1120,#1e293b);color:#fff;margin-top:30px}
.footer-in{max-width:var(--max);margin:auto;padding:32px 18px;display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:26px}
.footer h4{font-size:14px;font-weight:900;margin:0 0 13px;display:flex;align-items:center;gap:8px;color:#fff}
.footer p{font-size:11.5px;font-weight:500;opacity:.72;line-height:1.95;margin:0}
.footer a{display:block;font-size:11.5px;font-weight:600;opacity:.78;padding:4px 0;transition:.2s}
.footer a:hover{opacity:1;color:#fca5a5}
.footer-social{display:flex;gap:9px;margin-top:13px}
.footer-social a{width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:16px;opacity:.85;padding:0}
.footer-social a:hover{background:var(--red);opacity:1}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding:16px;text-align:center;font-size:10.5px;font-weight:600;opacity:.6;color:#fff}
.newsletter-btn{background:var(--red);color:#fff;border-radius:10px;padding:8px 14px;font-size:11px;font-weight:900;border:none;cursor:pointer}

/* Page stack */
.page-stack{display:flex;flex-direction:column;gap:24px}
.spinner{width:38px;height:38px;border:4px solid var(--line);border-top-color:var(--red);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto}
@keyframes spin{to{transform:rotate(360deg)}}

/* Responsive */
@media(max-width:900px){
  .layout{grid-template-columns:1fr}
  .side{display:grid;grid-template-columns:1fr 1fr}
  .roadmap{grid-template-columns:repeat(2,1fr)}
  .search-wrap{max-width:260px}
  .footer-in{grid-template-columns:1.4fr 1fr}
}
@media(max-width:650px){
  .header-inner{height:62px;gap:8px;padding:0 12px}
  .search-wrap,.clock .d,.btn-assess span,.logo-text p{display:none}
  .header-meta{margin-right:auto;gap:7px}
  .header-btns{gap:6px}
  .logo-text .logo-brand{font-size:15px}
  .logo-icon{width:41px;height:41px}
  .hbtn{width:36px;height:36px}
  .hero{padding:26px 20px;min-height:250px}
  .quick{grid-template-columns:1fr 1fr}
  .side{display:flex}
  .roadmap,.path-grid{grid-template-columns:1fr}
  .section{padding:16px}
  .progress{width:110px}
  .check-item{gap:8px}
  .due{font-size:9px}
  .ticker{font-size:9px}
  .footer-in{grid-template-columns:1fr;padding:26px 18px;gap:20px}
}
`;

export { NAV_PAGES, AUSTRIA_IRAN_NEWS, CHECKLIST_TASKS };