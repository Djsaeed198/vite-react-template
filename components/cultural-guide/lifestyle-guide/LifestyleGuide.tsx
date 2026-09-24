import React from 'react';
import { GuideContainer } from '../GuideContainer';
import { Euro, Users, Stethoscope, Train, TreeDeciduous } from 'lucide-react';

const categories = [
  { title: 'هزینه‌های زندگی', icon: Euro, desc: 'اجاره‌بها، مواد غذایی و قبوض.' },
  { title: 'سیستم بهداشت', icon: Stethoscope, desc: 'بیمه درمانی و پزشکان.' },
  { title: 'حمل و نقل عمومی', icon: Train, desc: 'مترو، اتوبوس و تراموا.' },
  { title: 'گردشگری و تفریح', icon: TreeDeciduous, desc: 'جاذبه‌ها و فضاهای سبز.' },
];

export const LifestyleGuide: React.FC = () => {
    return (
        <GuideContainer 
            title="راهنمای سبک زندگی در اتریش" 
            description="همه آنچه برای زندگی راحت و باکیفیت نیاز دارید"
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                        <cat.icon size={32} className="mx-auto mb-4 text-emerald-600" />
                        <h3 className="font-bold mb-2">{cat.title}</h3>
                        <p className="text-stone-600 text-sm">{cat.desc}</p>
                    </div>
                ))}
            </div>
            {/* Additional content could go here */}
        </GuideContainer>
    );
};
