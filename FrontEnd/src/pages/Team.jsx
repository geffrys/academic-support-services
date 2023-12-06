import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import useTeam from "../Hooks/useTeam";
import useTeacher from "../Hooks/useTeacher";
import { newTeacherTeam } from "../api/teacherTeam.api";
import TeamInfo from "../components/TeamInfo";
import toast, { Toaster } from "react-hot-toast";
import "../css/Team.css";

function Team() {
  const { user } = useAuth();
  const team = useTeam(user.id);
  const teachers = useTeacher();
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  if (!team[0]) {
    return <p>Loading team information...</p>;
  }

  setValue("team_id", team[0].team_id);
  const onSubmitEdit = handleSubmit(async (data) => {
    try {
      if (data.teacher_id !== "") {
        await newTeacherTeam(data);
        toast.success("Teacher added successfully", {
          style: {
            borderRadius: "10px",
            background: "var(--background-color-dark)",
            color: "var(--primary-color)",
          },
        });
        setTimeout(() => {
          setIsEdit(false);
          window.location.reload();
        }, 3000);
      }
      if (data.teacher_id === "") {
        toast.error("Please select a teacher", {
          style: {
            borderRadius: "10px",
            background: "var(--background-color-dark)",
            color: "var(--primary-color)",
          },
        });
      }
    } catch (error) {
      setIsEdit(false);
      toast.error("That teacher is already in the team", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
    }
  });

  return (
    <section className="team">
      <Toaster />
      <section className="team_container">
        <header className="teamTitle_container">
          <h2>My team</h2>
        </header>
        <section className="team_content_container">
          <TeamInfo team_id={team[0].team_id} teachers={teachers} />
          {!isEdit ? (
            <button
              className="teamPrimary_btn"
              type="button"
              onClick={() => setIsEdit(true)}
            >
              Add teacher
            </button>
          ) : (
            <form onSubmit={onSubmitEdit}>
              <div className="form-team">
                <select name="" id="" {...register("teacher_id")}>
                  <option value="">Select</option>
                  {teachers.map((teacher, index) => (
                    <option value={teacher.user_id} key={index}>
                      {teacher.user_name + " " + teacher.user_last_name}
                    </option>
                  ))}
                </select>
                <div className="team__bttns">
                  <button className="teamPrimary_btn" type="submit">
                    Submit
                  </button>
                  <button
                    className="teamSecundary_btn"
                    type="button"
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </section>
    </section>
  );
}

export default Team;
