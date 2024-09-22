import React from "react";
import { mockVideosData } from "../../mock/videosMockup";

const VideosSection = () => {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-transparent">
      {mockVideosData.map((video) => (
        <div key={video.id}>
          <img src={video.thumbnail} alt={video.title} className="thumbnail w-full h-auto" />
          <div className="p-2">
            <h3 className="video-title text-md font-semibold">{video.title}</h3>
            <p className="channel-name text-sm text-gray-600">{video.channel}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{video.views}</span>
              <span>{video.timePosted}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosSection;
