import pool from "../db/connection.js";

export async function getAllTasks(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Errore nel recupero delle task", error.message);

    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    // Se non esiste una task con quell'id
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task non trovata",
      });
    }

    // Se trovo la task
    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, status = "todo", priority = "medium" } = req.body;

    // Validazione
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Il campo 'title' è obbligatorio",
      });
    }

    // Query
    const [result] = await pool.query("INSERT INTO tasks (title, status, priority) VALUES (?, ?, ?)", [title.trim(), status, priority]);

    // Recupero la task che ho creato
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);

    res.status(201).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}
