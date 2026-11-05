import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // READ: Fetch all items when the app loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // CREATE: Add a new user
  const handleAddUsers = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await axios.post(API_URL, { name });
      setUsers([...users, response.data]);
      setName('');
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // UPDATE: Update an item name
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;

    try {
      const response = await axios.put(`${API_URL}/${editingId}`, { name: editName });
      setUsers(users.map(user => (user.id === editingId ? response.data : user)));
      setEditingId(null);
      setEditName('');
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // DELETE: Delete an user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React CRUD App with Express REST API</h1>

      {/* CREATE FORM */}
      <form onSubmit={handleAddUsers} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter user name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Add User</button>
      </form>

      {/* EDIT FORM (Conditionally Rendered) */}
      {editingId && (
        <form onSubmit={handleUpdateUser} style={{ marginBottom: '20px', background: '#f0f0f0', padding: '10px' }}>
          <h3>Editing user</h3>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '8px 12px', marginRight: '5px' }}>Save</button>
          <button type="button" onClick={() => setEditingId(null)} style={{ padding: '8px 12px' }}>Cancel</button>
        </form>
      )}

      {/* READ LIST */}
      <h2>User List</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {users.map((user) => (
          <li key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
            <span>{user.name}</span>
            <button 
              onClick={() => { setEditingId(user.id); setEditName(user.name); }}
              style={{ backgroundColor: '#ffc107', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Edit
            </button>
            <button 
              onClick={() => handleDeleteUser(user.id)}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
