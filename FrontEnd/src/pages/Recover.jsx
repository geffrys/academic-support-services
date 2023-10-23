import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import "../css/Recover.css";

function Recover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { recoverUser, verifyPasswordToken, changePassword } = useAuth();
  const params = useParams();
  const [section, setSection] = useState(1);

  const onBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (params.user_mail) {
      setSection(2);
    }
  }, [params]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await recoverUser(data);
    if (res === undefined) {
      toast.error("User not found", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
    } else {
      const token = res.token;
      toast.success("Recovery code sent to your email", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      emailjs
        .send(
          "service_x4a6fhk",
          "template_ve62peo",
          {
            token: token,
            user_email: data.user_mail,
          },
          "LWJm3xbhTyGA8Vnwk"
        )
        .then(
          () => {
            navigate(`/recover/${res.user_id}`);
          },
          (error) => {
            console.log(error.text);
          }
        );
      navigate(`/recover/${res.user_id}`);
    }
  });

  const onSubmit2 = handleSubmit(async (data) => {
    const { user_mail, ...rest } = data;
    rest.user_id = params.user_mail;
    const res = await verifyPasswordToken(rest);

    if (res.validation === false) {
      toast.error("Invalid Token", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
    } else if (res.validation === true) {
      toast.success("Token Validated", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      setSection(3);
    }
  });

  const onSubmit3 = handleSubmit(async (data) => {
    if (data.user_password !== data.confirm_password) {
      toast.error("Passwords do not match", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      return;
    } else {
      const { user_mail, token, confirm_password, ...rest } = data;
      rest.user_id = params.user_mail;
      const res = await changePassword(rest);
      toast.success(res.message, {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      setTimeout(() => {navigate("/")}, 3000);
    }
  });

  return (
    <section className="recover animate__animated animate__slideUp">
      <Toaster />
      {section == 1 && (
        <form onSubmit={onSubmit} className="recover__form">
          <h1 className="recover__title">Recovery</h1>
          <p className="recover__text">Please enter your account's email</p>
          <input
            type="text"
            placeholder="example@gmail.com"
            {...register("user_mail", { required: true })}
          />

          <button type="submit" className="submit_button">
            Recover
          </button>
          <p className="login__register">
            Want to go back to login? <span onClick={onBack}>Back</span>
          </p>
        </form>
      )}
      {section == 2 && (
        <form onSubmit={onSubmit2} className="recover__form">
          <h1 className="recover__title">Recovery</h1>
          <p className="recover__text">
            Please enter the 4 digit code we sent to your email
          </p>
          <input type="number" {...register("token")} />
          <button type="submit" className="submit_button">
            Submit
          </button>
          <p className="login__register">
            Want to back go to login? <span onClick={onBack}>Back</span>
          </p>
        </form>
      )}
      {section == 3 && (
        <form onSubmit={onSubmit3} className="recover__form">
          <h1 className="recover__title">New Password</h1>
          <p className="recover__text--modifier">
            Please enter your new password
          </p>
          <input type="password" {...register("user_password")} />
          <p className="recover__text--modifier">
            Please confirm your new password
          </p>
          <input type="password" {...register("confirm_password")} />
          <button type="submit" className="submit_button">
            Submit
          </button>
          <p className="login__register">
            Want to back go to login? <span onClick={onBack}>Back</span>
          </p>
        </form>
      )}
    </section>
  );
}

export default Recover;
