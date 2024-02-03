import { useState, useEffect } from 'react';
import { User } from '../../types/user';
import { fetchUsers } from '../../api/user';
import { AdminCard } from './adminCard';

export const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  // used for loading state
  const [_, setIsLoading] = useState(true);

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

  return (
    <div className="adminPage">
      <AdminCard users={users} onUserChange={setUsers} />
    </div>
  );
};
