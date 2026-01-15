import express from "express";
import { createTask, getAllTasks, getTaskById } from "../controllers/tasks.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);
// GET /tasks/:id
router.get("/:id", getTaskById);
// POST /tasks
router.post("/", createTask);

export default router;
