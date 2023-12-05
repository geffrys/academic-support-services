import { pool } from "../db.js";

export const getTeachers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM teacher_team");
    if (result.length > 0) {
      res.json(result).status(200);
    } else {
      res.json({ message: "Teachers not found" }).status(404);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const newTeacher = async (req, res) => {
  try {
    const { team_id, teacher_id } = req.body;

    await pool.query(
      "insert into teacher_team (team_id, teacher_id) values (?, ?) ",
      [team_id, teacher_id]
    );

    res.status(200).send({ message: "Teacher created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { teacher_id } = req.params;

    await pool.query("delete from teacher_team where teacher_id = ?", [
      teacher_id,
    ]);

    res.status(200).send({ message: "Teacher deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
