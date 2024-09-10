import React from 'react';
import { useState } from 'react';
import './SignUpForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUpForm () {
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(navigate('localhost:3000/register'), {firstname, lastname, email, password})
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })

        
    }
    return (
        <div className="signup-form-container">
            <div className="signup-form">
                {/* <button className="signup-form-close" onClick={() => navigate(-1)}>
                    &times;
                </button> */}
                <h2>Make Your ProfAI Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" required onChange={(e) => setFirstName(e.target.value)}/>
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" required onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" required />
                    </div>
                    {/* Change Link to button */}
                    <button type="submit" className="signup-btn">Register</button>
                    <p>Already have an account? <a href="/login" className="signup_forget">Login</a></p> 
                </form>

            </div>
        </div>
    );
};

export default SignUpForm;