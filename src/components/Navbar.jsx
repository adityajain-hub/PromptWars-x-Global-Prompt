import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t, fontSize, setFontSize } = useLanguage();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <>
      <div className="accessibility-bar">
        <div className="container">
          <span>Text Size:</span>
          <button className={`a11y-btn ${fontSize === 'normal' ? 'active' : ''}`} onClick={() => setFontSize('normal')}>A</button>
          <button className={`a11y-btn ${fontSize === 'large' ? 'active' : ''}`} onClick={() => setFontSize('large')}>A+</button>
          <button className={`a11y-btn ${fontSize === 'xlarge' ? 'active' : ''}`} onClick={() => setFontSize('xlarge')}>A++</button>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            <span role="img" aria-label="India">🏛️</span> 
            {language === 'en' ? 'SB Smart Bharat' : 'स्मार्ट भारत'}
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>{t('nav.home')}</Link>
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>{t('nav.services')}</Link>
            <Link to="/report" className={`nav-link ${isActive('/report')}`}>{t('nav.report')}</Link>
            <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`}>{t('nav.schemes')}</Link>
            
            <select 
              className="lang-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            
            <div className="profile-btn">
              <div className="avatar">A</div>
              <span>Aditya Jain</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
