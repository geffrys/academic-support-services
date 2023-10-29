import { pool } from "../db.js";

export const getUserTypes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM user_type");
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};
