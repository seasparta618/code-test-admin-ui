// UserTable.tsx
import React, { useState } from 'react';
import './user-table.scss';
import '../../../atoms/form/checkbox/checkbox.scss';
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
            setUsers(users.filter((u) => u.id !== userId));
        }, 250);
    };

    return (
        <table className="userTable">
            <tr className='userTable-row'>
                <th className='userTable-headerElement'><input type='checkbox' className='checkbox-input checkbox-sm' /></th>
                <th className='userTable-headerElement'>Name</th>
                <th className='userTable-headerElement'>Email</th>
                <th className='userTable-headerElement'>Role</th>
                <th className='userTable-headerElement'>Actions</th>
            </tr>
            {users.map(user => (
                <tr key={user.id} className={`userTable-row${user.id === removingId ? ' removing' : ''}${selectedIds.has(user.id) ? ' userTable-selectedRow' : ''}`}>
                    <td className='userTable-rowElement'> <input
                        className='checkbox-input checkbox-sm'
                        type='checkbox'
                        checked={selectedIds.has(user.id)}
                        onChange={(e) => handleRowSelectionChange(user.id, e.target.checked)}
                    /></td>
                    <td className='userTable-rowElement'>{user.name}</td>
                    <td className='userTable-rowElement'>{user.email}</td>
                    <td className='userTable-rowElement'>{user.role}</td>
                    <td className='userTable-rowElement userTable-actions'>
                        <span className='userTable-actionIcon' onClick={() => handleRemoveRow(user.id)}><CrossIcon /></span>
                        <span className="userTable-actionIcon"><CrossIcon /></span>
                    </td>
                </tr>
            ))}
        </table>
    );
};
