import { useState, useEffect } from "react";
import axiosInstance from "../pages/auth/refreshAccessToken";
import CreatePlaylistModal from "./Playlist/CreatePlaylistModal";
import AddToPlaylistModal from "./Playlist/AddToPlaylistModal";
import PlaylistButton from "./Playlist/PlaylistButton";
import { toast, Toaster } from "react-hot-toast"; // Import toast

const VideoDropdownMenu = ({ videoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [currentPlaylists, setCurrentPlaylists] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openCreatePlaylistModal = () => {
    closeModal();
    setIsCreatePlaylistModalOpen(true);
  };
  const closeCreatePlaylistModal = () => setIsCreatePlaylistModalOpen(false);

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim() || !playlistDescription.trim()) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axiosInstance.post("/playlists", {
        name: playlistName,
        description: playlistDescription,
      });
      setPlaylistName("");
      setPlaylistDescription("");
      closeCreatePlaylistModal();
      openModal();
      setCurrentPlaylists((prevPlaylists) => [
        ...prevPlaylists,
        response.data.data,
      ]);
      toast.success("Playlist created successfully.");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Playlist may already exist. Please try with another name."
        );
      }
    }
  };

  const handleAddVideoToPlaylist = async () => {
    if (!selectedPlaylist) {
      toast.error("Please select a playlist first.");
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/playlists/add/${videoId}/${selectedPlaylist}`
      );
      toast.success("Video added to playlist successfully.");
      closeModal(); // Close modal after success
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Video may already exists in playlist. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axiosInstance.get(
          `/playlists/user/${currentUser._id}`
        );
        setCurrentPlaylists(response.data.data);
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };
    if (currentUser._id) fetchPlaylists();
  }, [currentUser]);

  return (
    <>
      <Toaster position="top-center" />
      <PlaylistButton openModal={openModal} />
      {isModalOpen && (
        <AddToPlaylistModal
          currentPlaylists={currentPlaylists}
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
          openCreatePlaylistModal={openCreatePlaylistModal}
          closeModal={closeModal}
          handleAddVideoToPlaylist={handleAddVideoToPlaylist}
        />
      )}
      {isCreatePlaylistModalOpen && (
        <CreatePlaylistModal
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          playlistDescription={playlistDescription}
          setPlaylistDescription={setPlaylistDescription}
          handleCreatePlaylist={handleCreatePlaylist}
          closeCreatePlaylistModal={closeCreatePlaylistModal}
        />
      )}
    </>
  );
};

export default VideoDropdownMenu;
