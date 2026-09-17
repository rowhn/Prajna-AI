// src/models/Conversation.js

import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      default: 'New Conversation',
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    lastMessage: {
      type: String,
      default: '',
      trim: true,
    },

    messageCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    modelUsed: {
      type: String,
      default: 'Gemini',
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    archived: {
      type: Boolean,
      default: false,
    },

    folder: {
      type: String,
      default: 'General',
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

conversationSchema.index({ user: 1, updatedAt: -1 });
conversationSchema.index({ user: 1, archived: 1 });
conversationSchema.index({ user: 1, pinned: -1 });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;