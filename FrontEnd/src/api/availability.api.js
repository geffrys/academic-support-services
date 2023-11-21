import axios from "./axios";

export const getAvailabilityById = async (id) => {
  return await axios.get(`http://localhost:3000/api/v1/availability/${id}`);
};

export const createAvailability = async (availability) => {
  return await axios.post(
    `http://localhost:3000/api/v1/availability`,
    availability
  );
};

export const editAvailability = async (id, availability) => {
  return await axios.put(
    `http://localhost:3000/api/v1/availability/${id}`,
    availability
  );
};

export const deleteAvailability = async (id) => {
  return await axios.delete(`http://localhost:3000/api/v1/availability/${id}`);
};
