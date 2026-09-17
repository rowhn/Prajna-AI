// src/controllers/pdfController.js

import * as pdfService from "../services/pdfService.js";

export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    const pdf = await pdfService.uploadPDF(req.user._id, req.file);

    return res.status(201).json({
      success: true,
      message: "PDF uploaded successfully",
      pdf,
    });
  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await pdfService.getAllPDFs(req.user._id);

    return res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deletePDF = async (req, res) => {
  try {
    const { pdfId } = req.params;

    const result = await pdfService.deletePDF(
      req.user._id,
      pdfId
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};