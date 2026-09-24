import React from 'react';
import SEO from './SEO';

const AccountingCareerGuide: React.FC = () => {
    return (
        <div className="min-h-screen bg-stone-50 pb-20 font-sans" dir="rtl">
            <SEO 
                title="راهنمای شغلی حسابداری و دفترداری در اتریش" 
                description="مسیر ورود به بازار کار حسابداری، مدارک مورد نیاز (Buchhaltung)، و آزمون‌های معتبر در اتریش" 
            />

            {/* هدر بالایی با تم اتریش‌نشین */}
            <div className="bg-[#b91c1c] text-white pt-6 pb-12 px-4 rounded-b-3xl shadow-lg relative overflow-hidden">
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <span className="bg-white/25 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                            💼 بازار کار و مشاغل تخصصی
                        </span>
                        <h1 className="text-2xl font-black mt-2 tracking-tight">راهنمای شغلی حسابداری در اتریش</h1>
                        <p className="text-red-100 text-xs mt-1">مسیر حرفه‌ای، مدارک معتبر (Buchhalter/Bilanzbuchhalter) و فرصت‌های درآمدی</p>
                    </div>
                    <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/20">
                        📊
                    </div>
                </div>
            </div>

            {/* بدنه اصلی محتوا */}
            <div className="max-w-4xl mx-auto px-4 -mt-6 space-y-4">
                
                {/* کارت وضعیت و خلاصه سریع */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg font-bold">
                            💡
                        </div>
                        <div>
                            <h3 className="text-stone-800 font-bold text-sm">وضعیت بازار کار</h3>
                            <p className="text-stone-500 text-xs">تقاضای بالا برای حسابداران مسلط به قوانین مالیاتی اتریش (Österreichische Steuern)</p>
                        </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                        موقعیت عالی
                    </span>
                </div>

                {/* بخش مسیرهای کلیدی (مانند گرید خدمات در تصویر) */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-200/80">
                    <h2 className="text-stone-900 font-extrabold text-sm mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#b91c1c]"></span>
                        مراحل اصلی ورود به حرفه حسابداری
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 hover:border-red-200 transition-all">
                            <div className="text-xl mb-2">📜</div>
                            <h4 className="font-bold text-stone-800 text-xs mb-1">معادل‌سازی مدارک</h4>
                            <p className="text-stone-500 text-[11px] leading-relaxed">بررسی و ارزشیابی مدارک تحصیلی دانشگاهی یا فنی‌حرفه‌ای در مراکز تخصصی اتریش.</p>
                        </div>

                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 hover:border-red-200 transition-all">
                            <div className="text-xl mb-2">🎓</div>
                            <h4 className="font-bold text-stone-800 text-xs mb-1">دوره‌های WIFI یا BFI</h4>
                            <p className="text-stone-500 text-[11px] leading-relaxed">گذراندن دوره‌های تخصصی Buchhaltung و Bilanzbuchhaltung با گواهینامه معتبر رسمی.</p>
                        </div>

                        <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 hover:border-red-200 transition-all">
                            <div className="text-xl mb-2">🗣️</div>
                            <h4 className="font-bold text-stone-800 text-xs mb-1">تسلط به زبان آلمانی</h4>
                            <p className="text-stone-500 text-[11px] leading-relaxed">نیاز به مدرک زبان حداقل سطح B2 برای درک اصطلاحات حقوقی، مالیاتی و نامه‌نگاری تجاری.</p>
                        </div>
                    </div>
                </div>

                {/* باکس اطلاعات تکمیلی و نکات حقوقی */}
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 text-white p-5 rounded-2xl shadow-md">
                    <div className="flex items-start gap-3">
                        <div className="text-2xl mt-0.5">⚖️</div>
                        <div>
                            <h3 className="font-bold text-sm mb-1 text-red-200">نکات مهم قانونی مالیات و حسابداری</h3>
                            <p className="text-stone-300 text-xs leading-relaxed">
                                در اتریش، سیستم‌های حسابداری به شدت بر پایه نرم‌کارهای رایج مانند BMD و FinanzOnline تنظیم می‌شوند. آشنایی عملی با این ابزارها شانس استخدام شما را تا حد زیادی افزایش می‌دهد.
                            </p>
                        </div>
                    </div>
                </div>

                {/* دکمه عملیاتی / بازگشت */}
                <div className="pt-2">
                    <button 
                        onClick={() => window.history.back()} 
                        className="w-full bg-[#b91c1c] hover:bg-red-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
                    >
                        <span>← بازگشت به بخش خدمات و راهنماها</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AccountingCareerGuide;