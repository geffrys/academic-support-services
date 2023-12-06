import TeamInfo from "../components/TeamInfo";
import { useAuth } from "../context/AuthContext";
import useTeam from "../Hooks/useTeam";
import "../css/Team.css";

function Team() {
  const { user } = useAuth();
  const team = useTeam(user.id);

  if (!team[0]) {
    return <p>Loading team information...</p>;
  }

  return (
    <section className="team">
      <section className="team_container">
        <header className="teamTitle_container">
          <h2>My team</h2>
        </header>
        <section className="team_content_container">
          <TeamInfo team_id={team[0].team_id} />
          <button className="teamPrimary_btn">Add teacher</button>
        </section>
      </section>
    </section>
  );
}

export default Team;
