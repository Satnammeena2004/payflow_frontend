import { useState } from "react";
import { SkipBackIcon, SkipForwardIcon } from "lucide-react";

export const ITEMS_PER_PAGE = 6;

const Paggination = ({ totalItems = 5, currentPage, setCurrentPage }) => {
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (page) => setCurrentPage(page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex justify-between items-center dark:bg-zinc-900 dark:text-white gap-4 p-4 flex-col md:flex-row border-t-2 ">
      <span className="text-xs md:text-base">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-x-3">
        <button
          className={`${currentPage === 1 && "cursor-not-allowed"}`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <SkipBackIcon />
        </button>
        <div className="flex gap-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`text-sm rounded-md px-2 font-medium py-1 border border-white/80 dark:text-white ${
                currentPage === number
                  ? "text-white bg-indigo-600"
                  : "text-gray-700"
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          className={`${currentPage === totalPages && "cursor-not-allowed"}`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <SkipForwardIcon />
        </button>
      </div>

      <div className="hidden items-center  md:flex">
        <span>Total items: {totalItems}</span>
      </div>
    </div>
  );
};

export default Paggination;
