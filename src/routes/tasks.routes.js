import express from "express";
import { getAllTasks, getTaskById } from "../controllers/tasks.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);
router.get("/:id", getTaskById);

export default router;
