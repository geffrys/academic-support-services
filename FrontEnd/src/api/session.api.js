import axios from "axios";

export const postSessions = async (session) =>
    await axios.post(`http://localhost:3000/api/v1/sessions`, session);