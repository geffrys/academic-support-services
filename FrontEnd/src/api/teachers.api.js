import axios from "axios";

export const getTeachers = async () =>
  await axios.get(`http://localhost:3000/api/v1/users/teachers`);
