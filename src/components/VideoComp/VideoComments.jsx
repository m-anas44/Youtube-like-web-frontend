import React, { useState, useEffect } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { formatDistanceToNow } from "date-fns";
import { IoHeartOutline } from "react-icons/io5";
import { GrSend, GrUpdate } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

function VideoComments({ videoID }) {
  const [user, setUser] = useState({});
  const [videoComments, setVideoComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

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
      } catch (error) {
        console.log("Error in fetching comments", error);
      }
    };

    fetchComments();
  }, [videoID]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(`/comment/${videoID}`, {
        content: newComment,
      });
      const postedComment = response.data.data;
      setVideoComments((prevComments) => ({
        ...prevComments,
        comments: [postedComment, ...prevComments.comments],
        totalDocs: prevComments.totalDocs + 1,
      }));

      const reFetchComment = await axiosInstance.get(`/comment/${videoID}`);
      setVideoComments(reFetchComment.data.data);

      setNewComment("");
    } catch (error) {
      console.log("Error in posting comment", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axiosInstance.delete(`/comment/${commentId}`);
      setVideoComments((prevComments) => ({
        ...prevComments,
        comments: prevComments.comments.filter((c) => c._id !== commentId),
        totalDocs: prevComments.totalDocs - 1,
      }));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const toggleDropdown = (commentId) => {
    setShowDropdown((prev) => (prev === commentId ? null : commentId));
  };

  const handleUpdate = async (commentId) => {
    try {
      const response = await axiosInstance.patch(`/comment/${commentId}`, {
        content: updatedContent,
      });
      setVideoComments((prevComments) => ({
        ...prevComments,
        comments: prevComments.comments.map((comment) =>
          comment._id === commentId ? response.data.data : comment
        ),
      }));

      const reFetchComment = await axiosInstance.get(`/comment/${videoID}`);
      setVideoComments(reFetchComment.data.data);

      setEditingCommentId(null);
      setUpdatedContent("");
    } catch (error) {
      console.log("Error in updating comment", error);
    }
  };

  return (
    <section className="mx-auto bg-[#f2f2f2] dark:bg-zinc-900 p-4 rounded-lg">
      <div className="border-b border-gray-400 dark:border-zinc-700 pb-2 mb-4">
        <h2 className="text-lg font-semibold">
          {videoComments.totalDocs} Comments
        </h2>
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="mb-5 p-2 bg-white dark:bg-[#0f0f0f] rounded-lg"
      >
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-10 h-10 object-cover"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Post a comment"
            className="block w-full p-2 py-3 text-gray-900 bg-gray-100 text-xs outline-none dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="text-nowrap text-zinc-100 dark:text-zinc-900 py-2.5 px-3 font-semibold bg-zinc-900 dark:bg-zinc-100 text-sm"
          >
            <GrSend className="text-xl" />
          </button>
        </div>
      </form>

      {videoComments?.comments?.map((comment) => (
        <div key={comment._id} className="mb-6 relative">
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
              {editingCommentId === comment._id ? (
                <input
                  type="text"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                  className="block w-full p-2 text-sm dark:text-zinc-200 text-black mt-1 bg-gray-100 dark:bg-zinc-800"
                />
              ) : (
                <p className="text-sm">{comment.content}</p>
              )}
            </div>
            <div className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              <button className="flex items-center space-x-1">
                <IoHeartOutline className="text-xl" />
                <span>{comment.likes}</span>
              </button>
            </div>
            {comment.owner._id === user._id && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(comment._id)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800"
                >
                  <BsThreeDotsVertical className="text-xl" />
                </button>

                {showDropdown === comment._id && (
                  <div className="absolute mt-2 left-1/2 transform -translate-x-[85%] w-40 dark:bg-zinc-800 rounded-lg shadow-lg z-10 py-3 bg-gray-200">
                    {editingCommentId === comment._id ? (
                      <button
                        className="flex gap-x-2.5 items-center w-full text-left px-4 py-2 text-sm text-zinc-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                        onClick={() => handleUpdate(comment._id)}
                      >
                        <GrUpdate className="text-sm" />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        className="flex gap-x-2.5 items-center w-full text-left px-4 py-2 text-sm text-zinc-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setUpdatedContent(comment.content);
                        }}
                      >
                        <GrUpdate className="text-sm" />
                        <span>Edit</span>
                      </button>
                    )}
                    <button
                      className="flex gap-x-2 items-center w-full text-left px-4 py-2 text-sm text-zinc-800 dark:text-white hover:bg-gray-50 dark:hover:bg-zinc-700"
                      onClick={() => handleDelete(comment._id)}
                    >
                      <AiOutlineDelete className="text-base" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export default VideoComments;
