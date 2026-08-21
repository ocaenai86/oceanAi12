/**
 * OceanAI — AI Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import aiClient, { oceanaiModels, oceanaiSafeCall } from "../config/aiClient.js";

/* ------------------------------
   تولید ایده — Idea Machine
------------------------------ */
export const generateIdea = async (req, res) => {
  const { prompt, context } = req.body;

  const payload = {
    model: oceanaiModels.idea,
    input: [
      {
        role: "system",
        content:
          "تو دستیار OceanAI هستی؛ تمرکزت روی طراحی، اتوماسیون، فریلنسری و مدل‌های کسب‌درآمد است."
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
