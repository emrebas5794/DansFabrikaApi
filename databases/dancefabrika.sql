-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 08 Haz 2023, 10:24:29
-- Sunucu sürümü: 8.0.27
-- PHP Sürümü: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `dancefabrika`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` text NOT NULL,
  `role` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `role`, `status`, `createdDate`) VALUES
(1, 'test', 'eren@gmail.com', '$2b$10$WaSJGmVTHFyZA4vfQP6t7ewQ4wJgtKemPd892Rr1wWweUU.UzLeyi', 1, 1, '2023-04-13 16:02:48'),
(2, '', 'erenbas.isnfo@gmail.com', 'tetetete', 1, 1, '2023-04-13 16:03:13'),
(3, 'test', 'erenbas.insfo@gmail.com', 'tetetete', 1, 1, '2023-04-13 16:03:51'),
(4, 'test', 'emre.info@gmail.com', 'tetetete', 1, 1, '2023-05-17 20:04:39');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `attendance`
--

DROP TABLE IF EXISTS `attendance`;
CREATE TABLE IF NOT EXISTS `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `attendanceDate` timestamp NOT NULL,
  `courseId` int NOT NULL,
  `lessonId` int NOT NULL,
  `studentId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`,`courseId`),
  KEY `lessonId` (`lessonId`),
  KEY `studentId` (`studentId`),
  KEY `courseId` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `attendance`
--

INSERT INTO `attendance` (`id`, `attendanceDate`, `courseId`, `lessonId`, `studentId`) VALUES
(2, '2023-04-18 16:30:06', 1, 1, 2),
(3, '2023-04-18 16:30:06', 1, 1, 8);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `bills`
--

DROP TABLE IF EXISTS `bills`;
CREATE TABLE IF NOT EXISTS `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `processType` tinyint NOT NULL,
  `process` tinyint NOT NULL,
  `description` text NOT NULL,
  `processDate` date NOT NULL,
  `price` decimal(11,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `bills`
--

INSERT INTO `bills` (`id`, `processType`, `process`, `description`, `processDate`, `price`) VALUES
(1, 2, 2, 'fdafdsafsdafdsafds', '2023-04-18', '16.48'),
(2, 1, 2, 'fdafdsafsdafdsafds', '2023-04-18', '16.48'),
(3, 1, 2, 'fdafdsafsdafdsafds', '2023-04-18', '16.48');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `calendar`
--

DROP TABLE IF EXISTS `calendar`;
CREATE TABLE IF NOT EXISTS `calendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `queue` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(41) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `calendar`
--

INSERT INTO `calendar` (`id`, `queue`, `name`, `image`, `status`) VALUES
(1, 1, 'test', '241f0477-3af1-4388-9e71-85d2d4da6e51.jpg', -1),
(2, 1, 'tetetete', 'bdfcaef8-5b42-42a8-8dde-daa676a5bb32.jpg', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `danceTypeId` int NOT NULL,
  `danceLevelId` int NOT NULL,
  `capacity` int NOT NULL,
  `trainerId` int NOT NULL,
  `description` text NOT NULL,
  `startDate` timestamp NOT NULL,
  `endDate` timestamp NOT NULL,
  `courseType` tinyint NOT NULL,
  `onSale` tinyint NOT NULL,
  `image` varchar(41) NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `status` tinyint NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `danceTypeId` (`danceTypeId`),
  KEY `danceLevelId` (`danceLevelId`),
  KEY `trainerId` (`trainerId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `course`
--

INSERT INTO `course` (`id`, `danceTypeId`, `danceLevelId`, `capacity`, `trainerId`, `description`, `startDate`, `endDate`, `courseType`, `onSale`, `image`, `price`, `status`, `createdDate`) VALUES
(1, 1, 1, 10, 1, 'açıklama açıklama açıklama', '2023-04-05 18:00:00', '2023-04-25 16:30:06', 2, 1, '', '15.12', 1, '2023-05-04 12:53:19'),
(2, 1, 1, 10, 1, 'açıklama açıklama açıklama', '2023-04-18 13:30:06', '2023-04-25 16:30:06', 1, 1, '', '15.12', 1, '2023-05-20 19:20:49'),
(3, 1, 1, 10, 1, 'açıklama açıklama açıklama', '2023-05-20 17:27:39', '2023-05-25 16:27:39', 1, 1, '', '15.12', 1, '2023-05-20 19:28:14'),
(4, 1, 1, 10, 1, 'açıklama açıklama açıklama', '2023-05-20 16:27:39', '2023-05-25 16:27:39', 1, 1, '', '15.12', 1, '2023-05-20 19:32:19');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `coursestudents`
--

DROP TABLE IF EXISTS `coursestudents`;
CREATE TABLE IF NOT EXISTS `coursestudents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `studentId` int DEFAULT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `paidPrice` decimal(11,2) NOT NULL,
  `status` tinyint NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  KEY `studentId` (`studentId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `coursestudents`
--

INSERT INTO `coursestudents` (`id`, `courseId`, `studentId`, `startDate`, `endDate`, `paidPrice`, `status`, `createdDate`) VALUES
(3, 1, 8, '2023-04-18', '2023-05-18', '25.45', 1, '2023-05-29 12:38:41'),
(9, 1, 9, '2023-04-18', '2023-05-18', '25.45', 1, '2023-05-29 12:43:44'),
(11, 2, 9, '2023-04-18', '2023-05-18', '25.45', 1, '2023-05-29 19:16:32');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `dancelevel`
--

DROP TABLE IF EXISTS `dancelevel`;
CREATE TABLE IF NOT EXISTS `dancelevel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `dancelevel`
--

INSERT INTO `dancelevel` (`id`, `name`, `status`, `createdDate`) VALUES
(1, 'updated', 1, '2023-04-13 18:26:35'),
(2, 'test', 1, '2023-05-27 14:26:54');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `dancetype`
--

DROP TABLE IF EXISTS `dancetype`;
CREATE TABLE IF NOT EXISTS `dancetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `dancetype`
--

INSERT INTO `dancetype` (`id`, `name`, `status`, `createdDate`) VALUES
(1, 'updated', 1, '2023-04-13 18:22:56');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `lessons`
--

DROP TABLE IF EXISTS `lessons`;
CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseId` int NOT NULL,
  `day` tinyint NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `status` tinyint NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `course` (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `lessons`
--

INSERT INTO `lessons` (`id`, `courseId`, `day`, `startTime`, `endTime`, `status`, `createdDate`) VALUES
(1, 1, 1, '15:48:14', '15:48:14', 1, '2023-05-21 15:31:27');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` tinyint NOT NULL,
  `title` text NOT NULL,
  `message` text NOT NULL,
  `studentId` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `title`, `message`, `studentId`, `status`, `createdDate`) VALUES
(1, 2, 'title', 'toplu sms test', NULL, 0, '2023-05-29 18:14:27'),
(2, 2, 'title', 'toplu sms test', 8, 0, '2023-05-29 18:14:49'),
(3, 2, 'title', 'toplu sms test', 9, 1, '2023-05-29 18:16:35');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `packages`
--

DROP TABLE IF EXISTS `packages`;
CREATE TABLE IF NOT EXISTS `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `credit` int NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `packages`
--

INSERT INTO `packages` (`id`, `name`, `description`, `price`, `credit`, `status`) VALUES
(1, 'test', 'test', '15.26', 3, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE IF NOT EXISTS `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` int NOT NULL,
  `credit` int NOT NULL,
  `price` decimal(11,2) NOT NULL,
  `type` tinyint NOT NULL,
  `sellBy` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `sales`
--

INSERT INTO `sales` (`id`, `studentId`, `credit`, `price`, `type`, `sellBy`) VALUES
(1, 2, 40, '25.00', 1, '2023-04-18 16:30:06'),
(2, 8, 20, '25.00', 1, '2023-04-18 16:30:06');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `slider`
--

DROP TABLE IF EXISTS `slider`;
CREATE TABLE IF NOT EXISTS `slider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `queue` int NOT NULL,
  `name` varchar(180) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(41) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `slider`
--

INSERT INTO `slider` (`id`, `queue`, `name`, `description`, `image`, `status`) VALUES
(1, 1, 'tetetete', 'test', 'dd69edd1-4974-4ac9-8ac6-349ca629f562.png', -1),
(2, 1, 'tetetete', 'test', '683fca16-8af2-4218-a5ce-321ef1a97ee4.jpeg', 1),
(3, 1, 'test', 'test', '4458b7cb-7162-455f-9fe0-52d69e4cd109.jpeg', 1),
(4, 1, 'test', 'test', 'c7c8cfdc-06c8-4bc0-89bd-c4bb8ab33a17.png', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `student`
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `identity` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(18) NOT NULL,
  `password` text NOT NULL,
  `image` varchar(41) NOT NULL,
  `country` text NOT NULL,
  `gender` tinyint NOT NULL,
  `birthday` date NOT NULL,
  `credit` int NOT NULL,
  `score` int NOT NULL,
  `reference` int NOT NULL,
  `referenceId` int NOT NULL,
  `code` int NOT NULL,
  `status` tinyint NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `student`
--

INSERT INTO `student` (`id`, `name`, `identity`, `email`, `phone`, `password`, `image`, `country`, `gender`, `birthday`, `credit`, `score`, `reference`, `referenceId`, `code`, `status`, `createdDate`) VALUES
(2, 'updated', '156456465', 'erenbas.infos@gmail.com', '905512708925', '$2b$10$fZThbuIVzEu.k.PtpQ0qCuFDmJ4JIqqPZ8wMIvLySXns8dI2.2nI.', '7689a0b5-f96e-4818-b963-a12b433579a2.svg', '0', 1, '2023-04-18', 4, 100, 456235, 1, 630870, 1, '2023-04-18 21:16:45'),
(6, 'updated', '', 'erenbas.info2@gmail.com', '905512708921', '$2b$10$5MKP.OqHEMTil6W.YdYHhe8FPY68.Rc/cCgcn7SUb7m4deTDzu4J6', '853028c0-fcb3-4992-8db7-56fec790df7a.jpg', '0', 0, '0000-00-00', 0, 0, 249580, 0, 911232, 1, '2023-05-17 11:11:16'),
(7, 'Emre Başss', '456456', 'emrebas@gmail.com', '905344349114', '$2b$10$ySrE608zsiiwAtGhsyPZY.rdjKS.MEBYTt6T2.ulRTP1yPqxOYCZK', 'ef018b94-e53b-4f97-9b8c-61ea81514b54.jpg', 'Türkiye', 1, '2023-04-18', 0, 0, 645477, 0, 347552, 1, '2023-05-17 12:37:35'),
(8, 'Emre Baş', '', 'erguncemm@gmail.com', '905444349114', '$2b$10$fsv9Sn9e5.Vs9QhAOLYk8u5lTxOZNnp5UD4iQQTuF/TN0MAV0njeS', '', '', 0, '0000-00-00', 0, 0, 167651, 0, 252667, 1, '2023-05-17 17:22:39'),
(9, 'Emre Baş', '', 'erenbas.info@gmail.com', '905512708926', '$2b$10$WaSJGmVTHFyZA4vfQP6t7ewQ4wJgtKemPd892Rr1wWweUU.UzLeyi', '', '', 0, '0000-00-00', 0, 0, 604514, 0, 665554, 1, '2023-05-23 23:12:49');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `trainer`
--

DROP TABLE IF EXISTS `trainer`;
CREATE TABLE IF NOT EXISTS `trainer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(18) NOT NULL,
  `password` text NOT NULL,
  `image` varchar(41) NOT NULL,
  `description` text NOT NULL,
  `status` tinyint NOT NULL,
  `createdDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Tablo döküm verisi `trainer`
--

INSERT INTO `trainer` (`id`, `name`, `birthday`, `email`, `phone`, `password`, `image`, `description`, `status`, `createdDate`) VALUES
(1, 'updated', '2023-04-18', 'erenbas.info@gmail.com', '905512708926', '$2b$10$bebwXOvzJn.rmNUZBwqVq.4iomm2217YPNa3zx527bGwIZfNPpyXG', 'deff8196-24a5-4217-b2c8-5ea5e399a69b.png', '1', 0, '2023-04-27 12:24:19');

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Tablo kısıtlamaları `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`trainerId`) REFERENCES `trainer` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`danceLevelId`) REFERENCES `dancelevel` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `course_ibfk_3` FOREIGN KEY (`danceTypeId`) REFERENCES `dancetype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Tablo kısıtlamaları `coursestudents`
--
ALTER TABLE `coursestudents`
  ADD CONSTRAINT `coursestudents_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `coursestudents_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Tablo kısıtlamaları `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Tablo kısıtlamaları `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`);

--
-- Tablo kısıtlamaları `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
