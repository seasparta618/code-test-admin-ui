import { FC } from 'react';
import { SearchIcon } from '../icons/icon';

interface ZeroStateProps {
  searchValue?: string;
}

export const UserDataZeroState: FC<ZeroStateProps> = ({ searchValue = '' }) => {
  return (
    <div className="adminPage-zeroContent">
      <SearchIcon size={150} />
      <div className="adminPage-zeroContentHeader">No exact matched</div>
      <div className="adminPage-zeroContentText">
        {`There is not matched result${
          searchValue.length ? ` for your search \"${searchValue}\"` : ''
        }, try something else`}
      </div>
    </div>
  );
};
