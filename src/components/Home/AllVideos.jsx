import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../VideoCard";

const VideosSection = () => {
  const [videosData, setVideosData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/v1/videos/getAllVideos", {
          withCredentials: true,
        });
        setVideosData(response.data.data.videos);
      } catch (error) {
        console.error("Error fetching videos", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-4">
      {videosData.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideosSection;
