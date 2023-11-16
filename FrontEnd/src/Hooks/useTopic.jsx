import {useEffect, useState} from "react";
import {getTopicsRequest} from "../api/topics.api"

function useTopic(){

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function getTopics(){
            let t = await getTopicsRequest();
            setTopics(t.data);
        }
        getTopics();

    }, []);
    return topics;
}

export default useTopic;