import React, { useEffect, useState } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import VideoDescription from "./VideoDescription";
import VideoComments from "./VideoComments";

function Video() {
  const [video, setVideo] = useState({});
  const { videoID } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axiosInstance.get(`/videos/watch/${videoID}`);
        setVideo(response.data.data);
        console.log("Fetched video successfully", response.data.data);
      } catch (error) {
        console.log("Error in fetching the video", error);
      }
    };

    fetchVideo();
  }, [videoID]);

  return (
    <section className="flex-grow lg:w-[70%]">
      {/* Video Player */}
      {video?.videoFile && (
        <section className="relative w-full pb-[56.25%] sm:rounded-lg overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
          >
            <source src={video.videoFile} type="video/mp4" />
          </video>
        </section>
      )}

      <div className="px-2 pt-1 sm:p-1">
        {/* Video Title and Channel Information */}
        <h2 className="text-xl font-bold">{video.title}</h2>
        <div className="flex flex-wrap sm:items-center gap-3 justify-between mt-2">
          <div>
            <div className="flex items-center gap-x-3">
              {/* Channel Avatar */}
              <img
                src={video?.owner?.avatar}
                alt="Channel Avatar"
                className="rounded-full w-10 h-10"
              />
              <div className="flex flex-col">
                {/* Channel Name and Subscribers */}
                <span className="font-semibold uppercase text-sm text-nowrap overflow-hidden">
                  {video?.owner?.fullName}
                </span>
                <span className="text-sm text-zinc-700 dark:text-gray-400">
                  {video?.owner?.subscribersCount} subscribers
                </span>
              </div>
              {/* Subscribe Button */}
              <button className="bg-zinc-900 ml-auto sm:ml-0 dark:bg-white text-zinc-100 dark:text-black text-sm tracking-wide font-semibold px-4 py-1.5 rounded-full">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex gap-x-2">
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
            >
              <AiOutlineLike className="text-xl" />
              <span>{video.likesCount}</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
            >
              <PiShareFat className="text-xl" />
              <span>Share</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center py-1.5 font-medium px-3 gap-x-1 rounded-full bg-[#f2f2f2] dark:bg-zinc-800"
            >
              <BsThreeDots className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      <div className="px-2 sm:p-1">
        <VideoDescription
          description={video.description}
          views={video.views}
          createdAt={video.createdAt}
        />
      </div>
      <div className="px-2 sm:p-1">
        <VideoComments videoID={videoID} />
      </div>
    </section>
  );
}

export default Video;
