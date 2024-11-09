import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./auth/refreshAccessToken";
import VideoCard from "../components/VideoComp/VideoCard";

const UserChannelDetails = () => {
  const { username } = useParams();
  const [channelUser, setChannelUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/currentUser`);
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error("Error in fetching user", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axiosInstance.get(`/users/channel/${username}`);
        setChannelUser(response.data.data);
        console.log(response.data.data);
        setIsSubscribed(response.data.data.isSubscribed);
      } catch (error) {
        console.error("Error in fetching channel", error);
      }
    };
    fetchChannel();
  }, [username]);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      try {
        const response = await axiosInstance.get(
          `/dashboard/videos/${channelUser._id}`
        );
        setChannelVideos(response.data.data);
      } catch (error) {
        console.error("Error in fetching channel videos", error);
      }
    };
    fetchChannelVideos();
  }, []);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post(
        `/subscription/channel/${channelUser._id}`
      );
      setIsSubscribed(!isSubscribed);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error toggling subscription", error);
    }
  };
  return (
    <div className="bg-transparent light-text-primary dark-text-primary px-2 md:mx-10 my-6 mb-16 md:mb-0">
      <div>
        <img
          className="h-auto max-h-[17rem] w-full object-cover rounded-lg shadow-md"
          src={channelUser.coverImage || "https://via.placeholder.com/800x200"}
          alt="Channel Cover"
        />

        <div className="flex items-center py-4">
          <img
            className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover"
            src={channelUser.avatar || "https://via.placeholder.com/150"}
            alt={channelUser.fullName || "Channel User"}
          />
          <div className="ml-4 flex-grow flex items-center justify-between flex-wrap gap-1">
            <div>
              <h2 className="text-lg sm:text-2xl font-normal-bold font-bold uppercase">
                {channelUser.fullName}
              </h2>
              <div className="space-x-2">
                <span className="text-sm light-text-secondary dark-text-secondary font-normal-bold">
                  @{channelUser.username}
                </span>
                <span className="text-sm light-text-secondary dark-text-secondary font-normal-bold">
                  • {channelUser.subscribersCount} subscribers
                </span>
              </div>
            </div>
            {channelUser.username !== currentUser.username && (
              <button
                onClick={handleSubscription}
                className={`${
                  isSubscribed ? "light-btn dark-btn" : "bg-[#f53f3f]"
                } text-sm tracking-wide font-normal-bold px-4 py-1.5 rounded-full`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>
      <section className="font-normal-bold mt-4">
        <h4 className="text-2xl border-b light-border-primary dark-border-primary py-2">
          Videos
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
          {channelVideos.map((video) => {
            return <VideoCard video={video} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default UserChannelDetails;
