import React from 'react';
import SEO from './SEO';

const ExpertProfile: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="مشاوران و کارشناسان اتریش‌نشین" description="معرفی و سوابق حقوقی کارشناسان و وکلای ناظر بر مقالات اتریش‌نشین" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">تیم کارشناسان و ناظران</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                نمایش پروفایل expertها و تاییدیه مقالات در اینجا.
            </div>
        </div>
    );
};
export default ExpertProfile;
