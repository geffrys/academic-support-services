import axios from "axios";

export const getGroups = async () => {
    return await axios.get(`http://localhost:3000/api/v1/groups`);
}

export const postGroups = async (group) =>{
    return await axios.post(`http://localhost:3000/api/v1/groups/enroll`, group);
}