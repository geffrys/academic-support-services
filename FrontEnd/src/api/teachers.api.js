import axios from "axios";

export const getTeachers = async () =>
  await axios.get(`http://localhost:3000/api/v1/users/teachers`);

export const getTeacherById = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/users/teachers/${id}`);
  
