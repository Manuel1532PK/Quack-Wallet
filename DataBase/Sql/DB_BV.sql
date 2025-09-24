-- -----------------------------------------------------
-- Schema Billetera_virtual
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Billetera_virtual` ;
CREATE SCHEMA IF NOT EXISTS `Billetera_virtual` DEFAULT CHARACTER SET utf8 ;
USE `Billetera_virtual` ;

-- -----------------------------------------------------
-- Table `Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Usuarios` (
  `ID_Usuarios` INT NOT NULL,
  `Nombre_Usuario` VARCHAR(100) NOT NULL,
  `Email` VARCHAR(150) NOT NULL,
  `Telefono` VARCHAR(20) NOT NULL,
  `Hash_Password` VARCHAR(45) NOT NULL,
  `Pin_Seguridad` VARCHAR(45) NOT NULL,
  `Fecha_Registro` DATETIME NOT NULL,
  `Estado` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ID_Usuarios`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Billeteras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Billeteras` (
  `ID_Billetera` INT NOT NULL,
  `Moneda` CHAR(3),
  `Saldo` FLOAT,
  `Estado` VARCHAR(45),
  `direccion_blockchain` VARCHAR(45),
  PRIMARY KEY (`ID_Billetera`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Notificaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Notificaciones` (
  `ID_Notificacion` INT NOT NULL,
  `Tipo_Notificacion` VARCHAR(45) NOT NULL,
  `Mensaje_Notificacion` VARCHAR(45) NOT NULL,
  `Fecha_Envio` DATETIME NOT NULL,
  `Estado_Notificacion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Notificacion`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `Transacciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Transacciones` (
  `ID_Transaccion` INT NOT NULL,
  `Tipo_Transaccion` VARCHAR(20) NOT NULL,
  `Monto_Transaccion` FLOAT NOT NULL,
  `Fecha_Transaccion` DATETIME NOT NULL,
  `Estado_Transaccion` VARCHAR(20) NOT NULL,
  `Hash_Blockchain` VARCHAR(255) NOT NULL,
  `Notificaciones_ID_Notificacion` INT NOT NULL,
  `Usuarios_ID_Usuarios` INT NOT NULL,
  `Billeteras_ID_Billetera` INT NOT NULL,
  PRIMARY KEY (`ID_Transaccion`),
  FOREIGN KEY (`Notificaciones_ID_Notificacion`)
    REFERENCES `Notificaciones` (`ID_Notificacion`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`Usuarios_ID_Usuarios`)
    REFERENCES `Usuarios` (`ID_Usuarios`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (`Billeteras_ID_Billetera`)
    REFERENCES `Billeteras` (`ID_Billetera`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- Índices sin VISIBLE
CREATE INDEX `idx_Transacciones_Notificaciones` ON `Transacciones` (`Notificaciones_ID_Notificacion` ASC);
CREATE INDEX `idx_Transacciones_Usuarios` ON `Transacciones` (`Usuarios_ID_Usuarios` ASC);
CREATE INDEX `idx_Transacciones_Billeteras` ON `Transacciones` (`Billeteras_ID_Billetera` ASC);
