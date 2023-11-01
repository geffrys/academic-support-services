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
    user_id INT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (session_type_id) REFERENCES session_type(session_type_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (teacher_id) REFERENCES users(user_id)    
);

ALTER TABLE `academic_poli`.`users` 
ADD COLUMN `user_img` VARCHAR(200) NULL AFTER `token`;

-- need to insert test data in each table
INSERT INTO user_type(user_type_name) VALUES ('admin');
INSERT INTO user_type(user_type_name) VALUES ('teacher');
INSERT INTO user_type(user_type_name) VALUES ('student');

INSERT INTO user_id_type(user_id_type_name) VALUES ('CC');
INSERT INTO user_id_type(user_id_type_name) VALUES ('TI');
INSERT INTO user_id_type(user_id_type_name) VALUES ('CE');

INSERT INTO topics(topic_name, topic_description) VALUES ('Java', 'Java programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('PHP', 'PHP programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('C#', 'C# programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('C++', 'C++ programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('Python', 'Python programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('JavaScript', 'JavaScript programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('HTML', 'HTML programming language');
INSERT INTO topics(topic_name, topic_description) VALUES ('CSS', 'CSS programming language');

INSERT INTO session_type(session_type_name) VALUES ('lecture');
INSERT INTO session_type(session_type_name) VALUES ('practice');
INSERT INTO session_type(session_type_name) VALUES ('lab');

INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('College ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('Country ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('University ID', '1');
INSERT INTO user_id_type (`user_id_type_name`, `active`) VALUES ('Passport ID', '1');

INSERT INTO `users` (`user_id`, `user_name`, `user_last_name`, `user_mail`, `user_phone`, `user_password`, `user_username`, `user_type_id`, `user_identification`, `user_country`, `user_birth_date`, `user_interests`, `user_created_at`, `user_updated_at`, `active`, `user_id_type_id`) VALUES ('1', 'admin', 'admin', 'admin@gmail.com', '1', '$2b$10$JQYDuIDQEvRgLSu1MTJLiOEwJt9OCWP6too.xJ.E56655K2Ptklrm', 'admin', '1', '1', 'Colombia', '2003-06-22 19:00:00', 'CSS', '2023-10-30 18:05:02', '2023-10-30 18:05:02', '1', '1');
INSERT INTO `users` VALUES (2,'Samuel','Ignacio','Arango','superajke@gmail.com','3043346953','$2b$10$JQYDuIDQEvRgLSu1MTJLiOEwJt9OCWP6too.xJ.E56655K2Ptklrm','Superajke4K',3,'1000413879','Colombia','2003-06-21 19:00:00','JavaScript;CSS;HTML','2023-10-20 22:54:45','2023-10-22 18:20:45',1,1,NULL);