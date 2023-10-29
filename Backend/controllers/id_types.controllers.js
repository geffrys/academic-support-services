import { pool } from "../db.js";

export const getIdTypes = async (req, res) => {
  try {
    const [result] = await pool.execute("SELECT * FROM user_id_type");
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
