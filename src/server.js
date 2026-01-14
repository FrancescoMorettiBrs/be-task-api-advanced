import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares globali
app.use(cors());
app.use(express.json());

// Rotta di test
app.get("/", (req, res) => {
  res.json({ message: "API attiva" });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
