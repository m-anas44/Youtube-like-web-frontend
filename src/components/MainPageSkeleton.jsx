// VideoCardSkeleton.js
import React from "react";

const VideoCardSkeleton = () => {
  return (
    <div
      className="animate-pulse flex flex-col gap-2 rounded-lg"
      style={{ aspectRatio: "16/9" }}
    >
      <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
      <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
      <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
    </div>
  );
};

export default VideoCardSkeleton;
