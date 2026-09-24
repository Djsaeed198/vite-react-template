import React from 'react';

interface GuideContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const GuideContainer: React.FC<GuideContainerProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-3">
          {title}
        </h1>
        {description && <p className="text-lg text-stone-600">{description}</p>}
      </header>
      <main className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
};
