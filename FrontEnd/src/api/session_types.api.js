import axios from "axios";

export const getSessionTypes = async () =>
  await axios.get(`http://localhost:3000/api/v1/session_types`);
