// AdminPage.tsx
import React, { useEffect, useState } from 'react';
import { SearchBar } from '../common/input/searchBar';
import { PaginationBar } from '../common/pagination/paginationBar';
import { DisplayedUser, UserDataTable } from './userDataTable';
import { User } from '../../types/user';
import { fetchUsers } from '../../api/user';
import { UserDataZeroState } from './userDataZeroState';

export const AdminPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [activePage, setActivePage] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<DisplayedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBulkSelected, setIsBulkSelected] = useState<boolean>(false);

  // this can later be extended by a select / dropdown, if in that case, should use useState hook to define
  const usersPerPage = 10;
  const [totalPage, setTotalPage] = useState<number>(
    Math.ceil(allUsers.length / usersPerPage)
  );

  const updateDisplayedUsers = () => {
    const filteredUsers = allUsers.filter((user) =>
      `${user.email} ${user.email} ${user.role}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );

    const newTotalPage = Math.ceil(filteredUsers.length / usersPerPage);
    setTotalPage(newTotalPage);

    const startIndex = (activePage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const newDisplayedUsers = filteredUsers
      .slice(startIndex, endIndex)
      .map((user) => ({ ...user, isSelected: false }));

    setDisplayedUsers(newDisplayedUsers);
  };

  // load all the users only when the component is initialized and mounted
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setAllUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    updateDisplayedUsers();
    setIsBulkSelected(false);
  }, [allUsers, searchValue, activePage]);

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchValue(searchTerm);
    setActivePage(1);
  };

  return (
    <div className="adminPage">
      <SearchBar currentValue={searchValue} onSubmit={handleSearchSubmit} />
      <div className="adminPage-contentContainer ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <UserDataTable
            users={displayedUsers}
            onUserDataChange={setDisplayedUsers}
            isBulkSelected={isBulkSelected}
            setIsBulkSelected={setIsBulkSelected}
          />
        )}
        {displayedUsers.length ? null : (
          <UserDataZeroState searchValue={searchValue} />
        )}
      </div>
      <div
        className="adminPage-bottomActions"
        style={{ visibility: displayedUsers.length ? 'visible' : 'hidden' }}
      >
        <div className="adminPage-deleteSelected">
          <button className="button-md button-secondary">
            Delete Selected
          </button>
        </div>
        <div className="adminPage-pagination">
          <PaginationBar
            currentPage={activePage}
            totalPage={totalPage}
            totalButtonNumber={5}
            onPageChange={setActivePage}
          />
        </div>
      </div>
    </div>
  );
};
