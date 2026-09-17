// src/models/PDF.js

import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    pageCount: {
      type: Number,
      default: 0,
    },

    extractedText: {
      type: String,
      default: "",
    },

    uploadStatus: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

pdfSchema.index({ user: 1, createdAt: -1 });

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;