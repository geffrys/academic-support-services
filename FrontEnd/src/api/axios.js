import axios from "axios";

const instance = axios.create({
    baseURL: "localhost:3000",
    withCredentials: true,
})

export default instance;