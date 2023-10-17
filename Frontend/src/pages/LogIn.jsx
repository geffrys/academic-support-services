import { useForm } from "react-hook-form";
import Register from "../components/Register";
import "../css/LogIn.css";
import { useState } from "react";

function LogIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <section className={!showRegister ? "active" : "hidden"}>
        {showLogin && (
          <section className="login">
            <form onSubmit={onSubmit} className="login__form">
              <section className="login__bars">
                <div className="login__bar--modifier"></div>
                <div className="login__bar" onClick={showRegisterForm}></div>
              </section>

              <p>User Name</p>
              <input
                type="text"
                {...register("user_name", { required: true })}
              />

              <p>Password</p>
              <input
                type="password"
                {...register("user_password", { required: true })}
              />
              {errors.user_name && (
                <p className="error">User Name is required</p>
              )}
              {errors.user_password && (
                <p className="error">Password is required</p>
              )}
              <button type="submit" className="submit_button">
                LOG IN
              </button>
              <p className="login__register">
                Don't have an account yet?{" "}
                <span onClick={showRegisterForm}>register</span>
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
