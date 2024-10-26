import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const VideoDescription = ({ description, views, createdAt }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "Unknown date";

  return (
    <section className="p-4 rounded-lg bg-[#f2f2f2] dark:bg-zinc-900 text-zinc-100 my-3">
      {/* Metadata: Views and Tags */}
      <div className="text-sm text-gray-500 flex gap-x-3 items-center font-semibold">
        <span>{views} views</span>
        <span>• {formattedDate}</span>
      </div>

      {/* Main Description Content */}
      <div
        className={`mt-2 text-black dark:text-gray-100 ${
          isExpanded ? "" : "line-clamp-3"
        }`}
      >
        <pre className="text-wrap font-sans">{description}</pre>
      </div>

      {/* More/Less Button */}
      <button
        onClick={toggleExpansion}
        className="text-zinc-800 dark:text-zinc-400 underline mt-2 font-semibold text-sm"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </section>
  );
};

export default VideoDescription;
