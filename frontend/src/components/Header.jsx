// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="header">
            <a href="/dashboard" onClick={() => window.location.reload()}>
            <img className="logo" src={logo} alt="Logo" width={60} />
        </a>
        <h2>ProfAI</h2>
      <nav>
        <Link to="/dashboard">Account</Link>
      </nav>
    </header>
  );
};

export default Header;
