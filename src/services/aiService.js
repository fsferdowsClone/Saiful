/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateLuxuryObject = async (userPrompt) => {
  // 1. Generate Metadata
  const metadataResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Design a unique luxury object for SaifCart based on: "${userPrompt}". 
    The item should follow "Quiet Luxury" principles: minimalist, premium materials, neutral tones.
    Return only valid JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          price: { type: Type.NUMBER },
          category: { type: Type.STRING },
          details: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          specifications: {
            type: Type.OBJECT,
            properties: {
              'Material Origin': { type: Type.STRING },
              'Weight': { type: Type.STRING },
              'Craftsmanship': { type: Type.STRING }
            }
          },
          materials: { type: Type.STRING }
        },
        required: ['name', 'description', 'price', 'category', 'details', 'specifications', 'materials']
      }
    }
  });

  const productData = JSON.parse(metadataResponse.text || '{}');

  // 2. Generate Image
  const imageResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Professional studio photography of a luxury ${productData.name}. 
          Minimalist composition, soft museum lighting, neutral background.
          High-end materials visible: ${productData.materials}.
          Quiet luxury aesthetic, clean lines, extremely high detail.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    },
  });

  let imageUrl = '';
  if (imageResponse.candidates && imageResponse.candidates[0].content.parts) {
    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }

  return {
    ...productData,
    image: imageUrl || 'https://picsum.photos/seed/luxury/1000/1000'
  };
};

export const generateBannerImage = async (theme) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Abstract architectural lifestyle photography for a luxury brand banner. Theme: ${theme}. 
          Minimalist, vast space, soft shadows, high-end materials like marble, concrete, or raw silk.
          Atmospheric and cinematic. No people. Extremely high detail.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    },
  });

  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  return 'https://picsum.photos/seed/atelier/1920/1080';
};
