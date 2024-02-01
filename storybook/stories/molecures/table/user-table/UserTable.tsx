// UserTable.tsx
import React, { useState } from 'react';
import './user-table.scss';
import { CrossIcon } from '../../../shared/icon';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface UserTableProps {
    initialUsers: User[];
}

export const BuildUserTable: React.FC<UserTableProps> = ({ initialUsers }) => {

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [removingId, setRemovingId] = useState<string | null>(null);

    const [users, setUsers] = useState(initialUsers)

    const handleRowSelectionChange = (userId: string, isSelected: boolean) => {
        setSelectedIds((prevSelectedIds) => {
            const newSelectedIds = new Set(prevSelectedIds);
            if (isSelected) {
                newSelectedIds.add(userId);
            } else {
                newSelectedIds.delete(userId);
            }
            return newSelectedIds;
        });
    };

    const handleRemoveRow = (userId: string) => {
        setRemovingId(userId);
        setTimeout(() => {
            setUsers(users.filter((u)=>u.id !== userId));
        }, 250); 
      };

    return (
        <table className="userTable">
            <tr className='userTable-tr'>
                <th className='userTable-th'><input type='checkbox' /></th>
                <th className='userTable-th'>Name</th>
                <th className='userTable-th'>Email</th>
                <th className='userTable-th'>Role</th>
                <th className='userTable-th'>Actions</th>
            </tr>
            {users.map(user => (
                <tr key={user.id} className={`userTable-tr${user.id === removingId?' removing':''}${selectedIds.has(user.id)? ' userTable-trSelected':''}`}>
                    <td className='userTable-td'> <input
                        type='checkbox'
                        checked={selectedIds.has(user.id)}
                        onChange={(e) => handleRowSelectionChange(user.id, e.target.checked)}
                    /></td>
                    <td className='userTable-td'>{user.name}</td>
                    <td className='userTable-td'>{user.email}</td>
                    <td className='userTable-td'>{user.role}</td>
                    <td className='userTable-td userTable-actions'>
                        <span className='userTable-actionIcon' onClick={() => handleRemoveRow(user.id)}><CrossIcon /></span>
                        <span className="userTable-actionIcon"><CrossIcon /></span>
                    </td>
                </tr>
            ))}
        </table>
    );
};
