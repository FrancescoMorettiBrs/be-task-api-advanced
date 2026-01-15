import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/tasks.controller.js";

const router = express.Router();

// GET /tasks
router.get("/", getAllTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;
