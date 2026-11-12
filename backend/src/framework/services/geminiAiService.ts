import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface ISummaryResponse {
    summary: string;
    recommendation: string;
    strengths?: string[];
    areasForImprovement?: string[];
}


export const generateInterviewQuestions = async (
    domain: string,
    level: string,
    topics: string[],
    questionCount: number,
) => {
    const prompt = `
You are an expert interviewer.
Generate ${questionCount} unique, domain-specific interview questions.

Domain: ${domain}
Topics: ${topics}
Difficulty: ${level}

Theory questions

Return ONLY valid JSON in the following format (no explanations, no extra text):

[
  { "id": 1, "question": "..." },
  { "id": 2, "question": "..." }
]
`;;

    try {

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);

        let text = result.response.text();

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


export const generateSummaryService = async (interviewData: any): Promise<ISummaryResponse | null> => {
    const prompt = `
You are an expert interviewer.
Generate a concise summary of the interview based on the provided data.

Interview Data: ${JSON.stringify(interviewData)}

Return ONLY valid JSON in the following format (no explanations, no extra text):

{
    "summary": "...",
    score:".."
    "recommendation": "...",
    "strengths": ["..."],
    "areasForImprovement": ["..."]
}
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);

        let text = result.response.text();
        text = text.replace(/```json|```/g, "").trim();

        console.log("🧠 Raw Gemini summary output:", text);

        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            console.error("❌ Failed to parse Gemini JSON for summary:", text);
            return null; // or throw an error
        }

        return {
            summary: parsed.summary || "No summary generated.",
            recommendation: parsed.recommendation || "No recommendation provided.",
            strengths: parsed.strengths || [],
            areasForImprovement: parsed.areasForImprovement || [],
        };
    } catch (err) {
        console.error("❌ Error generating summary from Gemini:", err);
        return null;
    }
};
