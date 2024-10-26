import React from "react";
import { formatDistanceToNow } from "date-fns"; // For relative time formatting

const VideoCard = ({ video }) => {
  return (
    <div key={video._id} className="flex flex-col">
      {/* Thumbnail with duration */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Duration overlay */}
        <span className="absolute bottom-1 right-2 px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-75 rounded">
          {video.duration}
        </span>
      </div>
      {/* Video details */}
      <div className="flex py-3 space-x-2">
        <img
          src={video.owner.avatar}
          alt="Owner Avatar"
          width={100}
          height={100}
          className="rounded-full w-10 h-9 object-cover"
        />
        <div className="w-full">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {video.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {video.owner.username}
          </p>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{video.views} views</span>
            <span>
              {formatDistanceToNow(new Date(video.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;