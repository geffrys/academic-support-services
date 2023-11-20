import { pool} from "../db.js";

export const getGroups = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM groups_");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const postGroups = async (req, res) => {
    try {
        const [result] = await pool.query("INSERT INTO groups_ (topic_id, user_id) VALUES (?, ?)", [req.body.topic_id, req.body.user_id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getGroupById = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM groups_ WHERE group_id = ?", [req.params.id]);
        res.status(200).json(result);  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const enrollGroup = async (req, res) => {
    try {
        const [result] = await pool.query("INSERT INTO student_groups (group_id, user_id) VALUES (?, ?)", [req.body.group_id, req.body.user_id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}