/**
 * OceanAI — Main Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  getStats,
  saveSettings
} from "../controllers/oceanaiController.js";

const router = express.Router();

/* ------------------------------
   آمار داشبورد — Dashboard Stats
   (کاملاً متصل به API)
------------------------------ */
router.get("/stats", getStats);

/* ------------------------------
   ذخیره تنظیمات — Save Settings
   (با validate + اتصال API)
------------------------------ */
router.post(
  "/settings",
  validate([
    { field: "darkMode", required: true, type: "boolean" },
    { field: "email", required: true, min: 5 }
  ]),
  saveSettings
);

export default router;
