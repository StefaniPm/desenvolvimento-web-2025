import express from "express";
import dotenv from "dotenv";

// Importa as rotas
import usuariosRouter from "./routes/usuarios.routes.js";
import pacientesRouter from "./routes/pacientes.routes.js";
import filasRouter from "./routes/filas.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Rota raiz de teste
app.get("/api", (req, res) => {
  res.json({ message: "Bem-vindo à API de triagem" });
});

// Monta as rotas
app.use("/api/usuarios", usuariosRouter);
app.use("/api/pacientes", pacientesRouter);
app.use("/api/filas", filasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}/api`);
});
