import React from "react";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  // Show up to 5 page numbers, centered on current page
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    if (end - start < 4) {
      if (start === 1) end = Math.min(totalPages, start + 4);
      if (end === totalPages) start = Math.max(1, end - 4);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        onClick={handlePrev}
        disabled={page === 1}
      >
        Prev
      </button>
      {getPageNumbers().map((num) => (
        <button
          key={num}
          className={`px-2 py-1 border rounded ${num === page ? "bg-primary text-white" : ""}`}
          onClick={() => onPageChange(num)}
          disabled={num === page}
        >
          {num}
        </button>
      ))}
      <button
        className="px-2 py-1 border rounded disabled:opacity-50"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
