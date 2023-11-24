import useTopic from "../../Hooks/useTopic";
import useTeacher from "../../Hooks/useTeacher";
import useSingleGroup from "../../Hooks/useSingleGroup";
import useGroups from "../../Hooks/useGroups";
import { useAuth } from "../../context/AuthContext";

function GroupRows() {
  const topics = useTopic();
  const teachers = useTeacher();
  const singleGroup = useSingleGroup();
  const groups = useGroups();
  const { user } = useAuth();
  const data = singleGroup.filter((group) => group.user_id === user.id);
  const data2 = groups.filter((group) =>
    data.map((d) => d.group_id).includes(group.group_id)
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function formatDate(sessionDays) {
    const sessionDaysArray = sessionDays.split(";").map(Number);
    const formattedDays = sessionDaysArray.map(
      (dayNumber) => daysOfWeek[dayNumber]
    );

    return formattedDays.join(", ");
  }

  return (
    <>
      {data2.map((session) => (
        <tr key={session.group_id}>
          <td>{formatDate(session.session_days)}</td>
          <td>
            {
              topics.find((topic) => topic.topic_id === session.topic_id)
                ?.topic_name
            }
          </td>
          <td>
            {
              teachers.find((teacher) => teacher.user_id === session.user_id)
                ?.user_name
            }{" "}
            {
              teachers.find((teacher) => teacher.user_id === session.user_id)
                ?.user_last_name
            }
          </td>
        </tr>
      ))}
    </>
  );
}

export default GroupRows;
