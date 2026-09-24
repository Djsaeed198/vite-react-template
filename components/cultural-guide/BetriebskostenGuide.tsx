import React, { useEffect, useState, useRef } from 'react';
import SEO from './SEO';

const BetriebskostenGuide: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [counters, setCounters] = useState({ warm: 0, cold: 0, hidden: 0 });
    const sectionRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animated counters on mount
    useEffect(() => {
        const duration = 1800;
        const start = performance.now();
        const targets = { warm: 42, cold: 28, hidden: 15 };

        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCounters({
                warm: Math.round(targets.warm * ease),
                cold: Math.round(targets.cold * ease),
                hidden: Math.round(targets.hidden * ease),
            });
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, []);

    const accordions = [
        {
            title: 'تفاوت اجاره سرد (Kaltmiete) و گرم (Warmmiete)',
            content:
                'اجاره سرد فقط هزینه پایه ملک است. اجاره گرم شامل Betriebskosten، Heizkosten و Warmwasser می‌شود. در اتریش معمولاً ۲۵ تا ۴۰ درصد اجاره سرد به هزینه‌های جانبی اضافه می‌گردد.',
        },
        {
            title: 'بررسی فاکتور سالانه شارژ (Jahresabrechnung)',
            content:
                'هر ساله موجر موظف است حداکثر تا ۳۰ ژوئن فاکتور سالانه شارژ را ارائه کند. جزئیات باید بر اساس MRG (قانون اجاره اتریش) شفاف باشد. در صورت مغایرت، حق اعتراض تا ۳ ماه وجود دارد.',
        },
        {
            title: 'هزینه‌های پنهان و قابل اعتراض',
            content:
                'اقلامی مانند هزینه تعمیرات آسانسور، نظافت راهرو و مالیات زمین (Grundsteuer) قابل شارژ هستند. اما هزینه‌های مدیریت، سود موجر و تعمیرات اساسی نباید در Betriebskosten بیایند.',
        },
        {
            title: 'حق شما به عنوان مستأجر در اتریش',
            content:
                'طبق AK Wien و MRG، می‌توانید درخواست شفاف‌سازی کنید. در صورت تخلف می‌توانید به Schlichtungsstelle (مرکز داوری) یا Arbeiterkammer شکایت کنید.',
        },
    ];

    return (
        <>
            <SEO
                title="راهنمای شارژ ساختمان (Betriebskosten) در اتریش | اجاره سرد و گرم"
                description="راهنمای کامل Betriebskosten در اتریش: تفاوت Kaltmiete و Warmmiete، بررسی Jahresabrechnung، هزینه‌های پنهان و حقوق مستأجر طبق MRG و AK Wien."
                keywords="Betriebskosten, اجاره سرد, اجاره گرم, Kaltmiete, Warmmiete, Jahresabrechnung, MRG, AK Wien, شارژ ساختمان اتریش, مستأجر اتریش"
            />

            <div className="min-h-screen bg-gradient-to-b from-stone-50 via-red-50/20 to-stone-50 relative overflow-hidden">
                {/* Decorative Austria flag watermark */}
                <div
                    className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.04] pointer-events-none"
                    style={{ transform: `translateY(${scrollY * 0.15}px)` }}
                >
                    <div className="w-full h-1/3 bg-red-600" />
                    <div className="w-full h-1/3 bg-white" />
                    <div className="w-full h-1/3 bg-red-600" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                    {/* Header with Austrian Logo */}
                    <div className="flex items-center gap-4 mb-8 animate-[fadeIn_0.6s_ease-out]">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-red-600/20 ring-2 ring-white">
                            <div className="w-full h-1/3 bg-red-600" />
                            <div className="w-full h-1/3 bg-white" />
                            <div className="w-full h-1/3 bg-red-600" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-black text-stone-800 bg-white/80 px-1 rounded">
                                    AT
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-red-700 tracking-widest uppercase">
                                Austria · Österreich
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
                                راهنمای شارژ ساختمان
                            </h2>
                        </div>
                    </div>

                    {/* Hero Intro Card */}
                    <div className="bg-white/80 backdrop-blur-sm border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-red-200 transition-all duration-500 mb-10">
                        <h3 className="text-lg font-bold text-stone-900 mb-3">
                            Betriebskosten چیست؟
                        </h3>
                        <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                            Betriebskosten یا هزینه‌های جانبی ساختمان، مبلغی است که مستأجر در اتریش
                            علاوه بر اجاره پایه پرداخت می‌کند. این هزینه‌ها شامل خدمات مشترک ساختمان،
                            نگهداری، بیمه و مالیات‌های مربوطه است. شناخت دقیق این اقلام به شما کمک می‌کند
                            از پرداخت هزینه‌های غیرقانونی جلوگیری کنید.
                        </p>
                    </div>

                    {/* Animated Stats */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
                        {[
                            { label: 'اجاره سرد', value: counters.cold, suffix: '%', color: 'from-stone-700 to-stone-900' },
                            { label: 'اجاره گرم', value: counters.warm, suffix: '%', color: 'from-red-600 to-red-800' },
                            { label: 'هزینه پنهان', value: counters.hidden, suffix: '%', color: 'from-amber-600 to-amber-800' },
                        ].map((s, i) => (
                            <div
                                key={i}
                                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${s.color} p-4 sm:p-5 text-white shadow-lg hover:scale-[1.03] transition-transform duration-300`}
                                style={{ animation: `fadeIn 0.6s ease-out ${i * 0.15}s both` }}
                            >
                                <div className="text-2xl sm:text-4xl font-black tabular-nums">
                                    {s.value}
                                    <span className="text-lg sm:text-2xl">{s.suffix}</span>
                                </div>
                                <div className="text-[11px] sm:text-xs mt-1 opacity-90 font-medium">
                                    {s.label}
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full" />
                            </div>
                        ))}
                    </div>

                    {/* Accordion Section */}
                    <div ref={sectionRef} className="space-y-3 mb-10">
                        <h3 className="text-xl font-black text-stone-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-red-600 rounded-full" />
                            نکات کلیدی و حقوق شما
                        </h3>

                        {accordions.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-500 ${
                                    activeAccordion === idx
                                        ? 'border-red-300 shadow-lg shadow-red-100'
                                        : 'border-stone-200 hover:border-red-200'
                                }`}
                                style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}
                            >
                                <button
                                    onClick={() =>
                                        setActiveAccordion(activeAccordion === idx ? null : idx)
                                    }
                                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-right hover:bg-stone-50 transition-colors"
                                >
                                    <span className="font-bold text-stone-800 text-sm sm:text-base">
                                        {item.title}
                                    </span>
                                    <span
                                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all duration-300 ${
                                            activeAccordion === idx
                                                ? 'bg-red-600 rotate-45'
                                                : 'bg-stone-400'
                                        }`}
                                    >
                                        +
                                    </span>
                                </button>
                                <div
                                    className="overflow-hidden transition-all duration-500 ease-in-out"
                                    style={{
                                        maxHeight: activeAccordion === idx ? '300px' : '0px',
                                        opacity: activeAccordion === idx ? 1 : 0,
                                    }}
                                >
                                    <p className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call To Action / Info Box */}
                    <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-6 sm:p-8 text-white overflow-hidden">
                        <div
                            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-600/20 blur-2xl"
                            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                        />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg overflow-hidden flex flex-col">
                                    <div className="flex-1 bg-red-600" />
                                    <div className="flex-1 bg-white" />
                                    <div className="flex-1 bg-red-600" />
                                </div>
                                <h4 className="font-black text-lg">آیا فاکتور شارژ شما مشکوک است؟</h4>
                            </div>
                            <p className="text-stone-300 text-sm leading-relaxed mb-4">
                                در اتریش می‌توانید به‌صورت رایگان از مشاوره{' '}
                                <span className="text-red-400 font-bold">Arbeiterkammer (AK)</span> و{' '}
                                <span className="text-red-400 font-bold">Mietervereinigung</span>{' '}
                                استفاده کنید. بررسی فاکتور سالانه حق قانونی شماست.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['MRG', 'AK Wien', 'Schlichtungsstelle', 'Mietervereinigung'].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-red-600 hover:border-red-600 transition-colors cursor-default"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inline keyframes */}
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(12px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </>
    );
};

export default BetriebskostenGuide;