// src/hooks/usePagination.ts
import { useState } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  pageSize: number;
}

interface UsePaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const usePagination = <T>({
  items,
  pageSize,
}: UsePaginationProps<T>): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIdx = currentPage * pageSize;
  const endIdx = startIdx + pageSize;
  const currentItems = items.slice(startIdx, endIdx);
  const totalPages = Math.ceil(items.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    handleNextPage,
    handlePreviousPage,
  };
};

export default usePagination;
