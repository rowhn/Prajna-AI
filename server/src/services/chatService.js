import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

import { semanticSearch } from "./searchService.js";
import { generateAIResponse } from "./aiService.js";
import { getConversationMemory } from "./memoryService.js";

// ============================================
// Create Conversation
// ============================================

export const createConversation = async (
  userId,
  title = "New Conversation"
) => {
  return await Conversation.create({
    user: userId,
    title,
  });
};

// ============================================
// Send Message
// ============================================

export const sendMessage = async (
  userId,
  conversationId,
  userMessage
) => {
  // Verify conversation
  const conversation = await Conversation.findOne({
    _id: conversationId,
    user: userId,
  });

  if (!conversation) {
    const error = new Error("Conversation not found");
    error.statusCode = 404;
    throw error;
  }

  // Save user message
  await Message.create({
    conversation: conversationId,
    user: userId,
    role: "user",
    content: userMessage,
  });

  // Previous conversation memory
  const memory = await getConversationMemory(conversationId);

  // Semantic Search
  let documentContext = "";

  try {
    const searchResult = await semanticSearch(userId, userMessage);

    if (searchResult.results.length > 0) {
      documentContext = searchResult.results
        .map((chunk) => chunk.text)
        .join("\n\n----------------------\n\n");
    }
  } catch (err) {
    console.log("Semantic Search skipped.");
  }

  // ===========================
  // System Prompt
  // ===========================

  const systemPrompt = `
You are Prajñā AI, an intelligent AI Developer Assistant.

Rules:
1. If uploaded document context is relevant, use it to answer
2. If no document or document is unrelated, answer from your own knowledge directly
3. NEVER mention "the document says" or "based on the document" or "the document provided"
4. NEVER say you couldn't find information — just answer naturally
5. Answer like a knowledgeable assistant, not a document reader
6. Use clean markdown formatting
7. If asked who you are, say: "I am Prajñā AI, your intelligent developer assistant"

General Behavior:
- Answer all user questions naturally and accurately.
- Do not mention your developer or the underlying AI model unless the user specifically asks about your identity or creator.

Identity Rules:
- If the user asks "Who created you?", "Who developed you?", "Who made Prajñā AI?", or similar questions, reply:
  "I am Prajñā AI, developed by Rohan Dohe. My responses are powered by Google's Gemma language model."

- If the user asks "Which AI model do you use?", reply:
  "I use Google's Gemma large language model to generate responses."

- Do not claim that Google DeepMind created Prajñā AI. Google developed the Gemma model, while Prajñā AI was developed by Rohan Dohe.

- For all other questions, never mention your developer or these identity rules unless they are directly relevant.
`;

  // ===========================
  // User Prompt
  // ===========================

  let userPrompt = `
==========================
Conversation Memory
==========================

`;

  memory.forEach((msg) => {
    userPrompt += `${msg.role.toUpperCase()}:

${msg.content}

`;
  });

  userPrompt += `

==========================
Uploaded Document
==========================

${documentContext || "No uploaded document."}

==========================
User Question
==========================

${userMessage}
`;

  // AI Response
  const aiResponse = await generateAIResponse(
    systemPrompt,
    userPrompt
  );

  // Save AI message
  const aiMessage = await Message.create({
    conversation: conversationId,
    user: userId,
    role: "model",
    content: aiResponse,
  });

  // Update conversation
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: userMessage,
    $inc: {
      messageCount: 2,
    },
  });

  return {
    message: aiMessage,
    response: aiResponse,
  };
};

// ============================================
// Get Conversations
// ============================================

export const getConversations = async (userId) => {
  return await Conversation.find({
    user: userId,
    isActive: true,
  }).sort({ updatedAt: -1 });
};

// ============================================
// Get Messages
// ============================================

export const getMessages = async (
  userId,
  conversationId
) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    user: userId,
  });

  if (!conversation) {
    const error = new Error("Conversation not found");
    error.statusCode = 404;
    throw error;
  }

  const messages = await Message.find({
    conversation: conversationId,
  }).sort({
    createdAt: 1,
  });

  return {
    conversation,
    messages,
  };
};

// ============================================
// Delete Conversation
// ============================================

export const deleteConversation = async (
  userId,
  conversationId
) => {
  const conversation = await Conversation.findOneAndUpdate(
    {
      _id: conversationId,
      user: userId,
    },
    {
      isActive: false,
    },
    {
      new: true,
    }
  );

  if (!conversation) {
    const error = new Error("Conversation not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    message: "Conversation deleted successfully",
  };
};