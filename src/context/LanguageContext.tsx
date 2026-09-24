import React, { createContext, useContext, useState } from 'react';

type Language = 'fa' | 'de';

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
}>({
  language: 'fa',
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');
  const toggleLanguage = () => setLanguage(prev => prev === 'fa' ? 'de' : 'fa');
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
