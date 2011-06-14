-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 14, 2011 at 09:22 AM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

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

CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `address_type` char(8) NOT NULL,
  `address_type_id` int(11) NOT NULL,
  `street` char(64) NOT NULL,
  `city` char(32) NOT NULL,
  `zip` int(11) NOT NULL,
  `country` char(32) NOT NULL,
  `phone` decimal(24,0) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `address`
--


-- --------------------------------------------------------

--
-- Table structure for table `entitiy`
--

CREATE TABLE IF NOT EXISTS `entitiy` (
  `entity_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(128) NOT NULL,
  `email` char(64) NOT NULL,
  `password` char(16) NOT NULL,
  `role` char(16) NOT NULL,
  PRIMARY KEY (`entity_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `entitiy`
--


-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE IF NOT EXISTS `offer` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `collector_id` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `available_date` date NOT NULL,
  `available_time` time NOT NULL,
  `expire_date` date NOT NULL,
  `status` char(16) NOT NULL,
  PRIMARY KEY (`offer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `offer`
--


-- --------------------------------------------------------

--
-- Table structure for table `supplier_type`
--

CREATE TABLE IF NOT EXISTS `supplier_type` (
  `supplier_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `type` char(16) NOT NULL,
  PRIMARY KEY (`supplier_type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `supplier_type`
--

