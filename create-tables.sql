-- Table: usuario
CREATE TABLE usuario (
                         matricula VARCHAR(255) NOT NULL PRIMARY KEY,
                         nome VARCHAR(255) NOT NULL,
                         email VARCHAR(255) NOT NULL,
                         telefone VARCHAR(11) NOT NULL,
                         tipo VARCHAR(255) NOT NULL,
                         senha VARCHAR(255) NOT NULL,
                         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: docente
CREATE TABLE docente (
                         matricula_docente VARCHAR(255) NOT NULL,
                         siape VARCHAR(255) NOT NULL,
                         PRIMARY KEY (siape, matricula_docente),
                         FOREIGN KEY (matricula_docente) REFERENCES usuario (matricula),
                         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: discente
CREATE TABLE discente (
                          matricula_discente VARCHAR(255) NOT NULL PRIMARY KEY,
                          FOREIGN KEY (matricula_discente) REFERENCES usuario (matricula),
                          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: diretor
CREATE TABLE diretor (
                         matricula_diretor VARCHAR(255) NOT NULL PRIMARY KEY,
                         FOREIGN KEY (matricula_diretor) REFERENCES usuario (matricula),
                         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: administrador
CREATE TABLE administrador (
                               id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                               nome VARCHAR(255) NOT NULL,
                               createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: sala
CREATE TABLE sala (
                      id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      nome VARCHAR(255) NOT NULL,
                      tipo VARCHAR(255) NOT NULL,
                      localizacao VARCHAR(255) NOT NULL,
                      lotacao INTEGER NOT NULL,
                      recursos VARCHAR(255) NOT NULL,
                      disponivel INTEGER NOT NULL,
                      descricao VARCHAR(1000),
                      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reserva
CREATE TABLE reserva (
                         id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         descricao VARCHAR(255) NOT NULL,
                         aberta INTEGER NOT NULL,
                         dia_semana_1 VARCHAR(255) NOT NULL,
                         dia_semana_2 VARCHAR(255),
                         dia_semana_3 VARCHAR(255),
                         tipo_reserva VARCHAR(255) NOT NULL,
                         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reserva_automatica
CREATE TABLE reserva_automatica (
                                    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                    sala_id INTEGER NOT NULL,
                                    usuario_matricula VARCHAR(255) NOT NULL,
                                    data DATE,
                                    FOREIGN KEY (sala_id) REFERENCES sala (id),
                                    FOREIGN KEY (usuario_matricula) REFERENCES usuario (matricula),
                                    FOREIGN KEY (id) REFERENCES reserva (id),
                                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reserva_recorrente
CREATE TABLE reserva_recorrente (
                                    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                    matricula_diretor VARCHAR(255) NOT NULL,
                                    sala_id INTEGER NOT NULL,
                                    data_inicio DATE NOT NULL,
                                    data_fim DATE NOT NULL,
                                    docente_siape VARCHAR(255) NOT NULL,
                                    docente_matricula VARCHAR(255) NOT NULL,
                                    FOREIGN KEY (matricula_diretor) REFERENCES usuario (matricula),
                                    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: reserva_sob_autorizacao
CREATE TABLE reserva_sob_autorizacao (
                                         id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                         sala_id INTEGER NOT NULL,
                                         usuario_matricula VARCHAR(255) NOT NULL,
                                         administrador_id INTEGER NOT NULL,
                                         justificativa VARCHAR(255),
                                         em_analise INTEGER,
                                         aceito INTEGER,
                                         data DATE,
                                         FOREIGN KEY (sala_id) REFERENCES sala (id),
                                         FOREIGN KEY (usuario_matricula) REFERENCES usuario (matricula),
                                         FOREIGN KEY (administrador_id) REFERENCES administrador (id),
                                         FOREIGN KEY (id) REFERENCES reserva (id),
                                         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
