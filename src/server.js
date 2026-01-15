import express from "express";
import cors from "cors";
import pool from "./db/connection.js";
import taskRoutes from "./routes/tasks.routes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

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

app.use("/tasks", taskRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});


