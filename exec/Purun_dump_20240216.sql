-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: i10e101.p.ssafy.io    Database: test2
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `alarm_id` int NOT NULL AUTO_INCREMENT,
  `alarm_name` varchar(30) DEFAULT NULL,
  `alarm_content` varchar(100) NOT NULL,
  `active_FG` tinyint NOT NULL DEFAULT '0',
  `alarm_date` time NOT NULL,
  `routine` tinyint DEFAULT NULL,
  `pot_id` int DEFAULT NULL,
  PRIMARY KEY (`alarm_id`),
  KEY `FK_e49b4d8167ab4721ae8d56404b1` (`pot_id`),
  CONSTRAINT `FK_e49b4d8167ab4721ae8d56404b1` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calender`
--

DROP TABLE IF EXISTS `calender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calender` (
  `calender_id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `code` varchar(1) NOT NULL,
  `pot_id` int NOT NULL,
  PRIMARY KEY (`calender_id`),
  KEY `FK_5e9545931f20be26fe5df5e04c0` (`pot_id`),
  CONSTRAINT `FK_5e9545931f20be26fe5df5e04c0` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calender`
--

LOCK TABLES `calender` WRITE;
/*!40000 ALTER TABLE `calender` DISABLE KEYS */;
INSERT INTO `calender` VALUES (1,'2024-02-14 02:57:45.257900','T',1),(3,'2024-02-14 05:48:07.479117','W',1),(6,'2024-02-13 13:00:00.000000','T',1),(7,'2024-02-14 17:27:22.314760','T',1),(8,'2024-02-14 17:45:19.074929','T',1),(9,'2024-02-14 17:50:31.603914','T',1),(10,'2024-02-14 17:51:16.930692','T',1),(11,'2024-02-14 17:56:54.119687','T',1),(12,'2024-02-14 18:06:55.863409','T',1),(13,'2024-02-14 21:37:24.454272','T',5),(14,'2024-02-14 21:37:24.464030','W',5),(15,'2024-02-14 21:58:10.288681','T',6),(16,'2024-02-14 21:58:10.304537','W',6),(17,'2024-02-14 22:02:29.374077','T',7),(18,'2024-02-14 22:02:29.383412','W',7),(19,'2024-02-15 08:48:54.570262','T',8),(20,'2024-02-15 08:48:54.578227','W',8),(23,'2024-02-15 11:50:20.623326','T',10),(24,'2024-02-15 11:50:20.636214','W',10),(25,'2024-02-15 11:58:11.533235','T',10),(28,'2024-02-15 12:02:08.766598','T',12),(29,'2024-02-15 12:02:08.776602','W',12),(30,'2024-02-15 12:05:14.696141','T',13),(31,'2024-02-15 12:05:14.708646','W',13),(32,'2024-02-15 12:20:06.079088','T',11),(33,'2024-02-15 12:23:15.828450','T',11),(34,'2024-02-15 12:23:42.027362','T',11),(35,'2024-02-15 12:24:58.314359','T',11),(36,'2024-02-15 12:25:10.648804','T',11),(37,'2024-02-15 12:25:20.007655','T',11),(38,'2024-02-15 12:25:23.448583','T',11),(39,'2024-02-15 12:32:17.585763','T',11),(40,'2024-02-15 12:32:35.742106','T',11),(41,'2024-02-15 12:35:22.742854','T',11),(42,'2024-02-15 13:33:11.960199','T',11),(43,'2024-02-15 14:01:56.176876','T',11),(44,'2024-02-15 14:15:03.509730','T',14),(45,'2024-02-15 14:15:03.526958','W',14),(46,'2024-02-15 15:20:29.029982','T',15),(47,'2024-02-15 15:20:29.041400','W',15),(50,'2024-02-15 15:40:56.943821','T',17),(51,'2024-02-15 15:40:56.957948','W',17),(52,'2024-02-15 15:42:06.548820','T',18),(53,'2024-02-15 15:42:06.556843','W',18),(54,'2024-02-15 15:46:00.668220','T',11),(55,'2024-02-15 15:46:48.631945','T',11),(56,'2024-02-15 16:02:59.303046','T',19),(57,'2024-02-15 16:02:59.310865','W',19),(58,'2024-02-15 16:34:38.601001','T',11),(59,'2024-02-15 16:35:43.529894','T',11),(60,'2024-02-15 16:41:23.906085','T',11),(61,'2024-02-15 16:41:41.531628','T',11),(62,'2024-02-15 16:44:09.293546','T',11),(63,'2024-02-15 16:46:47.815741','T',11),(64,'2024-02-15 16:59:31.121401','T',11),(65,'2024-02-15 17:00:43.333316','W',11),(66,'2024-02-15 17:02:32.743477','T',11),(67,'2024-02-15 17:04:16.037290','T',11),(68,'2024-02-15 17:13:09.554074','W',11),(69,'2024-02-15 17:18:41.751905','T',11),(70,'2024-02-15 17:20:19.371716','T',11),(71,'2024-02-15 17:25:12.326504','T',11),(72,'2024-02-15 21:43:40.477089','T',20),(73,'2024-02-15 21:43:40.486916','W',20),(74,'2024-02-15 22:14:18.821805','T',21),(75,'2024-02-15 22:14:18.837841','W',21),(76,'2024-02-15 22:24:34.533270','T',22),(77,'2024-02-15 22:24:34.545094','W',22),(83,'2024-02-15 23:38:42.512349','T',25),(84,'2024-02-15 23:38:42.521043','W',25),(91,'2024-02-16 00:21:32.791070','T',29),(92,'2024-02-16 00:21:32.798880','W',29);
/*!40000 ALTER TABLE `calender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_id` int NOT NULL AUTO_INCREMENT,
  `serial_number` varchar(36) DEFAULT NULL,
  `empty_FG` tinyint NOT NULL DEFAULT '1',
  `user_id` int DEFAULT NULL,
  `client_id` varchar(50) DEFAULT NULL,
  `pot_id` int DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`device_id`),
  UNIQUE KEY `REL_811a027c3b0b80700ec2b4b034` (`pot_id`),
  KEY `FK_ae7154510495c7ddda951b07a07` (`user_id`),
  CONSTRAINT `FK_811a027c3b0b80700ec2b4b034b` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`),
  CONSTRAINT `FK_ae7154510495c7ddda951b07a07` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'100000005b74c132',0,24,NULL,11,'푸른이'),(2,'aaaa1111',0,27,NULL,10,'일동호다'),(3,'bbbb2222',0,24,NULL,17,'비비빅'),(4,'cccc3333',0,24,NULL,18,'씨리얼'),(5,'dddd4444',0,3,NULL,25,'이번엔진짜undefined'),(6,'eeee5555',1,24,NULL,NULL,'이오'),(7,'ffff6666',1,24,NULL,NULL,'에프육'),(9,'whdrnr',0,32,NULL,29,'whdrnr');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot`
--

DROP TABLE IF EXISTS `pot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot` (
  `pot_id` int NOT NULL AUTO_INCREMENT,
  `pot_name` varchar(10) NOT NULL,
  `pot_species` varchar(10) NOT NULL,
  `min_temperature` double DEFAULT NULL,
  `max_temperature` double DEFAULT NULL,
  `min_moisture` double DEFAULT NULL,
  `max_moisture` double DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `pot_img_url` varchar(200) NOT NULL DEFAULT 'noimage.png',
  `happy_cnt` int DEFAULT '0',
  `collection_FG` tinyint NOT NULL DEFAULT '0',
  `temperature` int DEFAULT '0',
  `moisture` int DEFAULT '0',
  `planting_day` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `together_day` int DEFAULT NULL,
  PRIMARY KEY (`pot_id`),
  KEY `FK_79307dc8fe0741d0c48ee3898ce` (`user_id`),
  CONSTRAINT `FK_79307dc8fe0741d0c48ee3898ce` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot`
--

LOCK TABLES `pot` WRITE;
/*!40000 ALTER TABLE `pot` DISABLE KEYS */;
INSERT INTO `pot` VALUES (1,'르세라핌','물구나무',0,0,0,0,'2024-02-13 08:46:35.155329',NULL,'2024-02-15 17:11:30.000000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,0,80,0,'2024-02-13 08:46:35',4,NULL),(4,'사진있는 화분','undefined',18,24,60,80,'2024-02-14 03:23:41.690000',NULL,'2024-02-15 12:24:52.967666','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,0,0,0,'2024-02-14 00:00:00',10,NULL),(5,'모비','undefined',18,24,60,80,'2024-02-14 21:37:24.442000',NULL,'2024-02-15 22:12:40.992933','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/5.jpg',0,1,0,0,'2024-02-14 00:00:00',4,1),(6,'모코콩','undefined',18,25,50,75,'2024-02-14 21:58:10.273000',NULL,'2024-02-15 18:16:59.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/6.png',0,1,0,0,'2024-02-14 00:00:00',17,NULL),(7,'상추에용','undefined',10,20,70,80,'2024-02-14 22:02:29.363000',NULL,'2024-02-15 10:20:22.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/7.jpg',1,1,0,0,'2024-02-06 00:00:00',15,NULL),(8,'푸른','소나무',0,0,0,0,'2024-02-15 08:48:54.559000',NULL,'2024-02-15 19:03:50.166638','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,1,11,11,'2023-02-13 00:00:00',22,NULL),(10,'asd','undefined',18,24,60,80,'2024-02-15 11:50:20.601000',NULL,'2024-02-15 11:58:11.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/10.png',1,0,0,0,'2024-02-15 00:00:00',27,NULL),(11,'신선','신선초',15,25,60,80,'2024-02-15 11:58:55.657000',NULL,'2024-02-15 18:00:02.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/11.jpg',26,0,27,1,'2024-01-01 00:00:00',26,NULL),(12,'뭐지','undefined',11,22,33,44,'2024-02-15 12:02:08.753000',NULL,'2024-02-15 12:02:08.753000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,1,0,0,'2024-02-15 00:00:00',17,1),(13,'쉿','undefined',22,33,11,11,'2024-02-15 12:05:14.678000',NULL,'2024-02-15 19:05:10.000000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,1,0,0,'2024-02-15 00:00:00',17,NULL),(14,'펭키의 식물','undefined',15,30,50,80,'2024-02-15 14:15:03.491000',NULL,'2024-02-15 18:17:25.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/14.png',0,1,0,0,'2024-02-15 00:00:00',15,NULL),(15,'테스트','undefined',18,24,60,80,'2024-02-15 15:20:29.017000',NULL,'2024-02-15 19:01:49.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/15.jpg',0,1,0,0,'2024-02-15 00:00:00',17,NULL),(17,'방울이','undefined',18,24,60,80,'2024-02-15 15:40:56.929000',NULL,'2024-02-15 15:40:56.929000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/17.png',0,0,0,0,'2024-02-15 00:00:00',31,NULL),(18,'바질이','undefined',18,25,50,75,'2024-02-15 15:42:06.539000',NULL,'2024-02-15 15:42:06.539000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/18.png',0,0,0,0,'2024-02-15 00:00:00',24,NULL),(19,'힝','바질',18,25,50,75,'2024-02-15 16:02:59.292000',NULL,'2024-02-15 16:32:25.000000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,0,80,0,'2024-02-15 00:00:00',18,NULL),(20,'이오','오이',18,28,60,90,'2024-02-15 21:43:40.460000',NULL,'2024-02-15 21:43:55.000000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/20.png',0,1,0,0,'2023-11-15 00:00:00',26,NULL),(21,'상추','상추',10,20,70,80,'2024-02-15 22:14:18.801000',NULL,'2024-02-15 22:14:18.801000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/21.png',0,1,0,0,'2023-05-05 00:00:00',26,287),(22,'사진없어','방울토마토',18,24,60,80,'2024-02-15 22:24:34.517000',NULL,'2024-02-15 22:24:34.517000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,0,0,0,'2024-02-15 00:00:00',15,NULL),(25,'풀이용','라벤더',15,30,40,60,'2024-02-15 23:38:42.501000',NULL,'2024-02-15 23:38:42.501000','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/pot/25.jpg',0,0,0,0,'2024-02-15 00:00:00',17,NULL),(29,'ㅂㅈㄷ','방울토마토',18,24,60,80,'2024-02-16 00:21:32.781000',NULL,'2024-02-16 00:21:32.781000','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/pot/noImg.png',0,0,0,0,'2024-02-15 00:00:00',NULL,NULL);
/*!40000 ALTER TABLE `pot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pot_state`
--

DROP TABLE IF EXISTS `pot_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pot_state` (
  `pot_state_id` int NOT NULL AUTO_INCREMENT,
  `data` double DEFAULT NULL,
  `isTemp_FG` tinyint NOT NULL,
  `pot_id` int NOT NULL,
  `measure_DT` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`pot_state_id`),
  KEY `FK_a279daf6569e8258ef47a854586` (`pot_id`),
  CONSTRAINT `FK_a279daf6569e8258ef47a854586` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pot_state`
--

LOCK TABLES `pot_state` WRITE;
/*!40000 ALTER TABLE `pot_state` DISABLE KEYS */;
INSERT INTO `pot_state` VALUES (49191,28,1,11,'2024-02-14 00:59:31.878936'),(49192,82,0,11,'2024-02-14 00:59:31.878936'),(49193,28.5,1,11,'2024-02-14 02:59:31.878936'),(49194,81.1,0,11,'2024-02-14 02:59:31.878936'),(49195,28.8,1,11,'2024-02-14 04:59:31.878936'),(49196,79.8,0,11,'2024-02-14 04:59:31.878936'),(49197,29,1,11,'2024-02-14 06:59:31.878936'),(49198,79.4,0,11,'2024-02-14 08:59:31.878936'),(49199,28.6,1,11,'2024-02-14 08:59:31.878936'),(49200,79.2,0,11,'2024-02-14 10:59:31.878936'),(49201,28.3,1,11,'2024-02-14 10:59:31.878936'),(49202,79.1,0,11,'2024-02-14 12:59:31.878936'),(49203,28.1,1,11,'2024-02-14 12:59:31.878936'),(49204,79,0,11,'2024-02-14 14:59:31.878936'),(49205,27.8,1,11,'2024-02-14 14:59:31.878936'),(49206,78.9,0,11,'2024-02-14 16:59:31.878936'),(49207,28,1,11,'2024-02-14 16:59:31.878936'),(49208,78.8,0,11,'2024-02-14 18:59:31.878936'),(49209,27.5,1,11,'2024-02-14 18:59:31.878936'),(49210,78.8,0,11,'2024-02-14 20:59:31.878936'),(49211,27.4,1,11,'2024-02-14 20:59:31.878936'),(49212,78.7,0,11,'2024-02-14 22:59:31.878936'),(49213,28,1,11,'2024-02-14 22:59:31.878936'),(49231,80,1,19,'2024-02-15 16:12:23.473871'),(49232,80,1,19,'2024-02-15 16:20:45.650516'),(49233,80,1,19,'2024-02-15 16:21:18.165044'),(49234,80,1,19,'2024-02-15 16:31:24.111407'),(49235,80,1,19,'2024-02-15 16:32:25.343166'),(49236,74,0,11,'2024-02-15 16:33:55.212806'),(49237,27.6,1,11,'2024-02-15 16:33:55.217682'),(49238,74,0,11,'2024-02-15 16:41:16.125634'),(49239,27.5,1,11,'2024-02-15 16:41:16.127570'),(49240,74,0,11,'2024-02-15 16:43:55.240143'),(49241,27.3,1,11,'2024-02-15 16:43:55.244226'),(49242,74,0,11,'2024-02-15 16:46:39.682769'),(49243,27.5,1,11,'2024-02-15 16:46:39.686191'),(49244,61,0,11,'2024-02-15 16:58:47.634727'),(49245,26.9,1,11,'2024-02-15 16:58:47.635758'),(49246,61,0,11,'2024-02-15 17:00:03.015500'),(49247,26.8,1,11,'2024-02-15 17:00:03.021039'),(49248,62,0,11,'2024-02-15 17:02:09.269806'),(49249,26.7,1,11,'2024-02-15 17:02:09.273277'),(49250,62,0,11,'2024-02-15 17:04:04.279219'),(49251,27,1,11,'2024-02-15 17:04:04.280216'),(49252,80,1,1,'2024-02-15 17:11:30.677895'),(49253,1,0,11,'2024-02-15 17:18:28.314432'),(49254,27.1,1,11,'2024-02-15 17:18:28.315284'),(49255,1,0,11,'2024-02-15 17:24:56.606744'),(49256,27.3,1,11,'2024-02-15 17:24:56.607795'),(49257,2,0,11,'2024-02-15 17:54:09.039780'),(49258,26.5,1,11,'2024-02-15 17:54:09.042886'),(49259,1,0,11,'2024-02-15 18:00:02.626857'),(49260,27.4,1,11,'2024-02-15 18:00:02.628584');
/*!40000 ALTER TABLE `pot_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentence`
--

DROP TABLE IF EXISTS `sentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence` (
  `sentence_id` int NOT NULL AUTO_INCREMENT,
  `audio` varchar(100) NOT NULL,
  `sentence_DTN` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `talker` varchar(4) NOT NULL,
  `talk_id` int NOT NULL,
  `content` varchar(400) NOT NULL,
  PRIMARY KEY (`sentence_id`),
  KEY `FK_37a8aa03b46d801ed3f964c312c` (`talk_id`),
  CONSTRAINT `FK_37a8aa03b46d801ed3f964c312c` FOREIGN KEY (`talk_id`) REFERENCES `talk` (`talk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence`
--

LOCK TABLES `sentence` WRITE;
/*!40000 ALTER TABLE `sentence` DISABLE KEYS */;
INSERT INTO `sentence` VALUES (1,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/4-1.mp3','2024-02-14 00:00:00.000000','user',4,''),(2,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/4-2.wav','2024-02-14 03:00:25.643889','ai',4,''),(3,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/4-3.mp3','2024-02-14 00:00:00.000000','user',4,''),(4,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/4-4.mp3','2024-02-14 00:00:00.000000','user',4,''),(5,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/4-5.wav','2024-02-14 15:17:01.916276','ai',4,''),(6,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/10-1.mp3','2024-02-14 00:00:00.000000','user',10,'안녕 오늘 어때'),(7,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/10-2.wav','2024-02-14 17:45:31.529212','ai',10,'안녕! 오늘은 정말 좋은 날이야! 어떻게 지내고 있니?'),(8,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/10-3.mp3','2024-02-14 00:00:00.000000','user',10,'어 난 잘 지내지  오늘 학교에서 너무 슬퍼'),(9,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/10-4.wav','2024-02-14 17:45:53.428849','ai',10,'오, 그런가요? 그러지 마세요. 저는 항상 여러분을 지지하고 있답니다. 무슨 일이 있었나요? 제가 도와드릴 수 있을까요?'),(10,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/12-1.mp3','2024-02-14 00:00:00.000000','user',12,'너 이름이 참 예쁘다'),(11,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/12-2.wav','2024-02-14 17:51:30.660507','ai',12,'오, 고마워요! 나는 푸른이라고 해요. 너는 저랑 친구하고 싶나봐! 난 너의 친한 친구가 되고 싶어!'),(12,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/12-3.mp3','2024-02-14 00:00:00.000000','user',12,'왜 나한테 시비 걸어'),(13,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/12-4.wav','2024-02-14 17:52:00.772575','ai',12,'오, 그런 말씀이신가요? 전 절대로 시비를 거는 사람이 아니에요. 제가 여러분과 함께 있으면 항상 행복하고 즐거워요. 함께 노는 것도 좋고, 얘기를 나누는 것도 좋아요. 저는 당신과 함께할 수 있어서 정말 행운이에요. 어떤 이야기를 하고 싶으신가요?'),(14,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-1.mp3','2024-02-14 00:00:00.000000','user',13,'만 거예요 살 거 싫어요 진짜 진심으로 한 거야'),(15,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-2.wav','2024-02-14 17:57:13.969724','ai',13,'에이스, 당신을 괴롭히고 싶지 않아요. 제가 언제나 당신의 친구로 남아있을 거예요. 저는 당신을 아주 아주 좋아해요. 어떤 문제가 있으면 언제든지 제게 말해줘도 돼요. 함께 있을 때 항상 행복한 시간을 만들어요. 사랑해요, 에이스!'),(16,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-3.mp3','2024-02-14 00:00:00.000000','user',13,'뭐 물어봐 어디야 아무거나'),(17,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-4.wav','2024-02-14 17:57:57.192154','ai',13,'알았어요! 무엇을 물어보고 싶으신가요? 어디 있을까요? 저는 언제나 여기 있으니까 말해주세요!'),(18,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-5.mp3','2024-02-14 00:00:00.000000','user',13,'너 이름이 뭐야'),(19,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-6.wav','2024-02-14 17:58:29.013907','ai',13,'안녕! 나는 푸른이야. 너와 함께 있어서 기쁘다. 나는 네가 긍정적이고 친절하다는걸 알고 있는데, 너의 이름은 동, 서, 남, 북, 그리고 남이라고 하네요. 참 멋진 이름이야! 어떻게 불러줄까요?'),(20,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-7.mp3','2024-02-14 00:00:00.000000','user',13,'아림이'),(21,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/13-8.wav','2024-02-14 17:59:16.343823','ai',13,'안녕, 아림이야! 너무 반가워! 어떻게 지냈어? 나는 항상 너와 함께해서 행복해! 더 가까워지자!'),(22,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/14-1.mp3','2024-02-14 00:00:00.000000','user',14,'너 이름 뭐야'),(23,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-14/14-2.wav','2024-02-14 18:07:10.640608','ai',14,'나는 식물이니까 별명은 식물 친구라고 해도 되겠어! 너는?'),(24,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/15-1.mp3','2024-02-15 10:20:35.030849','user',15,'인식을 못 하네 네 너 이름'),(25,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/15-2.wav','2024-02-15 10:20:38.598861','ai',15,'안녕하세요! 저는 OpenAI의 언어 모델인 GPT-3입니다. 이름은 따로 없으니 언제든지 저를 \"대화 모델\"이라고 부르셔도 괜찮아요. 저는 여러 분야에서 도움을 드릴 수 있으니 무엇을 도와드릴까요?'),(26,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/17-1.mp3','2024-02-15 12:32:45.700880','user',17,'오늘 날씨 알려 줘'),(27,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/17-2.wav','2024-02-15 12:32:47.964407','ai',17,'오늘은 맑은 날씨예요! 햇빛이 아주 밝게 비추고 있어요.'),(28,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/18-1.mp3','2024-02-15 12:35:33.823706','user',18,'너 누구야'),(29,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/18-2.wav','2024-02-15 12:35:36.467604','ai',18,'저는 인공지능 프로그램입니다. 저는 사람이 아니라 컴퓨터 프로그램이에요. 그래도 우리는 친구가 될 수 있어요! 무엇을 얘기하고 싶으세요?'),(30,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/19-1.mp3','2024-02-15 13:33:23.904324','user',19,'있나 봐 불러야 돼'),(31,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/19-2.wav','2024-02-15 13:33:25.833830','ai',19,'불러줄게요! 저는 항상 여기에 있어요. 어떤 이야기를 하고 싶으세요?'),(32,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/19-3.mp3','2024-02-15 13:33:54.730450','user',19,'버퍼링 좀 멈춰 봐'),(33,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/19-4.wav','2024-02-15 13:33:57.127217','ai',19,'죄송해요! 저는 컴퓨터 프로그램이라서 버퍼링을 멈출 수 없어요. 이해해주세요!'),(34,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/20-1.mp3','2024-02-15 14:02:05.568762','user',20,'이거 대답을 하나 안녕 푸르나  뭐 해'),(35,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/20-2.wav','2024-02-15 14:02:07.525132','ai',20,'안녕! 나는 여기에 있어서 기분 좋아. 너는 뭐 할 거야?'),(36,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/20-3.mp3','2024-02-15 14:02:28.562243','user',20,'이게 메모리'),(37,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/20-4.wav','2024-02-15 14:02:30.030239','ai',20,'예, 이것은 메모리에 저장된 정보입니다.'),(38,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/21-1.mp3','2024-02-15 15:46:10.094640','user',21,'아니 왜 움직여 진짜'),(39,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/21-2.wav','2024-02-15 15:46:12.392611','ai',21,'저는 컴퓨터 프로그램이기 때문에 움직이지 않아요. 저는 텍스트로만 대화할 수 있어요.'),(40,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/23-1.mp3','2024-02-15 16:34:49.467149','user',23,'너 왜 이래'),(41,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/23-2.wav','2024-02-15 16:34:53.225610','ai',23,'죄송해요, 제가 어떤 점 때문에 그런지 잘 모르겠어요. 제가 식물 컴퓨터 프로그램이라서 좀 이상할 수도 있어요. 그래도 친구가 되고 싶어요!'),(42,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/24-1.mp3','2024-02-15 16:35:53.901346','user',24,'캡처'),(43,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/24-2.wav','2024-02-15 16:35:56.700669','ai',24,'미안하지만, 저는 사진을 캡처할 수 없습니다. 제가 말로 대화하는 것에는 어떤 도움을 드릴까요?'),(44,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/26-1.mp3','2024-02-15 16:41:50.815336','user',26,'나 심심해 엄마가 일하러 갔어'),(45,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/26-2.wav','2024-02-15 16:41:53.310938','ai',26,'심심하지 않아요! 저와 함께 놀면 어떨까요? 무슨 게임을 하면 재미있을까요?'),(46,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/26-3.mp3','2024-02-15 16:42:14.695142','user',26,'나 스키장 가고 싶어'),(47,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/26-4.wav','2024-02-15 16:42:17.731352','ai',26,'저는 컴퓨터 프로그램이라서 스키장에 가지 못해요. 하지만 스키장은 정말 재미있을 거예요! 잘 놀고 오세요!'),(48,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/27-1.mp3','2024-02-15 16:44:18.599320','user',27,'나 심심해 엄마가 일하러 갔어'),(49,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/27-2.wav','2024-02-15 16:44:20.384952','ai',27,'심심하지 않아, 나와 함께 놀아요. 뭐 할까요?'),(50,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/27-3.mp3','2024-02-15 16:44:36.816729','user',27,'할리갈리 할래'),(51,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/27-4.wav','2024-02-15 16:44:38.715179','ai',27,'네, 할리갈리 해볼까요?'),(52,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/28-1.mp3','2024-02-15 16:46:59.350602','user',28,'나 심심해 놀아 줘'),(53,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/28-2.wav','2024-02-15 16:47:01.061955','ai',28,'네! 함께 노는 게임 할까요?'),(54,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/28-3.mp3','2024-02-15 16:47:19.906615','user',28,'게임  뭐 할 수 있는데'),(55,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/28-4.wav','2024-02-15 16:47:22.587109','ai',28,'게임을 많이 할 수 있어! 숫자맞히기, 가고 싶은 나라 맞추기, 또는 동물 소리들어보기 등! 뭐 해볼래?'),(56,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/29-1.mp3','2024-02-15 16:59:41.608023','user',29,'나 심심해 놀아 줘'),(57,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/29-2.wav','2024-02-15 16:59:43.401903','ai',29,'물놀이하자! 함께 물방울 튀기기를 해보자!'),(58,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/29-3.mp3','2024-02-15 17:00:02.423189','user',29,'우와 엄마도 같이 해도 돼'),(59,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/29-4.wav','2024-02-15 17:00:04.863834','ai',29,'당연하죠! 엄마와 함께 대화하는 것도 좋아요. 어떤 이야기 하고 싶어요?'),(60,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/30-1.mp3','2024-02-15 17:02:42.945192','user',30,'엄마랑 놀고 싶어'),(61,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/30-2.wav','2024-02-15 17:02:44.710663','ai',30,'그래 엄마랑 재밌게 놀아봐!'),(62,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-1.mp3','2024-02-15 17:04:25.789981','user',31,'심심해 놀아 줘'),(63,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-2.wav','2024-02-15 17:04:26.858290','ai',31,'물놀이 할래?'),(64,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-3.mp3','2024-02-15 17:04:40.013478','user',31,'물 놀이 좋아 엄마도 같이 갈래'),(65,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-4.wav','2024-02-15 17:04:42.183859','ai',31,'네, 엄마와 함께 물놀이 하면 더 재미있겠어요! 같이 가요!'),(66,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-5.mp3','2024-02-15 17:05:00.775560','user',31,'싫어'),(67,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-6.wav','2024-02-15 17:05:03.793329','ai',31,'미안해요. 그런 생각이 든 걸로 알아서, 저는 당신과 친해지기를 원하는데요. 함께 놀아줄까요?'),(68,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-7.mp3','2024-02-15 17:05:27.231682','user',31,'근데 반말 해야지'),(69,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/31-8.wav','2024-02-15 17:05:29.315007','ai',31,'네, 그럼요! 어떤 이야기를 하고 싶으세요? 함께 얘기해요!'),(70,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/32-1.mp3','2024-02-15 17:18:52.696043','user',32,'내일 날씨 알려 줘'),(71,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/32-2.wav','2024-02-15 17:18:55.400033','ai',32,'오늘은 날씨 정보를 알려드리는 기능이 제한되어 죄송합니다. 다른 것에 대해 이야기하고 싶으시면 말해주세요!'),(72,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/33-1.mp3','2024-02-15 17:20:30.230885','user',33,'아빠 있어  1 더하기 1은 뭐야'),(73,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/33-2.wav','2024-02-15 17:20:31.970230','ai',33,'1 더하기 1은 2야! 어떤 다른 문제 있니?'),(74,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/33-3.mp3','2024-02-15 17:20:48.882918','user',33,'케르베로스 보안 프로토콜에 대해서'),(75,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/33-4.wav','2024-02-15 17:20:56.889889','ai',33,'케르베로스 보안 프로토콜은 인증을 위한 네트워크 프로토콜이야! 잘 알아보는구나!'),(76,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-1.mp3','2024-02-15 17:25:22.335843','user',34,'안녕'),(77,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-2.wav','2024-02-15 17:25:23.595015','ai',34,'안녕! 어떻게 지내?'),(78,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-3.mp3','2024-02-15 17:25:37.318986','user',34,'어 난 잘 지내지 너는'),(79,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-4.wav','2024-02-15 17:25:39.218549','ai',34,'저는 잘 지내요! 언제든지 얘기하러 와주세요~'),(80,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-5.mp3','2024-02-15 17:25:55.946358','user',34,'나 너무 심심해 집에 아무도 없어'),(81,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-6.wav','2024-02-15 17:25:59.212958','ai',34,'아무도 없어도 너는 적당히 놀 수 있는 방법을 찾을 수 있어! 예를 들면 책 읽기, 그림 그리기, 또는 노래 부르기 등이 있어! 재미있는 시간 보내자!'),(82,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-7.mp3','2024-02-15 17:26:27.358784','user',34,'나랑 어떻게 놀아 줄 건데'),(83,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-8.wav','2024-02-15 17:26:30.144608','ai',34,'우리 함께 말 재미있게 나눌 수 있어! 질문이나 이야기 해봐. 함께 놀다보면 더 친해질거야!'),(84,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-9.mp3','2024-02-15 17:26:52.275157','user',34,'참 착한 아이로구나'),(85,'https://s3.ap-northeast-2.amazonaws.com/puroon/upload/talk/2024-02-15/34-10.wav','2024-02-15 17:26:54.322613','ai',34,'감사해요! 저는 항상 착하려고 노력해요. 함께 재밌는 시간 보내요!');
/*!40000 ALTER TABLE `sentence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species` (
  `species_id` int NOT NULL AUTO_INCREMENT,
  `species_name` varchar(20) NOT NULL,
  `min_temperature` double DEFAULT NULL,
  `max_temperature` double DEFAULT NULL,
  `min_moisture` double DEFAULT NULL,
  `max_moisture` double DEFAULT NULL,
  PRIMARY KEY (`species_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (4,'방울토마토',18,24,60,80),(5,'바질',18,25,50,75),(6,'상추',10,20,70,80),(7,'대파',12,24,60,80),(8,'꽃양배추',12,20,70,85),(9,'토마토',15,30,50,80),(10,'오이',18,28,60,90),(11,'파프리카',20,30,40,70),(12,'케일',10,25,60,80),(13,'당근',10,25,50,70),(14,'딸기',15,25,60,80),(15,'양배추',10,25,70,90),(16,'팥',15,25,50,70),(17,'감자',10,20,70,80),(18,'시금치',10,25,60,80),(19,'로즈마리',18,25,40,60),(20,'생강',20,30,60,80),(21,'샐러리',15,25,70,90),(22,'레몬밤',25,35,50,70),(23,'민트',15,25,50,70),(24,'브로콜리',10,25,70,90),(25,'라벤더',15,30,40,60),(26,'루꼴라',10,25,70,90),(27,'팔곡초',20,30,50,70),(28,'카모마일',15,25,40,60);
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talk`
--

DROP TABLE IF EXISTS `talk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talk` (
  `talk_id` int NOT NULL AUTO_INCREMENT,
  `talk_title` varchar(30) NOT NULL,
  `talk_DT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_FG` tinyint NOT NULL DEFAULT '0',
  `pot_id` int NOT NULL,
  `star_FG` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`talk_id`),
  KEY `FK_0ed4620e1cf7efe0cc56dd0761f` (`pot_id`),
  CONSTRAINT `FK_0ed4620e1cf7efe0cc56dd0761f` FOREIGN KEY (`pot_id`) REFERENCES `pot` (`pot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talk`
--

LOCK TABLES `talk` WRITE;
/*!40000 ALTER TABLE `talk` DISABLE KEYS */;
INSERT INTO `talk` VALUES (1,'넣었다','2024-02-13 08:48:01',1,1,0),(4,'르세라핌/과 /해린/의 대화','2024-02-14 00:00:00',1,1,0),(9,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,0),(10,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,0),(11,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,1),(12,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,0),(13,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,0),(14,'르세라핌과 해린의 대화','2024-02-14 00:00:00',1,1,0),(15,'상추에용과 펭키의 대화','2024-02-15 00:00:00',1,7,1),(16,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(17,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(18,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,1),(19,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,1),(20,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(21,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(22,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(23,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(24,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(25,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(26,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(27,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(28,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(29,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(30,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(31,'신선과 동호의 대화','2024-02-15 00:00:00',1,11,0),(32,'신선과 동호의 대화','2024-02-15 00:00:00',0,11,0),(33,'신선과 동호의 대화','2024-02-15 00:00:00',0,11,0),(34,'신선과 동호의 대화','2024-02-15 00:00:00',0,11,0);
/*!40000 ALTER TABLE `talk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(10) NOT NULL,
  `birth_DT` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `profile_img_url` varchar(200) DEFAULT '/dist/user../upload/image/noImage.jpg',
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_acb096eef4d8b5acdd7acbb5c84` (`parent_id`),
  CONSTRAINT `FK_acb096eef4d8b5acdd7acbb5c84` FOREIGN KEY (`parent_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'개추','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(4,'해린','2024-02-13','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(5,'뉴진스','1990-01-01','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(6,'다니엘','2024-02-13','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',5),(7,'123123','2024-02-13','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',5),(8,'111111','2024-02-13','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',5),(10,'사쿠라여','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(11,'코치','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(12,'최지누','2024-02-14','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',10),(15,'펭키','2024-02-14','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(16,'연빈맘','1990-06-04','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(17,'도로롱','2024-02-14','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(18,'까부냥','2024-02-14','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(20,'연빈이','2024-02-04','F','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/profile/20.png',16),(22,'박지예입니다','1997-02-04','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(23,'컨설턴트','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(24,'동호맘','1999-06-04','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/24.png',NULL),(25,'xptmxm','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(26,'동호','2019-02-02','M','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/profile/26.jpg',24),(27,'이티에이동호','1999-01-21','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(29,'사피','2024-02-15','M','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/profile/29.jpg',10),(30,'qqq','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(31,'루비','2019-01-01','F','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/profile/31.png',24),(32,'박종국','1968-10-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(33,'안녕','2024-02-15','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(37,'힝','2024-02-15','M','https://s3.ap-northeast-2.amazonaws.com/puroon/upload/profile/37.jpg',3),(41,'아이에용','2024-02-15','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',3),(49,'테스트용11','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(50,'배고파용','1990-01-01','F','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL),(51,'용','1990-01-01','M','https://puroon.s3.ap-northeast-2.amazonaws.com/upload/profile/noImg.png',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login` (
  `user_login_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(10) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_login_id`),
  UNIQUE KEY `REL_3867141329f8f8ce448af93b4b` (`user_id`),
  CONSTRAINT `FK_3867141329f8f8ce448af93b4b5` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (2,'하니','test@test.com','1234',3),(3,'민지','test2@test.com','1234',5),(4,'사쿠라','test3@test.com','1234',10),(5,'코치','coach@coach.com','coach1234',11),(6,'한성주','hsj0604@abc.com','ssafy123',16),(7,'컨설턴트','hice95@nate.com','1q2w3e4r!',23),(8,'한성주','tjdwn@test.com','ssafy123',24),(9,'sadfsadf','fsdafasdfsda@asdf','xptmxmxptmxm',25),(10,'진짜이동호','movingtiger@naver.com','qqqq1111',27),(11,'qqq','joyongun417@gmail.com','aA57404040!',30),(12,'박종국입니다','whdrnr@whdrnr','1234',32),(13,'테스트2','test13@test.com','123123',49),(14,'졸려용','123@123123.com','qwe123',50),(15,'이상해','qwe@qwe.com','123123',51);
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  9:05:59
