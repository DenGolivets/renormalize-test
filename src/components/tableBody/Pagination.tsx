import React from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface IPagination {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  handlePageChange,
  currentPage,
  totalPages,
}: IPagination) => {
  const pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);
  const visiblePages = pageNumbers.slice(
    Math.max(0, currentPage - 2),
    currentPage + 2
  );
  return (
    <div className="flex justify-center gap-2 my-10">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-none shadow-none cursor-pointer"
      >
        Previous
      </Button>

      {visiblePages.map((pageNumber, index) => (
        <Button
          key={index}
          variant={pageNumber === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(pageNumber)}
          className={clsx(
            "rounded-full size-10",
            pageNumber === currentPage
              ? "bg-[#624DE3] text-white hover:bg-[#624DE3]/80"
              : "bg-[#E0E0E0] text-black hover:bg-[#E0E0E0]/80 dark:text-foreground dark:bg-[#141432]"
          )}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-none shadow-none cursor-pointer"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
