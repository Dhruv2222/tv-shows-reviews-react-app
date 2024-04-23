import axios from "axios";

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
  favorite_show: string;
}

const API_URL = process.env.REACT_APP_API_BASE + "/api"
const SEARCH_URL = process.env.REACT_APP_API_BASE + "/search"



const request = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const logoutUser = async () => {
  const response = await request.get("/users/logout");
  return response.data;
};

export const getUserProfile = async () => {
  try {
    const response = await request.get("/users/profile");
    return response.data;
  } catch (error) {
    return "Not logged in";
  }
};

const searchRequest = axios.create({
    baseURL: SEARCH_URL
});

export const search = async (searchQuery: string) => {
  const response = await searchRequest.get("", { params: { q: searchQuery } });
  return response.data;
};

export const getUserWishlist = async (username: any) => {
  console.log(username);
  const response = await request.get(`/wishlist/${username}`);
  console.log(response.data);
  return response.data;
};

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

export const findAllUsers = async () => {
  const response = await request.get(`/users`);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await request.delete(`/userid/${user._id}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await request.get(`/userid/${id}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await request.get(`/users/?role=${role}`);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await request.put(`/users/${user._id}`, user);
  return response.data;
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
