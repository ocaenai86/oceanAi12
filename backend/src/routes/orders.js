/**
 * OceanAI — Orders Routes
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI
 */

import express from "express";
import { validate } from "../middleware/validate.js";
import {
  createOrder,
  getOrders,
  updateOrder
} from "../controllers/ordersController.js";

const router = express.Router();

/* ------------------------------
   ثبت سفارش جدید — Create Order
------------------------------ */
router.post(
  "/create",
  validate([
    { field: "userId", required: true },
    { field: "items", required: true },
    { field: "total", required: true },
    { field: "status", required: false }
  ]),
  createOrder
);

/* ------------------------------
   دریافت لیست سفارش‌ها — Get Orders
------------------------------ */
router.get(
  "/list",
  getOrders
);

/* ------------------------------
   بروزرسانی سفارش — Update Order
------------------------------ */
router.put(
  "/update",
  validate([
    { field: "orderId", required: true },
    { field: "status", required: true }
  ]),
  updateOrder
);

export default router;
