import { pool } from "../db.js";

export const getTopics = async (req, res) => {
  try {
    const [response] = await pool.query("select * from topics");
    res.json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
