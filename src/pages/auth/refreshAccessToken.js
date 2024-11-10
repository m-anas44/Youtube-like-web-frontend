import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Avoid infinite loop by checking if we've already tried to refresh the token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        const refreshResponse = await axiosInstance.post('/users/refreshToken', null, {
          withCredentials: true,
        });
        
        // Check if a new access token was returned
        if (refreshResponse.data && refreshResponse.data.data && refreshResponse.data.data.accessToken) {
          const { accessToken } = refreshResponse.data.data;
          
          // Store the new access token and retry the original request
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("Failed to retrieve access token from refresh response.");
        }
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        
        // Clear stored access token and redirect to login
        localStorage.removeItem("accessToken");

        // Prevent further attempts and redirect to login
        window.location.href = "/login";  // Redirect to login page or show a logout message
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 or not related to token refresh, reject it normally
    return Promise.reject(error);
  }
);

export default axiosInstance;
