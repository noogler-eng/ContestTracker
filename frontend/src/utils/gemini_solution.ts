import { ContestQuestion } from "@/types/contest_question";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateSolution = async (
  q: ContestQuestion,
  loadingMap: any,
  setSolutionMap: any,
  setLoadingMap: any
) => {
  if (loadingMap[q.questionId]) return;
  setLoadingMap((prev: any) => ({ ...prev, [q.questionId]: true }));
  try {
    const prompt = `Generate an efficient solution in cpp for the LeetCode problem titled "${q.title}" (${q.titleSlug}). Include comments 
      explaining key parts of the code. you can make diagram if needed and also include the example like input, output with explanation. make 
      the text statement as a wrap so that i have not to scroll, give me all the text part in comments`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setSolutionMap((prev: any) => ({ ...prev, [q.questionId]: text }));
  } catch (e) {
    setSolutionMap((prev: any) => ({
      ...prev,
      [q.questionId]: `/* Failed to generate solution. ${
        e instanceof Error ? e.message : "Unknown error"
      } */`,
    }));
  } finally {
    setLoadingMap((prev: any) => ({ ...prev, [q.questionId]: false }));
  }
};

export default generateSolution;
