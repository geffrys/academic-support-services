import { pool } from "../db.js";

export const getSessions = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM session");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postSessions = async (req, res) => {
    const { session_duration } = req.body;
    let endDateTime = new Date(req.body.session_entry_date);
    endDateTime.setMinutes(endDateTime.getMinutes() + session_duration);
    try {
        const [result] = await pool.query("INSERT INTO session (session_type_id, session_entry_date, session_exit_date, user_id, teacher_id, topic_id) VALUES (?, ?, ?, ?, ?, ?)", [
            req.body.session_type_id,
            req.body.session_entry_date,
            endDateTime,
            req.body.user_id,
            req.body.teacher_id,
            req.body.topic_id
        ]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}