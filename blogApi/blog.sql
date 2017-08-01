/*
Navicat MySQL Data Transfer

Source Server         : nodeJsTest
Source Server Version : 50550
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2017-08-01 11:59:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `Content` varchar(5000) NOT NULL,
  `createDate` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `kindName` varchar(50) NOT NULL,
  `areaName` varchar(50) NOT NULL,
  `UserId` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('2', '第一篇博客', '<p>写点什么.....</p><p>第一篇博客<br></p>', '2017-07-06 15:00:07', '0001-01-01 00:00:00', '.net技术', '编程', '1');
INSERT INTO `blog` VALUES ('3', '我的第二篇博客', '<p><strong>每天都要活的对得起自己，时光短暂，白驹过隙。</strong></p><ol><li>好好干，沉住气，静下心</li><li>别每天那么呆板，性情放浪一点，装装x,吹吹牛</li></ol><p><br></p>', '2017-07-06 21:14:41', '0001-01-01 00:00:00', '.net技术', '编程', '1');
INSERT INTO `blog` VALUES ('6', '今天天气爆炸热', '<p>嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩，嘛啊啊啊啊，热噩噩噩噩噩噩噩</p>', '2017-07-22 11:16:25', '0001-01-01 00:00:00', '设计模式', '读书', '1');
INSERT INTO `blog` VALUES ('7', '斑马咖啡馆', '<p>斑马咖啡馆真是一个僻静的所在，虽然价格昂贵，但是此地的环境真的很不错，适合闲暇时间进行阅读</p>', '2017-07-24 16:46:50', '0001-01-01 00:00:00', 'javascript技术', '读书', '1');
INSERT INTO `blog` VALUES ('8', 'angularjs的按需加载初探', '<h1><a href=\"http://www.cnblogs.com/amigod/p/angular01.html\" data-cke-saved-href=\"http://www.cnblogs.com/amigod/p/angular01.html\">angularJS使用ocLazyLoad实现js延迟加载</a></h1><p>　　最近开发一个系统遇到了一个问题，用angular路由一个html片段，该片段需要使用一个js插件来实现一个富文本编辑器。关键问题在于必须要在片段加载后通过js与dom元素进行绑定。一开始想当然以为直接把js代码写在代码段里不久ok了，然而经过实验，路由将html片段插入页面时只能读取css，无法解析并执行js代码。</p><p>　　google了半天发现了很多angular+requireJs的解决方案，但我觉得对于我这个场景并不适合，因为requirejs本质是一个模块加载器，按需加载只是他的副业，我们用它应该主要是用它来做模块化的，如果我们单纯为了按需加载却要试用模块化语法包装我们的代码(define)，感觉有点像用大炮打蚊子，对于我这种需求来说代价巨大。</p><p>　　最后决定使用ocLazyLoad来处理，因为此方案优点是，简单易行无侵入。同时这个方案有些缺点，比如每次动态加载需要的脚本、模版资源会有很多不必要的网络开销，路由定义比较复杂（多了一些配置项，其实不能算复杂，而是繁琐），对于大型复杂业务应用，路由众多，耗费的精力不可忽视。但是用在我这个场景之中正合适。于是便在github上fork下js,引入到项目中。</p><table style=\"width: 689.6px; height: auto !important;\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td style=\"width: 35px !important; height: auto !important; text-align: left !important; vertical-align: baseline !important;\"><p>1</p></td><td style=\"width: auto !important; height: auto !important; text-align: left !important; vertical-align: baseline !important;\"><div style=\"background: none !important; padding: 0px !important; border: 0px currentColor !important; border-image: none !important;\"><div style=\"background: rgb(244, 244, 244) !important; padding: 0px 1em !important; border: 0px currentColor !important; border-image: none !important;\"><code>&lt;script src=</code><code>\"js/ocLazyLoad.js\"</code><code>&gt;&lt;/script&gt;</code></div></div></td></tr></tbody></table><p>　　在需要用到的angular模块里进行配置</p><pre>var app = angular.module(\'formCtrlParts\', [\'oc.lazyLoad\']);</pre><p>再向路由需要用到的控制器里面使用此服务进行js文件的按需加载</p><p><br></p><pre>app.controller(\'addNewBlogCtrl\',function($scope,$http,$ocLazyLoad){\n    $ocLazyLoad.load(\'../html/ckeditorjs/ckeditor.js\');\n   \n})</pre><p>这样基本就大功告成，ocLazyLoad有很多种加载方式，也可以配合路由，指令进行加载。</p><p>参考文档：https://oclazyload.readme.io/docs/getting-started<br></p>', '2017-07-26 13:39:15', '0001-01-01 00:00:00', 'javascript技术', '编程', '1');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) NOT NULL,
  `passWord` varchar(50) NOT NULL,
  `gender` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'zyp', '123456', '1');
