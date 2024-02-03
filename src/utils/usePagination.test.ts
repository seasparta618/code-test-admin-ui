import { renderHook } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('should return all pages when total pages are less than max buttons', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPage: 3, totalButtonNumber: 5 })
    );
    expect(result.current).toEqual([1, 2, 3]);
  });

  it('should return pages starting from 1 when current page is near the start', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 2, totalPage: 10, totalButtonNumber: 5 })
    );
    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return last pages when current page is near the end', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 76, totalPage: 109, totalButtonNumber: 11 })
    );
    expect(result.current).toEqual([
      71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
    ]);
  });

  it('should try to center the current page', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 5, totalPage: 1000, totalButtonNumber: 5 })
    );
    expect(result.current).toEqual([3, 4, 5, 6, 7]);
  });

  it('should return undefined when total page is 0', () => {
    const { result } = renderHook(() =>
      usePagination({ currentPage: 1, totalPage: 0, totalButtonNumber: 5 })
    );
    expect(result.current).toEqual([]);
  });
});
