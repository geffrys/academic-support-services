import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import useInterest from "../Hooks/useInterest";
import useCountries from "../Hooks/useCountries";
import "../css/EditUser.css";
import { updateUserById } from "../api/users.api";
import toast, { Toaster } from "react-hot-toast";

function EditUser({ userProfile, setEdit }) {
  const interests = useInterest();
  const countries = useCountries();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
  };

  const handleRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
  };

  const handleSelectSingle = (selectedList) => {
    setSelectedValue(selectedList);
  };

  const handleRemoveSingle = (selectedList) => {
    setSelectedValue(selectedList);
  };

  const onSubmitEdit = handleSubmit(async (data) => {
    let interests = selectedValues.join(";");
    let country = selectedValue;
    data.user_interests = interests;
    data.user_country = country;
    let isValid = true;
    if (data.user_username.length === 0) {
      toast.error("Please enter a username", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_name.length === 0) {
      toast.error("Please enter your name", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_last_name.length === 0) {
      toast.error("Please enter your last name", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_mail.length === 0) {
      toast.error("Please enter your email", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_phone.length === 0) {
      toast.error("Please enter your phone number", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_country.length === 0) {
      toast.error("Please select your country", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (data.user_interests.length === 0) {
      toast.error("Please select your interests", {
        style: {
          borderRadius: "10px",
          background: "var(--background-color-dark)",
          color: "var(--primary-color)",
        },
      });
      isValid = false;
    }
    if (isValid) {
      try {
        let editFormData = new FormData();
        editFormData.append(
          "user_img",
          data.user_img ? data.user_img[0] : null
        );
        editFormData.append("user_username", data.user_username);
        editFormData.append("user_name", data.user_name);
        editFormData.append("user_middle_name", data.user_middle_name);
        editFormData.append("user_last_name", data.user_last_name);
        editFormData.append("user_mail", data.user_mail);
        editFormData.append("user_phone", data.user_phone);
        editFormData.append("user_country", data.user_country[0].name);
        editFormData.append("user_interests", data.user_interests);
        editFormData.append("user_id", userProfile.user_id);
        let res = await updateUserById(userProfile.user_id, editFormData);
        toast.success("User updated successfully", {
          style: {
            borderRadius: "10px",
            background: "var(--background-color-dark)",
            color: "var(--primary-color)",
          },
        });
        setTimeout(() => {
          setEdit(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    if (userProfile.user_interests) {
      let interests = userProfile.user_interests.split(";");
      setSelectedValues(interests);
    }
    if (userProfile.user_country) {
      let user_country = [{ name: userProfile.user_country.toString() }];
      setSelectedValue(user_country);
    }
    Object.keys(userProfile).forEach((key) => {
      setValue(key, userProfile[key]);
    });
    setValue("user_country", userProfile.user_country);
  }, [userProfile]);

  const data = countries.map((country) => ({ name: country.name }));
  return (
    <section className="edit_profiler">
      <Toaster />
      <form action="" className="editProfileForm" onSubmit={onSubmitEdit}>
        {true ? (
          ""
        ) : (
          <input type="file" {...register("user_img")} name="user_img" />
        )}
        <div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">User Name</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_username")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Name</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_name")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Middle Name</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_middle_name")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Last Name</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_last_name")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Email</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_mail")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Phone</h3>
            <input
              type="text"
              className="profileInfo_input"
              {...register("user_phone")}
            />
          </div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Country</h3>
            <Multiselect
              id="multiselectCountry"
              isObject={true}
              options={data}
              selectedValues={selectedValue}
              onSelect={handleSelectSingle}
              onRemove={handleRemoveSingle}
              displayValue="name"
              placeholder="Country"
              hidePlaceholder={true}
              selectionLimit="1"
              style={{
                multiselectContainer: {
                  background: "var(--background-color)",
                  borderRadius: "2.2rem",
                  border: "1px solid var(--primary-color)",
                  color: "white",
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
          <br />
          <div className="editProfileForm_buttons">
            <button type="submit" className="submit_button">
              Submit
            </button>
            <button
              className="cancel_button"
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div>
          <div className="editProfileForm__formGroup">
            <h3 className="profileInfo_subtitle">Interest</h3>
            <Multiselect
              isObject={false}
              options={interests}
              selectedValues={selectedValues}
              onSelect={handleSelect}
              onRemove={handleRemove}
              displayValue="Country"
              placeholder="Select your interests"
              hidePlaceholder={true}
              style={{
                multiselectContainer: {
                  background: "var(--background-color)",
                  borderRadius: "2.2rem",
                  border: "1px solid var(--primary-color)",
                  color: "white",
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
        </div>

        <br />
      </form>
    </section>
  );
}

export default EditUser;
