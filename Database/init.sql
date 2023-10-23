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

-- need to insert test data in each table
INSERT INTO user_type(user_type_name) VALUES ('admin');
INSERT INTO user_type(user_type_name) VALUES ('teacher');
INSERT INTO user_type(user_type_name) VALUES ('student');

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

-- avoid user table
INSERT INTO users(user_name, user_middle_name, user_last_name, user_mail, user_phone, user_password, user_username, user_type_id) VALUES ('admin', 'admin', 'admin', 'admin@admin.com', '123456789', 'admin', 'admin', 1);
INSERT INTO users(user_name, user_middle_name, user_last_name, user_mail, user_phone, user_password, user_username, user_type_id) VALUES ('teacher', 'teacher', 'teacher', 'teacher@teacher.com', '123456789', 'teacher', 'teacher', 2);
INSERT INTO users(user_name, user_middle_name, user_last_name, user_mail, user_phone, user_password, user_username, user_type_id) VALUES ('student', 'student', 'student', 'student@student.com', '123456789', 'student', 'student', 3);

INSERT INTO teachers(teacher_id, teacher_entry_date, teacher_exit_date) VALUES (2, '1900-01-01 00:08:00', '1900-01-01 00:17:00');

INSERT INTO knowledges(user_id, topic_id) VALUES (2, 1);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 2);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 3);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 4);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 5);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 6);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 7);
INSERT INTO knowledges(user_id, topic_id) VALUES (2, 8);

INSERT INTO groups_(topic_id, user_id) VALUES (1, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (2, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (3, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (4, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (5, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (6, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (7, 2);
INSERT INTO groups_(topic_id, user_id) VALUES (8, 2);

INSERT INTO student_groups(group_id, user_id) VALUES (1, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (2, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (3, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (4, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (5, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (6, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (7, 3);
INSERT INTO student_groups(group_id, user_id) VALUES (8, 3);

INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (1, '1900-01-01 00:08:00', '1900-01-01 00:10:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (2, '1900-01-01 00:09:00', '1900-01-01 00:10:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (3, '1900-01-01 00:10:00', '1900-01-01 00:11:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (4, '1900-01-01 00:11:00', '1900-01-01 00:12:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (5, '1900-01-01 00:12:00', '1900-01-01 00:13:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (6, '1900-01-01 00:13:00', '1900-01-01 00:14:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (7, '1900-01-01 00:14:00', '1900-01-01 00:15:00');
INSERT INTO group_schedule(group_id, group_entry_date, group_exit_date) VALUES (8, '1900-01-01 00:15:00', '1900-01-01 00:16:00');

INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (1, '1900-01-01 00:08:00', '1900-01-01 00:10:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (2, '1900-01-01 00:09:00', '1900-01-01 00:10:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (3, '1900-01-01 00:10:00', '1900-01-01 00:11:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (1, '1900-01-01 00:11:00', '1900-01-01 00:12:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (2, '1900-01-01 00:12:00', '1900-01-01 00:13:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (3, '1900-01-01 00:13:00', '1900-01-01 00:14:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (1, '1900-01-01 00:14:00', '1900-01-01 00:15:00', 3, 2);
INSERT INTO session(session_type_id, session_entry_date, session_exit_date, user_id, teacher_id) VALUES (2, '1900-01-01 00:15:00', '1900-01-01 00:16:00', 3, 2);