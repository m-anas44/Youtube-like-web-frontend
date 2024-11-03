// Pagination.js
import React from "react";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

function Pagination({
  page,
  totalDocs,
  limit,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}) {
  return (
    <div className="flex flex-col items-center gap-y-2 py-4 border-t light-border-primary dark-border-primary bg-white dark-bg-primary">
      <span className="text-sm light-text-secondary dark-text-secondary">
        Showing{" "}
        <span className="font-semibold light-text-primary dark-text-primary">
          {(page - 1) * limit + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold light-text-primary dark-text-primary">
          {Math.min(page * limit, totalDocs)}
        </span>{" "}
        of{" "}
        <span className="font-semibold light-text-primary dark-text-primary">
          {totalDocs}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex">
        <button
          disabled={!hasPrevPage}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-x-2 px-3 h-8 text-sm font-medium rounded-s light-btn dark-btn "
        >
          <FaLongArrowAltLeft />
          <span>Prev</span>
        </button>
        <button
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-x-2 px-3 h-8 text-sm font-medium border-l light-border-primary dark-border-primary rounded-e light-btn dark-btn "
        >
          <span>Next</span>
          <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
