import React, { useEffect, useState } from "react";
import axiosInstance from "./auth/refreshAccessToken";
import { Link } from "react-router-dom";

function AllSubscriptions() {
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscribedChannels, setSubscribedChannels] = useState({});

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

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!currentUser) return;
      try {
        const response = await axiosInstance.get(
          `/subscription/channel/${currentUser._id}`
        );
        setSubscriptions(response.data.data);

        // Initialize subscribedChannels with the channels the user is already subscribed to
        const initialSubscribedState = response.data.data.reduce((acc, subscription) => {
          acc[subscription.channel._id] = true;
          return acc;
        }, {});
        setSubscribedChannels(initialSubscribedState);
      } catch (error) {
        console.log("Failed to fetch subscriptions", error);
      }
    };
    fetchSubscriptions();
  }, [currentUser]);

  const handleSubscription = async (channelId) => {
    try {
      const response = await axiosInstance.post(`/subscription/channel/${channelId}`);
      setSubscribedChannels((prev) => ({
        ...prev,
        [channelId]: !prev[channelId], // Toggle the subscription status for this channel
      }));
      console.log(response.data.message);
    } catch (error) {
      console.error("Error toggling subscription", error);
    }
  };

  return (
    <section className="max-w-xl md:max-w-5xl mx-auto p-4">
      <h2 className="text-xl md:text-3xl font-normal-bold font-bold capitalize">
        all subscriptions
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-2 flex-wrap">
        {subscriptions.map((subscription) => {
          const channelId = subscription.channel._id;
          const isSubscribed = subscribedChannels[channelId];
          
          return (
            <div
              key={channelId}
              className="rounded-lg flex items-center gap-x-4 light-btn-hover dark-btn-hover p-2 font-normal-bold max-w-lg"
            >
              <Link to={`/channel/${subscription.channel.username}`}>
                <img
                  src={subscription.channel.avatar}
                  alt="Channel Avatar"
                  className="avatar rounded-full w-14 h-14 md:w-20 md:h-20 object-cover"
                />
              </Link>

              <div className="flex-1">
                <p className="text-sm light-text-secondary dark-text-secondary">
                  @{subscription.channel.username}
                </p>
                <h3 className="text-lg md:text-xl capitalize">
                  {subscription.channel.fullName}
                </h3>
              </div>

              <button
                onClick={() => handleSubscription(channelId)}
                className={`${
                  isSubscribed ? "light-btn dark-btn" : "bg-[#f53f3f]"
                } ml-auto sm:ml-0 text-sm tracking-wide font-semibold px-4 py-1.5 rounded-full`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default AllSubscriptions;
