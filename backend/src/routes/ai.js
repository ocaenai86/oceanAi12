import express from 'express';
import aiClient from '../config/aiClient.js';

const router = express.Router();

// تولید متن/ایده/پرامپت برای کسب‌درآمد، اتوماسیون، طراحی
router.post('/generate', async (req, res) => {
  try {
    const { prompt, context } = req.body;

    const response = await aiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content:
            'تو دستیار OceanAI هستی؛ تمرکزت روی اتوماسیون، طراحی سایت و اپ، فریلنسری و کسب درآمد است.',
        },
        {
          role: 'user',
          content: `پرامپت: ${prompt}\nکانتکست: ${context || 'بدون کانتکست اضافی'}`,
        },
      ],
    });

    res.json({ result: response.output_text || response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطا در ارتباط با هوش مصنوعی OceanAI' });
  }
});

// دستیار کدنویسی: تحلیل و اصلاح کد
router.post('/code-assistant', async (req, res) => {
  try {
    const { code, goal } = req.body;

    const response = await aiClient.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content:
            'تو دستیار کدنویسی OceanAI هستی؛ کد را تحلیل می‌کنی، بهینه می‌کنی و پیشنهاد می‌دهی.',
        },
        {
          role: 'user',
          content: `کد:\n${code}\nهدف:\n${goal || 'بهینه‌سازی و خوانایی بهتر'}`,
        },
      ],
    });

    res.json({ result: response.output_text || response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطا در دستیار کدنویسی OceanAI' });
  }
});
export default router;

import express from "express";
import { generateIdea, suggestPrompt } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateIdea);
router.post("/prompt-suggest", suggestPrompt);

export default router;
