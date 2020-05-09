--version 1.0.4,build 2017-01-09
CREATE TABLE `data_set_field` (
  `id` varchar(32) NOT NULL,
  `data_set_id` varchar(32) DEFAULT NULL COMMENT '数据集id',
  `field_name` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `is_enable` tinyint(4) DEFAULT NULL COMMENT '是否启用(1:启用，0:不启用)',
  `total` int(11) DEFAULT NULL COMMENT '总共有多少条',
  `data_type` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `data_set` (
  `id` varchar(32) NOT NULL,
  `data_source_id` varchar(32) DEFAULT NULL,
  `tenant_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '数据集名称',
  `url` text NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `recent_time` varchar(255) NOT NULL,
  `refresh_time` varchar(255) NOT NULL,
  `req_time` datetime DEFAULT NULL,
  `created_time` datetime DEFAULT NULL,
  `support_time` tinyint(4) DEFAULT NULL,
  `start_time` varchar(64) DEFAULT NULL,
  `end_time` varchar(64) DEFAULT NULL,
  `all_num` int(11) NOT NULL,
  `is_delete` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `data_source` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `tenant_id` varchar(64) NOT NULL COMMENT '租户id',
  `created_time` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL COMMENT '数据源名称',
  `class` varchar(30) DEFAULT NULL,
  `url` varchar(50) DEFAULT NULL,
  `port` varchar(8) DEFAULT NULL,
  `database_name` varchar(50) DEFAULT NULL,
  `basic_auth` tinyint(4) DEFAULT NULL,
  `user_name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `password` varchar(64) DEFAULT NULL COMMENT '密码',
  `is_delete` int(2) DEFAULT NULL COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `dictionary` (
  `id` varchar(32) NOT NULL,
  `value` varchar(255) DEFAULT NULL COMMENT '时间数值(带单位的)',
  `display_name` varchar(255) DEFAULT NULL COMMENT '中文显示名称',
  `type` varchar(255) DEFAULT NULL COMMENT '类型(刷新周期，最近时间)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sys_version` (
  `VERSION_NUM` varchar(255) NOT NULL,
  `BUILD_DATE` date DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `widget` (
  `id` varchar(32) NOT NULL,
  `window_id` varchar(32) NOT NULL,
  `chart` text NOT NULL,
  `setting` text NOT NULL,
  `data_setting` text NOT NULL,
  `sizex` bigint(20) NOT NULL,
  `sizey` bigint(20) NOT NULL,
  `col` bigint(20) NOT NULL,
  `row` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `widget_chart_config` (
  `id` varchar(32) NOT NULL,
  `widget_id` varchar(32) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `window` (
  `id` varchar(32) NOT NULL,
  `version` int(11) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `keep_screen_ratio` tinyint(4) DEFAULT '0',
  `screen_ratio` varchar(25) NOT NULL,
  `data` mediumtext,
  `tenant_id` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `bg` varchar(255) NOT NULL,
  `bg_color_opacity` int(11) NOT NULL,
  `bg_color` varchar(25) NOT NULL,
  `bg_type` int(11) NOT NULL,
  `icon` mediumtext,
  `is_delete` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_window_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `window_wall` (
  `title` varchar(255) DEFAULT NULL,
  `title_color` varchar(25) NOT NULL,
  `title_color_opacity` int(11) NOT NULL,
  `title_size` int(11) NOT NULL,
  `text_size` int(11) NOT NULL,
  `text_color_opacity` int(11) NOT NULL,
  `text_color` varchar(25) NOT NULL,
  `bg` varchar(255) DEFAULT NULL,
  `bg_color_opacity` int(11) NOT NULL,
  `bg_color` varchar(25) NOT NULL,
  `bg_type` int(11) NOT NULL,
  `tenant_id` varchar(255) NOT NULL,
  `color_list` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--version 1.0.6,build 2017-03-23
ALTER TABLE widget ADD x  FLOAT  not Null,
    ADD y  FLOAT not Null,
    ADD width  FLOAT not Null,
    ADD height  FLOAT not Null;

ALTER TABLE window ADD height  INT not Null,
    ADD width  INT not Null;

CREATE TABLE `edge`(
  `id` VARCHAR(32) NOT NULL,
  `fuu_id` VARCHAR(32) NOT NULL,
  `window_id` VARCHAR(32),
  `source_id` VARCHAR(32) COMMENT '连接线的起点',
  `source_direction` VARCHAR(2),
  `target_id` VARCHAR(32) COMMENT '连接线的终点',
  `target_direction` VARCHAR(2),
  `type` INT,
  `x`   FLOAT NOT NULL,
  `y`  FLOAT NOT Null,
  `width`   FLOAT not Null,
  `height`  FLOAT not Null,
  `points` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--version 1.0.6,build 2017-03-28
DROP table `dictionary`;
create table `dictionary` (
	`id` varchar (96),
	`value` varchar (765),
	`display_name` varchar (765),
	`type` varchar (765)
);
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('1','1h','Last hour','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('18','API Gateway','API Gateway','datasource');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('19','MySQL','MySQL','datasource');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('2','2h','Last two hours','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('20','Oracle','Oracle','datasource');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('21','value','number','dataType');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('22','text','text','dataType');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('23','time','time','dataType');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('3','6h','Last six hours','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('4','12h','Last twelve hours','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('5','1d','Last day','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('6','3d','Last three days','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('7','7d','Last seven days','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('8','30d','Last thirty days','recentTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('88','0s','none','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('91','10s','10 seconds','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('92','30s','30 seconds','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('93','1m','1 minute','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('94','2m','2 minutes','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('95','15m','15 minutes','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('96','30m','30 minutes','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('89','2s','2 seconds','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('90','5s','5 seconds','refreshTime');
insert into `dictionary` (`id`, `value`, `display_name`, `type`) values('17','API','API','datasource');

--version 1.0.6,build 2017-04-05
update `uyun_show`.`dictionary` set `display_name` = 'Number' where `id` = '21' and `value` = 'value' and `display_name` = 'number' and `type` = 'dataType';
update `uyun_show`.`dictionary` set `display_name` = 'Text' where `id` = '22' and `value` = 'text' and `display_name` = 'text' and `type` = 'dataType';
update `uyun_show`.`dictionary` set `display_name` = 'Time' where `id` = '23' and `value` = 'time' and `display_name` = 'time' and `type` = 'dataType';
update `uyun_show`.`sys_version` set `VERSION_NUM` = '1.0.6' , `BUILD_DATE` = '2017-04-05' where `ID` = '1';

--version 1.0.8,build 2017-04-18
CREATE TABLE `mold` (
  `id` varchar(32) NOT NULL,
  `tenant_id` varchar(32) DEFAULT NULL,
  `name` varchar(32) NOT NULL,
  `path` varchar(128) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `class` varchar(64) DEFAULT NULL,
  `tag` varchar(32) NOT NULL,
  `is_inner` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111111',NULL,'router-001','/resource/inner/router-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:08','network equipment','1','Router');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111112',NULL,'switch-001','/resource/inner/switch-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','network equipment','1','Switch');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111113',NULL,'firewall-001','/resource/inner/firewall-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','safety equipment','1','Firewall');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111114',NULL,'server-001','/resource/inner/server-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','server','1','PCServer');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111115',NULL,'minicomputer-001','/resource/inner/minicomputer-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','server','1','MiniServer');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111116',NULL,'mainframe-001','/resource/inner/mainframe-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','server','1','Mainframe');
insert into `mold` (`id`, `tenant_id`, `name`, `path`, `create_time`, `update_time`, `class`, `is_inner`, `tag`) values('11111111111111111111111111111117',NULL,'application-001','/resource/inner/application-001.svg','2017-04-21 10:35:04','2017-04-21 10:35:04','others','1','Application');
update `uyun_show`.`sys_version` set `VERSION_NUM` = '1.0.8' , `BUILD_DATE` = '2017-04-18' where `ID` = '1';
