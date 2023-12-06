import { useState, useEffect } from "react";
import { getTeamById } from "../api/team.api";

function useTeam(admin_id) {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const result = await getTeamById(admin_id);
        setTeam(await result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error", error);
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);
  if (loading) {
    return { loading: true, team: null };
  }

  return team;
}

export default useTeam;
