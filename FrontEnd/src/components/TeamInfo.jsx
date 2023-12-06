import { useEffect, useState } from "react";
import useTeacherTeam from "../Hooks/useTeacherTeam";

import "../css/Team.css";

function TeamInfo({ team_id }) {
  const [teachers_id, setTeachers_id] = useState(null);
  // console.log(team_id);
  const teacherTeam =  useTeacherTeam(team_id);

  useEffect(() => {
    if (teacherTeam && teacherTeam.length > 0) {
      setTeachers_id(teacherTeam);
    }
  }, [team_id, teacherTeam]);

  return (
    <section className="teachers">
      {teachers_id && teachers_id.length > 0 ? (
        teachers_id.map((teacher) => (
          <div key={teacher.teacher_id} className="teacher_container">
            <h1>{teacher.teacher_id}</h1>
            <button type="button" className="teamPrimary_btn">
              See Availability
            </button>
            <button type="button" className="teamSecundary_btn">
              Remove teacher
            </button>
          </div>
        ))
      ) : (
        <h1>You don't have teachers</h1>
      )}
    </section>
  );
}

export default TeamInfo;
