// src/controllers/chatController.js

import * as chatService from '../services/chatService.js';

export const createConversation = async (req, res) => {
  try {
    const { title } = req.body;

    const conversation = await chatService.createConversation(
      req.user._id,
      title
    );

    return res.status(201).json({
      success: true,
      conversation,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    if (!conversationId || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'conversationId and message are required',
      });
    }

    const result = await chatService.sendMessage(
      req.user._id,
      conversationId,
      message.trim()
    );

    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await chatService.getConversations(req.user._id);

    return res.status(200).json({
      success: true,
      count: conversations.length,
      conversations,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const result = await chatService.getMessages(
      req.user._id,
      conversationId
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

export const renameConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { title } = req.body;

    const conversation = await chatService.renameConversation(
      req.user._id,
      conversationId,
      title
    );

    return res.status(200).json({
      success: true,
      message: 'Conversation renamed successfully',
      conversation,
    });

  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const result = await chatService.deleteConversation(
      req.user._id,
      conversationId
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