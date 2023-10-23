import axios from "./axios";

export const getUserRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users/recover`, user);
};

export const createUserRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/users`, user);
};

export const loginUserRequest = async (user) => {
  return await axios.post("http://localhost:3000/api/v1/users/login", user);
};

export const verifyTokenRequest = async () => {
  return await axios.get(`http://localhost:3000/api/v1/users/verify`);
};

export const logOutRequest = async () =>
  await axios.post(`http://localhost:3000/api/v1/users/logout`);
