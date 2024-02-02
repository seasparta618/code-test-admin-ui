import { FC } from 'react';
import { NoUsersIcon, SearchIcon } from '../icons/icon';

interface ZeroStateProps {
  searchValue?: string;
  hasUsers: boolean;
}

export const UserDataZeroState: FC<ZeroStateProps> = ({
  searchValue = '',
  hasUsers,
}) => {
  return (
    <div className="adminPage-zeroContent">
      {hasUsers ? (
        <>
          <SearchIcon size={150} />
          <div className="adminPage-zeroContentHeader">No exact matched</div>
          <div className="adminPage-zeroContentText">
            {`There is not matched result${
              searchValue.length ? ` for your search "${searchValue}"` : ''
            }, try something else`}
          </div>
        </>
      ) : (
        <>
          <NoUsersIcon size={150} />
          <div className="adminPage-zeroContentHeader">
            There is no users in this system
          </div>
        </>
      )}
    </div>
  );
};
