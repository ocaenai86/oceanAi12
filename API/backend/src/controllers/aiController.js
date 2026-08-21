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
    const { prompt, context } = req.body;

    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "تو دستیار OceanAI هستی؛ تمرکزت روی اتوماسیون، طراحی سایت و اپ، فریلنسری و کسب درآمد است."
        },
        {
          role: "user",
          content: `پرامپت: ${prompt}\nکانتکست: ${context || "بدون کانتکست"}`
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
            "پرامپت‌های بهتر برای اتوماسیون، طراحی، فریلنسری و کسب درآمد پیشنهاد بده."
        },
        {
          role: "user",
          content: base
        }
      ],
      store: true
    });

    const suggestions = response.output_text
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 5);

    res.json({
      success: true,
      suggestions
    });
  } catch (err) {
    console.error("❌ OceanAI API Error:", err);
    res.status(500).json({
      success: false,
      error: "خطا در پیشنهاد پرامپت"
    });
  }
};
