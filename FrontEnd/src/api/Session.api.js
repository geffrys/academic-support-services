import axios from "axios";

export const Deleterequest = async (session_id) => {
  return await axios.delete(`http://localhost:3000/api/v1/session/${session_id}`);
};
