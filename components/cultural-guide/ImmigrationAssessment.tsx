import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Target,
  Layers,
  ArrowRightLeft,
  Compass,
  CheckCircle2,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import VisaSuitabilityWizard from "./VisaSuitabilityWizard";
import SmartAlternativeVisaRecommender from "./SmartAlternativeVisaRecommender";
import SEO from "./SEO";

/**
 * ImmigrationAssessment Component
 * پلتفرم جامع ارزیابی هوشمند شانس مهاجرت و موتور پیشنهاد ویزاهای جایگزین اتریش
 */
const ImmigrationAssessment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"wizard" | "recommender">("wizard");

  return (
    <div className="min-h-screen bg-stone-100/60 pb-16 font-sans text-stone-900" dir="rtl">
      <SEO
        title="ارزیابی هوشمند شانس اقامت اتریش ۲۰۲۵ | موتور پیشنهاد ویزاهای جایگزین | اتریش‌نشین"
        description="سامانه هوشمند ارزیابی شانس اخذ ویزا و اقامت اتریش (RWR کارت نخبگان، مشاغل کمیاب، بلوکارت اروپا، ویزای تحصیلی و تمکن مالی) همراه با موتور پیشنهاد ویزاهای جایگزین بر اساس امتیازات متقاضی."
        keywords="ارزیابی اقامت اتریش, شانس ویزا اتریش, ویزای جایگزین, RWR کارت, کارت قرمز سفید قرمز, بلوکارت اتریش, ویزای جستجوی کار اتریش, تمکن مالی اتریش, مهاجرت اتریش"
      />

      {/* Top Switcher Navigation Bar */}
      <div className="bg-white/95 rounded-2xl border border-stone-200/90 shadow-xs mb-6">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#c8102e] to-[#970d22] flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xs md:text-sm font-black text-stone-900">
                سامانه هوشمند ارزیابی شانس اقامت و ویزاهای جایگزین اتریش
              </h1>
              <div className="text-[10px] text-stone-500 font-bold hidden sm:block">
                تحلیل ۱۵ فاکتور قانونی و استخراج مناسب‌ترین پلان B مهاجرتی
              </div>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              onClick={() => setActiveTab("wizard")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "wizard"
                  ? "bg-white text-stone-950 shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#c8102e]" />
              <span>آزمون ۶ مرحله‌ای</span>
            </button>

            <button
              onClick={() => setActiveTab("recommender")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === "recommender"
                  ? "bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>موتور پیشنهاد ویزاهای جایگزین</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono">
                هوشمند
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        {activeTab === "wizard" ? (
          <div>
            <VisaSuitabilityWizard
              onSwitchToAlternativeRecommender={() => setActiveTab("recommender")}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Context breadcrumb & banner */}
            <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 font-bold">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  در این بخش می‌توانید امتیازات و شرایط خود را به صورت زنده تغییر دهید و فوراً ببینید کدام ویزاهای جایگزین اتریش برای شما فعال می‌شوند.
                </span>
              </div>
              <button
                onClick={() => setActiveTab("wizard")}
                className="text-stone-700 hover:text-[#c8102e] font-black underline shrink-0 mr-2 text-[11px]"
              >
                انجام آزمون کامل ۶ مرحله‌ای ←
              </button>
            </div>

            <SmartAlternativeVisaRecommender
              onRetest={() => setActiveTab("wizard")}
              isEmbeddedInResults={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImmigrationAssessment;
