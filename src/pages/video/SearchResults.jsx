import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../auth/refreshAccessToken";
import SearchVideoCard from "../../components/VideoComp/SearchVideoCard";
import Pagination from "../../components/Pagination";
import { MdKeyboardArrowDown } from "react-icons/md";

const SearchResults = () => {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [userID, setUserID] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  const sortDropdownRef = useRef(null);
  const orderDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
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
  }, [setCurrentUser]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axiosInstance.get(
          `/subscription/channel/${currentUser._id}`
        );
        setSubscriptions(response.data.data);
      } catch (error) {
        console.log("Failed to fetch subscriptions", error);
      }
    };
    fetchSubscriptions();
  }, [currentUser]);

  const [paginationData, setPaginationData] = useState({
    totalDocs: 0,
    limit: 12,
    hasPrevPage: false,
    hasNextPage: false,
  });

  const sortOptions = [
    { value: "createdAt", label: "Date" },
    { value: "views", label: "Views" },
    { value: "title", label: "Title" },
  ];

  const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    setQuery(searchQuery);

    if (searchQuery) fetchSearchResults(searchQuery, 1);
  }, [location.search, sortType, sortBy, userID]);

  const fetchSearchResults = async (searchQuery, pageNumber = 1) => {
    try {
      const response = await axiosInstance.get("/videos/getAllVideos", {
        params: {
          query: searchQuery,
          page: pageNumber,
          limit: 12,
          sortType,
          sortBy,
          userID,
        },
      });
      setVideos(response.data.data.videos);
      setPaginationData({
        totalDocs: response.data.data.totalDocs,
        limit: response.data.data.limit,
        hasPrevPage: response.data.data.hasPrevPage,
        hasNextPage: response.data.data.hasNextPage,
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchSearchResults(query, newPage);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        orderDropdownRef.current &&
        !orderDropdownRef.current.contains(event.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 font-normal-bold mb-14 md:mb-0 min-h-screen flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {/* Sort and Filter Controls */}
      <div className="flex items-center flex-wrap mb-4 gap-2">
        <div className="relative inline-block text-left" ref={userDropdownRef}>
          <div className="flex items-center rounded-md light-bg-secondary dark-bg-secondary border dark-border-primary light-border-primary shadow-md">
            <div className="border-r light-border-primary dark-border-primary text-nowrap px-3 py-0.5 rounded-l capitalize tracking-wide text-xs">
              {subscriptions.find((option) => option.channel._id === userID)
                ?.channel.fullName
                ? subscriptions
                    .find((option) => option.channel._id === userID)
                    ?.channel.fullName.split(" ")[0]
                : "All"}
            </div>
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "channel" ? null : "channel")
              }
              className="inline-flex items-center font-semibold rounded-r p-0.5 bg-[#c9c9c9] dark:bg-[#2e2e2e] hover:bg-[#bebebe] dark:hover:bg-[#353535]"
            >
              <MdKeyboardArrowDown />
            </button>
          </div>
          {dropdownOpen === "channel" && (
            <div className="absolute mt-2 w-48 rounded-md shadow-lg light-bg-secondary dark-bg-secondary ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {/* "All" Option with Tick for userID == "" */}
                <button
                  onClick={() => {
                    setUserID("");
                    setDropdownOpen(null);
                  }}
                  className={`w-full light-btn-hover dark-btn-hover text-left px-4 py-2 text-sm font-medium ${
                    userID === ""
                      ? "dark:text-[#bebebe]"
                      : "light-text-secondary dark-text-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>All</span>
                    {userID === "" && (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 10l3 3 7-7"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Subscriptions List */}
                {subscriptions.map((subscription) => (
                  <button
                    key={subscription.channel._id}
                    onClick={() => {
                      setUserID(subscription.channel._id);
                      setDropdownOpen(null);
                    }}
                    className={`w-full light-btn-hover dark-btn-hover capitalize text-left px-4 py-2 text-sm font-medium ${
                      userID === subscription.channel._id
                        ? "dark:text-[#bebebe]"
                        : "light-text-secondary dark-text-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-1">
                        <img
                          src={subscription.channel.avatar}
                          alt="user"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-normal">
                          {subscription.channel.fullName}
                        </span>
                      </div>
                      {userID === subscription.channel._id && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10l3 3 7-7"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Order Dropdown */}
        <div className="relative inline-block text-left" ref={orderDropdownRef}>
          <div className="flex items-center rounded-md light-bg-secondary dark-bg-secondary border dark-border-primary light-border-primary shadow-md">
            <div className="border-r light-border-primary dark-border-primary px-3 py-0.5 rounded-l tracking-wide text-xs">
              {orderOptions.find((option) => option.value === sortType)?.label}
            </div>
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "order" ? null : "order")
              }
              className="inline-flex items-center font-semibold rounded-r p-0.5 bg-[#c9c9c9] dark:bg-[#2e2e2e] hover:bg-[#bebebe] dark:hover:bg-[#353535]"
            >
              <MdKeyboardArrowDown />
            </button>
          </div>
          {dropdownOpen === "order" && (
            <div className="absolute mt-2 w-40 rounded-md shadow-lg light-bg-secondary dark-bg-secondary ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {orderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortType(option.value);
                      setDropdownOpen(null);
                    }}
                    className={`w-full light-btn-hover dark-btn-hover text-left px-4 py-2 text-sm font-medium ${
                      sortType === option.value
                        ? "dark:text-[#bebebe]"
                        : "light-text-secondary dark-text-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {sortType === option.value && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10l3 3 7-7"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="relative inline-block text-left" ref={sortDropdownRef}>
          <div className="flex items-center rounded-md light-bg-secondary dark-bg-secondary border dark-border-primary light-border-primary shadow-md">
            <div className="border-r light-border-primary dark-border-primary px-3 py-0.5 rounded-l tracking-wide text-xs">
              {sortOptions.find((option) => option.value === sortBy)?.label}
            </div>
            <button
              onClick={() =>
                setDropdownOpen(dropdownOpen === "sort" ? null : "sort")
              }
              className="inline-flex items-center font-semibold p-0.5 rounded-r bg-[#c9c9c9] dark:bg-[#2e2e2e] hover:bg-[#bebebe] dark:hover:bg-[#353535]"
            >
              <MdKeyboardArrowDown />
            </button>
          </div>
          {dropdownOpen === "sort" && (
            <div className="absolute mt-2 w-32 -left-2 rounded-md shadow-lg light-bg-secondary dark-bg-secondary ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setDropdownOpen(null);
                    }}
                    className={`w-full light-btn-hover dark-btn-hover text-left px-4 py-2 text-sm font-medium ${
                      sortBy === option.value
                        ? "dark:text-[#bebebe]"
                        : "light-text-secondary dark-text-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {sortBy === option.value && (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10l3 3 7-7"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {videos.map((video) => (
          <SearchVideoCard key={video._id} video={video} />
        ))}
      </div>

      <div className="mt-auto">
        <Pagination
          page={page}
          totalDocs={paginationData.totalDocs}
          limit={paginationData.limit}
          hasPrevPage={paginationData.hasPrevPage}
          hasNextPage={paginationData.hasNextPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchResults;
