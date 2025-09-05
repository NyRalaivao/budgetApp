import pool from "../db.js";
import path from "path";

// Lister les dépenses d’un utilisateur
export const getExpense = async (req, res) => {
  const { user_id } = req.query; // 🔑 récupère dans l’URL
  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id=$1 ORDER BY date DESC",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("getExpenses:", err);
    res.status(500).json({ error: err.message });
  }
};

// Créer une dépense
export const createExpense = async (req, res) => {
  const { user_id, amount, category, description, date, type, startDate, endDate } = req.body;
  const receipt = req.file ? req.file.filename : null;

  try {
    const newExpense = await pool.query(
      `INSERT INTO expenses (user_id, amount, category, description, date, type, start_date, end_date, receipt)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [user_id, amount, category, description, date, type || "one-time", startDate || null, endDate || null, receipt]
    );
    res.status(201).json(newExpense.rows[0]);
  } catch (err) {
    console.error("addExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { user_id, amount, category, description, date, type, startDate, endDate } = req.body;
  const receipt = req.file ? req.file.filename : null;

  try {
    const result = await pool.query(
      `UPDATE expenses
       SET amount=$1, category=$2, description=$3, date=$4, type=$5, start_date=$6, end_date=$7, receipt=COALESCE($8, receipt)
       WHERE id=$9 AND user_id=$10 RETURNING *`,
      [amount, category, description, date, type || "one-time", startDate || null, endDate || null, receipt, id, user_id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("updateExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Supprimer
export const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      "DELETE FROM expenses WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, user_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Dépense non trouvée" });
    res.json({ message: "Dépense supprimée" });
  } catch (err) {
    console.error("deleteExpense:", err);
    res.status(500).json({ error: err.message });
  }
};

// Télécharger un reçu
export const getReceipt = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    const result = await pool.query(
      "SELECT receipt FROM expenses WHERE id=$1 AND user_id=$2",
      [id, user_id]
    );
    if (result.rows.length === 0 || !result.rows[0].receipt) {
      return res.status(404).json({ error: "Reçu non trouvé" });
    }
    const filePath = path.join(process.cwd(), "src/uploads", result.rows[0].receipt);
    res.download(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
