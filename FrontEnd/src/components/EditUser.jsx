
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
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
        setValue
    } = useForm();

    const [selectedValues, setSelectedValues] = useState([]);


    const handleSelect = (selectedList, selectedItem) => {
        setSelectedValues(selectedList);
    };

    const handleRemove = (selectedList, removedItem) => {
        setSelectedValues(selectedList);
    };

    const onSubmitEdit = handleSubmit(async (data) => {
        let interests = selectedValues.join(";");
        console.table(data)
        data.user_interests = interests;
        let isValid = true
        if (data.user_username.length === 0) {
            console.log("no username");
            toast.error("Please enter a username");
            isValid = false;
        }
        if (data.user_name.length === 0) {
            console.log("no name");
            toast.error("Please enter your name");
            isValid = false;
        }
        if (data.user_middle_name.length === 0) {
            console.log("no middle name");
            toast.error("Please enter your middle name");
            isValid = false;
        }
        if (data.user_last_name.length === 0) {
            console.log("no last name");
            toast.error("Please enter your last name");
            toast("Please enter your last name")
            isValid = false;
        }
        if (data.user_mail.length === 0) {
            console.log("no email");
            toast.error("Please enter your email");
            isValid = false;
        }
        if (data.user_phone.length === 0) {
            console.log("no phone");
            toast.error("Please enter your phone number");
            isValid = false;
        }
        if (data.user_country.length === 0) {
            console.log("no country");
            toast.error("Please select your country");
            isValid = false;
        }
        if (data.user_interests.length === 0) {
            console.log("no interests");
            toast.error("Please select your interests");
            isValid = false;
        }
        if (isValid) {
            try {
                let editFormData = new FormData();
                editFormData.append("user_img", data.user_img ? data.user_img[0] : null);
                editFormData.append("user_username", data.user_username);
                editFormData.append("user_name", data.user_name);
                editFormData.append("user_middle_name", data.user_middle_name);
                editFormData.append("user_last_name", data.user_last_name);
                editFormData.append("user_mail", data.user_mail);
                editFormData.append("user_phone", data.user_phone);
                editFormData.append("user_country", data.user_country);
                editFormData.append("user_interests", data.user_interests);
                editFormData.append("user_id", userProfile.user_id);
                console.log(editFormData);
                let res = await updateUserById(userProfile.user_id, editFormData)
                console.log(res);
                setEdit(false);
            } catch (error) {
                console.error(error);
            }
        }
    })

    useEffect(() => {
        if (userProfile.user_interests) {
            let interests = userProfile.user_interests.split(";");
            setSelectedValues(interests);
        }
        console.table(userProfile)
        Object.keys(userProfile).forEach(key => {
            setValue(key, userProfile[key]);
        });
        setValue("user_country", userProfile.user_country);

    }, [userProfile]);






    return (
        <>
            <form action="" className="editProfileForm" onSubmit={onSubmitEdit}>
                {true ? "" : <input type="file" {...register("user_img")} name="user_img" />}
                <div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">User Name</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_username")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Name</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_name")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Middle Name</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_middle_name")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Last Name</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_last_name")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Email</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_mail")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Phone</h3>
                        <input type="text" className="profileInfo_input"  {...register("user_phone")} />
                    </div>
                    <div className="editProfileForm__formGroup">
                        <h3 className="profileInfo_subtitle">Country</h3>
                        <select   {...register("user_country")}>
                            <option value="">Select your country</option>
                            {countries.map((country) => {
                                return (
                                    <option value={country.name}>{country.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br />
                    <div className="editProfileForm_buttons">
                        <button type="submit" className="editProfileForm_submit">Confirm</button>
                        <button className="editProfileForm_cancel" onClick={() => {
                            setEdit(false);
                        }}>Cancel</button>
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
                                    background: "var(--primary-color)",
                                    borderRadius: "2.2rem",
                                },
                                searchBox: {
                                    textAlign: "center",
                                    border: "none",
                                    fontSize: "1.6rem",
                                },
                                inputField: {
                                    margin: "-5px",
                                    background: "var(--primary-color)",
                                },
                                chips: {
                                    background: "var(--background-color-dark)",
                                },
                                option: {
                                    color: "var(--primary-color)",
                                },
                            }}
                        />
                    </div>
                </div>


                <br />
            </form>


        </>
    )
}


export default EditUser;