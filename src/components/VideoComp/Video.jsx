import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { useParams } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { MdContentCopy, MdClose } from "react-icons/md";
import VideoDescription from "./VideoDescription";
import VideoComments from "./VideoComments";
import VideoDropdownMenu from "../VideoDropdownMenu";
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
    } catch (error) {
      console.error("Error toggling subscription", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axiosInstance.post(`/like/toggle/v/${videoID}`);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setIsLiked(!isLiked);
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
      <section className="relative w-full pb-[56.25%] sm:rounded-lg overflow-hidden light-bg-secondary dark-bg-secondary">
        {video.videoFile ? (
          <video className="absolute top-0 left-0 w-full h-full" controls>
            <source src={video.videoFile} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full object-cover bg-[#c2c2c2]"></div>
        )}
      </section>

      <div className="px-2 pt-1 sm:p-1">
        <h2 className="text-xl font-normal-bold font-bold">{video.title}</h2>
        <div className="flex flex-wrap sm:items-center gap-3 justify-between mt-2">
          <div>
            <div className="flex items-center gap-x-3 font-normal-bold">
              <img
                src={video?.owner?.avatar}
                alt="Channel Avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-semibold uppercase text-sm text-nowrap overflow-hidden">
                  {video?.owner?.fullName}
                </span>
                <span className="text-sm light-text-secondary dark-text-secondary font-normal">
                  {video?.owner?.subscribersCount} subscribers
                </span>
              </div>
              <button
                onClick={handleSubscription}
                className={`${
                  isSubscribed ? "light-btn dark-btn" : "bg-[#f53f3f]"
                } ml-auto sm:ml-0 text-sm tracking-wide font-semibold px-4 py-1.5 rounded-full`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>
          <div className="flex gap-x-2">
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-normal-bold px-3 gap-x-1 rounded-full light-bg-secondary dark-bg-secondary"
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
              className="flex items-center justify-center py-1.5 font-normal-bold px-3 gap-x-1 rounded-full light-bg-secondary dark-bg-secondary"
              onClick={handleShareClick}
            >
              <PiShareFat className="text-xl" />
              <span>Share</span>
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center justify-center py-2 font-normal-bold px-3 gap-x-1 rounded-full light-bg-secondary dark-bg-secondary"
              >
                <BsThreeDots className="text-xl" />
              </button>
              {showDropdown && <VideoDropdownMenu videoId={videoID} />}
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
          <div className="light-bg-secondary dark-bg-secondary p-4 rounded-lg shadow-lg max-w-sm lg:max-w-lg w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg tracking-wide text-center">
                Share this video
              </h3>
              <button onClick={closeModal} className="text-sm hover:underline">
                <MdClose className="text-lg" />
              </button>
            </div>
            <div className="flex items-center justify-between bg-[#c3c3c3] p-2 rounded">
              <span className="text-sm overflow-hidden text-black font-normal-bold font-normal">
                {videoLink}
              </span>
              <button
                onClick={copyLink}
                className="font-normal-bold p-2 bg-[#0f0f0f] text-white rounded"
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
