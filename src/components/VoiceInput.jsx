import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VoiceInput({ onTranscript }) {
  const { language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Set language based on app context
      recognitionRef.current.lang = language === 'en' ? 'en-IN' : 'hi-IN';
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  return (
    <button 
      type="button" 
      onClick={toggleRecording} 
      className={`btn-voice ${isRecording ? 'mic-recording' : ''}`}
      style={{ fontSize: '1.2rem', padding: '5px', color: isRecording ? 'red' : 'inherit', border: 'none', background: 'transparent', cursor: 'pointer' }}
      title="Speak"
    >
      🎤
    </button>
  );
}
