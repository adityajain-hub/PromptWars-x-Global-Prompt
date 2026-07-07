import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendChatMessage } from '../utils/api';
import { mockComplaints } from '../data/mockComplaints';
import IssueCard from '../components/IssueCard';
import VoiceInput from '../components/VoiceInput';

export default function ReportIssue() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('report'); // 'report' or 'track'
  
  // Form State
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Complaints State (combine mock + new)
  const [complaints, setComplaints] = useState(mockComplaints);
  const [newComplaintResult, setNewComplaintResult] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) {
      alert("Location and description are required.");
      return;
    }
    
    setIsSubmitting(true);
    setNewComplaintResult(null);

    const systemInstruction = `You are a Smart Bharat civic issue categorization AI. 
Analyze the user's issue description, location, and any provided image.
Return ONLY a JSON object with this exact structure:
{
  "category": "Roads / Water / Sanitation / Electricity / Infrastructure / Other",
  "priority": "High / Medium / Low",
  "summary": "A 5-word summary of the issue"
}
Do not include markdown backticks or any other text. Just the JSON object.`;

    const userMessage = `Location: ${location}\nDescription: ${description}`;
    const messages = [{ role: 'user', text: userMessage, image: selectedImage }];

    try {
      const responseText = await sendChatMessage(messages, systemInstruction, language);
      let aiResult;
      try {
        // Clean up potential markdown formatting from Gemini
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        aiResult = JSON.parse(cleanedText);
      } catch (err) {
        // Fallback if AI fails to return strict JSON
        aiResult = { category: "General", priority: "Medium", summary: "Issue reported successfully" };
      }

      const newComplaint = {
        id: `COMP-${Math.floor(Math.random() * 9000) + 1000}`,
        description: aiResult.summary || description.substring(0, 30) + '...',
        category: aiResult.category || "General",
        location: location,
        status: "Pending",
        date: new Date().toISOString().split('T')[0],
        priority: aiResult.priority
      };

      setComplaints([newComplaint, ...complaints]);
      setNewComplaintResult(newComplaint);
      
      // Reset form
      setLocation('');
      setDescription('');
      setSelectedImage(null);
      
    } catch (error) {
      alert(`Error submitting issue: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="page-header">
        <h1>{t('report.title')}</h1>
        <p>{t('report.subtitle')}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border-color)' }}>
        <button 
          className={`nav-link ${activeTab === 'report' ? 'active' : ''}`} 
          style={{ background: activeTab === 'report' ? 'var(--card-blue)' : 'transparent', color: 'var(--primary-color)', fontWeight: 'bold' }}
          onClick={() => setActiveTab('report')}
        >
          {t('report.tabReport')}
        </button>
        <button 
          className={`nav-link ${activeTab === 'track' ? 'active' : ''}`}
          style={{ background: activeTab === 'track' ? 'var(--card-blue)' : 'transparent', color: 'var(--primary-color)', fontWeight: 'bold' }}
          onClick={() => setActiveTab('track')}
        >
          {t('report.tabTrack')}
        </button>
      </div>

      {activeTab === 'report' ? (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {newComplaintResult ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
              <h2 style={{ color: 'var(--accent-green)' }}>Issue Submitted Successfully!</h2>
              <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '12px', marginTop: '20px', textAlign: 'left' }}>
                <p><strong>Complaint ID:</strong> {newComplaintResult.id}</p>
                <p><strong>Category:</strong> {newComplaintResult.category}</p>
                <p><strong>Priority:</strong> <span className={`badge ${newComplaintResult.priority === 'High' ? 'badge-pending' : 'badge-progress'}`}>{newComplaintResult.priority}</span></p>
                <p><strong>Summary:</strong> {newComplaintResult.description}</p>
              </div>
              <button className="btn btn-primary" style={{ marginTop: '30px' }} onClick={() => setNewComplaintResult(null)}>
                Report Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>{t('report.location')} *</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>{t('report.desc')} *</label>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="5"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}
                    required
                  />
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                    <VoiceInput onTranscript={(text) => setDescription(prev => prev ? prev + ' ' + text : text)} />
                  </div>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Attach Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageSelect}
                  style={{ width: '100%', padding: '10px', background: 'var(--bg-color)', borderRadius: '8px' }}
                />
                {selectedImage && (
                  <div style={{ marginTop: '10px' }}>
                    <img src={selectedImage} alt="Preview" style={{ height: '100px', borderRadius: '8px' }} />
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '15px', fontSize: '1.1rem' }}>
                {isSubmitting ? 'Processing with AI...' : t('report.submit')}
              </button>
            </form>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {complaints.map(complaint => (
            <IssueCard key={complaint.id} issue={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
