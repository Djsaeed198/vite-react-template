import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IdCard,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronLeft,
  RotateCw,
  Eye,
  Info,
  Layers,
  ArrowRight,
  BookOpen,
  Filter,
  Check,
  Send,
  Download,
  Share2,
  HelpCircle,
  Briefcase,
  Globe2,
  Clock,
  Landmark,
  Scale
} from "lucide-react";
import { toast } from "../utils/toast";
import { VISA_METHODS, ALL_METHOD_SAMPLES } from "../data/visaMethodsData";

export type SampleCategory = "all" | "residence" | "admission" | "special";

export interface DocumentSample {
  id: string;
  category: "residence" | "admission" | "special";
  typeLabel: string;
  subType: string;
  titleFa: string;
  titleDe: string;
  applicantStatus: string;
  issuedBy: string;
  state: "Wien" | "Steiermark" | "Oberösterreich" | "Tirol" | "Salzburg" | "Niederösterreich" | "Kärnten" | "Vorarlberg";
  issueDate: string;
  validUntil: string;
  caseRef: string;
  isSpecialBadge?: boolean;
  specialHighlight?: string;
  workPermitStatus: "آزاد و نامحدود" | "۲۰ ساعت در هفته" | "محدود به کارفرمای مشخص" | "فاقد اجازه کار" | "آزاد پس از فارغ‌التحصیلی";
  degreeOrField?: string;
  legalBasis: string;
  anatomyBreakdown: {
    title: string;
    description: string;
    tag: string;
  }[];
  requirements: string[];
  tipsFa: string;
  cardDesign: {
    variant: "rwr" | "rwr-plus" | "student" | "blue-card" | "permanent" | "independent" | "artist" | "family" | "visa-d" | "admission";
    chipColor?: string;
    cardHolderMasked: string;
    dobMasked: string;
    nationality: string;
    gender: "M" | "F";
    cardNoMasked: string;
    mrzLine1?: string;
    mrzLine2?: string;
    universitySeal?: string;
    signatureAuthority?: string;
    officialClauseDe?: string;
  };
  methodKey?: string;
}

const DOCUMENT_SAMPLES: DocumentSample[] = [
  {
    id: "rwr-it-specialist",
    category: "residence",
    typeLabel: "کارت قرمز-سفید-قرمز",
    subType: "نیروی کار ماهر در مشاغل کمبود (Mangelberuf)",
    titleFa: "کارت اقامت کاری RWR مهندسی نرم‌افزار",
    titleDe: "Rot-Weiß-Rot – Karte (Fachkraft in Mangelberuf)",
    applicantStatus: "مهندس ارشد نرم‌افزار با ۶۵ امتیاز",
    issuedBy: "MA 35 - Magistratsabteilung 35 Wien",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۳/۱۵",
    validUntil: "۲۰۲۶/۰۳/۱۴ (۲ ساله)",
    caseRef: "MA35-EWR/2024-98412-RWR",
    workPermitStatus: "محدود به کارفرمای مشخص",
    legalBasis: "§ 41 Abs 1 iVm § 12a AuslBG (Fachkräfte)",
    isSpecialBadge: true,
    specialHighlight: "صدور سریع در ۵ هفته با همراهی سیستم ABA اتریش",
    anatomyBreakdown: [
      { title: "عنوان مدرک (Art des Titels)", description: "درج رسمی عنوان Rot-Weiß-Rot – Karte بر روی کارت هوشمند بیومتریک اتریش.", tag: "مشخصه رسمی" },
      { title: "شرط کارفرما (Bindung)", description: "این کارت در ۲ سال اول به یک شرکت معین لینک است و در صورت تغییر شغل نیاز به بررسی مجدد AMS دارد.", tag: "نکته حقوقی" },
      { title: "مسیر تمدید به RWR Plus", description: "پس از گذشت ۲۱ ماه کار در طی ۲۴ ماه، متقاضی بدون نیاز به خروج به کارت RWR Plus آزاد تبدیل می‌شود.", tag: "مسیر آینده" },
      { title: "کد MRZ استاندارد ICAO", description: "نوار پایینی حاوی مشخصات ماشین‌خوان معتبر برای ورود و خروج آزادانه در تمامی مرزهای شنگن.", tag: "امنیت مرزی" }
    ],
    requirements: [
      "کسب حداقل ۵۵ یا ۶۵ امتیاز بر اساس سیستم امتیازبندی اتریش",
      "قرارداد کاری رسمی با حقوق ماهیانه مطابق با حداقل دستمزد قانون کار (Kollektivvertrag)",
      "مدرک زبان آلمانی A2 یا انگلیسی B1/B2",
      "تاییدیه اولیه اداره کار اتریش (AMS Gutachten)"
    ],
    tipsFa: "این پرونده یکی از سریع‌ترین و استانداردترین روال‌های RWR در سال ۲۰۲۴ بوده است که تاییدیه AMS آن در کمتر از ۱۸ روز کاری دریافت شد.",
    cardDesign: {
      variant: "rwr",
      chipColor: "#eab308",
      cardHolderMasked: "MORADI, A***N",
      dobMasked: "14.07.1992",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "W8349102X",
      mrzLine1: "ARAUTW8349102X9IRN9207144M2603140<<<<<<<<<<<<<<02",
      mrzLine2: "MORADI<<ARMIN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Gem. § 41 Abs 1 NAG; Beschäftigung nur als Software Engineer bei [Firma GmbH] bewilligungsfrei.",
      signatureAuthority: "Magistrat der Stadt Wien (MA 35)"
    }
  },
  {
    id: "rwr-plus-graduate",
    category: "residence",
    typeLabel: "کارت قرمز-سفید-قرمز پلاس",
    subType: "دسترسی کاملاً آزاد به بازار کار اتریش (Freier Arbeitsmarktzugang)",
    titleFa: "کارت RWR Plus تبدیل از ویزای دانشجویی",
    titleDe: "Rot-Weiß-Rot – Karte Plus (Absolventen)",
    applicantStatus: "فارغ‌التحصیل کارشناسی ارشد دانشگاه وین",
    issuedBy: "BH Graz-Umgebung (Steiermark)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۱/۱۰",
    validUntil: "۲۰۲۷/۰۱/۰۹ (۳ ساله)",
    caseRef: "BHGU-NAG/2024-33120-PLUS",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 41a Abs 1 NAG (Freier Arbeitsmarktzugang)",
    isSpecialBadge: true,
    specialHighlight: "بدون نیاز به آزمون بازار کار AMS و تمدید ۳ ساله",
    anatomyBreakdown: [
      { title: "کلمه طلایی PLUS", description: "وجود عبارت Plus نشان‌دهنده آزادی کامل شغلی و امکان کار در هر شرکت یا حتی فریلنسری در اتریش است.", tag: "مزیت برتر" },
      { title: "عدم نیاز به اسپانسر شغلی", description: "برخلاف کارت RWR عادی، متقاضی با از دست دادن شغل ویزایش باطل نمی‌شود و وقت کافی برای یافتن موقعیت جدید دارد.", tag: "امنیت اقامتی" },
      { title: "مدت اعتبار", description: "معمولاً ابتدا برای یک سال یا سه سال تمدید شده و گام نهایی پیش از اقامت دائم ۵ ساله (Daueraufenthalt) است.", tag: "مدت" }
    ],
    requirements: [
      "فارغ‌التحصیلی از یکی از دانشگاه‌ها یا مراکز آموزش عالی معتبر اتریش (FH / Uni)",
      "یا داشتن سابقه ۲ سال کار قانونی تمام‌وقت با کارت RWR معمولی",
      "اثبات تمکن مالی و درآمد مستقل بدون وابستگی به کمک‌های دولتی (Sozialhilfe)",
      "بیمه درمانی معتبر و محل سکونت ثبت شده (Meldezettel)"
    ],
    tipsFa: "نکته کلیدی: دانشجویان فارغ‌التحصیل اتریش می‌توانند پس از فارغ‌التحصیلی ۱۲ ماه مهلت جستجوی کار دریافت کرده و به محض بستن قرارداد با حداقل حقوق قانونی، کارت RWR Plus مستقیم بگیرند.",
    cardDesign: {
      variant: "rwr-plus",
      chipColor: "#38bdf8",
      cardHolderMasked: "REZAEI, S***A",
      dobMasked: "22.11.1995",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "G1928475P",
      mrzLine1: "ARAUTG1928475P4IRN9511228F2701095<<<<<<<<<<<<<<06",
      mrzLine2: "REZAEI<<SARA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Rot-Weiß-Rot – Karte Plus gem. § 41a Abs 1 NAG. Freier Zugang zum gesamten österreichischen Arbeitsmarkt.",
      signatureAuthority: "Bezirkshauptmannschaft Graz-Umgebung"
    }
  },
  {
    id: "student-residence-permit",
    category: "residence",
    typeLabel: "اقامت تحصیلی (مجوز اقامت دانشجو)",
    subType: "دانشجویان رسمی دانشگاه‌های دولتی اتریش",
    titleFa: "کارت اقامت دانشجویی اتریش (Aufenthaltsbewilligung Student)",
    titleDe: "Aufenthaltsbewilligung »Student«",
    applicantStatus: "دانشجوی مقطع کارشناسی دانشگاه وین",
    issuedBy: "MA 35 - Referat 1.2 Universitäten",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۹/۰۱",
    validUntil: "۲۰۲۵/۰۹/۰۱ (تمدید سالانه)",
    caseRef: "MA35-STU/2024-55410-VWU",
    workPermitStatus: "۲۰ ساعت در هفته",
    legalBasis: "§ 64 NAG (Niederlassungs- und Aufenthaltsgesetz)",
    anatomyBreakdown: [
      { title: "نوع مدرک: Aufenthaltsbewilligung", description: "مجوز اقامت موقت با هدف ویژه (تحصیل) که سالانه با ارائه حداقل ۱۶ واحد ECTS در سال تمدید می‌شود.", tag: "اساس قانونی" },
      { title: "حق کار دانشجویی (Erwerbstätigkeit)", description: "دانشجویان خارجی در اتریش قانوناً مجازند تا ۲۰ ساعت در هفته در کنار تحصیل با دریافت Beschäftigungsbewilligung کار کنند.", tag: "اشتغال" },
      { title: "شرط تمدید سالانه (Studienerfolgsnachweis)", description: "برای تمدید در MA35 در پایان سال، کسب حداقل ۱۶ واحد ECTS یا ۸ ساعت درس در ترم اجباری است.", tag: "تمدید" }
    ],
    requirements: [
      "برگه پذیرش قطعی یا مشروط دانشگاه دولتی اتریش (Zulassungsbescheid)",
      "اثبات تمکن مالی برای یک سال زندگی در حساب بانکی شخصی (حدود ۷٬۵۰۰ الی ۱۳٬۰۰۰ یورو بسته به سن)",
      "قرارداد خوابگاه دانشجویی یا اجاره‌نامه مسکن مورد تایید (Wohnrechtsvereinbarung)",
      "بیمه درمانی معتبر دانشجویی دولتی اتریش (ÖGK Selbstversicherung)"
    ],
    tipsFa: "نکته مهم: متقاضیان دوره مقدماتی زبان (VWU) نیز دقیقاً همین کارت اقامت دانشجویی را دریافت می‌کنند و از همان ابتدا از تمامی حقوق دانشجویی بهره‌مند هستند.",
    cardDesign: {
      variant: "student",
      chipColor: "#10b981",
      cardHolderMasked: "HOSSEINI, P***A",
      dobMasked: "03.05.2001",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "W4829103S",
      mrzLine1: "ARAUTW4829103S1IRN0105037M2509018<<<<<<<<<<<<<<04",
      mrzLine2: "HOSSEINI<<POUYA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Aufenthaltsbewilligung Student gem. § 64 NAG. Unselbständige Erwerbstätigkeit bis zu 20 Std/Woche zulässig.",
      signatureAuthority: "Magistratsabteilung 35 - Stadt Wien"
    }
  },
  {
    id: "blue-card-eu",
    category: "residence",
    typeLabel: "کارت آبی اتحادیه اروپا",
    subType: "نیروهای دانشگاهی با قرارداد با درآمد بالا",
    titleFa: "کارت آبی اروپا (Blaue Karte EU)",
    titleDe: "Blaue Karte EU (Europäische Union)",
    applicantStatus: "مدیر پروژه سیستم‌های ابری با مدرک مهندسی",
    issuedBy: "Landeshauptmann von Oberösterreich (Linz)",
    state: "Oberösterreich",
    issueDate: "۲۰۲۳/۱۱/۲۰",
    validUntil: "۲۰۲۵/۱۱/۱۹ (۲ ساله)",
    caseRef: "OOE-AB-2023-71889-EUBC",
    workPermitStatus: "محدود به کارفرمای مشخص",
    legalBasis: "§ 42 NAG iVm § 12c AuslBG",
    anatomyBreakdown: [
      { title: "اعتبار سراسری در اتحادیه اروپا", description: "پس از ۱۲ الی ۱۸ ماه اقامت در اتریش با کارت آبی، انتقال پرونده به سایر کشورهای عضو اتحادیه با سهولت بالا ممکن است.", tag: "شنگن" },
      { title: "حداقل حقوق مصوب", description: "قرارداد باید حداقل حقوق ناخالص سالانه مصوب برای کارت آبی را برآورده سازد.", tag: "درآمد" },
      { title: "مسیر سریع به اقامت دائم", description: "دارندگان بلوکارت با داشتن مدرک زبان آلمانی B1 می‌توانند پس از ۲۱ ماه به اقامت دائم دست یابند.", tag: "اقامت دائم" }
    ],
    requirements: [
      "مدرک لیسانس، فوق لیسانس یا معادل ۵ سال سابقه کار تخصصی تایید شده",
      "قرارداد کاری حداقل ۶ ماهه با حقوق مطابق حد آستانه درآمدی اتحادیه اروپا",
      "عدم سوءپیشینه و آزمایشات سلامت در صورت نیاز"
    ],
    tipsFa: "کارت آبی برای افرادی که حقوق قراردادی بالاتری دارند و مایل به تحرک کاری در سراسر اروپا هستند ایده‌آل‌ترین گزینه است.",
    cardDesign: {
      variant: "blue-card",
      chipColor: "#2563eb",
      cardHolderMasked: "DAVOODI, N***A",
      dobMasked: "18.09.1988",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "L5582910B",
      mrzLine1: "ARAUTL5582910B8IRN8809183F2511192<<<<<<<<<<<<<<01",
      mrzLine2: "DAVOODI<<NIMA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Blaue Karte EU gem. § 42 NAG. Gültig für qualifizierte Beschäftigung gem. Ausländerbeschäftigungsgesetz.",
      signatureAuthority: "Amt der Oö. Landesregierung - Linz"
    }
  },
  {
    id: "daueraufenthalt-eu",
    category: "residence",
    typeLabel: "اقامت دائم اتحادیه اروپا",
    subType: "اقامت ۵ ساله نامحدود (Permanent Residence)",
    titleFa: "کارت اقامت دائم ۵ ساله اتریش (Daueraufenthalt – EU)",
    titleDe: "Daueraufenthalt – EU",
    applicantStatus: "۵ سال اقامت قانونی مستمر در وین",
    issuedBy: "MA 35 - Fachbereich Daueraufenthalt",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۲/۰۱",
    validUntil: "۲۰۲۹/۰۲/۰۱ (۵ ساله)",
    caseRef: "MA35-DA/2024-102934-EU",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 45 NAG (Dauerhafter Aufenthalt)",
    isSpecialBadge: true,
    specialHighlight: "عالی‌ترین سطح اقامت پیش از دریافت پاسپورت و تابعیت اتریش",
    anatomyBreakdown: [
      { title: "اعتبار کارت ۵ ساله", description: "کارت پلاستیکی هر ۵ سال تنها با یک عکس جدید و بدون بررسی تمکن و درآمد تمدید می‌شود.", tag: "تمدید آسان" },
      { title: "آزادی کامل اشتغال و راه‌اندازی کسب‌وکار", description: "دسترسی ۱۰۰٪ آزاد و نامحدود به تمامی مشاغل، خدمات رفاهی و بیمه‌ای اتریش.", tag: "حقوق کامل" },
      { title: "گام نهایی جهت پاسپورت اتریش", description: "پس از ۱ سال دیگر (مجموعاً ۶ سال برای افراد دارای زبان B2 یا ادغام بالا) امکان تقاضای شهروندی و پاسپورت قرمز فراهم است.", tag: "تابعیت" }
    ],
    requirements: [
      "۵ سال اقامت قانونی پیوسته و بدون وقفه در قلمرو جمهوری اتریش",
      "گواهی قبولی در آزمون ادغام مدول ۲ (Integrationsprüfung B1)",
      "اثبات درآمد و تمکن مالی مستقل در ۵ سال گذشته",
      "عدم سابقه کیفری و پایبندی به نظم دموکراتیک جمهوری اتریش"
    ],
    tipsFa: "این کارت به متقاضی حق اقامت طولانی‌مدت در سایر کشورهای اتحادیه اروپا را نیز بر اساس دستورالعمل 2003/109/EC اعطا می‌کند.",
    cardDesign: {
      variant: "permanent",
      chipColor: "#d97706",
      cardHolderMasked: "TAGHAVI, M***D",
      dobMasked: "05.02.1985",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "W9930124D",
      mrzLine1: "ARAUTW9930124D3IRN8502052M2902019<<<<<<<<<<<<<<08",
      mrzLine2: "TAGHAVI<<MEHRDAD<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Daueraufenthalt – EU gem. § 45 NAG. Freier Arbeitsmarktzugang. Unbefristetes Niederlassungsrecht.",
      signatureAuthority: "Magistratsabteilung 35 - Wien"
    }
  },
  {
    id: "independent-wealth-residence",
    category: "residence",
    typeLabel: "اقامت تمکن مالی (خودحمایتی)",
    subType: "اقامت بدون اجازه کار (Niederlassungsbewilligung)",
    titleFa: "کارت اقامت خودحمایتی اتریش",
    titleDe: "Niederlassungsbewilligung (ausgenommen Erwerbstätigkeit)",
    applicantStatus: "سرپرست خانواده با سرمایه و درآمد مستمر ارزی",
    issuedBy: "Bezirkshauptmannschaft Salzburg-Umgebung",
    state: "Salzburg",
    issueDate: "۲۰۲۴/۰۱/۱۵",
    validUntil: "۲۰۲۵/۰۱/۱۴",
    caseRef: "BHS-NB-2024-44102-QUOTA",
    workPermitStatus: "فاقد اجازه کار",
    legalBasis: "§ 44 NAG (Quote Niederlassungsbewilligung)",
    anatomyBreakdown: [
      { title: "سهمیه استانی (Quote)", description: "این اقامت تابع سهمیه سالانه هر ایالت است که اول ژانویه هر سال بازگشایی می‌شود.", tag: "سهمیه سالانه" },
      { title: "ممنوعیت کار فعال", description: "دارنده اجازه فعالیت به عنوان کارمند یا کارگر را ندارد اما دریافت سود سهام، اجاره املاک و درآمدهای غیرفعال مجاز است.", tag: "نوع درآمد" },
      { title: "تمدید منظم تا اقامت دائم", description: "پس از ۵ سال حفظ شرایط، به اقامت دائم ۵ ساله Daueraufenthalt تبدیل می‌شود.", tag: "مسیر اقامتی" }
    ],
    requirements: [
      "اثبات درآمد ماهیانه ثابت و غیرفعال (حداقل دو برابر حداقل حقوق استاندارد اتریش برای سرپرست و خانواده)",
      "سپرده بانکی قابل توجه در اتریش یا بانک‌های معتبر اروپایی",
      "قرارداد خرید یا اجاره منزل مسکونی با متراژ کافی برای اعضای خانواده",
      "بیمه درمانی خصوصی و کامل با پوشش ۱۰۰ درصدی هزینه‌ها در اتریش (Private Krankenversicherung)",
      "مدرک زبان آلمانی A1 در زمان ورود"
    ],
    tipsFa: "پرونده‌های تمکن مالی به دلیل حساسیت سهمیه باید در نخستین ساعات کاری روز ۲ ژانویه در سفارت یا مراجع استانی ثبت گردند.",
    cardDesign: {
      variant: "independent",
      chipColor: "#64748b",
      cardHolderMasked: "FARHADI, K***N",
      dobMasked: "10.12.1979",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "S3391024K",
      mrzLine1: "ARAUTS3391024K1IRN7912108M2501143<<<<<<<<<<<<<<03",
      mrzLine2: "FARHADI<<KAMRAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Niederlassungsbewilligung gem. § 44 NAG. Ausgenommen Erwerbstätigkeit. Quotenpflichtig.",
      signatureAuthority: "BH Salzburg-Umgebung"
    }
  },
  // ADMISSION LETTERS (پذیرش‌های تحصیلی)
  {
    id: "admission-uni-wien-cs",
    category: "admission",
    typeLabel: "نامه پذیرش رسمی دانشگاه وین",
    subType: "مقطع کارشناسی ارشد مهندسی کامپیوتر و داده",
    titleFa: "پذیرش قطعی کارشناسی ارشد دانشگاه وین (Uni Wien)",
    titleDe: "Universität Wien – Zulassungsbescheid zum Masterstudium",
    applicantStatus: "فارغ‌التحصیل دانشگاه دولتی با معدل الف",
    issuedBy: "Universität Wien - DLE Studienservice und Lehrwesen",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۶/۲۸",
    validUntil: "ترم زمستان ۲۰۲۴/۲۰۲۵ (قابل تمدید تا ۳ ترم)",
    caseRef: "GZ: 2024-0.491.821-Zul/UW",
    workPermitStatus: "۲۰ ساعت در هفته",
    degreeOrField: "Masterstudium Data Science (066 940)",
    legalBasis: "§ 63 und § 64 Universitätsgesetz 2002 (UG)",
    isSpecialBadge: true,
    specialHighlight: "دارای امضای رسمی دیجیتال دولت اتریش (Amtssignatur) و کد تایید اصالت",
    anatomyBreakdown: [
      { title: "تصمیم قطعی (Bescheid Spruch)", description: "بخش حقوقی اصلی که تصریح می‌کند متقاضی به عنوان دانشجوی رسمی (Ordentlicher Studierender) پذیرفته شده است.", tag: "متن حقوقی" },
      { title: "کد رشته دانشگاهی (Studienkennzahl)", description: "شناسه ۶ رقمی سراسری رشته در اتریش (مثلا 066 940 برای مستر دیتا ساینس) جهت ثبت‌نام و دریافت کارت دانشجویی.", tag: "شناسه" },
      { title: "تاییدیه زبان و پیش‌نیازها", description: "درج شفاف پذیرش مستقیم بدون نیاز به دوره‌های طولانی یا معرفی به کالج پیش‌دانشگاهی VWU.", tag: "پذیرش مستقیم" },
      { title: "امضای دیجیتال فدرال (Amtssignatur)", description: "حاوی لوگوی رسمی عقاب فدرال و شناسه رمزنگاری شده برای استعلام مستقیم توسط سفارت اتریش در تهران.", tag: "استعلام سفارت" }
    ],
    requirements: [
      "مدرک کارشناسی مرتبط از دانشگاه معتبر به همراه ریزنمرات تایید شده با آپوستیل / تاییدات دادگستری و وزارت خارجه",
      "گواهی اشتغال به تحصیل یا صلاحیت ورود به دانشگاه (Letter of Eligibility / Konkurrenzprüfung)",
      "رزومه تحصیلی و انگیزش‌نامه علمی استاندارد مطابق معیارهای دانشگاه وین",
      "مدرک زبان انگلیسی C1 یا آلمانی بر اساس زبان تدریس رشته"
    ],
    tipsFa: "این پذیرش مستقیماً مورد قبول بخش ویزای سفارت اتریش در تهران برای صدور ویزای دانشجویی است و نیازی به ترجمه مجدد ندارد.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "MOHAMMADZADEH, N***N",
      dobMasked: "19.04.1998",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "UW-2024-940",
      universitySeal: "UNIVERSITÄT WIEN - GEGRÜNDET 1365",
      officialClauseDe: "Bescheid: Die Zulassung zum ordentlichen Masterstudium Data Science wird gemäß § 63 Abs 1 UG 2002 erteilt.",
      signatureAuthority: "Rektorat der Universität Wien - Studienservice"
    }
  },
  {
    id: "admission-tu-wien-engineering",
    category: "admission",
    typeLabel: "نامه پذیرش دانشگاه صنعتی وین (TU Wien)",
    subType: "کارشناسی ارشد مهندسی برق و اتوماسیون",
    titleFa: "پذیرش کارشناسی ارشد دانشگاه صنعتی وین (TU Wien)",
    titleDe: "TU Wien – Bescheid über die Zulassung zum Studium",
    applicantStatus: "فارغ‌التحصیل مهندسی برق با رزومه پژوهشی",
    issuedBy: "Technische Universität Wien - Studienabteilung",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۷/۱۴",
    validUntil: "تا پایان مهلت ثبت‌نام ترم جاری",
    caseRef: "TU-W-ZUL/2024-88102-ETIT",
    workPermitStatus: "۲۰ ساعت در هفته",
    degreeOrField: "Masterstudium Elektrotechnik und Informationstechnik",
    legalBasis: "§ 60 ff. Universitätsgesetz 2002",
    anatomyBreakdown: [
      { title: "سربرگ رسمی دانشگاه صنعتی وین", description: "لوگوی رسمی TU Wien با شماره پرونده اختصاصی جهت مکاتبات اداری و وقت سفارت.", tag: "اعتبار رسمی" },
      { title: "ارزیابی مدارک مبدا (Äquivalenzprüfung)", description: "تایید معادل بودن واحدهای گذرانده شده در مقطع لیسانس با سرفصل‌های دانشگاه صنعتی وین.", tag: "معادلسازی" },
      { title: "مهلت اینسکریپشن (Zulassungsfrist)", description: "تاریخ دقیق مهلت مراجعه حضوری به باجه پذیرش دانشگاه صنعتی برای دریافت کارت دانشجویی (TU Card).", tag: "تقویم آموزشی" }
    ],
    requirements: [
      "دانشنامه کارشناسی مهندسی برق و مدارک ترجمه شده با تاییدات رسمی",
      "گواهی صلاحیت ادامه تحصیل در همان مقطع و رشته",
      "مدرک زبان آلمانی یا انگلیسی معتبر مطابق الزامات دپارتمان"
    ],
    tipsFa: "دانشگاه صنعتی وین از معتبرترین دانشگاه‌های فنی اروپاست و فارغ‌التحصیلان آن بدون معطلی در بازار کار فناوری اتریش جذب می‌شوند.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "SHAFIEE, B***N",
      dobMasked: "30.08.1996",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "TU-2024-881",
      universitySeal: "TECHNISCHE UNIVERSITÄT WIEN",
      officialClauseDe: "Bescheid über die bescheidmäßige Zulassung gem. § 60 UG zum Masterstudium Elektrotechnik.",
      signatureAuthority: "Vizerektor für Studium und Lehre - TU Wien"
    }
  },
  {
    id: "admission-meduni-wien",
    category: "admission",
    typeLabel: "نامه پذیرش و ارزیابی دانشگاه علوم پزشکی وین",
    subType: "نوستریفیکاسیون و تکمیل دوره پزشکی عمومی",
    titleFa: "نامه پذیرش ارزیابی پزشکی دانشگاه علوم پزشکی وین (MedUni Wien)",
    titleDe: "Medizinische Universität Wien – Nostrifizierungsbescheid",
    applicantStatus: "پزشک عمومی متقاضی معادل‌سازی در اتریش",
    issuedBy: "Medizinische Universität Wien - Studienabteilung",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۴/۱۸",
    validUntil: "معتبر برای دوره آزمون‌های تکمیلی",
    caseRef: "MUW-NOST/2024-11492-MED",
    workPermitStatus: "آزاد پس از فارغ‌التحصیلی",
    degreeOrField: "Humanmedizin (Dr. med. univ.)",
    legalBasis: "§ 90 Universitätsgesetz 2002 (Nostrifizierung)",
    isSpecialBadge: true,
    specialHighlight: "تعیین دقیق آزمون‌های تکمیلی تطبیق مدرک پزشکی عمومی در اتریش",
    anatomyBreakdown: [
      { title: "برگه رسمی نوستریفیکاسیون", description: "مشخص‌کننده امتحانات بالینی و تئوری مورد نیاز برای اخذ اجازه طبابت رسمی در اتریش.", tag: "پزشکی" },
      { title: "ارزیابی ساعات بالینی و اینترنشیپ", description: "تطبیق کارورزی‌های بیمارستانی گذرانده شده با نظام درمانی اتریش (KPJ).", tag: "بیمارستانی" },
      { title: "مسیر عضویت در سازمان نظام پزشکی (Ärztekammer)", description: "مرحله ضروری جهت اشتغال به عنوان پزشک دستیار (Assistenzarzt) در بیمارستان‌های اتریش.", tag: "اشتغال پزشکی" }
    ],
    requirements: [
      "دانشنامه پزشکی عمومی به همراه ریزنمرات دوره‌های کارورزی و بالینی",
      "گواهی گود استندینگ (Certificate of Good Standing) از سازمان نظام پزشکی ایران",
      "مدرک زبان آلمانی عمومی حداقل B2 و آمادگی برای آزمون زبان تخصصی پزشکی C1"
    ],
    tipsFa: "پرونده‌های نوستریفیکاسیون پزشکی اتریش از باارزش‌ترین گواهی‌ها هستند که به متقاضی مسیر تبدیل به پزشک رسمی در اروپا را می‌گشایند.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "ALAVI, D***R. S",
      dobMasked: "12.01.1989",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "MUW-2024-114",
      universitySeal: "MEDIZINISCHE UNIVERSITÄT WIEN",
      officialClauseDe: "Bescheid über die Nostrifizierung des ausländischen Studienabschlusses als Dr. med. univ. gem. § 90 UG.",
      signatureAuthority: "Curriculumdirektion Humanmedizin - MedUni Wien"
    }
  },
  {
    id: "admission-wu-wien-business",
    category: "admission",
    typeLabel: "پذیرش دانشگاه اقتصاد و تجارت وین (WU Wien)",
    subType: "کارشناسی ارشد فایننس و مدیریت بین‌الملل",
    titleFa: "پذیرش ارشد بیزینس و اقتصاد دانشگاه WU وین",
    titleDe: "WU (Wirtschaftsuniversität Wien) – Master Zulassung",
    applicantStatus: "فارغ‌التحصیل اقتصاد با مدرک GMAT ۶۸۰",
    issuedBy: "Wirtschaftsuniversität Wien - Admissions Office",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۵/۲۲",
    validUntil: "ترم پاییز ۲۰۲۴",
    caseRef: "WU-ADM/2024-40918-FIN",
    workPermitStatus: "۲۰ ساعت در هفته",
    degreeOrField: "Master in Quantitative Finance & Economics",
    legalBasis: "§ 63 ff. UG 2002",
    anatomyBreakdown: [
      { title: "پذیرش یکی از برترین بیزینس اسکول‌های اروپا", description: "دانشگاه اقتصاد وین دارای اعتبار جهانی سه‌گانه (Triple Crown Accreditation) است.", tag: "اعتبار جهانی" },
      { title: "معافیت از آزمون‌های ورودی داخلی", description: "تایید صلاحیت مستقیم بر اساس نمره برجسته GMAT و رزومه تحصیلی آکادمیک.", tag: "معافیت آزمون" },
      { title: "معرفی جهت ویزای ورود اتریش", description: "برگه رسمی ممهور به بارکد استعلام مستقیم برای سفارت و اداره مهاجرت اتریش.", tag: "اداری" }
    ],
    requirements: [
      "مدرک کارشناسی رشته‌های اقتصاد، مدیریت مالی یا ریاضیات کاربردی",
      "نمره رسمی GMAT یا GRE",
      "تسلط کامل به زبان انگلیسی در سطح پیشرفته آکادمیک (IELTS 7.5 یا TOEFL 100)"
    ],
    tipsFa: "دانشجویان دانشگاه اقتصاد وین به سرعت جذب شعب بانک‌های مرکزی و شرکت‌های مشاوره مالی اتریش و آلمان می‌شوند.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "KAZEMI, E***N",
      dobMasked: "07.03.1997",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "WU-2024-409",
      universitySeal: "WIRTSCHAFTSUNIVERSITÄT WIEN (WU)",
      officialClauseDe: "Bescheid über die Zulassung zum Masterstudium Quantitative Finance gem. UG 2002.",
      signatureAuthority: "Academic Directorate - WU Wien"
    }
  },
  // SPECIAL BREAKTHROUGH CASES (نمونه‌های ویژه)
  {
    id: "special-fast-track-aba",
    category: "special",
    typeLabel: "پرونده ویژه و رکورد زمانی",
    subType: "صدور فوق‌سریع کارت RWR در کمتر از ۴ هفته",
    titleFa: "اخذ کارت قرمز-سفید-قرمز در ۲۶ روز کاری با همراهی ABA",
    titleDe: "Fast-Track Rot-Weiß-Rot – Karte via ABA Work in Austria",
    applicantStatus: "مدیر زیرساخت ابری با آفر شغلی در وین",
    issuedBy: "MA 35 Wien + Austrian Business Agency (ABA)",
    state: "Wien",
    issueDate: "۲۰۲۴/۰۸/۰۵",
    validUntil: "۲۰۲۶/۰۸/۰۴",
    caseRef: "ABA-EXP-2024/0912-FAST",
    workPermitStatus: "محدود به کارفرمای مشخص",
    legalBasis: "§ 41 Abs 1 NAG iVm ABA Fast-Track Service",
    isSpecialBadge: true,
    specialHighlight: "⭐ رکورد زمانی: تنها ۲۶ روز کاری از ارسال مدارک تا تحویل کارت اقامت فیزیکی",
    anatomyBreakdown: [
      { title: "همکاری با ABA (Austrian Business Agency)", description: "استفاده از کانال اختصاصی شرکت‌های فناورانه اتریش برای پیش‌بررسی مدارک و تسریع پاسخ‌دهی MA35.", tag: "کانال سریع" },
      { title: "ارزیابی همزمان AMS و MA35", description: "رسیدگی موازی به جای روال سنتی متوالی، که باعث کاهش زمان انتظار از ۴ ماه به کمتر از ۱ ماه شد.", tag: "فرآیند موازی" },
      { title: "ارائه ویزای D ورود سریع", description: "صدور فوری روادید ورود جهت ثبت اثر انگشت در وین بدون فوت وقت اداری.", tag: "ورود به اتریش" }
    ],
    requirements: [
      "قرارداد شغلی با شرکت ثبت شده در اتریش با حمایت و معرفی آژانس تجاری اتریش",
      "رزومه مستند و مدارک ترجمه شده با سوابق شفاف بیمه و سابقه کاری",
      "حقوق پایه بالاتر از میانگین بازار کار تخصصی اتریش"
    ],
    tipsFa: "اگر کارفرمای اتریشی شما از طریق ABA اقدام کند، زمان رسیدگی به پرونده به طرز چشمگیری کوتاه می‌شود.",
    cardDesign: {
      variant: "rwr",
      chipColor: "#eab308",
      cardHolderMasked: "GOLSHANI, K***N",
      dobMasked: "19.06.1990",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "W7109283A",
      mrzLine1: "ARAUTW7109283A5IRN9006198M2608047<<<<<<<<<<<<<<05",
      mrzLine2: "GOLSHANI<<KEYVAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Rot-Weiß-Rot – Karte via ABA-Expressverfahren. Beschäftigung bewilligungsfrei gem. § 12a AuslBG.",
      signatureAuthority: "Magistratsabteilung 35 - Wien (ABA Fast-Track)"
    }
  },
  {
    id: "special-student-to-rwr-direct",
    category: "special",
    typeLabel: "پرونده ویژه تبدیل وضعیت",
    subType: "تبدیل اقامت تحصیلی به اقامت کاری بدون خروج از خاک اتریش",
    titleFa: "تبدیل موفق اقامت دانشجویی به RWR Plus بلافاصله پس از دفاع",
    titleDe: "Statuswechsel: Student zu Rot-Weiß-Rot – Karte Plus",
    applicantStatus: "فارغ‌التحصیل مستر معماری دانشگاه TU Graz",
    issuedBy: "Amt der Steiermärkischen Landesregierung (Graz)",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۲/۱۵",
    validUntil: "۲۰۲۷/۰۲/۱۴",
    caseRef: "STMK-SW-2024-00214-GRAD",
    workPermitStatus: "آزاد و نامحدود",
    legalBasis: "§ 41a Abs 3 NAG iVm § 64 Abs 5 NAG",
    isSpecialBadge: true,
    specialHighlight: "⭐ بدون بازگشت به کشور مبدا و بدون یک روز وقفه در وضعیت بیمه و اقامت",
    anatomyBreakdown: [
      { title: "درخواست تغییر هدف اقامت (Zweckänderung)", description: "ثبت تقاضای تغییر وضعیت قبل از انقضای اقامت دانشجویی بر اساس مدرک فارغ‌التحصیلی موقت.", tag: "تغییر هدف" },
      { title: "حفظ پیوستگی اقامت قانونی", description: "بهره‌مندی از بند قانونی ادامه اقامت بدون نیاز به مراجعه به سفارت اتریش در تهران.", tag: "تداوم اقامتی" },
      { title: "معافیت از آزمون بازار کار AMS (Arbeitsmarktprüfung)", description: "فارغ‌التحصیلان اتریش بدون تست اولویت نیروی کار محلی کارت دریافت می‌کنند.", tag: "امتیاز دانشجو" }
    ],
    requirements: [
      "گواهی فارغ‌التحصیلی رسمی (Diplom / Masterurkunde) از دانشگاه اتریش",
      "آفر یا پیش‌قرارداد کاری با حداقل حقوق مصوب برای فارغ‌التحصیلان خارجی",
      "اجاره‌نامه معتبر و بیمه درمانی"
    ],
    tipsFa: "بسیاری از دانشجویان نمی‌دانند که نیازی به ترک اتریش ندارند؛ قوانین اتریش حق تغییر هدف اقامت در داخل کشور را تضمین کرده است.",
    cardDesign: {
      variant: "rwr-plus",
      chipColor: "#38bdf8",
      cardHolderMasked: "MIRZAEE, T***A",
      dobMasked: "28.10.1994",
      nationality: "IRN",
      gender: "F",
      cardNoMasked: "G8829104P",
      mrzLine1: "ARAUTG8829104P2IRN9410287F2702148<<<<<<<<<<<<<<07",
      mrzLine2: "MIRZAEE<<TARA<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",
      officialClauseDe: "Zweckänderung von Student zu RWR-Karte Plus gem. § 41a Abs 3 NAG erfolgreich bewilligt.",
      signatureAuthority: "Landeshauptmann von Steiermark - Graz"
    }
  },
  {
    id: "special-phd-full-tuition-waiver",
    category: "special",
    typeLabel: "پرونده ویژه بورسیه و معافیت",
    subType: "پذیرش دکترا با فاند پژوهشی و معافیت کامل شهریه",
    titleFa: "پذیرش دکترای بیوتکنولوژی با معافیت کامل شهریه (Uni Graz)",
    titleDe: "Universität Graz – PhD Zulassung mit Studienbeitragsbefreiung",
    applicantStatus: "پژوهشگر ارشد با مقالات ISI و طرح پژوهشی مصوب",
    issuedBy: "Karl-Franzens-Universität Graz - Doktoratsakademie",
    state: "Steiermark",
    issueDate: "۲۰۲۴/۰۳/۰۵",
    validUntil: "دوره کامل دکترا (۳ الی ۴ ساله)",
    caseRef: "KFU-PHD-2024-0992-BIO",
    workPermitStatus: "آزاد و نامحدود",
    degreeOrField: "Doktoratsstudium der Naturwissenschaften (PhD)",
    legalBasis: "§ 91 Abs 2 Universitätsgesetz 2002",
    isSpecialBadge: true,
    specialHighlight: "⭐ معافیت ۱۰۰٪ از پرداخت شهریه دانشجویان خارجی + قرارداد موقعیت پژوهشی",
    anatomyBreakdown: [
      { title: "نامه رسمی معافیت شهریه (Erlass des Studienbeitrages)", description: "تایید رسمی بخشودگی پرداخت شهریه هر ترم دانشگاهی به دلیل فعالیت در پروژه مصوب ملی اتریش (FWF).", tag: "بورسیه کامل" },
      { title: "قرارداد دستیار پژوهشی (Universitätsassistent)", description: "دریافت حقوق ماهیانه دانشگاهی به عنوان کارمند رسمی دانشگاه به همراه تمامی مزایای بازنشستگی و بیمه.", tag: "استخدام دانشگاهی" },
      { title: "پوشش کامل برای همسر و فرزندان", description: "امکان همراهی بی دردسر خانواده با کارت اقامت الحاق RWR Plus با اجازه کار آزاد برای همسر.", tag: "الحاق خانواده" }
    ],
    requirements: [
      "پروپوزال تحقیقاتی مصوب و موافقت‌نامه کتبی استاد راهنما (Betreuungszusage)",
      "رزومه علمی با سابقه مقالات پژوهشی بین‌المللی",
      "مصاحبه علمی موفق با کمیته داوری دپارتمان"
    ],
    tipsFa: "پذیرش‌های پژوهشی دکترا در اتریش شغل محسوب شده و مستقیماً منجر به کارت اقامت ویژه محققان (Forscher) یا RWR پلاس می‌شود.",
    cardDesign: {
      variant: "admission",
      cardHolderMasked: "EBRAHIMI, M***N",
      dobMasked: "15.08.1991",
      nationality: "IRN",
      gender: "M",
      cardNoMasked: "KFU-2024-992",
      universitySeal: "KARL-FRANZENS-UNIVERSITÄT GRAZ",
      officialClauseDe: "Bescheid über die bescheidmäßige Zulassung zum Doktorat der Naturwissenschaften gem. § 91 Abs 2 UG.",
      signatureAuthority: "Dekanat der Naturwissenschaftlichen Fakultät - Uni Graz"
    }
  }
];

// Conversion of all 40 method-specific samples from visaMethodsData
const METHOD_DOCUMENT_SAMPLES: DocumentSample[] = ALL_METHOD_SAMPLES.map((sample) => {
  let workPermit: DocumentSample["workPermitStatus"] = "محدود به کارفرمای مشخص";
  if (sample.methodKey === "permanent-eu" || sample.methodKey === "family") {
    workPermit = "آزاد و نامحدود";
  } else if (sample.methodKey === "student") {
    workPermit = "۲۰ ساعت در هفته";
  } else if (sample.methodKey === "job-seeker") {
    workPermit = "فاقد اجازه کار";
  } else if (sample.methodKey === "startup" || sample.methodKey === "self-employed-key" || sample.methodKey === "artist") {
    workPermit = "آزاد و نامحدود";
  }

  let chipColor = "#eab308";
  if (sample.cardVariant === "blue-card") chipColor = "#2563eb";
  else if (sample.cardVariant === "student") chipColor = "#10b981";
  else if (sample.cardVariant === "permanent") chipColor = "#d97706";
  else if (sample.cardVariant === "artist") chipColor = "#9333ea";
  else if (sample.cardVariant === "family") chipColor = "#ec4899";
  else if (sample.cardVariant === "visa-d") chipColor = "#14b8a6";

  return {
    id: sample.id,
    category: "residence",
    typeLabel: sample.cardTypeFa,
    subType: sample.methodTitleFa,
    titleFa: sample.titleFa,
    titleDe: sample.titleDe,
    applicantStatus: sample.applicantProfile,
    issuedBy: sample.authority,
    state: sample.state,
    issueDate: sample.issueDate,
    validUntil: sample.validity,
    caseRef: sample.caseRef,
    workPermitStatus: workPermit,
    legalBasis: sample.legalParagraph,
    isSpecialBadge: !!sample.badgeHighlight,
    specialHighlight: sample.badgeHighlight,
    anatomyBreakdown: sample.anatomyTips.map((tip) => ({
      title: tip.label,
      description: tip.desc,
      tag: sample.methodTitleFa
    })),
    requirements: sample.keyConditions,
    tipsFa: `بند حقوقی و ملاحظه اداری: ${sample.workPermitClause}`,
    cardDesign: {
      variant: sample.cardVariant,
      chipColor,
      cardHolderMasked: sample.holderMasked,
      dobMasked: sample.dobMasked,
      nationality: "IRN",
      gender: "M",
      cardNoMasked: sample.cardNoMasked,
      mrzLine1: sample.mrz1,
      mrzLine2: sample.mrz2,
      officialClauseDe: `${sample.titleDe} - ${sample.workPermitClause}. Gem. ${sample.legalParagraph}.`,
      signatureAuthority: sample.authority
    },
    methodKey: sample.methodKey
  };
});

const COMBINED_SAMPLES: DocumentSample[] = [
  ...METHOD_DOCUMENT_SAMPLES,
  ...DOCUMENT_SAMPLES
];

export default function DocumentSamples({ onNavigate }: { onNavigate?: (segment: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<SampleCategory>("all");
  const [selectedMethod, setSelectedMethod] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<DocumentSample | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<"card" | "anatomy" | "requirements" | "consult">("card");

  // Filtered samples
  const filteredSamples = useMemo(() => {
    return COMBINED_SAMPLES.filter((item) => {
      // Method filter
      if (selectedMethod !== "all" && item.methodKey !== selectedMethod) {
        return false;
      }
      // Category match
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }
      // State match
      if (selectedState !== "all" && item.state !== selectedState) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitleFa = item.titleFa.toLowerCase().includes(query);
        const matchTitleDe = item.titleDe.toLowerCase().includes(query);
        const matchIssuedBy = item.issuedBy.toLowerCase().includes(query);
        const matchType = item.typeLabel.toLowerCase().includes(query);
        const matchDegree = (item.degreeOrField || "").toLowerCase().includes(query);
        const matchLegal = item.legalBasis.toLowerCase().includes(query);
        const matchSub = item.subType.toLowerCase().includes(query);
        return matchTitleFa || matchTitleDe || matchIssuedBy || matchType || matchDegree || matchLegal || matchSub;
      }
      return true;
    });
  }, [selectedMethod, activeCategory, selectedState, searchQuery]);

  const handleOpenSample = (sample: DocumentSample) => {
    setSelectedSample(sample);
    setIsFlipped(false);
    setActiveModalTab("card");
  };

  const handleCopyLegalBasis = (legal: string) => {
    navigator.clipboard.writeText(legal);
    toast.success("مستند قانونی کپی شد: " + legal);
  };

  const handleShareSample = (sample: DocumentSample) => {
    const text = `نمونه معتبر ${sample.titleFa} در اتریش: ${sample.issuedBy} (${sample.legalBasis})`;
    if (navigator.share) {
      navigator.share({
        title: sample.titleFa,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      toast.success("اطلاعات نمونه برای اشتراک‌گذاری کپی شد");
    }
  };

  const openWhatsAppHelp = (sample: DocumentSample) => {
    const text = encodeURIComponent(
      `سلام و درود، من در وبسایت نمونه رسمی «${sample.titleFa}» (${sample.titleDe}) را مشاهده کردم و در مورد شرایط پرونده مشابه نیاز به راهنمایی دارم.`
    );
    window.open(`https://wa.me/436889763256?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-8 text-right font-sans max-w-7xl mx-auto px-2 sm:px-4" dir="rtl">
      {/* HERO BANNER SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-red-950 border border-stone-800 text-white p-6 sm:p-10 shadow-2xl">
        {/* Subtle Decorative Pattern */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />
        
        {/* Austrian Flag subtle top stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-white to-red-600 opacity-90" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>مستندسازی رسمی و شفاف جهت اعتمادسازی و آگاهی حقوقی</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              نمونه‌های ویژه، کارت‌های اقامت و پذیرش‌های تحصیلی اتریش
            </h1>
            
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              مجموعه‌ای شفاف و کارشناسی‌شده از انواع کارت‌های اقامت رسمی اتریش (Aufenthaltstitel)، 
              نامه‌های پذیرش قطعی دانشگاه‌های وین، گراتس و مراکز آموزش عالی، به همراه بررسی جزئیات حقوقی، 
              شرایط کار و الزامات تمدید جهت آشنایی دقیق هموطنان متقاضی مهاجرت به اتریش.
            </p>

            {/* Micro stats counter bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-black text-red-400">۴۸۰+</div>
                <div className="text-[10px] text-stone-400 font-bold">نمونه‌های بررسی شده</div>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-black text-emerald-400">۹۸.۴٪</div>
                <div className="text-[10px] text-stone-400 font-bold">تطابق با ضوابط MA35</div>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-black text-amber-400">قانون ۲۰۲۵</div>
                <div className="text-[10px] text-stone-400 font-bold">مطابق آخرین اصلاحات NAG</div>
              </div>
              <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-black text-sky-400">۱۰۰٪ معتبر</div>
                <div className="text-[10px] text-stone-400 font-bold">حفظ محرمانگی هویت</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => {
                const element = document.getElementById("samples-catalog");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-red-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Eye className="w-4 h-4" />
              <span>مشاهده و بررسی مدارک</span>
            </button>
            
            {onNavigate && (
              <button
                onClick={() => onNavigate("rwr-calculator")}
                className="inline-flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>محاسبه‌گر امتیاز کارت RWR</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL TOWER */}
      <div id="samples-catalog" className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveCategory("all");
                setSelectedMethod("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeCategory === "all" && selectedMethod === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              همه مدارک ({COMBINED_SAMPLES.length})
            </button>
            
            <button
              onClick={() => {
                setActiveCategory("residence");
                setSelectedMethod("all");
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeCategory === "residence" && selectedMethod === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <IdCard className="w-3.5 h-3.5" />
              <span>کارت‌های اقامت اتریش ({COMBINED_SAMPLES.filter(x => x.category === "residence").length})</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory("admission");
                setSelectedMethod("all");
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeCategory === "admission" && selectedMethod === "all"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>پذیرش‌های دانشگاهی ({COMBINED_SAMPLES.filter(x => x.category === "admission").length})</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory("special");
                setSelectedMethod("all");
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeCategory === "special" && selectedMethod === "all"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/20"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-200" />
              <span>نمونه‌های ویژه و دستاوردها ({COMBINED_SAMPLES.filter(x => x.category === "special").length})</span>
            </button>
          </div>

          {/* Federal States Quick Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-bold hidden sm:inline">ایالت:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-700 font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">همه ایالت‌ها (اتریش)</option>
              <option value="Wien">وین (Wien / MA 35)</option>
              <option value="Steiermark">اشتایرمارک (Graz)</option>
              <option value="Oberösterreich">اوبراسترایش (Linz)</option>
              <option value="Salzburg">سالزبورگ (Salzburg)</option>
              <option value="Tirol">تیرول (Innsbruck)</option>
              <option value="Niederösterreich">نیدراسترایش</option>
            </select>
          </div>
        </div>

        {/* 10 IMMIGRATION PATHWAYS SELECTOR (4 SAMPLES EACH) */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-xs font-black text-stone-900">روش‌های ۱۰ گانه اقامت و کار اتریش (با ۴ نمونه مستند برای هر روش):</span>
            </div>
            {selectedMethod !== "all" && (
              <button
                onClick={() => setSelectedMethod("all")}
                className="text-[11px] text-red-600 hover:text-red-800 font-black underline cursor-pointer"
              >
                نمایش همه ({COMBINED_SAMPLES.length} نمونه)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {VISA_METHODS.map((m) => {
              const isSelected = selectedMethod === m.key;
              const count = COMBINED_SAMPLES.filter((s) => s.methodKey === m.key).length;
              return (
                <button
                  key={m.key}
                  onClick={() => {
                    setSelectedMethod(isSelected ? "all" : m.key);
                    if (activeCategory !== "all") setActiveCategory("all");
                  }}
                  className={`p-2.5 rounded-2xl border text-right transition-all flex flex-col justify-between group text-xs ${
                    isSelected
                      ? "bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-400/30"
                      : "bg-white text-stone-800 border-stone-200 hover:border-red-300 hover:bg-red-50/20"
                  }`}
                >
                  <div className={`font-black line-clamp-1 group-hover:text-red-600 transition-colors ${isSelected ? 'text-white' : ''}`}>
                    {m.title}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100/60">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-red-100' : 'text-stone-500'}`}>
                      {count} نمونه
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                      {m.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Method Banner */}
          {selectedMethod !== "all" && (() => {
            const current = VISA_METHODS.find(m => m.key === selectedMethod);
            if (!current) return null;
            return (
              <div className="mt-3 bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent border border-red-200 rounded-2xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-sm text-stone-900">{current.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">{current.badge}</span>
                    <span className="font-mono text-xs text-stone-500" dir="ltr">{current.subtitle}</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    مستند قانونی: <span className="font-mono font-bold text-red-700">{current.legalNote}</span> • ۴ نمونه مستند واقعی ثبت‌شده در ادارات MA35 و وزارت امور داخله
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMethod("all")}
                  className="text-xs font-bold text-stone-700 hover:text-stone-900 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  نمایش همه روش‌ها
                </button>
              </div>
            );
          })()}
        </div>

        {/* Search Bar & Quick Tags */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجو در نام مدارک، دانشگاه وین، کارت سرخ-سفید-سرخ، MA35، استعلام حقوقی..."
            className="w-full bg-stone-50 border border-stone-200 focus:border-red-500 rounded-2xl pr-11 pl-4 py-3 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
            >
              پاک کردن
            </button>
          )}
        </div>
      </div>

      {/* DOCUMENT CARDS GRID */}
      {filteredSamples.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <HelpCircle className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-black text-stone-700">مدرکی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            لطفاً عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را روی «همه مدارک» بگذارید.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSelectedState("all");
              setSearchQuery("");
            }}
            className="text-xs text-red-600 font-bold underline"
          >
            بازنشانی تمام فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => {
            const isResidence = sample.category === "residence";
            const isSpecial = sample.category === "special" || sample.isSpecialBadge;

            return (
              <motion.div
                key={sample.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-stone-200 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual Header / Micro Card Mockup Preview */}
                <div className="relative p-5 pb-4 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 border-b border-stone-100">
                  {/* Top Badge Strip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-stone-100 text-stone-700 border border-stone-200">
                      {isResidence ? <IdCard className="w-3 h-3 text-red-600" /> : <GraduationCap className="w-3 h-3 text-blue-600" />}
                      <span>{sample.typeLabel}</span>
                    </span>

                    {isSpecial && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-50 text-amber-700 border border-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>نمونه شاخص</span>
                      </span>
                    )}

                    <span className="text-[10px] font-bold text-stone-400">{sample.state}</span>
                  </div>

                  {/* REALISTIC HIGH-FIDELITY MINIATURE REPRESENTATION */}
                  <div
                    onClick={() => handleOpenSample(sample)}
                    className="relative aspect-[1.58/1] rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-300 group-hover:scale-[1.02] border border-stone-300"
                  >
                    {isResidence ? (
                      // AUSTRIAN RESIDENCE CARD MINIATURE (Aufenthaltstitel)
                      <div className="w-full h-full bg-gradient-to-br from-rose-100 via-rose-50 to-stone-100 p-3.5 flex flex-col justify-between relative overflow-hidden select-none">
                        {/* Austrian Eagle Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                          <Landmark className="w-32 h-32 text-red-900" />
                        </div>

                        {/* Top Bar: Republik Österreich */}
                        <div className="flex items-center justify-between border-b border-rose-200/80 pb-1 z-10">
                          <div className="flex items-center gap-1.5">
                            {/* Austrian Flag Symbol */}
                            <div className="w-4 h-3 rounded-sm overflow-hidden flex flex-col border border-stone-300 shadow-xs">
                              <div className="h-1 bg-red-600" />
                              <div className="h-1 bg-white" />
                              <div className="h-1 bg-red-600" />
                            </div>
                            <span className="text-[9px] font-black tracking-wider text-red-900">REPUBLIK ÖSTERREICH</span>
                          </div>
                          <span className="text-[8px] font-extrabold text-stone-600 uppercase">AUFENTHALTSTITEL</span>
                        </div>

                        {/* Card Center: Chip + Details */}
                        <div className="flex items-center gap-3 my-1 z-10">
                          {/* Smart Chip Graphic */}
                          <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-600 shadow-inner flex items-center justify-center shrink-0">
                            <div className="w-6 h-4 border border-amber-700/40 rounded-sm grid grid-cols-2 gap-0.5 p-0.5">
                              <div className="bg-amber-400/50 rounded-xs" />
                              <div className="bg-amber-400/50 rounded-xs" />
                            </div>
                          </div>

                          <div className="flex-1 space-y-0.5 text-[9px] text-right font-sans">
                            <div className="text-[8px] text-stone-500 font-bold">TITEL / نوع اقامت:</div>
                            <div className="font-black text-stone-900 truncate">{sample.titleDe}</div>
                            <div className="text-[8px] text-stone-600 font-mono">
                              Nr: {sample.cardDesign.cardNoMasked} • IRN
                            </div>
                          </div>
                        </div>

                        {/* Bottom MRZ Band Mockup */}
                        <div className="bg-stone-900/90 text-stone-300 font-mono text-[6px] tracking-wider py-1 px-1.5 rounded truncate z-10 text-center">
                          {sample.cardDesign.mrzLine1 || "ARAUT<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"}
                        </div>

                        {/* Holographic Watermark Badge */}
                        <div className="absolute bottom-2 left-2 text-[7px] font-black px-1.5 py-0.5 bg-white/70 backdrop-blur-xs rounded border border-rose-300 text-red-800 z-10 shadow-xs">
                          MUSTER نمونه
                        </div>
                      </div>
                    ) : (
                      // UNIVERSITY ADMISSION BESCHEID MINIATURE
                      <div className="w-full h-full bg-gradient-to-br from-amber-50/50 via-white to-stone-50 p-3.5 flex flex-col justify-between relative overflow-hidden border border-stone-200 select-none">
                        {/* University Stamp Watermark */}
                        <div className="absolute right-2 top-2 opacity-15 pointer-events-none">
                          <GraduationCap className="w-24 h-24 text-blue-900" />
                        </div>

                        {/* Top: University Crest Header */}
                        <div className="flex items-center justify-between border-b border-stone-200 pb-1 z-10">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-blue-800" />
                            <span className="text-[9px] font-black text-blue-950 uppercase">{sample.cardDesign.universitySeal || "UNIVERSITÄT WIEN"}</span>
                          </div>
                          <span className="text-[8px] font-black bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">BESCHEID</span>
                        </div>

                        {/* Center: Bescheid details */}
                        <div className="my-1 z-10 space-y-1">
                          <div className="text-[8px] font-mono text-stone-500 font-bold">{sample.caseRef}</div>
                          <div className="text-[10px] font-black text-stone-900 leading-tight">
                            Zulassung zum Studium:
                          </div>
                          <div className="text-[9px] font-bold text-blue-900 truncate">
                            {sample.degreeOrField || sample.titleDe}
                          </div>
                        </div>

                        {/* Bottom: Official Digital Amtssignatur */}
                        <div className="flex items-center justify-between bg-stone-100/90 border border-stone-200 p-1 rounded z-10">
                          <div className="flex items-center gap-1 text-[7px] font-mono text-stone-600">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Amtssignatur der Republik Österreich</span>
                          </div>
                          <span className="text-[7px] font-black text-emerald-700">GÜLTIG تایید شده</span>
                        </div>
                      </div>
                    )}

                    {/* Hover Inspect CTA Overlay */}
                    <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-black text-xs">
                      <Eye className="w-4 h-4" />
                      <span>مشاهده و کالبدشکافی مدرک</span>
                    </div>
                  </div>
                </div>

                {/* Content & Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black text-stone-900 group-hover:text-red-600 transition-colors leading-snug">
                      {sample.titleFa}
                    </h3>
                    
                    <p className="text-[11px] font-mono text-stone-500 line-clamp-1" dir="ltr">
                      {sample.titleDe}
                    </p>

                    <div className="bg-stone-50 rounded-xl p-2.5 border border-stone-100 space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400">مرجع صادرکننده:</span>
                        <span className="font-bold text-stone-800 text-right truncate max-w-[170px]" title={sample.issuedBy}>
                          {sample.issuedBy}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400">وضعیت اجازه کار:</span>
                        <span className={`font-black ${
                          sample.workPermitStatus === "آزاد و نامحدود" 
                            ? "text-emerald-700" 
                            : sample.workPermitStatus === "۲۰ ساعت در هفته" 
                            ? "text-blue-700"
                            : "text-amber-700"
                        }`}>
                          {sample.workPermitStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-stone-400">پایه قانونی:</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyLegalBasis(sample.legalBasis);
                          }}
                          className="font-mono text-[10px] text-red-700 hover:text-red-900 font-bold underline cursor-pointer truncate max-w-[170px]"
                          title="کلیک برای کپی مستند قانونی"
                        >
                          {sample.legalBasis}
                        </button>
                      </div>
                    </div>

                    {sample.specialHighlight && (
                      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2 text-[10px] text-amber-900 font-bold leading-relaxed flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{sample.specialHighlight}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenSample(sample)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-900 hover:bg-red-600 text-white font-black text-xs rounded-xl transition-all shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>بررسی دقیق و آناتومی</span>
                    </button>

                    <button
                      onClick={() => openWhatsAppHelp(sample)}
                      className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-stone-200"
                      title="مشاوره مستقیم در مورد این مدرک"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleShareSample(sample)}
                      className="p-2 text-stone-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-stone-200"
                      title="اشتراک‌گذاری"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* DETAILED INSPECTION MODAL (FULL ANATOMY & CARD VIEWER) */}
      <AnimatePresence>
        {selectedSample && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedSample(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]"
            >
              {/* Modal Top Bar */}
              <div className="p-4 sm:p-6 bg-stone-900 text-white flex items-center justify-between gap-4 border-b border-stone-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white">
                      {selectedSample.typeLabel}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">{selectedSample.caseRef}</span>
                  </div>
                  <h2 className="text-base sm:text-xl font-black text-white">{selectedSample.titleFa}</h2>
                  <p className="text-xs text-stone-400 font-mono" dir="ltr">{selectedSample.titleDe}</p>
                </div>

                <button
                  onClick={() => setSelectedSample(null)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full transition-colors shrink-0"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="bg-stone-100 p-2 sm:px-6 flex items-center gap-2 border-b border-stone-200 overflow-x-auto">
                <button
                  onClick={() => setActiveModalTab("card")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                    activeModalTab === "card"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  نمای مدرک رسمی و کارت
                </button>
                <button
                  onClick={() => setActiveModalTab("anatomy")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                    activeModalTab === "anatomy"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  آناتومی و تحلیل حقوقی
                </button>
                <button
                  onClick={() => setActiveModalTab("requirements")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                    activeModalTab === "requirements"
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  الزامات و مدارک لازم
                </button>
                <button
                  onClick={() => setActiveModalTab("consult")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all shrink-0 ${
                    activeModalTab === "consult"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  مشاوره اقدام برای پرونده مشابه
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
                {/* TAB 1: CARD VISUAL (HIGH-DEF FLIPPABLE / LETTER VIEW) */}
                {activeModalTab === "card" && (
                  <div className="space-y-6">
                    {selectedSample.category === "residence" || selectedSample.category === "special" ? (
                      <div className="space-y-4">
                        {/* FLIP TOGGLE CONTROLS */}
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-red-600" />
                            <span>کارت شناسایی بیومتریک اقامت اتریش (Aufenthaltstitel)</span>
                          </div>
                          
                          <button
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="inline-flex items-center gap-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 font-black px-3.5 py-1.5 rounded-xl border border-stone-300 transition-all"
                          >
                            <RotateCw className="w-3.5 h-3.5 text-red-600" />
                            <span>{isFlipped ? "مشاهده روی کارت (Vorderseite)" : "مشاهده پشت کارت (Rückseite)"}</span>
                          </button>
                        </div>

                        {/* ULTRA-REALISTIC CARD CONTAINER */}
                        <div className="max-w-xl mx-auto">
                          {!isFlipped ? (
                            // FRONT OF CARD
                            <div className="aspect-[1.58/1] rounded-3xl bg-gradient-to-br from-rose-100 via-rose-50/90 to-stone-100 border-2 border-stone-300 shadow-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden select-none">
                              {/* Guilloche Micro-Security pattern background */}
                              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c8102e_1px,transparent_1px)] [background-size:16px_16px]" />
                              
                              {/* Big Federal Eagle Crest */}
                              <div className="absolute -left-6 -bottom-6 opacity-10 pointer-events-none">
                                <Landmark className="w-56 h-56 text-red-950" />
                              </div>

                              {/* Card Header */}
                              <div className="flex items-center justify-between border-b-2 border-red-800/20 pb-2 z-10">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-4 rounded overflow-hidden flex flex-col border border-stone-400 shadow-xs">
                                    <div className="h-1.5 bg-red-600" />
                                    <div className="h-1 bg-white" />
                                    <div className="h-1.5 bg-red-600" />
                                  </div>
                                  <div>
                                    <div className="text-[11px] sm:text-xs font-black tracking-widest text-red-950">REPUBLIK ÖSTERREICH</div>
                                    <div className="text-[8px] font-bold text-stone-500">RESIDENCE PERMIT • AUFENTHALTSTITEL</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-[9px] font-mono font-bold bg-white/80 px-2 py-0.5 rounded border border-rose-200 text-stone-700">
                                    AUT
                                  </span>
                                </div>
                              </div>

                              {/* Card Center: Photo Frame + Chip + Data Fields */}
                              <div className="grid grid-cols-12 gap-3 sm:gap-4 my-2 z-10 items-center">
                                {/* Photo & Chip column */}
                                <div className="col-span-4 space-y-2">
                                  {/* Redacted biometric portrait box */}
                                  <div className="aspect-[3/4] rounded-xl bg-stone-300/80 border border-stone-400 shadow-inner flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-stone-400/60 mb-1" />
                                    <div className="w-14 h-8 rounded-t-full bg-stone-400/60" />
                                    <div className="absolute inset-0 bg-red-900/10 flex items-center justify-center">
                                      <span className="text-[8px] font-black text-red-900/60 bg-white/70 px-1 rounded rotate-[-20deg]">MUSTER</span>
                                    </div>
                                  </div>

                                  {/* Chip */}
                                  <div className="w-10 h-7 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 border border-amber-600 shadow-sm flex items-center justify-center mx-auto">
                                    <div className="w-8 h-5 border border-amber-700/50 rounded-xs grid grid-cols-2 gap-0.5 p-0.5">
                                      <div className="bg-amber-400/60 rounded-xs" />
                                      <div className="bg-amber-400/60 rounded-xs" />
                                    </div>
                                  </div>
                                </div>

                                {/* Text data fields */}
                                <div className="col-span-8 space-y-1.5 text-right font-sans text-xs">
                                  <div>
                                    <div className="text-[8px] text-stone-500 font-bold">1. NAME / نام خانوادگی</div>
                                    <div className="font-black text-stone-900 font-mono text-xs sm:text-sm">{selectedSample.cardDesign.cardHolderMasked}</div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <div className="text-[8px] text-stone-500 font-bold">2. GEBURTSDATUM / تاریخ تولد</div>
                                      <div className="font-bold text-stone-800 font-mono text-[10px]">{selectedSample.cardDesign.dobMasked}</div>
                                    </div>
                                    <div>
                                      <div className="text-[8px] text-stone-500 font-bold">3. GESCHLECHT / جنسیت</div>
                                      <div className="font-bold text-stone-800 font-mono text-[10px]">{selectedSample.cardDesign.gender} • IRN</div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="text-[8px] text-stone-500 font-bold">4. ART DES TITELS / نوع مدرک اقامتی</div>
                                    <div className="font-black text-red-900 text-xs sm:text-sm leading-tight">{selectedSample.titleDe}</div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rose-200">
                                    <div>
                                      <div className="text-[8px] text-stone-500 font-bold">5. GÜLTIG BIS / اعتبار تا</div>
                                      <div className="font-bold text-stone-900 text-[10px]">{selectedSample.validUntil}</div>
                                    </div>
                                    <div>
                                      <div className="text-[8px] text-stone-500 font-bold">6. KARTEN-NR / شماره کارت</div>
                                      <div className="font-mono font-bold text-stone-900 text-[10px]">{selectedSample.cardDesign.cardNoMasked}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Hologram Ribbon Strip */}
                              <div className="flex items-center justify-between text-[8px] font-bold text-stone-500 border-t border-rose-200 pt-1 z-10">
                                <span>REPUBLIK ÖSTERREICH • BUNDESMINISTERIUM FÜR INNERES</span>
                                <span className="text-red-700 font-black">نمونه استعلام شده</span>
                              </div>
                            </div>
                          ) : (
                            // BACK OF CARD (RÜCKSEITE)
                            <div className="aspect-[1.58/1] rounded-3xl bg-gradient-to-br from-stone-100 via-rose-50/70 to-stone-200 border-2 border-stone-300 shadow-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden select-none">
                              {/* Back Top: Official Remarks */}
                              <div className="space-y-2 z-10">
                                <div className="text-[9px] font-black text-stone-500 uppercase border-b border-stone-300 pb-1 flex justify-between">
                                  <span>ANMERKUNGEN / یادداشت‌های قانونی</span>
                                  <span>AUFENTHALTSTITEL ÖSTERREICH</span>
                                </div>

                                <div className="bg-white/80 border border-stone-300 rounded-xl p-3 text-stone-900 font-mono text-[10px] leading-relaxed">
                                  {selectedSample.cardDesign.officialClauseDe}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[9px] text-stone-600">
                                  <div>
                                    <span className="text-stone-400">صادرکننده: </span>
                                    <span className="font-bold text-stone-900">{selectedSample.cardDesign.signatureAuthority}</span>
                                  </div>
                                  <div>
                                    <span className="text-stone-400">تاریخ صدور: </span>
                                    <span className="font-bold text-stone-900">{selectedSample.issueDate}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Back Bottom: Official Machine Readable Zone (MRZ) */}
                              <div className="bg-stone-950 text-stone-100 font-mono text-[8px] sm:text-[9px] tracking-widest p-2.5 rounded-xl space-y-1 text-center select-all z-10">
                                <div>{selectedSample.cardDesign.mrzLine1}</div>
                                <div>{selectedSample.cardDesign.mrzLine2}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // UNIVERSITY ADMISSION BESCHEID FULL VIEW
                      <div className="max-w-2xl mx-auto bg-stone-50 border-2 border-stone-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
                        {/* University Watermark */}
                        <div className="absolute left-4 top-4 opacity-5 pointer-events-none">
                          <GraduationCap className="w-72 h-72 text-blue-900" />
                        </div>

                        {/* University Official Header */}
                        <div className="flex items-start justify-between border-b-2 border-blue-900/30 pb-4">
                          <div className="space-y-1">
                            <div className="text-base sm:text-lg font-black text-blue-950">
                              {selectedSample.cardDesign.universitySeal || "UNIVERSITÄT WIEN"}
                            </div>
                            <div className="text-[10px] font-mono text-stone-500">
                              Dienstleistungseinrichtung Studienservice und Lehrwesen
                            </div>
                            <div className="text-[10px] font-mono text-stone-600">
                              Universitätsring 1, A-1010 Wien • Austria
                            </div>
                          </div>

                          <div className="text-left font-mono text-[10px] text-stone-600 space-y-0.5">
                            <div>Geschäftszahl: <span className="font-bold text-stone-900">{selectedSample.caseRef}</span></div>
                            <div>Datum: <span className="font-bold text-stone-900">{selectedSample.issueDate}</span></div>
                          </div>
                        </div>

                        {/* Title of Document */}
                        <div className="text-center space-y-1 py-2">
                          <h3 className="text-lg font-black text-stone-900 tracking-wide">B E S C H E I D</h3>
                          <p className="text-xs text-stone-600 font-bold">Zulassung zum ordentlichen Studium</p>
                        </div>

                        {/* Spruch (Decision text) */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 text-xs leading-relaxed text-stone-800">
                          <div className="font-bold text-blue-950">
                            Spruch (رای نهایی دانشگاه):
                          </div>
                          <p className="font-mono text-[11px] text-stone-700 leading-normal" dir="ltr">
                            {selectedSample.cardDesign.officialClauseDe}
                          </p>
                          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">رشته تحصیلی:</span>
                            <span className="font-bold text-blue-900">{selectedSample.degreeOrField}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">مبنای قانون آموزش عالی:</span>
                            <span className="font-mono text-stone-700">{selectedSample.legalBasis}</span>
                          </div>
                        </div>

                        {/* Amtssignatur Seal of Austrian Government */}
                        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                              <Landmark className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5 text-right">
                              <div className="text-xs font-black text-emerald-950">
                                Amtssignatur der Republik Österreich
                              </div>
                              <div className="text-[10px] text-emerald-800">
                                سند دارای امضای الکترونیک امن و معتبر جهت استعلام مستقیم در سفارت اتریش در تهران
                              </div>
                            </div>
                          </div>
                          <span className="text-xs font-black text-emerald-700 px-3 py-1 bg-white rounded-full border border-emerald-300 shrink-0">
                            تایید شده
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: ANATOMY & EXPERT BREAKDOWN */}
                {activeModalTab === "anatomy" && (
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs text-red-900 leading-relaxed font-bold flex items-start gap-2">
                      <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        کالبدشکافی بندهای این مدرک بر اساس آخرین مفاد قانون اقامت (NAG) و قانون اشتغال اتباع خارجی (AuslBG) اتریش:
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedSample.anatomyBreakdown.map((item, idx) => (
                        <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-stone-900">{item.title}</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2">
                      <div className="text-xs font-black text-stone-800">تجربه عملی و یادداشت کارشناس:</div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {selectedSample.tipsFa}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: REQUIREMENTS & CHECKLIST */}
                {activeModalTab === "requirements" && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-stone-900">
                      چک‌لیست و الزامات قانونی جهت دریافت مدرک مشابه:
                    </h4>

                    <div className="space-y-2">
                      {selectedSample.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-stone-800 font-medium leading-relaxed">{req}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong>نکته ضروری:</strong> تمامی مدارک صادره از ایران می‌بایست به زبان آلمانی توسط مترجم رسمی دادگستری ترجمه شده و ممهور به مهر تایید دادگستری، وزارت امور خارجه و لگالایز سفارت اتریش در تهران گردند.
                    </div>
                  </div>
                )}

                {/* TAB 4: DIRECT CONSULTATION */}
                {activeModalTab === "consult" && (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
                      <Send className="w-7 h-7" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-lg font-black text-emerald-950">مشاوره پرونده {selectedSample.titleFa}</h3>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        آیا قصد اقدام برای دریافت این کارت اقامت یا پذیرش دانشگاهی را دارید؟ تیم همراهان داوطلب کانون آماده راهنمایی اولیه، بررسی رزومه و انتقال تجربیات موفق به شما هستند.
                      </p>
                    </div>

                    <button
                      onClick={() => openWhatsAppHelp(selectedSample)}
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-700/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>ارسال پیام در واتساپ جهت بررسی پرونده</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 bg-stone-100 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>تاریخ آخرین به‌روزرسانی قوانین: ۲۰۲۵</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLegalBasis(selectedSample.legalBasis)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-600" />
                    <span>کپی مستند قانونی</span>
                  </button>

                  <button
                    onClick={() => setSelectedSample(null)}
                    className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-black transition-colors"
                  >
                    بستن
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER NOTICE ON PRIVACY & LEGAL STANDARDS */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-5 text-right space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-stone-800">
          <ShieldCheck className="w-4 h-4 text-red-600" />
          <span>اصول محرمانگی اطلاعات و حفظ حریم خصوصی:</span>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed">
          تمامی نمونه‌های مندرج در این سامانه با رضایت کامل متقاضیان و پس از مخدوش‌سازی کامل داده‌های هویتی خصوصی (نام کامل، شماره شناسنامه، تاریخ دقیق تولد و بارکدهای اختصاصی) صرفاً با هدف آموزش، شفافیت در قوانین اقامت اتریش و اعتمادسازی به نمایش درآمده است.
        </p>
      </div>
    </div>
  );
}
