import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, Clock, MapPin, CheckSquare, Square, Trash2, Plus,
  AlertCircle, Sparkles, Shield, FileCheck2, TrendingUp,
  Building2, HeartPulse, Landmark, Plane, Award, ChevronDown,
  ChevronUp, Star, Zap, Globe2, BadgeCheck, CircleDot, Filter
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   📌 Austria Residency – Appointments Manager
   سامانه هوشمند مدیریت نوبت‌ها و اسناد اقامت اتریش
   SEO-optimized • Dynamic • Accessible • RTL
   ═══════════════════════════════════════════════════════════════ */

interface Appointment {
  id: string;
  title: string;
  type: 'ma35' | 'embassy' | 'doctor' | 'bank' | 'other';
  date: string;
  time: string;
  location: string;
  notes: string;
  completed: boolean;
  priority: 'low' | 'normal' | 'high';
  requiredDocs: { name: string; ready: boolean }[];
}

const DEFAULT_DOCS_BY_TYPE: Record<string, string[]> = {
  ma35: [
    'پاسپورت معتبر (Reisepass)',
    'کارت اقامت فعلی (اگر تمدیدی است)',
    'برگه آدرس شهرداری (Meldezettel)',
    'بیمه درمانی معتبر (E-Card / ÖGK)',
    'فیش حقوقی ۳ ماه اخیر (Lohnzettel)',
    'پرینت حساب بانکی تمکن مالی یورو'
  ],
  embassy: [
    'پاسپورت معتبر و شناسنامه همراه ترجمه',
    'فرم درخواست تکمیل‌شده و امضا شده',
    'عکس بیومتریک جدید پاسپورتی',
    'دعوت‌نامه یا رزرویشن هتل / مسکن اتریش'
  ],
  doctor: [
    'کارت سبز درمانی (E-Card)',
    'نسخه‌ها یا سوابق دارویی قبلی',
    'فرم ارجاع پزشک عمومی (در صورت نیاز)'
  ],
  bank: [
    'گذرنامه معتبر (Reisepass)',
    'تاییدیه ثبت آدرس شهرداری (Meldezettel)',
    'مدرک منشا سرمایه یا قرارداد کاری رسمی'
  ],
  other: ['مدرک شناسایی عکس‌دار معتبر']
};

const TYPE_LABELS: Record<string, string> = {
  ma35: 'اداره مهاجرت MA 35',
  embassy: 'سفارت اتریش در تهران',
  doctor: 'نوبت پزشک / درمانگاه',
  bank: 'افتتاح یا مشاوره بانکی',
  other: 'سایر امور اداری'
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  ma35: <Building2 className="w-4 h-4" />,
  embassy: <Plane className="w-4 h-4" />,
  doctor: <HeartPulse className="w-4 h-4" />,
  bank: <Landmark className="w-4 h-4" />,
  other: <CircleDot className="w-4 h-4" />
};

const TYPE_GRADIENTS: Record<string, string> = {
  ma35: 'from-red-500 to-rose-600',
  embassy: 'from-amber-500 to-orange-600',
  doctor: 'from-teal-500 to-emerald-600',
  bank: 'from-indigo-500 to-blue-600',
  other: 'from-stone-500 to-slate-600'
};

const TYPE_BADGES: Record<string, string> = {
  ma35: 'bg-red-50 text-red-800 border-red-200',
  embassy: 'bg-amber-50 text-amber-800 border-amber-200',
  doctor: 'bg-teal-50 text-teal-800 border-teal-200',
  bank: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  other: 'bg-stone-50 text-stone-700 border-stone-200'
};

/* ─── Austria Resident Logo (SVG) ─── */
function AustriaResidentLogo({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-label="Austria Resident Logo">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-rose-700 rounded-2xl shadow-lg shadow-red-500/30 rotate-3 animate-[spin_18s_linear_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 rounded-2xl flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 40 40" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
          {/* Austrian flag stripes */}
          <rect x="4" y="8" width="32" height="5" fill="#ED2939" rx="1" />
          <rect x="4" y="13" width="32" height="5" fill="#FFFFFF" rx="0.5" />
          <rect x="4" y="18" width="32" height="5" fill="#ED2939" rx="1" />
          {/* Stars / check */}
          <path
            d="M20 27 L23 30 L29 24"
            stroke="#FBBF24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-stone-900 animate-pulse" />
      </div>
    </div>
  );
}

export default function AppointmentsManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | Appointment['type']>('all');

  // Form
  const [title, setTitle] = useState('');
  const [type, setType] = useState<Appointment['type']>('ma35');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<Appointment['priority']>('normal');

  /* ─── Load from LocalStorage ─── */
  useEffect(() => {
    const saved = localStorage.getItem('austrian_appointments_v2');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
        return;
      } catch {
        /* fallback to seed */
      }
    }
    const seedDate = (offsetDays: number) =>
      new Date(Date.now() + 86400000 * offsetDays).toISOString().split('T')[0];

    const initial: Appointment[] = [
      {
        id: 'apt-1',
        title: 'تحویل مدارک تمدید اقامت RWR',
        type: 'ma35',
        date: seedDate(4),
        time: '10:30',
        location: 'Dresdner Str. 93, 1200 Wien',
        notes:
          'حتماً پرینت تمکن مالی ۳ ماهه آخر را به همراه داشته باشید تا به آفیسر ارائه شود.',
        completed: false,
        priority: 'high',
        requiredDocs: DEFAULT_DOCS_BY_TYPE.ma35.map((d) => ({ name: d, ready: false }))
      },
      {
        id: 'apt-2',
        title: 'ویزیت دندان‌پزشکی ÖGK',
        type: 'doctor',
        date: seedDate(1),
        time: '14:15',
        location: 'Meidlinger Hauptstraße 7, 1120 Wien',
        notes: 'همراه داشتن کارت سبز درمان (E-Card) اجباری است.',
        completed: false,
        priority: 'high',
        requiredDocs: DEFAULT_DOCS_BY_TYPE.doctor.map((d) => ({ name: d, ready: true }))
      },
      {
        id: 'apt-3',
        title: 'مشاوره افتتاح حساب بانکی Erste',
        type: 'bank',
        date: seedDate(9),
        time: '09:00',
        location: 'Graben 21, 1010 Wien',
        notes: 'برای افتتاح حساب، اثبات آدرس (Meldezettel) و مدرک درآمد ضروری است.',
        completed: false,
        priority: 'normal',
        requiredDocs: DEFAULT_DOCS_BY_TYPE.bank.map((d) => ({ name: d, ready: false }))
      }
    ];
    setAppointments(initial);
    localStorage.setItem('austrian_appointments_v2', JSON.stringify(initial));
  }, []);

  const saveAppointments = (updated: Appointment[]) => {
    setAppointments(updated);
    localStorage.setItem('austrian_appointments_v2', JSON.stringify(updated));
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    const defaultDocs = DEFAULT_DOCS_BY_TYPE[type] || [];
    const newApt: Appointment = {
      id: 'apt-' + Date.now(),
      title,
      type,
      date,
      time: time || '09:00',
      location: location || 'وین، اتریش',
      notes,
      completed: false,
      priority,
      requiredDocs: defaultDocs.map((doc) => ({ name: doc, ready: false }))
    };
    saveAppointments([newApt, ...appointments]);
    setTitle('');
    setType('ma35');
    setDate('');
    setTime('');
    setLocation('');
    setNotes('');
    setPriority('normal');
    setShowAddForm(false);
  };

  const handleToggleCompleted = (id: string) =>
    saveAppointments(
      appointments.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );

  const handleToggleDocReady = (aptId: string, docIndex: number) =>
    saveAppointments(
      appointments.map((apt) => {
        if (apt.id !== aptId) return apt;
        const newDocs = [...apt.requiredDocs];
        newDocs[docIndex] = { ...newDocs[docIndex], ready: !newDocs[docIndex].ready };
        return { ...apt, requiredDocs: newDocs };
      })
    );

  const handleDeleteAppointment = (id: string) =>
    saveAppointments(appointments.filter((a) => a.id !== id));

  const calculateDaysRemaining = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - today.getTime()) / 86400000);
  };

  const upcomingApts = appointments
    .filter((a) => !a.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastApts = appointments.filter((a) => a.completed);
  const filteredUpcoming =
    filterType === 'all' ? upcomingApts : upcomingApts.filter((a) => a.type === filterType);

  /* ─── Dynamic Stats ─── */
  const stats = useMemo(() => {
    const totalDocs = appointments.reduce((s, a) => s + a.requiredDocs.length, 0);
    const readyDocs = appointments.reduce(
      (s, a) => s + a.requiredDocs.filter((d) => d.ready).length,
      0
    );
    const urgent = upcomingApts.filter((a) => {
      const d = calculateDaysRemaining(a.date);
      return d >= 0 && d <= 3;
    }).length;
    const progress = totalDocs ? Math.round((readyDocs / totalDocs) * 100) : 0;
    return { total: appointments.length, readyDocs, totalDocs, urgent, progress };
  }, [appointments, upcomingApts]);

  return (
    <article
      dir="rtl"
      lang="fa"
      itemScope
      itemType="https://schema.org/EventReservation"
      className="relative bg-gradient-to-br from-white via-stone-50/60 to-white rounded-[28px] border border-stone-200 shadow-[0_8px_40px_-12px_rgba(220,38,38,0.15)] overflow-hidden font-sans"
      id="appointments-manager-panel"
      aria-label="مدیریت نوبت‌ها و اسناد اقامت اتریش"
    >
      {/* ── SEO Hidden Header ── */}
      <h1 className="sr-only">
        سامانه مدیریت نوبت‌ها و چک‌لیست مدارک اقامت اتریش (MA35, سفارت, ÖGK, بانک)
      </h1>
      <meta itemProp="name" content="Austria Resident Appointments Manager" />
      <meta itemProp="description" content="مدیریت هوشمند نوبت‌های اداری و درمانی در اتریش همراه با چک‌لیست پویا و هشدار فوریت" />

      {/* ── Animated Top Ribbon ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-red-700 via-rose-500 to-red-700 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
      <style>{`
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)} 50%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
        .apt-enter { animation: fadeSlideUp .45s cubic-bezier(.22,.9,.34,1) both; }
        .pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
      `}</style>

      {/* ── Decorative Blur Orbs ── */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative p-5 sm:p-7">
        {/* ═══ HEADER ═══ */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-stone-200/70">
          <div className="flex items-start gap-3.5 w-full lg:w-auto">
            <AustriaResidentLogo />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[9px] font-black tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Austria Resident
                </span>
                <span className="h-1 w-1 rounded-full bg-stone-300" />
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                  <BadgeCheck className="w-3 h-3" /> نسخه حرفه‌ای
                </span>
              </div>
              <h2 className="font-extrabold text-stone-900 text-base sm:text-lg leading-tight flex items-center gap-2 flex-wrap">
                <span>مدیریت نوبت‌ها و یادآور اسناد قانونی</span>
                <span className="text-lg">📅</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-500 font-semibold mt-1 leading-relaxed">
                رزرو قرارهای ملاقات اداره مهاجرت <span className="font-mono font-bold text-red-700">MA35</span>، سفارت، بیمه <span className="font-mono font-bold text-teal-700">ÖGK</span> و بانک‌های اتریش با چک‌لیست پویای مدارک
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm((v) => !v)}
            aria-expanded={showAddForm}
            aria-controls="add-appointment-form"
            className="group relative overflow-hidden bg-gradient-to-l from-red-600 via-red-650 to-rose-700 text-white text-xs font-black py-3 px-5 rounded-2xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-l from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700" />
            <Plus className="w-4 h-4 relative" />
            <span className="relative">{showAddForm ? 'بستن فرم' : 'افزودن نوبت جدید'}</span>
          </button>
        </header>

        {/* ═══ STATS DASHBOARD ═══ */}
        <section aria-label="آمار کلی نوبت‌ها" className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: 'نوبت‌های فعال',
              value: upcomingApts.length,
              icon: <Calendar className="w-4 h-4" />,
              tint: 'from-red-500/10 to-rose-500/5 border-red-200 text-red-700'
            },
            {
              label: 'نوبت‌های فوری',
              value: stats.urgent,
              icon: <Zap className="w-4 h-4" />,
              tint: 'from-amber-500/10 to-orange-500/5 border-amber-200 text-amber-700'
            },
            {
              label: 'مدارک آماده',
              value: `${stats.readyDocs}/${stats.totalDocs}`,
              icon: <FileCheck2 className="w-4 h-4" />,
              tint: 'from-emerald-500/10 to-teal-500/5 border-emerald-200 text-emerald-700'
            },
            {
              label: 'پیشرفت کلی',
              value: `${stats.progress}%`,
              icon: <TrendingUp className="w-4 h-4" />,
              tint: 'from-indigo-500/10 to-blue-500/5 border-indigo-200 text-indigo-700'
            }
          ].map((s) => (
            <div
              key={s.label}
              className={`relative bg-gradient-to-br ${s.tint} border rounded-2xl p-3 backdrop-blur-sm overflow-hidden group hover:-translate-y-0.5 transition-transform`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`${s.tint.split(' ').pop()}`}>{s.icon}</span>
                <span className="text-[9px] font-black opacity-60">LIVE</span>
              </div>
              <div className="font-black text-lg leading-none text-stone-900">{s.value}</div>
              <div className="text-[10px] font-bold text-stone-500 mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* ═══ PROGRESS BAR ═══ */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[10px] font-black text-stone-500 mb-1.5">
            <span>پیشرفت نهایی آماده‌سازی اسناد</span>
            <span className="font-mono text-stone-700">{stats.progress}%</span>
          </div>
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
            <div
              className="h-full bg-gradient-to-l from-red-600 via-rose-500 to-amber-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>

        {/* ═══ ADD FORM ═══ */}
        {showAddForm && (
          <form
            id="add-appointment-form"
            onSubmit={handleAddAppointment}
            className="apt-enter bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-5 mb-6 space-y-4 text-xs font-medium text-stone-700 shadow-inner"
          >
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] bg-gradient-to-l from-red-600 to-rose-600 text-white font-black px-2.5 py-1 rounded-lg">
                ➕ افزودن نوبت جدید
              </span>
              <h4 className="font-extrabold text-stone-900 text-sm">مشخصات نوبت اداری یا درمانی</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">
                  عنوان نوبت <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثلاً انگشت‌نگاری و صدور کارت RWR"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">نوع مرجع</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Appointment['type'])}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none cursor-pointer font-bold text-stone-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all"
                >
                  {Object.entries(TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">
                  تاریخ (میلادی) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs text-left font-mono font-bold outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all text-stone-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">ساعت دقیق</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs text-left font-mono font-bold outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all text-stone-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">آدرس دقیق محل مراجعه</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="مثلاً Dresdner Str. 93, 1200 Wien"
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">سطح فوریت</label>
                <div className="flex gap-2 flex-wrap">
                  {(
                    [
                      { k: 'low', label: 'عادی', cls: 'emerald' },
                      { k: 'normal', label: 'معمولی', cls: 'amber' },
                      { k: 'high', label: 'فوری', cls: 'red' }
                    ] as const
                  ).map((p) => (
                    <button
                      key={p.k}
                      type="button"
                      onClick={() => setPriority(p.k)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition-all cursor-pointer ${
                        priority === p.k
                          ? p.cls === 'red'
                            ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-500/30'
                            : p.cls === 'amber'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/30'
                            : 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/30'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-stone-600 block mb-1.5">
                  یادداشت شخصی و تذکرات حقوقی
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="موارد حیاتی، مبالغ نقدی، یا تذکرات مهم برای این نوبت..."
                  className="w-full bg-white border border-stone-200 p-2.5 rounded-xl text-xs outline-none h-20 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold text-stone-800 resize-none placeholder:text-stone-300 placeholder:font-normal"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2.5 rounded-xl font-black cursor-pointer text-[11px] transition-colors"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-gradient-to-l from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white px-5 py-2.5 rounded-xl font-black cursor-pointer text-[11px] shadow-lg shadow-stone-900/20 transition-all active:scale-95"
              >
                ثبت و الحاق چک‌لیست خودکار
              </button>
            </div>
          </form>
        )}

        {/* ═══ URGENT ALERT ═══ */}
        {stats.urgent > 0 && (
          <div className="apt-enter relative bg-gradient-to-l from-rose-50 via-red-50 to-rose-50 border-2 border-red-300 rounded-2xl p-4 mb-6 flex items-start gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_4s_linear_infinite]" />
            <div className="pulse-glow bg-red-600 text-white p-2 rounded-xl shrink-0 relative">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="relative">
              <h3 className="font-extrabold text-sm text-red-950 flex items-center gap-2">
                <span>هشدار فوریت پرونده!</span>
                <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-md font-mono">
                  {stats.urgent} نوبت
                </span>
              </h3>
              <p className="text-[11px] text-red-800 mt-1 leading-relaxed font-bold">
                شما یک یا چند نوبت در <strong>۲-۳ روز آینده</strong> دارید. اطمینان حاصل کنید که تمامی اسناد چک‌لیست علامت‌گذاری شده‌اند تا در باجه دچار نقص مدرک (Mangel) و جریمه اداری نشوید.
              </p>
            </div>
          </div>
        )}

        {/* ═══ FILTER TABS ═══ */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          <span className="text-[10px] font-black text-stone-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            فیلتر:
          </span>
          {(['all', 'ma35', 'embassy', 'doctor', 'bank', 'other'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`text-[10px] font-black px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md shadow-stone-900/20'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {f === 'all' ? 'همه' : TYPE_LABELS[f]}
            </button>
          ))}
        </div>

        {/* ═══ MAIN GRID ═══ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* ── LEFT: APPOINTMENTS LIST ── */}
          <section
            className="xl:col-span-7 space-y-4"
            aria-label="لیست نوبت‌های پیش‌رو"
          >
            <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
              <span className="text-[10px] font-mono font-black bg-gradient-to-l from-amber-100 to-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
                {filteredUpcoming.length} پرونده
              </span>
              <h3 className="text-xs font-extrabold text-stone-800">نوبت‌های پیش‌رو و هشدارهای اداری</h3>
            </div>

            {filteredUpcoming.length > 0 ? (
              <div className="space-y-3">
                {filteredUpcoming.map((apt, i) => {
                  const daysLeft = calculateDaysRemaining(apt.date);
                  const isUrgent = daysLeft >= 0 && daysLeft <= 3;
                  const isOverdue = daysLeft < 0;
                  const isExpanded = expandedId === apt.id;
                  const readyCount = apt.requiredDocs.filter((d) => d.ready).length;

                  return (
                    <article
                      key={apt.id}
                      itemScope
                      itemType="https://schema.org/Event"
                      className={`apt-enter group relative border rounded-2xl p-4 bg-white text-right transition-all overflow-hidden ${
                        isUrgent
                          ? 'border-red-300 shadow-[0_4px_20px_-8px_rgba(239,68,68,0.4)]'
                          : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* Priority accent bar */}
                      <div
                        className={`absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b ${TYPE_GRADIENTS[apt.type]}`}
                        aria-hidden="true"
                      />

                      {/* Header Row */}
                      <div className="flex justify-between items-start gap-2 mb-2.5 flex-wrap">
                        {/* Status badge */}
                        {isOverdue ? (
                          <span className="text-[9px] font-black bg-stone-100 text-stone-500 px-2.5 py-1 rounded-md border border-stone-200">
                            ⏱️ تاریخ سپری شده
                          </span>
                        ) : isUrgent ? (
                          <span className="text-[9px] font-black bg-gradient-to-l from-red-600 to-rose-600 text-white px-2.5 py-1 rounded-md animate-pulse shadow-md shadow-red-500/30">
                            🚨 {daysLeft === 0 ? 'امروز!' : daysLeft === 1 ? 'فردا!' : `${daysLeft} روز مانده`}
                          </span>
                        ) : (
                          <span className="text-[9px] font-black bg-emerald-50 text-emerald-800 px-2.5 py-1 border border-emerald-200 rounded-md">
                            ⏳ {daysLeft} روز مانده
                          </span>
                        )}

                        <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                          <span
                            className={`text-[9px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${TYPE_BADGES[apt.type]}`}
                          >
                            {TYPE_ICONS[apt.type]}
                            {TYPE_LABELS[apt.type]}
                          </span>
                          <h4
                            className="font-extrabold text-xs sm:text-sm text-stone-900"
                            itemProp="name"
                          >
                            {apt.title}
                          </h4>
                        </div>
                      </div>

                      {/* Info row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2.5 border-t border-b border-stone-100 text-[11px] text-stone-600 font-bold">
                        <div className="flex items-center justify-end gap-1.5 font-mono">
                          <time itemProp="startDate" dateTime={apt.date}>{apt.date}</time>
                          <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        </div>
                        <div className="flex items-center justify-end gap-1.5 font-mono">
                          <span>ساعت {apt.time}</span>
                          <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        </div>
                        <div
                          className="flex items-center justify-end gap-1.5"
                          itemProp="location"
                          itemScope
                          itemType="https://schema.org/Place"
                        >
                          <span className="truncate" title={apt.location} itemProp="name">
                            {apt.location}
                          </span>
                          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        </div>
                      </div>

                      {/* Notes */}
                      {apt.notes && (
                        <p className="text-[10px] text-stone-500 font-semibold leading-relaxed my-2 bg-stone-50/70 p-2 rounded-lg border border-stone-100">
                          💡 {apt.notes}
                        </p>
                      )}

                      {/* Docs Progress */}
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[10px] font-black text-stone-500 mb-1">
                          <span>
                            مدارک آماده: <span className="font-mono text-emerald-700">{readyCount}</span> / {apt.requiredDocs.length}
                          </span>
                          <span className="font-mono">
                            {apt.requiredDocs.length
                              ? Math.round((readyCount / apt.requiredDocs.length) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              readyCount === apt.requiredDocs.length
                                ? 'bg-gradient-to-l from-emerald-500 to-teal-500'
                                : 'bg-gradient-to-l from-amber-500 to-orange-500'
                            }`}
                            style={{
                              width: `${
                                apt.requiredDocs.length
                                  ? (readyCount / apt.requiredDocs.length) * 100
                                  : 0
                              }%`
                            }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : apt.id)}
                          className="text-[10px] font-black text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {isExpanded ? 'بستن چک‌لیست' : 'مشاهده چک‌لیست'}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleCompleted(apt.id)}
                            className="text-[10px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-black px-2.5 py-1.5 rounded-lg border border-emerald-200 cursor-pointer active:scale-95 transition-all flex items-center gap-1"
                          >
                            <CheckSquare className="w-3 h-3" />
                            انجام شد و آرشیو
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAppointment(apt.id)}
                            className="bg-rose-50 hover:bg-rose-100 text-red-600 p-1.5 rounded-lg cursor-pointer transition-colors active:scale-90"
                            aria-label="حذف نوبت"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Docs */}
                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-dashed border-stone-200 apt-enter">
                          <div className="text-[10px] font-black text-stone-500 mb-2">
                            📋 چک‌لیست اسناد مورد نیاز:
                          </div>
                          <div className="space-y-1.5">
                            {apt.requiredDocs.map((doc, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleToggleDocReady(apt.id, idx)}
                                className={`w-full flex justify-between items-center p-2 rounded-lg border cursor-pointer text-xs font-semibold select-none transition-all text-right ${
                                  doc.ready
                                    ? 'bg-emerald-500/5 border-emerald-200 text-stone-800'
                                    : 'bg-white border-stone-150 text-stone-500 hover:bg-stone-50'
                                }`}
                              >
                                <span
                                  className={`shrink-0 text-[8px] font-black px-1.5 py-0.5 rounded ${
                                    doc.ready
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-stone-100 text-stone-400'
                                  }`}
                                >
                                  {doc.ready ? 'آماده ✓' : 'نیاز است'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-bold text-stone-700">
                                    {doc.name}
                                  </span>
                                  {doc.ready ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-stone-300 shrink-0" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-8 bg-gradient-to-br from-stone-50 to-white rounded-2xl border border-dashed border-stone-200 text-stone-400 font-bold text-xs leading-relaxed">
                <div className="text-3xl mb-2">📭</div>
                هیچ نوبت فعالی مطابق فیلتر انتخابی وجود ندارد.
                <br />
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-red-600 underline mt-2 cursor-pointer font-black"
                >
                  افزودن نوبت جدید ←
                </button>
              </div>
            )}

            {/* PAST APPOINTMENTS */}
            {pastApts.length > 0 && (
              <div className="pt-3">
                <div className="border-b border-stone-200/70 pb-2 mb-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                    {pastApts.length} مورد
                  </span>
                  <h3 className="text-[11px] font-black text-stone-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    نوبت‌های خاتمه‌یافته و آرشیو
                  </h3>
                </div>

                <div className="space-y-2">
                  {pastApts.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-stone-50/60 border border-stone-200 rounded-xl p-3 flex justify-between items-center text-right text-xs hover:bg-stone-50 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => handleDeleteAppointment(apt.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="حذف از آرشیو"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2.5">
                        <div className="text-right">
                          <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md font-black inline-block">
                            ✓ خاتمه یافته
                          </span>
                          <h4 className="font-extrabold text-stone-700 mt-1 line-through decoration-stone-400">
                            {apt.title}
                          </h4>
                          <p className="text-[10px] text-stone-400 font-mono mt-0.5">
                            {apt.date} • {apt.time}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
                          ✓
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ── RIGHT: QUICK DOC INSPECTOR ── */}
          <aside className="xl:col-span-5 space-y-4" aria-label="بررسی سریع اسناد">
            <div className="border-b border-stone-200/70 pb-2">
              <h3 className="text-xs font-extrabold text-stone-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-red-600" />
                بررسی سریع اسناد کلیدی
              </h3>
            </div>

            {upcomingApts.length > 0 ? (
              <div className="bg-gradient-to-br from-stone-50/80 to-white border border-stone-200 rounded-2xl p-4 space-y-4">
                <p className="text-[10px] font-bold text-stone-500 leading-relaxed bg-amber-50/60 border border-amber-200/70 rounded-lg p-2.5">
                  💼 تمام مدارک چاپ‌شده و قرارگرفته در پوشه فیزیکی (Klarsichthülle) را علامت بزنید تا وضعیت پویا به‌روز شود.
                </p>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 custom-scroll">
                  <style>{`
                    .custom-scroll::-webkit-scrollbar{width:5px}
                    .custom-scroll::-webkit-scrollbar-track{background:transparent}
                    .custom-scroll::-webkit-scrollbar-thumb{background:#d6d3d1;border-radius:9px}
                    .custom-scroll::-webkit-scrollbar-thumb:hover{background:#a8a29e}
                  `}</style>

                  {upcomingApts.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-white border border-stone-200 rounded-xl p-3 space-y-2"
                    >
                      <div className="flex justify-between items-center border-b border-stone-100 pb-1.5">
                        <span
                          className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${TYPE_BADGES[apt.type]}`}
                        >
                          {TYPE_LABELS[apt.type]}
                        </span>
                        <h4 className="font-black text-xs text-stone-800 truncate max-w-[10rem]">
                          {apt.title}
                        </h4>
                      </div>

                      <div className="space-y-1">
                        {apt.requiredDocs.map((doc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleToggleDocReady(apt.id, idx)}
                            className={`w-full flex justify-between items-center p-2 rounded-lg border cursor-pointer text-xs font-semibold select-none transition-all text-right ${
                              doc.ready
                                ? 'bg-emerald-500/5 border-emerald-200 text-stone-800'
                                : 'bg-transparent border-transparent text-stone-500 hover:bg-stone-50'
                            }`}
                          >
                            <span
                              className={`shrink-0 text-[8px] font-black px-1.5 py-0.5 rounded ${
                                doc.ready
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-stone-100 text-stone-400'
                              }`}
                            >
                              {doc.ready ? 'آماده' : 'نیاز'}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10.5px] font-bold text-stone-700 text-right">
                                {doc.name}
                              </span>
                              {doc.ready ? (
                                <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : (
                                <Square className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-gradient-to-br from-stone-50 to-white border border-dashed border-stone-200 rounded-2xl text-stone-400 font-bold text-xs">
                <Globe2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                درگاه خالی است. ابتدا یک نوبت اداری ثبت کنید.
              </div>
            )}

            {/* Pro Tip */}
            <div className="relative bg-gradient-to-l from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200/70 p-4 rounded-2xl flex items-start gap-2.5 text-[11px] text-amber-950 font-black leading-relaxed overflow-hidden">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl" />
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 relative" />
              <span className="relative">
                <strong className="text-amber-900">نکته حرفه‌ای:</strong> در اتریش همواره کارت بیمه سلامت (E-Card) و کارت شناسایی معتبر را در تمامی مراجعات دولتی به همراه داشته باشید. همراه نداشتن E-Card می‌تواند به رد شدن نوبت پزشکی و پرداخت هزینه کامل منجر شود.
              </span>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center justify-between text-[9px] font-bold text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                Austria Resident Pro
              </span>
              <span className="font-mono">v2.0</span>
            </div>
          </aside>
        </div>
      </div>

      {/* ═══ SEO Footer Schema ═══ */}
      <footer className="sr-only">
        <p>
          سامانه مدیریت نوبت‌های اقامت اتریش – ابزار حرفه‌ای برای رزرو قرارهای MA35، سفارت، پزشک ÖGK و بانک. شامل چک‌لیست پویای اسناد و هشدار خودکار فوریت.
        </p>
      </footer>
    </article>
  );
}