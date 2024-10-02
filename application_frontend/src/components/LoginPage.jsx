// src/components/LoginPage.jsx
// https://chatgpt.com/share/66fca461-6aac-8000-9f31-a137f8004f40
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    try {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Send the username and password as JSON
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Login successful!'); // Update message on success
        } else {
            setMessage(data.message || 'Login failed!'); // Update message on failure
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('Something went wrong!'); // Update message on error
    }
};

return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
        {message && <p>{message}</p>} {/* Render the message if it exists */}
    </form>
);
};

export default LoginPage;