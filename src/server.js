import express from "express";
import cors from "cors";
import pool from "./db/connection.js";

const app = express();
const PORT = process.env.PORT;

// Middlewares globali
app.use(cors());
app.use(express.json());

async function testConnessioneDB() {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("Connessione al db riuscita");
  } catch (error) {
    console.error(error);
  }
}

// Rotta di test
app.get("/", (req, res) => {
  res.json({ message: "API attiva" });
});

testConnessioneDB();

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
