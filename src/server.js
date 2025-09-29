// server.js
import express from "express";
import { pool } from "./db.js";

const app = express();
app.use(express.json());

/* ============================
   ROTAS PARA USUÁRIOS
============================ */

// Listar todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuario ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

// Criar novo usuário
app.post("/usuarios", async (req, res) => {
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

/* ============================
   ROTAS PARA FILA_ATENDIMENTO
============================ */

// Listar filas
app.get("/filas", async (req, res) => {
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
app.post("/filas", async (req, res) => {
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

/* ============================
   ROTAS PARA PACIENTES
============================ */

// Listar pacientes
app.get("/pacientes", async (req, res) => {
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
app.post("/pacientes", async (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`API rodando em http://localhost:${PORT}`)
);
