import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

function Register() {
  const [state, setState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onBar = () => {
    navigate("/");
  };
  const changeState = () => {
    setState(!state);
  };
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className="register">
      <form onSubmit={onSubmit} className="register__form">
        <section className="login__bars">
          <div className="login__bar" onClick={onBar}></div>
          <div className="login__bar--modifier"></div>
        </section>

        {!state && (
          <section className="register__personal">
            <h1>Personal Information</h1>
            <section className="register__inputs">
              <input
                type="text"
                {...register("user_name", { required: true })}
                placeholder="Name"
              />

              <input
                type="text"
                {...register("user_middle_name", { required: true })}
                placeholder="Middle Name"
              />
              <input
                type="text"
                {...register("user_last_name", { required: true })}
                placeholder="Last Name"
              />

              <input
                type="text"
                {...register("user_birth", { required: true })}
                placeholder="Birth Date"
              />

              <select
                type="text"
                {...register("user_id_type", { required: true })}
              >
                <option value="">ID Type</option>
                <option value="">siu</option>
                <option value="">siu</option>
                <option value="">siu</option>
              </select>

              <input
                type="text"
                {...register("user_id", { required: true })}
                placeholder="Identification"
              />

              {errors.user_name && (
                <p className="error">User Name is required</p>
              )}
              {errors.user_middle_name && (
                <p className="error">Middle Name is required</p>
              )}
              {errors.user_last_name && (
                <p className="error">Last Name is required</p>
              )}
              {errors.user_birth && (
                <p className="error">Birth Date is required</p>
              )}
              {errors.user_id_type && (
                <p className="error">ID Type is required</p>
              )}
              {errors.user_id && (
                <p className="error">Identification is required</p>
              )}
            </section>
          </section>
        )}

        {state && (
          <section className="register__user">
            <h1>User Information</h1>
            <input
              className="register__input"
              type="text"
              {...register("user_email", { required: true })}
              placeholder="User Email"
            />

            <input
              className="register__input"
              type="text"
              {...register("user_nametag", { required: true })}
              placeholder="User Name"
            />
            <section className="register__inputs">
              <input
                type="password"
                {...register("user_password", { required: true })}
                placeholder="Password"
              />

              <input
                type="text"
                {...register("user_password_confirm", { required: true })}
                placeholder="Confirm Pass"
              />

              {errors.user_email && (
                <p className="error">User Name is required</p>
              )}
              {errors.user_nametag && (
                <p className="error">User Name is required</p>
              )}
              {errors.user_password && (
                <p className="error">Password is required</p>
              )}
              {errors.user_password_confirm && (
                <p className="error">Confirm Password</p>
              )}
            </section>
          </section>
        )}
        <section className="register__arrows">
          <div className="submit_buttn">
            <FaArrowLeft />
          </div>
          <div className="submit_buttn--active" onClick={changeState}>
            <FaArrowRight />
          </div>
        </section>
        <section className="dots">
          <div className="dot"></div>
          <div className="dot--active"></div>
          <div className="dot"></div>
        </section>
      </form>
    </section>
  );
}

export default Register;
