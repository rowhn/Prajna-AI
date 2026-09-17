// src/routes/chatRoutes.js

import express from 'express';
import {
  createConversation,
  sendMessage,
  getConversations,
  getMessages,
  deleteConversation,
  renameConversation,
} from '../controllers/chatController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All chat routes require authentication
router.use(protect);

// Conversation APIs
router.post('/conversation', createConversation);
router.get('/conversations', getConversations);
router.get('/conversation/:conversationId', getMessages);
router.patch('/conversation/:conversationId', renameConversation);
router.delete('/conversation/:conversationId', deleteConversation);

// Chat API
router.post('/send', sendMessage);

export default router;