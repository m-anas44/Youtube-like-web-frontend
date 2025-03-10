import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./refreshAccessToken";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      username: formData.usernameOrEmail.includes("@")
        ? undefined
        : formData.usernameOrEmail,
      email: formData.usernameOrEmail.includes("@")
        ? formData.usernameOrEmail
        : undefined,
      password: formData.password,
    };

    try {
      const response = await axiosInstance.post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login successful:", response.data);
      navigate("/");
    } catch (err) {
      // Improved error message handling
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : "Invalid credentials or an error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="light-bg-secondary dark-bg-primary">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border light-border-secondary dark-border-secondary md:mt-0 sm:max-w-md xl:p-0 bg-transparent">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-[#f44336] text-xs font-normal">
              It is suggested to login and register with your fake information.
              It may also include fake videos and channels. This project is just
              for demonstration of proficiency in development.
            </p>
            <h1 className="text-xl font-bold font-normal-bold leading-tight tracking-tight light-text-primary dark-text-primary md:text-2xl">
              Login to your account
            </h1>
            {error && (
              <div className="text-red-500 text-sm font-medium bg-red-100 p-3 rounded">
                {error}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Username or Email */}
              <div>
                <label
                  htmlFor="usernameOrEmail"
                  className="block mb-2 text-sm font-normal-bold light-text-primary dark-text-primary"
                >
                  Username or Email
                </label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  placeholder="Enter your username or email"
                  className="border light-border-primary dark-border-primary light-text-primary dark-text-primary light-bg-secondary dark-bg-secondary text-sm rounded-lg block w-full p-2.5"
                  required
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-normal-bold light-text-primary dark-text-primary"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border light-border-primary dark-border-primary light-text-primary dark-text-primary light-bg-secondary dark-bg-secondary text-sm rounded-lg block w-full p-2.5"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full light-btn dark-btn font-normal-bold rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Don't have an account? */}
              <p className="text-sm light-text-primary dark-text-primary font-normal-bold">
                Don’t have an account?{" "}
                <Link to="/register" className="underline">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
