// UserDataTable.tsx
import React from 'react';
import { User } from '../../types/user';
import { CrossIcon } from '../icons/icon';

interface UserDataTableProps {
  users: User[];
  selectedUserIds: string[];
  isBulkSelected: boolean;
  setSelectedUserIds: (userIds: string[]) => void;
  setIsBulkSelected: (checked: boolean) => void;
  toggletUserSelection: (userId: string, isSelected: boolean) => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({
  users,
  isBulkSelected,
  selectedUserIds,
  setSelectedUserIds,
  setIsBulkSelected,
  toggletUserSelection,
}) => {
  const toggleBulkSelection = (newBulkSelected: boolean) => {
    setSelectedUserIds(newBulkSelected ? users.map((u) => u.id) : []);
    setIsBulkSelected(newBulkSelected);
  };

  return (
    <table className="userTable">
      <tr className="userTable-row">
        <th className="userTable-headerElement">
          <input
            type="checkbox"
            className="checkbox-input checkbox-sm"
            checked={isBulkSelected}
            onClick={() => {
              toggleBulkSelection(!isBulkSelected);
            }}
          />
        </th>
        <th className="userTable-headerElement">Name</th>
        <th className="userTable-headerElement">Email</th>
        <th className="userTable-headerElement">Role</th>
        <th className="userTable-headerElement">Actions</th>
      </tr>
      {users.map((user) => (
        <tr
          key={user.id}
          className={`userTable-row ${selectedUserIds.includes(user.id) ? 'userTable-selectedRow' : ''}`}
        >
          <td className="userTable-rowElement">
            <input
              className="checkbox-input checkbox-sm"
              type="checkbox"
              checked={selectedUserIds.includes(user.id)}
              onClick={() =>
                toggletUserSelection(user.id, selectedUserIds.includes(user.id))
              }
            />
          </td>
          <td className="userTable-rowElement">{user.name}</td>
          <td className="userTable-rowElement">{user.email}</td>
          <td className="userTable-rowElement">{user.role}</td>
          <td className="userTable-rowElement userTable-actions">
            <span className="userTable-actionIcon">
              <CrossIcon />
            </span>
          </td>
        </tr>
      ))}
    </table>
  );
};
