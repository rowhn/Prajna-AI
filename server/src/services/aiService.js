// src/services/aiService.js

import axios from "axios";

// Order matters.
// If one model fails, Prajñā AI automatically tries the next.
const MODELS = [
  "google/gemma-3-27b-it",
  "deepseek/deepseek-chat-v3-0324",
];

export const generateAIResponse = async (
  systemPrompt,
  userPrompt
) => {
  for (const model of MODELS) {
    try {
      console.log(`🤖 Trying Model: ${model}`);

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Prajna AI",
          },
        }
      );

      console.log(`✅ Success using ${model}`);

      return response.data.choices[0].message.content;

    } catch (error) {

      console.log(`❌ ${model} failed`);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log(
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        console.log(error.message);
      }
    }
  }

  throw new Error("All AI models failed.");
};