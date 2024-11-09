import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineHistory,
  MdOutlinePlaylistPlay,
  MdOutlinePowerSettingsNew,
} from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FiSun, FiMoon } from "react-icons/fi";
import useTheme from "../../context/switcher";
import axiosInstance from "../../pages/auth/refreshAccessToken";

function MobileLibrary() {
  const [isChecked, setIsChecked] = useState(false);
  const { lightMode, darkMode } = useTheme(); // Get the lightMode and darkMode functions
  const navigate = useNavigate();
  
  const handleCheckboxChange = () => {
    setIsChecked((prevState) => {
      const newState = !prevState;
      newState ? darkMode() : lightMode(); // Toggle the theme when checkbox changes
      return newState;
    });
  };

  const logoutUser = async () => {
    try {
      await axiosInstance.post("/users/logout");
      navigate("/login");
    } catch (error) {
      console.log("Error in logging out user", error);
    }
  };

  return (
    <section>
      <ul className="space-y-1 font-normal-bold">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
          >
            <span className="text-xl flex-shrink-0">
              <LuLayoutDashboard />
            </span>
            <span className="ms-2 text-base">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/feed/history"
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
          >
            <span className="text-xl flex-shrink-0">
              <MdOutlineHistory />
            </span>
            <span className="ms-2 text-base">History</span>
          </Link>
        </li>
        <li>
          <Link
            to="/feed/playlists"
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
          >
            <span className="text-xl flex-shrink-0">
              <MdOutlinePlaylistPlay />
            </span>
            <span className="ms-2 text-base">Playlists</span>
          </Link>
        </li>
        <li>
          <Link
            to="/feed/likedVideos"
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
          >
            <span className="text-xl flex-shrink-0">
              <BiLike />
            </span>
            <span className="ms-2 text-base">Liked Videos</span>
          </Link>
        </li>

        <hr className="light-border-primary dark-border-primary" />
        <li>
          <div to="/" className="flex items-center justify-between py-2 px-3">
            <span className="ms-2 text-base">Appearance</span>
            <label className="relative inline-flex cursor-pointer select-none items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange} // Toggling theme on change
                className="sr-only"
              />
              <div className="shadow-md flex h-[46px] w-[82px] items-center justify-center rounded-md bg-white dark-bg-secondary">
                {/* Sun Icon */}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded ${
                    !isChecked
                      ? "light-btn dark-btn"
                      : "bg-white dark-bg-secondary"
                  }`}
                >
                  <FiSun />
                </span>

                {/* Moon Icon */}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded ${
                    isChecked
                      ? "light-btn dark-btn"
                      : "bg-white dark-bg-secondary"
                  }`}
                >
                  <FiMoon />
                </span>
              </div>
            </label>
          </div>
        </li>
        <hr className="light-border-primary dark-border-primary" />

        <li>
          <Link
            to="/settings/user"
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover"
          >
            <span className="text-xl flex-shrink-0">
              <IoSettingsOutline />
            </span>
            <span className="ms-2 text-base">Settings</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => logoutUser()}
            className="flex items-center py-2 px-3 light-btn-hover dark-btn-hover w-full"
          >
            <span className="text-xl flex-shrink-0">
              <MdOutlinePowerSettingsNew />
            </span>
            <span className="ms-2 text-base">Logout</span>
          </button>
        </li>
      </ul>
    </section>
  );
}

export default MobileLibrary;
