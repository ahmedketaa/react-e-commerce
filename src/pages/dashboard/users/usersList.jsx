import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deleteUser, getUsers } from '../../../Utlities/userServices';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        await getUsers().then(res => {
            
            setUsers(res);
        }).catch(error => {
            console.error("Error fetching users:", error);
        });
    };

    const confirmDeleteUser = (userId) => {
        confirmDialog({
            message: 'Are you sure you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => handleDeleteUser(userId),
            reject: ''
        });
    };

    const handleUpdateUser = (userId) => {
        navigate(`update-user/${userId}`);
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId).then(() => {
            fetchUsers();
        }).catch(error => {
            console.error("Error deleting user:", error);
        });
    };

    const filteredUsers = users?.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-grid p-justify-center">
            <ConfirmDialog />
            <div className="p-col-12 mb-4">
                <span className="p-input-icon-left">
                    <i className="pi pi-search ps-2" />
                    <InputText
                        className='ps-4'
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </span>
            </div>
            {filteredUsers.map((user) => (
                <div key={user.id} className="">
                    <Card
                        title={(user.username).toUpperCase()}
                        className="p-0"
                        style={{
                            marginBottom: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 8px #db444435'
                        }}
                    >
                        <div className="">
                            <span style={{ fontWeight: '500' }}>{user.name}</span>
                            <div>
                                <Button
                                    label="Update"
                                    icon="pi pi-pencil"
                                    className="p-2 p-button-warning me-2 mt-3 rounded"
                                    onClick={() => handleUpdateUser(user.id)}
                                />
                                <Button
                                    label="Delete"
                                    icon="pi pi-trash"
                                    className="p-2 p-button-danger rounded"
                                    onClick={() => confirmDeleteUser(user.id)}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
            {filteredUsers.length === 0 && (
                <div className="p-col-12 text-center">
                    <p>No users found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
};

export default UserList;
