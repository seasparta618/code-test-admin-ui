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
  const [selectedUserIds, setSeletedUserIds] = useState<string[]>([]);
  const matchedUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user.name} ${user.email} ${user.role}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ),
    [users, searchValue]
  );
  const pageSize = 10;
  const totalPage = useMemo(
    () => Math.ceil(matchedUsers.length / pageSize),
    [matchedUsers, pageSize]
  );

  const displayedUsers = useMemo(() => {
    const filteredUsers = users.filter((user) =>
      `${user.name} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredUsers.slice(startIndex, endIndex);
  }, [users, searchValue, activePage, pageSize]);

  // this can later be extended by a select / dropdown, if in that case, should use useState hook to define

  // load all the users only when the component is initialized and mounted
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const onDeleteUsers = (userIds: string[]) => {
    const usersAfterDelete = users.filter((u) => !userIds.includes(u.id));
    setUsers(usersAfterDelete);
    setSeletedUserIds(selectedUserIds.filter((id) => !userIds.includes(id)));

    // in case the bulk delete is happened on last page,
    // if there are still users left, should try to go to the previous page, rather than going to zero state
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const usersOnCurrentPage = usersAfterDelete.slice(startIndex, endIndex);

    if (usersOnCurrentPage.length === 0 && activePage > 1) {
      setActivePage((prevActivePage) => prevActivePage - 1);
    }
  };

  const toggleUserSelection = (userId: string, isSelected: boolean) => {
    const newSelectedIds = isSelected
      ? selectedUserIds.filter((id) => id !== userId)
      : [...selectedUserIds, userId];
    setSeletedUserIds(newSelectedIds);
    // special check, if all the users are ticked, this should be regarded as bulk selected ticked
    // else, if all the users are un-ticked, this should be regarded as builk selected is unticked
    if (isBulkSelected && !newSelectedIds.length) {
      setIsBulkSelected(false);
    } else if (
      !isBulkSelected &&
      newSelectedIds.length === displayedUsers.length
    ) {
      setIsBulkSelected(true);
    }
  };

  const onPageChange = (pageNumber: number) => {
    if (pageNumber !== activePage) {
      setSeletedUserIds([]);
    }
    setIsBulkSelected(false);
    setActivePage(pageNumber);
  };

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
          <div>Loading...</div>
        ) : (
          <UserDataTable
            users={displayedUsers}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSeletedUserIds}
            isBulkSelected={isBulkSelected}
            setIsBulkSelected={setIsBulkSelected}
            toggletUserSelection={toggleUserSelection}
            onDeleteUsers={onDeleteUsers}
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
            onDeleteUsers(selectedUserIds);
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
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};
