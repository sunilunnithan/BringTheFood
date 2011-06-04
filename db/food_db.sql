-- phpMyAdmin SQL Dump
-- version 3.2.0.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 04, 2011 at 02:48 PM
-- Server version: 5.1.36
-- PHP Version: 5.3.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `food`
--

-- --------------------------------------------------------

--
-- Table structure for table `collector`
--

CREATE TABLE IF NOT EXISTS `collector` (
  `collector_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `address` varchar(512) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY (`collector_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `collector`
--


-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
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

CREATE TABLE IF NOT EXISTS `offer` (
  `offer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_ID` int(11) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `av_date` date NOT NULL,
  `av_time` time NOT NULL,
  `exp_date` date NOT NULL,
  `exp_time` time NOT NULL,
  `collector_ID` int(11) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`offer_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `offer`
--


-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE IF NOT EXISTS `supplier` (
  `supplier_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `address` varchar(512) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  PRIMARY KEY (`supplier_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `supplier`
--

