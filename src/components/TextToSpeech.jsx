import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TextToSpeech({ text }) {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Stop speaking when unmounted
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Try to find a matching voice, preferring high quality/Google voices
        const voices = window.speechSynthesis.getVoices();
        let targetVoice = null;
        
        if (language === 'hi') {
          // Prefer Google Hindi or Premium Hindi voices
          targetVoice = voices.find(v => (v.lang.includes('hi-IN') || v.lang.includes('hi')) && v.name.includes('Google')) ||
                        voices.find(v => v.lang.includes('hi-IN') || v.lang.includes('hi'));
        } else {
          // Prefer Google UK/US English or Premium English voices
          targetVoice = voices.find(v => (v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US')) && v.name.includes('Google')) ||
                        voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
        }
        
        if (targetVoice) {
          utterance.voice = targetVoice;
        }
        
        // Use language code
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        
        // Adjust for clarity
        utterance.rate = 0.9; // Slightly slower for better clarity
        utterance.pitch = 1.0;
        
        utterance.onend = () => {
          setIsPlaying(false);
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      } else {
        alert("Text to speech is not supported in your browser.");
      }
    }
  };

  return (
    <div className="tooltip-container" data-tooltip={isPlaying ? t('chat.stop') : t('chat.readAloud')}>
      <button onClick={toggleSpeech} className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        {isPlaying ? '⏹️' : '🔊'}
      </button>
    </div>
  );
}
