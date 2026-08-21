/**
 * OceanAI — Unified AI Client
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import OpenAI from "openai";

if (!process.env.OCEANAI_API_KEY) {
  console.error("❌ خطا: کلید OCEANAI_API_KEY تنظیم نشده است.");
  throw new Error("OceanAI API key is missing.");
}

const aiClient = new OpenAI({
  apiKey: process.env.OCEANAI_API_KEY,
  timeout: 30000,
});

export default aiClient;
const response = await aiClient.responses.create({
  model: "gpt-4.1-mini",
  input: "write a haiku about ai",
  store: true,
});
export const testAI = async (req, res) => {
  try {
    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "تو دستیار OceanAI هستی؛ پاسخ‌ها باید کوتاه، دقیق و حرفه‌ای باشند."
        },
        {
          role: "user",
          content: "write a haiku about ai"
        }
      ],
      store: true
    });

    res.json({
      success: true,
      result: response.output_text
    });
  } catch (err) {
    console.error("❌ OceanAI API Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در اتصال به API OceanAI"
    });
  }
};
