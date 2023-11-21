import { pool } from "../db.js";

export const getUserAvailability = async (req, res) => {
  try {
    const { user_id } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM availability WHERE user_id = ? AND active = 1",
      [user_id]
    );
    if (result.length > 0) {
      res.json(result).status(200);
    } else {
      res.json({ message: "Availability not found" }).status(404);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const newAvailability = async (req, res) => {
  try {
    const {
      availability_day,
      availability_start_time,
      availability_end_time,
      user_id,
    } = req.body;

    await pool.query(
      "insert into availability (availability_day, availability_start_time, availability_end_time, user_id) values (?,?,?,?)",
      [
        availability_day,
        availability_start_time,
        availability_end_time,
        user_id,
      ]
    );

    res.status(200).send({ message: "Availability created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editAvailability = async (req, res) => {
  try {
    const { availability_id } = req.params;
    const { availability_day, availability_start_time, availability_end_time } =
      req.body;
    const [results] = await pool.query(
      "SELECT * FROM availability WHERE availability_id = ?",
      [availability_id]
    );

    if (results.length === 0)
      return res.status(404).json({ message: "Availability item not found" });

    await pool.query(
      "UPDATE availability SET availability_day = ?, availability_start_time = ?, availability_end_time = ? WHERE availability_id = ?",
      [
        availability_day,
        availability_start_time,
        availability_end_time,
        availability_id,
      ]
    );
    res.status(200).send({ message: "Availability updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAvailability = async (req, res) => {
  try {
    const { availability_id } = req.params;

    await pool.query("UPDATE availability SET active = 0 WHERE availability_id = ?", [
      availability_id,
    ]);

    res.status(200).send({ message: "Availability deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
