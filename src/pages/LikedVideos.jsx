import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoComp/VideoCard";
import axiosInstance from "./auth/refreshAccessToken";
import VideoListCard from "../components/VideoComp/VideoListCard";

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="w-full h-32 bg-gray-300 rounded-lg mb-2"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </div>
);

function LikedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axiosInstance.get("/like/likedVideos");
        setVideos(response.data.data);
      } catch (error) {
        console.log("Error in fetching watch history", error);
      } finally {
        setLoading(false); // Update loading state
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <section className="p-2 sm:p-4 md:p-8 md:mb-0 mb-16">
      <h2 className="font-normal-bold font-bold text-lg md:text-xl mb-4">
        Liked Videos
      </h2>

      {loading ? (
        // Skeleton for Grid Layout
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}

      {loading ? (
        // Skeleton for List Layout
        <div className="flex flex-col gap-y-2 sm:hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 sm:hidden">
          {videos.map((video) => (
            <VideoListCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LikedVideos;
