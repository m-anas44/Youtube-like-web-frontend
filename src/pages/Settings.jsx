import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Settings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState("Save Changes");
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!fullName) validationErrors.fullName = "Name is required";
    if (!email) validationErrors.email = "Email is required";
    if (!oldPassword) validationErrors.oldPassword = "Old password is required";
    if (!newPassword) validationErrors.newPassword = "New password is required";
    if (!avatar) validationErrors.avatar = "Avatar is required";
    if (!coverImage) validationErrors.coverImage = "Cover Image is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.patch("/api/v1/users/updateAccount", { fullName, email });

      await axios.post("/api/v1/users/changePassword", {
        oldPassword,
        newPassword,
      });
      setLoading("Saving...");
      if (avatar) {
        const formData = new FormData();
        formData.append("avatar", avatar);
        await axios.patch("/api/v1/users/avatar", formData);
      }

      if (coverImage) {
        const formData = new FormData();
        formData.append("coverImage", coverImage);
        await axios.patch("/api/v1/users/coverImage", formData);
      }
      setLoading("Save Changes");
      setFullName("");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setAvatarPreview(null);
      setCoverImagePreview(null);
      setAvatar(null);
      setCoverImage(null);

      toast.success("Settings updated successfully!");
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Old password is incorrect"
      ) {
        setErrors({ oldPassword: "Old password is incorrect" });
        toast.error("Incorrect old password.");
      } else {
        toast.error("An error occurred while updating settings.");
      }
    }
  };

  return (
    <div className="p-5">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-4xl mb-3 font-bold leading-7">Settings</h2>
      <p className="mt-1 text-sm leading-6">
        Some of the information will be displayed publicly so be careful what you
        share.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Name and Email fields */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`block w-full rounded-md bg-gray-50 dark:bg-zinc-900 border ${
                      errors.fullName && !fullName
                        ? "border-red-500"
                        : "border-gray-300 dark:border-zinc-700"
                    } px-2 py-1.5 sm:text-sm sm:leading-6`}
                  />
                  {errors.fullName && !fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full rounded-md bg-gray-50 dark:bg-zinc-900 border ${
                      errors.email && !email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-zinc-700"
                    } px-2 py-1.5 sm:text-sm sm:leading-6`}
                  />
                  {errors.email && !email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Change Password section */}
              <div className="col-span-full">
                <h3 className="text-lg font-bold">Change Password</h3>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="oldPassword"
                      className="block text-sm font-medium leading-6"
                    >
                      Old Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={`block w-full rounded-md bg-gray-50 dark:bg-zinc-900 border ${
                          errors.oldPassword
                            ? "border-red-500"
                            : "border-gray-300 dark:border-zinc-700"
                        } px-2 py-1.5 sm:text-sm sm:leading-6`}
                      />
                      {errors.oldPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.oldPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6"
                    >
                      New Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`block w-full rounded-md bg-gray-50 dark:bg-zinc-900 border ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300 dark:border-zinc-700"
                        } px-2 py-1.5 sm:text-sm sm:leading-6`}
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar field */}
              <div className="col-span-full">
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium leading-6"
                >
                  Avatar
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <FaCircleUser className="h-12 w-12 dark:text-gray-300 text-gray-300" />
                  )}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={`rounded-md bg-gray-50 dark:bg-zinc-900 border ${
                      errors.avatar && !avatar
                        ? "border-red-500"
                        : "border-gray-300 dark:border-zinc-700"
                    } px-1.5 py-1.5 text-sm font-semibold`}
                  />
                </div>
                {errors.avatar && !avatar && (
                  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                )}
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="coverImage"
                  className="block text-sm font-medium leading-6"
                >
                  Cover Image
                </label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 bg-gray-50 dark:bg-zinc-900 px-6 py-10 dark:border-zinc-700">
                  {coverImagePreview ? (
                    <img
                      src={coverImagePreview}
                      alt="Cover Image Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <FaCircleUser
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 dark:text-gray-300 text-gray-300"
                      />
                      <div className="mt-4 flex text-sm leading-6">
                        <label
                          htmlFor="coverImage"
                          className="relative cursor-pointer rounded-md font-semibold text-red-500"
                        >
                          <span>Upload</span>
                          <input
                            id="coverImage"
                            name="coverImage"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">an image file</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                {errors.coverImage && !coverImage && (
                  <p className="text-red-500 text-sm">{errors.coverImage}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none"
            >
              {loading}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
