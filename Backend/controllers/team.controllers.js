import { pool } from "../db.js";

export const getTeam = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM team");
    if (result.length > 0) {
      res.json(result).status(200);
    } else {
      res.json({ message: "Team not found" }).status(404);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
gi