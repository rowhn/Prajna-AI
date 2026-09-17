// src/models/Chunk.js

import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PDF",
      required: true,
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    pageNumber: {
      type: Number,
      default: 1,
    },

    text: {
      type: String,
      required: true,
    },

    wordCount: {
      type: Number,
      default: 0,
    },

    embedding: {
      type: [Number],
      default: [],
    },

    isEmbedded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

chunkSchema.index({ pdf: 1, chunkIndex: 1 });
chunkSchema.index({ user: 1 });

export default mongoose.model("Chunk", chunkSchema);