import pool from "../db/connection.js";

export async function getAllTasks(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error("Errore nel recupero delle task", error.message);

    res.status(500).json({
      success: false,
      message: "Errore nel recupero delle task",
    });
  }
}
