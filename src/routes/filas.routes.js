import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Listar filas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM fila_atendimento ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar filas" });
  }
});

// Criar fila
router.post("/", async (req, res) => {
  try {
    const { tamanho } = req.body;
    const result = await pool.query(
      `INSERT INTO fila_atendimento (tamanho)
       VALUES ($1)
       RETURNING *`,
      [tamanho || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar fila" });
  }
});

export default router;
