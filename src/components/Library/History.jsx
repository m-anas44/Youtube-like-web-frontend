import React, { useEffect, useState } from "react";
import VideoCard from "../VideoComp/VideoCard";
import axiosInstance from "../../pages/auth/refreshAccessToken";
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
  return (
    <div className="mt-10">
      <h2 className="font-semibold text-xl tracking-tight">History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 my-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default History;
