import React from 'react';
import SEO from './SEO';

const OfferDirectory: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="تخفیف‌ها و پیشنهادهای ویژه" description="مشاهده تخفیف‌های ویژه خدمات ایرانیان در اتریش" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">هاب تخفیف‌ها</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                لیست تخفیف‌ها و اسکیما Offer در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default OfferDirectory;
