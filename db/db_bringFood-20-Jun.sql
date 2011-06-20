SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `bringFood` ;
USE `bringFood` ;

-- -----------------------------------------------------
-- Table `bringFood`.`supplier_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bringFood`.`supplier_type` ;

CREATE  TABLE IF NOT EXISTS `bringFood`.`supplier_type` (
  `supplier_type_id` INT(11) NOT NULL AUTO_INCREMENT ,
  `supplier_id` INT(11) NOT NULL ,
  `type` CHAR(16) NOT NULL ,
  PRIMARY KEY (`supplier_type_id`) )
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bringFood`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bringFood`.`users` ;

CREATE  TABLE IF NOT EXISTS `bringFood`.`users` (
  `user_id` INT(7) NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(15) NOT NULL ,
  `password` VARCHAR(35) NOT NULL ,
  `email` VARCHAR(35) NOT NULL ,
  `role` VARCHAR(15) NOT NULL ,
  `activated` INT(1) NOT NULL DEFAULT '0' ,
  `confirmation` VARCHAR(35) NOT NULL ,
  `reg_date` INT(11) NOT NULL ,
  `last_login` INT(11) NOT NULL DEFAULT '0' ,
  `supplier_type_supplier_type_id` INT(11) NOT NULL ,
  PRIMARY KEY (`user_id`, `supplier_type_supplier_type_id`) ,
  INDEX `fk_users_supplier_type1` (`supplier_type_supplier_type_id` ASC) ,
  CONSTRAINT `fk_users_supplier_type1`
    FOREIGN KEY (`supplier_type_supplier_type_id` )
    REFERENCES `bringFood`.`supplier_type` (`supplier_type_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM
AUTO_INCREMENT = 45
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bringFood`.`offer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bringFood`.`offer` ;

CREATE  TABLE IF NOT EXISTS `bringFood`.`offer` (
  `offer_id` INT(11) NOT NULL AUTO_INCREMENT ,
  `description` VARCHAR(1024) NOT NULL ,
  `available_date` DATE NOT NULL ,
  `available_time` TIME NOT NULL ,
  `expire_date` DATE NOT NULL ,
  `status` CHAR(16) NOT NULL ,
  `user_id` INT(7) NOT NULL ,
  PRIMARY KEY (`offer_id`, `user_id`) ,
  INDEX `fk_offer_users` (`user_id` ASC) ,
  CONSTRAINT `fk_offer_users`
    FOREIGN KEY (`user_id` )
    REFERENCES `bringFood`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `bringFood`.`address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `bringFood`.`address` ;

CREATE  TABLE IF NOT EXISTS `bringFood`.`address` (
  `address_id` INT(11) NOT NULL AUTO_INCREMENT ,
  `address_type` CHAR(8) NOT NULL ,
  `street` CHAR(64) NOT NULL ,
  `city` CHAR(32) NOT NULL ,
  `zip` INT(11) NOT NULL ,
  `country` CHAR(32) NOT NULL ,
  `phone` DECIMAL(24,0) NOT NULL ,
  `lat` FLOAT NOT NULL ,
  `lng` FLOAT NOT NULL ,
  `offer_id` INT(11) NOT NULL ,
  `users_user_id` INT(7) NOT NULL ,
  PRIMARY KEY (`address_id`) ,
  INDEX `fk_address_offer1` (`offer_id` ASC) ,
  INDEX `fk_address_users1` (`users_user_id` ASC) ,
  CONSTRAINT `fk_address_offer1`
    FOREIGN KEY (`offer_id` )
    REFERENCES `bringFood`.`offer` (`offer_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_address_users1`
    FOREIGN KEY (`users_user_id` )
    REFERENCES `bringFood`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = MyISAM
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = latin1;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
