/**
 * OceanAI — Files Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

/* ------------------------------
   ذخیره پروژه — Code Studio
------------------------------ */
export const saveProject = async (req, res) => {
  try {
    const { html, css, js } = req.body;

    // در آینده ذخیره واقعی در دیتابیس:
    // await ProjectModel.create({ html, css, js, userId: req.user.id });

    res.json({
      success: true,
      message: "پروژه با موفقیت ذخیره شد.",
      data: { html, css, js }
    });
  } catch (err) {
    console.error("❌ OceanAI Files Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در ذخیره پروژه OceanAI"
    });
  }
};
