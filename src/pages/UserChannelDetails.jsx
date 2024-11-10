import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "./auth/refreshAccessToken";
import VideoCard from "../components/VideoComp/VideoCard";

const UserChannelDetails = () => {
  const { username } = useParams();
  const [channelUser, setChannelUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
  }, [channelUser]);

  const handleSubscription = async () => {
    try {
      const response = await axiosInstance.post(
        `/subscription/channel/${channelUser._id}`
      );
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error("Error toggling subscription", error);
    }
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axiosInstance.get(
          `/tweet/user/${channelUser._id}`
        );
        setMessages(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch user tweets:",
          error.response?.message || error.message
        );
      }
    };
    if (currentUser) {
      fetchTweets();
    }
  }, [currentUser]);
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
                <Link to={"/feed/subscribers"}>
                  <span className="text-sm light-text-secondary dark-text-secondary font-normal-bold">
                    • {channelUser.subscribersCount} subscribers
                  </span>
                </Link>
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

      <div>
        <div className="border-b light-border-primary dark-border-primary px-4">
          <ul
            className="flex space-x-4 text-sm font-medium light-text-secondary dark-text-secondary tracking-wide"
            role="tablist"
          >
            <li>
              <button
                onClick={() => handleTabChange("videos")}
                className={`py-2 px-4 rounded-t-lg ${
                  activeTab === "videos"
                    ? "text-red-600 border-b-2 border-red-600 dark:text-red-500"
                    : "hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                role="tab"
              >
                Videos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange("tweets")}
                className={`py-2 px-4 rounded-t-lg ${
                  activeTab === "tweets"
                    ? "text-red-600 border-b-2 border-red-600 dark:text-red-500"
                    : "hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                role="tab"
              >
                Tweets
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Content */}
        <div className="p-3 md:p-4 lg:p-6 light-bg-secondary dark-bg-secondary">
          {activeTab === "videos" && (
            <section className="font-normal-bold mt-4">
              <h4 className="text-2xl border-b light-border-primary dark-border-primary py-2">
                Videos
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                {channelVideos.map((video) => {
                  return <VideoCard video={video} key={video._id} />;
                })}
              </div>
            </section>
          )}
          {activeTab === "tweets" && (
            <section>
              {messages.map((message) => {
                return (
                  <div
                    key={message._id}
                    className="flex gap-x-3 p-1 font-normal-bold"
                  >
                    <img
                      src={message.tweetBy.avatar}
                      alt="user"
                      className="w-7 h-7 rounded-full"
                    />
                    <div className="dark:bg-[#292929] bg-white px-3 py-1 rounded-lg">
                      <p>{message.content}</p>
                      <span className="text-xs float-right font-normal light-text-secondary dark-text-secondary">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserChannelDetails;
