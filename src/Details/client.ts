import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export function getShowById(showId: any, callback: (show: any) => void) {
    if (showId === "") {
        return;
    }
    fetch(`https://api.tvmaze.com/shows/${showId}`)
        .then((response) => response.json())
        .then((data) => {
            const show = {
                id: data.id,
                title: data.name,
                image: data.image?.original,
                summary: data.summary,
                avgRuntime: data.avgRuntime,
                status: data.status,
                language: data.language,
                premiered: data.premiered,
                rating: data.rating?.average,
            };
            callback(show);
        })
        .catch((error) => {
            console.error("Error fetching show:", error);
        });
}

export const getReviewsByShowId = async (showId: any) => {
    const response = await request.get(`/reviews/${showId}`);
    return response.data
}

export const addNewReview = async (newReview: any) => {
    const response = await request.post('/reviews', newReview);
    return response.data
}

export const getUserProfile = async () => {
    try {
        const response = await request.get("/users/profile");
        return response.data;
    } catch (error) {
        return "Not logged in";
    }
}

export const deleteReview = async (_id: any) => {
    const response = await request.delete(`/reviews/${_id}`);
    return response.data
}

export const getAverageRating = async (showId: any) => {
    const response = await request.get(`averageRating/${showId}`);
    return response.data
}