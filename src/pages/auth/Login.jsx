import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("/api/v1/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login successful:", response.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response && err.response.data
          ? err.response.data.message
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login to your account
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Username or Email */}
              <div>
                <label
                  htmlFor="usernameOrEmail"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Username or Email
                </label>
                <input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  placeholder="Enter your username or email"
                  className="border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required=""
                  value={formData.usernameOrEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-gray-400 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required=""
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Don't have an account? */}
              <p className="text-sm font-light">
                Don’t have an account?{" "}
                <a href="#" className="font-medium hover:underline">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
