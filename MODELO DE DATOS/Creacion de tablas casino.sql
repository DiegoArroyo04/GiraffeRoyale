CREATE DATABASE CASINO;
USE CASINO;

CREATE TABLE USUARIO(
	DNI VARCHAR(9) NOT NULL COMMENT 'DNI del usuario',
    NOMBRE VARCHAR(100) NOT NULL COMMENT 'Nombre del usuario',
    APELLIDOS VARCHAR(500) NOT NULL COMMENT 'Apellidos del usuario',
    USERNAME VARCHAR(100) NOT NULL COMMENT 'Nombre de usuario',
    PASS VARCHAR(100) NOT NULL COMMENT 'Contraseña del usuario',
    EMAIL VARCHAR(200) NOT NULL COMMENT 'Email del usuario',	
    TELEFONO VARCHAR(9) NOT NULL COMMENT 'Telefono del usuario',
	FECHA_NACIMIENTO DATE NOT NULL COMMENT 'Fecha de nacimiento',
    FECHA_REGISTRO DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro automatica no hace falta especificarla',
    PRESUPUESTO DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Dinero que tiene el usuario',
    USUARIO_VIP BOOLEAN NOT NULL DEFAULT  FALSE COMMENT 'Especificacion de si el usuario es vip o no',
	TARJETA_CREDITO VARCHAR(16) COMMENT 'Número de tarjeta de crédito ',
    FECHA_EXPIRACION_TARJETA DATE COMMENT 'Fecha de expiración de la tarjeta de crédito',
    CVC_TARJETA INT(3) COMMENT 'Código de verificación de la tarjeta',
    CUENTA_BANCARIA VARCHAR(24) COMMENT 'Número de cuenta bancaria (IBAN)',
    TITULAR VARCHAR(200) COMMENT 'Nombre del titular de la cuenta bancaria o tarjeta',
	CONSTRAINT PK_USUARIO PRIMARY KEY (DNI)
);

CREATE TABLE JUEGO(
	ID_JUEGO BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Identificador del juego',
    NOMBRE VARCHAR(100) NOT NULL COMMENT 'Nombre del juego',
    CATEGORIA VARCHAR(100) NOT NULL COMMENT 'Tipo de juego',
    CONSTRAINT PK_JUEGO PRIMARY KEY (ID_JUEGO)
);

CREATE TABLE CONVERSION(
	ID_CONVERSION BIGINT AUTO_INCREMENT NOT NULL COMMENT 'Identificador de la conversion',
	ID_JUEGO BIGINT NOT NULL COMMENT 'Identificador del juego',
    EUROS DECIMAL(10,2) NOT NULL COMMENT 'Euros a convertir',
    CREDITOS INT NOT NULL COMMENT 'Creditos a devolver',
    CONSTRAINT PK_CONVERSION PRIMARY KEY (ID_CONVERSION),
    CONSTRAINT FK_CONVERSION_JUEGO FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

CREATE TABLE HISTORICO(
	ID_HISTORICO BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Identificador del movimiento',
	FECHA DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT  'Fecha del movimiento automatica no hace falta especificarla',
    USUARIO_DNI VARCHAR(9) NOT NULL COMMENT 'DNI del Usuario que realiza el movimiento',
    ID_JUEGO BIGINT NOT NULL COMMENT 'Identificador del juego en el que se realiza un movimiento',
    APUESTA INT NOT NULL COMMENT 'Apuesta del usuario en la tirada representado en creditos',
    RESULTADO DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Monto ganado o perdido por el usuario en este movimiento (positivo = gana usuario, negativo = gana casino)',
    CONSTRAINT PK_HISTORICO PRIMARY KEY (ID_HISTORICO),
	CONSTRAINT FK_HISTORICO_USUARIO FOREIGN KEY (USUARIO_DNI) REFERENCES USUARIO (DNI),
    CONSTRAINT FK_HISTORICO_JUEGO FOREIGN KEY (ID_JUEGO) REFERENCES JUEGO (ID_JUEGO)
);

CREATE TABLE LOG_TRAGAPERRAS(
	ID_LOG_TRAGAPERRAS BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Identificador del log del juego',
	ID_HISTORICO BIGINT NOT NULL COMMENT 'Identificador del movimiento',
	COMBINACION VARCHAR(200) NOT NULL COMMENT 'Combinacion salida al usuario',
	CONSTRAINT PK_LOG_TRAGAPERRAS PRIMARY KEY (ID_LOG_TRAGAPERRAS),
    CONSTRAINT FK_LOG_TRAGAPERRAS_HISTORICO_ID FOREIGN KEY (ID_HISTORICO) REFERENCES HISTORICO (ID_HISTORICO)
);

CREATE TABLE LOG_CRASH(
	ID_LOG_CRASH BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Id identificador del log del juego',
	ID_HISTORICO BIGINT NOT NULL COMMENT 'Identificador del movimiento',
	MULTIPLICADOR DOUBLE NOT NULL COMMENT 'Multiplicador salida de esta tirada',
	CONSTRAINT PK_LOG_CRASH PRIMARY KEY (ID_LOG_CRASH),
    CONSTRAINT FK_LOG_CRASH_HISTORICO_ID FOREIGN KEY (ID_HISTORICO) REFERENCES HISTORICO (ID_HISTORICO)
);

INSERT INTO USUARIO (DNI, NOMBRE, APELLIDOS, USERNAME, PASS, EMAIL, TELEFONO, FECHA_NACIMIENTO,PRESUPUESTO) 
VALUES ('12345678A', 'Juan', 'Pérez', 'juanperez', 'contraseña123', 'juan@example.com', '600123456', '1990-01-01',9999);

INSERT INTO USUARIO (
    DNI, NOMBRE, APELLIDOS, USERNAME, PASS, EMAIL, TELEFONO, 
    FECHA_NACIMIENTO, PRESUPUESTO, USUARIO_VIP, 
    TARJETA_CREDITO, FECHA_EXPIRACION_TARJETA, CVC_TARJETA, 
    CUENTA_BANCARIA, TITULAR
) VALUES (
    '99999999V', 'Carlos', 'Rodríguez Gómez', 'carlitosVIP', 'SuperSecurePass123',
    'carlos.vip@example.com', '611223344', '1985-05-15', 
    50000.00, TRUE, 
    '1234567812345678', '2030-12-01', 321, 
    'ES912100041845020005', 'Carlos Rodríguez Gómez'
);


INSERT INTO JUEGO(NOMBRE,CATEGORIA )
VALUES ('GIRAFFE SPINS AND WINS',"Tragaperras");

INSERT INTO JUEGO(NOMBRE,CATEGORIA)
VALUES ('GIRAFFE RUSH',"Crash");

INSERT INTO JUEGO(NOMBRE,CATEGORIA)
VALUES ('PAMPLONA',"Crash");

INSERT INTO CONVERSION(ID_JUEGO,EUROS,CREDITOS)
VALUES(1,1,100);

INSERT INTO CONVERSION(ID_JUEGO,EUROS,CREDITOS)
VALUES(2,1,200);

INSERT INTO CONVERSION(ID_JUEGO,EUROS,CREDITOS)
VALUES(3,1,400);

DROP TABLE LOG_TRAGAPERRAS;
DROP TABLE LOG_CRASH;
DROP TABLE HISTORICO;
DROP TABLE CONVERSION;
DROP TABLE JUEGO;
DROP TABLE USUARIO;



SELECT * FROM JUEGO;
SELECT * FROM USUARIO;
SELECT * FROM CONVERSION;
SELECT * FROM HISTORICO;

SELECT H.* , LC.MULTIPLICADOR
FROM HISTORICO H, log_crash LC
WHERE H.ID_HISTORICO = LC.ID_HISTORICO AND USUARIO_DNI = '12345678A' ORDER BY H.ID_HISTORICO DESC LIMIT 5;



SELECT * FROM log_crash;


