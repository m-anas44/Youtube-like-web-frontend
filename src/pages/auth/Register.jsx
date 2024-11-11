import React, { useState, useRef } from "react";
import axiosInstance from "./refreshAccessToken";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [register, setRegister] = useState("Create an account");
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);

      if (name === "avatar") {
        setAvatarPreview(previewUrl);
      } else if (name === "coverImage") {
        setCoverImagePreview(previewUrl);
      }

      setFormData({
        ...formData,
        [name]: file,
      });
    }
  };

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegister("Registering...");
    const formDataToSend = new FormData();

    // Append the form fields to the FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axiosInstance.post(
        "/users/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setRegister("Create an account");
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section className="light-bg-secondary dark-bg-primary">
      <div className="flex flex-col items-center px-6 py-2 mx-auto">
        <div className="w-full max-w-xl rounded-lg shadow bg-transparent border light-border-secondary dark-border-secondary">
          {/* Cover Image Section */}
          <div
            className="relative mb-8 w-full h-40 bg-[#c1c1c1] dark:bg-[#3a3a3a] rounded-t-lg cursor-pointer"
            onClick={handleCoverClick}
          >
            {coverImagePreview ? (
              <img
                src={coverImagePreview}
                alt="Cover Preview"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <span className="dark:text-[#acacac] text-[#5f5f5f]  text-sm absolute inset-0 flex items-center justify-center">
                Upload Cover Image
              </span>
            )}
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={coverInputRef}
            />
          </div>

          {/* Avatar Section */}
          <div className="relative flex justify-center">
            <div
              className="relative w-32 h-32 rounded-full dark:bg-[#3a3a3a] bg-[#c1c1c1] cursor-pointer border-4 light-border-secondary dark-border-secondary -mt-24 shadow-md"
              onClick={handleAvatarClick}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="dark:text-[#acacac] text-[#5f5f5f] text-sm absolute inset-0 flex items-center justify-center">
                  Upload Avatar
                </span>
              )}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={avatarInputRef}
              />
            </div>
          </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-normal-bold light-text-primary dark-text-primary"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullname"
                  placeholder="Full Name"
                  className="border light-border-primary dark-border-primary light-bg-secondary dark-bg-secondary light-text-primary dark-text-primary text-sm rounded-lg block w-full p-2.5"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-normal-bold light-text-primary dark-text-primary"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="border light-border-primary dark-border-primary light-bg-secondary dark-bg-secondary light-text-primary dark-text-primary text-sm rounded-lg block w-full p-2.5"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-normal-bold light-text-primary dark-text-primary"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border light-border-primary dark-border-primary light-bg-secondary dark-bg-secondary light-text-primary dark-text-primary text-sm rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  className="border light-border-primary dark-border-primary light-bg-secondary dark-bg-secondary light-text-primary dark-text-primary text-sm rounded-lg block w-full p-2.5"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full light-btn dark-btn focus:outline-none font-normal-bold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {register}
              </button>

              {/* Already have an account? */}
              <p className="text-sm light-text-primary dark-text-primary font-normal-bold">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
