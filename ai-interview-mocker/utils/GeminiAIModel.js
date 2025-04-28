// To run this code you need to install the following dependencies:
// npm install @google/genai mime

const { GoogleGenAI } = require('@google/genai');

// Create the AI client with API key
const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY, // Or hardcode: 'your_api_key'
});

// Configuration for chat
const chatSession = {
  model: 'gemini-1.5-flash',
  config: {
    tools: [{ codeExecution: {} }],
    responseMimeType: 'text/plain',
  },

  /**
   * Send a message to Gemini and get response text
   * @param {string} prompt - Input prompt string
   * @returns {Promise<{text: string}>}
   */
  async sendMessage(prompt) {
    try {
      const response = await ai.models.generateContent({
        model: this.model,
        config: this.config,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      });

      const parts = response?.candidates?.[0]?.content?.parts?.[0];
      const resultText = parts?.text || '';

      return { text: resultText };
    } catch (error) {
      console.error('Gemini sendMessage error:', error);
      return { text: 'An error occurred while processing your request.' };
    }
  }
};

/**
 * Optional: Streamed response (console only for now)
 * @param {Array} contents - The conversation content array
 */
async function generateChatResponse(contents) {
  const response = await ai.models.generateContentStream({
    model: chatSession.model,
    config: chatSession.config,
    contents,
  });

  for await (const chunk of response) {
    const parts = chunk?.candidates?.[0]?.content?.parts?.[0];
    if (!parts) continue;

    if (parts.text) {
      console.log(parts.text);
    }
    if (parts.executableCode) {
      console.log(parts.executableCode);
    }
    if (parts.codeExecutionResult) {
      console.log(parts.codeExecutionResult);
    }
  }
}

// Export objects
module.exports = {
  chatSession,
  generateChatResponse,
};
