/**
 * OceanAI — Projects Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

/* ------------------------------
   ایجاد پروژه جدید — Create Project
------------------------------ */
export const createProject = async (req, res) => {
  try {
    const { title, description, html, css, js } = req.body;

    // در آینده ذخیره واقعی در دیتابیس:
    // await ProjectModel.create({ title, description, html, css, js, userId: req.user.id });

    res.json({
      success: true,
      message: "پروژه با موفقیت ایجاد شد.",
      data: { title, description, html, css, js }
    });
  } catch (err) {
    console.error("❌ OceanAI Create Project Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در ایجاد پروژه OceanAI"
    });
  }
};

/* ------------------------------
   دریافت لیست پروژه‌ها — Get Projects
------------------------------ */
export const getProjects = async (req, res) => {
  try {
    // در آینده اتصال واقعی به دیتابیس:
    // const projects = await ProjectModel.find({ userId: req.user.id });

    const projects = [
      {
        id: "p001",
        title: "طراحی سایت شرکتی",
        description: "یک سایت شرکتی با HTML/CSS/JS",
        createdAt: "2024-01-12"
      },
      {
        id: "p002",
        title: "اتوماسیون کسب‌وکار",
        description: "سیستم اتوماسیون برای مدیریت مشتریان",
        createdAt: "2024-02-03"
      }
    ];

    res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    console.error("❌ OceanAI Get Projects Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در دریافت پروژه‌ها"
    });
  }
};

/* ------------------------------
   دریافت یک پروژه — Get Single Project
------------------------------ */
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    // در آینده اتصال واقعی:
    // const project = await ProjectModel.findById(id);

    const project = {
      id,
      title: "نمونه پروژه OceanAI",
      description: "پروژه نمونه برای نمایش جزئیات",
      html: "<h1>Hello OceanAI</h1>",
      css: "body { background: #111; color: #fff; }",
      js: "console.log('OceanAI Project Loaded');"
    };

    res.json({
      success: true,
      data: project
    });
  } catch (err) {
    console.error("❌ OceanAI Get Project Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در دریافت پروژه OceanAI"
    });
  }
};

/* ------------------------------
   بروزرسانی پروژه — Update Project
------------------------------ */
export const updateProject = async
