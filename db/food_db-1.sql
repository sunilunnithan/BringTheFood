-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 05, 2011 at 03:17 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.2

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
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `offer_ID` int(11) NOT NULL,
  `collector_ID` int(11) NOT NULL,
  `book_date` date NOT NULL,
  `book_time` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:08');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:55');
INSERT INTO `booking` VALUES(1, 1, '2005-06-11', '03:06:56');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:10');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '02:06:13');
INSERT INTO `booking` VALUES(1, 1, '2005-06-11', '02:06:10');
INSERT INTO `booking` VALUES(1, 1, '2005-06-11', '02:06:05');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:12');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:51');
INSERT INTO `booking` VALUES(1, 1, '2005-06-11', '03:06:57');
INSERT INTO `booking` VALUES(1, 1, '2005-06-11', '03:06:57');
INSERT INTO `booking` VALUES(2, 1, '2005-06-11', '03:06:29');

-- --------------------------------------------------------

--
-- Table structure for table `collector`
--

CREATE TABLE `collector` (
  `collector_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `address` varchar(512) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY (`collector_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `collector`
--

INSERT INTO `collector` VALUES(1, 'First Collector', 'Via Brennero', '676767676776', 'collector1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `login_ID` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `type` int(1) NOT NULL,
  PRIMARY KEY (`login_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `login`
--


-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `offer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_ID` int(11) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `av_date` date NOT NULL,
  `av_time` time NOT NULL,
  `exp_date` date NOT NULL,
  `exp_time` time NOT NULL,
  `collector_ID` int(11) NOT NULL,
  `status` text NOT NULL,
  PRIMARY KEY (`offer_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` VALUES(1, 1, 'RHOK left over food for 15 people', '2011-06-05', '17:00:00', '2011-06-05', '19:00:00', 1, 'booked');
INSERT INTO `offer` VALUES(2, 1, 'Wedding left over food for 25 people', '2011-06-06', '18:00:00', '2011-06-07', '18:00:00', 0, 'booked');
INSERT INTO `offer` VALUES(3, 2, 'Conference Banquet Left over food', '2011-06-05', '16:00:00', '2011-06-06', '16:00:00', 0, 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `address` varchar(512) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY (`supplier_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` VALUES(1, 'First Supplier', 'Via Brennero', '23456889', 'fs@gmail.com');
INSERT INTO `supplier` VALUES(2, 'Another Supplier', 'Via Sommarive', '456778885', 'abc@gmail.com');
