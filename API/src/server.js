/**
 * OceanAI — Backend Server
 * نسخهٔ پیشرفته، امن، یکپارچه و هماهنگ با معماری oceanAI2
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import aiRoutes from "./routes/ai.js";
import oceanaiRoutes from "./routes/oceanai.js";

dotenv.config();

const app = express();

/* ------------------------------
   Middleware
------------------------------ */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ------------------------------
   API Routes
------------------------------ */
app.use("/api/ai", aiRoutes);
app.use("/api/oceanai", oceanaiRoutes);

/* ------------------------------
   Root Route
------------------------------ */
app.get("/", (req, res) => {
  res.json({
    status: "OceanAI Backend Running",
    version: "1.0.0",
    api: "/api/ai",
    oceanai: "/api/oceanai"
  });
});

/* ------------------------------
   Start Server
------------------------------ */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🌊 OceanAI Backend running on port ${PORT}`);
});
