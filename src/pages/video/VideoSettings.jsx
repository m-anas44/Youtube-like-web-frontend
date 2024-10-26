import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../auth/refreshAccessToken";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function VideoSettings() {
  const { videoID } = useParams();
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });
  const [errors, setErrors] = useState({});

  // Handle input change for title and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle file change for thumbnail
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoDetails((prevDetails) => ({
        ...prevDetails,
        thumbnail: file,
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (
      !videoDetails.title &&
      !videoDetails.description &&
      !videoDetails.thumbnail
    ) {
      newErrors.general =
        "At least one field is required (title, description, or thumbnail)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with toast notifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    if (videoDetails.thumbnail) {
      formData.append("thumbnail", videoDetails.thumbnail);
    }

    // Show loading toast
    const toastId = toast.loading("Updating video...");

    try {
      const response = await axiosInstance.patch(
        `/videos/updateVideoData/${videoID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Dismiss loading toast and show success
      toast.dismiss(toastId);
      toast.success("Video updated successfully!");
      console.log("Video updated successfully:", response.data);
    } catch (error) {
      // Dismiss loading toast and show error
      toast.dismiss(toastId);
      toast.error("Error updating video.");
      console.error("Error updating video:", error);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    const toastId = toast.loading("Updating video...");
    try {
      const response = await axiosInstance.delete(
        `/videos/deleteVideo/${videoID}`
      );
      toast.success("Video deleted successfully!", { id: toastId });
      console.log("Video deleted successfully:", response.data);
      navigate("/feed/library");
    } catch (error) {
      toast.error("Error deleting video.", { id: toastId });
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="p-5 mb-16 md:mb-0">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="border-b border-gray-300 dark:border-zinc-700 pb-3 text-xl tracking-wider font-bold">
        Settings
      </h2>
      <form
        className="mt-8 bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="font-semibold text-2xl mb-4">Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left section for form inputs */}
          <div className="col-span-2">
            <div className="mb-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm tracking-wide text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={videoDetails.title}
                onChange={handleInputChange}
                className={`block w-full p-4 text-gray-900 rounded-lg bg-gray-50 dark:bg-zinc-900 border ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300 dark:border-zinc-700"
                } text-base dark:placeholder-gray-400 dark:text-white`}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm tracking-wide text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={videoDetails.description}
                onChange={handleInputChange}
                className={`block p-2.5 w-full text-sm text-gray-900 rounded-lg bg-gray-50 dark:bg-zinc-900 border ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-300 dark:border-zinc-700"
                } dark:placeholder-gray-400 dark:text-white`}
                placeholder="Tell viewers about your video"
              />
            </div>
            {errors.general && (
              <p className="text-red-500 text-sm">{errors.general}</p>
            )}
          </div>

          {/* Right section for thumbnail preview */}
          <div className="col-span-2 flex flex-col">
            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm tracking-wide text-gray-900 dark:text-white"
            >
              Thumbnail
            </label>
            <div className="w-full h-0 pb-[56.25%] bg-gray-50 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden flex items-center justify-center relative">
              {videoDetails.thumbnail ? (
                <img
                  src={URL.createObjectURL(videoDetails.thumbnail)}
                  alt="Thumbnail Preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div
                  className="flex flex-col w-full items-center justify-center h-full border-dashed border-2 border-zinc-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-950 absolute inset-0"
                  onClick={() =>
                    document.getElementById("hiddenThumbnailInput").click()
                  }
                >
                  <input
                    type="file"
                    id="hiddenThumbnailInput"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <p className="text-gray-500 dark:text-gray-300">
                    Upload thumbnail
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white dark:text-black font-semibold bg-zinc-900 dark:bg-zinc-50 flex gap-x-3 w-full md:w-auto justify-center items-center rounded-lg"
          >
            <GrUpdate className="" />
            <span>Update</span>
          </button>
        </div>
      </form>
      <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg mt-4">
        <h2 className="border-b border-gray-300 dark:border-zinc-700 pb-3 text-xl tracking-wider font-bold mb-4">
          More Settings
        </h2>
        <div className="py-7 px-4 border border-red-500 bg-red-400 bg-opacity-50 rounded-lg flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center gap-y-3">
          <div className="text-black">
            <h4 className="font-bold tracking-wide text-lg">
              Delete Permanently
            </h4>
            <p className="text-[13px]">
              Warning! This process can't be undo. You will lost your data
              permanently after deletion.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDelete()}
            className="rounded-md bg-red-600 py-1 px-2 text-sm font-semibold text-zinc-100 tracking-wide flex gap-1 items-center justify-center"
          >
            <MdDelete className="text-base" />
            Delete this video
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoSettings;
