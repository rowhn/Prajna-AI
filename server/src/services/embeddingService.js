// src/services/embeddingService.js

import { pipeline } from "@xenova/transformers";

let extractor = null;

/**
 * Load embedding model (loads only once)
 */
const loadModel = async () => {
  if (!extractor) {
    console.log("📦 Loading embedding model...");
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    console.log("✅ Embedding model loaded.");
  }

  return extractor;
};

/**
 * Generate embedding for a text
 */
export const generateEmbedding = async (text) => {
  const model = await loadModel();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

/**
 * Generate embeddings for multiple chunks
 */
export const generateEmbeddings = async (chunks) => {
  const results = [];

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.text);

    results.push({
      ...chunk.toObject(),
      embedding,
    });
  }

  return results;
};