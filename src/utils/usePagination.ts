import { useMemo } from 'react';

export interface UsePaginationProps {
  currentPage: number;
  totalPage: number;
  totalButtonNumber: number;
}

const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  currentPage,
  totalPage,
  totalButtonNumber,
}: UsePaginationProps): number[] => {
  const paginationRange = useMemo(() => {
    if (totalPage === 0) return [];

    // total number less than max page button allowed, just return all the pages
    if (totalPage <= totalButtonNumber) {
      return range(1, totalPage);
    }

    const middle = Math.ceil(totalButtonNumber / 2);

    let start = Math.max(currentPage - middle + 1, 1);
    let end = Math.min(start + totalButtonNumber - 1, totalPage);

    // the current page number is in the range to the last page, return the last maxPageButtonAllowed number
    if (end - start < totalButtonNumber - 1) {
      start = end - totalButtonNumber + 1;
    }

    return range(start, end);
  }, [totalPage, currentPage, totalButtonNumber]);

  return paginationRange;
};
