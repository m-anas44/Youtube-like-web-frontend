import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./auth/refreshAccessToken";

const UserChannelDetails = () => {
  const { username } = useParams();
  const [channelUser, setChannelUser] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axiosInstance.get(`/users/channel/${username}`);
        setChannelUser(response.data.data);
      } catch (error) {
        console.error("Error in fetching channel", error);
      }
    };
    fetchChannel();
  }, [username]);

  return (
    <div className="bg-transparent text-white px-2 md:mx-10 my-6">
      <img
        className="h-auto max-h-[17rem] w-full object-cover rounded-2xl shadow-md"
        src={channelUser.coverImage || "https://via.placeholder.com/800x200"}
        alt="Channel Cover"
      />

      <div className="flex py-4">
        <img
          className="rounded-full w-20 h-20 sm:w-24 sm:h-24 object-cover"
          src={channelUser.avatar || "https://via.placeholder.com/150"}
          alt={channelUser.fullName || "Channel User"}
        />
        <div className="ml-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase text-zinc-900 dark:text-gray-100">
            {channelUser.fullName}
          </h2>
          <div className="flex gap-x-2">
            <p className="text-sm text-gray-700 dark:text-zinc-400">
              @{channelUser.username}
            </p>
            <p className="text-sm text-gray-700 dark:text-zinc-400">
              • {channelUser.subscribersCount} subscribers
            </p>
          </div>
          <button
            className={`${
              channelUser.isSubscribed
                ? "dark:bg-gray-100 bg-zinc-900"
                : "bg-red-500"
            } dark:text-black text-gray-100 font-semibold text-sm sm:text-base px-3 py-1 mt-2 rounded-full`}
          >
            {channelUser.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChannelDetails;
