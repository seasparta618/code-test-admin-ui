// UserDataTable.tsx
import React from 'react';
import { User } from '../../types/user';
import { EditIcon, RemoveIcon, RevertIcon, SaveIcon } from '../icons/icon';

interface UserDataTableProps {
  users: User[];
  selectedUserIds: string[];
  isBulkSelected: boolean;
  inEditingUserIds: string[];
  inEditingUsers: User[];
  setSelectedUserIds: (userIds: string[]) => void;
  handleSaveClick: (userId: string) => void;
  handleEditClick: (user: User) => void;
  setIsBulkSelected: (checked: boolean) => void;
  toggletUserSelection: (userId: string, isSelected: boolean) => void;
  onDeleteUsers: (userIds: string[]) => void;
  handleCancelEditClick: (user: User) => void;
  handleUserEditChange: (
    userId: string,
    field: keyof User,
    vaue: string
  ) => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({
  users,
  isBulkSelected,
  selectedUserIds,
  inEditingUserIds,
  inEditingUsers,
  handleSaveClick,
  handleEditClick,
  setSelectedUserIds,
  setIsBulkSelected,
  toggletUserSelection,
  onDeleteUsers,
  handleCancelEditClick,
  handleUserEditChange,
}) => {
  const toggleBulkSelection = (newBulkSelected: boolean) => {
    setSelectedUserIds(newBulkSelected ? users.map((u) => u.id) : []);
    setIsBulkSelected(newBulkSelected);
  };

  return (
    <table className="userTable">
      <thead>
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
      </thead>
      <tbody>
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
                  toggletUserSelection(
                    user.id,
                    selectedUserIds.includes(user.id)
                  )
                }
              />
            </td>
            <td className="userTable-rowElement" colSpan={4}>
              <input
                className={`userTable-textInput${inEditingUserIds.includes(user.id) ? ' userTable-activeInput' : ''}`}
                value={
                  inEditingUsers.find((u) => u.id === user.id)?.name ??
                  user.name
                }
                disabled={!inEditingUserIds.includes(user.id)}
                onChange={(e) =>
                  handleUserEditChange(user.id, 'name', e.target.value)
                }
              />
            </td>
            <td className="userTable-rowElement">
              <input
                className={`userTable-textInput${inEditingUserIds.includes(user.id) ? ' userTable-activeInput' : ''}`}
                value={
                  inEditingUsers.find((u) => u.id === user.id)?.email ??
                  user.email
                }
                disabled={!inEditingUserIds.includes(user.id)}
                onChange={(e) =>
                  handleUserEditChange(user.id, 'email', e.target.value)
                }
              />
            </td>
            <td className="userTable-rowElement">
              <input
                className={`userTable-textInput${inEditingUserIds.includes(user.id) ? ' userTable-activeInput' : ''}`}
                value={
                  inEditingUsers.find((u) => u.id === user.id)?.role ??
                  user.role
                }
                disabled={!inEditingUserIds.includes(user.id)}
                onChange={(e) =>
                  handleUserEditChange(user.id, 'role', e.target.value)
                }
              />
            </td>
            <td className="userTable-rowElement userTable-actions">
              {!inEditingUserIds.includes(user.id) && (
                <span
                  className="userTable-icon userTable-editIcon"
                  onClick={() => handleEditClick(user)}
                >
                  <EditIcon />
                </span>
              )}

              {inEditingUserIds.includes(user.id) && (
                <span
                  className="userTable-icon"
                  onClick={() => handleSaveClick(user.id)}
                >
                  <SaveIcon />
                </span>
              )}
              {inEditingUserIds.includes(user.id) && (
                <span
                  className="userTable-icon"
                  onClick={() => handleCancelEditClick(user)}
                >
                  <RevertIcon />
                </span>
              )}
              <span
                className="userTable-icon userTable-removeIcon"
                onClick={() => onDeleteUsers([user.id])}
              >
                <RemoveIcon />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
