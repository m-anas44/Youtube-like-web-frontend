import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import ChannelTabs from "./ChannelTabs";

function ChannelInfo() {
  const [currentChannel, setCurrentChannel] = useState({});
  const [channelStats, setChannelStats] = useState({});

  useEffect(() => {
    const getCurrentChannel = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentChannel(response.data.data);
      } catch (error) {
        console.log("Error in getting user", error);
      }
    };
    getCurrentChannel();
  }, []);

  useEffect(() => {
    const fetchChannelStats = async () => {
      try {
        const response = await axiosInstance.get(
          `/dashboard/stats/${currentChannel._id}`
        );
        setChannelStats(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log("Error in fetching channel stats", error);
      }
    };
    fetchChannelStats();
  }, [currentChannel]);
  return (
    <div className="w-full px-2 mx-auto my-6 rounded-lg overflow-hidden bg-transparent">
      {/* Cover Image */}
      <div>
        <img
          src={currentChannel.coverImage}
          alt="Cover"
          className="w-full h-full"
        />
      </div>
      <div className="p-3 py-4 md:py-3 md:p-4 flex flex-col md:flex-row items-center gap-x-3 -mt-12 md:-mt-0 border-b light-border-primary dark-border-primary mb-1">
        <img
          src={currentChannel.avatar} // Replace with your avatar image URL
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-4 shadow-md md:shadow-none dark-border-secondary light-border-primary"
        />
        <div className="text-center md:text-left mt-2 md:mt-0">
          <h3 className="text-lg md:text-xl font-bold light-text-primary dark-text-primary uppercase tracking-wider">
            {currentChannel.fullName}
          </h3>
          <p className="light-text-secondary dark-text-secondary ">
            {currentChannel.email}
          </p>
        </div>
      </div>
      <ChannelTabs channelId={currentChannel._id}/>
    </div>
  );
}

export default ChannelInfo;
