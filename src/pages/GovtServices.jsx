import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import ChatInterface from '../components/ChatInterface';

export default function GovtServices() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);

  // Group services by category
  const categories = [...new Set(servicesData.map(s => s.category))];

  const systemInstruction = `You are Bharat AI assisting a citizen with the following government service: ${selectedService?.name}.
Your goal is to provide step-by-step guidance on how to apply for or access this service, list the required documents, and answer any follow-up questions the user has about this specific service.
Keep answers clear, use bullet points, and maintain a helpful civic tone.`;

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1>{t('services.title')}</h1>
        <p>{t('services.subtitle')}</p>
      </div>

      {categories.map(category => (
        <div key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--primary-color)', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
            {category}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {servicesData.filter(s => s.category === category).map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onClick={setSelectedService} 
              />
            ))}
          </div>
        </div>
      ))}

      {/* Service Detail Modal / Section */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <button className="modal-close" onClick={() => setSelectedService(null)}>×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ fontSize: '3rem' }}>{selectedService.icon}</div>
              <div>
                <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>{selectedService.name}</h2>
                <span className="badge badge-progress">{selectedService.category}</span>
              </div>
            </div>
            
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>{selectedService.description}</p>
            
            <h4 style={{ marginBottom: '10px' }}>Document Assistant & Guidance</h4>
            <div style={{ flex: 1, minHeight: '300px' }}>
              <ChatInterface 
                systemInstruction={systemInstruction}
                pageId={`service_${selectedService.id}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
