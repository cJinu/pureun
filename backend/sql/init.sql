create database pliends;

use pliends;

CREATE TABLE `user` (
	`user_id`	bigint auto_increment	NOT NULL,
	`nickname`	varchar(10)	NOT NULL,
	`birth_DT`	date	NOT NULL,
	`gender`	CHAR(1)	NOT NULL,
	`profile_img_url`	varchar(200)	NOT NULL,
	`parent_id`	bigint	NULL COMMENT 'self reference',
    primary key(`user_id`)
);

CREATE TABLE `pot` (
	`pot_id`	bigint auto_increment	NOT NULL,
	`pot_name`	varchar(10)	NOT NULL,
	`pot_species`	varchar(10)	NOT NULL,
	`min_temperature`	double	NOT NULL,
	`max_temperature`	double	NOT NULL,
	`min_moisture`	double	NOT NULL,
	`max_moisture`	double	NOT NULL,
	`created_DT`	date	NOT NULL,
	`end_DT`	date	NULL COMMENT '다 키웠다면 collection_FG 1로 변경',
	`pot_img_url`	varchar(200)	NOT NULL,
    `kid_id` bigint NOT NULL,
	`happy_cnt`	int	NOT NULL,
	`collection_FG`	tinyint	NOT NULL,
    primary key(`pot_id`)
);

CREATE TABLE `species` (
	`species_id`	bigint auto_increment	NOT NULL	COMMENT 'Auto Increment',
	`species_name`	varchar(20)	NOT NULL,
	`min_temperature`	double	NOT NULL,
	`max_temperature`	double	NOT NULL,
	`min_moisture`	double	NOT NULL,
	`max_moisture`	double	NOT NULL,
    primary key(`species_id`)
);

CREATE TABLE `user_login` (
	`user_id`	bigint auto_increment	NOT NULL,
	`user_name`	varchar(10)	NOT NULL,
	`user_email`	varchar(30)	NOT NULL,
	`user_password`	varchar(30)	NOT NULL,
    primary key(`user_id`)
);

CREATE TABLE `device` (
	`device_id`	char(36)	NOT NULL	DEFAULT (UUID()),
	`empty_FG`	tinyint	NOT NULL,
	`user_id`	bigint	NOT NULL,
    `pot_id` bigint NOT NULL,
    primary key(`device_id`)
);

CREATE TABLE `pot_state` (
	`pot_state_id`	bigint auto_increment	NOT NULL,
	`temprature`	double	NOT NULL,
	`measure_DT`	datetime	NOT NULL,
	`moisture`	double	NOT NULL,
    `pot_id` bigint NOT NULL,
    primary key(`pot_state_id`)
);

CREATE TABLE `calender` (
	`calender_id`	bigint auto_increment	NOT NULL,
	`date`	date	NOT NULL,
	`code`	char(1)	NOT NULL,
    `pot_id` bigint NOT NULL,
    primary key(`calender_id`)
);

CREATE TABLE `talk` (
	`talk_id`	bigint auto_increment	NOT NULL,
	`talk_title`	VARCHAR(30)	NOT NULL	COMMENT '"0월0일 대화"',
	`talk_DT`	datetime	NOT NULL,
	`read_FG`	tinyint	NOT NULL,
	`user_id`	bigint	NOT NULL,
    `pot_id` bigint NOT NULL,
    primary key(`talk_id`)
);

CREATE TABLE `sentence` (
	`sentence_id`	bigint auto_increment	NOT NULL	COMMENT 'Auto Increment',
	`content`	VARCHAR(100)	NOT NULL,
	`audio`	varchar(100)	NOT NULL,
	`sentence_DTN`	datetime	NOT NULL,
	`talker_FG`	tinyint	NOT NULL,
    `talk_id` bigint NOT NULL,
    primary key(`sentence_id`)
);

CREATE TABLE `alarm` (
	`alarm_id`	bigint auto_increment	NOT NULL,
	`alarm_name`	VARCHAR(30)	NULL,
	`alarm_content`	varchar(100)	NOT NULL,
	`active_FG`	tinyint	NOT NULL,
	`alarm_date`	datetime	NOT NULL,
	`routine`	tinyint	NOT NULL	COMMENT 'bitmask',
    `pot_id` bigint NOT NULL,
    primary key(`alarm_id`)
);

CREATE TABLE `calender_code` (
	`code`	CHAR(1)	NOT NULL	COMMENT '"W" or "T"',
	`code_detail`	varchar(20)	NOT NULL,
    primary key(`code`)
);

ALTER TABLE `user` ADD CONSTRAINT `FK_user_TO_user_1` FOREIGN KEY (`parent_id`)
REFERENCES `user` (`user_id`);

ALTER TABLE `pot` ADD CONSTRAINT `FK_user_TO_pot_1` FOREIGN KEY (`kid_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_login` ADD CONSTRAINT `FK_user_TO_user_login_1` FOREIGN KEY (`user_id`)
REFERENCES `user` (	`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `device` ADD CONSTRAINT `FK_pot_TO_device_1` FOREIGN KEY (`pot_id`)
REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `device` ADD CONSTRAINT `FK_user_login_TO_device_1` FOREIGN KEY (`user_id`)
REFERENCES `user_login` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `pot_state` ADD CONSTRAINT `FK_pot_TO_pot_state_1` FOREIGN KEY (`pot_id`)
REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `calender` ADD CONSTRAINT `FK_pot_TO_calender_1` FOREIGN KEY (`pot_id`)
REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `calender` ADD CONSTRAINT `FK_calender_code_TO_calender_1` FOREIGN KEY (`code`)
REFERENCES `calender_code` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `talk` ADD CONSTRAINT `FK_user_TO_talk_1` FOREIGN KEY (`user_id`)
REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `talk` ADD CONSTRAINT `FK_pot_TO_talk_1` FOREIGN KEY (	`pot_id`)
REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `sentence` ADD CONSTRAINT `FK_talk_TO_sentence_1` FOREIGN KEY (`talk_id`)
REFERENCES `talk` (`talk_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `alarm` ADD CONSTRAINT `FK_pot_TO_alarm_1` FOREIGN KEY (`pot_id`)
REFERENCES `pot` (`pot_id`) ON DELETE CASCADE ON UPDATE CASCADE;