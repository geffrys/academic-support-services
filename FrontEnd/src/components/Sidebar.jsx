import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";
function Sidebar() {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/");
  };
  return (
    <section className="sidebar">
      <h1 className="sidebar__title">
        {user.user_name} {user.user_last_name}
      </h1>
      <p className="sidebar__subtitle">Estudiante</p>
      <ul>
        <li className="sidebar__li">Home</li>
        <li className="sidebar__li">Schedule</li>
        <li className="sidebar__li">History</li>
        <li className="sidebar__li">Contacts</li>
        <li className="sidebar__li">Profile</li>
      </ul>
      <h1 className="sidebar__bottom" onClick={onClick}>
        Sign Out
      </h1>
    </section>
  );
}

export default Sidebar;
