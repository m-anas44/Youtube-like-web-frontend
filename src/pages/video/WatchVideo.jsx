import React from "react";
import Video from "../../components/VideoComp/Video";
import VideoList from "../../components/VideoComp/VideoList";
function WatchVideo() {
  return (
    <div className="flex flex-col lg:flex-row sm:px-5 lg:px-10 gap-x-4 pt-1">
      <Video />
      <VideoList />
    </div>
  );
}

export default WatchVideo;
