import React, { useState } from 'react';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignUpForm () {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // Make sure the URL is correct
            const result = await axios.post('http://localhost:3000/register', {
                firstname,
                lastname,
                email,
                password
            });
            console.log(result);
            // Navigate to home page or login after successful registration
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert("Error occurred during registration.");
        }
    }

    return (
        <div className="signup-form-container">
            <div className="signup-form">
                <h2>Make Your ProfAI Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" value={firstname} required onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" value={lastname} required onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="signup-btn">Register</button>
                    <p>Already have an account? <Link to="/login" className="signup_forget">Login</Link></p> 
                </form>
            </div>
        </div>
    );
}

export default SignUpForm;
