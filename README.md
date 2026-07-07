<div align="center">
  <img src="https://img.icons8.com/color/96/000000/india.png" alt="India Flag"/>
  <h1>🏛️ Smart Bharat: AI-Powered Civic Companion</h1>
  <p><strong>A Next-Generation Citizen Service Platform for the people of India.</strong></p>
  
  [![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://prompt-wars-x-global-prompt.vercel.app/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
</div>

<br/>

## 🌟 Overview

**Smart Bharat** is an innovative, AI-first platform designed to bridge the gap between the Indian government and its citizens. By leveraging the advanced reasoning and multimodal capabilities of **Google Gemini 2.5 Flash Lite**, this platform acts as an intelligent civic companion.

Whether you need to figure out the documents required for an Aadhar card update, automatically categorize a civic complaint (like a pothole or broken streetlight), or find out which government schemes you are eligible for — **Bharat AI** is here to guide you in multiple languages.

---

## ✨ Key Features

- 🤖 **Bharat AI Chat Assistant:** Ask any civic question using Text, Voice, or by attaching Images. The AI automatically understands your request and guides you step-by-step.
- 🗣️ **Voice & Text-to-Speech:** Full accessibility with high-quality Voice Input and AI Voice Output (Read Aloud) features.
- 🌍 **Bilingual Support (English & Hindi):** Instantly toggle the entire UI and AI interactions between English and Hindi, breaking down language barriers for citizens.
- 🌓 **Light / Dark Mode:** A stunning, premium UI with glassmorphism, dynamic gradients, and an accessible high-contrast Dark Mode.
- 📝 **Smart Issue Reporting:** Users can report civic issues (with location details). The AI analyzes the description to understand the severity and automatically tags the relevant department.
- 🎓 **Personalized Scheme Discovery:** An AI-powered engine that analyzes user profiles to recommend the best state and central government welfare schemes.

---

## 🛠️ Technology Stack

| Category | Technologies Used |
|---|---|
| **Frontend Framework** | React.js (v18), Vite |
| **Routing** | React Router DOM (v6) |
| **Styling** | Vanilla CSS3 (Custom Variables, Glassmorphism, CSS Modules) |
| **Artificial Intelligence** | Google Gemini API (`gemini-2.5-flash-lite`) |
| **Backend / API Proxy** | Vercel Serverless Functions (`api/chat.js`) |
| **Hosting & Deployment**| Vercel (CI/CD connected to GitHub) |

---

## 🚀 How It Works

### The Architecture
To protect the sensitive Gemini API Key and prevent CORS issues, the frontend does not call the Gemini API directly. 
1. The React frontend sends the user's prompt, image (base64), and conversation history to a **Vercel Serverless Function** (`/api/chat`).
2. The Serverless function securely injects the `GEMINI_API_KEY` from environment variables and constructs the payload.
3. The function calls the official Google Gemini REST API and returns the AI's response back to the client.

---

## 💻 Local Setup Instructions

If you want to run this project locally on your machine, follow these steps:

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
Create a `.env.local` file in the root directory and add your Google Gemini API Key:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Start the Development Server
```bash
npm run dev
```
The app will be running at `http://localhost:5173`. 
*(Note: To test the Serverless API locally, you may need to use Vercel CLI: `vercel dev`)*

---

## 🎨 Design Philosophy

Smart Bharat was designed with a focus on **Digital India** aesthetics and **Premium UX**:
- **Color Palette:** Accents precisely matched to the Indian Flag (Saffron, White, Ashoka Navy Blue, and Green).
- **Accessibility First:** High contrast support, scalable typography, voice input, and screen-reader friendly overlays.
- **Micro-interactions:** Glowing hover states, smooth transitions, and tooltip overlays ensure the user feels engaged.

---

<div align="center">
  <p>Built with ❤️ for a Smarter, Digital India.</p>
</div>
