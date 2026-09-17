// src/services/searchService.js

import Chunk from "../models/Chunk.js";
import { generateEmbedding } from "./embeddingService.js";

/**
 * Calculate cosine similarity
 */
const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB) return 0;
  if (vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Semantic Search
 */
export const semanticSearch = async (
  userId,
  query,
  topK = 5
) => {
  try {
    console.log("==================================");
    console.log("🔍 Starting Semantic Search...");
    console.log("Question:", query);

    const queryEmbedding = await generateEmbedding(query);

    console.log("✅ Query embedding generated.");

    const chunks = await Chunk.find({
      user: userId,
      isEmbedded: true,
    });

    console.log(`📄 Found ${chunks.length} chunks.`);

    if (!chunks.length) {
      return {
        results: [],
      };
    }

    const scoredChunks = chunks.map((chunk) => ({
      ...chunk.toObject(),
      score: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    scoredChunks.sort((a, b) => b.score - a.score);

    const results = scoredChunks.slice(0, topK);

    console.log("🏆 Top Results:");

    results.forEach((chunk, index) => {
      console.log(
        `${index + 1}. Score: ${chunk.score.toFixed(4)} | Chunk ${chunk.chunkIndex}`
      );
    });

    console.log("==================================");

    return {
      results,
    };

  } catch (error) {
    console.error("❌ Semantic Search Error:", error);
    throw error;
  }
};

export default semanticSearch;