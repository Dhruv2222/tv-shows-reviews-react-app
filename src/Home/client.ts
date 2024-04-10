import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:4000/api",
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

const searchRequest = axios.create({
    baseURL: "http://localhost:4000/search"
});

export const search = async (searchQuery: string) => {
    const response = await searchRequest.get("", { params: { q: searchQuery } });
    return response.data;
}