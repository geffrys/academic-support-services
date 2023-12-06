import { useEffect, useState } from "react";
import useTeacherTeam from "../Hooks/useTeacherTeam";

import "../css/Team.css";

function TeamInfo({ team_id, teachers }) {
  const [teachers_id, setTeachers_id] = useState(null);
  const teacherTeam = useTeacherTeam(team_id);

  useEffect(() => {
    if (teacherTeam && teacherTeam.length > 0) {
      setTeachers_id(teacherTeam);
    }
  }, [team_id, teacherTeam]);

  return (
    <section className="teachers">
      {teachers_id && teachers_id.length > 0 ? (
        teachers_id.map((teacher) =>
          teachers.map((t) => {
            console.log(t.teacher_id + " " + teacher.teacher_id);
            if (t.user_id === teacher.teacher_id) {
              return (
                <div key={t.user_id} className="teacher_container">
                  <h1>
                    {t.user_name} {t.user_last_name}
                  </h1>
                  <button type="button" className="teamPrimary_btn">
                    See Availability
                  </button>
                  <button type="button" className="teamSecundary_btn">
                    Remove teacher
                  </button>
                </div>
              );
            }
            return null;
          })
        )
      ) : (
        <h1>You don't have teachers</h1>
      )}
    </section>
  );
}

export default TeamInfo;
