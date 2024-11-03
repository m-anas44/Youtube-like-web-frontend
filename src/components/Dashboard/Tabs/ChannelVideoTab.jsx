import React, { useEffect, useState } from "react";
import axiosInstance from "../../../pages/auth/refreshAccessToken";
import VideoCard from "../../VideoComp/VideoCard"
function ChannelVideoTab({ channelId }) {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get(
          `/dashboard/videos/${channelId}`
        );
        setVideos(response.data.data);
        console.log("Channel videos fetched successfully", response.data.data);
      } catch (error) {
        console.log("Error in fetching channel videos", error);
      }
    };
    fetchVideos()
  }, [channelId]);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 dark-bg-secondary light-bg-secondary">
      {videos.map((video) => {
        return (
            <VideoCard video={video} key={video._id}/>
        );
      })}
    </section>
  );
}

export default ChannelVideoTab;
