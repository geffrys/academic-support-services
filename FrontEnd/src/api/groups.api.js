import axios from "axios";

export const getGroupsFiltered = async (id) => {
  console.log(id);
  if (!id) {
    return { data: [] };
  }
  return await axios.get(
    `http://localhost:3000/api/v1/users/teachers/${id}/groups`
  );
};

export const getGroups = async () => {
  return await axios.get(`http://localhost:3000/api/v1/groups/`);
};

export const postGroups = async (groups) => {
  return await axios.post(`http://localhost:3000/api/v1/groups/enroll`, groups);
};

export const postGroup = async (group) =>
  await axios.post("http://localhost:3000/api/v1/groups/", group);
