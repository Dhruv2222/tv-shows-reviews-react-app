import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export const fetchAllUsers = async () => {
    const response = await request.get("/users");
    return response.data;
}

export const registerUser = async (user: any) => {
    const response = await request.post("/users/register", user);
    return response.data;
}

export const loginUser = async (user: any) => {
    try {
        const response = await request.post(`/users/login`, user);
        return response.data;
    } catch (error) {
        return "Invalid credentials";
    }
    
}