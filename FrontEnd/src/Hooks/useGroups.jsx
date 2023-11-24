import { useState, useEffect } from "react";
import { getGroups } from "../api/groups.api";

const useGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups_ = async () => {
      let g = await getGroups();
      setGroups(g.data);
    };
    getGroups_();
  }, []);

  return groups;
};

export default useGroups;
