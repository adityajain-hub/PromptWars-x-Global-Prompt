import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendChatMessage } from '../utils/api';
import VoiceInput from './VoiceInput';
import TextToSpeech from './TextToSpeech';

export default function ChatInterface({ systemInstruction, pageId, initialQuery }) {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hasInitialized = useRef(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(`chat_${pageId}`);
    if (history) {
      setMessages(JSON.parse(history));
    } else {
      // Add initial greeting based on language
      const greeting = language === 'en' 
        ? "Hello! I am Bharat AI, your civic companion. How can I assist you today?"
        : "नमस्ते! मैं भारत AI हूँ, आपका नागरिक साथी। आज मैं आपकी कैसे सहायता कर सकता हूँ?";
      setMessages([{ role: 'model', text: greeting }]);
    }
  }, [pageId, language]);

  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${pageId}`, JSON.stringify(messages));
    }
  }, [messages, pageId]);

  // Handle initialQuery auto-submit
  useEffect(() => {
    if (initialQuery && !hasInitialized.current && messages.length > 0) {
      hasInitialized.current = true;
      setInputText(initialQuery);
      // Wait for state to update before submitting
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        // We need to bypass the form event temporarily and call the logic directly
        handleInitialSubmit(initialQuery);
      }, 100);
    }
  }, [initialQuery, messages]);

  const handleInitialSubmit = async (queryText) => {
    if (!queryText.trim()) return;

    const newUserMsg = { role: 'user', text: queryText, image: null };
    const updatedMessages = [...messages, newUserMsg];
    
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendChatMessage(updatedMessages, systemInstruction, language);
      setMessages([...updatedMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      localStorage.removeItem(`chat_${pageId}`);
      const greeting = language === 'en' 
        ? "Hello! I am Bharat AI, your civic companion. How can I assist you today?"
        : "नमस्ते! मैं भारत AI हूँ, आपका नागरिक साथी। आज मैं आपकी कैसे सहायता कर सकता हूँ?";
      setMessages([{ role: 'model', text: greeting }]);
      hasInitialized.current = false;
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // base64
      };
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

    const newUserMsg = { role: 'user', text: inputText, image: selectedImage };
    const updatedMessages = [...messages, newUserMsg];
    
    setMessages(updatedMessages);
    setInputText('');
    setSelectedImage(null);
    setIsLoading(true);
    
    if (fileInputRef.current) fileInputRef.current.value = '';

    try {
      const responseText = await sendChatMessage(updatedMessages, systemInstruction, language);
      setMessages([...updatedMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages([...updatedMessages, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '400px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--white)', overflow: 'hidden' }}>
      
      {/* Chat Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 15px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={handleClearHistory} style={{ fontSize: '0.85rem', color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', padding: '5px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239,68,68,0.2)' }}>
          🗑️ Clear History
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '15px'
          }}>
            <div style={{
              maxWidth: '75%',
              background: msg.role === 'user' ? 'var(--primary-color)' : 'var(--white)',
              color: msg.role === 'user' ? 'var(--white)' : 'var(--text-color)',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
              boxShadow: 'var(--shadow-sm)',
              border: msg.role === 'model' ? '1px solid var(--border-color)' : 'none'
            }}>
              {msg.image && (
                <img src={msg.image} alt="Uploaded attachment" style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }} />
              )}
              {msg.text && (
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              )}
              
              {/* Text to speech for AI responses */}
              {msg.role === 'model' && msg.text && !msg.text.startsWith('Error:') && (
                <div style={{ marginTop: '10px' }}>
                  <TextToSpeech text={msg.text} />
                </div>
              )}
            </div>
          </div>
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
            <span style={{ fontSize: '0.85rem' }}>Image attached</span>
            <button onClick={removeImage} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>❌</button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            style={{ display: 'none' }} 
          />
          
          {/* Image Attach Button */}
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
            style={{ flex: 1, padding: '10px 15px', border: '1px solid var(--border-color)', borderRadius: '20px', outline: 'none' }}
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
