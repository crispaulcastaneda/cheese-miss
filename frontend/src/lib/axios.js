import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://localhost:5173/api",

    // send cookies single request
    withCredentials: true,
});