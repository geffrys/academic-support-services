import { get, useForm } from "react-hook-form";
import "../css/Register.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Multiselect } from "multiselect-react-dropdown";
import { useAuth } from "../context/AuthContext";
import { getTopicsRequest } from "../api/topics.api";
import { getUserTypesRequest } from "../api/user_types.api";
import { getIdTypesRequest } from "../api/id_types.api";

const Register = ({ showLoginForm }) => {
  const { signUp } = useAuth();
  const [state, setState] = useState(1);
  const [countries, setCountries] = useState([]);
  const [topics, setTopics] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [idTypes, setIdTypes] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onBar = () => {
    showLoginForm();
  };

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const handleSelectSingle = (selectedList, selectedItem) => {
    setSelectedValue(selectedList);
  };

  const handleRemoveSingle = (selectedList, removedItem) => {
    setSelectedValue(selectedList);
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

  const filterUserTypes = async () => {
    try {
      const res = await getUserTypesRequest();
      const filteredUserTypes = res.data.filter(
        (userType) => userType.user_type_name !== "admin"
      );
      setUserTypes(filteredUserTypes);
    } catch (error) {
      console.error("Error filtering user types:", error);
    }
  };
  
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  
  const getTopicsAndIdTypes = async () => {
    try {
      const topicsResponse = await getTopicsRequest();
      setTopics(topicsResponse.data);
  
      const idTypesResponse = await getIdTypesRequest();
      setIdTypes(idTypesResponse.data);
    } catch (error) {
      console.error("Error getting topics and id types:", error);
    }
  };
  
  useEffect(() => {
    fetchCountries();
    getTopicsAndIdTypes();
    filterUserTypes();
  }, []);

  const onSubmit = handleSubmit((data) => {
    let isValid = true;

    const fieldsToValidate = [
      "user_name",
      "user_last_name",
      "user_birth_date",
      "user_id_type_id",
      "user_type_id",
      "user_identification",
      "user_mail",
      "user_username",
      "user_password",
      "user_password_confirm",
      "user_phone",
    ];
    const formatFieldName = (field) => {
      return field
        .replace("user_", "")
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    for (const field of fieldsToValidate) {
      if (!data[field]) {
        toast(`${formatFieldName(field)} is required`, {
          style: commonToastStyle,
        });
        isValid = false;
      }
    }

    if (data.user_password !== data.user_password_confirm) {
      toast(`Passwords don't match`, {
        style: commonToastStyle,
      });
      isValid = false;
    }

    let string = selectedValues;
    data.user_country = selectedValue[0];
    data.user_interests = string.join(";");

    if (!data.user_country) {
      toast(`Please select your country`, {
        style: commonToastStyle,
      });
      isValid = false;
    }
    if (!data.user_interests) {
      toast(`Please select your interests`, {
        style: commonToastStyle,
      });
      isValid = false;
    }

    data.user_name =
      data.user_name.charAt(0).toUpperCase() + data.user_name.slice(1);
    data.user_middle_name =
      data.user_middle_name.charAt(0).toUpperCase() +
      data.user_middle_name.slice(1);
    data.user_last_name =
      data.user_last_name.charAt(0).toUpperCase() +
      data.user_last_name.slice(1);

    if (isValid) {
      signUp(data);
    }
  });

  const data = countries.map((country) => country.name.common);
  const topicData = topics.map((topic) => topic.topic_name);

  return (
    <section className="register">
      <Toaster />
      <form onSubmit={onSubmit} className="register__form">
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
                  {...register("user_birth_date", { required: true })}
                  placeholder="Birth Date"
                />

                <select
                  type="text"
                  {...register("user_id_type_id", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Id Type
                  </option>
                  {idTypes.map((idType) => (
                    <option
                      value={idType.user_id_type_id}
                      key={idType.user_id_type_id}
                    >
                      {idType.user_id_type_name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  {...register("user_identification", { required: true })}
                  placeholder="Identification number"
                />
              </section>
            </section>
          )}
        </section>

        <section
          className={state == 2 ? "register__active" : "register__hidden"}
        >
          {state == 2 && (
            <section className="register__user">
              <h1>User Information</h1>
              <input
                className="register__input"
                type="text"
                {...register("user_mail", { required: true })}
                placeholder="User Email"
              />

              <section className="register__inputs">
                <select
                  type="text"
                  {...register("user_type_id", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    User Type
                  </option>
                  {userTypes.map((userType) => (
                    <option
                      value={userType.user_type_id}
                      key={userType.user_type_id}
                    >
                      {userType.user_type_name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  {...register("user_username", { required: true })}
                  placeholder="User Name"
                />
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
          className={state == 3 ? "register__active" : "register__hidden"}
        >
          {state == 3 && (
            <section className="register__interest">
              <h1>Interest Information</h1>
              <div className="register__select">
                <Multiselect
                  id="multiselectCountry"
                  isObject={false}
                  options={data}
                  selectedValues={selectedValue}
                  onSelect={handleSelectSingle}
                  onRemove={handleRemoveSingle}
                  displayValue="Country"
                  placeholder="Country"
                  hidePlaceholder={true}
                  selectionLimit="1"
                  style={{
                    multiselectContainer: {
                      background: "var(--background-color)",
                      borderRadius: "2.2rem",
                    },
                    searchBox: {
                      textAlign: "center",
                      border: "none",
                      fontSize: "1.6rem",
                    },
                    inputField: {
                      margin: "-5px",
                    },
                    option: {
                      color: "white",
                      background: "var(--background-color-dark)",
                    },
                  }}
                />
              </div>

              <input
                className="register__phone"
                type="tel"
                {...register("user_phone")}
                placeholder="Phone Number"
              />

              <div className="register__select">
                <Multiselect
                  id="multiselectInterests"
                  isObject={false}
                  options={topicData}
                  selectedValues={selectedValues}
                  onSelect={handleSelect}
                  onRemove={handleRemove}
                  displayValue="Interests"
                  placeholder="Select your interests"
                  hidePlaceholder={true}
                  style={{
                    multiselectContainer: {
                      background: "var(--background-color)",
                      borderRadius: "2.2rem",
                    },
                    searchBox: {
                      textAlign: "center",
                      border: "none",
                      fontSize: "1.6rem",
                    },
                    inputField: {
                      margin: "-5px",
                    },
                    chips: {
                      background: "var(--background-color-dark)",
                    },
                    option: {
                      color: "white",
                      background: "var(--background-color-dark)",
                    },
                  }}
                />
              </div>
            </section>
          )}
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
          {state == 3 ? (
            <button type="Submit" className="submit_buttn--active">
              <FaArrowRight />
            </button>
          ) : (
            <div
              className={
                state == 1 || state == 2
                  ? "submit_buttn--active"
                  : "submit_buttn"
              }
              onClick={changeStateForward}
            >
              <FaArrowRight />
            </div>
          )}
        </section>

        <section className="dots">
          <div className={state == 1 ? "dot--active" : "dot"}></div>
          <div className={state == 2 ? "dot--active" : "dot"}></div>
          <div className={state == 3 ? "dot--active" : "dot"}></div>
        </section>
        <p className="login__register">
          Already have an account? <span onClick={onBar}>Login</span>
        </p>
      </form>
    </section>
  );
};

export default Register;
