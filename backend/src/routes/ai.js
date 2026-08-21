/**
 * OceanAI — AI Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  generateIdea,
  suggestPrompt,
  analyzeCode
} from "../controllers/aiController.js";

const router = express.Router();

/* ------------------------------
   تولید ایده / متن / پرامپت — Idea Machine
------------------------------ */
router.post(
  "/generate",
  validate([
    { field: "prompt", required: true, min: 3 },
    { field: "context", required: false }
  ]),
  generateIdea
);

/* ------------------------------
   پیشنهاد پرامپت — Prompt Suggester
------------------------------ */
router.post(
  "/suggest",
  validate([{ field: "base", required: true, min: 3 }]),
  suggestPrompt
);

/* ------------------------------
   دستیار کدنویسی — Code Assistant
------------------------------ */
router.post(
  "/code-assistant",
  validate([
    { field: "code", required: true, min: 5 },
    { field: "goal", required: true, min: 3 }
  ]),
  analyzeCode
);

export default router;
