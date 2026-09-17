// src/controllers/streamController.js

import { streamAIResponse } from "../services/streamService.js";

export const streamChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // ==========================================
    // Server Sent Events (SSE) Headers
    // ==========================================

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Flush headers immediately
    res.flushHeaders();

    console.log("==================================");
    console.log("🧠 Streaming Started");
    console.log(message);
    console.log("==================================");

    // Stream AI response
    await streamAIResponse(message, res);

  } catch (error) {
    console.error("Streaming Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    res.end();
  }
};