import { Link } from "react-router-dom";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import VideoDropdownMenu from "../VideoDropdownMenu";
import SearchVideoDetails from "../SearchVideoDetails";

const SearchVideoCard = ({ video }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownActive((prev) => !prev);
  };

  return (
    <section className="flex flex-col sm:flex-row gap-3 bg-transparent rounded-lg">
      <Link to={`/watch/${video._id}`}>
        <div
          className="relative w-full sm:w-60 md:w-72 lg:w-96 overflow-hidden rounded-lg"
          style={{ aspectRatio: "16 / 9" }}
        >
          <img
            src={video.thumbnail}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 font-normal-bold rounded">
            {video.duration}
          </span>
        </div>
      </Link>

        <div className="flex items-start gap-x-2 flex-1 ">
          <img
            src={video.owner.avatar}
            alt={video.owner.fullName}
            className="w-8 h-8 rounded-full block sm:hidden"
          />
          <Link to={`/watch/${video._id}`} className="flex-grow">
            <h3 className="text-lg md:text-xl font-semibold line-clamp-2">
              {video.title}
            </h3>
            <SearchVideoDetails video={video} />
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full light-btn-hover dark-btn-hover"
            >
              <BsThreeDotsVertical className="text-lg light-text-secondary dark-text-secondary" />
            </button>
            {isDropdownActive && <VideoDropdownMenu />}
          </div>
        </div>

    </section>
  );
};

export default SearchVideoCard;
