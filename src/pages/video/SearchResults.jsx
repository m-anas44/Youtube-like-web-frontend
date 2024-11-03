import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../auth/refreshAccessToken";
import SearchVideoCard from "../../components/VideoComp/SearchVideoCard";
import Pagination from "../../components/Pagination";

const SearchResults = () => {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({
    totalDocs: 0,
    limit: 12,
    hasPrevPage: false,
    hasNextPage: false,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    setQuery(searchQuery);

    if (searchQuery) fetchSearchResults(searchQuery, 1);
  }, [location.search]);

  const fetchSearchResults = async (searchQuery, pageNumber = 1) => {
    try {
      const response = await axiosInstance.get("/videos/getAllVideos", {
        params: { query: searchQuery, page: pageNumber, limit: 12 },
      });
      setVideos(response.data.data.videos);

      // Update pagination data
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

  return (
    <div className="p-4 font-normal-bold mb-14 md:mb-0 min-h-screen flex flex-col">
      <h1 className="text-lg font-semibold mb-4">
        Search Results for "{query}"
      </h1>
      <div className="space-y-4 mb-8">
        {videos.map((video) => (
          <SearchVideoCard key={video._id} video={video} />
        ))}
      </div>
      
      {/* Pagination Component */}
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
