// src/routes/streamRoutes.js

import express from "express";
import { streamChat } from "../controllers/streamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Route
router.post("/", protect, streamChat);

export default router;