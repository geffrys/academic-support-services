import axios from "axios";

export const getIdTypesRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/id_types`);
