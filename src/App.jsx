import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import GovtServices from './pages/GovtServices';
import ReportIssue from './pages/ReportIssue';
import Schemes from './pages/Schemes';
import ChatPage from './pages/ChatPage';
import { About, FAQ, Feedback, Privacy } from './pages/StaticPages';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<GovtServices />} />
              <Route path="/report" element={<ReportIssue />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
