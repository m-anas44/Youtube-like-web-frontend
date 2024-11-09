import React, { useEffect, useState } from "react";
import axiosInstance from "../../../pages/auth/refreshAccessToken";
import ChannelViewsStats from "../ChannelViewsStats";
import { BiSolidVideos, BiSolidLike } from "react-icons/bi";
import { RiUserFollowLine } from "react-icons/ri";
import { FaComments } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import ChannelLikeStats from "../ChannelLikeStats";
import ChannelCommentStats from "../ChannelCommentStats";
import { Link } from "react-router-dom";
import ChannelSubscriberStats from "../ChannelSubscriberStats";

function ChannelProStats() {
  const [channelStats, setChannelStats] = useState({});
  const [currentChannel, setCurrentChannel] = useState(null);
  const [activeTab, setActiveTab] = useState("views");

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
      if (!currentChannel) return;
      try {
        const response = await axiosInstance.get(
          `/dashboard/stats/${currentChannel._id}`
        );
        setChannelStats(response.data.data);
      } catch (error) {
        console.log("Error in fetching channel stats", error);
      }
    };
    fetchChannelStats();
  }, [currentChannel]);

  const stats = [
    {
      icon: <BiSolidVideos className="text-white text-4xl" />,
      title: "Videos",
      value: `${channelStats?.channelTotalVideosViews?.totalVideos || 0}`,
    },
    {
      icon: <RiUserFollowLine className="text-white text-4xl" />,
      title: "Subscribers",
      value: `${channelStats.channelSubscribers || 0}`,
    },
    {
      icon: <MdRemoveRedEye className="text-white text-4xl" />,
      title: "Views",
      value: `${channelStats.channelTotalVideosViews?.totalViews || 0}`,
    },
    {
      icon: <BiSolidLike className="text-white text-4xl" />,
      title: "Likes",
      value: `${channelStats.videosLike || 0}`,
    },
    {
      icon: <FaComments className="text-white text-4xl" />,
      title: "Comments",
      value: `${channelStats.videosComments || 0}`,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="mb-16 md:mb-0">
      <section className="md:flex gap-3 mb-3">
        <ul className="space-y space-y-2 text-sm font-normal-bold mb-4 md:mb-0 md:me-2 flex-grow md:max-w-xs">
          <li>
            <div className="bg-[#1e88e5] text-white p-3 py-7 text-center rounded-lg">
              <img
                src={currentChannel?.avatar}
                alt="channel user"
                className="rounded-full w-32 h-32 mx-auto"
              />
              <h4 className="capitalize text-xl mt-1">
                {currentChannel?.fullName}
              </h4>
              <p className="text-[#0d1d3b]">{currentChannel?.email}</p>
            </div>
          </li>
          <li>
            <Link
              to="#"
              className={`inline-flex items-center gap-2 w-full px-4 py-3 rounded-lg ${
                activeTab === "views"
                  ? "bg-[#1e88e5] text-white"
                  : "light-bg-secondary dark-bg-secondary light-btn-hover dark-btn-hover"
              }`}
              onClick={() => handleTabClick("views")}
              aria-current={activeTab === "views" ? "page" : undefined}
            >
              <MdRemoveRedEye className="text-xl" />
              Views
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`inline-flex items-center gap-2 px-4 py-3 w-full rounded-lg ${
                activeTab === "likes"
                  ? "bg-[#1e88e5] text-white"
                  : "light-bg-secondary dark-bg-secondary light-btn-hover dark-btn-hover"
              }`}
              onClick={() => handleTabClick("likes")}
            >
              <BiSolidLike className="text-xl" />
              Likes
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`inline-flex items-center gap-2 px-4 py-3 w-full rounded-lg ${
                activeTab === "comments"
                  ? "bg-[#1e88e5] text-white"
                  : "light-bg-secondary dark-bg-secondary light-btn-hover dark-btn-hover"
              }`}
              onClick={() => handleTabClick("comments")}
            >
              <FaComments className="text-xl" />
              Comments
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`inline-flex items-center gap-2 px-4 py-3 w-full rounded-lg ${
                activeTab === "subscribers"
                  ? "bg-[#1e88e5] text-white"
                  : "light-bg-secondary dark-bg-secondary light-btn-hover dark-btn-hover"
              }`}
              onClick={() => handleTabClick("subscribers")}
            >
              <RiUserFollowLine className="text-xl" />
              Subscribers
            </Link>
          </li>
        </ul>
        {activeTab === "views" && (
          <ChannelViewsStats dailyViewsData={channelStats.channelDailyViews} />
        )}
        {activeTab === "likes" && (
          <ChannelLikeStats dailyLikesData={channelStats.channelDailyLikes} />
        )}
        {activeTab === "comments" && (
          <ChannelCommentStats
            dailyCommentsData={channelStats.channelDailyComments}
          />
        )}
        {activeTab === "subscribers" && (
          <ChannelSubscriberStats
            dailySubscribersData={channelStats.channelDailySubscribers}
          />
        )}
      </section>

      <section className="flex flex-wrap gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="light-bg-secondary dark-bg-secondary font-normal-bold p-4 rounded-lg shadow-md w-[20rem] flex-grow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[#1e88e5] p-3 rounded-full">{stat.icon}</div>
              <div>
                <h4 className="light-text-secondary dark-text-secondary font-semibold">
                  {stat.title}
                </h4>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ChannelProStats;
