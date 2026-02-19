import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateReply(message) {
  try {
    // Try primary model
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: message,
    });

    return response.text;
  } catch (error) {
    console.error("Primary model error:", error);

    // If quota or rate limit error, try fallback
    if (error.status === 429) {
      try {
        const fallback = await ai.models.generateContent({
          model: "gemini-2-flash",
          contents: message,
        });

        return fallback.text;
      } catch (fallbackError) {
        console.error("Fallback model error:", fallbackError);
        return "Agent free quota is over. Please try again later.";
      }
    }

    // Other errors
    return "Something went wrong. Please try again later.";
  }
}
