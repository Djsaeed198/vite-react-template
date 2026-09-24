import React from 'react';
import { GuideContainer } from '../GuideContainer';
import { Sparkles, History, Users, Calendar } from 'lucide-react';

const culturalTopics = [
  { title: 'آداب معاشرت', icon: Users, desc: 'سلام و احوال‌پرسی، حریم خصوصی.' },
  { title: 'تاریخچه', icon: History, desc: 'نگاهی کوتاه به تاریخ اتریش.' },
  { title: 'تعطیلات و رویدادها', icon: Calendar, desc: 'جشن‌ها و تعطیلات رسمی.' },
  { title: 'ارزش‌های اجتماعی', icon: Sparkles, desc: 'احترام، وقت‌شناسی، نظم.' },
];

export const CulturalGuide: React.FC = () => {
    return (
        <GuideContainer 
            title="فرهنگ و آداب اجتماعی در اتریش" 
            description="آشنایی با هنجارها و ویژگی‌های فرهنگی جامعه اتریش"
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {culturalTopics.map((topic, i) => (
                    <div key={i} className="p-6 bg-white border border-stone-100 rounded-2xl shadow-sm text-center">
                        <topic.icon size={32} className="mx-auto mb-4 text-emerald-600" />
                        <h3 className="font-bold mb-2">{topic.title}</h3>
                        <p className="text-stone-600 text-sm">{topic.desc}</p>
                    </div>
                ))}
            </div>
            {/* Additional content could go here */}
        </GuideContainer>
    );
};
