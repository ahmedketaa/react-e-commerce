import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { addUser, getUserById, updateUser } from '../../../Utlities/userServices';

export default function UserForm() {
    const [user, setUser] = useState({ email: '', username: '',  password: '', role: 'user' ,cart:[],wishlist:[] });
    const { userId } = useParams();    
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            getUserById(userId).then(data => setUser(data));
        }
    }, [userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const saveUser = userId ? updateUser(userId, user) : addUser(user);
        saveUser.then(() => navigate('/dashboard/users'))
                .catch(error => console.error('Error saving user:', error));
    };

    return (
        <div>
            <h2>{userId ? 'Update User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit} className='shadow p-4'>
                <div className='d-flex gap-5'>
                    <label>Username:</label>
                    <InputText className='mt-2 ' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </div>
                <div className='d-flex gap-5'>
                    <label>Email:</label>
                    <InputText className='mt-2 ms-4' type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </div>
                <div className='d-flex gap-5'>
                    <label>Password:</label>
                    <InputText className='mt-2 ' type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </div>
                <div className='d-flex gap-5 my-3'>
                    <label>Role:</label>
                    <div className=''>
                        <RadioButton inputId="user" name="role" value="user" onChange={(e) => setUser({ ...user, role: e.value })} checked={user.role === 'user'} />
                        <label htmlFor="user">User</label>
                    </div>
                    <div>
                        <RadioButton inputId="admin" name="role" value="admin" onChange={(e) => setUser({ ...user, role: e.value })} checked={user.role === 'admin'} />
                        <label htmlFor="admin">Admin</label>
                    </div>
                </div>
                <Button label="Save" icon="pi pi-check" />
            </form>
        </div>
    );
}
