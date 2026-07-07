import React from 'react';

export default function ServiceCard({ service, onClick }) {
  return (
    <div 
      className="card" 
      style={{ backgroundColor: service.color, cursor: 'pointer', border: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
      onClick={() => onClick(service)}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{service.icon}</div>
      <h3 style={{ marginBottom: '10px', color: '#1A3A5C' }}>{service.name}</h3>
      <p style={{ color: '#4A6581', fontSize: '0.95rem', flex: 1 }}>{service.description}</p>
    </div>
  );
}
