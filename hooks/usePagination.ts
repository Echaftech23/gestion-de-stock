import { useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage = 3) {
  const [page, setPage] = useState(1);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const resetPage = () => setPage(1);

  return {
    page,
    totalPages,
    currentItems,
    handleNextPage,
    handlePrevPage,
    resetPage,
  };
}
