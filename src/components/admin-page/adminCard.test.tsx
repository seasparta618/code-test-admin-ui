import React from 'react';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  within,
} from '@testing-library/react';
import { AdminCard } from './adminCard';
import { mockUserData } from '../../utils/user';
import { User } from '../../types/user';

/* eslint-disable testing-library/no-node-access, testing-library/no-container */
describe('Admin Card test', () => {
  const mockOnUserChange = jest.fn();

  describe('Admin Card content test', () => {
    /** normal pagination status referes to,
     * the pagination bar is defined
     * the pagination starts at the first page
     * the previous and first button should be disabled
     */
    it('should have pagination bar, and based on normal pagination status', () => {
      const mockUsers = mockUserData(101);
      const { container } = render(
        <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
      );
      const paginationBar = screen.getByTestId('pagination-bar');
      expect(paginationBar).toBeInTheDocument();
      const firstButton = screen.getByTestId('pagination-first');
      expect(firstButton).toHaveClass('button-disabled');
      const nextButton = screen.getByTestId('pagination-next');
      expect(nextButton).not.toHaveClass('button-disabled');
      const allPaginationButtons =
        container.querySelectorAll('.pagination-button');
      expect(allPaginationButtons.length).toBe(9);

      const initialActivePageButton = allPaginationButtons[2];
      expect(initialActivePageButton).toHaveTextContent('1');
      expect(initialActivePageButton).toHaveClass(
        'pagination-button button-primary'
      );
    });

    it('should have the correct content at page 1', () => {
      const mockUsers = mockUserData(101);
      const { container } = render(
        <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
      );
      const userTable = screen.getByTestId('user-table');
      expect(userTable).toBeInTheDocument();

      const allTableRows = screen.getAllByRole('row');
      expect(allTableRows.length).toBe(11);

      const firstRow = screen.getAllByRole('row')[1];

      const allInput = container.querySelectorAll('.userTable-textInput');
      expect(allInput.length).toBe(30);
    });
  });

  describe('Admin Card action test', () => {
    it('click on bulk select should select all rows', () => {
      const mockUsers = mockUserData(101);
      const { container } = render(
        <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
      );

      // get the buld select button
      const bulkSelectButton = screen.getByTestId('bulk-select');
      expect(bulkSelectButton).toBeInTheDocument();

      // get selected rows
      let selectedTableRows = container.querySelectorAll(
        '.userTable-selectedRow'
      );
      expect(selectedTableRows.length).toBe(0);
      expect(bulkSelectButton).not.toBeChecked();

      // fire clicking on bulk select button
      fireEvent.click(bulkSelectButton);
      expect(bulkSelectButton).toBeChecked();

      // should have 10 rows selected
      selectedTableRows = container.querySelectorAll('.userTable-selectedRow');
      expect(selectedTableRows.length).toBe(10);

      // fire clicking on bulk select button
      fireEvent.click(bulkSelectButton);
      expect(bulkSelectButton).not.toBeChecked();

      // all rows are unselected
      selectedTableRows = container.querySelectorAll('.userTable-selectedRow');
      expect(selectedTableRows.length).toBe(0);
    });

    it('click on bulk change page number should cancel bulk status', () => {
      const mockUsers = mockUserData(101);
      const { container } = render(
        <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
      );
      const bulkSelectButton = screen.getByTestId('bulk-select');
      expect(bulkSelectButton).toBeInTheDocument();

      // click on bulk select button
      fireEvent.click(bulkSelectButton);
      let selectedTableRows = container.querySelectorAll(
        '.userTable-selectedRow'
      );
      expect(selectedTableRows.length).toBe(10);
      expect(bulkSelectButton).toBeChecked();

      const nextButton = screen.getByTestId('pagination-next');
      expect(nextButton).toBeInTheDocument();

      // switch page will cancel bulk select and reset all selected rows
      fireEvent.click(nextButton);
      expect(bulkSelectButton).not.toBeChecked();
      selectedTableRows = container.querySelectorAll('.userTable-selectedRow');
      expect(selectedTableRows.length).toBe(0);
    });

    it('click on last page should trigger next & last button to be disabled, the page should be change to 11', () => {
      const mockUsers = mockUserData(101);
      const { container } = render(
        <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
      );

      const lastPaginationButton = screen.getByTestId('pagination-last');
      expect(lastPaginationButton).not.toHaveClass('button-disabled');

      fireEvent.click(lastPaginationButton);
      expect(lastPaginationButton).toHaveClass('button-disabled');

      // get the active page button, should be 11, because Math.celi(101/10) = 11
      const activePageButton = container.querySelector(
        '.pagination-activeButton'
      );
      expect(activePageButton).toBeInTheDocument();
      expect(activePageButton).toHaveTextContent('11');
    });

    describe('bulk delete test', () => {
      it('when more than one page existing, delete on first page should still stay on first page', () => {
        const mockUsers = mockUserData(101);
        const { container } = render(
          <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
        );

        const bulkSelectButton = screen.getByTestId('bulk-select');
        expect(bulkSelectButton).toBeInTheDocument();

        fireEvent.click(bulkSelectButton);
        const bulkDeleteButton = screen.getByTestId('bulk-delete');
        expect(bulkDeleteButton).toBeInTheDocument();

        // click on bulk delete should trigger on User change
        fireEvent.click(bulkDeleteButton);
        expect(mockOnUserChange).toHaveBeenCalled();

        const activePageButton = container.querySelector(
          '.pagination-activeButton'
        );
        expect(activePageButton).toBeInTheDocument();
        expect(activePageButton).toHaveTextContent('1');
      });

      it('when more than one page existing, delete on last page should go to previous page', () => {
        const mockUsers = mockUserData(101);
        const { container } = render(
          <AdminCard users={mockUsers} onUserChange={mockOnUserChange} />
        );

        const lastPaginationButton = screen.getByTestId('pagination-last');
        expect(lastPaginationButton).toBeInTheDocument();

        fireEvent.click(lastPaginationButton);
        let activePageButton = container.querySelector(
          '.pagination-activeButton'
        );
        expect(activePageButton).toBeInTheDocument();
        expect(activePageButton).toHaveTextContent('11');

        const bulkSelectButton = screen.getByTestId('bulk-select');
        expect(bulkSelectButton).toBeInTheDocument();

        fireEvent.click(bulkSelectButton);
        const bulkDeleteButton = screen.getByTestId('bulk-delete');
        expect(bulkDeleteButton).toBeInTheDocument();

        // click on bulk delete should trigger on User change
        fireEvent.click(bulkDeleteButton);
        expect(mockOnUserChange).toHaveBeenCalled();

        activePageButton = container.querySelector('.pagination-activeButton');
        expect(activePageButton).toBeInTheDocument();
        expect(activePageButton).toHaveTextContent('10');
      });
    });
  });
});
