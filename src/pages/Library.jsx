import React, { useEffect, useState } from "react";
import axiosInstance from "./auth/refreshAccessToken";
import DesktopLibrary from "../components/Library/DesktopLibrary";
import MobileLibrary from "../components/Library/MobileLibrary";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import "../App.css";

function Library() {
  const [currentUserData, setCurrentUserData] = useState({});
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUserData(response.data.data);
      } catch (error) {
        console.error("Error in fetching current user data", error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <section className="p-2 sm:p-4 md:p-8">
      <div className="flex md:flex-row flex-col gap-x-3 items-center font-normal-bold text-center md:text-left mb-4">
        <img
          src={currentUserData.avatar}
          alt="user avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="light-text-secondary dark-text-secondary">
            @{currentUserData.username}
          </p>
          <h2 className="text-xl md:text-2xl uppercase tracking-tight">
            {currentUserData.fullName}
          </h2>
          <Link to={`/channel/${currentUserData.username}`} className="rounded-full mt-1 px-2 py-1 text-xs border light-border-primary dark-border-primary cursor-pointer bg-transparent inline-flex items-center gap-x-1">
            <span>View Channel</span>
            <MdOutlineKeyboardDoubleArrowRight />
          </Link>
        </div>
      </div>
      <div>
        <div className="hidden md:block">
          <DesktopLibrary />
        </div>
        <div className="block md:hidden">
          <MobileLibrary />
        </div>
      </div>
    </section>
  );
}

export default Library;
