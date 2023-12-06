import { pool } from "../db.js";

export const getTeachersTeam = async (req, res) => {
  try {
    const { team_id } = req.params;
    const [result] = await pool.query(
      "SELECT * FROM teacher_team WHERE team_id = ?",
      team_id
    );
    if (result.length > 0) {
      res.json(result).status(200);
    } else {
      res.json({ message: "Teachers not found xd" }).status(404);
    }
  } catch (error) {
    return res.send("pana no se que pasó XDD");
    // return res.status(500).json({ message: error.message });
  }
};

export const newTeacherTeam = async (req, res) => {
  try {
    const { team_id, teacher_id } = req.body;

    const overlap = await pool.query(
      "SELECT * FROM teacher_team WHERE team_id = ? AND teacher_id = ?",
      [team_id, teacher_id]
    );

    if (overlap[0].length > 0) {
      return res.status(400).json({ message: "Teacher already in the team" });
    }

    await pool.query(
      "insert into teacher_team (team_id, teacher_id) values (?, ?) ",
      [team_id, teacher_id]
    );

    res.status(200).send({ message: "Teacher added to the team successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeacherTeam = async (req, res) => {
  try {
    const { team_id, teacher_id } = req.params;

    await pool.query(
      "delete from teacher_team where team_id = ? AND teacher_id = ?",
      [team_id, teacher_id]
    );

    res.status(200).send({ message: "Teacher deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
