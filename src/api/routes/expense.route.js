import express from 'express';
import { getExpense, createExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js"

const expenseRoute = express.Router();

expenseRoute.get("/", getExpense);
expenseRoute.post("/", createExpense);
expenseRoute.put("/:id", updateExpense);
expenseRoute.delete("/:id", deleteExpense);

export default expenseRoute;