import React, { useEffect, useState } from "react";
import "../App.css";
import History from "../components/Library/History";
import axiosInstance from "./auth/refreshAccessToken";
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
    <section className="p-8">
      <div className="flex gap-x-3 items-start">
        <img
          src={currentUserData.avatar}
          alt="user avatar"
          className="w-20 h-20 rounded object-cover"
        />
        <div>
          <p className="light-text-secondary dark-text-secondary">
            @{currentUserData.username}
          </p>
          <h2 className="text-2xl uppercase tracking-tight font-normal-bold">
            {currentUserData.fullName}
          </h2>
          <span className="px-1 bg-red-400 text-black rounded text-sm font-normal-bold">
            Created at: &nbsp;{" "}
            {new Date(currentUserData.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>
        <History />
      </div>
    </section>
  );
}

export default Library;
