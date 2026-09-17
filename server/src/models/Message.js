// src/models/Message.js

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    role: {
      type: String,
      enum: ['user', 'model', 'system'],
      required: true,
    },

    content: {
      type: String,
      required: true,
      maxlength: 10000,
    },

    tokens: {
      type: Number,
      default: 0,
    },

    model: {
      type: String,
      default: 'Gemini',
    },

    status: {
      type: String,
      enum: ['sent', 'generating', 'completed', 'failed'],
      default: 'completed',
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({
  conversation: 1,
  createdAt: 1,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;