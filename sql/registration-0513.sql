/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : registration

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 13/05/2023 23:16:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for reg_admin
-- ----------------------------
DROP TABLE IF EXISTS `reg_admin`;
CREATE TABLE `reg_admin`  (
  `id` bigint NOT NULL COMMENT '管理员ID',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '密码',
  `nick_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `mobile` char(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '备注',
  `role_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '角色ID',
  `is_enabled` tinyint(1) NULL DEFAULT NULL COMMENT '是否启用',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reg_admin
-- ----------------------------
INSERT INTO `reg_admin` VALUES (7028003900282109953, 'admin', '7c4a8d09ca3762af61e59520943dc26494f8941b', '管理员', NULL, NULL, NULL, 'admin', 1, 0, NULL, NULL, NULL, NULL);
INSERT INTO `reg_admin` VALUES (7049763415931224064, 'doctor1', '7c4a8d09ca3762af61e59520943dc26494f8941b', '陈医生', NULL, '13800138001', NULL, 'doctor', 1, 0, '2023-05-07 16:47:54', 'admin', '2023-05-07 16:47:54', 'admin');
INSERT INTO `reg_admin` VALUES (7060898024161017857, 'doctor2', '7c4a8d09ca3762af61e59520943dc26494f8941b', '高医生', '', '13800138002', NULL, 'doctor', 1, 0, '2023-05-07 16:47:54', 'admin', '2023-05-07 16:47:54', 'admin');

-- ----------------------------
-- Table structure for reg_announcement
-- ----------------------------
DROP TABLE IF EXISTS `reg_announcement`;
CREATE TABLE `reg_announcement`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `type` int NULL DEFAULT NULL COMMENT '公告类型',
  `relate_id` bigint NULL DEFAULT NULL COMMENT '关联ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标题',
  `content` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '公告内容',
  `is_enabled` tinyint(1) NULL DEFAULT NULL COMMENT '是否启用',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_announcement
-- ----------------------------
INSERT INTO `reg_announcement` VALUES (1, 1, NULL, '系统试运行', '挂号系统于4月1日上线试运行，欢迎提交意见与建议！', 1, 0, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for reg_appointment
-- ----------------------------
DROP TABLE IF EXISTS `reg_appointment`;
CREATE TABLE `reg_appointment`  (
  `id` bigint NOT NULL COMMENT '预约ID',
  `doc_id` bigint NULL DEFAULT NULL COMMENT '医生ID',
  `doc_schedule_id` int NULL DEFAULT NULL COMMENT '排班ID',
  `user_id` bigint NULL DEFAULT NULL COMMENT '患者ID',
  `diagnose_time` datetime NULL DEFAULT NULL COMMENT '就诊时间',
  `diagnose_result` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '就诊结果',
  `status` int NULL DEFAULT NULL COMMENT '预约状态（1=已预约，2=等待诊断，3=已诊断）',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人id',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_appointment
-- ----------------------------
INSERT INTO `reg_appointment` VALUES (7058783482090094593, 7049763415931224064, 17, 7050764924290596865, '2020-01-01 09:00:00', NULL, 4, '2023-05-01 20:45:28', 'user1', '2023-05-03 23:16:51', 'user1');
INSERT INTO `reg_appointment` VALUES (7058789180312125441, 7049763415931224064, 17, 7050764924290596865, '2020-01-01 09:00:00', NULL, 1, '2023-05-01 21:08:07', 'user1', '2023-05-01 21:08:35', 'user1');
INSERT INTO `reg_appointment` VALUES (7059526861606354945, 7049763415931224064, 24, 7050764924290596865, '2020-01-01 09:00:00', NULL, 2, '2023-05-03 21:59:23', 'user1', '2023-05-03 23:15:46', 'user1');
INSERT INTO `reg_appointment` VALUES (7059527657974661121, 7049763415931224064, 26, 7050764924290596865, '2023-05-03 09:30:00', NULL, 2, '2023-05-03 22:02:33', 'user1', '2023-05-03 23:10:26', 'user1');
INSERT INTO `reg_appointment` VALUES (7059546270454513665, 7049763415931224064, 27, 7050764924290596865, '2023-05-03 10:00:00', NULL, 1, '2023-05-03 23:16:31', 'user1', '2023-05-03 23:16:34', 'user1');
INSERT INTO `reg_appointment` VALUES (7060913873185931265, 7060898024161017857, 35, 7050764924290596865, '2023-05-07 09:00:00', '大师法第三方撒地方阿斯顿发送到发多少\n222222\n啊啊啊啊大地飞歌公告', 3, '2023-05-07 17:50:53', 'user1', '2023-05-07 18:49:37', 'doctor2');
INSERT INTO `reg_appointment` VALUES (7060914034943459328, 7060898024161017857, 42, 7050764924290596865, '2023-05-07 13:00:00', NULL, 2, '2023-05-07 17:51:31', 'user1', '2023-05-09 22:28:56', 'user1');
INSERT INTO `reg_appointment` VALUES (7060938145660928001, 7060898024161017857, 35, 7050764924290596865, '2023-05-07 09:00:00', NULL, 1, '2023-05-07 19:27:20', 'user1', '2023-05-07 19:27:27', 'user1');
INSERT INTO `reg_appointment` VALUES (7060979399186710528, 7049763415931224064, 25, 7050764924290596865, '2023-05-07 09:00:00', NULL, 1, '2023-05-07 22:11:15', 'user1', '2023-05-07 22:13:41', 'user1');
INSERT INTO `reg_appointment` VALUES (7063109188932599809, 7049763415931224064, 97, 7050764924290596865, '2023-05-13 10:00:00', NULL, 1, '2023-05-13 19:14:17', 'user1', '2023-05-13 19:14:18', 'user1');

-- ----------------------------
-- Table structure for reg_config
-- ----------------------------
DROP TABLE IF EXISTS `reg_config`;
CREATE TABLE `reg_config`  (
  `conf_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '配置编码',
  `conf_value` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '配置内容',
  PRIMARY KEY (`conf_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_config
-- ----------------------------
INSERT INTO `reg_config` VALUES ('generateTime', '2023-05-13T02:00:57.000Z');
INSERT INTO `reg_config` VALUES ('holdApiUrl', NULL);
INSERT INTO `reg_config` VALUES ('notifyApiUrl', NULL);

-- ----------------------------
-- Table structure for reg_department
-- ----------------------------
DROP TABLE IF EXISTS `reg_department`;
CREATE TABLE `reg_department`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '科室ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '科室名称',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '诊室简介',
  `parent_id` int NULL DEFAULT NULL COMMENT '上级诊室ID',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人id',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_department
-- ----------------------------
INSERT INTO `reg_department` VALUES (1, '总院', '', NULL, 0, '2023-03-30 23:43:08', 'admin', '2023-03-30 23:43:08', 'admin');
INSERT INTO `reg_department` VALUES (2, '外科', '', 1, 0, '2023-03-30 23:44:23', 'admin', '2023-03-30 23:44:23', 'admin');
INSERT INTO `reg_department` VALUES (3, '内科', '', 1, 0, '2023-03-30 23:44:41', 'admin', '2023-03-30 23:44:41', 'admin');

-- ----------------------------
-- Table structure for reg_doctor
-- ----------------------------
DROP TABLE IF EXISTS `reg_doctor`;
CREATE TABLE `reg_doctor`  (
  `id` bigint NOT NULL COMMENT '医生id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '医生用户名',
  `pwd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '密码',
  `real_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '医生姓名',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `gender` tinyint(1) NULL DEFAULT NULL COMMENT '性别（0=其他，1=男，2=女）',
  `mobile` char(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '医生简介',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '头像URL',
  `dept_id` int NULL DEFAULT NULL COMMENT '科室ID',
  `is_enabled` tinyint(1) NULL DEFAULT NULL COMMENT '是否启用',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reg_doctor
-- ----------------------------
INSERT INTO `reg_doctor` VALUES (7049763415931224064, 'doctor1', '7c4a8d09ca3762af61e59520943dc26494f8941b', '陈医生', 50, 1, '13800138000', '', NULL, 2, 1, 0, '2023-04-06 23:22:57', 'admin', '2023-04-06 23:22:57', 'admin');
INSERT INTO `reg_doctor` VALUES (7060898024161017857, 'doctor2', '7c4a8d09ca3762af61e59520943dc26494f8941b', '高医生', 40, 2, '13800138002', '', NULL, 3, 1, 0, '2023-05-07 16:47:54', 'admin', '2023-05-07 16:47:54', 'admin');

-- ----------------------------
-- Table structure for reg_doctor_resource
-- ----------------------------
DROP TABLE IF EXISTS `reg_doctor_resource`;
CREATE TABLE `reg_doctor_resource`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `schedule_date` datetime NULL DEFAULT NULL COMMENT '号源日期',
  `doc_id` bigint NULL DEFAULT NULL COMMENT '医生ID',
  `doc_schedule_id` int NULL DEFAULT NULL COMMENT '医生排班ID',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  `resource_count` int NULL DEFAULT NULL COMMENT '号源数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_doctor_resource
-- ----------------------------
INSERT INTO `reg_doctor_resource` VALUES (36, '2023-05-13 00:00:00', 7049763415931224064, 88, '2020-01-01 08:30:00', '2020-01-01 09:00:00', 1);
INSERT INTO `reg_doctor_resource` VALUES (37, '2023-05-13 00:00:00', 7049763415931224064, 91, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 1);
INSERT INTO `reg_doctor_resource` VALUES (38, '2023-05-13 00:00:00', 7049763415931224064, 94, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 2);
INSERT INTO `reg_doctor_resource` VALUES (39, '2023-05-13 00:00:00', 7049763415931224064, 97, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 2);
INSERT INTO `reg_doctor_resource` VALUES (40, '2023-05-13 00:00:00', 7049763415931224064, 101, '2020-01-01 16:30:00', '2020-01-01 17:00:00', 2);
INSERT INTO `reg_doctor_resource` VALUES (41, '2023-05-13 00:00:00', 7060898024161017857, 107, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 5);
INSERT INTO `reg_doctor_resource` VALUES (42, '2023-05-13 00:00:00', 7060898024161017857, 114, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 1);
INSERT INTO `reg_doctor_resource` VALUES (43, '2023-05-13 00:00:00', 7060898024161017857, 121, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 1);
INSERT INTO `reg_doctor_resource` VALUES (44, '2023-05-13 00:00:00', 7060898024161017857, 128, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 5);
INSERT INTO `reg_doctor_resource` VALUES (45, '2023-05-13 00:00:00', 7060898024161017857, 135, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 10);

-- ----------------------------
-- Table structure for reg_doctor_schedule
-- ----------------------------
DROP TABLE IF EXISTS `reg_doctor_schedule`;
CREATE TABLE `reg_doctor_schedule`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '排班ID',
  `doc_id` bigint NULL DEFAULT NULL COMMENT '医生ID',
  `start_time` datetime NULL DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime NULL DEFAULT NULL COMMENT '结束时间',
  `day_of_week` int NULL DEFAULT NULL COMMENT '排班日期（星期几）',
  `resource_count` int NULL DEFAULT NULL COMMENT '号源数量',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_doctor_schedule
-- ----------------------------
INSERT INTO `reg_doctor_schedule` VALUES (84, 7049763415931224064, '2020-01-01 08:00:00', '2020-01-01 08:30:00', 1, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (85, 7049763415931224064, '2020-01-01 08:00:00', '2020-01-01 08:30:00', 2, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (86, 7049763415931224064, '2020-01-01 08:30:00', '2020-01-01 09:00:00', 1, 2, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (87, 7049763415931224064, '2020-01-01 08:30:00', '2020-01-01 09:00:00', 2, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (88, 7049763415931224064, '2020-01-01 08:30:00', '2020-01-01 09:00:00', 6, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (89, 7049763415931224064, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 1, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (90, 7049763415931224064, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 3, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (91, 7049763415931224064, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 6, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (92, 7049763415931224064, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 7, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (93, 7049763415931224064, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 3, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (94, 7049763415931224064, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 6, 2, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (95, 7049763415931224064, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 7, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (96, 7049763415931224064, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 3, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (97, 7049763415931224064, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 6, 3, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (98, 7049763415931224064, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 7, 1, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (99, 7049763415931224064, '2020-01-01 10:30:00', '2020-01-01 11:00:00', 3, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (100, 7049763415931224064, '2020-01-01 10:30:00', '2020-01-01 11:00:00', 7, 5, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (101, 7049763415931224064, '2020-01-01 16:30:00', '2020-01-01 17:00:00', 6, 2, '2023-05-13 19:13:16', 'admin', '2023-05-13 19:13:16', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (102, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 1, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (103, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 2, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (104, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 3, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (105, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 4, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (106, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 5, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (107, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 6, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (108, 7060898024161017857, '2020-01-01 09:00:00', '2020-01-01 09:30:00', 7, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (109, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 1, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (110, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 2, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (111, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 3, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (112, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 4, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (113, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 5, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (114, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 6, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (115, 7060898024161017857, '2020-01-01 09:30:00', '2020-01-01 10:00:00', 7, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (116, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 1, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (117, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 2, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (118, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 3, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (119, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 4, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (120, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 5, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (121, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 6, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (122, 7060898024161017857, '2020-01-01 10:00:00', '2020-01-01 10:30:00', 7, 1, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (123, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 1, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (124, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 2, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (125, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 3, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (126, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 4, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (127, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 5, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (128, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 6, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (129, 7060898024161017857, '2020-01-01 13:00:00', '2020-01-01 13:30:00', 7, 5, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (130, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 1, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (131, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 2, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (132, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 3, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (133, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 4, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (134, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 5, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (135, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 6, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');
INSERT INTO `reg_doctor_schedule` VALUES (136, 7060898024161017857, '2020-01-01 13:30:00', '2020-01-01 14:00:00', 7, 10, '2023-05-13 19:13:41', 'admin', '2023-05-13 19:13:41', 'admin');

-- ----------------------------
-- Table structure for reg_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `reg_operation_log`;
CREATE TABLE `reg_operation_log`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `module_id` int NULL DEFAULT NULL COMMENT '模块ID',
  `module_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模块名称',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '日志内容',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for reg_user
-- ----------------------------
DROP TABLE IF EXISTS `reg_user`;
CREATE TABLE `reg_user`  (
  `id` bigint NOT NULL COMMENT '患者ID',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户名',
  `pwd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '密码',
  `real_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '患者姓名',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `gender` tinyint(1) NULL DEFAULT NULL COMMENT '性别（0=其他，1=男，2=女）',
  `mobile` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `id_card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证号',
  `is_enabled` tinyint(1) NULL DEFAULT NULL COMMENT '是否启用',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人ID',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_user
-- ----------------------------
INSERT INTO `reg_user` VALUES (7050764924290596865, 'user1', '7c4a8d09ca3762af61e59520943dc26494f8941b', '张三', 20, 1, '13811111111', '111111111111111111', 1, 0, '2023-04-09 17:42:35', 'admin', '2023-04-09 17:42:35', 'admin');
INSERT INTO `reg_user` VALUES (7062453757977559040, 'user2', '7c4a8d09ca3762af61e59520943dc26494f8941b', '李四', 33, 1, '13800138002', '111111111111112222', 1, 0, '2023-05-11 23:49:50', 'admin', '2023-05-11 23:49:50', 'admin');
INSERT INTO `reg_user` VALUES (7063168736569589760, 'user3', '7c4a8d09ca3762af61e59520943dc26494f8941b', '王五', 27, 0, '13800137003', '111155444466667777', 1, 0, '2023-05-13 23:10:54', 'system', '2023-05-13 23:10:54', 'system');

SET FOREIGN_KEY_CHECKS = 1;
