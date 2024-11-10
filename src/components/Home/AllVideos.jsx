import React, { useEffect, useState } from "react";
import VideoCard from "../VideoComp/VideoCard";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import VideoCardSkeleton from "../MainPageSkeleton"; // Assuming you have your skeleton component

const VideosSection = () => {
  const [videosData, setVideosData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true); // Track if there are more pages to load
  const [loading, setLoading] = useState(true); // Track loading state
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Separate loading state for more data

  useEffect(() => {
    fetchVideos(); // Fetch initial videos when the component mounts
  }, []);

  useEffect(() => {
    // Add scroll event listener for infinite scrolling
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasNextPage &&
        !isLoadingMore
      ) {
        // Check if we are near the bottom of the page and if there are more videos to load
        setPage((prevPage) => prevPage + 1); // Increment page to load more videos
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isLoadingMore]);

  useEffect(() => {
    if (page > 1) {
      fetchVideos(page); // Fetch videos for the new page
    }
  }, [page]);

  const fetchVideos = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) {
        setLoading(true); // Start loading for the first page
      } else {
        setIsLoadingMore(true); // Start loading for additional pages
      }

      const response = await axiosInstance.get("/videos/getAllVideos", {
        params: { page: pageNumber, limit: 12 }, // Load 10 videos per request
      });

      // Concatenate new videos with existing ones if not the first fetch
      if (pageNumber === 1) {
        setVideosData(response.data.data.videos); // Set videos for the first page
      } else {
        setVideosData((prevVideos) => [
          ...prevVideos,
          ...response.data.data.videos,
        ]);
      }

      // Check if there are more videos to load
      setHasNextPage(response.data.data.hasNextPage);
    } catch (error) {
    } finally {
      if (pageNumber === 1) {
        setLoading(false); // End loading for the first page
      } else {
        setIsLoadingMore(false); // End loading for additional pages
      }
    }
  };

  return (
    <div className="p-4 font-normal-bold mb-14 md:mb-0 min-h-screen flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <VideoCardSkeleton key={index} /> // Show skeletons while loading
            ))
          : videosData.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
      </div>
      {isLoadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <VideoCardSkeleton key={`more-${index}`} /> // Show skeletons for loading more data
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosSection;
