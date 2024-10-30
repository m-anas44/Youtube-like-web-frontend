import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdContentCopy, MdClose } from "react-icons/md";
import VideoDescription from "./VideoDescription";
import VideoComments from "./VideoComments";
import { toast, Toaster } from "react-hot-toast";
function Video() {
  const [video, setVideo] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { videoID } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(`/videos/watch/${videoID}`);
        setVideo(response.data.data);
        setIsSubscribed(response.data.data.isSubscribed);
        setIsLiked(response.data.data.isLiked);
        setLikesCount(response.data.data.likesCount);
        console.log("Fetched video successfully", response.data.data);
      } catch (error) {
        console.log("Error in fetching the video", error);
      }
    };

    fetchVideo();
  }, [videoID]);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post(
        `/subscription/channel/${video.owner._id}`
      );
      setIsSubscribed(!isSubscribed);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error toggling subscription", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(`/like/toggle/v/${videoID}`);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  // Get current video link
  const videoLink = `${window.location.origin}/videos/watch/${videoID}`;

  // Share button click handler
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowShareModal(false);
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(videoLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <section className="flex-grow lg:w-[70%]">
      <Toaster position="top-center" />
      {/* Video Player */}
      {video?.videoFile && (
        <section className="relative w-full pb-[56.25%] sm:rounded-lg overflow-hidden">
          <video className="absolute top-0 left-0 w-full h-full" controls>
            <source src={video.videoFile} type="video/mp4" />
          </video>
        </section>
      )}

      <div className="px-2 pt-1 sm:p-1">
        <h2 className="text-xl font-bold">{video.title}</h2>
        <div className="flex flex-wrap sm:items-center gap-3 justify-between mt-2">
          <div>
            <div className="flex items-center gap-x-3">
              <img
                src={video?.owner?.avatar}
                alt="Channel Avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-semibold uppercase text-sm text-nowrap overflow-hidden">
                  {video?.owner?.fullName}
                </span>
                <span className="text-sm text-zinc-700 dark:text-gray-400">
                  {video?.owner?.subscribersCount} subscribers
                </span>
              </div>
              <button
                onClick={handleSubscription}
                className={`${
                  isSubscribed ? "bg-red-600 dark:text-white" : "bg-zinc-900"
                } ml-auto sm:ml-0 text-zinc-100 dark:text-black text-sm tracking-wide font-semibold px-4 py-1.5 rounded-full`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
          <div className="flex gap-x-2">
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
              onClick={handleLike}
            >
              {isLiked ? (
                <AiFillLike className="text-xl" />
              ) : (
                <AiOutlineLike className="text-xl" />
              )}
              <span>{likesCount}</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
              onClick={handleShareClick}
            >
              <PiShareFat className="text-xl" />
              <span>Share</span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-center py-2 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
              >
                <BsThreeDots className="text-xl" />
              </button>

              {showDropdown && (
                <div className="absolute mt-2 left-1/2 transform -translate-x-[85%] w-40 dark:bg-zinc-800 rounded-lg shadow-lg z-10 py-3 bg-gray-200">
                  <button className="flex gap-x-2 items-center w-full text-left px-4 py-2 text-sm text-zinc-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700 ">
                    <RiPlayListAddFill className="text-base" />
                    <span>Add to Playlist</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 sm:p-1">
        <VideoDescription
          description={video.description}
          views={video.views}
          createdAt={video.createdAt}
        />
      </div>
      <div className="px-2 sm:p-1">
        <VideoComments videoID={videoID} />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-2">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg max-w-sm lg:max-w-lg w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-center">
                Share this video
              </h3>
              <button
                onClick={closeModal}
                className="text-sm text-black dark:text-white hover:underline"
              >
                <MdClose className="text-lg" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-zinc-700 p-2 rounded">
              <span className="text-sm overflow-hidden">{videoLink}</span>
              <button
                onClick={copyLink}
                className="text-zinc-100 font-medium p-2 bg-zinc-900 rounded"
              >
                <MdContentCopy className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Video;
