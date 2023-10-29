import axios from 'axios';

export const getUserTypesRequest = async () =>
  await axios.get(`http://localhost:3000/api/v1/user_types`);