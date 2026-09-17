// src/routes/uploadRoutes.js

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadPDF,
  getAllPDFs,
  deletePDF,
} from "../controllers/uploadController.js";

const router = express.Router();

// Upload PDF
router.post(
  "/pdf",
  protect,
  upload.single("file"),
  uploadPDF
);

// Get all PDFs
router.get(
  "/pdfs",
  protect,
  getAllPDFs
);

// Delete PDF
router.delete(
  "/pdf/:pdfId",
  protect,
  deletePDF
);

export default router;