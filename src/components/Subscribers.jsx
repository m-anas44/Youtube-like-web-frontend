import React, { useState, useEffect } from "react";
import axiosInstance from "../pages/auth/refreshAccessToken";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

function Subscribers({ channelId }) {
  const [subscribers, setSubscribers] = useState([]);
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axiosInstance.get(
          `/subscription/user/${channelId}`
        );
        setSubscribers(response.data.data);
      } catch (error) {
        console.log("Error getting subscribers", error);
      }
    };
    fetchSubscribers();
  }, [channelId]);

  const filteredSubscribers = subscribers.slice(0, 2);
  return (
    <section>
      <div>
        {filteredSubscribers.map((subscriber) => {
          return (
            <Link
              key={subscriber.subscriber._id}
              to={`/channel/${subscriber.subscriber.username}`}
              className="flex items-center gap-x-3 py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold font-normal mt-1"
            >
              <img
                src={subscriber.subscriber.avatar}
                alt={subscriber.subscriber.username}
                className="w-6 h-6 object-cover rounded-full"
              />
              <span className="font-normal capitalize text-xs">
                {subscriber.subscriber.fullName}
              </span>
            </Link>
          );
        })}
      </div>
      <Link
        to="/feed/subscribers"
        className="flex items-center py-2 px-6 light-btn-hover dark-btn-hover font-normal-bold"
      >
        <span className="text-xl flex-shrink-0">
          <FaUsers />
        </span>
        <span className={`ms-3 text-sm transition-opacity duration-200`}>
          All Subscribers
        </span>
      </Link>
    </section>
  );
}

export default Subscribers;
