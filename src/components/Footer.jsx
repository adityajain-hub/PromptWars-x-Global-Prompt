import React from 'react';
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
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Feedback</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>{t('footer.emergency')}</h4>
            <div className="emergency-numbers">
              <span className="emergency-pill">112 (All in one)</span>
              <span className="emergency-pill">100 (Police)</span>
              <span className="emergency-pill">108 (Ambulance)</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Government Portals</h4>
            <ul>
              <li><a href="#">Digital India</a></li>
              <li><a href="#">MyGov.in</a></li>
              <li><a href="#">Smart Cities Mission</a></li>
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
