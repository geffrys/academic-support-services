import { useForm } from "react-hook-form";
import Register from "../components/Register";
import "../css/LogIn.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function LogIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { logIn, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showLoginForm = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const showRegisterForm = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const onRecover = () => {
    navigate("/recover");
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    let key = true;
    if (!data.user_password) {
      toast("Password is required", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      key = false;
    }
    if (!data.user_mail) {
      toast("User Email is required", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      key = false;
    }
    if (key) {
      await logIn(data);
    }
  });

  return (
    <>
      <section className={!showRegister ? "active" : "hidden"}>
        {showLogin && (
          <section className="login">
            <Toaster />
            <form onSubmit={onSubmit} className="login__form">
              <section className="login__bars">
                <div className="login__bar--modifier"></div>
                <div className="login__bar" onClick={showRegisterForm}></div>
              </section>

              <p>User Email</p>
              <input type="text" {...register("user_mail")} />

              <p>Password</p>
              <input type="password" {...register("user_password")} />
              <button type="submit" className="submit_button">
                LOG IN
              </button>
              <p className="login__register">
                Don't have an account yet?{" "}
                <span onClick={showRegisterForm}>Register</span>
              </p>
              <p className="login__register">
                Forgot your password? <span onClick={onRecover}>Recover</span>
              </p>
            </form>
          </section>
        )}
      </section>
      <section className={!showRegister ? "hidden" : "active"}>
        {showRegister && <Register showLoginForm={showLoginForm} />}
      </section>
    </>
  );
}

export default LogIn;
