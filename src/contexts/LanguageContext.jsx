import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  
  // Accessibility state
  const [fontSize, setFontSize] = useState('normal'); // normal, large, xlarge

  useEffect(() => {
    document.body.className = '';
    if (fontSize === 'large') document.body.classList.add('font-large');
    if (fontSize === 'xlarge') document.body.classList.add('font-xlarge');
    if (theme === 'dark') document.body.classList.add('dark-theme');
  }, [fontSize, theme]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontSize, setFontSize, theme, setTheme }}>
      {children}
    </LanguageContext.Provider>
  );
};
