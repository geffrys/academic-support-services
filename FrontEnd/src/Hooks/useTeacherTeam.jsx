import { useState, useEffect } from "react";
import { getTeacherTeamById } from "../api/teacherTeam.api";

function useTeacherTeam(team_id) {
  console.log(team_id);
  const [teacherTeam, setTeacherTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeacherTeam() {
      try {
        const result = await getTeacherTeamById(team_id);
        console.log(result);
        setTeacherTeam(await result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    }

    fetchTeacherTeam();
  }, []);

  if (loading) {
    return { loading: true, teacherTeam: null };
  }

  return teacherTeam;
}

export default useTeacherTeam;
