import React, { useState, useMemo } from "react";
import { FiUpload } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";
import axiosInstance from "../auth/refreshAccessToken";

function PublishVideo() {
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    thumbnail: null,
    videoFile: null,
  });
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoDetails((prev) => ({
        ...prev,
        [e.target.name]: file, // Dynamically update videoFile or thumbnail
      }));
    }
  };

  const videoURL = useMemo(
    () => videoDetails.videoFile && URL.createObjectURL(videoDetails.videoFile),
    [videoDetails.videoFile]
  );

  // Validate the form
  const validateForm = () => {
    const validationErrors = {};
    if (!videoDetails.title) validationErrors.title = "Title is required";
    if (!videoDetails.thumbnail)
      validationErrors.thumbnail = "Thumbnail is required";
    if (!videoDetails.videoFile)
      validationErrors.videoFile = "Video file is required";
    if (!videoDetails.description)
      validationErrors.description = "Description is required"; // Check if description is provided

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields."); // Toast for form validation error
      return;
    }

    const formData = new FormData();
    formData.append("title", videoDetails.title);
    formData.append("description", videoDetails.description);
    formData.append("videoFile", videoDetails.videoFile);
    formData.append("thumbnail", videoDetails.thumbnail);

    // Show loading toast
    const loadingToast = toast.loading("Uploading your video...");

    try {
      const response = await axiosInstance.post(
        "/videos/publishVideo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Video uploaded successfully!", { id: loadingToast }); // Dismiss loading and show success
      setVideoDetails({
        title: "",
        description: "",
        thumbnail: null,
        videoFile: null,
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.", { id: loadingToast }); // Dismiss loading and show error
    }
  };

  return (
    <div className="my-5 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="border-b light-border-primary dark-border-primary pb-3 text-2xl font-bold">
        Upload
      </h2>
      <form className="mt-8 mb-20 md:mb-0" onSubmit={handleSubmit}>
        <h3 className="font-semibold text-2xl mb-4">Details</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 rounded-lg">
          <div className="flex-1">
            <div className="mb-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm tracking-wide light-text-primary dark-text-primary"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={videoDetails.title}
                onChange={handleInputChange}
                className={`block w-full p-2 text-gray-900 rounded-lg light-bg-secondary dark-bg-secondary border ${
                  errors.title && !videoDetails.title
                    ? "border-red-500"
                    : "light-border-primary dark-border-primary"
                } text-base dark:placeholder-gray-400 dark-text-primary`}
              />
              {errors.title && !videoDetails.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm tracking-wide light-text-primary dark-text-primary"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={videoDetails.description}
                onChange={handleInputChange}
                className={`block p-2.5 w-full text-sm rounded-lg light-bg-secondary dark-bg-secondary border ${
                  errors.description && !videoDetails.description
                    ? "border-red-500"
                    : "light-border-primary dark-border-primary"
                } dark:placeholder-gray-600 dark-text-primary light-textprimary`}
                placeholder="Tell viewers about your video"
              />
              {errors.description && !videoDetails.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Thumbnail Upload Section */}
            <div className="mt-4">
              <label
                htmlFor="thumbnail"
                className="block mb-2 text-sm tracking-wide light-text-primary dark-text-primary"
              >
                Thumbnail
              </label>
              <div
                className="h-28 light-bg-secondary dark-bg-secondary border light-border-primary dark-border-primary rounded-lg flex items-center justify-center"
                style={{ aspectRatio: "16 / 9" }}
              >
                {videoDetails.thumbnail ? (
                  <div className="w-full h-full">
                    <img
                      src={URL.createObjectURL(videoDetails.thumbnail)}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col w-full items-center justify-center h-full border-dashed border-2 light-border-primary dark-border-primary rounded-lg cursor-pointer light-btn-hover dark-btn-hover"
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
                    <p className="light-text-secondary dark-text-secondary">
                      Upload thumbnail
                    </p>
                  </div>
                )}
              </div>
              {errors.thumbnail && !videoDetails.thumbnail && (
                <p className="text-red-500 text-sm">{errors.thumbnail}</p>
              )}
            </div>
          </div>

          {/* Right section for video preview */}
          <div className="flex-1 h-72 sm:h-80 md:h-96 border light-border-primary dark-border-primary rounded-lg light-bg-secondary dark-bg-secondary">
            {videoDetails.videoFile ? (
              <div className="h-full bg-gray-100">
                <video
                  src={videoURL}
                  controls
                  className="w-full h-full max-h-56 md:max-h-80 sm:max-h-64 rounded-t-lg"
                />
                <div className="text-sm flex text-black dark-text-secondary m-3 rounded border light-border-primary dark-border-primary overflow-hidden">
                  <div className="light-bg-dark dark-bg-secondary text-white p-2 rounded-l font-semibold tracking-wide">
                    Filename
                  </div>
                  <div className="p-2 overflow-hidden light-bg-secondary dark-bg-primary dark-text-primary flex-grow rounded-r text-ellipsis whitespace-nowrap">
                    {videoDetails.videoFile.name}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center h-full border-dashed border-2 light-border-primary dark-border-primary rounded-lg cursor-pointer light-btn-hover dark-btn-hover"
                onClick={() =>
                  document.getElementById("hiddenVideoInput").click()
                }
              >
                <input
                  type="file"
                  id="hiddenVideoInput"
                  name="videoFile"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <p className="light-text-secondary dark-text-secondary">
                  Upload video
                </p>
              </div>
            )}
            {errors.videoFile && !videoDetails.videoFile && (
              <p className="text-red-500 text-sm">{errors.videoFile}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 light-btn dark-btn font-normal-bold flex gap-x-2 w-full md:w-auto justify-center items-center rounded-lg"
          >
            <FiUpload className="text-xl" />
            <span>Upload</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default PublishVideo;
