import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Use the same axiosInstance for consistency
        const response = await axiosInstance.post('/users/refreshToken', null, {
          withCredentials: true,
        });

        if (response.data && response.data.data && response.data.data.accessToken) {
          const { accessToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          // Log the new token for debugging
          console.log("New Access Token:", accessToken);

          return axiosInstance(originalRequest);
        } else {
          throw new Error("Failed to retrieve access token from refresh response.");
        }
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        // Clear the stored token and redirect to login
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
