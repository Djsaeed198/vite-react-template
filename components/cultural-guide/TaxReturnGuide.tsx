import React from 'react';
import SEO from './SEO';

const TaxReturnGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای اظهارنامه مالیاتی (Arbeitnehmerveranlagung)" description="آموزش گام‌به‌گام پس گرفتن مالیات‌های پرداختی اضافه از طریق سیستم FinanzOnline" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">راهنمای اظهارنامه مالیاتی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                مراحل دریافت مبالغ اضافه از اداره مالیات در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default TaxReturnGuide;
