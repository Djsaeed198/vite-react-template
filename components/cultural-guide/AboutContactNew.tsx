import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, MessageCircle, Globe, Send, PhoneCall, ExternalLink,
  Heart, Sparkles, Award, Users, ShieldCheck, MapPin, Clock,
  CheckCircle, Star, TrendingUp, MessageSquare, Instagram,
  Facebook, Twitter, Youtube, ChevronLeft, ChevronDown,
  Copy, Zap, Target, Coffee, Handshake, Phone, MapPinned,
  Building2, Rocket, Quote, Info
} from "lucide-react";
import SEO from "./SEO";
import { toast } from "../utils/toast";

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ==========================================
// CONTACT CHANNELS DATA
// ==========================================
const CONTACT_CHANNELS = [
  {
    id: "telegram",
    title: "پشتیبانی تلگرام",
    subtitle: "پاسخگویی آنلاین و سریع",
    value: "@Otrish_neshin",
    href: "https://t.me/Otrish_neshin",
    icon: Send,
    color: "sky",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    text: "text-sky-600",
    badge: "ارسال پیام",
    featured: true,
  },
  {
    id: "whatsapp-iran",
    title: "واتس‌اپ ایران",
    subtitle: "پاسخگویی از داخل ایران",
    value: "+98 930 622 9790",
    href: "https://wa.me/989306229790",
    icon: MessageCircle,
    color: "green",
    gradient: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    text: "text-green-600",
    badge: "چت در واتس‌اپ",
  },
  {
    id: "whatsapp-eu",
    title: "واتس‌اپ اتریش",
    subtitle: "تماس مستقیم با دفتر وین",
    value: "00436889763256",
    href: "https://wa.me/436889763256",
    icon: PhoneCall,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    badge: "ارتباط مستقیم",
    featured: true,
  },
  {
    id: "email",
    title: "ایمیل رسمی",
    subtitle: "برای مکاتبات اداری",
    value: "otrish.neshin@gmail.com",
    href: "mailto:otrish.neshin@gmail.com",
    icon: Mail,
    color: "red",
    gradient: "from-[#c8102e] to-[#970d22]",
    bg: "bg-red-50",
    text: "text-[#c8102e]",
    badge: "ارسال ایمیل",
  },
];

// ==========================================
// STATS
// ==========================================
const STATS = [
  { value: "۱۰۰+", label: "ابزار کاربردی", icon: "🛠️" },
  { value: "۵۰K+", label: "کاربر فعال", icon: "👥" },
  { value: "۲۴/۷", label: "پشتیبانی", icon: "⏰" },
  { value: "۹۸٪", label: "رضایت کاربران", icon: "⭐" },
];

// ==========================================
// VALUES / FEATURES
// ==========================================
const VALUES = [
  {
    icon: ShieldCheck,
    title: "مستقل و بی‌طرف",
    text: "بدون وابستگی سیاسی یا اقتصادی. کاملاً داوطلبانه و رایگان.",
    color: "from-emerald-500 to-green-600",
  },
  {
    icon: Zap,
    title: "سریع و دقیق",
    text: "استفاده از آخرین تکنولوژی‌های وب و اطلاعات به‌روز.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Heart,
    title: "با عشق به هموطن",
    text: "هر خط کد با هدف کمک به راحتی زندگی هموطنان در اتریش.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: Users,
    title: "جامعه‌محور",
    text: "ساخته‌شده توسط و برای فارسی‌زبانان مقیم اتریش و اروپا.",
    color: "from-blue-500 to-indigo-600",
  },
];

// ==========================================
// FAQ
// ==========================================
const FAQS = [
  {
    q: "آیا خدمات اتریش‌نشین رایگان است؟",
    a: "بله، تمامی ابزارها، راهنماها و مقالات سایت اتریش‌نشین کاملاً رایگان هستند. مشاوره‌های تخصصی نیز با هدف کمک به هموطنان ارائه می‌شود.",
  },
  {
    q: "چطور می‌توانم با تیم اتریش‌نشین در تماس باشم؟",
    a: "از طریق تلگرام، واتس‌اپ (ایران یا اتریش) یا ایمیل رسمی. تیم ما معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دهد.",
  },
  {
    q: "آیا اتریش‌نشین به سازمان خاصی وابسته است؟",
    a: "خیر، اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است که توسط گروهی از فارسی‌زبانان مقیم اتریش اداره می‌شود.",
  },
  {
    q: "چگونه می‌توانم در بهبود پلتفرم مشارکت کنم؟",
    a: "برای مشارکت، بازخورد، پیشنهاد محتوا یا حتی کمک فنی، از طریق کانال‌های ارتباطی با ما در تماس باشید. مشارکت شما ارزشمند است!",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function AboutContactNew() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(text);
    toast.success("کپی شد!");
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const seoSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "اتریش‌نشین",
      alternateName: "Otrish Neshin",
      url: "https://otrish-iran.ir",
      logo: "https://otrish-iran.ir/otrish_logo_1779961596526.png",
      description:
        "بزرگترین کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش. ارائه ابزارهای هوشمند، راهنماهای اداری و مشاوره تخصصی.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "otrish.neshin@gmail.com",
          availableLanguage: ["Persian", "German", "English"],
        },
        {
          "@type": "ContactPoint",
          contactType: "technical support",
          telephone: "+436889763256",
        },
      ],
      sameAs: [
        "https://t.me/OTRISH_IRAN",
        "https://instagram.com/otrish__iran",
        "https://www.facebook.com/otrish.neshin",
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
  ];

  return (
    <>
      <SEO
        title="درباره اتریش‌نشین و راه‌های تماس | پلتفرم مستقل فارسی‌زبانان اتریش"
        description="با اتریش‌نشین، بزرگترین کانون همیاری فارسی‌زبانان مقیم اتریش آشنا شوید. راه‌های تماس مستقیم از طریق تلگرام، واتس‌اپ (ایران و اتریش) و ایمیل."
        keywords="تماس اتریش‌نشین, مشاوره اتریش, پشتیبانی فارسی زبانان اتریش, Otrish Neshin, درباره اتریش‌نشین, کانون ایرانیان وین"
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
          {/* Decorative elements */}
          <div className="absolute -left-10 -bottom-16 text-[260px] opacity-[0.04] pointer-events-none select-none">
            🇦🇹
          </div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
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

            {/* Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                همیار مستقل فارسی‌زبانان
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                درباره اتریش‌نشین
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                بزرگترین کانون مستقل همیاری برای فارسی‌زبانان مقیم اتریش که با هدف تسهیل مسیر
                مهاجرت، اقامت و زندگی در قلب اروپا شکل گرفته است. ما با ارائه ابزارهای نوین،
                مشاوره‌های تخصصی و بهره‌گیری از آخرین تکنولوژی‌ها، تلاش می‌کنیم دغدغه‌های هموطنانمان
                را در زمینه‌های اداری، مالیاتی، آموزشی و اجتماعی به حداقل برسانیم.
              </p>

              {/* Quick badges */}
              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>۱۰۰٪ رایگان</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>کاملاً مستقل</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Heart className="w-3.5 h-3.5" />
                  <span>ساخته شده با عشق</span>
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
        {/* CONTACT CHANNELS */}
        {/* ========================================== */}
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c8102e]" />
                راه‌های ارتباطی
              </h2>
              <p className="text-[11px] text-stone-500 font-bold mt-1">
                از هر کانالی که راحت‌ترید با ما در تماس باشید — پاسخگویی سریع
              </p>
            </div>
            <span className="text-[10px] font-black text-[#c8102e] bg-red-50 px-3 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              آنلاین
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_CHANNELS.map((c, i) => (
              <ContactCard
                key={c.id}
                channel={c}
                index={i}
                copiedValue={copiedValue}
                onCopy={handleCopy}
              />
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* OFFICIAL WEBSITES */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 border border-indigo-200 rounded-3xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Globe className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-stone-900 mb-2">
                پورتال‌های رسمی اتریش‌نشین
              </h3>
              <p className="text-xs text-stone-600 font-bold leading-relaxed mb-4">
                برای دسترسی به تمامی ابزارها و خدمات، از پورتال‌های زیر استفاده کنید:
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.Otrish-Iran.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white font-black text-xs px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
                >
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Otrish-Iran.ir
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href="https://Dia-co.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-indigo-300 text-stone-700 font-black text-xs px-5 py-3 rounded-2xl hover:shadow-md transition-all"
                >
                  <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Dia-co.ir
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>

              <p className="text-[10px] text-stone-500 font-bold mt-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                شبکه جامع خدمات مهاجرتی برای فارسی‌زبانان
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* VALUES / MISSION */}
        {/* ========================================== */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c8102e]" />
              ارزش‌های ما
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              چهار اصل اساسی که هویت اتریش‌نشین را می‌سازند
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => {
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
        {/* FAQ */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول
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
        {/* SOCIAL MEDIA */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-sm font-black text-stone-900 mb-1">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>
              <p className="text-[10px] text-stone-500 font-bold">
                آخرین اخبار، ابزارهای جدید و راهنماهای کاربردی
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: Send,
                label: "تلگرام",
                handle: "@OTRISH_IRAN",
                href: "https://t.me/OTRISH_IRAN",
                color: "from-sky-500 to-blue-600",
              },
              {
                icon: Instagram,
                label: "اینستاگرام",
                handle: "@otrish__iran",
                href: "https://instagram.com/otrish__iran",
                color: "from-pink-500 via-rose-500 to-purple-600",
              },
              {
                icon: Facebook,
                label: "فیسبوک",
                handle: "otrish.neshin",
                href: "https://www.facebook.com/otrish.neshin",
                color: "from-blue-600 to-indigo-600",
              },
              {
                icon: Youtube,
                label: "یوتیوب",
                handle: "Otrish Neshin",
                href: "https://youtube.com",
                color: "from-red-500 to-rose-600",
              },
            ].map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-3 bg-stone-50 hover:bg-white border border-stone-200 rounded-2xl p-3 transition-all hover:shadow-md"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black text-stone-800">
                      {social.label}
                    </div>
                    <div className="text-[9px] text-stone-500 font-bold truncate">
                      {social.handle}
                    </div>
                  </div>
                </motion.a>
              );
            })}
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Handshake className="w-3.5 h-3.5 text-amber-300" />
              کنار شما در تمام مراحل
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              آماده‌ایم تا کمکتان کنیم
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              چه در ابتدای مسیر مهاجرت باشید، چه سال‌ها در اتریش زندگی کنید، تیم اتریش‌نشین
              با ابزارها و مشاوره‌های تخصصی در کنارتان است. همین حالا پیام دهید!
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                شروع گفتگو در واتس‌اپ
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
              اتریش‌نشین یک پلتفرم کاملاً مستقل و داوطلبانه است که هیچ وابستگی به سازمان‌ها یا
              احزاب سیاسی ندارد. تمامی اطلاعات و ابزارهای ارائه‌شده صرفاً جنبه راهنمایی دارند و
              جایگزین مشاوره حقوقی یا اداری رسمی نمی‌شوند. برای تصمیم‌های نهایی، همیشه با
              منابع رسمی یا مشاوران واجد شرایط مشورت کنید.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// CONTACT CARD
// ==========================================
function ContactCard({
  channel,
  index,
  copiedValue,
  onCopy,
}: {
  key?: React.Key;
  channel: any;
  index: number;
  copiedValue: string | null;
  onCopy: (text: string) => void;
}) {
  const Icon = channel.icon;
  const isCopied = copiedValue === channel.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative bg-white rounded-3xl border-2 p-5 transition-all overflow-hidden group ${
        channel.featured
          ? "border-[#c8102e]/20 hover:border-[#c8102e]/40 shadow-md hover:shadow-xl"
          : "border-stone-200 hover:border-stone-300"
      }`}
    >
      {/* Featured badge */}
      {channel.featured && (
        <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 text-[9px] font-black px-3 py-1 rounded-br-2xl flex items-center gap-1 z-10">
          <Star className="w-3 h-3 fill-current" />
          پیشنهادی
        </div>
      )}

      {/* Decorative gradient */}
      <div
        className={`absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br ${channel.gradient} opacity-[0.08] rounded-full group-hover:opacity-[0.15] transition-opacity`}
      />

      <div className="relative">
        <div
          className={`w-14 h-14 rounded-2xl ${channel.bg} ${channel.text} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform`}
        >
          <Icon size={26} />
        </div>

        <h3 className="text-sm font-black text-stone-900 mb-0.5">{channel.title}</h3>
        <p className="text-[10px] text-stone-500 font-bold mb-3">{channel.subtitle}</p>

        <div className="flex items-center gap-2 mb-4">
          <code
            className="flex-1 text-[10px] font-mono font-bold text-stone-600 bg-stone-50 border border-stone-100 rounded-lg px-2.5 py-1.5 truncate"
            dir="ltr"
          >
            {channel.value}
          </code>
          <button
            onClick={() => onCopy(channel.value)}
            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition flex-shrink-0"
            title="کپی"
          >
            {isCopied ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-stone-500" />
            )}
          </button>
        </div>

        <a
          href={channel.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-br ${channel.gradient} text-white font-black text-xs py-2.5 rounded-2xl shadow-md hover:scale-[1.02] transition-all`}
        >
          <span>{channel.badge}</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
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