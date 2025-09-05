import express from "express";
import { getExpense, createExpense, updateExpense, deleteExpense, getReceipt } from "../controllers/expense.controller.js";
import multer from "multer";
import path from "path";

// Configurer multer pour stocker les fichiers dans "uploads/"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "src/uploads"));
  },
  filename: function (req, file, cb) {
    // On ajoute la date pour éviter les doublons
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

const expenseRoute = express.Router();

// Routes dépenses
expenseRoute.get("/", getExpense);
expenseRoute.post("/", upload.single("receipt"), createExpense);   // upload de fichier
expenseRoute.put("/:id", upload.single("receipt"), updateExpense); // upload de fichier
expenseRoute.delete("/:id", deleteExpense);

// Télécharger un reçu
expenseRoute.get("/receipt/:id", getReceipt);

export default expenseRoute;
