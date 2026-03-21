CREATE TABLE usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('professor', 'aluno'))
);

CREATE TABLE escolas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cidade TEXT
);

CREATE TABLE professor_escola(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_professor INTEGER,
    id_escola INTEGER,
    FOREIGN KEY (id_professor) REFERENCES usuarios(id),
    FOREIGN KEY (id_escola) REFERENCES escolas(id)
);

CREATE TABLE turmas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    serie INTEGER,
    id_professor INTEGER,
    id_escola INTEGER,
    FOREIGN KEY (id_professor) REFERENCES usuarios(id),
    FOREIGN KEY (id_escola) REFERENCES escolas(id)
);

CREATE TABLE alunos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    id_turma INTEGER,
    idade INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (id_turma) REFERENCES turmas(id)
);

CREATE TABLE conteudos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_turma INTEGER,
    titulo TEXT,
    descricao TEXT,
    FOREIGN KEY (id_turma) REFERENCES turmas(id)
);

CREATE TABLE livros(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    texto TEXT,
    nivel INTEGER
);

CREATE TABLE quiz(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_livro INTEGER,
    pergunta TEXT,
    alternativa_a TEXT,
    alternativa_b TEXT,
    alternativa_c TEXT,
    alternativa_d TEXT,
    resposta_certa TEXT,
    FOREIGN KEY (id_livro) REFERENCES livros(id)
);

CREATE TABLE progresso(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_aluno INTEGER,
    id_livro INTEGER,
    pontuacao INTEGER,
    concluido BOOLEAN,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_livro) REFERENCES livros(id)
);

CREATE TABLE avaliacao_ia(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_progresso INTEGER,
    avaliacao TEXT,
    data TIMESTAMP,
    FOREIGN KEY (id_progresso) REFERENCES progresso(id)
);

-- INTEGRAÇÃO COM FLASK
-- Ativar foreign keys ao abrir conexão SQLite
-- Exemplo em Python:

-- conn = sqlite3.connect("database/database.db")
-- conn.execute("PRAGMA foreign_keys = ON")
