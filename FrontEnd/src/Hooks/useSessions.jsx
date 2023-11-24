import { useEffect, useState } from "react";
import { getSessions } from "../api/session.api";

function useSessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const getSession = async () => {
      let t = await getSessions();
      let data = t.data;
      data = data.filter((session) => session.active === 1);
      setSessions(data);
    };
    getSession();
  }, []);
  return sessions;
}

export default useSessions;
