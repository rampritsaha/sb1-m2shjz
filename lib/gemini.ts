import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export async function analyzeImage(imageData: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    const prompt = "Analyze this person's face and suggest hairstyles. Include: 1. Face shape description 2. Three recommended hairstyles that would suit them 3. Three styling tips. Format as JSON with keys: faceShape, recommendations (array), styling (array)";
    
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}