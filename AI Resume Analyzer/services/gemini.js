const { GoogleGenAI } = require("@google/genai");
require("dotenv").config({
    path: "../.env"
});
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
async function analyzeResume(text){
    const interaction = await ai.interactions.create({
        model:"gemini-3.6-flash",
        input:`
Analyze this resume and return ONLY valid JSON in this format:

{
  "overallScore": 85,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:
${text}
`
    });

    return interaction.output_text;
}

module.exports = analyzeResume;