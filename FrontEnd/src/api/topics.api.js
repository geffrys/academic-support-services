import axios from "axios";

export const getTopicsRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/topics`);
