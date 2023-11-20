import { pool} from "../db.js";

export const getSessions = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM sessions");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postSessions = async (req, res) => {
    try {
        const [result] = await pool.query("INSERT INTO sessions (session_type_id, group_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)", [req.body.session_type_id, req.body.group_id, req.body.date, req.body.start_time, req.body.end_time]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}