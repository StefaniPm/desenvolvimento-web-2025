
CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  papel SMALLINT NOT NULL CHECK (papel IN (0,1)), -- 0=recepcionista,1=medico
  data_criacao TIMESTAMP NOT NULL DEFAULT now(),
  data_atualizacao TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE fila_atendimento (
  id SERIAL PRIMARY KEY,
  tamanho INTEGER NOT NULL DEFAULT 0,
  ult_atualizacao TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE paciente (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  num_ficha INTEGER NOT NULL,
  prioridade CHAR(1) NOT NULL CHECK (prioridade IN ('U','N')),
  data_entrada TIMESTAMP NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'Aguardando',
  data_atendimento TIMESTAMP,
  criado_por INT NOT NULL REFERENCES usuario(id),
  atualizado_por INT REFERENCES usuario(id),
  fila_id INT NOT NULL REFERENCES fila_atendimento(id)
);


INSERT INTO usuario (nome, email, senha_hash, papel) VALUES
('Ana Pires', 'ana@hospital.com', 'hash123', 0),
('Dr. Carlos', 'carlos@hospital.com', 'hash456', 1);


INSERT INTO fila_atendimento (tamanho) VALUES (0);


INSERT INTO paciente (nome, num_ficha, prioridade, criado_por, fila_id)
VALUES
('João Moreira', 12, 'U', 1, 1),
('Maria Souza', 13, 'N', 1, 1),
('Pedro Lima', 14, 'U', 1, 1);

--Teste 1
/*
SELECT * FROM paciente
WHERE status = 'Aguardando'
ORDER BY CASE WHEN prioridade = 'U' THEN 0 ELSE 1 END, data_entrada;
*/

--Teste 2 
/*
SELECT prioridade, COUNT(*) AS total
FROM paciente
WHERE status = 'Aguardando'
GROUP BY prioridade;
*/

--Teste 3
/*
UPDATE paciente
SET status = 'Atendido', data_atendimento = now()
WHERE id = (
  SELECT id FROM paciente
  WHERE status = 'Aguardando'
  ORDER BY CASE WHEN prioridade='U' THEN 0 ELSE 1 END, data_entrada
  LIMIT 1
)
RETURNING *;
*/

--Teste 4
/*
SELECT prioridade, COUNT(*) AS atendidos
FROM paciente
WHERE status = 'Atendido'
GROUP BY prioridade;
*/

--Teste 5

/*
UPDATE fila_atendimento
SET tamanho = (
  SELECT COUNT(*) FROM paciente WHERE status = 'Aguardando'
), ult_atualizacao = now()
WHERE id = 1;

*/