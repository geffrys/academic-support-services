import { useState, useEffect } from "react";
import { getTeachers } from "../api/teachers.api";
import { get } from "react-hook-form";

function useTeacher() {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    async function getTeacher() {
      let t = await getTeachers();
      setTeacher(t.data);
    }
    getTeacher();
  }, []);

  return teacher;
}

export default useTeacher;