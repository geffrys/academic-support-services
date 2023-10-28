import axios from "./axios";

export const RecoverRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users/recover`, user);
};

export const createUserRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users`, user);
};

export const loginUserRequest = async (user) => {
  return await axios.post("http://localhost:3000/api/v1/users/login", user);
};

export const verifyPasswordTokenRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users/verify`, user);
};

export const changePasswordRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users/change`, user);
};

export const verifyTokenRequest = async () => {
  return await axios.get(`http://localhost:3000/api/v1/users/verifytoken`);
};

export const logOutRequest = async () =>
  await axios.post(`http://localhost:3000/api/v1/users/logout`);
