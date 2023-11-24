import axios from 'axios'

export const getGroups = async () => 
    await axios.get("http://localhost:3000/api/v1/singlegroup")