import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import VoiceInput from '../components/VoiceInput';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to chat page with the query in state
      navigate('/chat', { state: { initialQuery: searchQuery } });
    }
  };

  const topServices = servicesData.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div style={{ background: 'var(--bg-color)', padding: '60px 0', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--primary-color)' }}>
            {t('hero.welcome')}
          </h1>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--white)', padding: '20px', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--accent-saffron)' }}>{t('hero.askAI')}</h3>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                style={{ flex: 1, padding: '15px 20px', fontSize: '1.1rem', borderRadius: '30px', border: '1px solid #ccc', outline: 'none' }}
              />
              <VoiceInput onTranscript={(text) => setSearchQuery(prev => prev ? prev + ' ' + text : text)} />
              <button type="submit" className="btn btn-primary" style={{ padding: '15px 30px', borderRadius: '30px', fontSize: '1.1rem' }}>
                {t('hero.searchBtn')}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          
          <Link to="/services">
            <div className="card" style={{ background: 'var(--card-blue)', height: '100%' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🏛️</div>
              <h3>{t('home.services')}</h3>
              <p>{t('home.servicesDesc')}</p>
            </div>
          </Link>

          <Link to="/report">
            <div className="card" style={{ background: 'var(--card-yellow)', height: '100%' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📢</div>
              <h3>{t('home.report')}</h3>
              <p>{t('home.reportDesc')}</p>
            </div>
          </Link>
          
          <Link to="/services">
            <div className="card" style={{ background: 'var(--card-green)', height: '100%' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>📄</div>
              <h3>Document Assistant</h3>
              <p>Get requirements, forms, and guidance for applications.</p>
            </div>
          </Link>

          <Link to="/schemes">
            <div className="card" style={{ background: 'var(--card-orange)', height: '100%' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌱</div>
              <h3>{t('home.schemes')}</h3>
              <p>{t('home.schemesDesc')}</p>
            </div>
          </Link>
          
        </div>
      </div>

      {/* Impact Section */}
      <div style={{ background: '#e6f4ea', padding: '60px 0', marginTop: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '30px', color: 'var(--accent-green)' }}>{t('home.impact')}</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div className="card" style={{ width: '250px' }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', margin: '0' }}>156</h1>
              <p>Total Issues Reported</p>
            </div>
            <div className="card" style={{ width: '250px' }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--accent-green)', margin: '0' }}>89%</h1>
              <p>{t('home.impactResolved')} (139)</p>
            </div>
            <div className="card" style={{ width: '250px' }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--accent-saffron)', margin: '0' }}>3.2</h1>
              <p>Avg Days to Resolve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
