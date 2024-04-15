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
    console.log(newReview)
    const response = await request.post('/reviews', newReview);
    console.log(response.data)
    return response.data
    // console.log(response.data)
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

export const addToWishlist = async (newWishList: any) => {
    try {
        console.log(newWishList)
        const response = await request.post('/wishlist', newWishList);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error adding show to wishlist:', error);
        throw error;
    }
}


export const getUserWishlist = async (username: any) => {
    console.log(username);
    const response = await request.get(`/wishlist/${username}`);
    console.log(response.data);
    return response.data
}

export const removeFromWishlist = async (wishlistId: any) => {
    try {
      console.log(wishlistId);
      const response = await request.delete(`/wishlist/${wishlistId}`);
    //   const response = await request.delete(`/wishlist/${wishlistId}`);
      return response.data; // Return the response data
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error('Error removing from wishlist:', error);
      throw error; // Re-throw the error to handle it in the calling function if needed
    }
  };