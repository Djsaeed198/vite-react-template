import React from 'react';
import SEO from './SEO';

const PhishingSecurityGuide: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="راهنمای مقابله با فیشینگ در اتریش" description="روش‌های تشخیص پیامک‌ها و ایمیل‌های جعلی و حفظ امنیت حساب بانکی" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">امنیت و مقابله با فیشینگ</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                نکات ایمنی برای جلوگیری از کلاهبرداری‌های سایبری در اینجا قرار می‌گیرد.
            </div>
        </div>
    );
};
export default PhishingSecurityGuide;
