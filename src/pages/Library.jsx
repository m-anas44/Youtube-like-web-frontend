import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import History from "../components/Library/History";
function Library() {
  const [currentUserData, setCurrentUserData] = useState({});
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser", {
          withCredentials: true,
        });
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
          <h2 className="text-2xl uppercase tracking-tight font-semibold">
            {currentUserData.fullName}
          </h2>
          <p className="light-theme-text dark:text-gray-400">
            @{currentUserData.username}
          </p>
          <span className="px-1 bg-red-500 text-black rounded text-sm font-semibold">
            Created at: &nbsp;{" "}
            {new Date(currentUserData.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div>
        <History/>
      </div>
    </section>
  );
}

export default Library;
