export const sendChatMessage = async (messages, systemInstruction, language) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, systemInstruction, language }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to communicate with AI');
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
