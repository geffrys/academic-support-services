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
    endDateTime.setMinutes(endDateTime.getMinutes() + Number(session_duration));
    console.log(endDateTime);
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

export const deleteSession = async (req, res) => {
    try {
      const { session_id } = req.params;
  
      const [results] = await pool.query(
        'UPDATE session SET active = 0 WHERE session_id = ?',
        [session_id]  // Agrega el session_id aquí
      );
  
      res.status(200).send({ message: "The Session has been canceled successfully" });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };