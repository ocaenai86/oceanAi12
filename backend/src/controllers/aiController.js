import aiClient from "../config/aiClient.js";

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
              ? "تو دستیار شخصی OceanAI هستی؛ روی اتوماسیون و استراتژی کسب‌درآمد برای صاحب سیستم تمرکز کن."
              : "تو دستیار عمومی OceanAI هستی؛ برای کاربران ایده‌های اتوماسیون و فریلنسری تولید کن.",
        },
        {
          role: "user",
          content: `پرامپت: ${prompt}\nکانتکست: ${context || "بدون کانتکست اضافی"}`,
        },
      ],
    });

    res.json({ result: response.output_text });
  } catch (err) {
    res.status(500).json({ error: "خطا در ارتباط با OceanAI" });
  }
};

export const suggestPrompt = async (req, res) => {
  try {
    const { base } = req.body;

    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "پرامپت‌های بهتر برای اتوماسیون، فریلنسری، طراحی سایت و تحلیل بازار پیشنهاد بده. خروجی را لیستی کوتاه کن.",
        },
        { role: "user", content: base },
      ],
    });

    const text = response.output_text || "";
    const suggestions = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .slice(0, 5);

    res.json({ suggestions });
  } catch {
    res.status(500).json({ error: "خطا در پیشنهاد پرامپت‌ها" });
  }
};
