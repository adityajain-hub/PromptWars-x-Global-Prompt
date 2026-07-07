import { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../utils/api';

export function useChat(pageId, language, systemInstruction, initialQuery) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasInitialized = useRef(false);

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(`chat_${pageId}`);
    if (history) {
      setMessages(JSON.parse(history));
    } else {
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
      setTimeout(() => {
        sendMessage(initialQuery, null);
      }, 100);
    }
  }, [initialQuery, messages]);

  const sendMessage = async (text, image = null) => {
    if (!text.trim() && !image) return;

    const newUserMsg = { role: 'user', text, image };
    const updatedMessages = [...messages, newUserMsg];
    
    setMessages(updatedMessages);
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

  const clearHistory = () => {
    localStorage.removeItem(`chat_${pageId}`);
    const greeting = language === 'en' 
      ? "Hello! I am Bharat AI, your civic companion. How can I assist you today?"
      : "नमस्ते! मैं भारत AI हूँ, आपका नागरिक साथी। आज मैं आपकी कैसे सहायता कर सकता हूँ?";
    setMessages([{ role: 'model', text: greeting }]);
    hasInitialized.current = false;
  };

  return {
    messages,
    isLoading,
    sendMessage,
    clearHistory
  };
}
