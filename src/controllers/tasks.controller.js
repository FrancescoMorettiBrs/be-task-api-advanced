import pool from "../db/connection.js";

// Helper /:id
async function findTaskById(id) {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  return rows[0] || null;
}

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
    next(error);
  }
}

// GET /:id
export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;

    const task = await findTaskById(id);

    // Se non esiste una task con quell'id
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task non trovata",
      });
    }

    // Se trovo la task
    res.json({
      success: true,
      data: task,
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
    const task = await findTaskById(id);

    // Qui faccio un controllo
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task non trovata",
      });
    }

    // Uso i valori esistenti come fallback
    const updatedTitle = title ?? task.title;
    const updatedStatus = status ?? task.status;
    const updatedPriority = priority ?? task.priority;

    await pool.query("UPDATE tasks SET title = ?, status = ?, priority = ? WHERE id = ?", [updatedTitle, updatedStatus, updatedPriority, id]);

    // Recupero la task aggiornata
    const updatedTask = await findTaskById(id);

    res.json({
      success: true,
      data: updateTask,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;

    // Controllo se la task esiste
    const task = await findTaskById(id);

    // Validazione
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task non trovata",
      });
    }

    // Elimino la task
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Task eliminata con successo",
    });
  } catch (error) {
    next(error);
  }
}
