/**
 * OceanAI — AI Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  generateIdea,
  suggestPrompt,
  testAI
} from "../controllers/aiController.js";

const router = express.Router();

/* ------------------------------
   تولید ایده — Generate Idea
------------------------------ */
router.post(
  "/generate",
  validate([
    { field: "prompt", required: true, min: 3 },
    { field: "context", required: false },
    { field: "mode", required: false }
  ]),
  generateIdea
);

/* ------------------------------
   پیشنهاد پرامپت — Suggest Prompt
------------------------------ */
router.post(
  "/suggest",
  validate([
    { field: "base", required: true, min: 3 }
  ]),
  suggestPrompt
);

/* ------------------------------
   تست اتصال API — Test AI API
------------------------------ */
router.get("/test", testAI);

export default router;
