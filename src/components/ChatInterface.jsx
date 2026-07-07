import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useChat } from '../hooks/useChat';
import VoiceInput from './VoiceInput';
import ChatMessage from './ChatMessage';
import ConfirmModal from './ConfirmModal';

export default function ChatInterface({ systemInstruction, pageId, initialQuery }) {
  const { language, t } = useLanguage();
  const { messages, isLoading, sendMessage, clearHistory } = useChat(pageId, language, systemInstruction, initialQuery);
  
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    // Send via custom hook
    sendMessage(inputText, selectedImage);
    
    // Clear local input state
    setInputText('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmClear = () => {
    clearHistory();
    setShowConfirmModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--white)', overflow: 'hidden' }}>
      
      {/* Modals */}
      <ConfirmModal 
        isOpen={showConfirmModal}
        title="Clear Chat History"
        message="Are you sure you want to permanently delete this chat? This cannot be undone."
        onConfirm={handleConfirmClear}
        onCancel={() => setShowConfirmModal(false)}
      />

      {/* Chat Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 15px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          onClick={() => setShowConfirmModal(true)} 
          style={{ fontSize: '0.85rem', color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}
        >
          🗑️ Clear History
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
            <div style={{ background: 'var(--white)', padding: '12px 16px', borderRadius: '12px 12px 12px 0', border: '1px solid var(--border-color)' }}>
              <em>typing...</em>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '15px', background: 'var(--white)', borderTop: '1px solid var(--border-color)' }}>
        {selectedImage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '5px', background: '#f1f1f1', borderRadius: '8px' }}>
            <img src={selectedImage} alt="Preview" style={{ height: '40px', borderRadius: '4px' }} />
            <span style={{ fontSize: '0.85rem', color: 'black' }}>Image attached</span>
            <button onClick={removeImage} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>❌</button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            style={{ display: 'none' }} 
          />
          
          <div className="tooltip-container" data-tooltip="Upload Image">
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()} 
              style={{ fontSize: '1.2rem', padding: '5px', background: 'transparent', cursor: 'pointer', border: 'none' }}
            >
              📎
            </button>
          </div>
          
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('chat.placeholder')}
            style={{ flex: 1, padding: '10px 15px', border: '1px solid var(--border-color)', borderRadius: '20px', outline: 'none', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            disabled={isLoading}
          />
          
          <VoiceInput onTranscript={(text) => setInputText(prev => prev ? prev + ' ' + text : text)} />
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ borderRadius: '20px', padding: '10px 20px' }}
            disabled={isLoading || (!inputText.trim() && !selectedImage)}
          >
            {t('hero.searchBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}
