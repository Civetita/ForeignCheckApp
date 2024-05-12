import React, { useState, useEffect } from 'react';
import './Users.css';
function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
        }
    };

    const handleAddUser = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const addedUser = await response.json();
            setUsers([...users, addedUser]);
            setNewUser({ username: '', password: '' });
        } catch (error) {
            console.error('Failed to add new user:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchUsers();  // Refresh users after deletion
        } catch (error) {
            console.error('Failed to delete the user:', error);
        }
    };

    return (
        <div>
            <h1>Users</h1>
            <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleAddUser}>Add User</button>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username}
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Users;
