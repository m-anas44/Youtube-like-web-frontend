import React, { useState, useEffect } from "react";
import axiosInstance from "../../pages/auth/refreshAccessToken";
import { formatDistanceToNow } from "date-fns";
import { IoHeartOutline } from "react-icons/io5";
import { GrSend, GrUpdate } from "react-icons/gr";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination";

function VideoComments({ videoID }) {
  const [user, setUser] = useState({});
  const [videoComments, setVideoComments] = useState({
    comments: [],
    totalDocs: 0,
    limit: 12,
  });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [page, setPage] = useState(1);

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
    fetchComments(page);
  }, [videoID, page]);

  const fetchComments = async (pageNumber) => {
    try {
      const response = await axiosInstance.get(
        `/comment/${videoID}?page=${pageNumber}`
      );
      setVideoComments(response.data.data);
    } catch (error) {
      console.log("Error in fetching comments", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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

      setNewComment("");
      fetchComments(page); // Re-fetch comments to reflect the new comment
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
      setEditingCommentId(null);
      setUpdatedContent("");
    } catch (error) {
      console.log("Error in updating comment", error);
    }
  };

  return (
    <section className="mx-auto light-bg-secondary dark-bg-secondary font-normal-bold p-4 rounded-lg">
      <div className="border-b light-border-primary dark-border-primary pb-2 mb-4">
        <h2 className="text-lg font-semibold">
          {videoComments.totalDocs} Comments
        </h2>
      </div>

      <form
        onSubmit={handleCommentSubmit}
        className="flex flex-col p-2 md:p-3 mb-5 items-end rounded-lg"
      >
        <div className="flex items-start w-full">
          <img
            src={user.avatar}
            alt="User avatar"
            className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full mr-2 md:mr-3"
          />
          <textarea
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="flex-1 text-sm p-2 font-normal border rounded-lg resize-none focus:outline-none focus:ring-1 light-border-primary dark-border-primary bg-white dark:bg-[#222222] light-text-primary dark-text-primary placeholder-gray-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex gap-x-2 items-center mt-2 py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
        >
          <GrSend/>
          <span>Post</span>
        </button>
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
                <span className="tracking-wide">@{comment.owner.username}</span>
                <span className="light-text-secondary dark-text-secondary">
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
                  className="block w-full p-2 text-sm mt-1 font-normal light-bg-primary dark-bg-primary"
                />
              ) : (
                <p className="text-sm font-normal">{comment.content}</p>
              )}
            </div>
            {comment.owner._id === user._id && (
              <div className="relative">
                <button
                  onClick={() => toggleDropdown(comment._id)}
                  className="p-2 rounded-full light-btn-hover dark-btn-hover"
                >
                  <BsThreeDotsVertical className="text-lg light-text-secondary dark-text-secondary" />
                </button>

                {showDropdown === comment._id && (
                  <div className="absolute mt-2 left-1/2 transform -translate-x-[85%] w-40 light-bg-secondary dark-bg-secondary rounded-lg shadow-lg z-10 py-3 border light-border-secondary dark-border-secondary font-normal">
                    {editingCommentId === comment._id ? (
                      <button
                        className="flex gap-x-2.5 items-center w-full text-left px-4 py-2 text-sm light-btn-hover dark-btn-hover"
                        onClick={() => handleUpdate(comment._id)}
                      >
                        <GrUpdate className="text-sm" />
                        <span>Save</span>
                      </button>
                    ) : (
                      <button
                        className="flex gap-x-2.5 items-center w-full text-left px-4 py-2 text-sm light-btn-hover dark-btn-hover"
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
                      className="flex gap-x-2 items-center w-full text-left px-4 py-2 text-sm light-btn-hover dark-btn-hover"
                      onClick={() => handleDelete(comment._id)}
                    >
                      <AiOutlineDelete className="text-base" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="mt-2 light-text-secondary dark-text-secondary text-sm">
              <button className="flex items-center space-x-1">
                <IoHeartOutline className="text-xl" />
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      <Pagination
        page={page}
        totalDocs={videoComments.totalDocs}
        limit={videoComments.limit}
        hasPrevPage={videoComments.hasPrevPage}
        hasNextPage={videoComments.hasNextPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default VideoComments;
