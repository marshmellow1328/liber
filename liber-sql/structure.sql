drop table if exists content_field_value;
drop table if exists field_value;
drop table if exists field;
drop table if exists article_version_tag;
alter table article drop foreign key latest_version;
drop table if exists article_version;
drop table if exists article;
drop table if exists tag;

create table tag(
	id int not null auto_increment primary key,
	name varchar(32) not null, 
	parent_tag_id int null, 
	path varchar(198) not null,
	foreign key(parent_tag_id) references tag(id)
);

create table article(
	id int not null auto_increment primary key, 
	name varchar(32) not null, 
	latest_version int
);

create table article_version(
	id int not null auto_increment primary key, 
	article_id int not null, 
	content longtext not null, 
	foreign key(article_id) references article(id)
);

alter table article add constraint latest_version 
foreign key (latest_version) references article_version(id);

create table article_version_tag(
	id int not null auto_increment primary key, 
	article_version_id int not null, 
	tag_id int not null, 
	foreign key(article_version_id) references article_version(id), 
	foreign key(tag_id) references tag(id)
);

create table field(
	id int not null auto_increment primary key,
	name varchar(32) not null,
	type varchar(32) not null
);

create table field_value(
	id int not null auto_increment primary key,
	field_id int not null,
	type varchar(16) not null,
	value varchar(128) not null,
	parent_field_value_id int,
	path varchar(192) null,
	foreign key(field_id) references field(id),
	foreign key(parent_field_value_id) references field_value(id)
);

create table content_field_value(
	id int not null auto_increment primary key, 
	article_version_id int not null,
	field_id int not null,
	value varchar(128) not null,
	foreign key(article_version_id) references article_version(id),
	foreign key(field_id) references field(id)
);