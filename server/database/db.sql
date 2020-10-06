CREATE TABLE `users`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(80) NOT NULL,
  `user_password` VARCHAR(80) NOT NULL,
  `idciudad` INT NULL,
  PRIMARY KEY (`iduser`),
  INDEX `idciudad_idx` (`idciudad` ASC) VISIBLE,
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE,
  CONSTRAINT `idciudad`
    FOREIGN KEY (`idciudad`)
    REFERENCES `users`.`ciudad` (`idciudad`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `users`.`user` 
ADD COLUMN `is_active` INT NULL DEFAULT 1 AFTER `idciudad`;

ALTER TABLE `users`.`user` 
ADD UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE;

CREATE TABLE `users`.`ciudad` (
  `idciudad` INT NOT NULL AUTO_INCREMENT,
  `ciudad` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idciudad`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
