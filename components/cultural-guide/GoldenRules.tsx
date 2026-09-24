import React, { useState } from "react";
import { Scale, Coffee, ShieldAlert, Home, AlertCircle, ChevronDown, CheckCircle2 } from "lucide-react";

interface GoldenRule {
  id: string;
  category: "work" | "apartment" | "security";
  title: string;
  doText: string;
  dontText: string;
  explanationFarsi: string;
  icon: any;
}

const GOLDEN_RULES_DATA: GoldenRule[] = [
  {
    id: "r1",
    category: "work",
    title: "تعطیلی مطلق مغازه‌ها و فروشگاه‌ها در روزهای یکشنبه (Sonntagsruhe)",
    doText: "خریدهای غذایی کل هفته را تا قبل از ساعت ۶ عصر شنبه نهایی کنید.",
    dontText: "به هیچ وجه روز یکشنبه منتظر باز بودن فروشگاه‌های Spar، Billa یا فروشگاه‌های پوشاک بومی نباشید.",
    explanationFarsi: "قوانین حمایت صنفی اتریش روز یکشنبه را برای کلیه کارگران تعطیل مقدس به حساب می‌آورد. تنها سوپرمارکت‌های مستقر در ایستگاه‌های راه‌آهن مرکزی بزرگ (مانند Billa Praterstern در وین) استثنائاً باز اما به شدت شلوغ هستند.",
    icon: Coffee
  },
  {
    id: "r2",
    category: "apartment",
    title: "قوانین فوق‌العاده سخت‌گیرانه ساعات سکوت خانگی (Ruhezeit)",
    doText: "ساعات آرام آرام شبانه (ساعت ۲۲ الی ۶ صبح) و ساعات ظهرگاهی استراحت را به شدت مراعات کنید.",
    dontText: "از انجام هرگونه فعالیت پرصدا مانند روشن کردن لباسشویی قدیمی یا جاروبرقی در روزهای یکشنبه و تعطیل رسمی اجتناب کنید.",
    explanationFarsi: "قوانین آپارتمان‌نشینی اتریشی‌ها روی مقوله صدا بسیار حائل است. در صورت شنیده شدن صداهای کوبشی مکرر در روزهای تعطیل، همسایه‌ها سریعاً با پلیس محلی تماس گرفته و جریمه‌های اداری سنگینی را به همراه می‌آورد.",
    icon: Home
  },
  {
    id: "r3",
    category: "security",
    title: "فرهنگ سنتی کافه‌نشینی وین (Kaffeehauskultur)",
    doText: "یک فنجان قهوه Wiener Melange سفارش دهید و با آرامش ساعت‌ها به مطالعه روزنامه بپردازید.",
    dontText: "به محض خوردن آخرین جرعه قهوه، برای پرداخت عجله نکنید یا گارسون را مکرراً صدا نزنید.",
    explanationFarsi: "کافه‌های سنتی وین جزو میراث معنوی ثبت شده یونسکو هستند. گارسون‌ها مایلند شما ساعت‌ها با یک فنجان قهوه روی مبل‌های کلاسیک استراحت کنید و این عمل کاملاً مرسوم و نشانه اصالت است.",
    icon: ShieldAlert
  }
];

export default function GoldenRules() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("r1");

  const filtered = GOLDEN_RULES_DATA.filter((r) => {
    if (activeCategory !== "all" && r.category !== activeCategory) return false;
    return true;
  });

  return (
    <div id="golden-rules-module" className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm overflow-hidden relative text-right font-sans">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-red-600 via-white to-red-600"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-stone-100 pb-5 text-right w-full">
        <div>
          <div className="flex items-center gap-2 mb-1 justify-end sm:justify-start">
            <span className="text-xs font-black bg-rose-50 text-red-700 px-2 py-0.5 rounded-md border border-rose-100">فرهنگ و قوانین نانوشته اتریش</span>
            <Scale className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-extrabold text-stone-850 text-lg">قوانین طلایی زندگی در اتریش (Dos & Don'ts)</h3>
          <p className="text-xs text-stone-400 font-bold mt-1">پیشگیری از شوک فرهنگی، جریمه‌های همسایگی و تفاهم با جامعه اتریشی</p>
        </div>

        {/* Categories filters */}
        <div className="flex gap-1.5 bg-stone-100 border border-stone-200 rounded-xl p-0.5 self-start">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-xs px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
              activeCategory === "all" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"
            }`}
          >
            همه موارد
          </button>
          <button
            onClick={() => setActiveCategory("work")}
            className={`text-xs px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
              activeCategory === "work" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"
            }`}
          >
            ☕ فرهنگ کار کافه
          </button>
          <button
            onClick={() => setActiveCategory("apartment")}
            className={`text-xs px-3 py-1.5 rounded-lg font-black transition-all cursor-pointer ${
              activeCategory === "apartment" ? "bg-white text-stone-800 shadow-xs" : "text-stone-500 hover:text-stone-800"
            }`}
          >
            🏡 همسایگی سکوت
          </button>
        </div>
      </div>

      {/* Rules list */}
      <div className="space-y-4 text-right font-medium">
        {filtered.map((rule) => {
          const isExpanded = expandedId === rule.id;
          const IconComponent = rule.icon;
          return (
            <div
              key={rule.id}
              className={`border rounded-2xl overflow-hidden transition-all ${
                isExpanded ? "bg-stone-50/50 border-red-300 shadow-xs" : "bg-white border-stone-200"
              }`}
            >
              {/* Rule Summary Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : rule.id)}
                className="p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/20"
              >
                <div className="p-2.5 rounded-xl bg-red-50 text-red-650 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1 text-right">
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                    rule.category === "work" ? "bg-amber-100 text-amber-800" : "bg-blue-50 text-blue-800"
                  }`}>
                    {rule.category === "work" ? "آداب شهری خرید" : "ساعت قانونی سکوت"}
                  </span>
                  <h4 className="font-extrabold text-xs sm:text-sm text-stone-850 mt-1">{rule.title}</h4>
                </div>

                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </div>

              {/* Expansion block */}
              {isExpanded && (
                <div className="p-5 border-t border-stone-150 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DO - سبز رنگ */}
                    <div className="bg-emerald-50/50 border border-emerald-150 p-4 rounded-xl space-y-2 text-right">
                      <div className="flex items-center gap-1.5 justify-end text-emerald-800 font-extrabold text-xs">
                        <span>انجام این کار الزامی است (Dos)</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] text-stone-650 leading-relaxed font-bold">
                        {rule.doText}
                      </p>
                    </div>

                    {/* DONT - سرخ رنگ */}
                    <div className="bg-rose-50/50 border border-rose-150 p-4 rounded-xl space-y-2 text-right">
                      <div className="flex items-center gap-1.5 justify-end text-rose-800 font-extrabold text-xs">
                        <span>پرهیز جدی از این اقدام (Don'ts)</span>
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] text-stone-650 leading-relaxed font-bold">
                        {rule.dontText}
                      </p>
                    </div>
                  </div>

                  {/* Detailed explanation */}
                  <div className="p-4 bg-white border border-stone-150 rounded-xl space-y-1 text-right">
                    <span className="text-[10px] bg-stone-900 text-white font-extrabold px-2 py-0.5 rounded inline-block">توضیح مقتضی:</span>
                    <p className="text-xs text-stone-500 leading-relaxed font-bold">
                      {rule.explanationFarsi}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
