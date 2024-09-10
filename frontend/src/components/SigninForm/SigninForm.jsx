import React, { useState } from 'react';
import './SigninForm.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post email and password to the login endpoint
        axios.post('http://localhost:3000/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    // Navigate to the dashboard if login is successful
                    navigate('/dashboard');
                } else {
                    alert('Login failed');
                }
            })
            .catch(err => {
                console.error('Error during login:', err);
            });
    };

    return (
        <div className="signup-form-container">
            <div className="signup-form">

                <h2>Sign In to Your ProfAI Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Link to="#" className="signup_forget">Forgot Password?</Link>
                        <p>Don't have an account? <Link className="signup_forget" to="/register">Sign Up</Link></p>
                    </div>
                    {/* Change Link to button for form submission */}
                    <button type="submit" className="signup-btn">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SigninForm;
