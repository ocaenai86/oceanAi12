/**
 * OceanAI — AI Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import aiClient, { oceanaiModels, oceanaiSafeCall } from "../config/aiClient.js";

/* ------------------------------
   تولید ایده — Idea Machine
------------------------------ */
export const generateIdea = async (req, res) => {
  const { prompt, context, mode } = req.body;

  const payload = {
    model: oceanaiModels.idea,
    input: [
      {
        role: "system",
        content:
          mode === "personal"
            ? "تو دستیار شخصی OceanAI هستی؛ روی اتوماسیون، استراتژی درآمد و توسعهٔ کسب‌وکار تمرکز کن."
            : "تو دستیار عمومی OceanAI هستی؛ برای کاربران ایده‌های اتوماسیون، فریلنسری و طراحی سایت تولید کن."
      },
      {
        role: "user",
        content: `پرامپت: ${prompt}\nکانتکست: ${context || "بدون کانتکست اضافی"}`
      }
    ]
  };

  const result = await oceanaiSafeCall(aiClient.responses.create, payload);

  if (!result.success) {
    return res.status(500).json({
      success: false,
      error: "خطا در ارتباط با OceanAI"
    });
  }

  res.json({
    success: true,
    result: result.data.output_text
  });
};

/* ------------------------------
   پیشنهاد پرامپت — Prompt Suggester
------------------------------ */
export const suggestPrompt = async (req, res) => {
  const { base } = req.body;

  const payload = {
    model: oceanaiModels.idea,
    input: [
      {
        role: "system",
        content:
          "پرامپت‌های بهتر برای اتوماسیون، فریلنسری، طراحی سایت و تحلیل بازار پیشنهاد بده. خروجی را لیستی کوتاه کن."
      },
      {
        role: "user",
        content: base
      }
    ]
  };

  const result = await oceanaiSafeCall(aiClient.responses.create, payload);

  if (!result.success) {
    return res.status(500).json({
      success: false,
      error: "خطا در پیشنهاد پرامپت‌ها"
    });
  }

  const text = result.data.output_text || "";
  const suggestions = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, 5);

  res.json({
    success: true,
    suggestions
  });
};
