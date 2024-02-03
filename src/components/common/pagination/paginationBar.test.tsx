// PaginationBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationBar } from './paginationBar';

describe('PaginationBar', () => {
  const handlePageChange = jest.fn();

  it('disables the next button and last button when on the last page', () => {
    render(
      <PaginationBar
        currentPage={5}
        totalPage={5}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toHaveClass('button-disabled');
    const lastButton = screen.getByTestId('pagination-last');
    expect(lastButton).toHaveClass('button-disabled');
  });

  it('disables the first button and previous button when on the first page', () => {
    render(
      <PaginationBar
        currentPage={1}
        totalPage={10}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const firstButton = screen.getByTestId('pagination-first');
    expect(firstButton).toHaveClass('button-disabled');
    const previousButton = screen.getByTestId('pagination-previous');
    expect(previousButton).toHaveClass('button-disabled');
    const paginationBar = screen.getByTestId('pagination-bar');
  });

  it('calls onPageChange with 0 when click on next button and last button at last page', () => {
    render(
      <PaginationBar
        currentPage={10}
        totalPage={10}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const nextButton = screen.getByTestId('pagination-next');
    fireEvent.click(nextButton);
    expect(handlePageChange).not.toHaveBeenCalled();
    const lastButton = screen.getByTestId('pagination-last');
    fireEvent.click(lastButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('onPageChange will not been called when click on next button and last button at last page', () => {
    render(
      <PaginationBar
        currentPage={10}
        totalPage={10}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const nextButton = screen.getByTestId('pagination-next');
    fireEvent.click(nextButton);
    expect(handlePageChange).not.toHaveBeenCalled();
    const lastButton = screen.getByTestId('pagination-last');
    fireEvent.click(lastButton);
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  it('onPageChange will not been called when click on first button and previous button at first page', () => {
    render(
      <PaginationBar
        currentPage={1}
        totalPage={10}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const firstButton = screen.getByTestId('pagination-first');
    fireEvent.click(firstButton);
    expect(handlePageChange).not.toHaveBeenCalled();
    const previousButton = screen.getByTestId('pagination-previous');
    fireEvent.click(previousButton);
    expect(handlePageChange).not.toHaveBeenCalledWith();
  });

  it('calls onPageChange with the first and last button', () => {
    render(
      <PaginationBar
        currentPage={4}
        totalPage={10}
        totalButtonNumber={5}
        onPageChange={handlePageChange}
      />
    );
    const firstButton = screen.getByTestId('pagination-first');
    fireEvent.click(firstButton);
    expect(handlePageChange).toHaveBeenCalledWith(1);
    const lastButton = screen.getByTestId('pagination-last');
    fireEvent.click(lastButton);
    expect(handlePageChange).toHaveBeenCalledWith(10);
  });
});
