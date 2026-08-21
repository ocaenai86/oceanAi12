import express from "express";
import { generateIdea, suggestPrompt } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", generateIdea);
router.post("/prompt-suggest", suggestPrompt);

export default router;
