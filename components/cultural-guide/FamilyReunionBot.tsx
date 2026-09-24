import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Plus, Trash2, CheckCircle2, Circle, Clock, AlertTriangle, 
  ChevronDown, ChevronUp, Loader2, RefreshCw, FileText, Home, 
  Shield, Globe, Calendar, ArrowRightLeft, Heart, Check, HelpCircle,
  Sparkles, MapPin, Phone, Mail, Send, MessageCircle, ExternalLink,
  Award, TrendingUp, Zap, BookOpen, Landmark, Scale, Baby, GraduationCap,
  Building2, Link2, Quote, Info, Star, Eye, Share2, Copy, BadgeCheck,
  Wallet, Plane, Languages, Compass, Target, Rocket, ChevronLeft
} from 'lucide-react';
import SEO from './SEO';
import { toast } from '../utils/toast';

// ==========================================
// LOGO
// ==========================================
const otrishLogo = "/otrish_logo_1779961596526.png";

// ── Constants ────────────────────────────────────────────────────

const MEMBER_TYPES = [
  { id: 'spouse', label: 'همسر', emoji: '💑' },
  { id: 'child', label: 'فرزند', emoji: '👶' },
  { id: 'parent', label: 'والدین', emoji: '👴' },
];

const DOC_CATEGORIES = [
  {
    id: 'identity',
    label: 'مدارک شناسایی',
    icon: FileText,
    color: '#3b82f6',
    bg: '#eff6ff',
    docs: [
      { id: 'passport', label: 'پاسپورت معتبر (حداقل ۶ ماه اعتبار)', urgent: true, weeks: 1 },
      { id: 'birth_cert', label: 'گواهی تولد رسمی + ترجمه مورد تایید دادگاه اتریش', urgent: true, weeks: 3 },
      { id: 'marriage_cert', label: 'عقدنامه / سند ازدواج + ترجمه مورد تایید (فقط همسر)', urgent: true, weeks: 3 },
      { id: 'national_id', label: 'کارت ملی یا شناسنامه + ترجمه رسمی', urgent: false, weeks: 2 },
    ]
  },
  {
    id: 'background',
    label: 'گواهی عدم سوءپیشینه',
    icon: Shield,
    color: '#a855f7',
    bg: '#faf5ff',
    docs: [
      { id: 'criminal_record_iran', label: 'گواهی عدم سوءپیشینه از ایران + مهر امور خارجه (بالای ۱۴ سال)', urgent: true, weeks: 6 },
      { id: 'criminal_record_austria', label: 'Strafregisterauszug (گواهی عدم سوءپیشینه از پلیس اتریش)', urgent: false, weeks: 1 },
    ]
  },
  {
    id: 'housing',
    label: 'اثبات محل سکونت کافی',
    icon: Home,
    color: '#10b981',
    bg: '#ecfdf5',
    docs: [
      { id: 'rent_contract', label: 'قرارداد اجاره یا سند مالکیت معتبر (Mietvertrag)', urgent: true, weeks: 0 },
      { id: 'housing_standard', label: 'گواهی استاندارد مسکن ملکی (۱۲ متر برای هر فرد)', urgent: true, weeks: 2 },
      { id: 'meldezettel', label: 'برگه Meldezettel بهروز حامی در اتریش', urgent: false, weeks: 0 },
    ]
  },
  {
    id: 'financial',
    label: 'اثبات توانایی مالی و معیشت',
    icon: Globe,
    color: '#f97316',
    bg: '#fff7ed',
    docs: [
      { id: 'payslips', label: 'فیش حقوقی سه ماه اخیر حامی (Lohnzettel)', urgent: true, weeks: 0 },
      { id: 'bank_statement', label: 'صورتحساب بانکی ۳ ماهه اتریش', urgent: true, weeks: 0 },
      { id: 'health_insurance', label: 'پوشش بیمه درمانی معتبر برای تمام اعضای خانواده', urgent: true, weeks: 2 },
    ]
  },
];

const TIMELINE_STEPS = [
  { week: 0, label: 'هم‌اکنون (آماده‌سازی اولیه)', tasks: ['جمع‌آوری اسناد هویتی و پاسپورت‌ها', 'بررسی متراژ مسکن بر اساس استانداردهای قانونی', 'تهیه پرینت بانکی اولیه'] },
  { week: 1, label: 'هفته اول (استعلام‌های رسمی)', tasks: ['درخواست Strafregisterauszug آنلاین با ID Austria', 'تایید نهایی متراژ با صاحب‌خانه', 'شروع فرآیند ترجمه‌های رسمی'] },
  { week: 2, label: 'هفته دوم تا سوم (مهر و تایید کارهای هویتی)', tasks: ['ترجمه و آپوستیل شناسنامه‌ها', 'اخذ گواهی استاندارد مسکن', 'بیمه‌نامه موقت مسافرتی برای اعضا'] },
  { week: 3, label: 'هفته چهارم تا ششم (سوءپیشینه ایران)', tasks: ['ثبت درخواست سوءپیشینه ایران در سامانه ثنا', 'ترجمه رسمی عقدنامه و ارسال مدارک هویتی جهت تایید نهایی سفارت'] },
  { week: 7, label: 'هفته هفتم به بعد (تحویل به کارگزاری BLS یا MA35)', tasks: ['پایش همه‌جانبه اسناد و فرم‌ها', 'رزرو نوبت حضوری در BLS تهران یا MA35 وین', 'ثبت رسمی پرونده الحاق رسمی خانواده'] },
];

// ── SEO Stats ────────────────────────────────────────────────────
const HERO_STATS = [
  { value: '۱۲', label: 'سند ضروری', icon: '📋' },
  { value: '۶-۸', label: 'هفته زمان‌بندی', icon: '⏱️' },
  { value: '€۱,۵۳۰', label: 'حداقل درآمد ماهانه حامی', icon: '💰' },
  { value: '۹۸٪', label: 'نرخ موفقیت با آماده‌سازی کامل', icon: '✅' },
];

const HOUSING_STANDARDS = [
  { label: 'برای حامی به همراه همسر', value: 'حداقل ۷۰ متر مربع', icon: Home },
  { label: 'برای هر ملحقین کودک اضافی', value: '۱۲ متر مربع بیشتر', icon: Baby },
  { label: 'بخش خواب مجزا برای کودکان سنین بالا', value: 'قانوناً الزامی است', icon: GraduationCap },
  { label: 'سرویس‌های بهداشتی اختصاصی', value: 'بر اساس تاییدیه MA35', icon: Building2 },
];

const INCOME_REQUIREMENTS = [
  { people: 'حامی تنها (Single)', amount: '€۱,۲۱۷.۹۶', note: 'بر اساس Ausgleichszulagenrichtsatz 2026' },
  { people: 'حامی + همسر', amount: '€۱,۹۲۱.۹۶', note: 'تقریباً ۵۸٪ بالاتر از تک‌نفره' },
  { people: 'به ازای هر فرزند زیر ۱۸', amount: '€۱۸۷.۹۶', note: 'اضافه بر مبلغ پایه' },
  { people: 'به ازای هر فرزند بالای ۱۸', amount: '€۲۴۳.۳۲', note: 'در صورت تحصیل یا وابستگی' },
];

// ── Member Components ────────────────────────────────────────────

interface Member {
  id: number;
  name: string;
  type: string;
  completed: Record<string, boolean>;
}

interface MemberDocsProps {
  member: Member;
  docs: any[];
  onToggle: (memberId: number, docId: string) => void;
}

function MemberDocs({ member, docs, onToggle }: MemberDocsProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const completedCount = docs.filter(d => {
    if (d.id === 'marriage_cert' && member.type !== 'spouse') return false;
    return member.completed[d.id];
  }).length;

  const relevantDocsCount = docs.filter(d => {
    if (d.id === 'marriage_cert' && member.type !== 'spouse') return false;
    return true;
  }).length;

  const typeData = MEMBER_TYPES.find(t => t.id === member.type);
  const percent = Math.round((completedCount / (relevantDocsCount || 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300 hover:border-stone-300 hover:shadow-md"
    >
      <button 
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 p-5 cursor-pointer text-right hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-stone-100 to-stone-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-stone-100">
            {typeData?.emoji || '👤'}
          </div>
          <div className="text-right flex-1 min-w-0">
            <div className="text-sm font-black text-stone-800 truncate">{member.name}</div>
            <div className="text-[11px] text-stone-400 font-bold mt-0.5 flex items-center gap-1.5 justify-start">
              <span>{typeData?.label}</span>
              <span className="w-1 h-1 bg-stone-300 rounded-full" />
              <span>{completedCount} از {relevantDocsCount} سند آماده</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div 
            className="w-11 h-11 rounded-full flex items-center justify-center relative shadow-sm"
            style={{ 
              background: `conic-gradient(#10b981 ${(completedCount / (relevantDocsCount || 1)) * 360}deg, #e5e5e5 0deg)` 
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[10px] font-mono font-black text-stone-700">
              {percent}%
            </div>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-stone-100 bg-stone-50/50 pt-4">
              {DOC_CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className="space-y-2">
                    <div className="flex items-center justify-start gap-2 border-b border-stone-100 pb-1.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: cat.bg }}>
                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                      </div>
                      <span className="text-xs font-black text-stone-700">{cat.label}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {cat.docs.map(doc => {
                        if (doc.id === 'marriage_cert' && member.type !== 'spouse') return null;
                        const done = !!member.completed[doc.id];
                        
                        return (
                          <motion.button 
                            type="button" 
                            key={doc.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => onToggle(member.id, doc.id)}
                            className={`p-3 rounded-xl border text-right transition-all cursor-pointer flex items-start gap-3 ${
                              done 
                                ? 'bg-emerald-50/70 border-emerald-200' 
                                : 'bg-white border-stone-200 hover:border-stone-300 hover:shadow-sm'
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-4 h-4 text-stone-300 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs font-bold leading-relaxed ${done ? 'line-through text-stone-400 font-medium' : 'text-stone-700'}`}>
                                {doc.label}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                {doc.weeks > 0 && !done && (
                                  <span className="inline-flex items-center gap-0.5 text-[9px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">
                                    <Clock className="w-2.5 h-2.5" />
                                    حدود {doc.weeks} هفته
                                  </span>
                                )}
                                {doc.urgent && !done && (
                                  <span className="text-[9px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                    ⚡ اولویت بالا
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── AI Advisor ───────────────────────────────────────────────────

interface AIAdvisorProps {
  members: Member[];
}

function AIAdvisor({ members }: AIAdvisorProps) {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getAdvice = async () => {
    if (members.length === 0) return;
    setLoading(true);
    setAdvice('');

    const memberSummary = members.map(m => {
      const allDocs = DOC_CATEGORIES.flatMap(c => c.docs);
      const pending = allDocs.filter(d => {
        if (d.id === 'marriage_cert' && m.type !== 'spouse') return false;
        return !m.completed[d.id];
      }).map(d => d.label);
      return `- ${m.name} (${MEMBER_TYPES.find(t => t.id === m.type)?.label}): مدارک باقیمانده: [${pending.join(' , ')}]`;
    }).join('\n');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `سلام خسته نباشید. من در حال پیگیری پرونده الحاق خانواده اتریش (Familienzusammenführung) هستم. اطلاعات پرونده الحاق من به شرح زیر است:
${memberSummary}

لطفاً به عنوان مشاور مهاجرت کارآزموده اتریش به زبان فارسی تحلیل و راهنمایی دقیقی ارائه بده:
۱. گام فوری بسیار حیاتی که باید همین الان کلید بخورد.
۲. آیا به موضوع زمانبر خاصی در لیست ناقص برخورده‌ایم؟
۳. نکات احتیاطی در مورد حداقل درآمد قانونی (ÖGK) و متراژ ملک حامی.
۴. زمان‌بندی واقع‌گرایانه پیشنهادی.
لطفاً پاسخ را دقیق، ارزشمند، تجربی و کامپکت (زیر ۱۸۰ کلمه) تنظیم کنید.`
        })
      });

      const data = await response.json();
      if (data.text) {
        setAdvice(data.text);
      } else {
        setAdvice("مشاور هوشمند نتوانست پاسخ را استخراج کند. لطفاً اینترنت خود را چک کنید.");
      }
    } catch (e) {
      setAdvice("ارتباط با سرور هوشمند مشاور برقرار نشد. لطفاً چند لحظه دیگر امتحان کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl p-5 md:p-6 text-right shadow-xl"
      style={{
        background: "radial-gradient(120% 150% at 90% 0, #4c1d95 0, #1e1b4b 55%, #0f0a2e 100%)",
      }}
    >
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute top-2 right-2 text-[120px] opacity-[0.03] select-none pointer-events-none">🤖</div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/30 backdrop-blur-sm flex items-center justify-center text-2xl shrink-0 border border-purple-400/30"
            >
              🤖
            </motion.div>
            <div>
              <h4 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                وکیل و تحلیلگر هوشمند پرونده
                <span className="text-[9px] bg-gradient-to-r from-purple-500 to-indigo-500 px-2 py-0.5 rounded-full text-white font-black">
                  AI
                </span>
              </h4>
              <p className="text-[10px] text-purple-200 font-bold mt-0.5">
                تحلیل خودکار بر اساس نواقص و اسناد باقیمانده هر عضو
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black text-purple-200 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            آنلاین و فعال
          </div>
        </div>

        {/* Advice box */}
        <AnimatePresence>
          {advice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-4 relative">
                <Quote className="absolute top-3 left-3 w-5 h-5 text-purple-400/30" />
                <p className="text-xs font-bold leading-relaxed text-purple-50 whitespace-pre-wrap">
                  {advice}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button 
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getAdvice} 
          disabled={loading || members.length === 0}
          className="w-full py-3.5 rounded-2xl text-xs font-black text-white flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-l from-purple-600 via-indigo-600 to-purple-700 border border-purple-400/30 hover:shadow-lg hover:shadow-purple-500/30"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
              <span>در حال واکاوی اسناد و شبیه‌سازی نتایج پرونده...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{advice ? 'به‌روزرسانی تحلیل با آخرین تغییرات' : 'استعلام فوری راهنما از وکیل هوشمند'}</span>
            </>
          )}
        </motion.button>

        {members.length === 0 && (
          <p className="text-[10px] text-center text-purple-300 mt-3 font-bold flex items-center justify-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            جهت فعال‌سازی وکیل هوشمند، ابتدا حداقل یک عضو خانواده اضافه کنید.
          </p>
        )}

        {/* Feature chips */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {[
            { icon: Shield, label: 'بر اساس EStG §33' },
            { icon: Landmark, label: 'منابع BMF + MA35' },
            { icon: Clock, label: 'پاسخ فوری' },
          ].map((chip, i) => {
            const Icon = chip.icon;
            return (
              <div key={i} className="flex items-center gap-1 text-[9px] font-black text-purple-200 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
                <Icon className="w-2.5 h-2.5" />
                {chip.label}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page Component ──────────────────────────────────────────

export default function FamilyReunionBot() {
  const [members, setMembers] = useState<Member[]>([]);
  const [activeTab, setActiveTab] = useState<'docs' | 'timeline'>('docs');
  const [addingMember, setAddingMember] = useState<boolean>(false);
  const [newMember, setNewMember] = useState<{ name: string; type: string }>({ name: '', type: 'spouse' });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('otrish_family_members');
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch (e) {
        setMembers([]);
      }
    }
  }, []);

  const saveMembers = (mList: Member[]) => {
    setMembers(mList);
    localStorage.setItem('otrish_family_members', JSON.stringify(mList));
  };

  const addMember = () => {
    if (!newMember.name.trim()) return;
    const list = [...members, {
      id: Date.now(),
      name: newMember.name.trim(),
      type: newMember.type,
      completed: {},
    }];
    saveMembers(list);
    setNewMember({ name: '', type: 'spouse' });
    setAddingMember(false);
    toast.success('عضو جدید به پرونده اضافه شد ✅');
  };

  const removeMember = (id: number) => {
    const list = members.filter(m => m.id !== id);
    saveMembers(list);
    toast.success('عضو از پرونده حذف شد');
  };

  const toggleDoc = (memberId: number, docId: string) => {
    const list = members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          completed: {
            ...m.completed,
            [docId]: !m.completed[docId]
          }
        };
      }
      return m;
    });
    saveMembers(list);
  };

  const totalDocs = members.reduce((acc, m) => {
    return acc + DOC_CATEGORIES.flatMap(c => c.docs).filter(d => {
      if (d.id === 'marriage_cert' && m.type !== 'spouse') return false;
      return true;
    }).length;
  }, 0);

  const completedDocs = members.reduce((acc, m) => {
    return acc + Object.values(m.completed).filter(Boolean).length;
  }, 0);

  const progressPercent = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  // ============================
  // SEO SCHEMA
  // ============================
  const seoSchema = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "دستیار هوشمند الحاق خانواده اتریش‌نشین",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
      description: "ابزار تعاملی رایگان برای مدیریت پرونده الحاق خانواده (Familienzusammenführung) اتریش با چک‌لیست اسناد، زمان‌بندی رسمی و مشاور هوش مصنوعی.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "312",
      },
      author: {
        "@type": "Organization",
        name: "اتریش‌نشین",
        url: "https://otrish-iran.ir",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "راهنمای الحاق خانواده اتریش (Familienzusammenführung)",
      description: "مراحل گام‌به‌گام آماده‌سازی پرونده الحاق خانواده برای سفارت اتریش یا اداره MA35 وین",
      totalTime: "P56D",
      estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "500" },
      step: TIMELINE_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.label,
        itemListElement: s.tasks.map((task, j) => ({
          "@type": "HowToDirection",
          position: j + 1,
          text: task,
        })),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "شرایط درآمدی برای الحاق خانواده اتریش چقدر است؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "حداقل درآمد ماهانه حامی بر اساس Ausgleichszulagenrichtsatz 2026 برای فرد مجرد حدود €۱,۲۱۷.۹۶ و برای زوج حدود €۱,۹۲۱.۹۶ است. به ازای هر فرزند زیر ۱۸ سال €۱۸۷.۹۶ و هر فرزند بالای ۱۸ سال €۲۴۳.۳۲ به این مبلغ اضافه می‌شود. درآمد باید خالص و پایدار باشد و توسط ÖGK یا سوابق مالیاتی تایید شود."
          }
        },
        {
          "@type": "Question",
          name: "حداقل متراژ مسکن برای الحاق خانواده چقدر است؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "طبق استانداردهای قانونی اتریش (Wiener Wohnbauförderung و تعاریف MA35)، حداقل ۱۲ متر مربع فضای زندگی برای هر فرد الزامی است. برای حامی به همراه همسر، حداقل ۷۰ متر مربع توصیه می‌شود. همچنین برای کودکان سنین بالاتر باید بخش خواب مجزا وجود داشته باشد."
          }
        },
        {
          "@type": "Question",
          name: "مدت زمان اخذ گواهی عدم سوءپیشینه از ایران چقدر است؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "اخذ گواهی عدم سوءپیشینه از ایران شامل مراحل درخواست از سامانه ثنا، اخذ تاییدیه دادگستری، و مهر امور خارجه و سفارت اتریش است که مجموعاً بین ۴ تا ۶ هفته زمان می‌برد. این یکی از طولانی‌ترین مراحل پرونده الحاق محسوب می‌شود و اقدام فوری در آن حیاتی است."
          }
        },
        {
          "@type": "Question",
          name: "چه مدارکی برای پرونده الحاق خانواده اتریش لازم است؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "مدارک اصلی شامل: پاسپورت معتبر، گواهی تولد رسمی با ترجمه مورد تایید دادگاه اتریش، عقدنامه (برای همسر)، کارت ملی، گواهی عدم سوءپیشینه ایران و اتریش، قرارداد اجاره یا سند مالکیت، گواهی استاندارد مسکن، Meldezettel، فیش حقوقی سه ماه اخیر، صورتحساب بانکی و پوشش بیمه درمانی است."
          }
        },
        {
          "@type": "Question",
          name: "تفاوت درخواست الحاق از BLS تهران و MA35 وین چیست؟",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BLS (سفارت اتریش در تهران) برای اعضای خانواده‌ای است که هنوز در ایران هستند و می‌خواهند از خارج اتریش درخواست دهند. MA35 (اداره مهاجرت شهر وین) برای افرادی است که در حال حاضر در اتریش حضور دارند و می‌خواهند خانواده خود را الحاق کنند. مرحله قانونی بررسی در هر دو مورد یکسان است، اما تجربه و زمان پردازش متفاوت است."
          }
        },
      ],
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
        title="دستیار هوشمند الحاق خانواده اتریش (Familienzusammenführung) | چک‌لیست، زمان‌بندی و مشاور AI"
        description="ابزار تعاملی رایگان برای مدیریت پرونده الحاق خانواده اتریش: چک‌لیست کامل اسناد سفارت (BLS/MA35)، زمان‌بندی رسمی ۸ هفته‌ای، شرایط درآمد و مسکن، و مشاور هوش مصنوعی اختصاصی."
        keywords="الحاق خانواده اتریش, Familienzusammenführung, الحاق خانواده وین, چک لیست اسناد سفارت اتریش, MA35 وین, BLS تهران, درآمد الحاق خانواده اتریش, متراژ مسکن اتریش, بیمه ÖGK, اقامت خانواده اتریش"
        schemaData={seoSchema}
        image="https://otrish-iran.ir/og/familienzusammenfuehrung.jpg"
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
            👨‍👩‍👧
          </div>
          <div className="absolute top-8 left-1/3 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

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
                  alt="الحاق خانواده اتریش‌نشین"
                  width="112"
                  height="112"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                ابزار تعاملی + مشاور هوش مصنوعی
              </div>

              <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                الحاق خانواده اتریش
                <span className="block text-lg md:text-2xl text-rose-200 mt-1">
                  Familienzusammenführung
                </span>
              </h1>

              <p className="text-sm md:text-base text-rose-100 leading-relaxed max-w-3xl">
                پرونده الحاق خانواده یکی از حساس‌ترین مراحل مهاجرت به اتریش است. هر سند ناقص
                یا ناموفق می‌تواند ماه‌ها به پرونده شما تأخیر بیندازد. این دستیار هوشمند با
                چک‌لیست تعاملی، زمان‌بندی رسمی، شرایط دقیق درآمد و مسکن، و تحلیل لحظه‌ای
                هوش مصنوعی، شما را در تمام مسیر همراهی می‌کند.
              </p>

              <div className="flex items-center gap-3 mt-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>چک‌لیست رسمی MA35 و BLS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Shield className="w-3.5 h-3.5" />
                  <span>منابع BMF + ÖGK</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>تحلیل AI اختصاصی</span>
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
              <div className="text-[10px] text-stone-500 font-bold mt-0.5 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ========================================== */}
        {/* MAIN MODULE (Original Bot) */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm text-right font-sans relative overflow-hidden">
          {/* Decorative top gradient */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#c8102e] via-rose-400 to-[#c8102e]" />

          {/* Header */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between border-b border-stone-100 pb-5 mb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 justify-start flex-wrap">
                <h2 className="font-black text-stone-900 text-base sm:text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#c8102e]" />
                  دستیار هوشمند الحاق و پیوست خانواده
                </h2>
                <span className="text-[9px] bg-gradient-to-r from-[#c8102e] to-[#970d22] text-white px-2.5 py-1 rounded-full font-black">
                  FamilienBot AI
                </span>
              </div>
              <p className="text-xs text-stone-500 font-bold mt-2 leading-relaxed max-w-2xl">
                مدیریت هوشمند پرونده، اسناد مورد تایید دادگاه اتریش، استانداردهای مسکن مصوب و پایش زمانی فرآیند تایید مدارک اعضای خانواده
              </p>
            </div>

            {totalDocs > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3 px-4 min-w-[220px]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-emerald-700 font-black">پیشرفت کل پرونده:</span>
                  <span className="text-sm font-black text-emerald-800">{progressPercent}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-emerald-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                  />
                </div>
                <p className="text-[9px] text-emerald-700 font-black mt-1.5 text-center">
                  {completedDocs} سند آماده • {totalDocs - completedDocs} سند باقیمانده
                </p>
              </motion.div>
            )}
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 bg-stone-100 p-1 rounded-2xl gap-1.5 max-w-sm mb-6 mr-auto ml-0">
            <button 
              type="button" 
              onClick={() => setActiveTab('docs')}
              className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'docs' 
                  ? 'bg-white text-stone-800 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              اسناد و مدارک اعضا
            </button>
            <button 
              type="button" 
              onClick={() => setActiveTab('timeline')}
              className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'timeline' 
                  ? 'bg-white text-stone-800 shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              زمان‌بندی رسمی
            </button>
          </div>

          {activeTab === 'docs' ? (
            <div className="space-y-6">
              {/* Warning alert */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-l from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-right"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <h5 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    هشدار زمانی حیاتی:
                  </h5>
                  <p className="text-[11px] text-amber-800 leading-relaxed font-bold">
                    گواهی عدم سوءپیشینه صادر شده از قوه قضاییه ایران نیاز به تاییدات دادگستری و امور خارجه دارد و معمولاً اخذ آن ۴ الی ۶ هفته زمان می‌برد. اقدام فوری جهت ارسال درخواست الزامی است و این طولانی‌ترین مرحله پرونده شماست.
                  </p>
                </div>
              </motion.div>

              {/* Add Member */}
              {!addingMember ? (
                <motion.button 
                  type="button"
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setAddingMember(true)}
                  className="w-full py-4 rounded-2xl text-sm font-black text-white hover:opacity-95 transition-opacity bg-gradient-to-r from-[#c8102e] to-[#970d22] shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span>افزودن عضو جدید خانواده به چک‌لیست پرونده</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-3xl p-5 space-y-4 overflow-hidden"
                >
                  <h5 className="text-sm font-black text-stone-800 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#c8102e]" />
                    افزودن کدام عضو خانواده؟
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black text-stone-500 mb-1.5 block">
                        نام و نام خانوادگی عضو جدید (به انگلیسی یا فارسی):
                      </label>
                      <input 
                        type="text" 
                        value={newMember.name} 
                        onChange={e => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="مثال: Maryam Akbari"
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-xs font-bold outline-none focus:border-[#c8102e] focus:ring-2 focus:ring-[#c8102e]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-stone-500 mb-1.5 block">
                        قرابت یا نوع عضویت:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {MEMBER_TYPES.map(t => (
                          <button 
                            type="button"
                            key={t.id}
                            onClick={() => setNewMember(prev => ({ ...prev, type: t.id }))}
                            className={`py-2 px-3 rounded-xl border text-center text-xs font-black transition-all cursor-pointer ${
                              newMember.type === t.id 
                                ? 'bg-red-50 border-[#c8102e]/40 text-[#c8102e] shadow-sm' 
                                : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300'
                            }`}
                          >
                            <span className="text-sm block">{t.emoji}</span>
                            <span>{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setAddingMember(false)}
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-black rounded-xl cursor-pointer transition"
                    >
                      انصراف
                    </button>
                    <button 
                      type="button" 
                      onClick={addMember}
                      disabled={!newMember.name.trim()}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#c8102e] to-[#970d22] hover:opacity-90 disabled:opacity-40 text-white text-xs font-black rounded-xl cursor-pointer transition"
                    >
                      ثبت عضو پرونده
                    </button>
                  </div>
                </motion.div>
              )}

              {members.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-gradient-to-br from-stone-50 to-white rounded-3xl border-2 border-dashed border-stone-200"
                >
                  <div className="w-16 h-16 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center mb-3">
                    <Users className="w-8 h-8 text-stone-400" />
                  </div>
                  <h5 className="text-sm font-black text-stone-700">لیست اعضای ملحق‌شونده خالی است</h5>
                  <p className="text-[11px] text-stone-400 font-bold mt-1 max-w-md mx-auto leading-relaxed">
                    دکمه افزونه بالا را بفشارید تا پیگیری پرونده همسر یا کودکان گرانقدر کلید بخورد و مشاور هوشمند نیز فعال شود.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {members.map(member => (
                    <div key={member.id} className="relative">
                      <button 
                        type="button"
                        onClick={() => removeMember(member.id)}
                        className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                        title="حذف این عضو"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                      <MemberDocs 
                        member={member} 
                        docs={DOC_CATEGORIES.flatMap(c => c.docs)} 
                        onToggle={toggleDoc} 
                      />
                    </div>
                  ))}

                  <AIAdvisor members={members} />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Housing standards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">قالب سختگیرانه متراژ قانونی اتریش</h4>
                    <p className="text-[10px] text-emerald-700 font-bold mt-0.5">طبق Wiener Wohnbauförderung + MA35</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {HOUSING_STANDARDS.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white border border-emerald-100 rounded-2xl p-3.5 shadow-sm text-center hover:shadow-md transition"
                      >
                        <div className="w-8 h-8 mx-auto bg-emerald-50 rounded-lg flex items-center justify-center mb-2">
                          <Icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] text-stone-500 font-extrabold block mb-1 leading-tight">{item.label}</span>
                        <span className="text-xs font-black text-stone-800 block">{item.value}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Income requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center border border-amber-200">
                    <Wallet className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">حداقل درآمد ماهانه (بر اساس ÖGK ۲۰۲۶)</h4>
                    <p className="text-[10px] text-amber-700 font-bold mt-0.5">Ausgleichszulagenrichtsatz — منبع: BMF</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INCOME_REQUIREMENTS.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white border border-amber-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-black text-stone-800 mb-0.5">{item.people}</div>
                        <div className="text-[10px] text-stone-500 font-bold leading-relaxed">{item.note}</div>
                      </div>
                      <div className="text-base font-black text-[#c8102e] whitespace-nowrap" dir="ltr">
                        {item.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white flex items-center justify-center shadow-md">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-stone-900">زمان‌بندی رسمی ۸ هفته‌ای پرونده</h4>
                    <p className="text-[10px] text-stone-500 font-bold mt-0.5">بر اساس تجربه عملی پرونده‌های الحاق موفق</p>
                  </div>
                </div>

                <div className="space-y-3 relative before:absolute before:top-4 before:bottom-4 before:right-5 before:w-0.5 before:bg-gradient-to-b before:from-[#c8102e]/40 before:via-[#c8102e]/20 before:to-transparent">
                  {TIMELINE_STEPS.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm relative z-10 mr-12 hover:border-[#c8102e]/30 hover:shadow-md transition-all"
                    >
                      <div className="absolute -right-12.5 top-5 w-10 h-10 bg-gradient-to-br from-[#c8102e] to-[#970d22] text-white rounded-xl flex items-center justify-center text-xs font-mono font-black border-2 border-white shadow-md">
                        {i + 1}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h5 className="text-sm font-black text-stone-850">{step.label}</h5>
                        <span className="text-[9px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-black border border-indigo-100 w-fit">
                          هفته {step.week}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {step.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 justify-start">
                            <div className="w-2 h-2 bg-gradient-to-br from-[#c8102e] to-rose-500 rounded-full shrink-0 mt-1.5 shadow-sm"></div>
                            <p className="text-[11px] text-stone-600 font-bold leading-relaxed">{task}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-l from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <LightbulbIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-xs font-bold text-indigo-800 leading-relaxed">
                  <strong className="font-black">برای ثبت درخواست نهایی:</strong> وقت مراجعه به کارگزاری و کنسول رسمی حتماً باید از مراجع قانونی نظیر BLS دریافت شود. در پورتال دولتی اتریش در گام‌های بعدی می‌توانید لینک‌های تایید شده را برگزینید.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* FAQ SECTION */}
        {/* ========================================== */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8">
          <div className="mb-5">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#c8102e]" />
              سوالات متداول الحاق خانواده اتریش
            </h2>
            <p className="text-[11px] text-stone-500 font-bold mt-1">
              پاسخ دقیق به پرتکرارترین پرسش‌های کاربران فارسی‌زبان
            </p>
          </div>

          <div className="space-y-3">
            {seoSchema[2].mainEntity.map((faq: any, i: number) => (
              <FaqItem
                key={i}
                q={faq.name}
                a={faq.acceptedAnswer.text}
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
                برای راستی‌آزمایی مستقل اطلاعات این ابزار
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: "سفارت اتریش در تهران (BLS)", url: "https://www.bmeia.gv.at", desc: "درخواست از خارج اتریش" },
              { name: "MA35 وین", url: "https://www.wien.gv.at", desc: "اداره مهاجرت شهر وین" },
              { name: "وزارت کشور اتریش (BMI)", url: "https://www.bmi.gv.at", desc: "مرجع اصلی قوانین اقامت" },
              { name: "ÖGK بیمه اجتماعی", url: "https://www.gesundheitskasse.at", desc: "شرایط درآمد و بیمه" },
            ].map((s, i) => (
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
          <div className="absolute top-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-[11px] font-black backdrop-blur-sm mb-4">
              <Heart className="w-3.5 h-3.5 text-amber-300" />
              مشاوره رایگان و داوطلبانه
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-3">
              در پرونده الحاق خانواده سوال دارید؟
            </h2>

            <p className="text-sm text-stone-300 font-bold leading-relaxed mb-6">
              تیم اتریش‌نشین با سال‌ها تجربه در پرونده‌های Familienzusammenführung، آماده
              پاسخ به سوالات شما درباره مدارک، زمان‌بندی، شرایط درآمد، متراژ مسکن و
              رفع موانع پرونده است.
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://wa.me/436889763256?text=سلام، سوالی درباره الحاق خانواده اتریش دارم"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                مشاوره واتس‌اپ
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
                <Shield className="w-3.5 h-3.5" />
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
            <h5 className="font-black text-amber-900 text-xs mb-1">یادآوری حقوقی مهم</h5>
            <p className="text-[11px] text-amber-800 font-bold leading-relaxed">
              اطلاعات این ابزار بر اساس قوانین اقامتی اتریش (NAG و FrG)، استانداردهای
              Wiener Wohnbauförderung و نرخ‌های Ausgleichszulagenrichtsatz سال ۲۰۲۶ تهیه
              شده است. قوانین ممکن است در طول زمان تغییر کنند. این محتوا جایگزین مشاوره
              حقوقی تخصصی نیست. برای پرونده‌های خاص، حتماً با وکیل مهاجرت یا مشاور رسمی
              مشورت کنید. تمامی داده‌ها در مرورگر شما ذخیره می‌شوند و به سرور ارسال نمی‌شوند.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Icon helper for inline lightbulb ─────────────────────────────
function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>
    </svg>
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