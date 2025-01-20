import React, { useState, useEffect } from "react";
import useSidebarToggle from "../../context/sideBarToggle";
import { Link, NavLink } from "react-router-dom";
import { IoHomeOutline, IoSettingsOutline, IoAdd } from "react-icons/io5";
import {
  MdOutlinePlaylistPlay,
  MdOutlineHistory,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { LiaRetweetSolid } from "react-icons/lia";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import Subscribers from "../Subscribers";

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

  const subscribedChannels = subscriptions.slice(0, 3);
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center py-2 px-6 font-normal-bold font-normal ${
                    isActive
                      ? "bg-[#1e88e5] text-white"
                      : "light-btn-hover dark-btn-hover"
                  }`
                }
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
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/feed/tweets"
                className={({ isActive }) =>
                  `flex items-center py-2 px-6 font-normal-bold font-normal ${
                    isActive
                      ? "bg-[#1e88e5] text-white"
                      : "light-btn-hover dark-btn-hover"
                  }`
                }
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
              </NavLink>
            </li>

            <hr
              className={`light-border-primary dark-border-primary ${
                isOpen ? "block" : "hidden"
              }`}
            />

            <li>
              <NavLink
                to="/feed/history"
                className={({ isActive }) =>
                  `flex items-center py-2 px-6 font-normal-bold font-normal ${
                    isActive
                      ? "bg-[#1e88e5] text-white"
                      : "light-btn-hover dark-btn-hover"
                  }`
                }
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
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/feed/playlists"
                className={({ isActive }) =>
                  `flex items-center py-2 px-6 font-normal-bold font-normal ${
                    isActive
                      ? "bg-[#1e88e5] text-white"
                      : "light-btn-hover dark-btn-hover"
                  }`
                }
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
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/feed/likedVideos"
                className={({ isActive }) =>
                  `flex items-center py-2 px-6 font-normal-bold font-normal ${
                    isActive
                      ? "bg-[#1e88e5] text-white"
                      : "light-btn-hover dark-btn-hover"
                  }`
                }
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
              </NavLink>
            </li>
          </ul>

          <hr
            className={`light-border-primary dark-border-primary ${
              isOpen ? "block" : "hidden"
            }`}
          />

          <section className={`flex-grow ${isOpen ? "block" : "hidden"}`}>
            <p className="px-6 font-normal-bold mt-3 text-sm">Subscriptions</p>
            {subscribedChannels.map((channel) => (
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
            ))}
            <Link
              to="/feed/channels"
              className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold"
            >
              <span className="text-xl flex-shrink-0">
                <MdOutlineSubscriptions />
              </span>
              <span className="ms-3 text-sm transition-opacity duration-200">
                All Channels
              </span>
            </Link>
            <Subscribers channelId={currentUser?._id} />
          </section>

          <hr
            className={`light-border-primary dark-border-primary ${
              isOpen ? "block" : "hidden"
            }`}
          />

          <div className="mt-auto">
            <NavLink
              to="/settings/user"
              className={({ isActive }) =>
                `flex items-center py-2 px-6 font-normal-bold font-normal ${
                  isActive
                    ? "bg-[#1e88e5] text-white"
                    : "light-btn-hover dark-btn-hover"
                }`
              }
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
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Bottom navigation bar for screens smaller than md */}
      <div className="fixed z-50 h-16 w-full px-0.5 sm:px-4 bg-white border-t light-border-primary dark-border-primary bottom-0 left-1/2 transform -translate-x-1/2 dark:bg-[#0f0f0f] md:hidden mx-auto">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `bottom-nav-items font-normal-bold ${
                isActive ? "text-[#1e88e5]" : ""
              }`
            }
          >
            <span className="text-xl sm:text-2xl">
              <IoHomeOutline />
            </span>
            <span className="text-[10px] sm:text-sm">Home</span>
          </NavLink>

          <NavLink
            to="/feed/tweets"
            className={({ isActive }) =>
              `bottom-nav-items font-normal-bold ${
                isActive ? "text-[#1e88e5]" : ""
              }`
            }
          >
            <span className="text-xl sm:text-2xl">
              <LiaRetweetSolid />
            </span>
            <span className="text-[10px] sm:text-sm">Tweet</span>
          </NavLink>

          {/* Centered Create Button */}
          <div className="flex items-center justify-center">
            <Link
              data-tooltip-target="tooltip-new"
              to="/video/publishVideo"
              className="inline-flex items-center justify-center w-10 h-10 bg-[#1e88e5] rounded-full hover:bg-[#1976d2] group focus:ring-4 focus:ring-[#64b5f6] focus:outline-none dark:focus:ring-[#1565c0]"
            >
              <IoAdd className="text-2xl text-white" />
            </Link>
          </div>

          <NavLink
            to="/feed/channels"
            className={({ isActive }) =>
              `bottom-nav-items font-normal-bold ${
                isActive ? "text-[#1e88e5]" : ""
              }`
            }
          >
            <span className="text-xl sm:text-2xl">
              <MdOutlineSubscriptions />
            </span>
            <span className="text-[10px] sm:text-sm">Channels</span>
          </NavLink>

          <NavLink
            to="/feed/library"
            className={({ isActive }) =>
              `bottom-nav-items font-normal-bold ${
                isActive ? "text-[#1e88e5]" : ""
              }`
            }
          >
            <img
              src={currentUser?.avatar}
              alt={currentUser?.username}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-fill border border-black dark:border-white p-[1px]"
            />
            <span className="text-[10px] sm:text-sm">Me</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
