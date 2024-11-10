import React, { useState, useRef, useEffect } from "react";
import { FiEdit2, FiTrash2, FiSend } from "react-icons/fi";
import axiosInstance from "../../pages/auth/refreshAccessToken";

const UploadTweet = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/currentUser");
        setCurrentUser(response.data.data);
      } catch (error) {
        console.log("Error in getting user", error);
      }
    };

    getCurrentUser();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch tweets by userId
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axiosInstance.get(
          `/tweet/user/${currentUser._id}`
        );
        const userTweets = response.data.data.map((tweet) => ({
          id: tweet._id,
          text: tweet.content,
          sender: "user",
          timestamp: tweet.createdAt,
          isEditing: false,
        }));
        setMessages(userTweets);
      } catch (error) {
        console.error(
          "Failed to fetch user tweets:",
          error.response?.message || error.message
        );
      }
    };
    if (currentUser) {
      fetchTweets();
    }
  }, [currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        const response = await axiosInstance.post("/tweet", {
          tweetText: newMessage,
        });
        const message = {
          id: response.data.data._id,
          text: response.data.data.content,
          sender: "user",
          timestamp: response.data.data.createdAt,
          isEditing: false,
        };
        setMessages([...messages, message]);
        setNewMessage("");
      } catch (error) {
        console.error(
          "Failed to create tweet:",
          error.response?.message || error.message
        );
      }
    }
  };

  const handleEdit = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, isEditing: !msg.isEditing } : msg
      )
    );
  };

  const handleUpdate = async (id, newText) => {
    try {
      const response = await axiosInstance.patch(`/tweet/${id}`, {
        tweetText: newText,
      });
      setMessages(
        messages.map((msg) =>
          msg.id === id
            ? { ...msg, text: response.data.data.content, isEditing: false }
            : msg
        )
      );
    } catch (error) {
      console.error(
        "Failed to update tweet:",
        error.response?.message || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tweet/${id}`);
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error(
        "Failed to delete tweet:",
        error.response?.message || error.message
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent mb-16 md:mb-0">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-4 font-normal-bold">
          {messages.map((message) => (
            <div key={message.id} className="flex justify-end">
              <div
                className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#1e88e5] text-white shadow"
                role="article"
                aria-label="User message"
              >
                {message.isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      defaultValue={message.text}
                      className="w-full p-1 text-gray-800 bg-white rounded focus:outline-none"
                      onBlur={(e) => handleUpdate(message.id, e.target.value)}
                      autoFocus
                    />
                  </div>
                ) : (
                  <>
                    <p className="break-words">{message.text}</p>
                    <div className="flex items-center justify-between gap-x-4 mt-1 text-xs opacity-75">
                      <span>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(message.id)}
                          className="hover:text-gray-200 transition-colors"
                          aria-label="Edit message"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="hover:text-gray-200 transition-colors"
                          aria-label="Delete message"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Reference this element to scroll */}
        </div>
      </div>

      <div className="border-t light-bg-secondary dark-bg-secondary light-border-secondary dark-border-secondary p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border light-border-primary dark-border-primary rounded-lg bg-white dark:bg-[#292929] focus:outline-none"
              maxLength={500}
              aria-label="Message input"
            />
            <button
              type="submit"
              className="px-6 py-2 text-white bg-[#1e88e5] hover:bg-[#3677b1] rounded-lg focus:outline-none"
              disabled={!newMessage.trim()}
              aria-label="Send message"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadTweet;
