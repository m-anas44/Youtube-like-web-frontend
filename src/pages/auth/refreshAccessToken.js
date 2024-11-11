import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  withCredentials: true, // Important for sending cookies
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
        const response = await axios.post(
          "https://pro-backend-production-2d96.up.railway.app/api/v1/users/refreshToken",
          null,
          { withCredentials: true }
        );
        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);
        // Clear any stored tokens and redirect to login
        localStorage.removeItem("accessToken");
        // Optionally, trigger logout logic or redirect here
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
