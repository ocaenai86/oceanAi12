/**
 * OceanAI — Unified AI Client
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import OpenAI from "openai";

/* ------------------------------
   بررسی وجود کلید API
------------------------------ */
if (!process.env.OCEANAI_API_KEY) {
  console.error("❌ خطا: کلید OCEANAI_API_KEY تنظیم نشده است.");
  throw new Error("OceanAI API key is missing.");
}

/* ------------------------------
   ساخت کلاینت اصلی OceanAI
------------------------------ */
const aiClient = new OpenAI({
  apiKey: process.env.OCEANAI_API_KEY,
  timeout: 30000 // جلوگیری از هنگ کردن سرور
});

export default aiClient;
