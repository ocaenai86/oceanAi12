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
  timeout: 30000, // جلوگیری از هنگ کردن سرور
});

/* ------------------------------
   مدل‌های OceanAI (Registry)
------------------------------ */
export const oceanaiModels = {
  idea: "gpt-4o-mini",        // ماشین تولید ایده
  code: "gpt-4o-code",        // CodeStudio
  content: "gpt-4o-content",  // Content Engine
  automation: "gpt-4o-pro"    // Automation Builder
};

/* ------------------------------
   تابع امن برای درخواست‌ها
------------------------------ */
export async function oceanaiSafeCall(fn, payload = {}) {
  try {
    const response = await fn(payload);
    return { success: true, data: response };
  } catch (err) {
    console.error("❌ OceanAI AI Error:", err);
    return {
      success: false,
      error: err?.message || "خطا در ارتباط با OceanAI",
    };
  }
}

export default aiClient;
