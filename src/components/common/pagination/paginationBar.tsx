import { FC } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoublChevronRightIcon,
  DoubleChevronLeftIcon,
} from '../../icons/icon';
import { usePagination } from '../../../utils/usePagination';

interface PaginationBarProps {
  currentPage: number;
  totalPage: number;
  totalButtonNumber: number;
  onPageChange: (pageNumber: number) => void;
}

type specialButtonType = 'previous' | 'next' | 'last' | 'first';

export const PaginationBar: FC<PaginationBarProps> = ({
  currentPage,
  totalPage,
  totalButtonNumber,
  onPageChange = () => {},
}) => {
  const pageRange = usePagination({
    currentPage,
    totalPage,
    totalButtonNumber,
  });

  if (!currentPage || !totalPage || !pageRange.length) {
    return null;
  }

  const buttonStyleClass = 'button-primary button-ghost';

  const onSpecialButtonClick = (buttonType: specialButtonType) => {
    switch (buttonType) {
      case 'previous':
        if (currentPage !== 1) onPageChange(currentPage - 1);
        return;
      case 'next':
        if (currentPage !== totalPage) onPageChange(currentPage + 1);
        return;
      case 'first':
        if (currentPage !== 1) onPageChange(1);
        return;
      case 'last':
        if (currentPage !== totalPage) onPageChange(totalPage);
        return;
    }
  };

  const isSpecialButtondisabled = (buttonType: specialButtonType): boolean => {
    switch (buttonType) {
      case 'previous':
      case 'first':
        return currentPage === 1;
      case 'next':
      case 'last':
        return currentPage === totalPage;
    }
  };

  const getSpecialButtonClass = (buttonType: specialButtonType) => {
    return `pagination-button${
      isSpecialButtondisabled(buttonType)
        ? '  button-disabled'
        : ` ${buttonStyleClass} ${buttonType}-page`
    }`;
  };

  return (
    <div className="pagination" data-testid="pagination-bar">
      <div
        className={getSpecialButtonClass('first')}
        onClick={() => {
          onSpecialButtonClick('first');
        }}
        data-testid="pagination-first"
      >
        <DoubleChevronLeftIcon />
      </div>
      <div
        className={getSpecialButtonClass('previous')}
        onClick={() => {
          onSpecialButtonClick('previous');
        }}
        data-testid="pagination-previous"
      >
        <ChevronLeftIcon />
      </div>
      {pageRange.map((pageNumber) => {
        return (
          <div
            key={pageNumber}
            className={`pagination-button button-primary ${
              pageNumber === currentPage
                ? ' pagination-activeButton'
                : ' button-ghost'
            }`}
            onClick={() =>
              pageNumber === currentPage ? null : onPageChange(pageNumber)
            }
          >
            {pageNumber}
          </div>
        );
      })}
      <div
        className={getSpecialButtonClass('next')}
        onClick={() => {
          onSpecialButtonClick('next');
        }}
        data-testid="pagination-next"
      >
        <ChevronRightIcon />
      </div>
      <div
        className={getSpecialButtonClass('last')}
        onClick={() => {
          onSpecialButtonClick('last');
        }}
        data-testid="pagination-last"
      >
        <DoublChevronRightIcon />
      </div>
    </div>
  );
};
