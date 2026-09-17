// src/services/memoryService.js

import Message from "../models/Message.js";

/**
 * Load previous conversation messages
 */
export const getConversationMemory = async (
  conversationId,
  limit = 10
) => {
  try {
    const messages = await Message.find({
      conversation: conversationId,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // oldest → newest
    messages.reverse();

    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

  } catch (error) {
    console.error("Memory Error:", error);
    return [];
  }
};