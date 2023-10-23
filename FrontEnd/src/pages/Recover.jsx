import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Recover.css";
import { Toaster, toast } from "react-hot-toast";

function Recover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { getUser } = useAuth();

  const onBack = () => {
    navigate("/");
  }

  const onSubmit = handleSubmit(async (data) => {
    const res = await getUser(data);
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
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  });

  return (
    <section className="recover animate__animated animate__slideUp">
      <Toaster />
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
          Want to back to login? <span onClick={onBack}>Back</span>
        </p>
      </form>
    </section>
  );
}

export default Recover;
