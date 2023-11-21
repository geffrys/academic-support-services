import { useState } from "react";
import { useForm } from "react-hook-form";
import useTopic from "../Hooks/useTopic.jsx";
import useSessionType from "../Hooks/useSessionType.jsx";
import useTeacher from "../Hooks/useTeacher.jsx";
import useGroups from "../Hooks/useGroups.jsx";
import "../css/Classes.css";
import { useAuth } from "../context/AuthContext";
import { postSessions } from "../api/session.api.js";
import { postGroups } from "../api/groups.api.js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function Classes() {

    const SESSION_TYPE_GROUP = 1;

    const { user } = useAuth();

    const topics = useTopic();
    const sessionTypes = useSessionType()
    const teachers = useTeacher();
    const groups = useGroups();

    const [selectedSessionType, setSelectedSessionType] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");

    const navigate = useNavigate();

    console.log(topics, sessionTypes, teachers)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onChangeSessionType = (e) => {
        const sessionTypeId = e.target.value;
        setValue("session_type_id", sessionTypeId);
        setSelectedSessionType(sessionTypeId);
    }

    const onChangeTopic = (e) => {
        const topicId = e.target.value;
        setValue("topic_id", topicId);
        setSelectedTopic(topicId);
    }



    const onSubmit = handleSubmit(async (data) => {
        console.log(data, user);
        if (data.session_type_id == SESSION_TYPE_GROUP) {
            let valid = true;
            if (data.group_id == "") {
                toast.error("Please select a group", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (user.id == "") {
                toast.error("Please login", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }

            if (valid) {
                const groupEnrollment = {
                    group_id: data.group_id,
                    user_id: user.id
                }
                try {
                    await postGroups(groupEnrollment)
                    toast.success("Group enrollment successful", {
                        style: {
                            borderRadius: "10px",
                            background: "var(--background-color-dark)",
                            color: "var(--primary-color)",
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }


        }
        else {

            let valid = true;
            if (data.session_type_id == "") {
                toast.error("Please select a session type", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (data.topic_id == "") {
                toast.error("Please select a topic", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (data.session_entry_date == "") {
                toast.error("Please select a date", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (data.session_duration == "") {
                toast.error("Please select a duration", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (user.id == "") {
                toast.error("Please login", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (data.teacher_id == "") {
                toast.error("Please select a teacher", {
                    style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                    },
                });
                valid = false;
            }
            if (valid) {
                const session = {
                    session_type_id: data.session_type_id,
                    topic_id: data.topic_id,
                    user_id: user.id,
                    session_entry_date: data.session_entry_date,
                    session_duration: data.session_duration,
                    teacher_id: data.teacher_id,
                };
                try {
                    await postSessions(session);
                    toast.success("Session created successfully", {
                        style: {
                            borderRadius: "10px",
                            background: "var(--background-color-dark)",
                            color: "var(--primary-color)",
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }


        }
    });

    return (
        <div className="flex-container">
            <div className="classesContainer">
                <Toaster />
                {/* the first step is when i select my topic of interest */}
                <form action="" onSubmit={onSubmit}>

                    <div className="classesFormGroup">
                        <label htmlFor="">Select the type of sessions you desire<span className="RequiredField">*</span></label>
                        <select name="" id="" onChange={onChangeSessionType}>
                            <option value="">Choose your preference</option>
                            {
                                sessionTypes.map((sessionType, index) => (
                                    <option value={sessionType.session_type_id} key={index}>{sessionType.session_type_name}</option>
                                ))
                            }
                        </select>
                    </div>



                    {
                        selectedSessionType != null && (
                            <>
                                <div className="classesFormGroup">
                                    <label htmlFor="">Choose the topic you want to learn<span className="RequiredField">*</span></label>
                                    <select name="" id="" onChange={onChangeTopic} >
                                        <option value="">Select Topic</option>
                                        {topics.map((topic, index) => (
                                            <option value={topic.topic_id} key={index}>{topic.topic_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {
                                    selectedTopic != "" && (
                                        <>
                                            <div className="classesFormGroup">
                                                <label htmlFor="">Select your preferred teacher or tutor<span className="RequiredField">*</span></label>
                                                <select name="" id="" {...register('teacher_id')} >
                                                    <option value="">Select</option>
                                                    {
                                                        teachers.map((teacher, index) =>
                                                            <option value={teacher.user_id} key={index}>{teacher.user_name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </>
                                    )
                                }


                            </>
                        )
                    }

                    {
                        selectedSessionType == SESSION_TYPE_GROUP && selectedTopic != "" && (
                            <>
                                <div className="classesFormGroup">
                                    <label htmlFor="">Select your preferred group<span className="RequiredField">*</span></label>
                                    <select name="" id="" {...register('group_id')} >
                                        <option value="">Select</option>
                                        {
                                            groups.map((group, index) =>
                                                <option value={group.group_id} key={index}>{"Group " + group.group_id}</option>
                                            )
                                        }
                                    </select>
                                </div>
                            </>
                        )


                    }

                    {/* then i need to select the date and time that i want to have the session */}
                    {
                        selectedSessionType != SESSION_TYPE_GROUP && selectedSessionType != "" && selectedTopic != "" && (
                            <>
                                <div className="classesFormGroup">
                                    <label htmlFor="">Select the session date<span className="RequiredField">*</span></label>
                                    <input type="datetime-local" {...register('session_entry_date')} />
                                </div>
                                <div className="classesFormGroup">
                                    <label htmlFor="">Enter the session duration<span className="RequiredField">*</span></label>
                                    <select name="" id="" {...register('session_duration')}>
                                        <option value="">select duration</option>
                                        {
                                            [30,60,90,120].map((duration, index) => (
                                                <option value={duration} key={index}>{duration + " minutes"}</option>
                                            )
                                            )
                                        }
                                    </select>
                                </div>
                            </>
                        )
                    }

                    <div className="classesFormActions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => {
                            navigate('/')
                        }}>cancel</button>
                    </div>

                </form>

            </ div>
        </div>

    )
}

export default Classes;