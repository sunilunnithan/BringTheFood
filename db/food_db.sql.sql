-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 21, 2011 at 05:30 PM
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
  `street` char(64) NOT NULL,
  `city` char(32) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` char(32) NOT NULL,
  `phone` varchar(24) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`address_id`),
  UNIQUE KEY `lat` (`lat`,`lng`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

--
-- Dumping data for table `address`
--

INSERT INTO `address` VALUES(41, 'Piazza Santa Maria Maggiore 34', 'Trento', 38123, 'Italy', '8058934232', 46.0684934, 11.1187557);
INSERT INTO `address` VALUES(40, 'via  sommarive 18', 'trento', 38100, 'itlay', '333333333', 46.0670192, 11.150513);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1024) NOT NULL,
  `address_id` int(11) NOT NULL,
  `available_date` date NOT NULL,
  `available_time` time NOT NULL,
  `expire_date` date NOT NULL,
  `expire_time` time NOT NULL,
  `status` char(16) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `collector_id` int(11) NOT NULL,
  `image` varchar(1024) NOT NULL,
  `people_served` int(11) NOT NULL,
  PRIMARY KEY (`offer_id`),
  KEY `fk_offer_users1` (`supplier_id`),
  KEY `fk_offer_users2` (`collector_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=67 ;

--
-- Dumping data for table `offer`
--


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `password` varchar(35) NOT NULL,
  `email` varchar(35) NOT NULL,
  `address_id` int(11) NOT NULL,
  `role` varchar(15) NOT NULL,
  `activated` int(1) NOT NULL DEFAULT '0',
  `confirmation` varchar(35) NOT NULL,
  `reg_date` int(11) NOT NULL,
  `last_login` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=69 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES(67, 'komminist weldemariam', 'aeed09223d14ac2690d240cf0a4a0af6', 'komm@gmail.com', 40, 'Supplier', 1, '', 1311261630, 1311261840);
INSERT INTO `users` VALUES(68, 'Komminist Weldemariam', 'aeed09223d14ac2690d240cf0a4a0af6', 'komminist@gmail.com', 41, 'sollector', 1, '', 1311262075, 0);
