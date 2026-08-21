/**
 * OceanAI — AI Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import aiClient from "../config/aiClient.js";

/* ------------------------------
   تولید ایده — Generate Idea
------------------------------ */
export const generateIdea = async (req, res) => {
  try {
    const { prompt, context, mode } = req.body;

    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            mode === "personal"
              ? "تو دستیار شخصی OceanAI هستی؛ روی اتوماسیون، تحلیل داده، و استراتژی‌های کسب درآمد برای صاحب سیستم تمرکز کن."
              : "تو دستیار عمومی OceanAI هستی؛ برای کاربران ایده‌های اتوماسیون، طراحی، فریلنسری و کسب درآمد تولید کن."
        },
        {
          role: "user",
          content: `پرامپت: ${prompt}\nکانتکست: ${context || "بدون کانتکست اضافی"}`
        }
      ],
      store: true
    });

    res.json({
      success: true,
      result: response.output_text
    });
  } catch (err) {
    console.error("❌ OceanAI GenerateIdea Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در ارتباط با OceanAI"
    });
  }
};

/* ------------------------------
   پیشنهاد پرامپت — Suggest Prompt
------------------------------ */
export const suggestPrompt = async (req, res) => {
  try {
    const { base } = req.body;

    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "پرامپت‌های بهتر برای اتوماسیون، فریلنسری، طراحی سایت، تحلیل بازار و کسب درآمد پیشنهاد بده. خروجی را لیستی کوتاه کن."
        },
        {
          role: "user",
          content: base
        }
      ],
      store: false
    });

    const text = response.output_text || "";
    const suggestions = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 5);

    res.json({
      success: true,
      suggestions
    });
  } catch (err) {
    console.error("❌ OceanAI SuggestPrompt Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در پیشنهاد پرامپت‌ها"
    });
  }
};
