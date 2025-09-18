import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

  Format response as JSON:
  [
    { "id": 1, "question": "..." },
    { "id": 2, "question": "..." }
  ]
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",   // lightweight + cheap, you can use "gpt-4o" for better quality
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7 // control creativity
  });

  const content = response.choices[0].message?.content || "[]";
  try {
    return JSON.parse(content); // parsed JSON output
  } catch (err) {
    console.error("Error parsing OpenAI response:", err);
    return [];
  }
};
