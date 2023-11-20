import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import useTopic from "../Hooks/useTopic.jsx";
import useSessionType from "../Hooks/useSessionType.jsx";
import useTeacher from "../Hooks/useTeacher.jsx";
import useGroups from "../Hooks/useGroups.jsx";

function Classes() {

    const SESSION_TYPE_GROUP = 1;

    const topics = useTopic();
    const sessionTypes = useSessionType()
    const teachers = useTeacher();
    const groups = useGroups();

    const [selectedSessionType, setSelectedSessionType] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");

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

    return (
        <>
            {/* the first step is when i select my topic of interest */}
            <form action="">

                <div>
                    <label htmlFor="">What type of sessions do you want</label>
                    <select name="" id="" onChange={onChangeSessionType}>
                        <option value="">Select your preference</option>
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
                            <div className="Classes_formgroup">
                                <label htmlFor="">What topic do you want to learn</label>
                                <select name="" id="" onChange={onChangeTopic}>
                                    <option value="">Select Topic</option>
                                    {topics.map((topic, index) => (
                                        <option value={topic.topic_id} key={index}>{topic.topic_name}</option>
                                    ))}
                                </select>
                            </div>

                            {
                                selectedTopic != "" && (
                                    <>
                                        <div>
                                            <label htmlFor="">Select your teacher or tutor of preference</label>
                                            <select name="" id="">
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
                            <div>
                                <label htmlFor="">Select your group of preference</label>
                                <select name="" id="">
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
                            <div>
                                <label htmlFor="">Select Date</label>
                                <input type="datetime-local" {...register('session_entry_date')} />
                            </div>
                            <div>
                                <label htmlFor="">Session duration</label>
                                <input type="text" placeholder="session duration" />
                            </div>
                        </>
                    )
                }


            </form>

        </>
    )
}

export default Classes;