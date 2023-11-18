import { pool } from "../db.js";

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
