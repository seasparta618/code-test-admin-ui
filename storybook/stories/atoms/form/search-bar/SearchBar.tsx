import React, { useEffect, useState } from 'react';
import './search-bar.scss';
import '../../button/button.scss';
import { CrossIcon, SearchIcon } from '../../../shared/icon';

interface SearchBarProps {
  defaultValue: string;
  placeholder: string;
  searchDisabled?: boolean;
  onSubmit?: (value: string) => void;
}

export const BuildSearchBar = ({
  placeholder = 'Search by name, email or role',
  defaultValue = '',
  onSubmit,
  searchDisabled = false,
}: SearchBarProps) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      onSubmit && onSubmit(value);
    }
  };

  return (
    <div className="searchBar">
      <span className="searchBar-icon">
        <SearchIcon size={20} />
      </span>
      <input
        className="searchBar-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
        disabled={searchDisabled}
      />
      {value.length ? (
        <button className="button-sm button-primary">Search</button>
      ) : null}
      {value.length ? (
        <span
          className="searchBar-icon searchBar-cleanupIcon"
          onClick={() => {
            setValue('');
          }}
        >
          <CrossIcon size={20} />
        </span>
      ) : null}
    </div>
  );
};
