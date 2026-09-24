import React from 'react';
import SEO from './SEO';

const ChristmasMarketGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای بازارچه‌‌های کریسمس وین" description="زمان بازگشایی، بهترین بازارچه‌ها و لوکیشن‌های عکاسی بازارچه‌های کریسمس وین" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">بازارچه‌های کریسمس</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                زمان‌بندی و راهنمای بازدید از بازارچه‌های کریسمس.
            </div>
        </div>
    );
};
export default ChristmasMarketGuide;
