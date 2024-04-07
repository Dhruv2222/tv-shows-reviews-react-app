import axios from "axios"

interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    phone_number: string;
    role: string;
    favorite_TVshow: string;
}

interface Review {
    _id: string;
    username: string;
    review_description: string;
    review_timestamp: string;
    review_title: string;
    showId: number;
    rating: number;
}

const request = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export const fetchUserById = async (id: String | undefined) => {
    const response = await request.get(`/users/${id}`);
    return response.data;
}

export const fetchReviewsById = async (id: String | undefined) => {
    const response = await request.get(`/users/reviews/${id}`);
    console.log("hello", response.data)
    return response.data;
}

export const deleteReviewById = async (id: String | undefined) => {
    console.log(id)
    const response = await request.delete(`/reviews/${id}`);
    return response.data;
}


export const updateUser = async (user: User) => {
    const response = await request.put(`/users/${user._id}`, user);
    return response.data;
}

export const updateReview = async (review: Review) => {
    const response = await request.put(`/reviews/${review._id}`, review);
    return response.data;
}