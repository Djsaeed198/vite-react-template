import React from 'react';
import SEO from './SEO';

const RealEstateTaxCalculator: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="محاسبه‌گر مالیات و هزینه‌های خرید ملک" description="ماشین‌حساب هزینه‌های جانبی و مالیات انتقال ملک در اتریش" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">محاسبه‌گر مالیات ملک</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                ماشین‌حساب هزینه‌های ثبت و مالیات خرید ملک در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default RealEstateTaxCalculator;
