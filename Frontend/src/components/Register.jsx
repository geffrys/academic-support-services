import { useForm } from "react-hook-form";
import "../css/Register.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Register = ({ showLoginForm }) => {
  const [state, setState] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onBar = () => {
    showLoginForm();
  };

  const commonToastStyle = {
    borderRadius: "10px",
    background: "var(--background-color-dark)",
    color: "var(--primary-color)",
  };

  const changeStateForward = () => {
    if (state == 1) {
      setState(2);
    } else if (state == 2) {
      setState(3);
    }
  };

  const changeStateBackwards = () => {
    if (state == 2) {
      setState(1);
    } else if (state == 3) {
      setState(2);
    }
  };

  const onSubmit = handleSubmit((data) => {
    let isValid = true;
  
    const fieldsToValidate = [
      'user_name',
      'user_last_name',
      'user_birth',
      'user_id_type',
      'user_id',
      'user_email',
      'user_nametag',
      'user_password',
      'user_password_confirm'
    ];
  
    const formatFieldName = (field) => {
      return field
        .replace('user_', '') // Remueve el prefijo 'user_'
        .split('_') // Divide el nombre por guiones bajos
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
        .join(' '); // Une las palabras con un espacio
    };
  
    for (const field of fieldsToValidate) {
      if (!data[field]) {
        toast(`${formatFieldName(field)} is required`, {
          style: commonToastStyle,
        });
        isValid = false;
      }
    }
  
    if (isValid) {
      console.log(data);
    }
  });

  return (
    <section className="register">
      <Toaster />
      <form onSubmit={onSubmit} className={`register__form`}>
        <section className="login__bars">
          <div className="login__bar" onClick={onBar}></div>
          <div className="login__bar--modifier"></div>
        </section>

        <section
          className={state == 1 ? "register__active" : "register__hidden"}
        >
          {state == 1 && (
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
                  {...register("user_middle_name")}
                  placeholder="Middle Name"
                />
                <input
                  type="text"
                  {...register("user_last_name", { required: true })}
                  placeholder="Last Name"
                />

                <input
                  type="date"
                  {...register("user_birth", { required: true })}
                  placeholder="Birth Date"
                />

                <select
                  type="text"
                  {...register("user_id_type", { required: true })}
                >
                  <option value="">ID Type</option>
                  <option value="1">siu</option>
                  <option value="2">siu</option>
                  <option value="3">siu</option>
                </select>

                <input
                  type="number"
                  {...register("user_id", { required: true })}
                  placeholder="Identification number"
                />
              </section>
            </section>
          )}
        </section>

        <section
          className={state == 1 ? "register__hidden" : "register__active"}
        >
          {state == 2 && (
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
                  type="password"
                  {...register("user_password_confirm", { required: true })}
                  placeholder="Confirm Pass"
                />
              </section>
            </section>
          )}
        </section>
        <section
          className={state == 3 ? "register__active" : "register_hidden"}
        >
          {state == 3 && <button type="submit">aa</button>}
        </section>
        <section className="register__arrows">
          <div
            className={
              state == 2 || state == 3 ? "submit_buttn--active" : "submit_buttn"
            }
            onClick={changeStateBackwards}
          >
            <FaArrowLeft />
          </div>
          <div
            className={
              state == 1 || state == 2 ? "submit_buttn--active" : "submit_buttn"
            }
            onClick={changeStateForward}
          >
            <FaArrowRight />
          </div>
        </section>
        <section className="dots">
          <div className={state == 1 ? "dot--active" : "dot"}></div>
          <div className={state == 2 ? "dot--active" : "dot"}></div>
          <div className={state == 3 ? "dot--active" : "dot"}></div>
        </section>
      </form>
    </section>
  );
};

export default Register;
