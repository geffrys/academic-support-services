
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import useInterest from "../Hooks/useInterest";
import useCountries from "../Hooks/useCountries";



function EditUser({ userProfile, setEdit }) {

    const interests = useInterest();
    const countries = useCountries();
    console.log(countries);
    const [userForm, setUserForm] = useState({});

    const [selectedValues, setSelectedValues] = useState([]);


    const handleSelect = (selectedList, selectedItem) => {
        setSelectedValues(selectedList);
    };

    const handleRemove = (selectedList, removedItem) => {
        setSelectedValues(selectedList);
    };

    useEffect(() => {
        if (userProfile.user_interests) {
            let interests = userProfile.user_interests.split(";");
            setSelectedValues(interests);
        }
        setUserForm({
            user_name: userProfile.user_name,
            user_last_name: userProfile.user_last_name,
            user_middle_name: userProfile.user_middle_name,
            user_mail: userProfile.user_mail,
            user_phone: userProfile.user_phone,
            user_interests: userProfile.user_interests,
            user_country: userProfile.user_country,
        })


    }, [userProfile]);




    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">User Name</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_username} />
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Name</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_name} />
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Middle Name</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_middle_name} />
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Last Name</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_last_name} />
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Email</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_mail} />
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Phone</h3>
                <input type="text" className="profileInfo_input" value={userForm.user_phone} />
            </div>
            <div className="profileInfo_container">
                <label htmlFor="">Interes</label>
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
            <div>
                <select name="" id="">
                    {countries.map((country) => {
                        return (
                            <option value={country.name}>{country.name}</option>
                        )
                    })}
                </select>
            </div>

        </>
    )
}


export default EditUser;