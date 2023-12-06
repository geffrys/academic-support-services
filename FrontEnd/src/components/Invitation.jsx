import emailjs from "@emailjs/browser";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../css/Invitation.css";

function Invitation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isActive, setActive] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.user_mail === "") {
      toast.error("Please enter a valid email", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
    } else {
      emailjs
        .send(
          "service_x4a6fhk",
          "template_88mkjb8",
          {
            from_name: user.user_name + " " + user.user_last_name,
            user_email: data.user_mail,
          },
          "LWJm3xbhTyGA8Vnwk"
        )
        .then(
          () => {
            toast.success("Invitation sent successfully", {
              style: {
                borderRadius: "10px",
                background: "var(--background-color-dark)",
                color: "var(--primary-color)",
              },
            });
            setValue("user_mail", "");
            setActive(false);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  });

  return (
    <section className="invitation__section">
      <Toaster />
      {!isActive && (
        <button
          className="profile_button"
          onClick={() => {
            setActive(true);
          }}
        >
          Invite a friend
        </button>
      )}
      <form
        className={isActive ? "invitation__active" : "invitation__hidden"}
        onSubmit={onSubmit}
      >
        {isActive && (
          <>
            <input
              className="register__input"
              type="email"
              {...register("user_mail")}
              placeholder="User Email"
            />
            <button className="profile_button" type="submit">
              Send invitation
            </button>
          </>
        )}
      </form>
    </section>
  );
}

export default Invitation;
