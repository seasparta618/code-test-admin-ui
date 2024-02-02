import { useRef, useState } from 'react';
import { SearchIcon } from '../../icons/icon';

interface SearchBarProps {
  currentValue: string;
  onSubmit: (value: string) => void;
  searchDisabled?: boolean;
}

export const SearchBar = ({
  currentValue = '',
  onSubmit = () => {},
  searchDisabled = false,
}: SearchBarProps) => {
  const [value, setValue] = useState<string>(currentValue);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = 'Search by name, email or role';

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
      onSubmit(value);
      inputRef?.current?.blur();
    }
  };

  const handleOnSearchButtonClick = () => {
    onSubmit(value);
    inputRef?.current?.blur();
  };

  return (
    <div className="searchBar">
      <span className="searchBar-icon">
        <SearchIcon size={20} />
      </span>
      <input
        ref={inputRef}
        data-testid="searchBar-input"
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
        <button
          data-testid="searchBar-cleanupButton"
          className="button-sm button-secondary"
          onClick={() => setValue('')}
        >
          Clear
        </button>
      ) : null}
      <button
        data-testid="searchBar-searchButton"
        className={`button-sm${searchDisabled ? ' button-disabled' : ' button-primary'}`}
        onClick={handleOnSearchButtonClick}
      >
        Search
      </button>
    </div>
  );
};
