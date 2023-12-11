DELIMITER //

CREATE PROCEDURE InsertReserva(
    IN p_descricao VARCHAR(250),
    IN p_aberta INTEGER,
    IN p_dia_semana_1 VARCHAR(250),
    IN p_dia_semana_2 VARCHAR(250),
    IN p_dia_semana_3 VARCHAR(250),
    IN p_tipo_reserva VARCHAR(250)
)
BEGIN
    INSERT INTO reserva (descricao, aberta, dia_semana_1, dia_semana_2, dia_semana_3, tipo_reserva)
    VALUES (p_descricao, p_aberta, p_dia_semana_1, p_dia_semana_2, p_dia_semana_3, p_tipo_reserva);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE InsertSala(
    IN p_nome VARCHAR(250),
    IN p_tipo VARCHAR(250),
    IN p_localizacao VARCHAR(250),
    IN p_lotacao INTEGER,
    IN p_recursos VARCHAR(250),
    IN p_disponivel INTEGER
)
BEGIN
    INSERT INTO sala (nome, tipo, localizacao, lotacao, recursos, disponivel)
    VALUES (p_nome, p_tipo, p_localizacao, p_lotacao, p_recursos, p_disponivel);
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE InsertUsuario(
    IN p_matricula VARCHAR(250),
    IN p_nome VARCHAR(250),
    IN p_email VARCHAR(250),
    IN p_telefone VARCHAR(11)
)
BEGIN
    INSERT INTO usuario (matricula, nome, email, telefone, senha, role)
    VALUES (p_matricula, p_nome, p_email, p_telefone, '123456', 'discente');
END

//
