import React from 'react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--bg-card)',
        padding: '30px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>{title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={onCancel}
            style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', background: '#EF4444', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
