import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import ChannelTabs from "./ChannelTabs";
import { Link } from "react-router-dom";
import { ImStatsBars } from "react-icons/im";


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
      <div className="p-3 py-4 md:py-3 md:p-4 flex flex-col md:flex-row items-center gap-3 -mt-12 md:-mt-0 border-b light-border-primary dark-border-primary mb-1">
        <img
          src={currentChannel.avatar} // Replace with your avatar image URL
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-4 shadow-md md:shadow-none dark-border-secondary light-border-primary"
        />
        <div className="text-center md:text-left mt-2 md:mt-0 font-normal-bold">
          <h3 className="text-lg md:text-xl light-text-primary dark-text-primary uppercase font-bold">
            {currentChannel.fullName}
          </h3>
          <p className="light-text-secondary dark-text-secondary">
            {currentChannel.email}
          </p>
          <Link to={"/feed/subscribers"}>
          <span className="light-text-secondary dark-text-secondary mr-3 font-normal text-sm">{channelStats.channelSubscribers} subscribers</span>
          </Link>
          <Link to={"/feed/channels"}>
          <span className="light-text-secondary dark-text-secondary font-normal text-sm">{channelStats.channelSubscribing} subscribing</span>
          </Link>
        </div>
        <Link
          to={"/dashboard/stats"}
          className="py-2 px-4 text-sm flex items-center gap-x-2 bg-[#1e88e5] hover:bg-[#3aa0ff] font-normal-bold text-nowrap text-white rounded-lg md:ml-auto"
        >
          <ImStatsBars className="text-xl"/>
          <span>View Professional Stats</span>
        </Link>
      </div>
      <ChannelTabs channelId={currentChannel._id} />
    </div>
  );
}

export default ChannelInfo;
