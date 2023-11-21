import { pool } from "../db.js";


export const getSessionTypes = async (req, res) => {

    try {  
        const [response] = await pool.query("select * from session_type");
        res.status(200).json(response);
    }
    catch (error) {
        return res.status(404).json({ message: error.message });
    }
}