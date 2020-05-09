
--version 1.0.4,build 2017-01-09
insert  into `sys_version`(`VERSION_NUM`,`BUILD_DATE`,`ID`) values ('1.0.4','2017-01-09',1);
insert  into `dictionary`(`id`,`value`,`display_name`,`type`) values ('1','1h','最近1小时','recentTime'),('18','API网关','API网关','datasource'),('19','MySQL','MySQL','datasource'),('2','2h','最近2小时','recentTime'),('20','Oracle','Oracle','datasource'),('21','值','值','dataType'),('22','文本','文本','dataType'),('23','时间','时间','dataType'),('3','6h','最近6小时','recentTime'),('4','12h','最近12小时','recentTime'),('5','1d','最近1天','recentTime'),('6','3d','最近3天','recentTime'),('7','7d','最近7天','recentTime'),('8','30d','最近30天','recentTime'),('90','0s','不刷新','refreshTime'),('91','10s','10秒','refreshTime'),('92','30s','30秒','refreshTime'),('93','1m','1分钟','refreshTime'),('94','2m','2分钟','refreshTime'),('95','15m','15分钟','refreshTime'),('96','30m','30分钟','refreshTime'),('97','1h','1小时','refreshTime'),('98','2h','2小时','refreshTime'),('99','1d','1天','refreshTime');

--version 1.0.4,build 2017-01-17
alter table widget add style_setting  text not Null;
alter table widget add fuu_id  VARCHAR(32) not Null;

--version 1.0.4,build 2017-02-13
alter table window add is_template  tinyint(4) DEFAULT '0';

--version 1.0.4,build 2017-02-20
ALTER TABLE `uyun_show`.`dictionary` DROP PRIMARY KEY;
DELETE FROM dictionary WHERE id="97" or id="98" or id="99";
UPDATE   dictionary  SET id="88" WHERE id ="90";
INSERT INTO `dictionary`(`id`,`value`,`display_name`,`type`) VALUES ('89','2s','3秒','refreshTime'),('90','5s','5秒','refreshTime');

--version 1.0.4,build 2017-02-23
UPDATE   dictionary  SET display_name="2秒" WHERE id ="89";
UPDATE   dictionary  SET value="value" WHERE id ="21";
UPDATE   dictionary  SET value="text" WHERE id ="22";
UPDATE   dictionary  SET value="time" WHERE id ="23";

--version 1.0.4,build 2017-03-06
ALTER TABLE data_set  ADD COLUMN `basic_auth` TINYINT(4) NULL   COMMENT '是否认证' AFTER `end_time`;
ALTER TABLE data_set  ADD COLUMN `user_name` VARCHAR(64) NULL   COMMENT '用户名' AFTER `basic_auth`;
ALTER TABLE data_set  ADD COLUMN `password` VARCHAR(64) NULL   COMMENT '名密码' AFTER `user_name`;

--version 1.0.4,build 2017-03-10
insert  into `dictionary`(`id`,`value`,`display_name`,`type`) values ('17','API','API','datasource');

--version 1.0.4,build 2017-03-14
ALTER TABLE `uyun_show`.`window` ADD COLUMN `inner_template` TINYINT(4) DEFAULT 0  NULL AFTER `is_template`;

--version 1.0.6,build 2017-03-28
UPDATE `uyun_show`.`data_source` SET `class` = 'API Gateway' WHERE class='API网关';
UPDATE `uyun_show`.`data_set_field` SET `data_type` = 'text' WHERE `data_type` = '文本';
UPDATE `uyun_show`.`data_set_field` SET `data_type` = 'time' WHERE `data_type` = '时间';
UPDATE `uyun_show`.`data_set_field` SET `data_type` = 'number' WHERE `data_type` = '值';