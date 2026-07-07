import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  // Accessibility state
  const [fontSize, setFontSize] = useState('normal'); // normal, large, xlarge

  useEffect(() => {
    document.body.className = '';
    if (fontSize === 'large') document.body.classList.add('font-large');
    if (fontSize === 'xlarge') document.body.classList.add('font-xlarge');
  }, [fontSize]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, fontSize, setFontSize }}>
      {children}
    </LanguageContext.Provider>
  );
};
