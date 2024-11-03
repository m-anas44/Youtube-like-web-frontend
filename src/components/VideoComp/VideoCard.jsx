import React from "react";
import { formatDistanceToNow } from "date-fns"; // For relative time formatting
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video._id}`}>
      <div className="flex flex-col">
        {/* Thumbnail with duration */}
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover select-none"
          />
          {/* Duration overlay */}
          <span className="absolute select-none bottom-1 right-1 px-2 py-1 text-xs font-semibold text-white bg-black bg-opacity-75 rounded">
            {video.duration}
          </span>
        </div>
        {/* Video details */}
        <div className="flex py-3 space-x-2 font-normal-bold">
          <img
            src={video.owner.avatar}
            alt="Owner Avatar"
            width={100}
            height={100}
            className="rounded-full w-10 h-9 object-cover select-none"
          />
          <div className="w-full">
            <h3 className="text-sm font-bold tracking-wide light-text-primary dark-text-primary line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm light-text-secondary dark-text-secondary">
              {video.owner.username}
            </p>
            <div className="flex justify-between text-xs light-text-secondary dark-text-secondary select-none">
              <span>{video.views} views</span>
              <span>
                {formatDistanceToNow(new Date(video.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
