CREATE TABLE user_type(
    user_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_type_name VARCHAR(255) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE user_id_type(
    user_id_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id_type_name VARCHAR(255) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE topics(
    topic_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_name VARCHAR(255) NOT NULL,
    topic_description VARCHAR(255) NOT NULL
);

CREATE TABLE session_type(
    session_type_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_type_name VARCHAR(255) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE users(
    user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_middle_name VARCHAR(255),
    user_last_name VARCHAR(255) NOT NULL,
    user_mail VARCHAR(255) NOT NULL UNIQUE,
    user_phone VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_username VARCHAR(255) NOT NULL,
    user_type_id INT NOT NULL,
    user_identification VARCHAR(255) NOT NULL UNIQUE,
    user_country VARCHAR(255) NOT NULL,
    user_birth_date DATETIME NOT NULL,
    user_interests VARCHAR(1000),
    user_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    active TINYINT(1) NOT NULL DEFAULT 1,
    user_id_type_id INT NOT NULL,
    token VARCHAR(4),
    FOREIGN KEY (user_type_id) REFERENCES user_type(user_type_id),
    FOREIGN KEY (user_id_type_id) REFERENCES user_id_type(user_id_type_id)
);

CREATE TABLE teachers(
    teacher_id INT NOT NULL,
    teacher_entry_date DATETIME NOT NULL,
    teacher_exit_date DATETIME NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);

CREATE TABLE team(
	team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(user_id)
);

CREATE TABLE teacher_team(
	teacher_team_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES users(user_id),
	FOREIGN KEY (teacher_id) REFERENCES users(user_id)
);

CREATE TABLE knowledges(
    knowledge_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    active TINYINT(1) NOT NULL DEFAULT 1,
    user_id INT NOT NULL,
    topic_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);


CREATE TABLE groups_(
    group_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    user_id INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE student_groups(
    student_group_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    enrollment_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups_(group_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE group_schedule(
    group_schedule_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    group_entry_date DATETIME NOT NULL,
    group_exit_date DATETIME NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups_(group_id)
);

CREATE TABLE session(
    session_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_type_id INT NOT NULL,
    session_entry_date DATETIME NOT NULL,
    session_exit_date DATETIME NOT NULL,
    topic_id INT NOT NULL,
    user_id INT NOT NULL,
    teacher_id INT NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (session_type_id) REFERENCES session_type(session_type_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (teacher_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

CREATE TABLE availability(
	availability_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    availability_day VARCHAR(20) NOT NULL,
    availability_start_time TIME NOT NULL,
    availability_end_time TIME NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES  users(user_id) 
);

-- need to insert test data in each table
INSERT INTO user_type(user_type_name) VALUES ('Admin');
INSERT INTO user_type(user_type_name) VALUES ('Teacher');
INSERT INTO user_type(user_type_name) VALUES ('Student');

INSERT INTO topics(topic_name, topic_description) VALUES ('Java', 'Java programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('PHP', 'PHP programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('C#', 'C# programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('C++', 'C++ programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('Python', 'Python programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('JavaScript', 'JavaScript programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('HTML', 'HTML programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('CSS', 'CSS programming language');

INSERT INTO session_type(session_type_name) VALUES ('Groupal Session');
INSERT INTO session_type(session_type_name) VALUES ('Individual Session');

INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('College ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('Country ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('University ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('Passport ID', '1');

insert into team (admin_id) values (1);


-- ALTERS

ALTER TABLE session ADD CONSTRAINT fk_topic_id FOREIGN KEY (topic_id) REFERENCES topics(topic_id);
ALTER TABLE groups_ ADD COLUMN session_days VARCHAR(255) NOT NULL AFTER user_id;

INSERT INTO `users` (`user_id`, `user_name`, `user_last_name`, `user_mail`, `user_phone`, `user_password`, `user_username`, `user_type_id`, `user_identification`, `user_country`, `user_birth_date`, `user_interests`, `user_created_at`, `user_updated_at`, `active`, `user_id_type_id`) VALUES ('1', 'admin', 'admin', 'admin@gmail.com', '1', '$2b$10$JQYDuIDQEvRgLSu1MTJLiOEwJt9OCWP6too.xJ.E56655K2Ptklrm', 'admin', '1', '1', 'Colombia', '2003-06-22 19:00:00', 'Programming', '2023-10-30 18:05:02', '2023-10-30 18:05:02', '1', '1');
INSERT INTO `users` VALUES (2,'Samuel','Ignacio','Arango','superajke@gmail.com','3043346953','$2b$10$JQYDuIDQEvRgLSu1MTJLiOEwJt9OCWP6too.xJ.E56655K2Ptklrm','Superajke4K',3,'1000413879','Colombia','2003-06-21 19:00:00','Music;Programming','2023-10-20 22:54:45','2023-10-22 18:20:45',1,1,NULL);
INSERT INTO `users` VALUES (3,'Jhonatan','','Usma','usma@gmail.com','312321312321','$2b$10$RJjE6UCeLAUvp1sIQKYXWuaqcIGxWidWfswtN2pdNvMoFcisyMoni','Usmachan',2,'312312312','Colombia','1990-04-21 19:00:00','Programming','2023-11-21 19:29:52','2023-11-21 19:29:52',1,3,NULL);
INSERT INTO `users` VALUES (4,'David','','Cordoba','David@gmail.com','312321312','$2b$10$RJjE6UCeLAUvp1sIQKYXWuaqcIGxWidWfswtN2pdNvMoFcisyMoni','Davicorp',2,'3123123121','Colombia','1990-04-21 19:00:00','Programming','2023-11-21 19:29:52','2023-11-21 19:29:52',1,3,NULL);
INSERT INTO `academic_link`.`groups_` (`group_id`, `topic_id`, `user_id`, `session_days`, `active`) VALUES ('1', '1', '3', '1;3', '1');
INSERT INTO `academic_link`.`groups_` (`group_id`, `topic_id`, `user_id`, `session_days`, `active`) VALUES ('2', '1', '4', '2;4', '1');