-- phpMyAdmin SQL Dump
-- version 3.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 29, 2011 at 03:23 PM
-- Server version: 5.5.13
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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `street`, `city`, `zip`, `country`, `phone`, `lat`, `lng`, `offer_id`, `user_id`) VALUES
(18, 'piazza santa maria maggiore', 'Trento', 38123, 'Italy', '3334366364', 46.0688, 11.1195, 0, 47),
(19, 'via Vittorio Veneto 24', 'Trento', 38123, 'Italy', '43647373', 46.058, 11.1203, 0, 48),
(20, 'via Vittorio Veneto 19', 'Trento', 38122, 'Italy', '326783573378', 46.058, 11.1189, 0, 49),
(21, 'via Cavour 345', 'Trento', 38100, 'Italy', '4287689278', 46.0681, 11.1207, 0, 50),
(22, 'via del Menga 436', 'Trento', 38122, 'Italy', '43647373', 46.0625, 11.1251, 0, 51);

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
  `status` char(16) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `collector_id` int(11) NOT NULL,
  `image` varchar(1024) NOT NULL,
  `people_served` int(11) NOT NULL,
  PRIMARY KEY (`offer_id`),
  KEY `fk_offer_users1` (`supplier_id`),
  KEY `fk_offer_users2` (`collector_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=52 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `password`, `email`, `role`, `activated`, `confirmation`, `reg_date`, `last_login`) VALUES
(49, 'CARITAS', 'aeed09223d14ac2690d240cf0a4a0af6', 'caritas@caritas.it', 'collector', 1, '', 1308916512, 1309353171),
(46, 'Pedavena', 'aeed09223d14ac2690d240cf0a4a0af6', 'pedavena@trento.it', 'supplier', 1, '', 1308867547, 1309353200),
(47, 'Rosa dOro', 'aeed09223d14ac2690d240cf0a4a0af6', 'rosa@oro.it', 'supplier', 1, '', 1308916209, 0),
(51, 'Pippo', 'aeed09223d14ac2690d240cf0a4a0af6', 'pippo@topolinia.it', 'Collector', 1, '', 1308918621, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
