// UserDataTable.tsx
import React, { useState } from 'react';
import { User } from '../../types/user';
import { check } from 'prettier';
import { CrossIcon } from '../icons/icon';

export type DisplayedUser = User & {
  isSelected: boolean;
};

interface UserDataTableProps {
  users: DisplayedUser[];
  isBulkSelected: boolean;
  setIsBulkSelected: (checked: boolean) => void;
  onUserDataChange: (users: DisplayedUser[]) => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({
  users,
  onUserDataChange: onDisplayedUsersChange,
  isBulkSelected,
  setIsBulkSelected,
}) => {
  const handleRowSelectionChange = (userId: string) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        console.log('need to set this user status to', !user.isSelected);
        return { ...user, isSelected: !user.isSelected };
      }
      return user;
    });
    onDisplayedUsersChange(updatedUsers);
  };

  const handleOnBulkSelect = () => {
    const updateUsers = users.map((user) => {
      user.isSelected = !isBulkSelected;
      return user;
    });
    onDisplayedUsersChange(updateUsers);
    setIsBulkSelected(!isBulkSelected);
  };

  return (
    <table className="userTable">
      <tr className="userTable-row">
        <th className="userTable-headerElement">
          <input
            type="checkbox"
            className="checkbox-input checkbox-sm"
            onClick={handleOnBulkSelect}
            checked={isBulkSelected}
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
          className={`userTable-row ${
            user.isSelected ? ' userTable-selectedRow' : ''
          }`}
        >
          <td className="userTable-rowElement">
            <input
              className="checkbox-input checkbox-sm"
              type="checkbox"
              checked={user.isSelected}
              onChange={() => handleRowSelectionChange(user.id)}
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
