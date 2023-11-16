import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useTopic from "../Hooks/useTopic.jsx";
import useSessionType from "../Hooks/useSessionType.jsx";

function Classes() {

    const topics = useTopic();
    const sessionTypes = useSessionType()
    console.log(topics);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();



    return (
        <>
            {/* the first step is when i select my topic of interest */}
            <form action="">
                <div className="Classes_formgroup">
                    <select name="" id="">
                        <option value="">Select Topic</option>
                        {topics.map((topic) => (
                            <option value={topic.topic_id}>{topic.topic_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="">What type of sessions do you want</label>
                    <select name="" id="">
                        <option value="">Select your preference</option>
                        {
                            sessionTypes.map((sessionType) => (
                                <option value={sessionType.session_type_id}>{sessionType.session_type_name}</option>
                            ))
                        }
                    </select>
                </div>
                
                {/* then i need to select the date and time that i want to have the session */}

                <div>
                    <label htmlFor="">Select Date</label>
                    <input type="datetime-local" min={()=>{
                        return new Date().toISOString().split("T")[0]
                    }} />
                </div>


                {/* when i´ve selected my topic of interest, i'll filter the teachers that are available for that topic and  based on the selected date time but if the session type is groups i will show the available groups that are available for that topic and datetime */}
                <div>
                    
                </div>

            </form>

        </>
    )
}

export default Classes;