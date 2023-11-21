import React from "react";
import { useEffect, useState } from "react";
import useAvailability from "../Hooks/useAvailability";
import AvailabilityInfo from "../components/Availabilityinfo";
import NewAvailability from "../components/NewAvailability";
import { useAuth } from "../context/AuthContext";
import "../css/Availability.css";
import { set } from "react-hook-form";

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
              type="button"
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Monday" ? setEdit(false) : setEdit("Monday");
                }}
              >
                {isEdit === "Monday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Monday"
            />
            {isEdit === "Monday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="availability_day">
              Tuesday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Tuesday" ? setEdit(false) : setEdit("Tuesday");
                }}
              >
                {isEdit === "Tuesday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Tuesday"
            />
            {isEdit === "Tuesday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="availability_day">
              Wednesday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Wednesday"
                    ? setEdit(false)
                    : setEdit("Wednesday");
                }}
              >
                {isEdit === "Wednesday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Wednesday"
            />
            {isEdit === "Wednesday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="availability_day">
              Thursday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Thursday" ? setEdit(false) : setEdit("Thursday");
                }}
              >
                {isEdit === "Thursday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Thursday"
            />
            {isEdit === "Thursday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="availability_day">
              Friday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Friday" ? setEdit(false) : setEdit("Friday");
                }}
              >
                {isEdit === "Friday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Friday"
            />
            {isEdit === "Friday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="availability_day">
              Saturday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Saturday" ? setEdit(false) : setEdit("Saturday");
                }}
              >
                {isEdit === "Saturday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Saturday"
            />
            {isEdit === "Saturday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="availability_day">
              Sunday
              <button
                className="availabilityPrimary_btn"
                onClick={() => {
                  isEdit === "Sunday" ? setEdit(false) : setEdit("Sunday");
                }}
              >
                {isEdit === "Sunday" ? "✖️" : "➕"}
              </button>
            </div>
            <AvailabilityInfo
              userAvailability={userAvailability}
              day="Sunday"
            />
            {isEdit === "Sunday" ? (
              <NewAvailability
                userId={userId}
                isEdit={isEdit}
                setEdit={setEdit}
              />
            ) : (
              ""
            )}
          </div>
        </section>
      </section>
    </section>
  );
}

export default Availability;
