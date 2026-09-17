// src/services/chunkService.js

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import Chunk from "../models/Chunk.js";
import { generateEmbedding } from "./embeddingService.js";

/**
 * Split text into chunks
 */
export async function splitTextIntoChunks(text) {
  if (!text || text.trim() === "") {
    return [];
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([text]);

  return docs.map((doc) => doc.pageContent);
}

/**
 * Save chunks to MongoDB
 */
export async function saveChunks(userId, pdfId, extractedText) {
  const chunks = await splitTextIntoChunks(extractedText);

  const savedChunks = [];

  for (let i = 0; i < chunks.length; i++) {
    console.log(`🧠 Generating embedding ${i + 1}/${chunks.length}`);

    const embedding = await generateEmbedding(chunks[i]);

    const chunk = await Chunk.create({
      user: userId,
      pdf: pdfId,
      chunkIndex: i + 1,
      pageNumber: 1,
      text: chunks[i],
      wordCount: chunks[i].split(/\s+/).length,
      embedding,
      isEmbedded: true,
    });

    savedChunks.push(chunk);
  }

  return savedChunks;
}