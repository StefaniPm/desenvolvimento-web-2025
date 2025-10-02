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
