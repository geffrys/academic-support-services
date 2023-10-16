import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/LogIn.css";

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onRegister = () => {
    navigate("/register");
  };
  const onBar = () => {
    navigate("/register");
  };
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="login">
      <form onSubmit={onSubmit} className="login__form">
        <section className="login__bars">
          <div className="login__bar--modifier"></div>
          <div className="login__bar" onClick={onBar}></div>
        </section>

        <p>User Name</p>
        <input type="text" {...register("user_name", { required: true })} />

        <p>Password</p>
        <input
          type="password"
          {...register("user_password", { required: true })}
        />
        {errors.user_name && <p className="error">User Name is required</p>}
        {errors.user_password && <p className="error">Password is required</p>}
        <button type="submit" className="submit_button">
          LOG IN
        </button>
        <p className="login__register">
          Don't have an account yet? <span onClick={onRegister}>register</span>
        </p>
      </form>
    </section>
  );
}

export default LogIn;
