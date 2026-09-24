import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuideContainer } from '../GuideContainer';
import { BookOpen, Award, FileCheck, CheckCircle2, ChevronDown, ExternalLink } from 'lucide-react';

interface Visa {
  id: string;
  title: string;
  category: string;
  desc: string;
  requirements: string[];
}

const VISAS: Visa[] = [
  { id: 'work', title: 'ویزای کار', category: 'کاری', desc: 'برای متخصصین با جاب آفر رسمی.', requirements: ['تمکن مالی', 'قرارداد کاری'] },
  { id: 'study', title: 'ویزای تحصیلی', category: 'تحصیلی', desc: 'برای دانشجویان دانشگاهی.', requirements: ['نامه پذیرش', 'گردش حساب'] },
];

export const MigrationGuide: React.FC = () => {
  const [selectedVisa, setSelectedVisa] = useState<Visa | null>(null);

  return (
    <GuideContainer 
        title="راهنمای جامع مهاجرت به اتریش" 
        description="انتخاب مسیر مناسب بر اساس شرایط شخصی و حرفه‌ای"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {VISAS.map(visa => (
          <motion.button
            key={visa.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedVisa(visa)}
            className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm text-right hover:border-emerald-200 transition-colors"
          >
            <h3 className="font-bold text-lg mb-2">{visa.title}</h3>
            <p className="text-stone-600 text-sm mb-4">{visa.desc}</p>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">{visa.category}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedVisa && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-8 bg-stone-50 rounded-2xl border border-stone-200"
          >
            <h3 className="text-xl font-bold mb-4">{selectedVisa.title}</h3>
            <p className="text-stone-700 leading-relaxed mb-6">{selectedVisa.desc}</p>
            <h4 className="font-bold mb-3 flex items-center gap-2"><FileCheck size={18} /> مدارک مورد نیاز:</h4>
            <ul className="space-y-2">
              {selectedVisa.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2 text-stone-600"><CheckCircle2 size={16} className="text-emerald-500" /> {req}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </GuideContainer>
  );
};
