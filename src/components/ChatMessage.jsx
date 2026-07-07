import React from 'react';
import TextToSpeech from './TextToSpeech';

export default function ChatMessage({ msg }) {
  const isUser = msg.role === 'user';
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '15px'
    }}>
      <div style={{
        maxWidth: '75%',
        background: isUser ? 'var(--primary-color)' : 'var(--white)',
        color: isUser ? 'var(--white)' : 'var(--text-color)',
        padding: '12px 16px',
        borderRadius: isUser ? '12px 12px 0 12px' : '12px 12px 12px 0',
        boxShadow: 'var(--shadow-sm)',
        border: !isUser ? '1px solid var(--border-color)' : 'none'
      }}>
        {msg.image && (
          <img src={msg.image} alt="Uploaded attachment" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }} />
        )}
        
        {msg.text && (
          <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
        )}
        
        {/* Text to speech for AI responses */}
        {!isUser && msg.text && !msg.text.startsWith('Error:') && (
          <div style={{ marginTop: '10px' }}>
            <TextToSpeech text={msg.text} />
          </div>
        )}
      </div>
    </div>
  );
}
