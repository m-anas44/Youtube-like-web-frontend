import React, { useState, useEffect } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { formatDistanceToNow } from "date-fns";
import { IoHeartOutline } from "react-icons/io5";

function VideoComments({ videoID }) {
  const [user, setUser] = useState({});
  const [videoComments, setVideoComments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setUser(response.data.data);
      } catch (error) {
        console.log("Error in fetching user", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comment/${videoID}`);
        setVideoComments(response.data.data);
        console.log("Comments fetched successfully", response.data.data);
      } catch (error) {
        console.log("Error in fetching comments", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <section className="mx-auto bg-[#f2f2f2] dark:bg-zinc-900 p-4 rounded-lg">
      {/* Comments header */}
      <div className="border-b border-gray-400 dark:border-zinc-700 pb-2 mb-4">
        <h2 className="text-lg font-semibold">{videoComments.totalDocs} Comments</h2>
      </div>

      {/* Add a comment */}
      <form className="mb-5">
        <div className="flex space-x-3 items-center">
          <img
            src={user.avatar}
            alt="User avatar"
            className="rounded-full w-10 h-10 object-cover"
          />
          <div class="relative z-0 w-full">
            <input
              type="text"
              name="comment"
              className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b border-gray-400 dark:border-zinc-700 appearance-none dark:text-white focus:outline-none peer"
              placeholder=" "
              required
            />
            <label
              for="comment"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Post a comment
            </label>
          </div>
        </div>
        <div className="text-right mt-2">
            <button type="submit" className="text-nowrap dark:text-blue-400 text-blue-900 hover:bg-gray-200 dark:hover:bg-zinc-800 py-1.5 px-3 font-semibold rounded-full text-sm">
              comment
            </button>
        </div>
      </form>

      {/* Comment list */}
      {videoComments?.comments?.map((comment) => (
        <div key={comment._id} className="mb-6">
          <div className="flex gap-x-2 items-start">
            <img
              src={comment.owner.avatar}
              alt="User avatar"
              className="rounded-full w-9 h-9"
            />
            <div className="flex-1">
              <div className="flex items-center gap-x-4 text-sm">
                <span className="font-semibold">@{comment.owner.username}</span>
                <span className="text-gray-600 dark:text-gray-400">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>

              {/* Like and Reply buttons */}
              <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400 text-sm">
                <button className="flex items-center space-x-1">
                  <IoHeartOutline className="text-lg"/>
                  <span>{comment.likes}</span>
                </button>
                <button>Reply</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default VideoComments;
