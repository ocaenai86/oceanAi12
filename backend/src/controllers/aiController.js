import aiClient from '../config/aiClient.js';

export const generateIdea = async (req, res) => {
  try {
    const { prompt, context } = req.body;
    const response = await aiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        { role: 'system', content: 'تو دستیار OceanAI هستی؛ تمرکزت روی طراحی، اتوماسیون و کسب درآمد است.' },
        { role: 'user', content: `پرامپت: ${prompt}\nکانتکست: ${context || 'بدون کانتکست اضافی'}` },
      ],
    });
    res.json({ result: response.output_text });
  } catch (err) {
    res.status(500).json({ error: 'خطا در ارتباط با OceanAI' });
  }
};
