-- phpMyAdmin SQL Dump
-- version 3.4.3.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 18, 2011 at 02:42 PM
-- Server version: 5.5.14
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


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

CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `street` char(64) NOT NULL,
  `city` char(32) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` char(32) NOT NULL,
  `phone` varchar(24) NOT NULL,
  `lat` float NOT NULL,
  `lng` float NOT NULL,
  `offer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `fk_address_offer1` (`offer_id`),
  KEY `fk_address_users1` (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=34 ;

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE IF NOT EXISTS `offer` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1024) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `password` varchar(35) NOT NULL,
  `email` varchar(35) NOT NULL,
  `role` varchar(15) NOT NULL,
  `activated` int(1) NOT NULL DEFAULT '0',
  `confirmation` varchar(35) NOT NULL,
  `reg_date` int(11) NOT NULL,
  `last_login` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=60 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
