import React, { useState } from "react";
import ChannelVideoTab from "./Tabs/ChannelVideoTab";
import ChannelPlaylistTab from "./Tabs/ChannelPlaylistTab";

function ChannelTabs({ channelId }) {
  const [activeTab, setActiveTab] = useState("videos");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="flex flex-col">
      <div className="border-b light-border-primary dark-border-primary px-4">
        <ul
          className="flex space-x-4 text-sm font-medium light-text-secondary dark-text-secondary tracking-wide"
          role="tablist"
        >
          <li>
            <button
              onClick={() => handleTabChange("videos")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "videos"
                  ? "text-red-600 border-b-2 border-red-600 dark:text-red-500"
                  : "hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              role="tab"
            >
              Videos
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabChange("playlists")}
              className={`py-2 px-4 rounded-t-lg ${
                activeTab === "playlists"
                  ? "text-red-600 border-b-2 border-red-600 dark:text-red-500"
                  : "hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              role="tab"
            >
              Playlists
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="p-2 light-bg-secondary dark-bg-secondary">
        {activeTab === "videos" && <ChannelVideoTab channelId={channelId} />}
        {activeTab === "playlists" && <ChannelPlaylistTab />}
      </div>
    </div>
  );
}

export default ChannelTabs;
