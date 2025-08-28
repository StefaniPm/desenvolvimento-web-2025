# Triagem+ - Fila de Prioridade para Triagem Hospitalar


## 1) Problema

 Recepcionistas e médicos em hospitais e unidades de saúde têm dificuldade em organizar a ordem de atendimento quando pacientes urgentes e não urgentes estão misturados. Isso pode causar atendimentos desordenados, aumento do tempo de espera para casos críticos e risco á vida humana.

 No início, o foco será organizar os pacientes com filas de prioridade,  com o objetivo de otimizar a triagem e garantir que os pacientes urgentes sejam priorizados, sem deixar de atender os demais em ordem correta.

## 2) Atores e Decisores (quem usa / quem decide)

Usuários principais: 
- Recepcionista do hospital (faz a triagem e insere pacientes na fila) Médicos/- Atendentes (consultam a fila para chamar os pacientes em ordem de prioridade).
- Pacientes (beneficiados pela organização da fila).

Decisores/Apoiadores: 
- Coordenação do hospital.
- Equipe de TI que vai validar a solução.
- Equipe de suporte para testes e feedback.

## 3) Casos de uso (de forma simples)

Todos: 
- Logar/deslogar no sistema 
- Manter dados cadastrais.

Recepcionista:
- Manter (criar, visualizar, editar, remover) registros de pacientes.
- Inserir pacientes na fila com prioridade (Urgente/Normal).
- Remover pacientes da fila (quando atendidos).

Médico/Atendente:
- Visualizar a lista de pacientes em ordem de prioridade.
- Atualizar status do paciente (em atendimento, atendido).

Coordenação:
- Consultar relatórios simples sobre a fila (quantos urgentes e normais atendidos).

## 4) Limites e suposições

Limites: O prazo final para entrega é de 6 semanas para a primeira fatia vertical, o sistema deve funcionar no navegador (não será disponibilizado versão mobile inicial) e a utilização obrigatória de Node.js para backend e PostgreSQL para o banco de dados. 

Suposições: Os usuários terão acesso à internet estável para atualizar o status de atendimento em tempo real, o navegador utilizado será atualizado e compatível com as versões mais recentes (Chrome, Firefox, Edge), o GitHub será usado para controle de versão e compartilhamento de código e a equipe de suporte disponível para testar o sistema e fornecer feedback durante a fase piloto.

Plano B:
Caso não seja possível implementar funcionalidades extras, a primeira versão será limitada a:
- Inserir pacientes (U/N).
- Consultar fila.
- Remover paciente do início da fila.

## 5) Hipóteses + validação
H-Valor: Se recepcionistas puderem inserir pacientes urgentes e normais em fila com prioridade, então a triagem será mais justa e organizada, reduzindo o tempo de espera de casos críticos.

H-Viabilidade: Teste com equipes hospitalares; sucesso se a maioria conseguir  consultar status corretamente. Com Node.js e PostgreSQL, a criação e visualização de fila de pacientes leva até 2 segundos para a maioria das interações.

## 6) Fluxo principal e primeira fatia
Fluxo principal (curto):
Recepcionista faz login.
Insere paciente com número de ficha e prioridade.
Sistema posiciona paciente corretamente na fila.
Médico consulta a ordem de atendimento.
Paciente é atendido e removido da fila.

Primeira fatia vertical (escopo mínimo):

Inclui: Tela de login, Inserção de paciente (U/N), Listagem da fila, Remoção do primeiro paciente.
  
Critérios de aceite:
- Paciente normal vai para o final da fila.
- Paciente urgente é inserido no grupo de urgentes.
- Impressão da fila mostra todos em ordem correta.

## 7) Esboços de algumas telas (wireframes)
<!-- Vale desenho no papel (foto), Figma, Excalidraw, etc. Não precisa ser bonito, precisa ser claro.
     EXEMPLO de telas:
     • Login
     • Lista de chamados (ordem + tempo desde criação)
     • Novo chamado (formulário simples)
     • Painel do professor (atender/encerrar)
     EXEMPLO de imagem:
     ![Wireframe - Lista de chamados](img/wf-lista-chamados.png) -->
[Links ou imagens dos seus rascunhos de telas aqui]

## 8) Tecnologias
<!-- Liste apenas o que você REALMENTE pretende usar agora. -->

### 8.1 Navegador
Navegador: HTML/CSS/JS | Vue.js (para o front-end interativo) Armazenamento local (se usar): LocalStorage (para armazenamento de sessões ou dados temporários) Hospedagem: Netlify ou Vercel (para deploy rápido da aplicação front-end)


### 8.2 Front-end (servidor de aplicação, se existir)
Front-end (servidor): Vue.js com Vue Router e Tailwind CSS (para estilização rápida e responsiva) Hospedagem: Netlify ou Vercel (plataformas que suportam deploys automáticos e integração com GitHub)


### 8.3 Back-end (API/servidor, se existir)
Back-end (API): Node.js com Express.js (para a criação da API RESTful) Banco de dados: PostgreSQL (para armazenamento de dados de pedidos, veículos, motoristas e status) Deploy do back-end: Heroku ou Render (para deploy de aplicações Node.js com banco de dados PostgreSQL)


## 9) Plano de Dados (Dia 0) — somente itens 1–3


### 9.1 Entidades

- Usuário → representa os funcionários do hospital (recepcionistas e médicos) que interagem com o sistema.

- Paciente → representa os pacientes cadastrados no sistema, com dados pessoais, ficha e prioridade.

- Fila de Atendimento → representa a fila dinâmica de pacientes aguardando atendimento, organizada pela prioridade das fichas (U e N)

### 9.2 Campos por entidade


### Usuário
| Campo           | Tipo                          | Obrigatório | Exemplo            |
|-----------------|-------------------------------|-------------|--------------------|
| id              | número                        | sim         | 1                  |
| nome            | texto                         | sim         | "Ana Pires"        |
| email           | texto                         | sim (único) | "ana@hospital.com" |
| senha_hash      | texto                         | sim         | "$2a$10$..."       |
| papel           | (0=recepcionista, 1=médico)   | sim         | 0                  |
| dataCriacao     | data/hora                     | sim         | 2025-08-27 14:30   |
| dataAtualizacao | data/hora                     | sim         | 2025-08-27 15:10   |

### Paciente
| Campo           | Tipo                          | Obrigatório | Exemplo            |
|-----------------|-------------------------------|-------------|--------------------|
| id              | número                        | sim         | 1                  |
| nome            | texto                         | sim         | "João Moreira"     |
| numFicha        | número                        | sim         | 12                 |
| prioridade      | char                          | sim         | 'U' | 'N'          |
| dataEntrada     | data/hora                     | sim         | 2025-08-27 09:15   |
| status          | texto                         | sim         | "Aguardando"       |
| dataAtendimento | data/hora                     | não         | 2025-08-27 09:50   |


### Fila de Atendimento
| Campo           | Tipo               | Obrigatório | Exemplo                 |
|-----------------|--------------------|-------------|-------------------------|
| id              | número             | sim         | 1                       |
| pacientes       | lista (Array JS)   | sim         | [Paciente1, Paciente2,…]|
| tamanho         | número             | sim         | 7                       |
| ultAtualizacao  | data/hora          | sim         | 2025-08-27 09:20        |


### 9.3 Relações entre entidades
- Um Usuário (recepcionista) pode cadastrar muitos Pacientes (1→N).
- Um Paciente é cadastrado por um único Usuário (N→1).
- Uma Fila de Atendimento contém muitos Pacientes (1→N).
- Um Paciente pertence a uma única Fila de Atendimento (N→1).
