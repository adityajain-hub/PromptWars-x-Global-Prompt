import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { language, setLanguage, t, fontSize, setFontSize, theme, setTheme } = useLanguage();
  const { isLoggedIn, userProfile, logout } = useAuth();
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
            <Logo />
            <span>SB {t('app.title')}</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>{t('nav.home')}</Link>
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>{t('nav.services')}</Link>
            <Link to="/report" className={`nav-link ${isActive('/report')}`}>{t('nav.report')}</Link>
            <Link to="/schemes" className={`nav-link ${isActive('/schemes')}`}>{t('nav.schemes')}</Link>
            
            <div className="tooltip-container" data-tooltip={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}>
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{ fontSize: '1.2rem', padding: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', border: '1px solid var(--border-color)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
            
            <select 
              className="lang-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
            
            {isLoggedIn ? (
              <div className="tooltip-container" data-tooltip="Logout">
                <button 
                  onClick={logout}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '20px', cursor: 'pointer', color: 'var(--text-primary)' }}
                >
                  <div style={{ width: '24px', height: '24px', background: 'var(--accent-saffron)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {userProfile?.name?.charAt(0) || 'U'}
                  </div>
                  <span style={{ fontSize: '0.85rem' }}>{userProfile?.name.split(' ')[0]}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '20px' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
