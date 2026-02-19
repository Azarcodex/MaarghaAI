import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateReply(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: message,
  });

  return response.text;
}
