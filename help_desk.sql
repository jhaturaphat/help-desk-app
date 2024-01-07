/*
 Navicat Premium Data Transfer

 Source Server         : localhost_nopassword
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : help_desk

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 07/01/2024 13:36:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for assets
-- ----------------------------
DROP TABLE IF EXISTS `assets`;
CREATE TABLE `assets`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัส',
  `device_id` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ประเถท',
  `year` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ปีที่รับเครื่อง',
  `location_id` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'สถานที่ติดตั้ง',
  `number` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'เครื่องที่',
  `stock_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'เลขครุภัณฑ์',
  `serial_number` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ซีเรียลนัมเบอร์',
  `remark` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT 'หมายเหตุ',
  `member` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ผู้ใช้',
  `job_position_id` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ตำแหน่งงาน',
  `raminfo_id` int NULL DEFAULT NULL COMMENT 'หน่วยความจำแรม',
  `osinfo_id` int NULL DEFAULT NULL COMMENT 'ระบบปฏิบัติการ',
  `vgainfo_id` int NULL DEFAULT NULL COMMENT 'กราฟฟิกการ์ด',
  `vender` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ผู้ผลิต',
  `status` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '1=ปกติ 2=รอจำหน่าย 3=จำหน่าย/ตัดซำรุด',
  `printer_id` int NULL DEFAULT NULL COMMENT 'ชนิดปริ้นเตอร์',
  `department_id` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 537 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for assets_has_cpuinfo
-- ----------------------------
DROP TABLE IF EXISTS `assets_has_cpuinfo`;
CREATE TABLE `assets_has_cpuinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpuinfo_id` int NOT NULL,
  `assets_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 249 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for assets_has_storageinfo
-- ----------------------------
DROP TABLE IF EXISTS `assets_has_storageinfo`;
CREATE TABLE `assets_has_storageinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `storageinfo_id` int NOT NULL,
  `assets_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 338 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for cpuinfo
-- ----------------------------
DROP TABLE IF EXISTS `cpuinfo`;
CREATE TABLE `cpuinfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `vender` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cpu_core` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `clock_speed` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for deviceinfo
-- ----------------------------
DROP TABLE IF EXISTS `deviceinfo`;
CREATE TABLE `deviceinfo`  (
  `id` varchar(4) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` enum('0','1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'อุปกรณ์' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for job_position
-- ----------------------------
DROP TABLE IF EXISTS `job_position`;
CREATE TABLE `job_position`  (
  `id` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `id` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'สถานที่' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'รหัส',
  `firstname` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ชื่อ',
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'นามสกุล',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'รหัสผ่าน',
  `active` enum('Y','N') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Y' COMMENT 'สถานะใช้งาน',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'อีเมล์',
  `premission` enum('Administrator','Member') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Member' COMMENT 'สิทธิการเข้าถึง',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `idx_email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for osinfo
-- ----------------------------
DROP TABLE IF EXISTS `osinfo`;
CREATE TABLE `osinfo`  (
  `id` int NOT NULL,
  `vender` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `os_ver` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for printer_info
-- ----------------------------
DROP TABLE IF EXISTS `printer_info`;
CREATE TABLE `printer_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for raminfo
-- ----------------------------
DROP TABLE IF EXISTS `raminfo`;
CREATE TABLE `raminfo`  (
  `id` int NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `capacity` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `unit` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for storageinfo
-- ----------------------------
DROP TABLE IF EXISTS `storageinfo`;
CREATE TABLE `storageinfo`  (
  `id` int NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `capacity` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for vgainfo
-- ----------------------------
DROP TABLE IF EXISTS `vgainfo`;
CREATE TABLE `vgainfo`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `vender` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `capacity` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `unit` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
