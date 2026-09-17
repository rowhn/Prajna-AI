// src/controllers/ragController.js

import { semanticSearch } from "../services/searchService.js";
import { generateAIResponse } from "../services/aiService.js";

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    console.log("==================================");
    console.log("🧠 New RAG Question");
    console.log(question);
    console.log("==================================");

    // Perform semantic search
    const searchResult = await semanticSearch(
      req.user._id,
      question
    );

    const results = searchResult.results;

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "No relevant document chunks found.",
      });
    }

    // Build document context
    const context = results
      .map((chunk) => chunk.text)
      .join("\n\n-------------------------\n\n");

    // Build prompt
    const prompt = `
You are Prajñā AI.

Answer ONLY using the information provided below.

If the answer is not present, reply exactly:

"I couldn't find that information in the uploaded documents."

=========================
DOCUMENT CONTEXT
=========================

${context}

=========================
QUESTION
=========================

${question}
`;

    // Generate AI response
    const answer = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      question,
      answer,
      sources: results.map((chunk) => ({
        pdf: chunk.pdf,
        chunk: chunk.chunkIndex,
        page: chunk.pageNumber,
        score: Number(chunk.score.toFixed(4)),
      })),
    });

  } catch (error) {
    console.error("❌ RAG Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};