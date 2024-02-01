// BuildSearchBar.test.tsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './searchBar';

describe('BuildSearchBar', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<SearchBar currentValue="" onSubmit={mockOnSubmit} />);
  });

  it('renders search input and buttons correctly', () => {
    expect(
      screen.getByPlaceholderText(/search by name, email or role/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /search/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /clear/i })
    ).not.toBeInTheDocument();
  });

  it('displays search and cleanup buttons when input is not empty', () => {
    fireEvent.change(
      screen.getByPlaceholderText(/Search by name, email or role/i),
      {
        target: { value: 'test' },
      }
    );
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('searchBar-cleanupIcon')).toBeInTheDocument();
  });

  it('calls onSubmit when search button is clicked', () => {
    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(mockOnSubmit).toHaveBeenCalledWith('test');
  });

  it('calls onSubmit when enter is pressed', () => {
    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSubmit).toHaveBeenCalledWith('test');
  });

  it('press enter with empty value will not fire onSubmit', () => {
    const input = screen.getByTestId('searchBar-input');
    // input some value first, then delete, and mock enter pressed
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should clean up input when clear button is clicked', () => {
    const input = screen.getByPlaceholderText(/search by name, email or role/i);
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(screen.getByTestId('searchBar-cleanupIcon'));
    expect(input).toHaveValue('');
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
