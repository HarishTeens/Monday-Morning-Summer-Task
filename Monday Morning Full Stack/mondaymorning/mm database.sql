-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 23, 2018 at 09:04 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mm`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` varchar(128) DEFAULT NULL,
  `votes` int(20) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answers`
--

INSERT INTO `answers` (`id`, `answer`, `votes`) VALUES
(40, 'HE is so doppe dude omg he is so so so aosom', 1),
(41, 'who is he', 0),
(42, 'MnM frevaa', 0),
(46, 'yo bro', 1),
(47, 'ehhh', 0),
(48, 'loll', 0);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(128) DEFAULT NULL,
  `slug` varchar(128) DEFAULT NULL,
  `Category` varchar(64) DEFAULT NULL,
  `Author` varchar(64) DEFAULT NULL,
  `user_id` int(11) DEFAULT '0',
  `Content` longtext,
  `Excerpt` mediumtext,
  `Image` varchar(128) DEFAULT NULL,
  `view_count` int(11) DEFAULT '0',
  `updated_at` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `Title`, `slug`, `Category`, `Author`, `user_id`, `Content`, `Excerpt`, `Image`, `view_count`, `updated_at`) VALUES
(9, 'could this be love', 'could-this-be-love', 'love', 'the want', 1, 'she got me callin every day', 'she takes my breath away ', 'http://localhost/mondaymorning/assets/img/uploads/test1.jpg', 0, '2018-06-08 16:33:41'),
(12, 'Youth', 'youth', 'Life matter', 'Shawn Mendes and Khalid', 1, 'you cant take my youth away this soul of mine will never break', 'wake up today', 'http://localhost/mondaymorning/assets/img/uploads/test2.jpg', 0, '2018-06-08 16:39:01'),
(13, 'Genius', 'genius', 'stupid', 'Sia Labrynth', 1, 'oh my goddddd', 'girl girlll', 'http://localhost/mondaymorning/assets/img/uploads/test3.jpg', 0, '2018-06-08 16:57:59'),
(14, 'phone lost', 'phone-lost', 'Lostnfound', 'prasanna', 1, 'My phone is lost idk what to do ', 'phone is lost', 'http://localhost/mondaymorning/assets/img/uploads/test3.jpg', 0, '2018-06-08 18:17:29'),
(17, 'asdf', 'asdf', 'dsaf', 'asdf', 1, 'sdaf', 'asdfasdf', 'http://localhost/mondaymorning/assets/img/uploads/test1.jpg', 0, '2018-06-22 21:04:22');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` mediumtext,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  `has_approved` tinyint(1) DEFAULT '1',
  `updated_at` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `Content`, `user_id`, `username`, `article_id`, `has_approved`, `updated_at`) VALUES
(8, 'holaaaaaaa', 3, 'teddy', 12, 0, 'Thursday, 14-Jun-18 15:21:21 IST'),
(7, 'hola hola gola', 4, 'prasanna', 9, 0, 'Thursday, 14-Jun-18 11:33:49 IST'),
(9, 'you will find your phone', 1, 'harish', 14, 0, 'Wednesday, 20-Jun-18 17:25:20 IST');

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

DROP TABLE IF EXISTS `polls`;
CREATE TABLE IF NOT EXISTS `polls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(128) DEFAULT NULL,
  `answer_1` varchar(128) DEFAULT NULL,
  `answer_2` varchar(128) DEFAULT NULL,
  `answer_3` varchar(128) DEFAULT NULL,
  `user_id` varchar(128) DEFAULT NULL,
  `updated_at` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`id`, `question`, `answer_1`, `answer_2`, `answer_3`, `user_id`, `updated_at`) VALUES
(13, 'Is Kendrick Lamar cool', '40', '41', '42', '1', '2018-06-20 21:34:27'),
(15, 'Can Australia give a comeback', '46', '47', '48', '1', '2018-06-21 17:42:19');

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
CREATE TABLE IF NOT EXISTS `replies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Content` mediumtext NOT NULL,
  `comment_id` int(11) NOT NULL,
  `article_id` varchar(128) DEFAULT NULL,
  `has_approved` tinyint(1) NOT NULL DEFAULT '1',
  `updated_at` varchar(128) NOT NULL,
  `username` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `replies`
--

INSERT INTO `replies` (`id`, `Content`, `comment_id`, `article_id`, `has_approved`, `updated_at`, `username`, `user_id`) VALUES
(1, 'lolll', 7, '9', 1, 'Thursday, 14-Jun-18 11:57:06 IST', 'prasanna', 4),
(2, 'holaa', 7, '9', 1, 'Thursday, 14-Jun-18 11:58:29 IST', 'prasanna', 4),
(3, 'stupid', 8, '12', 1, 'Thursday, 14-Jun-18 15:21:31 IST', 'teddy', 3),
(4, 'found...', 9, '14', 1, 'Wednesday, 20-Jun-18 17:25:50 IST', 'harish', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `updated_at` varchar(255) NOT NULL,
  `last_login` varchar(128) NOT NULL,
  `access_level` varchar(255) NOT NULL DEFAULT 'subscriber',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `updated_at`, `last_login`, `access_level`) VALUES
(1, 'harish', 'teens', 'arishh2@gmail.com', '698c9634246010398e8c427bdd12d374', '2018-06-06 15:05:39', '', 'admin'),
(3, 'teddy', 'bear', 'tb@toys.com', '698c9634246010398e8c427bdd12d374', '2018-06-12 22:52:07', '', 'subscriber'),
(4, 'prasanna', 'rasana', 'spickersden@gmail.com', '698c9634246010398e8c427bdd12d374', '2018-06-14 11:13:00', '', 'subscriber');

-- --------------------------------------------------------

--
-- Table structure for table `voters`
--

DROP TABLE IF EXISTS `voters`;
CREATE TABLE IF NOT EXISTS `voters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poll_id` int(11) DEFAULT NULL,
  `answer` varchar(128) DEFAULT NULL,
  `ip` varchar(128) DEFAULT NULL,
  `updated_at` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `voters`
--

INSERT INTO `voters` (`id`, `poll_id`, `answer`, `ip`, `updated_at`) VALUES
(9, 13, '40', '::1', '2018-06-21 17:22:44'),
(11, 14, '43', '::1', '2018-06-21 17:38:55'),
(12, 15, '46', '::1', '2018-06-21 17:42:30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
