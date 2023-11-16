import {useEffect, useState} from "react";
import {getSessionTypes} from "../api/session_types.api"

function useSessionType(){

    const [sessionType, setSessionType] = useState([]);

    useEffect(() => {
        async function getSessionType(){
            let t = await getSessionTypes();
            setSessionType(t.data);
        }
        getSessionType();

    }, []);
    return sessionType;
}

export default useSessionType;