import express from "express";
import { pool } from "../database/db.js";

const router = express.Router();

// Listar pacientes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, u.nome AS criado_por_nome, f.tamanho AS tamanho_fila
       FROM paciente p
       JOIN usuario u ON p.criado_por = u.id
       JOIN fila_atendimento f ON p.fila_id = f.id
       ORDER BY p.id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar pacientes" });
  }
});

// Criar paciente
router.post("/", async (req, res) => {
  try {
    const { nome, num_ficha, prioridade, criado_por, fila_id } = req.body;

    const result = await pool.query(
      `INSERT INTO paciente (nome, num_ficha, prioridade, criado_por, fila_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nome, num_ficha, prioridade, criado_por, fila_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar paciente" });
  }
});

export default router;
