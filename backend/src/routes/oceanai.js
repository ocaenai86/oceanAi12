/**
 * OceanAI — Main Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و کاملاً متصل به API
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
   این بخش مستقیماً به کنترلر و دیتابیس وصل است
------------------------------ */
router.get("/stats", getStats);

/* ------------------------------
   ذخیره تنظیمات کاربر — Save User Settings
   این بخش از validate استفاده می‌کند و سپس به API کنترلر وصل می‌شود
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
