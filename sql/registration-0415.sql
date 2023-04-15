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

 Date: 15/04/2023 23:58:46
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
INSERT INTO `reg_admin` VALUES (7046866874312687616, 'user2', '7c4a8d09ca3762af61e59520943dc26494f8941b', '普通用户', '', '13800138000', '', NULL, 1, 0, '2023-03-29 23:33:07', 'admin', '2023-03-29 23:50:52', 'admin');

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
INSERT INTO `reg_doctor` VALUES (7049763415931224064, 'doctor1', '123456', '陈医生', 50, 1, '13800138000', '', NULL, 2, 1, 0, '2023-04-06 23:22:57', 'admin', '2023-04-06 23:22:57', 'admin');

-- ----------------------------
-- Table structure for reg_doctor_resource
-- ----------------------------
DROP TABLE IF EXISTS `reg_doctor_resource`;
CREATE TABLE `reg_doctor_resource`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '资源ID',
  `schedule_date` datetime NULL DEFAULT NULL COMMENT '号源日期',
  `doc_id` bigint NULL DEFAULT NULL COMMENT '医生ID',
  `doc_schedule_id` int NULL DEFAULT NULL COMMENT '医生排班ID',
  `resource_count` int NULL DEFAULT NULL COMMENT '号源数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_doctor_resource
-- ----------------------------

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reg_doctor_schedule
-- ----------------------------

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
INSERT INTO `reg_user` VALUES (7050764924290596865, 'user1', '123456', '张三', 20, 1, '13811111111', '111111111111111111', 1, 0, '2023-04-09 17:42:35', 'admin', '2023-04-09 17:42:35', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
