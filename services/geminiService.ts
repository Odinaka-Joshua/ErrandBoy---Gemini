import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ImageSize } from "../types";

// Helper to ensure API key exists
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found in environment");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Uses gemini-2.5-flash-lite for fast, low-latency text tasks.
 */
export const getFastSuggestion = async (userInput: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `You are a helpful assistant for the "Errand Boy" app in Awka, Nigeria. 
    The user is typing a request: "${userInput}". 
    Suggest 3 very short, actionable errand titles based on this. 
    Format as a single string separated by pipes (|). Example: "Buy Jollof Rice|Pick up Laundry|Clean Apartment".
    Keep it under 100 characters total.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: prompt,
    });
    
    return response.text || "";
  } catch (error) {
    console.error("Fast suggestion error:", error);
    return "";
  }
};

/**
 * Uses gemini-3-pro-preview for the main chatbot.
 */
export const createChatSession = (): Chat => {
  const ai = getAIClient();
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are "Errand Boy Concierge", a premium, witty, and helpful AI assistant for a service marketplace in Awka, Nigeria.
      Your tone is professional yet warm ("Royal/Concierge" vibe).
      You help users find errand runners, explain services (Market Runs, Cleaning, Moving, etc.), and resolve issues.
      Users are likely students (UNIZIK) or working professionals.
      Be concise.`,
    },
  });
};

/**
 * Uses gemini-3-pro-image-preview for image generation.
 */
export const generateErrandVisual = async (prompt: string, size: ImageSize): Promise<string | null> => {
  try {
    const ai = getAIClient();
    
    // Check if user needs to select key (client-side check usually, but handled by logic wrapper in UI)
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1" // Default square for cards
        }
      }
    });

    // Parse response for image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
         if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
         }
      }
    }
    return null;
  } catch (error) {
    console.error("Image gen error:", error);
    throw error;
  }
};
