import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function VideoListCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`}>
      <section className="flex gap-x-3 bg-transparent rounded-lg font-normal-bold">
        {/* Thumbnail with Duration Overlay */}
        <div className="relative w-32 h-20">
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>

        {/* Video Details */}
        <div className="flex flex-col justify-between light-text-primary dark-text-primary flex-1">
          <h3 className="text-base line-clamp-2">{video.title}</h3>
          <p className="text-xs light-text-secondary dark-text-secondary">
            {video.owner.fullName}
          </p>
          <div className="flex text-xs light-text-secondary dark-text-secondary space-x-1">
            <span>{video.views} views</span>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default VideoListCard;
