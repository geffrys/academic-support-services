SELECT * FROM users WHERE user_type_id = (
    SELECT user_type_id FROM user_type WHERE user_type_name LIKE "teacher"
)