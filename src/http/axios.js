import axios from "axios";
import { DEEPDIVE_SERVER_HTTP } from "constants";

// DeepDive-Server endpoints are no longer authenticated so we don't need to store access tokens anymore
export const axiosInstance = axios.create({
  baseURL: `${DEEPDIVE_SERVER_HTTP}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error to the console
    console.error("API call error:", error);
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 400:
          console.error("Bad Request");
          break;
        case 404:
          console.error("Not Found");
          break;
        case 500:
          console.error("Internal Server Error");
          break;
        default:
          console.error(`Unhandled status code: ${error.response.status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    // Return a rejected promise to handle the error in the calling code
    return Promise.reject(error);
  },
);
