import useSessions from "../../Hooks/useSessions";
import { useAuth } from "../../context/AuthContext";
import useTopic from "../../Hooks/useTopic";
import useTeacher from '../../Hooks/useTeacher'
import DeleteSession from '../DeleteSession'

function SessionRows() {
  const sessions = useSessions();
  const topics = useTopic();
  const teachers = useTeacher();
  const { user } = useAuth();
  let data = sessions.filter((session) => session.user_id === user.id);

  function formatDate(dateString) {
    const options = {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );
    return formattedDate.replace(',', ' at');

  }
  return (
    <>
      {data.map((session) => (
        <tr key={session.session_id}>
          <td>{formatDate(session.session_entry_date)}</td>
          <td>{formatDate(session.session_exit_date)}</td>

          <td>
            {
              topics.find((topic) => topic.topic_id === session.topic_id)
                ?.topic_name
            }
          </td>
          <td>{teachers.find((teacher) => teacher.user_id === session.teacher_id)?.user_name} {teachers.find((teacher) => teacher.user_id === session.teacher_id)?.user_last_name}</td>
          <td><DeleteSession session_id={session.session_id}/></td>
            
        </tr>
      ))}
    </>
  );
}

export default SessionRows;
