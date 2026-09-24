import React from 'react';
import SEO from './SEO';

const MoneyLaunderingInfo: React.FC = () => {
    return (
        <div className="p-6">
            <SEO title="قوانین ضد پولشویی در اتریش" description="راهنمای اثبات منشا اموال و قوانین ضدپولشویی برای نقل‌وانتقال سرمایه" />
            <h2 className="text-2xl font-black text-stone-900 mb-6">قوانین ضدپولشویی</h2>
            <div className="bg-stone-100 p-4 rounded-xl text-stone-600 text-sm">
                توضیح قوانین مربوط به اثبات منشا سرمایه و نقل‌وانتقالات بانکی.
            </div>
        </div>
    );
};
export default MoneyLaunderingInfo;
