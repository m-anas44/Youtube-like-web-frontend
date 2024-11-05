import React, { useEffect, useState } from "react";
import VideoCard from "../VideoComp/VideoCard";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function History() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axiosInstance.get("/users/history");
        setVideos(response.data.data);
      } catch (error) {
        console.log("Error in fetching watch history", error);
      }
    };

    fetchWatchHistory();
  }, []);

  const filteredHistory = videos.slice(0, 4);
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="font-normal-bold font-bold text-xl">History</h2>
        <Link
          to={"/feed/history"}
          className="rounded-full px-3 py-1.5 text-sm font-normal-bold border light-border-primary dark-border-primary cursor-pointer bg-transparent flex items-center gap-x-1"
        >
          <span>Full History</span>
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 my-4">
        {filteredHistory.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default History;
