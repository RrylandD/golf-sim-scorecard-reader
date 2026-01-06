import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Analyzes a scorecard image using Google Gemini 2.5 Flash.
 * Returns structured JSON data.
 * 
 * @param {string} apiKey - User's Google Generative AI API Key
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} - Parsed scorecard data
 */
export const analyzeScorecardWithGemini = async (apiKey, imageFile) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Convert file to base64
        const base64Data = await fileToGenerativePart(imageFile);

        const prompt = `
      Look at this golf scorecard image. 
      Extract the "Par" row.
      Then extract each Player's Name and their "Score" for each hole (1-9 or 1-18).
      Ignore "Net", "Total", or "Hcp" columns/rows. Focus on the raw strokes.
      
      Return ONLY valid JSON. format:
      {
        "players": [
           { 
             "name": "Player Name", 
             "holes": [
                { "hole": 1, "par": 4, "score": 5 },
                { "hole": 2, "par": 3, "score": 3 }
             ]
           },
           ...
        ]
      }
      Do not wrap in markdown code blocks. Just the raw JSON string.
    `;

        const result = await model.generateContent([prompt, base64Data]);
        const response = await result.response;
        const text = response.text();

        // Clean markdown if present (```json ... ```)
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Failed to analyze image with Gemini. Check your API Key or image.");
    }
};

async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}
