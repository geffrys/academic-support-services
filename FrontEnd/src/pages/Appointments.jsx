import "../css/Appointments.css";
import { useNavigate } from "react-router-dom";
import SessionTable from "../components/Appointments/SessionTable.jsx";
import GrouptTable from "../components/Appointments/GrouptTable.jsx";

function Appointments() {
  const navigate = useNavigate();
  return (
    <section className="appointments">
      <section className="appointments__container">
        <header className="appointmentsTitle__container">
          <h2>Appointments</h2>
        </header>
        <button
          className="button__appointment"
          onClick={() => {
            navigate("/classes");
          }}
        >
          Schedule appointment
        </button>
        <SessionTable />
        <GrouptTable />
      </section>
    </section>
  );
}

export default Appointments;
