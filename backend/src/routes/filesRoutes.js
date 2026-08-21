/**
 * OceanAI — Files Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  saveProject,
  saveSingleFile,
  getProjectFiles,
  deleteFile
} from "../controllers/filesController.js";

const router = express.Router();

/* ------------------------------
   ذخیره کل پروژه — Save Full Project
   نسخهٔ حرفه‌ای و هماهنگ با OceanAI
------------------------------ */
router.post(
  "/save",
  validate([
    { field: "html", required: true },
    { field: "css", required: false },
    { field: "js", required: false }
  ]),
  saveProject
);

/* ------------------------------
   ذخیره یک فایل — Save Single File
------------------------------ */
router.post(
  "/file",
  validate([
    { field: "filename", required: true, min: 2 },
    { field: "type", required: true },
    { field: "content", required: true, min: 1 }
  ]),
  saveSingleFile
);

/* ------------------------------
   دریافت فایل‌های یک پروژه — Get Project Files
------------------------------ */
router.get("/project/:id", getProjectFiles);

/* ------------------------------
   حذف فایل — Delete File
------------------------------ */
router.delete("/file/:id", deleteFile);

export default router;
