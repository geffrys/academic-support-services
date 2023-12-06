import axios from "./axios";

export const getTeacherTeamById = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/team/teacherTeam/${id}`);
};

export const newTeacherTeam = async (teacherTeam) => {
  return await axios.post(
    `http://localhost:3000/api/v1/team/teacherTeam/`,
    teacherTeam
  );
};

export const deleteTeacherTeam = async (team_id, teacher_id) => {
  return await axios.delete(
    `http://localhost:3000/api/v1/team/teacherTeam/${team_id}/${teacher_id}`
  );
}
