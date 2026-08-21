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
