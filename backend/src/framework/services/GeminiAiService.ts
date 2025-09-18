import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateInterviewQuestions = async (
    domain: string,
    level: string,
    questionCount: number
) => {
    const prompt = `
You are an expert interviewer.
Generate ${questionCount} unique, domain-specific interview questions.

Domain: ${domain}
Difficulty: ${level}

Return ONLY valid JSON in the following format (no explanations, no extra text):

[
  { "id": 1, "question": "..." },
  { "id": 2, "question": "..." }
]
`;;

    try {
        // ✅ use genAI.getGenerativeModel instead
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);

        // get plain text
        let text = result.response.text();

        // Clean up possible markdown formatting
        text = text.replace(/```json|```/g, "").trim();

        let questions: { id: number; question: string }[] = [];
        try {
            questions = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse Gemini JSON:", text);
        }

        return questions;
    } catch (err) {
        console.error("Error parsing Gemini response:", err);
        return [];
    }
};
