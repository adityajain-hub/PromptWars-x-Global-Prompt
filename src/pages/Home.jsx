import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceInput from '../components/VoiceInput';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/chat', { state: { initialQuery: searchQuery } });
    }
  };

  const features = [
    { icon: '🏛️', title: t('home.services'), desc: t('home.servicesDesc'), link: '/services', color: 'saffron' },
    { icon: '📢', title: t('home.report'), desc: t('home.reportDesc'), link: '/report', color: 'blue' },
    { icon: '📄', title: 'Document Assistant', desc: 'Get AI-powered help with documents and forms.', link: '/services', color: 'purple' },
    { icon: '🌱', title: t('home.schemes'), desc: t('home.schemesDesc'), link: '/schemes', color: 'green' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ 
              display: 'inline-block', 
              padding: '6px 16px', 
              background: 'var(--accent-saffron-glow)', 
              border: '1px solid rgba(255,153,51,0.2)', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.85rem', 
              color: 'var(--accent-saffron)',
              fontWeight: 600
            }}>
              🇮🇳 AI-Powered Civic Companion
            </span>
          </div>
          
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            letterSpacing: '-0.04em', 
            lineHeight: 1.15,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #F1F5F9, #FF9933)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('hero.welcome')}
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
            Simplifying government services, reporting issues, and finding welfare schemes — all powered by AI.
          </p>

          {/* Search Bar */}
          <div className="search-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--accent-saffron)', fontWeight: 700 }}>✨</span>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t('hero.askAI')}</span>
            </div>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
              />
              <VoiceInput onTranscript={(text) => setSearchQuery(prev => prev ? prev + ' ' + text : text)} />
              <button type="submit" className="btn btn-accent" style={{ padding: '14px 28px', borderRadius: 'var(--radius-full)' }}>
                {t('hero.searchBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container" style={{ padding: '60px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {features.map((feat, i) => (
            <Link to={feat.link} key={i} style={{ textDecoration: 'none' }}>
              <div className={`feature-card ${feat.color}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`feature-icon ${feat.color}`}>{feat.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>{feat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div style={{ padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span style={{ 
            display: 'inline-block', padding: '6px 16px', 
            background: 'var(--accent-green-glow)', 
            border: '1px solid rgba(16,185,129,0.2)', 
            borderRadius: 'var(--radius-full)', 
            fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600,
            marginBottom: '12px'
          }}>
            📊 {t('home.impact')}
          </span>
          
          <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '40px' }}>
            Making a Real Difference
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--accent-blue)' }}>156</div>
              <div className="stat-label">Total Issues Reported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--accent-green)' }}>89%</div>
              <div className="stat-label">{t('home.impactResolved')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ color: 'var(--accent-saffron)' }}>3.2</div>
              <div className="stat-label">Avg Days to Resolve</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
