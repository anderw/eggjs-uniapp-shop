/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : eggjs-uniapp-shop

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 11/12/2020 18:14:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `thumbnail` int(11) NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  `mechant_id` int(11) NULL DEFAULT NULL,
  `status` int(3) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES (1, 'OPPO RENO4全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, NULL, NULL);
INSERT INTO `good` VALUES (2, 'VIV0 X50全面屏手机', NULL, '这里是描述', 12, 2, 1, 1, '2020-12-10 10:47:12', '2020-12-10 10:47:12');
INSERT INTO `good` VALUES (3, 'VIV0 X50全面屏手机', NULL, '这里是描述', 13, 2, 1, 1, '2020-12-10 10:47:58', '2020-12-10 10:47:58');
INSERT INTO `good` VALUES (4, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 10:48:26', '2020-12-10 10:48:26');
INSERT INTO `good` VALUES (5, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 10:48:30', '2020-12-10 10:48:30');
INSERT INTO `good` VALUES (6, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 10:52:58', '2020-12-10 10:52:58');
INSERT INTO `good` VALUES (7, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:16:58', '2020-12-10 11:16:58');
INSERT INTO `good` VALUES (8, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:17:41', '2020-12-10 11:17:41');
INSERT INTO `good` VALUES (9, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:24:09', '2020-12-10 11:24:09');
INSERT INTO `good` VALUES (10, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:25:32', '2020-12-10 11:25:32');
INSERT INTO `good` VALUES (11, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:26:16', '2020-12-10 11:26:16');
INSERT INTO `good` VALUES (12, 'VIV0 X50全面屏手机', NULL, '这里是描述', NULL, 2, 1, 1, '2020-12-10 11:26:49', '2020-12-10 11:26:49');
INSERT INTO `good` VALUES (13, 'abc', '', '', NULL, 2, 1, 1, '2020-12-11 17:45:27', '2020-12-11 17:45:27');
INSERT INTO `good` VALUES (14, 'asd', '', '', NULL, 2, 1, 1, '2020-12-11 17:47:36', '2020-12-11 17:47:36');
INSERT INTO `good` VALUES (15, 'asd', '', '', 31, 2, 1, 1, '2020-12-11 17:49:18', '2020-12-11 17:49:18');

-- ----------------------------
-- Table structure for good_category
-- ----------------------------
DROP TABLE IF EXISTS `good_category`;
CREATE TABLE `good_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_id` int(11) NULL DEFAULT NULL,
  `parent_id` int(11) NULL DEFAULT NULL,
  `mechant_id` int(11) NULL DEFAULT NULL,
  `status` int(3) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good_category
-- ----------------------------
INSERT INTO `good_category` VALUES (1, '手机数码', NULL, NULL, NULL, NULL, 1, '2020-12-09 16:55:46', '2020-12-09 16:55:46');
INSERT INTO `good_category` VALUES (2, '全面屏手机', NULL, NULL, 1, NULL, 1, '2020-12-09 16:56:05', '2020-12-09 16:56:05');
INSERT INTO `good_category` VALUES (3, '服装', '', NULL, NULL, NULL, 1, '2020-12-10 18:00:23', '2020-12-10 18:00:23');

-- ----------------------------
-- Table structure for good_image
-- ----------------------------
DROP TABLE IF EXISTS `good_image`;
CREATE TABLE `good_image`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_id` int(11) NULL DEFAULT NULL,
  `good_id` int(11) NULL DEFAULT NULL,
  `mechant_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good_image
-- ----------------------------
INSERT INTO `good_image` VALUES (1, 2, 1, 1, NULL, NULL);
INSERT INTO `good_image` VALUES (2, 2, 10, 1, '2020-12-10 11:25:32', '2020-12-10 11:25:32');
INSERT INTO `good_image` VALUES (3, 3, 10, 1, '2020-12-10 11:25:32', '2020-12-10 11:25:32');
INSERT INTO `good_image` VALUES (4, 2, 11, 1, '2020-12-10 11:26:16', '2020-12-10 11:26:16');
INSERT INTO `good_image` VALUES (5, 3, 11, 1, '2020-12-10 11:26:16', '2020-12-10 11:26:16');
INSERT INTO `good_image` VALUES (6, 2, 12, 1, '2020-12-10 11:26:49', '2020-12-10 11:26:49');
INSERT INTO `good_image` VALUES (7, 3, 12, 1, '2020-12-10 11:26:49', '2020-12-10 11:26:49');
INSERT INTO `good_image` VALUES (8, NULL, 13, 1, '2020-12-11 17:45:27', '2020-12-11 17:45:27');
INSERT INTO `good_image` VALUES (9, NULL, 14, 1, '2020-12-11 17:47:36', '2020-12-11 17:47:36');
INSERT INTO `good_image` VALUES (10, 31, 15, 1, '2020-12-11 17:49:18', '2020-12-11 17:49:18');

-- ----------------------------
-- Table structure for good_order
-- ----------------------------
DROP TABLE IF EXISTS `good_order`;
CREATE TABLE `good_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` enum('ordered','inpayment','paid','receiving','completed','canceled') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'ordered',
  `address_id` int(11) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link_man` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `goods_total_qty` int(11) NULL DEFAULT NULL,
  `total_amount` decimal(10, 0) NULL DEFAULT NULL,
  `merchant_id` int(11) NULL DEFAULT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for good_order_line
-- ----------------------------
DROP TABLE IF EXISTS `good_order_line`;
CREATE TABLE `good_order_line`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `good_id` int(11) NULL DEFAULT NULL,
  `good_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sale_price` decimal(10, 2) NULL DEFAULT NULL,
  `market_price` decimal(10, 2) NULL DEFAULT NULL,
  `qty` int(11) NULL DEFAULT NULL,
  `amount` decimal(10, 0) NULL DEFAULT NULL,
  `order_id` int(11) NULL DEFAULT NULL,
  `good_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `good_spec` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `good_category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `good_category_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for good_spec
-- ----------------------------
DROP TABLE IF EXISTS `good_spec`;
CREATE TABLE `good_spec`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sale_price` decimal(10, 2) NULL DEFAULT NULL,
  `market_price` decimal(10, 2) NULL DEFAULT NULL,
  `stock` int(9) NULL DEFAULT NULL,
  `good_id` int(11) NULL DEFAULT NULL,
  `mechant_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good_spec
-- ----------------------------
INSERT INTO `good_spec` VALUES (1, '4g+128g', NULL, NULL, 2100.00, 2400.00, 999, 1, 1, NULL, NULL);
INSERT INTO `good_spec` VALUES (2, '8+256g', NULL, NULL, 1300.00, 1500.00, 999, 12, 1, '2020-12-10 11:26:49', '2020-12-10 11:26:49');
INSERT INTO `good_spec` VALUES (3, 'ddd', NULL, NULL, 55.00, 77.00, 999, 13, 1, '2020-12-11 17:45:27', '2020-12-11 17:45:27');
INSERT INTO `good_spec` VALUES (4, 'asd', NULL, NULL, 44.00, 66.00, 999, 14, 1, '2020-12-11 17:47:36', '2020-12-11 17:47:36');
INSERT INTO `good_spec` VALUES (5, 'asdad', NULL, NULL, 44.00, 88.00, 999, 15, 1, '2020-12-11 17:49:18', '2020-12-11 17:49:18');

-- ----------------------------
-- Table structure for log_message
-- ----------------------------
DROP TABLE IF EXISTS `log_message`;
CREATE TABLE `log_message`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sender` int(11) NULL DEFAULT NULL,
  `receiver` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for merchant
-- ----------------------------
DROP TABLE IF EXISTS `merchant`;
CREATE TABLE `merchant`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `app_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `app_secret` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mch_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mch_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(9) NULL DEFAULT NULL,
  `status` int(3) NULL DEFAULT NULL,
  `logo_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of merchant
-- ----------------------------
INSERT INTO `merchant` VALUES (1, '良品铺子', '湖北武汉', NULL, NULL, NULL, NULL, 2, 1, NULL, '2020-12-09 16:14:55', '2020-12-11 15:05:05');

-- ----------------------------
-- Table structure for system_file
-- ----------------------------
DROP TABLE IF EXISTS `system_file`;
CREATE TABLE `system_file`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `format` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `size` double NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `creator` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_file
-- ----------------------------
INSERT INTO `system_file` VALUES (12, 'image/jpeg', '/public/uploads/2020/12/10/1607585710478612.2704601225427.jpg', 'app\\public\\uploads\\2020\\12\\10\\1607585710478612.2704601225427.jpg', 'image', 171293, '1607585710478612.2704601225427.jpg', NULL, '2020-12-10 15:35:10', '2020-12-10 15:35:10');
INSERT INTO `system_file` VALUES (13, 'image/png', '/public/uploads/2020/12/10/1607586268791316.45226868460276.png', 'app\\public\\uploads\\2020\\12\\10\\1607586268791316.45226868460276.png', 'image', 22944, '1607586268791316.45226868460276.png', NULL, '2020-12-10 15:44:28', '2020-12-10 15:44:28');
INSERT INTO `system_file` VALUES (14, 'image/png', '/public/uploads/2020/12/10/1607592942761197.40225089389307.png', 'app\\public\\uploads\\2020\\12\\10\\1607592942761197.40225089389307.png', 'image', 6617, '1607592942761197.40225089389307.png', NULL, '2020-12-10 17:35:42', '2020-12-10 17:35:42');
INSERT INTO `system_file` VALUES (15, 'image/png', '/public/uploads/2020/12/10/160759303238997.7343253091041.png', 'app\\public\\uploads\\2020\\12\\10\\160759303238997.7343253091041.png', 'image', 6617, '160759303238997.7343253091041.png', NULL, '2020-12-10 17:37:12', '2020-12-10 17:37:12');
INSERT INTO `system_file` VALUES (16, 'image/png', '/public/uploads/2020/12/10/1607593121493752.5884963335152.png', 'app\\public\\uploads\\2020\\12\\10\\1607593121493752.5884963335152.png', 'image', 6617, '1607593121493752.5884963335152.png', NULL, '2020-12-10 17:38:41', '2020-12-10 17:38:41');
INSERT INTO `system_file` VALUES (17, 'image/png', '/public/uploads/2020/12/11/160767562225622.812118527503202.png', 'app\\public\\uploads\\2020\\12\\11\\160767562225622.812118527503202.png', 'image', 6617, '160767562225622.812118527503202.png', NULL, '2020-12-11 16:33:42', '2020-12-11 16:33:42');
INSERT INTO `system_file` VALUES (18, 'image/png', '/public/uploads/2020/12/11/1607675781163465.5708824600693.png', 'app\\public\\uploads\\2020\\12\\11\\1607675781163465.5708824600693.png', 'image', 6617, '1607675781163465.5708824600693.png', NULL, '2020-12-11 16:36:21', '2020-12-11 16:36:21');
INSERT INTO `system_file` VALUES (19, 'image/png', '/public/uploads/2020/12/11/1607675868020564.3454779143904.png', 'app\\public\\uploads\\2020\\12\\11\\1607675868020564.3454779143904.png', 'image', 6617, '1607675868020564.3454779143904.png', NULL, '2020-12-11 16:37:48', '2020-12-11 16:37:48');
INSERT INTO `system_file` VALUES (20, 'image/png', '/public/uploads/2020/12/11/1607675947424568.7781510189842.png', 'app\\public\\uploads\\2020\\12\\11\\1607675947424568.7781510189842.png', 'image', 6617, '1607675947424568.7781510189842.png', NULL, '2020-12-11 16:39:07', '2020-12-11 16:39:07');
INSERT INTO `system_file` VALUES (21, 'image/png', '/public/uploads/2020/12/11/1607676018181360.8586906542668.png', 'app\\public\\uploads\\2020\\12\\11\\1607676018181360.8586906542668.png', 'image', 6617, '1607676018181360.8586906542668.png', NULL, '2020-12-11 16:40:18', '2020-12-11 16:40:18');
INSERT INTO `system_file` VALUES (22, 'image/png', '/public/uploads/2020/12/11/1607676134375267.2741984452358.png', 'app\\public\\uploads\\2020\\12\\11\\1607676134375267.2741984452358.png', 'image', 6617, '1607676134375267.2741984452358.png', NULL, '2020-12-11 16:42:14', '2020-12-11 16:42:14');
INSERT INTO `system_file` VALUES (23, 'image/png', '/public/uploads/2020/12/11/1607676241015310.35892925037876.png', 'app\\public\\uploads\\2020\\12\\11\\1607676241015310.35892925037876.png', 'image', 6617, '1607676241015310.35892925037876.png', NULL, '2020-12-11 16:44:01', '2020-12-11 16:44:01');
INSERT INTO `system_file` VALUES (24, 'image/png', '/public/uploads/2020/12/11/1607678467317762.4493448536966.png', 'app\\public\\uploads\\2020\\12\\11\\1607678467317762.4493448536966.png', 'image', 6617, '1607678467317762.4493448536966.png', NULL, '2020-12-11 17:21:07', '2020-12-11 17:21:07');
INSERT INTO `system_file` VALUES (25, 'image/png', '/public/uploads/2020/12/11/1607678542414282.97673823483694.png', 'app\\public\\uploads\\2020\\12\\11\\1607678542414282.97673823483694.png', 'image', 6617, '1607678542414282.97673823483694.png', NULL, '2020-12-11 17:22:22', '2020-12-11 17:22:22');
INSERT INTO `system_file` VALUES (26, 'image/png', '/public/uploads/2020/12/11/1607678587217345.3324539245119.png', 'app\\public\\uploads\\2020\\12\\11\\1607678587217345.3324539245119.png', 'image', 6617, '1607678587217345.3324539245119.png', NULL, '2020-12-11 17:23:07', '2020-12-11 17:23:07');
INSERT INTO `system_file` VALUES (27, 'image/png', '/public/uploads/2020/12/11/160767952955799.65299454650788.png', 'app\\public\\uploads\\2020\\12\\11\\160767952955799.65299454650788.png', 'image', 6617, '160767952955799.65299454650788.png', NULL, '2020-12-11 17:38:49', '2020-12-11 17:38:49');
INSERT INTO `system_file` VALUES (28, 'image/png', '/public/uploads/2020/12/11/1607679919889994.8228836655591.png', 'app\\public\\uploads\\2020\\12\\11\\1607679919889994.8228836655591.png', 'image', 6617, '1607679919889994.8228836655591.png', NULL, '2020-12-11 17:45:19', '2020-12-11 17:45:19');
INSERT INTO `system_file` VALUES (29, 'image/png', '/public/uploads/2020/12/11/160768003363696.43257995116849.png', 'app\\public\\uploads\\2020\\12\\11\\160768003363696.43257995116849.png', 'image', 6617, '160768003363696.43257995116849.png', NULL, '2020-12-11 17:47:13', '2020-12-11 17:47:13');
INSERT INTO `system_file` VALUES (30, 'image/png', '/public/uploads/2020/12/11/1607680082437128.5316673595738.png', 'app\\public\\uploads\\2020\\12\\11\\1607680082437128.5316673595738.png', 'image', 6617, '1607680082437128.5316673595738.png', NULL, '2020-12-11 17:48:02', '2020-12-11 17:48:02');
INSERT INTO `system_file` VALUES (31, 'image/png', '/public/uploads/2020/12/11/1607680148715820.0546766972601.png', 'app\\public\\uploads\\2020\\12\\11\\1607680148715820.0546766972601.png', 'image', 6617, '1607680148715820.0546766972601.png', NULL, '2020-12-11 17:49:08', '2020-12-11 17:49:08');

-- ----------------------------
-- Table structure for system_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_menu`;
CREATE TABLE `system_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `icon` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `parent_id` int(11) NULL DEFAULT NULL,
  `sort` int(255) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_menu
-- ----------------------------
INSERT INTO `system_menu` VALUES (1, '系统管理', '/system', NULL, 1, NULL, NULL, NULL, '2020-12-10 14:46:18');
INSERT INTO `system_menu` VALUES (2, '菜单管理', '/system/menu', NULL, 1, 1, NULL, '2020-08-24 10:14:58', '2020-08-24 10:14:58');
INSERT INTO `system_menu` VALUES (4, '用户管理', '/system/user', '', 1, 1, NULL, '2020-12-10 14:45:01', '2020-12-10 14:45:01');
INSERT INTO `system_menu` VALUES (5, '角色管理', '/system/role', NULL, 1, 1, NULL, '2020-12-10 14:45:16', '2020-12-10 14:46:46');
INSERT INTO `system_menu` VALUES (6, '文件管理', '/system/file', NULL, 1, 1, NULL, '2020-12-10 14:45:29', '2020-12-10 14:45:29');
INSERT INTO `system_menu` VALUES (7, '商家管理', '/merchant', '', 1, NULL, NULL, '2020-12-10 15:49:44', '2020-12-10 15:49:44');
INSERT INTO `system_menu` VALUES (8, '商家列表', '/merchant/merchant', NULL, 1, 7, NULL, '2020-12-10 15:50:00', '2020-12-10 15:50:00');
INSERT INTO `system_menu` VALUES (9, '商品管理', '/good', '', 1, NULL, NULL, '2020-12-10 17:02:08', '2020-12-10 17:02:08');
INSERT INTO `system_menu` VALUES (10, '商品列表', '/good/list', NULL, 1, 9, NULL, '2020-12-10 17:02:22', '2020-12-10 17:02:22');
INSERT INTO `system_menu` VALUES (11, '商品分类', '/good/category', NULL, 1, 9, NULL, '2020-12-10 17:21:35', '2020-12-10 17:21:35');
INSERT INTO `system_menu` VALUES (12, '日志管理', '/system/log', NULL, 1, 1, NULL, '2020-12-11 09:47:22', '2020-12-11 09:47:22');

-- ----------------------------
-- Table structure for system_permission
-- ----------------------------
DROP TABLE IF EXISTS `system_permission`;
CREATE TABLE `system_permission`  (
  `id` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `actions` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_permission
-- ----------------------------
INSERT INTO `system_permission` VALUES ('user', '用户管理', NULL, 'query,add,delete,detail', NULL, NULL);

-- ----------------------------
-- Table structure for system_req_log
-- ----------------------------
DROP TABLE IF EXISTS `system_req_log`;
CREATE TABLE `system_req_log`  (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `params` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `action` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  `consume_time` bigint(20) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 718 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for system_role
-- ----------------------------
DROP TABLE IF EXISTS `system_role`;
CREATE TABLE `system_role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `describe` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 1,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role
-- ----------------------------
INSERT INTO `system_role` VALUES (1, '管理员', NULL, 1, '2020-08-23 13:55:19', '2020-11-23 11:14:54');
INSERT INTO `system_role` VALUES (2, '商家', NULL, 1, '2020-08-24 10:12:46', '2020-12-10 16:50:59');
INSERT INTO `system_role` VALUES (5, '用户', NULL, 1, '2020-11-23 11:14:08', '2020-12-10 16:51:05');

-- ----------------------------
-- Table structure for system_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `system_role_menu`;
CREATE TABLE `system_role_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role_menu
-- ----------------------------
INSERT INTO `system_role_menu` VALUES (20, 2, 9, '2020-12-10 17:21:42', '2020-12-10 17:21:42');
INSERT INTO `system_role_menu` VALUES (21, 2, 10, '2020-12-10 17:21:42', '2020-12-10 17:21:42');
INSERT INTO `system_role_menu` VALUES (22, 2, 11, '2020-12-10 17:21:42', '2020-12-10 17:21:42');
INSERT INTO `system_role_menu` VALUES (23, 1, 1, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (24, 1, 2, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (25, 1, 4, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (26, 1, 5, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (27, 1, 6, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (28, 1, 12, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (29, 1, 7, '2020-12-11 09:47:31', '2020-12-11 09:47:31');
INSERT INTO `system_role_menu` VALUES (30, 1, 8, '2020-12-11 09:47:31', '2020-12-11 09:47:31');

-- ----------------------------
-- Table structure for system_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `system_role_permission`;
CREATE TABLE `system_role_permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NULL DEFAULT NULL,
  `permission_id` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `actions` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_role_permission
-- ----------------------------
INSERT INTO `system_role_permission` VALUES (1, 1, 'user', 'query,add', '2020-08-27 10:27:31', '2020-08-27 10:27:31');

-- ----------------------------
-- Table structure for system_user
-- ----------------------------
DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sex` int(1) NULL DEFAULT 1,
  `avatar` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT 1 COMMENT '用户状态： 0:禁用, 1:启用,',
  `last_login_time` int(11) NULL DEFAULT NULL,
  `last_login_ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `company` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `unionid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `openid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  `type` int(3) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES (1, 'admin', NULL, 'e10adc3949ba59abbe56e057f20f883e', '管理员', 1, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-23 08:10:20', '2020-12-10 14:46:31', 1);
INSERT INTO `system_user` VALUES (2, 'tcy', NULL, 'e10adc3949ba59abbe56e057f20f883e', '良品铺子', 1, NULL, NULL, 2, 1, NULL, NULL, NULL, NULL, NULL, NULL, '2020-08-23 08:10:20', '2020-12-10 16:51:13', 2);

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `district` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `township` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `place` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link_man` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `link_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_default` tinyint(1) NULL DEFAULT 0,
  `longitude` double NULL DEFAULT NULL,
  `latitude` double NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
