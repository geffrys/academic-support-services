import { pool } from "../db.js";

export const getTeachers = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM users WHERE user_type_id = (SELECT user_type_id FROM user_type WHERE user_type_name LIKE 'teacher')");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTeacherById = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM users WHERE user_id = ?", [req.params.id]);
        result[0].password = undefined;
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTeacherGroupsById = async (req, res) => {
    try {
        
        const [result] = await pool.query("SELECT * FROM groups_ WHERE user_id = ?", [Number(req.params.id)]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}