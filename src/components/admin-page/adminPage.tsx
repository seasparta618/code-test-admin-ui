// AdminPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { SearchBar } from '../common/input/searchBar';
import { PaginationBar } from '../common/pagination/paginationBar';
import { UserDataTable } from './userDataTable';
import { User } from '../../types/user';
import { fetchUsers } from '../../api/user';
import { UserDataZeroState } from './userDataZeroState';

export const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBulkSelected, setIsBulkSelected] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const [inEditingUsers, setInEditingUsers] = useState<User[]>([]);
  const inEditingUserIds = useMemo(
    () => inEditingUsers.map((u) => u.id),
    [inEditingUsers]
  );

  const pageSize = 10;

  // matched result is just affected by users and search value, this should not be manually set
  const matchedUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ),
    [users, searchValue]
  );

  // total page will be affected by length of matched user and page size, this should not be manually set
  const totalPage = useMemo(
    () => Math.ceil(matchedUsers.length / pageSize),
    [matchedUsers, pageSize]
  );

  // users displayed on the current page, this should not be manually set
  const displayedUsers = useMemo(() => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return matchedUsers.slice(startIndex, endIndex);
  }, [matchedUsers, activePage, pageSize]);

  // this can later be extended by a select / dropdown, if in that case, should use useState hook to define

  // load all the users only when the component is initialized and mounted
  useEffect(() => {
    const loadUsers = () => {
      fetchUsers()
        .then((fetchedUsers) => {
          setUsers(fetchedUsers);
        })
        .catch((error) => {
          console.error('Failed to load users', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    loadUsers();
  }, []);

  const handleDeleteUsers = (userIds: string[]) => {
    const usersAfterDelete = users.filter((u) => !userIds.includes(u.id));
    setUsers(usersAfterDelete);
    setSelectedUserIds(selectedUserIds.filter((id) => !userIds.includes(id)));
    setInEditingUsers(inEditingUsers.filter((u) => !userIds.includes(u.id)));

    // if currently the user is stayed on last page and deleted to no result,
    // if still page existing, need to jump to current page - 1 or 1
    if (usersAfterDelete.length && activePage > 1) {
      setActivePage((prevActivePage) => prevActivePage - 1);
    }
  };

  const handleUserSelection = (userId: string, isSelected: boolean) => {
    const newSelectedIds = isSelected
      ? selectedUserIds.filter((id) => id !== userId)
      : [...selectedUserIds, userId];
    setSelectedUserIds(newSelectedIds);
    // special check, if all the users are checked, this should be regarded as bulk selected checked
    // else, if all the users are unchecked, this should be regarded as bulk selected is unchecked
    if (isBulkSelected && !newSelectedIds.length) {
      setIsBulkSelected(false);
    } else if (
      !isBulkSelected &&
      newSelectedIds.length === displayedUsers.length
    ) {
      setIsBulkSelected(true);
    }
  };

  const handleBulkSelection = (newBulkSelected: boolean) => {
    setSelectedUserIds(newBulkSelected ? displayedUsers.map((u) => u.id) : []);
    setIsBulkSelected(newBulkSelected);
  };

  const handlePageChange = (pageNumber: number) => {
    // switch to next page will erase all the state on current page
    setSelectedUserIds([]);
    setInEditingUsers([]);
    setIsBulkSelected(false);
    setActivePage(pageNumber);
  };

  /*===============edit part start===============*/

  const handleEditClick = (user: User) => {
    setInEditingUsers([...inEditingUsers, user]);
  };

  const handleUserEditChange = (
    userId: string,
    field: keyof User,
    value: string
  ) => {
    setInEditingUsers((currentInEdittingUsers) =>
      currentInEdittingUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const handleCancelEditClick = (user: User) => {
    setInEditingUsers((currentUsers) =>
      currentUsers.filter((u) => user.id !== u.id)
    );
  };

  const handleSaveClick = (userId: string) => {
    const editedUserData = inEditingUsers.find((u) => u.id === userId);
    if (!editedUserData) {
      return;
    }
    setUsers((users) =>
      users.map((u) => {
        if (u.id === editedUserData.id) u = editedUserData;
        return u;
      })
    );
    setInEditingUsers(inEditingUsers.filter((u) => u.id !== userId));
  };
  /*===============edit part end===============*/

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setActivePage(1);
  };

  return (
    <div className="adminPage">
      <SearchBar
        currentValue={searchValue}
        onSubmit={handleSearchSubmit}
        searchDisabled={!users.length}
      />
      <div className="adminPage-contentContainer ">
        {isLoading ? (
          // place holder for loading state
          <div>Loading...</div>
        ) : (
          <UserDataTable
            users={displayedUsers}
            selectedUserIds={selectedUserIds}
            isBulkSelected={isBulkSelected}
            inEditingUsers={inEditingUsers}
            inEditingUserIds={inEditingUserIds}
            toggleBulkSelection={handleBulkSelection}
            toggletUserSelection={handleUserSelection}
            handleDeleteUsers={handleDeleteUsers}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleUserEditChange={handleUserEditChange}
            handleCancelEditClick={handleCancelEditClick}
          />
        )}
        {displayedUsers.length ? null : (
          <UserDataZeroState
            searchValue={searchValue}
            hasUsers={users.length > 0}
          />
        )}
      </div>
      <div
        className="adminPage-bottomActions"
        style={{ visibility: displayedUsers.length ? 'visible' : 'hidden' }}
      >
        <button
          className={`adminPage-deleteSelectedButton ${selectedUserIds.length ? 'button-secondary' : 'button-disabled'}`}
          onClick={() => {
            handleDeleteUsers(selectedUserIds);
            setIsBulkSelected(false);
          }}
        >
          Delete Selected
        </button>
        <div className="adminPage-pagination">
          <PaginationBar
            currentPage={activePage}
            totalPage={totalPage}
            totalButtonNumber={5}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
