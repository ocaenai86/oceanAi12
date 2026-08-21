import aiClient from "../config/aiClient.js";

export const generateIdea = async (req, res) => {
  try {
    const { prompt, context } = req.body;

    const response = await aiClient.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: "تو دستیار OceanAI هستی؛ تمرکزت روی اتوماسیون، طراحی و کسب درآمد است." },
        { role: "user", content: `پرامپت: ${prompt}\nکانتکست: ${context || "بدون کانتکست"}` },
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
        { role: "system", content: "پرامپت‌های بهتر برای اتوماسیون و کسب درآمد پیشنهاد بده." },
        { role: "user", content: base },
      ],
    });

    const suggestions = response.output_text.split("\n").slice(0, 5);
    res.json({ suggestions });
  } catch {
    res.status(500).json({ error: "خطا در پیشنهاد پرامپت" });
  }
};
