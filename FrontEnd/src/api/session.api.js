import axios from "axios";

export const Deleterequest = async (session_id) => {
  return await axios.delete(`http://localhost:3000/api/v1/sessions/${session_id}`);
};

export const postSessions = async (session) =>
-    await axios.post(`http://localhost:3000/api/v1/sessions`, session);