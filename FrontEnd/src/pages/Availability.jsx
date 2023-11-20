import React from "react";
import { useEffect, useState } from "react";
import useAvailability from "../Hooks/useAvailability";
import AvailabilityInfo from "../components/Availabilityinfo";
import { useAuth } from "../context/AuthContext";
import "../css/Availability.css";

function Availability() {
  const { user } = useAuth();

  const userId = user.id;
  const [isEdit, setEdit] = useState(false);
  const userAvailability = useAvailability(userId, isEdit);

  return (
    <section className="availability">
      <section className="availability_container">
        <header className="availabilityTitle_container">
          <h2>Availability Schedule</h2>
        </header>

        <section className="availability_content_container">
          <div>
            <div className="availability_day">
              <p>Monday</p>
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  setEdit("Monday");
                }}
              >
                ➕
              </button>
            </div>
            <AvailabilityInfo userAvailability={userAvailability} day="Lunes" />
          </div>
          <div>
            <div className="availability_day">
              Tuesday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Martes"
            />
          </div>

          <div>
            <div className="availability_day">
              Wednesday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Miercoles"
            />
          </div>

          <div>
            <div className="availability_day">
              Thursday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Jueves"
            />
          </div>

          <div>
            <div className="availability_day">
              Friday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Viernes"
            />
          </div>

          <div>
            <div className="availability_day">
              Saturday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Sabado"
            />
          </div>
          <div>
            <div className="availability_day">
              Sunday
              <button className="availabilityPrimary_btn">➕</button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Domingo"
            />
          </div>
        </section>
      </section>
    </section>
  );
}

export default Availability;
