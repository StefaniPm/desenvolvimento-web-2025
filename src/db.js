// ===============================
// db.js - Configuração da conexão com PostgreSQL
// ===============================

// 1) Importa a classe Pool da biblioteca "pg"
//    Pool gerencia várias conexões abertas ao banco,
//    evitando abrir/fechar a cada query (melhora desempenho e estabilidade)
import { Pool } from "pg";

// 2) Importa a biblioteca dotenv para ler variáveis do arquivo .env
//    Assim, não precisamos deixar usuário e senha expostos no código
import dotenv from "dotenv";

// 3) Carrega as variáveis do arquivo .env para process.env
//    Se não houver .env, ele ignora e usa variáveis já definidas no sistema
dotenv.config();

// (Opcional) Apenas para depuração: imprime a senha lida do .env
//     Não use em produção por questão de segurança!
console.log("Senha lida do .env:", process.env.PGPASSWORD);

// 4) Cria o "pool" de conexões usando as variáveis do .env
//    As chaves do objeto são padrões do PostgreSQL.
const pool = new Pool({
  host: process.env.PGHOST,        // Endereço do servidor (ex.: "localhost")
  port: process.env.PGPORT,        // Porta do PostgreSQL (padrão: 5432)
  database: process.env.PGDATABASE,// Nome do banco de dados
  user: process.env.PGUSER,        // Usuário do banco
  password: process.env.PGPASSWORD // Senha do usuário
});

// 5) Exporta o pool para ser usado em outros arquivos (ex.: server.js, rotas)
export { pool };
