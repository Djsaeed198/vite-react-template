import React, { useState } from 'react';

/* ============================================================
   نشان اتریش — SVG درون‌خطی (سبک، واکنش‌گرا، بدون درخواست شبکه)
   ============================================================ */
function AustriaEmblem({ className = 'h-14 w-14' }) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label="نشان کشور اتریش"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="at-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="55%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="at-white" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f5f4" />
        </linearGradient>
        <clipPath id="at-shield">
          <path d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z" />
        </clipPath>
      </defs>

      {/* بدنه‌ی سپر */}
      <path
        d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z"
        fill="url(#at-white)"
      />

      {/* نوارهای پرچم اتریش: سرخ ـ سفید ـ سرخ */}
      <g clipPath="url(#at-shield)">
        <rect x="0" y="2" width="64" height="22.7" fill="url(#at-red)" />
        <rect x="0" y="47.3" width="64" height="24" fill="url(#at-red)" />
        <circle cx="32" cy="36" r="7.5" fill="none" stroke="#9f1239" strokeWidth="2" />
        <circle cx="32" cy="36" r="2.4" fill="#9f1239" />
      </g>

      {/* خط دور سپر */}
      <path
        d="M32 2 L60 10 V38 C60 54 46 65 32 70 C18 65 4 54 4 38 V10 Z"
        fill="none"
        stroke="#9f1239"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   داده‌های ساختاریافته (Schema.org) برای سئوی قوی‌تر
   ============================================================ */
const FAQ_ITEMS = [
  {
    q: 'آیا برای تحصیل در اتریش حتماً باید آلمانی بلد باشم؟',
    a: 'برای بیشتر رشته‌های کارشناسی و بسیاری از رشته‌های ارشد، سطح B2 تا C1 آلمانی لازم است (مدرک ÖSD، Goethe یا TestDaF). اما تعداد قابل‌توجهی از برنامه‌های ارشد و دکتری به‌طور کامل انگلیسی‌زبان هستند و با IELTS 6.5 یا TOEFL iBT 87 قابل اقدام‌اند.',
  },
  {
    q: 'شهریه دانشگاه‌های اتریش چقدر است؟',
    a: 'برای دانشجویان اتحادیه اروپا و کشورهای توافق‌نامه‌ای، شهریه در دانشگاه‌های دولتی صفر است و تنها هزینه عضویت در اتحادیه دانشجویان (ÖH) حدود ۲۵ یورو در هر ترم پرداخت می‌شود. برای دانشجویان خارج از اتحادیه اروپا، شهریه دانشگاه‌های دولتی حدود ۷۲۶ یورو در هر ترم است.',
  },
  {
    q: 'مهلت درخواست پذیرش چه زمانی است؟',
    a: 'برای ترم زمستانی (شروع مهر) معمولاً تا ۵ سپتامبر و برای ترم تابستانی (شروع اسفند) تا ۵ فوریه فرصت دارید. برخی دانشگاه‌ها و رشته‌های پرطرفدار مهلت‌های زودتری دارند، بنابراین بهتر است ۶ تا ۹ ماه قبل از شروع ترم مدارک را آماده کنید.',
  },
  {
    q: 'با دیپلم ایرانی می‌توان وارد دانشگاه اتریش شد؟',
    a: 'در بسیاری از موارد دیپلم به‌تنهایی کافی نیست و باید مدارک تکمیلی مانند قبولی و گذراندن یک سال در دانشگاه داخل ایران، یا شرکت در آزمون Studienberechtigungsprüfung ارائه شود. تصمیم نهایی را دانشگاه مقصد و اداره‌ی پذیرش آن می‌گیرد.',
  },
  {
    q: 'آیا بعد از تحصیل امکان کار در اتریش وجود دارد؟',
    a: 'بله. دانشجویان خارج از اتحادیه اروپا در طول تحصیل می‌توانند تا ۲۰ ساعت در هفته کار کنند و پس از فارغ‌التحصیلی می‌توانند برای کارت اقامت جویای کار (Rot-Weiß-Rot Karte) اقدام کنند که مسیر ورود به بازار کار اتریش را هموار می‌کند.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

/* ============================================================
   کارت پایه (استایل مشترک + افکت هاور)
   ============================================================ */
function Card({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <div
      className={`group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-100/70 ${className}`}
    >
      {children}
    </div>
  );
}

/* ============================================================
   کامپوننت اصلی
   ============================================================ */
export default function AustrianEducationSystem() {
  const [activeProgram, setActiveProgram] = useState('uni');

  const higherEducation = [
    {
      id: 'uni',
      title: 'دانشگاه‌های دولتی (Universität)',
      desc: 'متمرکز بر پژوهش و دروس نظری؛ مقاطع کارشناسی، کارشناسی ارشد و دکتری.',
      points: ['شهریه بسیار پایین', 'پژوهش‌محور و آکادمیک', 'نمونه: وین، TU Wien، اینسبروک، گراتس'],
      badge: 'پژوهش‌محور',
    },
    {
      id: 'fh',
      title: 'دانشگاه‌های علوم کاربردی (Fachhochschule)',
      desc: 'متمرکز بر کاربرد عملی دانش برای اشتغال سریع در بازار کار.',
      points: ['کارآموزی اجباری صنعتی', 'پیوند مستقیم با شرکت‌ها', 'نرخ اشتغال بالا پس از فارغ‌التحصیلی'],
      badge: 'کاربردی',
    },
    {
      id: 'priv',
      title: 'دانشگاه‌های خصوصی (Privatuniversität)',
      desc: 'برنامه‌های بین‌المللی و انگلیسی‌زبان با شهریه بالاتر و کلاس‌های کوچک‌تر.',
      points: ['پذیرش منعطف‌تر', 'تمرکز بر مدیریت و هنر', 'بورسیه‌های اختصاصی محدود'],
      badge: 'بین‌المللی',
    },
  ];

  const timeline = [
    { age: '۶ تا ۱۰ سالگی', title: 'دوره ابتدایی (Volksschule)', time: '۴ سال' },
    { age: '۱۰ تا ۱۴ سالگی', title: 'متوسطه اول (Mittelschule / AHS Unterstufe)', time: '۴ سال' },
    { age: '۱۴ تا ۱۸/۱۹ سالگی', title: 'متوسطه دوم (AHS، BHS، BMS یا کارآموزی Lehre)', time: '۴ تا ۵ سال' },
    { age: '۱۸ سال به بالا', title: 'آموزش عالی (Universität / Fachhochschule)', time: '۳ تا ۸ سال' },
  ];

  const costs = [
    { label: 'شهریه دانشگاه دولتی — اتحادیه اروپا', value: 'تقریباً ۰ یورو' },
    { label: 'هزینه عضویت اتحادیه دانشجویان (ÖH)', value: 'حدود ۲۵ یورو / ترم' },
    { label: 'شهریه دانشگاه دولتی — خارج از اتحادیه اروپا', value: 'حدود ۷۲۶ یورو / ترم' },
    { label: 'شهریه دانشگاه‌های خصوصی', value: 'تقریبی ۶٬۰۰۰ تا ۱۵٬۰۰۰ یورو / سال' },
    { label: 'هزینه زندگی ماهانه (مسکن، خوراک، بیمه)', value: 'حدود ۹۵۰ تا ۱٬۲۰۰ یورو' },
  ];

  const scholarships = [
    { name: 'بورسیه Ernst Mach', by: 'OeAD — ویژه دانشجویان بین‌المللی' },
    { name: 'بورسیه Franz Werfel', by: 'برای پژوهشگران و مدرسان زبان آلمانی' },
    { name: 'بورسیه Richard Plaschka', by: 'برای دوره‌های کوتاه‌مدت پژوهشی' },
    { name: 'بورسیه‌های دانشگاهی', by: 'اختصاصی هر دانشگاه برای دانشجویان ممتاز' },
  ];

  return (
    <section
      dir="rtl"
      lang="fa"
      aria-labelledby="austria-edu-title"
      itemScope
      itemType="https://schema.org/Article"
      className="relative overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 p-6 text-right space-y-6 shadow-sm transition-shadow duration-500 hover:shadow-xl"
    >
      {/* هاله‌های تزئینی پس‌زمینه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-rose-200/50 via-red-100/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-stone-200/60 to-transparent blur-3xl"
      />

      {/* انیمیشن‌های سبک */}
      <style>{`
        @keyframes atShimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
        .at-shimmer { position: relative; overflow: hidden; }
        .at-shimmer::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(225,29,72,.28), transparent);
          animation: atShimmer 3s ease-in-out infinite;
        }
        @keyframes atFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .at-float { animation: atFloat 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .at-shimmer::after, .at-float { animation: none; }
        }
      `}</style>

      {/* ================= هدر ================= */}
      <header className="relative flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="flex items-center gap-3">
          <span className="at-float shrink-0 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-stone-200 transition-transform duration-500 hover:scale-110 hover:rotate-3">
            <AustriaEmblem className="h-12 w-12" />
          </span>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[10px] font-black text-rose-800 ring-1 ring-rose-100">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-600" />
              راهنمای جامع تحصیل در اتریش
            </span>
            <h2
              id="austria-edu-title"
              itemProp="headline"
              className="mt-2 text-xl font-black tracking-tight text-stone-900"
            >
              سیستم آموزشی اتریش
            </h2>
          </div>
        </div>

        <span className="at-shimmer rounded-full bg-gradient-to-l from-rose-700 to-rose-500 px-4 py-2 text-[10px] font-black text-white shadow-md shadow-rose-200">
          🇦🇹 مقصد محبوب دانشجویان ایرانی
        </span>
      </header>

      {/* ================= معرفی ================= */}
      <p itemProp="description" className="relative text-xs font-bold leading-relaxed text-stone-700">
        سیستم آموزشی اتریش یکی از باکیفیت‌ترین سیستم‌های آموزشی در اروپا است که بر ترکیب
        <strong className="mx-1 text-rose-800">دانش نظری</strong>
        و
        <strong className="mx-1 text-rose-800">مهارت‌های کاربردی</strong>
        تمرکز دارد و مسیرهای متنوعی برای ورود به دانشگاه، بازار کار و پژوهش پیش پای دانشجویان می‌گذارد.
      </p>

      {/* ================= آمار کلیدی ================= */}
      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { n: '۹ سال', t: 'آموزش اجباری' },
          { n: '۲۲+', t: 'دانشگاه دولتی' },
          { n: '۲۱', t: 'دانشگاه علوم کاربردی' },
          { n: '۷۲۶ €', t: 'شهریه هر ترم' },
        ].map((s) => (
          <div
            key={s.t}
            className="rounded-2xl border border-stone-200 bg-white/80 p-3 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-md"
          >
            <div className="text-base font-black text-rose-800">{s.n}</div>
            <div className="mt-1 text-[10px] font-bold text-stone-500">{s.t}</div>
          </div>
        ))}
      </div>

      {/* ================= ۱. ساختار کلی ================= */}
      <section aria-labelledby="at-structure" className="relative space-y-4">
        <h3 id="at-structure" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۱</span>
          ساختار کلی نظام آموزشی
        </h3>

        <p className="text-xs font-bold leading-relaxed text-stone-700">
          آموزش اجباری در اتریش <strong className="text-stone-900">۹ سال</strong> است و پس از آن دانش‌آموز
          می‌تواند مسیر دانشگاهی یا فنی‌وحرفه‌ای را انتخاب کند:
        </p>

        <ol className="relative space-y-4 border-r-2 border-dashed border-rose-200 pr-5">
          {timeline.map((step) => (
            <li key={step.title} className="group relative">
              <span className="absolute right-[-26px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-rose-500 shadow ring-1 ring-rose-200 transition-transform duration-300 group-hover:scale-125" />
              <div className="rounded-xl border border-transparent p-2 transition-colors duration-300 group-hover:border-rose-100 group-hover:bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-black text-stone-900">{step.title}</h4>
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-black text-stone-600">
                    {step.time}
                  </span>
                </div>
                <p className="mt-1 text-[10px] font-bold text-stone-500">{step.age}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: 'AHS', d: 'دبیرستان عمومی ۴ ساله، پایان آن دیپلم Matura و مسیر مستقیم دانشگاه.' },
            { t: 'BHS', d: 'مدارس فنی‌وحرفه‌ای ۵ ساله (HTL، HAK، HLW) با دیپلم + مهارت تخصصی.' },
            { t: 'Lehre', d: 'نظام کارآموزی دوگانه: آموزش همزمان در مدرسه و محیط کار واقعی.' },
          ].map((i) => (
            <Card key={i.t}>
              <div className="mb-2 inline-flex rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-black text-rose-800 ring-1 ring-rose-100">
                {i.t}
              </div>
              <p className="text-[11px] font-bold leading-relaxed text-stone-600">{i.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= ۲. آموزش عالی ================= */}
      <section aria-labelledby="at-higher" className="relative space-y-4">
        <h3 id="at-higher" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۲</span>
          آموزش عالی و انواع دانشگاه‌ها
        </h3>

        <div className="grid gap-3 sm:grid-cols-3">
          {higherEducation.map((p) => {
            const isActive = activeProgram === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveProgram(p.id)}
                aria-pressed={isActive}
                className={`group rounded-2xl border bg-white p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100/70 ${
                  isActive
                    ? 'border-rose-300 ring-2 ring-rose-400/70 scale-[1.02]'
                    : 'border-stone-200 hover:border-rose-200'
                }`}
              >
                <span className="mb-2 inline-flex rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-black text-rose-800 ring-1 ring-rose-100">
                  {p.badge}
                </span>
                <h4 className="text-xs font-black text-stone-900">{p.title}</h4>
                <p className="mt-2 text-[11px] font-bold leading-relaxed text-stone-600">{p.desc}</p>
                <ul className="mt-3 space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-1.5 text-[10px] font-bold text-stone-500">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-rose-500" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= ۳. پذیرش ================= */}
      <section aria-labelledby="at-admission" className="relative space-y-4">
        <h3 id="at-admission" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۳</span>
          نحوه پذیرش و مدارک لازم
        </h3>

        <Card>
          <p className="text-xs font-bold leading-relaxed text-stone-700">
            پذیرش دانشجو بر اساس مدارک تحصیلی قبلی، معدل و تسلط به زبان (معمولاً آلمانی و در برخی دوره‌ها انگلیسی)
            انجام می‌شود. برای بسیاری از رشته‌ها، ارائه مدرک زبان
            <strong className="mx-1 text-rose-800">ÖSD</strong>
            یا
            <strong className="mx-1 text-rose-800">TestDaF</strong>
            الزامی است.
          </p>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              'مدرک دیپلم و ریزنمرات با ترجمه رسمی',
              'مدرک زبان آلمانی B2/C1 یا انگلیسی IELTS/TOEFL',
              'انگیزه‌نامه (Motivationsschreiben)',
              'توصیه‌نامه استاد یا کارفرما',
              'پاسپورت معتبر و مدارک هویتی',
              'مهلت: ۵ سپتامبر (زمستانی) / ۵ فوریه (تابستانی)',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50/70 px-3 py-2 text-[11px] font-bold text-stone-600 transition-colors duration-300 hover:border-rose-200 hover:bg-rose-50/50"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 fill-rose-600" aria-hidden="true">
                  <path d="M8.1 14.3 4.4 10.6l1.4-1.4 2.3 2.3 6-6 1.4 1.4z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ================= ۴. هزینه‌ها ================= */}
      <section aria-labelledby="at-costs" className="relative space-y-4">
        <h3 id="at-costs" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۴</span>
          هزینه‌ها و بورسیه‌ها
        </h3>

        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-right text-[11px]">
            <caption className="sr-only">جدول هزینه‌های تحصیل و زندگی در اتریش</caption>
            <tbody>
              {costs.map((row, idx) => (
                <tr
                  key={row.label}
                  className={`border-b border-stone-100 transition-colors duration-300 last:border-0 hover:bg-rose-50/50 ${
                    idx % 2 === 1 ? 'bg-stone-50/60' : ''
                  }`}
                >
                  <th scope="row" className="px-4 py-3 font-bold text-stone-600">{row.label}</th>
                  <td className="px-4 py-3 font-black text-rose-800">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {scholarships.map((s) => (
            <Card key={s.name} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z" />
                </svg>
              </span>
              <div>
                <h4 className="text-[11px] font-black text-stone-900">{s.name}</h4>
                <p className="mt-1 text-[10px] font-bold text-stone-500">{s.by}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= ۵. پرسش‌های متداول ================= */}
      <section aria-labelledby="at-faq" className="relative space-y-3">
        <h3 id="at-faq" className="flex items-center gap-2 text-sm font-black text-rose-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-100 text-[11px] text-rose-800">۵</span>
          پرسش‌های متداول
        </h3>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 open:border-rose-200 open:bg-rose-50/40 hover:border-rose-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11px] font-black text-stone-800 marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-800 transition-transform duration-300 group-open:rotate-45">
                  <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current" aria-hidden="true">
                    <path d="M9 5h2v4h4v2h-4v4H9v-4H5V9h4z" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[11px] font-bold leading-relaxed text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= فوتر ================= */}
      <footer className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-100 bg-gradient-to-l from-rose-50 to-white p-4">
        <p className="text-[10px] font-bold text-stone-600">
          اطلاعات این راهنما جنبه‌ی عمومی دارد؛ شرایط دقیق هر دانشگاه را از وب‌سایت رسمی آن پیگیری کنید.
        </p>
        <a
          href="https://www.studyinginaustria.at/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-l from-rose-700 to-rose-500 px-4 py-2 text-[10px] font-black text-white shadow-md shadow-rose-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          مرجع رسمی تحصیل در اتریش
          <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current rotate-180" aria-hidden="true">
            <path d="M9 3h8v8h-2V6.4l-8.3 8.3-1.4-1.4L13.6 5H9z" />
          </svg>
        </a>
      </footer>

      {/* داده ساختاریافته برای موتورهای جستجو */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}