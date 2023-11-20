import axios from "./axios";

export const getAvailabilityById = async (id) => {
    return await axios.get(`http://localhost:3000/api/v1/availability/${id}`);
}