import axios from "./axios";

export const getTeacherTeamById = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/team/teacherTeam/${id}`);

};
