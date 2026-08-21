import express from "express";
import { getStats, saveSettings } from "../controllers/oceanaiController.js";

const router = express.Router();

router.get("/stats", getStats);
router.post("/settings", saveSettings);

export default router;
