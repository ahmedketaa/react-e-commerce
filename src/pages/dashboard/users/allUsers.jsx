import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { deleteUser, getUsers } from '../../../Utlities/userServices';
import { CiSquarePlus } from 'react-icons/ci';

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(data => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        confirmDialog({
            message: 'Are you sure you want to delete this user?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                deleteUser(userId)
                    .then(() => setUsers(users.filter(user => user.id !== userId)))
                    .catch(error => console.error('Error deleting user:', error));
            }
        });
    };

    return (
             <div className='container'>
                <div className="text-center ">
            <ul className='d-flex gap-3'>
                <li>
                    <button  onClick={() => navigate('./')} className='special-nav-link'>All Users</button>
                </li>
                <li>
                    <button onClick={() => navigate('add-user')}  className='special-nav-link'>
            <CiSquarePlus style={{fontSize:"30px"}}/>
            Add User</button>
            </li>
        </ul>
        </div>
       <Outlet />
    </div>

    );
}
