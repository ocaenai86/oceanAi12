/**
 * OceanAI — Orders Controller
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import mongoose from "mongoose";

/* ------------------------------
   ثبت سفارش جدید — Create Order
------------------------------ */
export const createOrder = async (req, res) => {
  try {
    const { userId, items, total, status } = req.body;

    // در آینده ذخیره واقعی در دیتابیس:
    // await OrderModel.create({ userId, items, total, status });

    res.json({
      success: true,
      message: "سفارش با موفقیت ثبت شد.",
      data: { userId, items, total, status }
    });
  } catch (err) {
    console.error("❌ OceanAI Order Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در ثبت سفارش OceanAI"
    });
  }
};

/* ------------------------------
   دریافت لیست سفارش‌ها — Get Orders
------------------------------ */
export const getOrders = async (req, res) => {
  try {
    // در آینده اتصال واقعی به دیتابیس:
    // const orders = await OrderModel.find({ userId: req.user.id });

    const orders = [
      {
        id: "001",
        total: 120000,
        status: "completed",
        items: ["طراحی سایت", "اتوماسیون کسب‌وکار"]
      },
      {
        id: "002",
        total: 85000,
        status: "pending",
        items: ["تحلیل بازار دیجیتال"]
      }
    ];

    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    console.error("❌ OceanAI Orders Fetch Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در دریافت سفارش‌ها"
    });
  }
};

/* ------------------------------
   بروزرسانی سفارش — Update Order
------------------------------ */
export const updateOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // در آینده بروزرسانی واقعی:
    // await OrderModel.updateOne({ _id: orderId }, { status });

    res.json({
      success: true,
      message: "سفارش با موفقیت بروزرسانی شد.",
      data: { orderId, status }
    });
  } catch (err) {
    console.error("❌ OceanAI Order Update Error:", err);

    res.status(500).json({
      success: false,
      error: "خطا در بروزرسانی سفارش OceanAI"
    });
  }
};
