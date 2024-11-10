import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosInstance from "./auth/refreshAccessToken";
import { formatDistanceToNow } from "date-fns";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

function GetPlaylist() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [currentPlaylists, setCurrentPlaylists] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (videoId) => {
    setActiveDropdown((prev) => (prev === videoId ? null : videoId));
  };

  // Fetch Playlist function
  const fetchPlaylists = async () => {
    try {
      const response = await axiosInstance.get(`/playlists/${playlistId}`);
      setCurrentPlaylists(response.data.data);
      setName(response.data.data.name);
      setDescription(response.data.data.description);
    } catch (error) {
      toast.error("Failed to fetch playlist");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [playlistId]);

  // Validate form fields
  const validateForm = () => {
    if (!name.trim() || !description.trim()) {
      toast.error("Name and description cannot be empty");
      return false;
    }
    return true;
  };

  // Update Playlist function
  const updatePlaylist = async () => {
    if (!validateForm()) return;

    try {
      await axiosInstance.patch(`/playlists/${playlistId}`, {
        name,
        description,
      });
      toast.success("Playlist updated successfully");
      setShowUpdateModal(false);
      fetchPlaylists(); // Refresh data after update
    } catch (error) {
      toast.error("Failed to update playlist");
    }
  };

  // Delete playlist function
  const deletePlaylist = async () => {
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/playlists/${playlistId}`);
      toast.success("Playlist deleted successfully");
      navigate("/feed/playlists");
    } catch (error) {
      toast.error("Failed to delete playlist");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const removeVideo = async (videoId) => {
    try {
      await axiosInstance.patch(`/playlists/remove/${videoId}/${playlistId}`);
      toast.success("Video removed from playlist");
      fetchPlaylists(); // Refresh the playlist data after removing the video
    } catch (error) {
      toast.error("Failed to remove video from playlist");
    }
  };

  const thumbnail = currentPlaylists?.videos?.[0]?.thumbnail ?? "";

  return (
    <div className="flex flex-col lg:flex-row my-4 mx-2 md:mx-6 mb-20 md:mb-0 gap-4">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Playlist Info */}
      <div className="bg-gradient-to-b from-[#dbdbdb] to-white dark:from-[#2b2b2b] dark:to-[#0f0f0f] p-4 rounded-lg font-normal-bold md:h-[85vh] md:sticky md:top-16 md:left-0 w-full lg:max-w-xl flex-grow">
        <div className="flex flex-col">
          <img
            src={thumbnail}
            alt="Playlist Thumbnail"
            className="w-full rounded-md mb-4 object-cover"
            style={{ aspectRatio: "16 / 9" }}
          />
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {currentPlaylists?.name || "Playlist Name"} 
            </h2>
            <div className="text-xs font-normal light-text-secondary dark-text-secondary mt-4">
              <p className="text-base capitalize">
                {currentPlaylists?.owner?.fullName || "Owner Name"}
              </p>
              <span>{currentPlaylists?.videosCount || 0} videos</span>
              <span className="ml-2">
                Created{" "}
                {currentPlaylists?.createdAt
                  ? formatDistanceToNow(new Date(currentPlaylists.createdAt), {
                      addSuffix: true,
                    })
                  : "Date not available"}
              </span>
              <pre className="mt-4 font-normal-bold font-normal text-base text-wrap line-clamp-6">
                {currentPlaylists?.description}
              </pre>
            </div>
          </div>
          <div className="flex gap-x-1">
            <button
              onClick={() => setShowUpdateModal(true)}
              className="mt-4 p-1.5 rounded-full light-btn dark-btn text-xl"
            >
              <MdOutlineEdit />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-4 p-1.5 rounded-full text-white bg-red-600 dark:bg-red-500 text-xl"
              disabled={isDeleting}
            >
              <MdOutlineDelete />
            </button>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-2 md:gap-3 flex-grow">
        {currentPlaylists?.videos?.length > 0 ? (
          currentPlaylists.videos.map((video) => (
            <section
              className="flex gap-x-3 bg-transparent rounded-lg font-normal-bold"
              key={video._id}
            >
              <div
                className="relative w-[40%] overflow-hidden rounded-lg flex-grow"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Link to={`/watch/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt="Video Thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover select-none"
                  />
                </Link>
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col light-text-primary dark-text-primary w-[60%] flex-grow">
                <h3 className="text-base line-clamp-2">{video.title}</h3>
                <div className="text-xs light-text-secondary dark-text-secondary space-y-1">
                  <p className="line-clamp-2 text-sm italic font-normal">
                    {video.description}
                  </p>
                  <span>{video.views} views</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(video._id)}
                  className="p-2 rounded-full light-btn-hover dark-btn-hover"
                >
                  <BsThreeDotsVertical className="text-lg light-text-secondary dark-text-secondary" />
                </button>
                {activeDropdown === video._id && (
                  <div className="absolute mt-2 left-1/2 transform -translate-x-[85%] w-40 rounded-lg shadow-lg border light-border-secondary dark-border-secondary z-10 py-3 light-bg-secondary dark-bg-secondary font-normal-bold font-normal">
                    <button
                      onClick={() => removeVideo(video._id)}
                      className="flex gap-x-1 items-center w-full text-left px-4 py-2 text-sm dark-btn-hover light-btn-hover"
                    >
                      <MdOutlineDelete className="text-base" />
                      <span>Remove Video</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          ))
        ) : (
          <p>No videos in this playlist.</p>
        )}
      </section>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark-bg-secondary rounded-lg shadow-lg p-6 font-normal-bold text-center max-w-sm">
            <h2 className="text-xl mb-4">Update Playlist</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md light-bg-secondary dark:bg-[#222222] light-border-primary dark-border-primary border px-2 py-1.5 sm:text-sm sm:leading-6 focus:outline-none font-normal"
              placeholder="Playlist Name"
            />
            <textarea
              value={description}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-4 w-full rounded-md light-bg-secondary dark:bg-[#222222] light-border-primary dark-border-primary border px-2 py-1.5 sm:text-sm sm:leading-6 focus:outline-none font-normal resize-none"
              placeholder="Playlist Description"
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={updatePlaylist}
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded-md light-btn dark-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark-bg-secondary rounded-lg shadow-lg p-6 font-normal-bold text-center max-w-sm">
            <h2 className="text-xl mb-4">Delete Playlist</h2>
            <p className="text-sm">
              Are you sure you want to delete this playlist?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={deletePlaylist}
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-md light-btn dark-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetPlaylist;
