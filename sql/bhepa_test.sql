-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bhepa_test
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `baucar`
--

DROP TABLE IF EXISTS `baucar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baucar` (
  `baucar_id` int NOT NULL AUTO_INCREMENT,
  `baucar_code` char(7) NOT NULL,
  `baucar_apply_date` date DEFAULT NULL,
  `baucar_apply_time` time DEFAULT NULL,
  `baucar_due_date` date DEFAULT NULL,
  `baucar_status` varchar(25) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `baucar_redeem_date` date DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  PRIMARY KEY (`baucar_id`),
  UNIQUE KEY `baucar_code` (`baucar_code`),
  KEY `user_id` (`user_id`),
  KEY `fk_baucar_vendor` (`vendor_id`),
  CONSTRAINT `baucar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`),
  CONSTRAINT `fk_baucar_vendor` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baucar`
--

LOCK TABLES `baucar` WRITE;
/*!40000 ALTER TABLE `baucar` DISABLE KEYS */;
INSERT INTO `baucar` VALUES (107,'FZQVMH','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(108,'VOGB06','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',10),(109,'NG0UTV','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',11),(110,'4BXT94','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',10),(111,'NCLD4L','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',10),(112,'KJ83JC','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',10),(113,'4XEADJ','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',10),(114,'H49SCR','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',12),(115,'767A1X','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(116,'C4CAYP','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(117,'47EENT','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',17),(118,'KT22WK','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(119,'BBOSSA','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',17),(120,'R1U75L','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',17),(121,'CK2L2Y','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(122,'YSG1B1','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',17),(123,'DOVHBR','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(124,'XT0F09','2023-11-09','09:18:42','2023-12-31','aktif','202124',NULL,NULL),(125,'45KQJQ','2023-11-09','09:18:42','2023-12-31','tebus','202124','2023-11-09',16),(126,'IPWDAZ','2023-11-09','09:18:42','2023-12-31','tuntut','202124','2023-11-09',17);
/*!40000 ALTER TABLE `baucar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_application`
--

DROP TABLE IF EXISTS `food_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_application` (
  `request_id` varchar(36) NOT NULL,
  `sponsor_type` varchar(50) DEFAULT NULL,
  `ic_num_file` varchar(255) DEFAULT NULL,
  `payment_slip_file` varchar(255) DEFAULT NULL,
  `food_justification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  CONSTRAINT `food_application_ibfk_1` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_application`
--

LOCK TABLES `food_application` WRITE;
/*!40000 ALTER TABLE `food_application` DISABLE KEYS */;
INSERT INTO `food_application` VALUES ('7a4528fa-c762-462d-b721-a1c9624fa30b','PTPTN','uploads/ic/aa78a5c1-3c90-48c9-89a7-f5d36f529518.png','uploads/paymentslip/9fba193c-1ee8-4132-a9ff-bb9c98ebab08.drawio','sd');
/*!40000 ALTER TABLE `food_application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `request_id` varchar(36) NOT NULL,
  `requestor_id` varchar(10) DEFAULT NULL,
  `admin_approver_id` varchar(10) DEFAULT NULL,
  `bhepa_approver_id` varchar(10) DEFAULT NULL,
  `tnc_approver_id` varchar(10) DEFAULT NULL,
  `request_type` varchar(50) DEFAULT NULL,
  `request_status` varchar(25) DEFAULT NULL,
  `request_date` date DEFAULT NULL,
  `request_time` time DEFAULT NULL,
  `request_remark_admin` text,
  `request_remark_bhepa` text,
  `request_remark_tnc` text,
  PRIMARY KEY (`request_id`),
  KEY `requestor_id` (`requestor_id`),
  KEY `admin_approver_id` (`admin_approver_id`),
  KEY `bhepa_approver_id` (`bhepa_approver_id`),
  KEY `tnc_approver_id` (`tnc_approver_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`requestor_id`) REFERENCES `users` (`unique_id`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`admin_approver_id`) REFERENCES `users` (`unique_id`),
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`bhepa_approver_id`) REFERENCES `users` (`unique_id`),
  CONSTRAINT `request_ibfk_4` FOREIGN KEY (`tnc_approver_id`) REFERENCES `users` (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES ('7a4528fa-c762-462d-b721-a1c9624fa30b','202124','202124','202124',NULL,'makanan','lulus','2023-11-09','09:17:57','hola','huh\n',NULL);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `matric_number` varchar(6) DEFAULT NULL,
  `course_taken` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','123456','Computer Science'),(2,'test','123','Sastera'),(3,'test 2','123123','Usahawan'),(4,'test 3','12333','Biotech'),(5,'danial','123321','Science Comp'),(6,'test 55','123111','Bio'),(7,'new user','123213','Biology'),(8,'test1231','12322','Sains Hayat');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `unique_id` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roles` varchar(10) NOT NULL,
  PRIMARY KEY (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0001','admin@uni.com','admin_password','admin'),('123422','notstudent1@usm.com','test123','student'),('123456','notstudent1@usm.com','test123','student'),('150213','bhepa@uni.com','bhepa_password','bhepa'),('202124','student1@uni.com','student1_password','student'),('203144','student2@uni.com','student2_password','student'),('213122','student2@usm.com','test123','student'),('221222','danial@usm.com','test123','student');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_details`
--

DROP TABLE IF EXISTS `users_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_details` (
  `unique_id` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ic_num` varchar(12) NOT NULL,
  `phone_num` varchar(15) DEFAULT NULL,
  `school` varchar(100) DEFAULT NULL,
  `course` varchar(100) DEFAULT NULL,
  `student_status` varchar(2) DEFAULT NULL,
  `study_year` int DEFAULT NULL,
  PRIMARY KEY (`unique_id`),
  CONSTRAINT `users_details_ibfk_1` FOREIGN KEY (`unique_id`) REFERENCES `users` (`unique_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_details`
--

LOCK TABLES `users_details` WRITE;
/*!40000 ALTER TABLE `users_details` DISABLE KEYS */;
INSERT INTO `users_details` VALUES ('0001','admin@uni.com','Amin','1233337890','551-123-4567','-','-','-',0),('123422','notstudent1@usm.com','Student 1','123122','123122','CS','CS','UG',2),('150213','buddy@uni.com','Alia Aminah','9874444210','525-987-6543','Biology','Neurosurgeon','UG',4),('202124','student1@uni.com','Ali Ahmad','1234567890','555-123-4567','Computer Science','Computer Science','UG',3),('203144','student2@uni.com','Abu Aqil','9876543210','555-987-6543','Biology','Dentistry','PG',1),('213122','student2@usm.com','Student 2','23213','23213','231','2','PG',2),('221222','danial@usm.com','Danial','123123','123','CS','CS','UG',4);
/*!40000 ALTER TABLE `users_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendor` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `vendor_name` varchar(255) DEFAULT NULL,
  `vendor_location` varchar(100) DEFAULT NULL,
  `vendor_status` varchar(20) DEFAULT NULL,
  `vendor_description` varchar(255) DEFAULT NULL,
  `vendor_fullname` varchar(255) DEFAULT NULL,
  `vendor_phone` varchar(50) DEFAULT NULL,
  `vendor_email` varchar(100) DEFAULT NULL,
  `vendor_register_date` date DEFAULT NULL,
  `vendor_bank` varchar(50) DEFAULT NULL,
  `vendor_bank_acc` varchar(30) DEFAULT NULL,
  `vendor_bank_acc_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (10,'Yacob','Aman','Active','Description for Yacob','Yacob Fullname','1234567890','yacob@example.com','2023-11-08','maybank','12345678','Yacob Account'),(11,'Abdul Hamid','Bakti Permai','Inactive','Description for Abdul Hamid','Abdul Fullname','9876543210','abdul@example.com','2023-11-08','rhb','87654321','Abdul Account'),(12,'Rohani','Bakti Permai','Active','Description for Rohani','Rohani Fullname','5555555555','rohani@example.com','2023-11-08','cimb','11111111','Rohani Account'),(13,'Zulkifli','Cahaya Gemilang','Active','Description for Zulkifli','Zulkifli Fullname','9999999999','zulkifli@example.com','2023-11-08','bsn','22222222','Zulkifli Account'),(14,'Anamary','Fajar Harapan','Active','Description for Anamary','Anamary Fullname','7777777777','anamary@example.com','2023-11-08','bank rakyat','33333333','Anamary Account'),(15,'Suraini','Indah Kembara','Active','Description for Suraini','Suraini Fullname','8888888888','suraini@example.com','2023-11-08','maybank','44444444','Suraini Account'),(16,'Yusrina','Restu','Active','Description for Yusrina','Yusrina Fullname','6666666666','yusrina@example.com','2023-11-08','rhb','55555555','Yusrina Account'),(17,'Ashraf','Saujana','Active','Description for Ashraf','Ashraf Fullname','5555555555','ashraf@example.com','2023-11-08','cimb','66666666','Ashraf Account'),(18,'Erma','Tekun','Active','Description for Erma','Erma Fullname','4444444444','erma@example.com','2023-11-08','bsn','77777777','Erma Account'),(19,'Ali','Aman','active','Makan sedap','Ali Ahmad','123123','test@gmail.com','2023-11-09','Bank Rimau','222123','Ali Ahmad');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-09 23:02:58
