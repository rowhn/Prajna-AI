// src/routes/pdfRoutes.js

import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import upload from '../middleware/uploadMiddleware.js';

import {
  uploadPDF,
  getAllPDFs,
  deletePDF,
} from '../controllers/pdfController.js';

const router = express.Router();

router.use(protect);

router.post(
  '/upload',
  upload.single('pdf'),
  uploadPDF
);

router.get('/', getAllPDFs);

router.delete('/:pdfId', deletePDF);

export default router;