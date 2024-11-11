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
    const navigate = useNavigate();
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
        setVideoDetails({
          title: "",
          description: "",
          thumbnail: "",
        });
      } catch (error) {
        // Dismiss loading toast and show error
        toast.dismiss(toastId);
        toast.error("Error updating video.");
        console.error("Error updating video:", error);
      }
    };

    const handleDelete = async () => {
      const toastId = toast.loading("Updating video...");
      try {
        const response = await axiosInstance.delete(
          `/videos/deleteVideo/${videoID}`
        );
        toast.success("Video deleted successfully!", { id: toastId });
        console.log("Video deleted successfully:", response.data);
        navigate("/dashboard");
      } catch (error) {
        toast.error("Error deleting video.", { id: toastId });
        console.error("Error deleting video:", error);
      }
    };

    return (
      <div className="p-0 md:p-4 mb-16 md:mb-0 font-normal-bold">
        <Toaster position="top-center" reverseOrder={false} />
        <h2 className="border-b light-border-primary dark-border-primary pb-3 mx-3 mt-4 text-3xl font-bold">
          Settings
        </h2>
        <form className="mt-8 p-4 rounded-lg" onSubmit={handleSubmit}>
          <h3 className="font-semibold text-2xl mb-4">Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Left section for form inputs */}
            <div className="col-span-2">
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
                  className={`block w-full p-2 font-normal rounded-lg light-bg-secondary dark-bg-secondary border ${
                    errors.title
                      ? "border-red-500"
                      : "light-border-primary dark-border-primary"
                  } text-base dark:placeholder-gray-400 dark-text-primary`}
                />
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
                  rows={10}
                  value={videoDetails.description}
                  onChange={handleInputChange}
                  className={`block p-2.5 w-full text-sm font-normal rounded-lg light-bg-secondary dark-bg-secondary border ${
                    errors.description
                      ? "border-red-500"
                      : "light-border-primary dark-border-primary"
                  } dark:placeholder-gray-400 dark-text-primary`}
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
                className="block mb-2 text-sm tracking-wide light-text-primary dark-text-primary"
              >
                Thumbnail
              </label>
              <div className="w-full h-0 pb-[56.25%] light-bg-secondary dark-bg-secondary border light-border-primary dark-border-primary rounded-lg overflow-hidden flex items-center justify-center relative">
                {videoDetails.thumbnail ? (
                  <img
                    src={URL.createObjectURL(videoDetails.thumbnail)}
                    alt="Thumbnail Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div
                    className="flex flex-col w-full items-center justify-center h-full light-bg-secondary dark-bg-secondary rounded-lg cursor-pointer light-btn-hover dark-btn-hover absolute inset-0"
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 tracking-wide font-normal-bold light-btn dark-btn flex gap-x-3 w-full md:w-auto justify-center items-center rounded-lg"
            >
              <GrUpdate />
              <span>Update</span>
            </button>
          </div>
        </form>
        <div className="p-4 rounded-lg mt-4">
          <h2 className="border-b light-border-primary dark-border-primary pb-3 text-xl font-bold mb-4">
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
              className="rounded-md bg-red-600 py-1 px-2 text-sm font-normal-bold text-black tracking-wide flex gap-1 items-center justify-center"
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
