// src/services/pdfService.js

import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import PDF from "../models/PDF.js";
import { saveChunks } from "./chunkService.js";

/**
 * Upload and process PDF
 */
export const uploadPDF = async (userId, file) => {
  try {
    // Read uploaded PDF
    const data = new Uint8Array(fs.readFileSync(file.path));

    // Load PDF
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let extractedText = "";

    // Extract text page by page
    for (let page = 1; page <= pdf.numPages; page++) {
      const currentPage = await pdf.getPage(page);

      const textContent = await currentPage.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n\n";
    }

    // Save PDF metadata
    const pdfDoc = await PDF.create({
      user: userId,
      originalName: file.originalname,
      fileName: file.filename,
      filePath: file.path,
      mimeType: file.mimetype,
      fileSize: file.size,
      pageCount: pdf.numPages,
      extractedText,
      uploadStatus: "completed",
    });

    // Save chunks
    const chunks = await saveChunks(
      userId,
      pdfDoc._id,
      extractedText
    );

    return {
      id: pdfDoc._id,
      originalName: pdfDoc.originalName,
      pages: pdfDoc.pageCount,
      chunks: chunks.length,
      size: pdfDoc.fileSize,
      uploadedAt: pdfDoc.createdAt,
    };

  } catch (error) {
    console.error("PDF Processing Error:", error);

    const err = new Error("Failed to process PDF");
    err.statusCode = 500;

    throw err;
  }
};

/**
 * Get all PDFs
 */
export const getAllPDFs = async (userId) => {
  return await PDF.find({
    user: userId,
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .select("-extractedText");
};

/**
 * Delete PDF
 */
export const deletePDF = async (userId, pdfId) => {
  const pdf = await PDF.findOne({
    _id: pdfId,
    user: userId,
  });

  if (!pdf) {
    const error = new Error("PDF not found");
    error.statusCode = 404;
    throw error;
  }

  if (fs.existsSync(pdf.filePath)) {
    fs.unlinkSync(pdf.filePath);
  }

  pdf.isActive = false;
  await pdf.save();

  return {
    message: "PDF deleted successfully",
  };
};