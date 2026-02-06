import { GoogleGenAI } from "@google/genai";

export async function fetchCardImage(bankName: string, cardName: string): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Using gemini-2.5-flash-latest which supports search grounding
    const model = 'gemini-2.5-flash-latest'; 
    
    // We ask for a direct image URL. 
    // Note: The model might return a grounding chunk with a web URI, or a text description.
    // We try to prompt it to find a specific image resource if possible, or we will return null and fallback to gradients.
    // A reliable way to get an image URL for *display* via hotlinking is rare due to CORS/Anti-hotlinking.
    // However, we can try to find a high-probability logo/card face URL.
    
    const response = await ai.models.generateContent({
      model,
      contents: `Find a publicly accessible, direct image URL (ending in .png or .jpg) for the "${bankName} ${cardName}" credit card face. The URL should be for the card visual itself. Return ONLY the URL string. If you cannot find a direct image URL, return "NOT_FOUND".`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0
      }
    });

    const text = response.text?.trim();
    
    if (text && text !== "NOT_FOUND" && (text.startsWith('http'))) {
        return text;
    }
    
    // If text didn't work, check grounding chunks for a relevant image context (advanced)
    // But for now, simple prompt is best.
    
    return null;
  } catch (e) {
    console.error("Failed to fetch image via GenAI", e);
    return null;
  }
}