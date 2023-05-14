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

 Date: 19/02/2023 01:52:16
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
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '手机号',
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

-- ----------------------------
-- Table structure for reg_doctor
-- ----------------------------
DROP TABLE IF EXISTS `reg_doctor`;
CREATE TABLE `reg_doctor`  (
  `id` bigint NOT NULL COMMENT '医生id',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '医生用户名',
  `pwd` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '密码',
  `age` int NULL DEFAULT NULL COMMENT '年龄',
  `gender` tinyint(1) NULL DEFAULT NULL COMMENT '性别（0=其他，1=男，2=女）',
  `mobile` int NULL DEFAULT NULL COMMENT '手机号',
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL COMMENT '医生简介',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '头像url',
  `sur_id` varbinary(255) NULL DEFAULT NULL COMMENT '诊室id',
  `is_enabled` tinyint(1) NULL DEFAULT NULL COMMENT '是否启用',
  `is_del` tinyint(1) NULL DEFAULT NULL COMMENT '删除标记',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人id',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reg_doctor
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
