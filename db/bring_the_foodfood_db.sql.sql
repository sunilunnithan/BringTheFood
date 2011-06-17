-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 17, 2011 at 09:09 AM
-- Server version: 5.1.37
-- PHP Version: 5.2.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `food_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_type` char(8) NOT NULL,
  `address_type_id` int(11) NOT NULL,
  `street` char(64) NOT NULL,
  `city` char(32) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` char(32) NOT NULL,
  `phone` decimal(24,0) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `address`
--

INSERT INTO `address` VALUES(17, 'user', 44, 'via sommarive 18', '', 0, '', 3474832631, 46.067, 11.1505);
INSERT INTO `address` VALUES(16, 'user', 43, 'Via Sommarive 18', 'Trento', 38100, 'Italy', 390461314390, 46.067, 11.1505);
INSERT INTO `address` VALUES(15, 'user', 42, 'via sommarive 18', '', 0, '', 3474832631, 46.067, 11.1505);
INSERT INTO `address` VALUES(14, 'user', 33, 'via sommarive 18', 'Ontario, Canada K7L 3N6', 38123, 'Italy', 3474832631, 46.0222, 11.1184);
INSERT INTO `address` VALUES(13, 'user', 32, 'Largo Carducci 14', 'Trento', 38122, 'Italy', 461232413, 46.0683, 11.1243);
INSERT INTO `address` VALUES(12, 'user', 30, 'Piazza Santa Maria Maggiore 21', 'Trento', 38122, 'Italy', 461, 46.0684, 11.1198);
INSERT INTO `address` VALUES(11, 'user', 29, 'Via Sommarive 18', 'Trento', 38123, 'Italy', 390461314390, 46.067, 11.1505);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `collector_id` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `available_date` date NOT NULL,
  `available_time` time NOT NULL,
  `expire_date` date NOT NULL,
  `status` char(16) NOT NULL,
  PRIMARY KEY (`offer_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` VALUES(1, 29, 32, '4 pieces of pizza', '2011-06-17', '00:00:04', '2011-06-18', 'locked');
INSERT INTO `offer` VALUES(3, 30, 0, 'pasta from aaron house', '2011-06-20', '00:00:12', '2011-06-21', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_type`
--

CREATE TABLE `supplier_type` (
  `supplier_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `type` char(16) NOT NULL,
  PRIMARY KEY (`supplier_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `supplier_type`
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(7) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(35) NOT NULL,
  `email` varchar(35) NOT NULL,
  `role` varchar(15) NOT NULL,
  `activated` int(1) NOT NULL DEFAULT '0',
  `confirmation` varchar(35) NOT NULL,
  `reg_date` int(11) NOT NULL,
  `last_login` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES(43, 'kommy2', 'aeed09223d14ac2690d240cf0a4a0af6', 'sis2ai@fbk.eu', 'collector', 1, '', 1308265423, 1308293892);
INSERT INTO `users` VALUES(39, 'Casamozambique2', '62f68f76a6020082cc231b04b5dc06bb', 'komminist@gmail.com', 'supplier', 1, '', 1308261943, 0);
INSERT INTO `users` VALUES(29, 'komminist', '2ca078759edaf66a169808f4b96a4782', 'sisai@fbk.eu', 'supplier', 1, '', 1308176221, 1308252813);
