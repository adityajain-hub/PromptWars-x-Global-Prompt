import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { schemesData } from '../data/schemes';
import ChatInterface from '../components/ChatInterface';

export default function Schemes() {
  const { t } = useLanguage();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showFindForMe, setShowFindForMe] = useState(false);

  // Group schemes by category
  const categories = [...new Set(schemesData.map(s => s.category))];

  const schemeSystemInstruction = `You are Bharat AI assisting a citizen with the government scheme: ${selectedScheme?.name}.
Your goal is to explain the eligibility, benefits, and application process clearly using bullet points.`;

  const findForMeInstruction = `You are Bharat AI, a civic companion. The user's profile is: Aditya Jain, Age 18, Student, from Dungarpur, Rajasthan.
Based on this profile and the user's questions, recommend relevant government schemes (e.g., student scholarships, youth skill programs, Rajasthan state schemes). Explain why they are eligible and how to apply.`;

  return (
    <div className="container animate-fade-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1>{t('schemes.title')}</h1>
          <p>{t('schemes.subtitle')}</p>
        </div>
        <button 
          className="btn btn-accent" 
          onClick={() => { setShowFindForMe(true); setSelectedScheme(null); }}
          style={{ fontSize: '1.1rem', padding: '12px 24px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(255, 153, 51, 0.4)' }}
        >
          {t('schemes.findForMe')}
        </button>
      </div>

      {categories.map(category => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
            {category}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {schemesData.filter(s => s.category === category).map(scheme => (
              <div 
                key={scheme.id} 
                className="card"
                onClick={() => { setSelectedScheme(scheme); setShowFindForMe(false); }}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', borderLeft: '4px solid var(--accent-saffron)' }}
              >
                <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>{scheme.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', flex: 1, marginBottom: '15px' }}>{scheme.description}</p>
                <div style={{ background: 'var(--bg-color)', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <strong>Eligibility:</strong> {scheme.eligibility}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Scheme Detail / Find For Me Modal */}
      {(selectedScheme || showFindForMe) && (
        <div className="modal-overlay" onClick={() => { setSelectedScheme(null); setShowFindForMe(false); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ height: '85vh', display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>
            <button className="modal-close" onClick={() => { setSelectedScheme(null); setShowFindForMe(false); }}>×</button>
            
            {selectedScheme ? (
              <>
                <h2 style={{ margin: '0 0 10px 0', color: 'var(--primary-color)' }}>{selectedScheme.name}</h2>
                <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>{selectedScheme.description}</p>
                
                <h4 style={{ marginBottom: '10px' }}>Ask questions about this scheme:</h4>
                <div style={{ flex: 1, minHeight: '300px' }}>
                  <ChatInterface 
                    systemInstruction={schemeSystemInstruction}
                    pageId={`scheme_${selectedScheme.id}`}
                  />
                </div>
              </>
            ) : (
              <>
                <h2 style={{ margin: '0 0 10px 0', color: 'var(--accent-saffron)' }}>Find Schemes for Me ✨</h2>
                <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
                  I'm analyzing your profile (Aditya Jain, 18, Rajasthan). Tell me what you're looking for!
                </p>
                
                <div style={{ flex: 1, minHeight: '300px' }}>
                  <ChatInterface 
                    systemInstruction={findForMeInstruction}
                    pageId="schemes_find_for_me"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
