import TeamInfo from "../components/TeamInfo";
import "../css/Team.css";

function Team() {
  return (
    <section className="team">
      <section className="team_container">
        <header className="teamTitle_container">
          <h2>My team</h2>
        </header>
        <section className="team_content_container">
            <TeamInfo />
          <button className="teamPrimary_btn">Add teacher</button>
        </section>
      </section>
    </section>
  );
}

export default Team;
