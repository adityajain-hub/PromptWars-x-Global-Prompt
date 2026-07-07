import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{t('footer.about')}</h1>
      <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Smart Bharat is an AI-powered civic companion designed to bridge the gap between the government and its citizens.
        Our goal is to simplify complex government information, facilitate easy issue reporting, and help citizens discover welfare schemes they are eligible for.
      </p>
    </div>
  );
}

export function FAQ() {
  const { t } = useLanguage();
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{t('footer.faqs')}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ marginBottom: '10px' }}>How do I report an issue?</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You can go to the "Report Issue" tab, or simply ask Bharat AI on the home page to report it for you.</p>
        </div>
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
          <h3 style={{ marginBottom: '10px' }}>Is this an official government website?</h3>
          <p style={{ color: 'var(--text-secondary)' }}>No, Smart Bharat is an independent platform built to assist citizens using AI.</p>
        </div>
      </div>
    </div>
  );
}

export function Feedback() {
  const { t } = useLanguage();
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{t('footer.feedback')}</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>We would love to hear your thoughts on how to improve Smart Bharat.</p>
      <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <p>Please email us at <strong>feedback@smartbharat.example.com</strong></p>
      </div>
    </div>
  );
}

export function Privacy() {
  const { t } = useLanguage();
  return (
    <div className="container animate-fade-in" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>{t('footer.privacy')}</h1>
      <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
        Your privacy is critically important to us. All conversations with Bharat AI are temporary unless you choose to save them. 
        We do not sell your personal data to third parties. Data entered for schemes is used solely to determine eligibility.
      </p>
    </div>
  );
}
