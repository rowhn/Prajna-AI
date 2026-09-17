// src/controllers/uploadController.js

import * as pdfService from "../services/pdfService.js";

/**
 * @desc Upload a PDF
 * @route POST /api/upload/pdf
 * @access Private
 */
export const uploadPDF = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    // Process PDF
    const pdf = await pdfService.uploadPDF(req.user._id, req.file);

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully.",
      pdf,
    });
  } catch (error) {
    console.error("UPLOAD PDF ERROR:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to upload PDF.",
    });
  }
};

/**
 * @desc Get all uploaded PDFs
 * @route GET /api/upload/pdfs
 * @access Private
 */
export const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await pdfService.getAllPDFs(req.user._id);

    return res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });
  } catch (error) {
    console.error("GET PDFS ERROR:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch PDFs.",
    });
  }
};

/**
 * @desc Delete PDF
 * @route DELETE /api/upload/pdf/:pdfId
 * @access Private
 */
export const deletePDF = async (req, res) => {
  try {
    const { pdfId } = req.params;

    const result = await pdfService.deletePDF(req.user._id, pdfId);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("DELETE PDF ERROR:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete PDF.",
    });
  }
};