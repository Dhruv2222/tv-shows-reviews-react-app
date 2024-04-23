import axios from "axios"
const API_URL = process.env.REACT_APP_API_BASE + "/api"
const request = axios.create({
    // baseURL: "http://localhost:4000/api",
    baseURL: API_URL,
    withCredentials: true,
});

export const logoutUser = async () => {
    const response = await request.get("/users/logout");
    return response.data;
}

export const getUserProfile = async () => {
    try {
        const response = await request.get("/users/profile");
        return response.data;
    } catch (error) {
        return "Not logged in";
    }
}