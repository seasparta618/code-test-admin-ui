// BuildSearchBar.test.tsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './searchBar';

describe('BuildSearchBar', () => {
  const mockOnSubmit = jest.fn();

  const renderSearchBar = () => {
    render(<SearchBar currentValue="" onSubmit={mockOnSubmit} />);
  };

  it('renders search input and buttons correctly', () => {
    renderSearchBar();
    expect(
      screen.getByPlaceholderText(/search by name, email or role/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId('searchBar-searchButton')).toBeInTheDocument();
    expect(
      screen.queryByTestId('searchBar-cleanupButton')
    ).not.toBeInTheDocument();
  });

  it('displays search and cleanup buttons when input is not empty', () => {
    renderSearchBar();

    fireEvent.change(
      screen.getByPlaceholderText(/Search by name, email or role/i),
      {
        target: { value: 'test' },
      }
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('searchBar-cleanupButton')).toBeInTheDocument();
  });

  it('calls onSubmit when search button is clicked', () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith('test');
  });

  it('calls onSubmit when enter is pressed', () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSubmit).toHaveBeenCalledWith('test');
  });

  it('press enter with empty value will still fire onSubmit', () => {
    renderSearchBar();

    const input = screen.getByTestId('searchBar-input');
    // input some value first, then delete, and mock enter pressed
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should clean up input when clear button is clicked', () => {
    renderSearchBar();

    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByTestId('searchBar-cleanupButton'));
    expect(input).toHaveValue('');
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
