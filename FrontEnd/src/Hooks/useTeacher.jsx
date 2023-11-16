import { useState, useEffect } from "react";
import { getTeachers } from "../api/teachers.api";

function useTeacher() {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    async function getTeacher() {
      let t = await getTeachers();
      setTeacher(t.data);
    }
  }, []);

  return [teacher, setTeacher];
}