/**
 * OceanAI — Projects Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/projectsController.js";

const router = express.Router();

/* ------------------------------
   ایجاد پروژه جدید — Create Project
------------------------------ */
router.post(
  "/create",
  validate([
    { field: "title", required: true, min: 3 },
    { field: "description", required: false },
    { field: "html", required: false },
    { field: "css", required: false },
    { field: "js", required: false }
  ]),
  createProject
);

/* ------------------------------
   دریافت لیست پروژه‌ها — Get All Projects
------------------------------ */
router.get("/list", getProjects);

/* ------------------------------
   دریافت یک پروژه — Get Single Project
------------------------------ */
router.get("/item/:id", getProjectById);

/* ------------------------------
   بروزرسانی پروژه — Update Project
------------------------------ */
router.put(
  "/update/:id",
  validate([
    { field: "title", required: false, min: 3 },
    { field: "description", required: false },
    { field: "html", required: false },
    { field: "css", required: false },
    { field: "js", required: false }
  ]),
  updateProject
);

/* ------------------------------
   حذف پروژه — Delete Project
------------------------------ */
router.delete("/delete/:id", deleteProject);

export default router;
