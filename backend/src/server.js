/**
 * OceanAI — Unified Backend Server
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// اتصال به دیتابیس
import "./config/db.js";

// Route ها
import filesRoutes from "./routes/filesRoutes.js";
import projectsRoutes from "./routes/projects.js";
import ordersRoutes from "./routes/orders.js";
import aiRoutes from "./routes/ai.js";
import oceanaiRoutes from "./routes/oceanai.js";

dotenv.config();

const app = express();

/* ------------------------------
   Middlewares
------------------------------ */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ------------------------------
   API Routes
------------------------------ */
app.use("/api/files", filesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/oceanai", oceanaiRoutes);

/* ------------------------------
   Root Route
------------------------------ */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "OceanAI Backend API is running 🚀"
  });
});

/* ------------------------------
   Start Server
------------------------------ */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🌊 OceanAI backend running on port ${PORT}`);
});
