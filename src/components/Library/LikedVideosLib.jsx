import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import VideoCard from "../VideoComp/VideoCard";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function LikedVideosLib() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axiosInstance.get("/like/likedVideos");
        setVideos(response.data.data);
      } catch (error) {
        console.log("Error in fetching watch history", error);
      }
    };

    fetchLikedVideos();
  }, []);
  const filteredLikedVideos = videos.slice(0, 4);
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="font-normal-bold font-bold text-xl">Liked Videos</h2>
        <Link
          to={"/feed/likedVideos"}
          className="rounded-full px-3 py-1.5 text-sm font-normal-bold border light-border-primary dark-border-primary cursor-pointer bg-transparent flex items-center gap-x-1"
        >
          <span>View liked videos</span>
          <MdOutlineKeyboardDoubleArrowRight />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 my-4">
        {filteredLikedVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}

export default LikedVideosLib;
