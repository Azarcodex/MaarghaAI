import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateReply(message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: message,
    });

    return response.text;
  } catch (error) {
    // Handle quota errors
    if (error.status === 429) {
      return "Your daily free quota is over. Please try again tomorrow.";
    }

    // Log other errors for debugging
    console.error("Gemini error:", error);

    return "Something went wrong. Please try again later.";
  }
}
