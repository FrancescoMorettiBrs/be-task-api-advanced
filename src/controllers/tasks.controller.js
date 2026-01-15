import pool from "../db/connection.js";

// GET
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

// GET /:id
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

// POST
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

// PUT /:id
export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, status, priority } = req.body;

    // Validazione di almeno un campo
    if (!title && !status && !priority) {
      return res.status(400).json({
        success: false,
        message: "Specificare almeno un campo da aggiornare",
      });
    }

    // Controllo se la task esiste
    const [existing] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    // Qui faccio un controllo
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task non trovata",
      });
    }

    // Uso i valori esistenti come fallback
    const updatedTitle = title ?? existing[0].title;
    const updatedStatus = status ?? existing[0].status;
    const updatedPriority = priority ?? existing[0].priority;

    // Query
    await pool.query("UPDATE tasks SET title = ?, status = ?, priority = ? WHERE id = ?", [updatedTitle, updatedStatus, updatedPriority, id]);

    // Recupero la task aggiornata
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
}
