import React from "react";
import { mockVideosData } from "../../mock/videosMockup";

const VideosSection = () => {
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent p-4">
      {mockVideosData.map((video) => (
        <div key={video.id}>
          <img src={video.thumbnail} alt={video.title} className="w-full min-h-[180px] max-h-[210px] rounded-lg" />
          <div className="p-2">
            <h3 className="text-md font-semibold">{video.title}</h3>
            <p className=" text-sm text-gray-600">{video.channel}</p>
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
