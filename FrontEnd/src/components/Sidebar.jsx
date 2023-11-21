import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserTypesRequest } from "../api/user_types.api";
import "../css/Sidebar.css";
import { useEffect, useState } from "react";

function Sidebar() {
  const { logOut, user, checkLogin } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/");
  };

  const [userType, setUserType] = useState("");

  useEffect(() => {
    checkLogin();
    const getUserType = async () => {
      try {
        const res = await getUserTypesRequest();
        const type = res.data.find(
          (type) => type.user_type_id === user.user_type
        );
        setUserType(type.user_type_name);
      } catch (error) {
        console.log(error);
      }
    };
    getUserType();
  }, [user.user_type, user.user_name, user.user_last_name]);

  return (
    <section className="sidebar">
      <h1 className="sidebar__title">
        {user.user_name} {user.user_last_name}
      </h1>
      <p className="sidebar__subtitle">{userType}</p>
      <ul>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </li>
        <li className="sidebar__li">Schedule</li>
        <li className="sidebar__li">History</li>
        <li className="sidebar__li">Contacts</li>
        <li className="sidebar__li" onClick={() => {
          navigate("/availability");
        }}>Configure Availability</li>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </li>
        <li className="sidebar__li"
          onClick={() => {
            navigate("/classes");
          }}>
          Service
        </li>
      </ul>
      <h1 className="sidebar__bottom" onClick={onClick}>
        Sign Out
      </h1>
    </section>
  );
}

export default Sidebar;
