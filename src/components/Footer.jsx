import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>{t('footer.links')}</h4>
            <ul>
              <li><Link to="/about">{t('footer.about')}</Link></li>
              <li><Link to="/faq">{t('footer.faqs')}</Link></li>
              <li><Link to="/feedback">{t('footer.feedback')}</Link></li>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.emergency')}</h4>
            <div className="emergency-numbers">
              <a href="tel:112" className="emergency-pill" style={{ textDecoration: 'none' }}>112 (All in one)</a>
              <a href="tel:100" className="emergency-pill" style={{ textDecoration: 'none' }}>100 (Police)</a>
              <a href="tel:108" className="emergency-pill" style={{ textDecoration: 'none' }}>108 (Ambulance)</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.portals')}</h4>
            <ul>
              <li><a href="https://www.digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">Digital India</a></li>
              <li><a href="https://www.mygov.in/" target="_blank" rel="noopener noreferrer">MyGov.in</a></li>
              <li><a href="https://smartcities.gov.in/" target="_blank" rel="noopener noreferrer">Smart Cities Mission</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Smart Bharat - Civic Companion.</p>
        </div>
      </div>
    </footer>
  );
}
