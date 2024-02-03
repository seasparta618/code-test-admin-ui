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
    <div className="adminCard-zeroContent" data-testid="zero-state-card">
      {hasUsers ? (
        <>
          <SearchIcon size={150} />
          <div className="adminCard-zeroContentHeader">No exact matched</div>
          <div className="adminCard-zeroContentText">
            {`There is not matched result${
              searchValue.length ? ` for your search "${searchValue}"` : ''
            }, try something else`}
          </div>
        </>
      ) : (
        <>
          <NoUsersIcon size={150} />
          <div className="adminCard-zeroContentHeader">
            There is no users in this system
          </div>
        </>
      )}
    </div>
  );
};
