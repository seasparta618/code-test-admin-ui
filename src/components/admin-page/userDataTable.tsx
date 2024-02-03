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
  handleSaveClick: (userId: string) => void;
  handleEditClick: (user: User) => void;
  toggletUserSelection: (userId: string, isSelected: boolean) => void;
  handleDeleteUsers: (userIds: string[]) => void;
  toggleBulkSelection: (newBulkValue: boolean) => void;
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
  toggletUserSelection,
  toggleBulkSelection,
  handleDeleteUsers,
  handleCancelEditClick,
  handleUserEditChange,
}) => {

  const renderUserInput = (user: User, field: keyof User, fieldType: keyof User) => {
    const inEditingUser = inEditingUsers.find((u) => u.id === user.id);
    return (
      <input
        className={`userTable-textInput${inEditingUserIds.includes(user.id) ? ' userTable-activeInput' : ''}`}
        value={inEditingUser ? inEditingUser[field] : user[field]}
        disabled={!inEditingUserIds.includes(user.id)}
        onChange={(e) =>
          handleUserEditChange(user.id, fieldType, e.target.value)
        }
      />
    );
  };
  

  const renderUserInfo = (user: User) => {
    return (
      <>
        <td className="userTable-rowElement">
          {renderUserInput(user, 'name', 'name')}
        </td>
        <td className="userTable-rowElement">
          {renderUserInput(user, 'email', 'email')}
        </td>
        <td className="userTable-rowElement">
          {renderUserInput(user, 'role', 'role')}
        </td>
      </>
    );
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
              onChange={() => {
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
                onChange={() =>
                  toggletUserSelection(
                    user.id,
                    selectedUserIds.includes(user.id)
                  )
                }
              />
            </td>
            {renderUserInfo(user)}
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
                onClick={() => handleDeleteUsers([user.id])}
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
