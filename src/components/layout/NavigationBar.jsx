import React, { useState, useEffect } from "react";
import useSidebarToggle from "../../context/sideBarToggle";
import { Link } from "react-router-dom";
import { IoHomeOutline, IoSettingsOutline, IoAdd } from "react-icons/io5";
import { MdOutlinePlaylistPlay, MdOutlineHistory } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { LiaRetweetSolid } from "react-icons/lia";
import { RiUserFollowLine } from "react-icons/ri";
import axiosInstance from "../../pages/auth/refreshAccessToken";

export const NavigationBar = () => {
  const { isOpen } = useSidebarToggle();
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log("Error in getting user", error);
      }
    };
    getCurrentUser();
  }, [setCurrentUser]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axiosInstance.get(
          `/subscription/channel/${currentUser._id}`
        );
        setSubscriptions(response.data.data);
      } catch (error) {
        console.log("Failed to fetch subscriptions", error);
      }
    };
    fetchSubscriptions();
  }, [currentUser]);

  const subscribedChannels = subscriptions.slice(0, 7);
  return (
    <>
      {/* Sidebar for screens md and larger */}
      <aside
        className={`${
          isOpen ? "w-48" : "w-16"
        } fixed left-0 top-0 h-full bg-transparent hidden md:block custom-scrollbar`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full py-4 overflow-y-auto flex flex-col ${
            isOpen ? "space-y-1" : "space-x-0"
          }`}
        >
          <ul className="space-y-1 tracking-wide mt-14">
            <li>
              <Link
                to="/"
                className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal"
              >
                <span className="text-xl flex-shrink-0">
                  <IoHomeOutline />
                </span>
                <span
                  className={`ms-3 text-sm transition-opacity duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Home
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center light-btn-hover dark-btn-hover py-2 px-6 font-normal-bold font-normal"
              >
                <span className="text-xl flex-shrink-0">
                  <LiaRetweetSolid />
                </span>
                <span
                  className={`ms-3 text-sm transition-opacity duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Tweet
                </span>
              </Link>
            </li>
            <hr
              className={`light-border-primary dark-border-primary ${
                isOpen ? "block" : "hidden"
              }`}
            />
            <li>
              <Link
                to="/feed/history"
                className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal"
              >
                <span className="text-xl flex-shrink-0">
                  <MdOutlineHistory />
                </span>
                <span
                  className={`ms-3 text-sm transition-opacity duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  History
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/feed/playlists"
                className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal"
              >
                <span className="text-xl flex-shrink-0">
                  <MdOutlinePlaylistPlay />
                </span>
                <span
                  className={`ms-3 text-sm transition-opacity duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Playlists
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/feed/likedVideos"
                className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal"
              >
                <span className="text-xl flex-shrink-0">
                  <BiLike />
                </span>
                <span
                  className={`ms-3 text-sm transition-opacity duration-200 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  Liked Videos
                </span>
              </Link>
            </li>
          </ul>
          <hr
            className={`light-border-primary dark-border-primary ${
              isOpen ? "block" : "hidden"
            }`}
          />
          <section className={`flex-grow ${isOpen ? "block" : "hidden"}`}>
            <p className="px-6 font-normal-bold mt-3 text-sm">Subscriptions</p>
            {subscribedChannels.map((channel) => {
              return (
                <Link
                  key={channel.channel._id}
                  to={`/channel/${channel.channel.username}`}
                  className="flex items-center gap-x-3 py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal mt-1"
                >
                  <img
                    src={channel.channel.avatar}
                    alt={channel.channel.username}
                    className="w-6 h-6 object-cover rounded-full"
                  />
                  <span className="font-normal capitalize text-xs">
                    {channel.channel.fullName}
                  </span>
                </Link>
              );
            })}
            <Link
              to="/feed/channels"
              className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold"
            >
              <span className="text-xl flex-shrink-0">
                <RiUserFollowLine />
              </span>
              <span className={`ms-3 text-sm transition-opacity duration-200`}>
                All Subscriptions
              </span>
            </Link>
          </section>
          <hr
            className={`light-border-primary dark-border-primary ${
              isOpen ? "block" : "hidden"
            }`}
          />
          <div className="mt-auto">
            <Link
              to="/settings/user"
              className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal"
            >
              <span className="text-xl flex-shrink-0">
                <IoSettingsOutline />
              </span>
              <span
                className={`ms-3 text-sm transition-opacity duration-200 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                Settings
              </span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Bottom navigation bar for screens smaller than md */}
      <div className="fixed z-50 h-16 w-full px-0.5 sm:px-4 bg-white border-t light-border-primary dark-border-primary bottom-0 left-1/2 transform -translate-x-1/2 dark:bg-[#0f0f0f] md:hidden mx-auto">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button type="button" className="bottom-nav-items font-normal-bold">
            <span className="text-xl sm:text-2xl">
              <IoHomeOutline />
            </span>
            <span className="text-[10px] sm:text-sm">Home</span>
          </button>
          <button type="button" className="bottom-nav-items font-normal-bold">
            <span className="text-xl sm:text-2xl">
              <LiaRetweetSolid />
            </span>
            <span className="text-[10px] sm:text-sm">Tweet</span>
          </button>

          {/* Centered Create Button */}
          <div className="flex items-center justify-center">
            <button
              data-tooltip-target="tooltip-new"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10  bg-[#1e88e5] rounded-full hover:bg-[#1976d2] group focus:ring-4 focus:ring-[#64b5f6] focus:outline-none dark:focus:ring-[#1565c0]"
            >
              <IoAdd className="text-2xl text-white" />
            </button>
          </div>

          <button type="button" className="bottom-nav-items font-normal-bold">
            <span className="text-xl sm:text-2xl">
              <RiUserFollowLine />
            </span>
            <span className="text-[10px] sm:text-sm">Subscriptions</span>
          </button>
          <Link
            to={"/feed/library"}
            className="bottom-nav-items font-normal-bold"
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.username}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-fill border border-black dark:border-white p-[1px]"
            />
            <span className="text-[10px] sm:text-sm">Me</span>
          </Link>
        </div>
      </div>
    </>
  );
};
