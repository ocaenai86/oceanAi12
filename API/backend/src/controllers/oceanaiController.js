/**
 * OceanAI — Main Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import aiClient from "../config/aiClient.js";

/* ------------------------------
   آمار داشبورد — Dashboard Stats
   (نسخهٔ پیشرفته + اتصال به API)
------------------------------ */
export const getStats = async (req, res) => {
  try {
    // نمونهٔ اتصال به API برای تولید آمار هوشمند
    const aiResponse = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "تو دستیار OceanAI هستی؛ آمار داشبورد را تحلیل کن."
        },
        {
          role: "user",
          content: "آمار کلی OceanAI را تولید کن."
        }
      ],
      store: false
    });

    res.json({
      success: true,
      projects: 12,
      income: 4500000,
      ideas: 87,
      ai_summary: aiResponse.output_text
    });
  } catch (err) {
    console.error("❌ OceanAI Stats Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در دریافت آمار OceanAI"
    });
  }
};

/* ------------------------------
   ذخیره تنظیمات کاربر — Save User Settings
   (نسخهٔ پیشرفته + اتصال به API)
------------------------------ */
export const saveSettings = async (req, res) => {
  try {
    const { darkMode, email } = req.body;

    // نمونهٔ اتصال به API برای تحلیل تنظیمات
    const aiResponse = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "تنظیمات کاربر را تحلیل کن و یک خلاصهٔ هوشمند بده."
        },
        {
          role: "user",
          content: `darkMode: ${darkMode}, email: ${email}`
        }
      ],
      store: false
    });

    res.json({
      success: true,
      settings: { darkMode, email },
      ai_summary: aiResponse.output_text
    });
  } catch (err) {
    console.error("❌ OceanAI Settings Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در ذخیره تنظیمات OceanAI"
    });
  }
};
