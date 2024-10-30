import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import VideoListCard from "./VideoListCard";

function VideoList() {
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get("/videos/getAllVideos");
        setVideosData(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="flex-grow lg:w-[30%] flex flex-col gap-y-2 lg:px-0 sm:px-1 px-2 pt-4 lg:pt-0">
      {videosData.map((video) => (
        <VideoListCard key={video._id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
