
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, IPType } from "../types";

export async function analyzeIPStrategy(input: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following business idea, skill, or website and suggest exactly 5 unique Intellectual Property (IP) ideas that can help build a competitive moat. 
    Focus on high-value, non-obvious IP that provides true differentiation.
    
    Input: ${input}`,
    config: {
      temperature: 0.7,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A high-level overview of the IP strategy landscape for this input." 
          },
          overallMoatScore: { 
            type: Type.NUMBER, 
            description: "A score from 1-100 representing the strength of the potential moat." 
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                type: { 
                  type: Type.STRING, 
                  enum: Object.values(IPType),
                  description: "The specific category of Intellectual Property."
                },
                description: { type: Type.STRING, description: "Detailed description of the IP asset." },
                moatStrategy: { type: Type.STRING, description: "How this IP creates a barrier to entry for competitors." },
                complexity: { type: Type.NUMBER, description: "Implementation complexity from 1 to 5." },
                potentialValue: { type: Type.NUMBER, description: "The commercial value of this asset from 1 to 100." },
                differentiationFactor: { type: Type.STRING, description: "The specific unique element that sets it apart." }
              },
              required: ["title", "type", "description", "moatStrategy", "complexity", "potentialValue", "differentiationFactor"]
            }
          }
        },
        required: ["summary", "suggestions", "overallMoatScore"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result as AnalysisResult;
}
