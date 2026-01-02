
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, IPType } from "../types";

export async function analyzeIPStrategy(input: string): Promise<AnalysisResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze the following business idea, skill, or website and suggest exactly 5 unique Intellectual Property (IP) ideas that can help build a competitive moat. 
    
    CRITICAL INSTRUCTIONS:
    1. Stick strictly to the terminology and business description provided by the user. 
    2. DO NOT invent or hallucinate brand names, company names, or product names that are not in the input.
    3. Use very simple, plain language for the summary.
    4. Focus on high-value, non-obvious IP that provides true differentiation.
    
    Input: ${input}`,
    config: {
      temperature: 0.4, // Lower temperature to reduce hallucinations/unwanted creativity
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ideaSummary: {
            type: Type.STRING,
            description: "A very simple, plain-English summary of the core business idea. Stick strictly to the user's words. Do not invent a name for the business."
          },
          analysisIntent: {
            type: Type.STRING,
            description: "A brief statement explaining the purpose of the following analysis (e.g., 'We have analyzed the core value drivers to identify assets that are difficult for competitors to replicate.')"
          },
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
        required: ["ideaSummary", "analysisIntent", "summary", "suggestions", "overallMoatScore"]
      }
    }
  });

  const result = JSON.parse(response.text);
  return result as AnalysisResult;
}
