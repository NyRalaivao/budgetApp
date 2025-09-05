// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import expenseRoute from "./routes/expense.route.js";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

// --- Connexion PostgreSQL ---
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch(err => console.error("❌ Erreur connexion PostgreSQL", err));

// --- Initialiser Express ---
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// --- Dossier pour les fichiers reçus ---
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// --- Routes ---
app.use("/api/expenses", expenseRoute);

// --- Route test ---
app.get("/", (req, res) => {
  res.send("🚀 API BudgetApp en marche !");
});

// --- Lancer serveur ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

// --- Exporter pool pour l’utiliser dans les controllers ---
export { pool };
