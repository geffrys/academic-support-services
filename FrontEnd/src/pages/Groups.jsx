import "../css/Groups.css";
import useTopic from "../Hooks/useTopic";
import useTeacher from "../Hooks/useTeacher";
import useGroups from "../Hooks/useGroups";
import { get, useForm } from "react-hook-form";
import { postGroup } from "../api/groups.api";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Groups() {
  const Topics = useTopic();
  const Groups = useGroups();
  const Teachers = useTeacher();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedDays, setSelectedDays] = useState([]);

  const handleCheckboxChange = (dayValue) => {
    if (selectedDays.includes(dayValue)) {
      setSelectedDays(selectedDays.filter((day) => day !== dayValue));
    } else {
      setSelectedDays([...selectedDays, dayValue]);
    }
  };

  const onSubmit = handleSubmit((data) => {
    data.session_days = selectedDays.join(";");
    let pass = 0;

    if (Groups.some((group) => group.user_id === parseInt(data.user_id))) {
      const sessionDaysArray1 = Groups.filter(
        (group) => group.user_id === parseInt(data.user_id)
      ).flatMap((group) => group.session_days.split(";"));

      const sessionDaysArray2 = data.session_days.split(";");

      if (sessionDaysArray1.some((day) => sessionDaysArray2.includes(day))) {
        pass = 1;
        toast.error("Teacher already has session on a chosen day", {
          style: {
            borderRadius: "10px",
            background: "var(--background-color-dark)",
            color: "var(--primary-color)",
            textAlign: "center",
          },
        });
      }
    }

    if (pass === 0) {
      const res = postGroup(data);
      toast.success("Group Created succesfully", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
          textAlign: "center",
        },
      });
    }
  });

  return (
    <section className="groups">
      <Toaster />
      <form action="" onSubmit={onSubmit} className="groups__table">
        <h1 className="groups__h1">Groups Creator</h1>
        <select
          className="group__select"
          type="text"
          {...register("topic_id", { required: true })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Topic
          </option>
          {Topics.map((Topic) => (
            <option value={Topic.topic_id} key={Topic.topic_id}>
              {Topic.topic_name}
            </option>
          ))}
        </select>

        <select
          className="group__select"
          type="text"
          {...register("user_id", { required: true })}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Teachers
          </option>
          {Teachers.map((Teacher) => (
            <option value={Teacher.user_id} key={Teacher.user_id}>
              {Teacher.user_name + " " + Teacher.user_last_name}
            </option>
          ))}
        </select>
        <p className="groups__p">Session days:</p>
        <div className="groups__days">
          <label>
            <input
              type="checkbox"
              value={0}
              checked={selectedDays.includes(0)}
              onChange={() => handleCheckboxChange(0)}
            />
            Sunday
          </label>
          <label>
            <input
              type="checkbox"
              value={1}
              checked={selectedDays.includes(1)}
              onChange={() => handleCheckboxChange(1)}
            />
            Monday
          </label>
          <label>
            <input
              type="checkbox"
              value={2}
              checked={selectedDays.includes(2)}
              onChange={() => handleCheckboxChange(2)}
            />
            Thuesday
          </label>
          <label>
            <input
              type="checkbox"
              value={3}
              checked={selectedDays.includes(3)}
              onChange={() => handleCheckboxChange(3)}
            />
            Wednesday
          </label>
          <label>
            <input
              type="checkbox"
              value={4}
              checked={selectedDays.includes(4)}
              onChange={() => handleCheckboxChange(4)}
            />
            Thursday
          </label>
          <label>
            <input
              type="checkbox"
              value={5}
              checked={selectedDays.includes(5)}
              onChange={() => handleCheckboxChange(5)}
            />
            Friday
          </label>
          <label>
            <input
              type="checkbox"
              value={6}
              checked={selectedDays.includes(6)}
              onChange={() => handleCheckboxChange(6)}
            />
            Saturday
          </label>
        </div>
        <button type="submit" className="groups_bttn">
          Submit
        </button>
      </form>
    </section>
  );
}

export default Groups;
