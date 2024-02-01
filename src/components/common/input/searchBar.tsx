import { useState } from 'react';
import { CrossIcon, SearchIcon } from '../../icons/icon';

interface SearchBarProps {
  currentValue: string;
  onSubmit: (value: string) => void;
}

export const SearchBar = ({
  currentValue = '',
  onSubmit = () => {},
}: SearchBarProps) => {
  const [value, setValue] = useState<string>(currentValue);
  const [isComposing, setIsComposing] = useState<boolean>(false);

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
    if (event.key === 'Enter' && !isComposing && value.length) {
      onSubmit(value);
    }
  };

  const handleOnSearchButtonClick = () => {
    if (value.length) onSubmit(value);
  };

  return (
    <div className="searchBar">
      <span className="searchBar-icon">
        <SearchIcon size={20} />
      </span>
      <input
        data-testid="searchBar-input"
        className="searchBar-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onKeyDown={handleKeyDown}
      />
      {value.length ? (
        <button
          data-testid="searchBar-searchButton"
          className="button-sm button-quatenary"
          onClick={handleOnSearchButtonClick}
        >
          Search
        </button>
      ) : null}
      {value.length ? (
        <span
          data-testid="searchBar-cleanupIcon"
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
