import { pool } from "../db.js";

export const getGroups = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM student_groups");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
