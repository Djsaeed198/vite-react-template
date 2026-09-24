import React from 'react';
import SEO from './SEO';

const PensionGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای بیمه بازنشستگی اتریش" description="قوانین سنوات کاری، محاسبه سال‌های بازنشستگی و اتصال سوابق کاری در اتریش" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">راهنمای بیمه بازنشستگی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                قوانین سنوات و بازنشستگی در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default PensionGuide;
