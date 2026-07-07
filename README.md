<div align="center">
  <img src="https://img.icons8.com/color/96/000000/india.png" alt="India Flag"/>
  <h1>🏛️ Smart Bharat: AI-Powered Civic Companion</h1>
  <p><strong>A Next-Generation Citizen Service Platform for the people of India.</strong></p>
  
  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://prompt-wars-x-global-prompt.vercel.app/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
</div>

<br/>

## 🎯 Chosen Vertical
**GovTech & Public Services (Smart Civic Assistant)**
This project aims to revolutionize how citizens interact with government services by removing bureaucratic complexity, language barriers, and accessibility issues. Smart Bharat serves as a centralized, AI-driven portal for resolving civic issues, exploring welfare schemes, and seeking guidance.

---

## 🧠 Approach and Logic
The core logic revolves around a dynamic **Contextual AI architecture**:
1. **Understanding the User Context:** We leverage **Gemini 2.5 Flash** to power a conversational agent ("Bharat AI") that adapts its tone, language (English/Hindi), and suggestions based on user input. 
2. **Action-Oriented Prompts:** Instead of being a generic chatbot, the AI is prompted with specific system instructions to act as a *government-official yet empathetic civic companion*. It processes natural language to categorize civic complaints (e.g., routing a pothole complaint to the PWD).
3. **Accessibility First:** The design logic prioritizes inclusivity. We built custom bilingual state management, integrated web SpeechSynthesis API for Text-to-Speech (using high-quality voices), and implemented visual accessibility toggles (Light/Dark mode, A/A+/A++ font scaling).
4. **Security Logic:** To prevent API key leaks and CORS issues, the frontend never communicates with Gemini directly. It routes requests through a secure **Serverless Backend (Vercel Edge Functions)**.

---

## ⚙️ How the Solution Works
- **Interactive AI Chat:** Users describe their problems in natural language. The React frontend sends the request securely via our `/api/chat` serverless function. Gemini evaluates the query against civic policies and returns actionable, step-by-step guidance.
- **Multimodal Issue Reporting:** Users can type out complaints (e.g., "There is a broken streetlight near MG Road"). In future expansions, image attachments can be analyzed by Gemini Vision to instantly categorize the infrastructure damage.
- **Language & Accessibility Toggles:** A React Context (`LanguageContext`) globally manages the application state. Changing the language instantly translates the UI using a local dictionary and signals the AI to respond in the selected language.
- **Welfare Scheme Matching:** By capturing basic demographic data, the platform uses AI to filter and present government schemes (like PM-KISAN, Ayushman Bharat) the user is eligible for.

---

## 🤔 Assumptions Made
1. **API Availability:** Assumed the Google Gemini 2.5 Flash API is available and responsive for production workloads.
2. **User Demographics:** Assumed the primary user base consists of Indian citizens looking for local, state, or central government assistance, hence the focus on English and Hindi.
3. **Deployment Environment:** Assumed the solution is hosted on a modern cloud platform (Vercel) capable of running Node.js serverless functions.
4. **Browser Support:** Assumed users are on modern browsers that support HTML5 SpeechSynthesis API for the Read Aloud feature.

---

## ✨ Key Features
- 🗣️ **Text-to-Speech:** High-quality AI Voice Output (Read Aloud) features.
- 🌍 **Bilingual Support (English & Hindi):** Instantly toggle the entire UI and AI interactions between English and Hindi.
- 🌓 **Premium UX & Accessibility:** Glassmorphism UI, Light / Dark Mode, and A/A+/A++ text scaling.
- 🔒 **Secure Architecture:** Vercel Serverless Functions protect API keys.

---

## 💻 Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/adityajain-hub/PromptWars-x-Global-Prompt.git
cd PromptWars-x-Global-Prompt
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API Key:
```env
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```

---
<div align="center">
  <p>Built with ❤️ for a Smarter, Digital India.</p>
</div>
