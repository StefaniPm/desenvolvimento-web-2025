// routes/usuarios.routes.js
import express from "express";
import { pool } from "../db.js"; // Importa conexão com Postgres

// Cria um router do Express
const router = express.Router();

/* ========== ROTAS DE USUÁRIOS ========== */

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuario ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

// Criar novo usuário
router.post("/", async (req, res) => {
  try {
    const { nome, email, senha_hash, papel } = req.body;
    const result = await pool.query(
      `INSERT INTO usuario (nome, email, senha_hash, papel)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nome, email, senha_hash, papel]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

export default router;
