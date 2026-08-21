import express from 'express';
import { saveProject } from '../controllers/filesController.js';

const router = express.Router();

router.post('/save', saveProject);

export default router;
