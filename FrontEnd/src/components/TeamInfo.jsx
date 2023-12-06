import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTeacherTeam from "../Hooks/useTeacherTeam";
import { deleteTeacherTeam } from "../api/teacherTeam.api";
import "../css/Team.css";

function TeamInfo({ team_id, teachers }) {
  const [teachers_id, setTeachers_id] = useState(null);
  const teacherTeam = useTeacherTeam(team_id);

  const onDelete = async (team_id, teacher_id) => {
    try {
      await deleteTeacherTeam(team_id, teacher_id);
      toast.success("Teacher deleted successfully from the team", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      setTimeout(() => {
        setEdit(false);
      }, 3000);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
                  <Link to={`/availability/${t.user_id}`}>
                    <button type="button" className="teamPrimary_btn">
                      See Availability
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="teamSecundary_btn"
                    onClick={() => onDelete(team_id, t.user_id)}
                  >
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
