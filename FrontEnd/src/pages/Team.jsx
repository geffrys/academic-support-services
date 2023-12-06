import { useEffect, useState } from "react";
import TeamInfo from "../components/TeamInfo";
import { useAuth } from "../context/AuthContext";
import useTeam from "../Hooks/useTeam"
import "../css/Team.css";

function Team() {
  const { user } = useAuth();
  const [team_id, setTeam_id] = useState(null);
  const team = useTeam(user.id);

  useEffect(() => {
    if (team && team.length > 0) {
      setTeam_id(team[0].team_id);
    }
  }, [team, user]);

  return (
    <section className="team">
      <section className="team_container">
        <header className="teamTitle_container">
          <h2>My team</h2>
        </header>
        <section className="team_content_container">
            <TeamInfo 
            team_id={team_id}
            />
          <button className="teamPrimary_btn">Add teacher</button>
        </section>
      </section>
    </section>
  );
}

export default Team;
