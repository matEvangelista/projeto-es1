-- insere discente
insert into usuario (matricula, nome, email, telefone, tipo ,senha) values ('202311250001', 'Mateus Alcântara', 'mateus.alcantara@gmail.com', '21999999999', 'discente', '123456');
INSERT INTO discente (matricula_discente) VALUES ('202311250001');

-- insere docente
insert into usuario (matricula, nome, email, telefone, tipo, senha) values ('202311250002', 'Jobson', 'jobson@gmail.com', '21999999999', 'docente', '123456');
insert into docente (matricula_docente, siape) values ('202311250002', '202311250002');

-- insere diretor
insert into usuario(matricula, nome, email, telefone, tipo, senha) values ('202311250003','Andreatta', 'andreatta@gmail.com', '21999999999', 'diretor', '123456');
INSERT into diretor (matricula_diretor) values ('202311250003');

-- insere adminnome
insert into administrador (nome) values ('Pedro');

-- insere sala
INSERT into sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) values ('Anexo II', 'Sala normal', 'Prédio do CCET', 15, 'Televisão', 1, 'sala 1');
INSERT into sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) values ('Laboratório I', 'Laboratório', 'Prédio do CCET',40, 'iMacs', 1, 'sala 2 ');
INSERT into sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) values ('Laboratório II', 'Laboratório', 'Prédio do CCET',40, 'Computadores que funcionam :)', 0, 'sala 3');
INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) VALUES ('Sala de Entrevistas', 'Entrevista', 'Edifício de Recursos Humanos, 5º Andar', 3, 'Cadeiras confortáveis, Mesa de entrevista, Iluminação adequada', 1, 'sala 4');
INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) VALUES ('Sala de Estudos II', 'Estudo', 'Biblioteca, 2º Andar', 12, 'Mesas individuais, Iluminação regulável, Tomadas elétricas', 1, 'sala 5');
INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) VALUES ('Sala de Palestras', 'Palestra', 'Edifício de Eventos, 1º Andar', 80, 'Palco, Projetor, Cadeiras', 0, 'sala 6');
INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) VALUES ('Sala de Reuniões B', 'Reunião', 'Edifício Secundário, 3º Andar', 20, 'Projetor, Quadro branco, Cadeiras', 1, 'sala 7');
INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel, descricao) VALUES ('Laboratório III', 'Laboratório', 'Edifício de Ciências, 4º Andar', 15, 'Equipamentos científicos, Bancadas, Computadores', 1, 'sala 8');


-- insere reserva automática
insert into reserva (descricao, aberta, dia_semana_1, tipo_reserva)
values ('Aluno quer estudar', 1, 'SEGUNDA-FEIRA', 'AUTOMATICA');
insert into reserva_automatica (sala_id, usuario_matricula, data, id)
values (1, '202311250001', '2023-12-18', (SELECT r.id
from reserva r
order by id desc
limit 1));

-- insere reserva recorrente
insert into reserva (descricao, aberta, dia_semana_1, dia_semana_2, tipo_reserva)
values ('Aulas de PCS/S1', 1, 'SEGUNDA-FEIRA', 'QUARTA-FEIRA', 'RECORRENTE');

insert into reserva_recorrente(matricula_diretor, sala_id, data_inicio, data_fim, docente_siape, docente_matricula, id)
values ('202311250003', 1, '2023-02-01', '2023-06-30', '202311250002', '202311250002', (SELECT r.id
from reserva r
order by id desc
limit 1));

-- insere reserva sob autorizacao
insert into reserva (descricao, aberta, dia_semana_1, dia_semana_2, tipo_reserva)
values ('Aulas de deep learning', 0, 'SEGUNDA-FEIRA', 'QUARTA-FEIRA', 'SOB AUTORIZACAO');

insert into reserva_sob_autorizacao (sala_id, usuario_matricula, administrador_id, aceito, data, em_analise)
values (1, '202311250002', 1, 0, '2023-01-25', (SELECT r.id
from reserva r
order by id desc
limit 1));

-- aprovação da reserva sob autorizacao:
UPDATE reserva_sob_autorizacao
set aceito = 1, justificativa = 'É uma matéria muito importante', em_analise = 0
where id = 3;

UPDATE reserva
set aberta = 1
WHERE id = 3;

-- insere reserva sob autorizacao
insert into reserva (descricao, aberta, dia_semana_1, dia_semana_2, dia_semana_3 ,tipo_reserva)
values ('Aulas de Álgebra Linear', 0, 'SEGUNDA-FEIRA', 'QUARTA-FEIRA', 'SEXTA-FEIRA', 'RECORRENTE');

insert into reserva_sob_autorizacao (sala_id, usuario_matricula, administrador_id, aceito, data, em_analise)
values (5, '202311250002', 1, 0, '2024-12-25', (SELECT r.id
from reserva r
order by id desc
limit 1));


