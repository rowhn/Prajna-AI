// src/services/streamService.js

import axios from "axios";

export const streamAIResponse = async (prompt, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://openrouter.ai/api/v1/chat/completions",
      responseType: "stream",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Prajna AI",
      },

      data: {
        model: process.env.OPENROUTER_MODEL,
        stream: true,
        temperature: 0.3,

        messages: [
          {
            role: "system",
            content:
              "You are Prajñā AI. Answer clearly and professionally.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    });

    response.data.on("data", (chunk) => {
      res.write(chunk);
    });

    response.data.on("end", () => {
      res.end();
    });

    response.data.on("error", (err) => {
      console.error(err);
      res.end();
    });

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.write(
      `data: ${JSON.stringify({
        error: "Streaming failed",
      })}\n\n`
    );

    res.end();
  }
};