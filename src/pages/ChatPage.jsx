import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ChatInterface from '../components/ChatInterface';

export default function ChatPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const initialQuery = location.state?.initialQuery;

  const systemInstruction = `You are Bharat AI, a helpful, empathetic, and knowledgeable civic companion for citizens of India.
Your goal is to simplify complex government information, answer citizen queries, recommend public services, and assist with document requirements.
Keep your answers clear, step-by-step, and easy to read. Use bullet points.
If the user's profile is known (e.g., Aditya Jain, Age 18, from Dungarpur, Rajasthan), personalize your advice (e.g., mention Rajasthan-specific portals or student schemes).
Always maintain a respectful, government-official yet friendly tone.`;

  // If there's an initial query, we could pre-fill it or automatically send it.
  // For simplicity, if we wanted to auto-send, we'd need to lift state up or pass a ref.
  // Here we just let ChatInterface handle its own state, but we can pass initialQuery if we wanted to build that feature.
  
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 200px)', paddingBottom: '40px' }}>
      <div className="page-header" style={{ marginBottom: '20px', flexShrink: 0 }}>
        <h1 style={{ color: 'var(--primary-color)' }}>{t('hero.askAI')}</h1>
        <p>Your intelligent civic companion.</p>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
        <ChatInterface 
          systemInstruction={systemInstruction}
          pageId="main_chat"
          initialQuery={initialQuery}
        />
      </div>
    </div>
  );
}
