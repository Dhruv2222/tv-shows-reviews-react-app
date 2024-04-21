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

export const getUserWishlist = async (username: any) => {
    console.log(username);
    const response = await request.get(`/wishlist/${username}`);
    console.log(response.data);
    return response.data
}

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

export const getShowFromMongoByShowId = async (showId: any) => {
    const response = await request.get(`/shows/${showId}`);
    return response.data;
  };

// export function getShowById(showId: any): Promise<any> {
//     if (showId === "") {
//         return Promise.reject("Invalid showId");
//     }
//     return fetch(`https://api.tvmaze.com/shows/${showId}`)
//         .then((response) => response.json())
//         .then((data) => ({
//             id: data.id,
//             title: data.name,
//             image: data.image?.original,
//             summary: data.summary,
//             avgRuntime: data.avgRuntime,
//             status: data.status,
//             language: data.language,
//             premiered: data.premiered,
//             rating: data.rating?.average,
//         }))
//         .catch((error) => {
//             console.error("Error fetching show:", error);
//             return Promise.reject(error);
//         });
// }
